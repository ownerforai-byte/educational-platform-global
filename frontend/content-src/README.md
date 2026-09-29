# `content-src/` — typed authoring layer (PLANS.md §6)

Authoring in TypeScript instead of raw JSON, **opt-in per unit**. If
`frontend/content-src/<class>/<subject>/<unit>/` contains files, those are the
**sole source for that unit** — `content:build` validates them against
`ConceptNoteSchema` and ignores the authored JSON underneath (the JSON stays on
disk until deleted deliberately).

Layout (mirrors the class dir, but with the SHORT class slug):

```
content-src/
  class-11/physics/capacitor/
    01-capacitance-and-capacitor.ts   # `export default defineNote({...})`
    ...
```

Rules:

- One note per file: `export default defineNote({ … })` (helpers: `md`,
  `formula`, `computeBlock`, `widgetBlock` from `@/lib/content/schema`).
- The file name becomes the built filename: `01-x.ts` →
  `physics/capacitor/01-x.json`.
- A `_generated.json` file (from `scripts/derive_formulas.py`, PLANS.md §9)
  may sit beside the `.ts` files; it is validated the same way.
- Gate: `npm run content:build --check` still has to pass — and it checks
  content-src output byte-for-byte too.

Migration is ~15 min per unit, and nothing shipped changes: the build output
for a migrated unit is validated before it replaces the JSON emission.
