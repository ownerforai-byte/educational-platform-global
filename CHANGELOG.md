# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Pro Architecture initiative: phased domain-driven structuring.
- Dedicated `.logs/` and `.secrets/` workspace separation.
- Archive location for historic execution plans (`docs/archive/plans/`).
- Shared package foundation under `packages/shared/`.

### Changed
- Workspace root sanitized of transient log and debug files.

### Removed
- Stale backup (`.bak`) files from frontend tree.
