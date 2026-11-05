# Content guide — this directory is data, not code

Scoped to `content/**`. Everything here is a **[CONTENT FILE]** payload. The
rules exist to stop agents burning their context window on the corpus.

## Never

- Do not list recursively, bulk-read, `cat`, or grep across this tree to "get
  context". Thousands of near-identical JSON payloads live here.
- Do not reformat, reorder keys, rename files, or "clean up" payloads you were
  not asked to touch.
- Do not hand-edit generated indexes/manifests (`_index.json`, built mindmaps);
  regenerate them instead.

## To read or edit one payload

1. Get the exact path from the task, or resolve it from
   `frontend/lib/syllabus.ts` (canonical class → subject → unit → topic order)
   and `frontend/lib/note-routes.ts`. Never guess a slug.
2. Open only that file. One unit's payload is enough to infer the shape; the
   Zod schema gate below is authoritative for required fields.
3. Keep the hierarchy
   `content/notes/concepts/{classSlug}/{subjectSlug}/{unitSlug}/{concepts|formula|notes|pyqs|sets|examples|mindmap|rails}/`
   and the `{pad}.{topic-slug}.json` naming. Home-rail cards live under
   `content/visuals/rails/...` — see `frontend/AGENTS.md` §9 for that workflow.

## After editing

```bash
node scripts/validate-content.mjs     # every content JSON parses; exit 1 on broken
npm run check:schema                  # strict Zod gate on corpus + built manifests
npm run content:build                 # only if you added/removed payloads (rebuilds mindmaps)
```

`draft: true` cards and TODO rows are legitimate unfinished data, not errors;
the readiness gates report them without failing. Empty or broken JSON is an
error — fix the payload, never the gate.
