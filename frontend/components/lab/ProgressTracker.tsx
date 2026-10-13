"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TrackedTopic {
  id: string;
  name: string;
  subject: string;
  progress: number;
  completed: boolean;
}

const INITIAL_TOPICS: TrackedTopic[] = [
  { id: "1", name: "3D Geometry Basics", subject: "Math", progress: 75, completed: false },
  { id: "2", name: "Trigonometric Functions", subject: "Math", progress: 45, completed: false },
  { id: "3", name: "Calculus Introduction", subject: "Math", progress: 20, completed: false },
  { id: "4", name: "Newton's Laws", subject: "Physics", progress: 90, completed: true },
  { id: "5", name: "Electromagnetism", subject: "Physics", progress: 30, completed: false },
  { id: "6", name: "Organic Chemistry", subject: "Chemistry", progress: 60, completed: false },
  { id: "7", name: "Periodic Table", subject: "Chemistry", progress: 85, completed: true },
  { id: "8", name: "Molecular Structure", subject: "Chemistry", progress: 10, completed: false },
];

export function ProgressTracker() {
  const [topics, setTopics] = useState<TrackedTopic[]>(INITIAL_TOPICS);
  const [filterSubject, setFilterSubject] = useState("All");
  const subjects = useMemo(
    () => ["All", ...Array.from(new Set(topics.map((t) => t.subject)))],
    [topics]
  );

  const filteredTopics =
    filterSubject === "All" ? topics : topics.filter((t) => t.subject === filterSubject);
  const overallProgress = Math.round(
    topics.reduce((acc, t) => acc + t.progress, 0) / topics.length
  );

  const updateProgress = (id: string, delta: number) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const progress = Math.min(100, Math.max(0, t.progress + delta));
        return { ...t, progress, completed: progress >= 100 };
      })
    );
  };

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
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </div>
      </div>

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
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label={`Decrease progress for ${topic.name}`}
                  onClick={() => updateProgress(topic.id, -10)}
                  className="rounded-md border border-border p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span
                  className={`w-10 text-right text-sm font-semibold ${
                    topic.completed ? "text-emerald-500" : "text-primary"
                  }`}
                >
                  {topic.progress}%
                </span>
                <button
                  type="button"
                  aria-label={`Increase progress for ${topic.name}`}
                  onClick={() => updateProgress(topic.id, 10)}
                  className="rounded-md border border-border p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <Progress
              value={topic.progress}
              accentColor={topic.completed ? "#10b981" : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
