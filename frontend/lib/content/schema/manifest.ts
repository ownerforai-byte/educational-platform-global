import { z } from "zod";
import { Slug } from "./atoms";

/**
 * `_manifest.json` entry — one row per built note file.
 *
 * This is the contract the build script WRITES and the UI READS. Typing it
 * catches the class of bug the plan originally found: a producer that reads a
 * field the producers/consumers disagree on (`mcs` vs `mcqs`).
 *
 * Measured: 602 entries across 6 subjects.
 */

export const ManifestEntrySchema = z
  .object({
    unitSlug: Slug,
    topicSlug: Slug,
    title: z.string().min(1).max(400),
    /** Number of `notes` strings in the file. Refreshed by `content:build`. */
    noteCount: z.number().int().min(0).max(500),
    source: z.string().min(1).max(80),
    /** 1 = canonical, 2 = tab variant (see `duplicateType` on the note). */
    duplicateType: z.number().int().min(1).max(9),
    /** Filename inside `syllabus-notes/{subject}/{unitSlug}/`. */
    filename: z.string().min(1).max(300),
    /**
     * TRUE when the file has any MCQ, from EITHER convention. Computed over
     * `mcs` first, then `mcqs` — see `contentHasMcqs()`.
     */
    hasMcqs: z.boolean(),
    universalFactsCount: z.number().int().min(0).max(500),
    /** Present only for duplicateType 2 entries. Opaque label, not a URL slug. */
    tabGroup: z.string().max(400).optional(),
    /** Present only when the note declares `blocks` (Phase 4b, PLANS.md §5.1). */
    blockCount: z.number().int().min(1).optional(),
  })
  .strict();

export const ManifestSchema = z.array(ManifestEntrySchema);
export type ManifestEntry = z.infer<typeof ManifestEntrySchema>;

/**
 * A note has MCQs if EITHER of the two corpus conventions carries any.
 *
 * The old build script read `data.mcqs` only, so entries whose MCQs live in
 * `mcs` reported `hasMcqs: false` — measured at **172 manifest entries wrong**,
 * each silently disabling a "Practice" affordance in the UI.
 *
 * The three conventions actually present in `concepts/`:
 *
 *   only `mcs`  : 212 files   → previously MISSED
 *   only `mcqs` :  37 files   → previously CORRECT
 *   both        : 210 files   → previously CORRECT
 *
 * So this is not a migration from one field to the other — one field is
 * insufficient. Reading only `mcs` would break 37 files the script gets right
 * today, which is why the union is the fix and "legacy alias" understates it.
 */
export function contentHasMcqs(
  data: { mcs?: { length: number } | null; mcqs?: { length: number } | null } | null | undefined
): boolean {
  if (!data) return false;
  return Boolean((data.mcs && data.mcs.length) || (data.mcqs && data.mcqs.length));
}

/**
 * Count of MCQs, taking the **larger** of the two arrays rather than the sum.
 *
 * Verified on the 28 files that carry both: the question arrays are
 * byte-identical, so `mcs` and `mcqs` are a mirror pair written by different
 * pipelines over the same content. Summing would double every one of those
 * counts (4+4 = 8 real questions); `max` reports the true 4.
 */
export function contentMcqCount(
  data: { mcs?: unknown[] | null; mcqs?: unknown[] | null } | null | undefined
): number {
  if (!data) return 0;
  return Math.max(data.mcs?.length ?? 0, data.mcqs?.length ?? 0);
}
