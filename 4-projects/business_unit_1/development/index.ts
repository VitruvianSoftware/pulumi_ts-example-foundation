/**
 * 4-projects/business_unit_1/development/index.ts
 * Mirrors: 4-projects/business_unit_1/development/main.tf
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { deploySingleProject } from "../../modules/single_project";

export = async () => {
    const config = new pulumi.Config();
    const orgRef = new pulumi.StackReference("org");
    const envRef = new pulumi.StackReference("env-development");

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
        displayName: `${folderPrefix}-development-${businessCode}`,
        parent: envFolder,
        deletionProtection: config.getBoolean("folder_deletion_protection") ?? true,
    });

    // Example Shared VPC project
    const sharedVpcProject = deploySingleProject("sample-svpc", {
        orgId: orgId,
        billingAccount: billingAccount,
        folderId: buFolder.name,
        environment: "development",
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
        environment: "development",
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

    return {
        bu_folder: buFolder.name,
        shared_vpc_project_id: sharedVpcProject.projectId,
        floating_project_id: floatingProject.projectId,
    };
};
