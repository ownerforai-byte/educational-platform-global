"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AnalyticsData {
  topic: string;
  attempts: number;
  correct: number;
  avgTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

const ANALYTICS_DATA: AnalyticsData[] = [
  { topic: "3D Geometry", attempts: 15, correct: 12, avgTime: 45, difficulty: "Easy" },
  { topic: "Trigonometry", attempts: 20, correct: 14, avgTime: 60, difficulty: "Medium" },
  { topic: "Calculus", attempts: 10, correct: 6, avgTime: 90, difficulty: "Hard" },
  { topic: "Algebra", attempts: 25, correct: 22, avgTime: 35, difficulty: "Easy" },
  { topic: "Physics Laws", attempts: 18, correct: 16, avgTime: 40, difficulty: "Medium" },
];

type SortKey = "topic" | "accuracy" | "time";

const DIFFICULTY_CLASSES: Record<AnalyticsData["difficulty"], string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const ACCURACY_CLASSES = [
  "text-emerald-600 dark:text-emerald-400",
  "text-amber-600 dark:text-amber-400",
  "text-red-600 dark:text-red-400",
];

function accuracyClass(accuracy: number): string {
  return accuracy >= 80 ? ACCURACY_CLASSES[0] : accuracy >= 60 ? ACCURACY_CLASSES[1] : ACCURACY_CLASSES[2];
}

export function Analytics() {
  const [sortBy, setSortBy] = useState<SortKey>("accuracy");

  const sortedData = useMemo(() => {
    return [...ANALYTICS_DATA].sort((a, b) => {
      if (sortBy === "topic") return a.topic.localeCompare(b.topic);
      if (sortBy === "accuracy") return b.correct / b.attempts - a.correct / a.attempts;
      return a.avgTime - b.avgTime;
    });
  }, [sortBy]);

  const overallAccuracy = Math.round(
    (ANALYTICS_DATA.reduce((acc, d) => acc + d.correct / d.attempts, 0) /
      ANALYTICS_DATA.length) *
      100
  );
  const totalAttempts = ANALYTICS_DATA.reduce((acc, d) => acc + d.attempts, 0);
  const avgTime = Math.round(
    ANALYTICS_DATA.reduce((acc, d) => acc + d.avgTime, 0) / ANALYTICS_DATA.length
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
          <SelectTrigger className="w-[180px]" aria-label="Sort analytics">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accuracy">Sort by Accuracy</SelectItem>
            <SelectItem value="time">Sort by Time</SelectItem>
            <SelectItem value="topic">Sort by Topic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-primary/10 p-4 text-center">
          <div className="text-2xl font-bold text-primary">{overallAccuracy}%</div>
          <div className="text-xs text-muted-foreground">Overall Accuracy</div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-500">{totalAttempts}</div>
          <div className="text-xs text-muted-foreground">Total Attempts</div>
        </div>
        <div className="rounded-lg bg-amber-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-amber-500">{avgTime}s</div>
          <div className="text-xs text-muted-foreground">Avg Time/Question</div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {sortedData.map((data) => {
          const accuracy = Math.round((data.correct / data.attempts) * 100);
          return (
            <div
              key={data.topic}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{data.topic}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${DIFFICULTY_CLASSES[data.difficulty]}`}
                >
                  {data.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{data.attempts} attempts</span>
                <span className="text-xs text-muted-foreground">{data.avgTime}s avg</span>
                <span className={`text-sm font-semibold ${accuracyClass(accuracy)}`}>
                  {accuracy}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
