# 4-projects

This stage creates business unit project structures attached to the Shared VPC.

## Purpose

For each business unit and environment:
- BU subfolder under each environment folder
- Three project types: **SVPC-attached**, **floating**, **peering**
- SVPC service project attachment to the host network project
- Infrastructure pipeline project (`prj-c-{bu}-infra-pipeline`) under common folder

## Prerequisites

- Completed [3-networks](../3-networks-svpc/README.md) deployment (either SVPC or Hub-and-Spoke)
- The **shared** environment must be deployed before per-environment projects

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-4-projects) for instructions.

> **Tip:** To create additional business units, copy the `business_unit_1` directory
> and update business codes and subnet ranges.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | Billing account ID | `string` | n/a | yes |
| `org_stack_name` | Stack reference to the 1-org stack | `string` | n/a | yes |
| `net_stack_name` | Stack reference to the 3-networks stack | `string` | n/a | yes |
| `project_prefix` | Name prefix for projects | `string` | `"prj"` | no |
| `folder_prefix` | Name prefix for folders | `string` | `"fldr"` | no |
| `business_code` | Short code for the business unit | `string` | `"bu1"` | no |
| `business_unit` | Full name of the business unit | `string` | `"business_unit_1"` | no |
| `project_deletion_policy` | Deletion policy for created projects | `string` | `"PREVENT"` | no |

## Outputs

| Name | Description |
|------|-------------|
| `svpc_project_id` | SVPC-attached project ID |
| `floating_project_id` | Floating project ID |
| `peering_project_id` | Peering project ID |
| `infra_pipeline_project_id` | Infrastructure pipeline project ID |
