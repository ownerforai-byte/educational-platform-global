# 🧭 CORE_FILES.md — Platform Core Architecture & File Isolation Registry

> **THE GOLDEN RULE FOR ALL AGENTS:**
> **DO NOT READ ALL FILES.**
> There are over 8,800 files in this repository. Over 95% of them are repetitive **Content Files** (notes, JSON concepts, problem sets, mindmaps, rails).
> You MUST only read the **isolated core files** listed below that give you full routing, wiring, and architectural knowledge.
> **DO ONLY WHAT IS ASKED.**
> When asked to create or edit a file, read ONLY the specific routing and structure files that tell you **WHERE to put it** and **HOW to link/route it**.
> Once done, you MUST mark whether any touched or newly created file is an **Important Core File** or a **Content File**.
>
> **📊 GRAPHIFY-FIRST ORIENTATION (query before cold-reading the codebase):**
> For "where is X / what depends on Y / how do A and B connect", query the graphify
> knowledge graph at `graphify-out/graph.json` (code-only; auto-rebuilt by git hooks):
> - `graphify query "<question>"` · `graphify path "A" "B"` · `graphify explain "<symbol>"` · `graphify god-nodes`
> - Stale? Run `graphify update .` (no LLM needed). Use `/graphify` in your agent session, or connect the `graphify-mcp` server.
> - The graph indexes CODE ONLY — `.graphifyignore` excludes `content/**` + `public/data/**` (the curriculum corpus).

---

## 1. Classification System: Core vs Content

Every file in this project strictly belongs to one of two classes:

### 🏛️ Class 1: Important Core Files (Architecture & Routing)
- **What they are:** Files that define how the platform works, how URLs and routes are registered, global navigation, UI shells, authentication, database schemas, API endpoints, build scripts, and central indexes/registries.
- **Agent Behavior:** Read these when you need to understand how the platform works, find where to register a route, or learn how components link together.
- **Total Count:** ~30 to 40 primary files across the entire platform.

### 📄 Class 2: Content Files (Data & Topic Payloads)
- **What they are:** Topic JSON files under `content/notes/concepts/**`, individual chapter concept notes, pyq question files, mindmap JSON trees, rail cards, raw textbook data.
- **Agent Behavior:** **IGNORE ALL CONTENT FILES UNLESS EXPLICITLY ORDERED** to edit or read a specific topic/content file! Never scan or mass-read content folders.
- **Total Count:** 8,000+ files.

---

## 2. Pro Architecture map (Phases 5–11)

Canonical homes after the restructure. Many `@/lib/*` and `@/components/*` paths are still **one-line re-export shims** into `features/` — prefer the canonical path for new code; do **not** delete shims until a dedicated import codemod lands.

| Concern | Canonical path | Stable shim (keep) |
|---|---|---|
| Syllabus / navigation / access / site index | `frontend/lib/core/*` | `frontend/lib/syllabus.ts`, `navigation.ts`, `access-level.ts`, `site-index.ts`, … |
| User state / scoped storage | `frontend/lib/state/*` | `frontend/lib/user-state.ts`, … |
| Stream / PDF catalogs | `frontend/lib/streams/*` | `frontend/lib/chapter-resources.ts`, … |
| Shared TS hub | `frontend/types/{api,lab,content}.ts` | `frontend/lib/types/lab.ts` → `@/types/lab` |
| Labs / AI / practice / auth UI | `frontend/features/<domain>/` | `frontend/lib/lab-*.ts(x)`, `frontend/components/lab/*`, … |
| Operator configuration | `frontend/lib/owner.ts` + `backend/src/middleware/auth.ts` | — (configured operator accounts) |
| Scoped check / gates | `scripts/ci/scoped-check.mjs` | `npm run check` |
| Classify / corpus build | `scripts/build/*` | `npm run classify`, `content:corpus` |
| Content tooling | `content-tools/{generators,enhancers,validators,migrators,fixers}/` | root shim `build-syllabus-notes.js` |
| Docs | `docs/architecture/`, `docs/guides/`, `docs/adr/`, `docs/runbooks/` | — |
| Shared package (workspace) | `packages/shared` (`@rn/shared`) | — |
| Workspace deploy | `docs/runbooks/deploy-workspaces.md` | — |
| Optional Docker | `infra/docker/` | — |
| Backend tests | `backend/tests/{unit,integration}/` + `fixtures/` | — |

## 3. The Isolated Main Files (The Essential Few)

Whenever you need to know how the platform works and where things route, refer ONLY to these isolated files:

### A. Routing & Navigation Core (Where pages live & how they link)
| File | Role |
|---|---|
| `frontend/lib/core/navigation.ts` (shim: `frontend/lib/navigation.ts`) | **Global Navigation Registry** (`NAV_SECTIONS`, `NAV_HREFS`). Defines sidebar, mobile drawer, all section hubs, access levels, and route paths. |
| `frontend/lib/core/site-index.ts` (shim: `frontend/lib/site-index.ts`) | **Everything Index Registry** (`/site-index`). Aggregates all routable sections across labs, graphs, syllabus, notes, proofs into a unified index. |
| `frontend/lib/srs.ts` | **SM-2 Scheduler & Flashcard Builder** (device-local review state, cards derived from `pyq-bank`). Used by `/srs`. |
| `frontend/lib/study-plan.ts` | **Weekly Plan Generator** (goals + exam date + weak topics from the progress journey). Used by `/planner`. |
| `frontend/lib/mock-exam.ts` | **Mock Exam Assembler & Scorer** (entrance MCQs for the OMR section, `pyq-bank` for the written section). Used by `/mock-exams`. |
| `frontend/lib/analytics.ts` | **Performance Aggregator** (accuracy by subject/topic, unit completion, weekly trend over AI quiz history + progress journey). Used by `/analytics`. |
| `frontend/lib/achievements.ts` | **Badge & Milestone Rules** (derived from streak + journey, nothing stored). Used by `/streaks`. |
| `frontend/lib/community.ts` | **Community Spaces & Ask Prompt Helper** (one space per class/subject from `study-goals` / `syllabus.ts`; question validation). Used by `/community`, `/community/[id]`, `/ask`. |
| `frontend/lib/personal-notes.ts` | **Personal Notes & Annotations Store** (device-local, separate from the curriculum corpus). Used by `/my-notes`. |
| `frontend/lib/offline-pack.ts` | **Offline Unit Pack Builder** (presents `pyq-bank`, `formula-sheet` and `syllabus-notes-manifest` readers as one Markdown file). Used by `/downloads`. |
| `frontend/lib/billing.ts` | **Billing Ledger Reader** (turns `lib/api/credits` transactions into receipts and totals; no payment backend). Used by `/billing`; `/referrals` is a placeholder until a referral data source exists. |
| `frontend/lib/study-goals.ts` | **Study Goals & Preferences Reader** (device-local). Shared by `/onboarding`, `/settings`, `/dashboard`, `/report-card` (views in `frontend/components/study/`); subject options come from `syllabus.ts`. |
| `frontend/lib/core/syllabus.ts` (shim: `frontend/lib/syllabus.ts`) | **Curriculum Single Source of Truth**. Contains official class, subject, unit, and topic hierarchies and slugs. |
| `frontend/app/(app)/layout.tsx` | Main App layout shell, wraps pages in header, sidebar, navigation, auth, and credit gates. |
| `frontend/components/layout/app-shell.tsx` | Main UI layout container and responsive navigation shell. |
| `frontend/app/(app)/not-found.tsx` | In-app 404 boundary: compact `ErrorPage` for non-lab routes; lab routes keep the prior full-screen fallback. |
| `frontend/lib/note-routes.ts` | Canonical note routing and `duplicateType` source selection. |
| `frontend/components/content/topic-vertical-notes.tsx` | Single theory presentation surface for every canonical topic note. |
| `frontend/components/content/content-tabs.tsx` | Companion-only topic tabs; no repeated theory, formulas, summaries, or practice. |
| `frontend/features/docs/academic-doc-layout.tsx` | Global Academic Docs Viewer System: Standardized paper layout (`DocPaper`), reader controls (Print/PDF, font sizing, link copy), KaTeX formula typesetting, and highlighted card system (`DocHighlightCard`) for all academic and knowledge-based data across topics, lab theory, concept panels, Loksewa knowledge, and IOE/CEE/NEB exam preparation guides and model questions. |
| `frontend/features/docs/doc-view.tsx` | Unified Docs Viewer implementation for all 696 syllabus topics with concept maps, explanations, equations, traps, and practice. |
| `frontend/lib/content/topic-supplemental.ts` | Classified supplemental content selector: maps the manifest's guides / formula sheets / practice sets / worked examples / PYQs / graphs to their exact syllabus topic, or to the unit page when the file names no topic. |
| `frontend/components/content/topic-supplemental-materials.tsx` | Renders those selected entries on the topic and unit pages through `MathMarkdown` (never as raw JSON). |
| `frontend/features/syllabus/language-pro.ts` | Language pro registry (`LANGUAGE_PRO_SUBJECTS`) — the one list that decides which subjects get companion-only topic pages; read by the `/pro` routes, the tab profile resolver and the topic links. |
| `frontend/features/syllabus/components/language-pro-topic-view.tsx` | The language topic surface (Nepali and English) rendered by `/chapters/[unit]/topics/[topicSlug]/pro` — seven companion tabs only. |
| `frontend/components/content/ravikishan-topic-resources.tsx` | Resources-panel shortcut to the canonical topic notes; never a second note renderer. |
| `frontend/lib/core/access-level.ts` (shim: `frontend/lib/access-level.ts`) | **Access ladder** (`visitor → member → plus → pro → owner`): rung resolution, rank comparisons, and the hardcoded `TIER_HOME_PATHS` map (`tierHomePathFor`) that every login flow uses to land the viewer on their own tier interface. |
| `frontend/components/home/tier-home-router.tsx` | **Instant tier router** (root `/`): resolves the session's rung on first paint and replaces the view with the viewer's exact tier page — visitors, and only visitors, see `HomePublic`. |
| `frontend/components/home/tier-interfaces.tsx` | **Hardcoded tier interfaces** (`MemberHome`, `PlusHome`, `ProHome`, `OwnerHome`) — one shell + per-rung spotlights, gated rails and section rails; rendered by `/home/member|plus|pro|owner`. |
| `frontend/app/auth/callback/page.tsx` | OAuth callback: exchanges provider code, sets app session cookies, drops supabase-js local records. |
| `frontend/providers/auth-provider.tsx` | Client session state, silent token renewal, and instant logout provider. |
| `frontend/features/auth/components/require-approval.tsx` | Global login and owner-approval route wall for `(app)` routes. |
| `frontend/features/credits/route-gate.tsx` | Spark/coin route unlock gate for paid content categories. |
| `frontend/components/navigation/back-button.tsx` | In-app history tracker and fallback back-to-home navigation control. |
| `frontend/lib/ui/subject-visuals.ts` | Canonical per-subject visual identity (natural glyphs and color tokens). |
| `frontend/lib/core/access-level.ts` (shim: `frontend/lib/access-level.ts`) | Canonical tier ladder, rank comparisons, and tier-home routing. |
| `frontend/lib/core/sections.ts` (shim: `frontend/lib/sections.ts`) | Study-section registry including each section's access tier. |
| `frontend/components/content/section-tier-gate.tsx` | Section-tier enforcement and restricted-section presentation. |
| `frontend/components/home/home-sections.tsx` | Horizontal section-rail renderer using the section registry and tier policy. |

### B. Platform Foundations & System State
| File | Role |
|---|---|
| `CORE_FILES.md` | *This file* — the isolated routing and core architecture index. |
| `AGENTS.md` | Universal agentic workflow entrypoint, Golden Rule, and acceptance gates. |
| `AGENT_RULES.md` | Mandatory safety, security, and syllabus-order rules. |
| `project-conductor.md` | Task classification (`feature:`, `bugfix:`, etc.) and role assignment. |
| `PROJECT_STATUS.md` | Real-time truth of deployed architecture, databases, auth, and environments. |
| `SYSTEM_WORK_TRACKER.md` | Audit of all 31 platform work types and systems. |
| `BRANCHES.md` | Git branch assignment (48 area branches) and scoped test rules. |
| `frontend/lib/content/paths.ts` | The ONE place that knows the classified `content/` tree: section map, class/unit normalization, path parsing. If the tree moves again, it moves here first. |
| `backend/src/db/migrations/013_user_state.sql` | Account-backed user state schema + RLS (one row per user/namespace, versioned JSONB). Must be applied before `/api/user-state` works. |
| `backend/src/api/user-state.ts` | Authenticated GET/PUT/DELETE for personal stores; session-derived identity, optimistic concurrency (409 on stale `baseVersion`). Mounted in `backend/src/app.ts`. |
| `frontend/lib/state/user-state.ts` (shim: `frontend/lib/user-state.ts`) | Sync adapter: pull/push, offline queue + flush, `syncNotes()` merge and `pushNotes()` best-effort write. localStorage stays the render source. |
| `frontend/lib/state/user-state-core.ts` (shim: `frontend/lib/user-state-core.ts`) | Pure conflict policy: `mergeById` (newest edit wins), bounded single-change-per-namespace queue, payload equality. |
| `frontend/components/study/notes-sync.tsx` | Invisible sync driver for `/my-notes` (mount, reconnect, tab visibility). |

### C. Backend API & Middlewares (Server Core)
| File | Role |
|---|---|
| `backend/src/app.ts` | Express app configuration, middleware mounting (CORS, rate limiting, security headers), and route mounting. |
| `backend/src/index.ts` | Backend server entrypoint and port listener. |
| `backend/src/middleware/auth.ts` | Supabase authentication middleware, session verification, user role injection. |
| `backend/src/middleware/creditCheck.ts` | AI and platform credit check and deduction gating. |
| `backend/src/config/env.ts` | Environment variable validation and production detection. |
| `backend/src/utils/botPolicy.ts` | Dependency-free named AI-client deny policy shared by the frontend request proxy, crawler directives, and backend security middleware. |

### D. AI & Core Service Engines
| File | Role |
|---|---|
| `backend/src/ai/service.ts` | AI orchestration, provider fallback chain (Agnes → Internal). |
| `backend/src/ai/prompts.ts` | Master academic prompt definitions. |
| `frontend/lib/ai/prompts.ts` | Frontend prompt configuration and system prompt mirrors. |
| `frontend/features/credits/constants.ts` | Tier quotas, credit pricing, coin gate constants. |
| `backend/src/ai/figure-draw.ts` | Server-side figure-generation orchestration and diagram artifact contracts. |
| `backend/src/ai/image-gen.ts` | Server-side image/diagram generation and research provider integration. |
| `frontend/lib/ai/subject-classrooms.ts` | Registry of subject-specific AI classroom identities, prompts, and independent history namespaces. |
| `frontend/components/ai/diagram-studio.tsx` | Diagram Hub teaching interface: researched/generative figure flow with rendered visual outputs. |
| `frontend/components/ai/diagram-studio-lazy.tsx` | Client `next/dynamic` wrapper for the Diagram Studio (ssr:false must live in a Client Component on Next 16). |
| `frontend/components/periodic-table/periodic-table-lazy.tsx` | Client `next/dynamic` wrapper for the periodic-table island. |
| `frontend/features/image-hub/image-hub-lazy.tsx` | Client `next/dynamic` wrapper for the Image Hub island. |
| `frontend/lib/high-yield-topic-facts.ts` | Eager barrel for all high-yield fact banks; also registers every subject bank into the lazy cache. |
| `frontend/lib/high-yield-topic-facts-lazy.ts` | Per-subject lazy fact-bank loader + `registerHighYieldSubjectBank` escape hatch. |
| `frontend/lib/high-yield-topic-facts-core.ts` | Shared fact-bank types/helpers used by the split subject banks. |
| `frontend/lib/high-yield-topic-facts-match.ts` | Pure topic-fact matching module (no bank imports, safe in any layer). |
| `frontend/lighthouserc.json` | Lighthouse CI collect/assert config (mobile budgets for /home, a class-11 topic, /lab, /pyqs). |
| `frontend/components/ai/subject-classroom.tsx` | Subject classroom UI that keeps conversation history isolated by subject. |
| `frontend/components/content/section-tier-gate.tsx` | Section-tier enforcement and restricted-section presentation. |
| `frontend/components/home/home-sections.tsx` | Horizontal section-rail renderer using the section registry and tier policy. |

### E. Specialized Section Registries (Feature Routing)
| File | Role |
|---|---|
| `frontend/features/lab/lab-registry.tsx` (shim: `frontend/lib/lab-registry.tsx`) | Registry of all 2D/3D interactive labs, simulations, and calculators. The authoritative list; it is a component module and cannot be imported by data-only consumers. |
| `frontend/features/lab/lab-metadata.ts` (shim: `frontend/lib/lab-metadata.ts`) | Data-only mirror of the registry (id/title/category/type/status/color/unit) for search, site index and the manifest, which must stay free of Three.js. Not trusted: the `labManifest` gate fails on a missing id (`registry-metadata-orphan`) or a drifted title (`registry-metadata-drift`). |
| `frontend/features/lab/lab-manifest.ts` (shim: `frontend/lib/lab-manifest.ts`) | **3D activity manifest** (`plan.md` Phase 2): the typed source of truth for activity metadata — subject (all six: Physics, Chemistry, Biology, Mathematics, English, Nepali), class/unit placement, explicit `topicSlugs` (no fuzzy resolution), kind, lifecycle, device tier, fallback and `replaces` lineage. Data-only: never imports a Three.js visual. Canonical deep link is `activityHref(id)` → `/lab/<id>` (percent-encoded: Nepali slugs are Devanagari). |
| `frontend/features/lab/lab-visual-index.ts` (shim: `frontend/lib/lab-visual-index.ts`) | Auto-generated topic-visual index (453 entries from the handoff archive) plus the **manual extension blocks** (343 chapter-animation entries, 2026-11-11) that close every remaining syllabus topic gap — 689/689 topics covered. A regeneration from the archive must PRESERVE the manual blocks. Devanagari is a valid slug charset here (the syllabus emits it for Nepali). |
| `frontend/features/lab/components/language-scenes.ts` (shim via `@/components/lab/*`) | Bespoke 3D scenes for the two language subjects (English, Nepali): story, poem, essay, grammar, writing, speech, culture and timeline models, plus the subject-scoped routing table. English/Nepali topics route here ONLY — never into a science scene. |
| `frontend/features/lab/lab-activity-loaders.ts` (shim: `frontend/lib/lab-activity-loaders.ts`) | Exhaustive renderer resolver: manifest `renderer` (`module` / `visual` / `registry` / `catalog`) → lazy `import()`, so adding an activity without wiring its chunk is a type error. |
| `frontend/lib/core/syllabus-neighbors.ts` (shim: `frontend/lib/syllabus-neighbors.ts`) | Curriculum neighbours for the journey (`nextTopic`, `previousTopic`, `topicHref`) — order comes only from `syllabus.ts`. |
| `frontend/features/lab/lab-progress.ts` (shim: `frontend/lib/lab-progress.ts`) | Device-local “continue where you left off” store for opened activities (no server write, storage failures swallowed). |
| `frontend/features/lab/components/activity-stage.tsx` | The one 3D render surface: request-to-load, `use-scene-tier`, single canvas, declared fallback, loading/error/reset, reduced-motion opt-in. |
| `frontend/features/lab/components/activity-journey.tsx` | The five journey actions (Open full lab · Check understanding · Ask Veer · Notes · Next topic) for a manifest activity. |
| `frontend/features/lab/components/manifest-hub-section.tsx` | Manifest half of `/lab/3d`: subject/kind/“has practice” filters plus the recent-activity strip. |
| `frontend/scripts/lab-manifest-coverage.ts` | Phase 0 inventory + Phase 2 gate (`npm run audit:lab-manifest -- --check`): topic coverage matrix, 3D source inventory, orphan/exemption list, writes `reports/lab-manifest-coverage.json`. Runs in `npm run check` / `check:all`. |
| `frontend/lib/graphs.ts` | Registry for all science graphs and visual data banks. |
| `frontend/lib/pyq-bank.ts` | Registry for past year question banks and solved papers. |
| `frontend/lib/pyq-sources.ts` | **NEB PYQ link-index reader** (`content/practice/pyq-links/<class>/<subject>.json`, mirrored to `public/data/content` by `scripts/pyq-register.mjs`). Every entry is `rights: "link-only"` — NEB papers are ⚠️, so this family links out to providers and never carries paper text. Feeds the "Where to find the full paper" panel on the subject PYQ pages. |
| `frontend/lib/neb-blueprint.ts` | **CDC specification-grid reader** (`content/practice/blueprint/<class>/<subject>.json`): per-unit hours, concepts, question types and hours-proportional `marksEstimate` (always `verified: false` — no invented CDC numbers). Feeds the "NEB blueprint" panel and `sortHighYield()`. |
| `frontend/lib/mistake-guide.ts` | **Common-mistakes reader** (`content/practice/mistakes/<class>/<subject>.json`): exam-hall reminders plus authored wrong/why/fix entries mapped to syllabus unit slugs; the derived `questions` array makes the guide retrievable by the Veer corpus. Feeds the "Common mistakes" panel. |
| `frontend/components/content/neb-guidance.tsx` | The guidance strip under a subject's PYQ page: paper links + blueprint + mistakes in three degradable panels (a missing family renders a quiet "not authored yet", never an error). |
| `frontend/tests/lib/neb-guidance.test.ts` | Integrity gate for the three guidance families: every class × subject authored, mirrored byte-stably to `public/data/content`, registered in `content/_index.json`, link-only rights held, wrong/why/fix present with real unit slugs. |
| `frontend/lib/practice/past-papers.ts` | Server-side reader for the authored `content/practice/questions/<class>/<subject>/neb-YYYY.json` files; feeds the solved-paper section of `/practice` and `/practice/[subject]` (the published manifest carries no question bodies). |
| `frontend/lib/formula-sheet.ts` | Formula vault data and derivation link associations. |
| `frontend/lib/physics-xi-academic.ts` | Physics XI Academic Companion registry — typed accessors over the 26-unit brief dataset (`frontend/public/data/physics-xi-academic/units.json`) plus the canonical brief/document URL helpers used by the `/resources/physics-xi` routes. The dataset is content; this file is the contract for it. |
| `frontend/lib/chapter-resources.ts` | **[IMPORTANT CORE FILE]** Direct Stream chapter registry — the single pool for all three PDF sources (platform / WebNotee / NepalEnotes) across BOTH class tracks, plus `getChapterDocs()` / `getChapterStreamPdfs()` used by every chapter page and Resources tab. Classification tables (`DOC_LOCATIONS`, `WEBNOTEE_LOCATIONS`) plus the NepalEnotes `unitId` fields must resolve to real `syllabus.ts` units. No fixed block cap; a chapter with no document borrows from its own class+subject. |
| `frontend/lib/nepalenotes-streams.ts` | **[IMPORTANT CORE FILE]** 298 scraped NepalEnotes chapter records (class 11 + 12, six subjects), each with recovered title, `unitId` (syllabus classification), `chapterUrl` and its confirmed Google Drive `/preview` PDF ids (171 unique). Retained data — never prune records whose `driveIds` are empty (those source pages are HTML articles with no PDF). |
| `frontend/lib/webnotee-catalog.ts` | **[IMPORTANT CORE FILE]** WebNotee / Google Drive exercise PDF + live-article catalog; classified to class-11 units in `chapter-resources.ts`. |
| `frontend/lib/stream-sources.ts` | **[IMPORTANT CORE FILE]** Source flags for the three live streams and the hidden source badge (`SHOW_SOURCE_BADGE = false`). All three sources must stay `enabled: true`. |
| `frontend/components/content/direct-stream-pdf-blocks.tsx` | **[IMPORTANT CORE FILE]** Doc-count-driven renderer: one framed block per stream, no download control, `scope` badge distinguishes "This chapter" from "Subject reference". |
| `frontend/tests/lib/chapter-resources.test.ts` | Regression gate asserting all three sources stay live, the badge stays hidden, and EVERY chapter of class 11 AND class 12 returns at least one working Direct Stream PDF. |
| `frontend/tests/components/content/note-presentation.test.tsx` | Regression gate for one archive, companion-only tabs, and canonical-source resource links without duplicate note bodies. |
| `frontend/features/auth/pending-signup-identity.ts` | **[IMPORTANT CORE FILE]** Hardcoded pending-signup identification (owner 2026-11-08): a fixed marker + signed status token mirrored in localStorage, sessionStorage and a 7-day cookie, so a refresh/cleared store cannot lose "this browser created an account". Owns the two approval-status routes and `approvalStatusHref()`. Must be used by every place that creates/detects a PENDING account (signup form, login form, OAuth callback, welcome status). |
| `frontend/features/auth/use-pending-signup.ts` | **[IMPORTANT CORE FILE]** Hydration-safe `useSyncExternalStore` hook over the hardcoded identity (`null` while hydrating, then boolean). Chosen over an effect + setState so the React Compiler lint ratchet gains no new finding. |
| `frontend/features/auth/components/account-screen-gate.tsx` | **[IMPORTANT CORE FILE]** The two approval-status screen gates: `/welcome` serves ONLY pending signups ("Your account is on its way"); `/welcome/no-account` serves visitors with no account. Both read the same hardcoded identity and correct a direct URL visit. |
| `frontend/features/auth/components/no-account-card.tsx` | **[IMPORTANT CORE FILE]** Second status screen copy: "There is no record of your active account -- so create one to get access" + Create account / Sign in actions. |
| `frontend/tests/features/auth/account-screens.test.tsx` | Regression gate for the two-screen split, the hardcoded identity routing and the exact no-account message. |
| `frontend/tests/features/auth/pending-signup-identity.test.ts` | Regression gate for three-store persistence, cookie-only recovery and foreign-cookie rejection. |
| `frontend/public/sw.js` | **[IMPORTANT CORE FILE]** Service worker. Owner 2026-11-08: `install` only calls `skipWaiting()`; `activate` deletes EVERY cache from every previous deploy (no allowlist) before rebuilding the current-only shell. Prevents any previous version being served after an update. |
| `frontend/components/pwa/service-worker-registrar.tsx` | **[IMPORTANT CORE FILE]** Registers the SW and auto-applies new versions (SKIP_WAITING + one `controllerchange` reload + `update()` on visibility/load). No manual update toast — a ready version is never left showing the old one. |
| `frontend/tests/lib/version-purge.test.ts` | Runs the real `sw.js` in a VM to assert activation deletes all caches, plus source guards on the auto-update registrar. |
| `frontend/tests/components/pwa/service-worker-registrar.test.tsx` | Rendered test for automatic SKIP_WAITING and the removed update prompt. |
| `backend/src/ai/complete-answer.ts` | **[IMPORTANT CORE FILE]** Owns `originalResearchPaperLink()` / `shortResearchPaperName()` (owner 2026-11-08): one short-named original-paper link appended to EVERY Veer answer, verified paper host first, honest Semantic Scholar topic search fallback, never an invented DOI. Also the deep-concept research + truncation/depth repair helpers. |
| `backend/src/api/ai.ts` | **[IMPORTANT CORE FILE]** Veer chat route. Appends `originalResearchPaperLink()` to `answerSuffix` OUTSIDE the academic-upgrade gate so every answered question ends with the paper link; both SSE and JSON replies use that same suffix. |
| `backend/tests/ai/research-paper-link.test.ts` | Regression gate for the closing paper link: short names, verified-host preference, insecure/blog rejection, honest fallback, no fabricated DOI. |
| `frontend/lib/supabase/oauth-config.ts` | **[IMPORTANT CORE FILE]** Single source of truth for Google OAuth wiring: canonical site/callback URLs, `oauthCallbackUrl()`, and the actionable "Access blocked" diagnostic. Both the sign-in button and the callback page read from here. |
| `frontend/features/auth/components/social-auth-buttons.tsx` | **[IMPORTANT CORE FILE]** Starts Google OAuth with the canonical `redirectTo` and surfaces blocked-provider errors with the exact URLs to register. |
| `frontend/tests/lib/oauth-config.test.ts` | Regression gate for canonical callback resolution, env overrides and blocked-error diagnosis. |
| `frontend/public/{ioe,loksewa,engineering,ad-p-table}.html` | **[IMPORTANT CORE FILE]** Dedicated standalone sub-portal HTML applications (IOE entrance, Loksewa civil service, Engineering/NEC licensure, Ad P Table) with dedicated modular stylesheets in `frontend/public/css/`. |

> Auth surfaces (`/login`, `/signup`, `/welcome`, `/welcome/no-account`, `/auth/callback`) are deliberately **not** listed in `navigation.ts` / `site-index.ts` — they are reached from the access screen, not from the public menu. `route-links.test.ts` still verifies every hardcoded href resolves.

---

## 4. How to Route or Create New Files (Step-by-Step)

When asked to add a new page, feature, or content:

1. **Do NOT read the whole codebase.**
2. **Find the parent route / category in `frontend/lib/navigation.ts` or `frontend/lib/syllabus.ts`.**
3. **Determine the file location:**
   - **New App Page:** `frontend/app/(app)/<route-name>/page.tsx`
   - **New API Endpoint:** `backend/src/api/<feature>.ts` (mounted in `backend/src/app.ts`)
   - **New UI Component:** `frontend/components/<feature>/<component>.tsx`
   - **New Content Topic:** `content/notes/concepts/<class>/<subject>/<unit>/NN-<slug>.json`
4. **Link / Route It:**
   - If it is a new user-accessible page, add its link to `frontend/lib/navigation.ts` and ensure it is covered in `frontend/lib/site-index.ts`.
   - If it is a content topic, ensure its `topicSlug` matches `frontend/lib/syllabus.ts`.
5. **Mark the file before completing the task** (see Section 4).

---

## 5. Mandatory Post-Task Marking Protocol

Before ending any task, an agent MUST state in its output and record whether the touched or created files are **Important Core Files** or **Content Files**:

```markdown
### 🏷️ File Classification Report
- `frontend/lib/navigation.ts` → **[IMPORTANT CORE FILE]**: (Reason, e.g. Added new route to navigation registry)
- `content/` → **[CONTENT FILE]**: (Reason, e.g. Added learner-facing syllabus or topic data)
```

If a new architecture or routing file was created, add it to Section 2 of `CORE_FILES.md`.
If a content file was created, future agents will know it is a content file and must ignore it.
