/**
 * 4-projects/business_unit_1/nonproduction/index.ts
 * Mirrors: 4-projects/business_unit_1/nonproduction/main.tf
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { deploySingleProject } from "../../modules/single_project";

export = async () => {
    const config = new pulumi.Config();
    const orgRef = new pulumi.StackReference("org");
    const envRef = new pulumi.StackReference("env-nonproduction");

    const orgId = config.require("org_id");
    const billingAccount = config.require("billing_account");
    const projectPrefix = config.get("project_prefix") || "prj";
    const folderPrefix = config.get("folder_prefix") || "fldr";
    const businessCode = config.get("business_code") || "bu1";
    const businessUnitName = config.get("business_unit_name") || "business_unit_1";

    // Environment folder from 2-environments
    const envFolder = envRef.getOutput("env_folder") as pulumi.Output<string>;

    // BU folder under env
    const buFolder = new gcp.organizations.Folder("bu-folder", {
        displayName: `${folderPrefix}-nonproduction-${businessCode}`,
        parent: envFolder,
        deletionProtection: config.getBoolean("folder_deletion_protection") ?? true,
    });

    // Example Shared VPC project
    const sharedVpcProject = deploySingleProject("sample-svpc", {
        orgId: orgId,
        billingAccount: billingAccount,
        folderId: buFolder.name,
        environment: "nonproduction",
        projectPrefix: projectPrefix,
        projectSuffix: "sample-svpc",
        businessCode: businessCode,
        applicationName: `${businessCode}-sample-application`,
        billingCode: "1234",
        primaryContact: "example@example.com",
        secondaryContact: "example2@example.com",
        vpc: "svpc",
        activateApis: ["accesscontextmanager.googleapis.com"],
        projectDeletionPolicy: config.get("project_deletion_policy") || "PREVENT",
        saRoles: {
            [`${businessCode}-example-app`]: [
                "roles/compute.instanceAdmin.v1",
                "roles/iam.serviceAccountUser",
                "roles/iam.serviceAccountAdmin",
            ],
        },
    });

    // Example floating project (no VPC)
    const floatingProject = deploySingleProject("sample-floating", {
        orgId: orgId,
        billingAccount: billingAccount,
        folderId: buFolder.name,
        environment: "nonproduction",
        projectPrefix: projectPrefix,
        projectSuffix: "sample-float",
        businessCode: businessCode,
        applicationName: `${businessCode}-sample-floating`,
        billingCode: "1234",
        primaryContact: "example@example.com",
        secondaryContact: "example2@example.com",
        vpc: "none",
        projectDeletionPolicy: config.get("project_deletion_policy") || "PREVENT",
    });


    // Network SVPC Reference
    const netRef = new pulumi.StackReference(`net-svpc-nonproduction`);
    const perimeterName = netRef.getOutput("service_perimeter_name") as pulumi.Output<string>;

    // Confidential Space Project
    const confidentialSpaceProject = deploySingleProject("confidential-space", {
        orgId: orgId,
        billingAccount: billingAccount,
        folderId: buFolder.name,
        environment: "nonproduction",
        projectPrefix: projectPrefix,
        projectSuffix: "conf-space",
        businessCode: businessCode,
        applicationName: `${businessCode}-confidential-space`,
        billingCode: "1234",
        primaryContact: "example@example.com",
        secondaryContact: "example2@example.com",
        vpc: "none",
        activateApis: [
            "confidentialcomputing.googleapis.com",
            "iamcredentials.googleapis.com",
        ],
        projectDeletionPolicy: config.get("project_deletion_policy") || "PREVENT",
    });

    // Attach to VPC-SC perimeter
    new gcp.accesscontextmanager.ServicePerimeterResource(`nonproduction-confidential-space-perimeter-attachment`, {
        perimeterName: perimeterName,
        resource: pulumi.interpolate`projects/${confidentialSpaceProject.projectNumber}`,
    });

    // Workload Identity SA for Confidential Space
    const workloadIdentitySa = new gcp.serviceaccount.Account(`nonproduction-confidential-space-sa`, {
        accountId: "confidential-space-sa",
        displayName: "Confidential Space Workload Identity SA",
        project: confidentialSpaceProject.projectId,
    });

    // CMEK Storage Example Project
    const cmekProject = deploySingleProject("cmek-example", {
        orgId: orgId,
        billingAccount: billingAccount,
        folderId: buFolder.name,
        environment: "nonproduction",
        projectPrefix: projectPrefix,
        projectSuffix: "cmek",
        businessCode: businessCode,
        applicationName: `${businessCode}-cmek`,
        billingCode: "1234",
        primaryContact: "example@example.com",
        secondaryContact: "example2@example.com",
        vpc: "none",
        activateApis: ["cloudkms.googleapis.com", "storage.googleapis.com"],
        projectDeletionPolicy: config.get("project_deletion_policy") || "PREVENT",
    });

    // Keyring and Key for CMEK Example
    const cmekKeyRing = new gcp.kms.KeyRing(`nonproduction-cmek-keyring`, {
        name: `${projectPrefix}-n-${businessCode}-cmek-keyring`,
        location: config.get("default_region") || "us-central1",
        project: cmekProject.projectId,
    });

    const cmekKey = new gcp.kms.CryptoKey(`nonproduction-cmek-key`, {
        name: `${projectPrefix}-n-${businessCode}-cmek-key`,
        keyRing: cmekKeyRing.id,
        rotationPeriod: "7776000s", // 90 days
        purpose: "ENCRYPT_DECRYPT",
    });

    // Storage SA KMS permissions
    const storageSa = cmekProject.projectNumber.apply(num => `serviceAccount:service-${num}@gs-project-accounts.iam.gserviceaccount.com`);
    new gcp.kms.CryptoKeyIAMMember(`nonproduction-cmek-key-binding`, {
        cryptoKeyId: cmekKey.id,
        role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
        member: storageSa,
    });

    // CMEK Encrypted Bucket
    new gcp.storage.Bucket(`nonproduction-cmek-bucket`, {
        name: pulumi.interpolate`${cmekProject.projectId}-cmek-bucket`,
        location: config.get("default_region") || "us-central1",
        project: cmekProject.projectId,
        encryption: {
            defaultKmsKeyName: cmekKey.id,
        },
        uniformBucketLevelAccess: true,
        forceDestroy: config.getBoolean("bucket_force_destroy") ?? false,
    }, { dependsOn: [cmekKey] });

    return {
        bu_folder: buFolder.name,
        shared_vpc_project_id: sharedVpcProject.projectId,
        floating_project_id: floatingProject.projectId,
        confidential_space_project_id: confidentialSpaceProject.projectId,
        confidential_space_project_number: confidentialSpaceProject.projectNumber,
        confidential_space_workload_sa: workloadIdentitySa.email,
        cmek_project_id: cmekProject.projectId,
    };
};
