# plan.md — Agent resume & knowledge base

> **RESUME PROTOCOL:** if the session was restarted, read THIS file fully first.
> Section 0 is a pick-your-task index: find what you must do → jump to the section
> that says WHAT, WHERE (exact paths), WITH WHICH (tools/patterns/conventions) and
> FOR HOW MUCH (scope + acceptance criteria). Never bulk-read the repo.

**Plan file path:** `C:\Users\ASUS\Desktop\rn\plan.md` (repo root, `plan.md`)

---

## §0 Task index — pick what you need

| If your task is… | Go to | Key paths |
|---|---|---|
| Continue the DocView + SVG figures feature | **§5** | `frontend/features/docs/` |
| Author more topic diagrams (Phase 2) | **§6.1** | `frontend/features/docs/figures/` |
| Add auto-visuals for unregistered topics (Phase 3) | **§6.2** | `frontend/features/docs/` |
| Author/fix curriculum content (exam tricks, keyPoints, PYQs) | **§9.2** | `content-tools/enhancers/` |
| Fix a broken concept JSON | **§9.2** | `content/notes/concepts/...` |
| Verify legend gaps / content coverage | **§9.3** | gap-scan loop ( archived) |
| Run validation before push | **§7** | `npm run check:all` |
| Understand repo layout / find a route | **§8** | `CORE_FILES.md`, graphify |
| Know what's already done (don't redo it) | **§4** | commit ledger |
| Know which files NOT to touch (parallel agent) | **§2.3** | — |
| Windows/tooling gotchas | **§2.4** | — |
| Understand concept-JSON fields | **§9.1** | — |
| Rename/copy sweeps across the UI | **§9.4** | registries in §8 |

---

## §1 Mission & repo map

NEB (Nepal education board) learning platform. Next.js 16 (Turbopack) frontend in
`frontend/`, NestJS/Express backend in `backend/`, curriculum corpus in `content/`
(~8,800 files total, 696 syllabus topics). Owner-driven campaigns, executed across
agent sessions:

1. ✅ Remove all dummy/filler content (placeholder text, "coming soon" dead-ends, dead code).
2. ✅ Author real exam shortcuts + time-savers + practice questions for **all 696
   syllabus topics** (0 gaps verified).
3. ✅ Rename all user-facing "Motion Graphics"/"Simulation" → "Video".
4. ✅ Prerender all legend pages as static HTML incl. Devanagari Nepali slugs.
5. 🔨 **ACTIVE:** DocView — convert tab JSON content into a proper document with
   inline SVG visuals (this is §5).
6. ⏳ Backlog phases (§6): more diagrams, auto-visuals, open-license photos.

Git remote: `https://github.com/ownerforai-byte/educational-platform-global.git`.
`main` is the only deployable branch.

---

## §2 Golden rules & hazards

### §2.1 Non-negotiable repo rules
1. **No cold-reading.** `CORE_FILES.md` is the architecture/route registry. Use
   `graphify query "<question>"` for orientation; read only the file you will edit.
2. **Never bulk-read** `content/**`, `backend/kb/**`, `backend/.ocr-v2/**`,
   `frontend/public/data/**` — learner payloads, not documentation.
3. **Syllabus ordering is sacred:** content maps to the official NEB 2076/2078
   curriculum order via `frontend/lib/core/syllabus.ts` (`SYLLABUS`,
   `slugifySyllabusTopic()`). Never reorder/rename units; never create
   free-floating content.
4. **Exact-slug registries only.** Any slug→asset map (TopicVideo, figures) uses
   exact slugs from `slugifySyllabusTopic()` — no fuzzy/substring matching.
   Guard with a test (model: `frontend/tests/features/topic-video.test.ts`).
5. **Owner mandate "under progress — will be added in a future update":** honest
   empty-states where data genuinely doesn't exist; but authored data sitting
   unwired must be wired.
6. **Never fabricate curriculum content.** If unsure of a fact, author around it
   (exam technique, structure) rather than invent facts.

### §2.2 Git discipline
- `BRANCHES.md`: `npm run check:all` **mandatory** before pushing `main`.
  Never touch `agents/*`, `claude/*`, `worktree/*` branches; no force-push.
- **Commit only your own files, staged by explicit path.**

### §2.3 Parallel-agent hazard (ACTIVE)
Another agent works in this same working tree. **NEVER commit these files:**
```
backend/src/api/social/leaderboard.controller.ts
frontend/app/(app)/exams/ioe/page.tsx
frontend/app/(app)/leaderboard/page.tsx
frontend/app/(app)/levels/page.tsx
frontend/app/(app)/loksewa/page.tsx
frontend/lib/api/leaderboard.ts
frontend/lib/hooks/use-leaderboard.ts
frontend/components/leaderboard/          (untracked dir)
frontend/public/ad-p-table.html
frontend/public/css/                      (untracked dir)
frontend/public/engineering.html, ioe.html, loksewa.html   (untracked)
reports/visual-topic-coverage.json, reports/lab-manifest-coverage.json
```
Exception: `frontend/lib/deploy-version.ts` is regenerated deterministically by the
`prebuild` hook (`node scripts/bump-deploy-version.mjs`) — safe to commit.
A dev server runs on port 5173 (`next dev --webpack`) owned by the parallel agent —
**do not kill it**; use another port for your own server.

### §2.4 Windows / tooling gotchas
- **Large `write()` calls get truncated** (~output limit). Split big files into
  parts; verify each with `node -e "JSON.parse(...)"` (JSON) or
  `npx tsc --noEmit` (TS) after writing.
- **sed `&` hazard:** `&` in the replacement expands to the matched text — use the
  edit tool for strings containing `&`.
- Temp scripts in `frontend/` must be `.ts` (`.mts`/`.tsx` → ERR_UNKNOWN_FILE_EXTENSION);
  run with `npx tsx` from `frontend/` for `@/` alias resolution.
- Python one-liners need `encoding='utf-8'` for Devanagari output.
- CRLF warnings on `git add` are normal.
- "Another next build process is already running" → find the orphaned
  `npm run build` node process (`Get-CimInstance Win32_Process`), kill **only** that
  PID tree, `rm -f frontend/.next/lock`, rerun.
- `/tmp` fails in node on this box — use relative `.tmp-*` paths, then delete them.

---

## §3 Command cheatsheet

```bash
# validation gates (repo root)
npm run check            # scoped check — run after every change
npm run check:all        # FULL gate, mandatory before pushing main (~10-20 min)
npm run build            # frontend prod build ~5 min (4,063 static pages)

# frontend tests
cd frontend && npx vitest run tests/features/topic-video.test.ts
cd frontend && npx tsc --noEmit                    # type check

# graphify (orientation, no LLM needed)
graphify query "<question>"
graphify path "<A>" "<B>"; graphify explain "<symbol>"; graphify god-nodes

# content enhancer runner (see §9.2)
node content-tools/enhancers/enhance-legend-gaps.cjs content-tools/enhancers/legend-gap-content-*.json

# own dev server (NOT port 5173 — that belongs to the parallel agent)
cd frontend && npx next dev -p 5199
```

---

## §4 Done ledger (do NOT redo)

| Campaign | Commit(s) | State |
|---|---|---|
| Dead code removal (under-development components, motion-graphics folder) | in `43af3415` era | ✅ |
| Motion Graphics/Simulation → Video rename (~30 surfaces) + TopicVideo for 14 topics | `85291af4` + earlier | ✅ test-guarded |
| Gate repairs (tier-welcome test, master-prompt cap 71k) | `85291af4` | ✅ |
| Legend wiring: parser fields + 3 dead sections render | `43af3415` | ✅ |
| Legend matcher fix (exact + token-overlap ≥0.5, no first-topic fallback) | `43af3415`/`bdd11781` | ✅ |
| Legend gap content: 30 dictionaries + generic runner; **0/696 gaps** | `bdd11781` | ✅ |
| `slugifyFileName` Devanagari fix (Nepali slugs were collapsing to "01") | `bdd11781` | ✅ |
| Legend SSG prerender (708 HTML files incl. Devanagari) | `dec53015` | ✅ |
| DocView Phase 1: doc-parser + 6 SVG figures + registry (7 verified slugs) + TopicDocView wired into notes tab + 7-test suite; npm run check PASS | this commit | ✅ |
| Theorems verified 200/200 curated proofs, 0 broken links | verified | ✅ |
| DocView foundation: `doc-parser.ts` + `figures/registry.ts` written | uncommitted | 🔨 in progress |

**Pushed `origin/main` at time of writing:** `dec53015` (parallel agent may have
added commits after — always `git fetch` + `git log origin/main -3` first).

---

---

## §5 ACTIVE FEATURE: DocView + SVG figures

### §5.1 WHAT
Replace the topic page **Notes tab's** stacked word-cards ("Idea 1 of N") with a
**proper document**: header (title, class/subject chips, reading time, source),
mini TOC, then five sections:

| # | UI label | Anchor id | Content |
|---|---|---|---|
| 1 | Big picture | `#doc-overview` | summary, concept roadmap, universal facts |
| 2 | The explanation | `#doc-explain` | parsed notes as doc flow + inline SVG figures |
| 3 | Key terms & formulas | `#doc-remember` | keyPoints, formulas, memory shortcuts |
| 4 | Watch out | `#doc-traps` | confusions, special notes, entrance traps |
| 5 | Practice | `#doc-practice` | practiceQuestions numbered (MCQs stay in their own tab) |

The tab itself stays **"Notes"** (id `notes`) — DocView is the presentation inside
it. All other tab sections (mcq/numericals/entrance/self-check) remain untouched.

### §5.2 Visual policy (decided with owner)
- **Primary:** hand-authored SVG components — theme-aware (`stroke="currentColor"`
  + Tailwind `text-*` classes), precise, no licensing risk.
- **Allowed when SVG can't do it:** Wikimedia Commons open-license photos (CC-BY,
  attribution in caption), downloaded into `frontend/public/figures/` — never hotlinked.
- **Never:** Google Images scraping/hotlinking (copyright) — explicitly ruled out.

### §5.3 WHERE — architecture & status
```
frontend/features/docs/
├── doc-parser.ts          ✅ DONE — parseNote/parseNotes/readingMinutes.
│                          DocSegment = definition | paragraph | displayMath | list.
│                          BOLD_LEAD strips trailing colon from the term.
├── figures/
│   ├── registry.ts        ✅ DONE — REGISTRY: exact topic slug → { title, figures[] }.
│   │                        TopicFigure = { Component, caption, alt,
│   │                        afterNoteIndex? | keyword? }. getTopicFigures(slug)
│   │                        exact-match only; registeredFigureSlugs() for tests.
│   │                        Slugs verified against slugifySyllabusTopic() output
│   │                        (the originally guessed slugs were WRONG — see table).
│   ├── snells-law-ray-diagram.tsx   ✅ DONE
│   ├── ohms-law-circuit.tsx         ✅ DONE
│   ├── ionic-covalent-bonding.tsx   ✅ DONE (used by BOTH ionic and covalent topics)
│   ├── energy-flow-ecosystem.tsx    ✅ DONE (replaces planned photosynthesis-flow:
│   │                        no photosynthesis topic exists in the NEB syllabus)
│   ├── derivative-tangent-line.tsx  ✅ DONE
│   └── wave-properties.tsx          ✅ DONE (wave anatomy + Huygens wavefronts)
└── doc-view.tsx           ✅ DONE — <TopicDocView> document renderer.
```

**Registered figure targets** (all verified via `npx tsx` over SYLLABUS +
slugifySyllabusTopic — the guessed slugs in the earlier revision were wrong):

| topic slug | subject | figure | anchor |
|---|---|---|---|
| `laws-of-refraction-refractive-index` | physics 11 | Snell's-law ray diagram | keyword "Snell" |
| `ohm-s-law-electrical-resistance-resistivity-conductivity` | physics 11 | Ohm's-law circuit | keyword "Ohm" |
| `wavefront-and-huygens-principle` | physics 12 | wave anatomy + wavefronts | keyword "wavefront" |
| `ionic-bond-and-its-properties` | chemistry 11 | ionic vs covalent | keyword "transfer" |
| `covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds` | chemistry 11 | ionic vs covalent | keyword "shared" |
| `ecological-pyramids-and-energy-flow` | biology 12 | ecosystem energy flow | keyword "energy" |
| `geometric-interpretation-tangent-and-normal` | math 12 | tangent/normal | keyword "tangent" |

### §5.4 WITH WHICH — conventions
**SVG figures:** one component per file, `export function Name({ className })`;
root `<svg viewBox="0 0 W H" className={className}>`; labels `font-size` 11–13,
`fill="currentColor"`; colors via Tailwind classes (`text-primary`, `text-rose-500`,
`text-emerald-500`) — never hardcoded hexes that break dark mode. Physics/chem
accuracy is mandatory (angles, labels n₁/n₂/i/r, arrow directions) — study material.
Each file ≤ ~120 lines; one `write()` per file.

**DocView:** props `{ classSlug, subjectSlug, unitId, topicSlug, topicTitle, data }`
— `data` is the concept JSON **already loaded** by TopicVerticalNotes (pass
`activeData` down; do NOT re-fetch). Parse notes with `parseNotes()`; render
`definition` → term+body block with left accent border; `displayMath` → centered
card with `<MathMarkdown>` (check props in `frontend/components/content/math-markdown.tsx`
first — it handles inline `$...$` and `**bold**`); `paragraph` → prose;
`list` → styled ul. After note block i, inject any registry figure with
`afterNoteIndex === i` or first `keyword` match on note i's text, as `<figure>`
with caption. Reuse styling vocabulary (rounded-3xl cards, section headers) but as
a continuous document.

**Wiring (in `frontend/components/content/topic-vertical-notes.tsx`, 946 lines):**
the default `section === "notes"` return at the bottom is the target. Keep:
periodic-table banner, `noteLoadFailed` message, `VisualWorkspace`, and all other
sections. Preferred: replace the whole four-pass layout with TopicDocView fed by
the already-computed arrays. Minimal-risk fallback: swap only the
"2. Understand the explanation" body for TopicDocView's explanation flow.

### §5.5 FOR HOW MUCH — status (all steps DONE except final push)
1. ✅ 6 figure components created; `npx tsc --noEmit` clean.
2. ✅ `doc-view.tsx` created — five sections `#doc-overview` / `#doc-explain` /
   `#doc-remember` / `#doc-traps` / `#doc-practice`, header with read-time +
   mini TOC, figures injected per `keywordAnchor` (first note containing the
   keyword; `afterNoteIndex` wins if set).
3. ✅ Wired into topic-vertical-notes.tsx: four-pass layout REPLACED by
   `<TopicDocView data={docData} />`; kept periodic-table banner,
   `noteLoadFailed`, VisualWorkspace, FactBank, NoteBlocks. `docData` useMemo
   MUST stay above ALL early returns (hook-order rule — moving it after
   `if (loading)` broke the render; already fixed, keep it before `if (loading)`).
   Dropped from notes tab: four-pass nav + concept-check quiz (quiz still lives
   in the self-check tab).
4. ✅ `tests/features/topic-doc-view.test.tsx` — 7 tests: registry slugs exist
   exactly in syllabus; entry shape; parseNotes definition/displayMath/minutes;
   figure renders on match; graceful empty-data render. Also updated
   `tests/components/content/topic-learning-sections.test.tsx` (old four-pass
   heading assertion → new doc heading).
5. ✅ `npm run check` PASS (24 test files green, hydration div-in-p fixed in
   definition Segment). Remaining: `npm run check:all` → commit own files →
   push `main`.
6. File classifications: plan.md + topic-vertical-notes.tsx +
   topic-learning-sections.test.tsx = [IMPORTANT CORE FILE];
   `frontend/features/docs/**` + `frontend/tests/features/topic-doc-view.test.tsx`
   = [IMPORTANT CORE FILE] (feature code, not learner payloads).

---

## §6 Backlog phases

### §6.1 Phase 2 — batch diagrams (30–50 total)
High-traffic topics first: chemistry (periodic trends, hybridization, electrochem
cells), physics (lenses/mirrors, AC circuits, EM induction), biology (cell, genetic
crosses, nutrient cycles), math (unit circle, conics, integration areas).
Per diagram: 1 component + 1 registry entry (exact slug) + test green.

### §6.2 Phase 3 — auto-visuals for unregistered topics
Generic mind-map SVG generated client-side from `keyPoints`/`importantConcepts`
(already-loaded JSON), clearly styled as "auto summary diagram" — so no topic is
visually bare.

### §6.3 Open-license photos
Only on owner request: download into `frontend/public/figures/photos/` +
`CREDITS.md` (author, license, source URL).

---

## §7 Validation & definition of done

```bash
npm run check          # after every change (scoped)
npm run check:all      # MANDATORY before pushing main
npm run build          # ~5 min, 4,063 static pages
```

**DocView DoD:** 6 figures exist & compile · registry exact-slug test green ·
registered topic renders doc+figure · unregistered topics graceful · other tabs
untouched · check:all PASS · pushed · report with classifications.

**Every turn ends with a visible status** (done / blocked+why / failing step) and
file classifications: **[IMPORTANT CORE FILE]** vs **[CONTENT FILE]**.

---

## §8 Repo path reference (the ~30 files that matter)

| Path | Role |
|---|---|
| `CORE_FILES.md` | authoritative architecture/route registry — read first |
| `AGENT_RULES.md` | curriculum ordering, auth/security rules |
| `BRANCHES.md` | branch policy; check:all before main |
| `frontend/lib/core/syllabus.ts` | `SYLLABUS` (696 topics), `slugifySyllabusTopic()` |
| `frontend/lib/legend.ts` | legend index (memoized), `findSyllabusTopic`, `slugifyFileName` (Devanagari-aware) |
| `frontend/lib/theory-content.ts` | TheoryPanelLazy registry (29+ packs) |
| `frontend/features/lab/lab-learning.ts` / `lab-metadata.ts` / `lab-manifest.ts` | 43 learning packs / 116 lab ids / 870 activities |
| `frontend/features/derivations/derivations-data.ts` | derivation content |
| `frontend/components/content/content-tabs.tsx` | tab shell (`buildCompanionTabs`, profiles) |
| `frontend/components/content/topic-vertical-notes.tsx` | notes tab renderer — DocView wiring target |
| `frontend/components/content/math-markdown.tsx` | inline `$...$` + bold markdown renderer |
| `frontend/features/syllabus/components/topic-detail-view.tsx` | syllabus topic page body (mounts TopicVideo) |
| `frontend/features/lab/components/topic-video-slugs.ts` | exact-slug video registry (pattern model) |
| `frontend/lib/navigation.ts`, `core/site-index.ts`, `search-index.ts`, `core/sections.ts` | canonical links/indexes — verify before route/public changes |
| `frontend/tests/features/topic-video.test.ts` | exact-slug registry test (copy for figures test) |
| `frontend/tests/features/tier-welcome.test.tsx` | `/welcome` gate test |
| `backend/tests/unit/academic-intelligence.test.ts`, `backend/tests/unit/ai/reply-craft.test.ts` | master-prompt cap (71k) tests |
| `content/notes/concepts/{class}/{subject}/{unit}/{NN-slug}.json` | concept payload per topic |
| `content-tools/enhancers/` | `enhance-*.cjs` runners + JSON dictionaries |
| `scripts/ci/scoped-check.mjs` | what `npm run check` scopes |

---

## §9 Content pipeline knowledge

### §9.1 Concept-JSON fields (all optional-chain — varies per file)
`title, unitSlug, topicSlug, topicTitle, relevance, notes: string[]` (markdown-ish:
`**Term:**` lead-ins, `$...$`/`$$...$$` LaTeX), `keyPoints, examShortTricks,
examNotes, practiceQuestions, mcs: {question,options,answer}[], formulas,
confusion, practice, universalFacts, importantConcepts, importantNotes,
importantStatements, specialNotes, summary, examples, numericals, blocks,
formulaSpecs, animation3D, visualType, source`.

### §9.2 Authoring content via the enhancer runner
- Runner: `content-tools/enhancers/enhance-legend-gaps.cjs`.
- Dictionary key format: `classSlug/subjectSlug/unitId/topicSlug`
  (e.g. `class-11-notes/chemistry/stoichiometry/mole-concept...`).
- Matching: exact preferred, else token-overlap ≥0.4 on file slugs (number prefix
  stripped). **Never overwrites a field that already holds content** — reports
  applied/skipped/unmatched. Unmatched must always end at 0.
- Fields it applies: `examShortTricks`, `keyPoints`, `practiceQuestions`.
- Usage: `node content-tools/enhancers/enhance-legend-gaps.cjs <dict.json...>`
  (no args = auto-glob `legend-gap-content-*.json`).
- English/Nepali subject slugs in keys need the real subject dir segment
  (`english/`, `nepali/`); Nepali keys/slugs are Devanagari and must match
  `slugifySyllabusTopic()` output exactly.

### §9.3 Coverage verification (archive — currently 0 gaps)
The gap-scan loop was: temp `.tsx` script in `frontend/` importing
`@/lib/core/syllabus` + `@/lib/legend`, union legend entries by syllabus key,
diff against SYLLABUS, write `.tmp-gap-list.txt`. If ever needed again, rebuild
from this description rather than hunting for the deleted temp files.

### §9.4 Rename/copy sweeps
User-facing copy lives in: `frontend/lib/navigation.ts`, `core/site-index.ts`,
`search-index.ts`, `core/sections.ts`, `features/lab/components/virtual-labs-catalog.tsx`,
practical pages, plans/notice/profile. Sweep changes must keep canonical links
consistent (§8 row above) and pass `npm run check`.

---

## §10 Session-end protocol (every turn)

1. Run the narrowest validation (`npm run check` / targeted vitest).
2. Commit **only own files** by explicit path; push `main` only after `check:all`.
3. End with a short visible status + file classifications.
4. **Update THIS file** (`plan.md`) when state changes: move §5 items to done,
   adjust §4 ledger, add new hazards. plan.md is the single source of truth.

*Written by the session that completed the legend-gap campaign and legend SSG
(commits bdd11781, dec53015). Keep it current.*
