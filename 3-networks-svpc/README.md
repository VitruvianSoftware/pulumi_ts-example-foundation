# 3-networks-svpc

This stage deploys the Shared VPC network topology.

## Purpose

For each environment:
- Multi-region subnets with GKE secondary ranges (pod + service CIDRs)
- Shared VPC host project designation
- Hierarchical firewall policies (IAP, health checks, Windows KMS)
- DNS policy with logging and inbound forwarding
- Cloud NAT on all regions with error logging
- Private Service Access for managed services
- Restricted Google APIs routing (`199.36.153.4/30`)
- Default internet routes removed

## Prerequisites

- Completed [2-environments](../2-environments/README.md) deployment
- The **shared** environment must be deployed before per-environment networks

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-3-networks) for instructions.

> **Important:** Deploy the `shared` stack first (DNS Hub, Interconnect), then promote through environments.

## Configuration Reference

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `org_id` | GCP Organization ID | `string` | n/a | yes |
| `billing_account` | Billing account ID | `string` | n/a | yes |
| `org_stack_name` | Stack reference to the 1-org stack | `string` | n/a | yes |
| `env_stack_name` | Stack reference to the 2-environments stack | `string` | n/a | yes |
| `default_region1` | Primary region for subnets | `string` | `"us-central1"` | no |
| `default_region2` | Secondary region for subnets | `string` | `"us-west1"` | no |
| `dns_enable_inbound_forwarding` | Enable DNS inbound forwarding | `boolean` | `true` | no |
| `dns_enable_logging` | Enable DNS query logging | `boolean` | `true` | no |
| `nat_enabled` | Enable Cloud NAT | `boolean` | `true` | no |
| `nat_num_addresses_region1` | Number of NAT IPs for region 1 | `number` | `2` | no |
| `nat_num_addresses_region2` | Number of NAT IPs for region 2 | `number` | `2` | no |
| `windows_activation_enabled` | Enable Windows KMS activation firewall rule | `boolean` | `false` | no |
| `enable_partner_interconnect` | Enable partner interconnect | `boolean` | `false` | no |
| `firewall_enable_logging` | Enable firewall logging | `boolean` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| `network_name` | VPC network name |
| `network_self_link` | VPC network self-link |
| `subnets` | Subnet details (name, region, CIDR) |
| `dns_hub_project_id` | DNS hub project ID |

## File Structure

| File | Description |
|------|-------------|
| `envs/development/index.ts` | Development SVPC network deployment |
| `envs/nonproduction/index.ts` | Non-production SVPC network deployment |
| `envs/production/index.ts` | Production SVPC network deployment |
| `envs/shared/index.ts` | Shared resources (DNS Hub, hierarchical FW) |
| `modules/shared_vpc.ts` | Shared VPC module: VPC, subnets, firewall, DNS, NAT, PSA |
