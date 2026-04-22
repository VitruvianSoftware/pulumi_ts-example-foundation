# 3-networks-hub-and-spoke

This stage deploys the Hub-and-Spoke network topology.

## Purpose

Same as [3-networks-svpc](../3-networks-svpc/README.md) but with a centralized hub VPC:
- Hub VPC with central routing
- Spoke VPC per environment with GKE secondary ranges
- Bidirectional VPC peering with custom route export/import
- Same firewall, DNS, NAT, and routing as SVPC

## Prerequisites

- Completed [2-environments](../2-environments/README.md) deployment
- The **shared** environment must be deployed before per-environment networks

## Deploying

See [ONBOARDING.md](../ONBOARDING.md#deploying-step-3-networks) for instructions.

## Configuration Reference

Same as [3-networks-svpc](../3-networks-svpc/README.md#configuration-reference), with additional:

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `enable_hub_and_spoke_transitivity` | Enable transitivity between spokes via the hub | `boolean` | `false` | no |

## Outputs

Same as [3-networks-svpc](../3-networks-svpc/README.md#outputs), with additional:

| Name | Description |
|------|-------------|
| `hub_network_name` | Hub VPC network name |
| `hub_network_self_link` | Hub VPC network self-link |
