# Runbook: npm workspaces deploy (frontend + backend)

The monorepo uses a single root lockfile. Workspaces:
`backend`, `frontend`, `packages/shared`, `firebase/functions`.

## Vercel (frontend)

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Install Command | `npm ci --workspace=educational-platform-frontend` |
| Build Command | `npm run build` (default) |

Install from the repo root so the workspace graph and root `overrides` apply.
Do not restore a nested `frontend/package-lock.json`.

## Render (backend)

Build / start from the repo root:

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
