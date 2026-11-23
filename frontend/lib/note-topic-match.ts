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
 * Match quality for a candidate note, higher is better:
 *   3 — exact topic-slug match,
 *   2 — the note filename carries the topic slug,
 *   1 — compact-form prefix match,
 *   0 — no match.
 *
 * Canonical selection must rank by this BEFORE duplicateType: short legacy
 * stubs ("alkynes" → a 4-block summary) prefix-match long syllabus slugs
 * ("alkynes-preparation-from-…") and, with duplicateType ties broken by
 * manifest order, the stub used to beat the detailed note it duplicates.
 */
export type NoteMatchQuality = 0 | 1 | 2 | 3;

export function noteMatchQuality(
  entryTopicSlug: string | null | undefined,
  filename: string | null | undefined,
  topicSlug: string,
): NoteMatchQuality {
  if (!topicSlug) return 0;

  const entrySlug = (entryTopicSlug ?? "").trim();
  if (entrySlug && entrySlug === topicSlug) return 3;
  if (filename && filename.includes(topicSlug)) return 2;

  const wanted = compactSlug(topicSlug);
  if (wanted.length < MIN_PREFIX_CHARS) return 0;

  const candidates = [entrySlug];
  if (filename) candidates.push(filenameStem(filename));
  for (const candidate of candidates) {
    const compact = compactSlug(candidate);
    if (compact.length < MIN_PREFIX_CHARS) continue;
    if (compact.startsWith(wanted) || wanted.startsWith(compact)) return 1;
  }
  return 0;
}

/**
 * Pick the canonical note entry for a syllabus topic from manifest candidates:
 * highest match quality first, then richest content (total note characters,
 * when provided — the corpus branch supplies it so a 7-block deep-dive beats a
 * 14-line stub list), then lowest duplicateType, then manifest order.
 * Returns undefined when nothing matches.
 */
export function pickCanonicalNoteEntry<
  T extends {
    topicSlug?: string | null;
    filename?: string | null;
    duplicateType?: number;
    noteChars?: number;
  },
>(entries: readonly T[], topicSlug: string): T | undefined {
  let best: T | undefined;
  let bestQuality: NoteMatchQuality = 0;
  let bestChars = Number.NEGATIVE_INFINITY;
  let bestDup = Number.POSITIVE_INFINITY;
  let bestIndex = Number.POSITIVE_INFINITY;
  entries.forEach((entry, index) => {
    const quality = noteMatchQuality(entry.topicSlug, entry.filename, topicSlug);
    if (quality === 0) return;
    const chars = entry.noteChars ?? 0;
    const dup = entry.duplicateType ?? 1;
    const better =
      quality > bestQuality ||
      (quality === bestQuality &&
        (chars > bestChars ||
          (chars === bestChars &&
            (dup < bestDup || (dup === bestDup && index < bestIndex)))));
    if (better) {
      best = entry;
      bestQuality = quality;
      bestChars = chars;
      bestDup = dup;
      bestIndex = index;
    }
  });
  return best;
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
  return noteMatchQuality(entryTopicSlug, filename, topicSlug) > 0;
}
