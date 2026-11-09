# PLAN 01 — Content Schema & Missing Pillars

**Program:** Simulation Library Rebuild
**Plan code:** `SCHEMA`
**Owner slot:** Content Architect
**Status:** Ready to start
**Window:** 2026-11-12 → 2026-11-20 (7 engineer-days)
**Depends on:** Plan 06 / P6.2 (UTF-8 transcode), Plan 06 / P6.1 (path flattening)
**Blocks:** Plan 02, Plan 03, Plan 05

---

## 1. Objective

Establish a single machine-enforced content contract for every topic in the library, so that
"concept", "legend", "summary", "key points", "worked examples", "formulas", "diagrams" and
"practice with answers" stop being optional prose and become required, validated fields.

Today the contract exists only as an unimplemented sketch in `C:\Users\ASUS\topic format.txt`.
Zero JSON files exist in the library. Nothing validates anything.

## 2. Evidence (measured 2026-11-08)

| Field | Files containing it | Verdict |
|---|---|---|
| `legend` | 0 / 391 | Absent library-wide |
| `summary` | 0 / 391 | Absent library-wide |
| `keyPoints` | 0 / 391 | Absent library-wide |
| `examples` (worked) | 0 | Claimed, never written |
| `formulas` | 7 (word mention only) | No formula blocks |
| `diagrams` | 2 (word mention only) | 0 image / SVG assets |
| `practice` Q **and** A | 0 of 12 question files | Questions listed, answers never written |
| `3D LABELS` spec | 1 / 33 units | Only `biology/03-cell-biology/mitochondria/structure.txt` |
| JSON schema files | 0 | Contract unimplemented |

## 3. Scope

**In scope:** schema definition, legend contract, concept-panel contract, label/motion contracts,
authoring template, validator CLI, three reference exemplars, CI gate.

**Out of scope:** writing the bulk topic content (Plan 03 / Plan 05), rendering the 3D scenes
(Plan 02). This plan defines the shape; those plans fill it.

## 4. Work packages

| ID | Title | Effort | Priority | Depends on |
|---|---|---|---|---|
| P1.1 | Author `topic.schema.json` (JSON Schema draft-07) | 1.0 d | Critical | P6.2 |
| P1.2 | Define `LegendSpec` contract + color-token registry | 1.0 d | Critical | P1.1 |
| P1.3 | Define `ConceptSpec` contract | 0.5 d | High | P1.1 |
| P1.4 | Define `Label3DSpec` and `MotionSpec` contracts | 1.0 d | High | P1.1 |
| P1.5 | Build `validate-topic.mjs` CLI + authoring template | 1.5 d | Critical | P1.1–P1.4 |
| P1.6 | Migrate 3 substantive files to schema as exemplars | 1.0 d | High | P1.5 |
| P1.7 | Wire CI gate: block merge on schema failure | 1.0 d | Critical | P1.5 |

### P1.1 — `topic.schema.json`

Required top-level fields, all mandatory unless noted:

```
title            string, non-empty
subject          enum: physics | chemistry | biology | mathematics
unit             string, pattern ^\d{2}-[a-z0-9-]+$
concept          ConceptSpec            (see P1.3)
notes            string, minLength 2400 characters
keyPoints        array<string>, minItems 5, maxItems 12
examples         array<WorkedExample>, minItems 3
formulas         array<Formula>, minItems 1 (0 allowed for descriptive biology units)
diagrams         array<DiagramRef>, minItems 1
legend           LegendSpec             (see P1.2)
labels3D         array<Label3DSpec>, minItems 3
motion           MotionSpec             (see P1.4)
practice         array<{question, answer, marks}>, minItems 5
pyqs             array<{year, question, solution, marks}>, minItems 5
summary          string, minLength 400, maxLength 1200
refs             array<{component, motion, sim}>  (optional)
```

`WorkedExample` = `{ prompt, given[], step[{ latex | text, reason }], result, unitCheck }`.
`Formula` = `{ name, latex, variables[{ symbol, meaning, siUnit }], validWhen }`.
`DiagramRef` = `{ src, alt, caption, credit }` — `src` must resolve on disk.

### P1.2 — `LegendSpec`

The single largest gap: **zero legends exist anywhere.** A legend is what makes a labelled 3D
scene readable instead of decorative.

```
LegendSpec {
  title: string
  entries: [{
    id: string              // stable, referenced by labels3D[].legendId
    swatch: string          // hex, must come from the subject token registry
    symbol: string          // e.g. "θ", "λ", "F₁Fo", "mtDNA"
    label: string           // human name, e.g. "Cristae"
    quantity: string|null   // physical quantity if applicable
    siUnit: string|null
    pattern: enum solid | dashed | dotted | hatched | glow   // non-color channel
  }]
  placement: enum inset-tl | inset-tr | inset-bl | inset-br | rail
  collapsible: boolean
}
```

**Accessibility requirement:** every entry must be distinguishable without color. `pattern` plus
`symbol` plus direct `label` are mandatory, not optional. Minimum 3 entries, maximum 14.

Subject token registry (fixed, so legends stay consistent across all 33 units):

| Subject | Primary | Secondary | Accent |
|---|---|---|---|
| Physics | `#3D8BFF` azure | `#7FE7FF` ice | `#FFB020` amber |
| Chemistry | `#B8F135` lime | `#2DD4A7` emerald | `#FF4FD8` orchid |
| Biology | `#FF4FD8` orchid | `#FF8A5B` coral | `#B8F135` lime |
| Mathematics | `#FFB020` amber | `#FF4D5E` crimson | `#3D8BFF` azure |

### P1.3 — `ConceptSpec`

```
ConceptSpec {
  definition: string          // one precise sentence, minLength 80
  intuition: string           // plain-language anchor, minLength 200
  derivation: Step[]|null     // required for physics/mathematics, null allowed for biology
  misconceptions: [{ wrong: string, correct: string }]   // minItems 2
  realWorldAnchor: string     // minLength 120
  prerequisites: string[]     // unit ids
  examWeight: enum high | medium | low
}
```

### P1.4 — `Label3DSpec` and `MotionSpec`

```
Label3DSpec { id, text, legendId, anchor: [x,y,z], leaderLine: boolean,
              occlusionTest: boolean, showAtZoom: [min,max] }

MotionSpec {
  timeline: [{ t: number(ms), target: string, property: string,
               from: any, to: any, easing: string, loop: boolean }]
  duration: number(ms)
  scrubber: boolean
  speedRange: [number, number]
  pausePoints: number[]
  narration: [{ t: number, text: string }]|null
}
```

`Label3DSpec.legendId` **must** resolve to a `LegendSpec.entries[].id`. This is the cross-field
constraint that ties the legend to the scene and is the main thing the validator enforces.

### P1.5 — Validator CLI

`tools/validate-topic.mjs` — Node, zero runtime dependencies beyond `ajv`.

- `--all` walks the library, reports per-file pass/fail
- `--strict` exits 1 on any failure (CI mode)
- `--fix-encoding` delegates to P6.2
- Cross-field checks: `legendId` resolution, `diagrams[].src` existence, `refs` existence,
  `practice[].answer` non-empty, `pyqs[].solution` non-empty, `notes` length threshold
- Output: human table + `reports/schema-report.json`

### P1.6 — Reference exemplars

Migrate the only three substantive files that exist today:

1. `biology/03-cell-biology/mitochondria/structure.txt` (101 words) → `mitochondria.topic.json`
2. `biology/03-cell-biology/plant-cell/structure.txt` (87 words) → `plant-cell.topic.json`
3. `conceptual/biology/mitochondria-deep/bio_01_mitochondria_intro.md` (95 words) → merged into (1)

These three become the gold standard every other unit is written against. They must pass
`--strict` with zero warnings. Note: each currently falls far short of the `notes` minLength,
so migration includes genuine expansion, not reformatting.

### P1.7 — CI gate

Pre-commit + CI job runs `validate-topic.mjs --all --strict`. A topic file cannot merge unless
it passes. Existing non-migrated `.txt` files are grandfathered via an explicit
`reports/schema-debt.json` allow-list that **shrinks monotonically** — CI fails if the allow-list
grows.

## 5. Acceptance criteria

- [ ] `topic.schema.json` exists and validates all 15 required fields
- [ ] `LegendSpec` is mandatory; a topic without a legend fails validation
- [ ] `legendId` cross-reference resolution enforced
- [ ] Every legend entry carries a non-color channel (`pattern` + `symbol`)
- [ ] `validate-topic.mjs --all --strict` runs and produces `reports/schema-report.json`
- [ ] 3 exemplar topics pass with zero warnings
- [ ] CI blocks merge on failure; debt allow-list cannot grow
- [ ] Authoring template generates a skeleton that fails validation until filled (proves the gate works)

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Thresholds set so high that Plan 03/05 stall | Medium | High | Pilot thresholds on the 3 exemplars first; tune before rollout |
| Biology units legitimately have no formulas | High | Low | `formulas.minItems` conditional on subject |
| Schema churn after Plan 02 starts rendering | Medium | High | Freeze schema at P1.7; changes require a versioned migration |
| Legend color tokens drift per author | Medium | Medium | Registry is a closed enum in the schema, not free hex |

## 7. Definition of done

Schema frozen and versioned (`v1.0.0`), validator green in CI, three exemplars published,
debt allow-list initialized with an exact count, and Plan 02/03/05 unblocked with a written
contract they can code against.

## 8. Artifacts produced

```
schema/topic.schema.json
schema/legend-spec.md
schema/concept-spec.md
schema/label-motion-spec.md
schema/subject-tokens.json
tools/validate-topic.mjs
tools/new-topic.mjs
templates/topic.template.json
topics/biology/03-cell-biology/mitochondria/mitochondria.topic.json
topics/biology/03-cell-biology/plant-cell/plant-cell.topic.json
reports/schema-report.json
reports/schema-debt.json
.github/workflows/schema-gate.yml
```