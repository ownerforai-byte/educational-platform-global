import { describe, expect, it } from "vitest";
import { getUnitConcept, UNIT_CONCEPTS } from "@/lib/visual-concept-map";
import {
  MINDMAP_DEPTH,
  FALLBACK_LEAF_DEPTH,
  applyFallbackDepth,
  depthLeafCount,
} from "@/lib/mindmap-depth";
import "@/lib/mindmap-depth-index";

/**
 * The mindmap explorer's depth layer (exceptional cases / key facts /
 * exam-asked / beginner mistakes) is only useful if it is COMPLETE and
 * correctly keyed. A typo'd leaf id renders nothing at all, and an empty
 * field is indistinguishable from "not authored" — so both are asserted here
 * rather than left to review.
 */

function allLeafIds(): Array<{ unitId: string; leafId: string }> {
  const out: Array<{ unitId: string; leafId: string }> = [];
  for (const [unitId, concept] of Object.entries(UNIT_CONCEPTS)) {
    for (const branch of concept.branches) {
      for (const sub of branch.subBranches) {
        for (const node of sub.nodes) out.push({ unitId, leafId: node.id });
      }
    }
  }
  return out;
}

const DEPTH_FIELDS = ["keyFacts", "edgeCases", "examAsked", "commonMistakes"] as const;

describe("mindmap depth packs", () => {
  const leaves = allLeafIds();

  it("has a registry to check against", () => {
    expect(leaves.length).toBeGreaterThan(0);
  });

  it("registers a pack for every authored unit", () => {
    const missing = Object.keys(UNIT_CONCEPTS).filter((u) => !MINDMAP_DEPTH[u]);
    expect(missing).toEqual([]);
  });

  it("covers every leaf in the registry", () => {
    const uncovered = leaves
      .filter(({ unitId, leafId }) => !MINDMAP_DEPTH[unitId]?.leaves?.[leafId])
      .map((l) => `${l.unitId}/${l.leafId}`);
    expect(uncovered).toEqual([]);
  });

  it("uses no leaf ids that do not exist in the registry", () => {
    const known = new Set(leaves.map((l) => l.leafId));
    const unknown: string[] = [];
    for (const [unitId, depth] of Object.entries(MINDMAP_DEPTH)) {
      for (const leafId of Object.keys(depth.leaves ?? {})) {
        if (!known.has(leafId)) unknown.push(`${unitId}/${leafId}`);
      }
    }
    expect(unknown).toEqual([]);
  });

  it("fills all four depth fields on every leaf", () => {
    const empty: string[] = [];
    for (const { unitId, leafId } of leaves) {
      const pack = MINDMAP_DEPTH[unitId]?.leaves?.[leafId];
      for (const field of DEPTH_FIELDS) {
        if (!pack?.[field]?.length) empty.push(`${unitId}/${leafId}:${field}`);
      }
    }
    expect(empty).toEqual([]);
  });

  it("gives every unit at least one fact, edge case, exam ask and trap", () => {
    const thin: string[] = [];
    for (const unitId of Object.keys(UNIT_CONCEPTS)) {
      const d = MINDMAP_DEPTH[unitId];
      if (
        !d?.unitFacts?.length ||
        !d?.unitEdgeCases?.length ||
        !d?.unitExamAsked?.length ||
        !d?.unitCommonMistakes?.length
      ) {
        thin.push(unitId);
      }
    }
    expect(thin).toEqual([]);
  });

  it("never leaks empty strings or leftover markers", () => {
    const bad: string[] = [];
    const walk = (items: string[] | undefined, where: string) => {
      for (const t of items ?? []) {
        if (!t.trim() || /\[insert|TODO|TBD|placeholder/i.test(t)) bad.push(`${where}: ${t}`);
      }
    };
    for (const [unitId, depth] of Object.entries(MINDMAP_DEPTH)) {
      walk(depth.unitFacts, `${unitId}.unitFacts`);
      walk(depth.unitEdgeCases, `${unitId}.unitEdgeCases`);
      walk(depth.unitExamAsked, `${unitId}.unitExamAsked`);
      walk(depth.unitCommonMistakes, `${unitId}.unitCommonMistakes`);
      for (const [leafId, pack] of Object.entries(depth.leaves ?? {})) {
        for (const field of DEPTH_FIELDS) walk(pack[field], `${unitId}/${leafId}.${field}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("reports a non-trivial item count", () => {
    const { units, leaves: leafCount, items } = depthLeafCount();
    expect(units).toBe(Object.keys(UNIT_CONCEPTS).length);
    expect(leafCount).toBe(leaves.length);
    // 4 fields x >=2 items x every leaf, plus the unit-level layer
    expect(items).toBeGreaterThanOrEqual(leaves.length * 8);
  });
});

describe("getUnitConcept depth merge", () => {
  it("returns depth-enriched branches for an exact unit id", () => {
    const c = getUnitConcept("vectors");
    expect(c).toBeDefined();
    expect(c?.depth).toBeDefined();
    const node = c!.branches[0].subBranches[0].nodes[0];
    expect(node.keyFacts?.length).toBeGreaterThan(0);
    expect(node.edgeCases?.length).toBeGreaterThan(0);
    expect(node.examAsked?.length).toBeGreaterThan(0);
    expect(node.commonMistakes?.length).toBeGreaterThan(0);
  });

  it("does not mutate the module-level registry", () => {
    getUnitConcept("vectors");
    const raw = UNIT_CONCEPTS["vectors"].branches[0].subBranches[0].nodes[0];
    expect(raw.keyFacts).toBeUndefined();
  });

  it("resolves through the keyword fallback and still carries depth", () => {
    const c = getUnitConcept("some-unauthorised-unit", "coulomb-law-force", "Coulomb's Law");
    expect(c).toBeDefined();
    expect(c?.depth).toBeDefined();
  });
});

describe("fallback (last-resort generic) depth packs", () => {
  const ids = Object.keys(FALLBACK_LEAF_DEPTH);

  it("registers a non-trivial set of packs", () => {
    expect(ids.length).toBeGreaterThanOrEqual(30);
  });

  it("fills all four fields on every fallback leaf", () => {
    const empty: string[] = [];
    for (const id of ids) {
      for (const field of DEPTH_FIELDS) {
        if (!FALLBACK_LEAF_DEPTH[id][field]?.length) empty.push(`${id}:${field}`);
      }
    }
    expect(empty).toEqual([]);
  });

  it("covers the ids the component actually declares", () => {
    // A representative spread across all four generic subject trees.
    for (const id of ["ph-1", "ph-7", "ph-9", "ch-1", "ch-5", "ch-o2", "math-3", "math-7", "bio-1", "bio-9"]) {
      expect(FALLBACK_LEAF_DEPTH[id], `missing ${id}`).toBeDefined();
    }
  });

  it("applies a pack without mutating the source node", () => {
    const original = { id: "ph-1", title: "T", description: "d", orderIndex: 1 };
    const enriched = applyFallbackDepth(original);
    expect(original).not.toHaveProperty("keyFacts");
    expect(enriched.keyFacts?.length).toBeGreaterThan(0);
  });

  it("passes through nodes that have no pack", () => {
    const orphan = { id: "does-not-exist", title: "T", description: "d", orderIndex: 1 };
    expect(applyFallbackDepth(orphan)).toBe(orphan);
  });

  it("has no empty strings or leftover markers", () => {
    const bad: string[] = [];
    for (const [id, pack] of Object.entries(FALLBACK_LEAF_DEPTH)) {
      for (const field of DEPTH_FIELDS) {
        for (const t of pack[field] ?? []) {
          if (!t.trim() || /\[insert|TODO|TBD|placeholder/i.test(t)) bad.push(`${id}.${field}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
