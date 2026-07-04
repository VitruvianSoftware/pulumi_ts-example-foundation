# Changelog

All notable changes to the Pulumi Example Foundation (TypeScript) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2026-07-04)


### ⚠ BREAKING CHANGES

* None — @types/node@22 is backward-compatible with the project's TypeScript configuration (skipLibCheck: true).

### Features

* **3-networks:** expose VPC flow log options and DNS/firewall logging toggles ([#34](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/34)) ([b0a737c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b0a737c388a268fda8d9f9d038cad239a57087f4))
* achieve full output parity with Terraform reference architecture ([#17](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/17)) ([325ca3f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/325ca3f4a8aa0cf64a5a3802058118941309b28a))
* add Assured Workload support, IAM/contact modules, and CAI monitoring function ([fe71529](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/fe71529cfaab1cb7fb50b8a4a50f825d6a884dd8))
* add E2E testing infrastructure ([#9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/9)) ([8988845](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/898884580271d07ab45bcb059de97a36652cc8be))
* add Pulumi stack configuration examples and update documentation across foundation modules ([950313c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/950313c142ab30e0854ce3d9ce74610c5b9ae674))
* add release-please automation for proper versioning ([#1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/1)) ([be12068](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/be120686d88269dfa75d284a9a1f5c3db6891f7d))
* add TF-only informational outputs and Go-only parity enhancements to TS foundation ([3c6045e](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/3c6045e17d6333dcdd05742db771ba53749d9e72))
* append seed suffix to state bucket name for uniqueness ([74399b7](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/74399b757f77eae641d969ef8ea747dc66873322))
* complete output parity and fix all compilation errors ([#18](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/18)) ([6b88d4a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6b88d4a89ff3fd424c2c04d4351237e3141c027f))
* complete TS foundation output and env parity ([#19](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/19)) ([493b3b8](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/493b3b8626d1ead49a4c176eb45cdbbfd950165f))
* **foundation:** consume independent ts workspaces ([e9b9bf1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/e9b9bf189c855a9c51088c74fb9f174f48ea1b5e))
* **foundation:** consume independent ts workspaces ([b755ebc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b755ebc9ab970a310e17325c669e2a521eabae21))
* **foundation:** implement vpc-sc, confidential space, acm, and cmek to achieve parity ([#15](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/15)) ([842b14c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/842b14cc4aed7712f46f79b1182484264c86f6f5))
* implement unit testing framework using Vitest and add base test coverage for foundation modules ([d1fbfc9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d1fbfc9c247a77ab2f7e0ec75f1c3bcb931573ae))
* improve IAM and VPC security with KMS viewer roles, Cloud Build policy enforcement, and standardized foundation firewall rules. ([eae27cf](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/eae27cf1cd970b921d94c0c99add1dac09ff34bd))
* initial Pulumi TypeScript foundation with full documentation parity ([6576ca1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6576ca1857e92d62b8071c6c99fd9fbf539bbf58))
* initialize project scaffolding with modular infrastructure components and documentation ([8f730eb](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/8f730eb6749bf5cd929f766ad667a574e3646409))
* integrate all fine-grained library packages ([#16](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/16)) ([57852db](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/57852dbe3b67a6990979150f49a3d0c7f8be6b7d))
* **parity:** add stage tests, migration guides, and CI READMEs ([8999046](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/89990469ad62efaa1b4473d4951d988284020267))
* Phase 8 Upstream Drift Parity ([#65](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/65)) ([930f387](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/930f38780f8db4879eecc26cefa595effb76d295))


### Bug Fixes

* **0-bootstrap:** enforce group dependencies for IAM bindings ([#53](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/53)) ([ea30101](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ea30101d8394a1e47e5c43f3fa08e470b4cd701a))
* **0-bootstrap:** grant billing.admin to billing admins group ([#48](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/48)) ([2826775](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/2826775872eeee6b31d1625ac475e309a1665d34))
* **0-bootstrap:** remove over-granted roles from org-admins group ([#50](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/50)) ([9887741](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/9887741e329041cc8d4a4231c018a9f202a5a4bf))
* **0-bootstrap:** scope projectCreator to parent, add impersonation, drop tag over-grant ([4348221](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/4348221236922eb06991d168628312e32d91a371))
* **0-bootstrap:** wire missing kms and bucket options ([#51](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/51)) ([870d707](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/870d707a39bc57ace3754a1f4e6cc5f810ccc6e7))
* **1-org:** apply log sink filter matching TF audit/network filter ([#37](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/37)) ([68b272b](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/68b272b5ceb1d464f567eec4ab9893786a0d3ce8))
* **1-org:** configure folder sinks, Log Analytics, and linked datasets ([#43](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/43)) ([d18edef](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d18edef55da376aeccf13f3321cec2861ae42180))
* **1-org:** deprivilege default service accounts on all projects ([#35](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/35)) ([0a18555](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/0a18555c1367b73e98d73b9917178c2dce7f0c21))
* **1-org:** enable the billing-account log sink by default (CFT parity) ([44249fc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/44249fc166dcfdc3aaf084d207a1e3bc9adfb205))
* **1-org:** make create_unique_tag_key option functional ([#26](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/26)) ([355c172](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/355c1722ee97f40a90b8d2bf1a00802f6a904cca))
* **1-org:** pass billingAccount to CentralizedLogging for billing sinks ([#27](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/27)) ([48bbcd1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/48bbcd163a46d924a2f7753f8c3486f1a82f76ad))
* **1-org:** unblock CAI monitoring function JS source in gitignore ([#25](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/25)) ([251c028](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/251c0283260c7a6f5cbbc72d523192fdbe3ef01d))
* **1-org:** wire billing account to CentralizedLogging for billing sinks ([#38](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/38)) ([cb3d478](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/cb3d4787cffa40750550b6152d35c9ddb29ea888))
* **1-org:** wire budget args to ProjectFactory for all projects ([#39](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/39)) ([1e5ce7f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/1e5ce7fbe9bc78888cc7ecda63bd10a0fa8bd47f))
* **1-org:** wire log_export_storage_retention_policy option ([#28](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/28)) ([6eccc6c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6eccc6c1685a95ebf738d4fad1e2ce4308f3ea66))
* **1-org:** wire org policies at folder scope when parent_folder set ([#36](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/36)) ([d803f77](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d803f778bb967c8185d7822e9dfb38e55acf24bf))
* **2-environments:** activate billingbudgets.googleapis.com on KMS and Secrets projects ([#30](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/30)) ([4d670b1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/4d670b1379de8cf143fd09ea0c7b9c80aa6336c9))
* **2-environments:** remove unused stack output fetches and fix stack refs ([#31](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/31)) ([4aebac0](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/4aebac0c49d01b50f94fac135c90bef5810ebd96))
* **2-environments:** wire Assured Workloads configuration and exports ([#29](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/29)) ([1b12cae](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/1b12caeb9fa91e8c7f7ba53fdb0e8df1431f75d9))
* **3-networks-hub-and-spoke:** add missing parent config to example stack configs ([#32](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/32)) ([c4a6103](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/c4a61030132f43a152c92f1d01ecec13d6f8e86c))
* **3-networks-hub-and-spoke:** add VPC-SC perimeter for hub project ([#41](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/41)) ([c1c5a8a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/c1c5a8a801e61aa9ed716742224008a92e64f21e))
* **3-networks-hub-and-spoke:** correct hub BGP ASN and advertised range ([ea06a0b](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ea06a0b129e68c89e51779c6b96da2b9219c2f97))
* **3-networks-hub-and-spoke:** implement spoke-to-hub VPC peering ([#40](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/40)) ([672c31d](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/672c31df822ea196dd26699eaad6bd5a9a4715a8))
* **3-networks-hub-and-spoke:** wire VPC-SC ingress/egress policies and add 60s delay ([#59](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/59)) ([6743542](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6743542cd68bfb44574f4c3e6a229470c84a434b))
* **3-networks-svpc:** add missing gcp import for VPC-SC ([#58](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/58)) ([dfcb969](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/dfcb969917e5949173e0b127d698ebc8292fd05f))
* **3-networks:** add missing vpc flow log and dns logging variables to svpc envs ([e8fe785](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/e8fe785bf84ccb8eb61cf1c94d8fba631b2eb0f7))
* **3-networks:** use project_number for VPC-SC perimeter resources ([#24](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/24)) ([d0fa2c1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d0fa2c13bb96f9499cdf54cbf4e67152c959a026))
* **4-projects:** deprivilege default compute SA on sample projects ([7199105](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/7199105735775c0ace2390a31f81d41a1311c0f8))
* **5-app-infra:** address gap report issues for ts foundation ([#60](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/60)) ([96ab1bc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/96ab1bc98cde272f680b342f51743b5f497ba92b))
* **5-app-infra:** align stack output key to shared_vpc_project_id ([#23](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/23)) ([d9eca21](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d9eca21201abfb87199ce5cd7b21f5f3f77d708a))
* **5-app-infra:** replace active scaffold and use dynamic image reference ([#63](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/63)) ([56f1108](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/56f110875d47aa684c2731c7f92e88ffa7c1643a))
* **5-app-infra:** restore index.ts files for CI ([#61](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/61)) ([6ebf7d7](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6ebf7d7122c72aabb8f670319e92fdb00b7d06b4))
* achieve 100% architectural parity ([#21](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/21)) ([94750e8](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/94750e8e23d24c0c620e4b785cf10f25b6a767a6))
* Add cloudkms API to activateApis list ([#22](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/22)) ([a73dcc3](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/a73dcc3f9282f2e27b9fb1d586e415cdeaed5a14))
* add KMS IAM binding for state bucket and update cb-private-pool ([#14](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/14)) ([bf3045f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/bf3045fe6f703f58450360ccc0e7816d4e5280c9))
* address ci and foundational gaps ([#62](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/62)) ([638e5b5](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/638e5b5da287b6c68edb352f3570837debfda7a1))
* align foundation exports with terraform logic and add missing policy IDs ([#20](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/20)) ([ec43b4a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ec43b4ad4e9db72f587f366fe7ccd6cc54edfe25))
* **bootstrap:** fix WIF wildcard binding string formatting ([#54](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/54)) ([7ff0be8](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/7ff0be811f0441974ee13c0d5f1a0ee0e79c3965))
* **ci:** checkout and build library to satisfy local file deps ([245a8f4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/245a8f48cf30ab2ec8259ad69d19f8173fca89fc))
* **ci:** checkout and build library to satisfy local file deps ([6540b46](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6540b46a5f0ed038bdb33b924260894508093daf))
* **ci:** symlink library to satisfy relative file deps ([7971cdc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/7971cdc8535a97434bce5f669a3e574fe3c981d7))
* **ci:** symlink library to satisfy relative file deps ([9997148](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/9997148fdabd16cfbfd79591a2cdcb4fa9c0d75f))
* correct deploy/compile-breakers from gap-fix review ([853e5c9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/853e5c9da6ef79f3c3cd65d6e611bd4f525831c8))
* correct deploy/compile-breakers surfaced by gap-fix review ([2da7040](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/2da70400a112cbc98ee6bb4fafc7543a8d3d6676))
* **deps:** bump foundation packages to ^0.3.0 ([073a0c0](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/073a0c04f4515693d5fd3b9e39a289d324fc09ce))
* **deps:** bump registry versions to ^0.2.1 and fix commitlint auth ([ea090a9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ea090a96592ac30a51048af6b4f16dcf440dceeb))
* **deps:** bump to ^0.2.2 to pull public access packages ([fe4fb35](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/fe4fb3524ada76fd7b70b2ec0297eae730a93bd0))
* **deps:** bump to ^0.2.3 to pull public packages ([f168f15](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f168f150fb5882ba46975325bcfbf8d4aa95e988))
* **deps:** remove 5 phantom library deps that reference non-existent packages ([1bcdda4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/1bcdda4ddea709a0392f70fd525a1b1e8860e159))
* **deps:** remove 5 phantom library deps that reference non-existent packages ([6fa7f4d](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6fa7f4d834ed971f092f9cd6f375fcb262874773))
* **deps:** resolve packages from github registry ([f4665b2](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f4665b269f42d047ae10c405c0ed9faeedb78d63))
* **deps:** use foundation- prefixed packages ([b230c0f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b230c0f9976af5d932e7ab6a6092eedd563146c5))
* **docs:** update ERRATA.md to reflect actual implementations ([#45](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/45)) ([8cec7fd](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/8cec7fdf57e7f81e16db754a525cfbdec106459a))
* e2e folder support ([#12](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/12)) ([f7572c7](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f7572c7fe60744c99195e1f47b715a760fb94b87))
* e2e folder support and robust clean script ([#10](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/10)) ([288a57a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/288a57af2df68c742a9407fa0d491d9da8bf0127))
* install root deps before per-stage deps in CI ([af1b8c0](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/af1b8c043f7f7665ffdf108e6acd9a1c75451456))
* Phase 6 gap remediations ([#64](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/64)) ([447568a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/447568a774505152a4db6f49c906babdecbc15a9))
* remove deprecated sourcerepo API and fix KMS region mismatch ([#13](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/13)) ([ba803f9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ba803f9a3a36216a4377eb6709e734a738ad9e28))
* **test:** add 1-org config tests ([#46](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/46)) ([da475e4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/da475e42cf6e9d53d785df0b891e99c0a30bf090))
* **test:** add hub-and-spoke config tests ([#47](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/47)) ([19ca88e](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/19ca88ea96d55cd8d7bc93b609159067e72c49d1))
* **test:** update config default assertions in 1-org ([6d092ae](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6d092ae890c900dddca6eb222fc2dd031776d9ea))
* **test:** update validate_e2e.sh for KMS location and Phase 3 network filters ([3d8beba](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/3d8beba04b1e4880c2500891ebe02375b98511c5))
* **ts/3-networks:** add BGP Cloud Routers, NAT static IPs, internet egress, and DNS peering/forwarding ([#44](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/44)) ([ce7b9f5](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ce7b9f5d67006d1df7cdeeb4bd2a8d796cc21eff))
* **ts/psc:** add DNS zones with record sets and vpc-sc target ([#42](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/42)) ([21a637b](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/21a637b823e4a147dde654b94824e57062f52710))
* **ts:** add deterministic suffix to centralized logging bucket ([#57](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/57)) ([b0c862d](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b0c862de3551922fe9fed5f7c1d6d6b76facd2e2))
* **ts:** add missing dependencies in 1-org package.json ([#55](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/55)) ([a40b5ee](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/a40b5ee4bc3d2661ba17f1e7901a8b1dbe24e1a4))
* **ts:** change enforce_allowed_worker_pools default to false ([#56](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/56)) ([3616ec4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/3616ec4dfcb73906c23bcb6136093b0ccc3bf7da))
* upgrade @types/node to ^22 and add unit test CI job ([0e29cec](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/0e29cec952be2ea33db22071df1698f90258ed11))
* vitest fails when no tests found after local modules removal ([e10141b](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/e10141b329790ef9a6190775fce218dbd1da1779))

## [Unreleased]

### Added

- Initial 6-stage foundation (0-bootstrap through 5-app-infra)
- Shared VPC and Hub-and-Spoke network topologies
- 21 reusable TypeScript modules under `modules/`
- GitHub Actions CI/CD pipeline with Workload Identity Federation
- GitLab CI/CD pipeline alternative
- Comprehensive onboarding guide (`ONBOARDING.md`)
- Pre-flight validation script (`scripts/validate-requirements.sh`)
- Documentation suite: README, CONTRIBUTING, SECURITY, ERRATA, FAQ, GLOSSARY, TROUBLESHOOTING
- CrossGuard policy pack skeleton (`policy-library/`)
- Per-stage Configuration Reference and Outputs tables
- Resource hierarchy change guide (`docs/change_resource_hierarchy.md`)

### Changed

- Migrated shared components to [pulumi-library](https://github.com/VitruvianSoftware/pulumi-library) TypeScript packages

### Security

- WIF-only authentication (no service account keys stored in CI/CD)
- KMS-encrypted Pulumi state bucket with configurable protection level
- Deletion protection on bootstrap folder, seed project, and CI/CD project
