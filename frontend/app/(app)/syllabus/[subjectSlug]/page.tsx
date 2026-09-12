"use client";
import { use } from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar, TrendingUp, TrendingDown, Minus, Info,
  ChevronDown, ChevronUp, BookOpen, Search,
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
  SyllabusTimeline,
  SyllabusUnitView,
  TopicLifecycleViewer,
  diffTimeline,
} from "@/features/syllabus-history/components/version-comparison";
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
const CLASS_TRACK_ORDER = ["class-11-notes", "class-12-notes"] as const;
const SUBJECT_KEY_MAP: Record<string, SubjectKey> = {
  biology: "biology", physics: "physics", chemistry: "chemistry",
  mathematics: "mathematics", english: "english", nepali: "nepali",
};
const SUBJECT_DATA_MAP: Partial<Record<SubjectKey, Record<string, SyllabusSubjectData>>> = {
  biology: BIOLOGY_DATA_MAP, physics: PHYSICS_DATA_MAP, chemistry: CHEMISTRY_DATA_MAP,
  mathematics: MATH_DATA_MAP, english: ENGLISH_DATA_MAP, nepali: NEPALI_DATA_MAP,
};

function getSubjectAcrossTracks(subjectSlug: string) {
  const results: { classTrack: ClassSyllabus; subject: SubjectSyllabus }[] = [];
  for (const cls of SYLLABUS) {
    const s = cls.subjects.find((x) => x.slug === subjectSlug);
    if (s) results.push({ classTrack: cls, subject: s });
  }
  return results;
}

function YearAccordion({ yearData, colorClass, subjectSlug }: {
  yearData: { year: number; bsYear: string; changes: { added: string[]; removed: string[]; modified: string[]; notes?: string } };
  colorClass: string;
  subjectSlug: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const c = yearData.changes;
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${colorClass} text-white text-xs font-bold`}>{yearData.year}</span>
          <div>
            <p className="font-semibold text-foreground text-sm">{yearData.bsYear}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {c.added.length > 0 && <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"><TrendingUp className="h-3 w-3" /> +{c.added.length} added</span>}
              {c.removed.length > 0 && <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400"><TrendingDown className="h-3 w-3" /> -{c.removed.length} removed</span>}
              {c.modified.length > 0 && <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"><Minus className="h-3 w-3" /> {c.modified.length} modified</span>}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-border/50 pt-3">
          {c.notes && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{c.notes}</span>
            </div>
          )}
          {c.added.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">Added Topics</p>
              <ul className="space-y-1">{c.added.map((t, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground"><span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />{t}</li>)}</ul>
            </div>
          )}
          {c.removed.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">Removed Topics</p>
              <ul className="space-y-1">{c.removed.map((t, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500" /><span className="line-through">{t}</span></li>)}</ul>
            </div>
          )}
          {c.modified.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">Modified Topics</p>
              <ul className="space-y-1">{c.modified.map((t, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground"><span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />{t}</li>)}</ul>
            </div>
          )}
          <Link href={`/syllabus/${subjectSlug}/year/${yearData.year}`} className="inline-flex text-sm text-primary hover:underline">Open full view →</Link>
        </div>
      )}
    </div>
  );
}

export default function SubjectSyllabusPage({ params }: { params: Promise<{ subjectSlug: string }> }) {
  const { subjectSlug } = use(params);
  const subjectName = subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1);
  const emoji = SUBJECT_EMOJI[subjectName] ?? "📘";
  const colorClass = SUBJECT_COLORS[subjectName] ?? "from-primary to-primary/70";

  const subjectAcrossTracks = getSubjectAcrossTracks(subjectSlug);
  const firstSubject = subjectAcrossTracks[0]?.subject;
  const history = SYLLABUS_HISTORY[subjectSlug];
  const subjectKey = SUBJECT_KEY_MAP[subjectSlug];

  const [activeClass, setActiveClass] = useState("class-11-notes");
  const [showTimeline, setShowTimeline] = useState(true);

  const bioData = subjectKey ? SUBJECT_DATA_MAP[subjectKey]?.[activeClass] : null;
  const activeVersion = bioData?.versions.find((v) => v.isLatest) ?? bioData?.versions[bioData.versions.length - 1];

  const totalHours = subjectAcrossTracks.reduce(
    (acc, { subject }) => acc + subject.units.reduce((s, u) => s + (u.hours ?? 0), 0), 0
  );

  const timeline = useMemo(() => {
    if (!bioData || bioData.versions.length < 2) return null;
    return diffTimeline(bioData);
  }, [bioData]);

  const totalChanges = useMemo(() => {
    if (!timeline) return { added: 0, removed: 0, modified: 0 };
    return timeline.reduce(
      (acc, t) => ({
        added: acc.added + t.diffs.filter((d) => d.status === "added").length,
        removed: acc.removed + t.diffs.filter((d) => d.status === "removed").length,
        modified: acc.modified + t.diffs.filter((d) => d.status === "modified").length,
      }),
      { added: 0, removed: 0, modified: 0 }
    );
  }, [timeline]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass}/5 pointer-events-none`} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-2xl shadow-lg`}>{emoji}</div>
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
                  <Calendar className="h-3 w-3" />{history.length} years tracked
                </span>
              )}
              {bioData && (
                <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-full">
                  <BookOpen className="h-3 w-3" />
                  {bioData.versions.length} versions · {totalChanges.added + totalChanges.removed + totalChanges.modified} topic changes
                </span>
              )}
            </div>
          </div>
          <Link href="/syllabus" className="shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors">← All subjects</Link>
        </div>
      </div>

      {/* Class track selector */}
      <div className="flex flex-wrap gap-2">
        {subjectAcrossTracks.map(({ classTrack }) => (
          <button key={classTrack.slug} onClick={() => setActiveClass(classTrack.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              activeClass === classTrack.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40"
            }`}>
            {classTrack.name}
          </button>
        ))}
      </div>

      {/* Source-extracted topic changes */}
      {bioData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-violet-500" />
              <h2 className="text-lg font-semibold">Topic-Level Changes (Source-Extracted)</h2>
            </div>
            {timeline && timeline.length > 0 && (
              <button onClick={() => setShowTimeline(!showTimeline)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {showTimeline ? "Show current version" : "Show full timeline"}
              </button>
            )}
          </div>

          {showTimeline && timeline && timeline.length > 0 ? (
            <SyllabusTimeline data={bioData} />
          ) : !showTimeline && timeline && timeline.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No topic-level differences found between versions.
            </div>
          ) : (
            activeVersion && (
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Added", value: totalChanges.added, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800" },
                    { label: "Removed", value: totalChanges.removed, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/20", border: "border-red-200 dark:border-red-800" },
                    { label: "Modified", value: totalChanges.modified, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800" },
                  ].map(({ label, value, color, bg, border }) => (
                    <div key={label} className={`rounded-xl border ${border} ${bg} p-4 text-center`}>
                      <p className={`text-2xl font-bold ${color}`}>{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Units */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {activeVersion.year} BS — {bioData.grade === "11" ? "Botany & Zoology" : "Advanced Botany & Zoology"}
                  </h3>
                  {timeline && timeline.length > 0 && activeVersion.units.map((unit) => (
                    <SyllabusUnitView
                      key={unit.id}
                      unit={unit}
                      versionYear={activeVersion.year}
                      diffs={timeline[timeline.length - 1]?.diffs}
                    />
                  ))}
                </div>

                {timeline && timeline.length >= 2 && (
                  <button onClick={() => setShowTimeline(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-500/20 transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    View year-by-year change timeline
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}

      {/* SYLLABUS_HISTORY timeline */}
      {history && history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">NEB Syllabus Changes Timeline</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Official NEB curriculum change records across {history.length} years.
          </p>
          <div className="space-y-3">
            {history.map((yearData) => (
              <YearAccordion key={yearData.year} yearData={yearData} colorClass={colorClass} subjectSlug={subjectSlug} />
            ))}
          </div>
        </div>
      )}

      {/* Topic lifecycle — every topic's full history from first appearance to latest */}
      {bioData && bioData.versions.length >= 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-violet-500" />
            <h2 className="text-lg font-semibold">Every Topic's Full Lifecycle</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            See how each topic grew from scratch — when it first appeared, what changed, and its scope.
            Click any topic to expand its complete timeline.
          </p>
          <TopicLifecycleViewer data={bioData} />
        </div>
      )}

      {/* NEB Current Syllabus */}
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
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br ${colorClass} text-xs font-bold text-white`}>{trackOrder + 1}</span>
                      <h3 className="font-semibold text-foreground">{classTrack.name}</h3>
                      {subject.notesUrl && <Link href={subject.notesUrl} className="text-xs text-primary hover:underline">Notes →</Link>}
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
                          <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                          <h4 className="font-semibold text-foreground text-sm truncate">{unit.title}</h4>
                        </div>
                        {unit.hours !== undefined && (
                          <span className="shrink-0 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{unit.hours} hrs</span>
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
