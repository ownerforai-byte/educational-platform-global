/**
 * Doc concept map — a per-topic mind map / concept tree for the DocView.
 *
 * Every one of the 696 syllabus topics must show a clearly drawn map, so this
 * module has two sources, in priority order:
 *
 *   1. an authored `mindmap` field on the concept JSON
 *      ({ centralConcept, branches: [{ topic, details? | subtopics? }] })
 *   2. a derived map built from the fields every concept JSON actually has
 *      (summary, importantConcepts, keyPoints, formulas, notes, examShortTricks,
 *      confusion, practiceQuestions) — deterministic, never empty.
 *
 * The derived map reuses the shapes already found in authored data so the
 * renderer only ever handles one normalised type.
 */

export interface MindMapLeaf {
  name: string;
  points: string[];
}

export interface MindMapBranch {
  topic: string;
  details?: string[];
  subtopics?: MindMapLeaf[];
}

export interface DocConceptMap {
  centralConcept: string;
  branches: MindMapBranch[];
  /** Where the map came from — surfaced in the UI as a small badge. */
  source: "authored" | "derived";
}

/** Raw shapes tolerated from content JSON / concept banks. */
interface RawSubtopic {
  name?: unknown;
  points?: unknown;
}
interface RawBranch {
  topic?: unknown;
  details?: unknown;
  subtopics?: unknown;
}
export interface RawMindmap {
  centralConcept?: unknown;
  branches?: unknown;
}

export interface MindMapInput {
  topicTitle?: string;
  summary?: string;
  notes?: string[];
  importantConcepts?: string[];
  keyPoints?: string[];
  formulas?: string[];
  examShortTricks?: string[];
  confusion?: string[];
  specialNotes?: string[];
  practiceQuestions?: string[];
  /** Real fields already present in most concept JSONs — used to deepen the
   *  derived map without inventing any facts. */
  examples?: string[];
  examNotes?: string[];
  importantTasks?: string[];
  numericals?: string[];
  importantStatements?: string[];
  universalFacts?: string[];
  mindmap?: RawMindmap | null;
}

const MAX_DETAILS = 5;
const MAX_BRANCHES = 6;
const MAX_SUBTOPICS = 4;
const MAX_LEAF_POINTS = 4;

/**
 * Canonical branch order. Each entry pulls from a distinct concept-JSON field,
 * so a topic's map reflects the material that actually exists for it and the
 * six branches never repeat one another's content.
 */
const BRANCH_SOURCES: Array<{ topic: string; pick: (i: MindMapInput) => string[] | undefined }> = [
  { topic: "Core ideas", pick: (i) => i.importantConcepts },
  { topic: "Key points", pick: (i) => i.keyPoints },
  { topic: "Formulas", pick: (i) => i.formulas },
  { topic: "Memory shortcuts", pick: (i) => i.examShortTricks },
  { topic: "Watch out", pick: (i) => (i.confusion?.length ? i.confusion : i.specialNotes) },
  { topic: "Practice focus", pick: (i) => i.practiceQuestions },
];

/** Secondary sources, used when the six primary ones leave too few branches. */
const BRANCH_FALLBACKS: Array<{ topic: string; pick: (i: MindMapInput) => string[] | undefined }> = [
  { topic: "Worked examples", pick: (i) => i.examples },
  { topic: "Exam technique", pick: (i) => (i.examNotes?.length ? i.examNotes : i.importantTasks) },
  { topic: "Exam statements", pick: (i) => i.importantStatements },
  { topic: "Universal facts", pick: (i) => i.universalFacts },
  { topic: "Numericals", pick: (i) => i.numericals },
];

function strList(value: unknown, limit = MAX_DETAILS): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") continue;
    const text = item.trim();
    if (!text) continue;
    out.push(text);
    if (out.length >= limit) break;
  }
  return out;
}

function shorten(text: string, max = 92): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** Normalise an authored `mindmap` block; returns null when unusable. */
export function normaliseAuthoredMindmap(raw: RawMindmap | null | undefined): DocConceptMap | null {
  if (!raw || !Array.isArray(raw.branches)) return null;
  const central =
    typeof raw.centralConcept === "string" && raw.centralConcept.trim()
      ? raw.centralConcept.trim()
      : "";
  const branches: MindMapBranch[] = [];
  for (const entry of raw.branches as RawBranch[]) {
    if (!entry || typeof entry.topic !== "string" || !entry.topic.trim()) continue;
    const branch: MindMapBranch = { topic: entry.topic.trim() };
    const details = strList(entry.details);
    if (details.length > 0) branch.details = details;
    if (Array.isArray(entry.subtopics)) {
      const subtopics: MindMapLeaf[] = [];
      for (const leaf of entry.subtopics as RawSubtopic[]) {
        if (!leaf || typeof leaf.name !== "string" || !leaf.name.trim()) continue;
        subtopics.push({ name: leaf.name.trim(), points: strList(leaf.points, MAX_LEAF_POINTS) });
        if (subtopics.length >= MAX_SUBTOPICS) break;
      }
      if (subtopics.length > 0) branch.subtopics = subtopics;
    }
    if (!branch.details && !branch.subtopics) continue;
    branches.push(branch);
    if (branches.length >= MAX_BRANCHES) break;
  }
  if (branches.length < 2) return null;
  return {
    centralConcept: central || (typeof raw.centralConcept === "string" ? raw.centralConcept : ""),
    branches,
    source: "authored",
  };
}

/** Turn the `**Term:** body` note form into a readable point. */
function notePoint(note: string): string | null {
  const first = note.split("\n").map((l) => l.trim()).find(Boolean);
  if (!first) return null;
  if (first.startsWith("$$")) return null;
  const lead = first.match(/^\*\*(.+?)\*\*\s*[:：]?\s*(.*)$/);
  if (lead) {
    const term = lead[1].replace(/[:：]\s*$/, "").trim();
    const body = lead[2].trim();
    return body ? `${term} — ${shorten(body)}` : term;
  }
  return shorten(first);
}

/**
 * Derive a concept map from the fields every concept JSON carries. Feeding
 * several branches from different fields keeps the map informative even when a
 * topic has no keyPoints or formulas (129 / 491 such topics exist).
 */
export function deriveMindmap(input: MindMapInput): DocConceptMap {
  const central =
    (input.topicTitle && input.topicTitle.trim()) ||
    (input.mindmap && typeof input.mindmap.centralConcept === "string" ? input.mindmap.centralConcept.trim() : "") ||
    "Topic overview";

  const branches: MindMapBranch[] = [];
  const seen = new Set<string>();
  const push = (topic: string, raw: string[] | undefined, limit = MAX_DETAILS) => {
    if (!raw || raw.length === 0) return;
    const key = topic.toLowerCase();
    if (seen.has(key)) return;
    const details = raw.map((d) => shorten(d)).filter(Boolean).slice(0, limit);
    if (details.length === 0) return;
    seen.add(key);
    branches.push({ topic, details });
  };

  push("Core ideas", input.importantConcepts);
  push("Key points", input.keyPoints);
  push("Formulas", input.formulas);
  push("Memory shortcuts", input.examShortTricks);
  push("Watch out", input.confusion?.length ? input.confusion : input.specialNotes);
  push("Practice focus", input.practiceQuestions);

  // Second pass: the concept JSONs carry many more authored fields
  // (examples, examNotes/importantTasks, importantStatements, universalFacts,
  // numericals). Using them turns a thin map into a real one without inventing
  // anything — every point is text the topic already ships.
  if (branches.length < MAX_BRANCHES) {
    for (const { topic, pick } of BRANCH_FALLBACKS) {
      if (branches.length >= MAX_BRANCHES) break;
      push(topic, pick(input));
    }
  }

  // Duplicate points across branches add noise, so points already shown are
  // dropped from later branches.
  const seenPoints = new Set<string>();
  for (const branch of branches) {
    branch.details = (branch.details ?? []).filter((d) => {
      const key = d.toLowerCase().slice(0, 60);
      if (seenPoints.has(key)) return false;
      seenPoints.add(key);
      return true;
    });
  }
  const pruned = branches.filter((b) => (b.details?.length ?? 0) > 0);
  branches.length = 0;
  branches.push(...pruned);

  // Notes are the universal fallback: every concept JSON has them. When the
  // structured fields are sparse (56 topics only yield one branch), the note
  // headings themselves become the branches so the map still shows structure
  // instead of a single bucket of points.
  const notePoints = (input.notes ?? [])
    .map(notePoint)
    .filter((p): p is string => Boolean(p));

  if (branches.length < 3 && notePoints.length > 0) {
    const byHeading = noteBranches(input.notes ?? []);
    for (const branch of byHeading) push(branch.topic, branch.details);
  }
  if (branches.length < 2 && notePoints.length > 0) {
    // Last resort: split the notes into two labelled halves.
    const half = Math.ceil(notePoints.length / 2);
    push("What it says", notePoints.slice(0, half));
    push("What follows", notePoints.slice(half));
  }
  if (branches.length < 2) {
    push("Explanation", notePoints);
  }

  const label = central || "Topic overview";
  return { centralConcept: label, branches, source: "derived" };
}

/** Group notes under their bold heading so each heading becomes a branch. */
function noteBranches(notes: string[]): MindMapBranch[] {
  const groups = new Map<string, string[]>();
  notes.forEach((note, i) => {
    const point = notePoint(note);
    if (!point) return;
    const headingMatch = note.match(/^\*\*(.+?)\*\*/);
    const heading = headingMatch
      ? headingMatch[1].replace(/[:：]\s*$/, "").trim()
      : `Part ${Math.floor(i / 2) + 1}`;
    const arr = groups.get(heading) ?? [];
    if (arr.length < MAX_DETAILS) arr.push(point);
    groups.set(heading, arr);
  });
  return [...groups.entries()]
    .filter(([, points]) => points.length > 0)
    .slice(0, MAX_BRANCHES)
    .map(([topic, details]) => ({ topic, details }));
}

/** Authored map when present and usable, otherwise the derived one. */
export function buildDocConceptMap(input: MindMapInput): DocConceptMap {
  const authored = normaliseAuthoredMindmap(input.mindmap);
  if (authored) {
    if (!authored.centralConcept) authored.centralConcept = input.topicTitle?.trim() || "Topic overview";
    return authored;
  }
  return deriveMindmap(input);
}
