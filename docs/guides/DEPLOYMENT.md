# Deployment Guide

## Services

| Service | Platform | URL |
|---|---|---|
| Frontend | **Firebase App Hosting** (`harindrasah-web`, `asia-southeast1`) | https://harindrasah.com.np |
| Backend API | Firebase Cloud Functions (gen2) | https://us-central1-rn01-af00b.cloudfunctions.net/api |

Rollouts: GitHub → App Hosting on push to `main` (see `docs/runbooks/deploy-frontend.md`).
The backend deploys as the Cloud Functions `api` function with
`firebase deploy --only functions:functions-api:api` from the `firebase/` directory.
Never push `main` with failing `npm run check:all`.

## Frontend — Firebase App Hosting

| Setting | Value |
|---|---|
| Backend ID | `harindrasah-web` |
| Region | `asia-southeast1` |
| App root (GitHub) | `frontend` |
| Config | Root `firebase.json` (`apphosting`), `frontend/apphosting.yaml` |
| Build | Root `package.json` → `apphosting:build` (monorepo workspace install + `next build`) |

Default rollout URL (before custom domain cutover):  
`https://harindrasah-web--rn01-af00b.asia-southeast1.hosted.app`

Required `NEXT_PUBLIC_*` values are in `frontend/apphosting.yaml` (and may be
overridden in the App Hosting console). Secrets stay out of git.

```
NEXT_PUBLIC_API_URL=https://us-central1-rn01-af00b.cloudfunctions.net/api
NEXT_PUBLIC_SITE_URL=https://harindrasah.com.np
NEXT_PUBLIC_USE_FIREBASE_AUTH=true
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rn01-af00b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rn01-af00b
```

Optional:

```
NEXT_PUBLIC_SENTRY_DSN=     # error monitoring (see AGENTS.md)
```

### Canonical domain (apex only)

Production uses **`https://harindrasah.com.np`** only. Do not rely on
`*.web.app`, legacy Standard Hosting (`199.36.158.100`), or Vercel preview URLs.

1. Set **`NEXT_PUBLIC_SITE_URL`** and Cloud Functions **`FRONTEND_URL`** to `https://harindrasah.com.np`.
2. **App Hosting → Custom domains** — attach `harindrasah.com.np`; update Cloudflare per Firebase DNS instructions.
3. **Firebase Auth → Authorized domains** — `harindrasah.com.np`, `rn01-af00b.firebaseapp.com`, and the `*.hosted.app` rollout host during smoke (see `firebase/firebase.json`).
4. **Google Cloud Console → OAuth client** — redirect URIs include `https://rn01-af00b.firebaseapp.com/__/auth/handler` and your site `/auth/callback` on the apex host.
5. Verify: login on apex and on the `hosted.app` URL before DNS cutover.

### Legacy Vercel

Vercel project `ravikisan` is **cutover-only**. Disable auto-deploy and remove the domain after DNS points at App Hosting.

## Backend — Firebase Cloud Functions (gen2)

**Build command:** `cd backend && npm install && npm run build`
**Deploy command:** `firebase deploy --only functions:functions-api:api` (from `firebase/`;
deploys the `api` function from the `functions-api` codebase, gen2, region `us-central1` —
note `--only functions:api` silently targets the bot codebase instead)
**Node version:** 22 (the `nodejs22` runtime pinned in `firebase/firebase.json`)

Required environment variables (set in the Cloud Functions environment for
the `api` function):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
AGNES_API_KEY=              # primary LLM provider
FRONTEND_URL=https://harindrasah.com.np
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

Cloud Functions gen2 cold starts affect first `/api` request after idle.
Keep health checks light; use `live-smoke` workflow to monitor deployed API.

## Firebase config layout (no Standard Hosting)

| File | Purpose |
|---|---|
| Repo root `firebase.json` | App Hosting backend mapping only |
| `firebase/firebase.json` | Auth, Firestore, Storage, Cloud Functions — **no `hosting` block** |

Deploy rules/auth from `firebase/`:

```bash
cd firebase
npx firebase-tools@latest deploy --only firestore:rules,firestore:indexes,auth
```

## Rollback

- **Frontend:** App Hosting → Rollouts → roll back to the previous successful build.
- **Backend:** Redeploy the previous Cloud Functions revision from git.