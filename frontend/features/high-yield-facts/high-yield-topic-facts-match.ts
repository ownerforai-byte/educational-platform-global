/**
 * Pure matching engine for the high-yield topic fact banks.
 *
 * No bank data lives here — callers pass their own `entries` array (the eager
 * `ALL_HIGH_YIELD_TOPICS` merge, or the lazily loaded per-subject bank from
 * `high-yield-topic-facts-lazy.ts`), so this module stays out of every data
 * bundle and can never create an import cycle with a bank file.
 */

export interface HighYieldTopicData {
  topicKeywords: string[];
  /**
   * Syllabus unit ids (see `frontend/lib/syllabus.ts`) this entry belongs to.
   * Unit matching is exact and is tried BEFORE keyword matching, because topic
   * titles are full sentences ("Centripetal acceleration and centripetal
   * force") whose generic words otherwise pull in the wrong entry.
   */
  unitSlugs?: string[];
  subject: "physics" | "chemistry" | "biology" | "mathematics" | "nepali" | "english" | "general";
  title: string;
  category: string;
  governingLaws: Array<{ name: string; statement: string; formula: string; conditions: string }>;
  speedFormulas: Array<{ name: string; formula: string; description: string; unit: string; dimensions?: string }>;
  constantsAndValues: Array<{ symbol: string; name: string; value: string; unit: string }>;
  entranceTraps: Array<{ trap: string; truth: string; examRef: string }>;
  workedNumericals: Array<{
    problem: string;
    given: string;
    steps: string[];
    answer: string;
  }>;
  keyTermsAndDefinitions: Array<{ term: string; definition: string; significance: string }>;
}

/** Keywords shorter than this never decide a match on their own. */
const MIN_KEYWORD_LENGTH = 5;

/** Subject filter shared by every matcher: `general` entries always pass. */
function matchesSubject(entry: HighYieldTopicData, subjectSlug: string): boolean {
  const subject = (subjectSlug || "").toLowerCase();
  return entry.subject === "general" || subject.includes(entry.subject);
}

/**
 * Every entry that claims this syllabus unit, in bank order.
 *
 * Unit-aware callers (the mindmap branch builder, the schematic generator) must
 * use THIS rather than `findHighYieldTopicData` without a unit: an exact unit id
 * is the only match that cannot pull another unit's facts into a topic.
 */
export function filterEntriesForUnit(
  entries: HighYieldTopicData[],
  unitId: string,
  subjectSlug?: string
): HighYieldTopicData[] {
  if (!unitId) return [];
  const subject = (subjectSlug || "").toLowerCase();
  const matches = entries.filter((e) => e.unitSlugs?.includes(unitId));
  if (!subject) return matches;
  // A unit id is only unique WITHIN a subject: `vectors` is a physics unit in
  // class 11 and a mathematics unit in class 11, and `hydrocarbons` exists in
  // both chemistry tracks. Without this filter the physics entry was handed to
  // the mathematics unit as well.
  return matches.filter((e) => matchesSubject(e, subject));
}

/**
 * Every entry that names one of `unitIds`, de-duplicated.
 * Used by the topic-derived generator when a unit's exact id is not in the
 * bank but a sibling alias of the same concept is.
 */
export function filterEntriesForUnits(
  entries: HighYieldTopicData[],
  unitIds: string[]
): HighYieldTopicData[] {
  const wanted = new Set(unitIds.filter(Boolean));
  if (!wanted.size) return [];
  const seen = new Set<HighYieldTopicData>();
  const out: HighYieldTopicData[] = [];
  for (const e of entries) {
    if (seen.has(e)) continue;
    if (e.unitSlugs?.some((u) => wanted.has(u))) {
      seen.add(e);
      out.push(e);
    }
  }
  return out;
}

/**
 * Retrieves high-yield data for a subject + topic.
 *
 * Resolution order:
 *  1. `unitSlug` — exact syllabus unit match. This is the reliable path, and
 *     the reason the parameter exists: topic titles are full sentences, so
 *     keyword-only matching pulled "Newton's law of gravitation" into the
 *     Dynamics entry and "Centripetal acceleration" into Kinematics.
 *  2. Keyword score across topic slug + title, used only when no `unitSlug` is
 *     supplied. Entries are therefore reachable from unit-aware callers only
 *     through their `unitSlugs` list.
 *
 * Returns `null` when nothing genuinely matches. It deliberately does NOT fall
 * back to another topic: the old "first entry for this subject, else the very
 * first entry overall" behaviour made an unmatched biology topic render the
 * Physics/Vectors facts, and made most physics units (heat, optics, current
 * electricity, …) show vectors too. Callers must treat `null` as "no curated
 * facts for this topic yet" and hide the fact-bank sections.
 */
export function findHighYieldTopicData(
  entries: HighYieldTopicData[],
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
  unitSlug?: string
): HighYieldTopicData | null {
  const normSubject = subjectSlug.toLowerCase();
  const searchStr = `${topicSlug} ${topicTitle}`.toLowerCase();

  /**
   * Keyword score. Only keywords of at least 5 characters count, so short
   * generic words ("work", "unit", "gas", "rms") cannot decide an entry on
   * their own.
   */
  const keywordScore = (entry: HighYieldTopicData) =>
    entry.topicKeywords.reduce(
      (total, keyword) =>
        keyword.length >= MIN_KEYWORD_LENGTH &&
        searchStr.includes(keyword.toLowerCase())
          ? total + 1
          : total,
      0
    );

  const candidates = entries.filter((e) => matchesSubject(e, normSubject));

  if (unitSlug) {
    const unitMatches = candidates.filter((entry) =>
      entry.unitSlugs?.includes(unitSlug)
    );
    if (unitMatches.length === 1) return unitMatches[0];
    if (unitMatches.length > 1) {
      return unitMatches.reduce((best, entry) =>
        keywordScore(entry) > keywordScore(best) ? entry : best
      );
    }
    // The caller told us the exact unit and no entry claims it: answering with
    // a keyword guess is how the wrong-topic facts got shown in the first
    // place, so report "no facts" instead. Add `unitSlugs` to fix an entry.
    return null;
  }

  let best: { entry: HighYieldTopicData; score: number } | null = null;
  for (const entry of candidates) {
    const score = keywordScore(entry);
    if (score === 0) continue;
    if (best === null || score > best.score) best = { entry, score };
  }

  return best?.entry ?? null;
}

/**
 * Neutral placeholder with the same shape, so a component can keep one non-null
 * code path while `hasHighYieldTopicData()` decides what is actually rendered.
 */
export function emptyHighYieldTopicData(
  topicTitle: string,
  subjectSlug: string
): HighYieldTopicData {
  return {
    topicKeywords: [],
    subject: "general",
    title: topicTitle,
    category: subjectSlug,
    governingLaws: [],
    speedFormulas: [],
    constantsAndValues: [],
    entranceTraps: [],
    workedNumericals: [],
    keyTermsAndDefinitions: [],
  };
}

/** Convenience guard for callers that only check for the presence of facts. */
export function hasHighYieldTopicData(data: HighYieldTopicData | null): boolean {
  if (!data) return false;
  return (
    data.governingLaws.length > 0 ||
    data.speedFormulas.length > 0 ||
    data.constantsAndValues.length > 0 ||
    data.entranceTraps.length > 0
  );
}
