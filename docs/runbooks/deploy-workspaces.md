# Runbook: npm workspaces deploy (frontend + backend)

The monorepo uses a single root lockfile. Workspaces:
`backend`, `frontend`, `packages/shared`, `firebase/functions`.

## Vercel (frontend)

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Install Command | `npm ci --workspace=educational-platform-frontend` |
| Build Command | `npm run build` (default) |
| Ignored Build Step | `frontend/vercel.json` → `ignoreCommand` |

Install from the repo root so the workspace graph and root `overrides` apply.
Do not restore a nested `frontend/package-lock.json`.

### Shared package (`packages/shared`) must trigger frontend builds

Vercel’s Root Directory is `frontend`. A commit that **only** changes
`packages/shared` is treated as “didn’t affect this project” and the production
deploy is **canceled** unless the Ignored Build Step says otherwise.

`frontend/vercel.json` `ignoreCommand` builds when either `frontend/` **or**
`packages/shared/` changed (and still skips `dependabot/*`). If you change
only `@rn/shared` and a deploy is still skipped, add a one-line touch under
`frontend/` (e.g. a comment in `frontend/proxy.ts`, which imports
`@rn/shared/utils`) and push to `main`.

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
