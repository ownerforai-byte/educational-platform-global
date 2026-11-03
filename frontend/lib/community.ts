/**
 * Community spaces: one study space per class and subject, derived from the
 * curriculum source of truth (syllabus.ts). Pure; no posts are stored, because
 * the platform has no community backend yet.
 */

import { listGoalSubjects, type GoalSubject } from "@/lib/study-goals";

export interface CommunitySpace {
  /** URL id, `<classSlug>-<subjectSlug>`. */
  id: string;
  title: string;
  classSlug: string;
  className: string;
  subjectSlug: string;
  subjectName: string;
  /** Subject page this space belongs to. */
  subjectHref: string;
}

function toSpace(s: GoalSubject): CommunitySpace {
  return {
    id: `${s.classSlug}-${s.subjectSlug}`,
    title: `${s.subjectName} (${s.className})`,
    classSlug: s.classSlug,
    className: s.className,
    subjectSlug: s.subjectSlug,
    subjectName: s.subjectName,
    subjectHref: `/${s.classSlug}/${s.subjectSlug}`,
  };
}

export function listCommunitySpaces(): CommunitySpace[] {
  return listGoalSubjects().map(toSpace);
}

export function getCommunitySpace(id: string): CommunitySpace | undefined {
  return listCommunitySpaces().find((s) => s.id === id);
}

/** Wraps a student's question with its subject so the Veer tutor answers in scope. */
export function buildAskPrompt(question: string, subjectName?: string): string {
  const q = question.trim();
  return subjectName ? `[NEB ${subjectName}] ${q}` : q;
}

export const MAX_QUESTION_LENGTH = 1000;

export function validateQuestion(question: string): string | null {
  const q = question.trim();
  if (q.length < 8) return "Write a little more so the question is clear (at least 8 characters).";
  if (q.length > MAX_QUESTION_LENGTH) return `Keep the question under ${MAX_QUESTION_LENGTH} characters.`;
  return null;
}
