/**
 * mistake-guide — the "common mistakes / exam-hall traps" reader.
 *
 * `content/practice/mistakes/<class>/<subject>.json` carries, per subject:
 *  - `examHall`: short exam-hall discipline reminders (diagram labels, units,
 *    time management) that apply across the paper;
 *  - `mistakes`: per-topic entries naming the exact error, why it costs
 *    marks, and the habit that fixes it.
 *
 * Every entry is platform-authored (✅ in SOURCES.md) — the published
 * examiner commentary only informed WHICH error patterns to cover.
 *
 * Each file also carries a `questions` array (one per mistake, phrased as the
 * trap and answered with the fix) so the Veer corpus picks the guide up as
 * retrievable Q&A records — the same contract the drills use.
 */
import { loadData } from "@/lib/data-loader";
import { normalizeClassDir, classDirOfTrack } from "@/lib/content/paths";

export interface ExamMistake {
  /** Stable id, e.g. "phy-12-optics-sign". */
  id: string;
  /** Topic the trap lives in. */
  topic: string;
  /** The mistake, as a student would make it. */
  wrong: string;
  /** Why it costs marks (what the examiner sees). */
  why: string;
  /** The habit that fixes it. */
  fix: string;
  /** Syllabus unit slug the mistake belongs to. */
  unit: string;
  /** Typical mark cost, e.g. "2-4". */
  marks?: string;
}

export interface MistakeFile {
  subject: string;
  classLevel: string;
  /** Paper-wide exam-hall discipline reminders. */
  examHall: string[];
  mistakes: ExamMistake[];
  /** Optional derived Q&A records (trap → fix) for the corpus. */
  questions?: Array<{ question: string; solution?: string; unit?: string; unitSlug?: string }>;
}

const SECTION = "practice/mistakes";

/** The mistake guide for a class+subject, or null when none is authored yet. */
export async function getMistakeGuide(
  classSlug: string,
  subjectSlug: string,
): Promise<MistakeFile | null> {
  const classDir = normalizeClassDir(classDirOfTrack(classSlug));
  try {
    // Per-file read mirrored to public/data/content by pyq-register — see
    // pyq-sources.ts for why the corpus index is no longer the transport.
    const file = await loadData<MistakeFile>(`content/${SECTION}/${classDir}/${subjectSlug}.json`);
    if (file && Array.isArray(file.mistakes)) return file;
  } catch {
    // Guidance is an enhancement — a missing index must never break a page.
  }
  return null;
}

/** Mistakes grouped under their syllabus unit, in the file's order. */
export function mistakesByUnit(
  file: MistakeFile,
): Array<{ unit: string; items: ExamMistake[] }> {
  const groups = new Map<string, ExamMistake[]>();
  for (const m of file.mistakes) {
    const list = groups.get(m.unit) ?? [];
    list.push(m);
    groups.set(m.unit, list);
  }
  return [...groups.entries()].map(([unit, items]) => ({ unit, items }));
}
