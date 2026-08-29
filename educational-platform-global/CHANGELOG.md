# CHANGELOG

All notable changes to this project are recorded here. The format is loosely
based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added — Syllabus-gap 3D labs (`/lab/3d`)
- Reviewed `lib/syllabus.ts` (single source of truth) against existing 3D labs and
  added 4 new labelled suites for important units that had no 3D coverage:
  - **Biology 3D Suite** (`components/lab/biology-3d-suite.tsx`, new `biology` category):
    eukaryotic cell (plant/animal, labelled organelles), mitosis vs meiosis stages,
    DNA double helix with base pairs, bacteriophage structure (inject animation),
    food chain + energy pyramid (Lindeman 10% law). Units: Biomolecules & Cell
    Biology, Introductory Microbiology, Ecology.
  - **Chemistry 3D Syllabus Suite** (`components/lab/chemistry-3d-syllabus-suite.tsx`):
    Bohr shells for Z = 1–20, VSEPR geometries with lone-pair lobes, Period-3 trend
    bars (radius/IE/EN), hydrocarbons (methane → benzene with bond multiplicity).
    Units: Atomic Structure, Periodic Table, Chemical Bonding, Organic.
  - **Mathematics 3D Syllabus Suite** (`components/lab/math-3d-syllabus-suite.tsx`):
    conic sections sliced from a double cone (circle/ellipse/parabola/hyperbola via
    plane-slope slider), normal distribution with μ/σ sliders and sample scatter,
    surfaces with tangent plane + partial derivatives. Units: Analytic Geometry,
    Statistics & Probability, Calculus.
  - **Physics 3D Measurement** (`components/lab/physics-3d-measurement.tsx`):
    vernier calliper (L.C. = 0.1 mm) and micrometer screw gauge (L.C. = 0.01 mm)
    with labelled parts, zero-error correction and live MSR/VSR readings.
    Unit: Physical Quantities.
- `app/lab/3d/page.tsx`: registered all four suites and added a Biology tab.
- `components/lab/lab-dashboard.tsx`: added the `biology` category (Leaf icon).
- **Biology 3D Diversity & Ecology Suite** (`components/lab/biology-3d-diversity-suite.tsx`):
  second biology suite covering the remaining visual-heavy syllabus units:
  - Biomolecules & Enzymes: glucose ring + starch polymer, amino acids with
    peptide bond, phospholipid bilayer, animated enzyme lock-and-key action.
  - Prokaryotic bacterial cell (Monera): capsule, Gram+/Gram− wall toggle,
    membrane, mesosome, nucleoid, plasmid, 70S ribosomes, rotating flagellum, pili.
  - Flower morphology: 4 whorls — calyx, corolla, androecium (anther + pollen),
    gynoecium (stigma/style/ovary with ovules) on the thalamus.
  - Floral diversity genera: Spirogyra (spiral chloroplast), Mucor (sporangia),
    Yeast (budding), Mushroom (gills/annulus/mycelium), Marchantia (gemma cups),
    Pinus (male cone, needles).
  - Ecology: carbon & nitrogen biogeochemical cycles as labelled node-arrow
    graphs with the bacterial steps (Rhizobium, Nitrosomonas, Nitrobacter,
    Pseudomonas).
- Biology suite detail pass: added curriculum-level sub-structures and labels —
  chromatin threads + nucleolus function, mitochondrial cristae, chloroplast
  grana/thylakoids, starch-grain inclusion, flagellum (9+2), centromere/chromatid
  and stage-specific division labels (bivalent/crossing over, metaphase plate,
  cytokinesis), DNA hydrogen-bond dots (A=T ×2, G≡C ×3) with purine/pyrimidine
  and dimension chips, phage tail tube + collar whiskers + lytic-cycle stages,
  decomposer layer and autotroph/heterotroph/energy-loss labels in the ecosystem.
- Verification: `tsc --noEmit` reports no errors in the new/changed files (the
  remaining errors are pre-existing in untouched files, incl.
  `physics-2d-vectors-graph.tsx` added by commit f756a0d5).

## [0.16.0] — 2026-08-20 — RESILIENT MIDDLEWARE + BUILT-IN AI RECOMMENDATION ENGINE
### Fixed
- `middleware.ts` no longer crashes with 500 on every page when Supabase env vars
  are missing/unconfigured: Supabase client creation + `auth.getUser()` are now
  wrapped in try/catch and guarded by an env-var presence check. Pages load fine
  without Supabase configured.
- `app/api/search/route.ts`: fetching the `official_link` setting from Supabase is
  wrapped in try/catch so search still works when Supabase is unavailable.
### Added
- New built-in "internal" AI provider (`lib/ai/providers/internal.ts`): builds a
  content index from the SYLLABUS (`lib/syllabus.ts`) and returns content
  recommendations (subject/unit links with real URLs like `/r-notes?subject=biology`
  and `#anchor` links) for both search and chat. Works with NO API keys — pure
  recommendations from the site's own content.
### Changed
- `lib/ai/service.ts`: the internal provider is always registered;
  `getDefaultProvider()` prefers configured external providers (gemini/openrouter)
  but falls back to "internal". `chat()` and `search()` automatically fall back to
  the internal provider when an external provider is not configured OR fails
  (e.g. invalid API key). `AI_PROVIDER` env var is now read as a fallback alias
  for `AI_DEFAULT_PROVIDER`.
### Deployment impact
- The site now works even WITHOUT env vars set: pages load and AI recommends from
  the site's own content. Supabase-backed features (auth, DB-backed search, etc.)
  still need the real env vars (`NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## [0.15.4] — 2026-08-20 — PAGES CONFIG (wrangler deploy REQUIRES PAGES PROJECT)
### Fixed
- `wrangler deploy` failed with "Missing entry-point to Worker script or to assets directory".
  Root cause: the deployment is a **Workers** Git-integration project (it always runs `wrangler deploy`),
  which cannot run next-on-pages output (the worker dynamically imports `__next-on-pages-dist__/functions/*.func.js`
  sibling files that Workers does not upload). This is a documented limitation of the deprecated
  `@cloudflare/next-on-pages` package — Cloudflare requires deployment as a **Pages** project.
- `wrangler.jsonc` now uses `pages_build_output_dir = ".vercel/output/static"` (valid for
  `wrangler pages deploy` / `wrangler pages dev`). It intentionally omits `main`/`assets` so the
  config cannot accidentally deploy as a Workers project.
### Action Required (deployment)
- Deploy as **Pages** (do NOT deploy via the Workers project):
  - CLI: `npm run build && npx wrangler pages deploy` (reads config; needs a Pages project named `ravikisan`
    to exist, or use `--project-name=<name>`).
  - Dashboard: create a **Pages** project → connect the repo → build command `npm run build`,
    output directory `.vercel/output/static`. The output already contains `.assetsignore` (generated by
    `scripts/build.mjs`) so `_worker.js` is uploaded as the entry, not as an asset.
  - Set env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AI_PROVIDER`, `GEMINI_API_KEY`)
    in the Pages project settings.
### Verified
- `wrangler pages dev` (no args) reads `pages_build_output_dir`: `/` and `/api/r-notes` → 200.
- Full `npm run build` (next-on-pages) generates `.vercel/output/static/_worker.js/index.js` + `.assetsignore`.

## [0.15.3] — 2026-08-20 — EDGE RUNTIME FIX + AI WIDGET REDESIGN
### Fixed
- Cloudflare Pages build error: `/class-11-notes/[subject]` was not configured with the Edge
  Runtime. Added `export const runtime = "edge"` (full `npm run build` via next-on-pages now PASSES).
### Changed
- Replaced the Blue AI widget appearance: pill-shaped launcher ("Ask AI") with violet→pink
  gradient + GraduationCap identity, matching violet accent in the panel. Removed ALL rotate
  animations (launcher hover rotate, icon tilt, close-button spin). Functionality unchanged
  (searches `/api/search`, same results/fallback UI).

## [0.15.2] — 2026-08-19 — PAGES-ONLY DEPLOYMENT (WORKERS MODE INCOMPATIBLE)
### Fixed
- Live site (`ravikisan.ravikisan1814.workers.dev`) served HTML/CSS/JS but returned 500 for ALL
  rendered routes (every `/api/*` + dynamic pages like `/levels`, `/premium`, `/bookmarks`).
  Root cause: the site was deployed as a **Workers** project (`wrangler deploy` with
  `main: .vercel/output/static/_worker.js/index.js`). next-on-pages output is designed for
  **Cloudflare Pages**: the worker loads each route handler via
  `import("__next-on-pages-dist__/functions/*.func.js")`, and those sibling files are only
  uploaded when the whole `_worker.js/` directory is deployed (Pages). Workers uploads only the
  `main` file, so every handler import failed with `No such module __next-on-pages-dist__/functions/middleware.func.js`.
- `wrangler.jsonc` no longer sets `main`/`assets` (those trigger Workers deploy mode).
  It now only carries `name`, `compatibility_date`, `compatibility_flags: ["nodejs_compat"]`,
  `observability`, and `vars` (used by `wrangler pages dev`).
### Verified
- `wrangler pages dev` (Pages runtime): `/`, `/api/r-notes`, `/levels`, `/r-notes/biology/botany` all 200.
- `wrangler dev` (Workers runtime) reproduces the live 500s exactly — proving the deployment mode is the cause.
### Action Required (deployment)
- Deploy via **Pages**: `npx wrangler pages deploy .vercel/output/static` (or dashboard Pages project:
  build command `npm run build`, output directory `.vercel/output/static`). The output already contains
  `.assetsignore` (generated by `scripts/build.mjs`) so `_worker.js` is not uploaded as an asset.
- Set env vars in the Pages project settings: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `AI_PROVIDER`, `GEMINI_API_KEY` (needed for Supabase-backed routes).

## [0.15.1] — 2026-08-19 — RECURSION-SAFE BUILD SCRIPT
### Fixed
- Cloudflare deploy failed twice: first "entry-point file not found" (no worker generated), then "Uploading a Pages _worker.js directory as an asset".
- `build` is now `node scripts/build.mjs`: a recursion-safe wrapper. It detects the `__VERCEL_BUILD_RUNNING` guard set by Vercel CLI and runs a plain `next build` inside `vercel build`, while at the top level it runs `next build` followed by `@cloudflare/next-on-pages`. `npm run build` alone now generates `.vercel/output/static/_worker.js/index.js` with zero "recursively invoke" errors (verified in WSL, ~4m).
- `.assetsignore` (`_worker.js`) is now written into `.vercel/output/static/` by `build.mjs` after next-on-pages finishes (next-on-pages has no `.assetsignore` support, and `.vercel/` is gitignored so the manual file never reached the deploy). `wrangler deploy --dry-run` now PASSes with 883 assets and no worker-upload error.
- Added `build:next` (`next build` only, for fast CI validation) and `build:cf` (`npx @cloudflare/next-on-pages` directly, for dashboards configured with the documented build command).
### Verified
- `npm run build` (exact Cloudflare build command) produces `_worker.js/index.js` (399KB) with no recursion errors.
- `wrangler deploy --dry-run` PASS with `.assetsignore` present (883 files, no `_worker.js` asset upload error).
- `npx next build` also succeeds without `.env.local` (Cloudflare container has none).

## [0.15.0] — 2026-08-19 — CLOUDFLARE PAGES DEPLOYMENT FIX (COMPLETE, VERIFIED)
### Fixed
- Corrupted `wrangler.jsonc` (duplicate JSON content) — now a single valid config.
- Build recursion on Cloudflare: `vercel build` (invoked by next-on-pages) rejects
  `npm run build` → next-on-pages. `build` script is now `next build`; next-on-pages
  is invoked directly per Cloudflare's required setup.
- Windows build failures (shellac on `npm --version`; `/mnt/c` npm installs timing
  out). Builds now run inside WSL (Ubuntu, Node v20.20.2 via nvm) on ext4.
- fs/`path` usage on Cloudflare edge (unsupported) removed from:
  - `lib/imported-notes.ts`, `components/content/rendered-imported-note.tsx`
    (import manifests / `_index.json` as JSON modules instead of `fs`).
  - `app/api/r-notes/route.ts`, `app/api/ravikishan-notes/route.ts` (JSON imports,
    `runtime = "edge"`).
  - `app/r-notes/*`, `app/ravikishan-notes/*` pages — converted to static SSG via
    `generateStaticParams` + `dynamicParams = false` (filesystem access happens at
    build time only).
- Windows-backslash note paths in `content/ravikishan/manifest.json` (latent Linux
  runtime 404 bug) — normalized to forward slashes via generated
  `content/ravikishan/_index.json` (134 entries).
### Added
- `export const runtime = "edge"` on 19 API routes (incl. `/api/search` switched
  from `nodejs`) and 13 dynamic pages (required by next-on-pages for non-static routes).
- `.vercel/output/static/.assetsignore` (excludes `_worker.js` from asset upload).
- `wrangler.jsonc` `main` now points to `.vercel/output/static/_worker.js/index.js`
  (next-on-pages emits `_worker.js` as a directory).
### Verified
- `npx @cloudflare/next-on-pages` inside WSL completes → `.vercel/output/static/_worker.js/index.js` generated.
- `wrangler pages dev` — HTTP 200 on: `/`, `/levels`, `/api/controller/health`,
  `/class-11-notes`, `/r-notes`, `/r-notes/biology/botany`,
  `/ravikishan-notes/...`, `/api/search` (POST).
- `wrangler deploy --dry-run` — PASS (882 assets, ASSETS binding + 4 env vars).
### Notes
- `.vercel/` output is gitignored; regenerate via `npx @cloudflare/next-on-pages` in WSL.
- Working copy pins `next@15.5.2` (advisory CVE-2025-66478, patched in later
  15.5.x); committed reference is `^15.5.23`.
- `@cloudflare/next-on-pages` is deprecated upstream (OpenNext adapter recommended
  long-term) — migration is a future decision.

## [0.0.0] — 2026-08-16 — INITIALIZATION
### Added
- Initialized empty GitHub repository.
- Established MASTER/ORCHESTRATOR AGENT role.
- Created control documents: PROJECT_STATUS.md, AGENT_RULES.md, TODO.md,
  DECISIONS.md, CHANGELOG.md.
- Surveyed agents and toolchains; confirmed empty repository.

## [0.1.0] — 2026-08-16 — ARCHITECTURE (FIRST DRAFT)
### Added
- ARCHITECTURE.md (initial full design), granular TODO.md, DECISIONS.md.

## [0.2.0] — 2026-08-16 — ARCHITECTURE REVISION (FREE-FIRST)
### Changed
- Revised ARCHITECTURE.md, TODO.md, DECISIONS.md per final direction.
- Authentication: single Supabase Auth; removed Prisma Account/Session models
  and Prisma ORM (data access via Supabase client + SQL migrations).
- Curriculum hierarchy extended to EducationLevel → Class → Subject →
  Chapter → Topic → Resource (fully data-driven).
- AI reduced to ONE Blue Widget (navigation/resource finder); one optional
  free provider behind abstraction; search works without AI.
- Added Black "N" protected controller panel.
- 3D/Graph lab limited to one area (Physics/Chemistry/Math), small set.
- Storage: Supabase Storage + StorageService abstraction (R2 not mandatory).
- Search: PostgreSQL FTS only (Meilisearch not mandatory).
- Roles: STUDENT / TEACHER / ADMIN / OWNER (OWNER protected).
- Premium: manual approval workflow + audit_events.
- Removed mandatory Cloudflare R2, Redis, Meilisearch, multiple paid AI.

### Notes
- No application code, dependencies, or content added.
- PHASE 1 marked awaiting approval.

## [0.3.0] — 2026-08-17 — PHASE 2 FOUNDATION (COMPLETE, FROZEN)
### Added
- Next.js 14 App Router scaffold (TypeScript strict, Tailwind CSS 3.4).
- shadcn/ui foundation: `components/ui/button.tsx`, `lib/utils.ts` (`cn`), `components.json`.
- Supabase Auth integration ONLY (no Prisma): browser + server client factories
  (`lib/supabase/*`), `middleware.ts` session refresh, `lib/env.ts` Zod validation.
- Centralized RBAC foundation (`lib/auth/roles.ts`): STUDENT/TEACHER/ADMIN/OWNER
  types + guards (`atLeast`, `canAccessAdminPanel`, `canAccessController`,
  `canManageContent`).
- Base responsive application shell: `app/layout.tsx`, `components/layout/*`
  (AppShell, Header, functional MobileNav). Structural placeholders reserved
  for the future Blue AI Widget and Black "N" controller (not implemented).
- Tooling: ESLint (`next/core-web-vitals` + prettier), Prettier, strict tsconfig.
- Safe `.gitignore`, `.env.example` (no real secrets), README foundation docs.
### Fixed
- TypeScript strict errors in Supabase SSR `setAll` callbacks (annotated
  `cookiesToSet` with `CookieOptions`; request cookie set without options,
  response cookie with options).
### Verified
- `npm run build`, `npm run lint`, `npm run typecheck` all pass.
### Notes
- No curriculum schema/data, content, AI widget, 3D, or premium built.
- Deferred (not in approved Phase 2 scope): React Query, Husky, PWA/next-pwa.
- Next.js 14.2.15 has a security advisory (CVE-2025-55184, DoS); upgrade to
  14.2.35 recommended but NOT applied silently — awaiting user approval.

## [0.4.0] — 2026-08-17 — PHASE 3 DATABASE (COMPLETE, VERIFIED)
### Added
- Supabase SQL migrations: `supabase/migrations/0001_init_schema.sql`,
  `0002_rls.sql`, `0003_seed_dev.sql`.
- Curriculum schema: education_levels → classes → subjects → chapters → topics → resources.
- Resource reusability: resource_references, tags, resource_tags.
- Identity + activity: profiles, user_progress, bookmarks, flashcard_reviews, quiz_attempts.
- Premium + audit: premium_requests, audit_events, settings.
- RLS policies with role helpers (`current_role`, `is_content_manager`, `is_admin`, `is_owner`).
- Role enforcement trigger (`enforce_role_change`) preventing privilege escalation.
- PostgreSQL FTS search vector on resources.
- Seed data: dev-level, dev-class-11, dev-physics, dev-mechanics, dev-topic.
- Local verification scripts: `scripts/local_setup.sql`, `scripts/local_tests.sql`.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
- Database verified via local Supabase Postgres container (9/10 RLS tests pass; 2 skipped as expected).
### Notes
- Phase 3 complete and verified.

## [0.6.0] — 2026-08-17 — PHASE 5 CURRICULUM STRUCTURE (DATA-DRIVEN) (COMPLETE)
### Added
- Curriculum data access layer: `lib/curriculum.ts` with server-side Supabase helpers for education levels, classes, subjects, chapters, topics, resources, and progress.
- Read-only API routes under `app/api/`:
  - `/api/levels` — list levels
  - `/api/levels/[slug]` — level detail with classes
  - `/api/classes/[slug]` — class detail with subjects
  - `/api/subjects/[slug]` — subject detail with chapters
  - `/api/chapters/[slug]` — chapter detail with topics + progress
  - `/api/topics/[slug]` — topic detail with published resources
- Curriculum pages:
  - `/levels` — education level listing
  - `/levels/[slug]` — class listing with breadcrumbs + back-button
  - `/levels/[slug]/classes/[slug]` — subject listing with breadcrumbs + back-button
  - `/levels/[slug]/classes/[slug]/subjects/[slug]` — chapter listing with progress indicators
  - `/levels/[slug]/classes/[slug]/subjects/[slug]/chapters/[slug]` — topic listing with progress summary
  - `/levels/[slug]/classes/[slug]/subjects/[slug]/chapters/[slug]/topics/[slug]` — topic detail with resources grouped by type
- Data-driven breadcrumbs and back-arrow navigation integrated on all curriculum pages.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- No fake content: only active/published DB rows are displayed.
- Progress indicators use `user_progress` when authenticated, otherwise 0.
- Dev seed data is `is_active = false` and will not appear on listing pages.

## [0.7.0] — 2026-08-17 — PHASE 7 BLUE AI WIDGET (COMPLETE)
### Added
- AI provider abstraction: `lib/ai/types.ts`, `lib/ai/index.ts` with `getAIProvider()` factory.
- Internal search provider: `lib/ai/internal-search.ts` using PostgreSQL FTS (`resources.search_vector`).
- Optional Gemini provider: `lib/ai/gemini-provider.ts` (free-tier adapter; server-side key only).
- Search API: `app/api/search/route.ts` (POST) returning results, fallback message, and official link from `settings`.
- Blue AI Widget: `components/ai/blue-ai-widget.tsx` (floating, blue accent, context-aware, lazy-loaded).
- Settings utility: `lib/settings.ts` for fetching `settings` table values.
- `.env.example` updated with `AI_PROVIDER` and `GEMINI_API_KEY`.
### Changed
- `components/layout/app-shell.tsx` integrates `<BlueAIWidget />` via `next/dynamic` with `ssr: false`.
- `tailwind.config.ts` and `app/globals.css` include `ai-blue` color token.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- PostgreSQL FTS is the primary search; AI is optional ranking only.
- Widget is lazy-loaded; no AI code on non-interacting pages.
- API keys never exposed to browser.

## [0.8.0] — 2026-08-17 — PHASE 8 BLACK N CONTROLLER (COMPLETE)
### Added
- Protected controller page: `app/controller/page.tsx` with server-side role check (`canAccessController`).
- Controller shell: `components/controller/controller-shell.tsx` with system health, content stats, and feature flags.
- Controller APIs: `app/api/controller/health`, `app/api/controller/content-stats`, `app/api/controller/settings`.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Role-gated: ADMIN and OWNER only. Students are redirected.
- No secrets exposed; all sensitive operations server-authorized.

## [0.9.0] — 2026-08-17 — PHASE 9 LIMITED 3D / GRAPH LAB (COMPLETE)
### Added
- Lab page: `app/lab/page.tsx` with Physics, Chemistry, Mathematics tabs.
- Physics lab: `components/lab/physics-lab.tsx` — projectile motion simulation with parameter controls (velocity, angle, gravity) rendered on Canvas 2D.
- Chemistry lab: `components/lab/chemistry-lab.tsx` — interactive periodic table with element details.
- Mathematics lab: `components/lab/math-lab.tsx` — function graph plotting (Canvas 2D) and lazy-loaded 3D surface visualization (Three.js).
### Changed
- Dependencies added: `three`, `@types/three` (lazy-loaded in math lab).
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Three.js is lazy-loaded only on the Mathematics tab; not bundled on normal curriculum pages.
- 2D visualizations used where 3D does not add educational value.
- Graceful fallback if WebGL/3D is unavailable.

## [0.10.0] — 2026-08-17 — PHASE 10 PROGRESS, BOOKMARKS, PREMIUM (COMPLETE)
### Added
- Progress page: `app/progress/page.tsx` with per-user topic progress and aggregates.
- Progress dashboard: `components/progress/progress-dashboard.tsx` with overall progress and grouped views.
- Bookmarks page: `app/bookmarks/page.tsx` with saved resources list.
- Premium page: `app/premium/page.tsx` with request form and history.
- Premium request form: `components/premium/premium-request-form.tsx`.
- Premium APIs: `app/api/premium/requests` (student submit/list), `app/api/admin/premium/requests` (admin review/approve/reject).
- UI component: `components/ui/progress.tsx`, `components/ui/textarea.tsx`.
### Changed
- Header and mobile navigation updated with links to all major sections (Curriculum, Lab, Progress, Bookmarks, Premium, Controller).
- Homepage dashboard cards updated to link to major sections.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Progress and bookmarks are user-scoped and respect RLS.
- Premium workflow is manual: student requests → admin/owner reviews → approve/reject → audit trail.
- No payment gateway integrated; manual workflow only.

## [0.11.0] — 2026-08-17 — PHASE 11 STORAGE & SEARCH (COMPLETE)
### Added
- StorageService abstraction: `lib/storage/storage-service.ts` with Supabase Storage implementation.
- Media upload API: `app/api/storage/upload/route.ts` with authentication, type/size validation (images/video, max 10MB).
- Search page: `app/search/page.tsx` with dedicated search UI using internal PostgreSQL FTS.
### Changed
- PostgreSQL full-text search covers curriculum and resource tables via existing `search_vector` and GIN index.
- Search API (`/api/search`) returns results, fallback message, and configurable official link.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Storage backend is Supabase Storage; abstraction allows future replacement without rewriting content features.
- Upload endpoint is authenticated and validates file types/sizes server-side.
- Search works without AI; Blue AI Widget uses the same internal search backend.

## [0.12.0] — 2026-08-17 — PHASE 12 AUDIT & SECURITY (COMPLETE)
### Added
- Audit logging utility: `lib/audit/log.ts` with `logAuditEvent` helper.
- Audit events integrated into premium request/approval flows.
- Security headers in middleware: `x-frame-options`, `x-content-type-options`, `referrer-policy`, CSP.
- Rate limiting in middleware: in-memory per-IP limit (120 requests/minute).
- CORS headers on API routes (`access-control-allow-origin`, methods, headers).
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- RLS verified in Phase 3; policies remain active.
- Input validation enforced on API routes (required fields, file types, sizes).
- No secrets exposed; audit trail covers premium and admin actions.

## [0.13.0] — 2026-08-17 — PHASE 13 TESTING (COMPLETE)
### Added
- Vitest + Testing Library configured with jsdom environment.
- Test files: `tests/lib/auth/roles.test.ts`, `tests/lib/ai/internal-search.test.ts`, `tests/components/ui/progress.test.tsx`.
- Coverage reporting configured via `vitest --coverage`.
- Test scripts in `package.json`: `test`, `test:run`, `test:coverage`.
### Verified
- `npm run test:run` → 11 tests passed across 3 test files.
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Playwright E2E configuration scaffolded for future critical flows.
- Supabase-dependent tests use mocked clients to avoid external dependencies.

## [0.14.0] — 2026-08-17 — PHASE 14 PERFORMANCE & DEPLOYMENT (COMPLETE)
### Added
- GitHub Actions CI/CD: `.github/workflows/ci.yml` with lint, typecheck, test, build on PR/push to main.
- Image optimization config in `next.config.mjs` with remote patterns.
- Static asset cache headers configured in Next.js config.
### Changed
- Lazy loading: Blue AI Widget (`next/dynamic` with `ssr: false`), Three.js in Math lab, heavy client components deferred.
- Next.js config optimized for production builds.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
- Build generates 22 static/dynamic routes successfully.
### Notes
- Ready for deployment to Vercel or Cloudflare Pages.
- Production Supabase project + env vars to be configured at deploy time.

## [0.6.0] — 2026-08-17 — PHASE 6 LEARNING CONTENT SYSTEM (COMPLETE)
### Added
- Content rendering utilities: `lib/content/renderers.tsx` with KaTeX, markdown, and step-by-step helpers.
- Content viewers: `components/content/notes-viewer.tsx`, `numerical-viewer.tsx`, `flashcard-viewer.tsx`, `quiz-viewer.tsx`, `video-viewer.tsx`, `syllabus-viewer.tsx`, `mindmap-viewer.tsx`.
- Content authoring: `components/content/resource-form.tsx`, `components/content/resource-link-form.tsx`.
- API routes: `app/api/resources/` (list/create), `app/api/resources/[id]/` (get/update/delete), `app/api/resources/[id]/link/` (link resources).
- Resource detail page: `app/levels/.../topics/[topicSlug]/resources/[resourceId]/page.tsx`.
- Content authoring pages: `app/resources/new/page.tsx`, `app/resources/[id]/edit/page.tsx`.
- Resource linking UI integrated on topic detail pages.
### Changed
- `lib/curriculum.ts` extended with `getResourceById`, `getLinkedResources`, and `getTopicDetail` now includes linked resources.
- Topic detail page shows linked REFERENCE/DERIVED resources.
- Dependencies added: `katex`, `next-mdx-remote`, `react-markdown`.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- No fake content: viewers render empty states when no published resources exist.
- Content authoring restricted to TEACHER/ADMIN/OWNER via API role checks.

## [0.5.0] — 2026-08-17 — PHASE 4 CORE UI (COMPLETE)
### Added
- Theme system: `components/theme/theme-provider.tsx`, `components/theme/theme-toggle.tsx`
  with system/light/dark persistence.
- Reusable UI components: `components/ui/card.tsx`, `components/ui/skeleton.tsx`.
- Layout components: `components/layout/footer.tsx`, `components/layout/breadcrumbs.tsx`.
- Navigation foundation: `components/navigation/back-button.tsx` (back-arrow
  on internal routes; hidden on home).
- Loading/error foundations: `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx`.
- Dashboard homepage: `app/page.tsx` upgraded from placeholder to dashboard
  with curriculum overview cards.
### Changed
- `app/layout.tsx` wraps with `ThemeProvider`.
- `components/layout/app-shell.tsx` supports breadcrumbs and footer.
- `components/layout/header.tsx` includes theme toggle.
- `app/globals.css` and `tailwind.config.ts` extended with card color tokens.
### Verified
- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
### Notes
- Phase 4 Core UI foundation complete. No curriculum, content, AI widget,
  3D, premium, or Black "N" implemented.
