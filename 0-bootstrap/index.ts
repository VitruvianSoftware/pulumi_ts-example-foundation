/**
 * Copyright 2026 Vitruvian Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*************************************************
  Bootstrap GCP Organization.
  Mirrors: 0-bootstrap/ in the terraform-example-foundation.
*************************************************/

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as random from "@pulumi/random";
import { loadConfig, BootstrapConfig } from "./config";
import { deployGroups } from "./groups";
import { deployServiceAccounts, GranularSAs } from "./sa";
import { deployCloudbuild } from "./build_cb";

export = async () => {
    const cfg = loadConfig(new pulumi.Config());

    /*************************************************
      Groups creation (mirrors groups.tf)
    *************************************************/
    const groupOutputs = await deployGroups(cfg);

    /*************************************************
      Bootstrap Folder
    *************************************************/
    const bootstrapFolder = new gcp.organizations.Folder("bootstrap-folder", {
        displayName: `${cfg.folderPrefix}-bootstrap`,
        parent: cfg.parent,
        deletionProtection: cfg.folderDeletionProtection,
    }, { protect: true });

    /*************************************************
      Seed Bootstrap Project (mirrors main.tf module "seed_bootstrap")
    *************************************************/
    const seedSuffix = new random.RandomString("seed-suffix", {
        length: 4,
        special: false,
        upper: false,
    });

    const seedProject = new gcp.organizations.Project("seed-project", {
        projectId: pulumi.interpolate`${cfg.projectPrefix}-b-seed-${seedSuffix.result}`,
        name: pulumi.interpolate`${cfg.projectPrefix}-b-seed-${seedSuffix.result}`,
        folderId: bootstrapFolder.name,
        billingAccount: cfg.billingAccount,
        deletionPolicy: cfg.projectDeletionPolicy,
        autoCreateNetwork: false,
        labels: {
            environment: "bootstrap",
            application_name: "seed-bootstrap",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "b",
            vpc: "none",
        },
    }, { dependsOn: groupOutputs.dependsOn, protect: true });

    // Disable default service accounts on seed project (mirrors TF default_service_account = "disable")
    new gcp.projects.DefaultServiceAccounts("seed-default-sa-disable", {
        project: seedProject.projectId,
        action: "DISABLE",
    });

    // Enable APIs on seed project
    const seedApis = [
        "serviceusage.googleapis.com",
        "servicenetworking.googleapis.com",
        "cloudkms.googleapis.com",
        "compute.googleapis.com",
        "logging.googleapis.com",
        "bigquery.googleapis.com",
        "cloudresourcemanager.googleapis.com",
        "cloudbilling.googleapis.com",
        "cloudbuild.googleapis.com",
        "iam.googleapis.com",
        "admin.googleapis.com",
        "appengine.googleapis.com",
        "storage-api.googleapis.com",
        "monitoring.googleapis.com",
        "pubsub.googleapis.com",
        "securitycenter.googleapis.com",
        "accesscontextmanager.googleapis.com",
        "billingbudgets.googleapis.com",
        "essentialcontacts.googleapis.com",
        "assuredworkloads.googleapis.com",
        "cloudasset.googleapis.com",
    ];

    const seedServices: gcp.projects.Service[] = [];
    for (const api of seedApis) {
        seedServices.push(new gcp.projects.Service(`seed-api-${api.replace(/\./g, "-")}`, {
            project: seedProject.projectId,
            service: api,
            disableOnDestroy: false,
        }, { parent: seedProject }));
    }

    const kmsKeyring = new gcp.kms.KeyRing("seed-keyring", {
        name: `${cfg.projectPrefix}-keyring`,
        project: seedProject.projectId,
        location: cfg.defaultRegionKms,
    }, { dependsOn: seedServices });

    const kmsKey = new gcp.kms.CryptoKey("seed-key", {
        name: `${cfg.projectPrefix}-key`,
        keyRing: kmsKeyring.id,
        rotationPeriod: "7776000s", // 90 days
        versionTemplate: {
            algorithm: "GOOGLE_SYMMETRIC_ENCRYPTION",
            protectionLevel: cfg.kmsKeyProtectionLevel,
        },
    }, { protect: !cfg.bucketTfStateKmsForceDestroy });

    const stateBucketKmsKey = pulumi.interpolate`projects/${seedProject.projectId}/locations/${cfg.defaultRegionKms}/keyRings/${cfg.projectPrefix}-keyring/cryptoKeys/${cfg.projectPrefix}-key`;

    const storageSa = gcp.storage.getProjectServiceAccountOutput({
        project: seedProject.projectId,
    });

    const kmsBinding = new gcp.kms.CryptoKeyIAMMember("seed-kms-sa", {
        cryptoKeyId: kmsKey.id,
        role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
        member: pulumi.interpolate`serviceAccount:${storageSa.emailAddress}`,
    });

    // State bucket for Terraform/Pulumi state
    const stateBucket = new gcp.storage.Bucket("seed-state-bucket", {
        name: pulumi.interpolate`${cfg.bucketPrefix}-${cfg.projectPrefix}-b-seed-tfstate-${seedSuffix.result}`,
        project: seedProject.projectId,
        location: cfg.defaultRegionGcs,
        forceDestroy: cfg.bucketForceDestroy,
        uniformBucketLevelAccess: true,
        versioning: { enabled: true },
        encryption: { defaultKmsKeyName: kmsKey.id },
    }, { dependsOn: [kmsBinding, ...seedServices] });

    /*************************************************
      CI/CD Project and Cloud Build (mirrors build_cb.tf)
    *************************************************/
    const cbOutputs = await deployCloudbuild(cfg, bootstrapFolder, seedProject, stateBucket, stateBucketKmsKey);

    /*************************************************
      Service Accounts and IAM (mirrors sa.tf)
    *************************************************/
    const saOutputs = await deployServiceAccounts(cfg, seedProject, cbOutputs.cicdProjectId);

    /*************************************************
      Projects state bucket (for 4-projects stage)
    *************************************************/
    const projectsStateBucket = new gcp.storage.Bucket("projects-state-bucket", {
        name: pulumi.interpolate`${cfg.bucketPrefix}-${seedProject.projectId}-gcp-projects-tfstate`,
        project: seedProject.projectId,
        location: cfg.defaultRegionGcs,
        forceDestroy: cfg.bucketForceDestroy,
        uniformBucketLevelAccess: true,
        versioning: { enabled: true },
        encryption: { defaultKmsKeyName: kmsKey.id },
    }, { dependsOn: [stateBucket, kmsBinding] });

    /*************************************************
      Org admins IAM at org level
    *************************************************/
    const orgAdminsRoles = cfg.orgPolicyAdminRole
        ? [
            "roles/orgpolicy.policyAdmin",
            "roles/resourcemanager.organizationAdmin",
            "roles/billing.user",
            "roles/resourcemanager.tagAdmin",
            "roles/resourcemanager.tagUser",
            "roles/logging.configWriter",
            "roles/securitycenter.notificationConfigEditor",
            "roles/accesscontextmanager.policyAdmin",
            "roles/essentialcontacts.admin"
          ]
        : [
            "roles/resourcemanager.organizationAdmin",
            "roles/billing.user",
            "roles/resourcemanager.tagAdmin",
            "roles/resourcemanager.tagUser",
            "roles/logging.configWriter",
            "roles/securitycenter.notificationConfigEditor",
            "roles/accesscontextmanager.policyAdmin",
            "roles/essentialcontacts.admin"
          ];

    for (const role of orgAdminsRoles) {
        new gcp.organizations.IAMMember(`org-admin-${role.replace(/\//g, "-")}`, {
            orgId: cfg.orgId,
            role: role,
            member: `group:${cfg.groups.requiredGroups.groupOrgAdmins}`,
        });
    }

    /*************************************************
      Outputs — mirrors outputs.tf and outputs_cb.tf
    *************************************************/
    return {
        // outputs.tf
        seed_project_id: seedProject.projectId,
        bootstrap_step_terraform_service_account_email: saOutputs.saEmails["bootstrap"],
        projects_step_terraform_service_account_email: saOutputs.saEmails["proj"],
        networks_step_terraform_service_account_email: saOutputs.saEmails["net"],
        environment_step_terraform_service_account_email: saOutputs.saEmails["env"],
        organization_step_terraform_service_account_email: saOutputs.saEmails["org"],
        gcs_bucket_tfstate: stateBucket.name,
        projects_gcs_bucket_tfstate: projectsStateBucket.name,

        common_config: {
            org_id: cfg.orgId,
            parent_folder: cfg.parentFolder,
            billing_account: cfg.billingAccount,
            default_region: cfg.defaultRegion,
            default_region_2: cfg.defaultRegion2,
            default_region_gcs: cfg.defaultRegionGcs,
            default_region_kms: cfg.defaultRegionKms,
            project_prefix: cfg.projectPrefix,
            folder_prefix: cfg.folderPrefix,
            parent_id: cfg.parent,
            bootstrap_folder_name: bootstrapFolder.name,
        },

        required_groups: cfg.groups.createRequiredGroups
            ? groupOutputs.requiredGroupIds
            : {
                group_org_admins: cfg.groups.requiredGroups.groupOrgAdmins,
                group_billing_admins: cfg.groups.requiredGroups.groupBillingAdmins,
                billing_data_users: cfg.groups.requiredGroups.billingDataUsers,
                audit_data_users: cfg.groups.requiredGroups.auditDataUsers,
            },

        optional_groups: cfg.groups.createOptionalGroups
            ? groupOutputs.optionalGroupIds
            : cfg.groups.optionalGroups,

        // outputs_cb.tf
        cloudbuild_project_id: cbOutputs.cicdProjectId,
        cloud_build_private_worker_pool_id: cbOutputs.privateWorkerPoolId,
    };
};
