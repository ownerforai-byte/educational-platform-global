import { describe, it, expect } from "vitest";
import { buildUnitMindmapBranches } from "@/lib/unit-mindmap-branches";
import { getExactUnitConcept } from "@/lib/visual-concept-map";
import type { MindMapBranch } from "@/components/lab/topic-mindmap";

/**
 * Regression guard for "every unit showed the same branches".
 *
 * Resolution must be unit-specific: authored UNIT_CONCEPTS entry first, then
 * the fact-bank tree built from the unit's own knowledge. These sample units
 * span all four STEM subjects and all resolve — none may fall through to the
 * shared subject-generic tree, and no two may end up with identical knowledge.
 */

const SAMPLE: { unitId: string; subject: string }[] = [
  // Physics
  { unitId: "kinematics", subject: "physics" },
  { unitId: "gravitation", subject: "physics" },
  { unitId: "dc-circuits", subject: "physics" },
  { unitId: "capacitor", subject: "physics" },
  { unitId: "work-energy-and-power", subject: "physics" },
  { unitId: "physical-quantities", subject: "physics" },
  // Chemistry
  { unitId: "atomic-structure", subject: "chemistry" },
  { unitId: "chemical-equilibrium", subject: "chemistry" },
  { unitId: "stoichiometry", subject: "chemistry" },
  { unitId: "oxidation-and-reduction", subject: "chemistry" },
  { unitId: "hydrocarbons", subject: "chemistry" },
  // Biology
  { unitId: "ecology", subject: "biology" },
  { unitId: "evolutionary-biology", subject: "biology" },
  { unitId: "biomolecules-and-cell-biology", subject: "biology" },
  { unitId: "conservation-biology", subject: "biology" },
  // Mathematics
  { unitId: "calculus", subject: "mathematics" },
  { unitId: "trigonometry", subject: "mathematics" },
  { unitId: "algebra", subject: "mathematics" },
  { unitId: "analytic-geometry", subject: "mathematics" },
  { unitId: "statistics-and-probability", subject: "mathematics" },
];

function resolve(unitId: string, subject: string): MindMapBranch[] | undefined {
  return (
    getExactUnitConcept(unitId)?.branches ??
    buildUnitMindmapBranches(unitId, subject, unitId, unitId)
  );
}

function nodeTitles(branches: MindMapBranch[]): string[] {
  return branches.flatMap((b) =>
    b.subBranches.flatMap((sb) => sb.nodes.map((n) => n.title)),
  );
}

describe("unit-specific mindmap branches", () => {
  it("resolves a distinct tree for every sampled syllabus unit", () => {
    for (const { unitId, subject } of SAMPLE) {
      const branches = resolve(unitId, subject);
      expect(branches, `no branches for ${unitId}`).toBeDefined();
      expect(branches!.length, `${unitId} has no branches`).toBeGreaterThan(0);
      expect(branches!.length, `${unitId} too many branches`).toBeLessThanOrEqual(5);
    }
  });

  it("every branch carries real knowledge (non-empty nodes and descriptions)", () => {
    const seenIds = new Set<string>();
    for (const { unitId, subject } of SAMPLE) {
      const branches = resolve(unitId, subject)!;
      for (const b of branches) {
        expect(b.subBranches.length, `${unitId}/${b.id}`).toBeGreaterThan(0);
        for (const sb of b.subBranches) {
          expect(sb.nodes.length, `${unitId}/${sb.id}`).toBeGreaterThan(0);
          for (const n of sb.nodes) {
            expect(n.title.trim().length, `${unitId} empty title`).toBeGreaterThan(0);
            expect(n.description.trim().length, `${unitId}/${n.id} empty description`)
              .toBeGreaterThan(0);
            expect(seenIds.has(n.id), `duplicate node id ${n.id}`).toBe(false);
            seenIds.add(n.id);
          }
        }
      }
    }
  });

  it("no two units share the same knowledge (node titles differ)", () => {
    const titles = SAMPLE.map(({ unitId, subject }) => ({
      unitId,
      set: new Set(nodeTitles(resolve(unitId, subject)!)),
    }));

    for (let i = 0; i < titles.length; i++) {
      for (let j = i + 1; j < titles.length; j++) {
        const a = titles[i];
        const b = titles[j];
        const shared = [...a.set].filter((t) => b.set.has(t)).length;
        const overlap = shared / Math.min(a.set.size, b.set.size);
        expect(
          overlap,
          `${a.unitId} and ${b.unitId} share ${shared} identical node titles`,
        ).toBeLessThan(0.5);
      }
    }
  });

  it("hierarchy shapes vary across units (branch-count or node-count pattern)", () => {
    const shapes = SAMPLE.map(({ unitId, subject }) => {
      const branches = resolve(unitId, subject)!;
      return {
        unitId,
        signature: branches
          .map((b) => b.subBranches.reduce((n, sb) => n + sb.nodes.length, 0))
          .join("-"),
      };
    });

    // Not every pair can differ (data-dependent), but identical signatures
    // must be the exception — a universal single signature means the generic
    // tree is back.
    const counts = new Map<string, string[]>();
    for (const { unitId, signature } of shapes) {
      counts.set(signature, [...(counts.get(signature) ?? []), unitId]);
    }
    const largestGroup = Math.max(...[...counts.values()].map((g) => g.length));
    expect(largestGroup).toBeLessThanOrEqual(Math.ceil(SAMPLE.length / 2));
  });
});
