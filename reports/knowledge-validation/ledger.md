# 📊 Knowledge Validation Ledger

Progress ledger for the **Knowledge Validity Plan** — see [KNOWLEDGE-PLAN.md](../KNOWLEDGE-PLAN.md)
for the method (§5), the source hierarchy (§4) and the full per-topic checklist (§12).
This file tracks units as they complete; the checklist in `KNOWLEDGE-PLAN.md` tracks topics.

## Baseline (2026-10-28, from `npm run check:all`)

| Measure | Value |
|---|---:|
| Topics in scope (6 subjects, Class 11 + 12) | 696 |
| Units in scope | 116 |
| Content JSON files (0 broken) | 4,231 |
| Note files authored / thin / placeholder | 2,345 / 432 / 0 |
| Note scopes partial or THIN | 81 of 280 |
| Topics with on-topic visual trees | 696 / 696 |

Definition reminders: a file is **thin** with < 4 substantive notes; a topic is **done** when its
Validation Card is stored here under `class-<n>/<subject>/<unit>.md` and its row in
`KNOWLEDGE-PLAN.md §12` is ticked `[x]` (verified) or `[!]` (verified + corrected).

## Unit progress

| Date | Subject | Unit | Topics | Outcome | Card |
|---|---|---|---|---|---|
| 2026-10-28 | Biology (11) | biomolecules-and-cell-biology | 4 | 3 corrected `[!]`, 1 verified `[x]` | [card](class-11/biology/biomolecules-and-cell-biology.md) |

**Totals:** 4 / 696 topics validated · 0 / 19 Biology units complete.

## Escalations (see cards for detail)

- **Template filler lines** (e.g. "Worked: identify given → …", "answer pattern for …", duplicated
  universalFacts) are stamped across the corpus by the generator — currently suppressed at the
  serving layer ("filler counted, not served"). Needs a generator-level cleanup decision; per-file
  hand-editing is not the fix.
- **Out-of-unit occurrences of the mesosome error** found in `introductory-microbiology`
  (5 files: 2 concept, 2 rails, 1 mindmap) — queued for that unit's own pass.
- **Cross-subject filler leakage** found in other units (e.g. IUPAC nomenclature text inside
  `floral-diversity`, a physics formula inside `ecology`) — queued as findings for those units.
