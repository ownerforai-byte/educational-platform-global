/**
 * Nepali Educate (nepalieducate.com) — class 11 exercise solution PDFs on Google Drive.
 * Complements NoteSwift / WebNotee / NepalEnotes for chapters with no duplicate site coverage.
 *
 * Regenerate: `node content-tools/streams/scrape-nepalieducate-catalog.mjs`
 */
import { isStreamSourceEnabled } from "@/lib/stream-sources";
import { frameSrcFor } from "@/lib/pdf-src";
import generated from "@/lib/streams/nepalieducate-catalog.generated.json";

const CLASS_11 = "class-11-notes";

const SCIENCE_SUBJECTS = new Set([
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "english",
  "nepali",
]);

export type NepalieducateCatalogEntry = {
  id: string;
  title: string;
  articleUrl: string;
  classYear: "11";
  subjectSlug: string;
  unitId: string | null;
  pathTail: string;
  driveIds: string[];
};

export type NepalieducateStreamPdf = {
  id: string;
  title: string;
  src: string;
  articleUrl: string;
  scope: "chapter" | "subject";
};

export function isNepalieducateSolutionPdfEntry(entry: NepalieducateCatalogEntry): boolean {
  if (entry.classYear !== "11") return false;
  if (!SCIENCE_SUBJECTS.has(entry.subjectSlug)) return false;
  return entry.driveIds.length > 0;
}

export const NEPALIEDUCATE_SOLUTION_ENTRIES: NepalieducateCatalogEntry[] = (
  generated as { entries: NepalieducateCatalogEntry[] }
).entries.filter(isNepalieducateSolutionPdfEntry);

/**
 * Class 11 only — every Nepali Educate solution PDF for this syllabus unit.
 */
export function getChapterNepalieducateStreamPdfs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): NepalieducateStreamPdf[] {
  if (!isStreamSourceEnabled("nepalieducate")) return [];
  if (classSlug !== CLASS_11) return [];

  const pool = NEPALIEDUCATE_SOLUTION_ENTRIES.filter((e) => e.subjectSlug === subjectSlug);
  const chapterEntries = pool.filter((e) => e.unitId === unitId);

  const flat: NepalieducateStreamPdf[] = [];
  const seenSrc = new Set<string>();

  for (const entry of chapterEntries) {
    entry.driveIds.forEach((driveId, index) => {
      const src = frameSrcFor(`https://drive.google.com/file/d/${driveId}/preview`);
      if (seenSrc.has(src)) return;
      seenSrc.add(src);
      flat.push({
        id: `${entry.id}:pdf:${driveId}`,
        title:
          entry.driveIds.length > 1
            ? `${entry.title} · solution PDF ${index + 1}`
            : `${entry.title} · solution PDF`,
        src,
        articleUrl: entry.articleUrl,
        scope: "chapter",
      });
    });
  }

  return flat;
}

export function nepalieducateClassifiedUnitIds(): string[] {
  return NEPALIEDUCATE_SOLUTION_ENTRIES.map((e) => e.unitId).filter((id): id is string => !!id);
}