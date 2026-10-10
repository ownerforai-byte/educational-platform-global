/**
 * Generator frames and placeholder lines, filtered out of the shipped notes.
 *
 * These are the SAME rules the backend applies at corpus load
 * (`backend/src/ai/curriculum-corpus.ts`: `isTemplateFrame`, `PLACEHOLDER_LINE`).
 * The content generators wrote one line per topic from a fixed mould next to the
 * real authored lines, so a record reads:
 *
 *   "**Logic and Set:** Class 11 concept."
 *   "Core point for 01 aromatic compounds."
 *   "Formula for X: [insert from textbook]."
 *
 * The backend never feeds those lines to the tutor ("they name the unit and say
 * nothing about it"), but the built tree still shipped them to the topic
 * workspace, so students saw the frames on the page. The builder now drops them
 * the same way, which keeps one definition of "knowledge" across the stack.
 *
 * Kept as a literal copy on purpose: the backend compiles without the frontend
 * and the frontend without the backend, so a shared import would couple the two
 * deploys. If the backend rules change, change these too.
 */

const PLACEHOLDER_LINE =
  /^\s*(core point|universal scientific fact|universal fact|specialized insight|specialised insight|key statement|relevant formula|key formula)\s+for\b|\brelevant formula for\b[^)]*\)?\s*$/i;

const TEMPLATE_FRAME_LINE = [
  /:[*\s]*class\s*(11|12|xi|xii)\s*concept\.?\s*$/i,
  /\[\s*insert[^\]]*\]/i,
  /^\s*(distinguish concepts? in|solve\s+\d+\s+problems?\s+on|derive the key formula for|core principle of|application of|numerical problem on|daily life use of)\b/i,
  /^\s*(q\s*\d+[.)]\s*)?(define|key formula for|problem on|state the definition of)\b/i,
  /\bappears in exams\b/i,
  /^\s*understand\s+(and|,)?.{0,60}\bfor\s+(the\s+)?(unit|topic|chapter)\b/i,
  // The second generator mould, which wrote the class-11 and class-12 trees
  // with the same frame vocabulary. One line per topic, so a cross-record
  // frequency rule cannot see it, yet it teaches nothing:
  //   "**Scope.** X — Unit, Subject (class-11-notes)."
  //   "**Tested.** define it · list: X, y · one worked example · one misconception each."
  //   "**Cell wall.** one-line definition + one-line exam use."
  //   "Covers only: X (within Unit)."
  //   "Out of scope here: topics of neighbouring units in Subject — don't mix them."
  //   "State the limit / condition where a formula or rule stops being valid …"
  //   "❌ treat \"X\" as one blob → ✅ split into: X, y."
  //   "Standard result for \"X\" — state it and verify by substituting a simple case."
  //   "Key Formula 1: Definition formula for X" / "Key Point 2: …" / "Example 3: …"
  /^\*\*Scope\.\*\*.+\(class-(?:11|12)[a-z0-9-]*\)\.?\s*$/i,
  /^\*\*Tested\.\*\*\s*define it\b/i,
  /one-line definition \+ one-line exam use\.?\s*$/i,
  /^Covers only:.+\(within .+\)\.?\s*$/i,
  /^Out of scope here:/i,
  /^State the limit \/ condition where a formula or rule stops being valid/i,
  /treat .+ as one blob → ✅ split into:/i,
  /state the rule without its limit → ✅ note when it applies/i,
  /no diagram → ✅ add one labelled figure/i,
  /^Standard result for .+ — state it and verify by substituting a simple case\.?\s*$/i,
  /^\s*(key formula|key point|example)\s+\d+:/i,
  // The third generator mould, which wrapped every topic title as
  // "X (Unit, Subject, class-N-notes) covers Y. Master the standard form, the
  // sub-ideas and one worked example; most exam questions … are built from
  // exactly these." — pure meta-advice, no subject knowledge. Anchored on the
  // line START and on the first parenthesis pair, so a real recap that merely
  // CONTAINS the frame mid-line is never killed with it.
  /^\s*[^()]{1,240}\(\s*[^()]*\bclass-(?:11|12)[a-z0-9-]*\s*\)\s*covers\b.*\bmaster the standard form\b/i,
  // …and its short form, written for scaffold files that never got a real
  // summary: "X covers essential principles and applications."
  /^\s*[^()]{1,120}\s+covers\s+(only\s+)?essential principles and applications\.?\s*$/i,
  // The empty-crosslink frame the audit already knew as "connects to other
  // topics": "Connection of X to other topics" names nothing and teaches less.
  /^\s*connection of .+ to other topics\.?\s*$/i,
  // …and the rest of the same scaffold family the deepening pass kept meeting
  // in placeholder files: numbered statements, theorem/condition stubs,
  // "based on fundamental principles", "recall the formula for".
  /^\s*statement\s+\d+\s*:/i,
  /^\s*theorem related to\b/i,
  /^\s*condition for .+ to be valid\.?\s*$/i,
  /^\s*.{1,80}\s+is based on fundamental principles\.?\s*$/i,
  /^\s*definition and significance of\b/i,
  /^\s*recall the formula for\b/i,
];

/** True when a line is a generator frame rather than knowledge. */
export function isGeneratorJunkLine(line: string): boolean {
  return PLACEHOLDER_LINE.test(line) || TEMPLATE_FRAME_LINE.some((p) => p.test(line));
}

/** Drops generator frames from one string; returns "" when nothing survives. */
export function stripGeneratorJunkText(text: string): string {
  const kept = text
    .split(/\r?\n/)
    .filter((line) => !line.trim() || !isGeneratorJunkLine(line));
  return kept.join("\n").trim();
}

/**
 * Fields that IDENTIFY a note. They are never filtered: a topic title may
 * legitimately read "Application of Newton's Laws" or "Define …", which is a
 * frame only when it sits in a content list. The manifest is validated against
 * `ManifestSchema`, so emptying a title breaks the build's own gate.
 */
const IDENTITY_KEYS = new Set([
  "title",
  "topicTitle",
  "topicSlug",
  "unitSlug",
  "subject",
  "source",
  "slug",
  "id",
  "href",
  "url",
  "filename",
  "visualType",
  "animation3D",
  "motionGraphics",
  "generatedAt",
  "tabGroup",
]);

/**
 * Deep-copies a built note, dropping generator frames from its content.
 *
 * Array items may disappear (a frame-only bullet teaches nothing), but an
 * OBJECT property never may: `{ question: "Q1. Define X." }` is validated by
 * `ManifestSchema`, and an emptied required field fails the build's own gate.
 * Such a property keeps its original text instead.
 */
export function stripGeneratorJunk<T>(value: T, key = "", keepWhenEmpty = false): T {
  if (typeof value === "string") {
    if (IDENTITY_KEYS.has(key)) return value;
    const cleaned = stripGeneratorJunkText(value);
    if (cleaned || !keepWhenEmpty) return cleaned as unknown as T;
    return value.trim() as unknown as T;
  }
  if (Array.isArray(value)) {
    const kept = value
      .map((entry) => stripGeneratorJunk(entry, key, false))
      .filter((entry) => !(typeof entry === "string" && entry.trim() === ""));
    return kept as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [childKey, entry] of Object.entries(value as Record<string, unknown>)) {
      out[childKey] = stripGeneratorJunk(entry, childKey, true);
    }
    return out as unknown as T;
  }
  return value;
}
