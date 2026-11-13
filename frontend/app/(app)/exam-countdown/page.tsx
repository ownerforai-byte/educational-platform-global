"use client";

/**
 * /exam-countdown — NEB exam countdown + revision plans.
 *
 * Rebuilt 2026-11-09 per plan-pro-app.md verdict #10 (poor → rebuild):
 * - Dates are stored as AD ISO dates directly. The old page converted
 *   Bikram Sambat with a `year − 57` approximation, which drifts because BS
 *   month lengths vary; the BS label is kept for display only.
 * - The exam calendar lives in ONE config with a dated owner reminder —
 *   when every date has passed the page says so honestly instead of
 *   showing "0 days left" forever.
 * - Progress comes from the real journey API (`getProgress()`), not the
 *   orphaned `neb-progress` localStorage key that nothing in the codebase
 *   wrote — the old page's coverage was permanently 0% for every student.
 * - Subject identity comes from `lib/ui/subject-visuals.ts` tokens; no
 *   ad-hoc hex color maps (finding CC-1).
 * - Study plans no longer assume a fake 999-day horizon when no exam date
 *   exists; they say so and pace over four weeks.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  Target,
  CheckCircle2,
  Circle,
  TrendingUp,
  FileText,
  FlaskConical,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SYLLABUS, slugifySyllabusTopic, type SubjectSyllabus } from "@/lib/core/syllabus";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { getProgress } from "@/lib/api/progress";
import type { ProgressEntry } from "@/types/api";

// ── Exam calendar (owner-maintained) ───────────────────────────────────────
// AD date is the countdown source of truth; `bs` is the Nepali label shown to
// students. OWNER: update both each year when NEB publishes the new calendar
// (last updated 2026-11-09; the AD values below are the equivalents the old
// BS conversion produced — replace with the officially published dates).
const EXAM_CALENDAR: Record<string, { ad: string; bs: string }> = {
  physics:     { ad: "2025-05-01", bs: "2082-05-01" },
  chemistry:   { ad: "2025-05-03", bs: "2082-05-03" },
  mathematics: { ad: "2025-05-05", bs: "2082-05-05" },
  biology:     { ad: "2025-05-07", bs: "2082-05-07" },
  english:     { ad: "2025-04-28", bs: "2082-04-28" },
  nepali:      { ad: "2025-04-30", bs: "2082-04-30" },
};

function daysUntil(adIso: string): number {
  const target = new Date(`${adIso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

function formatDate(adIso: string): string {
  return new Date(`${adIso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** True when every configured exam date is already in the past. */
function calendarStale(subjects: SubjectSyllabus[]): boolean {
  const dates = subjects
    .map((s) => EXAM_CALENDAR[s.slug]?.ad)
    .filter((d): d is string => Boolean(d));
  return dates.length > 0 && dates.every((d) => daysUntil(d) < 0);
}

// ── Countdown chip ─────────────────────────────────────────────────────────
function CountdownChip({ subjectSlug }: { subjectSlug: string }) {
  const entry = EXAM_CALENDAR[subjectSlug];
  if (!entry) {
    return (
      <div className="flex flex-col items-end rounded-xl px-3 py-1.5 bg-muted/40">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          date to be announced
        </span>
      </div>
    );
  }
  const days = daysUntil(entry.ad);
  return (
    <div className="flex flex-col items-end rounded-xl px-3 py-1.5 bg-primary/10">
      {days > 0 ? (
        <>
          <span className="text-xl font-bold tabular-nums text-primary">{days}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">days left</span>
        </>
      ) : days === 0 ? (
        <span className="text-sm font-bold text-primary">Today!</span>
      ) : (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {formatDate(entry.ad)} — passed
        </span>
      )}
    </div>
  );
}

// ── Subject countdown card ─────────────────────────────────────────────────
function CountdownCard({
  subject,
  classSlug,
  completedTopics,
}: {
  subject: SubjectSyllabus;
  classSlug: string;
  /** Slugs of topics the student has completed, from the real journey. */
  completedTopics: Set<string>;
}) {
  const entry = EXAM_CALENDAR[subject.slug];
  const visual = getSubjectVisual(subject.slug);
  const totalTopics = subject.units.reduce((sum, u) => sum + u.topics.length, 0);
  const completedCount = subject.units.reduce(
    (sum, unit) =>
      sum +
      unit.topics.filter((t) =>
        completedTopics.has(`${classSlug}/${subject.slug}/${unit.id}/${slugifySyllabusTopic(t)}`),
      ).length,
    0,
  );
  const pct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 ${visual.text.replace("text-", "bg-")}`} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="shrink-0 text-2xl leading-none">{visual.glyph}</span>
            <div>
              <CardTitle className="text-base font-semibold">{subject.name}</CardTitle>
              <CardDescription className="text-xs">
                {entry ? `Exam ${formatDate(entry.ad)} (${entry.bs} BS)` : "Exam date to be announced"}
              </CardDescription>
            </div>
          </div>
          <CountdownChip subjectSlug={subject.slug} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Syllabus coverage</span>
            <span className="font-semibold text-foreground">
              {completedCount}/{totalTopics} ({pct}%)
            </span>
          </div>
          <Progress value={pct} className="h-2" aria-label={`${subject.name} coverage ${pct}%`} />
        </div>

        {/* Unit breakdown */}
        <div className="space-y-1.5">
          {subject.units.map((unit) => {
            const unitDone = unit.topics.filter((t) =>
              completedTopics.has(`${classSlug}/${subject.slug}/${unit.id}/${slugifySyllabusTopic(t)}`),
            ).length;
            const unitPct = unit.topics.length > 0 ? Math.round((unitDone / unit.topics.length) * 100) : 0;
            return (
              <div key={unit.id} className="flex items-center gap-2 text-xs">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-muted-foreground truncate">{unit.title}</span>
                    <span className="text-muted-foreground tabular-nums ml-1">{unitPct}%</span>
                  </div>
                  <Progress value={unitPct} className="h-1.5" aria-label={`${unit.title} ${unitPct}%`} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Study plan card ────────────────────────────────────────────────────────
function StudyPlanCard({
  subject,
  classSlug,
  daysLeft,
  hasExamDate,
  completedTopics,
}: {
  subject: SubjectSyllabus;
  classSlug: string;
  daysLeft: number;
  hasExamDate: boolean;
  completedTopics: Set<string>;
}) {
  const remainingTopics = subject.units.flatMap((unit) =>
    unit.topics.filter(
      (t) => !completedTopics.has(`${classSlug}/${subject.slug}/${unit.id}/${slugifySyllabusTopic(t)}`),
    ),
  );
  const topicsPerDay = Math.ceil(remainingTopics.length / daysLeft);

  if (remainingTopics.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">All topics covered for {subject.name}!</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Focus on revision and past papers.</p>
        </CardContent>
      </Card>
    );
  }

  const weekCount = Math.max(1, Math.ceil(remainingTopics.length / (topicsPerDay * 7)));
  const weekGroups: Array<{ label: string; topics: string[] }> = [];
  for (let w = 0; w < weekCount; w++) {
    const start = w * topicsPerDay * 7;
    const weekTopics = remainingTopics.slice(start, start + topicsPerDay * 7);
    if (weekTopics.length > 0) {
      weekGroups.push({ label: `Week ${w + 1}`, topics: weekTopics });
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Study Plan — {subject.name}
        </CardTitle>
        <CardDescription>
          {remainingTopics.length} topics remaining · ~{topicsPerDay} topics/day over{" "}
          {weekCount} week{weekCount > 1 ? "s" : ""}
          {!hasExamDate && " (no exam date published — paced over four weeks)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {weekGroups.map((week) => (
          <div key={week.label} className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {week.label} — {week.topics.length} topics
            </p>
            <ul className="space-y-1">
              {week.topics.slice(0, 8).map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-xs text-foreground">
                  <Circle className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="truncate">{topic}</span>
                </li>
              ))}
              {week.topics.length > 8 && (
                <li className="text-xs text-muted-foreground italic">
                  +{week.topics.length - 8} more topics…
                </li>
              )}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
const CLASS_FILTERS = ["class-11-notes", "class-12-notes"] as const;

export default function ExamCountdownPage() {
  const [classSlug, setClassSlug] = useState<(typeof CLASS_FILTERS)[number]>("class-11-notes");
  const [entries, setEntries] = useState<ProgressEntry[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    getProgress()
      .then((rows) => {
        if (alive) setEntries(rows);
      })
      .catch(() => {
        if (alive) setLoadFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const classData = useMemo(
    () => SYLLABUS.find((c) => c.slug === classSlug),
    [classSlug],
  );

  // Completed topic ids from the real journey — the single progress source.
  const completedTopics = useMemo(() => {
    const set = new Set<string>();
    for (const e of entries ?? []) {
      if (e.completed) set.add(e.topicId);
    }
    return set;
  }, [entries]);

  // Global minimum days across subjects that have upcoming exam dates; null
  // when the calendar is missing or entirely in the past (shown honestly).
  const globalDays = useMemo(() => {
    if (!classData) return null;
    const days = classData.subjects
      .map((s) => EXAM_CALENDAR[s.slug]?.ad)
      .filter((d): d is string => Boolean(d))
      .map(daysUntil)
      .filter((d) => d >= 0);
    return days.length > 0 ? Math.min(...days) : null;
  }, [classData]);

  const overallPercent = useMemo(() => {
    if (!classData || !entries) return 0;
    let total = 0;
    let done = 0;
    for (const s of classData.subjects) {
      for (const u of s.units) {
        total += u.topics.length;
        done += u.topics.filter((t) =>
          completedTopics.has(`${classSlug}/${s.slug}/${u.id}/${slugifySyllabusTopic(t)}`),
        ).length;
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [classData, classSlug, completedTopics, entries]);

  if (!classData) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Countdown</h1>
        <p className="mt-2 text-muted-foreground">
          Track your NEB exam dates and get a personalized revision plan. Vision: every day on the clock is a day you can spend on exactly the thing that will move the grade.
        </p>
      </div>

      {/* Honest calendar notice when every date has passed */}
      {calendarStale(classData.subjects) && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          The published exam dates for this cycle have passed. The new NEB calendar has not been
          added yet — countdowns will resume once it is published. Revision plans below still work.
        </div>
      )}

      {/* Global summary — only when a real upcoming exam exists */}
      {globalDays !== null && (
        <Card className="overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Next exam in</p>
                  <p className="text-4xl font-bold tabular-nums text-primary">
                    {globalDays} <span className="text-lg text-muted-foreground font-normal">days</span>
                  </p>
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-bold tabular-nums">{classData.subjects.length}</p>
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall progress</p>
                  <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {overallPercent}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Class selector */}
      <div className="flex gap-2" role="group" aria-label="Choose class">
        {CLASS_FILTERS.map((slug) => (
          <Button
            key={slug}
            variant={classSlug === slug ? "default" : "outline"}
            onClick={() => setClassSlug(slug)}
            aria-pressed={classSlug === slug}
            className="rounded-xl"
          >
            {slug === "class-11-notes" ? "Class 11" : "Class 12"}
          </Button>
        ))}
      </div>

      {/* Progress loading / failure states */}
      {entries === null && !loadFailed && (
        <p className="text-sm text-muted-foreground" role="status">
          Loading your progress…
        </p>
      )}
      {loadFailed && (
        <p className="text-sm text-muted-foreground" role="alert">
          Could not load your progress right now — coverage and plans will fill in once it loads.
        </p>
      )}

      {/* Subject cards */}
      {entries !== null && (
        <div className="grid gap-4 md:grid-cols-2">
          {classData.subjects.map((subject) => (
            <CountdownCard
              key={subject.slug}
              subject={subject}
              classSlug={classSlug}
              completedTopics={completedTopics}
            />
          ))}
        </div>
      )}

      {/* Study plans */}
      {entries !== null && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Revision Plan
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {classData.subjects.map((subject) => {
              const ad = EXAM_CALENDAR[subject.slug]?.ad;
              const days = ad ? daysUntil(ad) : null;
              return (
                <StudyPlanCard
                  key={subject.slug}
                  classSlug={classSlug}
                  subject={subject}
                  hasExamDate={days !== null && days > 0}
                  daysLeft={days !== null && days > 0 ? days : 28}
                  completedTopics={completedTopics}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 pt-4">
        <Link href="/practice">
          <Button variant="outline" className="rounded-xl">
            <FileText className="h-4 w-4 mr-2" aria-hidden="true" /> Practice PYQs
          </Button>
        </Link>
        <Link href="/lab">
          <Button variant="outline" className="rounded-xl">
            <FlaskConical className="h-4 w-4 mr-2" aria-hidden="true" /> Interactive Labs
          </Button>
        </Link>
        <Link href="/notes">
          <Button variant="outline" className="rounded-xl">
            <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" /> Review Notes
          </Button>
        </Link>
      </div>
    </div>
  );
}
