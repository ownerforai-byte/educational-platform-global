# Deployment Guide — Split Architecture

```
Cloudflare Pages (Next.js frontend, frontend/)
        │  /api/* proxy → NEXT_PUBLIC_API_URL
        ▼
Express backend (backend/, any Node host)
        │  service-role key (server-only)
        ▼
Supabase (Postgres + Auth + Storage)
```

## Frontend — Cloudflare Pages

> **Adapter note:** `@cloudflare/next-on-pages` was removed from devDependencies (package is deprecated upstream; Cloudflare now recommends `@opennextjs/cloudflare`). Two supported paths:
> - **Quick path:** `npm install -D @cloudflare/next-on-pages --workspace frontend`, then use the settings below unchanged (still works today).
> - **Future path:** migrate to `@opennextjs/cloudflare` (follow its Next.js 15 guide; same Pages project settings, different build command).

| Setting | Value |
|---|---|
| Root directory | `frontend` |
| Build command | `npm run build -w frontend && npx @cloudflare/next-on-pages@1` *(or the OpenNext equivalent)* |
| Output directory | `frontend/.vercel/output/static` |
| Node version | 20+ |

Environment variables (Pages project settings):
- `NEXT_PUBLIC_API_URL` = public backend URL, e.g. `https://api.yourdomain.com` *(Public)*
- `NEXT_PUBLIC_SITE_URL` = the Pages domain, e.g. `https://your-site.pages.dev` *(Public — used by SSR data fetches)*

No secrets belong here. The old monolithic Worker (`_worker.js` from root `.vercel/output`) is deprecated; root `wrangler.jsonc` no longer references it.

> Bundle-size verdict vs the old "3 MiB Worker" failure is tracked in MIGRATION_COMPLETE.md — the AI SDKs, DB drivers and service-role code that blew the limit now live only in the backend.

## Backend — Express on any Node host (Railway / Render / Fly / VPS)

```bash
cd backend
cp .env.example .env      # fill values
npm install
npm run build             # tsc -> dist/ (+ ESM import fixer)
npm start                 # node dist/index.js
```

Required environment (see `backend/.env.example`):
- `PORT` (default 3001)
- `FRONTEND_URL` — comma-separated allow-list of origins, e.g. `https://your-site.pages.dev,http://localhost:5173`. CORS reflects ONLY these origins with credentials — never a wildcard.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` *(Secret — server-only, never NEXT_PUBLIC)*
- `SUPABASE_STORAGE_BUCKET` (default `resources`)
- `GEMINI_API_KEY` / `OPENROUTER_API_KEY` / `AI_PROVIDER` / `AI_DEFAULT_PROVIDER` (optional; internal fallback provider works keyless)
- `RATE_LIMIT_WINDOW_MS` (60000), `RATE_LIMIT_MAX_REQUESTS` (120)
- `DATABASE_URL`: **not required** — Neon/Drizzle is retired; Supabase is the sole database.

Health check: `GET /health` → `{"status":"ok"}`.

## Local development

```bash
npm install                 # workspace root
npm run dev -w frontend     # http://localhost:5173  (proxies /api -> :3001)
npm run dev:backend         # http://localhost:3001
```

## Auth flow

Login/signup set an HttpOnly `sb-access-token` cookie (SameSite=Lax, Secure in prod). Every request carries it via `credentials:"include"`; Express middleware verifies against Supabase (`auth.getUser`) and loads `profiles.role`. Sessions expire with the Supabase access token (no silent refresh yet — re-login after expiry).

## Content pipeline

`content/**/*.json` → `npm run content:build` → `public/data/**` → fetched at runtime (never bundled into JS). Large future content goes into Supabase via backend APIs; static JSON stays CDN-cacheable.
