import React from "react";
import Link from "next/link";
import type { ComponentType } from "react";
import { SYLLABUS } from "@/lib/syllabus";
import { getSubjectPyqBank } from "@/lib/pyq-bank";
import {
  History,
  ArrowRight,
  Atom,
  FlaskConical,
  Sigma,
  Dna,
  BookOpen,
  Languages,
  CalendarClock,
} from "lucide-react";

export const metadata = {
  title: "Previous Year Questions — PYQ Bank",
  description:
    "Every NEB Class 11 previous year question in one place — grouped by exam year, tagged with the syllabus unit it came from, each with a full worked solution.",
};

const CLASS_SLUG = "class-11-notes";

/**
 * Same 10-year window the per-subject Theory & PYQs pages use
 * (getSubjectPyqBank's own default), so the counts here always match what a
 * student sees after clicking through. Raising it would advertise questions the
 * subject page then refuses to show.
 */
const MAX_YEARS = 10;

type Accent = {
  icon: ComponentType<{ className?: string }>;
  border: string;
  bg: string;
  badge: string;
  iconColor: string;
};

const ACCENTS: Record<string, Accent> = {
  physics: {
    icon: Atom,
    border: "border-sky-500/30 hover:border-sky-500",
    bg: "from-sky-500/10 via-card to-card",
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    iconColor: "text-sky-500",
  },
  chemistry: {
    icon: FlaskConical,
    border: "border-amber-500/30 hover:border-amber-500",
    bg: "from-amber-500/10 via-card to-card",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    iconColor: "text-amber-500",
  },
  mathematics: {
    icon: Sigma,
    border: "border-violet-500/30 hover:border-violet-500",
    bg: "from-violet-500/10 via-card to-card",
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    iconColor: "text-violet-500",
  },
  biology: {
    icon: Dna,
    border: "border-emerald-500/30 hover:border-emerald-500",
    bg: "from-emerald-500/10 via-card to-card",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    iconColor: "text-emerald-500",
  },
  english: {
    icon: BookOpen,
    border: "border-blue-500/30 hover:border-blue-500",
    bg: "from-blue-500/10 via-card to-card",
    badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-500",
  },
  nepali: {
    icon: Languages,
    border: "border-rose-500/30 hover:border-rose-500",
    bg: "from-rose-500/10 via-card to-card",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    iconColor: "text-rose-500",
  },
};

const FALLBACK: Accent = {
  icon: BookOpen,
  border: "border-border/70 hover:border-primary",
  bg: "from-primary/10 via-card to-card",
  badge: "bg-primary/15 text-primary",
  iconColor: "text-primary",
};

async function SubjectPyqCard({
  subjectSlug,
  subjectName,
  description,
}: {
  subjectSlug: string;
  subjectName: string;
  description: string;
}) {
  const { pyqs } = await getSubjectPyqBank(CLASS_SLUG, subjectSlug, MAX_YEARS);

  const questions = pyqs.reduce((sum, y) => sum + y.questions.length, 0);
  const unitSlugs = new Set(pyqs.flatMap((y) => y.units));
  const years = pyqs.map((y) => y.year);
  const newest = years.length ? Math.max(...years) : null;
  const oldest = years.length ? Math.min(...years) : null;

  const accent = ACCENTS[subjectSlug] ?? FALLBACK;
  const Icon = accent.icon;
  const href = `/${CLASS_SLUG}/${subjectSlug}/theory`;

  return (
    <div
      className={`flex flex-col justify-between rounded-3xl border ${accent.border} bg-gradient-to-br ${accent.bg} p-6 shadow-sm transition-all hover:shadow-lg`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-card/70 ${accent.iconColor}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{subjectName}</h3>
              <p className="text-xs text-muted-foreground">
                {questions > 0
                  ? `${questions} questions · ${pyqs.length} year${pyqs.length === 1 ? "" : "s"} · ${unitSlugs.size} units`
                  : "No questions indexed yet"}
              </p>
            </div>
          </div>
          {questions > 0 && (
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${accent.badge}`}>
              {oldest}–{newest}
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {pyqs.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-border/50 pt-3">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Papers in this bank
            </span>
            <div className="flex flex-wrap gap-1">
              {pyqs.map((y) => (
                <span
                  key={y.year}
                  className="rounded bg-muted/70 px-2 py-0.5 text-[10px] text-foreground/80"
                >
                  {y.year} · {y.questions.length}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-border/50 pt-4">
        <Link
          href={href}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Theory &amp; PYQs
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default async function PyqBankPage() {
  const track = SYLLABUS.find((c) => c.slug === CLASS_SLUG);

  if (!track) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Previous Year Questions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The Class 11 track is missing from the syllabus, so there is no PYQ bank to show.
        </p>
      </div>
    );
  }

  // Read every subject's bank, then order by how much is actually there so the
  // richest paper sits first instead of alphabetical noise.
  const summaries = await Promise.all(
    track.subjects.map(async (subject) => {
      const { pyqs } = await getSubjectPyqBank(CLASS_SLUG, subject.slug, MAX_YEARS);
      return {
        slug: subject.slug,
        name: subject.name,
        description: subject.description,
        questions: pyqs.reduce((sum, y) => sum + y.questions.length, 0),
        years: pyqs.length,
      };
    }),
  );

  const ranked = [...summaries].sort(
    (a, b) => b.questions - a.questions || b.years - a.years || a.name.localeCompare(b.name),
  );

  const totalQuestions = summaries.reduce((sum, s) => sum + s.questions, 0);
  const subjectsWithPapers = summaries.filter((s) => s.questions > 0).length;

  // track.name is "Class 11 Notes" — the track name reads wrong mid-sentence, so
  // take the level straight off the slug instead.
  const classLabel = CLASS_SLUG.match(/class-(\d+)/)?.[1];
  const level = classLabel ? `Class ${classLabel}` : track.name;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <History className="h-4 w-4" />
          <span>Exam Archive</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Previous Year Questions
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Real NEB papers for {level} across every subject. Each paper is grouped by exam
          year, tagged with the syllabus unit it came from, and every question carries a full
          worked solution.
        </p>
      </div>

      {/* Totals */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Questions
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
            {totalQuestions}
          </p>
        </div>
        <div className="rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Subjects covered
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
            {subjectsWithPapers}
            <span className="text-base font-semibold text-muted-foreground">
              {" "}
              / {track.subjects.length}
            </span>
          </p>
        </div>
        <div className="rounded-3xl border border-border/60 bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Window shown
          </p>
          <p className="mt-1 flex items-center gap-2 text-3xl font-extrabold tracking-tight text-foreground">
            <CalendarClock className="h-6 w-6 text-muted-foreground" />
            {MAX_YEARS} yrs
          </p>
        </div>
      </div>

      {/* One card per subject */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((s) => (
          <SubjectPyqCard
            key={s.slug}
            subjectSlug={s.slug}
            subjectName={s.name}
            description={s.description}
          />
        ))}
      </div>

      {/* Where the practice sets live */}
      <div className="rounded-3xl border border-border/60 bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Looking for generated practice sets?</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          This bank is the real past-paper archive. For freshly generated quizzes built from
          the same bank, use the Practice Quiz Bank instead.
        </p>
        <Link
          href="/quiz"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Practice Quiz Bank
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}