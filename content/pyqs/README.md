# content/pyqs — subject-wise PYQ bank (second family)

A dedicated **Past-Year-Question bank** with one folder per subject, used by the
quiz engine (`frontend/lib/pyq-bank.ts` → quiz + AI quiz-studio) and by the AI
tutor as grounding knowledge (`backend/src/ai/curriculum-corpus.ts`, via the
`content/pyqs` corpus root which expands each bank's `questions` array into
retrievable Q&A records).

```
content/pyqs/
  class-11|class-12/
    physics/ chemistry/ mathematics/ biology/ english/ nepali/
      <unit>/<NN>-neb-<YYYY>.json
```

## File contract (same as `content/practice/questions/`)

Each bank is `{ title, year, examSource, unitSlug, origin, questions }` where
`questions[]` carries `{ id, type, marks, difficulty, prompt, solution }`.
`title`/`year`/`unitSlug` are meta; the corpus indexes `prompt` + `solution`.

- `examSource` uses the `[NEB-pattern YYYY]` tag: these are
  **curriculum-aligned practice sets modelled on NEB exam patterns**, not
  verbatim reproductions of any single paper. Year tags group cards in the UI.
- Canonical filenames (`NN-neb-YYYY.json`) are registered into
  `content/_index.json` + `frontend/public/data/content/_index.json` by
  `node scripts/pyq-register.mjs` — run it after adding a bank.

## Coverage map

- **Class 12** (the gap this bank fills — `practice/questions/` only had 2024):
  2023 + 2022 backfills for every subject, two units each.
- **Class 11**: single gap-year files in the highest-weight units
  (2022 dynamics, 2021 stoichiometry, 2020 biomolecules, 2020 algebra,
  2022 language-development, 2021 bhasha-ra-vyakarana).
