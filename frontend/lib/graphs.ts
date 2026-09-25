/**
 * Graph Bank — data model + aggregator.
 *
 * A complete, classified bank of every graph an NEB science student meets,
 * in curriculum order: basis, meaning, how to read it, special cases and
 * its visual output (drawn by components/graphs/graph-sketch.tsx from the
 * shape descriptors here).
 */

import type { ShapeName } from "@/lib/graphs-shapes";
import { PHYSICS_GRAPHS } from "@/lib/graphs-data-physics";
import { PHYSICS_GRAPHS_2 } from "@/lib/graphs-data-physics-2";
import { CHEM_BIO_GRAPHS } from "@/lib/graphs-data-chem-bio";
import { MATH_GRAPHS } from "@/lib/graphs-data-math";
import { DETAIL_PHYSICS_1 } from "@/lib/graphs-detail-physics-1";
import { DETAIL_PHYSICS_2 } from "@/lib/graphs-detail-physics-2";
import { DETAIL_CHEM } from "@/lib/graphs-detail-chem";
import { DETAIL_BIO } from "@/lib/graphs-detail-bio";
import { DETAIL_MATH_1 } from "@/lib/graphs-detail-math-1";
import { DETAIL_MATH_2 } from "@/lib/graphs-detail-math-2";
import { COMPARE_PHYSICS } from "@/lib/graphs-compare-physics";
import { COMPARE_CHEM_BIO_MATH } from "@/lib/graphs-compare-chem-bio-math";
import { GRAPH_REALITY_FACTS } from "@/lib/graphs-facts";

export type { ShapeName };

export type GraphSubject = "physics" | "chemistry" | "biology" | "mathematics";

export interface GraphSeries {
  shape: ShapeName;
  /** Curve variant knob (per-shape meaning, e.g. steepness). */
  variant?: number;
  label?: string;
  dashed?: boolean;
}

export interface GraphMark {
  /** Normalized x (0-1) position. */
  x: number;
  /** Optional normalized y (defaults on-curve). */
  y?: number;
  label: string;
  type?: "point" | "vline" | "hline";
}

export interface GraphSpecialCase {
  name: string;
  condition: string;
  meaning: string;
}

/** Authored deep-dive detail shown under every graph's own page. */
export interface GraphDetailInfo {
  /** What the graph GIVES you — the readouts it hands over. */
  gives: string[];
  /** Where it APPLIES — what it works for, where it is used. */
  applies: string[];
  /** WHAT HAPPENS — behaviour narrative as you move along / change conditions. */
  happens: string[];
  /** LIMITS — where the graph/model stops being trustworthy. */
  limits: string[];
  /** IN REALITY — where this graph shows up in the real world. */
  reality?: string[];
  /** KEY FACTS — memorable, conceptual, exam-worthy nuggets. */
  facts?: string[];
  /** Comparison layer for multi-condition graphs (all shown at once). */
  compare?: GraphCompareNote;
}

/** Authored per-series comparison for graphs plotting several CONDITIONS. */
export interface GraphCompareNote {
  /** Per-series meaning, aligned with the entry's series order. */
  series: { label: string; meaning: string }[];
  /** The visible differences between the conditions. */
  differences: string[];
  /** How to identify which curve is which at a glance. */
  identify?: string[];
}

export interface GraphEntry {
  id: string;
  slug: string;
  name: string;
  subject: GraphSubject;
  /** Category title, ordered inside its subject. */
  category: string;
  classLevel: "class-11" | "class-12" | "both";
  axes: { x: string; y: string };
  /** What is plotted against what, and why this graph exists. */
  basis: string;
  /** What the graph tells us. */
  meaning: string;
  /** Governing equation (KaTeX, no $). */
  equation?: string;
  series: GraphSeries[];
  marks?: GraphMark[];
  /** Interpretation hooks. */
  howToRead?: { slope?: string; area?: string; intercept?: string };
  /** Output: the shape produced and the conclusion it carries. */
  output: string;
  specialCases: GraphSpecialCase[];
  traps?: string[];
  /**
   * Trigonometric angle axis: spans one full period in degrees and labels
   * the standard angles (0°, 30°, 45°, 60°, 90°…) in degrees and radians.
   */
  angleAxis?: {
    /** Full period span in degrees (e.g. 180 for tan/cot, 360 for sin/cos). */
    periodDeg: number;
    /** Which standard angles to label on the x-axis. */
    ticksDeg: number[];
  };
}

export const GRAPH_SUBJECTS: { slug: GraphSubject; label: string }[] = [
  { slug: "physics", label: "Physics" },
  { slug: "chemistry", label: "Chemistry" },
  { slug: "biology", label: "Biology" },
  { slug: "mathematics", label: "Mathematics" },
];

export const ALL_GRAPHS: GraphEntry[] = [
  ...PHYSICS_GRAPHS,
  ...PHYSICS_GRAPHS_2,
  ...CHEM_BIO_GRAPHS,
  ...MATH_GRAPHS,
];

/** Authored detail layer for every graph id. */
const GRAPH_DETAILS: Record<string, GraphDetailInfo> = {
  ...DETAIL_PHYSICS_1,
  ...DETAIL_PHYSICS_2,
  ...DETAIL_CHEM,
  ...DETAIL_BIO,
  ...DETAIL_MATH_1,
  ...DETAIL_MATH_2,
};

const GRAPH_COMPARES: Record<string, GraphCompareNote> = {
  ...COMPARE_PHYSICS,
  ...COMPARE_CHEM_BIO_MATH,
};

/**
 * Detail for a graph — the authored record, or a sensible derivation from the
 * entry itself so no page is ever without content.
 */
export function getGraphDetail(g: GraphEntry): GraphDetailInfo {
  const authored = GRAPH_DETAILS[g.id];
  const rf = GRAPH_REALITY_FACTS[g.id];
  if (authored)
    return {
      ...authored,
      compare: GRAPH_COMPARES[g.id] ?? authored.compare,
      reality: rf?.reality ?? authored.reality ?? [],
      facts: rf?.facts ?? authored.facts ?? [],
    };
  const gives: string[] = [];
  if (g.howToRead?.slope) gives.push(`Slope gives: ${g.howToRead.slope}.`);
  if (g.howToRead?.area) gives.push(`Area under curve gives: ${g.howToRead.area}.`);
  if (g.howToRead?.intercept) gives.push(`Intercept gives: ${g.howToRead.intercept}.`);
  return {
    gives: gives.length ? gives : [g.meaning],
    applies: [`${g.category} — core reading and reasoning in ${g.subject}.`],
    happens: [g.output],
    limits: [],
    compare: GRAPH_COMPARES[g.id],
    reality: rf?.reality ?? [],
    facts: rf?.facts ?? [],
  };
}

export function getGraphBySlug(slug: string): GraphEntry | undefined {
  return ALL_GRAPHS.find((g) => g.slug === slug);
}

/** Category titles in order for a subject. */
export function graphCategories(subject: GraphSubject): string[] {
  const seen: string[] = [];
  for (const g of ALL_GRAPHS) {
    if (g.subject === subject && !seen.includes(g.category)) seen.push(g.category);
  }
  return seen;
}

export function graphsByCategory(subject: GraphSubject): Map<string, GraphEntry[]> {
  const map = new Map<string, GraphEntry[]>();
  for (const g of ALL_GRAPHS) {
    if (g.subject !== subject) continue;
    const arr = map.get(g.category) ?? [];
    arr.push(g);
    map.set(g.category, arr);
  }
  return map;
}
