# Runbook: npm workspaces deploy (frontend + backend)

The monorepo uses a single root lockfile. Workspaces:
`backend`, `frontend`, `packages/shared`, `firebase/functions`.

## Frontend (Firebase App Hosting)

| Setting | Value |
|---|---|
| Backend | `harindrasah-web` (`asia-southeast1`) |
| GitHub app root | `frontend` |
| Monorepo install + build | Root `npm run apphosting:build` |
| Config | `frontend/apphosting.yaml`, root `firebase.json` |

Install always runs from the **repo root** workspace graph (`npm ci` + workspace
`educational-platform-frontend`). App Hosting clones the full monorepo even when
app root is `frontend`.

See `docs/runbooks/deploy-frontend.md`. Legacy Vercel settings (`frontend/vercel.json`)
remain in-repo for cutover only — do not add `firebase deploy --only hosting` (Standard
Hosting removed).

## Backend (Firebase Cloud Functions)

Deploy from `firebase/` (see `docs/guides/DEPLOYMENT.md`):

```bash
firebase deploy --only functions:functions-api:api
```

Build / start from the repo root (local or container):

```bash
npm ci
npm run build --workspace=educational-platform-backend
npm run start --workspace=educational-platform-backend
```

## Local

```bash
npm ci
npm run dev:frontend
npm run dev:backend
```

## Rollback

If hoisting breaks module resolution (e.g. `hast-util-from-html-isomorphic`),
revert the workspace commit and restore the nested lockfiles from git history.
`frontend/next.config.mjs` already aliases that package and sets
`outputFileTracingRoot` to the repo root.
