/**
 * neb-blueprint — the "concepts asked in NEB" map.
 *
 * `content/practice/blueprint/<class>/<subject>.json` transcribes the CDC
 * specification grid as STRUCTURAL METADATA only (SOURCES.md ✅): per-unit
 * teaching hours, the concepts the unit is examined through, and — where
 * transcribed from the grid — marks and question-type splits. Anything not
 * yet verified against the official grid is flagged `verified: false` with a
 * `provenance` note, so the UI can badge it as an estimate instead of
 * presenting an invented number as CDC data.
 *
 * Unit slugs always come from `frontend/lib/syllabus.ts` — the blueprint is a
 * lens over the official curriculum, never a parallel list.
 */
import { loadData } from "@/lib/data-loader";
import { normalizeClassDir, classDirOfTrack } from "@/lib/content/paths";
import { getSubjectSyllabus } from "@/lib/core/syllabus";

export interface BlueprintUnit {
  /** Syllabus unit slug (matches syllabus.ts). */
  unit: string;
  /** Teaching hours from the CDC curriculum (verified structural data). */
  hours?: number;
  /** Marks carried by this unit in the board paper — only when grid-verified. */
  marks?: number;
  /** Hours-proportional estimate of the unit's mark share — never presented as CDC data. */
  marksEstimate?: number;
  /** Concepts the unit is examined through. */
  concepts: string[];
  /** Question-type split (mcq/short/long counts) — grid-verified or estimate. */
  questionTypes?: { mcq?: number; short?: number; long?: number };
  /** Cognitive-level split in % (sums to ~100) — grid-verified or estimate. */
  cognitive?: { knowledge?: number; understanding?: number; application?: number; higher?: number };
  /** false ⇒ the numbers above are curriculum-derived estimates, not grid data. */
  verified: boolean;
  provenance?: string;
}

export interface BlueprintFile {
  subject: string;
  classLevel: string;
  source: string;
  /** Total theory marks of the board paper when known (e.g. 75). */
  totalMarks?: number;
  units: BlueprintUnit[];
}

const SECTION = "practice/blueprint";

/** The blueprint file for a class+subject, or null when none is authored yet. */
export async function getBlueprint(
  classSlug: string,
  subjectSlug: string,
): Promise<BlueprintFile | null> {
  const classDir = normalizeClassDir(classDirOfTrack(classSlug));
  try {
    // Per-file read mirrored to public/data/content by pyq-register — see
    // pyq-sources.ts for why the corpus index is no longer the transport.
    const file = await loadData<BlueprintFile>(`content/${SECTION}/${classDir}/${subjectSlug}.json`);
    if (file && Array.isArray(file.units)) return file;
  } catch {
    // The blueprint is an enhancement — a missing index must never break a page.
  }
  return null;
}

/**
 * Blueprint joined with the syllabus: every syllabus unit appears, in
 * curriculum order, with blueprint data attached where authored. Units the
 * blueprint has not covered yet still appear (with `null` data) so the map
 * never silently hides part of the curriculum.
 */
export async function blueprintByUnit(
  classSlug: string,
  subjectSlug: string,
): Promise<Array<{ unit: { id: string; title: string; hours?: number }; data: BlueprintUnit | null }>> {
  const syllabus = getSubjectSyllabus(classSlug, subjectSlug);
  if (!syllabus) return [];
  const file = await getBlueprint(classSlug, subjectSlug);
  const byId = new Map(file?.units.map((u) => [u.unit, u]) ?? []);
  return syllabus.units.map((unit) => ({
    unit: { id: unit.id, title: unit.title, hours: unit.hours },
    data: byId.get(unit.id) ?? null,
  }));
}

/** Highest-yield units first: verified marks when present, then hours. */
export function sortHighYield(
  rows: Array<{ unit: { id: string; title: string; hours?: number }; data: BlueprintUnit | null }>,
): typeof rows {
  return [...rows].sort((a, b) => {
    const ma = a.data?.verified && typeof a.data.marks === "number" ? a.data.marks : -1;
    const mb = b.data?.verified && typeof b.data.marks === "number" ? b.data.marks : -1;
    if (ma !== mb) return mb - ma;
    const ha = a.data?.hours ?? a.unit.hours ?? 0;
    const hb = b.data?.hours ?? b.unit.hours ?? 0;
    return hb - ha;
  });
}
