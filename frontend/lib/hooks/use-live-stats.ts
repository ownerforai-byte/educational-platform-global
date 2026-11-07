"use client";

/**
 * The single source of truth for scoring / overall statistics.
 *
 * Every screen that shows accuracy, attempts, completion or a progress
 * percentage reads from here instead of shipping a sample array. Data comes
 * from the real quiz-history and progress endpoints; when the student has not
 * done anything yet, the derived values are genuinely zero and the UI shows
 * an honest empty state rather than invented numbers.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuizHistory, type QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import { getProgress } from "@/lib/api/progress";
import {
  accuracyBySubject,
  accuracyByTopic,
  completionByUnit,
  overallAccuracy,
  weeklyTrend,
  type AccuracyBucket,
  type UnitCompletion,
  type WeekPoint,
} from "@/lib/analytics";
import type { ProgressEntry } from "@/types/api";

/** Broadcast after a real event (quiz scored, topic completed) to refresh all live views. */
export const LIVE_STATS_EVENT = "ravikisan:live-stats-changed";

export function notifyLiveStatsChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LIVE_STATS_EVENT));
  }
}

interface RawStats {
  loading: boolean;
  quizRows: QuizHistoryRow[];
  progressEntries: ProgressEntry[];
}

const EMPTY_RAW: RawStats = { loading: true, quizRows: [], progressEntries: [] };

export interface SubjectProgress {
  completedUnits: number;
  totalUnits: number;
  completedTopics: number;
  totalTopics: number;
  percent: number;
}

export interface LiveStats extends RawStats {
  overall: { quizzes: number; answered: number; accuracy: number };
  topicAccuracy: AccuracyBucket[];
  subjectAccuracy: AccuracyBucket[];
  unitCompletion: UnitCompletion[];
  trend: WeekPoint[];
  /** Keyed by `${classSlug}/${subjectSlug}` — live per-subject completion. */
  subjectProgress: Record<string, SubjectProgress>;
  /** Completed topics / all syllabus topics — 0 when nothing is done. */
  overallProgressPercent: number;
  completedTopics: number;
  totalTopics: number;
}

export function useLiveStats(): LiveStats {
  const [raw, setRaw] = useState<RawStats>(EMPTY_RAW);

  const load = useCallback(async () => {
    // A signed-out visitor has no history: both calls may reject. That is a
    // real, empty result — never a reason to fall back to sample data.
    const [quiz, progress] = await Promise.allSettled([
      getQuizHistory(100),
      getProgress(),
    ]);
    setRaw({
      loading: false,
      quizRows: quiz.status === "fulfilled" ? (quiz.value?.rows ?? []) : [],
      progressEntries: progress.status === "fulfilled" ? (progress.value ?? []) : [],
    });
  }, []);

  useEffect(() => {
    void load();
    const refresh = () => void load();
    window.addEventListener("focus", refresh);
    window.addEventListener(LIVE_STATS_EVENT, refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener(LIVE_STATS_EVENT, refresh);
    };
  }, [load]);

  return useMemo(() => {
    const { quizRows, progressEntries } = raw;
    const completedTopics = progressEntries.filter(
      (e) => e.completed || e.status === "completed",
    ).length;

    // Group the real journey by subject and unit so /subjects can show real
    // "N/M chapters" and a real completion ring instead of literal zeros.
    const grouped = new Map<string, Map<string, { total: number; done: number }>>();
    for (const e of progressEntries) {
      const parts = e.topicId.split("/");
      const classSlug = e.classSlug ?? parts[0];
      const subjectSlug = e.subjectSlug ?? parts[1];
      const unitSlug = e.unitSlug ?? parts[2];
      if (!classSlug || !subjectSlug || !unitSlug) continue;
      const key = `${classSlug}/${subjectSlug}`;
      let units = grouped.get(key);
      if (!units) {
        units = new Map();
        grouped.set(key, units);
      }
      const bucket = units.get(unitSlug) ?? { total: 0, done: 0 };
      bucket.total += 1;
      if (e.completed || e.status === "completed") bucket.done += 1;
      units.set(unitSlug, bucket);
    }
    const subjectProgress: Record<string, SubjectProgress> = {};
    for (const [key, units] of grouped) {
      let completedUnits = 0;
      let totalTopics = 0;
      let done = 0;
      for (const u of units.values()) {
        totalTopics += u.total;
        done += u.done;
        if (u.total > 0 && u.done === u.total) completedUnits += 1;
      }
      subjectProgress[key] = {
        completedUnits,
        totalUnits: units.size,
        completedTopics: done,
        totalTopics,
        percent: totalTopics > 0 ? Math.round((done / totalTopics) * 100) : 0,
      };
    }

    return {
      ...raw,
      overall: overallAccuracy(quizRows),
      topicAccuracy: accuracyByTopic(quizRows),
      subjectAccuracy: accuracyBySubject(quizRows),
      unitCompletion: completionByUnit(progressEntries),
      trend: weeklyTrend(quizRows, progressEntries),
      subjectProgress,
      overallProgressPercent:
        progressEntries.length > 0
          ? Math.round((completedTopics / progressEntries.length) * 100)
          : 0,
      completedTopics,
      totalTopics: progressEntries.length,
    };
  }, [raw]);
}
