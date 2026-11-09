"use client";

/**
 * Live syllabus progress tracker. The old version shipped a hardcoded
 * INITIAL_TOPICS array (75%, 45%, 90%, ...) and let the student "edit" those
 * fake numbers with +/- buttons. Everything here now comes from the real
 * progress journey through `useLiveStats`.
 */

import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLiveStats } from "@/lib/hooks/use-live-stats";

function titleCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export interface TrackedTopic {
  id: string;
  name: string;
  subject: string;
  progress: number;
  completed: boolean;
}

export function ProgressTracker() {
  const { loading, unitCompletion, overallProgressPercent } = useLiveStats();
  const [filterSubject, setFilterSubject] = useState("All");

  const topics: TrackedTopic[] = useMemo(
    () =>
      unitCompletion.map((u) => {
        const subjectSlug = u.key.split("/")[1] ?? "General";
        return {
          id: u.key,
          name: u.label,
          subject: titleCase(subjectSlug),
          progress: u.percent,
          completed: u.percent >= 100,
        };
      }),
    [unitCompletion],
  );

  const subjects = useMemo(
    () => ["All", ...Array.from(new Set(topics.map((t) => t.subject)))],
    [topics],
  );

  const filteredTopics =
    filterSubject === "All" ? topics : topics.filter((t) => t.subject === filterSubject);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-[180px]" aria-label="Filter by subject">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{overallProgressPercent}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </div>
      </div>

      {topics.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          {loading
            ? "Loading your real progress…"
            : "No topics studied yet. Progress appears here as you work through the syllabus — no sample percentages are shown."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className={`rounded-lg border p-4 ${
                topic.completed ? "border-emerald-500/30" : "border-border"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-semibold">{topic.name}</span>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    {topic.subject}
                  </span>
                </div>
                <span
                  className={`w-10 text-right text-sm font-semibold ${
                    topic.completed ? "text-emerald-500" : "text-primary"
                  }`}
                >
                  {topic.progress}%
                </span>
              </div>
              <Progress
                value={topic.progress}
                accentColor={topic.completed ? "#10b981" : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
