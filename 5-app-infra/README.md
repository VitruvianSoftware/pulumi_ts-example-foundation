# 5-app-infra

This stage deploys sample application infrastructure within the business unit projects created in Stage 4.

## Purpose

Demonstrates deploying application resources using the infra pipeline:
- Compute Engine instance with instance template
- Service account with least-privilege roles

## Prerequisites

- Completed [4-projects](../4-projects/README.md) deployment

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-5-app-infrastructure) for instructions.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | Billing account ID | `string` | n/a | yes |
| `proj_stack_name` | Stack reference to the 4-projects stack | `string` | n/a | yes |
| `business_code` | Short code for the business unit | `string` | `"bu1"` | no |
| `instance_region` | Region for the Compute Engine instance | `string` | `"us-central1"` | no |
| `machine_type` | Machine type for the instance | `string` | `"f1-micro"` | no |
| `project_deletion_policy` | Deletion policy for created projects | `string` | `"PREVENT"` | no |

## Outputs

| Name | Description |
|------|-------------|
| `instance_name` | Name of the created Compute Engine instance |
| `instance_zone` | Zone where the instance is deployed |
| `service_account_email` | Service account email for the instance |
