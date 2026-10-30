# SYSTEM WORK TRACKER

PYQ decision (2026-10-24): option B — retire `content/pyq/`.
The shipped reader (`frontend/lib/pyq-bank.ts`) loads questions only from `content/_index.json` under `practice/questions` (365 banks, 869 solved questions), not from `content/pyq/`.
`content/pyq/` is not in the tree (0 git files). Its 24-bank successor `content/resources/question-bank/` stays unwired; do not add a second reader path.

Note presentation deduplication (2026-10-30): ✅ Live — `/notes` exposes one searchable archive with secondary imports filtered out; `TopicVerticalNotes` selects one canonical `duplicateType` source and owns all theory presentation; `ContentTabs` retains only companion fields and tools. `RavikishanTopicResources` is now a canonical-source shortcut inside Resources & Docs, not a second note renderer or duplicate-type switcher. Subject hubs have no second imported-note index. Approved-account Playwright smoke covers `/notes`; the approval wall remains enforced. Owner: platform owner.

Notes Rebuild — all subjects (2026-10-28): 🟡 In progress — raise all six subjects' notes (Biology, Physics, Chemistry, Math, English, Nepali — 116 units / 696 topics, Class 11+12) from ~3–4% of textbook depth to book-grade (Pioneer-series + NEB/CDC textbook benchmarks): introduction, strict hierarchy, classified tables with examples, SVG + curated Google diagrams in English, exam zone with CEE content preserved. Interfaces first (all 696 skeletons), note-filling in later sessions, existing notes polished in newer versions — simply no removal. **S1 done for Biology 2026-10-28: all 105 topic interfaces created (5 new + 100 upgraded in place, additive; 5 CEE-seeded), gates green (schema 3/3, content byte-parity, audit:scopes --strict PASS, placeholder 0, thin 432→413); §9 checklist 105/105 I-ticked** via [build-note-interfaces.mjs](scripts/build-note-interfaces.mjs). Remaining: unit-by-unit fill sessions. **S1 done for the other 5 subjects 2026-10-29: all 591 topic interfaces created (179 new + 412 upgraded in place, additive; 82 CEE-seeded: physics 23, chemistry 26, math 4, english 2, nepali 27), gates green (schema 3/3, content valid 4415/broken 0, build parity OK over 937 manifest entries, audit:scopes files 2787→3074 authored 2374→2791 thin 413→283 placeholder 0→0 broken 0→0, --strict GATE: PASS); §9 checklists 591/591 I-ticked (physics 165, chemistry 188, math 71, english 116, nepali 51)** via [build-note-interfaces.mjs](scripts/build-note-interfaces.mjs) (now per-subject builders + indexed variant scan). Next: continue Chemistry S2 with Stoichiometry (8 topics). **Math E-track started 2026-10-29: Ch.1 Ex 1.1 fully solved (14/14 sub-questions, Q1 statements a–f + Q2 connectives a–h, real book questions cross-checked vs Sci-Pi Pupil index) in [ex-1-1-logic-statements-connectives.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-1-logic-statements-connectives.json) (new `practice/solutions` corpus, pyq-register extended, both indexes + mirror rebuilt); gates green (content valid, build parity OK, scopes strict PASS); math-plan §6A Ex 1.1 ticked ☑ (1/62). **Ex 1.2 done 2026-10-29: all 34 sub-questions solved** (Q1 set ops, Q2 five-set ops, Q3a/Q3b set-builder, Q4a–c formula/multiples/prime-odd, Q5 four law verifications incl. fresh solution of unsolved Q3(b)(iv) = ∅; Q1(d) A−C-vs-A∪C print discrepancy flagged with both answers) in [ex-1-2-set-operations.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-2-set-operations.json); §6A Ex 1.2 ticked ☑ (2/62). **Ex 1.3 done 2026-10-29: all 15 set-law proofs in exam-grade element-chasing form** (disjointness, subset laws, difference/complement identities, distributive laws, De Morgan, A−(B∪C)/(B∩C) chains; cross-verified vs Ex 1.2 concrete instances) in [ex-1-3-set-laws-proofs.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-3-set-laws-proofs.json) — §6A Ex 1.3 ticked ☑ (3/62). **Ex 1.4 part 1 done: 18 typed sub-questions solved** (modulus Q1, |·|-law verifications Q2 both cases, inequalities Q3a–f incl. sign-table quadratics) in [ex-1-4-real-number-system-partial.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-4-real-number-system-partial.json); Q3(g)+/Q4+ are picture-only on the web index — marked ◐ pending book-PDF extraction. **Book-PDF ground truth landed 2026-10-29 (vendor/books/sukunda-basic-mathematics-xi.pdf, 210MB scanned): Ch.1 fully mapped via OCR — book Ex 1.1 (Sets, pp 13–15) + printed Answers key recovered; new [ex-1-1-sets-word-problems-supplement.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-1-sets-word-problems-supplement.json) (15Q: Q6 cardinality/inclusion–exclusion, Q7–Q9 two-set word problems, Q10–Q11 tea/exam percentages, Q12 three-set Venn regions, Q13 survey centre + exactly-one; every answer matches printed key) + new [ex-1-2-set-proofs-supplement.json](content/practice/solutions/class-11/mathematics/algebra/ex-1-2-set-proofs-supplement.json) (5 proofs: Q1a–c inclusions, Q4d A−(A−B)=A∩B, Q4e (A−B)∩B=∅); book Ex 1.1 now 49/49 ☑, book Ex 1.2 now 20/20 ☑; gates green (content valid 3/3, build parity OK, scopes strict PASS, index 1079 keys); math-plan §6A Ch.1 cell book-mapped. Redundancy noted (no removal, kept on disk, excluded from counts): ex-1-1-logic 14Q ⊂ ex-1-4-logic 52Q; ex-1-4-partial 18Q ⊂ ex-1-3-real-numbers 26Q. Book Ex 1.3 now 41/41 ☑ (repaired 2026-10-29: Q2(d) quotient-law verification added — book has only case (i) x=2,y=3, legacy (ii) is web-only; Q3(g) fixed to ≤-form forced by key (−∞,−2]∪[0,1); Q6(b) expansion corrected to −3≤x≤−1 with all four statements key-reconstructed + (c) OCR-confirmed; Q8(c) aligned to book lettering a<b⟹a+c<b+c via 350-dpi crop; index refreshed, gates green). Ex 1.4 fully resolved 2026-10-29 (12 sub-item fixes via 300/350/400-dpi crops, Q5 values machine-verified F/F/T vs printed key; Ch.1 COMPLETE 162/162). **Ex 2.1 done 2026-10-29: all 19 sub-questions solved** (ordered-pair equality, 2×2 systems incl. x=2/y=−1 and x=1/y=−6 checks, A×A/B×B/B×A, A×(B∪C)/(B∩C) laws with Q4(a) (b,a)→(b,b) web-typo fix, full LHS=RHS verifications, rule-built products) in [ex-2-1-ordered-pairs-cartesian-products.json](content/practice/solutions/class-11/mathematics/algebra/ex-2-1-ordered-pairs-cartesian-products.json); Q3 B×A-vs-A×B order ambiguity flagged with BOTH products; gates green (content 3/3, parity OK, scopes strict PASS, index 1080 keys); §6A Ex 2.1 ticked ☑. Mapping intel locked: Sukunda index gives textbook pp per exercise (±10 shift vs our 2075 PDF); Blogger feed `feeds/posts/default/-/<Label>` yields typed Q&A per exercise (Ex 2.2 + 2.4 typed in feed, Ex 2.3 + Additional pictures-only → via PDF); Ch.2 = 4 exercises + Additional. Next: Ex 2.2 (typed, in hand).** **Chemistry S2 started 2026-10-29: Foundation and Fundamentals (4 topics) filled to the bar** — reaction-block with conditions (Haber triple, saponification, calcination), mole triangle + composition bars + analysis-flow authored SVGs, 5–6 worked numericals each on T3/T4 (M_r, mole triangle, urea 46.67% proof, combustion analysis), 2 curated figures per topic all license-verified (Pereckas CC BY 2.0 glassware, David/Lavoisier PD, Dalton 1808 plate PD-Mark, Offnfopt CC0 periodic table, Trolove CC BY-SA 2.0 urea, Chemdiagrams CC BY 4.0 balance, Arcturus10 CC BY-SA 4.0 water, VectorVoyager CC BY-SA 4.0 mole with SI-2019 caveat noted); Exam Zone (mcs 10/topic, ≥5 short + 2 long NEB sets); validity notes kept (exact N_A, NEB 22.4 L vs IUPAC 22.7 L, amu ≈ 1.66×10⁻²⁷ kg); no-removal proven (HEAD strings 100% preserved ×4); gates green (schema 3/3, content valid/0 broken, build parity OK, strict PASS, placeholder 0); §9 checklist 4/4 N- and D-ticked. **Physics S2 started 2026-10-29: Physical Quantities (2 topics) filled to the bar** — derivation flagship (both LC formulae derived; pendulum T=2π√(l/g) + F=mv²/r dimensional derivations), formula-units table, 5–6 solved numericals each with units + sig figs, 2 authored SVG + 2 curated figures per topic (all 4 license-verified: Alvesgaspar GFDL/CC BY-SA 3.0/CC BY 2.5 vernier, Anasofiapaixao CC BY-SA 4.0 micrometer, Pisanty CC BY-SA 4.0 SI-2019 chart, DePiep CC BY-SA 3.0 SI units; SVGs fenced per lib/content/visuals.ts), Exam Zone (mcs 12/topic, ≥5 short + 2 long NEB sets), SI-2019 exact constants + CODATA G; no-removal proven (HEAD strings 100% preserved); gates green (schema 3/3, content valid/0 broken, build parity OK after one transient Windows retry, strict PASS, placeholder 0); §9 checklist 2/2 N- and D-ticked. **S2 done for the 2 pilot units 2026-10-29: Introduction to Biology (2 topics) + Biomolecules & Cell Biology (4 topics) filled to the Book-Grade Bar** — 8-section hierarchy, 3–4 classified tables with examples, 2 authored SVG + 2–3 curated figures per topic (all 14 curated figures license-verified from their Commons File: pages; SVGs embedded as fenced svg blocks per lib/content/visuals.ts), ≥7 worked examples, key terms, Exam Zone (mcs 12–15/topic with explanations, ≥5 short + ≥2 long NEB questions), rewritten summaries, sources cited (OpenStax Biology 2e, Raven, FAO, USGS, BioNumbers, CDC, MedlinePlus); all validity corrections from the unit card kept (mesosomes retired, 9+2, oogenesis 2–3 polar bodies, Down ~95%, insulin 1978/82, Hb 1.34 mL/g, mycoplasma 0.2–0.4 µm); no-removal proven (only deltas vs HEAD are S1 scaffold + card-documented pilot corrections); gates green (schema 3/3, content valid/broken 0, build parity OK, audit:scopes strict PASS, placeholder 0, thin 283→283); §9 checklist 6/6 N- and D-ticked. Plans: [biology-plan.md](biology-plan.md), [physics-plan.md](physics-plan.md), [chemistry-plan.md](chemistry-plan.md), [math-plan.md](math-plan.md), [english-plan.md](english-plan.md), [nepali-plan.md](nepali-plan.md); checklist generator: `node scripts/subject-plan-inventory.mjs`. Owner: platform owner.

Knowledge Validity Plan (2026-10-28): 🟡 In progress — validate every topic of every unit of all 6 subjects (116 units / 696 topics, Class 11 + 12) against research sources, repairing content in place without removing it. Plan + checklist: [KNOWLEDGE-PLAN.md](KNOWLEDGE-PLAN.md); progress ledger: [reports/knowledge-validation/ledger.md](reports/knowledge-validation/ledger.md). Pilot unit done 2026-10-28: Biology 11 `biomolecules-and-cell-biology` (4/696 topics, 15 claim families corrected across 13 content files). Next: Biology unit 2 (floral-diversity). Owner: platform owner.



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
| frontend pages (app router) | 197 |
| backend API modules / mounted /api groups | 47 / 46 |
| CI workflows | 7 |
| test files (frontend / backend) | 111 / 48 |
| content entries (authored / template) | 830 (824 / 6) |
| unclaimed note files | 119 |
| supplementary claims (template) | 2134 (662) |
| script files under scripts/ (mjs/cjs/js/py/ts) | 169 |
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
| 20 | Notes import & legacy migration | One searchable `/notes` archive; secondary imports hidden; canonical topic source selected by `duplicateType`; companion-only tabs and a non-duplicating canonical-source shortcut; every retired URL shape forwards to `/notes` | [notes/page.tsx](frontend/app/(app)/notes/page.tsx), [imported-notes.ts](frontend/lib/imported-notes.ts), [note-routes.ts](frontend/lib/note-routes.ts), [topic-vertical-notes.tsx](frontend/components/content/topic-vertical-notes.tsx), [content-tabs.tsx](frontend/components/content/content-tabs.tsx) | ✅ Live |
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
