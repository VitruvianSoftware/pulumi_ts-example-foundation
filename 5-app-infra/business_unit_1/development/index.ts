/**
 * 5-app-infra/business_unit_1/development/index.ts
 * Mirrors: 5-app-infra/business_unit_1/development/main.tf
 * Deploys example compute instances into the BU project.
 */

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { InstanceTemplate, ComputeInstance } from "@vitruviansoftware/foundation-instance-template";

export = async () => {
    const config = new pulumi.Config();
    const projectRef = new pulumi.StackReference("projects-bu1-development");

    const projectId = projectRef.getOutput("shared_vpc_project_id") as pulumi.Output<string>;
    const region = config.get("region") || "us-central1";
    const machineType = config.get("machine_type") || "f1-micro";
    const numInstances = config.getNumber("num_instances") || 1;
    const hostname = config.get("hostname") || "example-app";

    // Service account for the compute instance
    // createIgnoreAlreadyExists matches Go foundation's 5-app-infra/env_base.go
    const sa = new gcp.serviceaccount.Account("example-app-sa", {
        project: projectId,
        accountId: "sa-example-app",
        displayName: "Example app service Account",
        createIgnoreAlreadyExists: true,
    });

    // Instance template
    const template = new InstanceTemplate("example-template", {
        projectId: projectId,
        namePrefix: "example-app",
        machineType: machineType,
        region: region,
        sourceImageFamily: "debian-12",
        sourceImageProject: "debian-cloud",
        diskSizeGb: 100,
        diskType: "pd-ssd",
        subnetwork: `projects/${config.get("shared_vpc_host_project") || ""}/regions/${region}/subnetworks/sb-d-svpc-${region}`,
        serviceAccount: {
            email: sa.email,
            scopes: ["compute-rw"],
        },
        metadata: {
            "block-project-ssh-keys": "true",
        },
    });

    // Compute instance
    const instance = new ComputeInstance("example-instance", {
        projectId: projectId,
        zone: `${region}-a`,
        instanceName: hostname,
        instanceTemplate: template.templateSelfLink,
        subnetwork: `projects/${config.get("shared_vpc_host_project") || ""}/regions/${region}/subnetworks/sb-d-svpc-${region}`,
        numInstances: numInstances,
    });

    return {
        project_id: projectId,
        region: region,
        instances_self_links: instance.instances.map(i => i.selfLink),
    };
};
