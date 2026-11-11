/**
 * High-Yield Topic Facts, Speed Formulas & CEE/IOE Entrance Traps Engine
 * Provides authentic, rich scientific terms, governing equations, unit dimensions,
 * physical constants, and board/entrance traps across Physics, Chemistry, Biology, and Math.
 *
 * EAGER BARREL — merges every subject bank into `ALL_HIGH_YIELD_TOPICS` for
 * server components, tests and scripts. Client code paths that render one
 * subject at a time must use `high-yield-topic-facts-lazy.ts` instead, so a
 * Physics page never evaluates the Chemistry, Biology and Language banks.
 * The matching logic itself lives in `high-yield-topic-facts-match.ts`; this
 * file only supplies the full merged array and the public convenience API.
 */

import { HIGH_YIELD_TOPIC_BANK } from "@/lib/high-yield-topic-facts-core";
import { HIGH_YIELD_TOPIC_BANK_BIOLOGY } from "@/lib/high-yield-topic-facts-biology";
import { HIGH_YIELD_TOPIC_BANK_CHEMISTRY } from "@/lib/high-yield-topic-facts-chemistry";
import { HIGH_YIELD_TOPIC_BANK_CHEMISTRY_ORGANIC } from "@/lib/high-yield-topic-facts-chemistry-organic";
import { HIGH_YIELD_TOPIC_BANK_LANGUAGES } from "@/lib/high-yield-topic-facts-languages";
import { HIGH_YIELD_TOPIC_BANK_MATHEMATICS } from "@/lib/high-yield-topic-facts-mathematics";
import { HIGH_YIELD_TOPIC_BANK_PHYSICS } from "@/lib/high-yield-topic-facts-physics";
import { HIGH_YIELD_TOPIC_BANK_PHYSICS_2 } from "@/lib/high-yield-topic-facts-physics-2";
import {
  emptyHighYieldTopicData,
  filterEntriesForUnit,
  filterEntriesForUnits,
  findHighYieldTopicData,
  hasHighYieldTopicData,
  type HighYieldTopicData,
} from "@/lib/high-yield-topic-facts-match";
import { registerHighYieldSubjectBank } from "@/lib/high-yield-topic-facts-lazy";

export type { HighYieldTopicData };
export { HIGH_YIELD_TOPIC_BANK, emptyHighYieldTopicData, hasHighYieldTopicData };

/**
 * Curated core entries first, then the unit-scoped subject banks. Order only
 * breaks ties: a higher keyword score always wins, so the broad subject-wide
 * core entries never mask a specific unit entry. Unit matches ignore order
 * entirely, since `unitSlugs` must be unique per unit.
 */
export const ALL_HIGH_YIELD_TOPICS: HighYieldTopicData[] = [
  ...HIGH_YIELD_TOPIC_BANK,
  ...HIGH_YIELD_TOPIC_BANK_PHYSICS,
  ...HIGH_YIELD_TOPIC_BANK_PHYSICS_2,
  ...HIGH_YIELD_TOPIC_BANK_CHEMISTRY,
  ...HIGH_YIELD_TOPIC_BANK_CHEMISTRY_ORGANIC,
  ...HIGH_YIELD_TOPIC_BANK_MATHEMATICS,
  ...HIGH_YIELD_TOPIC_BANK_BIOLOGY,
  ...HIGH_YIELD_TOPIC_BANK_LANGUAGES,
];

// The barrel already evaluated every bank above, so registering the lazy cache
// is free and lets Node-only consumers (tests, scripts, server components that
// import the barrel) use the lazy getters synchronously — no dynamic import
// needed, and no top-level await in cjs scripts.
registerHighYieldSubjectBank("physics", [
  ...HIGH_YIELD_TOPIC_BANK_PHYSICS,
  ...HIGH_YIELD_TOPIC_BANK_PHYSICS_2,
]);
registerHighYieldSubjectBank("chemistry", [
  ...HIGH_YIELD_TOPIC_BANK_CHEMISTRY,
  ...HIGH_YIELD_TOPIC_BANK_CHEMISTRY_ORGANIC,
]);
registerHighYieldSubjectBank("biology", HIGH_YIELD_TOPIC_BANK_BIOLOGY);
registerHighYieldSubjectBank("mathematics", HIGH_YIELD_TOPIC_BANK_MATHEMATICS);
registerHighYieldSubjectBank("nepali", HIGH_YIELD_TOPIC_BANK_LANGUAGES);
registerHighYieldSubjectBank("english", HIGH_YIELD_TOPIC_BANK_LANGUAGES);

/**
 * Every curated entry that claims this syllabus unit, in stable bank order.
 *
 * Unit-aware callers (the mindmap branch builder, the schematic generator) must
 * use THIS rather than `getHighYieldTopicData` without a unit: an exact unit id
 * is the only match that cannot pull another unit's facts into a topic.
 */
export function getHighYieldEntriesForUnit(
  unitId: string,
  subjectSlug?: string
): HighYieldTopicData[] {
  return filterEntriesForUnit(ALL_HIGH_YIELD_TOPICS, unitId, subjectSlug);
}

/**
 * Every curated entry that names one of `unitIds`, de-duplicated.
 * Used by the topic-derived generator when a unit's exact id is not in the
 * bank but a sibling alias of the same concept is.
 */
export function getHighYieldEntriesForUnits(unitIds: string[]): HighYieldTopicData[] {
  return filterEntriesForUnits(ALL_HIGH_YIELD_TOPICS, unitIds);
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
export function getHighYieldTopicData(
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
  unitSlug?: string
): HighYieldTopicData | null {
  return findHighYieldTopicData(
    ALL_HIGH_YIELD_TOPICS,
    subjectSlug,
    topicSlug,
    topicTitle,
    unitSlug
  );
}
