# Deployment Guide

## Services

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://ravikisan.vercel.app |
| Backend API | Render (free tier) | https://rn01.onrender.com |

Both auto-deploy on push to `main`. Never push `main` with failing `npm run check:all`.

## Frontend — Vercel

**Build command:** `cd frontend && npm install && npm run build`
**Output directory:** `frontend/.next`
**Node version:** 20+

Required environment variables (set in Vercel dashboard → Settings → Environment):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=https://rn01.onrender.com
NEXT_PUBLIC_SITE_URL=https://ravikisan.vercel.app
```

Optional:
```
NEXT_PUBLIC_SENTRY_DSN=     # enables error monitoring (see AGENTS.md)
```

## Backend — Render

**Build command:** `cd backend && npm install && npm run build`
**Start command:** `node backend/dist/index.js`
**Node version:** 20+

Required environment variables (set in Render dashboard → Environment):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
AGNES_API_KEY=              # primary LLM provider
FRONTEND_URL=https://ravikisan.vercel.app
NODE_ENV=production
```

Optional (free-tier LLM fallbacks — any subset):
```
LLM7_API_KEY=
OVH_AI_API_KEY=
OPENROUTER_API_KEY=
MISTRAL_API_KEY=
DEEPSEEK_API_KEY=
SAMBANOVA_API_KEY=
HF_TOKEN=
FREE_LLM_DISABLED=          # set to "1" to disable the whole free pool
```

The backend refuses to start in production if `SUPABASE_URL` or
`SUPABASE_SERVICE_ROLE_KEY` is missing. It will log the missing variables
and exit with code 1.

## Keep-alive (Render free tier)

`.github/workflows/keep-alive.yml` pings `/health` every 10 minutes to
prevent the Render instance from sleeping. This adds ~150 GitHub Actions
minutes/month. Switch to an always-on Render plan to remove the dependency.

## Database migrations

Run from inside `backend/`:
```bash
# Apply pending migrations
npx supabase migration up

# Generate a new migration
npx supabase migration new <description>
```

Migrations live in `backend/supabase/migrations/`.

## Content build

The content corpus (`content/`) must be built into `frontend/public/data/`
before a frontend deploy:

```bash
npm run content:build         # builds all subjects
npm run content:build:check   # verifies byte parity (CI gate)
```

Vercel runs the build command above which includes the content build step.

## Rollback

```bash
# Revert to the previous deploy on Vercel:
# Dashboard → Deployments → select the previous → Promote to Production

# Revert to a previous commit on Render:
# Change the "Deploy on push" commit in Render dashboard, or redeploy
# a specific commit hash.

# Emergency: revert main to a specific commit
git revert HEAD --no-edit
git push origin main
```

## CI/CD workflows

| Workflow | File | Trigger |
|---|---|---|
| CI (typecheck + tests) | `.github/workflows/ci.yml` | push to main |
| E2E smoke | `.github/workflows/e2e-smoke.yml` | push to main |
| Lighthouse | `.github/workflows/lighthouse.yml` | push to main |
| Keep-alive | `.github/workflows/keep-alive.yml` | every 10 min |
| URL hygiene | `.github/workflows/url-hygiene.yml` | schedule |
| CodeQL | `.github/workflows/codeql.yml` | push + weekly |
