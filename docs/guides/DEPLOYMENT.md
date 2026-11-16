# Deployment Guide

## Services

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://www.harindrasah.com.np |
| Backend API | Firebase Cloud Functions (gen2) | https://us-central1-rn01-af00b.cloudfunctions.net/api |

The frontend auto-deploys on push to `main`. The backend deploys as the
Cloud Functions `api` function with `firebase deploy --only functions:functions-api:api`.
The former Render backend is decommissioned. Never push `main` with failing
`npm run check:all`.

## Frontend — Vercel

**Build command:** `cd frontend && npm install && npm run build`
**Output directory:** `frontend/.next`
**Node version:** 20+

Required environment variables (set in Vercel dashboard → Settings → Environment):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=https://us-central1-rn01-af00b.cloudfunctions.net/api
NEXT_PUBLIC_SITE_URL=https://www.harindrasah.com.np
```

Optional:
```
NEXT_PUBLIC_SENTRY_DSN=     # enables error monitoring (see AGENTS.md)
```

## Backend — Firebase Cloud Functions (gen2)

**Build command:** `cd backend && npm install && npm run build`
**Deploy command:** `firebase deploy --only functions:functions-api:api` (from the repo root;
deploys the `api` function from the `functions-api` codebase, gen2, region `us-central1` —
note `--only functions:api` silently targets the bot codebase instead)
**Node version:** 20+

Required environment variables (set in the Cloud Functions environment for
the `api` function):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
AGNES_API_KEY=              # primary LLM provider
FRONTEND_URL=https://www.harindrasah.com.np
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

## Cold starts

Cloud Functions scale to zero, so a cold start can take ~30s on the first
request. The frontend proxy retries with a cold-start-aware timeout
(`frontend/app/api/[...path]/route.ts`), so no keep-alive ping is needed —
the old Render keep-alive workflow was removed with the Render decommission.

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

# Redeploy a previous backend revision: check out the desired commit and
# run `firebase deploy --only functions:functions-api:api`.

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
| URL hygiene | `.github/workflows/url-hygiene.yml` | schedule |
| CodeQL | `.github/workflows/codeql.yml` | push + weekly |
