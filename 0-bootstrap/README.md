# 0-bootstrap

This stage bootstraps a Google Cloud organization, creating all the required resources and permissions to start using the Pulumi Foundation. This step also configures a [CI/CD Pipeline](/docs/GLOSSARY.md#foundation-cicd-pipeline) for foundations code in subsequent stages.

## Purpose

The purpose of this step is to bootstrap a Google Cloud organization by creating:
- A **Seed Project** (`prj-b-seed`) for state storage and service accounts
- A **CI/CD Project** (`prj-b-cicd`) with Workload Identity Federation for GitHub Actions
- **Granular Service Accounts** — one per stage with least-privilege IAM

## Prerequisites

See the [Requirements](../ONBOARDING.md#requirements) section in the Onboarding guide.

## Deploying with GitHub Actions

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-0-bootstrap) for step-by-step instructions.

## Deploying with GitLab

See [README-GitLab.md](./README-GitLab.md) for GitLab-specific instructions.

## Troubleshooting

See [troubleshooting](../docs/TROUBLESHOOTING.md) if you run into issues during this step.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | The ID of the billing account to associate projects with | `string` | n/a | yes |
| `group_org_admins` | Email of the organization admins group | `string` | n/a | yes |
| `group_billing_admins` | Email of the billing admins group | `string` | n/a | yes |
| `billing_data_users` | Email of the billing data users group | `string` | n/a | yes |
| `audit_data_users` | Email of the audit data users group | `string` | n/a | yes |
| `project_prefix` | Name prefix for projects created | `string` | `"prj"` | no |
| `folder_prefix` | Name prefix for folders created | `string` | `"fldr"` | no |
| `bucket_prefix` | Name prefix for state bucket | `string` | `"bkt"` | no |
| `default_region` | Default region to create resources | `string` | `"us-central1"` | no |
| `default_region_2` | Secondary default region | `string` | `"us-west1"` | no |
| `default_region_gcs` | Default region for GCS resources (case-sensitive) | `string` | `"US"` | no |
| `default_region_kms` | Default region for KMS resources | `string` | `"us"` | no |
| `parent_folder` | Optional parent folder ID (instead of org root) | `string` | `""` | no |
| `bucket_force_destroy` | Allow destroying state bucket with objects | `boolean` | `false` | no |
| `bucket_tfstate_kms_force_destroy` | Allow destroying KMS keys for state bucket | `boolean` | `false` | no |
| `project_deletion_policy` | Deletion policy for created projects | `string` | `"PREVENT"` | no |
| `folder_deletion_protection` | Prevent Terraform from destroying folders | `boolean` | `true` | no |
| `org_policy_admin_role` | Additional Org Policy Admin role for admin group | `boolean` | `false` | no |
| `random_suffix` | Append random suffix to project IDs | `boolean` | `true` | no |
| `create_required_groups` | Create required Cloud Identity groups | `boolean` | `false` | no |
| `create_optional_groups` | Create optional Cloud Identity groups | `boolean` | `false` | no |
| `gcp_security_reviewer` | Email for the security reviewer group | `string` | `""` | no |
| `gcp_network_viewer` | Email for the network viewer group | `string` | `""` | no |
| `gcp_scc_admin` | Email for the SCC admin group | `string` | `""` | no |
| `gcp_global_secrets_admin` | Email for the global secrets admin group | `string` | `""` | no |
| `gcp_kms_admin` | Email for the KMS admin group | `string` | `""` | no |

## Outputs

| Name | Description |
|------|-------------|
| `seed_project_id` | Project where service accounts and core APIs are enabled |
| `cicd_project_id` | Project where CI/CD infrastructure resides |
| `gcs_bucket_tfstate` | Bucket used for storing Pulumi state |
| `bootstrap_step_terraform_service_account_email` | Bootstrap Step Service Account |
| `organization_step_terraform_service_account_email` | Organization Step Service Account |
| `environment_step_terraform_service_account_email` | Environment Step Service Account |
| `networks_step_terraform_service_account_email` | Networks Step Service Account |
| `projects_step_terraform_service_account_email` | Projects Step Service Account |
| `wif_provider_name` | Workload Identity Federation provider name |
| `common_config` | Common configuration data for other steps |
