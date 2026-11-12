# 🏗️ Pro Architecture Restructuring Plan

> **Goal:** Transform the current organic codebase into a production-grade, domain-driven architecture that any agent or developer can navigate, understand, and edit in under 5 minutes.
>
> **Philosophy:** Every file has ONE clear home. Every folder name describes its purpose. Empty folders exist as placeholders so the structure is always complete. No file lives at a level where it doesn't belong.

---

## 🤖 AGENT ORIENTATION & STATUS DASHBOARD

> **For any agent reading or continuing this task:**
> 1. Check the dashboard below. Find the **FIRST row** marked `🔄 IN PROGRESS` or `⬜ NOT STARTED`.
> 2. That row is your active phase. Jump directly to its section under [Execution Phases](#-execution-phases).
> 3. Follow its step-by-step checklist. Mark checkboxes `[x]` as you complete each step.
> 4. Run the phase validation command.
> 5. When all checkboxes are done and validation passes, update the phase status in the dashboard to `✅ DONE`.
> 6. Proceed to the next phase, or write a concise completion summary and hand off cleanly.

| Phase | Phase Name | Status | Depends On | Primary Scope | Validation Command |
|---|---|---|---|---|---|
| **0** | [Root Cleanup](#phase-0-root-cleanup-prerequisite) | ✅ DONE | — | Root temp files, logs, secrets | `npm run check` |
| **1** | [Shared Packages Layer](#phase-1-shared-packages-layer) | ✅ DONE | Phase 0 | `packages/shared/` types, errors, constants | `npm run check` |
| **2** | [Backend API Route Grouping](#phase-2-backend-architecture--domain-grouped-api-routes) | ✅ DONE | Phase 1 | `backend/src/api/` → 9 domain routers | `npm run test --workspace=backend` |
| **3** | [Backend AI Engine Grouping](#phase-3-backend-architecture--ai-engine-grouping) | ✅ DONE | Phase 2 | `backend/src/ai/` → 6 concern folders | `npm run test --workspace=backend` |
| **4** | [Backend Services & Repos](#phase-4-backend-architecture--service--repository-layers) | ✅ DONE | Phase 3 | Services, repositories, logger | `npm run test --workspace=backend` |
| **5** | [Frontend Feature Extraction](#phase-5-frontend--feature-module-extraction-big-one) | ✅ DONE (21/21) | Phase 1 | 21 domains extracted from `lib/` | `npm run check` |
| **6** | [Frontend lib/ Reorganization](#phase-6-frontend--lib-reorganization) | ✅ DONE (7/7) | Phase 5 | `lib/core/`, `lib/state/`, `lib/streams/` | `npm run check` |
| **7** | [Frontend Types Hub](#phase-7-frontend--types-consolidation) | ✅ DONE | Phase 6 | `frontend/types/` hub | TypeScript compile |
| **8** | [content-tools/ Reorganization](#phase-8-content-tools-reorganization) | ✅ DONE | Phase 0 | 5 purpose-based subdirs | Content build scripts |
| **9** | [scripts/ Reorganization](#phase-9-scripts-reorganization) | ✅ DONE | Phase 0 | `scripts/ci/`, `scripts/build/`, etc. | `npm run check` |
| **10** | [Documentation & Infrastructure](#phase-10-documentation--infrastructure) | ⬜ NOT STARTED | Phase 0 | ADRs, Dockerfiles, templates | Doc linting / Docker check |
| **11** | [Test Infrastructure](#phase-11-test-infrastructure-enhancement) | ⬜ NOT STARTED | Phase 4 + 6 | Test fixtures, factories, setup | Vitest suites |
| **12** | [Final Verification & Cleanup](#phase-12-final--core_filesmd--import-cleanup) | ⬜ NOT STARTED | ALL | Remove shims, update CORE_FILES, graphify | `npm run check:all` |

**Parallel execution lanes:**
- **Backend stream:** Phase 2 → Phase 3 → Phase 4
- **Frontend stream:** Phase 5 → Phase 6 → Phase 7
- **Independent tasks:** Phase 8, Phase 9, Phase 10 (can run anytime after Phase 0)


---

## 📊 Current State Audit

### What EXISTS and works well ✅
- Next.js 16 App Router with 150+ routes (`frontend/app/`)
- Express backend with 50+ API endpoints (`backend/src/api/`)
- AI orchestration with provider fallback chain (`backend/src/ai/`)
- Content pipeline with 8,000+ curriculum files (`content/`)
- 5-tier access ladder (visitor → member → plus → pro → owner)
- Feature modules for auth, credits, syllabus, mindmap, image-hub
- Test suite with Vitest (unit + component + E2E)
- CI/CD with 8 GitHub Actions workflows
- PWA with service worker
- Graphify knowledge graph for code navigation
- Agent workflow system (AGENTS.md, CORE_FILES.md, BRANCHES.md)

### What is MISSING or poorly organized ❌

| Problem | Where | Impact |
|---|---|---|
| **100+ files dumped flat** in `frontend/lib/` | `frontend/lib/` | Impossible to navigate; no domain grouping |
| **50+ API route files dumped flat** | `backend/src/api/` | No domain separation; ai, content, user routes all mixed |
| **30+ AI files dumped flat** | `backend/src/ai/` | No separation of concerns; prompts, providers, corpus, search all mixed |
| **No shared types package** | Root | Frontend/backend duplicate type definitions |
| **No constants/config layer** | Both | Magic numbers and hardcoded strings scattered everywhere |
| **Types directory nearly empty** | `frontend/types/` (2 files) | Types live scattered across 100+ files |
| **No proper hooks directory structure** | `frontend/lib/hooks/` (11 files, flat) | Many hooks buried inside `lib/` root or `features/` |
| **No service/repository layer in backend** | `backend/src/` | API routes directly call DB — no separation |
| **No DTOs or request/response validation layer** | `backend/src/` | Input validation is ad-hoc per route |
| **No structured error classes** | Both | Errors thrown as raw strings or generic Error |
| **No structured logging** | Backend | `console.log` everywhere |
| **No Docker/containerization** | Root | No reproducible environments |
| **No API documentation (OpenAPI)** | Root | No contract between frontend/backend |
| **No ADRs** | `docs/` | No record of architectural decisions |
| **No seed/fixture data** | `backend/` | No way to bootstrap a dev database |
| **No test factories/builders** | `frontend/tests/`, `backend/tests/` | Test data created ad-hoc |
| **Root polluted with 30+ temp/log files** | Root | Noise; confusing for new agents |
| **`content-tools/` is a flat dump of 50+ scripts** | `content-tools/` | No organization; mix of CJS, TS, JSON |
| **No i18n infrastructure** | Frontend | Platform serves Nepali students but no i18n system |
| **No middleware organization** | `backend/src/middleware/` | OK but missing error handler composition |
| **`frontend/components/` has 30+ subdirs, some single-file** | `frontend/components/` | Inconsistent granularity |
| **Backup (.bak) files committed** | `frontend/lib/` | Dead code in source |
| **`features/` only covers 8 domains** | `frontend/features/` | AI, lab, practice, progress, community etc. live elsewhere |
| **No monitoring/observability** | Both | No health aggregation, no metrics endpoint |

---

## 🎯 Target Architecture (The Pro Blueprint)

```
/
├── .github/                          # CI/CD & GitHub config
│   ├── workflows/                    # All GitHub Actions
│   ├── ISSUE_TEMPLATE/               # Issue templates (bug, feature, content)
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
│
├── docs/                             # All documentation
│   ├── architecture/                 # System design documents
│   │   ├── OVERVIEW.md               # High-level architecture diagram
│   │   ├── FRONTEND.md               # Frontend architecture
│   │   ├── BACKEND.md                # Backend architecture
│   │   ├── DATABASE.md               # Schema, migrations, RLS
│   │   ├── AI_SYSTEM.md              # AI provider chain, prompts, corpus
│   │   └── CONTENT_PIPELINE.md       # Content build, validation, deploy
│   ├── adr/                          # Architecture Decision Records
│   │   └── 000-template.md
│   ├── api/                          # API documentation
│   │   ├── README.md                 # API overview and conventions
│   │   └── endpoints/               # Per-domain endpoint docs
│   ├── guides/                       # Developer & agent guides
│   │   ├── ONBOARDING.md            # New developer quickstart
│   │   ├── TESTING.md               # Test strategy and patterns
│   │   ├── DEPLOYMENT.md            # Deploy process
│   │   └── CONTENT_AUTHORING.md     # How to add curriculum content
│   ├── archive/                      # Historical plans and reports
│   └── runbooks/                     # Operational runbooks
│       ├── INCIDENT_RESPONSE.md
│       └── DATABASE_OPS.md
│
├── packages/                         # Shared packages (new)
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── types/                # Shared TypeScript types
│           │   ├── api.ts            # API request/response contracts
│           │   ├── auth.ts           # Auth & user types
│           │   ├── content.ts        # Content/curriculum types
│           │   ├── ai.ts             # AI service types
│           │   ├── credits.ts        # Credit/billing types
│           │   └── index.ts          # Barrel export
│           ├── constants/            # Shared constants
│           │   ├── subjects.ts       # Subject enums, slugs
│           │   ├── tiers.ts          # Access tier constants
│           │   ├── limits.ts         # Rate limits, quotas
│           │   └── index.ts
│           ├── utils/                # Shared pure utilities
│           │   ├── slug.ts           # Slug helpers
│           │   ├── date.ts           # Date formatting
│           │   ├── validation.ts     # Shared validators (zod schemas)
│           │   └── index.ts
│           └── errors/               # Shared error classes
│               ├── base.ts           # AppError base class
│               ├── auth.ts           # AuthError, ForbiddenError
│               ├── validation.ts     # ValidationError
│               ├── not-found.ts      # NotFoundError
│               ├── rate-limit.ts     # RateLimitError
│               └── index.ts
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.mts
│   ├── .env.example
│   ├── src/
│   │   ├── index.ts                  # Server entrypoint
│   │   ├── app.ts                    # Express app factory
│   │   │
│   │   ├── config/                   # Configuration layer
│   │   │   ├── env.ts                # Env validation (zod)
│   │   │   ├── server.ts             # Server config (port, cors origins)
│   │   │   ├── paths.ts              # File system paths
│   │   │   └── index.ts
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   ├── auth.ts               # JWT / Supabase session verification
│   │   │   ├── rate-limit.ts         # Rate limiting
│   │   │   ├── credit-check.ts       # Credit/spark gate
│   │   │   ├── ai-spark-gate.ts      # AI-specific spark metering
│   │   │   ├── cors.ts               # CORS configuration
│   │   │   ├── security-headers.ts   # Helmet / CSP
│   │   │   ├── error-handler.ts      # Central error → HTTP response mapper
│   │   │   ├── async-handler.ts      # Async route wrapper
│   │   │   ├── request-logger.ts     # Structured request logging (new)
│   │   │   ├── r1-access.ts          # R1 feature gate
│   │   │   └── index.ts              # Barrel
│   │   │
│   │   ├── api/                      # Route handlers — grouped by domain
│   │   │   ├── auth/                 # Auth routes
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.controller.ts
│   │   │   ├── ai/                   # AI chat & generation routes
│   │   │   │   ├── ai.routes.ts
│   │   │   │   ├── chat.controller.ts
│   │   │   │   ├── stream.controller.ts
│   │   │   │   ├── quiz.controller.ts
│   │   │   │   ├── deep-dive.controller.ts
│   │   │   │   ├── figure.controller.ts
│   │   │   │   ├── image.controller.ts
│   │   │   │   ├── math.controller.ts
│   │   │   │   ├── history.controller.ts
│   │   │   │   └── guest.controller.ts
│   │   │   ├── content/              # Content & curriculum routes
│   │   │   │   ├── content.routes.ts
│   │   │   │   ├── subjects.controller.ts
│   │   │   │   ├── chapters.controller.ts
│   │   │   │   ├── topics.controller.ts
│   │   │   │   ├── lessons.controller.ts
│   │   │   │   ├── resources.controller.ts
│   │   │   │   ├── notes.controller.ts
│   │   │   │   └── reveal.controller.ts
│   │   │   ├── practice/             # Practice & exam routes
│   │   │   │   ├── practice.routes.ts
│   │   │   │   ├── pyqs.controller.ts
│   │   │   │   ├── exams.controller.ts
│   │   │   │   ├── tests.controller.ts
│   │   │   │   └── history.controller.ts
│   │   │   ├── user/                 # User profile, progress, bookmarks
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── profile.controller.ts
│   │   │   │   ├── progress.controller.ts
│   │   │   │   ├── bookmarks.controller.ts
│   │   │   │   ├── state.controller.ts
│   │   │   │   └── levels.controller.ts
│   │   │   ├── social/               # Community, leaderboard
│   │   │   │   ├── social.routes.ts
│   │   │   │   ├── community.controller.ts
│   │   │   │   └── leaderboard.controller.ts
│   │   │   ├── admin/                # Owner/admin routes
│   │   │   │   ├── admin.routes.ts
│   │   │   │   ├── owner.controller.ts
│   │   │   │   └── config.controller.ts
│   │   │   ├── platform/             # Platform utility routes
│   │   │   │   ├── platform.routes.ts
│   │   │   │   ├── search.controller.ts
│   │   │   │   ├── storage.controller.ts
│   │   │   │   ├── support.controller.ts
│   │   │   │   └── health.controller.ts  # (new)
│   │   │   ├── r1/                   # R1 life feature routes
│   │   │   │   ├── r1.routes.ts
│   │   │   │   ├── activities.controller.ts
│   │   │   │   ├── habits.controller.ts
│   │   │   │   ├── journal.controller.ts
│   │   │   │   └── plans.controller.ts
│   │   │   └── index.ts              # Mount all domain routers
│   │   │
│   │   ├── services/                 # Business logic layer (new)
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── content.service.ts
│   │   │   ├── credit.service.ts
│   │   │   ├── community.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ai/                       # AI engine — grouped by concern
│   │   │   ├── providers/            # LLM provider adapters
│   │   │   │   ├── agnes.ts          # Primary provider
│   │   │   │   ├── free-llm-pool.ts  # Free-tier fallback pool
│   │   │   │   ├── provider.interface.ts  # Provider contract
│   │   │   │   └── index.ts
│   │   │   ├── prompts/              # All prompt templates
│   │   │   │   ├── academic.ts       # Core academic prompts
│   │   │   │   ├── platform-guide.ts # Platform guide prompt
│   │   │   │   ├── artifact-rules.ts # Artifact formatting rules
│   │   │   │   ├── answer-guide.ts   # Answer depth/style guide
│   │   │   │   └── index.ts
│   │   │   ├── corpus/               # Knowledge base & retrieval
│   │   │   │   ├── curriculum-corpus.ts
│   │   │   │   ├── curriculum-retrieval.ts
│   │   │   │   ├── source-registry.ts
│   │   │   │   ├── source-classify.ts
│   │   │   │   ├── book-ingest.ts
│   │   │   │   └── index.ts
│   │   │   ├── processing/           # Answer processing pipeline
│   │   │   │   ├── complete-answer.ts
│   │   │   │   ├── complete-reveal.ts
│   │   │   │   ├── deep-answer.ts
│   │   │   │   ├── reply-craft.ts
│   │   │   │   ├── truncation.ts
│   │   │   │   ├── depth-regulation.ts
│   │   │   │   ├── citations.ts
│   │   │   │   └── profanity-guard.ts
│   │   │   ├── media/                # Image & diagram generation
│   │   │   │   ├── figure-draw.ts
│   │   │   │   ├── figure-conditions.ts
│   │   │   │   ├── academic-figures.ts
│   │   │   │   ├── image-gen.ts
│   │   │   │   ├── image-input.ts
│   │   │   │   ├── diagram-search.ts
│   │   │   │   └── google-diagrams.ts
│   │   │   ├── intelligence/         # Academic intelligence & scoping
│   │   │   │   ├── academic-intelligence.ts
│   │   │   │   ├── class-scope.ts
│   │   │   │   ├── syllabus-anchor.ts
│   │   │   │   └── history-search.ts
│   │   │   ├── service.ts            # Main AI orchestration
│   │   │   ├── config.ts             # AI-specific config
│   │   │   └── search-engine.ts      # Web search integration
│   │   │
│   │   ├── db/                       # Database layer
│   │   │   ├── client.ts             # Supabase client singleton (rename supabase.ts)
│   │   │   ├── mock-db.ts            # Mock for testing
│   │   │   ├── migrations/           # SQL migrations (001–014+)
│   │   │   ├── seeds/                # Dev seed data (new)
│   │   │   │   ├── users.seed.ts
│   │   │   │   ├── credits.seed.ts
│   │   │   │   └── README.md
│   │   │   └── repositories/         # Data access layer (new)
│   │   │       ├── user.repository.ts
│   │   │       ├── chat.repository.ts
│   │   │       ├── credit.repository.ts
│   │   │       ├── progress.repository.ts
│   │   │       └── base.repository.ts
│   │   │
│   │   ├── auth/                     # Auth internals
│   │   │   ├── supabase.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── jobs/                     # Background jobs / cron
│   │   │   ├── credits-reset.job.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── storage/                  # Object storage (R2)
│   │   │   └── r2.ts
│   │   │
│   │   ├── lib/                      # Internal backend utilities (new)
│   │   │   ├── logger.ts             # Structured logger (new)
│   │   │   ├── response.ts           # Standard API response helpers (new)
│   │   │   └── pagination.ts         # Pagination helpers (new)
│   │   │
│   │   └── utils/                    # Pure utility functions
│   │       ├── bot-policy.ts
│   │       ├── client-ip.ts
│   │       ├── credits.ts
│   │       ├── guest-quota.ts
│   │       ├── mailer.ts
│   │       ├── owner-guard.ts
│   │       ├── status-token.ts
│   │       ├── xp.ts
│   │       └── index.ts
│   │
│   ├── kb/                           # Knowledge base corpus [CONTENT]
│   ├── sources/                      # Quiz/reference source data [CONTENT]
│   ├── scripts/                      # Backend-only scripts
│   └── tests/
│       ├── unit/                     # Unit tests (new subdir)
│       ├── integration/              # Integration tests (new subdir)
│       ├── ai/                       # AI-specific tests
│       ├── fixtures/                 # Test fixtures & factories (new)
│       │   ├── user.fixture.ts
│       │   ├── chat.fixture.ts
│       │   └── factory.ts            # Generic test data factory
│       └── helpers/                  # Test utilities (new)
│           └── setup.ts
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── vitest.config.mts
│   ├── .env.example
│   │
│   ├── app/                          # Next.js App Router (unchanged structure)
│   │   ├── (app)/                    # Authenticated app routes
│   │   ├── (errors)/                 # Error pages (400–504)
│   │   ├── api/                      # Next.js API routes (proxy)
│   │   ├── auth/                     # Auth callback
│   │   ├── admin/                    # Admin panel
│   │   ├── login/
│   │   ├── signup/
│   │   ├── welcome/
│   │   └── ...public pages
│   │
│   ├── components/                   # Shared UI components — by domain
│   │   ├── ui/                       # shadcn/ui primitives (button, card, dialog…)
│   │   ├── layout/                   # App shell, sidebar, header, footer
│   │   ├── navigation/              # Back button, breadcrumbs, nav links
│   │   ├── content/                  # Topic notes, tabs, supplemental materials
│   │   ├── ai/                       # Chat UI, diagram studio, subject classroom
│   │   ├── lab/                      # 3D activity stage, journey, hub
│   │   ├── practice/                 # Practice UI components
│   │   ├── exams/                    # Exam/mock exam components
│   │   ├── home/                     # Tier interfaces, section rails
│   │   ├── study/                    # Study plan, goals, notes sync
│   │   ├── progress/                 # Progress bars, journey views
│   │   ├── graphs/                   # Science graph viewers
│   │   ├── formulas/                 # Formula sheet viewers
│   │   ├── derivations/             # Derivation step viewers
│   │   ├── theorems/                # Theorem/proof viewers
│   │   ├── periodic-table/          # Periodic table island
│   │   ├── certificates/            # Certificate components
│   │   ├── chat/                     # Chat window, message bubbles
│   │   ├── errors/                   # Error boundary, error page
│   │   ├── pwa/                      # SW registrar, install prompt
│   │   ├── streak-badge/            # Streak display
│   │   ├── support/                  # Support/help components
│   │   ├── platform/                # Platform info components
│   │   ├── plans/                    # Study plan components
│   │   ├── viz/                      # Data visualization
│   │   ├── dev/                      # Dev-only debug components
│   │   └── feedback/                 # User feedback components (new)
│   │
│   ├── features/                     # Feature modules — FULL domain coverage
│   │   ├── auth/                     # ✅ exists — login, signup, OAuth, approval
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── actions.ts
│   │   │   ├── schema.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── credits/                  # ✅ exists — spark gate, credit provider
│   │   ├── syllabus/                 # ✅ exists — syllabus views, language pro
│   │   ├── syllabus-history/         # ✅ exists — version comparison
│   │   ├── mindmap/                  # ✅ exists — mindmap viewer
│   │   ├── image-hub/                # ✅ exists — image generation/search
│   │   ├── knowledge/                # ✅ exists — world knowledge, writing
│   │   ├── r1/                       # ✅ exists — R1 life feature
│   │   ├── ai/                       # 🆕 NEW — extract from lib/ai + components/ai
│   │   │   ├── components/           # Chat window, classroom, diagram studio
│   │   │   ├── hooks/                # useChat, useAIQuiz, etc.
│   │   │   ├── prompts.ts
│   │   │   ├── chat-actions.ts
│   │   │   ├── guest-quota.ts
│   │   │   ├── subject-classrooms.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── lab/                      # 🆕 NEW — extract from lib/ lab-* files
│   │   │   ├── components/           # Activity stage, journey, hub
│   │   │   ├── hooks/
│   │   │   ├── registry.tsx          # Lab registry
│   │   │   ├── metadata.ts
│   │   │   ├── manifest.ts
│   │   │   ├── visual-index.ts
│   │   │   ├── activity-loaders.ts
│   │   │   ├── progress.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── practice/                 # 🆕 NEW — extract from lib/practice
│   │   │   ├── components/
│   │   │   ├── mcq-bank.ts
│   │   │   ├── writing-bank.ts
│   │   │   ├── past-papers.ts
│   │   │   ├── contrasts.ts
│   │   │   ├── xp.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── progress/                 # 🆕 NEW — extract from lib/progress
│   │   │   ├── components/
│   │   │   ├── catalog.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── community/                # 🆕 NEW — extract from lib/community
│   │   │   ├── components/
│   │   │   ├── community.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── srs/                      # 🆕 NEW — extract from lib/srs
│   │   │   ├── srs.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── analytics/                # 🆕 NEW — extract from lib/analytics
│   │   │   ├── components/
│   │   │   ├── analytics.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── achievements/             # 🆕 NEW — extract from lib/achievements
│   │   │   ├── components/
│   │   │   ├── achievements.ts
│   │   │   └── index.ts
│   │   ├── study-plan/               # 🆕 NEW — extract from lib/study-plan
│   │   │   ├── components/
│   │   │   ├── study-plan.ts
│   │   │   ├── study-goals.ts
│   │   │   └── index.ts
│   │   ├── billing/                  # 🆕 NEW — extract from lib/billing
│   │   │   ├── billing.ts
│   │   │   └── index.ts
│   │   ├── mock-exam/                # 🆕 NEW — extract from lib/mock-exam
│   │   │   ├── components/
│   │   │   ├── mock-exam.ts
│   │   │   └── index.ts
│   │   ├── offline/                  # 🆕 NEW — extract from lib/offline-pack
│   │   │   ├── offline-pack.ts
│   │   │   └── index.ts
│   │   ├── personal-notes/           # 🆕 NEW — extract from lib/personal-notes
│   │   │   ├── components/
│   │   │   ├── personal-notes.ts
│   │   │   └── index.ts
│   │   ├── streaks/                  # 🆕 NEW — extract from lib/streaks
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   ├── derivations/              # 🆕 NEW — extract from lib/derivations-*
│   │   │   ├── components/
│   │   │   ├── data/                 # All derivation data files
│   │   │   ├── derivations.ts
│   │   │   └── index.ts
│   │   ├── theorems/                 # 🆕 NEW — extract from lib/theorem-*
│   │   │   ├── components/
│   │   │   ├── data/                 # All theorem fill files
│   │   │   ├── theorems.ts
│   │   │   └── index.ts
│   │   ├── formulas/                 # 🆕 NEW — extract from lib/formula-sheet
│   │   │   ├── components/
│   │   │   ├── formula-sheet.ts
│   │   │   └── index.ts
│   │   ├── graphs/                   # 🆕 NEW — extract from lib/graphs
│   │   │   ├── components/
│   │   │   ├── graphs.ts
│   │   │   └── index.ts
│   │   ├── pyqs/                     # 🆕 NEW — extract from lib/pyq-*
│   │   │   ├── components/
│   │   │   ├── pyq-bank.ts
│   │   │   ├── pyq-sources.ts
│   │   │   └── index.ts
│   │   ├── periodic-table/           # 🆕 NEW — extract from lib/periodic-table
│   │   │   ├── components/
│   │   │   ├── periodic-table.ts
│   │   │   └── index.ts
│   │   └── high-yield-facts/         # 🆕 NEW — extract from lib/high-yield-*
│   │       ├── core.ts
│   │       ├── lazy.ts
│   │       ├── match.ts
│   │       └── index.ts
│   │
│   ├── lib/                          # LEAN shared utilities (cleaned)
│   │   ├── core/                     # Core platform registries (new group)
│   │   │   ├── syllabus.ts           # Curriculum source of truth
│   │   │   ├── navigation.ts         # Navigation registry
│   │   │   ├── site-index.ts         # Site index registry
│   │   │   ├── sections.ts           # Study section registry
│   │   │   ├── access-level.ts       # Tier ladder
│   │   │   └── syllabus-neighbors.ts
│   │   │
│   │   ├── api/                      # API client functions (keep)
│   │   │   ├── ai.ts
│   │   │   ├── auth.ts
│   │   │   ├── bookmarks.ts
│   │   │   ├── chat-history.ts
│   │   │   ├── community.ts
│   │   │   ├── config.ts
│   │   │   ├── content.ts
│   │   │   ├── credits.ts
│   │   │   ├── exams.ts
│   │   │   ├── history-search.ts
│   │   │   ├── leaderboard.ts
│   │   │   ├── levels.ts
│   │   │   ├── owner.ts
│   │   │   ├── platform-guide.ts
│   │   │   ├── progress.ts
│   │   │   ├── r1.ts
│   │   │   ├── resources.ts
│   │   │   ├── subjects.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                     # Auth utilities (keep)
│   │   │   ├── roles.ts
│   │   │   └── session-store.ts
│   │   │
│   │   ├── supabase/                 # Supabase client (keep)
│   │   │   ├── browser.ts
│   │   │   ├── oauth-config.ts
│   │   │   └── public-config.ts
│   │   │
│   │   ├── content/                  # Content processing (keep)
│   │   │   ├── paths.ts
│   │   │   ├── pipeline.ts
│   │   │   ├── schema/
│   │   │   ├── topic-supplemental.ts
│   │   │   ├── renderers.tsx
│   │   │   └── ...other content utils
│   │   │
│   │   ├── hooks/                    # All custom React hooks (consolidate)
│   │   │   ├── use-client-clock.ts
│   │   │   ├── use-leaderboard.ts
│   │   │   ├── use-live-stats.ts
│   │   │   ├── use-low-data.ts
│   │   │   ├── use-media-query.ts
│   │   │   ├── use-notifications.ts
│   │   │   ├── use-online-status.ts
│   │   │   ├── use-owner-user-directory.ts
│   │   │   ├── use-section-tiers.ts
│   │   │   ├── use-streak.ts
│   │   │   ├── use-voice-input.ts
│   │   │   ├── use-voice-output.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ui/                       # UI utilities (keep)
│   │   │   ├── subject-visuals.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── perf/                     # Performance utilities (keep)
│   │   │   ├── idle.ts
│   │   │   ├── lite.ts
│   │   │   ├── low-data-policy.ts
│   │   │   ├── measure.ts
│   │   │   ├── memo.ts
│   │   │   └── resource-cache.ts
│   │   │
│   │   ├── state/                    # State management (new group)
│   │   │   ├── user-state.ts
│   │   │   ├── user-state-core.ts
│   │   │   ├── scoped-storage.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── streams/                  # External content streams (new group)
│   │   │   ├── chapter-resources.ts
│   │   │   ├── stream-sources.ts
│   │   │   ├── nepalenotes-streams.ts
│   │   │   ├── webnotee-catalog.ts
│   │   │   └── docs-catalog.ts
│   │   │
│   │   ├── schemas/                  # Zod schemas (keep)
│   │   │   └── exam.ts
│   │   │
│   │   ├── validation/               # Validation utilities (keep)
│   │   │   └── guards.ts
│   │   │
│   │   ├── errors/                   # Frontend error utilities (keep)
│   │   │   └── index.ts
│   │   │
│   │   ├── utils.ts                  # cn() and tiny helpers
│   │   ├── api.ts                    # Base API client
│   │   ├── api-client.ts             # Extended API client
│   │   ├── data-loader.ts            # Generic data loader
│   │   ├── queries.ts                # React Query keys/helpers
│   │   └── site-url.ts               # Canonical URL helper
│   │
│   ├── providers/                    # React context providers
│   │   ├── auth-provider.tsx
│   │   ├── query-provider.tsx
│   │   └── theme-provider.tsx        # (new if needed)
│   │
│   ├── types/                        # Frontend-only type declarations
│   │   ├── api.ts                    # API response types
│   │   ├── content.ts                # Content types (new)
│   │   ├── lab.ts                    # Lab types (moved from lib/types/)
│   │   ├── katex-contrib.d.ts        # Third-party type augments
│   │   └── index.ts                  # Barrel
│   │
│   ├── public/                       # Static assets
│   │   ├── .well-known/
│   │   ├── data/                     # Built content JSON [CONTENT]
│   │   ├── materials/                # Educational materials [CONTENT]
│   │   ├── pdfs/
│   │   ├── resources/
│   │   ├── sw.js                     # Service worker
│   │   ├── manifest.json
│   │   └── icons/                    # App icons (new if missing)
│   │
│   ├── scripts/                      # Frontend build scripts
│   │   └── content/
│   │
│   └── tests/                        # Test suite
│       ├── components/               # Component tests (by domain)
│       ├── features/                 # Feature module tests
│       ├── lib/                      # Library tests
│       ├── providers/                # Provider tests
│       ├── e2e/                      # Playwright E2E tests
│       ├── fixtures/                 # Test fixtures & factories (new)
│       │   ├── user.fixture.ts
│       │   ├── content.fixture.ts
│       │   └── factory.ts
│       └── helpers/                  # Test utilities
│           └── setup.ts
│
├── content/                          # Curriculum content corpus [CONTENT]
│   ├── _index.json                   # Content manifest
│   ├── notes/                        # Concept notes
│   │   └── concepts/
│   │       ├── class-11/
│   │       └── class-12/
│   ├── practice/                     # Practice materials
│   │   ├── questions/
│   │   ├── pyq-links/
│   │   ├── blueprint/
│   │   └── mistakes/
│   ├── formulas/                     # Formula data (new subdir if scattered)
│   └── mindmaps/                     # Mindmap data (new subdir if scattered)
│
├── content-tools/                    # Content pipeline scripts (reorganized)
│   ├── generators/                   # Content generation scripts (new group)
│   │   ├── generate-chemistry-content.cjs
│   │   ├── generate-mindmaps.cjs
│   │   └── generate-real-content.cjs
│   ├── enhancers/                    # Content enhancement scripts (new group)
│   │   ├── enhance-biology-content.cjs
│   │   ├── enhance-chemistry-content.cjs
│   │   ├── enhance-physics-content.cjs
│   │   └── enhance-mindmaps.cjs
│   ├── validators/                   # Content validation scripts (new group)
│   │   ├── validate-bio.cjs
│   │   ├── validate-biology-content.ts
│   │   └── validate-mindmaps.cjs
│   ├── migrators/                    # Content migration scripts (new group)
│   │   ├── migrate-biology.ts
│   │   └── populate-neb-content.cjs
│   ├── fixers/                       # Content fix/repair scripts (new group)
│   │   ├── fix-mindmap-tails.cjs
│   │   ├── fix-placeholders.cjs
│   │   └── fill-all-fields.cjs
│   ├── neb-frag/                     # NEB fragment data
│   └── README.md                     # What each group does (new)
│
├── scripts/                          # Root-level shared scripts
│   ├── ci/                           # CI-specific scripts (new group)
│   │   ├── scoped-check.mjs
│   │   ├── check-smoke-env.mjs
│   │   └── lint-ratchet.mjs
│   ├── build/                        # Build scripts (new group)
│   │   ├── build-affected.mjs
│   │   ├── build-content-corpus.mjs
│   │   └── classify-files.mjs
│   ├── audit/                        # Audit & quality scripts (new group)
│   │   ├── audit-empty-scopes.mjs
│   │   ├── dead-end-ratchet.mjs
│   │   ├── content-health-check.mjs
│   │   └── mobile-responsive-check.mjs
│   ├── deploy/                       # Deploy scripts (new group)
│   │   ├── prune-vercel-deployments.mjs
│   │   └── worktree-flow.mjs
│   ├── enrichment/                   # Content enrichment (keep)
│   ├── tokenkit/                     # Token analysis tools (keep)
│   ├── graphify.mjs                  # Knowledge graph builder
│   ├── graphify-mcp.mjs
│   └── agent-brief.mjs
│
├── infra/                            # Infrastructure & DevOps (new)
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── docker-compose.yml
│   ├── nginx/                        # Reverse proxy config (if needed)
│   │   └── nginx.conf
│   └── README.md
│
├── tools/                            # Developer tools (keep)
│   └── cline-tutor-agent/
│
├── vendor/                           # Third-party data (keep) [CONTENT]
│   └── books/
│
├── visuals-py/                       # Python visual generation (keep)
│   └── visuals_py/
│
├── graphify-out/                     # Knowledge graph output (gitignored)
│
├── .logs/                            # All log files (new, gitignored)
│   └── .gitkeep
│
├── .env.example                      # Root env template
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json                      # Root workspace config
├── turbo.json                        # Turborepo config
├── components.json                   # shadcn/ui config
│
├── README.md                         # Project overview
├── CONTRIBUTING.md                   # Contributor guide
├── LICENSE                           # MIT license
├── CONTENT_LICENSE.md                # CC BY-NC 4.0
├── SECURITY.md                       # Security policy
├── CHANGELOG.md                      # Release changelog (new)
│
├── AGENTS.md                         # Agent workflow guide
├── AGENT_RULES.md                    # Agent safety rules
├── CORE_FILES.md                     # Core file registry
├── BRANCHES.md                       # Branch map
├── SOURCES.md                        # Content rights ledger
├── PROJECT_STATUS.md                 # Deployed architecture
├── SYSTEM_WORK_TRACKER.md            # Work type audit
└── project-conductor.md              # Task classification
```

---

## 🚀 Execution Phases

> **Rules for every phase:**
> 1. Run `npm run check` after each file move/rename
> 2. Update ALL import paths in consumers
> 3. Update `CORE_FILES.md` if a core file moved
> 4. Never break a working import — create re-export shims if needed
> 5. One domain at a time, test before moving to the next

---

### Phase 0: Root Cleanup (Prerequisite)
**Status: ✅ DONE** | Risk: None | Duration: ~15 min | Zero code changes

Move loose files out of root into their proper homes:

| Action | Files | Destination | Status |
|---|---|---|---|
| **Move logs** | `*.log`, `.*.log` (33 files) | `.logs/` (gitignored) | ✅ Done |
| **Move temp plans** | `plan-*.md`, `INCOMPLETE_WORK_PLAN.md`, `CONTINUE_PROMPT.md` (7 files) | `docs/archive/plans/` | ✅ Done |
| **Delete backups** | `frontend/lib/*.bak` (6 files) | Delete | ✅ Done |
| **Move tokens** | `cloudflare-token.txt`, `vercel-token.txt`, `env2` | `.secrets/` (gitignored) | ✅ Done |
| **Move repomix** | `repomix-output.xml` | `.logs/` (gitignored) | ✅ Done |
| **Move debug files** | `sdkerr.txt`, `sdkout.txt` | `.logs/` | ✅ Done |
| **Create .logs/** | New directory | Add `.logs/` to `.gitignore` | ✅ Done |
| **Create .secrets/** | New directory | Add `.secrets/` to `.gitignore` | ✅ Done |
| **Move frontend logs**| `frontend/*.log` (23 files) | `frontend/.logs/` (gitignored) | ✅ Done |
| **Create CHANGELOG.md** | New file | Root (empty template) | ✅ Done |

**Checklist for agent:**
- [x] Create `.logs/`, `.secrets/`, `docs/archive/plans/`
- [x] Move root log/temp files → `.logs/`
- [x] Move root plan files → `docs/archive/plans/`
- [x] Move secret tokens → `.secrets/`
- [x] Delete `.bak` files
- [x] Add `.logs/` and `.secrets/` to `.gitignore`
- [x] Move `frontend/*.log` → `frontend/.logs/`
- [x] Create `CHANGELOG.md` at root

**Completion Gate:** All root cleanup actions completed and verified.

---

### Phase 1: Shared Packages Layer
**Status: ✅ DONE** | Risk: Low | Duration: ~30 min

Create `packages/shared/` with types, constants, errors shared between frontend and backend.

**Steps:**
- [x] 1. Create `packages/shared/package.json` with name `@rn/shared`
- [x] 2. Create `packages/shared/tsconfig.json` with strict type settings
- [x] 3. Configure `@rn/shared` path aliases in `frontend/tsconfig.json`
- [x] 4. Create shared error classes in `packages/shared/src/errors/`:
  - `AppError` base class with `code`, `statusCode`, `message`
  - `AuthError`, `ForbiddenError`, `NotFoundError`, `ValidationError`, `RateLimitError`
  - `index.ts` barrel export
- [x] 5. Create shared constants in `packages/shared/src/constants/`:
  - `subjects.ts` — official subject slugs, names, codes, classes
  - `tiers.ts` — access tier names, ranks, daily spark quotas
  - `limits.ts` — rate limits, page size limits
  - `index.ts` barrel export
- [x] 6. Create shared types in `packages/shared/src/types/`:
  - `api.ts` — standard API response envelope `{ ok, data, error, meta }` & `PaginatedResponse<T>`
  - `auth.ts` — `UserProfile`, `UserSession`
  - `content.ts` — `CurriculumTopicRef`, `CurriculumUnitRef`
  - `ai.ts` — `ChatMessage`, `AIProviderMeta`, `AICompletionOptions`
  - `credits.ts` — `CreditTransaction`, `SparkQuota`
  - `index.ts` barrel export
- [x] 7. Create shared utilities in `packages/shared/src/utils/`:
  - `slug.ts` (`toSlug`, `isValidSlug`), `date.ts` (`toISODate`, `isSameDay`), `validation.ts` (`isNonEmptyString`, `isPositiveNumber`)
  - `index.ts` barrel export
- [x] 8. Create `packages/shared/src/index.ts` top-level barrel export
- [x] 9. Typecheck validation passed: `npx tsc --noEmit -p packages/shared/tsconfig.json` (0 errors)

**Completion Gate:** `packages/shared/` is complete, exported, and cleanly compiles.

---

### Phase 2: Backend Architecture — Domain-Grouped API Routes
**Risk: Medium | Duration: ~1 hour**

Restructure `backend/src/api/` from 50 flat files into domain groups.

**Steps:**
1. Create domain directories under `backend/src/api/`:
   - `auth/`, `ai/`, `content/`, `practice/`, `user/`, `social/`, `admin/`, `platform/`, `r1/`
2. For each domain, create `<domain>.routes.ts` that mounts all controllers
3. Move each existing route file into its domain folder, renaming to `*.controller.ts`:

   | Current file | → New location |
   |---|---|
   | `api/auth.ts` | `api/auth/auth.controller.ts` |
   | `api/ai.ts` | `api/ai/chat.controller.ts` |
   | `api/ai-stream.ts` | `api/ai/stream.controller.ts` |
   | `api/ai-deep-dive.ts` | `api/ai/deep-dive.controller.ts` |
   | `api/ai-enhance.ts` | `api/ai/chat.controller.ts` (merge) |
   | `api/ai-evaluate.ts` | `api/ai/chat.controller.ts` (merge) |
   | `api/ai-figure.ts` | `api/ai/figure.controller.ts` |
   | `api/ai-generate.ts` | `api/ai/chat.controller.ts` (merge) |
   | `api/ai-guest.ts` | `api/ai/guest.controller.ts` |
   | `api/ai-history.ts` | `api/ai/history.controller.ts` |
   | `api/ai-image.ts` | `api/ai/image.controller.ts` |
   | `api/ai-image-facts.ts` | `api/ai/image.controller.ts` (merge) |
   | `api/ai-image-history.ts` | `api/ai/history.controller.ts` (merge) |
   | `api/ai-image-search.ts` | `api/ai/image.controller.ts` (merge) |
   | `api/ai-math.ts` | `api/ai/math.controller.ts` |
   | `api/ai-platform-guide.ts` | `api/ai/chat.controller.ts` (merge) |
   | `api/ai-quiz-history.ts` | `api/ai/quiz.controller.ts` |
   | `api/subjects.ts` | `api/content/subjects.controller.ts` |
   | `api/chapters.ts` | `api/content/chapters.controller.ts` |
   | `api/topics.ts` | `api/content/topics.controller.ts` |
   | `api/lessons.ts` | `api/content/lessons.controller.ts` |
   | `api/resources.ts` | `api/content/resources.controller.ts` |
   | `api/ravikishan-notes.ts` | `api/content/notes.controller.ts` |
   | `api/r-notes.ts` | `api/content/notes.controller.ts` (merge) |
   | `api/content-reveal.ts` | `api/content/reveal.controller.ts` |
   | `api/classes.ts` | `api/content/subjects.controller.ts` (merge) |
   | `api/pyqs.ts` | `api/practice/pyqs.controller.ts` |
   | `api/exams.ts` | `api/practice/exams.controller.ts` |
   | `api/tests.ts` | `api/practice/tests.controller.ts` |
   | `api/practice-history.ts` | `api/practice/history.controller.ts` |
   | `api/user.ts` | `api/user/profile.controller.ts` |
   | `api/progress.ts` | `api/user/progress.controller.ts` |
   | `api/bookmarks.ts` | `api/user/bookmarks.controller.ts` |
   | `api/user-state.ts` | `api/user/state.controller.ts` |
   | `api/levels.ts` | `api/user/levels.controller.ts` |
   | `api/community.ts` | `api/social/community.controller.ts` |
   | `api/leaderboard.ts` | `api/social/leaderboard.controller.ts` |
   | `api/chat-history.ts` | `api/social/community.controller.ts` (merge or keep) |
   | `api/admin.ts` | `api/admin/owner.controller.ts` (merge) |
   | `api/owner.ts` | `api/admin/owner.controller.ts` |
   | `api/controller.ts` | `api/admin/config.controller.ts` |
   | `api/config.ts` | `api/admin/config.controller.ts` (merge) |
   | `api/search.ts` | `api/platform/search.controller.ts` |
   | `api/storage.ts` | `api/platform/storage.controller.ts` |
   | `api/support-requests.ts` | `api/platform/support.controller.ts` |
   | `api/periodic-table.ts` | `api/content/periodic-table.controller.ts` |
   | `api/periodic-unlock.ts` | `api/content/periodic-table.controller.ts` (merge) |
   | `api/biology.ts` | `api/content/subjects.controller.ts` (merge) |
   | `api/r1.ts` | `api/r1/r1.routes.ts` |
   | `api/r1-activities.ts` | `api/r1/activities.controller.ts` |
   | `api/r1-habits.ts` | `api/r1/habits.controller.ts` |
   | `api/r1-journal.ts` | `api/r1/journal.controller.ts` |
   | `api/r1-plans.ts` | `api/r1/plans.controller.ts` |

4. Create `api/index.ts` that imports all domain routers and mounts them
5. Update `app.ts` to use the single `api/index.ts` mount point
6. Create `api/platform/health.controller.ts` — new `/health` endpoint with checks

**Validation:** `npm run test --workspace=backend`, all routes respond correctly.

---

### Phase 3: Backend Architecture — AI Engine Grouping
**Risk: Medium | Duration: ~45 min**

Restructure `backend/src/ai/` from 30 flat files into concern groups.

**Steps:**
1. Create subdirectories: `providers/`, `prompts/`, `corpus/`, `processing/`, `media/`, `intelligence/`
2. Move files into groups (see target architecture above for full mapping)
3. Each group gets an `index.ts` barrel export
4. Update all imports in `backend/src/api/ai/` controllers
5. `service.ts` and `config.ts` stay at `ai/` root as the orchestration layer

**Validation:** `npm run test --workspace=backend`, AI endpoints still work.

---

### Phase 4: Backend Architecture — Service & Repository Layers
**Risk: Medium | Duration: ~1 hour**

Add proper layering: Controller → Service → Repository → DB.

**Steps:**
1. Create `backend/src/services/` directory
2. Create `backend/src/db/repositories/` directory
3. Create `backend/src/lib/` for internal utilities:
   - `logger.ts` — structured JSON logger (wraps console with levels + context)
   - `response.ts` — `success(data)`, `error(code, msg)` response helpers
   - `pagination.ts` — cursor/offset pagination helpers
4. Extract DB calls from controllers into repositories:
   - `user.repository.ts` — user CRUD
   - `chat.repository.ts` — chat message CRUD
   - `credit.repository.ts` — credit operations
   - `progress.repository.ts` — progress tracking
   - `base.repository.ts` — shared Supabase helpers
5. Extract business logic from controllers into services:
   - `auth.service.ts` — login/signup/approval logic
   - `user.service.ts` — profile + settings logic
   - `content.service.ts` — content retrieval + caching
   - `credit.service.ts` — credit check/debit/reset logic
   - `community.service.ts` — thread/post logic
6. Create `backend/src/middleware/error-handler.ts`:
   - Maps `AppError` subclasses to HTTP status codes
   - Logs errors with structured logger
   - Returns consistent error envelope
7. Create `backend/src/middleware/request-logger.ts`:
   - Logs method, path, status, duration
8. Create `backend/src/db/seeds/`:
   - `users.seed.ts` — dev users at each tier
   - `credits.seed.ts` — starter credits
   - `README.md` — how to seed

**Validation:** `npm run test --workspace=backend`, controller → service → repo chain works.

---

### Phase 5: Frontend — Feature Module Extraction (Big One)
**Risk: High | Duration: ~2 hours**

Move domain logic from the flat `lib/` dump into proper `features/` modules.

> **Strategy:** For each moved file, leave a **re-export shim** at the old path so existing imports don't break immediately. Then update consumers in a second pass and delete the shim.

**Steps per feature (repeat for each):**

1. Create `features/<domain>/` with `index.ts`
2. Move the main logic file(s) from `lib/` into the feature
3. Move related components from `components/<domain>/` into `features/<domain>/components/`
4. Create re-export shim at old `lib/` path: `export * from '@/features/<domain>'`
5. Move related hooks into `features/<domain>/hooks/`
6. Create `features/<domain>/types.ts` if the domain has its own types

**Feature extraction order** (safest-first):

| # | Feature | Move from `lib/` | Move from `components/` |
|---|---|---|---|
| 1 | `features/achievements/` | `achievements.ts` | `components/achievements/` |
| 2 | `features/streaks/` | `streaks/` | `components/streak-badge/` |
| 3 | `features/billing/` | `billing.ts` | — |
| 4 | `features/offline/` | `offline-pack.ts` | — |
| 5 | `features/personal-notes/` | `personal-notes.ts` | `components/study/notes-sync.tsx` |
| 6 | `features/srs/` | `srs.ts` | — |
| 7 | `features/analytics/` | `analytics.ts` | — |
| 8 | `features/study-plan/` | `study-plan.ts`, `study-goals.ts` | `components/plans/` |
| 9 | `features/mock-exam/` | `mock-exam.ts` | `components/exams/` |
| 10 | `features/community/` | `community.ts` | — |
| 11 | `features/formulas/` | `formula-sheet.ts` | `components/formulas/` |
| 12 | `features/graphs/` | `graphs.ts` | `components/graphs/` |
| 13 | `features/pyqs/` | `pyq-bank.ts`, `pyq-sources.ts`, `neb-blueprint.ts`, `mistake-guide.ts` | — |
| 14 | `features/periodic-table/` | `periodic-table.ts` | `components/periodic-table/` |
| 15 | `features/derivations/` | `derivations.ts`, `derivations-data*.ts`, `derivations-wave*.ts` (10 files) | `components/derivations/` |
| 16 | `features/theorems/` | `theorems.ts`, `theorem-fill-*.ts`, `theorem-topics.ts` (8 files) | `components/theorems/` |
| 17 | `features/progress/` | `progress/` | `components/progress/` |
| 18 | `features/practice/` | `practice/` | `components/practice/` |
| 19 | `features/high-yield-facts/` | `high-yield-topic-facts*.ts` (4 files) | — |
| 20 | `features/lab/` | `lab-registry.tsx`, `lab-metadata.ts`, `lab-manifest.ts`, `lab-visual-index.ts`, `lab-activity-loaders.ts`, `lab-progress.ts`, `lab-studios/`, `types/lab.ts` | `components/lab/` |
| 21 | `features/ai/` | `ai/` (11 files) | `components/ai/`, `components/chat/` |

**Validation after each extraction:** `npm run check` in frontend.

---

### Phase 6: Frontend — lib/ Reorganization
**Risk: Medium | Duration: ~45 min**

After Phase 5, `lib/` should be much leaner. Now group the remaining files.

**Steps:**
1. [x] Create `lib/core/` and move:
   - `syllabus.ts`, `navigation.ts`, `site-index.ts`, `sections.ts`, `access-level.ts`, `syllabus-neighbors.ts`, `syllabus-notes-manifest.ts`, `curriculum.ts`
2. [x] Create `lib/state/` and move:
   - `user-state.ts`, `user-state-core.ts`, `scoped-storage.ts`
3. [x] Create `lib/streams/` and move:
   - `chapter-resources.ts`, `stream-sources.ts`, `nepalenotes-streams.ts`, `webnotee-catalog.ts`, `docs-catalog.ts`, `pdf-src.ts`, `physics-xi-academic.ts`, `physics-xi-resources.ts`
4. [x] Move `use-media-query.ts` into `lib/hooks/`
5. [x] Delete all `.bak` files (none under `frontend/lib/`; Phase 0 already removed root copies)
6. [x] Delete orphan files that were already re-exported from features (none found — Phase 5 shims at `lib/` root kept until Phase 12)
7. [x] Verify grouped dirs exist (`core/`, `state/`, `streams/`, `hooks/`, …); slim `lib/` root (target list below) deferred to **Phase 12** shim removal:
   - `utils.ts`, `api.ts`, `api-client.ts`, `data-loader.ts`, `queries.ts`, `site-url.ts`, `deploy-version.ts`, `color-contrast.ts`, `webgl.ts`, `notifications.ts`, `spark-metering.ts`, `note-routes.ts`, `note-topic-match.ts`
   - Plus the grouped directories: `core/`, `api/`, `auth/`, `supabase/`, `content/`, `hooks/`, `ui/`, `perf/`, `state/`, `streams/`, `schemas/`, `validation/`, `errors/`

**Validation:** `npm run check`, `npm run check:all`.

---

### Phase 7: Frontend — Types Consolidation
**Risk: Low | Duration: ~20 min**

Beef up `frontend/types/` from 2 files to a proper type hub.

**Steps:**
1. [x] Move `lib/types/lab.ts` → `types/lab.ts` (hub re-exports `features/lab/lab-types`; `lib/types/lab.ts` + `features/lab/types-lab.ts` remain shims)
2. [x] Create `types/content.ts` — content/curriculum display types (`SubjectSlug`/`AcademicClass` from `@rn/shared`, `ClassNotesSlug`, note status)
3. [x] Create `types/index.ts` — barrel export
4. [x] Audit each `features/*/types.ts` — feature-specific types stay in features; `SubjectSlug` deduped via `@/types/content` in practice + AI classrooms

**Validation:** TypeScript compiles cleanly.

---

### Phase 8: content-tools/ Reorganization
**Risk: Low | Duration: ~20 min** | **Status: ✅ DONE**

Group the 50+ flat scripts into purpose-based folders.

**Steps:**
1. [x] Create subdirectories: `generators/`, `enhancers/`, `validators/`, `migrators/`, `fixers/`
2. [x] Move scripts into groups (generate/bio/build → generators; enhance/expand/refine/update → enhancers; validate → validators; migrate/populate/add-tabbed → migrators; fix/fill/ensure/lift → fixers); `debug-build.cjs` stays at root; shim `build-syllabus-notes.js` → `generators/`
3. [x] `neb-frag/` stays as-is
4. [x] Create `content-tools/README.md` documenting each group
5. [x] Fix `__dirname` depth + `populate-bio` → `generators/` module requires

**Validation:** `node content-tools/generators/build-syllabus-notes.js chemistry` runs.

---

### Phase 9: scripts/ Reorganization
**Risk: Low | Duration: ~15 min** | **Status: ✅ DONE**

Group root `scripts/` by purpose.

**Steps:**
1. [x] Create `scripts/ci/` — move `scoped-check.mjs`, `check-smoke-env.mjs`, `lint-ratchet.mjs`, `test-affected.mjs`, `ai-regression.mjs`
2. [x] Create `scripts/build/` — move `build-affected.mjs`, `build-content-corpus.mjs`, `classify-files.mjs`, `content-health-check.mjs`, `content-ledger-live.mjs`
3. [x] Create `scripts/audit/` — move `audit-empty-scopes.mjs`, `dead-end-ratchet.mjs`, `mobile-responsive-check.mjs`
4. [x] Create `scripts/deploy/` — move `prune-vercel-deployments.mjs`, `worktree-flow.mjs`
5. [x] `graphify.mjs`, `graphify-mcp.mjs`, `agent-brief.mjs` stay at `scripts/` root (used directly)
6. [x] `enrichment/` and `tokenkit/` stay as-is
7. [x] Update all `package.json` script paths (+ CI workflows; fix `__dirname` ROOT depth; `scripts/README.md`)

**Validation:** `npm run classify -- --help` / smoke `node scripts/ci/scoped-check.mjs` path resolution; prefer `npm run check` before push.

---

### Phase 10: Documentation & Infrastructure
**Risk: None | Duration: ~30 min**

Fill in the documentation and infrastructure gaps.

**Steps:**
1. Restructure `docs/`:
   - Create `docs/architecture/` — move `ARCHITECTURE.md` here as `OVERVIEW.md`
   - Create `docs/architecture/FRONTEND.md` — frontend architecture doc
   - Create `docs/architecture/BACKEND.md` — backend architecture doc
   - Create `docs/architecture/DATABASE.md` — schema overview
   - Create `docs/architecture/AI_SYSTEM.md` — AI chain doc
   - Move `CONTENT_PIPELINE.md` → `docs/architecture/`
   - Move `DEPLOYMENT.md` → `docs/guides/`
   - Move `API.md` → `docs/api/README.md`
   - Move `docs/archive/` stays
   - Create `docs/adr/000-template.md` — ADR template
   - Create `docs/guides/ONBOARDING.md` — quickstart for new developers
   - Create `docs/guides/TESTING.md` — test strategy
   - Create `docs/runbooks/` — operational runbooks (empty templates)
2. Create `docs/api/endpoints/` (empty for now — populated per domain over time)
3. Create `.github/ISSUE_TEMPLATE/`:
   - `bug_report.md`
   - `feature_request.md`
   - `content_request.md`
4. Create `infra/` directory:
   - `infra/docker/Dockerfile.frontend` — multi-stage Next.js build
   - `infra/docker/Dockerfile.backend` — multi-stage Express build
   - `infra/docker/docker-compose.yml` — frontend + backend + postgres
   - `infra/README.md`
5. Create `CHANGELOG.md` at root (empty template with format guide)

**Validation:** All docs render correctly, Docker builds (if Docker available).

---

### Phase 11: Test Infrastructure Enhancement
**Risk: Low | Duration: ~20 min**

Add proper test scaffolding.

**Steps:**
1. Create `frontend/tests/fixtures/`:
   - `user.fixture.ts` — mock user at each tier
   - `content.fixture.ts` — mock topic/unit/subject
   - `factory.ts` — generic builder pattern
2. Create `backend/tests/fixtures/`:
   - `user.fixture.ts`
   - `chat.fixture.ts`
   - `factory.ts`
3. Create `backend/tests/helpers/setup.ts` — shared test setup
4. Create `backend/tests/unit/` and `backend/tests/integration/` directories
5. Move existing backend tests into appropriate subdirectories

**Validation:** `npm run test` in both workspaces.

---

### Phase 12: Final — CORE_FILES.md & Import Cleanup
**Risk: Low | Duration: ~30 min**

Update all references and documentation.

**Steps:**
1. Update `CORE_FILES.md` with new file paths for every moved core file
2. Update `AGENTS.md` architecture table with new paths
3. Delete all re-export shims created in Phase 5 (consumers already updated)
4. Run final `npm run check:all`
5. Run `graphify update .` to rebuild the knowledge graph
6. Update `README.md` repository layout section
7. Final git commit with the complete restructure

**Validation:** Full `npm run check:all` passes, `graphify` indexes cleanly, no dead imports.

---

## ⚠️ Critical Rules for Execution

1. **NEVER move a file without updating its imports.** Use find-and-replace across the codebase.
2. **Re-export shims are your safety net.** When moving `lib/foo.ts` → `features/bar/foo.ts`, immediately create `lib/foo.ts` that re-exports from the new location. This prevents any consumer from breaking.
3. **One phase at a time.** Complete a phase fully, test it, commit it, then move to the next.
4. **Test between every phase.** `npm run check` minimum; `npm run check:all` for high-risk phases.
5. **Content files are NEVER moved** unless explicitly restructuring the content pipeline. The content tree (`content/`, `frontend/public/data/`, `backend/kb/`) is sacred.
6. **Empty folders ARE the architecture.** Create placeholder `index.ts` or `README.md` in every new directory — even if there's no code yet. A folder that exists documents intent.
7. **Log files and secrets NEVER belong in git.** If a phase touches them, verify `.gitignore` covers them.

---

## 📋 Phase Dependency Graph

```
Phase 0 (Root Cleanup)
    ↓
Phase 1 (Shared Packages)
    ↓
    ├── Phase 2 (Backend API Routes) → Phase 3 (Backend AI) → Phase 4 (Service/Repo Layer)
    │
    └── Phase 5 (Frontend Feature Extraction) → Phase 6 (lib/ Reorg) → Phase 7 (Types)
    
Phase 8 (content-tools/) — independent, can run anytime after Phase 0
Phase 9 (scripts/) — independent, can run anytime after Phase 0
Phase 10 (Docs & Infra) — independent, can run anytime
Phase 11 (Test Infra) — after Phase 4 and Phase 6
Phase 12 (Final Cleanup) — LAST, after all others complete
```

Phases 2–4 (backend) and Phases 5–7 (frontend) can run **in parallel** by separate agents.

---

## ✅ Definition of Done

- [ ] Root has zero loose log/temp files
- [ ] `packages/shared/` exists with types, constants, errors
- [ ] `backend/src/api/` has domain subdirectories, zero flat route files
- [ ] `backend/src/ai/` has concern subdirectories
- [x] `backend/src/services/` and `backend/src/db/repositories/` exist
- [ ] `backend/src/lib/logger.ts` provides structured logging
- [ ] `frontend/features/` covers ALL 21+ domains (not just 8)
- [ ] `frontend/lib/` root has ≤20 files (down from 100+)
- [ ] `frontend/lib/` has grouped subdirectories: `core/`, `state/`, `streams/`
- [ ] `frontend/types/` has ≥4 type declaration files
- [x] `content-tools/` has 5 purpose-based subdirectories
- [ ] `scripts/` has 4 purpose-based subdirectories
- [ ] `docs/` has `architecture/`, `adr/`, `api/`, `guides/`, `runbooks/`
- [ ] `infra/docker/` has Dockerfiles and compose
- [ ] `.github/ISSUE_TEMPLATE/` has 3 templates
- [ ] `CHANGELOG.md` exists
- [ ] `CORE_FILES.md` is updated with all new paths
- [ ] `npm run check:all` passes
- [ ] `graphify update .` completes without errors
- [ ] Zero `.bak` files in the repo
- [ ] Zero re-export shims remaining (all consumers use direct imports)
