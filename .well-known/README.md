# Digital Asset Links (mandatory layout)

**Canonical file:** `/.well-known/assetlinks.json` at the **monorepo repository root** only.

- Do **not** add `frontend/public/.well-known/` or any other duplicate copy.
- Production serves this file via `frontend/app/.well-known/assetlinks.json/route.ts`, which reads the repo-root JSON at build and runtime.
- CI validates **only** `.well-known/assetlinks.json` on this path.