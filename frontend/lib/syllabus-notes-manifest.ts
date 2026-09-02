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
}

/**
 * Build the full manifest from raw data.
 * Ravikishan entries are always Type 1 (original).
 * r-export entries that match a ravikishan topicSlug are Type 2+ (duplicates).
 */
export function buildManifest(
  ravEntries: Array<{ unitSlug: string; topicSlug: string; title: string; noteCount: number }>,
  reEntries: Array<{ subject: string; chapter: string; id: string; title: string; noteCount: number }>,
  subjectSlug: string,
): SyllabusNoteEntry[] {
  // Index ravikishan by unitSlug+topicSlug
  const ravIndex = new Map<string, typeof ravEntries[0]>();
  for (const e of ravEntries) {
    ravIndex.set(`${e.unitSlug}||${e.topicSlug}`, e);
  }

  const results: SyllabusNoteEntry[] = [];

  // Add all ravikishan entries as Type 1 (original)
  for (const e of ravEntries) {
    if (e.unitSlug && e.topicSlug) {
      results.push({
        unitSlug: e.unitSlug,
        topicSlug: e.topicSlug,
        title: e.title,
        noteCount: e.noteCount,
        source: "ravikishan",
        duplicateType: 1,
      });
    }
  }

  // Add r-export entries, marking duplicates where topicSlug matches ravikishan
  let dupCounter = 2;
  for (const e of reEntries) {
    // r-export uses "chapter" field which maps to unitSlug
    const reUnitSlug = e.chapter;
    // Check if this topicSlug exists in ravikishan for the same unit
    const key = `${reUnitSlug}||${e.id}`;
    const isDuplicate = ravIndex.has(key) || ravIndex.has(`${reUnitSlug}||${e.title.toLowerCase().replace(/\s+/g, "-").substring(0, 50)}`);

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
