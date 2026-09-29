import type { ComponentType } from "react";

import { SchematicDiagram } from "@/components/lab/schematic-diagram";
import { TopicMindMap } from "@/components/lab/topic-mindmap";

/**
 * The only widgets content may name (PLANS.md §8.1).
 *
 * This file IS the trust boundary for Phase 4b: a `widget` block resolves to one
 * of these components or to nothing. Never resolve a block name through
 * `import()` / `require()` — a content string must not be able to choose code.
 * Lab scenes are added here one at a time, after they are validated.
 */
export const BLOCK_REGISTRY: Record<string, ComponentType<Record<string, unknown>>> = {
  schematic: SchematicDiagram as unknown as ComponentType<Record<string, unknown>>,
  mindmap: TopicMindMap as unknown as ComponentType<Record<string, unknown>>,
  // Reuse the lab toolkit scenes as they are validated, one by one:
  // "parallel-plate-capacitor": ParallelPlateCapacitor,
};

export function resolveBlock(name: string) {
  return BLOCK_REGISTRY[name] ?? null;
}
