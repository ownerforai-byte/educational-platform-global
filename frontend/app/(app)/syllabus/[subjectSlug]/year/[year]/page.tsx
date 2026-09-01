"use client";
import { getSyllabusHistory } from "@/lib/syllabus-history";
import { DateBadge } from "@/components/content/date-badge";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Info, ChevronLeft, ChevronRight, BookOpen, Search } from "lucide-react";
import { use } from "react";
import {
  BIOLOGY_DATA_MAP,
  PHYSICS_DATA_MAP,
  CHEMISTRY_DATA_MAP,
  MATH_DATA_MAP,
  ENGLISH_DATA_MAP,
  NEPALI_DATA_MAP,
} from "@/features/syllabus-history/data";
import { TopicLifecycleViewer } from "@/features/syllabus-history/components/version-comparison";
import type { SyllabusSubjectData, SubjectKey } from "@/features/syllabus-history/data";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿", Chemistry: "🧪", English: "📖",
  Mathematics: "🔢", Nepali: "🇳🇵", Physics: "⚡",
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

const SUBJECT_KEY_MAP: Record<string, SubjectKey> = {
  biology: "biology", physics: "physics", chemistry: "chemistry",
  mathematics: "mathematics", english: "english", nepali: "nepali",
};

const SUBJECT_DATA_MAP: Partial<Record<SubjectKey, Record<string, SyllabusSubjectData>>> = {
  biology: BIOLOGY_DATA_MAP, physics: PHYSICS_DATA_MAP, chemistry: CHEMISTRY_DATA_MAP,
  mathematics: MATH_DATA_MAP, english: ENGLISH_DATA_MAP, nepali: NEPALI_DATA_MAP,
};

export default function YearViewPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; year: string }>;
}) {
  const { subjectSlug, year: yearParam } = use(params);
  const year = parseInt(yearParam, 10);
  const history = getSyllabusHistory(subjectSlug);
  const yearData = history?.find((y) => y.year === year);
  const subjectName = capitalize(subjectSlug);
  const emoji = SUBJECT_EMOJI[subjectName] ?? "📘";
  const colorClass = SUBJECT_COLORS[subjectName] ?? "from-primary to-primary/70";
  const changes = yearData?.changes;

  const years = history?.map((y) => y.year) ?? [];
  const minYear = years.length ? Math.min(...years) : year;
  const maxYear = years.length ? Math.max(...years) : year;
  const hasPrev = year - 1 >= minYear && years.includes(year - 1);
  const hasNext = year + 1 <= maxYear && years.includes(year + 1);

  // Get source-extracted data for this subject
  const subjectKey = SUBJECT_KEY_MAP[subjectSlug];
  const sourceData = subjectKey ? SUBJECT_DATA_MAP[subjectKey]?.["class-11-notes"] ?? SUBJECT_DATA_MAP[subjectKey]?.["class-12-notes"] : null;

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
              {subjectName} — {yearData?.bsYear ?? `${year} BS`}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {yearData ? "Official NEB syllabus changes for this year" : "Syllabus records"}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DateBadge label="Syllabus validated" date={`${year} BS`} tone="green" />
              {sourceData && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300">
                  <BookOpen className="h-3 w-3" />
                  Source-extracted data available
                </span>
              )}
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

      {/* Official NEB changes */}
      {changes && (
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
                    <DateBadge label="Validated" date={yearData?.bsYear ?? `${year} BS`} tone="gray" />
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
                    <DateBadge label="Validated" date={yearData?.bsYear ?? `${year} BS`} tone="gray" />
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
                    <DateBadge label="Validated" date={yearData?.bsYear ?? `${year} BS`} tone="gray" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No changes recorded</p>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {changes?.notes && (
        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{changes.notes}</span>
        </div>
      )}

      {/* Source-extracted topic view */}
      {sourceData && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-violet-500" />
            <h2 className="text-lg font-semibold">Topic-Level View for {yearData?.bsYear ?? `${year} BS`}</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            All topics from the source-extracted syllabus data. Shows which topics existed in this year and their full meaning.
          </p>
          <div className="space-y-3">
            {(() => {
              const version = sourceData.versions.find((v) => v.year === year)
                ?? sourceData.versions[sourceData.versions.length - 1];
              if (!version) return <p className="text-sm text-muted-foreground">No data for this year.</p>;
              return version.units.map((unit) => (
                <div key={unit.id} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{unit.title}</span>
                    <span className="text-xs text-muted-foreground">{unit.hours} hrs · {unit.topics.length} topics</span>
                  </div>
                  <div className="divide-y divide-border/40">
                    {unit.topics.map((topic, i) => (
                      <div key={i} className="px-4 py-3 flex items-start gap-3">
                        <span className={`shrink-0 mt-1 h-2 w-2 rounded-full ${topic.addedInYear === year ? "bg-emerald-500" : topic.modifiedInYear === year ? "bg-amber-500" : topic.removedInYear === year ? "bg-red-500" : "bg-muted-foreground/30"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground leading-relaxed">{topic.title}</p>
                          {topic.meaning && (
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{topic.meaning}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-muted-foreground font-mono">{topic.slug}</span>
                            {topic.hours !== undefined && <span className="text-[11px] text-muted-foreground">· {topic.hours} hrs</span>}
                            {topic.addedInYear && <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium">+{topic.addedInYear}</span>}
                            {topic.modifiedInYear && <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium">~{topic.modifiedInYear}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between gap-4">
        {hasPrev ? (
          <Link href={`/syllabus/${subjectSlug}/year/${year - 1}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            {year - 1} BS
          </Link>
        ) : <span />}
        <Link href={`/syllabus/${subjectSlug}`} className="text-sm text-primary hover:underline">
          Back to all years
        </Link>
        {hasNext ? (
          <Link href={`/syllabus/${subjectSlug}/year/${year + 1}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            {year + 1} BS
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
