# Runbook: Frontend deploy (Vercel)

## Symptoms

Preview/production build fails; site 500s after promote.

## Checks

1. Vercel deploy logs — install (`npm ci`) then Turbopack/build errors.
2. Confirm `frontend/package.json` / lockfile / `tsconfig` paths for `features/` aliases.
3. Preview URL `/home` and `/login` return 200.

## Fix

- Prefer fixing shims/paths over deleting feature modules.
- Do not force-push `main`.

## Verify

`npm run build` in `frontend/`; smoke `/home` and `/login`.
