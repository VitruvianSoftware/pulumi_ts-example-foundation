import re
with open("0-bootstrap/index.ts", "r") as f:
    t = f.read()

t = t.replace('await deployServiceAccounts(cfg, seedProject, cicdOutputs.cicdProjectId);', 'await deployServiceAccounts(cfg, seedProject, cicdOutputs.cicdProjectId, groupOutputs.dependsOn);')

t = re.sub(r'(new gcp\.organizations\.IAMMember\([^\{]+\{[\s\S]*?\})\);', r'\1, { dependsOn: groupOutputs.dependsOn });', t)

with open("0-bootstrap/index.ts", "w") as f:
    f.write(t)
