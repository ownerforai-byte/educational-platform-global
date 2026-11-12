# Frontend architecture

Next.js 16 App Router app in `frontend/` (Vercel). Prefer `CORE_FILES.md` and `frontend/lib/navigation.ts` / `site-index.ts` over scanning routes.

## Layout

| Area | Role |
|------|------|
| `app/(app)/` | Authenticated study shell (gates: approval → sparks → tier) |
| `app/auth/` | Login, signup, OAuth callback, welcome |
| `features/` | Domain modules (auth, lab, AI, practice, …) extracted in Phase 5 |
| `lib/` | Shared registries (`core/`, `state/`, `streams/`, …) + Phase 5 shims |
| `types/` | Shared type hub (`api`, `lab`, `content`) |
| `components/` | UI + thin re-exports into `features/` where Phase 5 moved code |

## Access

Five-tier ladder (`visitor` → `member` → `plus` → `pro` → `owner`) lives in `lib/access-level.ts` / `lib/core/access-level.ts`. Owner allowlist mirrors the backend (`lib/owner.ts` — single owner email).

## Content & AI UI

- Syllabus order: `lib/syllabus` (core).
- Veer UI under `features/ai/`; chat citations should deep-link into note routes when possible.
- Labs: registry + loaders under `features/lab/` with `@/components/lab/*` shims until Phase 12.

## Checks

```bash
cd frontend && npm run typecheck
npm run check          # from repo root (scoped)
```
