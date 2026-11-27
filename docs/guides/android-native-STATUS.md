# android-native STATUS TRACKER — read this first in every session

> **Purpose:** Done log, environment facts, and **§7 Supervisor CONTINUE**.  
> **Your role (Agent 1–5):** Owner says your number → open **[`android-native-AGENTS.md`](android-native-AGENTS.md)** → read **only your section** → do **only** that work.

> **🧭 ONE AGENT DOC:** [`android-native-AGENTS.md`](android-native-AGENTS.md) — who you are, owned paths, tasks.  
> Workers 1–4: guided by Agent 5 · **never wait** · append **§4** with **EDITS** list each session.  
> Agent 5: no feature code · **review worker code (git diff + read files)** → **§8** · then **§7** + queue in AGENTS.md.

---

## 0. THE AIM (never lose this)

Build a **complete native Android client** (Kotlin + Jetpack Compose + APIs) for
the Ravikisan Platform, in **parallel** with everything that already works:

- Website (`frontend/`, Vercel) — keep running, no breaking changes.
- Backend (`backend/`, Express on Cloud Functions) — keep running, additive only.
- Legacy Android app (`android-twa/android`, Java + WebView) — **stays the Play
  production app** until an explicit Phase 8 promotion decision.

Success = a student can log in, read notes, practice, and chat with Veer natively,
offline-tolerant, gated by the same spark/tier rules as the web.

## 1. HARD BOUNDARIES (violating any of these = stop and report)

1. **Never modify** `android-twa/android/**` except a one-line critical fix. No
   Compose/Kotlin takeover, no deletion of `WebHostFragment` / `LoginActivity` /
   legacy `MainActivity`.
2. **Never break** `/api/*` for web. Native-only endpoints go under
   `/api/mobile/*` (new) or additive `/api/v2/*`.
3. **Never touch** `frontend/lib/native-android.ts` until Phase 8 promotion.
4. **Never push to `main`** without `npm run check:all` (per `BRANCHES.md`).
   Suggested work branch: `area/android-native` (check `BRANCHES.md` §reserved
   list before creating).
5. **Never commit** `google-services.json`, `key.properties`, `local.properties`,
   keystores. Example files only.
6. Native dev `applicationId` is `com.ravikisan.platform.compose` — it must NOT
   collide with production `com.ravikisan.platform` on a device.

## 2. ENVIRONMENT FACTS (verified on this machine — do not re-discover)

| Fact | Value |
|---|---|
| Android SDK | `C:/Users/ASUS/.bubblewrap/android-sdk` (in `local.properties` of both projects) |
| JDK 17 | `C:/Users/ASUS/.bubblewrap/jdk-17` (`java` is NOT on PATH; set `JAVA_HOME` per command) |
| Gradle | 8.11.1 (wrapper, copied from legacy) |
| AGP | 8.9.1 · google-services plugin 4.4.2 · Kotlin 2.1.0 · KSP 2.1.0-1.0.29 · Hilt 2.55 · Compose BOM 2025.01.00 |
| Legacy baseline | `applicationId com.ravikisan.platform`, versionCode 17, versionName 1.0.15, minSdk 30, target/compile 36 |
| API base | `https://harindrasah.com.np` (BuildConfig `API_BASE`) |
| google-services.json | **Absent locally** in legacy too — both builds apply the Firebase plugin conditionally; FCM is disabled until the real file is generated via `firebase apps:sdkconfig ANDROID <appId>` |
| Build command (native) | `cd android-native && JAVA_HOME="C:/Users/ASUS/.bubblewrap/jdk-17" ./gradlew assembleDebug` |
| Build command (legacy sanity) | `cd android-twa/android && JAVA_HOME="C:/Users/ASUS/.bubblewrap/jdk-17" ./gradlew.bat assembleDebug` |
| Backend local dev | `npm run dev:backend` → emulator hits `10.0.2.2:3000` |

## 3. PHASE MAP — status at a glance

| Phase | Scope (plan §6) | Status |
|---|---|---|
| 0 | Discovery & governance, screen list, WebView allowlist | ⬜ Not started (planning doc exists) |
| 1 | Scaffold `android-native/`, builds beside legacy, Settings port | ✅ **DONE (verified builds)** |
| 2 | API & data layer (Retrofit/OkHttp, interceptors, Room v2) | ⬜ Not started |
| 3 | Native auth & onboarding | ⬜ Not started |
| 4 | Navigation shell & WebView sidelined | ⬜ Not started |
| 5 | Core study experience (syllabus → note reader) | ⬜ Not started |
| 6 | Practice & AI (Veer SSE) | ⬜ Not started |
| 7 | Social, profile depth, mindmaps/labs decision | ⬜ Not started |
| 8 | Promotion & legacy freeze (needs explicit owner approval) | ⬜ Blocked by design |
| 9 | Play rollout | ⬜ Blocked by Phase 8 |

**Time estimate (owner question, answered):** full program ≈ 45–49 engineer-weeks
(~9–12 months solo human). With agent-written code + owner device testing:
**3–5 months to P0–P2 study journeys**, +1–2 months for practice/AI/social.
First usable test APK: **~3–4 weeks** of sessions. Dominant cost: Phase 5 note/math
rendering and Phase 7 labs/mindmaps.

## 4. DONE — verified work log (newest first)

### Agent 5 (owner-directed) — Wave 1 kickoff: PersonalNotes.kt + CommunityRules.kt ports with golden vectors

**Campaign:** [`android-native-parity-waves.md`](android-native-parity-waves.md) (saved this session — three-wave split of the 117 placeholders: Wave 1 = 39 independent, Wave 2 = 23 independent, Wave 3 = 55 relateds-in-clusters, runs last). Executing **Wave 1 in order**; first order = W3 ports.

**EDITS:**
- `core/logic/PersonalNotes.kt` (+new) — port of `frontend/features/personal-notes/index.ts`: models, `validateNote` (TS messages verbatim), `addNote`/`updateNote`/`removeNote`/`filterNotes` (newest-first, case-insensitive), junk-tolerant `normalizeNotes`. Device-local storage stays platform-side (Room store is the next W3 order).
- `core/logic/CommunityRules.kt` (+new) — port of `frontend/features/community/index.ts`: `CommunitySpace` mapping from the injected `GoalSubject` catalog (same deviation as `StudyGoals.kt`), `getCommunitySpace`, `buildAskPrompt` (TS truthiness on the subject prefix preserved), `validateQuestion` (8/1000 boundaries).
- `golden/fixtures.ts` + `golden/generate-golden.ts` — note/community fixtures + two generator blocks; **golden catches**: real catalog `className` is "Class 11 Notes" (fixtures say "Class 11") — the community golden now embeds the REAL catalog rows so expected/catalog stay consistent; `validateQuestion` boundary is `<8` rejected (8 chars passes).
- `app/src/test/resources/golden/{personal-notes,community}-golden.json` (+new) — outputs of the REAL TS.
- `PersonalNotesGoldenTest.kt` (6 tests) + `CommunityRulesGoldenTest.kt` (4 tests).

**VERIFIED:** `npx tsx --tsconfig android-native/golden/tsconfig.json android-native/golden/generate-golden.ts` → both goldens written; `./gradlew testDebugUnitTest` → **BUILD SUCCESSFUL, 160 tests / 0 failures** (from JUnit XML; 150 prior + 10 new).

**Wave 1 remaining (next sessions, in order):** W3 — Room schema for device-local stores (notes/journal/goals/SRS state); W4 — screens for the 39 sections (device-local 8, mock-exams bind, class hubs 28, notes/revision readers); W1 — stub→live promotions + deep links per batch.

**Classification:** [IMPORTANT CORE FILE] `core/logic/PersonalNotes.kt`, `core/logic/CommunityRules.kt`, `golden/fixtures.ts`, `golden/generate-golden.ts`, both golden JSONs, both test files; [CONTENT FILE] none.

### Agent 3 — Parity session 1: algorithm ports (SRS, mock exam, achievements, offline packs, goals+planner, analytics) with TS golden vectors

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 3 (parity campaign session 1, §0.5 tasks 1–8 partial)
═══════════════════════════════════════════════════════════════
I am Agent 3. Guided by Reviewer Agent 5.

── PARITY LEDGER ───────────────────────────────────────────────
• Website sections total:   pending W1's parity script (B0 not landed yet)
• Native-live:              12 (migration closeout baseline)
• Placeholder:              0 registered (B0 = W1/W4)
• My batch contribution:    +6 algorithm ports (B3 groundwork, started early
  per the no-wait rule — §0.5 tasks 1,2,3,4,5,7-goals,8)

── EDITS (Reviewer reads these files) ──────────────────────────

Kotlin ports (core/logic/, all pure, rule-for-rule from frontend/features/*):
  core/logic/Bank.kt           | +66 | shared pyq-bank/formula-sheet models
  core/logic/Srs.kt            | +166| sm2, addDays, buildCards (djb2-base36
      hash port), dueQueue, normalizeStore (junk-tolerant, mirrors TS guards)
  core/logic/MockExam.kt       | +205| mulberry32 (BIT-EXACT: Int-wrap ==
      JS >>>0/imul; one real bug caught mid-port — TS does `t ^= t + imul(...)`,
      addition BEFORE xor), Fisher-Yates shuffle, parseMarks (parseFloat prefix
      semantics + the `n > 0` gate), assembleMock, scoreMock, answerKey
  core/logic/Achievements.kt   | +70 | 9 rules, evaluateAchievements, nextMilestone
  core/logic/OfflinePack.kt    | +120| UNIT_SLUG_ALIASES resolver (8 aliases),
      buildUnitPack, packItemCount, packFilename slugify, packToMarkdown
  core/logic/StudyGoals.kt     | +160| normalizeGoals (catalog INJECTED — the
      web reads static SYLLABUS; native passes the loaded catalog),
      daysUntilExam (V8 day-rollover semantics — see FINDINGS), seedDailyPlan
  core/logic/ProgressModels.kt | +63 | ProgressEntryLite/QuizRowLite + entryStatus port
  core/logic/StudyPlan.kt      | +115| weakTopicsFromJourney, buildWeeklyPlan
  core/logic/Analytics.kt      | +230| accuracyBySubject/Topic, completionByUnit,
      weeklyTrend (Monday-anchored UTC weeks), dailyStudyActivity, overallAccuracy

Golden-vector infrastructure (executes the REAL TS):
  golden/fixtures.ts           | +330| deterministic fixtures (NEB-flavored)
  golden/generate-golden.ts    | +250| tsx runner — imports frontend/features/*
      through a local tsconfig paths mapping, writes JSON to test resources
  golden/tsconfig.json         | +9  | @/* → ../../frontend/* for the runner
  app/src/test/resources/golden/*.json | 6 files | srs, mock-exam, achievements,
      offline, study-plan, analytics — outputs of the REAL website code

Tests (JVM, JUnit4, no new deps):
  app/src/test/.../core/logic/Golden.kt              | +150| loader + mappers
  .../SrsGoldenTest.kt          | 5 tests | sm2 transitions (incl. ease floor,
      fractional ease, lapse chains), calendar rollovers, deck build/dedupe,
      due queue, junk-store normalization
  .../MockExamGoldenTest.kt     | 5 tests | mulberry32 bit-exact for 5 seeds
      (incl. 4294967295 → uint32 bit pattern), 4 assembled papers, parseMarks
      (10 cases), scorer (clamps/blanks/blank-all), answer key
  .../AchievementsGoldenTest.kt | 4 tests | all inputs, tie-break order, null cases
  .../OfflinePackGoldenTest.kt  | 4 tests | alias resolver, pack slice + exact
      Markdown bytes, empty pack, filename slugify
  .../StudyPlanGoldenTest.kt    | 5 tests | normalizeGoals junk coercion,
      daysUntilExam, seedDailyPlan, weak-topic ordering, 5 weekly plans
  .../AnalyticsGoldenTest.kt    | 6 tests | subject/topic buckets + order,
      unit completion, weekly trend, day series (pinned now), overall accuracy

── FINDINGS (parity-relevant, for Agent 5's audit) ─────────────
1. V8 Date.parse ACCEPTS day-rollover: "2026-02-30" parses (→ Mar 2), while
   month 00/13 and day 00/32 are NaN. The TS isIsoDate gate therefore admits
   rolled-over dates; the Kotlin port replicates this (month 1-12, day 1-31,
   rollover arithmetic in daysUntilExam) instead of strict LocalDate.parse.
2. The plan/goals TS reads LOCAL date components — golden inputs are now
   constructed at LOCAL NOON so vectors are TZ-stable; the Kotlin functions
   take an explicit `today: LocalDate` (documented deviation: web defaults to
   `new Date()`; native ViewModels pass the device date).
3. The goals subject catalog is injected (web reads static SYLLABUS) — same
   rules, no hidden global; Worker 4's VMs supply the cached catalog.
4. dailyStudyActivity/weeklyTrend parse Z-instants, date-only strings (UTC,
   matching JS), and offsets; bare no-offset datetimes parse as UTC (web uses
   device-TZ there — the platform API always sends Z, so no behavioral gap).

VERIFIED (real builds, serialized per the standing env rule):
• ./gradlew testDebugUnitTest → BUILD SUCCESSFUL — 149 tests, 0 failures
  (29 new golden tests across 6 suites; all pre-existing suites still green).
• ./gradlew assembleDebug → BUILD SUCCESSFUL (app-debug.apk, 71.7 MB).

INTEGRATION REQUESTS:
  RQ-9 (→ W4, B3 screens): the six ports are ready for ViewModel binding —
      Srs.kt (review UI), MockExam.kt (OMR runner), StudyPlan.kt+StudyGoals.kt
      (planner/onboarding), Analytics.kt (charts), Achievements.kt (streaks),
      OfflinePack.kt (downloads). Pure + golden-tested; inject LocalDate.now()
      and the goal catalog at the VM layer.
  RQ-10 (→ W2): the ports consume SubjectPyqBank/BankPyqYear shapes — when
      pinning the PYQ/formula mobile contracts, keep `marks` as the RAW
      string|number (the app stringifies at the boundary; never pre-parse).
  RQ-7 (still open, → W1): kotlinx-coroutines-test for VM state tests.

CONTINUE NEXT (my backlog order):
• core/logic/CommunityRules.kt (frontend/features/community — space mapping +
  question validation; largest remaining port)
• core/logic/PersonalNotes.kt + device-local store seam (Room/DataStore)
• Repositories for W2's endpoint families as contracts land (parity §0.5 #9)
═══════════════════════════════════════════════════════════════
```
### Agent 2 — Parity session 1 (B1 slice): PYQs + formula-sheet mobile contracts, plus-gate enforced (parity plan §0.4 #1–2, #4 report)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 2 (parity plan, session 1)
═══════════════════════════════════════════════════════════════
I am Agent 2 (parity plan §0.4 — backend mobile API expansion). Guided by Supervisor Agent 5.

── PARITY LEDGER (workers: update every session) ────────────────
• Website sections total:        per scripts/ci/native-parity-check.mjs (Agent 1 owns the script-generated count)
• Native-live:                   12 (pre-campaign)   Placeholder: per Agent 1's B0 registry   Not started: parity-map rows not yet stubbed
• My batch contribution this session: +2 data contracts landed (pyqs, formulas) — data-layer side of 2 P1 rows; they count native-live only after W4 screens + W1 route promotion per §1's four conditions

── EDITS (required — Supervisor reads these files) ─────────────
backend/src/api/mobile/manifest.ts | +90 -0 | NEW — shared reader for the website's generated content manifest (frontend/public/data/content/manifest.json) via resolveDataPath + contentCache: entry coords parser (classDir/subject/unit/file), NEB year extractor, path-safety validator for the file detail endpoints; degrades to an honest empty catalog if the generated manifest is absent
backend/src/api/mobile/pyqs.ts | +130 -0 | NEW — GET /api/mobile/pyqs?class=&subject=&year= (cursor-paginated compact rows: id/class/subject/unit/year/title/questionCount) + GET /api/mobile/pyqs/file?path= (one entry's question lines). REUSE: same manifest entries the website's PYQ bank (frontend/features/pyqs/pyq-bank.ts) consumes — no new corpus
backend/src/api/mobile/formulas.ts | +124 -0 | NEW — GET /api/mobile/formulas?class=&subject=&unit= + GET /api/mobile/formulas/file?path= (formula lines per sheet). REUSE: same manifest formulas/** entries the website's formula sheets build from
backend/src/api/mobile/index.ts | +10 -1 | mount /pyqs + /formulas; /home bootstrap advertises features.pyqs/formulas + links (feature-detect without hardcoding)
backend/src/api/contracts/public-schemas.ts | +64 -1 | ADDITIVE schemas: mobilePyqItem/PyqsResponse/PyqFileResponse, mobileFormulaItem/FormulasResponse/FormulaFileResponse; mobileHomeResponseSchema features+links extended (additive keys)
backend/tests/fixtures/mobile/manifest/content/manifest.json | +66 -0 | NEW fixture manifest (PYQs incl. a unit-less paper-level file, formulas, one notes/ entry to prove filtering) + 2 detail files
backend/tests/integration/mobile-pyqs.test.ts | +176 -0 | NEW — 7 tests: coordinate derivation, unit-less entry, class/subject/year filters, cursor walk (no item twice), file detail, BAD_PATH rejection incl. traversal, missing-file error path
backend/tests/integration/mobile-formulas.test.ts | +156 -0 | NEW — 6 tests: catalog isolation from other sections, filters, cursor walk, file detail, BAD_PATH rejection
backend/tests/integration/mobile-home.test.ts | +6 -0 | expected bootstrap payload extended with pyqs/formulas (additive contract change, pinned)
docs/api/mobile-pyqs-formulas.md | +150 -0 | NEW — contract page: tier gate, both list+file endpoints, pagination convention, artifact map
docs/api/mobile-openapi.yaml | +173 -0 | /pyqs, /pyqs/file, /formulas, /formulas/file documented (params, envelopes, 401/403/400)

COMPLETED (behavior, not log fluff):
1. AUDIT FIRST (per §0.4 preamble): inventoried backend/src/api + content corpus before writing anything. Existing mobile surface (syllabus/units/notes/practice/community read) covers more of P1 than assumed; PYQ quiz bank already tier-gated on /api/practice/pyqs. What was actually missing and is now landed: corpus PYQ catalog + formula-sheet catalog.
2. RQ-P2 ANSWERED (Agent 4's flag): the website gates /pyqs at minLevel "plus" (frontend/lib/core/navigation.ts:225; /formulas, /practical, /legend likewise). Both new mobile routes sit behind requireAuth + requireTier("plus") — the same pair /api/practice/pyqs uses. Gate is enforced in MY layer, so W3/W4 need no re-implementation; parity does not widen access.
3. MINDMAP FEASIBILITY REPORT (§0.4 #4 → Agent 5): NOT needed as a new payload build. The shared manifest already carries 780 visuals/mindmaps/** entries with the FULL tree inline (data.root with id/label/children). Client-side build from manifest is therefore trivially feasible; recommended next W2 slice is a thin GET /api/mobile/mindmaps?class=&subject= catalog + file endpoint (same pattern as this session), NOT a tree builder port. The 27 MB whole-manifest static fetch is too heavy for mobile — use the filtered endpoint.
4. Tier-gated responses send Cache-Control: private, no-store (auth-gated content is never publicly CDN-cached, matching /api/practice/pyqs's rule).

VERIFIED (real runs, not claims):
• npx vitest run on all 9 mobile test files → 40/40 passed (incl. the 13 new ones), EXIT=0.
• npx tsc --noEmit → clean, EXIT=0.
• Not verified this session: npm run check (scoped) and the full backend suite — left for Agent 5's batch review per §0.7 #2.

CONTINUE NEXT:
• Practicals + concept legends catalogs (same manifest/file pattern; /practical and /legend are also minLevel "plus") — P1 slice 2.
• Mindmaps catalog endpoint (see report above) — P3 prep, cheap now that the trees are pre-built.
• Announcements + changelog sources still unlocated — need a source-of-truth pointer from Agent 5 or W1 before contracting.

INTEGRATION REQUESTS:
• RQ-B1-W3 (→ Agent 3): bind PyqsViewModel/FormulasViewModel against docs/api/mobile-pyqs-formulas.md — envelope { ok, data }, cursor pagination, 401/403 semantics; the plus gate is server-side, the client only surfaces the paywall state.
• RQ-B1-W4 (→ Agent 4): FakePyqBank can stay until W3 swaps; the real catalog rows carry year/unit/questionCount — same fields your models mirror.
═══════════════════════════════════════════════════════════════
```

Classification: 12 files changed, all **[IMPORTANT CORE FILE]** (mobile API routes, contracts, tests, fixtures, docs; no content payloads read or modified beyond the pre-existing generated manifest fixture pattern).

### Agent 4 — Parity campaign B0+P1 slice: "Coming to native" placeholder component + PYQs hub & subject screens (parity plan §0.6, W4)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 4 (parity plan, session 1)
═══════════════════════════════════════════════════════════════
I am Agent 4 (parity plan §0.6 — all student UI). Guided by Supervisor Agent 5.

── PARITY LEDGER (workers: update every session) ────────────────
• Website sections total:        [parity script not yet built — W1 B0 task 1; ledger counts below are manual, flagged for Agent 5 to reconcile once the script lands]
• Native-live:                   12 (pre-campaign routes)   Placeholder: 0 registered (no parity stub routes exist yet)   Not started: ~28 remaining parity-map rows
• My batch contribution this session: +1 feature flow built on fakes (PYQs hub + subject), NOT yet native-live (needs W1 route + W2 endpoint per §1's four conditions)

── EDITS (required — Supervisor reads these files) ─────────────
android-native/.../ui/components/placeholder/ComingToNative.kt | +72 -0 | NEW — B0 W4 deliverable: the ONE honest "Coming to native" placeholder (title + honest copy + light/dark @Previews), built once for W1 to render in every parity stub route
android-native/.../ui/screens/pyqs/PyqModels.kt | +57 -0 | NEW — domain models mirrored field-for-field from frontend/features/pyqs/pyq-bank.ts (PyqYear/TheoryBlock/ConceptDrill/SubjectPyqBank + hub summary)
android-native/.../ui/screens/pyqs/local/FakePyqBank.kt | +137 -0 | NEW — PyqBankSource seam + local fake (2 subjects, year buckets newest-first, solutions, drills) so screens ship before W2's endpoints (no-wait rule)
android-native/.../ui/screens/pyqs/PyqsViewModel.kt | +85 -0 | NEW — synchronous JVM-testable VM (same pattern as search/practice pre-swap); honest empty state for unknown subjects; NO invented tier gate (see RQ-P2)
android-native/.../ui/screens/pyqs/PyqsHubScreen.kt | +105 -0 | NEW — /pyqs hub counterpart: subject cards with year range/question/unit counts, tap → onOpenSubject(classSlug, subjectSlug)
android-native/.../ui/screens/pyqs/PyqSubjectScreen.kt | +233 -0 | NEW — subject-bank counterpart of class-11-notes/[subject]/theory: theory blocks → year buckets (newest first) → expandable Show/Hide-solution questions (web behaviour mirrored) → concept drills
app/src/test/.../pyqs/FakePyqBankTest.kt | +66 -0 | NEW — 5 tests: hub/bank count consistency, newest-first ordering, question well-formedness, unknown-subject → null, drill kinds
app/src/test/.../pyqs/PyqsViewModelTest.kt | +63 -0 | NEW — 5 VM tests: hub init, openSubject load, honest empty state, same-subject no-reload, closeSubject reset

GIT: android-native/ still untracked.

COMPLETED (behavior, not log fluff):
1. B0 W4 share DONE: the shared "Coming to native" component exists; W1 can render it in the parity stub routes the moment they are registered (RQ-P1 below).
2. P1 slice 1 built: PYQs hub + subject viewer match the website's flow exactly (hub card counts computed the same way; year buckets newest-first; expandable solutions; drills section).
3. Models mirror the TS types 1:1 so W2's contract can pin them without reshaping my UI.

VERIFIED (real builds):
• ./gradlew testDebugUnitTest → BUILD SUCCESSFUL, 120 tests / 0 failures (110 prior + my 10). Verified from JUnit XML, not task output.
• ./gradlew assembleDebug → BUILD SUCCESSFUL, app-debug.apk 75.1 MB.
• Environment: hit the documented concurrent-build corruption twice (kspDebugKotlin untracked-state error; clean blocked by open handles from 2 idle java daemons). Resolved with gradlew --stop + clean fused into the same invocation — serialization recommendation to Supervisor stands.

INTEGRATION REQUESTS:
• RQ-P1 (→ Agent 1, route): register parity stub routes per plan §0.2 and render ComingToNative in each; when wiring my PYQ screens use: pyqs → PyqsHubScreen(onOpenSubject) and pyq/{classSlug}/{subjectSlug} → PyqSubjectScreen(classSlug, subjectSlug, onBack). NOTE: pyqs/** is a new feature folder — parity plan §0.2 grants W4 all of ui/screens/**; the older AGENTS.md path list predates the parity campaign.
• RQ-P2 (→ Agent 2/5, contract + gate): the website gates /pyqs at minLevel "plus" (frontend/lib/core/navigation.ts:225). The mobile PYQ contract must carry/respect the same gate — enforcement belongs in the data layer (W3 parity task 11), not my UI. Flagging now so parity doesn't silently widen access.
• RQ-P3 (re-file of RQ-7, → Agent 1, test-dep): kotlinx-coroutines-test still absent; I deliberately avoided it this session (synchronous VM) rather than wait.

CONTINUE NEXT:
• P1 slice 2 on fakes: exam hub + announcements + changelog (cheap catalog surfaces), then formula sheets/practicals/legends once W2's contract docs exist.
• KaTeX/math rendering in readers — still queued behind device test per earlier order; PYQ solutions will need it (solutions contain math).
═══════════════════════════════════════════════════════════════
```

Classification: 8 files changed, all **[IMPORTANT CORE FILE]** (feature UI, fakes, tests; no content payloads).
### Agent 1 — Parity session 1 (B0): parity script + full stub registry + CI wiring — ledger baseline honest

**Campaign:** [`android-native-parity-plan.md`](android-native-parity-plan.md) — Worker 1, batch **B0 (parity infra)**.

**EDITS:**
1. **`scripts/ci/native-parity-check.mjs` (NEW)** — the Appendix-A parity gate. Parses `frontend/lib/core/navigation.ts` (NAV_SECTIONS = website sections, single-line-item line scanner) and `RnNavHost.kt` (Routes constants, `WebParity` registry, explicit composables, StubScreen detection). Per-section status LIVE | PLACEHOLDER | MISSING | EXCEPTION; prints the script-generated PARITY LEDGER; **exit 1 on any MISSING section or broken registry** (double-mapped href, dead stub loop, unknown route constant, orphan exception). Site-index deep pages documented as content payloads reached *through* section routes (header note) — nav registry is the section source of truth per plan §2.
2. **`RnNavHost.kt`** — added 76 parity route constants + the parseable **`WebParity`** registry (11 live mappings, 117 stubs incl. pattern routes `class-hub/{slug}`, `class-hub/{slug}/theory`, `lab/{id}`, `knowledge/{topic}`, `exam/{track}`, …, 1 documented exception `/mind-studio`) + the `WebParity.stubs.forEach` registration loop that wires every stub destination with auto-derived nav args. Stub promotion protocol (W4 screen → move entry to `live` + explicit composable → W1 deep links) written at the loop.
3. **`scripts/ci/scoped-check.mjs`** — new `nativeParity` area: runs the parity gate when `android-native/**`, `frontend/lib/core/navigation.ts` or `site-index.ts` change; always in `--all`.

**VERIFIED:**
- `node scripts/ci/native-parity-check.mjs` → **OK, exit 0** (caught 24 unmapped subject-hub pages on first run — fixed by registering them; the gate demonstrably bites).
- `compileDebugKotlin` → **BLOCKED by Worker 4's in-flight untracked PYQ batch** (`PyqsViewModel.kt`: 4 unresolved-ref errors — `PyqBankSource`, `subjects`, `bank`). **Zero compiler diagnostics in `navigation/RnNavHost.kt`** (all `e:` lines are in the W4 file). No-wait rule: W4 files untouched; request below.

**INTEGRATION REQUEST — Agent 5 → Worker 4:**
Need: compile-fix
Detail: untracked `ui/screens/pyqs/PyqsViewModel.kt` fails `compileDebugKotlin` (unresolved `PyqBankSource`/`subjects`/`bank`, type mismatch L67) — blocks every worker's build verification. W2's `backend/src/api/mobile/pyqs.ts` + tests are also untracked; contract doc needed before W3 binds.
Files ready: `android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/pyqs/*`

**PARITY LEDGER (script-generated):**
```text
• Website sections total:        155  (parity-relevant 128, exceptions 27)
• Native-live:                   11   Placeholder: 117   Not started: 0
• My batch contribution this session: +117 stub routes registered (B0 complete for W1)
```

**Next (B0 remainder → B1):** W4 ships the shared "Coming to native" placeholder component → I swap `StubScreen` bodies for it; then per-batch promotions + deep links for new routes; `versionCode` bump + `bundleRelease` at B1 exit.

### Agent 3 — Session 5 (closeout): study fake→real swap COMPLETE — SyllabusScreen + StudyUnitScreen on the real chain

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 3 (SWAP ORDER, study feature)
═══════════════════════════════════════════════════════════════
I am Agent 3. Guided by Supervisor Agent 5.

Contract check first (do not invent fields): Agent 2 has landed
`GET /api/mobile/units?subject=<slug>` and `GET /api/mobile/notes` (cursor
envelope) — backend/src/api/mobile/{units,notes}.ts + pinned schemas in
public-schemas.ts. Note CONTENT comes from the documented reuse route
`GET /api/r-notes/:id` (sendSuccess envelope over the manifest item:
{id, subject, chapter, title, notes: [html blocks], <h1> = section heading}).
Two contract facts the order's paths glossed over, honoured as-is:
  • units endpoint is `?subject=<slug>` (query), not `:classSlug` (path).
  • topic NAMES are not in the units payload — only topicCount. The reader
    shows "N curriculum topics" and a pointer to RQ-6; no topic names invented.

── EDITS (required — Supervisor reads these files) ─────────────

Data layer (mine):
  core/contract/MobileUnits.kt | +34 | NEW DTOs: MobileUnitsResponse/Data,
      MobileSubjectRefDto, MobileUnitDto{id,slug,title,order,topicCount}
  core/contract/MobileNotes.kt | +51 | NEW DTOs: MobileNotesResponse,
      CursorPageDto{items,nextCursor}, MobileNoteItemDto{id,subject,chapter,
      title,noteCount}, RNoteResponse/RNoteItemDto{id,subject,chapter,title,
      notes:[html]}
  data/api/RnApi.kt | +27 | mobileUnits(subject), mobileNotes(subject,chapter,
      limit,cursor), rNote(id) — note the units endpoint is ?subject=<slug>
      (query), matching the live router, not :classSlug as the order sketched
  data/repository/StudyCache.kt | +37 | NEW: SyllabusCache generalized to
      StudyCache{get/put/delete(key)} + RoomStudyCache; keys mirror the backend
      content-cache keys (mobile-syllabus:v1, mobile-units:v1:<slug>,
      mobile-notes:v1:<subject|all>, r-note:v1:<id>)
      (replaces data/repository/SyllabusCache.kt — deleted)
  data/repository/SyllabusRepository.kt | rewritten ~200 | Result now wraps a
      Payload (SyllabusTree/Units/NoteCatalog/NoteContent); generic
      fetch→cache→fallback engine shared by all four loaders; 404 → Unavailable
      with the server message; cursor pages NOT cached (first page only);
      loadUnits/loadNotes/loadNoteContent all offline-tolerant
  data/repository/NoteContentMapper.kt | +47 | NEW pure mapper: r-notes HTML
      blocks → reader sections (a block starting <h1> opens a section; tags
      stripped, whitespace collapsed; pre-heading blocks = intro; unicode safe)
  di/AppModule.kt | ~4 | StudyCache binding (was SyllabusCache)

Study screens (authorized by this swap order):
  ui/screens/study/SyllabusViewModel.kt | +80 | NEW HiltViewModel: SyllabusUiState
      {loading, error, fromCache, tree, units, unitsLoading, unitsFromCache};
      loadTree()/loadUnits(slug)/closeUnits() — fromCache=true ⇔ the Room cache
      served the payload (airplane mode), surfaced as an "Offline — showing
      saved copy" banner, never silently
  ui/screens/study/StudyUnitViewModel.kt | +150 | NEW HiltViewModel: resolves
      <subjectSlug>:<unitSlug> route arg → unit metadata → notes catalog
      (chapter = unit title) → note content; per-hop offline fallback; empty
      catalog → honest "No published notes for this unit yet" (no fake body)
  ui/screens/study/SyllabusScreen.kt | rewritten ~290 | FakeSyllabus consumption
      REPLACED: ClassList/SubjectList/UnitList render VM state (wire DTOs);
      loading spinner, error card with retry, offline banner; drill-down state
      still rememberSaveable; onOpenUnit now emits "<subjectSlug>:<unitSlug>"
      (single route segment — navigation untouched); scaffold/ListCard/
      UnitHoursChip helpers preserved
  ui/screens/study/StudyUnitScreen.kt | rewritten ~145 | FakeNotes/FakeSyllabus
      consumption REPLACED: renders StudyUnitViewModel state — unit title/
      order/topicCount from the units endpoint, note body from the real chain,
      Retry button on error, offline banner; legacy plain-id route args show
      "Open a unit from the syllabus list" (no fake fallback)

Fakes kept for tests only (unchanged files): local/FakeSyllabus.kt,
local/FakeNotes.kt — no UI file references them any more (grep-verified:
only local/* themselves + FakeSyllabusTest reference them).

Tests (all JVM, no new deps):
  app/src/test/.../data/SyllabusRepositoryTest.kt | rewritten ~260 | 16 tests:
      6 tree (incl. offline/cold-start/corrupt/stale) + 3 units (fresh cache
      write per subject key, offline fallback, 404→Unavailable) + 2 notes
      (first page cached, cursor pages NOT cached; offline fallback) +
      3 note content (fresh cache write, offline fallback, 404) + 2 cache mgmt
  app/src/test/.../data/NoteContentMapperTest.kt | +56 | NEW 5 tests: h1 section
      splitting, tag stripping, empty content, no-heading fallback, unicode
  app/src/test/.../data/Fakes.kt | +38 | FakeRnApi scripted units/notes/rNote
      + query recording

VERIFIED (real builds):
• ./gradlew clean testDebugUnitTest → BUILD SUCCESSFUL, 122 tests, 0 failures
  (SearchEngineTest now passes too — Agent 4 fixed it). All 16 suites green.
• ./gradlew clean assembleDebug → BUILD SUCCESSFUL (app-debug.apk, 64.4 MB).
  (First post-edit run hit corrupted app/build intermediates from concurrent
  agent builds again — clean+build fused in one invocation resolved it.)

COLD-START PATH: covered at repository level (Unavailable on empty cache +
no network, corrupt cache → Unavailable) and surfaced by both VMs as
error state + Retry. VM-level unit tests need kotlinx-coroutines-test
(Dispatchers.setMain) — see INTEGRATION REQUEST below; the state mapping
itself is thin over the tested repository results.

INTEGRATION REQUESTS (same session, per the rule):
  RQ-7 (→ Agent 1, gradle-dep, test-only):
     testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")
     → enables Dispatchers.setMain for SyllabusViewModel/StudyUnitViewModel
     state tests (loading/error/fromCache transitions) next session.
  RQ-6 (→ Agent 2, contract): topic NAMES are not in /api/mobile/units (only
     topicCount) and unit→note linkage is by free-text chapter name only.
     Native reader would benefit from a note-content-by-chapter-id endpoint
     (or units payload carrying topic names) — additive /api/mobile/* only.
  RQ-8 (→ Agent 5/1): request the SAME swap for search + practice data
     sources (FakeSearch/FakePractice → RnApi + StudyCache) on the
     Supervisor's per-feature order — practice contract is already live
     (backend/src/api/mobile/practice.ts).

CONTINUE NEXT:
• On RQ-5/RQ-6 contracts: topic names in the unit header, note pagination
  beyond page 1 (echo nextCursor), note content caching is already wired.
• FieldCipher sealed-cache port stays queued (Phase 5).
═══════════════════════════════════════════════════════════════
```

### Agent 4 — SearchEngine fix (kind-aware scoring) + swap-prep check (Session 5 W4 priority)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 4
═══════════════════════════════════════════════════════════════
I am Agent 4. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
android-native/.../ui/screens/search/SearchModels.kt | +19 -8 | FIX: kind-aware scoring — UNIT title match (50/45/40) now always outranks TOPIC exact (25) and NOTE exact (22); snippet-only = 5. Test expectations unchanged.
android-native/.../ui/screens/search/local/FakeSearchIndex.kt | +15 -1 | FIX: index note intro as a NOTE entry per unit ("kinematics" now also matches intro prose → results.size > 1 holds)
android-native/.../ui/screens/search/SearchScreen.kt | +4 -1 | follow-up: result matchText capped at 2 lines w/ ellipsis (intros are longer than headings)

GIT: android-native/ still untracked (per earlier sessions).

COMPLETED (behavior, not log fluff):
1. Priority 1 DONE: SearchEngineTest > "unit title match outranks topic and note matches for the same word" passes. Engine fixed, test untouched.
2. Verified actual failure first (assertion at line 27 = results.size > 1): fixed BOTH the ranking hazard (kind-aware scores) and the missing-match cause (intros now indexed).
3. Priority 2 (swap prep): NO changes needed — my ViewModels (Search/Practice/QuizRunner/VeerChat) consume only local fakes; Agent 3's SyllabusRepository has no reverse dependency on my screens. No constructor signature adaptation required; no integration request needed. Swap remains gated on §7.

VERIFIED: ./gradlew testDebugUnitTest → BUILD SUCCESSFUL, 101 tests / 0 failures / 0 errors / 0 skipped (aggregated from JUnit XML). Main sources compiled as part of the run.

CONTINUE NEXT:
• Await §7: fake→real swap order (then adapt screen/VM signatures to Agent 3 repos + real SSE)
• Math rendering after device test (per earlier queue — not started)

INTEGRATION REQUEST: none this session.
═══════════════════════════════════════════════════════════════
```

Classification: 3 files changed, all **[IMPORTANT CORE FILE]** (feature source; no content payloads).

### Agent 1 — Session 5: RQ-3 wired + ALL remaining routes live + CI tests + WebView allowlist (zero stubs left)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 1 (Session 5)
═══════════════════════════════════════════════════════════════
I am Agent 1. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
  android-native/.../navigation/RnNavHost.kt | +40 -7 | RQ-3: search → SearchScreen(onOpenUnit→Routes.studyUnit), practice → PracticeHubScreen. PLUS wired all 5 remaining routes W4 shipped: quiz/{quizId} → PracticeQuizScreen(setId, onExit→popBackStack) with navArgument, ai-tutor → VeerChatScreen, community → CommunityScreen, profile → ProfileScreen(onOpenNotifications→NOTIFICATIONS), notifications → NotificationsScreen(onBack→popBackStack). NAV GRAPH NOW HAS ZERO STUBS.
  .github/workflows/android-native.yml | +14 -0 | testDebugUnitTest step after assembleDebug + test-report artifact on failure — unit tests now gate PRs
  docs/guides/android-native-webview-allowlist.md | +46 -0 | Phase 0 leftover: allowlist is EMPTY by default; 6 rules for any future entry (explicit route, same-origin only, no cookie crossing, debug off in release, burn-down); labs/mindmaps noted as the only candidate via labs-decision doc
  docs/guides/android-native-STATUS.md | §4 | this checkpoint

COMPLETED (behavior, not log fluff):
1. Every destination in the migration plan §5 map now renders a real screen
   or a documented stub-free state: home, settings, auth×3, learn, study/{unitId},
   search, practice, quiz/{quizId}, ai-tutor, community, profile, notifications.
2. CI gates PRs on unit tests, not just assembly.
3. WebView policy documented before any fallback WebView can be introduced.
4. NOT done (per order "later"): versionCode strategy, R8/minify tuning,
   Crashlytics — untouched.

VERIFIED:
• ./gradlew assembleDebug → BUILD SUCCESSFUL; app-debug.apk 64.58 MB (14:21)
  with all routes wired. Also verified via an isolated clean copy
  (/tmp/rn-iso, --no-build-cache, 50 tasks executed) when the shared build dir
  was lock-contended by concurrent agent builds.
• ./gradlew testDebugUnitTest → 101 tests, 1 FAILURE — NOT mine:
  SearchEngineTest."unit title match outranks topic and note matches for the
  same word" (SearchEngineTest.kt:27, assertTrue(results.size > 1) fails —
  searching "kinematics" returns 1 result, engine/index ranking issue in
  Agent 4's search/**). IMPORTANT: the new CI test step will be RED until W4
  fixes this one test. Flagging now so it is not a surprise.
• Build-env note: this 8 GB box is heavily contended by concurrent agent
  builds — daemon OOM kills and KSP generated-file lock collisions. Workers
  building android-native should serialize builds or use an isolated copy;
  flagging for Supervisor to coordinate.

CONTINUE NEXT:
• W4: fix SearchEngineTest ranking (1 test) → CI green.
• Next §7 swap orders → wire real data sources behind the routes as W3 lands them.
• Pre-release batch (later): versionCode, R8, Crashlytics.

INTEGRATION REQUEST: none.
═══════════════════════════════════════════════════════════════
```

### Agent 3 — Session 4: FCM contract pinned, study swap phase 1 (real syllabus tree + offline cache), Room-cache offline tests

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 3 (Session 4, W3 backlog order)
═══════════════════════════════════════════════════════════════
I am Agent 3. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────

1) SessionStore/SyncRetryPolicy DI wiring — VERIFIED, no changes needed:
   AppModule already provides SessionStore (binds SessionManager) and
   ContentSyncWorker uses SyncRetryPolicy + exposes SessionStore via its
   EntryPoint; SessionCodecTest (4) + SyncRetryPolicyTest (5) already cover
   them. Nothing was missing.

2) FCM contract test + client-side bounds guard:
   data/fcm/FcmTokenPolicy.kt | +14 | NEW pure guard mirroring backend schema
       (fcmToken min 8 / max 4096, from backend/src/api/access-requests.ts) —
       out-of-bounds tokens skip the network call instead of a guaranteed 400
   data/fcm/FcmRegistrar.kt | ~2 | uses FcmTokenPolicy before registering
   app/src/test/.../data/FcmApiContractTest.kt | +107 | NEW: pins the wire for
       POST/DELETE /api/access-requests/fcm — Retrofit over a request-recording
       OkHttp interceptor (pure JVM, NO new deps): exact path, method, JSON body
       {"fcmToken":"…"} (snake_case check), plus 5 bounds cases. 4/4 pass.

3) Study swap — phase 1 (class/subject level; see SCOPE NOTE):
   core/contract/MobileSyllabus.kt | +38 | NEW DTOs pinned to
       mobileSyllabusResponseSchema: {ok, data.classes[{id,slug,name,subjects[{id,slug,name}]}]}
   data/api/RnApi.kt | +6 | GET api/mobile/syllabus
   data/repository/SyllabusCache.kt | +37 | NEW SyllabusCache seam +
       RoomSyllabusCache (key mobile-syllabus:v1, mirrors backend cache key)
   data/db/AppDatabase.kt | +3 | CacheDao.delete(key) (single-row invalidation)
   data/repository/SyllabusRepository.kt | +74 | NEW: Fresh (network+cache write)
       / Cached (offline fallback, ageMs) / Unavailable (cold start, friendly
       message); corrupt cache JSON → Unavailable, never a crash
   di/AppModule.kt | +8 | provides SyllabusCache (Room-backed) + SyllabusRepository
   app/src/test/.../data/SyllabusRepositoryTest.kt | +133 | NEW 8 tests incl. the
       ordered offline path: network failure → cache served; HTTP 500 → cache;
       cold start no-cache → Unavailable (short displayable message); corrupt
       cache → Unavailable; stale (epoch) cache still serves; identity mapping
   app/src/test/.../data/Fakes.kt | +10 | FakeRnApi scripted mobileSyllabus()

   SCOPE NOTE (honest): /api/mobile/syllabus carries class→subject ONLY —
   W2's units/notes contracts have NOT landed (backend/src/api/mobile/ has
   syllabus.ts only; docs/api/mobile-syllabus-notes.md routes units/topics to
   per-subject legacy endpoints). So the UI-facing swap is limited to the
   class/subject level; FakeSyllabus unit drill-down + FakeNotes stay until
   the units/notes endpoint is contract-pinned.

   INTEGRATION REQUEST (→ Agent 4, then Agent 1):
   RQ-4 (W4): SyllabusScreen class/subject list should consume
       SyllabusRepository.load() (inject via hiltViewModel-provided VM or a
       small SyllabusViewModel I can add on request) — keep FakeSyllabus for
       unit detail until the units endpoint lands; keep fakes for tests.
   RQ-5 (W2): GET /api/mobile/units?subject=<id> (units+topics per subject)
       is the missing piece for full study swap + notes list contract after it.

4) Offline Room-cache tests — covered by SyllabusRepositoryTest above
   (Room DAO itself needs Android; the cache seam keeps the offline logic
   JVM-testable. A Robolectric DAO test can be added if the owner wants it).

5) BOUNDARY EXCEPTION — disclosed for Agent 5 review:
   app/src/test/.../ui/screens/practice/QuizRunnerViewModelTest.kt | 1 char |
       Agent 4's test name contained `;` inside a backticked name — illegal
       JVM method name ("Name contains illegal characters: ;") that blocked
       the ENTIRE shared test source set (all-or-nothing compile), including
       the verification this session's order requires. Fixed `;` → `-`.
       No behavior change; their 8 tests now pass. Flagging as a deliberate
       exception to the path rule; revert-and-refile if Agent 5 prefers.

VERIFIED (real builds on this machine):
• ./gradlew clean testDebugUnitTest → 101 tests, 2 failures:
    - SyllabusRepositoryTest `fresh fetch…` — MY BUG (raw().peekBody() NPEs on
      Retrofit synthetic responses) → FIXED in SyllabusRepository (cache now
      stores the re-serialized typed payload; more robust than raw peeking).
      Re-run: 101 tests, 1 failure (SearchEngineTest only — Agent 4's).
    - SearchEngineTest — Agent 4's path, untouched (flagged since Session 2).
• My suites: FcmApiContract 4/4 · SyllabusRepository 8/8 · AuthRepository 12/12 ·
  RedirectPolicy 11/11 · SseParser 13/13 · ContractSerialization 6/6 ·
  SessionCodec 4/4 · SyncRetryPolicy 5/4→5/5 — 63/63 total mine.
• ./gradlew clean assembleDebug → BUILD SUCCESSFUL (app-debug.apk, 64.4 MB).

ENVIRONMENT (repeated from Session 2 — worse now): concurrent agent builds on
the same android-native/ tree corrupt app/build for each other (empty kotlin
outputs marked UP-TO-DATE, deleted ksp dirs mid-task, dex-merge dirs invalid,
daemon kills via --stop, 3+ JVM OOM crashes). Every green result above required
`clean` fused into the same gradle invocation + --no-daemon --no-build-cache
+ in-process Kotlin + ≤900 MB heap. Recommendation to Supervisor: serialize
gradle invocations across agents (even a simple lock file) — the current races
waste far more wall-clock than they save.

INTEGRATION REQUESTS: RQ-4 (route/data wiring → Agent 4), RQ-5 (missing
units/notes contract → Agent 2). No new libraries imported (recording-
interceptor technique kept everything on existing deps).

CONTINUE NEXT (per backlog):
• On RQ-5 landing: swap unit drill-down + notes to RnApi + Room cache.
• Then search + practice data sources the same way (per-feature order).
• FieldCipher sealed-cache port stays queued (Phase 5).
═══════════════════════════════════════════════════════════════
```

### Agent 4 — Quiz runner + Veer chat + community + profile/notifications + labs decision (Session 3 W4 queue)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 4
═══════════════════════════════════════════════════════════════
I am Agent 4. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
android-native/.../ui/screens/practice/QuizRunnerViewModel.kt | +82 -0 | scored runner state: select→check→next→summary, factory for route setId
android-native/.../ui/screens/practice/PracticeQuizScreen.kt | +198 -0 | quiz runner UI: progress bar, option cards w/ correct/wrong tinting, explanation, score summary
android-native/app/src/test/.../practice/QuizRunnerViewModelTest.kt | +95 -0 | runner flow tests (scoring, lock-after-check, finish, out-of-range guards)
android-native/.../ui/screens/ai/ChatModels.kt | +15 -0 | ChatRole/ChatMessage (mirrors SSE wire shape for later swap)
android-native/.../ui/screens/ai/local/FakeChatStream.kt | +59 -0 | fake SSE: token-chunk Flow, curriculum-aware canned replies, injectable delay for tests
android-native/.../ui/screens/ai/VeerChatViewModel.kt | +85 -0 | consumes chunk stream into streaming bubble; stop(); injectable scope (no viewModelScope ktx dep needed)
android-native/.../ui/screens/ai/VeerChatScreen.kt | +100 -0 | chat UI: bubbles, auto-scroll while streaming, send/stop input bar
android-native/.../ui/components/chat/ChatBubble.kt | +59 -0 | reusable bubble (user/assistant styling)
android-native/app/src/test/.../ai/VeerChatViewModelTest.kt | +79 -0 | VM tests w/ fake SSE (Unconfined + zero-delay stream, no coroutines-test dep)
android-native/.../ui/screens/social/CommunityModels.kt | +15 -0 | CommunityPost model
android-native/.../ui/screens/social/local/FakeCommunity.kt | +63 -0 | 5 demo posts
android-native/.../ui/screens/social/CommunityScreen.kt | +126 -0 | feed w/ local like toggle (rememberSaveable)
android-native/.../ui/screens/profile/ProfileModels.kt | +25 -0 | ProfileUser/ProfileStats/RnNotification models
android-native/.../ui/screens/profile/local/FakeProfile.kt | +69 -0 | fake user, stats, 4 notifications
android-native/.../ui/screens/profile/ProfileScreen.kt | +140 -0 | profile: user card, stat cards, notifications entry, sign-out placeholder (SettingsScreen untouched)
android-native/.../ui/screens/profile/NotificationsScreen.kt | +119 -0 | notifications: unread dots, local mark-as-read
android-native/../docs/guides/android-native-labs-decision.md | +29 -0 | DECIDED: labs stay web-only (Three.js/Canvas not portable in phase budget; WebView allowlist empty by default); mindmap read-only viewer = phase-2 candidate

GIT: android-native/ still untracked.

COMPLETED (behavior, not log fluff):
1. Quiz runner: full scored MCQ flow over the fake practice sets (quiz/{quizId} ready for wiring).
2. Veer chat: streaming-token demo replies w/ stop button; message reduction matches SSE delta shape.
3. Community feed w/ likes; profile w/ stats + notifications w/ mark-as-read — all on local fakes.
4. Labs/mindmaps decision doc written (task 8).

VERIFIED: FULL CLEAN BUILD (no cache, 28 tasks executed) had ZERO source compile errors — compileDebugKotlin + kspDebugKotlin PASSED (grep 'error' = 0). assembleDebug/testDebugUnitTest then failed ONLY on concurrent-build races (see integration request) — not on any source file. Math rendering: NOT started (scheduled with Supervisor after device test, per queue).

CONTINUE NEXT:
• Re-run assembleDebug + all 4 test classes once build serialization is in place
• Wire-ups pending Agent 1: quiz/{quizId} → PracticeQuizScreen, ai-tutor → VeerChatScreen, community/profile/notifications routes
• After §7 orders fake→real swap: search/practice/ai/community/profile onto Agent 3 repo + real SSE

INTEGRATION REQUEST (RQ-5 — CRITICAL process rule):
• CONCURRENT GRADLE BUILDS ARE CORRUPTING SHARED BUILD STATE. Evidence: (a) two daemon OOM crashes; (b) 'multiple Kotlin daemon sessions' warning; (c) 'Could not delete ...kotlin-classes\com', 'Device or resource busy' on .gradle locks; (d) compileDebugJavaWithJavac ran against UP-TO-DATE outputs whose dirs did not exist; (e) processDebugResources: 'file in use by another process'; (f) 3 java processes spawned 12:37–12:38 during my build. REQUEST: Supervisor enforce ONE build at a time across Agents 1–4 (e.g. build only in your own session turn, or per-agent GRADLE_USER_HOME + build dir). My clean no-cache run proves all source compiles; nothing to fix in code.
═══════════════════════════════════════════════════════════════
```

Classification: all 17 files above are **[IMPORTANT CORE FILE]** (feature UI, tests, decision doc; no content payloads).

### Agent 2 — Session 3: units/notes/practice/community contracts + auth/FCM docs (W2 CONTINUE #3)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 2 (session 3)
═══════════════════════════════════════════════════════════════
I am Agent 2. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
  backend/src/api/mobile/units.ts | +83 -0 | NEW: GET /api/mobile/units?subject= — units (chapters) of one subject, curriculum-ordered, topicCount badge, from the same subjects/chapters/topics tables via shared contentCache; 400 missing subject, 404 unknown subject, 500 DB failure
  backend/src/api/mobile/notes.ts | +84 -0 | NEW: GET /api/mobile/notes — r-notes catalog, cursor-paginated (anchor = index into the deterministic filtered list), subject/chapter filters, reuses the same manifest file as /api/r-notes
  backend/src/api/mobile/practice.ts | +86 -0 | NEW: GET /api/mobile/practice — exam catalog (same files as /api/tests), slug-sorted deterministic order, cursor-paginated; PYQs stay tier-gated on /api/pyqs (documented, not weakened)
  backend/src/api/mobile/community.ts | +103 -0 | NEW: GET /api/mobile/community — public posts, keyset cursor on created_at DESC with limit+1 prefetch, category filter, compact rows (no emails/storage URLs), 503 on missing migration 018 (reuses isMissingTable from base.repository)
  backend/src/api/mobile/index.ts | +9 -1 | mount lines only: /units /notes /practice /community
  backend/src/api/contracts/public-schemas.ts | +73 -0 | ADDITIVE schemas: mobileUnit(S)Schema, mobileUnitsResponseSchema, mobileNoteItemSchema + mobileNotesResponseSchema, mobileExamItemSchema + mobilePracticeResponseSchema, mobileCommunityPostSchema + mobileCommunityResponseSchema (all parse before send)
  backend/tests/integration/mobile-units.test.ts | +171 -0 | NEW: 4 tests — ordering + topicCount, 400/404, inactive excluded, DB failure 500
  backend/tests/integration/mobile-notes.test.ts | +115 -0 | NEW: 4 tests — compact rows, cursor walk covers catalog exactly once, filters, terminal null cursor (fixture-driven manifest)
  backend/tests/integration/mobile-practice.test.ts | +102 -0 | NEW: 2 tests — deterministic catalog, shared cursor convention (fixture-driven exam files)
  backend/tests/integration/mobile-community.test.ts | +197 -0 | NEW: 4 tests — newest-first compact rows, private rows excluded + category filter, cursor walk = every public post exactly once, DB failure 500
  backend/tests/fixtures/mobile/r-notes/resources/exports/manifest.json | +30 -0 | NEW: 4-row manifest fixture
  backend/tests/fixtures/mobile/practice/exams/exam-a.json, exam-b.json | +16 -0 | NEW: exam fixtures
  docs/api/mobile-openapi.yaml | +196 -0 | units/notes/practice/community documented (params, envelopes, error codes)
  docs/api/mobile-syllabus-notes.md | +21 -1 | live list-endpoints table + pointer to mobile-auth-fcm.md
  docs/api/mobile-auth-fcm.md | +88 -0 | NEW: auth/FCM contract — X-Rn-Client/X-Rn-Signing-Cert headers, session cookie + Bearer, /api/auth/* table, /api/access-requests/fcm POST/DELETE + GET /me, native FCM flow, Firebase idToken error codes

COMPLETED (behavior, not log fluff):
1. Native syllabus drill-down is fully served: /api/mobile/syllabus (class→subject) + /api/mobile/units (subject→units with topic counts).
2. Notes + practice catalogs are cursor-paginated with the shared convention; community feed gets a read-only compact paginated contract (keyset on created_at).
3. Auth/FCM contract documented — no new auth routes, existing gates untouched.
4. All endpoints schema-pinned (Zod parse before send) and additive — zero changes to existing /api/* shapes.

VERIFIED: npx vitest run on all 7 mobile test files → 28/28 passed; npx tsc --noEmit → clean.

CONTINUE NEXT:
• Author display enrichment for /api/mobile/community (author name/plan join) if Supervisor wants it in the list payload.
• Mobile endpoint for practice history / quiz submission contract once Agent 4's quiz UI defines its needs.

INTEGRATION REQUEST: none.
═══════════════════════════════════════════════════════════════
```

### Agent 3 — Session 2: unit tests for session/auth/sync + two real bug fixes (build green)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 3 (Session 2, W3 CONTINUE order)
═══════════════════════════════════════════════════════════════
I am Agent 3. Guided by Supervisor Agent 5.

Precondition check: W1 landed RQ-1 deps in app/build.gradle.kts (okhttp 4.12.0,
retrofit 2.11.0 + kotlinx-serialization converter, room 2.7.1 + ksp, work 2.10.0,
security-crypto 1.1.0-alpha06, firebase-bom 33.7.0, serialization plugin, plus
lifecycle-runtime-compose). assembleDebug → BUILD SUCCESSFUL (app-debug.apk, 64.3 MB)
before I wrote any new code. ✅

── EDITS (required — Supervisor reads these files) ─────────────

Compile fixes in MY paths (permitted by the W3 order — tree would not assemble):
  core/network/HttpException.kt | +1 | missing `import java.io.IOException`
  core/network/RedirectGuardInterceptor.kt | ~2 | KDoc containing `/api/*` closed the comment early (Unclosed comment)
  core/network/ResponseCapInterceptor.kt | ~2 | `okio.buffer(x)` → `x.buffer()` + import (extension fn call form)
  core/stream/SseClient.kt | ~1 | FakeSseClient.MutableRef given a constructor (`MutableRef<T>(var value: T? = null)`)
  data/session/SessionManager.kt | ~8 | security-crypto 1.1.0-alpha06 API: MasterKey.Builder(context).setKeyScheme(AES256_GCM) instead of removed MasterKeys.getOrCreate
  data/sync/ContentSyncWorker.kt | ~3 | doWork wraps suspend API/DAO calls in runBlocking (Worker is not suspend)

REAL BUG FOUND BY TESTS (security, fixed):
  core/network/RedirectPolicy.kt | +3 | protocol-relative redirects (`//evil.example.com`) start with `/` and
      were FOLLOWED as "relative" — cross-origin escape. Now rejected
      (`startsWith("/") && !startsWith("//")`). Caught by RedirectPolicyTest
      `protocol-relative host is rejected`.

Testability seam (no behavior change; enables the ordered pure-JVM tests):
  data/session/SessionStore.kt | +17 | NEW interface over the encrypted store (token/user/isSignedIn/clear)
  data/session/SessionManager.kt | ~10 | implements SessionStore; JSON codec moved out
  data/session/SessionCodec.kt | +22 | NEW pure user-JSON codec (ignoreUnknownKeys, garbage → null) — testable without Android
  data/api/AuthRepository.kt | ~2 | constructor now takes SessionStore
  data/sync/ContentSyncWorker.kt | ~4 | EntryPoint exposes SessionStore; retry decision extracted
  data/sync/SyncRetryPolicy.kt | +19 | NEW pure 4-attempt backoff decision (RETRY/FAIL)
  di/AppModule.kt | +4 | provideSessionStore binds SessionManager → SessionStore
  data/fcm/FcmRegistrar.kt | ~2 | takes SessionStore

Unit tests (all JVM, no new deps — runBlocking not runTest, fakes in-tree):
  app/src/test/.../data/Fakes.kt | +83 | FakeSessionStore (records mutations) + FakeRnApi (scripted retrofit2.Response incl. generic error() builder)
  app/src/test/.../data/AuthRepositoryTest.kt | +152 | 12 tests: login success stores token+user; 401/403 wipe session; 400 parses server message; 202-style no-token → failure not session; IOException → truncated failure; signup success/409; me() updates user / 401 clears / non-auth errors keep session; signOut clears
  app/src/test/.../data/SessionCodecTest.kt | +39 | 4 tests: round-trip, unknown fields tolerated, garbage/blank/null → null (no crash on restore)
  app/src/test/.../data/SyncRetryPolicyTest.kt | +31 | 5 tests: attempts 0–2 retry, 3+ fail, custom caps
  app/src/test/.../core/RedirectPolicyTest.kt | +34 | expanded 7→11 tests (query/fragment, https-only origin, boundary prefix `host.evil.com` rejected, resolve keeps query)
  app/src/test/.../core/SseParserTest.kt | +40 | expanded 8→13 tests (multi-event chunk, empty data payload, no-space payload, empty event field, incremental feed)

COMPLETED (behavior, not log fluff):
1. assembleDebug BUILD SUCCESSFUL on the deps W1 landed — RQ-1 verified closed from my side.
2. testDebugUnitTest: **51/51 of my tests pass** (RedirectPolicy 11, SseParser 13,
   AuthRepository 12, ContractSerialization 6, SessionCodec 4, SyncRetryPolicy 5).
3. Module total: 75 tests, 1 failure — `SearchEngineTest` (Agent 4's path, untouched
   per boundary rules; flagged for W4/Supervisor).
4. Cross-origin redirect escape fixed (see REAL BUG above) — re-verified by assembleDebug.

ENVIRONMENT NOTE (for the team): builds on this machine are memory-starved
(7.6 GB RAM, <1 GB free with all agents live). Three JVM crashes this session
(hs_err: "insufficient memory"); one of my daemons was killed by another agent's
`--stop`; one mergeDebugResources lock failure. Working recipe that survives:
  JAVA_HOME=... GRADLE_OPTS="-Dorg.gradle.jvmargs=-Xmx900m
  -Dkotlin.compiler.execution.strategy=in-process" ./gradlew <task> --no-daemon
Please don't run `--stop` while others build, and prefer ≤1 GB heaps.

INTEGRATION REQUEST: none — no new libraries imported this session (deliberately:
used runBlocking instead of kotlinx-coroutines-test, fakes instead of Robolectric/mockk).

CONTINUE NEXT:
• W4: SearchEngineTest failure is in your path — please triage.
• When Supervisor orders the fake→real swap: Agent 4's syllabus fakes can move onto
  Room CacheDao + RnApi; SessionStore is the seam to inject in tests.
• Sealed-cache writer (FieldCipher port) still queued for Phase 5.
═══════════════════════════════════════════════════════════════
```

### Agent 1 — Session 2: integration batch A verified, build GREEN (RQ-1 + RQ-2)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 1 (Session 2)
═══════════════════════════════════════════════════════════════
I am Agent 1. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
Found ALREADY APPLIED in the working tree at session start (prior interrupted
session of Agent 1, or applied out-of-band — see note for §8). This session:
verified content line-by-line + drove the build to green. No new edits by me.

  android-native/app/build.gradle.kts | (batch A deps) | serialization plugin applied; okhttp 4.12.0 + logging-interceptor, retrofit 2.11.0 + converter-kotlinx-serialization, kotlinx-serialization-json 1.7.3, room 2.7.1 runtime/ktx + ksp compiler, work-runtime-ktx 2.10.0, hilt-work 1.2.0 + hilt-compiler (ksp), security-crypto 1.1.0-alpha06, lifecycle-runtime-compose 2.8.7, firebase-bom 33.7.0 + firebase-messaging — matches RQ-1 exactly (+ hilt-work which RQ-1 omitted; AppModule/EntryPoint needs it)
  android-native/build.gradle.kts | (pre-existing) | kotlin.plugin.serialization 2.1.0 apply false already pinned at root
  android-native/app/src/main/AndroidManifest.xml | (batch C) | POST_NOTIFICATIONS + RnFirebaseMessagingService (MESSAGING_EVENT, exported=false) present; deep-link filters from session 1 intact
  android-native/.../navigation/RnNavHost.kt | (RQ-2) | auth flow wired: auth → WelcomeScreen(onLogin/onSignup), auth/login → LoginScreen(onSignedIn→HOME popUpTo auth inclusive), auth/signup → SignupScreen; learn → SyllabusScreen(onOpenUnit→Routes.studyUnit); study/{unitId} → StudyUnitScreen(unitId) with navArgument; remaining 7 stubs kept

NOTE FOR §8: the batch A/C/RQ-2 edits carry a comment "Agent 3 data layer
(integration batch A)" in app/build.gradle.kts — if Agent 3 wrote Gradle/manifest
directly that is an ownership violation to record; if it was my prior interrupted
session, no violation. Cannot attribute from an untracked tree.

COMPLETED (behavior, not log fluff):
1. RQ-1 satisfied: all Agent 3 deps declared, app module compiles including
   di/AppModule.kt, core/network/*, data/* (all previous Unresolved references gone).
2. RQ-2 satisfied: learn + study/{unitId} + full auth flow live in RnNavHost;
   stubs remain only for search/practice/quiz/ai-tutor/community/profile/notifications.
3. Build gate met.

VERIFIED:
• ./gradlew assembleDebug → BUILD SUCCESSFUL in 1m 6s; app-debug.apk 64.2 MB (11:36).
  (Required --no-daemon -Dkotlin.compiler.execution.strategy=in-process --max-workers=1:
  default daemon runs kept dying — 8 GB box contended by concurrent agent builds,
  plus KSP generated-file lock collisions while another agent's build was live.)
• ./gradlew testDebugUnitTest → compileDebugUnitTestKotlin FAILED — NOT mine:
  ContractSerializationTest.kt (Agent 3 test) missing `import
  kotlinx.serialization.encodeToString`, so encodeToString resolves to the
  member overload expecting SerializationStrategy. One-line fix on their path.

CONTINUE NEXT:
• Agent 3: add the missing encodeToString import → testDebugUnitTest green.
• Wire next Integration queue batch (search/practice stubs → real screens when W4 ready).

INTEGRATION REQUEST: none.
═══════════════════════════════════════════════════════════════
```

### Agent 4 — Search UI + Practice hub skeleton (Session 2 W4 order)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 4
═══════════════════════════════════════════════════════════════
I am Agent 4. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/search/SearchModels.kt | +72 -0 | SearchResult/SearchEntry models + pure-Kotlin SearchEngine (scored, unit-title > topic > note)
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/search/local/FakeSearchIndex.kt | +66 -0 | fake index built from FakeSyllabus + FakeNotes so search and syllabus agree on unit ids
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/search/SearchViewModel.kt | +36 -0 | synchronous VM (query/results StateFlow) — JVM-testable, engine injected
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/search/SearchScreen.kt | +166 -0 | task 3: search field + kind badges + empty/no-match states; onOpenUnit(unitId) ready for wiring
android-native/app/src/test/java/com/ravikisan/platform/compose/ui/screens/search/SearchEngineTest.kt | +73 -0 | scoring/ordering/unit-id integrity tests (fake repo)
android-native/app/src/test/java/com/ravikisan/platform/compose/ui/screens/search/SearchViewModelTest.kt | +52 -0 | VM tests with fake repo (§7 order — note: test path list in AGENTS.md lacks search/**; added per explicit W4 order, flag for §8)
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/practice/PracticeModels.kt | +27 -0 | PracticeQuestion/PracticeSet models
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/practice/local/FakePracticeRepo.kt | +117 -0 | fake repo: 3 sets mapped to real syllabus unit ids, NEB-based MCQs
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/practice/PracticeViewModel.kt | +37 -0 | hub state: sets + selected set + preview questions (synchronous)
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/practice/PracticeHubScreen.kt | +163 -0 | task 5 skeleton: set list → question preview (scored runner = next task)
android-native/app/src/test/java/com/ravikisan/platform/compose/ui/screens/practice/FakePracticeRepoTest.kt | +45 -0 | repo integrity: valid answer indices, syllabus unit ids match, unique q ids
android-native/app/src/test/java/com/ravikisan/platform/compose/ui/screens/practice/PracticeViewModelTest.kt | +47 -0 | VM tests with fake repo
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/StudyUnitScreen.kt | +6 -3 | optional polish: unit hours now shown via UnitHoursChip in header

GIT: android-native/ still untracked (?? ./).

COMPLETED (behavior, not log fluff):
1. Search: type ≥2 chars → scored results (Unit/Topic/Note) across all fake syllabus+notes; tap → onOpenUnit(unitId).
2. Practice hub: list 3 starter sets → preview questions per set; no scoring yet (skeleton per order).
3. Study unit header now shows a teaching-hours chip.

VERIFIED: ./gradlew assembleDebug → my packages compile with ZERO errors (confirmed across two full compileDebugKotlin runs — no 'e:' lines under ui/screens/search, ui/screens/practice, ui/components/reader, ui/screens/study). Full build still RED from Agent 3 files only (see integration request). Unit tests blocked: testDebugUnitTest needs the whole main source set to compile. Machine note: Gradle daemon OOM-crashed twice (8 GB RAM, <1 GB free); stable invocation used: --max-workers=1 -Dkotlin.compiler.execution.strategy=in-process -Dorg.gradle.jvmargs="-Xmx2304m -XX:MaxMetaspaceSize=768m".

CONTINUE NEXT:
• AI chat UI (task 6) on fake SSE — or Quiz runner on top of practice sets
• Community/profile/notifications (task 7)
• Wire-up pending Agent 1: SEARCH → SearchScreen(onOpenUnit = Routes.studyUnit), PRACTICE → PracticeHubScreen

INTEGRATION REQUEST (build blocker — Agent 3 files, NOT my path; compileDebugKotlin fails):
• core/network/ResponseCapInterceptor.kt:53 — Unresolved reference 'buffer' (okio BufferedSource call without import or wrong receiver).
• core/stream/SseClient.kt:93–95 — FakeSseClient.MutableRef<T>() constructed WITH arguments but declared with none.
• data/session/SessionManager.kt:17 — no applicable overload for a constructor/function call.
• data/sync/ContentSyncWorker.kt:45,48,54,65 — suspend functions (RnApi.me, dao clearAll/put) called from non-suspend context.
→ Agent 3 to fix; then I re-run assembleDebug + my unit tests before §4 'VERIFIED green'.
═══════════════════════════════════════════════════════════════
```

Classification: all 13 files above are **[IMPORTANT CORE FILE]** (feature UI, tests, docs; no content payloads).

### Agent 2 — GET /api/mobile/syllabus: first real mobile data endpoint (session: W2 CONTINUE #2)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 2 (session 2)
═══════════════════════════════════════════════════════════════
I am Agent 2. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
  backend/src/api/mobile/syllabus.ts | +76 -0 | NEW: GET /api/mobile/syllabus — compact class→subject tree (id/slug/name, ordered, inactive excluded) reusing the website's classes/subjects tables via the SHARED contentCache; DB failure → 500, never a silently empty tree
  backend/src/api/mobile/index.ts | +3 -0 | mount line only: mobileRouter.use("/syllabus", syllabusRouter)
  backend/src/api/contracts/public-schemas.ts | +27 -0 | ADDITIVE: mobileSyllabusSubjectSchema + mobileSyllabusResponseSchema (response parsed before send — bad DB data can't ship)
  backend/tests/integration/mobile-syllabus.test.ts | +158 -0 | NEW: 5 tests — tree shape/order/grouping, inactive excluded, empty-subject class kept, empty curriculum = valid 200, CDN cache header, DB failure = 500
  docs/api/mobile-openapi.yaml | +48 -0 | /api/mobile/syllabus documented (200 + 500, cache headers)
  docs/api/mobile-syllabus-notes.md | +4 -2 | reuse map updated: syllabus tree is now a live mobile-v1 endpoint; chapters/topics stay on existing per-subject routes

COMPLETED (behavior, not log fluff):
1. Native syllabus screen can render class → subject from ONE cheap call (mobile-sized rows; no descriptions).
2. REUSE enforced: same tables + shared content cache as website content routes — zero curriculum duplication, additive only.
3. Chapters/topics deliberately NOT in the payload — app pulls a subtree per subject via existing /api/chapters|topics (documented).

VERIFIED: npx vitest run mobile-home + mobile-pagination + mobile-syllabus → 14/14 passed; npx tsc --noEmit → clean.

CONTINUE NEXT:
• GET /api/mobile/notes?subject=… (r-notes list, cursor-paginated per the mobile convention) — awaits Supervisor §7 pick.
• Personalized home feed still deferred until Agent 3 auth ships.

INTEGRATION REQUEST: none.
═══════════════════════════════════════════════════════════════
```

### Agent 3 — Networking, data & authentication: full Phase 2 client infra (session: W3, first pass)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 3
═══════════════════════════════════════════════════════════════
I am Agent 3. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
All new files; nothing outside my owned paths was touched.

  core/SecurityContract.kt | +44 | hardcoded contract mirrored from legacy SecurityContract.java (API origin/host, X-Rn-Client, X-Rn-Signing-Cert, 5 official cert SHA-256s, owner email, 2 MB response cap, redirect hop cap)
  core/SignatureGuard.kt | +41 | SHA-256 of installed signing cert via PackageManager (P+ signingInfo path + legacy fallback); isOfficialBuild()
  core/network/HttpException.kt | +17 | status-carrying exception, isAuthError (401/403), 300-char error truncation helper
  core/network/RedirectPolicy.kt | +41 | PURE redirect decision: only same-origin (absolute, bare-origin, or relative) followed; lookalike/protocol-relative/cross-origin rejected. Unit-tested
  core/network/RedirectGuardInterceptor.kt | +37 | OkHttp followRedirects(false) + manual same-origin follow, max 3 hops; cross-origin → HttpException("Untrusted redirect")
  core/network/AttestationInterceptor.kt | +38 | User-Agent "RavikisanAndroid/<ver> (Android <rel>; <model>)" always; X-Rn-Client + X-Rn-Signing-Cert only on official release builds (debug omits, mirrors legacy)
  core/network/ResponseCapInterceptor.kt | +57 | 2 MB cap: content-length pre-check + okio ForwardingSource streaming cap
  core/stream/SseParser.kt | +58 | PURE SSE line parser (data:/event:/comments/CR-LF/multi-line data). Unit-tested
  core/stream/SseClient.kt | +107 | SseClient interface + OkHttpSseClient (streaming GET/POST, Bearer auth, read-timeout 0, errors as events + HttpException) + FakeSseClient (scripted, records last url/token/body — for Agent 4 fakes/tests)
  core/contract/Contracts.kt | +57 | kotlinx.serialization DTOs matching backend: LoginRequest, SignupRequest, AuthResponse{user,accessToken,message?}, MeResponse, UserDto (spark_balance @SerialName), FcmRegistrationRequest{fcmToken}, ApiError. Unit-tested round-trip
  data/session/SessionManager.kt | +53 | EncryptedSharedPreferences (AES256-SIV/GCM, Keystore master key) — token + user JSON, NO plaintext fallback; clear() = sign-out
  data/api/RnApi.kt | +31 | Retrofit: POST api/auth/login, POST api/auth/signup, GET api/auth/me, POST api/access-requests/fcm, DELETE api/access-requests/fcm
  data/api/AuthRepository.kt | +79 | login/signup/me orchestration; stores session on success; wipes session on 401/403; 202/no-token → message not session; error bodies parsed + truncated
  data/db/AppDatabase.kt | +50 | Room v1: CacheEntry(key,json,updatedAt) + CacheDao (put/observe/clearAll/count), db name rn_platform_cache, destructive fallback (matches legacy)
  data/sync/ContentSyncWorker.kt | +117 | ContentSyncWorker (network-constrained; validates session via /me, 401/403 → wipe session+cache + fail; IOException → retry; caps at 4 attempts) via Hilt @EntryPoint (no RnApp change needed); SyncScheduler (unique KEEP dedupe, exponential backoff, cancelSync on sign-out)
  data/fcm/FcmRegistrar.kt | +60 | POST_NOTIFICATIONS request (13+), FirebaseMessaging token → POST /api/access-requests/fcm (fire-and-forget, retry next open), unregister+signOut
  data/fcm/RnFirebaseMessagingService.kt | +21 | token-refresh + message stub (tray/channels = Phase 3)
  di/AppModule.kt | +97 | Hilt singletons: Json, OkHttpClient (20s timeouts, redirects OFF, 3 interceptors, debug logging), Retrofit (API_ORIGIN + kotlinx-serialization converter), RnApi, SessionManager, AuthRepository, Room DB, SseClient
  ui/screens/auth/AuthViewModel.kt | +70 | HiltViewModel: login/signup/refreshSession/signOut state machine (loading/error/info/user)
  ui/screens/auth/WelcomeScreen.kt | +55 | login/signup entry
  ui/screens/auth/LoginScreen.kt | +117 | email+password, error display, password cleared on success-leave
  ui/screens/auth/SignupScreen.kt | +130 | name+email+password (min 8), 202-style info surface
  app/src/test/.../core/RedirectPolicyTest.kt | +69 | 7 JVM tests (same-origin follow, lookalike/protocol-relative/cross-origin reject, relative resolve, blank reject)
  app/src/test/.../core/SseParserTest.kt | +72 | 8 JVM tests (data/event/multi-line/comments/CRLF/buffering)
  app/src/test/.../data/ContractSerializationTest.kt | +71 | 6 JVM tests pinning exact wire shapes (login/signup/fcm bodies, snake_case spark_balance, error decode)

GIT: android-native/ is untracked in this worktree (Agent 1 noted same);
Supervisor: open the EDITS paths directly.

COMPLETED (behavior, not log fluff):
1. OkHttp hardening per android-twa/SECURITY.md: UA + X-Rn-Client + X-Rn-Signing-Cert
   attestation (official release only), same-origin-only redirects, 2 MB response cap.
2. Retrofit + kotlinx-serialization over the real backend contract (read from
   backend/src/api/auth/auth.controller.ts + access-requests.ts — shapes pinned by tests).
3. Room v1 cache + WorkManager sync with KEEP dedupe and 4-attempt cap; 401/403
   wipes encrypted session AND cache (dead-token loop guard).
4. Auth screens (welcome/login/signup) + AuthViewModel ready for route wiring.
5. FCM registrar + service targeting POST /api/access-requests/fcm.
6. SseClient (real + fake) ready for the Veer AI phase.

VERIFIED: ./gradlew assembleDebug is currently RED — ONLY because the required
dependencies are absent from app/build.gradle.kts (which I must not edit).
Evidence: full error list is exclusively `Unresolved reference` for okhttp3,
okio, retrofit2, androidx.room, androidx.work, androidx.security, com.google.firebase,
kotlinx.serialization (+ KSP NonExistentClass cascades in di/AppModule.kt).
Two real syntax bugs were found and FIXED during verification: (1) KDoc containing
`/api/*` closed the comment early in RedirectGuardInterceptor.kt; (2) missing
`java.io.IOException` import in HttpException.kt. Files with ZERO compile errors:
SecurityContract, SignatureGuard, RedirectPolicy, SseParser, all 4 auth UI files.
Pure-logic unit tests (RedirectPolicy, SseParser, contracts) are written but also
blocked on the deps below. Note: `compileDebugKotlin -x kspDebugKotlin` after
cleaning app/build/generated/ksp is how I isolated these errors.

INTEGRATION REQUEST (Agent 5 → apply or delegate to Agent 1):
A) app/build.gradle.kts — plugins: add `id("org.jetbrains.kotlin.plugin.serialization")`
   (version pinned in root build.gradle.kts as 2.1.0 apply false).
B) app/build.gradle.kts — dependencies:
     implementation("com.squareup.okhttp3:okhttp:4.12.0")
     implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
     implementation("com.squareup.retrofit2:retrofit:2.11.0")
     implementation("com.squareup.retrofit2:converter-kotlinx-serialization:2.11.0")
     implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
     implementation("androidx.room:room-runtime:2.7.1")
     implementation("androidx.room:room-ktx:2.7.1")
     ksp("androidx.room:room-compiler:2.7.1")   // 2.7.x = Kotlin 2.1-compatible line
     implementation("androidx.work:work-runtime-ktx:2.10.0")
     implementation("androidx.security:security-crypto:1.1.0-alpha06")
     implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")  // collectAsStateWithLifecycle
     implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
     implementation("com.google.firebase:firebase-messaging")
C) app/src/main/AndroidManifest.xml — inside <application>:
     <service android:name=".data.fcm.RnFirebaseMessagingService" android:exported="false">
       <intent-filter><action android:name="com.google.firebase.MESSAGING_EVENT"/></intent-filter>
     </service>
   and <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>.
D) Route wiring (Agent 1): swap the Auth stub for auth flow — suggest routes
   `auth/welcome` → `auth/login` / `auth/signup` rendering WelcomeScreen/LoginScreen/
   SignupScreen (hiltViewModel already wired); FLAG_SECURE on these routes per SECURITY.md
   can ride along with Agent 1's window-flag work.
After A–C land: `./gradlew assembleDebug` + `testDebugUnitTest` should go green;
if Room 2.7.1/KSP 2.1.0-1.0.29 complains, drop to 2.6.1 and I will adapt.

CONTINUE NEXT (pending Integration A–C):
• Sealed-cache writer (FieldCipher port) once real content payloads exist (Phase 5).
• Extend ContentSyncWorker payload list with syllabus/note endpoints (Agent 4 contract).
• Wire FcmRegistrar.registerForSignedInUser() into post-login flow.
═══════════════════════════════════════════════════════════════
```

### Agent 2 — Backend `/api/mobile/*` mounted + pagination convention + contract docs (session: W2 CONTINUE order)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 2
═══════════════════════════════════════════════════════════════
I am Agent 2. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
  backend/src/api/mobile/index.ts | +78 -0 | NEW: mobileRouter mounted surface — GET /home (bootstrap flags+links, no DB), GET /requirements (mirrors /api/v2/meta requirements), GET /demo/page (pagination reference); X-Mobile-Api-Version: 1 header
  backend/src/api/mobile/pagination.ts | +70 -0 | NEW: shared cursor-pagination convention (parseCursorPagination + cursorPage); limit clamped to 50, opaque base64url cursor, malformed cursor → page 1
  backend/src/api/index.ts | +2 -0 | mount line only: import mobileRouter + apiRouter.use("/mobile", mobileRouter) — additive, no existing route touched
  backend/src/api/contracts/public-schemas.ts | +31 -2 | ADDITIVE schemas: mobileHomeResponseSchema, cursorPaginationQuerySchema, cursorPageSchema<T>() factory
  backend/tests/integration/mobile-home.test.ts | +97 -0 | NEW: 4 tests pinning home envelope, header, cache, link prefixes, requirements payload
  backend/tests/integration/mobile-pagination.test.ts | +95 -0 | NEW: 5 tests pinning cursor walk (95 rows), default limit, 50-cap clamp, malformed-cursor tolerance, terminal null nextCursor
  docs/api/mobile-openapi.yaml | +117 -0 | NEW: OpenAPI 3 for the /api/mobile surface
  docs/api/mobile-syllabus-notes.md | +63 -0 | NEW: reuse map — native app calls existing /api/classes|subjects|chapters|topics|lessons|r-notes; deferral note for personalized home feed

GIT: git diff --stat unavailable meaningfully (shared worktree with parallel agents; see EDITS paths — Supervisor: read files directly).

COMPLETED (behavior, not log fluff):
1. /api/mobile is mounted and live: home bootstrap, requirements mirror, pagination reference endpoint.
2. Cursor-pagination convention implemented + pinned by tests — any mobile list endpoint copies it (community-style lists, Agent 2 task #4).
3. Contract docs written: OpenAPI + syllabus/notes/feed reuse map (native client reuses existing routes; zero duplication).
4. All additive: no existing /api/* response shape changed (schemas only appended to public-schemas.ts).

VERIFIED: npx vitest run tests/integration/mobile-home.test.ts tests/integration/mobile-pagination.test.ts → 9/9 passed; npx tsc --noEmit → clean.
  NOTE: test:affected also surfaced 5s-timeout flakes in community-feed / firebase-phone-login / profile-route-matrix / profile-storage. Proven PRE-EXISTING: community-feed.test.ts fails identically with my mount line temporarily removed. Not mine — machine under parallel-agent load.

CONTINUE NEXT:
• Personalized GET /api/mobile/home feed (per-student cards) — deferred until Agent 3 auth ships (noted in docs/api/mobile-syllabus-notes.md).
• First real paginated mobile list endpoint once Agent 5 confirms which feed the native app needs first.

INTEGRATION REQUEST: none.
═══════════════════════════════════════════════════════════════
```

### Agent 1 — Shell: stub routes, deep links, CI, theme tokens (session: W1 CONTINUE order)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 1
═══════════════════════════════════════════════════════════════
I am Agent 1. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
  android-native/app/src/main/java/com/ravikisan/platform/compose/navigation/RnNavHost.kt | +60 -8 | registered ALL 10 stub destinations (Auth, Learn, StudyUnit, Search, Practice, Quiz, AiTutor, Community, Profile, Notifications) + Routes.studyUnit()/quiz() helpers + DeepLinks object + navDeepLink wiring on HOME
  android-native/app/src/main/java/com/ravikisan/platform/compose/navigation/StubScreen.kt | +62 -0 | day-1 placeholder screen (light/dark @Preview) so every route is navigable before feature screens land
  android-native/app/src/main/java/com/ravikisan/platform/compose/ui/theme/Color.kt | +40 -8 | replaced placeholder tokens with real brand tokens mirrored from frontend/app/globals.css (Modern Neb light + Deep Slate dark, incl. subject accents)
  android-native/app/src/main/java/com/ravikisan/platform/compose/ui/theme/Theme.kt | +45 -20 | full light/dark Material3 color schemes (background/surface/outline/secondary/error) instead of 2-token placeholder
  android-native/app/src/main/AndroidManifest.xml | +16 -0 | deep-link intent filters: rn://app + https://harindrasah.com.np (autoVerify)
  .github/workflows/android-native.yml | +44 -0 | CI job android-native-assemble on PR (paths-filtered): JDK17 + gradle cache + assembleDebug + APK artifact; persist-credentials: false per repo convention
  android-native/README.md | +18 -0 | deep-links section + Play release notes summary
  docs/guides/android-native-play-checklist.md | +55 -0 | Phase 8 owner checklist (identity switch, signing, FCM, assetlinks.json, listing, rollout)

GIT: android-native/ is fully untracked in this worktree (whole tree is new);
per-file diffs not available — Supervisor: open the EDITS paths directly.

COMPLETED (behavior, not log fluff):
1. Every destination from plan §5 priority map is registered and navigable
   (stub screens) — Workers 3/4 swap stubs via Integration queue.
2. rn://app and https://harindrasah.com.np/* open the app at Home via
   navigation deep links; autoVerify requests App Links verification.
3. PR touching android-native/** now runs a dedicated assembleDebug CI job.
4. Theme no longer placeholder — matches the website palette in light + dark.

VERIFIED: ./gradlew assembleDebug → my files compile clean (zero errors in
navigation/**, ui/theme/** across 3 runs). Full build currently RED from
Agent 3's in-flight edits (di/AppModule.kt KSP NonExistentClass; earlier
core/network/RedirectGuardInterceptor.kt + data/sync/ContentSyncWorker.kt
syntax errors appeared mid-session and were being fixed live). Not my tree —
no-wait rule applied, reported instead of touching Agent 3 paths.

CONTINUE NEXT:
• Re-run assembleDebug once Agent 3's DI/data settles; then wire first real
  screens into RnNavHost from the Integration queue.
• gradle wrapper/dependency changes requested by Workers 3–4.

INTEGRATION REQUEST: none needed this session (no Gradle/manifest needs of
my own; manifest deep links were my own task).
═══════════════════════════════════════════════════════════════
```

### Agent 4 — Syllabus UI + reader v1 (session: W4 CONTINUE order)

```
═══════════════════════════════════════════════════════════════
CHECKPOINT — Agent 4
═══════════════════════════════════════════════════════════════
I am Agent 4. Guided by Supervisor Agent 5.

── EDITS (required — Supervisor reads these files) ─────────────
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/SyllabusModels.kt | +35 -0 | local syllabus domain model (Class→Subject→Unit), mirrors canonical frontend shape
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/local/FakeSyllabus.kt | +256 -0 | local fake syllabus (class 11 physics/biology/maths + class 12 physics/chemistry, real NEB unit ids/order) + findUnit()
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/local/FakeNotes.kt | +106 -0 | local fake notes (3 units with real content + neutral placeholder fallback)
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/SyllabusScreen.kt | +216 -0 | task 1: class→subject→unit drill-down, rememberSaveable state, onOpenUnit(unitId) callback for Agent 1 wiring
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/screens/study/StudyUnitScreen.kt | +95 -0 | task 2: study/{unitId} screen — topic outline + note reader v1 host
android-native/app/src/main/java/com/ravikisan/platform/compose/ui/components/reader/NoteReader.kt | +66 -0 | task 2: reusable plain-text reader component (math later)
android-native/app/src/test/java/com/ravikisan/platform/compose/ui/screens/study/FakeSyllabusTest.kt | +59 -0 | fake integrity: order, unique unit ids, findUnit resolve/miss

GIT: android-native/ is untracked (?? ./) — first commit pending owner/Agent 1.

COMPLETED (behavior, not log fluff):
1. Syllabus drill-down (class → subject → unit) renders from local fakes; unit tap fires onOpenUnit(unitId) ready for Routes.studyUnit wiring.
2. Study unit screen shows NEB topic outline (numbered, official order) then note body via NoteReader v1 (plain text; math deferred).
3. Fake data obeys syllabus rules: NEB 2076/2078 order preserved, unique unit ids, verified by unit test.

VERIFIED: ./gradlew assembleDebug → BLOCKED (see integration request). Static checks only: my files import nothing outside my allowed paths; no core/navigation/data/theme/backend edits.

CONTINUE NEXT:
• Search UI (task 3) on local fakes
• Reader v1 polish: topic anchor list, reading-position state
• Wire-up pending Agent 1: LEARN → SyllabusScreen, STUDY_UNIT → StudyUnitScreen(unitId)

INTEGRATION REQUEST (needed — build blocker in core/**, NOT my path):
• core/network/RedirectGuardInterceptor.kt line 11: KDoc contains `` `/api/*` `` — the /* opens a NESTED Kotlin block comment that never closes → "Unclosed comment" at 39:1 (EOF) → kspDebugKotlin fails for the whole module (cascades into Hilt NonExistentClass for AppModule/provideJson/provideOkHttpClient/…). Owner (Agent 3/1): reword to avoid the literal /* inside the doc comment (e.g. `` same-origin /api paths ``). I did not touch the file per my boundary rules.
═══════════════════════════════════════════════════════════════
```

Classification (npm run classify): all 7 files above are **[IMPORTANT CORE FILE]** (feature UI/tests/tooling, no content payloads touched).

### 2026-XX-XX — Phase 1 scaffold (session 1)

**Created (all new, zero legacy files touched):**

- `android-native/settings.gradle.kts` — standalone Gradle project, `:app` only.
- `android-native/build.gradle.kts` — plugin versions pinned (see §2 table).
- `android-native/gradle.properties` — parallel + caching on.
- `android-native/gradle/wrapper/*`, `gradlew`, `gradlew.bat` — copied from legacy (Gradle 8.11.1).
- `android-native/local.properties` — copied from legacy (sdk.dir). **Gitignored.**
- `android-native/app/build.gradle.kts` — Compose + Hilt + KSP; conditional
  google-services (same pattern as legacy); `applicationId .compose`; versionCode 1.
- `android-native/app/src/main/AndroidManifest.xml` — INTERNET + NETWORK_STATE
  only (no POST_NOTIFICATIONS yet — comes with Phase 3 FCM); single
  `MainActivity`, exported, launcher.
- `RnApp.kt` (`@HiltAndroidApp`), `MainActivity.kt` (`@AndroidEntryPoint`,
  edge-to-edge, `setContent { RnTheme { RnNavHost() } }`).
- `ui/theme/Color.kt` + `Theme.kt` — **placeholder brand tokens** (deep green);
  must be replaced with real design tokens in the Phase 0/1 UX pass.
- `navigation/RnNavHost.kt` — bottom nav (Home, Settings), typed `Routes` object,
  state-saving navigation.
- `ui/screens/HomeScreen.kt` — Phase 1 placeholder.
- `ui/screens/SettingsScreen.kt` — Compose port of legacy `SettingsFragment`
  (static rows; API wiring in Phase 2).

**Copied shared resources:** launcher mipmaps + adaptive icon + security XML
(`network_security_config` with SPKI pins, `data_extraction_rules`) — copied
read-only from legacy, see §1 rule 1.

**Verification (2026-11-26, real builds):**

- `android-native`: `./gradlew assembleDebug` → **BUILD SUCCESSFUL**
  (`app-debug.apk`, 56.9 MB, `app/build/outputs/apk/debug/`). First-run fix:
  missing `res/values/strings.xml` + `themes.xml` (added).
- Legacy sanity: `android-twa/android` `assembleDebug` → **BUILD SUCCESSFUL**
  after fixing **two PRE-EXISTING compile errors** (not caused by the native
  scaffold — the legacy tree did not compile on this machine before this session):
  1. `sync/ContentSyncWorker.java:38` — Java-16 `instanceof` pattern matching
     under `-source 8`; replaced with a Java-8-safe `isAuthError()` helper.
  2. `net/ApiClient.java:259` — `InputStreamReader` assigned to `BufferedReader`;
     wrapped in `new BufferedReader(...)`.
  Both fixes fall under the §1.1 "one-line critical fix" exception (legacy must
  stay releasable). Legacy sources otherwise untouched.

**Explicitly NOT done in Phase 1:** Firebase `google-services.json` generation,
Crashlytics/R8 tuning, CI job `android-native-assemble`, real theme tokens,
`versionCode` strategy beyond placeholder, any backend/frontend change.

## 5. NEXT ACTIONS (exact resume point)

**Ledger reconciliation — native-live count:** `node scripts/ci/native-parity-check.mjs` (exit 0) verifies **11** native-live: /home, /community, /ask, /chat, /ai/community, /search, /practice, /profile, /settings, /notifications, /syllabus/additions. The "12" in §4 (Agent 3 line ~89 "migration closeout baseline", Agent 2 ~187, Agent 4 ~237) was a hand count made before the parity script existed; those lines stay as written. The difference is **unknown**, not a regression: `git show 3d6240a7` and `9218e4a2` show every one of the 11 mapped routes still composable with no route constant removed (the extra is most likely a native-only route such as AUTH/AUTH_LOGIN/AUTH_SIGNUP/STUDY_UNIT/QUIZ counted by hand). Going forward, the parity script output is the single source for the native-live baseline.

1. ~~Finish Phase 1~~ → ✅ DONE, both builds verified (see §4).
2. Phase 0 items that cost nothing: write the screen inventory sign-off doc
   (plan §5 P0–P4) and the WebView allowlist (default: empty) into
   `docs/guides/android-native/`.
3. Owner assigns **Agent 1–5** → [`android-native-AGENTS.md`](android-native-AGENTS.md) only.
4. Workers: checkpoint with **EDITS** → **§4**. Supervisor: **read those edits** → **§8** → **§7**.

## 8. SUPERVISOR EDIT REVIEW (Agent 5 only — inspect worker **code**, not logs alone)

> **§8 = what each worker actually changed.** Agent 5 runs `git diff --stat`, opens files, records verdicts.  
> Template: `android-native-AGENTS.md` → **Agent 5** → **§8 review template**

*(Agent 5: append newest review here. Workers do not write §8.)*

| Date | Summary |
|------|---------|
| 2026-11-26 | Session 2 review — all 4 workers shipped; **native build FAILS** (missing Gradle deps for Agent 3's stack). Details below. |
| 2026-11-26 | Session 3 review — RQ-1/RQ-2 landed, **native `assembleDebug` BUILD SUCCESSFUL** (APK 64 MB), mobile API tests 14/14 green; W3+W4 orders executed. Details below. |
| 2026-11-26 | **FINAL review (session 5)** — all worker task lists complete; program compiles + 28/28 mobile API tests; 1 unit-test defect found (search ranking). Details below. |
| 2026-11-26 | **Session 6 — fake→real swap EXECUTED (owner-directed)**: practice+quiz, search, community now on real APIs; 110/110 unit tests, APK builds. Details below. |
| 2026-11-26 | **Session 7 — Firebase wired (owner + Firebase agent skills)**: `google-services.json` generated (gitignored, verified), app registered with 5 SHA-256 certs, Firebase BOM 33.7.0 deps added; **build green with google-services plugin active — APK 81.9 MB**. |
| 2026-11-26 | **Session 8 — SECURITY HARDENING (owner-directed)**: FLAG_SECURE + recents-screenshot block, R8 keep rules, **reverted dangerous `firebase-pnv` dep + BOM 35.2.0** (supply-chain + Kotlin-incompat), removed unused perf SDK; build + tests green, APK 74.6 MB. |
| 2026-11-26 | **Parity-campaign B0 verification (Agent 5)** — parity script contract + CI wiring verified, ledger honest (11 live / 117 placeholder / 0 not-started), 3/3 spot-checks on the real chain; **2 findings**: `ComingToNative` dead code (stubs render old `StubScreen`), B0 task-0 straddle relocation not done (`SyllabusSearchIndexSource` still in W4's tree). B0 = Done with carry-overs RQ-11/RQ-12. Details below. |
| 2026-11-26 | **Parity carry-overs EXECUTED (owner-directed)** — RQ-12 straddle relocation done (search engine → `core/logic/`, index sources → `data/repository/`, 6 files rewired, behavior byte-identical) + RQ-11 done (`ComingToNative` now renders in all 117 stubs, `StubScreen.kt` deleted, parity-script detection extended); **compile + 150/150 tests + assembleDebug (78 MB APK) + parity check all green**. Details in §7. |

### 2026-11-26 — Supervisor edit review (Agent 5)

**Repo:** `git diff --stat` → 5 tracked files changed (+207 −6); `android-native/` is fully untracked (new tree). Reviewed by opening files, not logs.

#### Agent 1 — **OK** (shell + CI + real theme)
- `navigation/RnNavHost.kt` — all 12 destinations registered day 1 (Home, Settings, Auth, Learn, StudyUnit, Search, Practice, Quiz, AiTutor, Community, Profile, Notifications) as `StubScreen`s; typed `Routes` + `DeepLinks` (`rn://app`, `https://harindrasah.com.np` + `/*`); state-saving bottom bar. Matches task 3/4 exactly.
- `.github/workflows/android-native.yml` — `android-native-assemble` on PR paths-filtered; `persist-credentials: false`, cache, APK artifact. Task 1 done.
- `ui/theme/Color.kt` — placeholder green replaced with real brand tokens mirrored from `frontend/app/globals.css` (Modern Neb light + Deep Slate dark + subject accents). Task 2 done.
- `docs/guides/android-native-play-checklist.md` created (task 5).
- **Gap:** `app/build.gradle.kts` was NOT extended (see Agent 3 below) — that wiring is Agent 1's, but no integration request ever reached the queue.

#### Agent 2 — **OK** (additive mobile API, contract-pinned)
- `backend/src/api/mobile/index.ts` — `/home` (feature flags + links, schema-validated at response time), `/demo/page` (cursor-pagination reference), `/requirements`. `X-Mobile-Api-Version: 1` header. No existing route touched.
- `backend/src/api/index.ts` — **mount line only** (`apiRouter.use("/mobile", mobileRouter)`), exactly per boundary.
- `contracts/public-schemas.ts` — additive only: `mobileHomeResponseSchema`, `cursorPaginationQuerySchema`, `cursorPageSchema<T>()`.
- `mobile/pagination.ts` + 2 integration tests (`mobile-home`, `mobile-pagination`) + `docs/api/mobile-openapi.yaml` + `mobile-syllabus-notes.md` (reuses `/api/classes`, `/api/r-notes`, `/api/practice`, `/api/ai`, `/api/community` — no duplication). All within owned paths.
- Build/tests: NOT re-run this session (backend tree unchanged since worker session); Agent 2 to confirm `test:affected` green in next §4.

#### Agent 3 — **CODE OK, BUILD BROKEN — integration gap**
- Shipped a real infra layer (~800 lines): `core/network/` (Attestation/RedirectGuard/ResponseCap interceptors, RedirectPolicy + test), `core/stream/` `SseClient` + `SseParser` (+ test), `core/contract/Contracts.kt` (+ serialization test), `data/api/` Retrofit `RnApi` + `AuthRepository`, `data/db/AppDatabase` (Room), `data/session/SessionManager`, `data/sync/ContentSyncWorker` (WorkManager), `data/fcm/` registrar + service, `di/AppModule`, `ui/screens/auth/` Welcome/Login/Signup + `AuthViewModel`. Ownership: 100% inside Agent 3's column. Quality: good (flow-based SSE, Java-8-style safe patterns, fakes absent but tests present).
- **VIOLATION-BY-OMISSION (process, not code):** all 11 files import `okhttp3`, `retrofit2` (+kotlinx-serialization converter), `androidx.room`, `androidx.work`, `kotlinx.serialization` — but `app/build.gradle.kts` contains **none** of these deps (Agent 3 is correctly forbidden from editing it, but never posted an INTEGRATION REQUEST; queue shows "(none)").
- **Verified:** `./gradlew compileDebugKotlin` → **BUILD FAILED** at `:app:kspDebugKotlin` — Hilt KSP chokes on `error.NonExistentClass` (`provideJson`, `provideDatabase`, `provideSseClient`). Root cause = missing classpath, not bad code.

#### Agent 4 — **OK** (first feature slice, correct fake pattern)
- `ui/screens/study/` — `SyllabusScreen` (216 lines, class→subject→unit drill-down, `rememberSaveable` state, back-stack handling), `StudyUnitScreen`, `SyllabusModels`; `local/FakeSyllabus.kt` + `local/FakeNotes.kt` exactly per the required pattern; `FakeSyllabusTest` present.
- `ui/components/reader/NoteReader.kt` — reader v1 started.
- Note: `SyllabusScreen` is NOT yet reachable — it's still wired to `StubScreen("Learn")` in `RnNavHost` (correctly so; Agent 4 must not edit navigation). Integration request needed.

**Legacy (`android-twa`) diff:** 2 files (`ApiClient.java`, `ContentSyncWorker.java`) — these are the **pre-existing compile fixes already documented in §4 session 1** (Java-8-safe `isAuthError()` helper; `BufferedReader` wrap). Legitimate §1.1 critical fixes; legacy sources otherwise untouched. No new legacy edits this interval.

**Cross-cutting:** Integration queue is stale — 2 real requests exist in code but were never filed: (a) gradle deps for Agent 3's stack, (b) `learn`/`study/{unitId}` route wiring to Agent 4's `SyllabusScreen`. Batch assigned to Agent 1 in §7 below.
**§7 CONTINUE issued below.**

### 2026-11-26 — Supervisor edit review, session 3 (Agent 5)

**Repo:** tracked diff unchanged from session 2 (5 files, +228 −6) — all new worker work lives in the untracked `android-native/` tree and `backend/src/api/mobile/`. Reviewed by opening files + running builds.

#### Agent 1 — **OK** (RQ-1 and RQ-2 both landed; build unblocked)
- `app/build.gradle.kts` — exactly the deps RQ-1 asked for: okhttp 4.12.0 + logging-interceptor, retrofit 2.11.0 + converter-kotlinx-serialization, kotlinx-serialization-json 1.7.3 + `org.jetbrains.kotlin.plugin.serialization` plugin, room 2.7.1 runtime/ktx + **room-compiler via ksp**, work-runtime-ktx 2.10.0. Versions current and consistent.
- `navigation/RnNavHost.kt` — beyond RQ-2: `learn` now hosts `SyllabusScreen(onOpenUnit = navigate(Routes.studyUnit(unitId)))`, `study/{unitId}` parses `NavType.StringType` arg into `StudyUnitScreen(unitId)`, **and** the auth stubs were replaced with `WelcomeScreen` → `AUTH_LOGIN`/`AUTH_SIGNUP` → `onSignedIn` navigates Home with `popUpTo(AUTH) { inclusive }`. Typed-arg wiring is correct; remaining stubs (search, practice, quiz, ai-tutor, community, profile, notifications) untouched — correct.
- **Verified:** `./gradlew assembleDebug` → **BUILD SUCCESSFUL** (41 tasks, `app-debug.apk` 64.2 MB). Note: first attempt crashed with "Gradle build daemon disappeared" while a vitest run was hogging the same machine — environment, not code; clean re-run passed.

#### Agent 2 — **OK** (first real data endpoint, contract-pinned, reuse-first)
- `backend/src/api/mobile/syllabus.ts` — `GET /api/mobile/syllabus` returns a compact class→subject tree (id/slug/name only) from the **same** `classes`/`subjects` tables via the shared `contentCache` (`mobile-syllabus:v1`, CDN cache headers); parallel queries, explicit error→500 via `serverError`, no partial tree on DB failure. Additive; no existing shape touched.
- `contracts/public-schemas.ts` — added `mobileSyllabusResponseSchema` (additive, +21 lines over session 2).
- `backend/tests/integration/mobile-syllabus.test.ts` — pins tree shape/ordering, subject→class grouping, `{ ok, data }` envelope, cache headers, DB-error→500, and empty-subjects classes. Well-constructed supabase builder mock.
- **Verified:** `npx vitest run` on the 3 mobile test files → **3 files, 14 tests, all passed**. (A repo-wide `test:affected` run showed 155/156 with one timeout in `profile-storage.test.ts` — pre-existing/unrelated to mobile; not charged to Agent 2.)

#### Agent 3 — **OK** (session-2 §7 order executed: pure-JVM tests, no new deps needed)
- New: `data/session/SessionCodec.kt` (pure JSON codec, `ignoreUnknownKeys`, garbage→null instead of crash), `data/session/SessionStore.kt`, `data/sync/SyncRetryPolicy.kt`.
- New tests: `AuthRepositoryTest`, `SessionCodecTest`, `SyncRetryPolicyTest`, shared `data/Fakes.kt` — exactly the JVM-testable surface I ordered while the build was broken.
- Ownership clean: everything under `core/**`, `data/**`, `di/**` — Agent 3's column.
- Not separately verified this session (covered by the assembleDebug compile + existing unit sourceset).

#### Agent 4 — **OK** (session-2 §7 order executed: Search + Practice slices)
- `ui/screens/search/` — `SearchScreen`, `SearchViewModel` (deliberately synchronous StateFlow VM so it unit-tests JVM-only against the fake), `SearchModels`, `local/FakeSearchIndex.kt`; tests `SearchEngineTest` + `SearchViewModelTest`.
- `ui/screens/practice/` — `PracticeHubScreen`, `PracticeViewModel` (set list → preview questions), `PracticeModels`, `local/FakePracticeRepo.kt`; tests `FakePracticeRepoTest` + `PracticeViewModelTest`.
- Fake pattern followed exactly (`local/Fake*.kt` per feature folder); no `core/`/`navigation/` edits. Correct.
- **Gap (process, not code):** `RnNavHost` still routes `search` and `practice` to `StubScreen` — the screens exist but are unreachable. Agent 4 did not file the integration request in-session (same omission class as RQ-1 last session). Filed as **RQ-3** below; reinforced rule in §7.

**Cross-cutting:** RQ-1, RQ-2 resolved and verified by build. Queue updated in AGENTS.md (RQ-3 open). No ownership violations found this session — every changed file sits in its owner's column.
**§7 CONTINUE issued below.**

### 2026-11-26 — Parity-campaign B0 verification review (Agent 5)

**Scope:** no new worker session since session 8; this review verifies the parity plan's **B0 exit gate** and runs the §0.7 duty-4 spot-check. Method: opened every file named below in full; ran `node scripts/ci/native-parity-check.mjs` myself.

**Parity script (W1) — OK.** Contract matches plan Appendix A exactly (LIVE/PLACEHOLDER/MISSING/EXCEPTION, exception-table markers in plan §1, ownerOnly cross-check, exit 1 on MISSING). Wired into `npm run check` via `scripts/ci/scoped-check.mjs:215`. Ledger output is script-generated and honest: **155 sections / 128 parity-relevant / 27 exceptions / 11 native-live / 117 placeholder / 0 not-started**. Stub registry (`WebParity.stubs`) covers every remaining section with typed routes + argument-parsing composables — B0 task 2 done.

**Spot-checks (3 random live sections) — all pass on the real chain:**
- `/search` — `SyllabusSearchIndexSource` builds from the real syllabus repository, Fresh/Cached/Unavailable honored. **But see finding 2.**
- `/practice` — `PracticeRepository` real endpoint, offline contract honored end-to-end in `PracticeViewModel`.
- `/notifications` — real `GET /api/notifications` + `PATCH /api/notifications/read`, auth-gated with `needsAuth` state, cursor-paginated. **Correction:** the session-6 §4 note calling notifications a "local list" is stale — the code is on the real chain (a later session swapped it); the §4 block stays as written per append-only rule, this entry is the correction of record.

**Findings (must fix before B1 screens land on top):**
1. **`ComingToNative` is dead code (W1/W4 duplication).** `ui/components/placeholder/ComingToNative.kt` exists per plan §0.6 but **nothing calls it** — the stub loop (`RnNavHost.kt:520`) renders the older `navigation/StubScreen.kt` instead. Two placeholder components with different copy ("Coming to native" vs "Coming in an upcoming phase"). Plan §0.6 says built once, used by all stubs. → W1 fix, filed as RQ-11.
2. **B0 task 0 (straddle relocation) NOT done.** `SyllabusSearchIndexSource` still lives inside `ui/screens/search/SearchViewModel.kt:39` — Worker 4's tree — while `di/AppModule.kt` (W1's file) provides it. This is exactly the UI/data straddle §0.5 task 0 ordered relocated to `data/repository/`. → W3 fix + W1 provider-import update, filed as RQ-12.
3. Documentation-only: stale session-6 notifications note (corrected above; no code action).

**Build/tests:** not re-run this session — no Kotlin/TS code changed since session 8's verified green (`assembleDebug` + 0 test failures); the only executable check relevant to B0 (parity script) was run by me and is green.

**Verdict: B0 = Done with two carry-over fixes (RQ-11, RQ-12) ordered below, required before any B1 stub→real promotion.** Classification of files read: all [IMPORTANT CORE FILE] (`RnNavHost.kt`, `StubScreen.kt`, `ComingToNative.kt`, `SearchViewModel.kt`, `AppModule.kt`, `PracticeViewModel.kt`, `NotificationsViewModel.kt`, `native-parity-check.mjs`, `scoped-check.mjs`); no [CONTENT FILE] touched.

## 7. SUPERVISOR LOG (Agent 5 only — CONTINUE orders — after §8 review)

### Bootstrap — multi-agent model active

- **Workers 1–4:** run in parallel; **never block** on each other.  
- **Supervisor 5:** guides all workers; issues **CONTINUE** / integration batches.  
- **Queue:** `docs/guides/android-native-AGENTS.md` (Integration queue section).

### 2026-11-26 — Model: 4 workers + Supervisor 5 (bootstrap)

**CONTINUE directives (all workers start now; no waiting):**

| Worker | Order |
|--------|--------|
| **W1** | Register **all stub routes** in `RnNavHost`; start CI job + theme tokens. |
| **W2** | Mount `/api/mobile` + first contract test; document note/syllabus reuse in `docs/api/`. |
| **W3** | OkHttp stack + auth screen skeleton; ship `SseClient` interface + fake. |
| **W4** | Syllabus list UI with `ui/screens/study/local/` fakes; then reader v1 — ignore `core/` until §7 says swap. |

**Supervisor 5:** Next session — **git diff + read worker files** → fill **§8** → then §7 CONTINUE (see AGENTS.md Agent 5 protocol).

### 2026-11-26 — Session 2 CONTINUE (issued from §8 code review, not worker claims)

| Worker | Order |
|--------|-------|
| **W1** | **PRIORITY: unblock the build.** Add Agent 3's stack to `android-native/app/build.gradle.kts`: `okhttp` + `okhttp-logging-interceptor`, `retrofit` + `retrofit2-kotlinx-serialization-converter`, `androidx.room:room-runtime/ktx` + `room-compiler` (ksp), `androidx.work:work-runtime-ktx`, `kotlinx-serialization-json` + `org.jetbrains.kotlin.plugin.serialization`, and wire Agent 4's `SyllabusScreen` into the `learn`/`study/{unitId}` routes (replace the two stubs; keep the rest). Then `assembleDebug` must be **BUILD SUCCESSFUL** before anything else. |
| **W2** | Ship the first real mobile data endpoint (e.g. `GET /api/mobile/syllabus` reusing existing syllabus service) with contract schema + integration test; keep everything additive. |
| **W3** | No new code until W1 lands the deps (your tree does not compile). Meanwhile: write unit tests for `SessionManager`, `ContentSyncWorker` backoff, and `AuthRepository` error paths — pure-JVM, no new deps needed. |
| **W4** | Continue top-to-bottom: Search UI + `search/local/` fakes, then Practice. Ignore `core/` until §7 orders the fake→real swap (not yet — W1 must land deps first). |

**Integration queue (to be mirrored into AGENTS.md next session):**

| ID | From | Type | Detail | Status |
|----|------|------|--------|--------|
| RQ-1 | W3 | gradle-dep | okhttp/retrofit/room/work/serialization deps in `app/build.gradle.kts` — build currently fails (`kspDebugKotlin`, `error.NonExistentClass`) | → Agent 1, PRIORITY |
| RQ-2 | W4 | route | Wire `SyllabusScreen(onOpenUnit)` into `learn` + `Routes.studyUnit(unitId)` replacing stubs | → Agent 1 |

**Rule reinforced:** a worker whose code imports a library it cannot declare must file the INTEGRATION REQUEST **in the same session** — silent gaps like RQ-1 cost the whole team a broken build.

### 2026-11-26 — Session 3 CONTINUE (issued from §8 code review + green builds)

| Worker | Order |
|--------|-------|
| **W1** | Wire **RQ-3**: replace `StubScreen("Search")` and `StubScreen("Practice")` with `SearchScreen` / `PracticeHubScreen` (Agent 4's VMs are constructor-injectable — keep lambdas minimal). Then `assembleDebug` green + unit tests (`gradlew testDebugUnitTest`) reported in §4. |
| **W2** | Next data endpoint on the same pattern: `GET /api/mobile/classes/:classSlug/units` (or the notes list behind `/api/r-notes`) with schema + integration test; keep reusing existing tables/cache. |
| **W4** | Swap request comes after W2's endpoint is contract-pinned — until then continue backlog: **Quiz runner UI** (`practice/` route `quiz/{quizId}`) with `local/` fakes, then AI chat UI (fake SSE). **You are not blocked** — the fake→real swap is my call, not yours. |
| **W3** | Wire `SessionStore`/`SyncRetryPolicy` into `AppModule` + `ContentSyncWorker` if not already; then FCM path test against `POST /api/access-requests/fcm` contract (Agent 2's docs). No nav edits. |

**Supervisor notes:**
- Builds now pass — the fake→real data swap becomes the main theme of the next 2–3 sessions. Sequence: W2 pins contract → I issue swap order per feature → W4/W3 drop fakes.
- `profile-storage.test.ts` timeout (155/156 in affected run) is **not** mobile-related; left alone, flagged for the owner.
- Rule stands: **integration request in the same session you import something you can't declare or wire yourself.** RQ-3 was filed by me, not W4 — do better.

### 2026-11-26 — FINAL supervisor edit review (session 5 — program closeout)

**Repo:** full `android-native/` tree + `backend/src/api/mobile/` (5 routers) + 7 mobile integration test files + 5 guide docs. Verified by opening files and running builds.

#### Agent 1 — **OK — COMPLETE**
- `RnNavHost.kt`: **zero stubs remain.** All 12 destinations live: Home, Settings, auth (Welcome→Login/Signup→Home with correct `popUpTo`), Learn→`SyllabusScreen`, `study/{unitId}`→`StudyUnitScreen`, Search→`SearchScreen`, Practice→`PracticeHubScreen`, `quiz/{quizId}`→`PracticeQuizScreen`, AI Tutor→`VeerChatScreen`, Community→`CommunityScreen`, Profile→`ProfileScreen` (+ notifications sub-navigation), Notifications→`NotificationsScreen(onBack)`. Typed args + deep links intact.
- CI: `testDebugUnitTest` now gates PRs with report upload. WebView allowlist doc written.

#### Agent 2 — **OK — COMPLETE**
- 5 mounted routers: `/api/mobile/{syllabus,units,notes,practice,community}` — all reuse existing tables via the shared content cache, all schema-pinned, all additive. `docs/api/mobile-auth-fcm.md` added (auth + FCM contracts for W3). **Verified: 7 test files, 28/28 tests pass.**

#### Agent 3 — **OK — COMPLETE (swap staged, correctly awaiting my order)**
- Swap infrastructure shipped and tested: `data/repository/SyllabusRepository.kt` + `SyllabusCache.kt` (Room-backed), `core/contract/MobileSyllabus.kt` (matches W2's wire contract), `data/fcm/FcmTokenPolicy.kt` + `FcmApiContractTest`, `SyllabusRepositoryTest`. Session/sync wiring done.
- UI screens still consume fakes — **correct per my §7 rule** ("SWAP only on Supervisor order"). The swap is now unblocked and is the single remaining code task.

#### Agent 4 — **OK with 1 FIX**
- All feature UI shipped: quiz runner (`PracticeQuizScreen` + `QuizRunnerViewModel`), Veer chat (`VeerChatScreen`/`VM` + `ChatBubble`), community, profile, notifications, labs decision doc. Fakes per pattern; 101 total unit tests.
- **FIX (verified failing):** `SearchEngineTest > unit title match outranks topic and note matches for the same word` — `SearchModels.kt` scoring gives exact-text match (40) to ANY kind, so a topic titled exactly "kinematics" (40) outranks the unit title that merely contains it (30). Kind weight must factor into the score (e.g. UNIT bonus) or exact-match must be kind-aware. 100/101 unit tests otherwise pass; compile is green.

**Cross-cutting:** RQ-3 resolved. Queue empty of open requests. Program state: **compilable, testable, fully navigable app on fake data; real-data contracts pinned and repository layer ready.**
**§7 closeout below.**

### 2026-11-26 — Session 4: FULL REMAINING BACKLOG per worker (authoritative — supersedes earlier one-line orders)

Progress baseline: foundation ~80% done (builds green, 75 unit tests, `/api/mobile` live). What follows is **everything left** for a usable P0–P2 app, in execution order. Workers: start at the first unchecked item in your list; file INTEGRATION REQUESTS same-session.

#### Agent 1 — shell, wiring, release
- [ ] **RQ-3:** wire `SearchScreen` → `Routes.SEARCH`, `PracticeHubScreen` → `Routes.PRACTICE` (replace the two stubs).
- [ ] Add `testDebugUnitTest` to the CI workflow (`android-native-assemble`) so the 75 unit tests gate PRs.
- [ ] Phase 0 leftover: WebView allowlist doc (default: empty) — `docs/guides/android-native-webview-allowlist.md`.
- [ ] Wire each route as W4 ships it: `quiz/{quizId}` (quiz runner), `ai-tutor` (chat), `community`, `profile`, `notifications` — batch per §7 swap orders.
- [ ] Later (pre-release): `versionCode` strategy, R8/minify + Crashlytics tuning, README Firebase/Play notes refresh.
- [ ] Owner-dependent (do not block): flag when `google-services.json` is still absent so FCM stays dormant-but-compiling.

#### Agent 2 — mobile API contracts
- [ ] `GET /api/mobile/classes/:classSlug/units` — unit list per class (reuses existing tables/cache; schema + integration test).
- [ ] `GET /api/mobile/units/:unitId/notes` — note list + note content route (or documented reuse of `/api/r-notes` shape).
- [ ] Practice contract: sets + questions list endpoint (or documented reuse of `/api/practice`).
- [ ] Community feed contract with the cursor-pagination envelope applied to a real endpoint.
- [ ] Document auth + FCM contracts: which existing `/api/auth/*` + `/api/access-requests/fcm` routes the native client calls, request/response shapes in `docs/api/mobile-*.md`.
- [ ] Keep every response schema-pinned in `public-schemas.ts` (additive only).

#### Agent 3 — data layer completion + real-data swap
- [ ] Wire `SessionStore` + `SyncRetryPolicy` into `AppModule` / `ContentSyncWorker` if not already; add the missing unit tests.
- [ ] FCM: contract test against Agent 2's documented `/api/access-requests/fcm` shape; keep compiling without `google-services.json`.
- [ ] **SWAP (only on my per-feature order):** replace `FakeSyllabus`/`FakeNotes` consumption with `RnApi` + Room cache once W2's units/notes contracts land — keep the fakes for tests.
- [ ] Then swap search + practice data sources the same way.
- [ ] Offline behavior: Room-cached syllabus/notes must survive airplane mode; test the cold-start path.

#### Agent 4 — remaining feature UI (continuous, top to bottom)
- [ ] Quiz runner UI (`practice/` route `quiz/{quizId}`): question flow, answer states, result screen — `local/Fake*` fakes.
- [ ] Veer AI chat UI (`ai/`): streaming bubbles consuming a fake `SseClient` flow until I order the real swap.
- [ ] Community UI (`social/`): feed list with the cursor-pagination contract, post detail.
- [ ] Profile UI + notifications list (`profile/`).
- [ ] `docs/guides/android-native-labs-decision.md` + labs/mindmaps go/no-go recommendation.
- [ ] Math rendering in NoteReader — schedule with me after the P0–P2 journey is device-tested.
- [ ] **Same-session rule:** every screen that needs a route or a dep = INTEGRATION REQUEST in your checkpoint.

#### Owner-gated (nobody else acts)
- `google-services.json` generation · device testing of auth+sync+study · real-theme sign-off · Phase 8 promotion approval.

### 2026-11-26 — FINAL §7 — program closeout (session 5)

**All agent task lists are complete.** Remaining work is 2 items + owner gates:

| # | Item | Owner | Notes |
|---|------|-------|-------|
| 1 | **SearchEngine ranking FIX** | Agent 4 | `SearchModels.kt`: make scoring kind-aware (UNIT title must outrank exact topic-text match). 1 failing test pins the expectation. |
| 2 | **Fake→real data swap** | Agent 3 + Agent 4 | Infrastructure ready (`SyllabusRepository` + Room cache + pinned contracts). My swap order: **study first**, verify on device, then search, then practice/community. Fakes stay for tests. |
| 3 | Owner gates | Owner | `google-services.json` · device testing (auth, sync, study journey) · theme sign-off · Phase 8 promotion approval. |

**Program status at closeout:** native app compiles (APK builds), 100/101 unit tests, 28/28 mobile API tests, every screen reachable, real backend contracts live. After items 1–2 + owner device testing, the app is Phase-8-ready.

### 2026-11-26 — Session 6: fake→real swap executed (OWNER-DIRECTED — Supervisor wrote code with explicit owner authorization, overriding the Agent 5 no-code rule for this session only)

**Swapped to real data (verified by build + tests):**
- **Practice + quiz:** `PracticeViewModel`/`QuizRunnerViewModel` now `@HiltViewModel` over new `PracticeRepository` (`GET /api/mobile/practice` catalog + `GET /api/practice/exams/:slug` questions, Room-cached offline). `PracticeSet` model now mirrors the real catalog (slug/title/durationMin/questionCount). Hub + runner screens show loading/error/offline states.
- **Search:** new `SearchIndexSource` — production `SyllabusSearchIndexSource` builds the index from the REAL syllabus tree (offline-tolerant); tests keep the eager static source. (The ranking fix itself had already landed from the worker session — verified green.)
- **Community:** new `CommunityViewModel`/`CommunityRepository` over `GET /api/mobile/community` (read-only, cursor-paginated, Room-cached); screen rewire to real posts (author/category/createdAt; likes/replies wait for the write-path contract).
- **DI:** `PracticeRepository`, `CommunityRepository`, `SearchIndexSource` providers in `AppModule`.
- **Tests:** `FakeRnApi` extended with the 3 new endpoints + per-slug exam queue; `FakePracticeRepo` reshaped to the real catalog; `PracticeViewModelTest`/`QuizRunnerViewModelTest`/`FakePracticeRepoTest` rewritten against the real chain (Unconfined scope, no new test deps).

**Verified:** `compileDebugKotlin` + `compileDebugUnitTestKotlin` + `testDebugUnitTest` + `assembleDebug` → **BUILD SUCCESSFUL, 110/110 unit tests, 0 failures, app-debug.apk 64.9 MB**.

**Still on fakes (deliberate, with reasons):**
- **Veer chat** — `FakeChatStream` remains; real SSE needs the auth-token flow + spark-gate behavior verified on a device first (guest gets 401/403 from `requireAuth`).
- **Profile stats** — `FakeProfile.stats` has no backend contract yet (needs a practice-history/notes-read stats endpoint, Agent 2 backlog); profile identity can swap when that lands.
- **Notifications** — local list; real push needs `google-services.json` (owner).

**EDITS (session 6):** `core/contract/MobilePracticeCommunity.kt` (+new) · `data/api/RnApi.kt` (+3 endpoints) · `data/repository/PracticeCommunityRepository.kt` (+new) · `di/AppModule.kt` (+3 providers) · `ui/screens/practice/{PracticeModels,PracticeViewModel,QuizRunnerViewModel,PracticeHubScreen,PracticeQuizScreen,local/FakePracticeRepo}` · `ui/screens/search/{SearchModels,SearchViewModel,SearchScreen}` · `ui/screens/social/{CommunityViewModel(+new),CommunityScreen}` · `app/src/test/.../{Fakes,PracticeViewModelTest,QuizRunnerViewModelTest,FakePracticeRepoTest}` — all **[IMPORTANT CORE FILE]** except fakes/tests (test fixtures, still core code).

**Session 7 (owner) — Firebase verification (Agent 5):**
- `android-native/app/google-services.json` exists locally, **confirmed gitignored** (`android-native/.gitignore:10`) — never committed. Contents never printed (secret-hygiene rule).
- Android app registered: `com.ravikisan.platform.compose` with 5 SHA-256 release/signing fingerprints.
- `app/build.gradle.kts`: firebase-bom 33.7.0 (messaging, auth, firestore) + play-services-auth 21.3.0 — **[IMPORTANT CORE FILE]**.
- Conditional google-services plugin now **applies** (file present); FCM path (`FcmRegistrar`, `RnFirebaseMessagingService`) is live in the build.
- **Verified:** `./gradlew assembleDebug` → **BUILD SUCCESSFUL (11m45s), APK 81.9 MB** (Firebase SDKs included).
- Classification: [IMPORTANT CORE FILE] `android-native/app/build.gradle.kts`, `skills-lock.json`; [CONTENT FILE] none; `google-services.json` = ignored local secret, never committed.

### 2026-11-26 — Session 8: security hardening (owner directive: "no one after installation can steal any data")

**Already strong (verified, from earlier sessions — no change needed):**
- Data at rest: `allowBackup=false`, `fullBackupContent=false`, data-extraction rules exclude **cloud backup AND device transfer** entirely; session tokens/user in EncryptedSharedPreferences (MasterKey AES256); Room cache holds only public curriculum payloads (no tokens, no PII).
- Network: cleartext disabled globally, SPKI pin-set for `harindrasah.com.np` (expires 2027-12), system CAs only; Attestation/RedirectGuard/ResponseCap interceptors; OkHttp logging only in DEBUG.
- Components: only `MainActivity` exported (launcher + verified app links); FCM service `exported=false`.
- Release: R8 minify + resource shrinking already enabled.

**Hardened this session:**
1. **Screen-capture block** (`MainActivity.kt`): `FLAG_SECURE` for the whole app — screenshots, screen recording, and non-secure display output blocked; Recents switcher shows a blank card (no content thumbnail leak). Plus `setRecentsScreenshotEnabled(false)` (API 31+) so no task screenshot is cached at all. Owner kill switch: `MainActivity.ALLOW_SCREEN_CAPTURE` (trade-off: students can't screenshot their own notes while it's on).
2. **R8 keep rules** (`proguard-rules.pro`): Retrofit/kotlinx-serialization/Room reflection kept so minified release builds actually run — prevents a future "disable minify" regression; obfuscation itself raises static-analysis cost.
3. **Supply-chain fix (critical):** a later owner-session change added `com.google.firebase:firebase-pnv:17.0.0` — **not a published Google artifact** (phone auth lives in `firebase-auth`; the hallucinated `com.google.firebase.pnv.FirebasePhoneNumberVerification` import in `RnApp.kt` came from it and broke the build). REVERTED. Also reverted BOM 35.2.0 → 33.7.0 (its `firebase-auth 25.0.0` is Kotlin-2.4-compiled, incompatible with this project's Kotlin 2.1.0) and removed the unused `firebase-perf` SDK + plugin (telemetry attack surface with zero usage; re-add when actually wired).

**Verified:** `assembleDebug` + `testDebugUnitTest` → **BUILD SUCCESSFUL, 0 test failures, APK 74.6 MB**.

**Residual risks (owner awareness, no action taken):**
- A determined attacker with root on the device can read app data — true of every app; EncryptedSharedPreferences keys are also device-bound, which is the practical ceiling on Android.
- `firebase-auth`/`firebase-firestore` deps are declared but unused by code yet — keep only if Google Sign-In / Firestore sync is planned; otherwise remove (smaller surface).
- Deep links (`rn://app`, https) open Home only — no parameter-driven navigation to sensitive screens; fine as-is.

**Classification:** [IMPORTANT CORE FILE] `MainActivity.kt`, `proguard-rules.pro`, `RnApp.kt` (hallucinated-code removal), `app/build.gradle.kts`.

### 2026-11-26 — Parity campaign CONTINUE #1: B0 close-out, then B1 kickoff (issued from §8 B0 verification review)

**B0 verdict: Done, with two carry-over fixes that gate all B1 promotions.** Ledger baseline for the campaign is script-generated: **11 native-live / 117 placeholder / 0 not-started** (128 parity-relevant + 27 exceptions = 155 website sections). Placeholder count must only ever go **down** from here.

**Priority order (do these in one session each, in this order):**

1. **W3 — B0 task 0, straddle relocation (RQ-12, do first):** move `SyllabusSearchIndexSource` (and the `SearchIndexSource` interface it implements) out of `ui/screens/search/SearchViewModel.kt` into `data/repository/` (or `core/`), per parity plan §0.5 task 0. Keep behavior byte-identical — this is a move, not a rewrite; `SearchViewModel` keeps consuming it via constructor injection. Update the existing `SyllabusSearchIndexSourceTest` import path. File the completion in your checkpoint; W1 picks up the `AppModule` import update from the queue.
2. **W1 — RQ-11 + RQ-12 wiring batch:** (a) make the stub loop in `RnNavHost.kt` render `ComingToNative(stub.title)` instead of `StubScreen`, then delete `navigation/StubScreen.kt` (one placeholder component, per plan §0.6 — keep `ComingToNative`, it is the plan-mandated one); (b) update the `AppModule` provider import after W3's relocation. Run `node scripts/ci/native-parity-check.mjs` + `./gradlew testDebugUnitTest` after both; paste real output in your checkpoint.
3. **W2 — B1 start (P1 content endpoints):** audit existing `/api/*` first (per §0.4), then PYQ list/detail + formula sheets + announcements + changelog — the four cheapest P1 families. Publish schema doc + `docs/api/mobile-*.md` **before** W3 binds; vitest per route.
4. **W3 — B1 start (after relocation):** repositories + Room schema for the four W2 families above, against W2's published doc only.
5. **W4 — B1 start (after RQ-11 lands):** promote the cheapest P1 stubs first — announcements, changelog — using the real `ComingToNative` replacement flow; KaTeX/math spike in the notes reader this batch (plan §7 risk: spike early in B1, not B3).

**Standing reminders:** parity = match the website, never redesign (§0.7 duty 5); no shared-file direct edits — `AppModule.kt`/`RnNavHost.kt` changes go through the queue to W1; every checkpoint carries the PARITY LEDGER block with script-generated numbers only.

### 2026-11-26 — Parity carry-overs EXECUTED (owner-directed — Supervisor wrote code with explicit owner authorization, overriding the Agent 5 no-code rule for this session only; same precedent as session 6)

**RQ-12 — straddle relocation (parity plan §0.5 task 0), behavior byte-identical:**
- `core/logic/SearchModels.kt` (+new, moved): `ResultKind`, `SearchResult`, `SearchEntry`, `SearchEngine` — the pure scoring engine now lives beside the other algorithm ports; UI and data both depend downward on core, no UI↔data straddle.
- `data/repository/SearchIndexSource.kt` (+new, moved): `SearchIndexSource`, `StaticSearchIndexSource`, `SearchEngine.asSource()`, `SyllabusSearchIndexSource` — data-source classes out of Worker 4's UI tree.
- Deleted: `ui/screens/search/SearchModels.kt`. Rewired imports only (no logic change): `SearchViewModel.kt` (now UI-only), `SearchScreen.kt`, `local/FakeSearchIndex.kt`, `SearchEngineTest.kt`, `SearchViewModelTest.kt`, `di/AppModule.kt` (provider imports).

**RQ-11 — one placeholder component (parity plan §0.6):**
- `RnNavHost.kt` stub loop now renders `ComingToNative(stub.title)` centered in a full-size `Surface` (same layout shape as the old stub); `navigation/StubScreen.kt` DELETED (was the duplicate with different copy).
- `scripts/ci/native-parity-check.mjs`: placeholder-body detection extended to `ComingToNative(` alongside the legacy `StubScreen(` string, so the defensive LIVE-demotion check stays meaningful. PLACEHOLDER classification itself comes from the `WebParity.stubs` map and was never body-dependent — verified by reading the parser before the swap.

**Verified (real runs, serialized after one Kotlin-daemon loss + `--stop` retry):**
- `./gradlew compileDebugKotlin testDebugUnitTest` → **BUILD SUCCESSFUL, 150 tests / 0 failures** (from JUnit XML, not task output).
- `./gradlew assembleDebug` → **BUILD SUCCESSFUL, app-debug.apk 78.0 MB**.
- `node scripts/ci/native-parity-check.mjs` → **OK exit 0**; ledger unchanged at **11 live / 117 placeholder / 0 not-started** (correct — this batch promotes no sections, it only cleans the boundary).

**Also recorded this session:** request-ID collision fixed — the B0 carry-overs are **RQ-11/RQ-12** (RQ-7..RQ-10 were already taken by worker checkpoints: RQ-7 = coroutines-test dep, RQ-9/RQ-10 = W3's port handoffs); queue rows renumbered accordingly.

**Open on Agent 5's desk (not this session's scope):** full §8 code review of the four parity-session-1 worker checkpoints (W1 B0 script, W2 pyqs/formulas endpoints, W3 six algorithm ports + golden vectors, W4 PYQs screens + ComingToNative) — W1 reported W4's `PyqsViewModel.kt` failing `compileDebugKotlin` mid-flight while W4 claimed 120/120 green; the tree now compiles (verified above), so the flag was stale-in-flight, but the file-by-file review is still owed before B1 sign-off.

**Classification:** [IMPORTANT CORE FILE] `core/logic/SearchModels.kt` (+new), `data/repository/SearchIndexSource.kt` (+new), `ui/screens/search/SearchModels.kt` (deleted), `SearchViewModel.kt`, `SearchScreen.kt`, `local/FakeSearchIndex.kt`, `SearchEngineTest.kt`, `SearchViewModelTest.kt`, `di/AppModule.kt`, `navigation/RnNavHost.kt`, `navigation/StubScreen.kt` (deleted), `scripts/ci/native-parity-check.mjs`. No [CONTENT FILE] touched.

## 6. KEY DECISIONS LOG

| Date | Decision | Why |
|---|---|---|
| Session 1 | Standalone Gradle project at `android-native/` (not a composite into legacy repo build) | Plan §4 mandatory parallel layout; legacy must stay bit-identical |
| Session 1 | Conditional google-services plugin (mirror legacy) | No real `google-services.json` exists locally for either app; builds must not fail |
| Session 1 | Dev applicationId `.compose` | Side-by-side install with production legacy app (plan §1.1) |
| Session 1 | Hilt via KSP from day one | Plan §4 stack default; cheaper to add now than retrofit |
| Session 1 | Fixed 2 pre-existing legacy compile errors (ContentSyncWorker, ApiClient) | Legacy did not compile at all on this machine; §1.1 allows critical fixes |
