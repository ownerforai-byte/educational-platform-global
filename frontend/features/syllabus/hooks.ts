import {
  useQuery,
  useSuspenseQuery,
  type UseQueryResult,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type SyllabusTopicEntry,
} from "@/lib/syllabus";
import type { UnitVM, SubjectNavVM } from "./types";

const SYLLABUS_KEY = ["syllabus"] as const;
const SUBJECT_NAV_KEY = (classSlug: string, subjectSlug: string) =>
  ["syllabus", "subject", classSlug, subjectSlug] as const;
const UNIT_KEY = (classSlug: string, subjectSlug: string, unitId: string) =>
  ["syllabus", "unit", classSlug, subjectSlug, unitId] as const;
const TOPIC_KEY = (classSlug: string, subjectSlug: string, unitId: string, topicSlug: string) =>
  ["syllabus", "topic", classSlug, subjectSlug, unitId, topicSlug] as const;

export function useSyllabusByClass(classSlug: string): UseQueryResult<ClassSyllabus | undefined, Error> {
  return useQuery({
    queryKey: [...SYLLABUS_KEY, classSlug],
    queryFn: () => getSyllabusByClass(classSlug),
    staleTime: 1000 * 60 * 10,
    enabled: !!classSlug,
  });
}

export function useSubjectNav(
  classSlug: string,
  subjectSlug: string,
): UseSuspenseQueryResult<{ subject: SubjectNavVM; units: UnitVM[] }, Error> {
  return useSuspenseQuery({
    queryKey: SUBJECT_NAV_KEY(classSlug, subjectSlug),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) throw new Error(`Subject ${subjectSlug} not found`);
      const units: UnitVM[] = subject.units.map((u) => ({
        id: u.id,
        title: u.title,
        topics: u.topics,
        topicEntries: getUnitTopicEntries(u),
        ...(typeof u.hours === "number" ? { hours: u.hours } : {}),
      }));
      return {
        subject: {
          slug: subject.slug,
          name: subject.name,
          description: subject.description,
          units,
        },
        units,
      };
    },
    enabled: !!classSlug && !!subjectSlug,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUnit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): UseSuspenseQueryResult<UnitVM, Error> {
  return useSuspenseQuery({
    queryKey: UNIT_KEY(classSlug, subjectSlug, unitId),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) throw new Error(`Subject ${subjectSlug} not found`);
      const unit = getUnitSyllabus(subject, unitId);
      if (!unit) throw new Error(`Unit ${unitId} not found`);
      return {
        id: unit.id,
        title: unit.title,
        topics: unit.topics,
        topicEntries: getUnitTopicEntries(unit),
        ...(typeof unit.hours === "number" ? { hours: unit.hours } : {}),
      } as UnitVM;
    },
    enabled: !!classSlug && !!subjectSlug && !!unitId,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUnitTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): UseSuspenseQueryResult<{ unit: UnitVM; topic: SyllabusTopicEntry }, Error> {
  return useSuspenseQuery({
    queryKey: TOPIC_KEY(classSlug, subjectSlug, unitId, topicSlug),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) throw new Error(`Subject ${subjectSlug} not found`);
      const unit = getUnitSyllabus(subject, unitId);
      if (!unit) throw new Error(`Unit ${unitId} not found`);
      const topic = getTopicEntryBySlug(unit, topicSlug);
      if (!topic) throw new Error(`Topic ${topicSlug} not found`);
      return {
        unit: {
          id: unit.id,
          title: unit.title,
          topics: unit.topics,
          topicEntries: getUnitTopicEntries(unit),
          ...(typeof unit.hours === "number" ? { hours: unit.hours } : {}),
        },
        topic,
      };
    },
    enabled: !!classSlug && !!subjectSlug && !!unitId && !!topicSlug,
    staleTime: 1000 * 60 * 10,
  });
}
