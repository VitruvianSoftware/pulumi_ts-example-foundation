/**
 * 3-networks-hub-and-spoke/envs/development/index.ts
 * Per-environment spoke network — mirrors envs/development/main.tf
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { SharedVpc } from "../../modules/shared_vpc";

export = async () => {
    const config = new pulumi.Config();
    const orgRef = new pulumi.StackReference("org");
    const envRef = new pulumi.StackReference("env-development");

    const sharedVpcProjects = orgRef.getOutput("shared_vpc_projects") as pulumi.Output<Record<string, { project_id: string }>>;
    const envProjectId = sharedVpcProjects.apply(p => p["development"]?.project_id || "");

    const defaultRegion = config.get("default_region") || "us-central1";
    const defaultRegion2 = config.get("default_region_2") || "us-west1";
    const envCode = "d";

    const spokeVpc = new SharedVpc("development-network", {
        projectId: envProjectId,
        environmentCode: envCode,
        orgId: config.require("org_id"),
        parent: config.require("parent"),
        defaultRegion: defaultRegion,
        defaultRegion2: defaultRegion2,
        mode: "spoke",
        natEnabled: true,
        dnsEnableInboundForwarding: true,
        dnsEnableLogging: true,
        pscAddress: "10.2.0.10",
        netHubProjectId: config.get("net_hub_project_id"),
        subnets: [
            {
                subnetName: `sb-${envCode}-svpc-spoke-${defaultRegion}`,
                subnetIp: "10.0.64.0/21",
                subnetRegion: defaultRegion,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "development spoke subnet in primary region",
            },
            {
                subnetName: `sb-${envCode}-svpc-spoke-${defaultRegion2}`,
                subnetIp: "10.1.64.0/21",
                subnetRegion: defaultRegion2,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "development spoke subnet in secondary region",
            },
        ],
    });

    return {
        network_name: spokeVpc.networkName,
        network_self_link: spokeVpc.networkSelfLink,
    };
};
