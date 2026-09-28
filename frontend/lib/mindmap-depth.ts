/**
 * Mindmap Depth Packs — the "beyond the textbook line" layer for the
 * Clear Mindmap surface.
 *
 * The branches in lib/visual-concept-map.tsx carry the *general knowledge*
 * skeleton (definition, formula, derivation snippet, one exam pointer).
 * This module carries the four things students actually lose marks on:
 *
 *   keyFacts        — the surprising, quotable, high-retention fact
 *   edgeCases       — exceptional / corner / degenerate cases
 *   examAsked       — the question that actually appears in NEB / CEE / IOe
 *   commonMistakes  — the beginner error that produces the wrong answer
 *
 * Keyed by syllabus unit id, then by the exact leaf node id declared in
 * UNIT_CONCEPTS. Nothing here is required: a leaf with no pack simply keeps
 * its existing rows, so partial coverage degrades gracefully.
 *
 * All strings are plain text but may contain $…$ inline KaTeX, because the
 * knowledge block renders them through MathMarkdown.
 */

export interface LeafDepth {
  /** Surprising, memorable, quotable facts. */
  keyFacts?: string[];
  /** Exceptional / corner / degenerate / limiting cases. */
  edgeCases?: string[];
  /** Questions that genuinely appear in the board / entrance papers. */
  examAsked?: string[];
  /** The beginner error that reliably produces a wrong answer. */
  commonMistakes?: string[];
}

export interface UnitDepth {
  /** Shown on the branch-overview knowledge block for the whole unit. */
  unitFacts?: string[];
  unitEdgeCases?: string[];
  unitExamAsked?: string[];
  unitCommonMistakes?: string[];
  /** Per-leaf depth, keyed by the leaf id used in UNIT_CONCEPTS. */
  leaves?: Record<string, LeafDepth>;
}

/** Total packs authored — used by the audit script + the coverage test. */
export const MINDMAP_DEPTH: Record<string, UnitDepth> = {};

export function registerDepth(unitId: string, depth: UnitDepth): void {
  MINDMAP_DEPTH[unitId] = depth;
}

/**
 * Depth for the GENERIC subject-level fallback trees that live inline in
 * components/lab/topic-mindmap.tsx (ids like `ph-1`, `ch-o2`, `bio-7`).
 *
 * These are what a syllabus unit renders whenever it has no entry in
 * UNIT_CONCEPTS, so they are the surface most topics actually show. They are
 * keyed by leaf id rather than by unit, because a given leaf such as `ph-1`
 * serves every unauthored physics unit.
 */
export const FALLBACK_LEAF_DEPTH: Record<string, LeafDepth> = {};

export function registerFallbackDepth(leafId: string, pack: LeafDepth): void {
  FALLBACK_LEAF_DEPTH[leafId] = pack;
}

/**
 * Attach a fallback leaf's depth pack without mutating the caller's object.
 * Returns `T & Partial<LeafDepth>` so callers see the depth fields directly
 * instead of having to cast the result back to the leaf-node interface.
 */
export function applyFallbackDepth<T extends { id: string }>(node: T): T & Partial<LeafDepth> {
  const pack = FALLBACK_LEAF_DEPTH[node.id];
  if (!pack) return node;
  return {
    ...node,
    keyFacts: pack.keyFacts,
    edgeCases: pack.edgeCases,
    examAsked: pack.examAsked,
    commonMistakes: pack.commonMistakes,
  };
}

/** Flatten a unit's leaves so a coverage report can count real content. */
export function depthLeafCount(): { units: number; leaves: number; items: number } {
  let units = 0;
  let leaves = 0;
  let items = 0;
  for (const depth of Object.values(MINDMAP_DEPTH)) {
    units++;
    for (const leaf of Object.values(depth.leaves ?? {})) {
      leaves++;
      items +=
        (leaf.keyFacts?.length ?? 0) +
        (leaf.edgeCases?.length ?? 0) +
        (leaf.examAsked?.length ?? 0) +
        (leaf.commonMistakes?.length ?? 0);
    }
    items +=
      (depth.unitFacts?.length ?? 0) +
      (depth.unitEdgeCases?.length ?? 0) +
      (depth.unitExamAsked?.length ?? 0) +
      (depth.unitCommonMistakes?.length ?? 0);
  }
  return { units, leaves, items };
}