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
