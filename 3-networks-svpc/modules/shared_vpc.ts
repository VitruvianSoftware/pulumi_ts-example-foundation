/**
 * Copyright 2026 Vitruvian Software
 *
 * Shared VPC Module — creates the VPC network, subnets, firewall rules,
 * DNS zones, NAT, Private Service Connect, and optional VPC peering.
 * Mirrors: 3-networks-(hub-and-spoke|svpc)/modules/shared_vpc/
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Network, FirewallRules, SubnetConfig } from "@vitruviansoftware/pulumi-library";
import { PrivateServiceConnect } from "@vitruviansoftware/pulumi-library";

export interface SharedVpcArgs {
    projectId: pulumi.Input<string>;
    projectNumber?: pulumi.Input<string>;
    environmentCode: string;
    orgId: string;
    parent: string;
    defaultRegion: string;
    defaultRegion2: string;
    /** "hub", "spoke", or null for SVPC mode */
    mode?: "hub" | "spoke" | null;
    subnets: SubnetConfig[];
    secondaryRanges?: Record<string, { rangeName: string; ipCidrRange: string }[]>;
    natEnabled?: boolean;
    windowsActivationEnabled?: boolean;
    dnsEnableInboundForwarding?: boolean;
    dnsEnableLogging?: boolean;
    pscAddress: string;
    /** For spoke mode: hub project ID */
    netHubProjectId?: string;
    /** For spoke mode: hub network self-link */
    netHubNetworkSelfLink?: string;
    /** Custom firewall rules */
    firewallRules?: {
        name: string;
        description?: string;
        direction: "INGRESS" | "EGRESS";
        priority?: number;
        ranges: string[];
        allow?: { protocol: string; ports?: string[] | null }[];
        deny?: { protocol: string; ports?: string[] | null }[];
        enableLogging?: boolean;
    }[];
}

export class SharedVpc extends pulumi.ComponentResource {
    public readonly networkName: pulumi.Output<string>;
    public readonly networkSelfLink: pulumi.Output<string>;
    public readonly networkId: pulumi.Output<string>;
    public readonly network: Network;

    constructor(name: string, args: SharedVpcArgs, opts?: pulumi.ComponentResourceOptions) {
        super("foundation:modules:SharedVpc", name, args, opts);

        const modeStr = args.mode === "hub" ? "-hub" : args.mode === "spoke" ? "-spoke" : "";
        const vpcName = `${args.environmentCode}-svpc${modeStr}`;
        const networkName = `vpc-${vpcName}`;

        // Create VPC network
        this.network = new Network(`${name}-vpc`, {
            projectId: args.projectId,
            networkName: networkName,
            deleteDefaultInternetGatewayRoutes: true,
            sharedVpcHost: true,
            subnets: args.subnets,
            secondaryRanges: args.secondaryRanges,
        }, { parent: this });

        this.networkName = this.network.networkName;
        this.networkSelfLink = this.network.networkSelfLink;
        this.networkId = this.network.networkId;

        // DNS policy
        new gcp.dns.Policy(`${name}-dns-policy`, {
            project: args.projectId,
            name: `dp-${vpcName}-default-policy`,
            enableInboundForwarding: args.dnsEnableInboundForwarding ?? true,
            enableLogging: args.dnsEnableLogging ?? true,
            networks: [{
                networkUrl: this.network.networkSelfLink,
            }],
        }, { parent: this });

        // Private Google APIs DNS zones
        for (const [zoneName, dnsName] of [
            ["googleapis", "googleapis.com."],
            ["gcr", "gcr.io."],
            ["pkg-dev", "pkg.dev."],
            ["notebooks-api", "notebooks.cloud.google.com."],
            ["notebooks-gke", "notebooks.googleusercontent.com."],
        ]) {
            new gcp.dns.ManagedZone(`${name}-dns-${zoneName}`, {
                project: args.projectId,
                name: `dz-${vpcName}-${zoneName}`,
                dnsName: dnsName,
                description: `Private ${zoneName} zone`,
                visibility: "private",
                privateVisibilityConfig: {
                    networks: [{
                        networkUrl: this.network.networkSelfLink,
                    }],
                },
            }, { parent: this });
        }

        // Private Service Connect
        new PrivateServiceConnect(`${name}-psc`, {
            projectId: args.projectId,
            networkSelfLink: this.network.networkSelfLink,
            address: args.pscAddress,
            forwardingRuleName: `fr-${vpcName}-psc`,
        }, { parent: this });

        // NAT (if enabled)
        if (args.natEnabled !== false) {
            const natRouter = new gcp.compute.Router(`${name}-nat-router-${args.defaultRegion}`, {
                name: `cr-${vpcName}-${args.defaultRegion}-nat`,
                project: args.projectId,
                region: args.defaultRegion,
                network: this.network.networkId,
            }, { parent: this });

            new gcp.compute.RouterNat(`${name}-nat-${args.defaultRegion}`, {
                name: `rn-${vpcName}-${args.defaultRegion}-egress`,
                project: args.projectId,
                router: natRouter.name,
                region: args.defaultRegion,
                natIpAllocateOption: "AUTO_ONLY",
                sourceSubnetworkIpRangesToNat: "ALL_SUBNETWORKS_ALL_IP_RANGES",
                logConfig: {
                    enable: true,
                    filter: "TRANSLATIONS_ONLY",
                },
            }, { parent: this });

            // Second region NAT
            const natRouter2 = new gcp.compute.Router(`${name}-nat-router-${args.defaultRegion2}`, {
                name: `cr-${vpcName}-${args.defaultRegion2}-nat`,
                project: args.projectId,
                region: args.defaultRegion2,
                network: this.network.networkId,
            }, { parent: this });

            new gcp.compute.RouterNat(`${name}-nat-${args.defaultRegion2}`, {
                name: `rn-${vpcName}-${args.defaultRegion2}-egress`,
                project: args.projectId,
                router: natRouter2.name,
                region: args.defaultRegion2,
                natIpAllocateOption: "AUTO_ONLY",
                sourceSubnetworkIpRangesToNat: "ALL_SUBNETWORKS_ALL_IP_RANGES",
                logConfig: {
                    enable: true,
                    filter: "TRANSLATIONS_ONLY",
                },
            }, { parent: this });
        }

        // Default firewall rules
        const defaultFirewallRules = new FirewallRules(`${name}-default-fw`, {
            projectId: args.projectId,
            networkName: this.network.networkId,
            rules: [
                {
                    name: `fw-${vpcName}-65530-e-d-all-all-all`,
                    description: "Lower priority deny all egress",
                    direction: "EGRESS",
                    priority: 65530,
                    ranges: ["0.0.0.0/0"],
                    deny: [{ protocol: "all" }],
                    logConfig: { metadata: "INCLUDE_ALL_METADATA" },
                },
                {
                    name: `fw-${vpcName}-65531-i-d-all-all-tcp-udp`,
                    description: "Lower priority deny all ingress",
                    direction: "INGRESS",
                    priority: 65531,
                    ranges: ["0.0.0.0/0"],
                    deny: [
                        { protocol: "tcp" },
                        { protocol: "udp" },
                    ],
                    logConfig: { metadata: "INCLUDE_ALL_METADATA" },
                },
                {
                    name: `fw-${vpcName}-1000-i-a-all-all-all-rfc1918`,
                    description: "Allow internal traffic (RFC1918)",
                    direction: "INGRESS",
                    priority: 1000,
                    ranges: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
                    allow: [{ protocol: "all" }],
                    logConfig: { metadata: "INCLUDE_ALL_METADATA" },
                },
            ],
        }, { parent: this });

        this.registerOutputs({
            networkName: this.networkName,
            networkSelfLink: this.networkSelfLink,
        });
    }
}
