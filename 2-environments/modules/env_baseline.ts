/**
 * Copyright 2026 Vitruvian Software
 *
 * Environment Baseline Module
 * Mirrors: 2-environments/modules/env_baseline/
 * Creates environment folders, KMS projects, and Secrets projects.
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { ProjectFactory } from "@vitruviansoftware/pulumi-library";

export interface EnvBaselineArgs {
    env: string;
    environmentCode: string;
    orgId: string;
    billingAccount: string;
    projectPrefix: string;
    folderPrefix: string;
    parent: string;
    tags: { key_id: pulumi.Input<string>; values: Record<string, pulumi.Input<string>> };
    requiredGroups: Record<string, string>;
    projectDeletionPolicy: string;
    folderDeletionProtection: boolean;
    projectBudget: Record<string, any>;
    assuredWorkloadConfiguration?: {
        enabled?: boolean;
        location?: string;
        displayName?: string;
        complianceRegime?: string;
        resourceType?: string;
    };
}

export interface EnvBaselineOutputs {
    envFolder: gcp.organizations.Folder;
    envKmsProjectId: pulumi.Output<string>;
    envSecretsProjectId: pulumi.Output<string>;
}

export function deployEnvBaseline(args: EnvBaselineArgs): EnvBaselineOutputs {
    const name = args.env;
    const envCode = args.environmentCode;

    // Environment folder
    const envFolder = new gcp.organizations.Folder(`${name}-env-folder`, {
        displayName: `${args.folderPrefix}-${name}`,
        parent: args.parent,
        deletionProtection: args.folderDeletionProtection,
    });

    // Wait for folder propagation (mirrors time_sleep in TF)
    // In Pulumi, we use dependsOn chains instead.

    // Environment KMS project
    const envKms = new ProjectFactory(`${name}-env-kms`, {
        name: `${args.projectPrefix}-${envCode}-kms`,
        orgId: args.orgId,
        billingAccount: args.billingAccount,
        folderId: envFolder.name,
        deletionPolicy: args.projectDeletionPolicy,
        activateApis: ["logging.googleapis.com", "cloudkms.googleapis.com"],
        labels: {
            environment: name,
            application_name: "env-kms",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: envCode,
            vpc: "none",
        },
        budgetAmount: args.projectBudget.kms_budget_amount,
        budgetAlertSpentPercents: args.projectBudget.kms_alert_spent_percents,
        budgetAlertPubsubTopic: args.projectBudget.kms_alert_pubsub_topic,
        budgetAlertSpendBasis: args.projectBudget.kms_budget_alert_spend_basis,
    });

    // Environment Secrets project
    const envSecrets = new ProjectFactory(`${name}-env-secrets`, {
        name: `${args.projectPrefix}-${envCode}-secrets`,
        orgId: args.orgId,
        billingAccount: args.billingAccount,
        folderId: envFolder.name,
        deletionPolicy: args.projectDeletionPolicy,
        activateApis: ["logging.googleapis.com", "secretmanager.googleapis.com"],
        labels: {
            environment: name,
            application_name: "env-secrets",
            billing_code: "1234",
            primary_contact: "example1",
            secondary_contact: "example2",
            business_code: "shared",
            env_code: envCode,
            vpc: "none",
        },
        budgetAmount: args.projectBudget.secret_budget_amount,
        budgetAlertSpentPercents: args.projectBudget.secret_alert_spent_percents,
        budgetAlertPubsubTopic: args.projectBudget.secret_alert_pubsub_topic,
        budgetAlertSpendBasis: args.projectBudget.secret_budget_alert_spend_basis,
    });

    // Tag binding for environment folder
    if (args.tags && args.tags.values[name]) {
        new gcp.tags.TagBinding(`${name}-folder-tag`, {
            parent: pulumi.interpolate`//cloudresourcemanager.googleapis.com/${envFolder.name}`,
            tagValue: args.tags.values[name],
        });
    }

    return {
        envFolder,
        envKmsProjectId: envKms.projectId,
        envSecretsProjectId: envSecrets.projectId,
    };
}
