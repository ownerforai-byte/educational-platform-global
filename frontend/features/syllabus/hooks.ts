"use client";

import { useMemo } from "react";
import {
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type ClassSyllabus,
  type SyllabusTopicEntry,
} from "@/lib/core/syllabus";
import type { UnitVM, SubjectNavVM } from "./types";

/**
 * Syllabus hooks — local syllabus.ts reads only (no react-query).
 * The curriculum is bundled; caching is unnecessary beyond React render memo.
 */

export function useSyllabusByClass(classSlug: string): ClassSyllabus | undefined {
  return useMemo(
    () => (classSlug ? getSyllabusByClass(classSlug) : undefined),
    [classSlug],
  );
}

export function useSubjectNav(
  classSlug: string,
  subjectSlug: string,
): { subject: SubjectNavVM; units: UnitVM[] } {
  return useMemo(() => {
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
  }, [classSlug, subjectSlug]);
}

export function useUnit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): UnitVM {
  return useMemo(() => {
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
  }, [classSlug, subjectSlug, unitId]);
}

export function useUnitTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): { unit: UnitVM; topic: SyllabusTopicEntry } {
  return useMemo(() => {
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
  }, [classSlug, subjectSlug, unitId, topicSlug]);
}

export function prefetchSyllabusByClass(_classSlug: string): Promise<void> {
  return Promise.resolve();
}

export function invalidateSyllabus(_classSlug?: string): Promise<void> {
  return Promise.resolve();
}

export function peekSyllabus(classSlug: string): ClassSyllabus | undefined {
  return classSlug ? getSyllabusByClass(classSlug) : undefined;
}

export function useSyllabusPrefetch(): {
  class: (classSlug: string) => Promise<void>;
  invalidate: (classSlug?: string) => Promise<void>;
  peek: (classSlug: string) => ClassSyllabus | undefined;
} {
  return {
    class: (classSlug: string) => prefetchSyllabusByClass(classSlug),
    invalidate: (classSlug?: string) => invalidateSyllabus(classSlug),
    peek: (classSlug: string) => peekSyllabus(classSlug),
  };
}
