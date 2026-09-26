<!--
  README.md — Main documentation for the Educational Platform split architecture.
  This file describes the project structure, quick-start commands, environment variables,
  deployment notes, API endpoints, architecture decisions, and migration status.
-->
# Educational Platform — Split Architecture

## Overview

This repository has been migrated from a monolithic Next.js application to a clean split architecture:

- **Frontend**: Next.js 15 App Router app (server build — deployment target TBD)
- **Backend**: Express.js API server (deployable to any Node.js host)
- **Database**: Supabase (PostgreSQL) — unchanged
- **Content**: Static JSON + dynamic database content

## Directory Structure

```
educational-platform-global/
├── frontend/                 # Next.js frontend (server build; deploy target TBD)
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   ├── features/             # Feature modules
│   ├── lib/                  # Frontend utilities + API client
│   ├── public/               # Static assets
│   └── package.json
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── api/              # Route handlers
│   │   ├── auth/             # Supabase auth
│   │   ├── db/               # Database clients
│   │   ├── services/         # Business logic
│   │   ├── ai/               # AI providers
│   │   ├── middleware/       # Auth, rate limiting
│   │   └── index.ts          # Server entry point
│   └── package.json
├── content/                  # Educational content (shared)
├── content-tools/            # Content migration/validation tools
├── docs/                     # Documentation
├── scripts/                  # Build scripts (shared)
├── MIGRATION_AUDIT.md        # Migration diagnosis
├── API_CONTRACT.md           # API documentation
└── ARCHITECTURE.md           # Architecture decisions
```

## Quick Start

Prerequisites: Node.js 20+, npm 10+. All commands run from the repo root via npm workspaces.

```bash
npm install

# Frontend — Next.js 15 App Router, http://localhost:5173
npm run dev -w frontend
npm run typecheck -w frontend     # 0 errors expected
npm run build -w frontend         # full production build
npm run test:run -w frontend      # vitest suite

# Backend — Express 4 + TS ESM, http://localhost:3001
npm run dev:backend               # tsx watch (dev)
npm run build -w backend          # tsc + ESM import fixup
node backend/dist/index.js        # boots with ZERO env vars (lazy Supabase client)

# Content pipeline — rebuild public/data JSON from content/
npm run content:build
```

In development the backend boots without configuration (DB-backed routes fall back to an
in-memory mock store). **In production it refuses to start** unless `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` are set — no silent mock-data fallback. AI keys
(`GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `AGNES_API_KEY`) also go in `backend/.env` only —
never `NEXT_PUBLIC_*`. See `.env.example` for the full list.

## Environment Variables

### Frontend (`.env.local`)

| Variable | Type | Purpose |
|----------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `NEXT_PUBLIC_API_URL` | Public | Backend API URL |
| `NEXT_PUBLIC_SITE_URL` | Public | Site origin |

### Backend (`.env`)

| Variable | Type | Purpose |
|----------|------|---------|
| `PORT` | Public | Server port (default 3001) |
| `NODE_ENV` | Public | Environment |
| `SUPABASE_URL` | Secret | Supabase project URL |
| `SUPABASE_ANON_KEY` | Secret | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role |
| `DATABASE_URL` | Secret | PostgreSQL connection |
| `GEMINI_API_KEY` | Secret | Google Gemini AI |
| `OPENROUTER_API_KEY` | Secret | OpenRouter AI |
| `AI_PROVIDER` | Secret | Default AI provider |
| `AI_DEFAULT_PROVIDER` | Secret | Default AI provider |
| `FRONTEND_URL` | Secret | Allowed CORS origin (exact allowlist in production) |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | Public | Login/signup/refresh attempts per IP per window (default 5) |
| `PASSWORD_RESET_RATE_LIMIT_MAX_REQUESTS` | Public | Password reset attempts per IP (default 3/hour) |
| `RATE_LIMIT_MAX_REQUESTS` / `RATE_LIMIT_WINDOW_MS` | Public | General per-IP cap (default 60/60s) |

## Deployment

**Not finalized.** The frontend still produces a Next.js server build (~44 SSR-on-demand
routes), so the old "static Cloudflare Pages" strategy does not apply. Candidates:
Cloudflare Pages (the 3 MiB worker limit motivated this split) vs Netlify (`netlify.toml`
present). Nothing has been deployed yet — see `MIGRATION_COMPLETE.md` (CLOUDFLARE,
REMAINING ISSUES #10).

### Backend → Railway / Render / Fly.io

- Build command: `npm run build -w backend`
- Start command: `node backend/dist/index.js`
- Environment: set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and AI keys in the hosting platform

## API Endpoints

See `API_CONTRACT.md` for full documentation.

## Architecture

See `ARCHITECTURE.md` for detailed architecture decisions.

## Security

Rules this codebase follows, and the checks that enforce them:

- **Secrets live in env vars only.** No key, token, or connection string belongs in source,
  in a comment, or under a `NEXT_PUBLIC_*` name. `.env` is gitignored; `.env.example` holds
  placeholders only. `SUPABASE_SERVICE_ROLE_KEY` is server-side only, and the anon key is
  public-safe only with RLS enabled on every table.
- **Errors never leak internals.** A client receives a generic message plus a short
  correlation id (also returned as the `x-error-id` header); stack traces, database/PostgREST
  messages, and upstream provider payloads go to the server log only. Use
  `serverError(res, err)` from `middleware/errors.ts` — never `res.json({ error: err.message })`.
- **Rate limits are tiered per IP**: 5/min for login, signup and refresh, 3/hour for password
  reset, 60/min for everything else, and guest AI shares the general cap. Authenticated AI is
  deliberately uncapped (enforced at the provider gateway).
- **Security headers** (`middleware/securityHeaders.ts`): `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Strict-Transport-Security` (1 year, production only), and a strict
  `Content-Security-Policy` with `frame-ancestors 'none'`. Development stays frameable so the
  preview panel keeps working.
- **CORS** allows only the `FRONTEND_URL` allowlist in production; credentials are never
  combined with a wildcard origin.
- **Debug output is off by default.** The route table only prints with `ROUTE_DEBUG=true`, and
  never in production.

### Secret rotation warning

Deleting a file does not remove it from Git history. Two live credentials — a Vercel token
(`vercel-token.txt`) and a Supabase personal access token (`.mcp.json`) — were captured in editor
checkpoint commits that were not reachable from `main`. Those refs have been deleted and the
objects pruned, and both tokens have been revoked and replaced. One Puter access token from the
old scratch scripts (`agent.mjs`, `ask-ai.mjs`) still sits in history at `4d73f538^`; it cannot be
revoked through the API and expires 2026-12-04, or it can be removed by rewriting history.

That is the shape of the hazard to watch for, though: if a real token, key, or password is ever
committed — even to a throwaway branch or checkpoint — rotate it immediately (rotation is one
API call) and purge history with `git filter-repo`. Treat any credential that has touched Git as
compromised; assume the object store is copied, forked, and archived elsewhere.

## Migration Notes

- Old root `app/` implementation is retained intentionally until cutover; duplication is
  mapped in `frontend/MIGRATION_FILE_MAP.md`.
- The split is code-complete, not drift-free: several API/behavior differences from the
  original monolith are tracked in the "Post-migration reality check" section of
  `API_CONTRACT.md` and in `MIGRATION_COMPLETE.md` (REMAINING ISSUES).
