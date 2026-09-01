"use client";
import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Calendar, TrendingUp, TrendingDown, Minus, Info,
  ChevronDown, ChevronUp, BookOpen, Dna,
  Search, Filter,
} from "lucide-react";
import { DateBadge } from "@/components/content/date-badge";
import { SYLLABUS, type ClassSyllabus, type SubjectSyllabus } from "@/lib/syllabus";
import { SYLLABUS_HISTORY } from "@/lib/syllabus-history";
import {
  BIOLOGY_DATA_MAP,
  PHYSICS_DATA_MAP,
  CHEMISTRY_DATA_MAP,
  MATH_DATA_MAP,
  ENGLISH_DATA_MAP,
  NEPALI_DATA_MAP,
} from "@/features/syllabus-history/data";
import {
  SyllabusVersionComparison,
  SyllabusVersionSelector,
  SyllabusUnitView,
} from "@/features/syllabus-history/components/version-comparison";
import type { SyllabusSubjectData, SubjectKey } from "@/features/syllabus-history/data";

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

const CLASS_TRACK_ORDER = ["class-11-notes", "class-12-notes"] as const;

const SUBJECT_KEY_MAP: Record<string, SubjectKey> = {
  biology: "biology",
  physics: "physics",
  chemistry: "chemistry",
  mathematics: "mathematics",
  english: "english",
  nepali: "nepali",
};

const SUBJECT_DATA_MAP: Partial<Record<SubjectKey, Record<string, SyllabusSubjectData>>> = {
  biology: BIOLOGY_DATA_MAP,
  physics: PHYSICS_DATA_MAP,
  chemistry: CHEMISTRY_DATA_MAP,
  mathematics: MATH_DATA_MAP,
  english: ENGLISH_DATA_MAP,
  nepali: NEPALI_DATA_MAP,
};

function getSubjectAcrossTracks(subjectSlug: string) {
  const results: { classTrack: ClassSyllabus; subject: SubjectSyllabus }[] = [];
  for (const cls of SYLLABUS) {
    const subject = cls.subjects.find((s) => s.slug === subjectSlug);
    if (subject) results.push({ classTrack: cls, subject });
  }
  return results;
}

function capitalize(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function YearAccordion({ yearData, colorClass, subjectSlug }: {
  yearData: { year: number; bsYear: string; changes: { added: string[]; removed: string[]; modified: string[]; notes?: string } };
  colorClass: string;
  subjectSlug: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const changes = yearData.changes;
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${colorClass} text-white text-xs font-bold`}>
            {yearData.year}
          </span>
          <div>
            <p className="font-semibold text-foreground text-sm">{yearData.bsYear}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {changes.added.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" /> +{changes.added.length} added
                </span>
              )}
              {changes.removed.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                  <TrendingDown className="h-3 w-3" /> -{changes.removed.length} removed
                </span>
              )}
              {changes.modified.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <Minus className="h-3 w-3" /> {changes.modified.length} modified
                </span>
              )}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-border/50 pt-3">
          {changes.notes && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{changes.notes}</span>
            </div>
          )}
          {changes.added.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">Added Topics</p>
              <ul className="space-y-1">
                {changes.added.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />{t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {changes.removed.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">Removed Topics</p>
              <ul className="space-y-1">
                {changes.removed.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="line-through">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {changes.modified.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">Modified Topics</p>
              <ul className="space-y-1">
                {changes.modified.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />{t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href={`/syllabus/${subjectSlug}/year/${yearData.year}`} className="inline-flex text-sm text-primary hover:underline">
            Open full view →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SubjectSyllabusPage({ params }: { params: Promise<{ subjectSlug: string }> }) {
  const { subjectSlug } = use(params);
  const subjectName = capitalize(subjectSlug);
  const emoji = SUBJECT_EMOJI[subjectName] ?? "📘";
  const colorClass = SUBJECT_COLORS[subjectName] ?? "from-primary to-primary/70";

  const subjectAcrossTracks = getSubjectAcrossTracks(subjectSlug);
  const firstSubject = subjectAcrossTracks[0]?.subject;
  const history = SYLLABUS_HISTORY[subjectSlug];

  const [activeClass, setActiveClass] = useState<string>("class-11-notes");
  const [compareYear, setCompareYear] = useState<number | null>(null);

  // Get source-extracted data for this subject + class
  const subjectKey = SUBJECT_KEY_MAP[subjectSlug];
  const sourceData = subjectKey ? SUBJECT_DATA_MAP[subjectKey]?.[activeClass] : null;
  const activeSourceVersion = sourceData?.versions.find((v) => v.isLatest) ?? sourceData?.versions[sourceData.versions.length - 1];

  const hasSourceData = !!sourceData;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass}/5 pointer-events-none`} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-2xl shadow-lg`}>
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {firstSubject?.name ?? subjectName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {firstSubject?.description ?? "NEB syllabus with year-by-year changes"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <DateBadge label="NCF 2076 aligned" date="2082 BS" tone="green" />
              {history && (
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                  <Calendar className="h-3 w-3" />
                  {history.length} years tracked
                </span>
              )}
              {hasSourceData && (
                <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-full">
                  <BookOpen className="h-3 w-3" />
                  Source-extracted · {sourceData.versions.length} versions
                </span>
              )}
            </div>
          </div>
          <Link href="/syllabus" className="shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors">
            ← All subjects
          </Link>
        </div>
      </div>

      {/* ── Class track selector ── */}
      <div className="flex flex-wrap gap-2">
        {subjectAcrossTracks.map(({ classTrack }) => (
          <button
            key={classTrack.slug}
            onClick={() => { setActiveClass(classTrack.slug); setCompareYear(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              activeClass === classTrack.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            {classTrack.name}
          </button>
        ))}
      </div>

      {/* ── Source-extracted comparison view ── */}
      {hasSourceData && activeSourceVersion && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-violet-500" />
              <h2 className="text-lg font-semibold">Extracted Syllabus · {activeSourceVersion.year} BS</h2>
              {activeSourceVersion.isLatest && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium">
                  Latest
                </span>
              )}
            </div>
            <SyllabusVersionSelector data={sourceData} activeVersionYear={compareYear ?? activeSourceVersion.year} onSelect={setCompareYear} />
          </div>

          {compareYear ? (
            <div className="rounded-2xl border border-border bg-card p-6">
              <SyllabusVersionComparison data={sourceData} />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total hours", value: activeSourceVersion.units.reduce((s, u) => s + u.hours, 0), icon: BookOpen, color: "text-primary" },
                  { label: "Units", value: activeSourceVersion.units.length, icon: Filter, color: "text-violet-500" },
                  { label: "Topics", value: activeSourceVersion.units.reduce((s, u) => s + u.topics.length, 0), icon: Dna, color: "text-emerald-500" },
                  { label: "Versions", value: sourceData.versions.length, icon: Calendar, color: "text-amber-500" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
                    <Icon className={`h-5 w-5 ${color} mx-auto mb-1`} />
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Units list */}
              <div className="space-y-3">
                {activeSourceVersion.units.map((unit) => (
                  <SyllabusUnitView
                    key={unit.id}
                    unit={unit}
                    versionYear={activeSourceVersion.year}
                  />
                ))}
              </div>

              {sourceData.versions.length >= 2 && (
                <button
                  onClick={() => setCompareYear(activeSourceVersion.year)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-500/20 transition-colors"
                >
                  <TrendingUp className="h-4 w-4" />
                  Compare with previous version
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Historical changes (SYLLABUS_HISTORY) ── */}
      {history && history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Syllabus Changes Timeline</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Track how this subject has evolved across past years.
          </p>
          <div className="space-y-3">
            {history.map((yearData) => (
              <YearAccordion key={yearData.year} yearData={yearData} colorClass={colorClass} subjectSlug={subjectSlug} />
            ))}
          </div>
        </div>
      )}

      {/* ── Standard NEB syllabus (from syllabus.ts) ── */}
      {subjectAcrossTracks.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            NEB Current Syllabus
          </h2>
          {subjectAcrossTracks.map(({ classTrack, subject }) => {
            const trackOrder = CLASS_TRACK_ORDER.indexOf(classTrack.slug as typeof CLASS_TRACK_ORDER[number]);
            return (
              <div key={classTrack.slug} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className={`px-5 py-3 border-b border-border/60 bg-gradient-to-r ${colorClass}/5`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br ${colorClass} text-xs font-bold text-white`}>
                        {trackOrder + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{classTrack.name}</h3>
                      {subject.notesUrl && (
                        <Link href={subject.notesUrl} className="text-xs text-primary hover:underline">
                          Notes →
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{subject.units.length} units</span>
                      <span>·</span>
                      <span>{subject.units.reduce((sum, u) => sum + (u.hours ?? 0), 0)} hrs</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-border/40">
                  {subject.units.map((unit, i) => (
                    <div key={unit.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                            {i + 1}
                          </span>
                          <h4 className="font-semibold text-foreground text-sm truncate">{unit.title}</h4>
                        </div>
                        {unit.hours !== undefined && (
                          <span className="shrink-0 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {unit.hours} hrs
                          </span>
                        )}
                      </div>
                      {unit.topics.length > 0 && (
                        <ul className="mt-2 ml-8 space-y-1">
                          {unit.topics.map((topic, ti) => (
                            <li key={ti} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                              <span className="shrink-0 mt-0.5 h-1 w-1 rounded-full bg-primary/40" />
                              <span className="line-clamp-2">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
