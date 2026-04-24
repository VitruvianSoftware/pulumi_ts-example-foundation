/**
 * 3-networks-svpc/envs/production/index.ts
 * SVPC network for production — mirrors envs/production/main.tf
 */

import * as pulumi from "@pulumi/pulumi";
import { SharedVpc } from "../../modules/shared_vpc";
import { VpcServiceControls, DEFAULT_RESTRICTED_SERVICES } from "@vitruviansoftware/foundation-vpc-service-controls";

export = async () => {
    const config = new pulumi.Config();
    const orgRef = new pulumi.StackReference("org");

    const sharedVpcProjects = orgRef.getOutput("shared_vpc_projects") as pulumi.Output<Record<string, { project_id: string }>>;
    const envProjectId = sharedVpcProjects.apply(p => p["production"]?.project_id || "");

    const defaultRegion = config.get("default_region") || "us-central1";
    const defaultRegion2 = config.get("default_region_2") || "us-west1";

    const svpc = new SharedVpc("production-network", {
        projectId: envProjectId,
        environmentCode: "p",
        orgId: config.require("org_id"),
        parent: config.require("parent"),
        defaultRegion: defaultRegion,
        defaultRegion2: defaultRegion2,
        mode: null,
        natEnabled: true,
        dnsEnableInboundForwarding: true,
        dnsEnableLogging: true,
        pscAddress: "10.2.0.30",
        subnets: [
            {
                subnetName: `sb-p-svpc-${defaultRegion}`,
                subnetIp: "10.0.192.0/21",
                subnetRegion: defaultRegion,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "production SVPC subnet in primary region",
            },
            {
                subnetName: `sb-p-svpc-${defaultRegion2}`,
                subnetIp: "10.1.192.0/21",
                subnetRegion: defaultRegion2,
                subnetPrivateAccess: true,
                subnetFlowLogs: true,
                description: "production SVPC subnet in secondary region",
            },
        ],
    });

    // VPC Service Controls Perimeter (was missing — mirrors Go foundation's section 10)
    const policyId = config.get("access_context_manager_policy_id") || "";
    let perimeterName: pulumi.Output<string> | undefined;

    if (policyId) {
        const vpcScMembers = config.getObject<string[]>("vpc_sc_members") || [];
        const vpcScProjects = config.getObject<string[]>("vpc_sc_project_numbers") || [];

        const vpcSc = new VpcServiceControls("vpc-sc-perimeter", {
            policyId,
            prefix: "p_svpc",
            members: vpcScMembers,
            membersDryRun: vpcScMembers,
            projectNumbers: vpcScProjects,
            restrictedServices: DEFAULT_RESTRICTED_SERVICES,
            enforce: config.getBoolean("enforce_vpc_sc") ?? true,
        });

        perimeterName = vpcSc.perimeter.name;
    }

    return {
        network_name: svpc.networkName,
        network_self_link: svpc.networkSelfLink,
        service_perimeter_name: perimeterName,
    };
};

