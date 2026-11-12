# Testing strategy

## Tools

| Workspace | Runner | Location |
|-----------|--------|----------|
| Frontend | Vitest | `frontend/tests/` |
| Backend | Vitest | `backend/tests/` |

## How to run

```bash
npm run test:affected              # only tests hit by your diff
npm run check                      # scoped gates (typecheck + affected + content gates)
cd frontend && npm run test:run
cd backend && npm run test:run
npm run check:all                  # full gate before main
```

## Fixtures (Phase 11)

| Workspace | Path | Contents |
|-----------|------|----------|
| Frontend | `frontend/tests/fixtures/` | `user.fixture.ts`, `content.fixture.ts`, `factory.ts` |
| Backend | `backend/tests/fixtures/` | `user.fixture.ts`, `chat.fixture.ts`, `factory.ts` |
| Backend helpers | `backend/tests/helpers/setup.ts` | Shared Supabase query-chain stubs (no `vitest` import) |

Backend suites are split into `backend/tests/unit/` (incl. `unit/ai/`) and `backend/tests/integration/` (HTTP/`createApp`).

## Conventions

- Prefer focused tests next to the behavior (route/component/API).
- After Phase 5 moves, filesystem assertions must resolve `lib/` / `components/` **shims** into `features/` (see `frontend/tests/helpers/resolve-lib-shim.ts`).
- Do not load Three.js or full note corpora in Node unit tests.
- Auth OAuth coverage is **Google-only**; Facebook is not wired.
- Prefer fixtures (`buildSessionUser`, `buildProfile`, …) over one-off literals for tiered users.

## Ratches & content gates

- Lint ratchet, dead-end routes, empty scopes, mindmap, visuals, lab manifest — wired through `scripts/ci/scoped-check.mjs`.
- AI offline regression: `npm run ai:regression`.
