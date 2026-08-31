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

The backend boots without configuration; DB-backed routes need `backend/.env` with
`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. AI keys (`GEMINI_API_KEY`, etc.) also go in
`backend/.env` only — never `NEXT_PUBLIC_*`.

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
| `FRONTEND_URL` | Secret | Allowed CORS origin |

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

## Migration Notes

- Old root `app/` implementation is retained intentionally until cutover; duplication is
  mapped in `frontend/MIGRATION_FILE_MAP.md`.
- The split is code-complete, not drift-free: several API/behavior differences from the
  original monolith are tracked in the "Post-migration reality check" section of
  `API_CONTRACT.md` and in `MIGRATION_COMPLETE.md` (REMAINING ISSUES).
