# SYSTEM WORK TRACKER

The platform seen as **work types** (systems), not as content: what each one is,
what proves it exists, how far it is done, and where it stands right now.

Content notes are deliberately out of scope here — the content side has its own
registry ([frontend/public/data/content-ledger.json](frontend/public/data/content-ledger.json),
checked by `npm run ledger:check` and audited live by `scripts/content-ledger-live.mjs`).

State legend: **✅ Live** = committed and deployed; **🟡 In progress** = real code or data exists but part of it is uncommitted WIP; **🟠 Partial** = shipped with a known gap; **⛔ Not started**.

Snapshot baseline: runtime code `0a52272b` (the foreign-WIP ship, main == origin/main);
the commits carrying this tracker and the refreshed status doc are docs-only.

<!-- system-audit:start -->
_Recomputed by `node scripts/system-work-audit.mjs --write`; `--check` fails when this block or any evidence path drifts._

| surface | count |
| --- | ---: |
| frontend pages (app router) | 148 |
| backend API modules / mounted /api groups | 34 / 33 |
| CI workflows | 4 |
| test files (frontend / backend) | 62 / 30 |
| content entries (authored / template) | 867 (763 / 104) |
| unclaimed note files | 147 |
| supplementary claims (template) | 2467 (884) |
| script files under scripts/ (mjs/cjs/js/py/ts) | 119 |
| evidence paths named below that exist | 33 / 33 |
<!-- system-audit:end -->

Counts above describe the committed tree: `main` == `origin/main` at the
baseline, so there is no WIP gap left (see §3).

## 1. Work types — 31 tracked

### Platform foundation

| # | Work type | What it is | Evidence | State |
| ---: | --- | --- | --- | --- |
| 1 | Frontend app shell & routing | 148 app-router pages across 12 sections | `frontend/app/**` | ✅ Live |
| 2 | Backend API & middleware | 34 API modules, 33 mounted `/api` groups (newest: `/api/ai/image-history`); security headers, rate limit, CORS, error handler | [app.ts](backend/src/app.ts), `backend/src/api/**` | ✅ Live |
| 3 | Auth & accounts | login / signup / forgot / reset / admin, sessions | `frontend/app/login`, [auth.ts](backend/src/api/auth.ts) | ✅ Live |
| 4 | Owner console | 8 operator pages (users, credits, premium, tracking, content, settings, activity) + `/api/owner` | `frontend/app/owner/**` | ✅ Live |
| 5 | Credits & coin economy | bill-everyone daily pool (premium unlimited; owner emails follow the global `coin_gate_enabled` toggle), reset job, gate-cache invalidation, mirrored UI gate + route gating | [credits.ts](backend/src/utils/credits.ts), [creditCheck.ts](backend/src/middleware/creditCheck.ts), [coin-gate.ts](frontend/lib/coin-gate.ts), `frontend/features/credits/**` | ✅ Live |
| 6 | Deployment & CI | Vercel production + Render backend, 4 workflows, deploy gate on `main` | [ci.yml](.github/workflows/ci.yml), [live-smoke.yml](.github/workflows/live-smoke.yml) | ✅ Live |
| 7 | Mobile / responsive | checklist + automated gate in CI — `npm run mobile:check` enforces R1 invalid variants, R2 safe-area chrome, R3 wide fixed minimums, R4 nowrap tables across 912 source files | [MOBILE_RESPONSIVE_CHECKLIST.md](MOBILE_RESPONSIVE_CHECKLIST.md), [mobile-responsive-check.mjs](scripts/mobile-responsive-check.mjs) | ✅ Live |

### Content & curriculum systems

| # | Work type | What it is | Evidence | State |
| ---: | --- | --- | --- | --- |
| 8 | Content build pipeline | corpus → shipped tree, byte-parity gate, validate / doctor / repair / registry | [build.ts](frontend/scripts/content/build.ts), [validate.ts](frontend/scripts/content/validate.ts) | ✅ Live |
| 9 | Content ledger & live audit | every shipped note family registered, checked in CI, audited on the deployed site | [ledger.ts](frontend/scripts/content/ledger.ts), [content-ledger-live.mjs](scripts/content-ledger-live.mjs) | ✅ Live |
| 10 | Syllabus & level browsing | class / level / subject / chapter / topic navigation over the official syllabus | `frontend/app/(app)/syllabus`, `frontend/app/(app)/levels`, `frontend/features/syllabus/**` | ✅ Live |
| 11 | Class 11 notes workspace | 867 topic notes; 763 authored / 104 still template | [content-ledger.json](frontend/public/data/content-ledger.json) | ✅ Live (88% authored) |
| 12 | Class 12 track | full route parity with class 11 (hub, units, `[subject]/[unit]` shortcut, chapters, topics, theory, mindmap, syllabus); pages say an honest "coming soon" wherever authored notes are absent — the 698-file corpus is generated stubs, registered as supplementary claims | `frontend/app/(app)/class-12-notes/**` | ✅ Live (system; authored class-12 content is a content-side campaign) |
| 13 | PYQ / past papers | 287 corpus banks shipped; served index live with 273 pyq keys, 285 solved questions; reader shipped — `/pyqs` hub (year-aggregated banks), theory deep links, site-index entry; `content/pyq/` NEB corpus committed but unreferenced | `frontend/lib/pyq-bank.ts`, `frontend/app/(app)/pyqs/**`, [ravikishan/_index.json](frontend/public/data/ravikishan/_index.json) | ✅ Live |
| 14 | Mindmaps | branch trees rebuilt from each unit's own concept notes; CI gate | `scripts/enrichment/rebuild-legacy-mindmaps.mjs`, `content/ravikishan/**/mindmap/**` | ✅ Live |
| 15 | Labs / 3D / visuals | interactive lab pages, schematics, 3D rigs, visual audit gate | `frontend/app/(app)/lab/**`, `frontend/components/lab/**` | ✅ Live |
| 16 | Graphs | graph viewer pages over per-subject graph banks | `frontend/app/(app)/graphs/**`, `frontend/lib/graphs-*.ts` | ✅ Live |
| 17 | Derivations & theorems | derivation/theorem trees and data banks (waves 1–2) | `frontend/app/(app)/derivations/**`, `frontend/lib/derivations*.ts` | ✅ Live |
| 18 | Knowledge hub | grammar, writing, numerical physics/chemistry, biology diagrams, "pro" sets | `frontend/app/(app)/knowledge/**` | ✅ Live |
| 19 | Loksewa & world knowledge | Loksewa 4 sections + general knowledge / current affairs / global topics | `frontend/app/(app)/loksewa/**`, `frontend/app/(app)/world-knowledge/**` | ✅ Live (not audited this session) |
| 20 | Notes import & legacy migration | r-export + ravikishan notes indexed and deep-linked via `noteRoute`; every retired URL shape forwards — exact roots and deep `/r-notes/*` + `/ravikishan-notes/*` redirect to `/notes`, `*-disabled` keeps the canonical migration page | [notes/page.tsx](frontend/app/(app)/notes/page.tsx), [imported-notes.ts](frontend/lib/imported-notes.ts), [note-routes.ts](frontend/lib/note-routes.ts), [next.config.mjs](frontend/next.config.mjs) | ✅ Live |
| 21 | Search | site search page + `/api/search` | `frontend/app/(app)/search`, [search.ts](backend/src/api/search.ts) | ✅ Live |
| 22 | PDFs | library + reader tab (open/view/download split, `pdf-src` helper, tests) shipped in `e822fb8e` | `frontend/app/(app)/pdfs/**`, [pdf-viewer.tsx](frontend/components/content/pdf-viewer.tsx), [pdf-src.ts](frontend/lib/pdf-src.ts) | ✅ Live |
| 23 | Progress, bookmarks, resources | progress panel, bookmarks, resource CRUD (new / edit / view) | `frontend/app/(app)/progress`, `frontend/app/(app)/resources`, [progress.ts](backend/src/api/progress.ts) | ✅ Live |
| 24 | Exams, quiz, lessons, practical | entrance-question banks, quiz pages, AI quiz, lessons, practicals, countdown | `frontend/app/(app)/quiz`, `frontend/app/(app)/lessons`, [exams.ts](backend/src/api/exams.ts) | ✅ Live |
| 25 | Periodic table | 118-element explorer + data API | `frontend/app/(app)/periodic-table`, [periodic-table.ts](backend/src/api/periodic-table.ts) | ✅ Live |

### AI

| # | Work type | What it is | Evidence | State |
| ---: | --- | --- | --- | --- |
| 26 | AI tutor & chat | streaming tutor, chat history, guest mode, provider routing; console UI + coin-gate mirror shipped | `frontend/app/(app)/ai/**`, `backend/src/api/ai*.ts` | ✅ Live |
| 27 | AI generation suite | quiz generation, content enhance, figures, images | [ai-generate.ts](backend/src/api/ai-generate.ts), [ai-enhance.ts](backend/src/api/ai-enhance.ts), [ai-figure.ts](backend/src/api/ai-figure.ts) | ✅ Live |
| 28 | Curriculum-grounded retrieval | corpus filtering (frames/boilerplate), coverage grading, depth tests | [curriculum-corpus.ts](backend/src/ai/curriculum-corpus.ts), [deep-source-depth.test.ts](backend/tests/deep-source-depth.test.ts) | ✅ Live |

### Quality & trust

| # | Work type | What it is | Evidence | State |
| ---: | --- | --- | --- | --- |
| 29 | Test suites | 62 frontend + 30 backend test files; backend 463/463; frontend green in CI (two tests time out only in a full local run on the memory-tight Windows box — both pass solo and in CI) | `frontend/tests/**`, `backend/tests/**` | ✅ Live |
| 30 | Honesty & quality audits | content health, empty scopes, URL hygiene, visuals, mindmaps, ledger | `scripts/*audit*`, `scripts/content-health-check.mjs` | ✅ Live |
| 31 | Docs & status docs | AGENTS / RULES / PLANS / AUDIT docs current; PROJECT_STATUS.md refreshed 2026-10-04 (real workspace, repo, live deploys, CI, verification) | [PROJECT_STATUS.md](PROJECT_STATUS.md), [PLANS.md](PLANS.md) | ✅ Live |

## 2. How much is done

| State | Work types | Share |
| --- | ---: | ---: |
| ✅ Live | 31 | 100% |
| 🟡 In progress | 0 | 0% |
| 🟠 Partial | 0 | 0% |
| ⛔ Not started | 0 | 0% |
| **Total** | **31** | **100%** |

Content-side completion (from the content ledger, not this tracker): 867
class-11 topics shipped, **763 authored (88%) / 104 template**, 147 unclaimed
files registered but unread, 2,467 supplementary claims of which 884 are
template (mostly class-12 stubs).

## 3. Current situation (baseline `0a52272b`)

- **Deploys:** Vercel production and Render both auto-deploy from `main`; the
  six-commit foreign-WIP ship was verified READY at `0a52272b` (Vercel
  deployment `dpl_w5QGQGqZ`; Render `/health` reports the same SHA). The
  earlier four-partial completions remain `7e6a9d26`.
- **CI:** all four workflows succeeded on the ship push — CI/CD (all jobs,
  including the mobile-responsive gate), Content JSON, Live Smoke Test, URL
  Hygiene.
- **This snapshot closes the three former 🟡 rows and lands the foreign WIP:**
  the coin economy now bills every signed-in student (premium unlimited; owner
  emails follow the global `coin_gate_enabled` toggle) with a mirrored UI gate;
  the PYQ reader (`/pyqs` hub, year-aggregated banks) and `/syllabus/additions`
  ship with navigation + site-index entries; the AI console UI edits ship; the
  Image Hub opens to every student with account-saved history
  (`/api/ai/image-history` + `public.image_history`, migration 007 applied
  live), and the draw endpoints moved behind the `ai-image` rate-limit tier.
- **Live verification on the ship commit:** `/pyqs` and `/syllabus/additions`
  return 200; `/api/ai/image-history` answers 401 unauthenticated; a signed-in
  draw through the hub produced a `figure` row in `public.image_history`
  (checked with the service key) and the history survived a full reload.
- **Known limitations:** 104 template class-11 entries; class-12 has no
  authored notes yet (its pages say so honestly, and authoring them is a
  content-side campaign); 147 unclaimed files (1.6 MB) that no page loads; 14
  pre-existing dangling claims in the ravikishan index; `content/pyq/`
  (24 banks / 103 solved questions) is committed but unreferenced — wiring it
  into the reader or retiring it is a follow-up decision; `frontend/trace.txt`
  is an 11 MB tracked tsc trace from 2026-09-25 (cleanup candidate);
  `frontend/probe-nepali-slugs.mts` is a scratch probe left untracked on
  purpose. Locally, the full frontend suite on the memory-tight Windows box
  can trip two environment-only timeouts that pass solo and in CI.
- **Local test note (backend):** the backend suite is 463/463 on this tree.

## 4. How to re-check

```bash
node scripts/system-work-audit.mjs --check   # tracker numbers + evidence paths
npm run ledger:check                         # content registry gate
node scripts/content-ledger-live.mjs         # deployed content audit
gh api repos/ownerforai-byte/educational-platform-global/commits/$(git rev-parse HEAD)/check-runs \
  --jq '.check_runs[] | "\(.name) \(.conclusion)"'
```
