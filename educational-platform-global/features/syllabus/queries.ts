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
