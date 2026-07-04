import os

envs = ['development', 'nonproduction', 'production']
base = '/Users/james/Workspace/gh/infrastructure/vitruvian/pulumi_ts-example-foundation/5-app-infra/business_unit_1/'

for env in envs:
    path = os.path.join(base, env, 'index.ts')
    with open(path, 'r') as f:
        content = f.read()
    
    # Check if we need to add bootstrapRef
    if 'bootstrapRef' not in content:
        replace_str = '''const projectRef = new pulumi.StackReference(`projects-bu1-${env}`);
    const bootstrapRef = new pulumi.StackReference("bootstrap");
    const cloudbuildProjectId = bootstrapRef.getOutput("cloudbuild_project_id") as pulumi.Output<string>;'''
        content = content.replace(f'const projectRef = new pulumi.StackReference("projects-bu1-{env}");', replace_str)

    # Check if we need to fix tee-image-reference
    if 'fake-project' in content:
        content = content.replace(
            '"tee-image-reference": `${region}-docker.pkg.dev/fake-project/tf-runners/confidential_space_image:latest`,',
            '"tee-image-reference": pulumi.interpolate`${region}-docker.pkg.dev/${cloudbuildProjectId}/tf-runners/confidential_space_image:latest`,'
        )
    
    with open(path, 'w') as f:
        f.write(content)
print("done")
