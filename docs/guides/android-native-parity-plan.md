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

---

## 2. Route parity map (remaining work)

Source of truth for the left column: `frontend/lib/core/navigation.ts` + `site-index.ts`. Workers keep this table updated in their checkpoints; Agent 5 reconciles it against the parity script.

| Web section | Native route (proposed) | Data source | Owner | Batch |
|---|---|---|---|---|
| Dashboard | `dashboard` | progress endpoints + local state | W4 | P2 |
| Onboarding / Study Goals | `onboarding`, `goals` | device-local (`StudyGoals.kt`) | W3+W4 | P2 |
| Weekly Planner | `planner` | `StudyPlan.kt` (local) | W3+W4 | P3 |
| Spaced Repetition | `srs` | `Srs.kt` (local) + pyq-bank cards | W3+W4 | P3 |
| Mock Exams | `mock-exams`, `mock-exam/{id}` | `MockExam.kt` + PYQ endpoints | W3+W4 | P3 |
| Analytics | `analytics` | `Analytics.kt` + progress endpoints | W3+W4 | P3 |
| Streaks & Badges | `streaks` | `Achievements.kt` (derived, nothing stored) | W3+W4 | P2 |
| Community posting/replies | `community` (write paths) | social write endpoints | W2+W4 | P5 |
| Ask Veer (`/ask`) | `ai-tutor` (already live) | — | — | done |
| My Notes | `my-notes` | `PersonalNotes.kt` (device-local) | W3+W4 | P2 |
| Downloads / Offline packs | `downloads` | `OfflinePack.kt` | W3+W4 | P5 |
| Billing | `billing` | credits endpoints | W2+W4 | P5 |
| Referrals | `referrals` | existing referral data (or documented placeholder per website) | W4 | P5 |
| Site Index | `site-index` | parity registry itself | W1+W4 | P5 |
| Curriculum Levels | `levels` | levels endpoints | W2+W4 | P5 |
| Exam Hub | `exams` | practice + PYQ endpoints | W2+W4 | P1 |
| Quick Revision | `revision` | content endpoints | W2+W4 | P1 |
| Certificates | `certificates` | certificates endpoints | W2+W4 | P2 |
| Announcements | `announcements` | announcements endpoints | W2+W4 | P1 |
| Feedback | `feedback` | feedback endpoint | W2+W4 | P5 |
| Changelog | `changelog` | changelog data | W2+W4 | P1 |
| Platform Status | `status` | `/api/v2/health` | W2+W4 | P5 |
| PYQs | `pyqs`, `pyq/{id}` | PYQ endpoints | W2+W4 | P1 |
| Practical Manuals | `practical` | practical endpoints | W2+W4 | P1 |
| Concept Legends | `legend` | legend endpoints | W2+W4 | P1 |
| Notes Archive | `notes` | notes catalog endpoints | W2+W4 | P1 |
| Class hubs (11/12, per subject) | `class-hub/{slug}` | syllabus + notes endpoints | W4 | P1 |
| Syllabus by Year | `learn` (already live; additions view) | syllabus endpoints | W4 | P1 |
| Mindmaps | `mindmap/{scope}` | mindmap payloads or `MindmapBuilder.kt` | W2/W3+W4 | P3 |
| 3D / interactive Labs | `lab/{id}` | per-lab native rebuild | W4 | P4 |

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
Input:  frontend/lib/core/navigation.ts (NAV_SECTIONS entries)
        android-native/.../navigation/RnNavHost.kt (Routes + composables)
        docs/guides/android-native-parity-plan.md (documented web-only exceptions)
Output: per-section status: LIVE | PLACEHOLDER | MISSING | EXCEPTION
        counts summary; exit 1 if any MISSING (unregistered website section)
        exit 0 otherwise (PLACEHOLDER is allowed mid-campaign, tracked)
Wire-in: `npm run check` (scoped) — owned by Worker 1
```

## Appendix B — Document maintenance

- Workers update **only** their checkpoint + ledger lines in `android-native-STATUS.md`.
- Agent 5 updates this plan's route map / batch tables when reality diverges.
- The migration plan remains the architecture reference; this plan never redefines boundaries, only adds the parity campaign on top.
