import { useQuery, type UseQueryResult } from "@tanstack/react-query";
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

export function useSyllabusByClass(classSlug: string): UseQueryResult<typeof getSyllabusByClass(classSlug), Error> {
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
): UseQueryResult<{ subject: SubjectNavVM | null; units: UnitVM[] }, Error> {
  return useQuery({
    queryKey: SUBJECT_NAV_KEY(classSlug, subjectSlug),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) return { subject: null, units: [] };
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
): UseQueryResult<UnitVM | null, Error> {
  return useQuery({
    queryKey: UNIT_KEY(classSlug, subjectSlug, unitId),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) return null;
      const unit = getUnitSyllabus(subject, unitId);
      if (!unit) return null;
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
): UseQueryResult<{ unit: UnitVM; topic: SyllabusTopicEntry } | null, Error> {
  return useQuery({
    queryKey: TOPIC_KEY(classSlug, subjectSlug, unitId, topicSlug),
    queryFn: () => {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) return null;
      const unit = getUnitSyllabus(subject, unitId);
      if (!unit) return null;
      const topic = getTopicEntryBySlug(unit, topicSlug);
      if (!topic) return null;
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
