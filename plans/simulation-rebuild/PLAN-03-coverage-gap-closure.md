# PLAN 03 — Coverage Gap Closure (70 Empty Pillar Slots)

**Program:** Simulation Library Rebuild
**Plan code:** `COVER`
**Owner slot:** Subject Leads (Bio / Chem / Phys / Math)
**Status:** Blocked by Plan 01
**Window:** 2026-11-18 → 2026-12-18 (23.5 engineer-days, 4 parallel tracks)
**Depends on:** Plan 01 / P1.1, P1.5, P1.6 (schema + validator + exemplars), Plan 06 / P6.2 (readable UTF-8 at correct paths)
**Blocks:** Plan 04 / P4.4

---

## 1. Objective

Close every one of the 70 pillar slots that currently have no file at all, so all 33 syllabus
units carry the full five-pillar package: **notes, 3D component, motion spec, conceptual Q+A,
5-year PYQs.**

## 2. Evidence (measured 2026-11-08)

**165 pillar slots** (33 units × 5 pillars). **70 have no file.** 95 have a file — but every one
of the 33 "3D component" files is a stub (Plan 02), so substantive coverage is far lower than the
raw count suggests.

Only **7 of 33 units** are complete across all five pillars:
`bio 04`, `bio 05`, `chem 05`, `phys 01`, `phys 02`, `phys 03`, `math 01`.

`X` = directory empty or absent.

| Unit | Notes | 3D | Motion | Concept-Q | PYQ |
|---|---|---|---|---|---|
| bio 01 introduction | ok | **X** | ok | ok | ok |
| bio 02 biomolecules | **X** | **X** | ok | ok | ok |
| bio 03 cell-biology | partial | partial | partial | partial | **X** |
| bio 04 cell-division | ok | ok | ok | ok | ok |
| bio 05 genetics | ok | ok | ok | ok | ok |
| bio 06 ecology | ok | ok | ok | **X** | **X** |
| bio 07 evolution | ok | ok | ok | **X** | **X** |
| bio 08 plant-diversity | **X** | ok | ok | **X** | **X** |
| bio 09 animal-diversity | **X** | **X** | **X** | **X** | **X** |
| bio 10 microbiology | ok | ok | ok | **X** | **X** |
| bio 11 fungal-plant-diversity | ok | **X** | ok | **X** | **X** |
| bio 12 human-body | ok | ok | ok | **X** | **X** |
| bio 13 botany-taxonomy | ok | ok | ok | **X** | **X** |
| bio 14 zoology-animal-systems | ok | **X** | **X** | **X** | **X** |
| chem 01 foundation | **X** | **X** | ok | ok | ok |
| chem 02 stoichiometry | ok | ok | **X** | **X** | **X** |
| chem 03 atomic-structure | ok | ok | **X** | **X** | **X** |
| chem 04 bonding | ok | ok | **X** | ok | **X** |
| chem 05 oxidation | ok | ok | ok | ok | ok |
| chem 06 electrolysis | ok | **X** | ok | **X** | **X** |
| chem 07 states-of-matter | ok | ok | **X** | **X** | **X** |
| chem 08 organic-equilibrium | ok | **X** | **X** | **X** | **X** |
| phys 01 mechanics | ok | ok | ok | ok | ok |
| phys 02 waves-sound-light | ok | ok | ok | ok | ok |
| phys 03 electricity-magnetism | ok | ok | ok | ok | ok |
| phys 04 modern-physics | ok | ok | ok | **X** | **X** |
| phys 05 thermo | **X** | ok | ok | **X** | **X** |
| phys 06 thermal-properties | ok | ok | **X** | **X** | **X** |
| phys 07 optics-complete | ok | ok | **X** | **X** | **X** |
| phys 08 electromagnetic-induction | ok | ok | **X** | **X** | **X** |
| math 01 algebra | ok | ok | ok | ok | ok |
| math 02 calculus | ok | ok | ok | **X** | **X** |
| math 03 statistics | ok | ok | ok | **X** | **X** |

### 2.1 The bio 03 sub-hole

`biology/03-cell-biology/` has 10 organelle folders. Coverage inside them:

| Organelle | Notes | 3D file | Motion | Concept-Q | PYQ |
|---|---|---|---|---|---|
| mitochondria | yes | stub | yes | yes | yes |
| plant-cell | yes | stub | **no** | **no** | **no** |
| animal-cell | **no** | stub | **no** | **no** | **no** |
| chloroplast | **no** | stub | **no** | **no** | **no** |
| endoplasmic-reticulum | **no** | stub | **no** | **no** | **no** |
| golgi | **no** | stub | **no** | **no** | **no** |
| lysosome | **no** | stub | **no** | **no** | **no** |
| nucleus | **no** | stub | **no** | **no** | **no** |
| ribosome | **no** | stub | **no** | **no** | **no** |
| vacuole | **no** | stub | **no** | **no** | **no** |

**8 of 10 organelles have zero notes.** 9 of 10 have no motion, no conceptual questions, no PYQs.
This sub-hole is counted separately from the 70 unit-level slots and adds **41 further gaps**.

## 3. Scope

**In scope:** authoring the missing 70 unit-level slots and 41 organelle-level gaps; ranking by
exam weight; a filesystem-derived coverage report wired into CI; and (P3.8) re-scoping the backlog
for the 239-block all-class curriculum now present in `curriculum/curriculum-map.json`.

**Out of scope:** rewriting files that already exist but are hollow (Plan 05), rendering 3D
geometry (Plan 02 — this plan produces the `labels3D` + `motion` specs Plan 02 consumes), and
**authoring** the 235 `not-started` curriculum blocks beyond tranche 1. P3.8 ranks and schedules
that second tranche; it does not write it, and this program's definition of done does not require
it to be written.

## 4. Prioritization

Ranked by (a) number of empty pillars, (b) NEB Class 11 exam weight, (c) dependency fan-out.

**Tier 1 — totally absent, highest weight (start first):**
`bio 09 animal-diversity` (5/5 empty), `bio 14 zoology-animal-systems` (4/5),
`chem 08 organic-equilibrium` (4/5), `bio 11 fungal-plant-diversity` (3/5),
`phys 08 electromagnetic-induction` (3/5), `bio 03` organelle sub-hole (41 gaps).

**Tier 2 — two pillars missing, high weight:**
`chem 02`, `chem 03`, `chem 07`, `phys 06`, `phys 07`, `bio 08`, `bio 12`, `bio 13`,
`math 02`, `math 03`, `phys 04`, `phys 05`.

**Tier 3 — one or two missing, lower weight:**
`bio 01` (3D only), `bio 02` (notes + 3D), `bio 06`, `bio 07`, `bio 10`,
`chem 01`, `chem 04`, `chem 06`.

These tiers rank **tranche 1 only** (the original 33 Class 11 Science units). P3.8 produces the
ranking for the remaining 235 curriculum blocks: SEE and NEB ahead of basic level, and within NEB
Science and Management ahead of Humanities, Education and Law. Tranche 1 keeps its priority —
the second tranche never displaces it.

## 5. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P3.1 | Rank all 111 gaps; publish `coverage-backlog.json` | 1.0 d | Critical | P1.1 |
| P3.2 | Biology unit gaps — 22 slots across 11 units | 6.0 d | Critical | P3.1, P1.6 |
| P3.3 | Bio 03 organelle sub-hole — 41 gaps, 10 organelles | 5.0 d | Critical | P3.1, P1.6 |
| P3.4 | Chemistry unit gaps — 17 slots across 7 units | 4.0 d | High | P3.1, P1.6 |
| P3.5 | Physics unit gaps — 14 slots across 5 units | 4.0 d | Critical | P3.1, P1.6 |
| P3.6 | Mathematics unit gaps — 4 slots across 2 units | 1.0 d | Medium | P3.1, P1.6 |
| P3.7 | Filesystem-derived coverage report + CI regression gate | 1.0 d | Critical | P3.2–P3.6 |
| P3.8 | Re-scope backlog for the 239-block all-class curriculum | 1.5 d | High | P3.1 |

### P3.2 — Biology (22 slots)

- `bio 01` — 3D label/motion spec (component itself is Plan 02)
- `bio 02` — notes + 3D spec
- `bio 06` — conceptual Q+A, PYQ
- `bio 07` — conceptual Q+A, PYQ
- `bio 08` — notes, conceptual Q+A, PYQ
- `bio 09` — **all five pillars** (notes, 3D spec, motion, conceptual Q+A, PYQ)
- `bio 10` — conceptual Q+A, PYQ
- `bio 11` — 3D spec, conceptual Q+A, PYQ
- `bio 12` — conceptual Q+A, PYQ
- `bio 13` — conceptual Q+A, PYQ
- `bio 14` — 3D spec, motion, conceptual Q+A, PYQ

### P3.3 — Organelles (41 gaps)

For each of the 10 organelles produce a schema-valid topic. Mitochondria is the exemplar from
P1.6 and needs only gap-filling; the other 9 need full authoring. Priority order by exam weight:
nucleus → chloroplast → animal-cell → ribosome → ER → golgi → lysosome → vacuole → plant-cell
(completion) → mitochondria (completion).

Each must carry its own `LegendSpec` and `labels3D` — a cell-biology scene without a legend is
the exact defect this program exists to remove.

### P3.4 — Chemistry (17 slots)

`chem 01` notes + 3D spec · `chem 02` motion + concept + PYQ · `chem 03` motion + concept + PYQ ·
`chem 04` motion + PYQ · `chem 06` 3D spec + concept + PYQ · `chem 07` motion + concept + PYQ ·
`chem 08` 3D spec + motion + concept + PYQ

### P3.5 — Physics (14 slots)

`phys 04` concept + PYQ · `phys 05` notes + concept + PYQ · `phys 06` motion + concept + PYQ ·
`phys 07` motion + concept + PYQ · `phys 08` motion + concept + PYQ

Physics carries the highest exam weight and the most formula-bearing content, so every
`ConceptSpec.derivation` here is mandatory (non-null) and every `formulas[]` entry needs
`variables[].siUnit`.

### P3.6 — Mathematics (4 slots)

`math 02 calculus` concept + PYQ · `math 03 statistics` concept + PYQ

### P3.7 — Coverage report + CI gate

`tools/coverage-report.mjs` walks the real filesystem (not a hand-maintained list) and emits
`reports/coverage-matrix.json` + a human-readable markdown matrix. CI fails if:

- any previously-filled slot becomes empty (regression)
- total filled count decreases
- a new unit directory appears without all five pillars

The report is the single source of truth. Status text files (`system-selection.txt`,
`pipeline/final-state.txt`) are **generated from it**, never hand-written — this is what prevents
the "ALL SUBJECTS COVERED" false claim from recurring.

### P3.8 — Re-scope for the all-class curriculum

Added 2026-11-08 after the curriculum scaffold expanded the addressable surface from 33 Class 11
Science units to **239 blocks across Grades 1–12** (81 basic, 40 secondary, 118 higher-secondary
spanning Science, Management, Humanities, Education and Law).

The 70-slot backlog in §2 remains valid and is still the **first tranche** — P3.2–P3.6 execute
against it unchanged. P3.8 produces the backlog for everything beyond it:

- Read `C:/Users/ASUS/simulation/curriculum/curriculum-map.json` (239 blocks, 235 `not-started`,
  4 `existing-hollow`) as the authoritative block list — never hand-enumerate grades or subjects
- Rank the 235 `not-started` blocks by exam weight and level: SEE (Grades 9–10) and NEB (11–12)
  ahead of basic level; within NEB, Science and Management ahead of Humanities/Education/Law
- Emit `reports/coverage-backlog-all-classes.json`, tranched so the original 70 slots stay tranche 1
- Confirm NEB subject syllabus codes before authoring — only `Mat. 007` is currently verified;
  every other `syllabusCode` is `null` and must not be guessed
- Reconcile the under-coverage against source documents: Physics 8/26 units, Chemistry 8/17,
  Mathematics 3/7. These gaps exist *inside* tranche 1 and must be added to it
- Register the Plan 05 hollow-detector exemption for `status: "not-started"` blocks, derived from
  `curriculum-map.json` so it shrinks automatically as blocks are written

P3.8 does **not** gate P3.2–P3.7. It runs alongside them and gates only the second tranche.

## 6. Acceptance criteria

- [ ] All 70 unit-level slots contain a schema-valid file
- [ ] All 41 organelle-level gaps closed; 10/10 organelles have notes + legend + labels + motion + Q+A + PYQ
- [ ] `bio 09 animal-diversity` complete across all five pillars
- [ ] 33 / 33 units complete across all five pillars
- [ ] Every new topic passes `validate-topic.mjs --strict`
- [ ] Every physics/math `ConceptSpec.derivation` non-null
- [ ] Every new topic has a `LegendSpec` with ≥3 entries, each with a non-color channel
- [ ] `reports/coverage-matrix.json` generated from filesystem, not hand-maintained
- [ ] CI fails on coverage regression
- [ ] Status text files generated from the report, not asserted by hand
- [ ] `reports/coverage-backlog-all-classes.json` covers all 239 curriculum blocks, tranched, ranked by exam weight
- [ ] Physics/Chemistry/Mathematics under-coverage vs. source `.docx` (8/26, 8/17, 3/7) added to tranche 1
- [ ] Plan 05 exemption for `not-started` blocks derived from `curriculum-map.json`, shrinking as blocks are written

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| PYQ sourcing — real past papers not in repo | High | High | Confirm NEB archive access in week 1; if unavailable, flag PYQ slots as `sourced-pending` rather than fabricating questions |
| 4 parallel subject tracks drift in quality | Medium | High | P1.6 exemplars + `--strict` gate are the shared bar; weekly cross-review |
| Biology descriptive units strain formula thresholds | Medium | Low | Schema already conditional on subject (P1.1) |
| Organelle sub-hole underestimated at 41 gaps | Medium | Medium | P3.1 recounts from filesystem before effort is committed |
| Authors write hollow content to hit slot counts | High | High | Plan 05 detector runs in the same CI job; a filled-but-hollow slot fails |

## 8. Definition of done

165/165 unit slots and 50/50 organelle slots populated with content that passes both the schema
validator and the hollow-content detector. Coverage matrix regenerated from disk and green in CI.
No hand-written completion claims anywhere in the library.

Plus, for the expanded surface: `reports/coverage-backlog-all-classes.json` ranks all 239
curriculum blocks with the original 70 slots preserved as tranche 1, the Physics/Chemistry/
Mathematics source-document under-coverage folded into tranche 1, and the Plan 05 `not-started`
exemption registered against the same registry. Writing tranche 2 is **not** part of this done
state — every remaining gap must be a declared gap, never a false claim.

## 9. Artifacts produced

```
reports/coverage-backlog.json
reports/coverage-backlog-all-classes.json
reports/coverage-matrix.json
reports/coverage-matrix.md
tools/coverage-report.mjs
topics/biology/**/*.topic.json      (11 units + 10 organelles)
topics/chemistry/**/*.topic.json    (7 units)
topics/physics/**/*.topic.json      (5 units)
topics/mathematics/**/*.topic.json  (2 units)
.github/workflows/coverage-gate.yml
```