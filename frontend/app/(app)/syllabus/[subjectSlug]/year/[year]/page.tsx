"use client";
import { getSyllabusHistory } from "@/lib/syllabus-history";
import { DateBadge } from "@/components/content/date-badge";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { use } from "react";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

const SUBJECT_COLORS: Record<string, string> = {
  Biology: "from-emerald-500 to-teal-500",
  Chemistry: "from-amber-500 to-orange-500",
  English: "from-blue-500 to-cyan-500",
  Mathematics: "from-violet-500 to-purple-500",
  Nepali: "from-red-500 to-rose-500",
  Physics: "from-sky-500 to-blue-500",
};

function capitalize(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default function YearViewPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; year: string }>;
}) {
  const { subjectSlug, year: yearParam } = use(params);
  const year = parseInt(yearParam, 10);
  const history = getSyllabusHistory(subjectSlug);
  const yearData = history?.find((y) => y.year === year);

  if (!history || !yearData) {
    return (
      <div className="mx-auto max-w-6xl py-10 px-4">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground">Year not found for this subject</h1>
          <Link href={`/syllabus/${subjectSlug}`} className="mt-4 inline-flex text-sm text-primary hover:underline">
            ← Back to {subjectSlug} syllabus
          </Link>
        </div>
      </div>
    );
  }

  const subjectName = capitalize(subjectSlug);
  const emoji = SUBJECT_EMOJI[subjectName] ?? "📘";
  const colorClass = SUBJECT_COLORS[subjectName] ?? "from-primary to-primary/70";
  const changes = yearData.changes;

  const years = history.map((y) => y.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const hasPrev = year - 1 >= minYear && years.includes(year - 1);
  const hasNext = year + 1 <= maxYear && years.includes(year + 1);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass}/5 pointer-events-none`} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-2xl shadow-lg`}>
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {subjectName} — {yearData.bsYear}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Official NEB syllabus changes for this year
            </p>
            <div className="mt-3">
              <DateBadge label="Syllabus validated" date={`${year} BS`} tone="green" />
            </div>
          </div>
          <Link
            href={`/syllabus/${subjectSlug}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to all years
          </Link>
        </div>
      </div>

      {/* Changes cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Added */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Added this year</h2>
          </div>
          {changes.added.length > 0 ? (
            <ul className="space-y-2">
              {changes.added.map((topic, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="flex items-start gap-2 text-sm text-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{topic}</span>
                  </div>
                  <DateBadge label="Validated" date={yearData.bsYear} tone="gray" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No changes recorded</p>
          )}
        </div>

        {/* Removed */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">Removed</h2>
          </div>
          {changes.removed.length > 0 ? (
            <ul className="space-y-2">
              {changes.removed.map((topic, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="line-through">{topic}</span>
                  </div>
                  <DateBadge label="Validated" date={yearData.bsYear} tone="gray" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No changes recorded</p>
          )}
        </div>

        {/* Modified */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Minus className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-sm font-semibold text-amber-600 dark:text-amber-400">Modified</h2>
          </div>
          {changes.modified.length > 0 ? (
            <ul className="space-y-2">
              {changes.modified.map((topic, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="flex items-start gap-2 text-sm text-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{topic}</span>
                  </div>
                  <DateBadge label="Validated" date={yearData.bsYear} tone="gray" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No changes recorded</p>
          )}
        </div>
      </div>

      {/* Notes */}
      {changes.notes && (
        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{changes.notes}</span>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between gap-4">
        {hasPrev ? (
          <Link
            href={`/syllabus/${subjectSlug}/year/${year - 1}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {year - 1} BS
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/syllabus/${subjectSlug}`}
          className="text-sm text-primary hover:underline"
        >
          Back to all years
        </Link>
        {hasNext ? (
          <Link
            href={`/syllabus/${subjectSlug}/year/${year + 1}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {year + 1} BS
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
