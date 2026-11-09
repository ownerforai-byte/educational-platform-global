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

### Phase P0 — Surface-by-surface verdict (the audit) — DONE 2026-11-09

Machine pass shipped: `scripts/pro-surface-audit.mjs` (self-tested) +
`reports/pro-surface-verdicts.json` — 275 routes walked, classified into 10
domains, per-route signals (stub/redirect/client/discoverable), 0 stubs,
9 redirects. Render-audit queue ranked by navigation prominence.

Human pass complete for all 25 queue entries (Part E): **5 pro, 2
pro-leaning, 13 acceptable, 3 poor, 1 redundancy pair, 1 route-pair verdict**.
No surface was rated pro without evidence; no finding was invented.

- [x] Script the walk (`scripts/pro-surface-audit.mjs`, `--top N` queue).
- [x] Audit the 25 highest-prominence routes by reading their code, tests and
      state handling (browser pass remains open for pixel-level claims — every
      verdict here cites code + tests, never guessed visuals).
- [x] Redundancy map (below).
- [x] Verdict table published (Part E) + cross-cutting findings CC-1…CC-4.

#### Redundancy map (P0)

| Duplicate | Evidence | Recommendation |
|---|---|---|
| `/lab` vs `/lab/3d` | two hub implementations (694 vs 387 lines) | W6 consolidation spec; `/lab/3d` canonical for 3D |
| `/journal` vs `/r1/journal` | both mount separate UIs on the same `useR1Journal` API | one canonical journal; other becomes a redirect |
| Subject identity ×5 | `/subjects` hex, `ClassSubjectsGrid` config, `/ai` palettes, `/exam-countdown` hex, `/graphs` accents vs canonical `subject-visuals.ts` | CC-1: one `subjectVisual(slug)` everywhere |
| `/knowledge/*` vs corpus | 4 pages embed curriculum content in code | CC-4: migrate into `content/` |
| `/ai` 11 routes vs one chat | `/chat`, `/ai/*` tools, `/ask`, `/ai/workspace` overlap | W3 consolidation (already partially redirected) |

#### Ranked proposals (P0 → execution order)

1. ~~**Remove fabricated user counts** on `/ai` tool cards (CC-2)~~ — **SHIPPED
   `87ed2e65`** (2026-11-09): all 15 invented counts removed; footer shows the
   access gate only; 3/3 directory tests pass.
2. ~~**Rebuild `/subjects`**~~ — **SHIPPED `63417635`** (2026-11-09): fake
   120 ms stagger deleted, canonical tokens, fabricated Class 8–10 stub
   registry replaced by honest filters (11/12 only) + EmptyState, fake "New"
   badges gone, search button now links to `/search`; 4 new render tests.
3. ~~**Rebuild `/exam-countdown` date layer**~~ — **SHIPPED `fe57f73d`**
   (2026-11-09): AD dates as source of truth (BS label display-only), honest
   stale-calendar notice instead of an eternal "0 days left", coverage now
   reads the real journey API — the old page read the orphaned
   `neb-progress` localStorage key that NOTHING wrote, so coverage was
   permanently 0% for every student; subject tokens; no fake 999-day plan
   horizon; `/quiz` quick-link fixed to `/practice`; 4 new render tests.
4. ~~**Unify subject identity** (CC-1)~~ — **SHIPPED `d76327b1`** (2026-11-09):
   `ClassSubjectsGrid` color fields and the `/graphs` accent map now consume
   `subject-visuals.ts`; dead `glowColor`/`accentColor` fields removed;
   per-subject tagline/lab-link data retained. Remaining ad-hoc palettes:
   none for subject identity (the `/ai` chip palette is per tool-category,
   not per subject — legitimate).
5. **Migrate `/knowledge/*` embedded content** (CC-4) — OPEN, large: moves
   hand-authored Q&A from 4 page files into `content/` records rendered by
   the pipeline. Needs the content schema/doctor touched deliberately in its
   own session with `content:build:check` gates; not rushed alongside other
   work. Until migrated those pages stay demotion candidates.
6. **Journal dedupe** — OPEN, blocked on an owner parity decision: `/journal`
   (tier-gated, documented policy) vs `/r1/journal` (moods, R1 suite) are two
   UIs over the same `useR1Journal` API. Which is canonical?
7. **Lab-hub consolidation spec** (W6) — drafted below.

### W6 consolidation spec — lab hub (draft v1, 2026-11-09)

**Problem.** Two hubs serve one job. `/lab` (694 lines) hand-maintains its
sections — 87 title strings, 30+ lazy rig imports, calculators — while
`/lab/3d` (387 lines) derives everything from the lab manifest in syllabus
order. New labs must be registered twice or they appear in only one hub.

**Canonical surface.** `/lab/3d` — manifest-derived, already syllabus-ordered,
already the target of the home portal's "All 3D Labs" link.

**What `/lab` has that `/lab/3d` lacks** (must move before the redirect):
1. Calculators (Punnett square, population, photosynthesis, …) — lazy-loaded
   from `components/lab/biology-3d` and siblings. → New "Calculators & Tools"
   section on `/lab/3d`, driven by a small registry (slug, title, loader),
   NOT hand-written cards.
2. Practicals/theory links (`/lab/theory`) → keep as a section link on the
   consolidated hub.
3. Hand-curated groupings worth keeping → expressed as manifest metadata
   (`collection`/`tags` fields), never literal lists in the page.

**Rollout (each step its own commit, each green):**
1. Add the calculators/tools registry + section to `/lab/3d` (behind the same
   `minLevel: "plus"` gate both hubs share today).
2. Add manifest collection fields for any curated grouping that survives.
3. Turn `/lab/page.tsx` into a `redirect("/lab/3d")` — activity deep links
   (`/lab/[labId]/*`) are untouched; only the hub page moves.
4. Navigation: one entry ("3D Labs" → `/lab/3d`); remove the `/lab` entry from
   `lib/navigation.ts` + `site-index.ts`; dead-end ratchet covers the redirect.
5. Render tests: hub sections derive from the manifest (no hand-maintained
   title strings); calculators reachable from the canonical hub.

**Acceptance.** One lab hub in the nav; `/lab` forwards; calculators live on
the canonical hub; zero hand-maintained lab title strings in any hub page.

**Non-goals.** Activity pages, lab content, and the 3D rigs themselves are
untouched — this is hub-surface consolidation only.

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
| 4 | `/subjects` | **poor** | rebuild (W5 discovery) | Measured 2026-11-09: (a) FAKE staged loading — `setTimeout` reveals cards one-by-one at 120 ms (`loadProgress` counters), delaying real content up to ~720 ms per visit as performance theater; (b) hand-maintained `STUB_SUBJECTS` for Classes 8–10 duplicating the 239-block curriculum registry; (c) hardcoded hex gradients (`#3b82f6`…) violating the token system; (d) hardcoded `"New"` badge on every live card — meaningless decoration. Real progress ring + `useLiveStats` are the good bones. Decision: rebuild — kill the fake stagger, derive stubs from the curriculum registry, tokens for identity, honest badges. |
| 5 | `/class-11-notes` + `/class-12-notes` (subject grid) | **acceptable** | polish | Measured 2026-11-09: 13-line ISR page + 375-line `ClassSubjectsGrid` — syllabus-driven (unit counts, teaching hours), cross-links dock (Notes/Derivations/Proofs/Practicals/Labs), searchable unit directory. Issues: hand-maintained `SUBJECT_CONFIG` is a THIRD copy of subject identity (CC-1 below); search input lacks a programmatic label; zero render tests; whole grid is a client component so the page's ISR shell buys little. Decision: polish in P1 — consume `subject-visuals.ts`, label the search, add tests, evaluate server-rendering the static parts. |
| 6 | `/profile` | **acceptable** | refactor-later | Measured 2026-11-09: 1,236-line single-file client page (monolith — split candidate), but functionally strong: 10+ render tests (tabs, guest redirect, loading skeleton, XP/level, wallet parity), 12 aria/role attributes, real progress wiring. Decision: keep behaviour; split into tab modules during P1 component-kit work, not before. |
| 7 | `/chat` (Veer tutor console) | **acceptable** | keep + reach decision | Measured 2026-11-09: 40-line page → 1,592-line `TutorConsole`; labelled controls throughout (new chat, history, clear, pressed states, stop, send), subject-mode picker, per-answer quick actions, `?q=` deep-link handoff, no TODOs. NOTE: chat is OWNER-EMAILS-ONLY (metadata + layout bounce + API enforcement) — the flagship AI is invisible to every paying tier; product reach decision needed in W3. |
| 8 | `/ai/math` | **pro-leaning acceptable** | keep | Measured 2026-11-09: 376-line solver — syllabus presets, `MathMarkdown` rendering, step cards, spark/guest-quota integration, `reportClientError` on failure, copy + reset actions. No fake data. Decision: keep; fold into W3 AI consolidation as the canonical math mode. |
| 9 | `/derivations` | **pro** | keep | Measured 2026-11-09: 27-line server page over the theorem registry — honest `available vs total` counts per track, official curriculum order, metadata + ISR hygiene. The bar other hubs should meet. |
| 10 | `/exam-countdown` | **poor** | rebuild date layer | Measured 2026-11-09: (a) BS→AD conversion is `year − 57` approximation — BS month lengths vary, so day-level countdowns can drift; (b) hardcoded `EXAM_DATE` map with an in-code "update each year" reminder — a maintenance trap that silently goes stale; (c) `SUBJECT_COLOR` hex map is a FOURTH copy of subject identity — in a file that already imports `getSubjectVisual` three lines above it. Good bones: syllabus-driven unit progress, localStorage persistence. Decision: rebuild the date layer (real BS conversion or owner-configurable exam calendar) + tokens; fold into W4. |
| 11 | `/goals` | **acceptable** | keep | Measured 2026-11-09: 173-line page over the shared `study-goals.ts` store; covered by the study-views test family. No findings. |
| 12 | `/journal` | **pro** | keep | Measured 2026-11-09: honest tier policy documented in-file (locked card routes to `/plans` instead of hiding), real R1 journal API hooks, one-entry-per-day rule. Model demotion-done-right for other surfaces. |
| 13 | `/legend` | **acceptable** | keep | Measured 2026-11-09: server-rendered over `getLegendIndex` with real totals; designed `EmptyState` when no content (the Construction icon here is the empty-state convention, not a stub page). |
| 14 | `/progress` | **acceptable** | keep | Measured 2026-11-09: 22-line page → `ProgressPanel`; thin-wrapper pattern done right. |
| 15 | `/pyqs` | **pro** | keep | Measured 2026-11-09: server page over `SYLLABUS` + `getSubjectPyqBank`; counts (questions/years/units) derived from the same bank the reader serves — the comment explicitly pins count/source parity. |
| 16 | `/streaks` | **acceptable** | keep | Measured 2026-11-09: 11-line page → `StreaksView`; covered by study-views tests; achievements rules are derived, nothing stored (honest by construction). |
| 17 | `/ai-quiz` | **pro-leaning acceptable** | keep | Measured 2026-11-09: 44-line page → `QuizStudio` (dedicated format + studio test files); five formats, syllabus-scoped, AI-graded feedback. Fold into W3. |
| 18 | `/graphs` | **acceptable** | polish | Measured 2026-11-09: registry-driven (`ALL_GRAPHS`, classified by basis/meaning/special cases), `GraphSketch` renderers. `SUBJECT_ACCENT` is a FIFTH subject-color copy (CC-1) — tailwind classes at least, not hex. |
| 19 | `/knowledge/numerical-physics` | **poor** | migrate content to corpus | Measured 2026-11-09: hand-authored physics Q&A HARDCODED in the page file (`TOPICS` array with steps/answers) — outside the content pipeline: no schema validation, no doctor, no coverage counting, invisible to search indexing by corpus. Same pattern in `/knowledge/numerical-chemistry` (12 embedded blocks), `/knowledge/grammar`, `/knowledge/byakaran` (CC-4). Decision: migrate to `content/` + render via the pipeline; until migrated, demote behind the small button per Part C rule 2. |
| 20 | `/owner` console (10 routes) | **acceptable** | keep | Measured 2026-11-09: self-gating `owner/layout.tsx` (`useSession` + `isOwnerUser` + verifying state), 10 sub-pages (largest 964 lines), honest dead-link fixes documented in-code. Internal tool — polish budget belongs to student surfaces first. |
| 21 | `/owner/users` | **acceptable** | keep | Measured 2026-11-09: 964-line admin table behind the owner gate; backend-enforced data access. Split-into-modules candidate only if it keeps growing. |
| 22 | `/r1` (hub + 5 sub-routes) | **acceptable** | keep + dedupe | Measured 2026-11-09: clean modular composition (`PlatformOverview`, `TimeTrackerCard`, `TodayPanel`), 6 routes. REDUNDANCY: `/journal` and `/r1/journal` are two separate UIs over the SAME `useR1Journal` API — pick one canonical journal surface (W4). |
| 23 | `/search` | **pro** | keep | Measured 2026-11-09: single documented search surface (global bar, footer, mobile quick nav all route here); `/ai/search` already redirects; SmartSearchPanel spans notes/labs/graphs/practicals/PYQs/derivations with honest "links, not summaries" positioning. |
| 24 | `/about` | **pro** | keep | Measured 2026-11-09: shared `PublicPage` system, and the copy itself states the honesty bar: "There are no invented team profiles or success statistics here." The exact standard `/ai`'s fake user counts violate. |

### Cross-cutting findings (P0 by-products, each becomes P1/P3 work)

- **CC-1 — Subject identity is hand-defined N times.** `lib/ui/subject-visuals.ts`
  is the canonical per-subject visual identity, but at least three surfaces
  re-invent it: `/subjects` (raw hex gradients), `ClassSubjectsGrid`
  (`SUBJECT_CONFIG`), `/ai` tool cards (ad-hoc icon palettes). P1 fix: one
  `subjectVisual(slug)` consumed everywhere; a test forbids new copies.
- **CC-2 — Fabricated metrics displayed as fact.** `/ai` tool cards show
  invented `users:` counts. No analytics pipeline exists. P1 rule: a number
  shown to a student must come from a real source or not be shown.
- **CC-3 — Performance theater.** `/subjects` fakes progressive loading with
  timers. Pro apps show real content as fast as possible; skeletons only while
  genuinely awaiting data.
- **CC-4 — Content embedded in page code.** The `/knowledge/*` special pages
  hand-author curriculum content as `const` arrays inside `page.tsx`
  (numerical-physics, numerical-chemistry, grammar, byakaran). It bypasses the
  content pipeline's schema validation, doctor, coverage counting and search
  indexing — two sources of truth for curriculum content. P3 fix: migrate to
  `content/` records rendered by the pipeline; until then these pages are
  demotion candidates.

---

## Definition of done (this plan)

- Every surface in Part A has a verdict + decision with evidence.
- No surface rated below `acceptable` is reachable at top level without its
  small-button demotion.
- The 25 highest-traffic surfaces pass the design-system + state + a11y bars.
- The gates in P5 are green in CI.
