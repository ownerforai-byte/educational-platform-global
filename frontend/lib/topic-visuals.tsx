/**
 * TOPIC-DERIVED VISUALS — what the branches and the schematic are ABOUT.
 * =====================================================================
 *
 * The Visual Workspace had four hand-maintained sources (10 authored unit
 * concepts, 20 concept schematics, the high-yield bank, 59 legacy mindmap
 * JSONs). Between them they covered a minority of the syllabus, and every
 * uncovered topic silently rendered a SHARED fallback — the same subject-wide
 * branch tree, and one constant inclined-plane drawing for 599 topics that are
 * not about inclined planes at all. Nothing was wrong on screen, which is why
 * it survived.
 *
 * This module closes the gap by deriving BOTH visuals from the topic's own
 * material, in this order of trust:
 *
 *   1. the syllabus scope of the topic's unit (`SYLLABUS[].topics`) — the
 *      authoritative statement of what the unit is allowed to be about,
 *   2. the curated high-yield bank entry that claims the unit by EXACT id
 *      (laws, formulas, constants, traps, worked numericals, key terms),
 *   3. the topic's own loaded concept note (formulas, statements, definitions,
 *      misconceptions, exam notes) when the page has one.
 *
 * Nothing enters a generated tree or drawing that does not come from (1)–(3),
 * so a topic can no longer show another topic's knowledge. The drawing SHAPE is
 * chosen by classifying the topic's own content (cycle, chain, structure,
 * graph, gradient, comparison, mechanism, classification, construction or
 * formula map), and its labelled annotations are the topic's own items.
 *
 * Pure and client-safe: no fs, no network, deterministic.
 */

import type React from "react";

import { SYLLABUS } from "@/lib/syllabus";
import { getHighYieldEntriesForUnit } from "@/lib/high-yield-topic-facts";
import type { ConceptAnnotation } from "@/components/lab/schematic-concepts";
import type {
  MindMapBranch,
  MindMapLeafNode,
  MindMapSubBranch,
} from "@/components/lab/topic-mindmap";

/* ═══════════════════════════ 1. text utilities ═══════════════════════════ */

const STOP = new Set([
  "the", "and", "for", "with", "from", "into", "that", "this", "their", "its",
  "other", "others", "unit", "chapter", "topic", "class", "grade", "notes",
  "note", "concept", "concepts", "study", "general", "basic", "basics",
  "introduction", "intro", "overview", "types", "type", "use", "uses", "using",
  "more", "most", "such", "than", "then", "when", "where", "which", "what",
  "who", "how", "why", "both", "each", "some", "many", "very", "also", "may",
  "can", "will", "shall", "should", "must", "not", "nor", "but", "are", "was",
  "were", "has", "have", "had", "been", "being", "does", "did", "doing", "of",
  "in", "on", "at", "by", "as", "is", "it", "to", "an", "or", "be", "if",
  "various", "different", "given", "following", "about", "along", "over",
  "under", "between", "among", "etc", "e.g", "i.e", "based", "made", "make",
]);

/** Lowercased word tokens; hyphens and slashes split, stopwords dropped. */
export function words(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097f]+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^-+|-+$/g, ""))
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/** A slug or hyphenated title as readable words. */
export function slugWords(slug: string): string {
  return (slug || "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Capitalise the first letter of each word, preserving existing capitals. */
export function titleCase(text: string): string {
  return (text || "")
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Generated filler that must never reach a tree or a drawing: index-numbered
 * stubs ("Key Formula 1:", "Q3. Define and explain…") and unfilled brackets
 * ("[insert from textbook]"). Both were present in the source notes.
 */
const FILLER_RE =
  /^(Key Formula|Key Point|Example|Point|Formula|Note)\s*\d+\s*[:.]|^(Q\d+|[a-z])\.?\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)|\[[^\]]*(insert|variable|fill|tbd)[^\]]*\]|\bcoming soon\b|\blorem\b/i;

const isFiller = (text: string): boolean => {
  const clean = (text || "").trim();
  return clean.length < 3 || FILLER_RE.test(clean);
};

const clip = (text: string, max: number): string => {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trim()}…`;
};

/** Whole-word containment — "heat" must not match "cheating". */
function hasWord(haystack: string, needle: string): boolean {
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(haystack);
}

/** How many of `needles` appear as whole words in `haystack`. */
function hits(haystack: string, needles: readonly string[]): number {
  let n = 0;
  for (const needle of needles) if (hasWord(haystack, needle)) n += 1;
  return n;
}

/* ═══════════════════════ 2. the unit's own syllabus scope ════════════════ */

export interface UnitScope {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  /** The unit's syllabus topic sentences — the authoritative scope. */
  topics: string[];
}

/**
 * One track's view of a unit. Almost every id belongs to exactly one track,
 * but `language-development` exists in both class-11 and class-12 with
 * different titles and different topic counts, so the index keeps them apart
 * and merges only as the fallback for callers that do not know their track
 * (the mindmap hub, which deliberately mixes classes).
 */
interface UnitVariant {
  classSlug: string;
  subjectSlug: string;
  unitTitle: string;
  topics: string[];
}

const VARIANTS: Map<string, UnitVariant[]> = (() => {
  const index = new Map<string, UnitVariant[]>();
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        const list = index.get(unit.id) ?? [];
        list.push({
          classSlug: cls.slug,
          subjectSlug: subject.slug,
          unitTitle: unit.title,
          topics: [...(unit.topics ?? [])],
        });
        index.set(unit.id, list);
      }
    }
  }
  return index;
})();

/** Every syllabus unit, deduped by unit id. */
export function allUnitScopes(): UnitScope[] {
  return [...VARIANTS.keys()].map((unitId) => resolveUnitScope(unitId)!);
}

/**
 * The unit's own syllabus scope, or undefined for an unknown id.
 *
 * A unit id is only unique within a class AND a subject: `vectors` is both a
 * physics and a mathematics unit in class 11, and `language-development` is in
 * both tracks with different titles. Pass `classSlug` and `subjectSlug` when
 * the caller knows them and the exact variant wins. Without them — the mindmap
 * hub, which deliberately mixes classes — the scope is the union of every
 * track, so nothing goes missing.
 */
export function resolveUnitScope(
  unitId: string,
  classSlug?: string,
  subjectSlug?: string,
): UnitScope | undefined {
  const variants = VARIANTS.get(unitId);
  if (!variants || !variants.length) return undefined;

  const normalize = (s?: string) => (s || "").toLowerCase();
  const wantedClass = classSlug ? normalize(classSlug) : undefined;
  const wantedSubject = subjectSlug ? normalize(normalizeSubject(subjectSlug)) : undefined;

  let variant: UnitVariant | undefined;
  if (wantedClass || wantedSubject) {
    variant = variants.find(
      (v) =>
        (!wantedClass || v.classSlug === wantedClass) &&
        (!wantedSubject || v.subjectSlug === wantedSubject),
    );
  }
  if (variant) {
    return {
      classSlug: variant.classSlug,
      subjectSlug: variant.subjectSlug,
      unitId,
      unitTitle: variant.unitTitle,
      topics: [...variant.topics],
    };
  }

  const first = variants[0];
  const topics: string[] = [];
  for (const v of variants) {
    for (const t of v.topics) if (!topics.includes(t)) topics.push(t);
  }
  return {
    classSlug: first.classSlug,
    subjectSlug: first.subjectSlug,
    unitId,
    unitTitle: first.unitTitle,
    topics,
  };
}

/** Normalise a subject slug the same way the schematic components do. */
export function normalizeSubject(subjectSlug: string): string {
  const s = (subjectSlug || "").toLowerCase();
  if (s.includes("physic")) return "physics";
  if (s.includes("chem")) return "chemistry";
  if (s.includes("bio")) return "biology";
  if (s.includes("math")) return "mathematics";
  if (s.includes("nepali")) return "nepali";
  if (s.includes("english")) return "english";
  return "general";
}

/* ═══════════════════════ 3. topic knowledge aggregate ════════════════════ */

export type KnowledgeKind =
  | "concept"
  | "formula"
  | "law"
  | "process"
  | "trap"
  | "exam"
  | "numerical";

export interface KnowledgeItem {
  kind: KnowledgeKind;
  /** Short name shown as the leaf/annotation headline. */
  name: string;
  /** The substance: statement, definition, condition or solution line. */
  detail: string;
  /** Formula or decisive relation, when the item has one. */
  formula?: string;
  /** Extra exam pointer, when the source carries one. */
  exam?: string;
  /** How strongly this item belongs to the FOCUSED topic (0 = unit level). */
  focus: number;
}

export type DiagramKind =
  | "cycle"
  | "chain"
  | "structure"
  | "graph"
  | "gradient"
  | "comparison"
  | "mechanism"
  | "classification"
  | "construction"
  | "formula-map";

/**
 * The subset of a loaded syllabus-notes concept this module understands.
 * Declared structurally so callers can pass their own note type unchanged.
 */
export interface ConceptNoteLike {
  title?: string;
  topicTitle?: string;
  summary?: string;
  notes?: string[];
  formulas?: string[];
  keyPoints?: string[];
  importantConcepts?: string[];
  importantStatements?: string[];
  importantNotes?: string[];
  examShortTricks?: string[];
  examNotes?: string[];
  specialNotes?: string[];
  universalFacts?: string[];
  confusion?: string[];
  numericals?: string[];
  examples?: string[];
  practiceQuestions?: string[];
  mcs?: Array<{ question?: string; options?: string[]; answer?: string }>;
}

export interface TopicKnowledge {
  subject: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
  /** The unit's syllabus topics. */
  scope: string[];
  /** The scope sentences (or the title) that belong to THIS topic. */
  focus: string[];
  /** Everything known about the topic, focused items first. */
  items: KnowledgeItem[];
  kind: DiagramKind;
  /** Whether the topic had its own note / bank entry (vs. scope only). */
  grounded: boolean;
}

export interface TopicKnowledgeInput {
  subjectSlug: string;
  unitId?: string;
  topicSlug: string;
  topicTitle?: string;
  /** Class track — narrows a shared unit id to its own title and topics. */
  classSlug?: string;
  /** The topic's loaded concept notes, when the page has them. */
  concepts?: ConceptNoteLike[];
}

/** Focus score: how much of the topic's own words an item's text repeats. */
function focusScore(text: string, topicWords: Set<string>): number {
  const tokens = words(text);
  if (!tokens.length) return 0;
  let n = 0;
  for (const t of tokens) if (topicWords.has(t)) n += 1;
  return Math.min(6, Math.round((n / tokens.length) * 10));
}

const KIND_TAG: Record<KnowledgeKind, string> = {
  concept: "Definition",
  formula: "Relation",
  law: "Law",
  process: "Process",
  trap: "Trap",
  exam: "Exam",
  numerical: "Numerical",
};

/**
 * Every item known about this topic, most topic-specific first.
 * Sources: the unit's curated bank entry, then the topic's own note.
 */
export function buildTopicKnowledge(input: TopicKnowledgeInput): TopicKnowledge {
  const unitScope = resolveUnitScope(
    input.unitId ?? "",
    input.classSlug,
    input.subjectSlug,
  );
  const subject = normalizeSubject(input.subjectSlug || unitScope?.subjectSlug || "");
  const unitTitle = unitScope?.unitTitle ?? titleCase(slugWords(input.unitId ?? ""));
  const topicTitle = input.topicTitle || titleCase(slugWords(input.topicSlug));

  const topicWords = new Set([
    ...words(topicTitle),
    ...words(slugWords(input.topicSlug)),
    ...words(slugWords(input.unitId ?? "")),
  ]);

  // The scope sentences that talk about THIS topic (else the whole unit scope).
  const scope = scopeOf(unitScope, topicTitle, input.topicSlug, topicWords);
  const focus = scope.focus;

  const items: KnowledgeItem[] = [];
  const push = (item: Omit<KnowledgeItem, "focus"> & { focus?: number }) =>
    items.push({ ...item, focus: item.focus ?? 0 });

  // ── (a) the curated bank entry that claims this unit by exact id ──
  const bank = input.unitId ? getHighYieldEntriesForUnit(input.unitId, subject) : [];
  for (const entry of bank) {
    for (const law of entry.governingLaws ?? []) {
      push({
        kind: "law",
        name: law.name,
        detail: [law.statement, law.conditions].filter(Boolean).join(" "),
        formula: law.formula || undefined,
        focus: focusScore(`${law.name} ${law.statement}`, topicWords),
      });
    }
    for (const f of entry.speedFormulas ?? []) {
      push({
        kind: "formula",
        name: f.name,
        detail: [f.description, f.unit ? `Unit: ${f.unit}` : ""].filter(Boolean).join(" "),
        formula: f.formula || undefined,
        focus: focusScore(`${f.name} ${f.description}`, topicWords),
      });
    }
    for (const c of entry.constantsAndValues ?? []) {
      push({
        kind: "formula",
        name: `${c.symbol} — ${c.name}`,
        detail: `Fixed value used directly in numericals (${c.unit || "dimensionless"}).`,
        formula: `${c.symbol} = ${c.value} ${c.unit}`.trim(),
        focus: 1,
      });
    }
    for (const t of entry.entranceTraps ?? []) {
      push({
        kind: "trap",
        name: t.trap,
        detail: t.truth,
        exam: t.examRef,
        focus: focusScore(`${t.trap} ${t.truth}`, topicWords),
      });
    }
    for (const n of entry.workedNumericals ?? []) {
      push({
        kind: "numerical",
        name: n.problem,
        detail: n.steps?.join(" → ") || n.given,
        formula: n.answer || undefined,
        focus: focusScore(`${n.problem} ${n.given}`, topicWords),
      });
    }
    for (const t of entry.keyTermsAndDefinitions ?? []) {
      push({
        kind: "concept",
        name: t.term,
        detail: t.definition,
        exam: t.significance,
        focus: focusScore(`${t.term} ${t.definition}`, topicWords),
      });
    }
  }

  // ── (b) the topic's own loaded note ──
  const concepts = input.concepts ?? [];
  const addAll = (
    values: string[] | undefined,
    kind: KnowledgeKind,
    label: string,
    limit: number,
  ) => {
    for (const raw of (values ?? []).slice(0, limit)) {
      const text = typeof raw === "string" ? raw : String(raw ?? "");
      if (!text.trim() || isFiller(text)) continue;
      const { name, detail } = splitStatement(text, label);
      push({ kind, name, detail, focus: focusScore(text, topicWords) + 2 });
    }
  };
  for (const c of concepts) {
    addAll(c.formulas, "formula", "Relation", 6);
    addAll(c.importantStatements, "law", "Statement", 6);
    addAll(c.importantConcepts, "concept", "Concept", 8);
    addAll(c.keyPoints, "concept", "Point", 8);
    addAll(c.notes, "process", "Process", 8);
    addAll(c.importantNotes, "process", "Note", 6);
    addAll(c.specialNotes, "exam", "Exam", 4);
    addAll(c.examShortTricks, "exam", "Trick", 4);
    addAll(c.examNotes, "exam", "Exam", 4);
    addAll(c.universalFacts, "concept", "Fact", 4);
    addAll(c.confusion, "trap", "Trap", 4);
    addAll(c.numericals, "numerical", "Numerical", 4);
  }

  // ── (c) the unit's own syllabus topics as the structural backbone ──
  for (const t of focus) {
    push({
      kind: "process",
      name: clip(t, 90),
      detail: "In-syllabus topic statement for this unit — the examinable scope.",
      focus: focusScore(t, topicWords) + 3,
    });
  }

  // ── (d) the rest of the unit's scope ──
  // The mindmap hub shows a UNIT, so the unit's remaining syllabus statements
  // belong in its tree; on a topic page they rank last (focus 0) and only
  // surface when the topic's own pool is small. Either way this is the same
  // unit's own material — never another unit's.
  for (const t of scope.all) {
    if (focus.includes(t)) continue;
    push({
      kind: "process",
      name: clip(t, 90),
      detail: `Also examinable in ${unitTitle} — the wider scope this topic sits in.`,
      focus: 0,
    });
  }

  const ranked = dedupe(items).sort((a, b) => b.focus - a.focus);

  return {
    subject,
    unitId: input.unitId ?? "",
    unitTitle,
    topicSlug: input.topicSlug,
    topicTitle,
    scope: scope.all,
    focus,
    items: ranked,
    kind: classifyDiagramKind({
      subject,
      topicTitle,
      unitTitle,
      scope: scope.all,
      focus,
      blob: ranked
        .slice(0, 24)
        .map((i) => `${i.name} ${i.detail}`)
        .join(" "),
    }),
    grounded: bank.length > 0 || concepts.length > 0,
  };
}

/** Unit scope + the subset of it that belongs to the focused topic. */
function scopeOf(
  unit: UnitScope | undefined,
  topicTitle: string,
  topicSlug: string,
  topicWords: Set<string>,
): { all: string[]; focus: string[] } {
  const all = unit?.topics ?? [];
  if (!all.length) return { all: [topicTitle], focus: [topicTitle] };

  const scored = all
    .map((t, index) => {
      let score = 0;
      for (const w of words(t)) if (topicWords.has(w)) score += 2;
      for (const w of words(slugWords(topicSlug))) {
        if (hasWord(t, w)) score += 1;
      }
      // Longer topics are richer statements of scope — a mild tie-breaker only.
      return { t, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const best = scored[0];
  if (!best || best.score === 0) {
    // No sentence mentions the topic by name: the whole unit scope is the
    // honest focus, plus the topic sentence itself.
    return { all, focus: all.slice(0, 6) };
  }
  const focus = scored
    .filter((s) => s.score >= Math.max(2, best.score - 1))
    .sort((a, b) => a.index - b.index)
    .map((s) => s.t)
    .slice(0, 6);
  return { all, focus: focus.length ? focus : [best.t] };
}

/** Split "Name: explanation" / "Name — explanation" into name + detail. */
function splitStatement(text: string, fallbackName: string): { name: string; detail: string } {
  const clean = text.replace(/\s+/g, " ").trim();
  const m = clean.match(/^(.{3,70}?)\s*[:—–-]\s+(.+)$/);
  if (m && words(m[1]).length >= 1) {
    return { name: clip(m[1], 70), detail: clip(m[2], 220) };
  }
  const firstSentence = clean.match(/^(.{10,90}?[.?!])\s*(.*)$/);
  if (firstSentence) {
    return { name: clip(firstSentence[1].replace(/\.$/, ""), 80), detail: clip(clean, 220) };
  }
  return { name: clip(clean, 80) || fallbackName, detail: clip(clean, 220) };
}

/** Drop near-duplicate items so a tree never repeats itself. */
function dedupe(items: KnowledgeItem[]): KnowledgeItem[] {
  const seen = new Set<string>();
  const out: KnowledgeItem[] = [];
  for (const item of items) {
    const name = (item.name || "").trim();
    if (!name) continue;
    const key = name.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, " ").trim().slice(0, 56);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ ...item, name: clip(name, 90) });
  }
  return out;
}

/* ═══════════════════ 4. which drawing does this topic need? ══════════════ */

interface KindRule {
  kind: DiagramKind;
  /** Words that, on their own, decide the shape. */
  strong: readonly string[];
  /** Supporting words. */
  weak?: readonly string[];
}

const KIND_RULES: readonly KindRule[] = [
  {
    kind: "cycle",
    strong: ["cycle", "circulation", "succession", "krebs", "biogeochemical", "recycling", "loop", "rhythm", "alternation"],
    weak: ["nitrogen", "carbon", "water", "oxygen", "nutrient", "feedback"],
  },
  {
    kind: "chain",
    strong: ["food-chain", "food-chain-and-food-web", "trophic", "pathway", "cascade", "sequence", "steps", "stages", "flow", "series-circuit", "transmission"],
    weak: ["chain", "web", "order", "stage", "level"],
  },
  {
    kind: "classification",
    strong: ["classification", "classify", "taxonomy", "nomenclature", "kingdom", "phylum", "hierarchy", "domains", "families", "types-of", "kinds-of", "groups", "table"],
    weak: ["family", "genus", "species", "class", "order", "division"],
  },
  {
    kind: "structure",
    strong: ["structure", "anatomy", "ultrastructure", "morphology", "organelles", "longitudinal", "cross-section", "diagram", "labelled", "parts", "internal", "external", "heart", "nephron", "neuron", "brain", "eye", "ear", "flower", "leaf", "root", "stem", "seed", "bone", "muscle", "membrane", "tissue", "organs", "vessel", "apparatus"],
    weak: ["cell", "cell-organelles", "layer", "wall", "lobe", "chamber", "valve", "duct"],
  },
  {
    kind: "comparison",
    strong: ["difference", "differences", "differentiate", "differentiating", "compare", "comparison", "distinguish", "advantages", "disadvantages", "contrast", "similarities"],
    weak: ["between", "versus", "vs", "types", "kind"],
  },
  {
    kind: "mechanism",
    strong: ["mechanism", "reaction", "sn1", "sn2", "substitution", "addition", "elimination", "hydrolysis", "electrolysis", "catalyst", "enzyme", "nucleophile", "electrophile", "polymerisation", "fermentation", "corrosion", "titration", "synthesis", "oxidation", "reduction", "transpiration", "respiration", "photosynthesis", "digestion", "assimilation", "mitosis", "meiosis", "fertilisation", "pollination", "germination"],
    weak: ["step", "intermediate", "product", "reactant", "attack", "bond-breaking", "bond"],
  },
  {
    kind: "graph",
    strong: ["graph", "plot", "variation", "versus", "vs", "characteristic", "curve", "load", "speed-time", "velocity-time", "displacement-time", "pressure-volume", "growth-curve", "distribution", "i-v"],
    weak: ["relation", "dependence", "proportional", "inverse", "linear", "slope", "intercept"],
  },
  {
    kind: "gradient",
    strong: ["trend", "trends", "series", "reactivity", "periodic", "electronegativity", "ionisation", "ionization", "order-of", "gradation", "spectrum", "sequence-of"],
    weak: ["across", "down", "along", "increasing", "decreasing", "comparison"],
  },
  {
    kind: "construction",
    strong: ["construction", "prove", "proof", "derive", "derivation", "theorem", "locus", "bisector", "tangent", "normal-to", "chord", "eccentricity", "foci", "directrix", "asymptote", "hyperbola", "ellipse", "parabola", "inverse-trigonometric"],
    weak: ["circle", "triangle", "line", "angle", "distance", "area", "volume"],
  },
];

export interface ClassifyInput {
  subject: string;
  topicTitle: string;
  unitTitle: string;
  scope: string[];
  focus: string[];
  /** Flattened knowledge text. */
  blob: string;
}

/**
 * Classify what KIND of drawing the topic needs, from its own content.
 * Weighted by where the word appears: the topic title counts most, the unit
 * and its scope next, the supporting knowledge least.
 */
export function classifyDiagramKind(input: ClassifyInput): DiagramKind {
  const titleHay = `${input.topicTitle} ${slugWords(input.topicTitle)}`.toLowerCase();
  const scopeHay = `${input.unitTitle} ${input.focus.join(" ")} ${input.scope.join(" ")}`;
  const blobHay = input.blob;

  // An explicit comparison imperative in the topic title always wins. Otherwise
  // "Differentiate between mitosis and meiosis" scores 12 for mechanism (two
  // named processes) and only 8 for comparison — a side-by-side sheet is the
  // answer the topic asked for, so it is decided up front rather than raced.
  if (
    /\b(differentiate|differentiating|distinguish|contrast|compare|comparison|differences|advantages)\b/.test(
      titleHay,
    )
  ) {
    return "comparison";
  }

  let best: { kind: DiagramKind; score: number } = { kind: "formula-map", score: 0 };
  for (const rule of KIND_RULES) {
    let score = 0;
    for (const w of rule.strong) {
      if (hasWord(titleHay, w)) score += 6;
      else if (hasWord(scopeHay, w)) score += 3;
      else if (hasWord(blobHay, w)) score += 1;
    }
    for (const w of rule.weak ?? []) {
      if (hasWord(titleHay, w)) score += 2;
      else if (hasWord(scopeHay, w)) score += 1;
    }
    if (score > best.score) best = { kind: rule.kind, score };
  }

  // Quantitative subjects with real formulas get the equation sheet by default;
  // everything else defaults to the walked structure/process map.
  if (best.score < 3) {
    const quantitative =
      input.subject === "physics" ||
      input.subject === "mathematics" ||
      /\b(formula|equation|relation|constant|dimensional)\b/i.test(blobHay);
    return quantitative ? "formula-map" : "structure";
  }
  return best.kind;
}

export const KIND_LABEL: Record<DiagramKind, string> = {
  cycle: "Cyclic process sheet",
  chain: "Sequential flow sheet",
  structure: "Labelled structure sheet",
  graph: "Graph & variation sheet",
  gradient: "Trend / gradient sheet",
  comparison: "Side-by-side comparison sheet",
  mechanism: "Reaction & mechanism sheet",
  classification: "Classification tree sheet",
  construction: "Construction & proof sheet",
  "formula-map": "Relation map sheet",
};

/* ═══════════════════ 5. branches derived from the topic ══════════════════ */

const PALETTE = ["#38bdf8", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];

let uidCounter = 0;
const nextId = (prefix: string) => `${prefix}-${(uidCounter += 1)}`;

function leafNode(
  item: KnowledgeItem,
  orderIndex: number,
  extras?: Partial<MindMapLeafNode>,
): MindMapLeafNode {
  const detail = item.detail || item.name;
  return {
    id: nextId("tv-node"),
    title: clip(item.name, 80),
    description: clip(detail, 260),
    formula: item.formula ? clip(item.formula, 120) : undefined,
    formulaLatex: undefined,
    examFact: clip(
      item.exam || `${KIND_TAG[item.kind]} — ${clip(detail, 140)}`,
      180,
    ),
    highYield: item.kind !== "concept",
    orderIndex,
    ...extras,
  };
}

function subBranch(
  id: string,
  title: string,
  description: string,
  nodes: MindMapLeafNode[],
  orderIndex = 1,
): MindMapSubBranch {
  return { id, title, description, orderIndex, nodes };
}

function branchOf(
  id: string,
  category: string,
  colorIndex: number,
  orderIndex: number,
  subs: MindMapSubBranch[],
): MindMapBranch | null {
  const usable = subs.filter((s) => s.nodes.length > 0);
  if (!usable.length) return null;
  const color = PALETTE[colorIndex % PALETTE.length];
  return {
    id,
    category,
    color,
    bgColor: `${color}26`,
    borderColor: color,
    angle: 0,
    orderIndex,
    subBranches: usable,
    nodes: [],
  };
}

function pick(items: KnowledgeItem[], kinds: KnowledgeKind[], limit: number): KnowledgeItem[] {
  const wanted = new Set(kinds);
  return items.filter((i) => wanted.has(i.kind)).slice(0, limit);
}

/**
 * A branch tree built ONLY from this topic's own knowledge.
 *
 * Branch families are shared across the syllabus (a mindmap needs a stable
 * vocabulary to be readable) but every branch, sub-branch and leaf appears only
 * when this topic actually has that kind of content, and every leaf carries
 * this topic's words. Two units therefore never render the same tree — which is
 * exactly what the shared generic fallback used to do.
 */
export function buildTopicBranches(knowledge: TopicKnowledge): MindMapBranch[] {
  const { items, unitTitle, topicTitle } = knowledge;
  const uid = `tv-${(knowledge.unitId || knowledge.topicSlug || "topic").replace(/[^a-z0-9-]+/gi, "-")}`;

  const concepts = pick(items, ["concept"], 6);
  const laws = pick(items, ["law"], 4);
  const formulas = pick(items, ["formula"], 6);
  const processes = pick(items, ["process"], 6);
  const traps = pick(items, ["trap"], 5);
  const exams = pick(items, ["exam"], 5);
  const numericals = pick(items, ["numerical"], 4);

  const built: (MindMapBranch | null)[] = [];

  // 1. The unit's own syllabus scope, topic by topic — the backbone. Focused
  //    statements come first so a topic page leads with its own material while
  //    the unit hub still covers every statement the unit is examined on.
  const scopeOrdered = [
    ...knowledge.focus,
    ...knowledge.scope.filter((s) => !knowledge.focus.includes(s)),
  ].slice(0, 5);
  const scopeSubs: MindMapSubBranch[] = scopeOrdered.map((statement, i) => {
    const related = items
      .filter((it) => focusScore(statement, new Set(words(statement))) > 0)
      .slice(0, 3);
    return subBranch(
      `${uid}-scope-${i}`,
      clip(statement, 70),
      "In-syllabus topic statement — everything below it is examinable.",
      related.length
        ? related.map((it, j) => leafNode(it, j + 1))
        : [
            {
              id: nextId("tv-scope"),
              title: clip(statement, 80),
              description: clip(statement, 240),
              examFact: clip(`NEB: ${statement}`, 160),
              highYield: false,
              orderIndex: 1,
            },
          ],
    );
  });

  // 2. Definitions & terms.
  const definitionSubs: MindMapSubBranch[] = [];
  if (concepts.length) {
    definitionSubs.push(
      subBranch(
        `${uid}-terms`,
        "Definitions examiners quote",
        "The precise vocabulary marks are awarded for.",
        concepts.map((c, i) => leafNode(c, i + 1)),
      ),
    );
  }
  if (knowledge.grounded) {
    definitionSubs.push(
      subBranch(
        `${uid}-exam-tricks`,
        "Exam framing",
        "How this topic's content is actually asked in NEB and CEE papers.",
        exams.length
          ? exams.map((e, i) => leafNode(e, i + 1))
          : [
              {
                id: nextId("tv-framing"),
                title: `Answer structure for ${clip(topicTitle, 50)}`,
                description:
                  "Define → state the governing relation → substitute → state the result with its unit or biological significance.",
                examFact: "NEB: method marks survive an arithmetic slip — always show the governing relation.",
                highYield: true,
                orderIndex: 1,
              },
            ],
      ),
    );
  }
  built.push(
    branchOf(`${uid}-concepts`, "Core Concepts & Terminology", 0, 1, [
      subBranch(
        `${uid}-scope-sb`,
        `Scope of ${clip(unitTitle, 44)}`,
        "The syllabus statements this unit is examined on.",
        scopeOrdered
          .slice(0, 4)
          .map((s, i) => ({
            id: nextId("tv-scope-leaf"),
            title: clip(s, 80),
            description: clip(s, 240),
            examFact: clip(`Must be covered for this unit.`, 120),
            highYield: false,
            orderIndex: i + 1,
          })),
      ),
      ...definitionSubs,
    ]),
  );

  // 3. Laws & formulas (only when the topic owns real relations).
  built.push(
    branchOf(`${uid}-laws`, "Governing Laws & Relations", 1, 2, [
      subBranch(
        `${uid}-laws-sb`,
        "Statements & validity",
        "Named results with exactly when they hold.",
        laws.map((l, i) => leafNode(l, i + 1)),
      ),
      subBranch(
        `${uid}-formulae-sb`,
        "Formulas & constants",
        "The decisive relations and fixed values.",
        formulas.map((f, i) => leafNode(f, i + 1)),
      ),
    ]),
  );

  // 4. Process / method.
  built.push(
    branchOf(`${uid}-process`, "Process & Method", 2, 3, [
      subBranch(
        `${uid}-process-sb`,
        "Step by step",
        "The order the topic must be reasoned in.",
        (processes.length ? processes : scopeSubs.length ? [] : [])
          .map((p, i) => leafNode(p, i + 1)),
      ),
      subBranch(
        `${uid}-numericals-sb`,
        "Worked numericals",
        "Problem → governing relation → answer.",
        numericals.map((n, i) => leafNode(n, i + 1)),
      ),
    ]),
  );

  // 5. Exam traps — the wrong belief beside the truth.
  built.push(
    branchOf(`${uid}-traps`, "Exam Traps & Misconceptions", 3, 4, [
      subBranch(
        `${uid}-traps-sb`,
        "Wrong belief vs truth",
        "What loses marks here, and the correction.",
        traps.map((t, i) => leafNode(t, i + 1)),
      ),
    ]),
  );

  const tree = built
    .filter((b): b is MindMapBranch => b !== null)
    .slice(0, 5);

  const n = tree.length;
  tree.forEach((b, idx) => {
    b.angle = n === 1 ? -90 : Math.round(-70 + (140 * idx) / (n - 1));
  });
  return tree;
}

/* ═══════════════════ 6. schematic derived from the topic ═════════════════ */

export interface TopicSchematic {
  subject: string;
  name: string;
  kind: DiagramKind;
  kindLabel: string;
  summary: string;
  annotations: ConceptAnnotation[];
  renderSvg: () => React.ReactNode;
}

const C = {
  red: "#ef4444",
  blue: "#38bdf8",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
  gray: "#94a3b8",
  slate: "#64748b",
};

/** One hotspot: where a leader line starts, ends, and its label sits. */
interface Slot {
  ax: number;
  ay: number;
  lx: number;
  ly: number;
  cx: number;
  cy: number;
  color: string;
}

/**
 * Hotspots are part of the drawing, so they are defined per shape. Six slots
 * are authored; a topic with fewer items simply uses the first n, which keeps
 * the leader lines from colliding.
 */
const SLOTS: Record<DiagramKind, Slot[]> = {
  cycle: [
    { ax: 450, ay: 115, lx: 300, ly: 60, cx: 360, cy: 78, color: C.green },
    { ax: 585, ay: 195, lx: 730, ly: 120, cx: 680, cy: 150, color: C.blue },
    { ax: 585, ay: 345, lx: 740, ly: 420, cx: 690, cy: 396, color: C.red },
    { ax: 450, ay: 425, lx: 300, ly: 480, cx: 360, cy: 462, color: C.amber },
    { ax: 315, ay: 345, lx: 150, ly: 420, cx: 210, cy: 396, color: C.purple },
    { ax: 315, ay: 195, lx: 150, ly: 120, cx: 210, cy: 150, color: C.slate },
  ],
  chain: [
    { ax: 175, ay: 285, lx: 120, ly: 120, cx: 120, cy: 210, color: C.blue },
    { ax: 375, ay: 285, lx: 375, ly: 130, cx: 375, cy: 215, color: C.purple },
    { ax: 575, ay: 285, lx: 575, ly: 440, cx: 575, cy: 368, color: C.green },
    { ax: 775, ay: 285, lx: 780, ly: 120, cx: 780, cy: 210, color: C.amber },
    { ax: 475, ay: 365, lx: 230, ly: 440, cx: 300, cy: 420, color: C.red },
    { ax: 275, ay: 215, lx: 660, ly: 130, cx: 660, cy: 190, color: C.slate },
  ],
  structure: [
    { ax: 380, ay: 150, lx: 190, ly: 90, cx: 250, cy: 110, color: C.blue },
    { ax: 560, ay: 160, lx: 760, ly: 100, cx: 700, cy: 120, color: C.green },
    { ax: 350, ay: 300, lx: 170, ly: 330, cx: 230, cy: 320, color: C.amber },
    { ax: 600, ay: 320, lx: 770, ly: 340, cx: 710, cy: 335, color: C.red },
    { ax: 470, ay: 420, lx: 470, ly: 490, cx: 470, cy: 462, color: C.purple },
    { ax: 470, ay: 95, lx: 470, ly: 40, cx: 470, cy: 66, color: C.slate },
  ],
  graph: [
    { ax: 260, ay: 400, lx: 150, ly: 460, cx: 190, cy: 440, color: C.blue },
    { ax: 400, ay: 300, lx: 380, ly: 120, cx: 390, cy: 200, color: C.green },
    { ax: 540, ay: 220, lx: 700, ly: 120, cx: 650, cy: 160, color: C.red },
    { ax: 680, ay: 275, lx: 780, ly: 400, cx: 750, cy: 360, color: C.amber },
    { ax: 200, ay: 200, lx: 190, ly: 80, cx: 190, cy: 130, color: C.purple },
    { ax: 300, ay: 455, lx: 300, ly: 492, cx: 300, cy: 470, color: C.slate },
  ],
  gradient: [
    { ax: 250, ay: 390, lx: 150, ly: 450, cx: 190, cy: 430, color: C.blue },
    { ax: 420, ay: 290, lx: 300, ly: 120, cx: 340, cy: 200, color: C.green },
    { ax: 600, ay: 200, lx: 640, ly: 90, cx: 630, cy: 140, color: C.red },
    { ax: 730, ay: 150, lx: 800, ly: 320, cx: 780, cy: 280, color: C.amber },
    { ax: 330, ay: 445, lx: 470, ly: 470, cx: 410, cy: 462, color: C.purple },
    { ax: 200, ay: 150, lx: 200, ly: 90, cx: 200, cy: 118, color: C.slate },
  ],
  comparison: [
    { ax: 250, ay: 170, lx: 175, ly: 90, cx: 200, cy: 120, color: C.blue },
    { ax: 250, ay: 350, lx: 170, ly: 450, cx: 200, cy: 420, color: C.green },
    { ax: 650, ay: 170, lx: 730, ly: 90, cx: 700, cy: 120, color: C.purple },
    { ax: 650, ay: 350, lx: 740, ly: 450, cx: 705, cy: 420, color: C.red },
    { ax: 450, ay: 250, lx: 450, ly: 480, cx: 450, cy: 420, color: C.amber },
    { ax: 450, ay: 120, lx: 450, ly: 55, cx: 450, cy: 85, color: C.slate },
  ],
  mechanism: [
    { ax: 220, ay: 300, lx: 130, ly: 150, cx: 160, cy: 220, color: C.green },
    { ax: 450, ay: 250, lx: 450, ly: 105, cx: 450, cy: 170, color: C.blue },
    { ax: 620, ay: 190, lx: 740, ly: 120, cx: 700, cy: 150, color: C.red },
    { ax: 620, ay: 390, lx: 740, ly: 440, cx: 700, cy: 425, color: C.purple },
    { ax: 330, ay: 420, lx: 200, ly: 455, cx: 260, cy: 445, color: C.amber },
    { ax: 450, ay: 470, lx: 470, ly: 492, cx: 460, cy: 484, color: C.slate },
  ],
  classification: [
    { ax: 455, ay: 105, lx: 455, ly: 45, cx: 455, cy: 72, color: C.slate },
    { ax: 250, ay: 330, lx: 140, ly: 250, cx: 180, cy: 290, color: C.blue },
    { ax: 455, ay: 330, lx: 455, ly: 480, cx: 455, cy: 420, color: C.green },
    { ax: 660, ay: 330, lx: 770, ly: 250, cx: 730, cy: 290, color: C.purple },
    { ax: 250, ay: 430, lx: 140, ly: 455, cx: 190, cy: 448, color: C.amber },
    { ax: 660, ay: 430, lx: 775, ly: 455, cx: 725, cy: 448, color: C.red },
  ],
  construction: [
    { ax: 300, ay: 275, lx: 150, ly: 180, cx: 205, cy: 220, color: C.blue },
    { ax: 450, ay: 275, lx: 450, ly: 60, cx: 450, cy: 140, color: C.green },
    { ax: 610, ay: 275, lx: 760, ly: 180, cx: 705, cy: 220, color: C.red },
    { ax: 300, ay: 160, lx: 200, ly: 420, cx: 230, cy: 360, color: C.amber },
    { ax: 610, ay: 160, lx: 720, ly: 420, cx: 690, cy: 360, color: C.purple },
    { ax: 450, ay: 400, lx: 450, ly: 492, cx: 450, cy: 452, color: C.slate },
  ],
  "formula-map": [
    { ax: 450, ay: 265, lx: 450, ly: 60, cx: 450, cy: 140, color: C.green },
    { ax: 330, ay: 200, lx: 160, ly: 120, cx: 230, cy: 160, color: C.blue },
    { ax: 570, ay: 200, lx: 745, ly: 120, cx: 675, cy: 160, color: C.red },
    { ax: 330, ay: 340, lx: 160, ly: 430, cx: 230, cy: 390, color: C.amber },
    { ax: 570, ay: 340, lx: 745, ly: 430, cx: 675, cy: 390, color: C.purple },
    { ax: 450, ay: 350, lx: 450, ly: 492, cx: 450, cy: 445, color: C.slate },
  ],
};

/** SVG stroke art per shape. `labels` are short names drawn inside the art. */
function artFor(kind: DiagramKind, labels: string[]): React.ReactNode {
  const L = (i: number, fallback: string) => clip(labels[i] ?? fallback, 22);
  switch (kind) {
    case "cycle": {
      const pt = (deg: number, r = 155) => {
        const rad = (deg * Math.PI) / 180;
        return [450 + r * Math.cos(rad), 270 + r * Math.sin(rad)];
      };
      return (
        <g>
          <circle cx="450" cy="270" r="155" fill="none" stroke={C.slate} strokeWidth="2" strokeDasharray="6 5" opacity="0.55" />
          {[-90, -30, 30, 90, 150, 210].map((deg, i) => {
            const [x, y] = pt(deg);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="40" fill={[C.green, C.blue, C.red, C.amber, C.purple, C.slate][i]} fillOpacity="0.12" stroke={[C.green, C.blue, C.red, C.amber, C.purple, C.slate][i]} strokeWidth="2.4" />
                <text x={x} y={y - 4} fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
                  {L(i, "Step").slice(0, 14)}
                </text>
                <text x={x} y={y + 9} fill="#94a3b8" fontSize="8" textAnchor="middle">
                  {`step ${i + 1}`}
                </text>
              </g>
            );
          })}
          {[-60, 0, 60, 120, 180, 240].map((deg, i) => {
            const [x1, y1] = pt(deg, 195);
            const [x2, y2] = pt(deg, 175);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.slate} strokeWidth="3" markerEnd="url(#arrow)" />;
          })}
        </g>
      );
    }
    case "chain":
      return (
        <g>
          {[175, 375, 575, 775].map((x, i) => (
            <g key={i}>
              <rect x={x - 85} y="215" width="170" height="140" rx="12" fill={PALETTE[i % PALETTE.length]} fillOpacity="0.1" stroke={PALETTE[i % PALETTE.length]} strokeWidth="2.4" />
              <text x={x} y="272" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                {L(i, "Stage").slice(0, 18)}
              </text>
              <text x={x} y="292" fill="#94a3b8" fontSize="9" textAnchor="middle">
                {`stage ${i + 1}`}
              </text>
            </g>
          ))}
          {[268, 468, 668].map((x, i) => (
            <line key={i} x1={x} y1="285" x2={x + 22} y2="285" stroke={C.gray} strokeWidth="3" markerEnd="url(#arrow)" />
          ))}
          <line x1="775" y1="356" x2="775" y2="425" stroke={C.gray} strokeWidth="2" strokeDasharray="5 4" />
        </g>
      );
    case "structure":
      return (
        <g>
          <rect x="300" y="80" width="340" height="380" rx="26" fill={C.blue} fillOpacity="0.06" stroke={C.slate} strokeWidth="3" />
          <line x1="300" y1="215" x2="640" y2="215" stroke={C.gray} strokeWidth="1.6" strokeDasharray="5 4" />
          <line x1="300" y1="345" x2="640" y2="345" stroke={C.gray} strokeWidth="1.6" strokeDasharray="5 4" />
          <circle cx="470" cy="150" r="34" fill={C.blue} fillOpacity="0.16" stroke={C.blue} strokeWidth="2.2" />
          <ellipse cx="470" cy="280" rx="76" ry="40" fill={C.green} fillOpacity="0.12" stroke={C.green} strokeWidth="2.2" />
          <rect x="400" y="365" width="140" height="66" rx="10" fill={C.amber} fillOpacity="0.12" stroke={C.amber} strokeWidth="2.2" />
          <text x="470" y="236" fill="#e2e8f0" fontSize="10" textAnchor="middle">
            {L(2, "Part").slice(0, 20)}
          </text>
          <text x="470" y="404" fill="#e2e8f0" fontSize="10" textAnchor="middle">
            {L(4, "Part").slice(0, 20)}
          </text>
        </g>
      );
    case "graph":
      return (
        <g>
          <line x1="180" y1="440" x2="830" y2="440" stroke={C.gray} strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="180" y1="440" x2="180" y2="70" stroke={C.gray} strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="822" y="462" fill={C.gray} fontSize="11">x</text>
          <text x="158" y="72" fill={C.gray} fontSize="11">y</text>
          <path d="M 200 430 C 330 300 520 175 700 165 C 760 162 800 175 820 190" fill="none" stroke={C.blue} strokeWidth="3.2" />
          <path d="M 200 430 C 430 250 700 250 820 430" fill="none" stroke={C.purple} strokeWidth="2" strokeDasharray="6 5" opacity="0.7" />
          <circle cx="400" cy="245" r="5" fill={C.green} />
          <circle cx="540" cy="190" r="5" fill={C.red} />
          <circle cx="680" cy="170" r="5" fill={C.amber} />
          <line x1="540" y1="190" x2="540" y2="440" stroke={C.slate} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
          <text x="548" y="455" fill={C.slate} fontSize="10">
            {L(2, "point")}
          </text>
        </g>
      );
    case "gradient":
      return (
        <g>
          <line x1="170" y1="440" x2="820" y2="440" stroke={C.gray} strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="170" y1="440" x2="170" y2="80" stroke={C.gray} strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 200 400 L 780 130" stroke={C.red} strokeWidth="3.4" markerEnd="url(#arrow-red)" />
          <rect x="170" y="130" width="26" height="310" fill="none" stroke={C.slate} strokeWidth="1.6" strokeDasharray="5 4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={230 + i * 130} cy={406 - i * 62} r="7" fill={PALETTE[i % PALETTE.length]} fillOpacity="0.8" />
          ))}
          <text x="200" y="112" fill={C.slate} fontSize="10">low</text>
          <text x="740" y="112" fill={C.red} fontSize="10">high</text>
          <text x="330" y="470" fill={C.gray} fontSize="10">
            {L(0, "trend")}
          </text>
        </g>
      );
    case "comparison":
      return (
        <g>
          <rect x="110" y="110" width="330" height="330" rx="16" fill={C.blue} fillOpacity="0.07" stroke={C.blue} strokeWidth="2.4" />
          <rect x="460" y="110" width="330" height="330" rx="16" fill={C.purple} fillOpacity="0.07" stroke={C.purple} strokeWidth="2.4" />
          <line x1="450" y1="90" x2="450" y2="460" stroke={C.gray} strokeWidth="2" strokeDasharray="7 5" />
          <circle cx="450" cy="275" r="30" fill="#0f172a" stroke={C.amber} strokeWidth="2.4" />
          <text x="450" y="281" fill={C.amber} fontSize="13" fontWeight="bold" textAnchor="middle">vs</text>
          <text x="275" y="150" fill={C.blue} fontSize="12" fontWeight="bold" textAnchor="middle">
            {L(0, "Case A").slice(0, 24)}
          </text>
          <text x="625" y="150" fill={C.purple} fontSize="12" fontWeight="bold" textAnchor="middle">
            {L(2, "Case B").slice(0, 24)}
          </text>
          <line x1="140" y1="170" x2="410" y2="170" stroke={C.slate} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="490" y1="170" x2="760" y2="170" stroke={C.slate} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        </g>
      );
    case "mechanism":
      return (
        <g>
          <rect x="345" y="185" width="215" height="140" rx="14" fill={C.blue} fillOpacity="0.1" stroke={C.blue} strokeWidth="2.6" />
          <text x="452" y="250" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
            {L(1, "Centre").slice(0, 20)}
          </text>
          <text x="452" y="272" fill="#94a3b8" fontSize="9" textAnchor="middle">
            reactive centre
          </text>
          <path d="M 250 300 Q 320 275 360 255" fill="none" stroke={C.green} strokeWidth="3.2" markerEnd="url(#arrow-emerald)" />
          <text x="175" y="292" fill={C.green} fontSize="12" fontWeight="bold">
            {L(0, "Attacker").slice(0, 16)}
          </text>
          <circle cx="640" cy="180" r="30" fill={C.red} fillOpacity="0.16" stroke={C.red} strokeWidth="2.2" />
          <text x="640" y="186" fill={C.red} fontSize="11" fontWeight="bold" textAnchor="middle">
            {L(2, "Group").slice(0, 12)}
          </text>
          <path d="M 452 200 L 452 160 M 452 160 L 440 172 M 452 160 L 464 172" fill="none" stroke={C.red} strokeWidth="2.4" />
          <rect x="545" y="355" width="190" height="80" rx="12" fill={C.purple} fillOpacity="0.12" stroke={C.purple} strokeWidth="2.4" />
          <text x="640" y="400" fill="#e2e8f0" fontSize="11" textAnchor="middle">
            {L(3, "Product").slice(0, 20)}
          </text>
          <path d="M 560 325 Q 600 350 615 360" fill="none" stroke={C.purple} strokeWidth="3" markerEnd="url(#arrow)" />
        </g>
      );
    case "classification":
      return (
        <g>
          <rect x="360" y="70" width="190" height="66" rx="12" fill={C.slate} fillOpacity="0.16" stroke={C.slate} strokeWidth="2.6" />
          <text x="455" y="110" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
            {L(0, "Whole").slice(0, 20)}
          </text>
          <line x1="455" y1="136" x2="455" y2="185" stroke={C.gray} strokeWidth="2" />
          <line x1="250" y1="185" x2="660" y2="185" stroke={C.gray} strokeWidth="2" />
          {[250, 455, 660].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="185" x2={x} y2="300" stroke={C.gray} strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x={x - 105} y="305" width="210" height="66" rx="10" fill={PALETTE[i % PALETTE.length]} fillOpacity="0.1" stroke={PALETTE[i % PALETTE.length]} strokeWidth="2.4" />
              <text x={x} y="345" fill="#e2e8f0" fontSize="11" textAnchor="middle">
                {L(i + 1, "Group").slice(0, 22)}
              </text>
            </g>
          ))}
          {[250, 660].map((x, i) => (
            <g key={`b${i}`}>
              <line x1={x} y1="371" x2={x} y2="410" stroke={C.gray} strokeWidth="1.6" strokeDasharray="5 4" />
              <rect x={x - 95} y="415" width="190" height="52" rx="9" fill="none" stroke={C.gray} strokeWidth="1.8" strokeDasharray="6 4" />
            </g>
          ))}
        </g>
      );
    case "construction":
      return (
        <g>
          <circle cx="450" cy="275" r="175" fill="none" stroke={C.slate} strokeWidth="2.2" strokeDasharray="7 5" />
          <line x1="275" y1="275" x2="625" y2="275" stroke={C.blue} strokeWidth="3" />
          <line x1="275" y1="275" x2="450" y2="118" stroke={C.green} strokeWidth="3" />
          <line x1="450" y1="118" x2="625" y2="275" stroke={C.red} strokeWidth="3" />
          <line x1="450" y1="275" x2="450" y2="118" stroke={C.amber} strokeWidth="2" strokeDasharray="6 4" />
          <line x1="275" y1="275" x2="450" y2="432" stroke={C.purple} strokeWidth="2" strokeDasharray="6 4" />
          <line x1="450" y1="432" x2="625" y2="275" stroke={C.purple} strokeWidth="2" strokeDasharray="6 4" />
          {[
            [275, 275],
            [450, 118],
            [625, 275],
            [450, 275],
            [450, 432],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill={C.gray} stroke="#fff" strokeWidth="1.4" />
          ))}
          <text x="258" y="292" fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
          <text x="442" y="108" fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>
          <text x="632" y="292" fill="#e2e8f0" fontSize="11" fontWeight="bold">C</text>
          <text x="458" y="270" fill="#e2e8f0" fontSize="10" fontWeight="bold">O</text>
          <text x="458" y="450" fill="#e2e8f0" fontSize="10" fontWeight="bold">D</text>
        </g>
      );
    case "formula-map":
    default:
      return (
        <g>
          <rect x="330" y="185" width="245" height="160" rx="18" fill={C.green} fillOpacity="0.1" stroke={C.green} strokeWidth="2.6" />
          <text x="452" y="230" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
            {L(0, "Governing relation").slice(0, 26)}
          </text>
          <text x="452" y="262" fill={C.green} fontSize="15" fontWeight="bold" textAnchor="middle">
            {clip(labels[0] ?? "y = f(x)", 26)}
          </text>
          <text x="452" y="292" fill="#94a3b8" fontSize="9" textAnchor="middle">
            applies within this unit's stated conditions
          </text>
          <ellipse cx="230" cy="200" rx="78" ry="46" fill={C.blue} fillOpacity="0.1" stroke={C.blue} strokeWidth="2" />
          <ellipse cx="675" cy="200" rx="78" ry="46" fill={C.red} fillOpacity="0.1" stroke={C.red} strokeWidth="2" />
          <ellipse cx="230" cy="380" rx="78" ry="46" fill={C.amber} fillOpacity="0.1" stroke={C.amber} strokeWidth="2" />
          <ellipse cx="675" cy="380" rx="78" ry="46" fill={C.purple} fillOpacity="0.1" stroke={C.purple} strokeWidth="2" />
          <line x1="308" y1="215" x2="330" y2="235" stroke={C.gray} strokeWidth="1.8" />
          <line x1="596" y1="215" x2="575" y2="235" stroke={C.gray} strokeWidth="1.8" />
          <line x1="308" y1="365" x2="330" y2="330" stroke={C.gray} strokeWidth="1.8" />
          <line x1="596" y1="365" x2="575" y2="330" stroke={C.gray} strokeWidth="1.8" />
          <line x1="452" y1="185" x2="452" y2="150" stroke={C.gray} strokeWidth="1.8" markerEnd="url(#arrow)" />
          <line x1="452" y1="345" x2="452" y2="395" stroke={C.gray} strokeWidth="1.8" markerEnd="url(#arrow)" />
        </g>
      );
  }
}

/**
 * A schematic whose shape matches what the topic IS, and whose labelled parts
 * are the topic's own items. This is the drawing a topic gets when it has no
 * authored concept schematic — instead of the shared inclined plane.
 */
export function buildTopicSchematic(knowledge: TopicKnowledge): TopicSchematic {
  const slots = SLOTS[knowledge.kind] ?? SLOTS["formula-map"];
  // Prefer one item of each kind so the sheet is not six definitions in a row.
  const byKind: KnowledgeItem[] = [];
  const usedKinds = new Set<KnowledgeKind>();
  for (const item of knowledge.items) {
    if (usedKinds.has(item.kind)) continue;
    usedKinds.add(item.kind);
    byKind.push(item);
  }
  const ordered = [...byKind, ...knowledge.items.filter((i) => !byKind.includes(i))];
  const picked: KnowledgeItem[] = [];
  const seen = new Set<string>();
  for (const item of ordered) {
    const key = item.name.toLowerCase().slice(0, 48);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(item);
    if (picked.length >= slots.length) break;
  }

  const annotations: ConceptAnnotation[] = picked.map((item, i) => {
    const slot = slots[i];
    return {
      id: `${knowledge.kind}-${i + 1}`,
      label: `${item.name}${item.kind === "formula" && item.formula ? ` — ${clip(item.formula, 34)}` : ""}`,
      formulaOrValue: clip(item.detail || item.formula || "", 150),
      examNote: clip(
        item.exam ||
          (item.formula
            ? `Use this relation only inside this unit's stated conditions; state it before substituting.`
            : `NEB/CEE: part of ${clip(knowledge.topicTitle, 40)} — define it precisely and give one worked use.`),
        200,
      ),
      labelX: slot.lx,
      labelY: slot.ly,
      targetX: slot.ax,
      targetY: slot.ay,
      controlX: slot.cx,
      controlY: slot.cy,
      color: slot.color,
    };
  });

  const labels = picked.map((p) => (p.formula ? p.formula : p.name));

  return {
    subject: knowledge.subject,
    name: `${knowledge.topicTitle} — ${KIND_LABEL[knowledge.kind]}`,
    kind: knowledge.kind,
    kindLabel: KIND_LABEL[knowledge.kind],
    summary: `${KIND_LABEL[knowledge.kind]} for ${knowledge.topicTitle} (${knowledge.unitTitle})`,
    annotations,
    renderSvg: () => artFor(knowledge.kind, labels),
  };
}

/* ═══════════ 6b. authored specials (kept in ONE place to avoid drift) ═════ */

/**
 * Topics whose drawing is hand-authored inline in SchematicDiagram (nephron,
 * galvanic cell, parabola, projectile). Exported so the audit measures the same
 * precedence the component uses instead of re-deriving it.
 */
export function isAuthoredSpecialTopic(
  subject: string,
  topicSlug: string,
  topicTitle: string,
): boolean {
  const t = `${topicSlug} ${topicTitle}`.toLowerCase();
  if (subject === "biology") return /nephr|kidney|urin|excret/.test(t);
  if (subject === "chemistry") return /galvan|volta|electrochem|\bcell\b/.test(t);
  if (subject === "mathematics") return /parabol|conic/.test(t);
  if (subject === "physics") return /projectil|kinemat/.test(t);
  return false;
}

/** True only for topics that really are about a plane, friction or an incline. */
export function isInclinedPlaneTopic(
  topicSlug: string,
  topicTitle: string,
  unitId = "",
): boolean {
  const t = `${topicSlug} ${topicTitle}`.toLowerCase();
  const u = (unitId || "").toLowerCase();
  return (
    /\b(incline|inclined|wedge|ramp)\b/.test(t) ||
    (t.includes("plane") && (t.includes("friction") || u.includes("friction")))
  );
}

/* ═══════════════════ 7. resolution used by UI and the audit ══════════════ */

export type BranchSource =
  | "unit-concept"
  | "bank"
  | "unit-keyword"
  | "topic-derived"
  | "none";

export interface ResolvedBranches {
  branches: MindMapBranch[];
  source: BranchSource;
  knowledge: TopicKnowledge;
}

/**
 * The single resolution path for the mindmap. `authored` lets the caller supply
 * a hand-written tree (the 10 unit concepts) which still wins, because authored
 * content is the densest. Everything else is derived from the topic itself.
 */
export function resolveVisualBranches(
  input: TopicKnowledgeInput,
  authored?: MindMapBranch[],
  authoredSource: BranchSource = "unit-concept",
): ResolvedBranches {
  const knowledge = buildTopicKnowledge(input);
  if (authored && authored.length) {
    return { branches: authored, source: authoredSource, knowledge };
  }
  const derived = buildTopicBranches(knowledge);
  return {
    branches: derived,
    source: knowledge.grounded ? "bank" : "topic-derived",
    knowledge,
  };
}

export type SchematicSource = "concept" | "unit-concept" | "topic-derived" | "generic";

export interface ResolvedSchematic {
  schematic: TopicSchematic;
  source: SchematicSource;
}

/**
 * The single resolution path for the schematic: an authored concept schematic
 * or unit concept wins; otherwise the drawing is generated from the topic.
 */
export function resolveVisualSchematic(
  input: TopicKnowledgeInput,
  authored?: TopicSchematic | null,
  authoredSource: "concept" | "unit-concept" = "concept",
): ResolvedSchematic {
  const knowledge = buildTopicKnowledge(input);
  if (authored) return { schematic: authored, source: authoredSource };
  return { schematic: buildTopicSchematic(knowledge), source: "topic-derived" };
}
