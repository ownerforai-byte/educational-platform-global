"use client";

/**
 * /subjects — the student's subject picker.
 *
 * Rebuilt 2026-11-09 per plan-pro-app.md verdict #4 (poor → rebuild):
 * - No fake staged loading: cards render immediately (the old page delayed
 *   real content behind 120 ms-per-card timers as performance theater).
 * - Subject identity comes from the canonical `lib/ui/subject-visuals.ts`
 *   tokens — no ad-hoc hex gradients (finding CC-1).
 * - No fabricated "New" badges on every card: every number comes from a real
 *   source (finding CC-2). Owner 2026-11-09: "add class 8,9,10 with their all
 *   respective subject like class 11 and make them load like one by one
 *   smoothly" — grades 8–10 now list their real subject sets as canonical
 *   cards (an honest "notes being written" line, no invented progress or
 *   links), and every card animates in one by one (CSS entrance, not a timer).
 * - Progress is real: `useLiveStats` derives completion from the student's
 *   actual journey; zero means zero.
 */

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Search } from "lucide-react";
import { SYLLABUS } from "@/lib/core/syllabus";
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
function SubjectCard({ subject, classLabel, notesSlug, percent, completedChapters, index }: {
  subject: { slug: string; name: string; units: { id: string }[] };
  classLabel: string;
  notesSlug: string;
  /** Real completion from the student's progress journey. */
  percent: number;
  completedChapters: number;
  /** Position in the grid — drives the one-by-one entrance. */
  index: number;
}) {
  const visual = getSubjectVisual(subject.slug);
  return (
    <Link href={`/${notesSlug}/${subject.slug}`}
      style={{ animationDelay: `${Math.min(index, 10) * 70}ms` }}
      className={`card-rise-in lazy-render flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${visual.border}`}>
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
/**
 * The grade 8–10 subjects, listed like class 11's cards but NOT linked —
 * their notes are still being written, so the card says so honestly instead
 * of inventing progress or a dead route.
 */
function LowerGradeSubjectCard({ name, classLabel, index }: {
  name: string;
  classLabel: string;
  index: number;
}) {
  const visual = getSubjectVisual(name);
  return (
    <article
      style={{ animationDelay: `${Math.min(index, 10) * 70}ms` }}
      className={`card-rise-in lazy-render flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm ${visual.border}`}
    >
      <div className={`relative flex items-center justify-center bg-gradient-to-br py-6 ${visual.bg}`}>
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-background/40 text-2xl" aria-hidden="true">
          {visual.glyph}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-extrabold leading-tight text-foreground">{name}</h3>
        <span className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${visual.badge}`}>
          {classLabel}
        </span>
        <p className="mt-1 text-[11px] text-muted-foreground">Notes are being written — on the way.</p>
      </div>
    </article>
  );
}

const CLASS_FILTERS = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;
type ClassFilter = (typeof CLASS_FILTERS)[number];

/** Only grades 11–12 have published syllabus notes today. */
const NOTES_SLUG: Partial<Record<ClassFilter, string>> = {
  "Class 11": "class-11-notes",
  "Class 12": "class-12-notes",
};

/** Grade 8–10 subjects (owner registry 2026-11-09: "their all respective subject"). */
const LOWER_GRADE_SUBJECTS: Record<string, Array<{ name: string }>> = {
  "Class 8": [
    { name: "Science" },
    { name: "Mathematics" },
    { name: "English" },
    { name: "Nepali" },
    { name: "Social Studies" },
    { name: "Health" },
  ],
  "Class 9": [
    { name: "Science" },
    { name: "Mathematics" },
    { name: "English" },
    { name: "Nepali" },
    { name: "Social Studies" },
    { name: "Health & PE" },
  ],
  "Class 10": [
    { name: "Science" },
    { name: "Mathematics" },
    { name: "English" },
    { name: "Nepali" },
    { name: "Social Studies" },
    { name: "Optional Maths" },
  ],
};

export default function SubjectsPage() {
  const [classFilter, setClassFilter] = useState<ClassFilter>("Class 11");
  const notesSlug = NOTES_SLUG[classFilter];
  const isLowerGrade = !notesSlug;

  const classSyllabus = useMemo(
    () => (notesSlug ? SYLLABUS.find((c) => c.slug === notesSlug) : undefined),
    [notesSlug],
  );
  const liveSubjects = classSyllabus?.subjects ?? [];
  const lowerGradeSubjects = isLowerGrade ? LOWER_GRADE_SUBJECTS[classFilter] ?? [] : [];
  const totalSubjects = isLowerGrade ? lowerGradeSubjects.length : liveSubjects.length;

  // Live completion from the real progress journey — no literal zeros.
  const { subjectProgress } = useLiveStats();
  const progressFor = (slug: string) =>
    subjectProgress[`${notesSlug}/${slug}`] ?? {
      completedUnits: 0,
      totalUnits: 0,
      percent: 0,
    };
  const completedSubjects = isLowerGrade
    ? 0
    : liveSubjects.filter((s) => progressFor(s.slug).percent >= 100).length;
  const overallPercent =
    !isLowerGrade && liveSubjects.length > 0
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
          <p className="text-xs font-semibold text-foreground">{completedSubjects} of {totalSubjects} completed</p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
            <div
              className="h-1.5 rounded-full bg-amber-400 transition-[width] duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-bold text-amber-500">{overallPercent}%</span>
      </div>

      {/* Class filter pills — every grade the platform serves */}
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
      <p className="text-xs font-semibold text-muted-foreground">{totalSubjects} subjects</p>

      {/* Cards — rendered immediately, animated in one by one (no JS timers) */}
      <div className="grid grid-cols-2 gap-3">
        {isLowerGrade
          ? lowerGradeSubjects.map((subject, index) => (
              <LowerGradeSubjectCard
                key={subject.name}
                name={subject.name}
                classLabel={classFilter}
                index={index}
              />
            ))
          : liveSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.slug}
                index={index}
                subject={subject as { slug: string; name: string; units: { id: string }[] }}
                classLabel={classFilter}
                notesSlug={notesSlug ?? ""}
                percent={progressFor(subject.slug).percent}
                completedChapters={progressFor(subject.slug).completedUnits}
              />
            ))}
      </div>

      {!isLowerGrade && liveSubjects.length === 0 && (
        <EmptyState
          icon={<Compass className="h-6 w-6" />}
          title={`No syllabus published for ${classFilter} yet`}
          description="When the curriculum for this grade is added, its subjects will appear here. Class 11 and 12 are live today."
        />
      )}

    </div>
  );
}
