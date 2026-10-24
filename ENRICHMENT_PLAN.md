# ENRICHMENT PLAN — "Fill Empty, Then Upgrade Generic" Master Map

> Single shared tracker for the content-riching campaign. Any agent (Grok,
> you, me) works this top-to-bottom, batch by batch, and updates the
> progress table below so nobody loses track.
>
> **This is separate from `plan.md`** (the tier-ladder / access-led platform
> vision). Do not mix the two.

---

## 0. Intent (the "complete thought" standard)

Two phases, subject by subject, **Nepali excluded** (Nepali-subject pages
are not created yet):

- **PHASE 1 — FILL EMPTY.** Every empty/thin note becomes a *complete, rich,
  exam-grade note* (a full "thought", not a stub). Subject order:
  **Biology → Chemistry → Mathematics → Physics → English.** Class 11 and
  Class 12 together, per subject.
- **PHASE 2 — UPGRADE GENERIC.** After empties are filled, go through notes
  that exist but are *shallow/boilerplate* and upgrade them to the same rich
  standard.
- **PHASE 3 — VERIFY.** Build + audit + gates green.

**Out of scope (for now):** every path containing `/nepali/`
(`class-11/nepali`, `class-12/nepali`, runtime `nepali/`). Do not create or
edit Nepali-subject content.

---

## 1. What a "rich note" is (the checklist every note must meet)

A note file is **rich** when it has all of the following, with *real* content
(match the canonical example
`frontend/public/data/syllabus-notes/biology/biomolecules-and-cell-biology/01-biomolecules-functions.json`):

| Field | Min | Notes |
|---|---|---|
| `notes[]` | ≥ 6 substantial conceptual paragraphs | the core "thought" |
| `confusion[]` | ≥ 4 | real misconceptions, not filler |
| `keyPoints[]` | ≥ 4 | |
| `importantStatements[]` | ≥ 3 | |
| `examples[]` | ≥ 3 | |
| `universalFacts[]` | ≥ 2 | |
| `formulas[]` | subject-appropriate | math/chem/physics required; bio/eng optional |
| `practice[]` + `practiceQuestions[]` | ≥ 3 each | |
| `examNotes[]` + `examShortTricks[]` | ≥ 2 each | |
| `specialNotes[]` + `importantNotes[]` | ≥ 2 each | |
| `mcs[]` (MCQs) | ≥ 4 | each: question + 4 options + answer letter |
| `importantConcepts[]` | ≥ 4 | |
| `importantTasks[]` | ≥ 2 | |
| `exercises[]` | ≥ 1 worked | **each exercise has `question`, `steps[]`, `answer`** |
| `summary` | 1 paragraph | |
| `relevance` | ≥ 80 | |

### 1.1 Math step rule (user requirement)
For Mathematics notes, **never put a whole worked solution on one line.**
Every `exercises[]` item and every numeric note breaks the solution into
**separate `steps[]` strings**, one line each, ending with an `answer`.
Derivation notes must also be step-laddered (step → step), not a wall of
text.

### 1.2 Static low-data diagram rule (user requirement, Biology first)
Where a concept is clearer with a picture (esp. **Biology**, then others):
- Prefer **referencing an existing static diagram component** over generating
  a new heavy one (low-data = light, few elements).
- Wire it via the note's `visualType` and `enrichedContent.visualization`
  (shape: `{ "type": "static" | "3d-model", "component": "<ExistingComponent>", "desc": "…" }`).
- If embedding a raw SVG figure, it MUST pass the note-figure guard
  (`frontend/lib/content/visuals.ts`): **one** complete `<svg>…</svg>` block,
  ≤ 40 kB, ≤ 900 elements, **no** `<script>`/`<style>`/`<defs>`/gradients/
  markers/`<use>`/external fetch/`url(#…)`/inline `on*=`; arrowheads are
  `<polygon>`, shading is flat translucent fill.
- Before referencing a component, confirm it exists (see §4 scan targets).

---

## 2. The two layers (keep both in sync)

- **Source (edit here):** `content/notes/{concepts,theory,guides}/class-{11,12}/<subject>/<unit>/<NN-topic>.json`
  (and `content/formulas`, `content/practice/**`).
- **Runtime (mirror here):** `frontend/public/data/syllabus-notes/<subject>/<unit>/<NN-topic>.json`

Rule: fill the **source** file, then mirror the same change into its
**runtime** copy (both exist for the same topic). Re-run the audit after each
batch. (If a subject has a build script `content-tools/build-syllabus-notes.js <subject>`,
that can regenerate runtime — but direct mirroring is the verified path used so far.)

---

## 3. How emptiness is detected (source of truth)

- `node scripts/audit-empty-scopes.mjs` (light — the ONLY auto command allowed).
- States:
  - **THIN** = file has `< 4 notes` (or 0). → Phase 1 target.
  - **PLACEHOLDER / MIXED** = has a template marker. → rewrite.
  - **CLEAN** = ≥ 4 notes, 0 markers. → Phase 2 target IF it's still shallow
    (missing ≥ 4 fields from the §1 checklist).
- Gates: `broken` must stay 0, `placeholder` must not rise.
- **Nepali exclusion:** drop every scope whose key contains `nepali`.

---

## 4. What an agent MUST scan before authoring (read-only, targeted)

Read once at the start of a subject, then targeted per batch:
1. **Schema:** one CLEAN sibling in the same unit (the shape template).
2. **Diagrams:** `frontend/lib/topic-visuals.tsx`, `frontend/lib/visual-concept-map.tsx`,
   `frontend/lib/rail-diagrams.ts`, `frontend/components/viz/**`,
   `frontend/lib/content/visuals.ts` (the SVG guard).
3. **Syllabus:** `frontend/lib/syllabus.ts` (the topic `topicSlug`/title truth).
4. **Fact bank:** `frontend/lib/high-yield-topic-facts-<subject>*.ts` (reuse,
   don't reinvent high-yield facts).
5. **The audit output** (to build the working queue).

Do **not** mass-scan `content/**` or `frontend/public/data/**`.

---

## 5. Batch loop (how work is executed)

- **Batch = 10 files**, one subject at a time, in the order
  **Biology → Chemistry → Mathematics → Physics → English**.
- Within a subject, go **unit by unit** (alphabetical).
- Each batch: read 1 CLEAN sibling + (for bio) the diagram list → author rich
  content into all §1 fields (+ steps for math, + diagram where needed) →
  mirror source→runtime → run the audit → **update §6 table** → **STOP** and
  report the next 10.
- User (or any agent) says **"continue"** → next 10. New session = fresh
  context = cheap.
- Commit after each batch (1 commit = 10 files, 1 subject) for clean rollback.

---

## 6. PROGRESS TRACKER (update this after every batch)

Starting counts are approximate — **refresh with the audit at the start of
each subject** and record the real number.

### PHASE 1 — fill empty/thin (Nepali excluded)
| # | Subject | Unit | Files to fill | Done | Batch # | Date |
|---|---|---|---|---|---|---|
| 1 | Biology | all units | 81 | 20 / 81 | 2 | 2026-10-24 |
| 2 | Chemistry | all units | (count from audit) | 0 / N | | |
| 3 | Mathematics | all units | (count from audit) | 0 / N | | |
| 4 | Physics | all units | (count from audit) | 0 / N | | |
| 5 | English | all units | (count from audit) | 0 / N | | |

### PHASE 2 — upgrade generic/shallow CLEAN notes (Nepali excluded)
| # | Subject | Notes upgraded | Done | Date |
|---|---|---|---|---|
| 1 | Biology | (list) | 0 / N | |
| 2 | Chemistry | | 0 / N | |
| 3 | Mathematics | | 0 / N | |
| 4 | Physics | | 0 / N | |
| 5 | English | | 0 / N | |

### Standing invariants (check after every batch)
- [x] `broken = 0` (2026-10-24, after Biology batch 1: broken=0)
- [x] `placeholder` did not rise (stayed 0)
- [x] no `/nepali/` path touched
- [x] math notes use `steps[]` (no math in this batch; biology exercises use steps[])
- [x] bio notes that need a picture have a wired static/low-data diagram
- [x] source + runtime mirror in sync

---

## 7. Definition of DONE
- Phase 1: **every non-Nepali THIN/PLACEHOLDER/MIXED scope is CLEAN.**
- Phase 2: **every non-Nepali note meets the §1 rich checklist.**
- Phase 3: `npm run build` + `npm run check:all` (or CI gates) + backend
  tests green; `node scripts/audit-empty-scopes.mjs` shows 0 empty scopes
  (non-Nepali) and 0 broken.

---

## 8. Log of what each agent session did (append, don't overwrite)
- *example: `2026-10-24 — Batch 1 (Biology): filled 10/NN in
  biomolecules-and-cell-biology; added static diagram X; broken=0; commit abc1234`*
- 2026-10-24 — Batch 1 (Biology): filled 10/81 in biodiversity-and-conservation (patterns, in-situ/ex-situ, IUCN), biodiversity-conservation-12 (levels, loss, strategies), biota-and-environment (animal behavior, pollution), biotech-applications (agriculture, medicine). Static diagram visualType `biodiversity-levels`; agriculture and medicine reuse `dna-double-helix`. Audit: files=2613 authored=2033 placeholder=0 thin=580 broken=0. Biology thin 81 → 71.
- 2026-10-24 — Batch 2 (Biology): filled 10 more (20/81) in biotech-applications (transgenic animals), biotech-principles (recombinant DNA, PCR and gels), biotechnology-applications (Bt cotton and RNAi tobacco, transgenic uses, biopiracy), biotechnology-principles (principles, applications), ecology (interactions, pond and forest). Diagrams: `dna-double-helix`, new `species-interactions`, existing `food-chain-energy`. Audit: files=2621 authored=2051 placeholder=0 thin=570 broken=0. Biology thin 71 → 61.
