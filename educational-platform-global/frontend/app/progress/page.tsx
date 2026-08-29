"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Circle, Loader2, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProgress, updateProgress } from "@/lib/api/progress";

type ProgressWithTopic = {
  id: string;
  topicId: string;
  completed: boolean;
  completedAt?: string | null;
  updatedAt: string;
  topic?: {
    slug: string;
    title: string;
    chapter?: {
      slug: string;
      title: string;
      subject?: {
        slug: string;
        name: string;
        class?: {
          slug: string;
          name: string;
        };
      };
    };
  };
};

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressWithTopic[]>([]);
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
          p.topicId === topicId ? { ...p, completed, completedAt: completed ? new Date().toISOString() : null } : p
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
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          My Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your learning journey across all subjects.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : (
        <>
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
                  <p className="text-2xl font-bold">{completedCount} / {totalCount} completed</p>
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
                    {item.completed && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(item.completedAt!).toLocaleDateString()}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
