# HTTP API overview

## Bases

| Environment | Base URL |
|-------------|----------|
| Production (Cloud Functions) | `https://us-central1-rn01-af00b.cloudfunctions.net/api` |
| Local backend | `http://127.0.0.1:3000` (see `backend/.env.example`) |

The Firebase function name is `api`, so browser calls use `${base}/api/...` when targeting the function root.

## Versioning

- **v1 (default):** `/api/<domain>/...` and `/health` on the app root.
- **v2 (probes):** `/api/v2/health`, `/api/v2/ai/status`, `/api/v2/meta` — responses include `X-API-Version: 2`.

Machine-readable spec: `docs/api/openapi.yaml` (regenerate with `npm run openapi:generate`).

## Public probes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Liveness + deploy `commit` stamp |
| GET | `/api/ai/status` | `{ configured, online }` for the Veer status dot |
| GET | `/api/v2/health` | Same body as `/health`, versioned |
| GET | `/api/v2/meta` | Version metadata + `requirements` (legal URLs, support email, Android package) |

## Contract tests

Zod schemas live in `backend/src/api/contracts/`. CI runs `backend/tests/contract/public-api.contract.test.ts` with the backend Vitest suite.

## Auth

Session cookies and Firebase ID tokens are documented in `AGENT_RULES.md` and `docs/guides/UPGRADE.md`. Most `/api/*` routes require auth middleware — only probes above are anonymous.