# 2-environments

This stage creates per-environment KMS and Secrets projects. This is where environment branches begin.

## Purpose

For each environment (`development`, `nonproduction`, `production`):
- `prj-{d,n,p}-kms` — Environment-level Cloud KMS project
- `prj-{d,n,p}-secrets` — Environment-level Secret Manager project

## Prerequisites

- Completed [1-org](../1-org/README.md) deployment

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-2-environments) for step-by-step instructions.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | Billing account ID | `string` | n/a | yes |
| `org_stack_name` | Stack reference to the 1-org stack | `string` | n/a | yes |
| `project_prefix` | Name prefix for projects | `string` | `"prj"` | no |
| `folder_prefix` | Name prefix for folders | `string` | `"fldr"` | no |
| `default_region` | Default region for resources | `string` | `"us-central1"` | no |
| `project_deletion_policy` | Deletion policy for created projects | `string` | `"PREVENT"` | no |

## Outputs

| Name | Description |
|------|-------------|
| `env_kms_project_id` | Environment KMS project ID |
| `env_secrets_project_id` | Environment Secrets project ID |
| `env_folder_id` | Environment folder ID |
