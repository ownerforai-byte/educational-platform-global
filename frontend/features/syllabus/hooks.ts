import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
  type QueryClient,
  type UseQueryResult,
  type UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type ClassSyllabus,
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
        ...(typeof u.introducedIn === "number" ? { introducedIn: u.introducedIn } : {}),
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
        ...(typeof unit.introducedIn === "number" ? { introducedIn: unit.introducedIn } : {}),
      } as UnitVM;
    },
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
          ...(typeof unit.introducedIn === "number" ? { introducedIn: unit.introducedIn } : {}),
        },
        topic,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass, 2026-09-27): prefetch + invalidation helpers.
 *
 * The hooks above are untouched. These helpers reuse the exact query keys
 * declared at the top of this module, so warming a key here means the next
 * mount of the matching hook renders straight from cache instead of starting
 * a request waterfall.
 * ------------------------------------------------------------------ */

/** Mirrors the 10-minute stale window used by the hooks above. */
const SYLLABUS_STALE_MS = 1000 * 60 * 10;

/**
 * Warms the class-syllabus query for a given client. Safe to call from an
 * idle callback or a hover handler — React Query already swallows prefetch
 * failures, and this returns `void`-like `Promise<void>`.
 */
export function prefetchSyllabusByClass(
  queryClient: QueryClient,
  classSlug: string,
): Promise<void> {
  if (!classSlug) return Promise.resolve();
  return queryClient
    .prefetchQuery({
      queryKey: [...SYLLABUS_KEY, classSlug],
      queryFn: () => getSyllabusByClass(classSlug),
      staleTime: SYLLABUS_STALE_MS,
    })
    .then(() => undefined);
}

/** Invalidates all syllabus queries, or just one class when `classSlug` is given. */
export function invalidateSyllabus(
  queryClient: QueryClient,
  classSlug?: string,
): Promise<void> {
  return queryClient.invalidateQueries({
    queryKey: classSlug ? [...SYLLABUS_KEY, classSlug] : [...SYLLABUS_KEY],
  });
}

/** Synchronous cache read — renders instantly when the key is already warm. */
export function peekSyllabus(
  queryClient: QueryClient,
  classSlug: string,
): ClassSyllabus | undefined {
  return queryClient.getQueryData<ClassSyllabus>([...SYLLABUS_KEY, classSlug]);
}

/**
 * Hook form of the helpers above for client components that want hover/focus
 * prefetching. Returns stable-per-render functions; it performs no fetching on
 * its own, so mounting it changes nothing until one is called.
 */
export function useSyllabusPrefetch(): {
  class: (classSlug: string) => Promise<void>;
  invalidate: (classSlug?: string) => Promise<void>;
  peek: (classSlug: string) => ClassSyllabus | undefined;
} {
  const queryClient = useQueryClient();
  return {
    class: (classSlug: string) => prefetchSyllabusByClass(queryClient, classSlug),
    invalidate: (classSlug?: string) => invalidateSyllabus(queryClient, classSlug),
    peek: (classSlug: string) => peekSyllabus(queryClient, classSlug),
  };
}

