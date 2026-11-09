# PLAN 05 — Placeholder Content Eradication (339 Hollow Files)

**Program:** Simulation Library Rebuild
**Plan code:** `SUBSTANCE`
**Owner slot:** Subject Leads + QA
**Status:** Blocked by Plan 01
**Window:** 2026-11-18 → 2026-12-18 (19 engineer-days, parallel with Plan 03)
**Depends on:** Plan 01 / P1.1, P1.5, Plan 06 / P6.2
**Blocks:** Plan 04 / P4.4

---

## 1. Objective

Replace every file that *claims* completion with content that *is* complete. This is the largest
single defect in the library: 339 of 356 text files are under 40 words, and the dominant pattern
is a one-line assertion that questions are "solved" when no question and no solution is present.

Filling an empty slot (Plan 03) is not enough — a slot filled with `PYQ solved.` is still empty.
This plan defines what "substantive" means and enforces it.

## 2. Evidence (measured 2026-11-08)

**356 text files. 339 under 40 words. Only 17 at or above 40 words. Only 3 genuinely substantive.**

### 2.1 The three real files

| File | Words |
|---|---|
| `biology/03-cell-biology/mitochondria/structure.txt` | 101 |
| `biology/03-cell-biology/plant-cell/structure.txt` | 87 |
| `conceptual/biology/mitochondria-deep/bio_01_mitochondria_intro.md` | 95 |

Everything else in the "substantial" bucket is pipeline logging or a one-paragraph summary.

### 2.2 Specimens of the hollow pattern

| File | Entire content | Words |
|---|---|---|
| `pyqs/physics/02-waves/pyqs.txt` | `PYQ solved.` | 2 |
| `pyqs/biology/05-genetics/pyqs.txt` | `PYQ Gen solved.` | 3 |
| `pyqs/chemistry/05-oxidation/pyqs.txt` | `PYQ Chem 05 solved.` | 4 |
| `pyqs/math/01-algebra/pyqs.txt` | `PYQ Math 01 solved.` | 4 |
| `pyqs/chemistry/01-foundation/pyqs.txt` | `PYQ Chem 01 solved + references.` | 6 |
| `conceptual/chemistry/04-bonding/questions.txt` | `CONCEPTUAL Chem 04: Ionic/covalent/VSEPR/hybrid 5 Q solved.` | 7 |
| `conceptual/biology/05-genetics/questions.txt` | `CONCEPTUAL Bio 05 (DNA→RNA→Protein, Mendel): 5 Q full sol.` | 9 |
| `motion/chemistry/06-electrolysis/motion-detail.txt` | (9 words, no timings, no targets) | 9 |
| `pipeline/topics/cycle-1311/done.txt` | `Active` | 1 |
| `pipeline/topics/cycle-1321/topic.txt` | `Created` | 1 |

Note the specific contradiction: `conceptual/biology/05-genetics/questions.txt` says **"5 Q full
sol"** and contains neither a question nor a solution. `pyqs/physics/02-waves/pyqs.txt` says
**"PYQ solved"** at two words. These are not summaries; they are false completion records.

### 2.3 Hollow files by area

| Area | Hollow files | What they claim vs. contain |
|---|---|---|
| `pyqs/` | 12 | "5yr solved" — no questions, no solutions, no marking scheme |
| `conceptual/` | 12 | "5 Q full sol" — no questions, no answers |
| `motion/` | 30 | "motion detail" — no timeline, no targets, no timings, no easing |
| unit notes (`biology/`, `chemistry/`, `physics/`, `math/`) | 33 | one-line topic lists, 14–37 words |
| `pipeline/topics/` | 261 | `Active` / `Created` / `Working — cycle N` |
| `pipeline/` root + logs | 6 | status assertions contradicted by disk |

## 3. Substance thresholds

A file passes only if it meets the threshold **for its pillar**. Word count alone is necessary
but not sufficient — structural checks are what catch `PYQ solved.` padded to 600 words.

| Pillar | Minimum | Structural requirement |
|---|---|---|
| **Notes** | 600 words / 2,400 chars | ≥5 `keyPoints`; ≥1 `formulas` entry (except descriptive biology); ≥1 `diagrams` ref that resolves on disk; `summary` 400–1,200 chars |
| **Concept** | 400 words | `definition` ≥80 chars; `intuition` ≥200 chars; ≥2 `misconceptions` pairs; `derivation` non-null for physics/math |
| **Conceptual Q+A** | 5 questions | Each has `question`, `answer` ≥150 chars, `marks`; answer contains worked steps, not just a result |
| **PYQ** | 5 year-entries | Each has `year`, `question`, `solution` ≥200 chars, `marks`; years span ≥5 distinct values; no duplicate question text |
| **Motion** | 6 timeline events | Each has `t`, `target`, `property`, `from`, `to`, `easing`; `duration` > 0; `speedRange` valid; ≥1 `pausePoint` |
| **Legend** | 3 entries | Each has `swatch` from token registry, `symbol`, `label`, `pattern`; every `id` referenced by ≥1 `labels3D` entry |
| **3D labels** | 3 labels | Each `anchor` is a 3-vector; `legendId` resolves; `showAtZoom` range valid |

### 3.1 Hollow-claim detection

Independent of length, flag any file that matches a completion claim without the structure:

```
/\b(all\s+)?(solved|complete[d]?|done|finished|covered)\b/i
```

If the claim is present and the corresponding structural requirement is unmet → **FAIL**, with
the offending claim quoted in the report. This is the check that would have caught all 12 PYQ
files and all 12 conceptual files immediately.

## 4. Scope

**In scope:** thresholds, detector tooling, rewriting the 87 real content files (12 PYQ + 12
conceptual + 30 motion + 33 notes), quarantining the 261 pipeline placeholders, re-audit.

**Out of scope:** the 992 empty cycle dirs and the ledger scheme (Plan 04), schema definition
(Plan 01), 3D geometry (Plan 02). Files that do not exist at all are Plan 03's job.

**Exempt by declaration, not by silence:** the 239 `curriculum/**/notes.md` files created by the
all-class scaffold are intentionally 0 bytes and carry `status: "not-started"` in
`curriculum/curriculum-map.json`. They are honest gaps, not hollow claims. See §5.1 — the
exemption is derived from the registry and shrinks automatically as blocks are authored. A
`not-started` block that gains non-empty notes without meeting the Notes threshold is **not**
exempt and fails the gate.

## 5. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P5.1 | Ratify substance thresholds; calibrate on 3 exemplars | 1.0 d | Critical | P1.6 |
| P5.2 | Build `hollow-detector.mjs` (length + structure + claim regex) | 2.0 d | Critical | P5.1, P1.5 |
| P5.3 | Rewrite 12 PYQ files — real questions, solutions, marking scheme | 4.0 d | Critical | P5.1 |
| P5.4 | Rewrite 12 conceptual Q+A files — 5 worked answers each | 3.5 d | Critical | P5.1 |
| P5.5 | Rewrite 33 unit notes files to threshold | 5.0 d | High | P5.1 |
| P5.6 | Rewrite 30 motion specs with real timelines | 2.0 d | High | P1.4, P5.1 |
| P5.7 | Quarantine 261 pipeline placeholders; hand off to Plan 04 | 0.5 d | Medium | P5.2 |
| P5.8 | Re-audit + CI gate; reconcile status claims with measurement | 1.0 d | Critical | P5.3–P5.7 |

### P5.2 — Detector exemption for declared-empty curriculum blocks

`hollow-detector.mjs --all` walks the whole tree, so it will encounter the 239 zero-byte
`curriculum/**/notes.md` files created by the all-class scaffold. Without an exemption the
program's own definition of done ("zero files under threshold") can never be satisfied, and the
pressure to fabricate content to clear CI is exactly the failure mode this plan exists to prevent.

The exemption is **derived, never hand-listed**:

```
exempt(path) := curriculum-map.json.blocks[path].status === "not-started"
                AND fs.statSync(path).size === 0
```

Rules the detector must enforce:

- Read the block list from `C:/Users/ASUS/simulation/curriculum/curriculum-map.json` at run time.
  Never hard-code grades, subjects or paths — P3.8 re-ranks the same registry.
- Exemption applies **only** to a 0-byte file in a `not-started` block. The moment a file gains a
  single byte it is judged against the full Notes threshold (600 words + structure).
- A block whose `status` is `existing-hollow` (the 4 Class 11 Science subjects) is **never**
  exempt — those are the files P5.3–P5.6 already target.
- The report emits `exemptNotStarted: <n>` alongside `failed: <n>`. CI asserts
  `failed === 0`; `exemptNotStarted` is reported, not gated, and must decrease monotonically as
  Plan 03's second tranche lands.
- The hollow-claim regex (§3.1) still runs on exempt files. A 0-byte file cannot match it, but a
  `_subject.json` that claims `complete` while `notes` is `null` must fail.

P3.8 registers this rule against the ranked backlog; P5.2 implements it; P5.8 proves it in CI.

### P5.3 — PYQ rewrite (12 files)

Targets: `biology/01-introduction`, `biology/02-biomolecules`, `biology/04-division`,
`biology/05-genetics`, `biology/mitochondria-deep`, `biology/pyq-01-14`,
`chemistry/01-foundation`, `chemistry/05-oxidation`, `math/01-algebra`,
`physics/01-mechanics`, `physics/02-waves`, `physics/03-electricity`.

Each becomes ≥5 entries spanning ≥5 distinct years, every entry carrying the actual question
text, a full solution with marking-scheme mark allocation, and the year it appeared.

**Sourcing constraint — non-negotiable:** questions must come from real NEB past papers. If the
archive is not accessible, the file is marked `sourced-pending` and **fails** the gate; it is
never filled with invented questions attributed to real years. Fabricating a past paper is worse
than an honest gap. P3.1 confirms archive access in week 1 and this plan inherits that verdict.

### P5.4 — Conceptual Q+A rewrite (12 files)

Targets: `biology/01-introduction`, `biology/02-biomolecules`,
`biology/03-cell-biology/mitochondria`, `biology/04-division`, `biology/05-genetics`,
`chemistry/01-foundation`, `chemistry/04-bonding`, `chemistry/05-oxidation`,
`math/01-algebra`, `physics/01-mechanics`, `physics/02-waves`, `physics/03-electricity`.

Each becomes 5 real questions with worked answers. `conceptual/biology/01-introduction/questions-solutions.txt`
is the closest to real today (42 words) and is the calibration target, not the bar.

### P5.6 — Motion specs (30 files)

Every `motion-detail.txt` becomes a `MotionSpec` with ≥6 timed events. Today the worst is
`motion/chemistry/06-electrolysis/motion-detail.txt` at 9 words — no target, no property, no
timing. A motion spec without timings cannot drive an animation, which is why all 35 scenes are
stubs: there was never anything to animate from.

Priority order follows Plan 02's build order, so each spec lands before its scene is built:
mitochondria → physics 8 → chemistry 5 → biology remaining → math 3.

### P5.7 — Quarantine, not delete

The 261 pipeline placeholder files are **moved** to `pipeline/_quarantine/` preserving relative
paths, not deleted. Plan 04 / P4.3 then retires them into the ledger. Quarantine keeps the
operation reversible and keeps the two plans' blast radii separate.

## 6. Acceptance criteria

- [ ] `hollow-detector.mjs --all --strict` exits 0
- [ ] Zero non-exempt files under their pillar threshold
- [ ] Exemption derived at run time from `curriculum-map.json`, applied only to 0-byte files in `not-started` blocks; never to `existing-hollow`
- [ ] Report emits `exemptNotStarted` separately from `failed`; a `not-started` block with non-empty sub-threshold notes fails the gate
- [ ] Zero files matching a completion claim without the matching structure
- [ ] All 12 PYQ files carry ≥5 distinct years with real question text and mark-allocated solutions
- [ ] No PYQ entry attributes an invented question to a real year (`sourced-pending` used instead where archive access failed)
- [ ] All 12 conceptual files carry 5 questions with answers ≥150 chars containing worked steps
- [ ] All 30 motion specs carry ≥6 timed events with valid `target`/`property`/`easing`
- [ ] All 33 notes files meet 600 words **and** the structural requirements
- [ ] 261 pipeline placeholders quarantined with paths preserved, handed to Plan 04
- [ ] Detector proven to fail on the original `PYQ solved.` specimen (regression fixture kept)
- [ ] CI runs the detector in the same job as the schema validator

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| NEB past-paper archive inaccessible | **High** | **Critical** | Confirm in week 1; use `sourced-pending` status; never fabricate; escalate to program owner for a sourcing decision |
| Authors pad word count to pass the gate | High | High | Structural checks are independent of length; claim-regex catches padded assertions |
| 33 notes rewrites at 600 words each is underestimated | Medium | Medium | Calibrate effort on 3 exemplars in P5.1 before committing the track |
| Motion specs written without a renderer to test against | Medium | Medium | Sequence P5.6 ahead of the matching P2 scene; validate against `MotionSpec` schema, then against the real scene in P2.9 |
| Quarantine move breaks a path something references | Low | Medium | `refs` cross-check in the validator runs after the move |
| Detector false-positives on legitimate prose using "complete" | Medium | Low | Claim regex only fires when the structural requirement is *also* unmet |

## 8. Definition of done

Every text file in the library either meets its pillar threshold or carries an explicit,
gate-visible `sourced-pending` / `descoped` status. No file asserts work it does not contain.
The detector is green in CI and has a regression fixture proving it catches the original defect.

## 9. Artifacts produced

```
schema/substance-thresholds.json
tools/hollow-detector.mjs
tools/fixtures/hollow-pyq.txt          (regression specimen: "PYQ solved.")
reports/hollow-report.json
reports/hollow-report.md
pyqs/**/*.topic.json                   (12 rewritten)
conceptual/**/*.topic.json             (12 rewritten)
motion/**/*.motion.json                (30 rewritten)
topics/**/notes                        (33 rewritten)
pipeline/_quarantine/**                (261 preserved)
.github/workflows/substance-gate.yml
```