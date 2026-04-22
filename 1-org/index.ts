/**
 * Copyright 2026 Vitruvian Software
 *
 * 1-org/index.ts — Main entrypoint for the Organization stage.
 * Mirrors: 1-org/envs/shared/ in the terraform-example-foundation.
 *
 * Creates org-level folders, IAM bindings, org policies, centralized logging,
 * SCC notifications, tags, essential contacts, and shared org projects.
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { loadOrgConfig } from "./config";
import { ProjectFactory } from "../modules/project-factory";
import { OrgPolicyBoolean, OrgPolicyList, DomainRestrictedSharing } from "../modules/org-policy";
import { CentralizedLogging } from "../modules/centralized-logging";

export = async () => {
    const cfg = loadOrgConfig(new pulumi.Config());

    // Stack reference to 0-bootstrap for remote state
    const bootstrapRef = new pulumi.StackReference("bootstrap");
    const commonConfig = bootstrapRef.getOutput("common_config") as pulumi.Output<Record<string, string>>;
    const requiredGroups = bootstrapRef.getOutput("required_groups") as pulumi.Output<Record<string, string>>;
    const optionalGroups = bootstrapRef.getOutput("optional_groups") as pulumi.Output<Record<string, string>>;

    const orgId = commonConfig.apply(c => c.org_id || cfg.orgId);
    const billingAccount = commonConfig.apply(c => c.billing_account || cfg.billingAccount);
    const projectPrefix = commonConfig.apply(c => c.project_prefix || cfg.projectPrefix);
    const folderPrefix = commonConfig.apply(c => c.folder_prefix || cfg.folderPrefix);
    const parent = commonConfig.apply(c => c.parent_id || cfg.parent);
    const bootstrapFolderName = commonConfig.apply(c => c.bootstrap_folder_name);

    /*************************************************
      Folders (mirrors folders.tf)
    *************************************************/
    const commonFolder = new gcp.organizations.Folder("common-folder", {
        displayName: pulumi.interpolate`${folderPrefix}-common`,
        parent: parent,
        deletionProtection: cfg.folderDeletionProtection,
    });

    const networkFolder = new gcp.organizations.Folder("network-folder", {
        displayName: pulumi.interpolate`${folderPrefix}-network`,
        parent: parent,
        deletionProtection: cfg.folderDeletionProtection,
    });

    const developmentFolder = new gcp.organizations.Folder("development-folder", {
        displayName: pulumi.interpolate`${folderPrefix}-development`,
        parent: parent,
        deletionProtection: cfg.folderDeletionProtection,
    });

    const nonproductionFolder = new gcp.organizations.Folder("nonproduction-folder", {
        displayName: pulumi.interpolate`${folderPrefix}-nonproduction`,
        parent: parent,
        deletionProtection: cfg.folderDeletionProtection,
    });

    const productionFolder = new gcp.organizations.Folder("production-folder", {
        displayName: pulumi.interpolate`${folderPrefix}-production`,
        parent: parent,
        deletionProtection: cfg.folderDeletionProtection,
    });

    /*************************************************
      Org Policies (mirrors org_policy.tf)
    *************************************************/
    // Boolean policies
    const booleanPolicies: Record<string, boolean> = {
        "compute.disableNestedVirtualization": true,
        "compute.disableSerialPortAccess": true,
        "compute.disableGuestAttributesAccess": true,
        "compute.skipDefaultNetworkCreation": true,
        "sql.restrictPublicIp": true,
        "sql.restrictAuthorizedNetworks": true,
        "iam.disableServiceAccountKeyCreation": true,
        "iam.automaticIamGrantsForDefaultServiceAccounts": true,
        "storage.uniformBucketLevelAccess": true,
    };

    for (const [constraint, enforced] of Object.entries(booleanPolicies)) {
        new OrgPolicyBoolean(`org-policy-${constraint.replace(/\./g, "-")}`, {
            orgId: cfg.orgId,
            constraint: constraint,
            enforced: enforced,
        });
    }

    // VM external IP deny all
    new OrgPolicyList("deny-vm-external-ip", {
        orgId: cfg.orgId,
        constraint: "compute.vmExternalIpAccess",
        policyType: "deny",
        values: ["all"],
    });

    // Domain restricted sharing
    if (cfg.domainsToAllow.length > 0) {
        new DomainRestrictedSharing("domain-restricted-sharing", {
            orgId: cfg.orgId,
            domainsToAllow: cfg.domainsToAllow,
        });
    }

    /*************************************************
      Shared Projects (mirrors projects.tf)
    *************************************************/
    // Org Audit Logs
    const orgAuditLogs = new ProjectFactory("org-audit-logs", {
        name: `${cfg.projectPrefix}-c-logging`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: commonFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: [
            "logging.googleapis.com", "bigquery.googleapis.com",
            "billingbudgets.googleapis.com",
        ],
        labels: {
            environment: "common",
            application_name: "org-logging",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "c",
            vpc: "none",
        },
    });

    // Org Billing Export
    const orgBillingExport = new ProjectFactory("org-billing-export", {
        name: `${cfg.projectPrefix}-c-billing-export`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: commonFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: [
            "logging.googleapis.com", "bigquery.googleapis.com",
            "billingbudgets.googleapis.com",
        ],
        labels: {
            environment: "common",
            application_name: "org-billing-export",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "c",
            vpc: "none",
        },
    });

    // Common KMS
    const commonKms = new ProjectFactory("common-kms", {
        name: `${cfg.projectPrefix}-c-kms`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: commonFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: [
            "logging.googleapis.com", "cloudkms.googleapis.com",
            "billingbudgets.googleapis.com",
        ],
        labels: {
            environment: "common",
            application_name: "org-kms",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "c",
            vpc: "none",
        },
    });

    // Org Secrets
    const orgSecrets = new ProjectFactory("org-secrets", {
        name: `${cfg.projectPrefix}-c-secrets`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: commonFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: [
            "logging.googleapis.com", "secretmanager.googleapis.com",
            "billingbudgets.googleapis.com",
        ],
        labels: {
            environment: "common",
            application_name: "org-secrets",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "c",
            vpc: "none",
        },
    });

    // Interconnect
    const interconnect = new ProjectFactory("interconnect", {
        name: `${cfg.projectPrefix}-net-interconnect`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: networkFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: ["billingbudgets.googleapis.com", "compute.googleapis.com"],
        labels: {
            environment: "network",
            application_name: "org-interconnect",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "net",
            vpc: "none",
        },
    });

    // SCC Notifications
    const sccNotifications = new ProjectFactory("scc-notifications", {
        name: `${cfg.projectPrefix}-c-scc`,
        orgId: cfg.orgId,
        billingAccount: cfg.billingAccount,
        folderId: commonFolder.name,
        deletionPolicy: cfg.projectDeletionPolicy,
        activateApis: [
            "logging.googleapis.com", "pubsub.googleapis.com",
            "securitycenter.googleapis.com", "billingbudgets.googleapis.com",
            "cloudkms.googleapis.com",
        ],
        labels: {
            environment: "common",
            application_name: "org-scc",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: "c",
            vpc: "none",
        },
    });

    // Network Hub (conditional — hub-and-spoke only)
    let networkHub: ProjectFactory | undefined;
    if (cfg.enableHubAndSpoke) {
        networkHub = new ProjectFactory("network-hub", {
            name: `${cfg.projectPrefix}-net-hub`,
            orgId: cfg.orgId,
            billingAccount: cfg.billingAccount,
            folderId: networkFolder.name,
            deletionPolicy: cfg.projectDeletionPolicy,
            activateApis: [
                "compute.googleapis.com", "dns.googleapis.com",
                "servicenetworking.googleapis.com", "logging.googleapis.com",
                "cloudresourcemanager.googleapis.com", "billingbudgets.googleapis.com",
            ],
            labels: {
                environment: "network",
                application_name: "org-net-hub",
                billing_code: "1234",
                primary_contact: "example1",
                secondary_contact: "example2",
                business_code: "shared",
                env_code: "net",
                vpc: "svpc",
            },
        });
    }

    // Per-environment network projects
    const environments: Record<string, string> = {
        development: "d",
        nonproduction: "n",
        production: "p",
    };

    const environmentNetworkProjects: Record<string, ProjectFactory> = {};
    for (const [env, envCode] of Object.entries(environments)) {
        environmentNetworkProjects[env] = new ProjectFactory(`env-network-${env}`, {
            name: `${cfg.projectPrefix}-${envCode}-svpc`,
            orgId: cfg.orgId,
            billingAccount: cfg.billingAccount,
            folderId: networkFolder.name,
            deletionPolicy: cfg.projectDeletionPolicy,
            activateApis: [
                "compute.googleapis.com", "dns.googleapis.com",
                "servicenetworking.googleapis.com", "container.googleapis.com",
                "logging.googleapis.com", "cloudresourcemanager.googleapis.com",
                "accesscontextmanager.googleapis.com", "billingbudgets.googleapis.com",
            ],
            labels: {
                environment: env,
                application_name: "shared-vpc-host",
                billing_code: "1234",
                primary_contact: "example1",
                secondary_contact: "example2",
                business_code: "shared",
                env_code: envCode,
            },
        });
    }

    /*************************************************
      Centralized Logging (mirrors log_sinks.tf)
    *************************************************/
    new CentralizedLogging("org-logging", {
        projectId: orgAuditLogs.projectId,
        orgId: cfg.orgId,
        loggingBucketOptions: {
            name: "LogBucket",
            loggingSinkName: "sk-c-logging-logbkt",
            loggingSinkFilter: "",
        },
        bigqueryOptions: {
            datasetName: "audit_logs",
            loggingSinkName: "sk-c-logging-bq",
            loggingSinkFilter: "",
        },
        storageOptions: {
            bucketName: `${cfg.projectPrefix}-c-logging-bucket`,
            loggingSinkName: "sk-c-logging-bkt",
            loggingSinkFilter: "",
            forceDestroy: cfg.logExportStorageForceDestroy,
            versioning: cfg.logExportStorageVersioning,
            location: cfg.logExportStorageLocation,
        },
        pubsubOptions: {
            topicName: "tp-c-logging",
            loggingSinkName: "sk-c-logging-pub",
            loggingSinkFilter: "",
        },
    });

    /*************************************************
      SCC Notification (mirrors scc_notification.tf)
    *************************************************/
    const sccTopic = new gcp.pubsub.Topic("scc-notification-topic", {
        project: sccNotifications.projectId,
        name: `top-scc-notification`,
    });

    new gcp.securitycenter.NotificationConfig("scc-notification", {
        configId: cfg.sccNotificationName,
        organization: cfg.orgId,
        pubsubTopic: pulumi.interpolate`projects/${sccNotifications.projectId}/topics/${sccTopic.name}`,
        streamingConfig: {
            filter: cfg.sccNotificationFilter,
        },
    });

    /*************************************************
      Tags (mirrors tags.tf)
    *************************************************/
    const tagKey = new gcp.tags.TagKey("environment-tag-key", {
        parent: `organizations/${cfg.orgId}`,
        shortName: cfg.createUniqueTagKey ? "environment" : "environment",
        description: "Environment tag key for the foundation.",
    });

    const tagValues: Record<string, gcp.tags.TagValue> = {};
    for (const env of ["bootstrap", "common", "development", "nonproduction", "production", "network"]) {
        tagValues[env] = new gcp.tags.TagValue(`tag-value-${env}`, {
            parent: tagKey.id,
            shortName: env,
            description: `${env} environment tag value`,
        });
    }

    /*************************************************
      Billing Export Dataset
    *************************************************/
    new gcp.bigquery.Dataset("billing-export-dataset", {
        project: orgBillingExport.projectId,
        datasetId: "billing_data",
        friendlyName: "GCP Billing Data",
        location: cfg.billingExportDatasetLocation ?? "US",
    });

    /*************************************************
      Outputs (mirrors outputs.tf)
    *************************************************/
    return {
        org_id: cfg.orgId,
        scc_notification_name: cfg.sccNotificationName,
        parent_resource_id: cfg.parentId,
        parent_resource_type: cfg.parentType,
        common_folder_name: commonFolder.name,
        network_folder_name: networkFolder.name,
        development_folder_name: developmentFolder.name,
        nonproduction_folder_name: nonproductionFolder.name,
        production_folder_name: productionFolder.name,
        org_audit_logs_project_id: orgAuditLogs.projectId,
        org_billing_export_project_id: orgBillingExport.projectId,
        org_secrets_project_id: orgSecrets.projectId,
        common_kms_project_id: commonKms.projectId,
        interconnect_project_id: interconnect.projectId,
        interconnect_project_number: interconnect.projectNumber,
        scc_notifications_project_id: sccNotifications.projectId,
        net_hub_project_id: networkHub?.projectId,
        net_hub_project_number: networkHub?.projectNumber,
        domains_to_allow: cfg.domainsToAllow,
        shared_vpc_projects: Object.fromEntries(
            Object.entries(environmentNetworkProjects).map(([k, v]) => [k, { project_id: v.projectId }])
        ),
        tags: {
            key_id: tagKey.id,
            values: Object.fromEntries(Object.entries(tagValues).map(([k, v]) => [k, v.id])),
        },
    };
};
