# PLANS — Typed content core + live formulas (JSON stays the storage format)

Status: **Phase 1 APPLIED on `main`** (schema tree + validate/repair CLI + corpus
test + CI workflow + baseline ratchet, landed in `73793f3b`); the §4.2 `formula.ts`
and §4.6 `syllabus-ref.ts` tails are still pending. Phases 2–6 not started.
`main` is the only deployable branch — the `feature/notes` worktree still sits at
its stale base `46a048bf`; do not build there. Deep-inspected against the working
tree at `73793f3b` (clean) on 2026-09-29; every APPLIED/PENDING note below comes
from that inspection.

---

## 1. Objective

Give the content system TypeScript-level power and real computation **without** making
authored content executable.

- JSON stays the shipped, runtime-fetched format (`frontend/public/data/…`).
- TypeScript becomes the authoring + validation layer (Zod, single source of truth).
- Interactivity is **declarative**: content names a block and passes props; the code
  that runs lives in the bundle and is whitelisted.

Non-goals (deliberately excluded):

- Converting the 1,240 content JSON files into JS modules — loses runtime fetch, bloats
  the client bundle and build time, and turns content into code.
- Real MDX with embedded JSX in notes (`@next/mdx`) — same objection.
- Loosening `rehype-sanitize`, `dangerouslySetInnerHTML` on unsanitised input, any
  `eval` / `new Function` / dynamic `import()` driven by content text.
- Editing `frontend/lib/syllabus.ts` (owner approval required, see its header rule).

---

## 2. Verified current state

| Fact | Evidence |
|---|---|
| Rich rendering already exists: Markdown, GFM tables/lists, `$…$`/`$$…$$`/`\(…\)`/`\[…\]` KaTeX, mhchem `\ce{…}`, fenced code highlighted, `:::formula`/`:::trick` + `> [!TRAP]` callouts, raw HTML sanitised | `frontend/lib/content/pipeline.ts` (`noteProcessor`, `renderNoteHtml`), `frontend/lib/content/katex.ts` (`KATEX_OPTIONS`, `KATEX_MACROS`, `normalizeMathDelimiters`, `normalizeLatexExpression`), `frontend/lib/content/callouts.ts` |
| Single render entry point, server component, no client JS | `frontend/components/content/math-markdown.tsx` → `dangerouslySetInnerHTML` of sanitised HTML |
| Authored content: **1,240 JSON under `content/` in total** — that count also covers `backup-…/`, `exams/`, `lessons/`, `r-export/`. `content/ravikishan/` itself holds **891**: 630 under `{classSlug}-notes/{subject}/{unit}/concepts/NN-slug.json`, 60 `mindmap/`, plus `formula/ notes/ pyqs/ sets/ examples/` and a separate 90-file `class-11/` tree that the in-scope path rules ignore (`CLASS_DIR_TO_SLUG` doesn't exist — see §4.3) | `find content -name '*.json' \| wc -l` |
| Built to **631** JSON + **6** `_manifest.json` (602 entries total) under `frontend/public/data/syllabus-notes/{subject}/` | `find frontend/public/data/syllabus-notes -name '*.json'` |
| Runtime **fetches** that JSON | `frontend/lib/data-loader.ts` (`/data/${safe}`), `frontend/lib/topic-content-index.ts` |
| `zod@^3.25` installed. Content now HAS a schema: `frontend/lib/content/schema/{atoms,concept,index,manifest,mindmap}.ts` — `.strict()`, 40 measured fields in three tiers (Required/Authored/Extended). `formula.ts` + `syllabus-ref.ts` (§4.2/§4.6) do **not** exist yet | `ls frontend/lib/content/schema/` |
| ~40 ad-hoc mutation scripts instead of validation | `content-tools/*.cjs`, `scripts/*.py`, `scripts/*.cjs`, `scripts/validate-content.mjs` |
| `frontend/agents.md` referenced missing `scripts/{validate,organize}-content.ts` and BE port 3001 — **FIXED 2026-09-29** (commands now point at `validate-content.mjs` / `check:schema` / `validate.ts`; BE 3000 everywhere; FE 5173 was always correct — `next dev -p 5173` pins it) | `grep -n frontend/agents.md` |
| Syllabus API available for validation: `SYLLABUS: ClassSyllabus[]`, `SyllabusUnit{id,title,topics[],hours?,introducedIn?}`, `getSyllabusByClass`, `getSubjectSyllabus(classSlug, subjectSlug)`, `getUnitSyllabus(subject, unitId)`, `getUnitTopicEntries(unit)`, `getTopicEntryBySlug`, `slugifySyllabusTopic`, `getSubjectTopics` | `frontend/lib/syllabus.ts` (1,866 lines) |
| Not installed: `mathjs` | `frontend/package.json` |
| Phase 1 gate is live: `frontend/scripts/content/{validate,repair}.ts` + pure `frontend/lib/content/repair.ts` + tests `frontend/tests/lib/content/{schema-corpus,repair}.test.ts` + `scripts/content-schema-baseline.json` + CI `.github/workflows/content-json.yml` — all green | repo tree |
| `npm run check:content` — **FIXED 2026-09-29**: health scan now exits 1 if any JSON stays unparseable, then chains `check:schema` (corpus + manifest gate), so the command can fail and actually gates content. Root scripts `content:build` + `dev:backend` were also added because README/UI strings already told people to run them | `package.json` scripts |
| `ManifestSchema`/`ManifestEntrySchema` enforcement — **FIXED 2026-09-29**: every built `_manifest.json` is parsed by `validate.ts --strict` AND by the corpus test CI runs; 6 manifests / 594 entries clean | `frontend/scripts/content/validate.ts`, `frontend/tests/lib/content/schema-corpus.test.ts` |
| Duplicate corpus `frontend/content/ravikishan/` — **113 tracked JSON**, not gitignored, never mentioned in this plan; the corpus gate deliberately excludes it. Governance decision open (document as deliberate, or delete) | `find frontend/content/ravikishan -name '*.json' \| wc -l` |

Exact concept-file shape (measured on
`content/ravikishan/class-11-notes/physics/capacitor/concepts/01-capacitance-and-capacitor.json`):

```
title: string                  notes: string[6]            (markdown + $…$)
unitSlug: string               confusion: string[4]        universalFacts: string[4]
topicSlug: string              practice: string[3]         examples: string[3]
topicTitle: string             formulas: string[4]         practiceQuestions: string[4]
relevance: number              keyPoints: string[4]        specialNotes: string[2]
animation3D: string            summary: string             importantStatements: string[5]
motionGraphics: string         importantNotes: string[1]   examShortTricks: string[2]
visualType: string             examNotes: string[1]        importantConcepts: string[3]
duplicateType: number          importantTasks: string[3]   mcs: {question,options[],answer,explanation}[]
(tabGroup?: string for variants)
```

Mindmap file shape: `{ title, unitSlug, topicSlug, topicTitle, relevance, notes: string[],
mindmap: { centralConcept: string, branches: [{ topic, subtopics: [{ name, points: string[] }] }] } }`

### Bug found while mapping this — **already FIXED** (landed in `73793f3b`)

The builder computed `hasMcqs` from `mcqs` while the authored field is `mcs`, so every
manifest entry reported `hasMcqs: false` — measured at **172 wrong entries**, each
silently disabling a "Practice" affordance (comment in
`frontend/lib/content/schema/manifest.ts`). `content-tools/build-syllabus-notes.js`
now defines `contentHasMcqs(data)` (lines 35–40, reads `mcs` **and** `mcqs`) and uses
it at line 113; `schema/manifest.ts` exports the same helper plus `contentMcqCount`
(`max` of both arrays — verified on 28 files where the two arrays are byte-identical
mirrors, so summing would double-count). Consequences for the rest of this plan:

- §5.1's port must **preserve** `contentHasMcqs`; its "← fixes the current bug"
  annotation is stale, and "reading only `mcs`" would break the 37 files that carry
  only `mcqs`.
- The code fix shipped in `73793f3b`, but the **output stayed stale until
  2026-09-29**: 148/602 manifest entries still reported `hasMcqs: false` (and
  `noteCount`/tab pairing had drifted) because the builder itself had been
  crashing on start (`require` under root `"type": "module"`) and was never
  re-run. Fixed in pass 2: builder converted to ESM, corpus rebuilt,
  staleness 148 → 0, manifests now 594 clean entries. The §11 "announce the
  manifest change" risk row is historical.

---

## 3. Where new files go (and why)

```
frontend/lib/content/schema/          ← Phase 1, canonical Zod schemas (alias-free imports)
frontend/lib/content/blocks/          ← Phase 4, block props types + widget registry types
frontend/components/content/blocks/   ← Phase 4b, whitelisted React widget registry
frontend/components/content/formula-lab.tsx  ← Phase 4a, client island
frontend/scripts/content/             ← Phase 1b/2, validator + CLI (runs in the frontend workspace)
frontend/content-src/                 ← Phase 3, TS authoring modules (compiled to public/data)
content/ravikishan/                   ← unchanged JSON storage (still the fallback source)
scripts/content-schema-baseline.json  ← ratchet; key `invalid`, empty today (repairs cleared it)
```

**Rule:** files under `frontend/lib/content/schema/` import each other and
`../syllabus` with **relative paths only** (never `@/…`). That keeps the schema tree
loadable by `npx tsx` from the repo root and from the frontend workspace without any
path-alias resolution, while app code may still import it as `@/lib/content/schema`.

---

## 4. Phase 1 — Schema contract

> **Deep-inspection status (2026-09-29).** APPLIED and green: §4.1 atoms, §4.3
> concept, §4.4 mindmap, §4.5 manifest, §4.7 index, §4.8 validate/repair CLI,
> §4.9 wiring + CI + baseline. PENDING: §4.2 `formula.ts`, §4.6 `syllabus-ref.ts`
> (nothing imports either, so they gate only Phases 4a/4b — see the note on each).
> Where applied code deliberately diverges from a sketch below, **the code is the
> contract**; divergences are annotated inline instead of silently rewritten.
> Gate output today: `in-scope files: 654  INVALID: 0  EMPTY: 140  THIN: 31  BODY: 483`,
> `out-of-scope 176`, `schema violations: 0` — the repair pipeline already cleared
> every violation, so there is **zero ratchet debt**.

### 4.1 `frontend/lib/content/schema/atoms.ts`

```ts
import { z } from "zod";

/** One authored markdown/Math string. Capped so a bad paste can't sink a page. */
export const MdString = z.string().trim().min(1).max(20_000);
export const MdList = z.array(MdString).max(80);
export const ShortString = z.string().trim().min(1).max(160);
export const Slug = z
  .string()
  .trim()
  .regex(/^[a-z0-9][a-z0-9._-]*$/, "slug must be lowercase url-safe");

/** `NN-slug.json` naming, per frontend/agents.md §4. */
export const ContentFileName = z
  .string()
  .regex(/^\d{2}-[a-z0-9][a-z0-9._-]*\.json$/, "file must be NN-slug.json");

export const UnitSymbol = z.enum([
  "m","kg","s","A","K","mol","cd",
  "cm","mm","µm","nm","g","mg","µg","t","h","min","deg","°",
  "N","J","W","C","V","F","Ω","ohm","Pa","Hz","T","H","S","lm","lx",
  "eV","u","amu","Å","kPa","atm","bar","L","mL","mol/L","M",
]);
```

> **APPLIED** — all of the above exist as written, plus `NoteBlockSchema` (a nested
> `notes[]` payload used by `originalContent`/`nepali`/`grammar` in §4.3's Extended
> tier). Two caveats: `UnitSymbol` **and** `ContentFileName` currently have **zero
> consumers** — `formula.ts` (§4.2) and a stricter manifest/build check (§4.5/§5.1)
> are what would consume them. They are Phase 4a/2 input kept in place on purpose;
> do not "clean up" either as dead code.

### 4.2 `frontend/lib/content/schema/formula.ts`

> **PENDING — not on disk.** No `formula.ts`; `index.ts` does not export it and
> nothing imports `FormulaSchema`/`BlockSchema`. It is the pre-req for Phase 4a (§7)
> and for the block types in §8 — land it before either. `atoms.ts` already ships
> the `UnitSymbol` enum it needs. Until then, notes cannot declare `formulaSpecs`
> or `blocks` (§4.3's sketch shows them, the applied schema does not have them).

```ts
import { z } from "zod";
import { MdString, ShortString, Slug, UnitSymbol } from "./atoms";

/** A symbol used by a formula: its unit and an optional default for live use. */
export const FormulaVarSchema = z
  .object({
    unit: UnitSymbol.optional(),
    /** Dimension vector over M,L,T,I,Θ,N (see blocks/dimensions.ts). */
    dim: z.tuple([z.number(), z.number(), z.number(), z.number(), z.number(), z.number()]).optional(),
    default: z.number().optional(),
    label: ShortString.optional(),
  })
  .strict();

export const FormulaSchema = z
  .object({
    id: Slug,
    latex: MdString,
    /** Optional machine-readable form. Wins over any LaTeX→expression derivation. */
    expr: MdString.optional(),
    /** Symbol to isolate when the block is used for live computation. */
    solve: Slug.optional(),
    vars: z.record(Slug, FormulaVarSchema).default({}),
    /** Constants the evaluator may use: g, k, e0, N_A … */
    constants: z.record(Slug, z.number()).default({}),
    sourceTopicSlug: Slug.optional(),
  })
  .strict();

/** Declarative live-computation block. Contains no executable code. */
export const ComputeBlockSchema = z
  .object({
    kind: z.literal("compute"),
    formula: Slug,
    solveFor: Slug,
    inputs: z
      .array(
        z
          .object({
            var: Slug,
            value: z.number().finite().optional(),
            unit: UnitSymbol.optional(),
            range: z
              .object({ min: z.number(), max: z.number(), step: z.number().positive() })
              .refine((r) => (r.max - r.min) / r.step <= 2000, "range too dense")
              .optional(),
          })
          .strict(),
      )
      .min(1)
      .max(8),
    /** Expression text shown substituted, e.g. "C = Q / V". */
    showUnits: z.boolean().default(true),
    checks: z
      .array(
        z
          .object({
            var: Slug,
            expect: z.enum(["positive", "nonNegative", "nonZero", "finite"]),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();

/** Declarative widget block: names a component from a fixed registry. */
export const WidgetBlockSchema = z
  .object({
    kind: z.literal("widget"),
    /** Must exist in components/content/blocks/registry.ts. */
    block: Slug,
    props: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}),
    caption: MdString.optional(),
  })
  .strict();

export const BlockSchema = z.discriminatedUnion("kind", [ComputeBlockSchema, WidgetBlockSchema]);
export type Block = z.infer<typeof BlockSchema>;
export type Formula = z.infer<typeof FormulaSchema>;
export type ComputeBlock = z.infer<typeof ComputeBlockSchema>;
export type WidgetBlock = z.infer<typeof WidgetBlockSchema>;

/** Authoring inputs: the fields with schema defaults are optional at the call site. */
export type ComputeBlockInput = Omit<ComputeBlock, "kind" | "showUnits" | "checks"> &
  Partial<Pick<ComputeBlock, "kind" | "showUnits" | "checks">>;
export type WidgetBlockInput = Omit<WidgetBlock, "kind" | "props"> &
  Partial<Pick<WidgetBlock, "kind" | "props">>;
```

### 4.3 `frontend/lib/content/schema/concept.ts`

> **APPLIED with deliberate divergences — the file on disk is the contract.**
>
> - `ConceptNoteSchema` is `.strict()`, not `.passthrough()`: a typo'd key fails
>   validation, so unknown-key reporting comes from Zod itself. The sketch's
>   `KNOWN_CONCEPT_KEYS` set does not exist — and is not needed.
> - Three tiers, **40 measured fields** (the inventory came from walking the
>   corpus, see the file header): Required = 5 fields (`relevance` moved OUT of
>   it), Authored = the curated body, **Extended** = what the file calls "the
>   single largest defect in the original plan": `mcqs` via `LegacyMcqSchema`
>   (217 files), `exercises`, `originalContent`/`enrichedContent`,
>   `visualization`, `simulation`, `uiConfig`, `nepali`, `grammar`, `numericals`,
>   nested `mindmap`, … A strict schema over only the sketch's 27 fields would
>   reject hundreds of real files (or strip their data).
> - `relevance` is **optional** (`z.number().min(0).max(100)` in AuthoredFields);
>   `duplicateType` allows **1–9** (sketch: 1–6); `mcs[].explanation` is optional;
>   `mcqs[].answer` is `min(1).max(10)` — the A–H letter regex is enforced only on
>   `mcs`.
> - `tabGroup` is `z.string().max(400)`, **not `Slug`** — measured values run to
>   236 chars, no code reads it (only producers write it), so a slug regex would
>   reject legitimate data. Rationale is in the file; keep it.
> - `formulaSpecs` + `blocks` (the "new in this plan" block below) are **not in
>   the applied schema** — they arrive with `formula.ts` (§4.2).
> - `MIN_NOTES_FOR_BODY = 4` + `MIN_MCQ_FOR_TEST` + `hasBody()` live here, so the
>   validator grades completeness (EMPTY/THIN/BODY) separately from validity —
>   "valid but unfinished" is not "broken".
> - `CLASS_DIR_TO_SLUG` (top of the sketch) does **not** exist anywhere — the applied
>   CLI identifies in-scope files with a path regex instead
>   (`/(class-\d+-notes)/[^/]+/[^/]+/concepts/`). §5.1's build sketch imports this
>   map from the schema and would fail to compile until someone adds it (fine to add
>   when Phase 2 starts).
> - Applied `McqSchema.explanation` is `.optional()` (sketch: required) — measured,
>   not every MCQ carries one.

```ts
import { z } from "zod";
import { MdList, MdString, ShortString, Slug } from "./atoms";
import { BlockSchema, FormulaSchema } from "./formula";

/** `content/ravikishan/class-11-notes/…` → classSlug `class-11`. */
export const CLASS_DIR_TO_SLUG: Record<string, string> = {
  "class-11-notes": "class-11",
  "class-12-notes": "class-12",
};

export const McqSchema = z
  .object({
    question: MdString,
    options: z.array(MdString).min(2).max(8),
    /** Letter matching the option index, e.g. "C". */
    answer: z.string().regex(/^[A-H]$/),
    explanation: MdString,
  })
  .strict()
  .refine((m) => m.options.length >= m.answer.charCodeAt(0) - 64, {
    message: "answer letter exceeds the number of options",
    path: ["answer"],
  });

/** Required by frontend/agents.md §3. */
const RequiredFields = z.object({
  title: ShortString,
  unitSlug: Slug,
  topicSlug: Slug,
  topicTitle: ShortString,
  relevance: z.number().int().min(0).max(100),
  notes: MdList,
});

/** Everything the current corpus actually uses. Optional = do not break 1,240 files. */
const AuthoredFields = z.object({
  confusion: MdList.optional(),
  practice: MdList.optional(),
  universalFacts: MdList.optional(),
  examples: MdList.optional(),
  practiceQuestions: MdList.optional(),
  keyPoints: MdList.optional(),
  specialNotes: MdList.optional(),
  importantStatements: MdList.optional(),
  importantNotes: MdList.optional(),
  examShortTricks: MdList.optional(),
  examNotes: MdList.optional(),
  importantConcepts: MdList.optional(),
  importantTasks: MdList.optional(),
  summary: MdString.optional(),
  /** Legacy: authored as prose strings; new content should use `blocks` + FormulaSchema. */
  formulas: z.array(MdString).optional(),
  animation3D: Slug.optional(),
  motionGraphics: Slug.optional(),
  visualType: Slug.optional(),
  duplicateType: z.number().int().min(1).max(6).optional(),
  tabGroup: Slug.optional(),
  mcs: z.array(McqSchema).optional(),
  /** Legacy alias some generators wrote; `doctor` migrates it to `mcs`. */
  mcqs: z.array(McqSchema).optional(),

  // ── new in this plan ───────────────────────────────────────────────────
  /** Structured formulas with units + solve targets (Phase 4a input). */
  formulaSpecs: z.array(FormulaSchema).optional(),
  /** Inline interactive blocks, ordered after `notes`. */
  blocks: z.array(BlockSchema).optional(),
});

export const ConceptNoteSchema = RequiredFields.merge(AuthoredFields).passthrough();

/** Unknown top-level keys are warnings, not errors — the corpus is 1,240 files deep. */
export const KNOWN_CONCEPT_KEYS = new Set([
  ...Object.keys(RequiredFields.shape),
  ...Object.keys(AuthoredFields.shape),
]);

export type ConceptNote = z.infer<typeof ConceptNoteSchema>;
```

### 4.4 `frontend/lib/content/schema/mindmap.ts`

> **APPLIED, shaped differently — and the applied shape is better.** The file
> exports `MindMapFileSchema = ConceptNoteSchema.extend({ mindmap: MindMapCoreSchema })`
> rather than a standalone object: measured, mindmap files carry the SAME authored
> fields as concept notes plus a `mindmap` core, so a second minimal schema would
> have rejected 44 valid files. Names differ too (`MindMap*` not `Mindmap*`),
> `validate.ts` imports exactly these, and the caps are relaxed to corpus reality:
> `branches` 1–12 (sketch 2–10), `subtopics` ≤20 per branch (sketch 10), `points`
> ≤60 per subtopic (sketch 12), and the "≤60 total subtopics" refine is dropped.
> The file also documents that the LIVE mindmap surface resolves through TS
> registries first and these JSON files are the fallback tier.

```ts
import { z } from "zod";
import { MdList, MdString, ShortString, Slug } from "./atoms";

export const MindmapPoint = MdString;

export const MindmapSubtopicSchema = z
  .object({
    name: ShortString,
    /** 1–12 leaves per subtopic keeps the rendered canvas readable. */
    points: z.array(MindmapPoint).min(1).max(12),
  })
  .strict();

export const MindmapBranchSchema = z.object({
  topic: ShortString,
  subtopics: z.array(MindmapSubtopicSchema).min(1).max(10),
}).strict();

export const MindmapBodySchema = z
  .object({
    centralConcept: ShortString,
    branches: z.array(MindmapBranchSchema).min(2).max(10),
  })
  .strict()
  .refine(
    (m) => m.branches.reduce((n, b) => n + b.subtopics.length, 0) <= 60,
    "mindmap too large: cap total subtopics at 60",
  );

export const MindmapFileSchema = z
  .object({
    title: ShortString,
    unitSlug: Slug,
    topicSlug: Slug,
    topicTitle: ShortString,
    relevance: z.number().int().min(0).max(100),
    notes: MdList.optional(),
    mindmap: MindmapBodySchema,
  })
  .strict();

export type MindmapBody = z.infer<typeof MindmapBodySchema>;
```

### 4.5 `frontend/lib/content/schema/manifest.ts`

> **APPLIED, with three gaps.** (1) The applied schema is looser than the sketch:
> `source: z.string().min(1).max(80)` (not `z.literal("ravikishan")`),
> `duplicateType` max **9**, `title` max 400, `filename` is a plain string ≤300
> (not the `ContentFileName` regex), `noteCount` ≤500, and it exports
> `contentHasMcqs()`/`contentMcqCount()` helpers. (2) It has **no `blockCount` yet**
> — §5.1's build sketch spreads one in, and `.strict()` means that would FAIL the
> manifest parse the moment this schema is enforced; either add the optional field
> (declared below) or drop it from the build. (3) Enforcement — **FIXED
> 2026-09-29**: `validate.ts --strict` parses every built `_manifest.json`
> against `ManifestSchema` (any violation fails the gate, proven by negative
> test), and the corpus test does the same so CI enforces it too. 6 manifests /
> 594 entries currently clean.

```ts
import { z } from "zod";
import { ContentFileName, Slug } from "./atoms";

/** Entry written to public/data/syllabus-notes/<subject>/_manifest.json */
export const ManifestEntrySchema = z
  .object({
    unitSlug: Slug,
    topicSlug: Slug,
    title: z.string().min(1),
    noteCount: z.number().int().min(0),
    source: z.literal("ravikishan"),
    duplicateType: z.number().int().min(1).max(6),
    filename: ContentFileName,
    tabGroup: Slug.optional(),
    hasMcqs: z.boolean(),
    universalFactsCount: z.number().int().min(0),
    /** Phase 2 additive: only present when the note declares `blocks` (see §5.1). */
    blockCount: z.number().int().min(1).optional(),
  })
  .strict();

export const ManifestSchema = z.array(ManifestEntrySchema);
export type ManifestEntry = z.infer<typeof ManifestEntrySchema>;
```

### 4.6 `frontend/lib/content/schema/syllabus-ref.ts`

> **PENDING — not on disk.** No `syllabus-ref.ts`, and `checkSyllabusRef` has zero
> consumers, so nothing yet enforces "content may not exist outside the syllabus"
> (`frontend/agents.md` §1–§2). Decide before Phase 3: either wire it into
> `validate.ts` as Phase 1 tail, or accept it as a Phase 2 `doctor` check. Content-
> src migration multiplies the cost of a bad slug, so "never" is not an option.
> Note the applied `validate.ts` does not import it (it imports only
> `ConceptNoteSchema`, `MindMapFileSchema`, `MIN_NOTES_FOR_BODY`).

```ts
import {
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  SYLLABUS,
} from "../syllabus";

const unitIndex = new Map<string, Set<string>>();
const topicIndex = new Map<string, Set<string>>();

for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    for (const unit of subject.units) {
      unitIndex.set(`${cls.id}.${subject.slug}`, new Set(subject.units.map((u) => u.id)));
      const topics = new Set(getUnitTopicEntries(unit).map((t) => t.slug));
      topicIndex.set(`${cls.id}.${subject.slug}.${unit.id}`, topics);
    }
  }
}

export type RefCheck = { ok: boolean; reason?: string };

/** Enforces frontend/agents.md §1–§2: content may not exist outside the syllabus. */
export function checkSyllabusRef(
  classSlug: string,
  subjectSlug: string,
  unitSlug: string,
  topicSlug: string,
): RefCheck {
  const units = unitIndex.get(`${classSlug}.${subjectSlug}`);
  if (!units) return { ok: false, reason: `unknown class/subject ${classSlug}/${subjectSlug}` };
  if (!units.has(unitSlug)) return { ok: false, reason: `unit "${unitSlug}" is not in the syllabus` };
  const topics = topicIndex.get(`${classSlug}.${subjectSlug}.${unitSlug}`);
  if (topics && topics.size > 0 && !topics.has(topicSlug)) {
    return { ok: false, reason: `topic "${topicSlug}" is not a syllabus topic of unit "${unitSlug}"` };
  }
  return { ok: true };
}

/** Kept for error text; asserts the reverse direction too. */
export function syllabusUnitsFor(classSlug: string, subjectSlug: string): string[] {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  const units = subject ? subject.units : [];
  return units.map((u) => u.id);
}

export { getUnitSyllabus };
```

> Verify `ClassSyllabus`/`SubjectSyllabus` field names (`id`/`slug`/`subjects`/`units`) against
> `frontend/lib/syllabus.ts:37-70` when wiring this up; adjust the accessors, not the rule.

### 4.7 `frontend/lib/content/schema/index.ts`

> **APPLIED minus the helpers.** The barrel on disk re-exports only
> `atoms`/`concept`/`mindmap`/`manifest` (no `formula`, no `syllabus-ref` — they
> don't exist), carries a doc comment telling repo-root `tsx` tools to import the
> concrete file instead of the `@/…` alias (§3's rule), and defines **none** of the
> helpers below: no `md()`, `formula()`, `computeBlock()`, `widgetBlock()`,
> `defineNote()`. Phase 3 (§6) and Phase 6 (§10) must add them — or drop `md()` and
> pass plain strings, since it is an identity function anyway.

```ts
import type { ConceptNote } from "./concept";
import type { Formula } from "./formula";

export * from "./atoms";
export * from "./concept";
export * from "./formula";
export * from "./manifest";
export * from "./mindmap";
export * from "./syllabus-ref";

/** Authoring helper: identity, but types the string as authored markdown. */
export const md = (s: string): string => s;

export const formula = (id: string, f: Omit<Formula, "id">): Formula =>
  ({ id, vars: {}, constants: {}, ...f }) as Formula;

/** Typed constructors for the two block kinds, so authoring sites read declaratively. */
export const computeBlock = (b: ComputeBlockInput): ComputeBlock => ({ showUnits: true, ...b });
export const widgetBlock = (b: WidgetBlockInput): WidgetBlock => ({ props: {}, ...b });

/** Type-checked note definition. Validation still runs in the CLI, so a bad literal
 *  fails the build instead of shipping. */
export const defineNote = (n: ConceptNote): ConceptNote => n;
```

### 4.8 `frontend/scripts/content/validate.ts` — **applied**

What actually runs (verified 2026-09-29):

- **Four states per file**, graded separately from validity: `INVALID` (schema
  rejected — the only state `--strict` fails on), `EMPTY` (generator placeholder
  markers / blank body), `THIN` (`notes.length < MIN_NOTES_FOR_BODY`), `BODY`.
  "Valid but unfinished" is deliberately not "broken".
- Flags: `--strict`, `--write-baseline`, `--subject`, `--unit`. Companion
  `frontend/scripts/content/repair.ts` drives the pure rules in
  `frontend/lib/content/repair.ts` (tested in
  `frontend/tests/lib/content/repair.test.ts`): the first strict run rejected **51
  files, which were four migration defects**, not 51 authoring mistakes — 39
  lift-embedded-fields (body written INTO `enrichedContent`/`originalContent` and
  never lifted), 6 mcq-answer-letter, 4 visual-key-identifier, 2 prune-blank-entries.
  Every rule is idempotent and deletes nothing (snapshots stay on disk).
- **Baseline key is `invalid`, not `findings`**, and it carries a `counts` snapshot:
  `{"generatedAt": …, "invalid": [], "counts": {invalid:0, empty:140, thin:31}}`
  (230 bytes, `scripts/content-schema-baseline.json`). Empty `invalid` = the repair
  pipeline already cleared everything — zero ratchet debt today.
- **Still not implemented from the sketch below:** the syllabus-ref check
  (§4.6 doesn't exist), the per-subject breakdown and the `--json` flag. The
  applied CLI also has no `KNOWN_CONCEPT_KEYS` pass — the `.strict()` schema
  flags unknown keys itself. `_manifest.json` validation **was added 2026-09-29**:
  every built manifest is parsed against `ManifestSchema`, reported as
  `manifests: 6   entries: 594   manifest violations: 0`, and fails `--strict`.

> The fenced sketch below is the **original pre-implementation draft, kept for
> intent**. It does not compile against today's tree (imports `ManifestSchema`,
> `checkSyllabusRef`, `KNOWN_CONCEPT_KEYS`; reads baseline key `findings`; writes
> the baseline in the old shape). When Phase 2 revisits it, the file on disk wins.

```ts
/**
 * Schema gate for the whole corpus. Ratchet model: violations already recorded in
 * scripts/content-schema-baseline.json are reported but do not fail the run; any
 * NEW violation fails it. Run from the frontend workspace:
 *   npx tsx scripts/content/validate.ts [--subject physics] [--unit capacitor] [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  CLASS_DIR_TO_SLUG,
  ConceptNoteSchema,
  KNOWN_CONCEPT_KEYS,
  ManifestSchema,
  MindmapFileSchema,
  checkSyllabusRef,
} from "../../lib/content/schema";

const ROOT = path.resolve(__dirname, "..", "..", "..");
const CONTENT = path.join(ROOT, "content", "ravikishan");
const BASELINE_PATH = path.join(ROOT, "scripts", "content-schema-baseline.json");

type Finding = { file: string; message: string };

const argv = process.argv.slice(2);
const arg = (flag: string) => {
  const i = argv.indexOf(flag);
  return i === -1 ? null : argv[i + 1];
};
const onlySubject = arg("--subject");
const onlyUnit = arg("--unit");

function readBaseline(): Set<string> {
  try {
    const raw = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
    return new Set<string>(raw.findings ?? []);
  } catch {
    return new Set();
  }
}

function listJson(dir: string): string[] {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
}

function findingsFor(file: string, data: unknown, kind: "concept" | "mindmap",
                     refs: { classSlug: string; subjectSlug: string; unitSlug: string }): Finding[] {
  const out: Finding[] = [];
  const schema = kind === "concept" ? ConceptNoteSchema : MindmapFileSchema;
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      out.push({ file, message: `${issue.path.join(".")}: ${issue.message}` });
    }
  }
  if (kind === "concept" && data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const key of Object.keys(d)) {
      if (!KNOWN_CONCEPT_KEYS.has(key)) out.push({ file, message: `unknown field "${key}"` });
    }
    if ("mcqs" in d && !("mcs" in d)) out.push({ file, message: `legacy "mcqs" — rename to "mcs"` });
  }
  const d = data as { unitSlug?: string; topicSlug?: string };
  if (d.unitSlug && d.topicSlug) {
    const ref = checkSyllabusRef(refs.classSlug, refs.subjectSlug, d.unitSlug, d.topicSlug);
    if (!ref.ok) out.push({ file, message: `syllabus: ${ref.reason}` });
  }
  return out;
}

function run(): number {
  const baseline = readBaseline();
  const findings: Finding[] = [];
  let files = 0;

  for (const classDir of fs.readdirSync(CONTENT).sort()) {
    const classSlug = CLASS_DIR_TO_SLUG[classDir];
    if (!classSlug) continue;
    const classDirPath = path.join(CONTENT, classDir);
    if (!fs.statSync(classDirPath).isDirectory()) continue;

    for (const subject of fs.readdirSync(classDirPath).sort()) {
      if (onlySubject && subject !== onlySubject) continue;
      const subjectPath = path.join(classDirPath, subject);
      if (!fs.statSync(subjectPath).isDirectory()) continue;

      for (const unit of fs.readdirSync(subjectPath).sort()) {
        if (onlyUnit && unit !== onlyUnit) continue;
        const refs = { classSlug, subjectSlug: subject, unitSlug: unit };
        const unitPath = path.join(subjectPath, unit);

        for (const f of listJson(path.join(unitPath, "concepts"))) {
          const p = path.join(unitPath, "concepts", f);
          files++;
          try {
            findings.push(...findingsFor(path.relative(ROOT, p), JSON.parse(fs.readFileSync(p, "utf8")), "concept", refs));
          } catch {
            findings.push({ file: path.relative(ROOT, p), message: "invalid JSON" });
          }
        }
        for (const f of listJson(path.join(unitPath, "mindmap"))) {
          const p = path.join(unitPath, "mindmap", f);
          files++;
          try {
            findings.push(...findingsFor(path.relative(ROOT, p), JSON.parse(fs.readFileSync(p, "utf8")), "mindmap", refs));
          } catch {
            findings.push({ file: path.relative(ROOT, p), message: "invalid JSON" });
          }
        }
      }
    }
  }

  const built = path.join(ROOT, "frontend", "public", "data", "syllabus-notes");
  if (fs.existsSync(built)) {
    for (const subject of fs.readdirSync(built)) {
      const mp = path.join(built, subject, "_manifest.json");
      if (!fs.existsSync(mp)) continue;
      const parsed = ManifestSchema.safeParse(JSON.parse(fs.readFileSync(mp, "utf8")));
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          findings.push({ file: path.relative(ROOT, mp), message: `manifest ${issue.path.join(".")}: ${issue.message}` });
        }
      }
    }
  }

  const keys = findings.map((f) => `${f.file}::${f.message}`);
  const fresh = findings.filter((_, i) => !baseline.has(keys[i]));

  const bySubject = new Map<string, number>();
  for (const f of fresh) {
    const m = f.file.match(/class-\d\d-notes\/([^/]+)\/([^/]+)/);
    const k = m ? `${m[1]}/${m[2]}` : "build-output";
    bySubject.set(k, (bySubject.get(k) ?? 0) + 1);
  }

  if (argv.includes("--json")) {
    process.stdout.write(JSON.stringify({ files, fresh, baselined: findings.length - fresh.length }, null, 2));
  } else {
    console.log(`scanned ${files} content files`);
    console.log(`baselined violations: ${findings.length - fresh.length}`);
    if (fresh.length === 0) console.log("no NEW violations.");
    else {
      console.log(`NEW violations: ${fresh.length}`);
      for (const [k, n] of [...bySubject].sort((a, b) => b[1] - a[1]).slice(0, 20)) console.log(`  ${k}: ${n}`);
      for (const f of fresh.slice(0, 40)) console.log(`  ${f.file}\n    ${f.message}`);
      console.log(`\nratchet after fixing (or if intended): --write-baseline`);
    }
  }

  if (argv.includes("--write-baseline")) {
    fs.writeFileSync(
      BASELINE_PATH,
      JSON.stringify({ generatedFrom: "content schema gate", findings: keys }, null, 2),
    );
    console.log(`wrote ${keys.length} baseline findings`);
    return 0;
  }
  return fresh.length > 0 ? 1 : 0;
}

process.exit(run());
```

### 4.9 npm wiring — **applied, differently from this sketch**

| command | what it runs today | can it fail? |
|---|---|---|
| root `npm run check:content` | health scan (BOM repair + `_index.json` completeness) **then** `check:schema` | **yes** — fixed 2026-09-29: exits 1 on unparseable JSON, then runs the schema gate |
| root `npm run check:schema` | `cd frontend && npm run test:run -- tests/lib/content/schema-corpus.test.ts` — the corpus + baseline ratchet (2/2 green) | yes |
| frontend `npm run content:validate` | `vitest run tests/lib/content/schema-corpus.test.ts` | yes |
| CI `.github/workflows/content-json.yml` | `node scripts/validate-content.mjs` (parse every `content/*.json`, exits 1 on broken) + the corpus test | yes, but **path-scoped** to `content/**`, `scripts/validate-content.mjs`, the baseline, `frontend/lib/content/schema/**`, `frontend/tests/lib/content/**` |
| CI `ci.yml` → `content-schema` job | `npx tsx frontend/scripts/content/validate.ts --strict` from the repo root (baseline ratchet + manifest gate; added 2026-09-29); `frontend-build` needs it | yes — runs on EVERY push/PR, no path scoping |

- The sketch's `content:build` / `content:doctor` scripts do **not** exist — Phase 2.
- The sketch's "root `check:content` = schema gate" **matches reality again**
  (fixed 2026-09-29): the health scan exits 1 on unparseable JSON and the script
  chains `check:schema`, so `check:content` both fails on bad content and runs the
  corpus + manifest gate. `check:schema` alone remains the fast inner loop.
- `tsx` is now a **root devDependency** (`tsx@^4.23.15`, added 2026-09-29), so both
  `npx tsx frontend/scripts/content/validate.ts` and the explicit
  `node node_modules/tsx/dist/cli.mjs frontend/scripts/content/validate.ts`
  (`scripts/run-validate.ps1`) are guaranteed to work instead of relying on
  backend's hoisted copy.
- CI gap **closed 2026-09-29**: `content-json.yml` now also watches
  `frontend/scripts/content/**`, so validator changes re-run the gate.

**Gate:** the schema gate exits 0 with an empty baseline — true today. Remaining
Phase 1 tail (formula.ts, syllabus-ref.ts, gate naming) ≈ 1 day — manifest
enforcement is DONE since 2026-09-29.

---

## 5. Phase 2 — One CLI replaces the ~40 mutation scripts

### 5.1 `frontend/scripts/content/build.ts` (port of `build-syllabus-notes.js`, validated)

```ts
/**
 * content/ravikishan/** (+ frontend/content-src/**) → frontend/public/data/syllabus-notes/**
 * Behavioural parity with content-tools/build-syllabus-notes.js, plus:
 *  - Zod validation on every input and on the emitted manifest
 *  - content-src/<class>/<subject>/<unit>/ takes precedence over authored JSON
 *  - hasMcqs via contentHasMcqs(): `mcs` OR `mcqs`       ← already fixed in the .js
 *  - deterministic output: sorted keys preserved as authored, 2-space, trailing LF
 *  - --check mode builds to a temp dir and diffs against public/data (CI parity gate)
 */
import fs from "node:fs";
import path from "node:path";
import {
  CLASS_DIR_TO_SLUG, ConceptNoteSchema, ManifestSchema,
} from "../../lib/content/schema";

const ROOT = path.resolve(__dirname, "..", "..", "..");
const SRC = path.join(ROOT, "content", "ravikishan");
const TS_SRC = path.join(ROOT, "frontend", "content-src");
const DEST = path.join(ROOT, "frontend", "public", "data", "syllabus-notes");
const CHECK = process.argv.includes("--check");

type Note = { file: string; data: any };

function readConcepts(classDir: string, subject: string, unit: string): Note[] {
  const concepts = path.join(SRC, classDir, subject, unit, "concepts");
  const out: Note[] = [];
  for (const f of (fs.existsSync(concepts) ? fs.readdirSync(concepts) : []).sort()) {
    if (!f.endsWith(".json")) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(concepts, f), "utf8"));
    const parsed = ConceptNoteSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(`${subject}/${unit}/${f}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    }
    out.push({ file: f, data: raw });
  }
  return out;
}

async function fromContentSrc(classSlug: string, subject: string, unit: string): Promise<Note[]> {
  const dir = path.join(TS_SRC, classSlug, subject, unit);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts")).sort();
  const notes: Note[] = [];
  for (const f of files) {
    const mod = await import(pathToFileUrl(path.join(dir, f)));
    const data = (mod as { default?: unknown }).default ?? mod;
    const parsed = ConceptNoteSchema.safeParse(data);
    if (!parsed.success) throw new Error(`content-src ${subject}/${unit}/${f}: ${parsed.error.message}`);
    notes.push({ file: `${f.replace(/\.ts$/, "")}.json`, data });
  }
  return notes;
}

const pathToFileUrl = (p: string) => `file://${p.replace(/\\/g, "/")}`;

function emit(destDir: string, rel: string, data: unknown) {
  const target = path.join(destDir, rel);
  const body = `${JSON.stringify(data, null, 2)}\n`;
  if (CHECK) {
    const existing = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    if (existing !== body) throw new Error(`build drift: ${path.relative(ROOT, target)}`);
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
}

async function buildSubject(classDir: string, subject: string, outRoot: string) {
  const classSlug = CLASS_DIR_TO_SLUG[classDir] ?? classDir;
  const subjectDir = path.join(SRC, classDir, subject);
  if (!fs.existsSync(subjectDir)) return;

  const units = fs.readdirSync(subjectDir, { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name).sort();

  const manifest: any[] = [];
  for (const unit of units) {
    const tsNotes = await fromContentSrc(classSlug, subject, unit);
    const notes = tsNotes.length > 0 ? tsNotes : readConcepts(classDir, subject, unit);
    if (notes.length === 0) continue;

    // original = no duplicateType; variant = duplicateType + tabGroup
    const originals = new Map<string, Note>();
    for (const n of notes) if (!n.data.duplicateType) originals.set(n.data.topicSlug, n);

    for (const n of notes) {
      const isVariant = Boolean(n.data.duplicateType && n.data.tabGroup);
      const paired = isVariant && originals.has(n.data.tabGroup);
      const duplicateType = isVariant ? n.data.duplicateType : 1;
      const topicSlug = isVariant && paired ? n.data.tabGroup : n.data.topicSlug;
      const filename = paired ? n.file.replace(/\.json$/, `-${n.data.duplicateType}.json`) : n.file;

      emit(outRoot, path.join(subject, unit, filename), n.data);
      manifest.push({
        unitSlug: unit,
        topicSlug,
        title: n.data.title || n.data.topicTitle || topicSlug,
        noteCount: Array.isArray(n.data.notes) ? n.data.notes.length : 0,
        source: "ravikishan",
        duplicateType,
        filename,
        ...(n.data.tabGroup ? { tabGroup: n.data.tabGroup } : {}),
        hasMcqs: (n.data.mcs ?? n.data.mcqs ?? []).length > 0,
        universalFactsCount: Array.isArray(n.data.universalFacts) ? n.data.universalFacts.length : 0,
        ...(n.data.blocks?.length ? { blockCount: n.data.blocks.length } : {}),
      });
    }
  }

  manifest.sort((a, b) =>
    a.unitSlug.localeCompare(b.unitSlug) ||
    a.topicSlug.localeCompare(b.topicSlug) ||
    a.duplicateType - b.duplicateType);

  const m = ManifestSchema.safeParse(manifest);
  if (!m.success) throw new Error(`${subject} manifest invalid: ${m.error.message}`);
  emit(outRoot, path.join(subject, "_manifest.json"), manifest);
  console.log(`${subject}: ${manifest.length} entries`);
}

async function main() {
  const outRoot = CHECK ? fs.mkdtempSync(path.join(ROOT, ".content-build-check-")) : DEST;
  const args = process.argv.slice(2).filter((a) => a !== "--check");
  for (const classDir of fs.readdirSync(SRC).sort()) {
    if (!CLASS_DIR_TO_SLUG[classDir]) continue;
    for (const subject of fs.readdirSync(path.join(SRC, classDir)).sort()) {
      if (args.length && !args.includes(subject)) continue;
      await buildSubject(classDir, subject, outRoot);
    }
  }
  if (CHECK) { fs.rmSync(outRoot, { recursive: true, force: true }); console.log("build parity OK"); }
  else console.log("Done.");
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
```

Notes for the implementer:
- The sketch imports `CLASS_DIR_TO_SLUG` from the schema tree — **it does not exist**
  (§4.3): define it here (or port the validate.ts path regex) before anything runs.
- `await import()` of a `.ts` file works under `tsx`; if it complains, precompile `content-src`
  with `esbuild --bundle` per unit instead.
- `blockCount` is additive **and currently unsafe**: the applied `ManifestEntrySchema`
  (§4.5) is `.strict()` with no `blockCount`, and `buildSubject` re-parses the manifest
  it just built — so the sketch throws as soon as ONE note declares `blocks`. Either add
  `blockCount: z.number().int().min(1).optional()` to `manifest.ts` (declared in §4.5) or
  drop the spread. Decide before Phase 2, not during it.
- The original script wrote `JSON.stringify(data, null, 2)` with **no** trailing newline; the
  port adds `\n`. Run `build` once, accept the whitespace delta as a single commit, then use
  `--check` as the parity gate forever after.

### 5.2 `frontend/scripts/content/doctor.ts`

```ts
/** Read-only hygiene report. --fix applies only idempotent, provably-safe repairs. */
import fs from "node:fs";
import path from "node:path";
import { ConceptNoteSchema } from "../../lib/content/schema";

const ROOT = path.resolve(__dirname, "..", "..", "..");
const SRC = path.join(ROOT, "content", "ravikishan");
const FIX = process.argv.includes("--fix");

type Report = { dupes: string[]; missingRequired: string[]; legacyKeys: string[]; crlf: string[]; orphanUnits: string[] };
const r: Report = { dupes: [], missingRequired: [], legacyKeys: [], crlf: [], orphanUnits: [] };

const REQUIRED = ["title", "unitSlug", "topicSlug", "topicTitle", "relevance", "notes"];

for (const classDir of fs.readdirSync(SRC)) {
  const cdir = path.join(SRC, classDir);
  if (!fs.statSync(cdir).isDirectory()) continue;
  for (const subject of fs.readdirSync(cdir)) {
    const sdir = path.join(cdir, subject);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const unit of fs.readdirSync(sdir)) {
      const udir = path.join(sdir, unit, "concepts");
      if (!fs.existsSync(udir)) continue;
      const files = fs.readdirSync(udir).filter((f) => f.endsWith(".json"));
      const byTopic = new Map<string, string[]>();

      for (const f of files) {
        const p = path.join(udir, f);
        const text = fs.readFileSync(p, "utf8");
        if (text.includes("\r\n")) r.crlf.push(path.relative(ROOT, p));
        let data: any;
        try { data = JSON.parse(text); } catch { r.missingRequired.push(`${p} (unparseable)`); continue; }
        for (const k of REQUIRED) if (data[k] === undefined) r.missingRequired.push(`${p} (${k})`);
        if (data.mcqs && !data.mcs) r.legacyKeys.push(`${p} (mcqs→mcs)`);
        const key = String(data.topicSlug ?? f);
        byTopic.set(key, [...(byTopic.get(key) ?? []), f]);
      }
      for (const [topic, fs_] of byTopic) {
        const originals = fs_.filter((f) => {
          const d = JSON.parse(fs.readFileSync(path.join(udir, f), "utf8"));
          return !d.duplicateType;
        });
        if (originals.length > 1) r.dupes.push(`${subject}/${unit}/${topic}: ${originals.join(", ")}`);
      }
    }
  }
}

for (const [k, list] of Object.entries(r)) {
  console.log(`${k}: ${list.length}`);
  for (const x of list.slice(0, 25)) console.log(`  ${x}`);
}
if (FIX) console.log("\n--fix is intentionally scoped in Phase 2: run `content:build --check` after manual repair.");
process.exit(Object.values(r).some((l) => l.length > 0) ? 1 : 0);
```

`content-src/` precedence rule (Phase 3): **if `frontend/content-src/<class>/<subject>/<unit>/`
exists, it is the sole source for that unit**; the JSON under `content/ravikishan/…` is ignored
by `build` but stays on disk until you delete it deliberately.

**Gate:** `content:build --check` passes with byte-identical output vs today's tree (after one
accepted whitespace commit for the trailing `\n`). The `hasMcqs` fix is **already applied** —
`contentHasMcqs` shipped in `73793f3b`, so the false→true value flip already happened; a port
that reproduces today's tree byte-for-byte must call `contentHasMcqs`, not re-derive it.
Effort ≈ 2–3 days.

---

## 6. Phase 3 — Typed authoring layer (opt-in per unit)

`frontend/content-src/class-11/physics/capacitor/01-capacitance-and-capacitor.ts`

```ts
import { defineNote, formula, md } from "../../../lib/content/schema";

export default defineNote({
  title: "Capacitance and Capacitor",
  unitSlug: "capacitor",
  topicSlug: "capacitance-and-capacitor",
  topicTitle: "Capacitance and capacitor",
  relevance: 100,
  notes: [
    md("**Capacitance definition:** $C = \\dfrac{Q}{V}$, a scalar ratio of charge to potential rise."),
    md("**Unit:** $1\\,\\mathrm{F} = 1\\,\\mathrm{C/V}$; practical submultiples are $\\mu$F, nF, pF."),
  ],
  formulaSpecs: [
    formula("capacitance-definition", {
      latex: "C = \\frac{Q}{V}",
      expr: "Q / V",
      solve: "C",
      vars: {
        Q: { unit: "µC", label: "charge" },
        V: { unit: "V", label: "potential difference" },
        C: { unit: "F", label: "capacitance" },
      },
    }),
    formula("parallel-plate", {
      latex: "C = \\frac{\\varepsilon_0 A}{d}",
      solve: "C",
      vars: { A: { unit: "m", label: "plate area" }, d: { unit: "mm" } },
      constants: { e0: 8.8541878128e-12 },
      // `expr` is the literal string the evaluator runs. Inputs are normalised to
      // base SI first (A in m, d declared in mm → metres), so `e0 * A / d` is consistent.
      expr: "e0 * A / d",
    }),
  ],
  blocks: [
    {
      kind: "compute",
      formula: "capacitance-definition",
      solveFor: "C",
      showUnits: true,
      inputs: [
        { var: "Q", value: 5, unit: "µC" },
        { var: "V", value: 2, unit: "V", range: { min: 0.5, max: 12, step: 0.5 } },
      ],
      checks: [{ var: "V", expect: "nonZero" }],
    },
    {
      kind: "widget",
      block: "parallel-plate-capacitor",
      props: { d: 0.5, area: 100, dielectric: "mica", voltage: 12 },
      caption: md("Drag the plate separation and watch $E = V/d$ respond."),
    },
  ],
  mcs: [
    {
      question: "If the charge on a capacitor is doubled, its capacitance:",
      options: ["is doubled", "is halved", "remains unchanged", "quadruples"],
      answer: "C",
      explanation: md("Capacitance is set by geometry and dielectric: $C=Q/V$ is a ratio, not a dependence."),
    },
  ],
  summary: md("Capacitance measures charge accumulated per unit potential rise."),
});
```

Migration is per unit, ~15 min each, gate is Phase 1's validator. Nothing shipped changes.
Effort ≈ 2 days infra.

---

## 7. Phase 4a — Live formula computation

`npm i mathjs -w frontend` (lazy-imported only, so it never enters the notes route chunk).

### 7.1 `frontend/lib/content/dimensions.ts`

```ts
/** Tiny SI dimension algebra: exponents of [M, L, T, I, Θ, N]. No mathjs dependency. */
export type Dim = readonly [number, number, number, number, number, number];

export const DIMLESS: Dim = [0, 0, 0, 0, 0, 0];

const def = (s: string, factor: number, dim: Dim): readonly [number, Dim] => [factor, dim];

/** Base and derived units the content corpus actually uses. */
export const UNITS: Record<string, { factor: number; dim: Dim }> = {
  m: [1, [0, 1, 0, 0, 0, 0]], cm: [0.01, [0, 1, 0, 0, 0, 0]],
  mm: [1e-3, [0, 1, 0, 0, 0, 0]], "µm": [1e-6, [0, 1, 0, 0, 0, 0]], nm: [1e-9, [0, 1, 0, 0, 0, 0]],
  kg: [1, [1, 0, 0, 0, 0, 0]], g: [1e-3, [1, 0, 0, 0, 0, 0]], mg: [1e-6, [1, 0, 0, 0, 0, 0]],
  s: [1, [0, 0, 1, 0, 0, 0]], min: [60, [0, 0, 1, 0, 0, 0]], h: [3600, [0, 0, 1, 0, 0, 0]],
  A: [1, [0, 0, 0, 1, 0, 0]], K: [1, [0, 0, 0, 0, 1, 0]], mol: [1, [0, 0, 0, 0, 0, 1]],
  N: [1, [1, 1, -2, 0, 0, 0]], J: [1, [1, 2, -2, 0, 0, 0]], W: [1, [2, 2, -3, 0, 0, 0]],
  C: [1, [0, 0, 1, 1, 0, 0]], V: [1, [1, 2, -3, -1, 0, 0]],
  F: [1, [-1, -2, 4, 2, 0, 0]], "µF": [1e-6, [-1, -2, 4, 2, 0, 0]],
  pF: [1e-12, [-1, -2, 4, 2, 0, 0]], nF: [1e-9, [-1, -2, 4, 2, 0, 0]],
  Ω: [1, [1, 2, -3, -2, 0, 0]], ohm: [1, [1, 2, -3, -2, 0, 0]],
  Pa: [1, [1, -1, -2, 0, 0, 0]], Hz: [1, [0, 0, -1, 0, 0, 0]],
  eV: [1.602176634e-19, [1, 2, -2, 0, 0, 0]], deg: [Math.PI / 180, DIMLESS],
} as unknown as Record<string, { factor: number; dim: Dim }>;

export const mul = (a: Dim, b: Dim): Dim => a.map((v, i) => v + b[i]) as Dim;
export const div = (a: Dim, b: Dim): Dim => a.map((v, i) => v - b[i]) as Dim;
export const pow = (a: Dim, n: number): Dim => a.map((v) => v * n) as Dim;
export const same = (a: Dim, b: Dim) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);

export const toBase = (value: number, unit?: string) => {
  const u = unit ? UNITS[unit] : undefined;
  return u ? { magnitude: value * u.factor, dim: u.dim } : { magnitude: value, dim: DIMLESS };
};

/** "8.85e-12 F/m" style pretty-print for the result chip. */
export const formatWithUnit = (n: number, unit?: string) => {
  const u = unit ? UNITS[unit] : undefined;
  const v = u ? n / u.factor : n;
  const digits = Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0) ? 3 : 4;
  return `${Number(v.toPrecision(digits)).toString()}${unit ? ` ${unit}` : ""}`;
};
```

### 7.2 `frontend/lib/content/safe-eval.ts`

```ts
/**
 * Locked-down evaluator for authored formula expressions.
 * Content never reaches this as executable text: we build the expression from
 * whitelisted symbols, parse it, walk the AST, and only then evaluate.
 *
 * Forbidden by construction: assignment, function definition, `createUnit`,
 * `import`, `simplify`, matrices beyond a length cap, object access, and any
 * node type outside ALLOWED_NODES.
 */
import { parse } from "mathjs";
import { toBase } from "./dimensions";

type MathNode = ReturnType<typeof parse>;

const ALLOWED_NODES = new Set([
  "OperatorNode", "SymbolNode", "ConstantNode", "FunctionNode", "ParenthesisNode",
]);

const ALLOWED_FUNCTIONS = new Set([
  "sqrt", "cbrt", "abs", "pow", "exp", "log", "log10", "log2",
  "sin", "cos", "tan", "asin", "acos", "atan", "atan2",
  "sinh", "cosh", "tanh", "round", "floor", "ceil", "min", "max", "sign",
]);

const ALLOWED_OPERATORS = new Set(["+", "-", "*", "/", "^", "%", "unaryMinus", "unaryPlus"]);

const MAX_NODES = 120;
const MAX_LITERAL = 1e12;
const MAX_RESULT = 1e12;

export type EvalError = { reason: string };

export function inspect(expr: string, allowedSymbols: Set<string>): EvalError | null {
  let ast: MathNode;
  try {
    ast = parse(expr);
  } catch {
    return { reason: "expression did not parse" };
  }
  let count = 0;
  let err: EvalError | null = null;
  ast.traverse((node: MathNode) => {
    if (err) return;
    if (++count > MAX_NODES) { err = { reason: `expression too large (${MAX_NODES} nodes)` }; return; }
    const type = node.type;
    if (!ALLOWED_NODES.has(type)) { err = { reason: `node type "${type}" is not allowed` }; return; }
    if (type === "SymbolNode") {
      const name = (node as unknown as { name: string }).name;
      if (!allowedSymbols.has(name)) err = { reason: `symbol "${name}" is not declared` };
      return;
    }
    if (type === "ConstantNode") {
      const value = (node as unknown as { value: number }).value;
      if (typeof value === "number" && Math.abs(value) > MAX_LITERAL) err = { reason: "literal too large" };
      return;
    }
    if (type === "FunctionNode") {
      const name = (node as unknown as { fnName: string }).fnName;
      if (!ALLOWED_FUNCTIONS.has(name)) err = { reason: `function "${name}" is not allowed` };
      return;
    }
    if (type === "OperatorNode") {
      const op = (node as unknown as { op: string }).op;
      if (!ALLOWED_OPERATORS.has(op)) err = { reason: `operator "${op}" is not allowed` };
      const fn = (node as unknown as { fn?: string }).fn;
      if (fn && !ALLOWED_FUNCTIONS.has(fn)) err = { reason: `function "${fn}" is not allowed` };
    }
  });
  return err;
}

/** Build the evaluable expression for a formula. Authored `expr` always wins; the
 *  LaTeX fallback below is deliberately narrow (single `lhs = rhs`, `\frac`, `^{}`)
 *  and returns null rather than guessing, so the UI can say "add an expr field". */
export function deriveExpr(formula: Formula): string | null {
  if (formula.expr) return formula.expr;
  if (!formula.solve) return null;
  const rhs = formula.latex.split("=").slice(1).join("=").trim();
  if (!rhs) return null;
  const lhs = formula.latex.split("=")[0].replace(/\s+/g, "");
  if (lhs !== formula.solve && !lhs.startsWith(`${formula.solve}=`)) return null;
  const stripped = rhs
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
    .replace(/\^\{([^{}]*)\}/g, "^$1")
    .replace(/\\left|\\right|\\,|\\;|\\!/g, "")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[{}]/g, "");
  // RHS only. `solveFor = …` would parse as an AssignmentNode and be rejected.
  return /[a-zA-Z0-9]/.test(stripped) ? stripped : null;
}

export type EvaluateInput = {
  expr: string;
  values: Record<string, { value: number; unit?: string }>;
  constants?: Record<string, number>;
};

export type EvalResult =
  | { ok: true; value: number }
  | { ok: false; reason: string };

export async function evaluate({ expr, values, constants = {} }: EvaluateInput): Promise<EvalResult> {
  const { create, all } = await import("mathjs"); // dynamic: stays out of the shared chunk
  const math = create(all, {});

  const symbols = new Set([...Object.keys(values), ...Object.keys(constants)]);
  const guard = inspect(expr, symbols);
  if (guard) return { ok: false, reason: guard.reason };

  const scope: Record<string, number> = { ...constants };
  for (const [name, v] of Object.entries(values)) {
    scope[name] = toBase(v.value, v.unit).magnitude; // every input normalised to base SI
  }

  let raw: unknown;
  try {
    raw = math.evaluate(expr, scope);
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "evaluation failed" };
  }
  if (typeof raw !== "number" || !Number.isFinite(raw)) return { ok: false, reason: "result is not a finite number" };
  if (Math.abs(raw) > MAX_RESULT) return { ok: false, reason: "result out of range" };
  return { ok: true, value: raw };
}
```

**What 4a guarantees, stated honestly:** every input is converted to base SI before
evaluation and the result is formatted back into the declared `solveFor` unit, so `µC / V`
correctly yields farads rather than `2.5`. Full symbolic dimensional analysis (catching an
authored formula whose LHS dimension doesn't match its RHS) is **out of scope for 4a** —
`Dim`, `mul`, `pow`, `same` in `dimensions.ts` are the primitives for it, and it belongs in
`doctor` as a build-time check when needed, not in the request path.

### 7.3 `frontend/components/content/formula-lab.tsx`

```tsx
"use client";

import katex from "katex";
import { useEffect, useMemo, useState } from "react";
import type { ComputeBlock, Formula } from "@/lib/content/schema";
import { KATEX_OPTIONS } from "@/lib/content/katex";
import { deriveExpr, evaluate } from "@/lib/content/safe-eval";
import { formatWithUnit } from "@/lib/content/dimensions";

const tex = (latex: string, display = false) =>
  katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode: display, throwOnError: false });

export function FormulaLab({
  block,
  formulaSpec,
}: {
  block: ComputeBlock;
  formulaSpec: Formula;
}) {
  const expr = useMemo(() => deriveExpr(formulaSpec), [formulaSpec]);

  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const i of block.inputs) init[i.var] = i.value ?? formulaSpec.vars[i.var]?.default ?? 1;
    return init;
  });
  const [result, setResult] = useState<{ text: string; bad?: boolean }>({ text: "—" });

  const substituted = useMemo(() => {
    let s = formulaSpec.latex;
    for (const [name, value] of Object.entries(inputs)) {
      s = s.replace(new RegExp(`(?<![A-Za-z0-9_])${name}(?![A-Za-z0-9_])`, "g"), `(${formatNumber(value)})`);
    }
    return s;
  }, [formulaSpec.latex, inputs]);

  useEffect(() => {
    if (!expr) { setResult({ text: "—", bad: true }); return; }
    let cancelled = false;
    const values: Record<string, { value: number; unit?: string }> = {};
    for (const i of block.inputs) values[i.var] = { value: inputs[i.var], unit: i.unit ?? formulaSpec.vars[i.var]?.unit };
    void evaluate({ expr, values, constants: formulaSpec.constants }).then((r) => {
      if (cancelled) return;
      setResult(
        r.ok
          ? { text: formatWithUnit(r.value, formulaSpec.vars[block.solveFor]?.unit) }
          : { text: r.reason, bad: true },
      );
    });
    return () => { cancelled = true; };
  }, [expr, inputs, block, formulaSpec]);

  if (!expr) {
    return (
      <p className="rounded-lg border border-dashed border-slate-600 p-2 text-xs text-slate-400">
        Formula <code>{formulaSpec.id}</code> needs an <code>expr</code> field for live computation.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
      <div dangerouslySetInnerHTML={{ __html: tex(substituted, true) }} />
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {block.inputs.map((i) => (
          <label key={i.var} className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-10 shrink-0 font-mono">{i.var}</span>
            {i.range ? (
              <input
                type="range"
                min={i.range.min} max={i.range.max} step={i.range.step}
                value={inputs[i.var]}
                onChange={(e) => setInputs((s) => ({ ...s, [i.var]: Number(e.target.value) }))}
                className="w-full accent-sky-400"
                aria-label={`${i.var} ${formulaSpec.vars[i.var]?.label ?? ""}`}
              />
            ) : (
              <input
                type="number"
                value={inputs[i.var]}
                onChange={(e) => setInputs((s) => ({ ...s, [i.var]: Number(e.target.value) }))}
                className="w-24 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 font-mono"
                aria-label={`${i.var} ${formulaSpec.vars[i.var]?.label ?? ""}`}
              />
            )}
            <span className="tabular-nums text-slate-400">{formatNumber(inputs[i.var])} {i.unit ?? ""}</span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold" data-bad={result.bad || undefined}>
        {block.solveFor} = <span className={result.bad ? "text-red-400" : "text-sky-300"}>{result.text}</span>
      </p>
    </div>
  );
}

const formatNumber = (n: number) =>
  Math.abs(n) >= 1e4 || (Math.abs(n) < 1e-3 && n !== 0) ? n.toExponential(2) : String(Number(n.toPrecision(4)));
```

> The LaTeX→expression stripper above handles `\frac{a}{b}`, `^{}` and backslash commands.
> Anything it cannot reduce must be authored with the explicit `expr` field added to
> `FormulaSchema` (§4.2) — prefer `expr` over the regex whenever it is present, and never
> feed `latex` straight to mathjs. `dangerouslySetInnerHTML` in the result chip is safe
> **only** because the string is KaTeX output from repo-authored `formulaSpec.latex`, never
> user input; keep it that way.

**Gate:** unit tests (§8) + visible interactive formula on one capacitor topic. ≈3 days.

---

## 8. Phase 4b — Interactive blocks by reference

### 8.1 `frontend/components/content/blocks/registry.ts`

```ts
import type { ComponentType } from "react";
import { SchematicDiagram } from "@/components/lab/schematic-diagram";
import { TopicMindmap } from "@/components/lab/topic-mindmap";

/**
 * The only widgets content may name. Add here deliberately — this file IS the
 * trust boundary for Phase 4b. Never resolve a block name through import().
 */
export const BLOCK_REGISTRY: Record<string, ComponentType<Record<string, unknown>>> = {
  "schematic": SchematicDiagram as ComponentType<Record<string, unknown>>,
  "mindmap": TopicMindmap as ComponentType<Record<string, unknown>>,
  // reuse the lab toolkit scenes as they are validated, one by one:
  // "parallel-plate-capacitor": ParallelPlateCapacitor,
};

export function resolveBlock(name: string) {
  return BLOCK_REGISTRY[name] ?? null;
}
```

### 8.2 `frontend/components/content/rich-note.tsx` — structured blocks (default)

```tsx
import { MathMarkdown } from "@/components/content/math-markdown";
import { resolveBlock } from "@/components/content/blocks/registry";
import { FormulaLab } from "@/components/content/formula-lab";
import type { Block, ConceptNote } from "@/lib/content/schema";

/** Renders notes, then the declarative blocks, in authored order. No HTML parsing
 *  of tokens, no eval: each block is typed and validated before it reaches here. */
export function RichNote({ note }: { note: ConceptNote }) {
  return (
    <div className="space-y-3">
      {note.notes.map((n, i) => <MathMarkdown key={i} content={n} />)}
      {(note.blocks ?? []).map((b, i) => <BlockView key={i} block={b} note={note} />)}
    </div>
  );
}

function BlockView({ block, note }: { block: Block; note: ConceptNote }) {
  if (block.kind === "compute") {
    const spec = (note.formulaSpecs ?? []).find((f) => f.id === block.formula);
    if (!spec) return <BlockMissing name={block.formula} />;
    return <FormulaLab block={block} formulaSpec={spec} />;
  }
  const Comp = resolveBlock(block.block);
  if (!Comp) return <BlockMissing name={block.block} />;
  return (
    <figure className="space-y-1">
      <Comp {...block.props} />
      {block.caption ? <figcaption className="text-xs text-slate-400"><MathMarkdown content={block.caption} /></figcaption> : null}
    </figure>
  );
}

const BlockMissing = ({ name }: { name: string }) => (
  <p className="rounded-lg border border-dashed border-slate-600 p-2 text-xs text-slate-400">
    Unregistered block: <code>{name}</code>
  </p>
);
```

### 8.3 Optional inline embedding (inside a single note string)

If a widget must sit mid-paragraph rather than after the notes, use a Unicode sentinel
that Markdown cannot reinterpret and that `rehype-sanitize` passes through as text:
`⟦widget:name|{"d":0.5}⟧` (U+27E6 / U+27E7). Split the **sanitised** HTML on it
downstream, never before sanitisation:

```ts
const TOKEN = /⟦(compute|widget):([^|{|]+)\|?(\{[\s\S]*?\})?⟧/g;

export type Segment =
  | { kind: "html"; html: string }
  | { kind: "block"; type: "compute" | "widget"; name: string; props: Record<string, unknown> };

export function splitOnBlockTokens(html: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of html.matchAll(TOKEN)) {
    if (m.index! > last) out.push({ kind: "html", html: html.slice(last, m.index) });
    let props: Record<string, unknown> = {};
    if (m[3]) { try { props = JSON.parse(m[3]); } catch { props = {}; } }
    out.push({ kind: "block", type: m[1] as "compute" | "widget", name: m[2].trim(), props });
    last = m.index! + m[0].length;
  }
  if (last < html.length) out.push({ kind: "html", html: html.slice(last) });
  return out;
}
```

Prefer §8.2. Only add §8.3 when a concrete topic needs inline placement.

**Gate:** 10 registered widgets rendering from real content; unknown names degrade to a
visible placeholder. ≈2 days.

---

## 9. Phase 5 — Heavier languages, generation-time only

- Python stays offline: `scripts/*.py` and `agnes-bridge` may use `sympy` to derive or
  verify symbolic variants, and `matplotlib`/`pyvista` to pre-bake plot geometry or mesh
  vertices. Output is **plain JSON** into `content/` or `frontend/content-src/`.
- Nothing in the request path runs Python. `frontend/vercel.json` deploys `main` only;
  the serverless/edge runtime cannot host a Python interpreter, and the fetch-at-runtime
  model requires static JSON.
- Contract: `python scripts/derive_formulas.py --unit capacitor --out frontend/content-src/class-11/physics/capacitor/_generated.json`,
  then `content:build` validates and compiles. The Zod schema is the handshake.

---

## 10. Phase 6 — Tests and gates

`frontend/tests/lib/content/schema.test.ts`

> **Path corrected.** Vitest `include` is `tests/**/*.{test,spec}.{ts,tsx}` — a file
> under `frontend/__tests__/` would NEVER run (the original path silently defeated
> the whole phase). Two of these suites already exist: `tests/lib/content/
> schema-corpus.test.ts` (the corpus + baseline gate, wired to `check:schema` and
> `content-json.yml`) and `tests/lib/content/repair.test.ts`. The unit fixtures below
> plus `safe-eval.test.ts` are the not-yet-written remainder.

```ts
import { describe, expect, it } from "vitest";
import { ComputeBlockSchema, ConceptNoteSchema, WidgetBlockSchema } from "@/lib/content/schema";

const base = {
  title: "T", unitSlug: "u", topicSlug: "t", topicTitle: "T", relevance: 100, notes: ["**x** $x$"],
};

describe("ConceptNoteSchema", () => {
  it("accepts a minimal note", () => expect(ConceptNoteSchema.safeParse(base).success).toBe(true));
  it("rejects out-of-range relevance", () =>
    expect(ConceptNoteSchema.safeParse({ ...base, relevance: 101 }).success).toBe(false));
  it("rejects empty notes", () =>
    expect(ConceptNoteSchema.safeParse({ ...base, notes: [] }).success).toBe(false));
  it("rejects a malformed MCQ answer", () =>
    expect(ConceptNoteSchema.safeParse({ ...base, mcs: [{ question: "q", options: ["a", "b"], answer: "Z", explanation: "e" }] }).success).toBe(false));
});

describe("blocks", () => {
  it("compute blocks carry no executable string", () => {
    const ok = ComputeBlockSchema.safeParse({
      kind: "compute", formula: "f", solveFor: "C", showUnits: true,
      inputs: [{ var: "Q", value: 1, unit: "µC" }],
    });
    expect(ok.success).toBe(true);
  });
  it("rejects a widget name with path characters", () =>
    expect(WidgetBlockSchema.safeParse({ kind: "widget", block: "../evil", props: {} }).success).toBe(false));
});
```

`frontend/tests/lib/content/safe-eval.test.ts` — the injection suite. All must be rejected:

```ts
import { describe, expect, it } from "vitest";
import { evaluate } from "@/lib/content/safe-eval";

const V = { x: { value: 2 } };

describe("safe-eval rejects", () => {
  it("assignment", async () => expect((await evaluate({ expr: "x = 9", values: V })).ok).toBe(false));
  it("undeclared symbol", async () => expect((await evaluate({ expr: "y * 2", values: V })).ok).toBe(false));
  it("function constructor", async () => expect((await evaluate({ expr: "createUnit('evil = 1 m')", values: V })).ok).toBe(false));
  it("matrix literal", async () => expect((await evaluate({ expr: "[1,2,3]'", values: V })).ok).toBe(false));
  it("index access", async () => expect((await evaluate({ expr: "x[0]", values: V })).ok).toBe(false));
  it("oversized exponent", async () => expect((await evaluate({ expr: "10^10^10", values: V })).ok).toBe(false));
  it("non-numeric result", async () => expect((await evaluate({ expr: '"a" + "b"', values: V })).ok).toBe(false));
});

describe("safe-eval accepts", () => {
  it("plain arithmetic", async () => {
    const r = await evaluate({ expr: "q / v", values: { q: { value: 4 }, v: { value: 2 } } });
    expect(r.ok && r.value).toBeCloseTo(2);
  });
  it("base-SI conversion: µC / V is farads", async () => {
    const r = await evaluate({
      expr: "Q / V",
      values: { Q: { value: 5, unit: "µC" }, V: { value: 2, unit: "V" } },
    });
    expect(r.ok && r.value).toBeCloseTo(2.5e-6);
  });
  it("sqrt", async () => {
    const r = await evaluate({ expr: "sqrt(x)", values: V });
    expect(r.ok && r.value).toBeCloseTo(Math.SQRT2);
  });
});
```

Checklist per phase:
- `npm run check:schema` (and `content-json.yml`) — new violations fail. Do NOT cite
  `check:content` as the gate: it runs a report script that cannot fail (§4.9).
- `npx tsx scripts/content/build.ts --check` — build parity.
- `npx next build` (Turbopack) from `frontend/` exits 0.
- `npm test` — security-policy, auth-flow, hardening suites stay green (repo rule).
- Before any commit: `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN="` clean; never touch or
  print `.mcp.json`; never commit a worktree `package-lock.json`.
- Read `project-conductor.md` + `BRANCHES.md` first (root `agents.md` Rule 1).

---

## 11. Sequencing, effort, risks

Order: **1 → 2 → 3 → 4b → 4a → 5.** Phases 1–2 touch nothing shipped and give every later
phase its gate. 4b is the fastest visible win because the components already exist.

| Phase | Effort | Ships |
|---|---|---|
| 1 Schema + ratchet validator | 1 d — **applied** (tail pending: `formula.ts`, `syllabus-ref.ts`, manifest enforcement) | schema gate bites on new bad content via `check:schema` + CI; `hasMcqs` fix **shipped** |
| 2 CLI + doctor | 2–3 d | one build path, ~40 scripts retired, `--check` parity |
| 3 content-src authoring | 2 d infra | typed authoring per unit, ~15 min/unit migration |
| 4b Widget registry | 2 d | interactive visuals inside notes, safely |
| 4a Formula computation | 3 d | live plug-and-chalk formulas with unit checks |
| 5 Generators | ongoing | sympy/matplotlib feed JSON offline only |
| 6 Tests/gates | 1 d | injection-proof evaluator, schema fixtures |

Risks:
- **Corpus noise** — RESOLVED: the first strict run found 51 INVALID (four migration
  defects), `repair.ts` cleared them all, and the baseline `invalid` array is now empty.
  The ratchet stays on so it never regresses.
- **Bundle** — mathjs must stay lazy; audit with `next build` output after wiring 4a.
- **Manifest consumers** — `hasMcqs` flipping false→true shipped in `73793f3b` (code)
  and reached the built output on 2026-09-29 (rebuild flipped 148 entries); manifests
  are validated at two gates now (§4.5), so this class of bug cannot recur silently.
- **Trust creep** — any future request to "just eval it" is answered by the registry, not a
  sandbox widening.

## 12. Old blocker — RESOLVED, and weaknesses this inspection found

**The blocker is gone (verified 2026-09-29).** The `feature/lab` → `main` merge landed
(`98439456` "Merge main into feature/lab") and the working tree at `73793f3b` is clean and
in sync with `origin/main` — the old text's "28 staged files / ~200 modified JSONs / dirty
index" no longer exists. Everything it worried about is tracked on `main`:

- `frontend/components/lab/{topic-mindmap.tsx,schematic-diagram.tsx,three-scene.ts,three-fx-registry.ts}`
  and `frontend/components/viz/viz-toolbar.tsx` (plus
  `frontend/tests/components/lab/three-scene.test.ts`) — the two files the old text said
  were "genuinely missing" (`topic-mindmap.tsx`, `schematic-diagram.tsx`) arrived with the
  merge, so all five are now tracked and nothing needs re-merging.
- `frontend/tsconfig.check.json` **is** tracked on `main` (the old text was right here)
  but has **zero references** in `frontend/package.json`, `.github/` or `scripts/` —
  a deletion candidate, not a blocker. **Deleted 2026-09-29 (`998343c4`)** — the main
  `tsconfig.json` already includes `**/*.ts(x)` (only node_modules/backend/content-tools
  excluded), so the 3 files it listed were never outside typechecking.

### Weaknesses found by this inspection — pass 2 fixed 1, 2, 4, 6, 7; pass 3 fixed 6 fully + the backend ESM landmines on 2026-09-29 (3, 5, 8 still open)

1. **FIXED** — `check:content` now exits 1 on unparseable JSON and chains
   `check:schema`; the name and the behavior agree (§4.9).
2. **FIXED** — `frontend/agents.md` §6/§7/Key Files now point at real commands
   (`validate-content.mjs`, `check:schema`, `validate.ts --strict`) and BE port 3000.
   Corrected the same way: README (its `-w frontend` commands all failed with
   "No workspaces found", `dev:backend`/`content:build` didn't exist, BE port 3001),
   `frontend/.env.example`, and `lib/api-client.ts`'s fallback (3001 → 3000 — nothing
   ever listened on 3001; `backend/src/index.ts` defaults to 3000). FE 5173 was never
   wrong: `next dev --webpack -p 5173` pins it.
3. **Duplicate corpus** — `frontend/content/ravikishan/` (113 tracked JSON, not gitignored)
   is invisible to this plan and to the gate (the corpus test resolves the repo-root tree
   specifically to avoid sweeping it). Document as deliberate, or delete.
4. **FIXED** — `_manifest.json` is validated in two places: `validate.ts --strict`
   (local gate, proven by negative test) and the corpus test (CI gate). Wiring it
   exposed a bigger bug: the build script had been **crashing on every run** since
   root `"type": "module"` landed (`require` in ESM scope), so the `hasMcqs` code fix
   never reached the output — 148/602 entries were stale. Builder is ESM now, corpus
   rebuilt (staleness 148 → 0, manifests 594 clean entries), and the 16 retired
   `content-tools/*.js` one-shots + `scripts/fix-comparison-operators.js` were renamed
   `.cjs` so they can run at all.
5. **Phase 1 tail** — `formula.ts` (§4.2), `syllabus-ref.ts` (§4.6) and the
   `md`/`defineNote`/`formula` helpers (§4.7) are pending; §6 and §8 cannot start without
   them, and nothing enforces "content must be inside the syllabus" until §4.6 lands.
6. **FIXED** — `content-json.yml` now watches `frontend/scripts/content/**`
   (validator changes re-run the gate), and `ci.yml` gained a `content-schema` job
   (2026-09-29, `998343c4`) that runs `validate.ts --strict` on every push/PR
   regardless of which paths changed. No path-scoped gap remains.
7. **FIXED** — `tsx@^4.23.15` added to root devDependencies (§4.9).
8. **Stale plan artifacts** — the `feature/notes` worktree still sits at `46a048bf` far
   behind `main`; nobody should build on it.
9. **FIXED (pass 3, 2026-09-29, `998343c4`)** — the last `require()` landmines under
   root/backend `"type": "module"`: `backend/scripts/diagnose-ai.js` deleted (broken
   duplicate — it also pointed at the nonexistent `backend/backend/.env`; the fixed
   `.cjs` twin with the correct `backend/.env` path already existed), and
   `backend/ecosystem.config.js` renamed `.cjs` so pm2 keeps loading it.
