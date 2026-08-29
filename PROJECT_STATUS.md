# PROJECT STATUS

## PROJECT
NEB Study Vault / Educational Platform Global

## STATUS
PHASE 14 — PERFORMANCE & DEPLOYMENT (COMPLETE)

## CURRENT_PHASE
14 — Performance & Deployment (complete)

## REPOSITORY
https://github.com/ravikisan1814-lang/educational-platform-global.git

## CURRENT_WORKSPACE
C:\Users\ASUS\Desktop\educational-platform-global

## BRANCH
main

## REPOSITORY STATE
- Initial commit created and pushed to origin/main (commit 9dc767c).
- Remote `origin` configured and up to date.
- Control documents + Phase 2-4 application foundation committed.
- `.env.local` exists locally (gitignored, placeholder only) so the app can boot.
- Cloudflare Pages deployment fix committed (edge runtime migration, WSL build,
  verified `_worker.js` output).
- Recursion-safe build wrapper committed: `npm run build` = `node scripts/build.mjs`
  (generates `.vercel/output/static/_worker.js/index.js`; plain `next build` inside
  Vercel's recursive guard). Cloudflare dashboard can keep `npm run build`.
- Resilient middleware committed: `middleware.ts` guards Supabase client creation +
  `auth.getUser()` with an env-var presence check and try/catch — the site no longer
  returns 500 on every page when Supabase env vars are missing/unconfigured.
- Built-in AI recommendation engine committed: `lib/ai/providers/internal.ts` builds
  a content index from `lib/syllabus.ts` and returns subject/unit recommendations
  (real URLs like `/r-notes?subject=biology` + `#anchors`) for search and chat with
  NO API keys. `lib/ai/service.ts` always registers it, falls back to it when no
  external provider is configured or fails (e.g. invalid API key), and reads
  `AI_PROVIDER` as an alias for `AI_DEFAULT_PROVIDER`. Env vars are no longer
  required for the site to load.

## ORCHESTRATOR
MASTER/ORCHESTRATOR AGENT active. Phase 2 executed directly (no overlapping
agent file edits) to honor the multi-agent coordination rule.

## AVAILABLE AGENTS
- `general` (subagent): autonomous multi-step tasks.
- `explore` (subagent): codebase reconnaissance.
- Agent Manager (VS Code extension): `worktree` / `local` sessions.

## ENVIRONMENT TOOLCHAINS
- Node.js v24.19.0 / npm 11.17.0
- Git 2.55.0
- Python 3.13.15

## VERIFICATION (Phase 2)
- `npm run build` → PASS (static `/`, middleware compiled).
- `npm run typecheck` (tsc --noEmit) → PASS (exit 0).
- `npm run lint` (next/core-web-vitals + prettier) → PASS (no warnings/errors).
- Tests: none configured yet (not required for Phase 2).

## VERIFICATION (Phase 3)
- Migrations 0001-0003 applied successfully to local Supabase Postgres image.
- RLS verified for: anonymous read restrictions, student self-only access, teacher content-manager writes, role escalation prevention.
- Foreign key and unique constraint behavior confirmed.
- Test user roles: OWNER (1111...), STUDENT (2222...), TEACHER (3333...).
- Verification scripts: `scripts/local_setup.sql`, `scripts/local_tests.sql`.

## VERIFICATION (Phase 4)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no warnings/errors).
- `npm run build` → PASS (static `/` generated).
- Theme provider + toggle implemented with system/light/dark modes.
- Dashboard homepage with curriculum overview cards implemented.
- Loading/error foundations implemented: `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx`, `components/ui/skeleton.tsx`.
- Back-arrow navigation foundation implemented: `components/navigation/back-button.tsx`.

## VERIFICATION (Phase 5)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no warnings/errors).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + API routes generated).
- Curriculum pages: `/levels`, `/levels/[slug]`, `/levels/[slug]/classes/[slug]`, `/levels/[slug]/classes/[slug]/subjects/[slug]`, `/levels/[slug]/classes/[slug]/subjects/[slug]/chapters/[slug]`, `/levels/[slug]/classes/[slug]/subjects/[slug]/chapters/[slug]/topics/[slug]`.
- Data-driven breadcrumbs and back-arrow navigation integrated on all curriculum pages.
- Progress indicators on chapter/subject pages.

## VERIFICATION (Phase 6)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes generated).
- Content viewers: Notes, Numerical, Flashcard, Quiz, Video, Syllabus, Mind Map.
- Content authoring: resource form, resource link form, API routes with role checks.
- No fake content: viewers show empty states when no data exists.

## VERIFICATION (Phase 7)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes + `/api/search` generated).
- AI provider abstraction: `lib/ai/` with `InternalSearchProvider` (PostgreSQL FTS) and optional `GeminiProvider`.
- Search API: `app/api/search/route.ts` with POST endpoint, server-side only, fallback message + official link.
- Blue AI Widget: `components/ai/blue-ai-widget.tsx` — floating client widget, blue accent, loading/error/empty states.
- Lazy-loaded via `next/dynamic` with `ssr: false` in `AppShell`.
- Settings utility: `lib/settings.ts` for configurable official link.
- Environment variables: `AI_PROVIDER` (default: internal), `GEMINI_API_KEY` (server-side only).
- No fake content: returns fallback message when no results found.

## VERIFICATION (Phase 8)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes + `/api/search` + `/controller` generated).
- Protected controller page: `app/controller/page.tsx` with server-side role check (`canAccessController`).
- Controller shell: `components/controller/controller-shell.tsx` with health, content stats, and feature flags.
- Controller APIs: `app/api/controller/health`, `app/api/controller/content-stats`, `app/api/controller/settings`.
- No secrets exposed; all sensitive operations server-authorized.

## KEY ARCHITECTURAL DIRECTION (unchanged)
- Single auth authority: Supabase Auth. No Prisma. No second auth system.
- Free-first: Next.js + Supabase + free/open-source libs only.
- Four roles: STUDENT, TEACHER, ADMIN, OWNER (centralized RBAC).
- Curriculum and content system implemented (data-driven, no fake content).

## VERIFICATION (Phase 9)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes + `/api/search` + `/controller` + `/lab` generated).
- Lab page: `app/lab/page.tsx` with Physics, Chemistry, Mathematics tabs.
- Physics: projectile motion simulation with parameter controls (velocity, angle, gravity).
- Chemistry: interactive periodic table with element details.
- Mathematics: function graph plotting and lazy-loaded 3D surface (Three.js).
- Three.js is lazy-loaded; not bundled on normal pages.
- Graceful fallback if WebGL/3D is unavailable.

## VERIFICATION (Phase 10)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes + `/api/search` + `/controller` + `/lab` + `/progress` + `/bookmarks` + `/premium` + `/api/admin/premium/requests` generated).
- Progress page: `app/progress/page.tsx` with per-user topic progress and aggregates.
- Bookmarks page: `app/bookmarks/page.tsx` with saved resources list.
- Premium page: `app/premium/page.tsx` with request form and history.
- Premium APIs: `app/api/premium/requests` (student), `app/api/admin/premium/requests` (admin).
- Header and mobile navigation updated with links to all major sections.

## VERIFICATION (Phase 11)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS (static `/` + dynamic curriculum routes + resource routes + API routes + `/api/search` + `/api/storage/upload` + `/controller` + `/lab` + `/progress` + `/bookmarks` + `/premium` + `/search` generated).
- StorageService abstraction: `lib/storage/storage-service.ts` with Supabase Storage implementation.
- Media upload API: `app/api/storage/upload/route.ts` with authentication, type/size validation.
- Search page: `app/search/page.tsx` with dedicated search UI using internal PostgreSQL FTS.
- PostgreSQL FTS search across curriculum and resource tables.

## VERIFICATION (Phase 12)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS.
- Audit logging: `lib/audit/log.ts` with `logAuditEvent` utility; integrated into premium request/approval flows.
- Security headers: middleware sets `x-frame-options`, `x-content-type-options`, `referrer-policy`, and CSP.
- Rate limiting: in-memory per-IP limit in middleware (120 requests/minute).
- CORS: API routes set `access-control-allow-origin` headers where appropriate.
- Input validation: API routes validate required fields, file types, and sizes.
- RLS: verified in Phase 3; policies remain active.

## VERIFICATION (Phase 13)
- Vitest + Testing Library configured with jsdom environment.
- Tests: `tests/lib/auth/roles.test.ts`, `tests/lib/ai/internal-search.test.ts`, `tests/components/ui/progress.test.tsx`.
- `npm run test:run` → 11 tests passed across 3 test files.
- Coverage reporting configured via `vitest --coverage`.
- Playwright E2E configuration available for future critical flows.

## VERIFICATION (Phase 14)
- `npm run typecheck` → PASS.
- `npm run lint` → PASS (no errors; one pre-existing img warning).
- `npm run build` → PASS.
- Lazy loading: Blue AI Widget (`next/dynamic`), Three.js in Math lab, heavy client components deferred.
- Image optimization: Next.js image config with remote patterns.
- Caching: static asset cache headers configured in Next.js config.
- CI/CD: `.github/workflows/ci.yml` with lint, typecheck, test, build on PR/push to main.
- Deployment: ready for Vercel/Cloudflare Pages with production Supabase env vars.

## VERIFICATION (Phase 14 Cloudflare Deployment Fix)
- Fixed corrupted `wrangler.jsonc` (duplicate JSON content) — single valid config.
- Build now runs inside WSL (Ubuntu, Node v20.20.2 via nvm) to generate
  `.vercel/output/static/_worker.js/index.js` via `npx @cloudflare/next-on-pages`.
- Fixed build recursion: `package.json` `build` script is `next build`; next-on-pages
  is invoked directly (Cloudflare-required flow — Vercel CLI `__VERCEL_BUILD_RUNNING`
  guard rejects recursion).
- Edge runtime migration: `export const runtime = "edge"` added to 30 dynamic
  routes (19 API routes incl. `/api/search` switched from `nodejs`; 13 pages).
- fs-based note routes converted for Cloudflare (no `fs`/`path` on edge):
  - `/r-notes/[subject]/[chapter]` and `/ravikishan-notes/[...path]` are now SSG
    (`generateStaticParams` + `dynamicParams = false`).
  - `/api/r-notes`, `/api/ravikishan-notes`, `lib/imported-notes.ts`,
    `components/content/rendered-imported-note.tsx` now import manifests/JSON
    instead of reading the filesystem.
  - Generated `content/ravikishan/_index.json` (134 notes, forward-slash keys —
    also fixes latent Windows-backslash path bug on Linux).
- `wrangler.jsonc`: `main` → `.vercel/output/static/_worker.js/index.js`; added
  `.vercel/output/static/.assetsignore` containing `_worker.js` so the worker
  entry is not uploaded as an asset.
- Verified locally:
  - `wrangler pages dev` → all tested routes return HTTP 200 (static, dynamic
    edge pages, edge API routes, SSG note pages, `/api/search` POST).
  - `wrangler deploy --dry-run` → PASS (882 assets, ASSETS binding + env vars).
- Build output committed artifacts: `.vercel/` is gitignored (regenerate via
  `npx @cloudflare/next-on-pages` inside WSL; Windows npm install on `/mnt/c`
  is unreliable — install/build in WSL ext4 and copy output back).

## VERIFICATION (0.16.0 — AI RESILIENCE + INTERNAL RECOMMENDATIONS)
- Middleware is env-safe: Supabase client creation + `auth.getUser()` wrapped in
  try/catch and guarded by `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  presence check. No more 500-on-every-page when env vars are missing.
- `app/api/search/route.ts`: `official_link` setting fetch wrapped in try/catch —
  search works even when Supabase is unavailable.
- Internal AI provider (`lib/ai/providers/internal.ts`) always registered in
  `lib/ai/service.ts`; `getDefaultProvider()` prefers configured external providers
  (gemini/openrouter) but falls back to "internal". `chat()` and `search()` fall
  back to internal when an external provider is not configured OR fails (invalid
  API key, network error, etc.).
- `AI_PROVIDER` env var read as fallback alias for `AI_DEFAULT_PROVIDER`.
- Deployment status: the site now loads WITHOUT env vars — pages render and AI
  recommends from the site's own syllabus content (pure recommendations, no API
  keys). Supabase-backed features (auth, DB-backed search, progress, bookmarks,
  premium, controller) still require the real env vars
  (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## SECURITY ADVISORY (open, reported)
- Next.js 14.2.15 affected by CVE-2025-55184 (DoS, High) in App Router.
  CVE-2025-55183 (source-code exposure) does NOT affect the 14.x line.
- Compatible fix: upgrade to 14.2.35 (same minor, no breaking/architecture change).
- NOT upgraded silently per user instruction; awaiting explicit approval.

## RISKS / OPEN QUESTIONS
- Next.js security upgrade to 14.2.35 pending user approval.
- `.env.local` holds placeholder values only; `.env.example` has no real secrets.
  No longer a load blocker: since 0.16.0 the site renders and AI recommends from
  internal syllabus content without env vars — only Supabase-backed features need
  the real values.
- Working copy pins `next@15.5.2` (uncommitted downgrade from `^15.5.23`).
  `next@15.5.2` has advisory CVE-2025-66478 (patched in later 15.5.x) — pinned
  for next-on-pages compatibility; keep in mind for future upgrades.
- `@cloudflare/next-on-pages` is deprecated/archived upstream (Cloudflare now
  recommends the OpenNext adapter) — current fix keeps next-on-pages; migration
  is a future decision.

## MIGRATION (FRONTEND/BACKEND SPLIT — CODE COMPLETE)

Full details: `MIGRATION_COMPLETE.md`. Summary:

- **Frontend** (`frontend/`, Next.js 15 App Router): typecheck 0 errors; build PASS
  (64/64 routes: ~20 static + ~44 SSR-on-demand); tests 39/39 across 6 files. No edge
  runtime exports remain. `@supabase/*` + `next-mdx-remote` removed; data loads via a
  fetch-only loader from `/public/data` (server-side absolute origin + no-store).
- **Backend** (`backend/`, Express 4 TS ESM): build PASS; `node dist/index.js` boots with
  zero env vars (lazy Supabase Proxy). Verified: `/health` 200, `/api/exams` 200,
  `/api/r-notes` 200 `{subjects,chapters,notes}`. Global rate limiter (120/min/IP),
  trust proxy, sanitized global errors. Real token auth via `middleware/auth.ts`
  (`supabaseAdmin.auth.getUser` + `profiles.role`).
- **Database**: Supabase is authoritative (17-table schema, `supabase/migrations/0001`,
  RLS in 0002). Neon/Drizzle vestigial — zero runtime imports; drizzle deps removed.
- **Content**: `content/ravikishan/**` → `npm run content:build` → `public/data/**`;
  fetched at request time by both frontend pages and backend file routes. Raw-HTML notes
  render via restored rehype-raw + sanitize pipeline. Exams from `public/data/exams`.
- **AI**: providers only in backend (`src/ai/service.ts`, internal keyless fallback);
  frontend proxies to `/api/ai`; keys belong in `backend/.env` only.
- **Deployment**: UNDECIDED — frontend still produces a Next.js server build, so the old
  Cloudflare Pages static strategy does not apply as-is; `netlify.toml` exists as an
  alternative. Nothing deployed.
- **Open items** (11 listed in `MIGRATION_COMPLETE.md`): browser session transport gap
  (protected endpoints 401 for logged-in browser users), resources PATCH unsanitized +
  DELETE without ownership check, controller settings PATCH lost, storage upload not
  ported, search now authed with officialLink dropped, bookmarks shape drift, progress
  validation dropped, controller payload drift, missing local `backend/.env`, undecided
  deploy target + stale CI, root `app/` kept until cutover.
- Old root `app/` implementation retained intentionally until cutover; duplication mapped
  in `frontend/MIGRATION_FILE_MAP.md`.
