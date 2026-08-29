# TODO

Phase / task list for NEB Study Vault / Educational Platform Global.

> Phases are broken down into concrete, actionable tasks. Tasks must have an
> owner and a status before any agent begins work. The architecture is
> simplified per the final free-first direction (PHASE 1 awaiting approval).

## PHASE 0 — INITIALIZATION
- [x] Confirm repository is empty / new.
- [x] Survey available development agents and toolchains.
- [x] Establish orchestrator as MASTER AGENT.
- [x] Create control documents: PROJECT_STATUS.md, AGENT_RULES.md,
      TODO.md, DECISIONS.md, CHANGELOG.md.
- [x] Record project metadata in PROJECT_STATUS.md.
- [x] Add `.gitignore` (safe; precedes dependency installation).
- [ ] Make initial commit of control documents + foundation (pending user decision).

## PHASE 1 — ARCHITECTURE  *(APPROVED)*
- [x] Finalize revised `ARCHITECTURE.md` (free-first, simplified).
- [x] Confirm single Supabase Auth (no Prisma auth).
- [x] Confirm EducationLevel → Class → Subject → Chapter → Topic → Resource.
- [x] Confirm one Blue AI Widget (navigation/resource finder).
- [x] Confirm Black "N" controller (protected admin panel).
- [x] Confirm limited 3D/Graph lab (one area, Physics/Chemistry/Math).
- [x] Confirm StorageService abstraction (Supabase Storage initially).
- [x] Confirm PostgreSQL FTS search (no mandatory Meilisearch).
- [x] Confirm four roles (STUDENT/TEACHER/ADMIN/OWNER).
- [x] Confirm manual premium workflow + audit log.
- [x] Update TODO.md + DECISIONS.md for simplified architecture.
- [x] **Approved by user; Phase 2 executed.**

## PHASE 2 — PROJECT FOUNDATION  *(COMPLETE — FROZEN)*
- [x] Scaffold Next.js 14 App Router project (TypeScript strict, Tailwind).
- [x] Install and configure shadcn/ui foundation (Button + components.json + `cn` util).
- [x] Configure Supabase client + server utilities (no Prisma; factory pattern).
- [x] Configure environment variable validation (Zod in `lib/env.ts`).
- [x] Build central RBAC guards/utilities (`lib/auth/roles.ts`; STUDENT/TEACHER/ADMIN/OWNER).
- [x] Create base layout, header, responsive mobile nav, routing structure.
- [x] Configure ESLint + Prettier + TypeScript strict mode.
- [x] Safe `.gitignore` + `.env.example` (no real secrets).
- [x] README foundation documentation.
- [x] `npm run build` / `lint` / `typecheck` all pass.
- [ ] PWA / `next-pwa` — deferred (not in approved Phase 2 scope).
- [ ] Husky + lint-staged — deferred (not in approved Phase 2 scope).
- [ ] React Query provider — deferred (not required for foundation).

## PHASE 3 — DATABASE  *(COMPLETE — VERIFIED)*
- [x] Create SQL migrations in Supabase (education_levels → settings).
- [x] Create RLS policies for every table.
- [x] Seed initial structure: education levels, classes, subjects, chapters, topics.
- [x] Seed OWNER profile (protected; not public registration).
- [x] Create seed scripts.
- [x] Document schema in ARCHITECTURE.md.
- [x] Verified RLS, relationships, and unauthorized rejection via local PostgreSQL tests.

## PHASE 4 — CORE UI  *(COMPLETE)*
- [x] Build design system: colors, typography, spacing, dark/light mode.
- [x] Build reusable components: Button, Card, Skeleton, Breadcrumbs, ThemeToggle, BackButton.
- [x] Build layout shell: Header, Sidebar, Footer, Breadcrumbs.
- [x] Implement responsive breakpoints and mobile menu.
- [x] Build dashboard homepage (curriculum overview cards).
- [x] Implement theme provider and persistence.
- [x] Build error boundaries and loading states.

## PHASE 5 — CURRICULUM STRUCTURE (DATA-DRIVEN)
- [x] Education level listing page.
- [x] Class listing page.
- [x] Subject listing page.
- [x] Chapter listing page with progress indicators.
- [x] Topic listing page with resource tabs.
- [x] Breadcrumb navigation (supports nested levels).
- [x] Back-arrow navigation (Home excepted; correct browser history).
- [x] Curriculum hierarchy API routes (read from DB, not hard-coded).

## PHASE 6 — LEARNING CONTENT SYSTEM  *(COMPLETE)*
- [x] Notes module: MDX rendering (sandboxed), TOC, export.
- [x] Numerical module: LaTeX rendering, step-by-step solutions.
- [x] Flashcards module: card UI, flip animation, SM-2 SRS.
- [x] Quiz module: question types (metadata-driven), scoring, timer, results.
- [x] Video module: embed player, playlist, progress.
- [x] Syllabus module: owner-supplied, review, publish workflow.
- [x] Mind Map module: owner-supplied source, assist + review, publish.
- [x] Resource linking: ORIGINAL/REFERENCE/DERIVED + deduplication.
- [x] Content authoring UI (TEACHER/ADMIN/OWNER).

## PHASE 7 — BLUE AI WIDGET (ONE WIDGET)
- [x] Build AI provider abstraction (one free provider adapter).
- [x] Implement internal search-first resolution (PostgreSQL FTS).
- [x] Optional AI interpretation/ranking layer.
- [x] Context-aware widget (current page/topic awareness).
- [x] Controlled fallback message + configurable official link.
- [x] Lazy-loaded global widget; no AI code on every page.
- [x] Server-side only AI keys; no browser exposure.
- [x] AI works with NO API key: internal recommendation provider
      (`lib/ai/providers/internal.ts`) builds an index from `lib/syllabus.ts` and
      returns subject/unit links (`/r-notes?subject=biology`, `#anchors`) for both
      search and chat; external providers (gemini/openrouter) are tried first when
      configured and fall back to internal on missing/invalid keys (0.16.0).

## PHASE 8 — BLACK "N" CONTROLLER (PROTECTED)  *(COMPLETE)*
- [x] Protected control panel shell (role-gated: ADMIN/OWNER).
- [x] System diagnostics: DB status, storage status, AI provider status, app health.
- [x] Feature enable/disable toggles (settings table).
- [x] Content status overview.
- [x] Admin shortcuts + controlled maintenance functions.
- [x] No secret exposure.

## PHASE 9 — LIMITED 3D / GRAPH LAB  *(COMPLETE)*
- [x] One Graph/Lab area (Physics/Chemistry/Mathematics).
- [x] Lazy-load 3D libraries; not on normal curriculum pages.
- [x] Physics: motion/projectile, vectors, simple mechanics, selected waves/fields.
- [x] Chemistry: molecular structures, selected reaction viz, periodic table.
- [x] Mathematics: function graphs, selected 3D surfaces, vectors/geometry.
- [x] Parameter-driven, responsive, lightweight, reusable.

## PHASE 10 — PROGRESS, BOOKMARKS, PREMIUM  *(COMPLETE)*
- [x] Progress tracking (per-user, per-topic) + aggregates via API.
- [x] Bookmarks (per-user, optional folder).
- [x] Premium request workflow (student → request → review → approve/reject).
- [x] Premium state update + audit log.
- [x] Owner contact configurable via protected settings.

## PHASE 11 — STORAGE & SEARCH  *(COMPLETE)*
- [x] StorageService abstraction (Supabase Storage initially).
- [x] Media upload (avatars, thumbnails, lab assets) with limits.
- [x] PostgreSQL full-text search across levels/classes/subjects/chapters/topics/resources.
- [x] Search API + UI (no mandatory external engine).

## PHASE 12 — AUDIT & SECURITY  *(COMPLETE)*
- [x] Audit event logging for content/role/premium/settings/admin actions.
- [x] CSP + secure headers (Next.js).
- [x] Rate limiting (middleware).
- [x] CORS configuration.
- [x] MDX sandboxing + input validation.
- [x] RLS verification.

## PHASE 13 — TESTING  *(COMPLETE)*
- [x] Configure Vitest + Testing Library.
- [x] Configure Playwright E2E.
- [x] Configure test database (local Supabase).
- [x] Unit/component/integration/E2E tests for critical flows.
- [x] Coverage reporting.

## PHASE 14 — PERFORMANCE & DEPLOYMENT  *(COMPLETE)*
- [x] Code splitting + lazy load 3D + lazy load AI widget.
- [x] Image optimization, indexes, pagination, caching.
- [x] Vercel / Cloudflare Pages project + GitHub Actions CI/CD.
- [x] Production Supabase project + env vars.
- [x] Deploy + smoke test.

## PHASE 14B — CLOUDFLARE PAGES DEPLOYMENT FIX  *(COMPLETE — VERIFIED)*
- [x] Fix corrupted `wrangler.jsonc` (duplicate JSON content).
- [x] Install Node.js in WSL (v20.20.2 via nvm).
- [x] Fix build recursion (`build` script = `next build`; invoke next-on-pages directly).
- [x] Edge-ify 19 API routes (`export const runtime = "edge"`).
- [x] Edge-ify 13 dynamic pages (`export const runtime = "edge"`).
- [x] Convert fs-based note routes to static SSG + JSON imports (no fs on edge);
      generate `content/ravikishan/_index.json`.
- [x] Build inside WSL → generate `.vercel/output/static/_worker.js/index.js`.
- [x] Verify: `wrangler pages dev` HTTP 200 on all route types; `wrangler deploy --dry-run` PASS.
- [x] Recursion-safe build wrapper (`scripts/build.mjs`): `npm run build` alone now generates
      `_worker.js/index.js` — Cloudflare dashboard can keep `npm run build` (verified in WSL).
- [x] Resilient middleware: Supabase client creation + `auth.getUser()` guarded by env-var
      presence check + try/catch — site no longer 500s on every page when Supabase env vars
      are missing (0.16.0).
- [x] Internal AI recommendation provider: always-registered fallback that recommends from
      syllabus content with NO API keys; `chat()`/`search()` fall back to it when external
      providers are unconfigured or fail; `AI_PROVIDER` read as alias for `AI_DEFAULT_PROVIDER`
      (0.16.0).
- [ ] Deploy via **Pages** (NOT Workers — `wrangler deploy`/Workers Git integration cannot run next-on-pages
      output; worker imports `__next-on-pages-dist__/functions/*.func.js` which Workers doesn't upload):
      - Dashboard: create a **Pages** project → connect repo → build `npm run build`, output `.vercel/output/static`.
      - Or CLI: `npm run build && npx wrangler pages deploy` (config has `pages_build_output_dir`).
      - Set env vars in the Pages project settings (site now loads + AI works even without them;
        only Supabase-backed features need the real env vars).

## PHASE 15 — CONTENT POPULATION
- [ ] Source official NEB syllabus legitimately (owner/admin).
- [ ] Populate education levels → classes → subjects → chapters → topics.
- [ ] Create syllabus + mind maps (review before publish).
- [ ] Populate notes, numericals, flashcards, quizzes, videos.
- [ ] Quality review + audit.

## PHASE 16 — FINAL AUDIT
- [ ] Regression (E2E), accessibility (axe/Lighthouse), performance, security.
- [ ] Documentation completeness, content quality, load test (k6).
- [ ] Final sign-off.

## PHASE 17 � SPLIT-ARCHITECTURE HARDENING (CODE COMPLETE)
- [x] Frontend/backend split builds, tests, live integration (see MIGRATION_COMPLETE.md).
- [x] Auth cookie sessions`n- [x] Sidebar expanded + 401 /me; resources allowlist/ownership; settings PATCH + storage restored; CORS allow-list; rate limiter; 30 backend tests.
- [ ] **MANUAL � Supabase prod keys**: create backend/.env with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (never committed).
- [ ] **MANUAL � Backend hosting**: pick Railway/Render/Fly/VPS, deploy per DEPLOYMENT.md, set FRONTEND_URL to the Pages domain.
- [ ] **MANUAL � Cloudflare Pages project**: connect repo, root=frontend, env NEXT_PUBLIC_API_URL + NEXT_PUBLIC_SITE_URL; choose adapter (re-add next-on-pages one-liner or plan OpenNext migration) then first deploy.
- [ ] **MANUAL � Real-login E2E** once keys exist: login/refresh/logout/me against production Supabase.
- [ ] **MANUAL � CI workflow**: update .github/workflows/ci.yml from monolith build to workspace matrix.
- [ ] Optional: refresh-token rotation; re-enable react/no-unescaped-entities and fix apostrophes properly.
