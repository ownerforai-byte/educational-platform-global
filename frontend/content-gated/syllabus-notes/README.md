# Topic concept data — layout and the `enrichedContent` dead mirror

This directory holds the per-topic JSON consumed by the topic workspace
(`components/content/topic-vertical-notes.tsx`). This file explains the data
layout, and specifically why a `enrichedContent` object exists in ~104 files
but is **not rendered**.

## What the UI actually reads

`topic-vertical-notes.tsx` loads each concept file and reads these fields
**directly off the top level** of the object:

| Field | Rendered as |
| --- | --- |
| `summary` | Topic summary paragraph |
| `importantConcepts`, `importantStatements`, `importantTasks` | Concept / statement / task cards |
| `keyPoints` | Key points (boilerplate filtered — see below) |
| `specialNotes`, `examShortTricks`, `examNotes` | Note panels |
| `practiceQuestions`, `practice`, `numericals` | Practice lists |
| `mcs` | Multiple-choice self-check quiz |
| `notes`, `confusion`, `examples`, `universalFacts`, `formulas` | Notes / misconceptions / examples / facts / formulas |
| `animation3D`, `motionGraphics`, `visualType` | Visual selection |

A file missing any of those renders an **empty panel**, not an error — which is
why gaps here are easy to miss. `scripts/audit-topic-sections.mjs` reports them:

```
node scripts/audit-topic-sections.mjs          # list every gap
node scripts/audit-topic-sections.mjs --quiet  # exit 1 if any gap remains
```

### Boilerplate is silently dropped

The component filters out any string matching `isBoilerplate()`:

```ts
/^Key Formula \d+:/i  /^Key Point \d+:/i  /^Example \d+:/i
/^Q\d+\.\s*(Define and explain|Solve problems|…)/
```

So a section that is *present but entirely boilerplate* renders just as blank as
one that is absent. The audit script counts boilerplate as empty for this
reason.

## Why `enrichedContent` is dead

**It was never wired into the topic workspace.** It belongs to a different,
earlier component.

Commit `8a4f3fdf` ("feat(visual/3d): shared 3D rig … concept knowledge
integration") introduced the key, together with generator scripts
(`content-tools/enhance-physics-content.cjs`, `enhance-chemistry-content.cjs`,
`add-tabbed-structure*.cjs`). The intent was a two-version toggle in
`components/content/ravikishan-concept-panels.tsx`:

```tsx
const contentData: TopicData =
  data.enrichedContent && activeTab === "enriched" ? data.enrichedContent : data;
```

i.e. a button let a student switch between the base note and an "enriched"
rewrite of it.

That toggle no longer exists. `ravikishan-concept-panels.tsx` still exists and
still exports `ConceptKnowledgeGrid`, `FormulaPanel` and `NumericalPanel`, but it
contains no reference to `enrichedContent`, no `activeTab`, and no
`data.sections` — the branch that consumed the key was removed. Only
`FormulaPanel` and `NumericalPanel` are still imported (by
`components/content/content-tabs.tsx`).

Nothing in `frontend/components` or `frontend/lib` reads `enrichedContent`.
`git log -S 'enrichedContent' -- frontend/components/content/topic-vertical-notes.tsx`
returns nothing, so the topic workspace never read it in the first place.

**Net effect:** the key is a dead mirror of the top-level data.

## What is actually in it

Across the 104 files that carry it, `enrichedContent` mostly duplicates
top-level content — but one child key exists **only** there:

| Key | Files | Status |
| --- | --- | --- |
| `visualization` | 69 | Not read by any component. Shape: `{ type, component, desc }`. |
| `exercises` | 35 | Also present at top level; this copy is not read. |

So the object is not 100% redundant: `visualization` is genuinely unmirrored
data. It is currently dead, and remains dead, until something renders it.

## Rules for editing these files

1. **Write content at the top level.** Never inside `enrichedContent` — edits
   there have no effect on the page.
2. **Do not add sections to `enrichedContent`.** It is a historical artifact.
3. **`mcs[].answer` must be a bare letter** `"A"`–`"D"` matching the correct
   option's index. Put any working in a sibling `"explanation"` key. (Several
   files previously shipped `"answer": "A (s₃ = …)"`, which reads fine to a human
   but breaks positional matching.)
4. **Every one of the 10 core sections must be non-empty** in every file.
5. **Boilerplate does not count as content** — see `isBoilerplate()` above.
6. Files are UTF-8 without BOM. Use real Unicode (`×`, `⁻`, `°`, `₂`) rather
   than escaped lookalikes.
7. `_manifest.json` lists the runtime entries and is maintained separately by
   `content-tools/build-syllabus-notes.js`; do not hand-edit it.
