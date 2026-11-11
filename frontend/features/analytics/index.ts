/**
 * Performance analytics: pure aggregation over data the platform already
 * records (AI quiz history rows and the progress journey). No writes.
 */

import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import type { ProgressEntry } from "@/types/api";

export interface AccuracyBucket {
  key: string;
  label: string;
  quizzes: number;
  answered: number;
  correct: number;
  /** Correct share of answered, 0-100 (rounded). */
  accuracy: number;
}

export interface WeekPoint {
  /** ISO date (YYYY-MM-DD) of the Monday that starts the week. */
  week: string;
  quizzes: number;
  answered: number;
  accuracy: number;
  topicsCompleted: number;
}

function pct(correct: number, answered: number): number {
  return answered > 0 ? Math.round((correct / answered) * 100) : 0;
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function bucketize(
  rows: QuizHistoryRow[],
  keyOf: (r: QuizHistoryRow) => { key: string; label: string } | null,
): AccuracyBucket[] {
  const map = new Map<string, AccuracyBucket>();
  for (const row of rows) {
    if (!row.answered || row.answered < 0) continue;
    const k = keyOf(row);
    if (!k) continue;
    const b = map.get(k.key) ?? { ...k, quizzes: 0, answered: 0, correct: 0, accuracy: 0 };
    b.quizzes += 1;
    b.answered += row.answered;
    b.correct += Math.min(row.correct, row.answered);
    map.set(k.key, b);
  }
  return [...map.values()]
    .map((b) => ({ ...b, accuracy: pct(b.correct, b.answered) }))
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered);
}

/** Accuracy per subject, weakest first. */
export function accuracyBySubject(rows: QuizHistoryRow[]): AccuracyBucket[] {
  return bucketize(rows, (r) =>
    r.subjectSlug ? { key: r.subjectSlug, label: titleCase(r.subjectSlug) } : null,
  );
}

/** Accuracy per quiz topic (free text on the row), weakest first. */
export function accuracyByTopic(rows: QuizHistoryRow[]): AccuracyBucket[] {
  return bucketize(rows, (r) => {
    const t = r.topic?.trim();
    return t ? { key: t.toLowerCase(), label: t } : null;
  });
}

export interface UnitCompletion {
  key: string;
  label: string;
  total: number;
  completed: number;
  percent: number;
}

/** Journey completion per unit (topic-level accuracy is not recorded for the journey). */
export function completionByUnit(entries: ProgressEntry[]): UnitCompletion[] {
  const map = new Map<string, UnitCompletion>();
  for (const e of entries) {
    if (!e.classSlug || !e.subjectSlug || !e.unitSlug) continue;
    const key = `${e.classSlug}/${e.subjectSlug}/${e.unitSlug}`;
    const label = e.topic?.chapter?.title ?? titleCase(e.unitSlug);
    const u = map.get(key) ?? { key, label, total: 0, completed: 0, percent: 0 };
    u.total += 1;
    if (e.completed || e.status === "completed") u.completed += 1;
    map.set(key, u);
  }
  return [...map.values()]
    .map((u) => ({ ...u, percent: pct(u.completed, u.total) }))
    .filter((u) => u.completed > 0 || u.total > 0)
    .sort((a, b) => b.percent - a.percent || a.label.localeCompare(b.label));
}

function weekStart(iso: string): string | null {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return null;
  const d = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()));
  const back = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - back);
  return d.toISOString().slice(0, 10);
}

/** Weekly trend (oldest first) of quizzes taken, accuracy and topics completed. */
export function weeklyTrend(rows: QuizHistoryRow[], entries: ProgressEntry[]): WeekPoint[] {
  const map = new Map<string, WeekPoint & { correct: number }>();
  const get = (week: string) => {
    let p = map.get(week);
    if (!p) {
      p = { week, quizzes: 0, answered: 0, accuracy: 0, topicsCompleted: 0, correct: 0 };
      map.set(week, p);
    }
    return p;
  };
  for (const r of rows) {
    const w = weekStart(r.createdat);
    if (!w || !r.answered) continue;
    const p = get(w);
    p.quizzes += 1;
    p.answered += r.answered;
    p.correct += Math.min(r.correct, r.answered);
  }
  for (const e of entries) {
    if (!e.completedAt) continue;
    const w = weekStart(e.completedAt);
    if (w) get(w).topicsCompleted += 1;
  }
  return [...map.values()]
    .sort((a, b) => a.week.localeCompare(b.week))
    .map(({ correct, ...p }) => ({ ...p, accuracy: pct(correct, p.answered) }));
}

export function overallAccuracy(rows: QuizHistoryRow[]): { quizzes: number; answered: number; accuracy: number } {
  let quizzes = 0;
  let answered = 0;
  let correct = 0;
  for (const r of rows) {
    if (!r.answered) continue;
    quizzes += 1;
    answered += r.answered;
    correct += Math.min(r.correct, r.answered);
  }
  return { quizzes, answered, accuracy: pct(correct, answered) };
}
