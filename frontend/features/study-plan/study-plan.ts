/**
 * Weekly study plan generator (pure). Inputs are the goals record
 * (study-goals), today's date and the weak-topic list derived from the
 * existing progress journey. No storage, no server write.
 */

import { daysUntilExam, listGoalSubjects, type StudyGoals } from "./study-goals";
import { entryStatus } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

export interface WeakTopic {
  subjectKey: string;
  title: string;
  href: string | null;
  /** in_progress topics are tackled before untouched ones. */
  status: "in_progress" | "not_started";
}

export interface PlanBlock {
  subjectKey: string;
  subjectName: string;
  minutes: number;
  focus: WeakTopic | null;
}

export interface PlanDay {
  date: string;
  daysToExam: number | null;
  /** Revision-only day right before the exam. */
  revision: boolean;
  blocks: PlanBlock[];
}

function iso(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Topics the student has not finished, in-progress first, in curriculum order. */
export function weakTopicsFromJourney(entries: ProgressEntry[]): WeakTopic[] {
  const out: WeakTopic[] = [];
  for (const e of entries) {
    const status = entryStatus(e);
    if (status === "completed") continue;
    if (!e.classSlug || !e.subjectSlug) continue;
    const title = e.topic?.title ?? e.topicSlug ?? "";
    if (!title) continue;
    const href =
      e.unitSlug && e.topicSlug && (e.classSlug === "class-11-notes" || e.classSlug === "class-12-notes")
        ? `/${e.classSlug}/${e.subjectSlug}/chapters/${e.unitSlug}/topics/${e.topicSlug}`
        : null;
    out.push({ subjectKey: `${e.classSlug}/${e.subjectSlug}`, title, href, status });
  }
  return [...out.filter((t) => t.status === "in_progress"), ...out.filter((t) => t.status === "not_started")];
}

/**
 * Up to 7 days starting `today`, ending on the exam day when it is closer.
 * Each day splits goals.dailyMinutes across the chosen subjects and hands each
 * block the next weak topic of that subject (rotating, never repeating within
 * the week while topics remain). The day before the exam is revision-only.
 */
export function buildWeeklyPlan(goals: StudyGoals, weak: WeakTopic[], today: Date = new Date()): PlanDay[] {
  if (goals.subjects.length === 0) return [];
  const left = daysUntilExam(goals, today);
  if (left !== null && left < 0) return [];
  const length = left === null ? 7 : Math.min(7, left + 1);
  const names = new Map(listGoalSubjects().map((s) => [s.key, s.subjectName]));
  const each = Math.max(5, Math.floor(goals.dailyMinutes / goals.subjects.length));
  const queues = new Map(goals.subjects.map((k) => [k, weak.filter((t) => t.subjectKey === k)]));
  const days: PlanDay[] = [];
  for (let i = 0; i < length; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const daysToExam = left === null ? null : left - i;
    const revision = daysToExam === 1 || daysToExam === 0;
    const blocks = goals.subjects.map((key): PlanBlock => {
      const queue = queues.get(key) ?? [];
      return {
        subjectKey: key,
        subjectName: names.get(key) ?? key,
        minutes: each,
        focus: revision || queue.length === 0 ? null : queue[i % queue.length],
      };
    });
    days.push({ date: iso(d), daysToExam, revision, blocks });
  }
  return days;
}
