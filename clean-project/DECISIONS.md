# DECISIONS

Record of major technical decisions for NEB Study Vault / Educational
Platform Global.

## Decision Log

| # | Topic | Status | Owner | Date | Summary |
|---|-------|--------|-------|------|---------|
| 0 | Initialization | Finalized | Orchestrator | 2026-08-16 | Empty repository, orchestrator role, control documents, phase plan. No application work. |
| 1 | Project structure | Finalized | Orchestrator | 2026-08-16 | Single Next.js app at repo root. One codebase, one deploy unit. |
| 2 | Frontend framework | Finalized | Orchestrator | 2026-08-16 | Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui. (Approved in principle; confirm.) |
| 3 | Backend framework | Finalized | Orchestrator | 2026-08-16 | Next.js Route Handlers (unified frontend/backend). No separate backend service. |
| 4 | Database | Finalized | Orchestrator | 2026-08-16 | Supabase (PostgreSQL + Auth + Storage). Free tier. No Prisma. |
| 5 | **Authentication** | Finalized | Orchestrator | 2026-08-16 | **Exactly ONE auth authority: Supabase Auth.** Removed Prisma Account/Session. No Prisma-recreated auth. Profile linked to auth.users. |
| 6 | **ORM removal** | Finalized | Orchestrator | 2026-08-16 | **Prisma removed.** Data access via Supabase JS client + SQL migrations. Simpler, free-first. |
| 7 | **Roles** | Finalized | Orchestrator | 2026-08-16 | Four roles: STUDENT (default public), TEACHER, ADMIN (explicitly granted), OWNER (protected, seeded, never public registration). |
| 8 | **Curriculum hierarchy** | Finalized | Orchestrator | 2026-08-16 | EducationLevel → Class → Subject → Chapter → Topic → Resource. Fully data-driven; no hard-coded curriculum. |
| 9 | **Reusability model** | Finalized | Orchestrator | 2026-08-16 | ORIGINAL / REFERENCE / DERIVED. Canonical resources + resource_references. No duplicate content. |
| 10 | **Syllabus** | Finalized | Orchestrator | 2026-08-16 | First-class resource, owner/admin-supplied, never invented. Review → publish. |
| 11 | **Mind Map** | Finalized | Orchestrator | 2026-08-16 | Optional per chapter/topic. Owner-supplied source; generated maps reviewable; not presented as official. |
| 12 | **Blue AI Widget** | Finalized | Orchestrator | 2026-08-16 | Exactly ONE AI interface. Lightweight navigation/resource finder. Internal-content-first. Not a chatbot/tutor dashboard. |
| 13 | **AI provider** | Finalized | Orchestrator | 2026-08-16 | One free-tier provider behind abstraction. Optional for ranking only. Search works without AI. Keys server-side. |
| 14 | **Black "N" controller** | Finalized | Orchestrator | 2026-08-16 | Protected dev/admin control panel (role-gated). Not the AI widget. No secret exposure. |
| 15 | **3D / Graph lab** | Finalized | Orchestrator | 2026-08-16 | ONE limited lab area (Physics/Chemistry/Math). Small set of useful visualizations. No custom engine. 2D preferred when better. |
| 16 | **Storage** | Finalized | Orchestrator | 2026-08-16 | Supabase Storage initially behind StorageService abstraction. DB for metadata/text. Object storage for media only. R2 not mandatory. |
| 17 | **Search** | Finalized | Orchestrator | 2026-08-16 | PostgreSQL full-text search first. Meilisearch NOT mandatory. AI optional for ranking. |
| 18 | **Premium workflow** | Finalized | Orchestrator | 2026-08-16 | Manual approval (student → request → owner/admin review → approve/reject → audit). No payment gateway. Owner contact in settings. |
| 19 | **Auditability** | Finalized | Orchestrator | 2026-08-16 | audit_events table for content/role/premium/settings/admin actions. |
| 20 | **Free-first infra** | Finalized | Orchestrator | 2026-08-16 | GitHub + Next.js + Supabase + free/open-source browser libs + ONE optional free AI. No mandatory paid services. |
| 21 | **Testing** | Finalized | Orchestrator | 2026-08-16 | Vitest + Testing Library + Playwright + k6 (all free/open-source). |
| 22 | **Deployment** | Finalized | Orchestrator | 2026-08-16 | Vercel or Cloudflare Pages (free) + Supabase (free) + GitHub Actions (free). |
| 23 | **Next.js version / security** | Proposed | Orchestrator | 2026-08-17 | 14.2.15 affected by CVE-2025-55184 (DoS, High) in App Router; CVE-2025-55183 (source exposure) does NOT affect 14.x. Compatible fix: 14.2.35 (same minor). NOT upgraded silently; awaiting user approval. |
| 24 | **Phase 2 stack pins** | Finalized | Orchestrator | 2026-08-17 | Next 14.2.15, React 18.3, Tailwind 3.4 (manual scaffold, not create-next-app). shadcn foundation (Button + components.json + cn). Supabase clients as factories. RBAC centralized in `lib/auth/roles.ts`. Deferred: React Query, Husky, PWA/next-pwa (not required for foundation; avoid unnecessary deps). |
| 25 | **Cloudflare build flow** | Finalized | Orchestrator | 2026-08-19 | `build` script stays `next build`; `@cloudflare/next-on-pages` invoked directly (Vercel CLI recursion guard rejects `npm run build` → next-on-pages). Builds run in WSL ext4 (Windows `/mnt/c` npm installs unreliable/timeout). |
| 26 | **Edge runtime migration** | Finalized | Orchestrator | 2026-08-19 | All dynamic routes run on Edge runtime (`export const runtime = "edge"` — 19 API routes + 13 pages). next-on-pages requires edge for non-static routes; nodejs runtime unsupported. |
| 27 | **fs-free content routes** | Finalized | Orchestrator | 2026-08-19 | Note pages (`/r-notes/*`, `/ravikishan-notes/*`) converted to static SSG (`generateStaticParams` + `dynamicParams = false`); API routes and shared components import manifests / `content/ravikishan/_index.json` as JSON instead of `fs`/`path`. Removes all runtime filesystem access (impossible on Cloudflare edge). |
| 28 | **Wrangler output config** | Finalized | Orchestrator | 2026-08-19 | `wrangler.jsonc` `main` → `.vercel/output/static/_worker.js/index.js` (next-on-pages emits `_worker.js` as a directory). `.assetsignore` excludes `_worker.js` from asset upload. Verified with `wrangler pages dev` + `wrangler deploy --dry-run`. |
| 29 | **Content lifecycle code words** | Finalized | Orchestrator | 2026-08-23 | Shared vocabulary in `lib/content/note-status.ts`, rendered by `StatusBadge`: `NOT_ADDED` (no note attached to a syllabus slot), `EMPTY` (note exists, blank/missing `notes`), `BROKEN` (exists but failed to load/render — incl. manifest/index out-of-sync), `OK` (no badge shown). Fixes silent page-404s from stale entries; empty-state copy now names the state and the fix (`npm run content:build`). |

## Removed / Obsolete Decisions (from earlier draft)

- Prisma ORM as data layer (D-5 old) — **removed**; Supabase client used instead.
- Multi-provider paid AI chain (Groq primary, etc.) — **removed**; one optional free provider.
- Cloudflare R2 as mandatory storage — **removed**; Supabase Storage + abstraction.
- Meilisearch as part of standard stack — **removed**; PostgreSQL FTS only (not mandatory).
- Redis / paid monitoring / paid queues — **never added**; not required.

## Pending Decisions (require approval)

- **Next.js security upgrade**: 14.2.15 → 14.2.35 (patch, no major/architecture change) to address CVE-2025-55184 (DoS, High) in App Router. Awaiting user approval (do not upgrade silently).
- **Deployment platform**: Vercel vs Cloudflare Pages.
- **Specific free AI provider** to implement first (Gemini / OpenRouter free / other) — chosen at PHASE 7, must be free-tier.
- **Custom domain** (if desired) and DNS provider.
- **Video hosting**: YouTube embeds vs Supabase Storage vs other free option (note: user has instructed to ignore video features entirely for now).
- **Exact education levels / classes** for NEB (e.g., "+2 Level" → "Class 11"/"Class 12") — populated PHASE 15 from legitimate sources.
- **Initial git commit**: control docs + foundation are untracked; commit pending user decision (no secrets present).

## Notes
- Architecture is simplified and free-first per the final direction.
- Phase 1 APPROVED. Phase 2 COMPLETE and FROZEN. Phase 3 COMPLETE and VERIFIED.
- Supabase Auth is the only auth system; Prisma was not reintroduced.
- No content, AI widget, 3D, or premium built in Phase 3/4.
- The orchestrator will not proceed to PHASE 5 until the user issues the command.
