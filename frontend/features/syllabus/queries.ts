import {
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type SyllabusTopicEntry,
} from "@/lib/syllabus";
import { getExerciseTypes } from "./exercise-types";
import type { UnitVM } from "./types";
import {
  parseSubjectParams,
  parseUnitParams,
  parseTopicParams,
} from "./schema";

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
  // Reject a malformed subject slug before it reaches the data layer; an
  // invalid one resolves to the same "no subject, no units" the caller already
  // handles for an unknown slug.
  if (!parseSubjectParams({ subject: subjectSlug })) {
    return { subject: undefined, units: [] };
  }
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
  if (!parseUnitParams({ subject: subjectSlug, unit: unitId })) return null;
  const { units } = getSubjectNav(classSlug, subjectSlug);
  return units.find((u) => u.id === unitId) ?? null;
}

export function getUnitTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): { unit: UnitVM; topic: SyllabusTopicEntry } | null {
  if (!parseTopicParams({ subject: subjectSlug, unit: unitId, topicSlug })) return null;
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

// PHASE 4.1: full param enumeration for generateStaticParams — the corpus is
// finite and comes entirely from the local syllabus modules, so every valid
// slug can be prerendered at build (with dynamicParams=false those routes
// have no on-demand fallback path).

export function listUnitParams(
  classSlug: string,
): { subject: string; unit: string }[] {
  return listSubjects(classSlug).flatMap((s) =>
    getSubjectNav(classSlug, s.slug).units.map((u) => ({
      subject: s.slug,
      unit: u.id,
    })),
  );
}

export function listTopicParams(
  classSlug: string,
): { subject: string; unit: string; topicSlug: string }[] {
  return listUnitParams(classSlug).flatMap(({ subject, unit }) => {
    const data = getUnit(classSlug, subject, unit);
    return data
      ? data.topicEntries.map((t) => ({ subject, unit, topicSlug: t.slug }))
      : [];
  });
}

export function listExerciseTypeParams(
  classSlug: string,
): { subject: string; unit: string; topicSlug: string; exerciseType: string }[] {
  return listTopicParams(classSlug).flatMap(({ subject, unit, topicSlug }) =>
    getExerciseTypes(subject).map((et) => ({
      subject,
      unit,
      topicSlug,
      exerciseType: et.id,
    })),
  );
}
