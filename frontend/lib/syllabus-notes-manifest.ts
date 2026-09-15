/**
 * Syllabus Notes Manifest
 *
 * Maps each syllabus topic to its source materials from:
 *   - ravikishan   (original NEB-aligned notes)
 *   - r-export     (duplicated/reformatted versions)
 *
 * Each entry tracks which "type" it is so the UI can render
 * tabbed views: Type 1 = original, Type 2+ = duplicates.
 */

/**
 * Unit-slug aliases for historical / orphaned content folders that
 * were authored with short names before the canonical long-form
 * syllabus unit IDs were locked.
 *
 * All aliases resolve to their canonical syllabus unit id so that
 * notes stored under the orphan folder names still appear in the
 * correct Class 11 subject → unit notes viewer.
 */
export const UNIT_SLUG_ALIASES: Record<string, string> = {
  // Chemistry: 6 short-name folders → canonical long syllabus names
  "classification-of-elements": "classification-of-elements-and-periodic-table",
  "chemical-bonding": "chemical-bonding-and-shapes-of-molecules",
  "oxidation-reduction": "oxidation-and-reduction",
  "basic-concept-organic": "basic-concept-of-organic-chemistry",
  "fundamental-principles-organic": "fundamental-principles-of-organic-chemistry",
  "modern-manufactures": "modern-chemical-manufactures",

  // Mathematics: limits-and-continuity is subsumed into calculus unit
  "limits-and-continuity": "calculus",

  // Physics: short-form work-energy-power → canonical with "and"
  "work-energy-power": "work-energy-and-power",
};

/**
 * Reverse map: canonical slug → list of alias folder names that should
 * contribute additional content to that canonical unit. Used when the
 * manifest loader scans through every folder on disk and needs to know
 * which extra (alias) folders to pull into the canonical unit.
 */
export const CANONICAL_UNIT_TO_ALIAS_FOLDERS: Record<string, string[]> =
  Object.entries(UNIT_SLUG_ALIASES).reduce<Record<string, string[]>>((acc, [alias, canonical]) => {
    if (!acc[canonical]) acc[canonical] = [];
    acc[canonical].push(alias);
    return acc;
  }, {});

/**
 * Resolve any unit slug (alias or canonical) to its canonical syllabus slug.
 * Returns the input unchanged if no alias applies.
 */
export function resolveUnitSlug(slug: string | undefined | null): string {
  if (!slug) return "";
  return UNIT_SLUG_ALIASES[slug] ?? slug;
}

export interface SyllabusNoteEntry {
  /** Syllabus unit slug (matches topic-3d-map.ts) */
  unitSlug: string;
  /** Syllabus topic slug (matches syllabus.ts) */
  topicSlug: string;
  /** Human-readable title */
  title: string;
  /** How many notes this entry contains */
  noteCount: number;
  /** Which source this entry came from */
  source: "ravikishan" | "r-export";
  /** For r-export duplicates: which version (1, 2, 3…) */
  duplicateType?: number;
  /** If this entry came from an alias folder, records the original alias slug */
  aliasSlug?: string;
}

/**
 * Build the full manifest from raw data.
 * Ravikishan entries are always Type 1 (original).
 * r-export entries that match a ravikishan topicSlug are Type 2+ (duplicates).
 *
 * Unit-slug aliases are applied BEFORE deduplication so content stored in
 * orphaned short-name folders is merged into the correct canonical unit.
 */
export function buildManifest(
  ravEntries: Array<{ unitSlug: string; topicSlug: string; title: string; noteCount: number; aliasSlug?: string }>,
  reEntries: Array<{ subject: string; chapter: string; id: string; title: string; noteCount: number }>,
): SyllabusNoteEntry[] {
  // Dedupe key: canonical unitSlug + topicSlug + source + title slug
  const seenKeys = new Set<string>();
  const results: SyllabusNoteEntry[] = [];

  // Add all ravikishan entries as Type 1 (original), applying aliases.
  let dupCounter = 2;
  for (const e of ravEntries) {
    if (!e.unitSlug || !e.topicSlug) continue;
    const canonicalUnit = resolveUnitSlug(e.unitSlug);
    const isAlias = Boolean(e.aliasSlug) || e.unitSlug !== canonicalUnit;
    const dedupeKey = `r||${canonicalUnit}||${e.topicSlug}||${e.title.toLowerCase().replace(/\s+/g, "-").slice(0, 60)}`;
    if (seenKeys.has(dedupeKey)) continue;
    seenKeys.add(dedupeKey);

    results.push({
      unitSlug: canonicalUnit,
      topicSlug: e.topicSlug,
      title: e.title,
      noteCount: e.noteCount,
      source: "ravikishan",
      // Alias-folder content is still type 1 (ravikishan-origin) but flagged separately
      duplicateType: 1,
      aliasSlug: isAlias ? (e.aliasSlug ?? e.unitSlug) : undefined,
    });
  }

  // Rebuild ravikishan dedupe index for the r-export comparison step,
  // using the already-aliased canonical unit slugs.
  const ravIndex = new Map<string, SyllabusNoteEntry>();
  for (const e of results) {
    if (e.source !== "ravikishan") continue;
    ravIndex.set(`${e.unitSlug}||${e.topicSlug}`, e);
  }

  // Add r-export entries, marking duplicates where topicSlug matches ravikishan
  for (const e of reEntries) {
    const reUnitSlug = resolveUnitSlug(e.chapter);
    const key = `${reUnitSlug}||${e.id}`;
    const titleKey = `${reUnitSlug}||${e.title.toLowerCase().replace(/\s+/g, "-").substring(0, 50)}`;
    const isDuplicate = ravIndex.has(key) || ravIndex.has(titleKey);
    const dedupeKey = `re||${reUnitSlug}||${e.id}||${e.title.toLowerCase().replace(/\s+/g, "-").slice(0, 60)}`;
    if (seenKeys.has(dedupeKey)) continue;
    seenKeys.add(dedupeKey);

    results.push({
      unitSlug: reUnitSlug,
      topicSlug: e.id,
      title: e.title,
      noteCount: e.noteCount,
      source: "r-export",
      duplicateType: isDuplicate ? dupCounter++ : undefined,
    });
  }

  return results;
}
