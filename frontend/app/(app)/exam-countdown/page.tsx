"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar, Clock, BookOpen, Target, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SYLLABUS, type ClassSyllabus, type SubjectSyllabus, type SyllabusUnit } from "@/lib/syllabus";
import Link from "next/link";

// ── NEB exam dates (academic year 2081/82 — update each year) ──────────────
const EXAM_DATE: Record<string, string> = {
  physics: "2082-05-01",
  chemistry: "2082-05-03",
  mathematics: "2082-05-05",
  biology: "2082-05-07",
  english: "2082-04-28",
  nepali: "2082-04-30",
};

const SUBJECT_EMOJI: Record<string, string> = {
  physics: "⚡",
  chemistry: "🧪",
  mathematics: "🔢",
  biology: "🌿",
  english: "📖",
  nepali: "🇳🇵",
};

const SUBJECT_COLOR: Record<string, string> = {
  physics: "#3b82f6",
  chemistry: "#10b981",
  mathematics: "#8b5cf6",
  biology: "#22c55e",
  english: "#f59e0b",
  nepali: "#ef4444",
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Convert BS (Bikram Sambat) date string to JS Date approximation. */
function parseBsDate(bsStr: string): Date {
  // BS is ~57 years ahead of AD. For countdown display we treat BS dates as-is.
  // The numerical difference between BS and AD years is ~56-57.
  const [y, m, d] = bsStr.split("-").map(Number);
  // Approximate: BS year - 57 = AD year
  const adYear = y - 57;
  return new Date(adYear, m - 1, d);
}

function daysUntil(dateStr: string): number {
  const target = parseBsDate(dateStr);
  const today = new Date();
  const diff = Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
  return diff;
}

function getProgressFromLocalStorage(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("neb-progress");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ── Sub-components ──────────────────────────────────────────────────────────

function CountdownCard({
  subject,
  classSlug,
  progress,
}: {
  subject: SubjectSyllabus;
  classSlug: string;
  progress: Record<string, boolean>;
}) {
  const dateStr = EXAM_DATE[subject.slug];
  const days = dateStr ? daysUntil(dateStr) : null;
  const totalTopics = subject.units.reduce((sum, u) => sum + u.topics.length, 0);
  const completedTopics = subject.units.reduce(
    (sum, unit) =>
      sum + unit.topics.filter((t) => progress[`${subject.slug}-${t}`]).length,
    0
  );
  const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const color = SUBJECT_COLOR[subject.slug] ?? "#64748b";
  const emoji = SUBJECT_EMOJI[subject.slug] ?? "📘";

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <div>
              <CardTitle className="text-base font-semibold">{subject.name}</CardTitle>
              <CardDescription className="text-xs">
                {subject.units.length} units · {totalTopics} topics
              </CardDescription>
            </div>
          </div>
          {days !== null && (
            <div
              className="flex flex-col items-end rounded-xl px-3 py-1.5"
              style={{ backgroundColor: `${color}15` }}
            >
              <span className="text-xl font-bold tabular-nums" style={{ color }}>
                {days > 0 ? days : 0}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {days > 0 ? "days left" : days === 0 ? "today!" : "passed"}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Syllabus coverage</span>
            <span className="font-semibold text-foreground">
              {completedTopics}/{totalTopics} ({pct}%)
            </span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        {/* Unit breakdown */}
        <div className="space-y-1.5">
          {subject.units.map((unit) => {
            const unitTotal = unit.topics.length;
            const unitDone = unit.topics.filter((t) => progress[`${subject.slug}-${t}`]).length;
            const unitPct = unitTotal > 0 ? Math.round((unitDone / unitTotal) * 100) : 0;
            return (
              <div key={unit.id} className="flex items-center gap-2 text-xs">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-muted-foreground truncate">{unit.title}</span>
                    <span className="text-muted-foreground tabular-nums ml-1">{unitPct}%</span>
                  </div>
                  <Progress value={unitPct} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function StudyPlanCard({
  classSlug,
  subject,
  daysLeft,
  progress,
}: {
  classSlug: string;
  subject: SubjectSyllabus;
  daysLeft: number;
  progress: Record<string, boolean>;
}) {
  const remainingTopics = subject.units.flatMap((unit) =>
    unit.topics.filter((t) => !progress[`${subject.slug}-${t}`])
  );
  const topicsPerDay = daysLeft > 0 ? Math.ceil(remainingTopics.length / daysLeft) : remainingTopics.length;

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

  const weekGroups: Array<{ label: string; topics: string[] }> = [];
  const weekCount = Math.max(1, Math.ceil(remainingTopics.length / (topicsPerDay * 7)));
  for (let w = 0; w < weekCount; w++) {
    const start = w * topicsPerDay * 7;
    const end = start + topicsPerDay * 7;
    const weekTopics = remainingTopics.slice(start, end);
    if (weekTopics.length > 0) {
      weekGroups.push({
        label: `Week ${w + 1}`,
        topics: weekTopics,
      });
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
          {remainingTopics.length} topics remaining · ~{topicsPerDay} topics/day over {weekCount} week{weekCount > 1 ? "s" : ""}
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

// ── Main Page ───────────────────────────────────────────────────────────────

export default function ExamCountdownPage() {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgressFromLocalStorage());
  }, []);

  const classData = useMemo(
    () => SYLLABUS.find((c) => c.slug === classSlug),
    [classSlug]
  );

  // Compute global minimum days across all subjects that have exam dates
  const globalDays = useMemo(() => {
    if (!classData) return null;
    const days = classData.subjects
      .map((s) => EXAM_DATE[s.slug])
      .filter(Boolean)
      .map(daysUntil);
    return days.length > 0 ? Math.min(...days) : null;
  }, [classData]);

  if (!mounted || !classData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Countdown</h1>
        <p className="mt-2 text-muted-foreground">
          Track your NEB exam dates and get a personalized revision plan.
        </p>
      </div>

      {/* Global summary */}
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
                    {globalDays > 0 ? globalDays : 0} <span className="text-lg text-muted-foreground font-normal">days</span>
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
                    {Math.round(
                      classData.subjects.reduce((sum, s) => {
                        const total = s.units.reduce((a, u) => a + u.topics.length, 0);
                        const done = s.units.reduce(
                          (a, u) => a + u.topics.filter((t) => progress[`${s.slug}-${t}`]).length,
                          0
                        );
                        return sum + (total > 0 ? done / total : 0);
                      }, 0) / classData.subjects.length
                    ) * 100}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Class selector */}
      <div className="flex gap-2">
        {(["class-11-notes", "class-12-notes"] as const).map((slug) => (
          <Button
            key={slug}
            variant={classSlug === slug ? "default" : "outline"}
            onClick={() => setClassSlug(slug)}
            className="rounded-xl"
          >
            {slug === "class-11-notes" ? "Class 11" : "Class 12"}
          </Button>
        ))}
      </div>

      {/* Subject cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {classData.subjects.map((subject) => (
          <CountdownCard
            key={subject.slug}
            subject={subject}
            classSlug={classSlug}
            progress={progress}
          />
        ))}
      </div>

      {/* Study plans */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Revision Plan
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {classData.subjects.map((subject) => {
            const days = EXAM_DATE[subject.slug] ? daysUntil(EXAM_DATE[subject.slug]) : 999;
            return (
              <StudyPlanCard
                key={subject.slug}
                classSlug={classSlug}
                subject={subject}
                daysLeft={Math.max(days, 1)}
                progress={progress}
              />
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 pt-4">
        <Link href="/quiz">
          <Button variant="outline" className="rounded-xl">
            📝 Practice PYQs
          </Button>
        </Link>
        <Link href="/lab">
          <Button variant="outline" className="rounded-xl">
            🔬 Interactive Labs
          </Button>
        </Link>
        <Link href="/notes">
          <Button variant="outline" className="rounded-xl">
            📖 Review Notes
          </Button>
        </Link>
      </div>
    </div>
  );
}
