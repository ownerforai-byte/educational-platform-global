"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle, Circle, Clock, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProgress, updateProgress } from "@/lib/api/progress";
import {
  entryStatus,
  groupJourney,
  summarizeJourney,
} from "@/lib/progress/catalog";
import type { ProgressEntry, ProgressStatus } from "@/types/api";

export interface ProgressPanelProps {
  onProgressLoaded?: (entries: ProgressEntry[]) => void;
  onProgressChange?: (entries: ProgressEntry[]) => void;
}

type StatusFilter = "started" | "not_started" | "completed" | "all";

const STATUS_FILTERS: Array<{ value: StatusFilter; label: string }> = [
  { value: "started", label: "Started" },
  { value: "not_started", label: "Not started" },
  { value: "completed", label: "Completed" },
  { value: "all", label: "All" },
];

/** Bound the DOM when a filter matches hundreds of syllabus topics. */
const ROWS_PER_GROUP = 30;

const STATUS_BADGE: Record<ProgressStatus, { label: string; className: string }> = {
  completed: {
    label: "Completed",
    className: "bg-primary/10 text-primary",
  },
  in_progress: {
    label: "In progress",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  not_started: {
    label: "Not started",
    className: "bg-muted text-muted-foreground",
  },
};

function matchesFilters(
  entry: ProgressEntry,
  statusFilter: StatusFilter,
  subjectKey: string
): boolean {
  const status = entryStatus(entry);
  const byStatus =
    statusFilter === "all" ||
    (statusFilter === "started" && status !== "not_started") ||
    statusFilter === status;
  if (!byStatus) return false;
  if (subjectKey === "all") return true;
  return `${entry.classSlug ?? "syllabus"}/${entry.subjectSlug ?? "general"}` === subjectKey;
}

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString();
}

/**
 * Shared learning-progress panel (journey ring + subject breakdown + filters
 * + topic list). Used by the /progress page and embedded as the default tab of
 * /profile.
 *
 * Data: `getProgress()` returns every syllabus topic with this user's status
 * on it — tracked rows merged into the full catalogue — so a student who has
 * not started yet still sees their whole journey ahead of them instead of an
 * empty page. Opening a topic elsewhere in the app writes a row; toggling here
 * writes the same row.
 */
export function ProgressPanel({ onProgressLoaded, onProgressChange }: ProgressPanelProps = {}) {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("started");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  // Parent callbacks live in a ref: an inline arrow from the parent must not
  // re-trigger the load (that is what used to leave this panel stuck spinning).
  const callbacks = useRef({ onProgressLoaded, onProgressChange });
  useEffect(() => {
    callbacks.current = { onProgressLoaded, onProgressChange };
  });

  useEffect(() => {
    let cancelled = false;

    const loadProgress = async () => {
      try {
        const data = await getProgress();
        if (cancelled) return;
        setProgress(data);
        callbacks.current.onProgressLoaded?.(data);
        callbacks.current.onProgressChange?.(data);
      } catch (err) {
        if (cancelled) return;
        const failure = err as { status?: number; code?: string };
        if (failure.status === 401 || failure.code === "UNAUTHORIZED") {
          setNeedsSignIn(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load progress");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadProgress();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleProgress = async (topicId: string, completed: boolean) => {
    try {
      await updateProgress({ topic_id: topicId, completed });
      setProgress((prev) => {
        const next = prev.map((p) =>
          p.topicId === topicId
            ? {
                ...p,
                completed,
                status: completed ? ("completed" as const) : ("in_progress" as const),
                completedAt: completed
                  ? (p.completedAt ?? new Date().toISOString())
                  : null,
                lastViewedAt: new Date().toISOString(),
              }
            : p
        );
        callbacks.current.onProgressChange?.(next);
        return next;
      });
    } catch {
      setError("Failed to update progress");
    }
  };

  const summary = useMemo(() => summarizeJourney(progress), [progress]);
  const subjectGroups = useMemo(() => groupJourney(progress), [progress]);
  const visibleGroups = useMemo(() => {
    const filtered = progress.filter((entry) =>
      matchesFilters(entry, statusFilter, subjectFilter)
    );
    return groupJourney(filtered).map((group) => ({
      ...group,
      shown: group.entries.slice(0, ROWS_PER_GROUP),
      hidden: Math.max(0, group.entries.length - ROWS_PER_GROUP),
    }));
  }, [progress, statusFilter, subjectFilter]);

  const visibleCount = visibleGroups.reduce((n, g) => n + g.entries.length, 0);

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

  if (needsSignIn) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <LogIn className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold">Sign in to track your journey</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Progress is stored per account — sign in and every topic you open
            from then on is recorded here automatically.
          </p>
          <Link
            href="/login?next=/progress"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Journey summary ring */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-6">
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
                  strokeDasharray={`${summary.percent}, 100`}
                />
              </svg>
              <span className="absolute text-sm font-bold">{summary.percent}%</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Syllabus journey</p>
              <p className="text-2xl font-bold">
                {summary.completed} / {summary.total} completed
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                  {summary.completed} completed
                </span>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                  {summary.inProgress} in progress
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                  {summary.notStarted} not started
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-subject coverage — the journey at a glance */}
      {subjectGroups.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjectGroups.map((group) => {
            const pct = group.total > 0 ? Math.round((group.completed / group.total) * 100) : 0;
            const active = subjectFilter === group.key;
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setSubjectFilter(active ? "all" : group.key)}
                aria-pressed={active}
                className={`rounded-xl border p-3 text-left transition-colors hover:border-primary/50 ${
                  active ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{group.subjectName}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {group.completed}/{group.total}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{group.className}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Status + subject filters */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            aria-pressed={statusFilter === filter.value}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === filter.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            {filter.label}
          </button>
        ))}
        {subjectFilter !== "all" && (
          <button
            type="button"
            onClick={() => setSubjectFilter("all")}
            className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Clear subject ✕
          </button>
        )}
      </div>

      {progress.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h2 className="text-lg font-semibold">No progress yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start learning to track your progress here.
            </p>
          </CardContent>
        </Card>
      ) : visibleCount === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Circle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h2 className="text-lg font-semibold">Nothing here yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              No topics match this filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setSubjectFilter("all");
              }}
              className="mt-4 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:border-primary/50"
            >
              Show all topics
            </button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {visibleGroups.map((group) => (
            <div key={group.key} className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold">
                  {group.subjectName}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {group.className}
                  </span>
                </h2>
                <span className="text-xs text-muted-foreground">
                  {group.completed} completed · {group.inProgress} in progress ·{" "}
                  {group.total} topics
                </span>
              </div>

              <div className="space-y-3">
                {group.shown.map((item) => {
                  const status = entryStatus(item);
                  const badge = STATUS_BADGE[status];
                  const lastOpened = formatDate(item.lastViewedAt);
                  const doneOn = formatDate(item.completedAt);

                  return (
                    <Card key={item.id}>
                      <CardContent className="flex items-center justify-between gap-3 p-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <button
                            onClick={() => toggleProgress(item.topicId, status !== "completed")}
                            aria-label={
                              status === "completed"
                                ? "Mark topic incomplete"
                                : "Mark topic complete"
                            }
                            className={`h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                              status === "completed"
                                ? "border-primary bg-primary text-primary-foreground"
                                : status === "in_progress"
                                  ? "border-amber-500 text-amber-500"
                                  : "border-muted-foreground/30 hover:border-primary"
                            }`}
                          >
                            {status === "completed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : status === "in_progress" ? (
                              <Clock className="h-3.5 w-3.5" />
                            ) : null}
                          </button>

                          <div className="min-w-0">
                            <p className="font-medium truncate">
                              {item.topic?.title || item.topicSlug || item.topicId}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {[
                                item.topic?.chapter?.subject?.name,
                                item.topic?.chapter?.title,
                              ]
                                .filter(Boolean)
                                .join(" · ") || "Syllabus topic"}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {doneOn
                              ? `Done ${doneOn}`
                              : lastOpened
                                ? `Opened ${lastOpened}${
                                    item.viewCount && item.viewCount > 1
                                      ? ` · ×${item.viewCount}`
                                      : ""
                                  }`
                                : "\u00A0"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {group.hidden > 0 && (
                  <p className="px-1 text-xs text-muted-foreground">
                    +{group.hidden} more topics in {group.subjectName} — pick the
                    subject card above to see them all.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
