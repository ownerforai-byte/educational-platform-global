# Parity close-out — three-wave execution plan

**Status:** Active execution plan for the remaining 117 placeholder sections.
**Governing plan:** [`android-native-parity-plan.md`](android-native-parity-plan.md) (§0 roles/boundaries, §1 parity contract, §2 route map, §7 risks) — boundaries and rules are unchanged; this file only sequences the remaining work.
**Ledger:** `node scripts/ci/native-parity-check.mjs` (script-generated numbers only).
**Baseline at split time:** 11 native-live / 117 placeholder / 0 not-started.

**Split logic:** Waves 1–2 are **independent** — zero shared data families, zero cross-dependencies, safely parallel. Wave 3 holds every section that is **internally coupled** (shared repository families, shared streaming stack, one KaTeX gate) and runs **last**, after Waves 1+2 sign off.

| Wave | Sections | Data dependency | Parallel with |
|---|---|---|---|
| 1 | 39 | device-local ports + live syllabus/notes endpoints | Wave 2 |
| 2 | 23 | device-local labs + static GK + thin one-endpoint surfaces | Wave 1 |
| 3 | 55 | five coupled clusters (progress family, manifest corpus + KaTeX, knowledge bank, AI family, account/aggregation) | **nothing — runs last** |

---

## Wave 1 — Independent · 39 sections · Device-local personal & study tools + class hubs

*Zero new backend work needed — every data path is already unblocked. Can start immediately, in parallel with Wave 2.*

```text
You are Agent N (parity plan) — INDEPENDENT WAVE 1 (39 sections).
Read first: docs/guides/android-native-parity-plan.md (§0/§1/§2), STATUS §4 newest + §7, AGENTS.md role tasks + queue.
OWNER DIRECTIVE: "My aim is to make them identical — adding in one means adding in both."

SCOPE — exactly these 39 placeholders, nothing else:
• Device-local personal (8): /onboarding /goals /my-notes /journal /planner
  /schedule /srs /downloads
• Study tools on landed ports (1): /mock-exams (MockExam.kt + PYQ endpoints
  are golden-tested and live — bind, don't rebuild)
• Class hubs & syllabus (28): /class-11-notes /class-12-notes + all 24
  class-11|12-notes/{subject}[/theory] rows + /syllabus /subjects
• Live-endpoint readers (2): /notes /revision

WHY INDEPENDENT: W3's algorithm ports (Srs, MockExam, StudyPlan, StudyGoals,
OfflinePack) are landed with golden vectors; syllabus/units/notes endpoints are
live. NO new W2 endpoint is required for any section in this prompt. Do NOT
touch sections outside this list — they belong to other waves.

ORDERS (no-wait rule in force):
• W3: core/logic/PersonalNotes.kt + CommunityRules.kt (last two §0.5 ports);
  Room schema for device-local stores (notes, journal, goals, SRS review state).
• W4: build every screen in the established pattern (ViewModel → repository →
  Room cache; offline banner; fakes only in ui/screens/<feature>/local/).
  Promote each finished stub per the protocol at the WebParity.stubs loop.
• W1: stub→live promotions + deep links per batch; single-writer for
  AppModule.kt / RnNavHost.kt / AppDatabase.kt / build files — everyone else
  requests via the queue. versionCode bump + bundleRelease at wave exit.
• W2: NO new endpoints this wave — if you finish early, pre-audit Wave 3's
  manifest corpus families and draft (do not mount) their schema docs.

HARD RULES: parity = MATCH the website, never redesign. Ownership columns
absolute. Checkpoint every session with the PARITY LEDGER — script-generated
numbers only (node scripts/ci/native-parity-check.mjs); manual counts rejected.

EXIT GATE: 0 placeholders among these 39 (parity script), tests green,
Agent 5 spot-check 3/3, sign-off in STATUS §7.
```

## Wave 2 — Independent · 23 sections · Labs, GK banks & thin surfaces

*Zero coupling to Wave 1's data. Can start immediately, in parallel with Wave 1.*

```text
You are Agent N (parity plan) — INDEPENDENT WAVE 2 (23 sections).
Read first: docs/guides/android-native-parity-plan.md (§0/§1/§2/§7), STATUS §4 newest + §7, AGENTS.md role tasks + queue,
docs/guides/android-native-labs-decision.md.
OWNER DIRECTIVE: "My aim is to make them identical — adding in one means adding in both."

SCOPE — exactly these 23 placeholders, nothing else:
• Labs & interactives (6): /lab /lab/3d /lab/bio-3d-organelles /lab/theory
  /ad-p-table /periodic-table
• General-knowledge banks (8): /loksewa /loksewa/geography-of-nepal
  /loksewa/history /loksewa/environment /world-knowledge
  /world-knowledge/general-knowledge /world-knowledge/current-affairs
  /world-knowledge/global-topics
• News & thin surfaces (9): /announcements /changelog /notice /exam-countdown
  /referrals /site-index /levels /feedback /status

WHY INDEPENDENT: labs are device-local (Compose Canvas + state loop, no
endpoints); GK banks are static corpus; the thin surfaces are one-endpoint or
static-data screens. No section here shares a data family with Wave 1 or with
Wave 3.

ORDERS (no-wait rule in force):
• W4: ONE LAB PER PR (plan §7 — non-negotiable), curriculum-value order.
  GK banks reuse the standard reader; no math rendering needed in this wave.
• W2: locate the announcements + changelog sources of truth FIRST (open item
  from your session-1 checkpoint), then one thin endpoint per family
  ({ ok, data }, cursor-paginated, vitest, doc page). /status reads
  /api/v2/health as-is. ADDITIVE only.
• W3: repositories + Room cache per W2 family; offline-tolerance contract
  (fresh → cache; failure → cache; else Unavailable).
• W1: promotions + deep links; single-writer files via queue only;
  versionCode bump + bundleRelease at wave exit.

HARD RULES: parity = MATCH the website, never redesign. Checkpoint with the
PARITY LEDGER — script-generated numbers only.

EXIT GATE: 0 placeholders among these 23 (parity script), tests green,
Agent 5 spot-check 3/3, sign-off in STATUS §7.
```

## Wave 3 — Relateds · 55 sections · Coupled clusters (run LAST)

*Every section here shares a data family, an infrastructure dependency, or a gate with another section — built as coordinated clusters, never distributed across sessions or workers. Starts only after Waves 1+2 sign off in STATUS §7.*

```text
You are Agent N (parity plan) — RELATEDS WAVE 3 (55 sections). START ONLY after
Waves 1 and 2 are signed off in STATUS §7 (their 62 sections native-live).
Read first: parity plan (§0/§1/§2/§7), STATUS §4 newest + §7, AGENTS.md queue,
docs/api/mobile-pyqs-formulas.md (the proven contract pattern).
OWNER DIRECTIVE: "My aim is to make them identical — adding in one means adding in both."

SCOPE — exactly these 55 placeholders, built as FIVE COUPLED CLUSTERS
(members of a cluster share one data layer — never split a cluster across
sessions or workers):

CLUSTER A — progress & quiz-history data family (11):
  /dashboard /progress /report-card /streaks /achievements /leaderboard
  /certificates /analytics /bookmarks /practice/history /ai-quiz/history
  ONE shared W2 endpoint family (progress/quiz-history/bookmarks reads, auth)
  + ONE W3 repository family feeds all eleven screens. /bookmarks is
  server-side (backend/src/api/user/bookmarks.controller.ts, member-gated).

CLUSTER B — manifest corpus family + KaTeX math spike (12):
  /pyqs /formulas (contracts ALREADY landed — bind W3/W4 to
  docs/api/mobile-pyqs-formulas.md; plus gate is server-side, surface the
  paywall state only) + /practical /legend /theorems /derivations /graphs
  /science-graph-bank /resources /resources/physics-xi
  /resources/mathematics-xi /pdfs
  All follow the proven manifest/file-endpoint pattern
  (backend/src/api/mobile/manifest.ts). /practical /legend are plus-gated.
  KaTeX/math spike lands HERE FIRST — theorems, derivations and numerical
  readers are blocked by it; do not build those screens before it's verified.

CLUSTER C — knowledge bank (10):
  /knowledge /knowledge/pro /knowledge/numerical-physics
  /knowledge/numerical-chemistry /knowledge/biology-diagrams
  /knowledge/grammar /knowledge/writing /knowledge/byakaran
  /knowledge/analytical-geometry /lessons
  Depends on Cluster B's math spike (numerical-physics/chemistry,
  analytical-geometry) — sequence after it inside this wave.

CLUSTER D — AI surfaces family (12):
  /ai /ai/math /ai/deep-dive /ai/diagrams /ai/tutor /ai/search
  /ai/workspace /ai/subjects /ai/history /ai-quiz /chat/nepali /chat/grammar
  ALL reuse the live /api/ai surface + the Veer SSE chat pattern (spark gate,
  auth 401/403 states) — adapters only, never duplicated logic. One shared
  streaming/chat repository serves the whole cluster.

CLUSTER E — account & aggregation (5 + exam hub):
  /billing /credits /users /profile/edit /mindmap
  Billing+credits share the credits endpoints; /mindmap uses the thin
  /api/mobile/mindmaps catalog (trees pre-built in the shared manifest —
  client-side assembly, NO tree-builder port, per W2's session-1 report).
  Also: /exams /exams/neb /exams/cee /exams/ioe /quiz — the exam-hub
  aggregation family (practice + PYQ + countdown endpoints), same rule:
  aggregate existing endpoints, never duplicate them.

ORDERS: same worker split, same hard rules as Waves 1–2 (no-wait, ownership
columns, single-writer shared files via queue, script-generated ledger only,
parity = match never redesign).

EXIT GATE (= PROGRAM DONE): native-parity-check reports 0 placeholders and
0 exceptions beyond plan §1's documented list; every section spot-checked;
bundleRelease green at final versionCode; Agent 5 sign-off in STATUS §7;
owner promotion review (migration plan Phase 8).
```

---

## Maintenance

- Agent 5 updates this file only when wave membership changes by owner decision — never to redefine boundaries (parity plan Appendix B applies).
- Each wave's exit sign-off is recorded in `android-native-STATUS.md` §7.
