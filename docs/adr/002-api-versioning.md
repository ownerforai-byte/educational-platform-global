# ADR-002: API v2 surface

- **Status:** Accepted
- **Date:** 2026-11-23
- **Deciders:** Platform Team

## Context

Phase 2 of the platform upgrade calls for `/api/v2/` while Express still mounts the legacy flat `src/api/` tree used in production.

## Decision

1. Introduce `backend/src/api/v2/index.ts` mounted at `/api/v2` with `X-API-Version: 2`.
2. Ship read-only probes first (`/health`, `/ai/status`, `/meta`) sharing Zod schemas with contract tests.
3. Document the surface in `docs/api/openapi.yaml`, regenerated via `backend/scripts/generate-openapi.mjs`.
4. Add `backend/src/domains/index.ts` as the aggregation barrel for incremental extraction; do not move controllers yet.

## Consequences

- Positive: Clients can probe version metadata without breaking v1 URLs.
- Negative: Most domain routes remain v1-only until ported route-by-route.
- Follow-ups: Mirror high-traffic write paths (`/auth`, `/ai/chat`) behind v2 with deprecation headers.

## Alternatives considered

1. Big-bang rename `src/api` → `src/domains` — rejected (high regression risk).
2. Header-only versioning on v1 paths — rejected (harder for CDN routing and docs).