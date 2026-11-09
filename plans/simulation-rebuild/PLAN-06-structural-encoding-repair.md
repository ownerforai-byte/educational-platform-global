# PLAN 06 — Structural & Encoding Repair

**Program:** Simulation Library Rebuild
**Plan code:** `FOUNDATION`
**Owner slot:** Build Engineer
**Status:** Ready to start — **runs first**
**Window:** 2026-11-09 → 2026-11-13 (5 engineer-days)
**Depends on:** nothing
**Blocks:** Plan 01, Plan 02, Plan 03, Plan 04, Plan 05 (all of them)

---

## 1. Objective

Repair the physical substrate so every other plan can operate on readable files at correct
paths, and make the library actually runnable. Nothing else can be validated, authored or
rendered while the text is UTF-16, the paths are malformed, and there is no app entry point.

**This plan is the critical-path root. It starts first and finishes before Plan 01 begins.**

## 2. Evidence (measured 2026-11-08)

### 2.1 Malformed nested path

```
conceptual/physics-chem-math/physics-01/physics-02/physics-03/physics-04/
    physics-05/physics-06/physics-07/physics-08
```

Eight levels of nesting where eight **sibling** directories were intended. Verified present on
disk. Every level is empty. The parallel tree `pyqs/physics-chem-math/` has the same eight units
correctly as siblings — confirming the intended shape and confirming this is a path-join bug,
not a design choice.

### 2.2 Encoding

Nearly all `.txt` files are **UTF-16LE with BOM** (`ff fe` magic bytes). Confirmed on
`biology/03-cell-biology/mitochondria/structure.txt`: first bytes `ff fe 46 00 49 00 4c 00`
= `FIL` in UTF-16LE.

Consequences observed directly during the audit:
- Standard `cat` returns `[Binary output: 1626 bytes]` instead of text
- `ripgrep`-based search cannot index the content
- `pipeline/final-state.txt` renders as spaced-out garbage (`= = =   F I N A L`) in UTF-8 tools
- Any naive `fs.readFileSync(p, 'utf8')` in tooling silently produces mojibake

### 2.3 Mojibake in the reference component

`C:\Users\ASUS\old-lab-page-reference.tsx` (490 lines) has characters destroyed by an encoding
round-trip. Observed substitutions:

| Corrupted | Intended | Occurrences |
|---|---|---|
| `ΓÇö` | `—` em dash | many (titles, descriptions) |
| `ΓÇô` | `–` en dash | several |
| `╬╕` | `θ` theta | symbol-suite descriptions |
| `╬╗` | `λ` lambda | waves description |
| `╧ë` | `ω` omega | mechanics description |
| `╬╡` | `ε` epsilon | electricity description |
| `╬╜` | `ν` nu | atomic description |
| `ΓéÖ` | `ₙ` subscript n | Bohr radius `rₙ = r₀n²` |
| `Γéú` | `₀` subscript zero | same |
| `┬▓` | `²` superscript two | same |
| `Γ£ô` | `✓` check mark | status badge |
| `ΓöÇ` | `─` box drawing | section comments |
| `COΓéé` | `CO₂` | photosynthesis description |

These are CP437/CP850 renderings of UTF-8 bytes — the file was written as UTF-8, read as an OEM
codepage, and re-saved. The damage is reversible with a reverse-mapping table because the
original byte sequences are recoverable.

### 2.4 No runnable app

- `package.json` — **absent**
- app entry point — **absent**
- CSS files — **0**
- JSON files — **0**
- All 35 `.tsx` files import nothing and export a bare `<div>` (Plan 02)

The library is a folder of text and stubs. It cannot be started, built, or viewed.

### 2.5 False status claims

| File | Claim | Measured reality |
|---|---|---|
| `pipeline/engine/rules.txt` | `ALL SUBJECTS COVERED — Bio 14, Phys 8, Chem 8, Math 3` | 70 of 165 pillar slots empty |
| `pipeline/final-state.txt` | `CYCLES: 1560+ completed` | 1,253 of 1,259 cycle dirs hold no work product |
| `pipeline/final-state.txt` | `STATUS: NO STOP — pipeline continues indefinitely` | no pipeline process exists |
| `system-selection.txt:5` | `DONE — MITOCHONDRIA deep work complete` | 9 of 10 organelles have no notes; component is a stub |
| `system-coordination.txt` | `Expanding ... at full depth` | 339 of 356 files under 40 words |

## 3. Scope

**In scope:** path flattening, UTF-8 transcode with verification, mojibake reversal, status
correction, app bootstrap, integrity CI.

**Out of scope:** authoring content (Plans 03/05), building scenes (Plan 02), removing empty
directories (Plan 04 — P6.1 flattens a malformed path, it does not prune coverage).

## 4. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P6.1 | Flatten the malformed `physics-01…08` nested path | 0.5 d | Critical | — |
| P6.2 | Transcode all UTF-16LE files to UTF-8, verify losslessly | 1.0 d | Critical | — |
| P6.3 | Reverse mojibake in `old-lab-page-reference.tsx` | 0.5 d | High | P6.2 |
| P6.4 | Correct false status claims to measured values | 0.5 d | Critical | P6.2 |
| P6.5 | Bootstrap runnable app entry + dev server | 1.5 d | Critical | P6.2 |
| P6.6 | Integrity CI: encoding, path depth, status reconciliation | 1.0 d | Critical | P6.1–P6.5 |

### P6.1 — Flatten the path

Move the eight nested directories to siblings under `conceptual/physics-chem-math/`, matching the
shape already correct in `pyqs/physics-chem-math/`:

```
BEFORE: conceptual/physics-chem-math/physics-01/physics-02/.../physics-08   (depth 8, all empty)
AFTER:  conceptual/physics-chem-math/physics-01 ... physics-08              (depth 1, siblings)
```

All eight are empty, so this is a pure structural move with zero content risk. Verify against the
`pyqs` sibling list before and after. Then check whether the same path-join bug produced any other
nested anomaly — scan the whole tree for depth > 6 and report findings (do not auto-fix others).

### P6.2 — Transcode

`tools/transcode-utf8.mjs`:

1. Walk every `.txt`, `.md`, `.tsx`, `.json` file
2. Detect encoding by BOM (`ff fe` → UTF-16LE, `fe ff` → UTF-16BE, `ef bb bf` → UTF-8-BOM)
3. **Back up the original bytes** to `_encoding_backup/<relative-path>` before writing
4. Decode with the detected encoding, re-encode as UTF-8 **without BOM**
5. Verify: re-read the written file, assert the decoded string is identical to step 4's decode
6. Emit `reports/transcode-report.json` with per-file before/after encoding, byte counts, checksum

Files already UTF-8 are left byte-identical (no rewrite, no mtime churn). The backup tree is
retained until P6.6 passes, then removed by an explicit, logged step — never automatically.

**Critical ordering:** this runs before any content tooling. Plan 01's validator, Plan 05's
detector and Plan 03's coverage report all assume UTF-8; running them against UTF-16 would produce
silently wrong results.

### P6.3 — Reverse mojibake

`tools/fix-mojibake.mjs` with an explicit reverse-mapping table (the 13 pairs in §2.3, plus a
scan for any other CP437-range artifacts). Approach: re-encode the corrupted string to CP437
bytes, then decode those bytes as UTF-8 — this recovers the original exactly where the damage is
a clean round-trip. Fall back to the literal mapping table where it is not.

Verification is human review of the diff, not an automated pass: Greek letters and sub/superscripts
in physics descriptions are semantically load-bearing (`rₙ = r₀n²` must come back exactly, not as
`rn = r0n2`). Report any character that could not be confidently recovered rather than guessing.

Note this file lives at `C:\Users\ASUS\old-lab-page-reference.tsx`, **outside** the simulation
tree. It is reference material for Plan 02, not a migration target — repair it in place, do not
move it into the library.

### P6.4 — Correct status claims

Replace the five false claims in §2.5 with the measured values from the audit, each annotated
with its measurement date and source:

```
MEASURED 2026-11-08 from filesystem walk (391 files):
  pillar slots filled : 95 / 165   (70 empty)
  3D components real  : 0 / 35     (35 stubs)
  text files >= 40w   : 17 / 356   (339 hollow)
  empty directories   : 1054
  cycle dirs w/ product: 6 / 1259
```

This is a **correction, not a generation** — P4.6 later converts these files into generated
artifacts so the correction becomes permanent. Until then they are hand-written but accurate,
and carry the measurement date so a reader can tell how stale they are.

### P6.5 — Bootstrap the app

Create the minimum runnable entry so Plan 02 has a foundation and so the library can be viewed
at all:

```
package.json          Vite + React 18 + TypeScript + three + @react-three/fiber + drei
vite.config.ts
tsconfig.json
index.html
src/main.tsx
src/App.tsx           route shell listing the 33 units, lazy-loading each scene
src/styles/tokens.css the subject color-token registry from P1.2
```

`npm run dev` must boot and render the unit index. Scenes are lazy-loaded so the 35 stubs do not
block the shell from running. This package.json is the one Plan 02 / P2.1 extends — P2.1 and P6.5
are coordinated so the dependency set is chosen once, not twice.

### P6.6 — Integrity CI

`tools/integrity-check.mjs` fails CI when:

- any file has a UTF-16 BOM (encoding regression)
- any file contains a known mojibake sequence from the §2.3 table
- any directory depth exceeds 6 (path-join bug regression)
- any status file's asserted counts disagree with a fresh filesystem walk
- `npm run build` fails

The status-reconciliation check is the important one: it makes a false completion claim a **build
failure**, not a documentation problem.

## 5. Acceptance criteria

- [ ] `conceptual/physics-chem-math/physics-01…08` are eight siblings at depth 1, matching `pyqs/`
- [ ] Zero files with a UTF-16 BOM; all text readable as UTF-8 by standard tools
- [ ] Transcode verified lossless per file; `reports/transcode-report.json` complete
- [ ] `_encoding_backup/` retained until P6.6 passes, then removed by a logged step
- [ ] `cat` and `ripgrep` both work on the previously-binary files
- [ ] All 13 mojibake classes in `old-lab-page-reference.tsx` recovered; `rₙ = r₀n²`, `θ`, `λ`, `ω`, `ε`, `ν`, `CO₂`, `✓` render correctly
- [ ] Unrecoverable characters reported, not guessed
- [ ] All five false status claims replaced with measured, dated values
- [ ] `npm install && npm run dev` boots and renders the unit index
- [ ] `npm run build` succeeds
- [ ] `integrity-check.mjs` green; proven to fail on a deliberately re-introduced UTF-16 file

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Transcode loses data on a mixed-encoding file | Low | **Critical** | Byte-level backup before every write; per-file round-trip assertion; backup retained until CI green |
| Mojibake reversal is ambiguous for some characters | Medium | Medium | Report unrecoverable chars for human decision; never guess a Greek letter or subscript |
| Path move breaks an undiscovered reference | Low | Medium | All 8 dirs are empty; grep for the old path string before moving (post-transcode, so grep works) |
| Bootstrap dependency choices conflict with Plan 02 | Medium | High | P6.5 and P2.1 coordinate the dependency set once; P6.5 creates the minimum, P2.1 extends |
| Correcting status files is mistaken for regressing progress | Low | Low | Annotate every corrected number with measurement date + source; the counts were always this low |
| Working tree has uncommitted work at transcode time | Medium | High | `git status` before any write; stash with a unique tag and restore via `apply`, never `pop` |

## 7. Definition of done

Every text file in the library is UTF-8 and readable by standard tooling. Paths are well-formed.
The reference component's scientific notation is intact. Status files tell the truth and are
dated. The app boots and builds. Integrity CI is green and proven to catch each repaired defect
class if reintroduced. **Plans 01, 02, 03 and 05 are unblocked.**

## 8. Artifacts produced

```
tools/transcode-utf8.mjs
tools/fix-mojibake.mjs
tools/integrity-check.mjs
reports/transcode-report.json
reports/mojibake-report.json
reports/integrity-report.json
_encoding_backup/**                  (temporary, removed after P6.6)
package.json, vite.config.ts, tsconfig.json, index.html
src/main.tsx, src/App.tsx, src/styles/tokens.css
.github/workflows/integrity-gate.yml
```

---

## Program critical path

```
P6.1 P6.2 ──┬── P6.3 ──┐
            ├── P6.4 ──┤
            └── P6.5 ──┴── P6.6 ──┐
                                  │
              P1.1 ── P1.2/3/4 ── P1.5 ── P1.6 ── P1.7
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              P3.1 → P3.2-6   P5.1 → P5.3-6   P2.1 → P2.2 → P2.3
                    │             │             │        │
                    └──── P3.7 ───┴── P5.8      │   P2.4-2.8 → P2.9
                              │                 │        │
                              └─────────────────┴────────┘
                                          │
                                   P4.1 → P4.2/3 → P4.4 → P4.5 → P4.6
```

Total: **92.5 engineer-days** across **44 work packages**. Longest serial dependency chain is
**20.5 days** (`P6.2 → P2.1 → P2.2 → P2.3 → P2.5 → P2.9 → P4.4 → P4.5 → P4.6`). With 4 parallel
subject tracks after P1.7, elapsed calendar time is approximately **11 weeks**
(2026-11-09 → 2027-01-22).

`P3.8` (1.5 d, added 2026-11-08 for the 239-block all-class curriculum) hangs off `P3.1` and runs
in wave 3 alongside `P1.5` and `P2.2`. It is off the critical chain, so the calendar is unchanged.