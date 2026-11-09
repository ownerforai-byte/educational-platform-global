"use client";

/**
 * /subjects — the student's subject picker.
 *
 * Rebuilt 2026-11-09 per plan-pro-app.md verdict #4 (poor → rebuild):
 * - No fake staged loading: cards render immediately (the old page delayed
 *   real content behind 120 ms-per-card timers as performance theater).
 * - Subject identity comes from the canonical `lib/ui/subject-visuals.ts`
 *   tokens — no ad-hoc hex gradients (finding CC-1).
 * - No fabricated "New" badges on every card, and no hand-maintained
 *   Class 8–10 stub registry: grades without syllabus content render the
 *   platform's honest EmptyState instead of invented "coming soon" cards
 *   (finding CC-2 — a number/badge must come from a real source or not show).
 * - Progress is real: `useLiveStats` derives completion from the student's
 *   actual journey; zero means zero.
 */

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Search } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";
import { useLiveStats } from "@/lib/hooks/use-live-stats";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { EmptyState } from "@/components/content/empty-state";

// ─── Progress ring ─────────────────────────────────────────────────────────
function ProgressRing({ percent, textClass }: { percent: number; textClass: string }) {
  const size = 52;
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (percent / 100);
  return (
    <div className={`relative flex items-center justify-center ${textClass}`}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth="5" className="opacity-20" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[11px] font-black text-foreground">{percent}%</span>
    </div>
  );
}

// ─── Live subject card ─────────────────────────────────────────────────────
function SubjectCard({ subject, classLabel, notesSlug, percent, completedChapters }: {
  subject: { slug: string; name: string; units: { id: string }[] };
  classLabel: string;
  notesSlug: string;
  /** Real completion from the student's progress journey. */
  percent: number;
  completedChapters: number;
}) {
  const visual = getSubjectVisual(subject.slug);
  return (
    <Link href={`/${notesSlug}/${subject.slug}`}
      className={`flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${visual.border}`}>
      <div className={`relative flex items-center justify-center bg-gradient-to-br py-6 ${visual.bg}`}>
        <ProgressRing percent={percent} textClass={visual.text} />
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-extrabold leading-tight text-foreground">
          <span className="mr-1" aria-hidden="true">{visual.glyph}</span>
          {subject.name}
        </h3>
        <span className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${visual.badge}`}>
          {classLabel}
        </span>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{completedChapters}/{subject.units.length} ch</span>
          <span className="font-semibold">{percent}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <div className={`h-1 rounded-full ${visual.text.replace("text-", "bg-")}`} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
const CLASS_FILTERS = ["Class 11", "Class 12"] as const;
type ClassFilter = (typeof CLASS_FILTERS)[number];

const NOTES_SLUG: Record<ClassFilter, string> = {
  "Class 11": "class-11-notes",
  "Class 12": "class-12-notes",
};

export default function SubjectsPage() {
  const [classFilter, setClassFilter] = useState<ClassFilter>("Class 11");
  const notesSlug = NOTES_SLUG[classFilter];

  const classSyllabus = useMemo(
    () => SYLLABUS.find((c) => c.slug === notesSlug),
    [notesSlug],
  );
  const liveSubjects = classSyllabus?.subjects ?? [];

  // Live completion from the real progress journey — no literal zeros.
  const { subjectProgress } = useLiveStats();
  const progressFor = (slug: string) =>
    subjectProgress[`${notesSlug}/${slug}`] ?? {
      completedUnits: 0,
      totalUnits: 0,
      percent: 0,
    };
  const completedSubjects = liveSubjects.filter(
    (s) => progressFor(s.slug).percent >= 100,
  ).length;
  const overallPercent =
    liveSubjects.length > 0
      ? Math.round(
          liveSubjects.reduce((sum, s) => sum + progressFor(s.slug).percent, 0) /
            liveSubjects.length,
        )
      : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">My Subjects</h1>
          <p className="text-xs text-muted-foreground">{classFilter} · Pick a subject to study</p>
        </div>
        <Link href="/search" aria-label="Search subjects"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground hover:text-foreground transition-colors">
          <Search className="h-4 w-4" />
        </Link>
      </div>

      {/* Overall progress */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">🎯</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{completedSubjects} of {liveSubjects.length} completed</p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
            <div
              className="h-1.5 rounded-full bg-amber-400 transition-[width] duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-bold text-amber-500">{overallPercent}%</span>
      </div>

      {/* Class filter pills — only grades with real syllabus content */}
      <div className="flex gap-2 overflow-x-auto border-b border-border/60 pb-3" role="group" aria-label="Filter subjects by class">
        {CLASS_FILTERS.map((c) => (
          <button key={c} type="button" onClick={() => setClassFilter(c)} aria-pressed={classFilter === c}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              classFilter === c ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Subject count */}
      <p className="text-xs font-semibold text-muted-foreground">{liveSubjects.length} subjects</p>

      {/* Cards — rendered immediately, no staged timers */}
      <div className="grid grid-cols-2 gap-3">
        {liveSubjects.map((subject) => (
          <SubjectCard
            key={subject.slug}
            subject={subject as { slug: string; name: string; units: { id: string }[] }}
            classLabel={classFilter}
            notesSlug={notesSlug}
            percent={progressFor(subject.slug).percent}
            completedChapters={progressFor(subject.slug).completedUnits}
          />
        ))}
      </div>

      {liveSubjects.length === 0 && (
        <EmptyState
          icon={<Compass className="h-6 w-6" />}
          title={`No syllabus published for ${classFilter} yet`}
          description="When the curriculum for this grade is added, its subjects will appear here. Class 11 and 12 are live today."
        />
      )}

    </div>
  );
}
