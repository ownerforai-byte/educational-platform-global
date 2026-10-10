/**
 * audit-visuals.ts — ARE THE BRANCHES AND SCHEMATICS ABOUT THEIR TOPIC?
 *
 *   node ../node_modules/tsx/dist/cli.mjs scripts/audit-visuals.ts
 *   (or from the repo root: npx tsx frontend/scripts/audit-visuals.ts)
 *
 * The Visual Workspace (Clear Mindmap + Interactive Schematic + the lab
 * schematic panel) draws from four sources:
 *
 *   1. frontend/lib/unit-mindmap-branches.ts  — per-unit branch trees built
 *      from the curated HIGH_YIELD_TOPIC_BANK (65 unit slugs),
 *   2. frontend/lib/visual-concept-map.tsx    — 10 authored unit concepts
 *      (branches + a hand-drawn schematic + its annotations),
 *   3. frontend/components/lab/schematic-concepts.tsx — 20 keyword-matched
 *      concept schematics,
 *   4. content/ravikishan/**\/mindmap/mindmap.json — 59 legacy mindmap files.
 *
 * A unit with no curated entry silently falls back to a shared generic tree,
 * and a topic whose keywords miss every schematic silently falls back to the
 * inclined plane — both look "fine" in the UI while being about the wrong
 * thing. This script turns every one of those silent mismatches into a finding
 * with evidence, so the content can be re-created (wrong) or upgraded (thin).
 *
 * Findings (JSON is also written to .freebuff/visual-audit.json):
 *
 *   NO_BRANCHES          unit has no curated branch data → generic fallback
 *   OFF_TOPIC_BRANCHES   branch vocabulary does not overlap the unit's own
 *   THIN_BRANCHES        curated, but branches carry almost no content
 *   PLACEHOLDER          branch text is filler ("key point", "lorem", "tbd")
 *   CROSS_SUBJECT_SCHEMA a unit/topic matches a schematic of ANOTHER subject
 *   NO_SCHEMATIC         no concept schematic matches (generic fallback)
 *   FOREIGN_ANNOTATION   a schematic annotation shares nothing with its own name
 *   ORPHAN_UNIT_CONCEPT  UNIT_CONCEPTS key is not a real syllabus unit
 *   LEGACY_OFF_TOPIC     mindmap JSON branches do not overlap their own unit
 *   LEGACY_DUPLICATE     the same legacy branch statement appears twice
 */

import fs from "node:fs";
import path from "node:path";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/syllabus";
import { buildUnitMindmapBranches } from "@/lib/unit-mindmap-branches";
import {
  UNIT_CONCEPTS,
  getExactUnitConcept,
  getUnitConcept,
} from "@/lib/visual-concept-map";
import {
  CONCEPT_SCHEMATICS,
  matchConceptSchematic,
} from "@/components/lab/schematic-concepts";
import {
  buildTopicKnowledge,
  buildTopicSchematic,
  isAuthoredSpecialTopic,
  isInclinedPlaneTopic,
  normalizeSubject,
  resolveVisualBranches,
  KIND_LABEL,
  type BranchSource,
  type DiagramKind,
} from "@/lib/topic-visuals";
import { getHighYieldEntriesForUnit } from "@/lib/high-yield-topic-facts";

type Severity = "high" | "medium" | "low";

interface Finding {
  kind: string;
  severity: Severity;
  where: string;
  detail: string;
}

const findings: Finding[] = [];
const add = (kind: string, severity: Severity, where: string, detail: string) =>
  findings.push({ kind, severity, where, detail });

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
]);

/**
 * Lowercased word tokens, stopwords and 1-2 letter fragments removed.
 * Hyphens and slashes are SPLIT ("double-circulation" → double + circulation),
 * otherwise a compound keyword can never match its own words and every check
 * that depends on this reports a false positive.
 */
function tokens(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^-+|-+$/g, ""))
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/**
 * Notation that is legitimate in ANY technical drawing: axes, angles, generic
 * geometry, and short algebraic symbols. An annotation built only from these
 * plus its own label is not "foreign" — its meaning comes from the drawing.
 */
const UNIVERSAL_DIAGRAM_TOKENS = new Set([
  "axis", "axes", "vertex", "vertices", "angle", "angles", "slope", "gradient",
  "diagonal", "centre", "center", "radius", "height", "base", "side", "line",
  "point", "curve", "graph", "value", "values", "magnitude", "direction",
  "vector", "component", "components", "direction", "sign", "scale", "area",
  "volume", "length", "width", "distance", "time", "speed", "velocity",
  "energy", "force", "mass", "charge", "current", "voltage", "power",
]);

/** Short algebraic/greek notation — meaningless alone, correct on a drawing. */
const DIAGRAM_NOTATION = new Set([
  "lhs", "rhs", "eq", "amp", "iso", "ad", "bp", "lp", "la", "ra", "rv", "lv",
  "inv", "det", "adj", "sn", "greek", "theta", "alpha", "beta", "gamma", "delta",
  "lambda", "omega", "sigma", "phi", "psi", "rho", "tau", "mu", "eta",
]);

/**
 * Does `have` carry this concept? Exact token, else a long shared stem, so
 * "biomolecules" is found inside a tree that writes "Biomolecule Families" and
 * "expansion" inside "expansions". Without the stem pass every plural/inflected
 * pair reads as a miss and manufactures false findings.
 */
function covered(tok: string, have: Set<string>): boolean {
  if (have.has(tok)) return true;
  // Only long tokens get a stem pass. A 3-letter token's stem is one letter,
  // which would "match" every word starting with it.
  if (tok.length < 7) return false;
  const stem = tok.slice(0, tok.length - 2);
  for (const h of have) if (h.length >= 7 && h.startsWith(stem)) return true;
  return false;
}

/** Fraction of `reference` tokens that appear in `blob` (stem-tolerant). */
function coverage(reference: Set<string>, blob: string): number {
  if (!reference.size) return 0;
  const have = new Set(tokens(blob));
  let hit = 0;
  for (const t of reference) if (covered(t, have)) hit += 1;
  return hit / reference.size;
}

/** Leaf headline texts — the units a provenance check can trace. */
function leafTexts(tree: ReturnType<typeof buildUnitMindmapBranches>): string[] {
  const out: string[] = [];
  for (const b of tree ?? []) {
    for (const n of b.nodes ?? []) if (n.title) out.push(n.title);
    for (const sb of b.subBranches ?? []) {
      for (const n of sb.nodes ?? []) if (n.title) out.push(n.title);
    }
  }
  return out;
}

const normText = (s: string) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();

/**
 * PROVENANCE — is every leaf traceable to a source that belongs to this unit?
 *
 * This is the deterministic version of "is the tree about this topic": the
 * content must come from (a) an entry that claims this unit by exact id, (b)
 * this unit's own syllabus statements, or (c) this topic's own note. A keyword
 * guess that pulled another unit's facts can never satisfy it, which is what
 * made the old off-topic trees possible.
 */
function isSourced(title: string, allowed: Set<string>): boolean {
  const t = normText(title).slice(0, 44);
  if (!t) return true;
  for (const a of allowed) {
    if (a === t || a.startsWith(t) || t.startsWith(a)) return true;
  }
  return false;
}

/** Flattened text of every curated entry that claims this unit. */
function bankSourceTexts(subjectSlug: string, unitId: string): Set<string> {
  const out = new Set<string>();
  for (const e of getHighYieldEntriesForUnit(unitId, normalizeSubject(subjectSlug))) {
    for (const l of e.governingLaws ?? []) out.add(normText(l.name).slice(0, 44));
    for (const f of e.speedFormulas ?? []) out.add(normText(f.name).slice(0, 44));
    for (const c of e.constantsAndValues ?? []) out.add(normText(`${c.symbol} — ${c.name}`).slice(0, 44));
    for (const t of e.entranceTraps ?? []) out.add(normText(t.trap).slice(0, 44));
    for (const n of e.workedNumericals ?? []) out.add(normText(n.problem).slice(0, 44));
    for (const t of e.keyTermsAndDefinitions ?? []) out.add(normText(t.term).slice(0, 44));
  }
  return out;
}

/** Every non-empty text a branch tree contains. */
function branchText(tree: ReturnType<typeof buildUnitMindmapBranches>): string {
  const parts: string[] = [];
  for (const b of tree ?? []) {
    parts.push(b.category ?? "");
    for (const n of b.nodes ?? []) parts.push(`${n.title ?? ""} ${n.description ?? ""} ${n.formula ?? ""}`);
    for (const sb of b.subBranches ?? []) {
      parts.push(sb.title ?? "");
      for (const n of sb.nodes ?? []) parts.push(`${n.title ?? ""} ${n.description ?? ""} ${n.formula ?? ""}`);
    }
  }
  return parts.join(" ");
}

function leafCount(tree: ReturnType<typeof buildUnitMindmapBranches>): number {
  return (tree ?? []).reduce(
    (n, b) =>
      n +
      (b.nodes?.length ?? 0) +
      (b.subBranches?.reduce((m, sb) => m + (sb.nodes?.length ?? 0), 0) ?? 0),
    0,
  );
}

function vocab(...texts: (string | undefined)[]): Set<string> {
  const set = new Set<string>();
  for (const t of texts) for (const tok of tokens(t ?? "")) set.add(tok);
  return set;
}

/** Fraction of `haystack` tokens that appear in `reference`. */
function overlap(reference: Set<string>, haystack: string): number {
  const toks = tokens(haystack);
  if (!toks.length) return 0;
  const hits = toks.filter((t) => reference.has(t)).length;
  return hits / toks.length;
}

/** Literal filler only — "Key Definitions" etc. are real topics elsewhere. */
const PLACEHOLDER_RE = /\b(lorem ipsum|\btbd\b|to be added|placeholder|key point \d|key formula \d|insert |coming soon|n\/a)\b/i;

/**
 * The old scaffolder's signature trio. All three together means a tree was
 * never written for this unit; any one alone is an ordinary syllabus word.
 */
const SCAFFOLD_SIGNATURE = [
  "Key Definitions",
  "Basic Theories",
  "Historical Context",
];
function hasScaffoldSignature(text: string): boolean {
  return SCAFFOLD_SIGNATURE.every((s) => text.includes(s));
}

// ── Sources ─────────────────────────────────────────────────────────────────

const REPO = path.resolve(process.cwd(), "..");
const NOTES_ROOT = path.join(REPO, "content", "ravikishan");

interface UnitRef {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  topicSlugs: string[];
  topicTitles: string[];
}

const units: UnitRef[] = [];
for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    for (const unit of subject.units) {
      const topicTitles = unit.topics ?? [];
      units.push({
        classSlug: cls.slug ?? "?",
        subjectSlug: subject.slug,
        unitId: unit.id,
        unitTitle: unit.title,
        topicSlugs: topicTitles.map((t) => slugifySyllabusTopic(t)),
        topicTitles,
      });
    }
  }
}

/** The unit's own vocabulary: id, title, and every topic title. */
const unitVocab = (u: UnitRef) => vocab(u.unitId.replace(/-/g, " "), u.unitTitle, ...u.topicTitles);

// ── 1. Branches: does every syllabus unit have its OWN, on-topic tree? ──────

/** The unit's own vocabulary: id, title, and every topic title. */
const unitReference = new Map<string, Set<string>>();
for (const u of units) {
  const key = `${u.classSlug}/${u.subjectSlug}/${u.unitId}`;
  unitReference.set(key, unitVocab(u));
}

const branchSources = new Map<string, number>();
let branchOk = 0;
let branchGeneric = 0;

for (const u of units) {
  const label = `${u.classSlug}/${u.subjectSlug}/${u.unitId}`;

  // Resolve EXACTLY as the mindmap component does, so the audit measures what
  // a student sees rather than a second, parallel guess. The mindmap hub shows
  // a UNIT (topicSlug = unitId, topicTitle = unitTitle), so that is the level
  // the unit check runs at; each topic is then checked at its own level below.
  // Subject-scoped exactly like the mindmap component (topic-mindmap.tsx):
  // without the subject, `vectors` in mathematics would resolve to the physics
  // vectors unit concept and the audit would measure a tree no student sees.
  const subject = normalizeSubject(u.subjectSlug);
  const exactConcept = getExactUnitConcept(u.unitId, subject);
  const bankTree = buildUnitMindmapBranches(
    u.unitId,
    u.subjectSlug,
    u.topicSlugs[0] ?? "",
    u.topicTitles[0] ?? u.unitTitle,
  );
  const keywordConcept = getUnitConcept(u.unitId, u.topicSlugs[0] ?? "", u.topicTitles[0] ?? u.unitTitle, subject);
  const authored = exactConcept?.branches ?? bankTree ?? keywordConcept?.branches;
  const authoredSource: BranchSource = exactConcept
    ? "unit-concept"
    : bankTree
      ? "bank"
      : keywordConcept
        ? "unit-keyword"
        : "none";

  const resolved = resolveVisualBranches(
    {
      subjectSlug: u.subjectSlug,
      classSlug: u.classSlug,
      unitId: u.unitId,
      topicSlug: u.unitId,
      topicTitle: u.unitTitle,
    },
    authored,
    authoredSource,
  );

  const tree = resolved.branches;
  branchSources.set(resolved.source, (branchSources.get(resolved.source) ?? 0) + 1);

  if (!tree || tree.length === 0) {
    add("NO_BRANCHES", "high", label, "no branch tree at all");
    continue;
  }

  const blob = branchText(tree);
  const nodeCount = leafCount(tree);
  const reference = unitReference.get(label) ?? new Set<string>();

  if (PLACEHOLDER_RE.test(blob)) {
    add("PLACEHOLDER", "high", label, "branch text contains filler markers");
  }

  // ── PROVENANCE: every leaf must trace back to THIS unit's own sources. ──
  if (authoredSource === "none") {
    // Generated tree: sources are the unit's bank entry, its own syllabus
    // statements, and the topic's own note items.
    const allowed = bankSourceTexts(u.subjectSlug, u.unitId);
    for (const item of resolved.knowledge.items) allowed.add(normText(item.name).slice(0, 44));
    for (const s of resolved.knowledge.scope) allowed.add(normText(s).slice(0, 44));

    const titles = leafTexts(tree);
    const unsourced = titles.filter((t) => !isSourced(t, allowed));
    if (titles.length && unsourced.length / titles.length > 0.2) {
      add(
        "UNSOURCED_BRANCH_CONTENT",
        "high",
        label,
        `${unsourced.length}/${titles.length} leaves trace to no source for this unit (e.g. "${unsourced[0].slice(0, 50)}")`,
      );
      continue;
    }
  }

  // ── Cross-subject leak: this unit's tree is really another subject's. ──
  void reference;
  let bestOther = 0;
  let bestOtherUnit = "";
  for (const [otherKey, otherRef] of unitReference) {
    if (otherKey === label || otherRef.size < 4) continue;
    const c = coverage(otherRef, blob);
    if (c > bestOther) {
      bestOther = c;
      bestOtherUnit = otherKey;
    }
  }
  // Sibling units with the same name (vectors in physics and in mathematics,
  // language-development across tracks) share vocabulary legitimately, so this
  // is reported as an observation for a human to dismiss, not a failure. A
  // small reference (≤8 words) would match almost anything, so it is ignored.
  if (bestOther >= 0.75 && bestOtherUnit !== label && !bestOtherUnit.includes(`/${u.subjectSlug}/`)) {
    const otherKey = bestOtherUnit;
    const otherRef = unitReference.get(otherKey) ?? new Set<string>();
    if (otherRef.size >= 8) {
      // A same-named unit in another subject (`vectors` in mathematics and in
      // physics) legitimately shares NEB terminology: measured AFTER
      // subject-scoped resolution, so the overlap is shared vocabulary of
      // sibling syllabus units, not borrowed content.
      const selfRef = unitReference.get(label) ?? new Set<string>();
      const sharedTerms = selfRef.size ? coverage(otherRef, [...selfRef].join(" ")) : 0;
      const sibling = otherKey.split("/")[2] === u.unitId;
      add(
        "CROSS_SUBJECT_TREE",
        "low",
        label,
        sibling
          ? `tree shares ${(bestOther * 100).toFixed(0)}% of ${otherKey}'s vocabulary — same-named sibling unit in another subject (the NEB vectors units share core terminology by design); tree resolved subject-scoped from this unit's own material`
          : `tree matches ${(bestOther * 100).toFixed(0)}% of ${otherKey} (another subject) while the units' own syllabus vocabularies overlap only ${(sharedTerms * 100).toFixed(0)}% — low-severity observation: review whether the shared vocabulary is generic to the topic`,
      );
    }
  }

  if (resolved.source === "none") {
    add("GENERIC_SOURCE", "high", label, "no source resolver produced a tree");
    branchGeneric += 1;
    continue;
  }
  if (nodeCount < 4) {
    add("THIN_BRANCHES", "medium", label, `only ${nodeCount} leaf node(s)`);
    continue;
  }
  branchOk += 1;
}

// ── 1b. Every topic's own tree: does it still mention its own topic? ────────

let topicTreesOk = 0;
let topicTreesTotal = 0;
for (const u of units) {
  for (let i = 0; i < u.topicSlugs.length; i++) {
    const topicSlug = u.topicSlugs[i];
    const topicTitle = u.topicTitles[i] ?? "";
    const label = `${u.classSlug}/${u.subjectSlug}/${topicSlug}`;
    topicTreesTotal += 1;

    const resolved = resolveVisualBranches({
      subjectSlug: u.subjectSlug,
      classSlug: u.classSlug,
      unitId: u.unitId,
      topicSlug,
      topicTitle,
    });
    const tree = resolved.branches;
    const blob = branchText(tree);

    if (!tree.length || leafCount(tree) < 4) {
      add("THIN_BRANCHES", "medium", label, `topic tree has ${leafCount(tree)} leaf node(s)`);
      continue;
    }
    const topicRef = vocab(topicTitle);
    if (topicRef.size >= 3 && coverage(topicRef, blob) < 0.34) {
      add(
        "OFF_TOPIC_TOPIC",
        "high",
        label,
        `topic tree covers only ${(coverage(topicRef, blob) * 100).toFixed(0)}% of the topic's own words`,
      );
      continue;
    }
    topicTreesOk += 1;
  }
}

// ── 2. Schematics: does each syllabus topic reach the RIGHT drawing? ────────

let schemaOk = 0;
const schematicCoverage: { topic: string; source: string; name: string; parts: number }[] = [];
const kindCounts = new Map<DiagramKind, number>();
const totalKinds = new Set<DiagramKind>();
for (const u of units) {
  const topicSlugs = u.topicSlugs.length ? u.topicSlugs : [u.unitId];
  const topicTitles = u.topicTitles.length ? u.topicTitles : [u.unitTitle];
  const subject = normalizeSubject(u.subjectSlug);
  for (let i = 0; i < topicSlugs.length; i++) {
    const where = `${u.classSlug}/${u.subjectSlug}/${topicSlugs[i]}`;
    const topicTitle = topicTitles[i] ?? "";

    // Mirror the component's precedence exactly.
    const match = matchConceptSchematic(subject, topicSlugs[i], topicTitle, u.unitId);
    if (match) {
      if (match.subject !== subject) {
        add(
          "CROSS_SUBJECT_SCHEMA",
          "high",
          where,
          `matched "${match.name}" from ${match.subject} (topic is ${subject})`,
        );
        continue;
      }
      schematicCoverage.push({ topic: where, source: 'authored-concept', name: match.name, parts: match.annotations.length });
      schemaOk += 1;
      continue;
    }
    const unitDrawing = getUnitConcept(u.unitId, topicSlugs[i], topicTitle, subject);
    if (unitDrawing) {
      schematicCoverage.push({ topic: where, source: 'authored-unit', name: unitDrawing.name, parts: unitDrawing.annotations.length });
      schemaOk += 1;
      continue;
    }
    if (isAuthoredSpecialTopic(subject, topicSlugs[i], topicTitle)) {
      schematicCoverage.push({ topic: where, source: 'authored-special', name: topicTitle, parts: 0 });
      schemaOk += 1;
      continue;
    }

    // Everything else is generated from the topic, so the only remaining
    // failure mode is the shared inclined-plane sheet on a topic that is not
    // about a plane.
    const knowledge = buildTopicKnowledge({
      subjectSlug: u.subjectSlug,
      classSlug: u.classSlug,
      unitId: u.unitId,
      topicSlug: topicSlugs[i],
      topicTitle,
    });
    const generated = buildTopicSchematic(knowledge);
    schematicCoverage.push({ topic: where, source: isInclinedPlaneTopic(topicSlugs[i], topicTitle, u.unitId) ? 'inclined-plane' : 'topic-derived', name: generated.name, parts: generated.annotations.length });
    kindCounts.set(generated.kind, (kindCounts.get(generated.kind) ?? 0) + 1);
    totalKinds.add(generated.kind);

    if (generated.annotations.length < 2) {
      add(
        "THIN_SCHEMATIC",
        "medium",
        where,
        `generated drawing has only ${generated.annotations.length} labelled part(s)`,
      );
      continue;
    }
    if (isInclinedPlaneTopic(topicSlugs[i], topicTitle, u.unitId)) {
      schemaOk += 1;
      add("GENERIC_SCHEMATIC", "low", where, "inclined-plane sheet (correct for this topic)");
      continue;
    }
    schemaOk += 1;
  }
}

// ── 3. Concept schematics: are their annotations about themselves? ──────────

for (const s of CONCEPT_SCHEMATICS) {
  const own = vocab(s.name, ...(s.keywords ?? []));
  for (const a of s.annotations ?? []) {
    const head = `${a.label ?? ""} ${a.formulaOrValue ?? ""}`;
    const all = `${head} ${a.examNote ?? ""}`;
    const toks = tokens(all);
    const ownHit = toks.some((t) => own.has(t));
    // With the topic vocabulary subtracted, what is left? A drawing element made
    // only of universal notation ("axis", "θ", "R") is legitimate; a label made
    // of unrelated subject matter is not.
    const meaningful = toks.filter(
      (t) => !own.has(t) && !UNIVERSAL_DIAGRAM_TOKENS.has(t) && !DIAGRAM_NOTATION.has(t),
    );
    if (!ownHit && meaningful.length === 0) {
      add(
        "FOREIGN_ANNOTATION",
        "medium",
        `${s.subject}/${s.name}`,
        `annotation "${a.id}" (${head.trim().slice(0, 40)}) shares nothing with its schematic`,
      );
    }
  }
  if (!(s.annotations ?? []).length) {
    add("FOREIGN_ANNOTATION", "high", `${s.subject}/${s.name}`, "schematic has no annotations");
  }
}

// ── 4. Authored unit concepts: orphans and thin content ────────────────────

const unitIds = new Set(units.map((u) => u.unitId));
for (const unitId of Object.keys(UNIT_CONCEPTS)) {
  if (!unitIds.has(unitId)) {
    add("ORPHAN_UNIT_CONCEPT", "high", unitId, "UNIT_CONCEPTS key is not a syllabus unit id");
    continue;
  }
  const concept = getUnitConcept(unitId);
  if (!concept) continue;
  const ref = vocab(unitId.replace(/-/g, " "), concept.name, concept.summary);
  const blob = `${(concept.branches ?? []).map((b) => b.category).join(" ")} ${(concept.annotations ?? []).map((a) => a.label).join(" ")}`;
  const rel = overlap(ref, blob);
  if (rel < 0.02) {
    add("OFF_TOPIC_BRANCHES", "high", `unit-concept:${unitId}`, `authored concept overlap ${(rel * 100).toFixed(1)}%`);
  }
  if ((concept.annotations ?? []).length < 3) {
    add("THIN_BRANCHES", "medium", `unit-concept:${unitId}`, `${(concept.annotations ?? []).length} annotation(s)`);
  }
}

// ── 5. Legacy mindmap JSONs: branches vs their own unit's concept notes ────

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "mindmap.json") out.push(p);
  }
  return out;
}

const legacy = walk(NOTES_ROOT);
let legacyOk = 0;
for (const file of legacy) {
  const rel = path.relative(REPO, file).replaceAll(path.sep, "/");
  const unitDir = path.dirname(path.dirname(file));
  const conceptDir = path.join(unitDir, "concepts");
  const unitVocabSet = vocab(path.basename(unitDir).replace(/-/g, " "));

  // The unit's own concept notes are the reference for what this unit covers.
  const keyPoints: string[] = [];
  if (fs.existsSync(conceptDir)) {
    for (const f of fs.readdirSync(conceptDir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const note = JSON.parse(fs.readFileSync(path.join(conceptDir, f), "utf8")) as Record<string, unknown>;
        keyPoints.push(String(note.title ?? ""), String(note.topicTitle ?? ""));
        const en = (note.enrichedContent ?? note) as Record<string, unknown>;
        for (const k of ["keyPoints", "importantConcepts", "summary", "importantNotes"]) {
          const v = en[k];
          if (Array.isArray(v)) keyPoints.push(v.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join(" "));
          else if (typeof v === "string") keyPoints.push(v);
        }
      } catch {
        /* unreadable note — skip */
      }
    }
  }
  for (const kp of keyPoints) for (const t of tokens(kp)) unitVocabSet.add(t);

  let parsed: Record<string, any>;
  try {
    parsed = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, any>;
  } catch (e) {
    add("LEGACY_OFF_TOPIC", "high", rel, `unparseable: ${String(e).slice(0, 80)}`);
    continue;
  }

  // The real branch text lives in `mindmap.branches[].topic /
  // subtopics[].name / points[]` — reading `enrichedContent.notes` (a field
  // these files never had) is what made the audit report 49 phantom defects
  // where only 27 files were actually empty.
  const mindmap = (parsed.mindmap ?? {}) as Record<string, any>;
  const rawBranches = Array.isArray(mindmap.branches) ? mindmap.branches : [];
  const branchTexts: string[] = [];
  const pointTexts: string[] = [];
  for (const b of rawBranches) {
    branchTexts.push(String(b?.topic ?? ""));
    for (const sb of Array.isArray(b?.subtopics) ? b.subtopics : []) {
      branchTexts.push(String(sb?.name ?? ""));
      for (const p of Array.isArray(sb?.points) ? sb.points : []) {
        branchTexts.push(String(p));
        pointTexts.push(String(p));
      }
    }
  }
  const summaryTexts = Array.isArray(parsed.notes) ? parsed.notes.map((n) => String(n)) : [];
  const blob = [...branchTexts, ...summaryTexts].join(" ");

  if (!pointTexts.length) {
    add("LEGACY_EMPTY", "high", rel, "mindmap has no branch points at all");
    continue;
  }
  if (PLACEHOLDER_RE.test(blob)) {
    add("PLACEHOLDER", "high", rel, "legacy branches contain filler markers");
  }
  if (hasScaffoldSignature(blob)) {
    add("GENERIC_SCAFFOLD", "high", rel, "branches are the old generic scaffold, not this unit's content");
  }
  const seen = new Set<string>();
  let dupes = 0;
  for (const b of pointTexts) {
    const key = b.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(key)) dupes += 1;
    seen.add(key);
  }
  if (dupes) add("LEGACY_DUPLICATE", "medium", rel, `${dupes} duplicate branch statement(s)`);

  // Topicality: the branch content must belong to this unit. The reference is
  // the unit's own concept notes, which is the content a student actually reads.
  const rel_overlap = unitVocabSet.size ? coverage(unitVocabSet, blob) : 1;
  if (unitVocabSet.size >= 6 && rel_overlap < 0.05) {
    add(
      "LEGACY_OFF_TOPIC",
      "high",
      rel,
      `only ${(rel_overlap * 100).toFixed(1)}% of the unit's own concept vocabulary appears in its branches`,
    );
  } else {
    legacyOk += 1;
  }
}

// ── Report ──────────────────────────────────────────────────────────────────

const byKind = new Map<string, Finding[]>();
for (const f of findings) {
  const list = byKind.get(f.kind) ?? [];
  list.push(f);
  byKind.set(f.kind, list);
}
const bySeverity = { high: 0, medium: 0, low: 0 };
for (const f of findings) bySeverity[f.severity] += 1;

const totalTopics = units.reduce(
  (n, u) => n + Math.max(1, u.topicSlugs.length),
  0,
);

console.log("=== VISUAL AUDIT (branches + schematics vs topic) ===");
console.log(`syllabus units checked: ${units.length}`);
console.log(`branch trees on-topic:  ${branchOk}/${units.length}`);
console.log(`topic trees on-topic:   ${topicTreesOk}/${topicTreesTotal}`);
console.log(
  `branch sources:         ${[...branchSources.entries()]
    .map(([s, n]) => `${s}=${n}`)
    .join(" ")}`,
);
console.log(`topics with a drawing:  ${schemaOk}/${totalTopics}`);
console.log(
  `generated kinds:        ${[...kindCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `${k}=${n}`)
    .join(" ")}`,
);
console.log(
  `kinds in use:           ${totalKinds.size}/${Object.keys(KIND_LABEL).length}`,
);
console.log(`legacy mindmaps on-topic:${legacyOk}/${legacy.length}`);
console.log(`concept schematics:      ${CONCEPT_SCHEMATICS.length}`);
console.log(`findings: ${findings.length} (high ${bySeverity.high} / medium ${bySeverity.medium} / low ${bySeverity.low})`);
console.log("");

for (const [kind, list] of [...byKind.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`-- ${kind} (${list.length}) --`);
  for (const f of list.slice(0, 25)) console.log(`   [${f.severity}] ${f.where} — ${f.detail}`);
  if (list.length > 25) console.log(`   … and ${list.length - 25} more`);
  console.log("");
}

const payload = JSON.stringify({ generatedAt: new Date().toISOString(), units: units.length, summary: { branchOk, schemaOk, totalTopics, legacyOk, legacyTotal: legacy.length, ...bySeverity }, schematicCoverage, findings }, null, 2);
// Both the internal log and the checked-in machine-readable coverage stay in
// sync with this run, so reports/visual-topic-coverage.json can never go stale.
for (const outPath of [
  path.join(REPO, ".freebuff", "visual-audit.json"),
  path.join(REPO, "reports", "visual-topic-coverage.json"),
]) {
  try {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, payload, "utf8");
    console.log(`report → ${path.relative(REPO, outPath)}`);
  } catch {
    /* report files are a convenience — the console output is the contract */
  }
}

// Non-zero exit when anything HIGH is found, so this can gate CI later.
process.exit(bySeverity.high > 0 ? 1 : 0);
