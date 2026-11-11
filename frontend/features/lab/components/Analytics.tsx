"use client";

/**
 * Live quiz analytics. Every number here is aggregated from the student's
 * real quiz history via `useLiveStats` / `lib/analytics.ts`. The old version
 * rendered a hardcoded ANALYTICS_DATA array, so "Overall Accuracy", attempts
 * and per-topic percentages were invented numbers that never changed.
 */

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLiveStats } from "@/lib/hooks/use-live-stats";

type SortKey = "topic" | "accuracy" | "attempts";
type Band = "Strong" | "Building" | "Needs work";

interface TopicRow {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number;
  band: Band;
}

const BAND_CLASSES: Record<Band, string> = {
  Strong: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Building: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Needs work": "bg-red-500/10 text-red-600 dark:text-red-400",
};

function bandFor(accuracy: number): Band {
  if (accuracy >= 80) return "Strong";
  if (accuracy >= 60) return "Building";
  return "Needs work";
}

function accuracyClass(accuracy: number): string {
  return BAND_CLASSES[bandFor(accuracy)];
}

export function Analytics() {
  const [sortBy, setSortBy] = useState<SortKey>("accuracy");
  const { loading, topicAccuracy, overall } = useLiveStats();

  const rows: TopicRow[] = useMemo(
    () =>
      topicAccuracy.map((b) => ({
        topic: b.label,
        attempts: b.answered,
        correct: b.correct,
        accuracy: b.accuracy,
        band: bandFor(b.accuracy),
      })),
    [topicAccuracy],
  );

  const sortedData = useMemo(
    () =>
      [...rows].sort((a, b) => {
        if (sortBy === "topic") return a.topic.localeCompare(b.topic);
        if (sortBy === "attempts") return b.attempts - a.attempts;
        return b.accuracy - a.accuracy;
      }),
    [rows, sortBy],
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {loading ? "Loading your real results…" : "Live results from your quiz history"}
        </p>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
          <SelectTrigger className="w-[180px]" aria-label="Sort analytics">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accuracy">Sort by Accuracy</SelectItem>
            <SelectItem value="attempts">Sort by Questions</SelectItem>
            <SelectItem value="topic">Sort by Topic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-primary/10 p-4 text-center">
          <div className="text-2xl font-bold text-primary">{overall.accuracy}%</div>
          <div className="text-xs text-muted-foreground">Overall Accuracy</div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-500">{overall.answered}</div>
          <div className="text-xs text-muted-foreground">Questions Answered</div>
        </div>
        <div className="rounded-lg bg-amber-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-amber-500">{overall.quizzes}</div>
          <div className="text-xs text-muted-foreground">Quizzes Taken</div>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No quiz results yet. Your accuracy by topic appears here as soon as you
          complete a quiz — there are no sample scores on this page.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {sortedData.map((data) => (
            <div
              key={data.topic}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{data.topic}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${BAND_CLASSES[data.band]}`}
                >
                  {data.band}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {data.correct}/{data.attempts} correct
                </span>
                <span className={`text-sm font-semibold ${accuracyClass(data.accuracy)}`}>
                  {data.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
