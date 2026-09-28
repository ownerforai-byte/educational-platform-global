"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProgress, updateProgress } from "@/lib/api/progress";
import type { ProgressEntry } from "@/types/api";

/**
 * Shared learning-progress panel (ring summary + toggleable topic list).
 * Used by the /progress page and embedded as the default tab of /profile.
 */
export function ProgressPanel() {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getProgress();
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load progress");
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  const toggleProgress = async (topicId: string, completed: boolean) => {
    try {
      await updateProgress({ topic_id: topicId, completed });
      setProgress((prev) =>
        prev.map((p) =>
          p.topicId === topicId
            ? { ...p, completed, completedAt: completed ? new Date().toISOString() : null }
            : p
        )
      );
    } catch {
      setError("Failed to update progress");
    }
  };

  const completedCount = progress.filter((p) => p.completed).length;
  const totalCount = progress.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <svg className="h-20 w-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted-foreground/20"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${percentage}, 100`}
                />
              </svg>
              <span className="absolute text-sm font-bold">{percentage}%</span>
            </div>
            <div>
              <p className="text-sm font-medium">Total Topics</p>
              <p className="text-2xl font-bold">
                {completedCount} / {totalCount} completed
              </p>
              <p className="text-sm text-muted-foreground">Keep going!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {totalCount === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h2 className="text-lg font-semibold">No progress yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start learning to track your progress here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {progress.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggleProgress(item.topicId, !item.completed)}
                    aria-label={
                      item.completed ? "Mark topic incomplete" : "Mark topic complete"
                    }
                    className={`h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 hover:border-primary"
                    }`}
                  >
                    {item.completed && <CheckCircle className="h-4 w-4" />}
                  </button>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.topic?.title || item.topicId}</p>
                    {item.topic?.chapter?.subject && (
                      <p className="text-sm text-muted-foreground">
                        {item.topic.chapter.subject.name}
                        {item.topic.chapter.title && ` · ${item.topic.chapter.title}`}
                      </p>
                    )}
                  </div>
                </div>
                {item.completed && item.completedAt && (
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(item.completedAt).toLocaleDateString()}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
