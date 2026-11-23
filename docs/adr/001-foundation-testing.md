# ADR-001: Foundation testing gates

- **Status:** Accepted
- **Date:** 2026-11-23
- **Deciders:** Platform Team

## Context

`plans/PLATFORM_UPGRADE_MASTER_PLAN.md` Phase 1 requires unit coverage on `lib/core`, Zod-backed API contract tests, E2E critical paths, and an expanded AI regression suite without destabilizing production.

## Decision

1. Add focused Vitest suites under `frontend/tests/lib/core/` for `access-level` and syllabus helper exports (navigation already guarded by `tests/lib/navigation.test.ts`).
2. Add `backend/src/api/contracts/public-schemas.ts` and `backend/tests/contract/public-api.contract.test.ts` for public probes (`/health`, `/api/ai/status`, `/api/v2/*`).
3. Keep Playwright smoke as the Login → Content → Veer critical path; extend naming only, do not duplicate specs.
4. Add `provider-fallback-registry.test.ts` so every `FREE_LLM_NAMES` entry has a pool spec (complements `ai:regression`).

## Consequences

- Positive: CI can fail on response-shape drift before mobile/web clients break.
- Negative: Full OpenAPI for every domain route remains future work (v2 starts with probes only).
- Follow-ups: Raise Vitest coverage thresholds on `lib/core` once `@vitest/coverage-v8` is adopted.

## Alternatives considered

1. Snapshot the entire `/api` tree — rejected (too brittle).
2. Replace smoke E2E with a second Playwright file — rejected (duplicate maintenance).