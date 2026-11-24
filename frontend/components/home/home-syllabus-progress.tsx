"use client";

import Link from "next/link";

import { useJourney } from "@/components/study/use-journey";
import { entryStatus, topicHref } from "@/lib/progress/catalog";

/**
 * Sticky syllabus coverage for signed-in tier homes.
 *
 * The journey API (useJourney) is the only source — no local cache. The bar
 * stays unmounted while the request is in flight, failed, or returned no
 * summary, so a guest or an API miss never flashes 0%. Continue appears only
 * for a real in-progress topic.
 *
 * The app header is sticky at z-40 (min-h-14 on lg, a second row on small
 * screens). `.home-syllabus-progress` sits just under that, above page
 * content, and under menus (z-50).
 */
export function HomeSyllabusProgressBar() {
  const { entries, summary, loading, failed } = useJourney();

  if (loading || failed || !summary) return null;

  const next = entries.find((entry) => entryStatus(entry) === "in_progress");

  return (
    <div
      role="region"
      aria-label="Syllabus coverage"
      className="home-syllabus-progress -mx-4 border-b border-border/70 bg-background/95 px-4 py-2 backdrop-blur-md"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-xs font-bold text-foreground">Syllabus</span>
        <div
          role="progressbar"
          aria-label="Syllabus coverage"
          aria-valuenow={summary.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${summary.percent}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-extrabold tabular-nums text-primary">
          {summary.percent}%
        </span>
        {next ? (
          <Link
            href={topicHref(next)}
            className="shrink-0 text-xs font-bold text-primary hover:underline"
          >
            Continue
          </Link>
        ) : null}
      </div>
    </div>
  );
}
