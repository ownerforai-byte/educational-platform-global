# Android native PARITY plan — make the app identical to the website

**Status:** Core journeys already live in `android-native/` (home, syllabus, notes, practice, Veer chat, community feed, search, auth, notifications, settings — see [`android-native-STATUS.md`](android-native-STATUS.md)).
**Background plan (architecture & history):** [`android-native-compose-migration-plan.md`](android-native-compose-migration-plan.md) — still authoritative for boundaries, tooling, and phases 0–8 already completed.
**This plan covers:** the remaining campaign to reach **100% feature parity** with the website, and the standing rule that keeps them identical forever after.

**Owner directive:** *"My aim is to make them identical — adding in one means adding in both."*
**Chosen path:** **Option B — pure native porting.** No WebView bridge. Until a section ships, the app shows an honest "Coming to native" placeholder (never a silent gap, never a web page pretending to be the app).

---

## 0. Multi-agent execution — 4 workers + Reviewer (Agent 5)

> Owner says *"You are Agent N (parity plan)"* → read **only** that section below.
> Session-checkpoint format, no-wait rule, and integration-queue mechanics are **identical to the migration plan §0.1/§0.7** — reuse them verbatim; do not invent new formats.

### 0.0 Roles

| Role | You are | Builds product code? | Reviews others? |
|:----:|---------|:-------------------:|:---------------:|
| **Worker 1** | Platform, navigation, parity CI, release | Yes | No |
| **Worker 2** | Backend mobile API expansion | Yes | No |
| **Worker 3** | Native data layer + algorithm ports | Yes | No |
| **Worker 4** | All student UI (screens, mindmaps, labs) | Yes | No |
| **Agent 5** | **Reviewer** — reviews every worker's edits, audits parity, owns sign-off | **No feature code** | **Yes — everyone** |

**No-wait rule (Workers 1–4):** unchanged from the migration plan — never stop for another worker; use local fakes, file an INTEGRATION REQUEST in your checkpoint, keep implementing.

**Reviewer rule (Agent 5):** you do not implement screens, endpoints, or repos. You **read the real code** — open every worker-touched file and study it in full, never judge from diffs, summaries, or chat claims — run builds/tests yourself, audit parity against `frontend/lib/core/navigation.ts`, maintain the integration queue, and write CONTINUE orders in STATUS §7. You are the only agent who can declare a batch **Done**.

### 0.1 Session checkpoint

Same block as migration plan §0.1, with one extra line workers must include:

```text
── PARITY LEDGER (workers: update every session) ────────────────
• Website sections total:        [count from parity script]
• Native-live:                   [n]   Placeholder: [n]   Not started: [n]
• My batch contribution this session: [+n sections]
```

### 0.2 Ownership map (hard boundaries)

| Worker | Owns (may edit) | Must not touch |
|:------:|-----------------|----------------|
| **1** | `android-native/app/build.gradle.kts`, `AndroidManifest.xml`, `navigation/**`, `ui/theme/**`, `scripts/ci/native-parity-check.mjs`, `android-native/README.md` | Worker 2/3/4 feature files |
| **2** | `backend/src/api/mobile/**`, `backend/src/api/contracts/public-schemas.ts` (additive), `docs/api/mobile-*.md`, backend tests for mobile routes | Any existing `/api/*` behavior (additive only), `frontend/**` |
| **3** | `android-native/**/data/**`, `core/contract/**`, `core/stream/**`, new `core/logic/**` (Kotlin ports of `frontend/lib/*.ts`), their unit tests | UI screens (Worker 4), nav (Worker 1) |
| **4** | `android-native/**/ui/screens/**`, `ui/components/**`, per-feature `local/` fakes | Repos/contracts (Worker 3), endpoints (Worker 2) |
| **5** | `android-native-STATUS.md` (§4/§5/§7), `android-native-integration-queue.md`, plan **wording only** | Any worker's Kotlin/TS feature code |

Shared, unchanged rules: no edits to `android-twa/android/**`, no breaking `/api/*` changes, no secrets in git, dev id stays `com.ravikisan.platform.compose` until promotion.

**Single-writer rule for shared files (prevents mix-ups):** a few files sit on every worker's path. Each has **exactly one writer**; everyone else changes them only through an INTEGRATION REQUEST → Agent 5 → queue → the owning worker:

| Shared file | Single writer |
|-------------|---------------|
| `di/AppModule.kt` (17+ providers — every worker wants one) | **Worker 1** wires all new `@Provides` from queue requests |
| `navigation/RnNavHost.kt`, `Routes` | **Worker 1** |
| `app/build.gradle.kts`, `AndroidManifest.xml` | **Worker 1** |
| `core/contract/**` (Kotlin DTOs) | **Worker 3** — but only from Worker 2's published schema doc (W2 owns the TS schema as source of truth; W3 mirrors it in Kotlin) |
| `data/db/AppDatabase.kt` (Room schema) | **Worker 3** |
| `android-native-STATUS.md` | workers **append** their §4 blocks; Agent 5 owns §5/§7 |
| `docs/guides/android-native-parity-plan.md` route map | **Agent 5** |

A worker who edits a shared file directly (not via request) is a boundary violation Agent 5 must flag and revert.

### 0.3 Worker 1 — Platform, navigation, parity CI & release

| # | Task | Reference |
|---|------|-----------|
| 0 | **B0 only:** take over single-writer duty for `di/AppModule.kt`; request the W3 straddle relocation (task 0 below) via the queue | §0.2 |
| 1 | **Parity check script** `scripts/ci/native-parity-check.mjs`: reads `frontend/lib/core/navigation.ts` + `site-index.ts`, compares against `Routes` in `RnNavHost.kt` (parse or a generated registry file), exits non-zero on unregistered website sections. Wire into `npm run check`. | §1, §8 |
| 2 | Register **stub routes for every remaining website section** (day-1 placeholders rendering "Coming to native — tracked in the parity plan") so the parity ledger starts honest and Worker 4 fills them without waiting. | §2 map |
| 3 | Per-batch: promote Worker 4's finished screens from stub → real destination; keep deep links (`rn://`, `https://harindrasah.com.np/*`) working for new routes. | — |
| 4 | Gradle/manifest work per INTEGRATION REQUEST (new deps, permissions, icons). | queue |
| 5 | Release engineering per batch: bump `versionCode`, `testDebugUnitTest` + `bundleRelease`, keep the Play upload runbook current. | README |
| 6 | Track and retire "Coming to native" placeholders; when zero remain, the parity script must pass with **0 placeholders** — that is program Done. | §6 |

### 0.4 Worker 2 — Backend mobile API expansion

Audit first: much website data already has APIs (`/api/content/*`, `/api/r-notes`, practice, community, credits). Expose only what is missing, in mobile-v1 envelope shape `{ ok, data }`, cursor-paginated where listy, with vitest per route and a doc page per endpoint family.

| # | Task family | Backing web source |
|---|-------------|--------------------|
| 1 | PYQs: list by class/subject/unit + detail | `content/**` pyq bank, existing content routes |
| 2 | Formula sheets per unit | formula-sheet corpus |
| 3 | Practical manuals, concept legends, notes archive index | `content/**`, content routes |
| 4 | Mindmap payloads (or confirm client-side build from manifest is feasible — report to Agent 5 either way) | `content/manifest.json`, `content/visuals/mindmaps/**` |
| 5 | Progress/analytics read endpoints (per-user, auth) | progress, quiz-history, user routes |
| 6 | Leaderboard, certificates, announcements | existing server data |
| 7 | Community write: post, reply, like (auth, rate-limited, moderation rules respected) | social routes |
| 8 | Billing/credits read, feedback submit | credits, feedback |
| 9 | Contract tests + `docs/api/mobile-*.md` for every family above | — |

### 0.5 Worker 3 — Native data layer & algorithm ports

The website's "brain" is largely **client-side TypeScript in `frontend/lib/*.ts`** — that logic ports mechanically to Kotlin (per owner decision, copy the rules exactly; unit-test against the TS behavior). This is where "same code, different language" lives.

| # | Port / build | Source of truth |
|---|--------------|-----------------|
| 0 | **B0 only:** relocate data-source classes that straddle UI/data — `SyllabusSearchIndexSource` currently lives inside `ui/screens/search/SearchViewModel.kt` (Worker 4's tree) but is data-layer code → move to `data/repository/` so the ownership line is clean forever after | §0.2 |
| 1 | `core/logic/Srs.kt` — SM-2 scheduler + flashcard builder (device-local review state) | `frontend/lib/srs.ts` |
| 2 | `core/logic/MockExam.kt` — exam assembler + scorer (OMR MCQs + written section) | `frontend/lib/mock-exam.ts` |
| 3 | `core/logic/StudyPlan.kt` — weekly plan generator | `frontend/lib/study-plan.ts` |
| 4 | `core/logic/Analytics.kt` — performance aggregator (accuracy by subject/topic, trends) | `frontend/lib/analytics.ts` |
| 5 | `core/logic/Achievements.kt` — badge & milestone rules | `frontend/lib/achievements.ts` |
| 6 | `core/logic/CommunityRules.kt` — space mapping + question validation | `frontend/lib/community.ts` |
| 7 | `core/logic/PersonalNotes.kt` + `StudyGoals.kt` — device-local stores (Room/DataStore) | `frontend/lib/personal-notes.ts`, `study-goals.ts` |
| 8 | `core/logic/OfflinePack.kt` — offline unit pack builder (Markdown assembly) | `frontend/lib/offline-pack.ts` |
| 9 | Repositories + Room schema for every new endpoint family from Worker 2 (same offline-tolerance contract: fresh → cache write; failure → cache; else Unavailable) | `SyllabusRepository` pattern |
| 10 | Mindmap builder port (`topic-map-builder.ts` + `queries.ts`) if Worker 2 confirms client-side build | `frontend/features/mindmap/*` |
| 11 | Session/tier gates for new content (mirror `access-level.ts` rules in ViewModels' data layer) | `frontend/lib/core/access-level.ts` |

### 0.6 Worker 4 — All student UI (the biggest share)

Screen order = user value, per batch below. Every screen follows the established pattern: ViewModel (Hilt) → repository → Room-cached; offline banner when served from cache; fakes only inside `ui/screens/<feature>/local/` until the real repo lands.

| Batch | Screens |
|-------|---------|
| **P1 content surfaces** | PYQs browser + viewer, formula sheets, practical manuals, concept legends, notes archive, exam hub, quick revision, announcements, changelog, class hubs |
| **P2 personal & progress** | Dashboard (real), My Notes, Study Goals, Study Journal, Streaks & Badges, Leaderboard, Certificates |
| **P3 study tools** | Mock Exams (OMR + written runner), Weekly Planner, SRS review UI, Analytics charts, Mindmap canvas (fold/unfold tree, pan/zoom, export) |
| **P4 labs** | Interactive simulations, **one lab per PR**, ordered by curriculum value (see `android-native-labs-decision.md`); Compose Canvas + state loop per lab |
| **P5 account & community** | Community posting/reply/like UI, Billing, Referrals, Feedback, Downloads (offline packs), Site index, Curriculum levels, Platform status |

Also owns: replacing every Worker 1 placeholder, KaTeX/math rendering in new readers, and the honest "Coming to native" placeholder component (built once, used by all stubs).

### 0.7 Agent 5 — Reviewer (review-only; sees all worker edits)

| # | Duty |
|---|------|
| 1 | Every session: **open and read every file each worker touched — the real code, in full, not a diff.** For each file verify: (a) it is inside the worker's owned tree (boundary check), (b) the logic is correct when read end-to-end (imports traced, state handled, offline contract honored), (c) new code matches its source of truth — TS original for algorithm ports, Worker 2's schema doc for endpoints, website flow for screens. Diffs may be used to *locate* changes, never to *judge* them. |
| 2 | Run `native-parity-check` + `npm run check` + `testDebugUnitTest` when judging a batch; a batch is **Done** only when the script's placeholder count drops by the promised amount and all tests pass. |
| 3 | Maintain the integration queue; assign Worker 1 wiring batches; write STATUS §7 CONTINUE orders with priorities. |
| 4 | Parity audit vs the website: open `frontend/lib/core/navigation.ts`, spot-check 3 random live sections per session against their native counterparts (same content, same flow, same access gates). |
| 5 | Flag scope creep: a worker "improving" the website while porting it is a violation — parity means **match, not redesign**; web-side changes go through the owner. |
| 6 | When the parity script reports **0 placeholders** and every section passes spot-check, declare program Done and request owner promotion review (Phase 8 of the migration plan). |

---

## 1. What "identical" means (parity contract)

A website section counts as **native-live** only when ALL of these hold:

1. A typed route exists in `Routes` + `RnNavHost` (not a placeholder).
2. Content comes from the real API through a repository with the offline-tolerance contract (fresh → cache; failure → cache; else honest error).
3. The user flow matches the website: same entry points, same actions, same access-tier gates (`access-level.ts` rules).
4. `native-parity-check` counts it as live, and Agent 5's spot-check passed.

Explicitly **out of parity scope** (documented exceptions, owner-approved): owner/admin consoles, blog authoring, and marketing/legal edge pages — these stay web-only (Custom Tabs if ever needed), matching the migration plan §5 P4.

The table below is authoritative: `native-parity-check` treats only these paths (plus `ownerOnly` nav items, which must also be listed) as exceptions, and every `exception(...)` in `RnNavHost.kt` must be listed here.

<!-- parity-exceptions:start -->
| Web path | Category | Reason |
|---|---|---|
| `/mind-studio` | diagram-tool | Owner-tier Diagram Studio stays web-only; reason needed: owner decision |
| `/ai/quad` | owner-only | Owner-only four-model comparison desk (navigation.ts, 2026-11-18) |
| `/about` | about-info | Company/product information page |
| `/what-it-has` | marketing | Feature overview page |
| `/features` | marketing | Feature marketing page |
| `/how-it-works` | marketing | How-it-works marketing page |
| `/blog` | blog | Blog posts |
| `/neb-updates` | about-info | Guide to verifying NEB/CDC exam notices |
| `/official-sources` | about-info | Government source list and independence disclaimer |
| `/contact` | support | Contact page |
| `/help` | support | Help center |
| `/sitemap-page` | support | Public directory of indexed pages |
| `/legal/privacy` | legal | Privacy policy |
| `/legal/terms` | legal | Terms of service |
| `/legal/cookies` | legal | Cookie policy |
| `/legal/purchases` | legal | policy decision pending (see review item 8) |
| `/legal/data-safety` | legal | Data safety disclosure |
| `/legal/content-rating` | legal | Content rating disclosure |
| `/legal/attribution` | legal | Content attribution |
| `/legal/takedown` | legal | Takedown requests |
| `/school` | marketing | Landing page for schools |
| `/teachers` | marketing | Landing page for teachers |
| `/parents` | marketing | Landing page for parents |
| `/plans` | pricing | policy decision pending (see review item 8) |
| `/owner` | owner-only | Owner console |
| `/owner/users` | owner-only | Owner user management |
| `/controller` | owner-only | Owner controller |
<!-- parity-exceptions:end -->

---

## 2. Route parity map (remaining work)

Source of truth for the left column: `frontend/lib/core/navigation.ts` + `site-index.ts`. Workers keep this table updated in their checkpoints; Agent 5 reconciles it against the parity script.

| Web path | Section | Native route | Status | Batch |
|---|---|---|---|---|
| `/home` | Home | `home` | LIVE | done |
| `/community` | Community — posting/replies: social write endpoints (W2+W4) | `community` | LIVE | P5 (write paths) |
| `/ask` | Ask Veer | `ai-tutor` | LIVE | done |
| `/syllabus/additions` | Syllabus by Year — additions view; syllabus endpoints (W4) | `learn` | LIVE | P1 |
| `/search` | Search | `search` | LIVE | done |
| `/chat` | Chat | `ai-tutor` | LIVE | done |
| `/practice` | Practice | `practice` | LIVE | done |
| `/ai/community` | AI Community | `community` | LIVE | P5 (write paths) |
| `/profile` | Profile | `profile` | LIVE | done |
| `/settings` | Settings | `settings` | LIVE | done |
| `/notifications` | Notifications | `notifications` | LIVE | done |
| `/dashboard` | Dashboard — progress endpoints + local state (W4) | `dashboard` | PLACEHOLDER | P2 |
| `/onboarding` | Onboarding / Study Goals — device-local `StudyGoals.kt` (W3+W4) | `onboarding` | PLACEHOLDER | P2 |
| `/planner` | Weekly Planner — `StudyPlan.kt` (local) (W3+W4) | `planner` | PLACEHOLDER | P3 |
| `/srs` | Spaced Repetition — `Srs.kt` (local) + pyq-bank cards (W3+W4) | `srs` | PLACEHOLDER | P3 |
| `/mock-exams` | Mock Exams — `MockExam.kt` + PYQ endpoints (W3+W4) | `mock-exams`, `mock-exam/{id}` | PLACEHOLDER | P3 |
| `/analytics` | Analytics — `Analytics.kt` + progress endpoints (W3+W4) | `analytics` | PLACEHOLDER | P3 |
| `/streaks` | Streaks & Badges — `Achievements.kt` (derived, nothing stored) (W3+W4) | `streaks` | PLACEHOLDER | P2 |
| `/my-notes` | My Notes — `PersonalNotes.kt` (device-local) (W3+W4) | `my-notes` | PLACEHOLDER | P2 |
| `/downloads` | Downloads / Offline packs — `OfflinePack.kt` (W3+W4) | `downloads` | PLACEHOLDER | P5 |
| `/billing` | Billing — credits endpoints (W2+W4) | `billing` | PLACEHOLDER | P5 |
| `/referrals` | Referrals — existing referral data (or documented placeholder per website) (W4) | `referrals` | PLACEHOLDER | P5 |
| `/site-index` | Site Index — parity registry itself (W1+W4) | `site-index` | PLACEHOLDER | P5 |
| `/levels` | Curriculum Levels — levels endpoints (W2+W4) | `levels` | PLACEHOLDER | P5 |
| `/exams` | Exam Hub — practice + PYQ endpoints (W2+W4) | `exams` | PLACEHOLDER | P1 |
| `/revision` | Quick Revision — content endpoints (W2+W4) | `revision` | PLACEHOLDER | P1 |
| `/leaderboard` | Leaderboard | `leaderboard` | PLACEHOLDER | P2 |
| `/goals` | Study Goals — device-local `StudyGoals.kt` (W3+W4) | `goals` | PLACEHOLDER | P2 |
| `/schedule` | Study Schedule | `schedule` | PLACEHOLDER | P3 |
| `/certificates` | Certificates — certificates endpoints (W2+W4) | `certificates` | PLACEHOLDER | P2 |
| `/announcements` | Announcements — announcements endpoints (W2+W4) | `announcements` | PLACEHOLDER | P1 |
| `/feedback` | Feedback — feedback endpoint (W2+W4) | `feedback` | PLACEHOLDER | P5 |
| `/changelog` | Changelog (What's New) — changelog data (W2+W4) | `changelog` | PLACEHOLDER | P1 |
| `/status` | Platform Status — `/api/v2/health` (W2+W4) | `status` | PLACEHOLDER | P5 |
| `/class-11-notes` | Class Hub (Class 11) — syllabus + notes endpoints (W4) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes` | Class Hub (Class 12) — syllabus + notes endpoints (W4) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/subjects` | Subjects | `subjects` | PLACEHOLDER | P1 |
| `/pyqs` | Past Year Questions — PYQ endpoints (W2+W4) | `pyqs`, `pyq/{id}` | PLACEHOLDER | P1 |
| `/syllabus` | Official Syllabus | `syllabus` | PLACEHOLDER | P1 |
| `/practical` | Practical Manuals — practical endpoints (W2+W4) | `practical` | PLACEHOLDER | P1 |
| `/legend` | Concept Legends — legend endpoints (W2+W4) | `legend` | PLACEHOLDER | P1 |
| `/notes` | Notes Archive — notes catalog endpoints (W2+W4) | `notes` | PLACEHOLDER | P1 |
| `/journal` | Study Journal | `journal` | PLACEHOLDER | P2 |
| `/class-11-notes/physics` | Physics (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/physics/theory` | Physics Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-11-notes/chemistry` | Chemistry (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/chemistry/theory` | Chemistry Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-11-notes/biology` | Biology (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/biology/theory` | Biology Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-11-notes/mathematics` | Mathematics (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/mathematics/theory` | Mathematics Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-11-notes/english` | English (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/english/theory` | English Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-11-notes/nepali` | Nepali (Class 11) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-11-notes/nepali/theory` | Nepali Theory (11) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/physics` | Physics (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/physics/theory` | Physics Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/chemistry` | Chemistry (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/chemistry/theory` | Chemistry Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/biology` | Biology (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/biology/theory` | Biology Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/mathematics` | Mathematics (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/mathematics/theory` | Mathematics Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/english` | English (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/english/theory` | English Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/class-12-notes/nepali` | Nepali (Class 12) | `class-hub/{slug}` | PLACEHOLDER | P1 |
| `/class-12-notes/nepali/theory` | Nepali Theory (12) | `class-hub/{slug}/theory` | PLACEHOLDER | P1 |
| `/lab` | Virtual 3D Labs — per-lab native rebuild (W4) | `lab` | PLACEHOLDER | P4 |
| `/lab/3d` | 3D Video Hub | `lab/{id}` | PLACEHOLDER | P4 |
| `/lab/bio-3d-organelles` | Cell Organelles 3D | `lab/{id}` | PLACEHOLDER | P4 |
| `/lab/theory` | Lab Theory Hub | `lab/{id}` | PLACEHOLDER | P4 |
| `/ad-p-table` | Ad P Table | `ad-p-table` | PLACEHOLDER | unassigned (owner decision) |
| `/periodic-table` | Periodic Table & CEE | `periodic-table` | PLACEHOLDER | unassigned (owner decision) |
| `/formulas` | Formula Sheets | `formulas` | PLACEHOLDER | P1 |
| `/theorems` | Theorems & Proofs | `theorems` | PLACEHOLDER | P1 |
| `/derivations` | Formula Derivations | `derivations` | PLACEHOLDER | P1 |
| `/graphs` | Science Graph Bank | `graphs` | PLACEHOLDER | unassigned (owner decision) |
| `/mindmap` | Visual Mindmaps — mindmap payloads or `MindmapBuilder.kt` (W2/W3+W4) | `mindmap/{scope}` | PLACEHOLDER | P3 |
| `/science-graph-bank` | Graph Bank (Legacy) | `science-graph-bank` | PLACEHOLDER | unassigned (owner decision) |
| `/resources/physics-xi` | Physics XI Academic | `resources/{slug}` | PLACEHOLDER | unassigned (owner decision) |
| `/resources/mathematics-xi` | Mathematics XI Solutions | `resources/{slug}` | PLACEHOLDER | unassigned (owner decision) |
| `/chat/nepali` | Nepali Assistant | `chat/{mode}` | PLACEHOLDER | unassigned (owner decision) |
| `/chat/grammar` | Grammar Console | `chat/{mode}` | PLACEHOLDER | unassigned (owner decision) |
| `/ai` | AI Tools | `ai` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/math` | Veer Math Solver | `ai/math` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/deep-dive` | Deep Concept Studio | `ai/deep-dive` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/diagrams` | Diagram Hub | `ai/diagrams` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/tutor` | Veer Tutor Console | `ai/tutor` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/search` | Veer Curriculum Search | `ai/search` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/workspace` | AI Workspace | `ai/workspace` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/subjects` | Subject Classrooms | `ai/subjects` | PLACEHOLDER | unassigned (owner decision) |
| `/ai/history` | AI History | `ai/history` | PLACEHOLDER | unassigned (owner decision) |
| `/ai-quiz` | Adaptive Veer Quiz | `ai-quiz` | PLACEHOLDER | unassigned (owner decision) |
| `/ai-quiz/history` | Quiz History | `ai-quiz/history` | PLACEHOLDER | unassigned (owner decision) |
| `/practice/history` | Practice History | `practice/history` | PLACEHOLDER | unassigned (owner decision) |
| `/quiz` | Practice Quiz Bank | `quiz-bank` | PLACEHOLDER | unassigned (owner decision) |
| `/exam-countdown` | Exam Countdown | `exam-countdown` | PLACEHOLDER | P1 |
| `/exams/neb` | NEB Board Exam — exam tracks (W2+W4) | `exam/{track}` | PLACEHOLDER | P1 |
| `/exams/cee` | CEE Medical Entrance — exam tracks (W2+W4) | `exam/{track}` | PLACEHOLDER | P1 |
| `/exams/ioe` | IOE Engineering Entrance — exam tracks (W2+W4) | `exam/{track}` | PLACEHOLDER | P1 |
| `/knowledge` | Knowledge Hub | `knowledge` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/pro` | Pro Knowledge Hub | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/numerical-physics` | Numerical Physics | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/numerical-chemistry` | Numerical Chemistry | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/biology-diagrams` | Biology Diagrams | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/grammar` | English Grammar Hub | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/writing` | English Writing Hub | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/byakaran` | Nepali Byakaran | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/knowledge/analytical-geometry` | Analytical Geometry | `knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/lessons` | Lessons Library | `lessons` | PLACEHOLDER | unassigned (owner decision) |
| `/loksewa` | Loksewa GK | `loksewa` | PLACEHOLDER | unassigned (owner decision) |
| `/loksewa/geography-of-nepal` | Geography of Nepal | `loksewa/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/loksewa/history` | Loksewa History | `loksewa/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/loksewa/environment` | Loksewa Environment | `loksewa/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/world-knowledge` | World Knowledge | `world-knowledge` | PLACEHOLDER | unassigned (owner decision) |
| `/world-knowledge/general-knowledge` | General Knowledge | `world-knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/world-knowledge/current-affairs` | Current Affairs | `world-knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/world-knowledge/global-topics` | Global Topics | `world-knowledge/{topic}` | PLACEHOLDER | unassigned (owner decision) |
| `/resources` | Resource Vault | `resources` | PLACEHOLDER | unassigned (owner decision) |
| `/pdfs` | PDF Library | `pdfs` | PLACEHOLDER | unassigned (owner decision) |
| `/profile/edit` | Edit Profile | `profile/edit` | PLACEHOLDER | unassigned (owner decision) |
| `/users` | Find Students — social read (community) | `users` | PLACEHOLDER | P5 |
| `/progress` | My Progress | `progress` | PLACEHOLDER | P2 |
| `/bookmarks` | Saved Bookmarks | `bookmarks` | PLACEHOLDER | P2 |
| `/report-card` | Report Card | `report-card` | PLACEHOLDER | P2 |
| `/credits` | Credits | `credits` | PLACEHOLDER | P5 |
| `/achievements` | Achievements | `achievements` | PLACEHOLDER | P2 |
| `/notice` | Notice Board | `notice` | PLACEHOLDER | P1 |

---

## 3. Batches & milestones

Session = one focused agent session (~2–4 h) like the sessions that built the current app.

| Batch | Content | Est. sessions (W1/W2/W3/W4) | Exit gate |
|-------|---------|------------------------------|-----------|
| **B0 — parity infra** | parity script, stub routes for ALL sections, "Coming to native" component, ledger baseline | 2 / 0 / 0 / 1 | script wired into `npm run check`; ledger counts every section |
| **B1 — content surfaces** | PYQs, formulas, practicals, legends, notes archive, exam hub, revision, announcements, changelog, class hubs | 1 / 4–6 / 3–4 / 6–8 | all P1 rows native-live; Agent 5 spot-check 3/3 |
| **B2 — personal & progress** | dashboard, my-notes, goals, journal, streaks, leaderboard, certificates | 1 / 3–4 / 4–5 / 5–7 | all P2 rows native-live |
| **B3 — study tools** | mock exams, planner, SRS, analytics, mindmaps | 1 / 2–3 / 5–7 / 6–9 | all P3 rows native-live; algorithm ports unit-tested against TS behavior |
| **B4 — labs** | interactive simulations, one per PR, curriculum-value order | 1 / 1–2 / 2–4 / 10–20 | every lab the website ships has a native counterpart |
| **B5 — account & community** | community write, billing, referrals, feedback, downloads, site-index, levels, status | 1 / 3–4 / 2–3 / 4–6 | all P5 rows native-live |
| **Close-out** | 0 placeholders, full parity audit, promotion review | 1 / 1 / 1 / 1 | parity script: 0 placeholders; Agent 5 sign-off |

**Program total: ≈ 30–50 worker sessions + continuous review** — consistent with the estimate discussed with the owner (labs dominate).

---

## 4. No-wait rule & integration queue

Unchanged from the migration plan (§0.0, §0.7) and [`android-native-AGENTS.md`](android-native-AGENTS.md):

- Workers never idle on another worker; fakes first, INTEGRATION REQUEST in the checkpoint, keep coding.
- Agent 5 owns the queue; Worker 1 executes wiring batches (routes, Gradle, manifest).
- Contract changes: Worker 2 publishes the schema + doc **first**; Worker 3 binds against the doc; Worker 4 fakes against the same doc — nobody waits for a running server.

---

## 5. Testing & verification matrix

| Layer | Gate |
|-------|------|
| Algorithm ports (W3) | JVM unit tests asserting the same outputs as the TS originals on shared fixtures (golden vectors checked into `src/test/resources/`) |
| Endpoints (W2) | vitest per route, envelope + pagination + auth-gate cases; `npm run check` scoped green |
| Screens (W4) | ViewModel tests per feature (same pattern as `PracticeViewModelTest`); `assembleDebug` every session |
| Parity (W1) | `native-parity-check` green; placeholder count strictly non-increasing |
| Release (W1) | `testDebugUnitTest` + `bundleRelease` per batch; `versionCode` monotonic |
| Review (Agent 5) | full read of every touched file + 3 random section spot-checks per session; runs the builds/tests itself; sign-off per batch |

---

## 6. Definition of Done

**Per batch:** all its parity-map rows native-live per §1's four conditions, tests green, ledger updated, Agent 5 sign-off in STATUS §7.

**Program:** parity script reports **0 placeholders and 0 exceptions beyond §1's documented list**, every section passed a spot-check, `bundleRelease` green at the final `versionCode`, and the owner approves promotion (migration plan Phase 8).

---

## 7. Key risks & mitigations

| Risk | Mitigation |
|------|------------|
| Labs blow the schedule (each is a hand-built simulation) | One lab per PR; curriculum-value order; Agent 5 may split B4 into B4a/b/c without re-planning |
| KaTeX/math rendering gaps in new readers | Reuse the existing `NoteReader` math approach; spike early in B1, not B3 |
| TS→Kotlin port drift (algorithm behaves differently) | Golden-vector fixtures from the TS tests; Agent 5 reads the Kotlin port side-by-side with the TS source file, line by line — never from the diff, never from memory |
| Backend endpoint sprawl | Worker 2 audits existing `/api/*` first; mobile endpoints are thin adapters, never duplicated logic |
| Parity ledger rot | Script-generated counts only; manual claims without a script run are rejected by Agent 5 |
| Shared-file merge conflicts (`AppModule.kt`, `RnNavHost.kt`, `AppDatabase.kt`) | Single-writer rule (§0.2): one owner per shared file, everyone else requests via the queue |
| Scope creep (redesigning while porting) | Agent 5 flags it; parity = match the website; web changes need the owner |

---

## 8. Standing rule — "Add in one = add in both" (permanent, after Done)

Once parity is reached, this rule governs ALL future feature work:

1. Any new website section registered in `frontend/lib/core/navigation.ts` must, **in the same release cycle**, get: a native route stub (Worker 1, day 1), backing data (Worker 2/3), and a native screen (Worker 4).
2. `native-parity-check` runs in CI forever — a website section without a native route **fails the check**, so the drift is caught at commit time, not at launch.
3. Conversely, no native-only features: new app surfaces must exist on the website (or be documented as app-platform exceptions like FCM settings).
4. Content changes need no code on either side (shared corpus/API) — this is already true and stays true.

---

## Appendix A — Parity check script contract (`scripts/ci/native-parity-check.mjs`)

```
Input:  frontend/lib/core/navigation.ts (NAV_SECTIONS entries; ownerOnly items and items of an ownerOnly section)
        android-native/.../navigation/RnNavHost.kt (Routes + composables + WebParity.exceptions)
        docs/guides/android-native-parity-plan.md §1 exception table (rows between the parity-exceptions markers)
Exception rule: a website href is EXCEPTION iff it has a §1 table row or is ownerOnly.
        Every ownerOnly href must have a row; every WebParity.exceptions entry must have a row;
        every row must be a navigation.ts href with a known category (owner-only, blog, marketing,
        legal, support, pricing, about-info, diagram-tool). A table row is authoritative — no section-wide exemptions.
        A page without a row is not an exception: it must be LIVE or PLACEHOLDER, otherwise MISSING.
Output: per-section status: LIVE | PLACEHOLDER | MISSING | EXCEPTION
        counts summary; exit 1 if any MISSING (unregistered website section) or the exception rules fail
        exit 0 otherwise (PLACEHOLDER is allowed mid-campaign, tracked)
Wire-in: `npm run check` (scoped) — owned by Worker 1
```

## Appendix B — Document maintenance

- Workers update **only** their checkpoint + ledger lines in `android-native-STATUS.md`.
- Agent 5 updates this plan's route map / batch tables when reality diverges.
- The migration plan remains the architecture reference; this plan never redefines boundaries, only adds the parity campaign on top.
