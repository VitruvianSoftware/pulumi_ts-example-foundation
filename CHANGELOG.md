# Changelog

All notable changes to the Pulumi Example Foundation (TypeScript) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2026-04-24)


### ⚠ BREAKING CHANGES

* None — @types/node@22 is backward-compatible with the project's TypeScript configuration (skipLibCheck: true).

### Features

* add Assured Workload support, IAM/contact modules, and CAI monitoring function ([fe71529](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/fe71529cfaab1cb7fb50b8a4a50f825d6a884dd8))
* add E2E testing infrastructure ([#9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/9)) ([8988845](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/898884580271d07ab45bcb059de97a36652cc8be))
* add Pulumi stack configuration examples and update documentation across foundation modules ([950313c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/950313c142ab30e0854ce3d9ce74610c5b9ae674))
* add release-please automation for proper versioning ([#1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/1)) ([be12068](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/be120686d88269dfa75d284a9a1f5c3db6891f7d))
* append seed suffix to state bucket name for uniqueness ([74399b7](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/74399b757f77eae641d969ef8ea747dc66873322))
* **foundation:** consume independent ts workspaces ([e9b9bf1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/e9b9bf189c855a9c51088c74fb9f174f48ea1b5e))
* **foundation:** consume independent ts workspaces ([b755ebc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b755ebc9ab970a310e17325c669e2a521eabae21))
* **foundation:** implement vpc-sc, confidential space, acm, and cmek to achieve parity ([#15](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/15)) ([842b14c](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/842b14cc4aed7712f46f79b1182484264c86f6f5))
* implement unit testing framework using Vitest and add base test coverage for foundation modules ([d1fbfc9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/d1fbfc9c247a77ab2f7e0ec75f1c3bcb931573ae))
* initial Pulumi TypeScript foundation with full documentation parity ([6576ca1](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6576ca1857e92d62b8071c6c99fd9fbf539bbf58))
* initialize project scaffolding with modular infrastructure components and documentation ([8f730eb](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/8f730eb6749bf5cd929f766ad667a574e3646409))
* **parity:** add stage tests, migration guides, and CI READMEs ([8999046](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/89990469ad62efaa1b4473d4951d988284020267))


### Bug Fixes

* add KMS IAM binding for state bucket and update cb-private-pool ([#14](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/14)) ([bf3045f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/bf3045fe6f703f58450360ccc0e7816d4e5280c9))
* **ci:** checkout and build library to satisfy local file deps ([245a8f4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/245a8f48cf30ab2ec8259ad69d19f8173fca89fc))
* **ci:** checkout and build library to satisfy local file deps ([6540b46](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6540b46a5f0ed038bdb33b924260894508093daf))
* **ci:** symlink library to satisfy relative file deps ([7971cdc](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/7971cdc8535a97434bce5f669a3e574fe3c981d7))
* **ci:** symlink library to satisfy relative file deps ([9997148](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/9997148fdabd16cfbfd79591a2cdcb4fa9c0d75f))
* **deps:** bump foundation packages to ^0.3.0 ([073a0c0](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/073a0c04f4515693d5fd3b9e39a289d324fc09ce))
* **deps:** bump registry versions to ^0.2.1 and fix commitlint auth ([ea090a9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ea090a96592ac30a51048af6b4f16dcf440dceeb))
* **deps:** bump to ^0.2.2 to pull public access packages ([fe4fb35](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/fe4fb3524ada76fd7b70b2ec0297eae730a93bd0))
* **deps:** bump to ^0.2.3 to pull public packages ([f168f15](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f168f150fb5882ba46975325bcfbf8d4aa95e988))
* **deps:** remove 5 phantom library deps that reference non-existent packages ([1bcdda4](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/1bcdda4ddea709a0392f70fd525a1b1e8860e159))
* **deps:** remove 5 phantom library deps that reference non-existent packages ([6fa7f4d](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/6fa7f4d834ed971f092f9cd6f375fcb262874773))
* **deps:** resolve packages from github registry ([f4665b2](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f4665b269f42d047ae10c405c0ed9faeedb78d63))
* **deps:** use foundation- prefixed packages ([b230c0f](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/b230c0f9976af5d932e7ab6a6092eedd563146c5))
* e2e folder support ([#12](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/12)) ([f7572c7](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/f7572c7fe60744c99195e1f47b715a760fb94b87))
* e2e folder support and robust clean script ([#10](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/10)) ([288a57a](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/288a57af2df68c742a9407fa0d491d9da8bf0127))
* install root deps before per-stage deps in CI ([af1b8c0](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/af1b8c043f7f7665ffdf108e6acd9a1c75451456))
* remove deprecated sourcerepo API and fix KMS region mismatch ([#13](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/issues/13)) ([ba803f9](https://github.com/VitruvianSoftware/pulumi_ts-example-foundation/commit/ba803f9a3a36216a4377eb6709e734a738ad9e28))
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
