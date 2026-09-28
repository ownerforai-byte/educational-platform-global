/**
 * Unit-specific mindmap branches, derived from the high-yield fact bank.
 *
 * The mindmap used to fall from the 10 authored UNIT_CONCEPTS entries straight
 * to one shared generic tree per subject — so most syllabus units showed the
 * *same* branches, sub-branches and hierarchy. This module closes that gap:
 * every unit whose facts are curated in `HIGH_YIELD_TOPIC_BANK` (65 unit
 * slugs across Physics, Chemistry, Biology, Mathematics and Languages) gets a
 * branch tree built from ITS OWN knowledge:
 *
 *   - Governing Laws & Conditions   ← governingLaws (statements + formulas)
 *   - Speed Formulas & Constants    ← speedFormulas + constantsAndValues
 *   - Worked Numericals             ← workedNumericals (problem → answer)
 *   - CEE Traps & Misconceptions    ← entranceTraps (trap → truth)
 *   - Key Terms & Definitions       ← keyTermsAndDefinitions
 *
 * Branches only appear when the unit actually has that kind of knowledge, so
 * the branch set, node counts, angles and hierarchy differ from unit to unit —
 * no two units render an identical tree. Pure data, client-safe (no fs).
 */

import {
  HIGH_YIELD_TOPIC_BANK,
  getHighYieldTopicData,
  type HighYieldTopicData,
} from "@/lib/high-yield-topic-facts";
import type {
  MindMapBranch,
  MindMapSubBranch,
  MindMapLeafNode,
} from "@/components/lab/topic-mindmap";

/** Rotating palette — assigned by branch position, so colours track content. */
const PALETTE = ["#38bdf8", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];

const MAX_NODES_PER_SUB = 6;
const MAX_BRANCHES = 5;

const clip = (s: string, n: number) =>
  (s ?? "").replace(/\s+/g, " ").trim().slice(0, n);

/**
 * Readable one-line form of a LaTeX formula for plain-text slots (canvas
 * capsule subtitles, search). `formulaLatex` keeps the original for every
 * KaTeX consumer — this only exists so raw `\frac{…}` never shows as text.
 */
const GREEK: Record<string, string> = {
  pi: "π", theta: "θ", alpha: "α", beta: "β", gamma: "γ", delta: "δ",
  Delta: "Δ", lambda: "λ", mu: "μ", nu: "ν", sigma: "σ", Sigma: "Σ",
  omega: "ω", Omega: "Ω", phi: "φ", psi: "ψ", tau: "τ", rho: "ρ",
  kappa: "κ", epsilon: "ε", eta: "η", hbar: "ℏ",
};

function latexToPlain(tex: string): string {
  if (!tex) return "";
  let out = tex.replace(/\$\$/g, " ");
  // Unwind nested constructs innermost-first.
  for (let pass = 0; pass < 3; pass++) {
    out = out
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\sqrt\{([^{}]*)\}/g, "√($1)")
      .replace(/\\text\{([^{}]*)\}/g, "$1");
  }
  out = out
    .replace(/\\left|\\right/g, "")
    .replace(/\\times/g, "×")
    .replace(/\\propto/g, "∝")
    .replace(/\\approx/g, "≈")
    .replace(/\\pm/g, "±")
    .replace(/\\cdot/g, "·")
    .replace(/\\leq?/g, "≤")
    .replace(/\\geq?/g, "≥")
    .replace(/\\neq?/g, "≠")
    .replace(/\\infty/g, "∞")
    .replace(/\\,|\\;|\\!|\\quad|\\qquad/g, " ")
    .replace(/\\([A-Za-z]+)/g, (_m, name: string) => GREEK[name] ?? " ")
    .replace(/\^\{([^{}]*)\}/g, "^$1")
    .replace(/_\{([^{}]*)\}/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/~|\s+/g, " ")
    .trim();
  return out;
}

/** Every bank entry that claims this unit; keyword match only as a fallback. */
function entriesForUnit(
  unitId: string,
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
): HighYieldTopicData[] {
  if (unitId) {
    const exact = HIGH_YIELD_TOPIC_BANK.filter((e) =>
      e.unitSlugs?.includes(unitId),
    );
    if (exact.length > 0) return exact;
  }
  // No entry claims the unit: allow a scored keyword match (never a blind
  // "first entry for this subject" — that is what made trees repeat).
  const byKeyword = getHighYieldTopicData(subjectSlug, topicSlug, topicTitle);
  return byKeyword ? [byKeyword] : [];
}

function sub(
  id: string,
  title: string,
  description: string,
  nodes: MindMapLeafNode[],
): MindMapSubBranch | null {
  if (nodes.length === 0) return null;
  return { id, title, description, orderIndex: 1, nodes: nodes.slice(0, MAX_NODES_PER_SUB) };
}

function branch(
  id: string,
  category: string,
  colorIndex: number,
  orderIndex: number,
  subBranches: (MindMapSubBranch | null)[],
): MindMapBranch | null {
  const subs = subBranches.filter((s): s is MindMapSubBranch => s !== null);
  if (subs.length === 0) return null;
  const color = PALETTE[colorIndex % PALETTE.length];
  return {
    id,
    category,
    color,
    bgColor: `${color}26`,
    borderColor: color,
    angle: 0, // assigned once the final branch count is known
    orderIndex,
    subBranches: subs,
    nodes: [],
  };
}

/**
 * Build a distinct branch tree for one unit, or `undefined` when the bank has
 * nothing usable (caller then falls through to its older fallbacks).
 */
export function buildUnitMindmapBranches(
  unitId: string,
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
): MindMapBranch[] | undefined {
  const entries = entriesForUnit(unitId, subjectSlug, topicSlug, topicTitle);
  if (entries.length === 0) return undefined;

  const uid = (unitId || topicSlug || "unit").replace(/[^a-z0-9-]+/gi, "-");
  let i = 0; // global node counter — keeps ids unique across merged entries
  const nextId = (kind: string) => `${uid}-${kind}-${i++}`;

  // ── 1. Governing laws: named statements with their validity conditions ──
  const lawNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const law of e.governingLaws.slice(0, 4)) {
      lawNodes.push({
        id: nextId("law"),
        title: clip(law.name, 70),
        description: clip(law.statement, 260),
        formula: latexToPlain(law.formula),
        formulaLatex: law.formula ? `$$${law.formula}$$` : undefined,
        examFact: clip(law.conditions, 180),
        highYield: true,
        orderIndex: lawNodes.length + 1,
      });
    }
  }

  // ── 2. Speed formulas + fixed constants (two sub-branches) ──────────────
  const formulaNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const f of e.speedFormulas.slice(0, 4)) {
      const dims = f.dimensions ? ` · ${f.dimensions}` : "";
      formulaNodes.push({
        id: nextId("formula"),
        title: clip(f.name, 70),
        description: clip(f.description, 200),
        formula: latexToPlain(f.formula),
        formulaLatex: f.formula ? `$$${f.formula}$$` : undefined,
        examFact: clip(`${f.unit}${dims}`, 120),
        highYield: true,
        orderIndex: formulaNodes.length + 1,
      });
    }
  }
  const constantNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const c of e.constantsAndValues.slice(0, 4)) {
      constantNodes.push({
        id: nextId("const"),
        title: clip(`${c.symbol} — ${c.name}`, 70),
        description: `Measured constant used directly in numericals (${clip(c.unit, 40) || "dimensionless"}).`,
        formula: latexToPlain(`${c.symbol} = ${c.value} ${c.unit}`).trim(),
        formulaLatex: undefined,
        examFact: `Value to memorise: ${clip(`${c.symbol} = ${c.value} ${c.unit}`, 90)}`,
        highYield: false,
        orderIndex: constantNodes.length + 1,
      });
    }
  }

  // ── 3. Worked numericals: problem → answer chain ────────────────────────
  const numericalNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const w of e.workedNumericals.slice(0, 4)) {
      numericalNodes.push({
        id: nextId("num"),
        title: clip(w.problem, 90),
        description: clip(`${w.problem} — given: ${w.given}`, 260),
        formula: latexToPlain(w.answer),
        formulaLatex: w.answer ? `$$${w.answer}$$` : undefined,
        derivationSnippet: clip(w.steps.join(" → "), 300),
        examFact: "NEB/CEE pattern: extract the given, pick the governing relation, solve.",
        highYield: true,
        orderIndex: numericalNodes.length + 1,
      });
    }
  }

  // ── 4. Entrance traps: the wrong belief vs the truth ────────────────────
  const trapNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const t of e.entranceTraps.slice(0, 5)) {
      trapNodes.push({
        id: nextId("trap"),
        title: clip(t.trap, 90),
        description: clip(t.truth, 240),
        examFact: clip(t.examRef, 140),
        highYield: true,
        orderIndex: trapNodes.length + 1,
      });
    }
  }

  // ── 5. Key terms: term → definition → why it matters ────────────────────
  const termNodes: MindMapLeafNode[] = [];
  for (const e of entries) {
    for (const t of e.keyTermsAndDefinitions.slice(0, 4)) {
      termNodes.push({
        id: nextId("term"),
        title: clip(t.term, 70),
        description: clip(t.definition, 220),
        examFact: clip(t.significance, 160),
        highYield: false,
        orderIndex: termNodes.length + 1,
      });
    }
  }

  const built = [
    branch(`${uid}-laws`, "Governing Laws & Conditions", 0, 1, [
      sub(`${uid}-laws-sb`, "Statements & validity", "Named laws with exactly when they apply.", lawNodes),
    ]),
    branch(`${uid}-formulae`, "Speed Formulas & Constants", 1, 2, [
      sub(`${uid}-formulae-sb`, "Fast relations", "Plug-and-chug relations built for exam speed.", formulaNodes),
      sub(`${uid}-constants-sb`, "Fixed constants", "Values every answer assumes you know cold.", constantNodes),
    ]),
    branch(`${uid}-numericals`, "Worked Numericals", 2, 3, [
      sub(`${uid}-numericals-sb`, "Problem → answer chains", "Full solutions compressed to their decisive steps.", numericalNodes),
    ]),
    branch(`${uid}-traps`, "CEE Traps & Misconceptions", 3, 4, [
      sub(`${uid}-traps-sb`, "Wrong belief vs truth", "The belief that loses marks, and the correction.", trapNodes),
    ]),
    branch(`${uid}-terms`, "Key Terms & Definitions", 4, 5, [
      sub(`${uid}-terms-sb`, "Vocabulary that earns marks", "Precise definitions examiners quote verbatim.", termNodes),
    ]),
  ]
    .filter((b): b is MindMapBranch => b !== null)
    .slice(0, MAX_BRANCHES);

  if (built.length === 0) return undefined;

  // Fan the branches across the canvas: angles spread by the final count so
  // a 2-branch unit and a 5-branch unit lay out differently.
  const n = built.length;
  built.forEach((b, idx) => {
    b.angle = n === 1 ? -90 : Math.round(-70 + (140 * idx) / (n - 1));
  });

  return built;
}
