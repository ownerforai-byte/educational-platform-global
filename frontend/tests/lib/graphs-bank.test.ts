import { describe, expect, it } from "vitest";
import {
  ALL_GRAPHS,
  GRAPH_SUBJECTS,
  getGraphBySlug,
  getGraphDetail,
  graphCategories,
  graphsByCategory,
  type GraphSubject,
} from "@/lib/graphs";
import { SHAPE_GENERATORS } from "@/lib/graphs-shapes";

/**
 * Graph Bank integrity gate (hardcoded-science upgrade, 2026-09-30).
 *
 * The bank is a fully hardcoded knowledge asset: every entry must carry its
 * own authored deep-dive (gives/applies/happens/limits) and enrichment
 * (reality/facts) — the fallback derivation in getGraphDetail() exists only
 * as a safety net and must never actually be needed. These tests are the
 * gate that keeps every science graph at "exhaustive" level.
 */

const SHAPES = new Set(Object.keys(SHAPE_GENERATORS));

const SCIENCE_MINIMUMS: Record<GraphSubject, number> = {
  physics: 26,
  chemistry: 14,
  biology: 11,
  mathematics: 20,
};

/** The 13 science graphs added in the upgrade — none may regress away. */
const UPGRADED_SCIENCE_IDS = [
  "phy-shm-energy",
  "phy-faraday-flux-time",
  "phy-transformer-efficiency",
  "phy-transistor-output",
  "phy-doppler-shift",
  "chem-arrhenius-plot",
  "chem-conductivity-dilution",
  "chem-common-ion-effect",
  "chem-equilibrium-approach",
  "bio-enzyme-inhibition",
  "bio-survivorship",
  "bio-action-potential",
  "bio-predator-prey",
] as const;

describe("graph bank integrity", () => {
  it("has unique ids and slugs", () => {
    const ids = ALL_GRAPHS.map((g) => g.id);
    const slugs = ALL_GRAPHS.map((g) => g.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references only registered shapes", () => {
    for (const g of ALL_GRAPHS) {
      for (const s of g.series) {
        expect(SHAPES.has(s.shape), `${g.id}: unknown shape "${s.shape}"`).toBe(true);
      }
    }
  });

  it("gives every entry the full core knowledge fields", () => {
    for (const g of ALL_GRAPHS) {
      expect(g.name.trim().length, `${g.id}: name`).toBeGreaterThan(4);
      expect(g.category.trim().length, `${g.id}: category`).toBeGreaterThan(2);
      expect(g.basis.trim().length, `${g.id}: basis`).toBeGreaterThan(30);
      expect(g.meaning.trim().length, `${g.id}: meaning`).toBeGreaterThan(30);
      expect(g.output.trim().length, `${g.id}: output`).toBeGreaterThan(30);
      expect(g.axes.x.trim().length, `${g.id}: x axis`).toBeGreaterThan(0);
      expect(g.axes.y.trim().length, `${g.id}: y axis`).toBeGreaterThan(0);
      expect(g.series.length, `${g.id}: series`).toBeGreaterThanOrEqual(1);
      expect(g.specialCases.length, `${g.id}: special cases`).toBeGreaterThanOrEqual(2);
      for (const sc of g.specialCases) {
        expect(sc.meaning.trim().length, `${g.id}: special case "${sc.name}"`).toBeGreaterThan(15);
      }
    }
  });

  it("ships an authored deep-dive for EVERY graph (no fallback allowed)", () => {
    for (const g of ALL_GRAPHS) {
      const detail = getGraphDetail(g);
      expect(detail.gives.length, `${g.id}: gives`).toBeGreaterThanOrEqual(3);
      expect(detail.applies.length, `${g.id}: applies`).toBeGreaterThanOrEqual(2);
      expect(detail.happens.length, `${g.id}: happens`).toBeGreaterThanOrEqual(3);
      // The fallback returns limits: [] — an authored record always has them.
      expect(detail.limits.length, `${g.id}: limits (authored detail missing?)`).toBeGreaterThanOrEqual(2);
    }
  });

  it("ships reality + facts enrichment for EVERY graph", () => {
    const missingReality: string[] = [];
    const missingFacts: string[] = [];
    for (const g of ALL_GRAPHS) {
      const detail = getGraphDetail(g);
      if ((detail.reality?.length ?? 0) < 2) missingReality.push(g.id);
      if ((detail.facts?.length ?? 0) < 3) missingFacts.push(g.id);
    }
    expect(missingReality, "graphs missing reality entries").toEqual([]);
    expect(missingFacts, "graphs missing facts entries").toEqual([]);
  });

  it("keeps every subject above its upgraded bank floor", () => {
    for (const subject of GRAPH_SUBJECTS.map((s) => s.slug)) {
      const count = ALL_GRAPHS.filter((g) => g.subject === subject).length;
      expect(count, `subject ${subject}`).toBeGreaterThanOrEqual(SCIENCE_MINIMUMS[subject]);
    }
  });

  it("keeps all 13 upgraded science graphs in the bank", () => {
    for (const id of UPGRADED_SCIENCE_IDS) {
      expect(
        ALL_GRAPHS.some((g) => g.id === id),
        `missing upgraded graph ${id}`,
      ).toBe(true);
    }
  });

  it("keeps marks inside the normalized plot box", () => {
    for (const g of ALL_GRAPHS) {
      for (const m of g.marks ?? []) {
        expect(m.x, `${g.id}: mark "${m.label}" x`).toBeGreaterThanOrEqual(0);
        expect(m.x, `${g.id}: mark "${m.label}" x`).toBeLessThanOrEqual(1);
        if (m.y !== undefined) {
          expect(m.y, `${g.id}: mark "${m.label}" y`).toBeGreaterThanOrEqual(0);
          expect(m.y, `${g.id}: mark "${m.label}" y`).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it("resolves every subject through categories and slug lookup", () => {
    for (const { slug } of GRAPH_SUBJECTS) {
      const categories = graphCategories(slug);
      expect(categories.length, `subject ${slug}: categories`).toBeGreaterThan(0);
      const grouped = graphsByCategory(slug);
      let groupedCount = 0;
      for (const entries of grouped.values()) groupedCount += entries.length;
      const directCount = ALL_GRAPHS.filter((g) => g.subject === slug).length;
      expect(groupedCount).toBe(directCount);
      for (const g of ALL_GRAPHS.filter((x) => x.subject === slug)) {
        expect(getGraphBySlug(g.slug)?.id).toBe(g.id);
      }
    }
  });
});
