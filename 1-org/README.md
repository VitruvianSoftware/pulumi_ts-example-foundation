# 1-org

This stage sets up the organizational folder structure, shared projects, organization policies, and centralized logging.

## Purpose

- Creates the **folder hierarchy**: `fldr-common`, `fldr-network`, and per-environment folders
- Creates **shared projects**: logging, billing export, SCC, KMS, Secrets, DNS Hub, Interconnect
- Enforces **14+ organization policies** (serial port disable, OS Login, SA key creation block, etc.)
- Configures **centralized logging** via org-level sinks to Storage, Pub/Sub, and Logging buckets
- Sets up **SCC notification** streaming to Pub/Sub
- Creates **organization-level tags** for environment classification

## Prerequisites

- Completed [0-bootstrap](../0-bootstrap/README.md) deployment
- Bootstrap stack outputs available via Stack Reference

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-1-organization) for step-by-step instructions.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | Billing account ID | `string` | n/a | yes |
| `remote_state_bucket` | Bootstrap state bucket name or stack reference | `string` | n/a | yes |
| `project_prefix` | Name prefix for projects | `string` | `"prj"` | no |
| `folder_prefix` | Name prefix for folders | `string` | `"fldr"` | no |
| `default_region` | Default region for resources | `string` | `"us-central1"` | no |
| `parent_folder` | Optional parent folder ID | `string` | `""` | no |
| `enable_hub_and_spoke` | Enable Hub and Spoke network mode | `boolean` | `false` | no |
| `domains_to_allow` | Domains allowed in domain-restricted sharing policy | `string[]` | `[]` | no |
| `scc_notification_name` | Name for the SCC notification config | `string` | `"scc-notify"` | no |
| `scc_notification_filter` | Filter for SCC notifications | `string` | `"state = \"ACTIVE\""` | no |
| `create_unique_tag_key` | Create a unique tag key name | `boolean` | `false` | no |
| `enable_cai_monitoring` | Enable Cloud Asset Inventory monitoring | `boolean` | `false` | no |
| `log_export_storage_force_destroy` | Allow destroying log export bucket with objects | `boolean` | `false` | no |
| `log_export_storage_versioning` | Enable versioning on log export bucket | `boolean` | `false` | no |
| `project_deletion_policy` | Deletion policy for created projects | `string` | `"PREVENT"` | no |
| `folder_deletion_protection` | Prevent destroying folders | `boolean` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| `common_folder_name` | Common folder ID |
| `network_folder_name` | Network folder ID |
| `development_folder_name` | Development folder ID |
| `nonproduction_folder_name` | Non-production folder ID |
| `production_folder_name` | Production folder ID |
| `logging_project_id` | Centralized logging project ID |
| `billing_export_project_id` | Billing export project ID |
| `scc_project_id` | SCC notifications project ID |
| `org_audit_logs_project_id` | Audit logs project ID |
| `dns_hub_project_id` | DNS hub project ID |
| `interconnect_project_id` | Interconnect project ID |
| `scc_notification_name` | SCC notification configuration name |
| `tags` | Organization-level tags |

## File Structure

| File | Description |
|------|-------------|
| `index.ts` | Orchestrates the org stage: folders, projects, policies, logging, SCC, tags, CAI monitoring |
| `config.ts` | Configuration loading for organization-level settings |
