# MIGRATION COMPLETE — Frontend/Backend Split

Status: code migration complete and verified locally. Deployment target not yet chosen. Read REMAINING ISSUES before treating anything in here as production-ready.

## FRONTEND

- Location: `frontend/` — Next.js 15 App Router.
- `npm run typecheck -w frontend` → 0 errors.
- `npm run build -w frontend` → PASS. 64/64 routes: ~20 static prerendered + ~44 SSR-on-demand, middleware 34.4 kB.
- `npm run test:run -w frontend` → 39/39 tests across 6 files.
- No edge runtime exports remain (the old monolith's `export const runtime = "edge"` migration is fully reverted).
- Dependencies cleaned: all `@supabase/*` packages and `next-mdx-remote` removed; added `@types/three` and the vitest toolchain.
- Data loading is fetch-only against static JSON in `/public/data`: server-side requests use an absolute origin derived from `NEXT_PUBLIC_SITE_URL` with `no-store`; the syllabus remains static in `lib/syllabus.ts`.
- The DOMParser edge-runtime issue is solved by aliasing `hast-util-from-html-isomorphic` to its node variant via the shim `frontend/lib/hast-util-from-html-isomorphic.js`, wired as a webpack alias in `next.config.mjs`.

## BACKEND

- Location: `backend/` — Express 4 + TypeScript ESM.
- `npm run build -w backend` → PASS; `node dist/index.js` boots with zero env vars (the Supabase client is a lazy Proxy).
- Verified endpoints after a clean boot with no configuration:
  - `GET /health` → 200
  - `GET /api/exams` → 200
  - `GET /api/r-notes` → 200 `{subjects, chapters, notes}`
- Rate limiter mounted globally (120 req/min/IP) + `trust proxy` enabled + sanitized global error handler (no stack traces leak to clients).
- Auth: `middleware/auth.ts` verifies tokens via `supabaseAdmin.auth.getUser` and loads `profiles.role`; used by ai/bookmarks/progress/search routes. Controller + resources routes use equivalent inline guards.

## DATABASE

- Authoritative database: **Supabase**. Schema of record: `supabase/migrations/0001_init_schema.sql` (17 tables); RLS policies in `0002`.
- Neon/Drizzle is **vestigial**: zero runtime imports anywhere. `drizzle/0000_init.sql` contained only 3 toy tables (`topics`/`lessons`/`exams`) that conflicted with Supabase tables in name only — never part of the real schema. Drizzle deps removed from `backend/package.json` this session.
- Backend connects with the service-role key (`backend/src/db/supabase.ts`) — RLS is inert on backend writes; route-level authorization is the only guard.

## AUTH

- `middleware/auth.ts`: accepts a Bearer token or the legacy `sb-access-token` cookie, verifies via `supabaseAdmin.auth.getUser`, then loads the user's role from `profiles.role`.
- Login/signup/logout work end-to-end through the frontend proxy.
- **Known gap**: see REMAINING ISSUES #1 — browser session transport is broken for protected endpoints.

## CONTENT

- Source JSON: `content/ravikishan/**` (+ `content/r-export` manifest) → `npm run content:build` → `public/data/{ravikishan,r-export}/*.json`.
- Both consumers fetch that JSON at request time:
  - Frontend pages: relative fetch through the shared loader.
  - Backend file routes: read from `../public/data`.
- Raw HTML inside notes renders correctly: `rehype-raw` restored plus the sanitize pipeline.
- `content/lessons/*.md` is currently **unreferenced** by any code — documented as a future hook only.
- Exams are served from `public/data/exams`.

## AI

- AI providers live **only in the backend** (`src/ai/service.ts`), including an internal fallback provider that needs no API keys.
- The frontend never calls providers directly; it calls `/api/ai` via the backend proxy.
- API keys belong in `backend/.env` (`GEMINI_API_KEY`, etc.) — never `NEXT_PUBLIC_*`.

## CLOUDFLARE

- The original motivation for the split stands: the old monolith exceeded Cloudflare's 3 MiB worker limit.
- Honest status: the new frontend still produces a Next.js **server build** (~44 SSR-on-demand routes exist), so it does *not* collapse into a static Pages deployment as-is. A Cloudflare Pages strategy is **not finalized and nothing has been deployed**. `netlify.toml` exists in the repo as an alternative target. Decision pending.

## TESTS

- Frontend vitest suite: **39/39 passing across 6 test files** (`npm run test:run -w frontend`).

## REMAINING ISSUES

1. **Browser session transport gap**: backend auth reads a Bearer token or the legacy `sb-access-token` cookie; the frontend sends cookies only via `credentials: "include"` and never sets an `Authorization` header. Protected endpoints will 401 for real logged-in browser users until either the frontend stores + attaches the access token or the backend parses the `@supabase/ssr` chunked-cookie format. (Login/signup/logout DO work end-to-end.)
2. `resources` PATCH passes `req.body` unsanitized to `update()` under the service-role key (RLS inert) — needs a column allowlist; DELETE lacks an ownership check.
3. `PATCH /api/controller/settings` was lost in migration — settings are read-only today.
4. Storage upload route was not ported (`lib/storage/storage-service.ts` unused).
5. Search became authenticated (was public); the `officialLink` setting was dropped from the search response.
6. Bookmarks response shape changed (`{bookmarks:[…]}` → bare array) and upsert overwrites instead of being idempotent-ok; delete key changed `resourceId` → row id.
7. Progress validation dropped (raw `topic_id`; FK errors surface as 500s).
8. Controller health/content-stats/settings payload shapes drifted from the originals.
9. DB-backed routes require `backend/.env` with `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — none present locally yet.
10. Deployment target undecided (Cloudflare Pages vs Netlify); the CI workflow still references the old monolith build.
11. The old root `app/` implementation is retained intentionally until cutover; duplication is documented in `frontend/MIGRATION_FILE_MAP.md`.

## VERIFICATION LOG

| Command | Result |
|---|---|
| `npm run typecheck -w frontend` | PASS — 0 errors |
| `npm run build -w frontend` | PASS — 64/64 routes (~20 static prerendered, ~44 SSR-on-demand), middleware 34.4 kB |
| `npm run test:run -w frontend` | PASS — 39/39 across 6 files |
| `npm run build -w backend` | PASS |
| `node dist/index.js` | Boots with zero env vars (lazy Supabase Proxy) |
| `GET /health` | 200 |
| `GET /api/exams` | 200 |
| `GET /api/r-notes` | 200 — `{subjects, chapters, notes}` |

## WHAT WAS FIXED THIS SESSION

- **r-notes router rewrite** — the original router crashed the backend at boot; rewritten cleanly.
- **Exams route fixes** — path traversal vulnerability closed and wrong-cwd file resolution fixed.
- **Rate limiter actually mounted** globally (120/min/IP) + `trust proxy`.
- **Error sanitization** — global error handler no longer leaks internals.
- **Fake `requireAuth` removal** — stub auth replaced with real verification in middleware and inline guards.
- **rehype-raw restoration** for raw-HTML notes, including declarations for phantom dependencies.
- **fs-free data loader** — frontend loads `/public/data` JSON via fetch (server-side absolute origin + `no-store`) instead of filesystem reads.
- **Auth actions unified through `apiFetch`** — single client path for login/signup/logout.
- **Dead Supabase/env code removal** from the frontend (all `@supabase/*` deps gone).
- **Duplicate `public/data/data` nest removed**.
- **Drizzle deps removed** from `backend/package.json` (vestigial Neon/Drizzle stack).
- **Missing tailwind/postcss/eslint configs copied** into `frontend/`.
- **50 frontend type errors fixed** to reach 0-error typecheck.
- **Documentation** (this file, PROJECT_STATUS, README quickstart, API_CONTRACT reality check).
