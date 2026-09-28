import { z } from "zod";
import { ShortString } from "./atoms";
import { ConceptNoteSchema } from "./concept";

/**
 * Standalone mindmap file —
 * `content/ravikishan/{classSlug}-notes/{subject}/{unit}/mindmap/mindmap.json`.
 *
 * These are NOT a reduced shape: measured, they carry the same authored fields
 * as a concept note (`formulas`, `keyPoints`, `mcqs`, `uiConfig`, `visualType`,
 * …) PLUS a `mindmap` core. So the schema is the concept contract with ONE
 * change — `mindmap` becomes required rather than `unknown` — instead of a
 * second minimal schema, which would reject 44 valid files for carrying fields
 * it forgot to declare. That failure mode (a schema stricter than the corpus)
 * is exactly what PLANS.md §2 fell into with its 27-field list.
 *
 * NOTE: this describes the JSON authoring shape. The live mindmap surface
 * resolves through TypeScript registries first (`lib/visual-concept-map.tsx`,
 * `lib/unit-mindmap-branches.ts`, `lib/high-yield-topic-facts.ts`); these JSON
 * files are the fallback tier. Validating them stops a typo silently degrading
 * a whole unit to the generic tree.
 */

const MIN_SUBTOPICS = 1;
const MIN_POINTS = 1;

export const MindMapSubtopicSchema = z
  .object({
    name: ShortString,
    points: z.array(ShortString).min(MIN_POINTS).max(60),
  })
  .strict();

export const MindMapBranchSchema = z
  .object({
    topic: ShortString,
    subtopics: z.array(MindMapSubtopicSchema).min(MIN_SUBTOPICS).max(20),
  })
  .strict();

export const MindMapCoreSchema = z
  .object({
    centralConcept: ShortString,
    branches: z.array(MindMapBranchSchema).min(1).max(12),
  })
  .strict();

/**
 * A mindmap file = the concept contract with a REQUIRED `mindmap` core.
 * Everything else is inherited, so the two schemas cannot drift apart.
 */
export const MindMapFileSchema = ConceptNoteSchema.extend({
  mindmap: MindMapCoreSchema,
});

export type MindMapFile = z.infer<typeof MindMapFileSchema>;
export type MindMapBranch = z.infer<typeof MindMapBranchSchema>;
export type MindMapCore = z.infer<typeof MindMapCoreSchema>;
