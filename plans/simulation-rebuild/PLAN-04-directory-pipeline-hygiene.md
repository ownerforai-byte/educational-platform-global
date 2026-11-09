# PLAN 04 — Directory & Pipeline Hygiene (1,054 Empty Directories)

**Program:** Simulation Library Rebuild
**Plan code:** `HYGIENE`
**Owner slot:** Build / Release Engineer
**Status:** Backlog
**Window:** 2027-01-11 → 2027-01-22 (6 engineer-days)
**Depends on:** Plan 03 / P3.7 (coverage report), Plan 02 / P2.9 (scene QA), Plan 05 / P5.7 (quarantine hand-off), Plan 06 / P6.4 (status correction)
**Blocks:** nothing — terminal cleanup

---

## 1. Objective

Eliminate every empty directory in the library and replace the fake pipeline ledger with one
machine-readable source of truth. An empty directory is a lie about coverage: it occupies a slot
in the tree, implies work exists, and is counted by naive tooling as progress.

**Policy established by this plan: a directory is either filled or removed. There is no third state.**

## 2. Evidence (measured 2026-11-08)

**1,054 empty directories** out of a 391-file library.

| Area | Empty dirs |
|---|---|
| `pipeline/topics/` | **992** |
| `pyqs/physics-chem-math/` | 19 |
| `conceptual/physics-chem-math/` | 12 |
| `biology/03-cell-biology/` (organelles) | 8 |
| `components/biology/` | 5 |
| `motion/chemistry/` | 5 |
| `components/chemistry/` | 3 |
| `motion/physics/` | 3 |
| `motion/biology/` | 2 |
| `biology/02-biomolecules` | 1 |
| `biology/08-plant-diversity` | 1 |
| `biology/09-animal-diversity` | 1 |
| `chemistry/01-foundation` | 1 |
| `physics/05-thermo` | 1 |
| **Total** | **1,054** |

### 2.1 The pipeline ledger is fiction

`pipeline/topics/` contains **1,259 cycle directories**:

| State | Count | Actual content |
|---|---|---|
| Completely empty | **992** | nothing |
| `done.txt` only | **121** | the single word `Active` |
| `topic.txt` only | **140** | the single word `Created` |
| `topic-definition.txt` | 6 | one real line each |

So **1,253 of 1,259 cycle directories carry no work product.** The six real ones are
`calculus-derivatives`, `cell-division`, `cycle-7-osmosis`, `newtons-laws`, `photosynthesis`,
`redox-oxidation`.

Meanwhile `pipeline/final-state.txt` asserts `CYCLES: 1560+ completed` and
`pipeline/engine/rules.txt` asserts `ALL SUBJECTS COVERED`. Both are contradicted by the
filesystem. The word `Active` in a file named `done.txt` is not a completion record.

### 2.2 The 62 real content directories

**Notes (12):** `biology/02-biomolecules`, `biology/08-plant-diversity`,
`biology/09-animal-diversity`, `chemistry/01-foundation`, `physics/05-thermo`, and 8 organelle
folders (`animal-cell`, `chloroplast`, `endoplasmic-reticulum`, `golgi`, `lysosome`, `nucleus`,
`ribosome`, `vacuole`).

**Components (8):** `biology/01-introduction`, `biology/02-biomolecules`,
`biology/09-animal-diversity`, `biology/11-fungal-plant-diversity`,
`biology/14-zoology-animal-systems`, `chemistry/01-foundation`, `chemistry/06-electrolysis`,
`chemistry/08-organic-equilibrium`.

**Motion (10):** `biology/09`, `biology/14`, `chemistry/02`, `chemistry/03`, `chemistry/04`,
`chemistry/07`, `chemistry/08`, `physics/06`, `physics/07`, `physics/08`.

**Conceptual (12) + PYQs (19):** all of `conceptual/physics-chem-math/*` and
`pyqs/physics-chem-math/*` — `chemistry-01…08`, `math-01…03`, `physics-01…08`.

## 3. Scope

**In scope:** empty-directory policy, pipeline ledger replacement, fill-or-prune execution for the
62 content dirs, directory lint in CI, `.gitkeep` policy.

**Out of scope:** authoring the content that fills the 62 dirs (Plan 03 owns that), the malformed
nested path (Plan 06 / P6.1 owns that).

**Sequencing note:** this plan runs **last**. Pruning a directory that Plan 03 is about to fill
would destroy the target location. P4.4 executes only after P3.7 reports the slot filled or
explicitly descoped. P4.2 and P4.3 execute only after **P5.7** has quarantined the 261 marker
files — Plan 05 moves them, Plan 04 retires them, and reversing that order would delete files
Plan 05 still needs to preserve. P4.1 (policy + tree snapshot) is the sole exception and may run
at any time, since it only reads.

## 4. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P4.1 | Ratify fill-or-prune policy; snapshot current tree | 0.5 d | High | — |
| P4.2 | Collapse 992 empty cycle dirs into `cycles.jsonl` ledger | 1.5 d | Critical | P4.1, P5.7 |
| P4.3 | Retire 261 `Active`/`Created` marker files into the ledger | 1.0 d | Critical | P4.2 |
| P4.4 | Fill-or-prune the 62 real content dirs | 1.5 d | High | P3.7, P2.9 |
| P4.5 | `dir-lint` CI gate + `.gitkeep` policy | 1.0 d | Critical | P4.2–P4.4 |
| P4.6 | Regenerate all status files from measured state | 0.5 d | High | P4.5, P6.4 |

### P4.2 / P4.3 — Replace the ledger

Delete the 1,253 hollow cycle directories. Preserve the 6 real ones by promoting their
`topic-definition.txt` content into the ledger. Replace the whole scheme with a single append-only
file:

```jsonl
{"cycle":7,"topic":"osmosis","status":"complete","artifacts":["topics/biology/.../osmosis.topic.json"],"ts":"..."}
{"cycle":1301,"topic":null,"status":"never-started","artifacts":[],"ts":"..."}
```

Rules for the new ledger:

- `status` enum is closed: `never-started | in-progress | complete | descoped`
- `complete` **requires** a non-empty `artifacts[]` and every listed path must exist on disk
- A cycle with no artifacts cannot be marked `complete` — enforced by `tools/ledger-lint.mjs`
- `never-started` entries are collapsed into a single range record rather than 992 rows, so the
  ledger stays readable: `{"cycles":"1301-2292","status":"never-started","count":992}`
- Append-only; corrections are new rows with a `supersedes` field, never silent edits

This removes 1,253 directories and 261 one-word files while **losing no information** — because
there was no information in them to lose. The 6 real definitions are preserved verbatim.

### P4.4 — Fill-or-prune the 62

For each directory, read `reports/coverage-matrix.json` from P3.7:

- Slot reported **filled** but directory empty → report bug; fix the report, do not prune
- Slot reported **filled** and directory populated → no action
- Slot reported **descoped** with a recorded reason → prune the directory, log the decision
- Slot still **open** → do not prune; escalate to the subject lead, keep the plan blocked

No directory is removed on a guess. Every prune writes a row to `reports/prune-log.jsonl` with
the path, the reason, the coverage-report version it was based on, and the timestamp.

### P4.5 — `dir-lint`

`tools/dir-lint.mjs` fails CI when:

- any directory under `topics/`, `components/`, `motion/`, `conceptual/`, `pyqs/` is empty
- any `.gitkeep` exists (they are banned — an empty dir must be pruned, not pinned)
- any directory depth exceeds 6 (catches the P6.1 class of defect recurring)
- any file named `done.txt`, `topic.txt`, or `status.txt` contains fewer than 20 words

### P4.6 — Regenerate status

`pipeline/final-state.txt`, `pipeline/engine/rules.txt`, `system-selection.txt`,
`system-coordination.txt` and `progress_*.txt` become **generated artifacts** with a header:

```
GENERATED FROM reports/coverage-matrix.json @ <commit> — DO NOT EDIT BY HAND
```

Any hand edit is reverted by CI. This is the structural fix for the false-claim problem;
P6.4 corrects the current text, P4.6 makes the correction permanent.

## 5. Acceptance criteria

- [ ] `find . -type d -empty` returns **0** results
- [ ] 992 empty cycle directories removed; 6 real definitions preserved verbatim in the ledger
- [ ] 121 `done.txt` + 140 `topic.txt` marker files retired into `cycles.jsonl`
- [ ] No ledger row claims `complete` without existing artifacts
- [ ] All 62 content dirs either filled (verified against coverage report) or pruned with a logged reason
- [ ] `reports/prune-log.jsonl` records every removal with path, reason, report version, timestamp
- [ ] Zero `.gitkeep` files in the library
- [ ] `dir-lint` green in CI; fails on a deliberately introduced empty dir (gate proven)
- [ ] All status files carry the GENERATED header and match measured state
- [ ] No content authored by Plan 03 or Plan 02 was destroyed by pruning

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Pruning destroys in-progress work | Medium | **Critical** | P4.1 takes a full tree snapshot first; P4.4 only acts on coverage-report verdicts; prune log enables exact reversal |
| Runs before Plan 03 finishes and removes target dirs | Medium | High | Hard dependency on P3.7; plan is terminal in the sequence |
| Cycle history has sentimental/audit value | Low | Low | Ledger preserves every cycle number and status, including `never-started` ranges |
| Uncommitted work in the tree at prune time | Medium | Critical | `git status` checked before any removal; anything uncommitted is stashed with a unique tag and restored by `apply`, never `pop` |
| `.gitkeep` ban breaks a legitimate future need | Low | Low | Policy is explicit and lint-enforced; exceptions require a recorded descope row |

## 7. Definition of done

Zero empty directories. One append-only ledger that cannot express a false completion. Every
removal logged and reversible. All status text generated from measurement. `dir-lint` green and
proven to fail on regression.

## 8. Artifacts produced

```
pipeline/cycles.jsonl
tools/ledger-lint.mjs
tools/dir-lint.mjs
tools/regenerate-status.mjs
reports/tree-snapshot-pre-hygiene.json
reports/prune-log.jsonl
reports/dir-lint-report.json
.github/workflows/dir-lint.yml
```