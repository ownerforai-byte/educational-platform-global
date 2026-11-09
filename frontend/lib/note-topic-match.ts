/**
 * Shared syllabus-topic ↔ note matcher.
 *
 * Three consumers used to carry three hand-rolled variants of "does this note
 * belong to this topic?" (the server "coming soon" decider, the topic
 * workspace's flat-manifest branch and its supplementary branch). Divergence
 * between them produced pages that announced notes the loader could not find —
 * and near-miss slugs that hid real notes entirely: the corpus writes
 * "mendels-laws-of-inheritance" where the syllabus slugifies "Mendel's Laws…"
 * to "mendel-s-laws-…", and "alkanes" where the syllabus writes the long-form
 * "alkanes-conformations-…". One rule set, three call sites.
 */

/**
 * Slug comparison form: everything except letters, digits and Devanagari
 * stripped, so hyphens from apostrophes ("mendel-s-laws") and title-length
 * differences ("alkanes" / "alkanes-conformations-…") compare equal.
 */
export function compactSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "");
}

/** Minimum compact length before a prefix match counts — guards stubs. */
const MIN_PREFIX_CHARS = 6;

/** "03-mendels-laws-of-inheritance.json" → "mendels-laws-of-inheritance". */
function filenameStem(filename: string): string {
  return filename.replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_. ]+/, "");
}

/**
 * True when a note entry belongs to the syllabus topic.
 *
 * Match order (first hit wins, no scoring):
 *   1. exact topic slug,
 *   2. the note filename carries the topic slug,
 *   3. compact-form prefix in either direction — one slug is the beginning of
 *      the other once separators are removed ("alkanes" ⊂ "alkanes-…" and
 *      "mendels-laws-of-inheritance" ⊂ "mendel-s-laws-of-inheritance-…").
 */
export function noteMatchesTopic(
  entryTopicSlug: string | null | undefined,
  filename: string | null | undefined,
  topicSlug: string,
): boolean {
  if (!topicSlug) return false;

  const entrySlug = (entryTopicSlug ?? "").trim();
  if (entrySlug && entrySlug === topicSlug) return true;
  if (filename && filename.includes(topicSlug)) return true;

  const wanted = compactSlug(topicSlug);
  if (wanted.length < MIN_PREFIX_CHARS) return false;

  const candidates = [entrySlug];
  if (filename) candidates.push(filenameStem(filename));
  for (const candidate of candidates) {
    const compact = compactSlug(candidate);
    if (compact.length < MIN_PREFIX_CHARS) continue;
    if (compact.startsWith(wanted) || wanted.startsWith(compact)) return true;
  }
  return false;
}
