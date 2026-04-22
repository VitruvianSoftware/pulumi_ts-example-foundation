/**
 * 3-networks-svpc/envs/development/index.ts
 * SVPC network for development — mirrors envs/development/main.tf
 */

import * as pulumi from "@pulumi/pulumi";
import { SharedVpc } from "../../modules/shared_vpc";

export = async () => {
    const config = new pulumi.Config();
    const orgRef = new pulumi.StackReference("org");

    const sharedVpcProjects = orgRef.getOutput("shared_vpc_projects") as pulumi.Output<Record<string, { project_id: string }>>;
    const envProjectId = sharedVpcProjects.apply(p => p["development"]?.project_id || "");

    const defaultRegion = config.get("default_region") || "us-central1";
    const defaultRegion2 = config.get("default_region_2") || "us-west1";

    const svpc = new SharedVpc("development-network", {
        projectId: envProjectId,
        environmentCode: "d",
        orgId: config.require("org_id"),
        parent: config.require("parent"),
        defaultRegion: defaultRegion,
        defaultRegion2: defaultRegion2,
        mode: null,
        natEnabled: true,
        dnsEnableInboundForwarding: true,
        dnsEnableLogging: true,
        pscAddress: "10.2.0.10",
        subnets: [
            {
                subnetName: `sb-d-svpc-${defaultRegion}`,
                subnetIp: "10.0.64.0/21",
                subnetRegion: defaultRegion,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "development SVPC subnet in primary region",
            },
            {
                subnetName: `sb-d-svpc-${defaultRegion2}`,
                subnetIp: "10.1.64.0/21",
                subnetRegion: defaultRegion2,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "development SVPC subnet in secondary region",
            },
        ],
    });

    return {
        network_name: svpc.networkName,
        network_self_link: svpc.networkSelfLink,
    };
};
