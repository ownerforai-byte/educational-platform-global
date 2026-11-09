# Simulation Rebuild Program — plans only

**Status:** reference documents, not a work order for this repository.
**Target tree:** `C:/Users/ASUS/simulation` — a separate local repository, branch `master`,
snapshot HEAD `9dfcbf4` (2026-11-09), baseline commit `92f0635`.
**Added:** 2026-11-09 · **Plan version:** 1.1.0

## This is a snapshot of a live program

The program is **being executed right now** in the `simulation` tree by another agent (recorded in
`INDEX.md`'s execution log as `pi`). These files are a point-in-time copy, not a finished artifact.
Verified state of the target tree at the moment of copying:

| Measurement | Value |
|---|---|
| Commits since baseline | 18 (`92f0635` → `9dfcbf4`) |
| Tracked files | 926 = 391 baseline (all still tracked) + 480 `curriculum/` + 55 new program files |
| Curriculum files tracked | 480, committed as `6520e06` (the generator `tools/scaffold-curriculum.mjs` is the 481st scaffold file) |
| Work packages complete | 18 of 44 |
| Working tree | 2 modified report files (the executing agent's in-flight work) |

**Known inconsistency in this snapshot — read before trusting the git prose.** `INDEX.md`'s
execution log is current, but three prose passages were written before execution began and were
not rewritten: `INDEX.md` §0, §8 and §9 still say the 481 scaffold files are *uncommitted* and that
HEAD is `92f0635`. `program.json → program.curriculumExpansion.git` carries the same stale record
(`committed: false`, `filesUncommitted: 481`). **The table above is the measured truth**; those
passages are not. They were left untouched deliberately: the executing agent updates `INDEX.md`
and `program.json` in lockstep, and editing them here would race its commits and could destroy
in-flight work. Reconcile them in the `simulation` tree, not in this copy.

Work-package `status` fields in `program.json` **are** reliable — they are measurement-derived and
were spot-checked against their artifacts (for example `P3.8`'s
`reports/coverage-backlog-all-classes.json` exists, 196 KB, 239 block records).

## Read this first

These eight files describe a content-rebuild program for a **different codebase**. They are
committed here so the program is versioned and reviewable alongside the platform's other plans,
**not** so an agent executes them against this platform.

Every path the plans operate on is absent from this repository:

| Path referenced by the plans | Present in this repo |
|---|---|
| `biology/03-cell-biology/mitochondria/structure.txt` | no |
| `pipeline/topics`, `pipeline/engine/rules.txt`, `pipeline/final-state.txt` | no |
| `components/biology` | no |
| `motion/` | no |
| `conceptual/physics-chem-math/…` | no |
| `pyqs/physics/02-waves/pyqs.txt` | no |
| `curriculum/` | no |

This platform stores its corpus under `content/notes/concepts/{classSlug}/{subjectSlug}/{unitSlug}/…`
as JSON validated by `scripts/validate-content.mjs`. The plans target a flat `.txt`/`.md` library
with a five-pillar directory model. **Executing them here would be wrong**: they would create a
parallel content tree outside the syllabus, which `AGENT_RULES.md` and the header of
`frontend/lib/syllabus.ts` explicitly forbid.

## Why the curriculum scaffold was not imported

The program's scope was expanded on request to 239 class/subject blocks covering Grades 1–12 and
all five NEB streams (Science, Management, Humanities, Education, Law), with intentionally empty
`notes.md` files. That scaffold lives in the `simulation` tree and is **deliberately not committed
here**.

`frontend/lib/syllabus.ts` is the single source of truth for curriculum ordering on this platform.
It declares exactly two classes — `class-11-notes` and `class-12-notes` — each with six subjects:
`biology`, `chemistry`, `english`, `mathematics`, `nepali`, `physics`.

Measured against that file:

- **219 of 239 blocks have no syllabus subject at all** — every Grade 1–10 block (121), all of
  Management (24), Humanities (40), most of Education (16) and Law (14), plus Social Studies and
  Computer Science.
- The remaining 20 blocks resolve to only **12 distinct (class, subject) pairs**, because the
  platform syllabus has no stream dimension: `english` and `nepali` each appear three times per
  grade (common, education, law) and would compete for one syllabus slot.

The mandatory rule in `frontend/lib/syllabus.ts:31` and `AGENT_RULES.md` is unambiguous:

> If a subject is not listed here, STOP and report it. Do not guess.
> Never create free-floating content outside this syllabus order.

That rule applies regardless of instruction pressure, so the scaffold was stopped and reported
rather than imported. Adding Grades 1–10 or the Management/Humanities/Education/Law streams to this
platform is a **syllabus decision for the owner**, not a content drop: it requires editing
`frontend/lib/syllabus.ts` in official curriculum order with explicit approval, and recording the
change in `PROJECT_STATUS.md` and `CORE_FILES.md`.

## Contents

| File | Purpose |
|---|---|
| [INDEX.md](INDEX.md) | Agent entry point: baseline measurement, plan table, dependency order, wave schedule, definition of done |
| [program.json](program.json) | Machine-readable manifest — `rebuild-program/v1`. Work packages, dependencies, waves, acceptance refs, execution rules |
| [PLAN-01-content-schema.md](PLAN-01-content-schema.md) | Freeze the topic schema; `LegendSpec`, `ConceptSpec`, `Label3DSpec`, `MotionSpec`, validator |
| [PLAN-02-3d-component-rebuild.md](PLAN-02-3d-component-rebuild.md) | Replace 35 stub components with 35 real scenes |
| [PLAN-03-coverage-gap-closure.md](PLAN-03-coverage-gap-closure.md) | Close the pillar coverage backlog; P3.8 re-scopes it for the 239-block surface |
| [PLAN-04-directory-pipeline-hygiene.md](PLAN-04-directory-pipeline-hygiene.md) | Prune empty directories, rebuild the ledger, `dir-lint` gate |
| [PLAN-05-placeholder-eradication.md](PLAN-05-placeholder-eradication.md) | Remove hollow content claims; registry-derived exemption for declared-empty blocks |
| [PLAN-06-structural-encoding-repair.md](PLAN-06-structural-encoding-repair.md) | UTF-16 transcode, mojibake reversal, path-depth repair, boot/build verification |

**Totals:** 6 plans · 44 work packages · 92.5 engineer-days · 69 acceptance gates · 31 risks ·
68 artifact paths · 12 waves · 20.5-day serial critical chain.

To read the schedule, start at `INDEX.md` §4; to execute programmatically, read
`program.json → executionOrder` and resolve each work package's gates via
`plans[].acceptanceRef`.

## Guarantees about this commit

- Documentation only. No file under `content/`, `frontend/`, `backend/`, `public/` or `scripts/`
  was added or modified.
- `frontend/lib/syllabus.ts` was **not** edited. No unit was reordered, renamed or added.
- No architecture change, no new dependency, no new component or service.
- No curriculum blocks, no empty `notes.md` files, no generated scaffold.
- The eight plan files are byte-identical copies of the authored originals (verified with `cmp`).
- Scanned for secrets and PII before commit: clean.

The plans' own honesty rules are worth carrying over even though the program is not executed here:
no completion claim the filesystem does not support, no fabricated past-paper questions attributed
to a real exam year, and no content invented to satisfy a CI gate.

## File Classification

All nine files in this directory (`README.md`, `INDEX.md`, `program.json`, `PLAN-01`…`PLAN-06`)
are **[IMPORTANT CORE FILE]** — agent instruction and planning documentation, not content payloads.
None falls under `content/**`, `frontend/public/data/**`, `public/data/**`, `backend/kb/**`,
`backend/.ocr-v2/**` or `frontend/public/materials|resources/**`.