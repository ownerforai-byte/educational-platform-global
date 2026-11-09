# REBUILD PROGRAM — Agent Execution Index

**Read this file first.** It is the entry point for any agent executing the Simulation Library
Rebuild program. Everything below is measured, not estimated from prose.

---

## EXECUTION LOG (live — updated by the executing agent as work completes)

Executing agent: pi (free-pi). All work committed to the target repo (`C:/Users/ASUS/simulation`, branch `master`).
`program.json` statuses are updated in lockstep with this log.

| Date | WP | Status | Evidence / artifacts | Commit |
|---|---|---|---|---|
| 2026-11-08 | — | scaffold committed | 481 scaffold files committed as their own commit before destructive steps (INDEX §3 rule 7; owner directed execution) | `6520e06` |
| 2026-11-08 | P4.1 | ✅ complete | `reports/tree-snapshot-pre-hygiene.json` (872 files, 1,054 empty dirs, sha256 per file — matches §8) + `FILL-OR-PRUNE-POLICY.md` ratified | `c2c9806` |
| 2026-11-08 | P6.2 | ✅ complete | 389 files transcoded (129 UTF-16LE + 260 UTF-8-BOM), round-trip asserted 389/389, 0 failures; 0 UTF-16 BOMs remain; `cat`/`rg` verified; bytes backed up in `_encoding_backup/` (gitignored, retained until P6.6) | `c2c9806` |
| 2026-11-08 | P6.1 | ✅ complete | `physics-01…08` flattened to eight siblings matching `pyqs/`; whole-tree depth>6 scan = 0; `reports/path-flatten-report.json` (git records no delta — dirs were empty) | `f5b3122` |
| 2026-11-08 | P6.4 | ✅ complete | All five false status claims replaced with measured, dated values (95/165 slots, 0/35 components, 16/353 substantive, 6/1259 cycles; the audit's 17/356 counted UTF-16LE bytes as garbage — see P6.6) | `99d98f9` |
| 2026-11-08 | P6.3 | ✅ complete | `reports/mojibake-report.json`: 34 clean CP437 round-trips, 0 unrecovered, 0 corrupted forms remain; reference file repaired in place, `.bak` retained. **VARIANCE:** Bohr radius is `rₙ = r₁n²` (bytes E2 82 81 = U+2081), not the §2.3-predicted `₀` — recovery is byte-exact; kept per the no-guessing rule | `f1c7b1c` |
| 2026-11-08 | P6.5 | ✅ complete | Vite + React 18 + TS + three/R3F/drei bootstrap; `src/App.tsx` unit index lazy-loads all 35 scenes; `npm install` + `npm run build` (35 chunks + 150 kB index) + `npm run dev` boot verified over HTTP then stopped; `src/styles/tokens.css` carries the P1.2 registry | `4d4fe04` |

**In progress:** wave 3 complete — `P1.5`–`P1.7`, `P2.2`, `P3.8` finished (below); Plan 01 is now fully closed. 18/44 work packages complete. Plan 01 is **frozen at schema v1.0.0**, so `P2.3` onward may not change the schema without a versioned migration. **BLOCKER 2 unchanged:** NEB past-paper archive access could not be confirmed this session (web search provider failed twice, 2026-11-08); all 43 PYQ gaps remain flagged `sourced-pending` in `reports/coverage-backlog.json`; P5.3 stays gated. **Next wave:** 4 — `P2.3` mitochondria vertical slice (the program's key gate, on the critical path) and `P3.2`. **Standing notes for the next agent:** (1) `_encoding_backup/` must be removed by an explicit logged step only after P6.6 passes; (2) NEB past-paper sourcing (BLOCKER 2) gates P5.3 — P3.1 owns confirming access in wave 2; (3) the `r₁` variance above awaits owner confirmation if `r₀` is preferred; (4) **interior-label rule learned in P2.2:** anchors enclosed by an opaque outer surface must set `occlusionTest:false` or they are permanently hidden — external anchors keep the test; (5) `LabScene` is lazy-loaded and `DEFAULT_SCENE_STATE` lives in `src/lab/defaults.ts` so three.js stays out of the first-paint chunk (index 64 kB); (6) the `topics/` tree must contain no empty directory — `npm run integrity` reconciles the empty-dir count exactly.

| 2026-11-08 | P1.1 | ✅ complete | `schema/topic.schema.json` v1.0.0 (draft-07): 15 required fields, all 7 `$defs`; conditional formulas rule verified with ajv (biology 0 allowed, others minItems 1); swatch closed enum from P1.2 registry; ajv devDependency added | `76969d9` |
| 2026-11-08 | P2.1 | ✅ complete | `src/perf/PerfHarness.tsx` (#perf route): 20 remount cycles sampling WebGL context count, listener additions and frame intervals, verdict JSON for P2.9; build green, harness module verified served. LIMITATION: fps numbers need a real browser — measurement itself is P2.9 runtime QA | `c657cc3` |
| 2026-11-08 | P1.2 | ✅ complete | `schema/subject-tokens.json` (8-token closed palette, verified identical to the schema's swatch enum and present in `tokens.css`) + `schema/legend-spec.md` (accessibility rule: pattern+symbol+label mandatory; legendId cross-ref; 3–14 entries) | `8be090a` |
| 2026-11-08 | P1.3 | ✅ complete | `schema/concept-spec.md`: definition ≥80, intuition ≥200, derivation required for physics/math, misconceptions minItems 2, realWorldAnchor ≥120, prerequisites unit-id pattern, examWeight enum | `8be090a` |
| 2026-11-08 | P1.4 | ✅ complete | `schema/label-motion-spec.md`: Label3DSpec (legendId resolution = principal cross-field check, 3-number anchor, occlusion, zoom window) + MotionSpec (ms timeline, speedRange [0.1,4] matching shell slider, pausePoints, narration) | `8be090a` |
| 2026-11-08 | P6.6 | ✅ complete | `tools/integrity-check.mjs` (UTF-16 BOM / mojibake / depth>6 / status-reconciliation vs fresh walk; failure path proven: planted UTF-16 probe → exit 1, removed → exit 0) + `.github/workflows/integrity-gate.yml` + `npm run integrity`. `rules.txt` reconciled to measured **1061** empty dirs (1054 −1 chain +8 P6.1 siblings) and **16/356** substantive (the audit's 17 counted UTF-16LE bytes as garbage; clean-UTF-8 count canonical — P6.4 rewrites made rules.txt/final-state.txt substantive). `fix-mojibake.mjs` source ASCII-escaped so it no longer trips its own scan. Report: `reports/integrity-report.json` | `6f5631d` |
| 2026-11-08 | P3.1 | ✅ complete | `reports/coverage-backlog.json` via `tools/build-coverage-backlog.mjs` — filesystem recount of 165 unit + 50 organelle slots (§7 rule). Presence-only complete units **exactly match** the plan's 7 (conventions validated). planDeltas: unit no-file gaps **71** not 70 (bio 03 unit-level now explicit); "all 33 3D files exist as stubs" is **false** — 24 stubs, 9 empty dirs; organelle sub-hole **48** gaps (36 no-file + 10 stub + 2 hollow) not 41. **208 ranked gaps** (emptyPillars desc → §4 tier → index; examWeight/fan-out null, not guessed), 43 PYQ gaps `sourced-pending` | `a60ec93` |
| 2026-11-08 | P1.5 | ✅ complete | `tools/validate-topic.mjs` (schema + 11 cross-field checks), `tools/new-topic.mjs`, `templates/topic.template.json`; `--all --strict` gates the tree, the generated skeleton provably fails (23 errors, exit 1), `reports/schema-report.json` written | `58b2670` |
| 2026-11-08 | P1.6 | ✅ complete | Two exemplars migrated with genuine expansion, not reformatting: `topics/biology/03-cell-biology/mitochondria/mitochondria.topic.json` and `plant-cell.topic.json`, each with an original SVG diagram. Both pass `--strict` with **0 errors, 0 warnings**. Mitochondria merged the conceptual intro (§9 "Bohr" style sources unchanged) | `b7559c0` |
| 2026-11-08 | P1.7 | ✅ complete | `.github/workflows/schema-gate.yml` (freeze check at v1.0.0 + strict validate + debt-monotonic) and `reports/schema-debt.json` baseline **45** legacy files. Both failure paths proven: stale entry → exit 1; allow-list growth → exit 1 | `75b3371` |
| 2026-11-08 | P2.2 | ✅ complete | Shared `<LabScene>` shell: `src/lab/{LabScene,ControlRegion,LegendOverlay,LabelAnchors,ConceptDrawer,registry,perf,types,topics,defaults}.tsx` + `lab-scene.css` + `scrollbars.css`. Runtime-verified in headless Chrome: **22/22** criteria in `reports/scene-runtime-qa.json` — 11 live controls, 7-entry legend all with non-colour channels, concept drawer, dpr cap, 390→1920 resize, 20 remount cycles with 0 leaked canvases | `58586f6` |
| 2026-11-08 | P3.8 | ✅ complete | `reports/coverage-backlog-all-classes.json` via `tools/build-all-classes-backlog.mjs` — all **239** blocks reconciled from `curriculum-map.json` (never hand-enumerated), tranche 1 preserved as the 4 Class 11 Science blocks + **31** declared source-document gaps (Physics 18/26, Chemistry 9/17, Maths 4/7), Plan 05 exemption derived (**235**) and shrinking, 238 syllabus codes left `null` (never guessed) | `9dfcbf4` |

---

| | |
|---|---|
| **Program** | Simulation Library Rebuild |
| **Plan version** | 1.1.0 |
| **Baseline measured** | 2026-11-08 (re-measured after the all-class curriculum scaffold) |
| **Target repository** | `C:/Users/ASUS/simulation` |
| **Plans directory** | `C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans` |
| **Machine-readable manifest** | `plans/program.json` |
| **Scope** | 6 plans · 44 work packages · 92.5 engineer-days · 69 acceptance gates |
| **Calendar** | 2026-11-09 → 2027-01-22 (~11 weeks with 4 parallel tracks) |
| **Serial critical chain** | 20.5 days |
| **Curriculum surface** | 239 blocks · Grades 1–12 · 5 NEB streams · notes intentionally empty (§9) |

---

## 0. Preconditions — clear these before executing anything

Re-verified against the live filesystem immediately before handoff, **after** the all-class
curriculum scaffold was generated. The original 391-file pre-rebuild baseline is unchanged in
substance — 1,054 empty dirs, 35/35 stubs, 354 `.txt` of which 339 are hollow, no `package.json` —
but the tree now also carries **481 new files** under `curriculum/` and `tools/` (§9). Total 872
files. Node `v24.19.0` and npm `10.8.2` are available, so P6.5's bootstrap is feasible.

**The 481 scaffold files are uncommitted.** `git status` from `C:/Users/ASUS/simulation` shows
`?? curriculum/` and `?? tools/`; HEAD is still `92f0635`, which predates them. Wave 0 does not
touch either directory (P6.1 flattens an empty malformed path, P6.2 rewrites UTF-16 `.txt` files,
and every scaffold file is already UTF-8), so it is safe to start. Before any later destructive
step, commit or uniquely-tag-stash the scaffold per §3 rule 7 — do not let a prune sweep it.

**Status: `readyToExecute: true`.** PRE-1 is cleared. PRE-2 remains open but gates only `P5.3`
in wave 6 (~week 7), so it does not block starting. **Startable now: `P4.1`, `P6.1`, `P6.2`.**

### PRE-1 — git recovery path ✅ CLEARED 2026-11-08

**Resolved.** A git repository scoped to the target now exists with a full baseline commit:

```
git root      C:/Users/ASUS/simulation      (no longer the home directory)
HEAD          92f0635  "baseline: 391-file pre-rebuild state, measured 2026-11-08"
commits       1
tracked       391 / 391 files
working tree  clean
```

Authorized explicitly by the repository owner. Before staging, the tree was scanned: 391 files,
extensions `.txt` 354 / `.tsx` 35 / `.md` 2, **zero** hidden or sensitive-looking paths, **zero**
files over 1 MB. All 12 top-level entries were staged by name rather than with a blind `git add -A`.

**Recovery was verified, not assumed.** `git show HEAD:<path>` was compared byte-for-byte against
the working tree for four samples spanning both encodings and all three extensions —
`mitochondria/structure.txt` (UTF-16LE, 1626 b), `pipeline/final-state.txt` (UTF-16LE, 420 b),
`mitochondria-3d.tsx` (328 b), `pyqs/physics/02-waves/pyqs.txt` (28 b). **4/4 byte-identical.**
Plan 06's ~356 rewrites and Plan 04's 1,253 deletions now have a real revert path.

**Standing constraint:** run every git command from `C:/Users/ASUS/simulation`. The home directory
`C:/Users/ASUS` is *still* a separate zero-commit git root that does not track this tree — a stash
there would sweep `.ssh/`, `.aws/`, `AppData/`, `NTUSER.DAT` and `miniconda3/`. **Never run it.**

### BLOCKER 2 — NEB past-paper source unconfirmed (gates P5.3, 4 days / 12 files)

P5.3 requires real NEB Class 11 past questions spanning ≥5 distinct years with mark-allocated
solutions. No past-paper archive exists in the target repository. Access has not been confirmed.

Confirm sourcing **before wave 6**. If unavailable, mark the affected files `sourced-pending` and
escalate — per §3 rule 5, fabricating a question and attributing it to a real exam year is
forbidden and is worse than an honest gap. P3.1 owns confirming access in week 1; P5.3 inherits
that verdict.

### Ready now

With PRE-1 cleared, wave 0 is fully startable: **`P4.1`** (policy + tree snapshot, read-only),
**`P6.1`** (flatten the malformed nested path — all 8 directories are empty, zero content risk),
and **`P6.2`** (transcode UTF-16 → UTF-8 with byte-level backup and per-file round-trip assertion).

`P6.2` is the root of the critical path. Completing it unblocks Plan 01, which unblocks
Plans 02 / 03 / 05 in parallel, which unblocks Plan 04 last. Recover from any misstep with
`git checkout 92f0635 -- <path>` from inside `C:/Users/ASUS/simulation`.

---

## 1. Why this program exists

The target repository is scaffolding, not a product. A filesystem walk on 2026-11-08 measured
(the rows below describe the **original 391-file library**, excluding the `curriculum/` and
`tools/` scaffold added later that day — see §9 for the current whole-tree numbers):

| Metric | Measured | Implication |
|---|---|---|
| Files | 391 | — |
| Empty directories | **1,054** | 992 are hollow `pipeline/topics/cycle-*` folders |
| Pillar slots (33 units × 5) | 165 | **70 have no file at all** |
| Organelle-level gaps (bio 03) | **41** | 8 of 10 organelles have zero notes |
| `.tsx` components | 35 | **35 are 2-line stubs** returning a bare `<div>` |
| Text files (`.txt` + `.md`) | 356 | **339 are under 40 words** (354 `.txt`, 2 `.md`) |
| Genuinely substantive files | **3** | mitochondria structure, plant-cell structure, mitochondria intro |
| Files containing `legend` | **0** | No legend exists anywhere in the original library |
| Files containing `summary` / `keyPoints` | **0 / 0** | Schema never implemented |
| JSON files | **0** | `topic format.txt` contract is unimplemented |
| CSS files | **0** | No styling layer |
| `package.json` / app entry | **absent** | **The library cannot run** |
| Dirs under `pipeline/topics` | **1,259** | 992 empty · 261 marker-only (121 `done.txt` + 140 `topic.txt`) · **6** with a real definition |
| Directories deeper than 6 | **4** | the malformed `conceptual/physics-chem-math/physics-01…08` chain, depth 10 |

Status files assert the opposite: `pipeline/engine/rules.txt` claims `ALL SUBJECTS COVERED`,
`pipeline/final-state.txt` claims `CYCLES: 1560+ completed`, and `system-selection.txt:5` claims
`DONE — MITOCHONDRIA deep work complete`. **All three are contradicted by the filesystem.**
Removing that class of false claim is a structural goal of this program, not a side effect.

## 2. File locations

All paths absolute. Read the plan file before executing any of its work packages.

| # | Code | Plan | Location | WPs | Days |
|---|---|---|---|---|---|
| 01 | `SCHEMA` | Content Schema & Missing Pillars | [PLAN-01-content-schema.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-01-content-schema.md) | 7 | 7 |
| 02 | `SCENE` | 3D Component Rebuild (35 stubs → 35 scenes) | [PLAN-02-3d-component-rebuild.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-02-3d-component-rebuild.md) | 9 | 32 |
| 03 | `COVER` | Coverage Gap Closure (70 empty slots + 239-block re-scope) | [PLAN-03-coverage-gap-closure.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-03-coverage-gap-closure.md) | 8 | 23.5 |
| 04 | `HYGIENE` | Directory & Pipeline Hygiene (1,054 empty dirs) | [PLAN-04-directory-pipeline-hygiene.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-04-directory-pipeline-hygiene.md) | 6 | 6 |
| 05 | `SUBSTANCE` | Placeholder Eradication (339 hollow files) | [PLAN-05-placeholder-eradication.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-05-placeholder-eradication.md) | 8 | 19 |
| 06 | `FOUNDATION` | Structural & Encoding Repair | [PLAN-06-structural-encoding-repair.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/PLAN-06-structural-encoding-repair.md) | 6 | 5 |

Supporting files:

- **Manifest** — [program.json](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/program.json)
  · all 44 work packages with `dependsOn`, `priority`, `effortDays`, `status`; all 69 acceptance
  criteria; 31 risks; 68 artifact paths; topological `executionOrder`; parallel `waves`;
  `program.curriculumExpansion` recording the 239-block scaffold
- **This index** — [INDEX.md](file:///C:/Users/ASUS/Documents/Qoder/2026-11-08/4565238d/plans/INDEX.md)
- **Curriculum registry** — [curriculum-map.json](file:///C:/Users/ASUS/simulation/curriculum/curriculum-map.json)
  · authoritative list of all 239 blocks; read by P3.8 and by Plan 05's detector exemption
- **Curriculum layout** — [curriculum/README.md](file:///C:/Users/ASUS/simulation/curriculum/README.md)
- **Scaffold generator** — [tools/scaffold-curriculum.mjs](file:///C:/Users/ASUS/simulation/tools/scaffold-curriculum.mjs)
  · idempotent; re-running adds missing blocks and never overwrites an existing record

External inputs (read-only reference, not migration targets):

- `C:/Users/ASUS/topic format.txt` — the unimplemented schema sketch Plan 01 formalizes
- `C:/Users/ASUS/old-lab-page-reference.tsx` — 490-line prior lab page; Plan 02 reference,
  Plan 06 / P6.3 repairs its mojibake in place

## 3. How to execute

```
1. Read INDEX.md (this file)
2. Read program.json → pick the first work package whose dependsOn are all status=complete
3. Read that work package's plan file in full — the work-package table, the acceptance-criteria
   section and the risks section. Section numbers differ per plan (Plan 03 has an extra
   §4 Prioritization), so use plans[].acceptanceRef in program.json for the exact anchor.
4. Execute the work package against C:/Users/ASUS/simulation
5. Verify EVERY acceptance criterion in that plan that the work package touches
6. Set workPackages[id].status = "complete" in program.json
7. Repeat from step 2
```

**Parallelism:** work packages in the same `wave` may run concurrently. Never run across waves.
Wave 5 is the bulk (11 WPs, 42.5 days) and is designed for 4 parallel subject tracks.

### Hard rules

1. **Never start a work package with an incomplete dependency.** The graph in `program.json` is
   validated — no cycles, no missing references. Respect it.
2. **Plan 06 runs first.** It transcodes UTF-16 → UTF-8 and flattens a malformed path. Every
   other plan's tooling assumes readable UTF-8 at correct paths. Running Plan 01's validator or
   Plan 05's detector against UTF-16 produces silently wrong results.
3. **Plan 04 runs last.** `P4.2`/`P4.3` require `P5.7` (quarantine) first; `P4.4` requires `P3.7`
   and `P2.9`. Pruning a directory Plan 03 is about to fill destroys the target location.
4. **Completion means verified, not intended.** A work package is `complete` only when every
   acceptance criterion it touches is demonstrably true. Do not mark complete from a plan to do
   the work, a passing type check, or a file that exists but is hollow.
5. **Never fabricate content to pass a gate.** If NEB past papers are inaccessible, mark the file
   `sourced-pending` and escalate. An invented question attributed to a real exam year is worse
   than an honest gap. This is the single most important rule in the program.
6. **Never write a completion claim the filesystem does not support.** Status files are generated
   from `reports/coverage-matrix.json`, never hand-asserted. This is the defect that created the
   current state.
7. **Run every git command from `C:/Users/ASUS/simulation` — never from `C:/Users/ASUS`.** The
   target now has its own scoped repo at HEAD `92f0635` with all 391 files tracked and recovery
   verified (§0 PRE-1). The home directory remains a separate zero-commit root that does not track
   this tree; a stash there would sweep the entire user profile. Stash uncommitted work with a
   unique tag and restore with `apply`, never `pop`. Back up bytes before transcoding or pruning;
   retain backups until the corresponding CI gate is green.
8. **Update `program.json` as you go.** The next agent inherits your state. A stale manifest
   causes duplicate or skipped work.

## 4. Execution order

### Topological order (serial-safe)

```
P6.1  P6.2  P1.1  P1.2  P1.3  P1.4  P1.5  P1.6  P1.7  P6.3  P6.4  P6.5  P6.6
P2.1  P2.2  P2.3  P3.1  P3.8  P5.1
P2.4  P2.5  P2.6  P2.7  P2.8  P3.2  P3.3  P3.4  P3.5  P3.6  P5.2  P5.3  P5.4  P5.5  P5.6
P2.9  P3.7  P5.7  P5.8
P4.1  P4.2  P4.3  P4.4  P4.5  P4.6
```

The authoritative machine-readable order is `program.json → executionOrder`.

### Parallel waves

| Wave | WPs | Effort | Work packages |
|---|---|---|---|
| 0 | 3 | 2.0 d | `P4.1` `P6.1` `P6.2` |
| 1 | 5 | 6.5 d | `P1.1` `P2.1` `P6.3` `P6.4` `P6.5` |
| 2 | 5 | 4.5 d | `P1.2` `P1.3` `P1.4` `P3.1` `P6.6` |
| 3 | 3 | 7.0 d | `P1.5` `P2.2` `P3.8` |
| 4 | 3 | 4.5 d | `P1.6` `P1.7` `P2.3` |
| 5 | 11 | 42.5 d | `P2.4` `P2.5` `P2.6` `P2.7` `P2.8` `P3.2` `P3.3` `P3.4` `P3.5` `P3.6` `P5.1` |
| 6 | 7 | 18.5 d | `P2.9` `P3.7` `P5.2` `P5.3` `P5.4` `P5.5` `P5.6` |
| 7 | 2 | 2.0 d | `P4.4` `P5.7` |
| 8 | 2 | 2.5 d | `P4.2` `P5.8` |
| 9 | 1 | 1.0 d | `P4.3` |
| 10 | 1 | 1.0 d | `P4.5` |
| 11 | 1 | 0.5 d | `P4.6` |

`P4.1` appears in wave 0 because it only reads (policy ratification + tree snapshot). All
destructive Plan 04 work is correctly gated into waves 7–11.

`P3.8` appears in wave 3 because its only dependency is `P3.1` (wave 2). It runs alongside
`P1.5` and `P2.2`, adds 1.5 days of parallel effort, and is **off the critical chain** — so the
2027-01-22 end date is unchanged. It gates only the second curriculum tranche, never `P3.2`–`P3.7`.

### Critical path

```
P6.2 → P2.1 → P2.2 → P2.3 → P2.5 → P2.9 → P4.4 → P4.5 → P4.6      (20.5 days serial)
```

Transcode → app bootstrap → scene shell → mitochondria vertical slice → biology wave 2 →
runtime QA → fill-or-prune → dir-lint → status regeneration.

**`P2.3` (Mitochondria vertical slice) is the program's key gate.** Nothing in Plan 02's bulk
(P2.4–P2.8) starts until it passes review. It is chosen because mitochondria is the only unit
with real source content and an existing `3D LABELS` specification.

## 5. Plan-level dependency graph

```
                    ┌──────────────────────────────────────┐
                    │  06 FOUNDATION  (runs first, 5d)     │
                    │  transcode · flatten · bootstrap     │
                    └──────────────┬───────────────────────┘
                                   │ blocks 01, 02, 03, 04, 05
                    ┌──────────────▼───────────────────────┐
                    │  01 SCHEMA  (7d)                     │
                    │  topic.schema.json · LegendSpec      │
                    │  ConceptSpec · validator · CI gate   │
                    └───┬──────────────┬───────────────┬───┘
                        │              │               │
         ┌──────────────▼──┐  ┌────────▼────────┐  ┌───▼──────────────┐
         │ 02 SCENE (32d)  │  │ 03 COVER(23.5d) │  │ 05 SUBSTANCE(19d)│
         │ 35 real scenes  │  │ 70+41 +239 blk  │  │ 339 hollow files │
         └────────┬────────┘  └────────┬────────┘  └───┬──────────────┘
                  │  P2.9              │  P3.7         │  P5.7
                  └──────────────┬─────┴───────────────┘
                        ┌────────▼─────────────────────┐
                        │  04 HYGIENE  (runs last, 6d) │
                        │  prune · ledger · dir-lint   │
                        └──────────────────────────────┘
```

## 6. Program definition of done

The program is complete only when **all** of these are measurably true:

- [ ] `npm install && npm run dev` boots; `npm run build` succeeds (P6.5)
- [ ] Zero UTF-16 files; zero mojibake; zero directories deeper than 6 (P6.6)
- [ ] `topic.schema.json` frozen at v1.0.0; validator green in CI (P1.7)
- [ ] **Every** topic has a `LegendSpec` with ≥3 entries, each with a non-color channel (P1.2)
- [ ] 35 / 35 components render real interactive geometry; ≥7 live controls each; orbit fluid at
      opening quality; no leaked loops across 20 remount cycles (P2.9)
- [ ] 165 / 165 unit pillar slots and 50 / 50 organelle slots populated (P3.7)
- [ ] `hollow-detector.mjs --all --strict` exits 0; zero non-exempt files under threshold; zero
      unsupported completion claims. The only exemption is a 0-byte `notes.md` in a block whose
      `curriculum-map.json` status is `not-started`, derived at run time (P5.2 / P5.8)
- [ ] `reports/coverage-backlog-all-classes.json` covers all 239 curriculum blocks, tranched and
      ranked by exam weight, with the original 70 slots preserved as tranche 1 (P3.8)
- [ ] `find topics components motion conceptual pyqs pipeline -type d -empty -print`
      returns **0** — library roots only, so `.git/refs/tags` cannot fail the gate (P4.5)
- [ ] One append-only `cycles.jsonl` ledger; no row claims `complete` without existing artifacts (P4.3)
- [ ] All status files generated from measurement, carrying a `GENERATED — DO NOT EDIT` header (P4.6)
- [ ] All five CI gates green: integrity, schema, coverage, substance, dir-lint

**Tranche 2 is explicitly out of this program's definition of done.** Authoring content for the
235 `not-started` blocks beyond the original 33 Class 11 Science units is future work scoped by
P3.8, not a gate here. The program is done when the library is honest, runnable and fully covered
for tranche 1 — and when every remaining gap is a *declared* gap in the registry rather than a
false claim of completion.

## 7. Escalation triggers

Stop and escalate to the program owner rather than proceeding when:

| Trigger | Where | Why |
|---|---|---|
| A git command is about to run from `C:/Users/ASUS` | any destructive step | Home root has 0 commits and does not track this tree; a stash there sweeps the user profile. Use `C:/Users/ASUS/simulation` (HEAD `92f0635`) |
| NEB past-paper archive inaccessible | §0 BLOCKER 2 · P3.1 / P5.3 | Cannot author real PYQs; fabrication is forbidden |
| A transcode round-trip assertion fails | P6.2 | Data loss risk; backup must be restored |
| A mojibake character cannot be confidently recovered | P6.3 | Greek letters and sub/superscripts are semantically load-bearing |
| Coverage report says filled but directory is empty | P4.4 | Report bug — fix the report, never prune on a guess |
| Schema change requested after P1.7 freeze | P2.2+ | Requires a versioned migration, not an silent edit |
| Uncommitted work found before a destructive step | any | Stash with a unique tag; never discard |
| `P2.3` vertical slice fails review | P2.3 | Gates 26 days of downstream scene work |
| About to hand-edit `_subject.json` status, `notes` or `notesBytes` | §9 · P3.8 / P5.2 | Those fields are measurements. Edit the content and re-run the generator/report instead |
| About to guess an NEB subject syllabus code | §9 · P3.8 | Only `Mat. 007` is verified. A wrong code mis-maps every past paper under it |
| A `not-started` block gains non-empty notes below the Notes threshold | P5.2 | The exemption covers 0 bytes only; partial content must meet the full 600-word bar or stay empty |

## 8. Baseline re-verification

Before starting, re-measure the target repository and confirm the baseline in §1 still holds.
`program.json → program.baseline` carries the **current whole-tree** measurement;
`program.baselineAtPlanAuthoring` carries the original 391-file pre-rebuild measurement that the
plans' §2 Evidence sections cite. Both are dated 2026-11-08.

**One delta is already known and deliberate:** the all-class scaffold added 481 files
(480 under `curriculum/`, 1 under `tools/`). Whole-tree totals are now 872 files, 240 JSON,
242 `.md`, 129 UTF-16LE files. The defect metrics that matter are unchanged — 1,054 empty dirs,
35/35 stubs, 339/354 hollow `.txt`, 4 dirs deeper than 6, no `package.json`. The 240 `legend`
string hits are all `_subject.json` pillar-slot declarations plus the registry itself, **not**
actual legends; zero legends exist in the original library.

If a re-measurement differs from `program.baseline` in any *other* way, the repository changed
unexpectedly — update the manifest and re-rank before executing. P3.8 is the standing mechanism
for re-ranking; it reads `curriculum-map.json` rather than a hand-maintained list.

Suggested re-measurement (Node, no dependencies):

```js
// walk C:/Users/ASUS/simulation, count: files, empty dirs, .tsx under 4 lines,
// .txt under 40 words (decode UTF-16LE by BOM), occurrences of /legend/i,
// .json files, presence of package.json, dirs deeper than 6
```

## 9. All-class curriculum scaffold (added 2026-11-08)

The owner asked for every missing class/subject block across all grades and streams, with
**intentionally empty notes for now**. That is built and measured, not planned:

```
C:/Users/ASUS/simulation/curriculum/
  curriculum-map.json          239 blocks — authoritative registry
  README.md                    layout, counts, honesty rules, regeneration command
  basic/grade-01…08/           81 blocks   (CDC)
  secondary/grade-09…10/       40 blocks   (CDC, SEE)
  higher-secondary/grade-11…12/
    common/                     6 blocks   (English, Nepali, Social Studies)
    science/                   10 blocks
    management/                24 blocks
    humanities/                40 blocks
    education/                 20 blocks
    law/                       18 blocks
                             ───────────
                             239 blocks · 478 files + registry + README
```

Every block directory holds `_subject.json` (six pillar slots, all `null`) and `notes.md`
(**0 bytes, verified 239/239**). 235 blocks are `not-started`; 4 are `existing-hollow` — the
Class 11 Science physics/chemistry/biology/mathematics blocks that point at the original library.

Requested additions confirmed present: `basic/grade-08/account`,
`higher-secondary/grade-11/common/social-studies` and its grade-12 counterpart, all 24 Management
blocks, and mathematics at every grade 1–10 plus `mathematics` (Mat. 007) for Science and
`business-mathematics` for Management at 11–12.

**Honesty rules the scaffold already obeys, and that executing agents must not break:**

- No block claims `complete`, `done` or `solved`. Status is `not-started` and means exactly that.
- Only `Mat. 007` is a verified syllabus code. Every other `syllabusCode` is `null`. NEB series
  `007` (Grade 11) / `008` (Grade 12) is recorded, but **do not guess subject codes**.
- `notes: null` and `notesBytes: 0` are measurements. Never hand-edit them to look like progress.
- Source documents under-cover the syllabus: Physics 8 of 26 units, Chemistry 8 of 17,
  Mathematics 3 of 7. P3.8 adds those gaps to tranche 1.

**How this interacts with the plans:**

| Plan | Interaction |
|---|---|
| 03 / P3.8 | Reads the registry, ranks all 239 blocks, emits `coverage-backlog-all-classes.json`. The original 70 slots stay tranche 1; P3.2–P3.7 are unchanged and **not** gated by P3.8 |
| 05 / P5.2 | Detector exemption for 0-byte notes in `not-started` blocks, derived from the registry at run time (§5.1 of Plan 05). Without it the program's own DoD is unreachable |
| 04 / P4.5 | No conflict: `dir-lint` scans `topics/ components/ motion/ conceptual/ pyqs/`, and curriculum block dirs are non-empty at depth ≤5 |
| 06 / P6.6 | No conflict: scaffold files are UTF-8, depth ≤5, and the registry's asserted counts match a fresh walk |

Regenerate with `node tools/scaffold-curriculum.mjs` from `C:/Users/ASUS/simulation`. It is
idempotent: missing blocks are added, existing records are never overwritten.

**Git state:** the 481 scaffold files are **uncommitted** (`?? curriculum/`, `?? tools/`). HEAD
`92f0635` predates them. Committing requires the owner's explicit go-ahead — it has not been
given for this batch.