# Backend architecture

Express TypeScript API in `backend/` (Render). Domain routers under `backend/src/api/` (Phase 2).

## Layers

| Layer | Path | Role |
|-------|------|------|
| HTTP | `src/api/<domain>/` | Controllers + routers |
| AI | `src/ai/` | Provider chain, prompts, corpus retrieval, media |
| Services / repos | `src/services/`, `src/repositories/` | Business + data access (Phase 4) |
| Middleware | `src/middleware/` | Auth, rate limits, spark gates |

Bind HTTP to `0.0.0.0:$PORT` on Render. Filesystem is ephemeral — persist in Supabase.

## Auth & owner

- Session cookies + CSRF for OAuth (`google` only; Facebook is not wired).
- `OWNER_EMAILS` / `isOwnerEmail` in `middleware/auth.ts` — operator accounts are configured through the environment.
- Owner admin endpoints do **not** block actions against other accounts (independence / `ownerGuard` removed).

## Content reveal

`POST /api/content/reveal` enforces auth → tier → spark window before reading corpus off public CDN.

## Checks

```bash
cd backend && npx tsc --noEmit && npm run test:run
```
