# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## How to update

Add entries under **[Unreleased]** using these sections only when needed:
`Added` · `Changed` · `Deprecated` · `Removed` · `Fixed` · `Security`.
On release, rename `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD` and open a new empty Unreleased block.

## [Unreleased]

### Added
- Pro Architecture initiative: phased domain-driven structuring.
- Dedicated `.logs/` and `.secrets/` workspace separation.
- Archive location for historic execution plans (`docs/archive/plans/`).
- Shared package foundation under `packages/shared/`.
- Docs hub under `docs/architecture/`, `docs/guides/`, `docs/adr/`, `docs/runbooks/`.
- Optional Docker packaging under `infra/docker/`.
- GitHub issue templates (bug / feature / content).

### Changed
- Workspace root sanitized of transient log and debug files.
- Owner allowlist reduced to a single owner account; owner self-protection guard removed.
- Veer "From your notes" citations prefer in-app routes over raw repo paths.

### Removed
- Stale backup (`.bak`) files from frontend tree.
- `backend/src/utils/ownerGuard.ts` and Facebook login wiring (not product-ready).
