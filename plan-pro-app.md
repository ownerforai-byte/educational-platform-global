# PLAN — The Pro App Upgrade (inventory → verdict → rebuild)

> Added 2026-11-09. Owner directive: "make its working, presentation and each
> minor a pro app." Nothing currently shipped is permanent — any surface rated
> below the pro bar is a rebuild candidate, not a fixture. Unfinished or weak
> surfaces must never sit at top level: they open behind **one small button**
> until they are rebuilt (progressive disclosure is the honesty mechanism).
>
> This plan does not replace `plan.md` § Pro Upgrade Plan (8 phases,
> infra-focused); it sits above it and governs the PRODUCT surface. Where the
> two overlap, the stricter rule wins.

---

## Part A — The Diversity Inventory (everything the platform has)

Measured 2026-11-09 from the registries (`navigation.ts`, `site-index.ts`,
`syllabus.ts`, route tree, `reports/`). 275 route pages, 169 nav hrefs,
~8,800 files (95% content corpus).

### A1. Learning core (the product's heart)
| Surface | Where | Scale | Notes |
|---|---|---|---|
| Class 11/12 notes | `/class-11-notes/*`, `/class-12-notes/*` | 6 subjects × units × **689 syllabus topics** | topic-vertical-notes is the single theory surface |
| Topic exercises | `.../topics/[topicSlug]/exercises/*` | per topic | |
| PYQs | `/pyqs`, subject browsers | bank-wide | 43 gaps flagged `sourced-pending` |
| Formula sheets | `/formulas/[subject]/[unit]` | per unit | |
| Mindmaps | `/mindmap`, per subject | 269 structure + 64 mechanism + … | depth-pack validated |
| Theorems | `/theorems/[class]/[subject]/[topic]` | | |
| Derivations | `/derivations/[class]/[subject]/[topic]` | | |
| Graphs | `/graphs`, `/science-graph-bank` | | |
| Practicals | `/practical/[subject]/[experiment]` | | |
| Syllabus browser | `/syllabus`, `/syllabus/[subject]/year/[year]` | official NEB | single source: `syllabus.ts` |
| Levels tree | `/levels/**` (6 deep) | Grades 1–12, 239 blocks | tranche-2 content mostly empty |
| Legend (visual glossary) | `/legend/**` | | |
| Knowledge specials | `/knowledge/*` (analytical-geometry, diagrams, grammar, byakaran, numerical-chem/phys, writing, pro) | 8+ surfaces | overlapping entry points |
| Loksewa / world knowledge | `/loksewa/*`, `/world-knowledge/*` | 5 surfaces | |
| Resources & PDFs | `/resources/*`, `/pdfs/*`, `/downloads` | | |

### A2. 3D & visual learning
| Surface | Where | Scale |
|---|---|---|
| Lab hub + filters | `/lab`, `/lab/3d` | **527 manifest activities** (346/689 topics covered) |
| Canonical activity page | `/lab/[labId]` | one URL scheme, legacy redirects |
| Topic visuals | lazy chunks | 453 visual-index entries; Three.js in 27 lazy chunks only |
| Theory hub | `/lab/theory` | 40 theory activities |
| Organelles / periodic table | `/lab/bio-3d-organelles`, `/periodic-table` | |

### A3. AI — Veer + study engines
| Surface | Where |
|---|---|
| Veer chat | `/chat` (+ `/chat/grammar`, `/chat/nepali` consoles) |
| Deep dive | `/ai/deep-dive` |
| Diagrams | `/ai/diagrams` |
| Math | `/ai/math` |
| AI quiz engine | `/ai-quiz`, `/ai/quiz`, `/ai-quiz/history` |
| AI search | `/ai/search` |
| Subjects browser | `/ai/subjects`, `/ai/subjects/[subject]` |
| Tutor / workspace | `/ai/tutor`, `/ai/workspace`, `/ai/history`, `/ai` |
| Ask | `/ask` |
| Backend | provider chain w/ failover, citations, regression set (120 items), spark/credit gates |

### A4. Practice & assessment
`/practice`, `/practice/[subject]`, `/practice/session`, `/quiz/[subject]/[unit]`,
`/results/[sessionId]`, `/mock-exams`, `/leaderboard`, `/srs` (SM-2 flashcards),
`/analytics`, `/report-card`, `/exams/{neb,cee,ioe}/model-questions`, `/revision`,
`/exam-countdown`.

### A5. Progress & motivation
`/dashboard`, `/progress/**`, `/goals`, `/planner`, `/schedule`, `/streaks`,
`/achievements`, `/journal`, `/certificates` (stub-class), `/my-notes`,
`/bookmarks`, `/r1/**` (activities, habits, journal, plans).

### A6. Community & social
`/community`, `/community/[id]/[threadId]`, `/announcements`, `/feedback`,
`/referrals` (placeholder), `/network`.

### A7. Platform & trust
Tiers `visitor→member→plus→pro→owner` with per-tier home interfaces; credits +
`/billing`; `/plans`; owner console (`/owner/*` — 10 routes); PWA (install
prompt, SW precache, offline pack); `/search`; `/site-index`; `/status`,
`/changelog`, `/help/*`, `/legal/*` (8); public marketing layer (`/about`,
`/features`, `/blog/*`, `/school`, `/neb-updates`, `/contact`, `/how-it-works`).

### A8. Content corpus (the moat)
8,800+ files: bilingual notes (Nepali + English), concepts, PYQ banks, drills,
mindmaps, rail cards, OCR/KB corpora, curriculum scaffold for 239 blocks.
Content pipeline: build + doctor + schema + corpus gates (all green).

---

## Part B — What "pro" means here (the bar every surface is judged against)

1. **Working** — the feature does its real job end-to-end: no stub states
   presented as features, no fake data, errors recoverable, loading instant
   feedback, keyboard + touch operable.
2. **Presentation** — one design system everywhere: shared tokens, spacing,
   type scale, motion, iconography; every state (empty / loading / error /
   success / offline) designed, never default; dark mode coherent.
3. **Minor details** — focus rings, scrollbars, 404s, transitions, copy tone,
   number/date formats, Devanagari rendering, favicon/OG images, skeleton
   loaders, toasts — the last 5% that separates "works" from "professional".
4. **Honesty** — a surface that is not pro yet is labeled and tucked away
   behind one small button, never dressed up as finished.

---

## Part C — Operating principles (owner directives, binding)

1. **Nothing is permanent.** Any existing implementation may be replaced if it
   rates below the bar. No sunk-cost protection: "it exists" is not an argument.
2. **The small-button rule.** A weak or unfinished surface is DEMOTED, not
   featured: one small entry button (labeled, honest) from wherever it is
   reachable today; the prime placement goes to the best surface for that job.
   Rebuilt surfaces earn their placement back.
3. **One job, one best surface.** Where several surfaces serve one job
   (e.g. `/knowledge/*` entry points, the 11 AI routes, three quiz entries),
   the audit picks the canonical one; the rest redirect or demote.
4. **Measure, then rebuild.** Every verdict carries evidence (route walk,
   render test, screenshot, bundle number). A rebuild ships with tests.
5. **Phase-scoped commits, `npm run check` scoped, `check:all` before main.**

---

## Part D — The Pro Plan (phases)

### Phase P0 — Surface-by-surface verdict (the audit)
For every row in Part A: walk the route (render test or browser), judge
against Part B, and record a one-line verdict in
`reports/pro-surface-verdicts.json` + a human table here:

`verdict: pro | acceptable | poor | stub` + `evidence` + `decision:
keep | polish | rebuild | demote-behind-button | merge-into:<canonical>`.

- [ ] Script the walk: reuse `scripts/dead-end-ratchet.mjs` pattern to
      enumerate routes + detect stub/under-development shells automatically.
- [ ] Render-audit the 25 highest-traffic routes (home tiers, notes topic
      page, lab hub, chat, quiz, practice, dashboard, search) with render
      tests + screenshots; verdict each.
- [ ] Redundancy map: same job served by several routes (AI entries,
      knowledge entries, quiz entries, community vs ask, journal vs r1/journal).
- [ ] Publish the verdict table in this file (Part E fills as results land).

### Phase P1 — One design system, everywhere
- [ ] Audit tokens: one spacing/type/color scale in `styles/tokens.css` (or
      Tailwind config) consumed by ALL surfaces; no ad-hoc hex/px in
      components (lint rule or codemod).
- [ ] Component kit: buttons, cards, tabs, drawers, tables, toasts, skeletons
      — one implementation each; duplicates replaced.
- [ ] Every list surface gets skeleton loaders; every async action gets
      pending/success/error states; every empty state gets designed copy.
- [ ] Dark mode + Devanagari typography pass across the kit.
- [ ] Motion: consistent transitions (150–250 ms), reduced-motion honored.

### Phase P2 — Progressive disclosure demotion (the small-button pass)
- [ ] Apply verdicts: `poor`/`stub` surfaces get one small labeled button at
      their current entry points; prime slots go to the canonical surface.
- [ ] Demote-and-label list maintained in `reports/pro-demotion.json`; the
      dead-end ratchet extended to fail CI if a demoted surface reappears at
      top level before its rebuild lands.
- [ ] Every demotion is honest: the button label says what it is
      ("Experimental", "Coming together") — never fake-complete.

### Phase P3 — Rebuild the poor surfaces (per-domain workstreams)
Order by traffic × verdict severity; each workstream: spec → rebuild → tests →
re-verdict → earn placement back.
- [ ] W1 Notes reading experience (topic page: typography, TOC, progress,
      next/prev, math rendering, offline).
- [ ] W2 Practice → quiz → results loop (one flow, instant feedback,
      explanations, SRS hand-off).
- [ ] W3 AI surfaces consolidation (11 routes → canonical chat + tool modes;
      history unified).
- [ ] W4 Dashboard/progress (one truthful progress model across
      dashboard/progress/report-card/analytics).
- [ ] W5 Search & discovery (one search entry, consistent result cards).
- [ ] W6 Lab/3D polish (hub cards, activity page chrome, phone controls).
- [ ] W7 Community + announcements (if retained after verdict).

### Phase P4 — The minor-details pass (pro polish)
- [ ] 404/500 pages, redirect hygiene, canonical URLs, OG images per surface.
- [ ] Focus management, skip links, axe a11y gate in CI.
- [ ] Copy tone pass (bilingual consistency), number/date/units formats.
- [ ] Perf budgets enforced per route (first-load JS), Lighthouse CI once an
      approved test account exists.

### Phase P5 — Gates so it stays pro
- [ ] `pro-verdicts` CI check: no route regresses verdict without a plan entry.
- [ ] Visual regression on the 25 audited routes.
- [ ] Design-system lint (no raw colors/px outside tokens).

---

## Part E — Verdict table (filled by Phase P0)

Render-audit queue (top 25 by navigation prominence, `scripts/pro-surface-audit.mjs --top 25`).
Auth note: only `/home`, `/plans`, `/onboarding` are public inside the shell; gated
surfaces are audited by render tests with a mocked approved session (repeatable in CI).

| # | Surface | Verdict | Decision | Evidence |
|---|---|---|---|---|
| 1 | `/ai` (AI Studio) | **acceptable** | polish | Measured 2026-11-09: 53-line page + 376-line directory, a11y-correct filter tabs (`aria-pressed`, labelled group), proper locked-card state (grayscale + `aria-disabled` + tier label), focus rings present, 3 render tests. **Must-fix honesty violation:** fabricated `users: "580"`-style counts displayed on tool cards — no analytics source exists (plan Phase 8 pending); social proof invented. Also: ad-hoc icon palettes (`bg-orange-100…`) instead of the canonical `lib/ui/subject-visuals.ts` identity. Decision: remove fabricated counts (or wire real data), align icon colors with the token system, then re-verdict. |
| 2 | `/home` (tier feed + guest home) | **acceptable** | keep | Measured 2026-11-09: 18-line page delegating to `TierHomeRouter` — first-paint tier resolution with documented cold-start fix (guest renders instantly, signed-in splash), semantic sections (`aria-labelledby`), min-h-11 touch targets, focus rings, honest access notice, visitor chat. 5 tier-surface render tests + rail tests. Polish candidate (non-blocking): brand the hydration splash instead of a bare spinner. |
| 3 | `/lab` vs `/lab/3d` (two lab hubs) | **redundancy found** | merge-spec in W6 | Measured 2026-11-09: `/lab` = 694-line legacy hub, 30+ lazy rig imports, hand-maintained section cards (87 title strings); `/lab/3d` = 387-line manifest-derived hub (Phase 3 of the 3D plan), syllabus-ordered units, no fake slugs. Same job, two implementations — the exact pattern the 3D-system plan exists to remove. `/lab` also hosts the calculator dashboard `/lab/3d` deliberately excludes. Decision: W6 workstream writes the consolidation spec (canonical `/lab/3d` + `/lab` as calculators/practicals dashboard or a redirect); until then both stay live, no deep link breaks. |

---

## Definition of done (this plan)

- Every surface in Part A has a verdict + decision with evidence.
- No surface rated below `acceptable` is reachable at top level without its
  small-button demotion.
- The 25 highest-traffic surfaces pass the design-system + state + a11y bars.
- The gates in P5 are green in CI.
