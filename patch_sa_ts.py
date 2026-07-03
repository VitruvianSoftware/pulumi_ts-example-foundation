import re
with open("0-bootstrap/sa.ts", "r") as f:
    t = f.read()
t = t.replace('): Promise<GranularSAs> {', 'groupDependsOn?: pulumi.Resource[],\n): Promise<GranularSAs> {\n    const opts = { dependsOn: groupDependsOn };')
t = re.sub(r'(new ParentIamMember\([^\{]+\{[\s\S]*?\})\);', r'\1, opts);', t)
t = re.sub(r'(new ParentIamRemoveRole\([^\{]+\{[\s\S]*?\})\);', r'\1, opts);', t)
t = re.sub(r'(new gcp\.billing\.AccountIamMember\([^\{]+\{[\s\S]*?\})\);', r'\1, opts);', t)
with open("0-bootstrap/sa.ts", "w") as f:
    f.write(t)
