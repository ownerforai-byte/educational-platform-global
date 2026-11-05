# Content Pipeline

## How content flows into the app

```
content/notes/concepts/<class>/<subject>/<unit>/*.json
                │
                ▼
    npm run content:build
    (frontend/scripts/content/build.ts)
                │
                ▼
    frontend/public/data/syllabus-notes/<subject>/
      _manifest.json          ← public (titles, counts)
      <unit>/<file>.json      ← REMOVED (now served through /api/content/reveal)
                │
                ▼
    POST /api/content/reveal  ← gated: auth + tier + spark window
```

## Corpus structure

```
content/
├── notes/
│   ├── concepts/   <class>/<subject>/<unit>/NN-slug.json
│   ├── theory/     <class>/<subject>/[<unit>/]...json
│   ├── guides/     <class>/<subject>/<unit>/...json
│   └── lessons/    <subject>/...md
├── formulas/       <class>/<subject>/<unit>/...json
├── practice/
│   ├── questions/  past-year questions
│   ├── problem-sets/
│   ├── examples/
│   └── exams/
├── visuals/
│   ├── mindmaps/
│   ├── rails/      home rail cards
│   └── graphs/
└── resources/
    ├── question-bank/
    ├── documents/
    └── exports/
```

Single source of truth for paths: `frontend/lib/content/paths.ts`.

## Adding a new concept note

1. Find the correct subject + unit in `frontend/lib/syllabus.ts`
2. Create `content/notes/concepts/<class>/<subject>/<unit>/NN-slug.json`
   with fields: `title`, `unitSlug`, `topicSlug`, `topicTitle`,
   `relevance` (0–100), `notes` (string array)
3. Run `npm run content:build` to rebuild the public manifest
4. Run `npm run content:build:check` to verify byte parity
5. Run `npm run check:schema` for Zod validation

## Build scripts

```bash
npm run content:build              # build all subjects
npm run content:build physics      # one subject only
npm run content:build:check        # CI gate — fails if output differs
npm run check:content              # BOM repair + _index.json completeness
npm run check:schema               # strict Zod gate on corpus + manifests
```

## Content gating

Note body JSON files are **no longer served from `public/data/`**.
They are read server-side by `backend/src/api/content-reveal.ts` and
returned through `POST /api/content/reveal` only after:

1. Valid session (`requireAuth`)
2. Tier ≥ Plus (checked **before** spark)
3. Active 20-minute spark-unlock window

`_manifest.json` files (titles and counts only) remain public.

## File classification

- `[CONTENT FILE]` — everything under `content/`, `frontend/public/data/`,
  `backend/kb/`, `backend/.ocr-v2/`
- `[IMPORTANT CORE FILE]` — everything else

Agents must never bulk-read content files. See `AGENTS.md`.
