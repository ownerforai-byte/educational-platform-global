import {
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type SyllabusTopicEntry,
} from "@/lib/syllabus";
import type { UnitVM } from "./types";

export function listSubjects(classSlug: string): { slug: string; name: string }[] {
  return (
    getSyllabusByClass(classSlug)?.subjects.map((s) => ({
      slug: s.slug,
      name: s.name,
    })) ?? []
  );
}

export function getSubjectNav(
  classSlug: string,
  subjectSlug: string,
): {
  subject: ReturnType<typeof getSubjectSyllabus>;
  units: UnitVM[];
} {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  const units: UnitVM[] = subject
    ? subject.units.map((u) => ({
        id: u.id,
        title: u.title,
        topics: u.topics,
        topicEntries: getUnitTopicEntries(u),
        ...(typeof u.hours === "number" ? { hours: u.hours } : {}),
        ...(typeof u.introducedIn === "number" ? { introducedIn: u.introducedIn } : {}),
      }))
    : [];
  return { subject, units };
}

export function getUnit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): UnitVM | null {
  const { units } = getSubjectNav(classSlug, subjectSlug);
  return units.find((u) => u.id === unitId) ?? null;
}

export function getUnitTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): { unit: UnitVM; topic: SyllabusTopicEntry } | null {
  const unit = getUnit(classSlug, subjectSlug, unitId);
  if (!unit) return null;
  const topic = getTopicEntryBySlug(
    { id: unit.id, title: unit.title, topics: unit.topics, hours: unit.hours },
    topicSlug,
  );
  if (!topic) return null;
  return { unit, topic };
}

/**
 * Resolve a syllabus unit id from a chapter URL segment.
 *
 * The `/levels/.../chapters/[chapterSlug]` tree historically linked chapters as
 * `unit-1`, `unit-2`, ... while the canonical notes tree links the real unit id
 * (e.g. `biomolecules-and-cell-biology`). Accept both so old links keep working.
 * Returns `null` for classes outside the syllabus-backed `*-notes` tracks.
 */
export function resolveUnitIdFromChapterSlug(
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string,
): string | null {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return null;
  if (subject.units.some((u) => u.id === chapterSlug)) return chapterSlug;
  const legacy = /^unit-(\d+)$/.exec(chapterSlug);
  if (legacy) {
    const index = Number(legacy[1]) - 1;
    return subject.units[index]?.id ?? null;
  }
  return null;
}
