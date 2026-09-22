"use client";
export const dynamic = "force-dynamic";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ListOrdered } from "lucide-react";
import { SYLLABUS, type ClassSyllabus, type SubjectSyllabus } from "@/lib/syllabus";

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

function getSubjectAcrossTracks(subjectSlug: string) {
  const results: { classTrack: ClassSyllabus; subject: SubjectSyllabus }[] = [];
  for (const cls of SYLLABUS) {
    const s = cls.subjects.find((x) => x.slug === subjectSlug);
    if (s) results.push({ classTrack: cls, subject: s });
  }
  return results;
}

/* ────────────────────────────────────────────────────────────────────────────
   Topic column — numbered in official syllabus style (N.M teaching sequence).
   ──────────────────────────────────────────────────────────────────────────── */
function TopicColumn({ topics, unitNo, start }: { topics: string[]; unitNo: number; start: number }) {
  return (
    <ol className="space-y-1.5">
      {topics.map((topic, i) => {
        const n = start + i;
        return (
          <li key={n} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/85">
            <span className="mt-px shrink-0 font-mono text-[10px] font-semibold text-muted-foreground/80">
              {unitNo}.{n}
            </span>
            <span>{topic}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Unit block — document-style, always open: numbered head (hours + course
   share), the full topic sequence below it, then quiet deep links. No
   accordions — the sheet reads top-to-bottom like the official curriculum.
   ──────────────────────────────────────────────────────────────────────────── */
function UnitBlock({
  unit,
  index,
  colorClass,
  trackTotalHours,
  classSlug,
  subjectSlug,
}: {
  unit: SubjectSyllabus["units"][number];
  index: number;
  colorClass: string;
  trackTotalHours: number;
  classSlug: string;
  subjectSlug: string;
}) {
  const unitNo = index + 1;
  const share =
    trackTotalHours > 0 && unit.hours !== undefined
      ? Math.round((unit.hours / trackTotalHours) * 100)
      : null;
  const cut = Math.ceil(unit.topics.length / 2);
  const colA = unit.topics.slice(0, cut);
  const colB = unit.topics.slice(cut);

  return (
    <section
      id={`unit-${unit.id}`}
      className="scroll-mt-24 overflow-hidden rounded-xl border border-border/70 bg-card transition-colors hover:border-primary/30"
    >
      {/* unit head */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${colorClass} text-[11px] font-bold text-white shadow-sm`}>
          {unitNo}
        </span>
        <h2 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-foreground">
          {unit.title}
        </h2>
        {unit.hours !== undefined && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <Clock className="h-3 w-3" />
            {unit.hours} hrs
          </span>
        )}
        {share !== null && share > 0 && (
          <span className="w-10 shrink-0 text-right text-[11px] text-muted-foreground">{share}%</span>
        )}
      </div>

      {/* topics — always visible, in teaching sequence, two columns on wide screens */}
      <div className={`grid gap-x-8 gap-y-1.5 px-4 py-3 sm:px-5 ${colB.length > 0 ? "sm:grid-cols-2" : ""}`}>
        <TopicColumn topics={colA} unitNo={unitNo} start={1} />
        {colB.length > 0 && <TopicColumn topics={colB} unitNo={unitNo} start={colA.length + 1} />}
      </div>

      {/* quiet deep links */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 px-4 py-2 sm:px-5">
        <Link
          href={`/${classSlug}/${subjectSlug}/chapters/${unit.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <BookOpen className="h-3 w-3" />
          Unit chapters
        </Link>
        <Link
          href={`/${classSlug}/${subjectSlug}/${unit.id}`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Unit notes
          <ArrowRight className="h-3 w-3" />
        </Link>
        {unit.introducedIn !== undefined && (
          <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Added {unit.introducedIn} BS
          </span>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Hour-allocation bar — one look at where the teaching hours sit. Segments
   carry tooltips; the exact numbers live on each unit head.
   ──────────────────────────────────────────────────────────────────────────── */
function HourAllocationBar({ subject }: { subject: SubjectSyllabus }) {
  const total = subject.units.reduce((s, u) => s + (u.hours ?? 0), 0);
  if (total === 0) return null;

  return (
    <div className="rounded-xl border border-border/70 bg-card px-5 py-4">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Teaching-hour allocation
        </p>
        <p className="text-[11px] text-muted-foreground">{total} hrs total</p>
      </div>
      <div
        className="flex h-2 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label="Teaching hours distributed across units"
      >
        {subject.units.map((u, i) => {
          const h = u.hours ?? 0;
          if (!h) return null;
          return (
            <div
              key={u.id}
              className="h-full bg-primary"
              style={{ width: `${(h / total) * 100}%`, opacity: 0.45 + (0.55 * ((i % 5) + 1)) / 5 }}
              title={`Unit ${i + 1}: ${u.title} — ${h} hrs`}
            />
          );
        })}
      </div>
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
  const [activeClass, setActiveClass] = useState<string>(CLASS_TRACK_ORDER[0]);

  const activeTrack =
    subjectAcrossTracks.find((t) => t.classTrack.slug === activeClass) ?? subjectAcrossTracks[0];
  const activeSubject = activeTrack?.subject;
  const activeClassTrack = activeTrack?.classTrack;
  const trackTotalHours = activeSubject?.units.reduce((s, u) => s + (u.hours ?? 0), 0) ?? 0;
  const trackTopicCount = activeSubject?.units.reduce((s, u) => s + u.topics.length, 0) ?? 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:py-12">
      {/* ── Sheet header ── */}
      <header className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-xl shadow-sm`}>
            {emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {firstSubject?.name ?? subjectName}
              </h1>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                Theory syllabus
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {firstSubject?.description ?? "Official NEB theory syllabus — units, teaching hours and topic sequence."}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{trackTotalHours} teaching hrs</span>
              <span aria-hidden>·</span>
              <span>{activeSubject?.units.length ?? 0} units</span>
              <span aria-hidden>·</span>
              <span>{trackTopicCount} topics</span>
              <Link
                href="/syllabus"
                className="ml-auto inline-flex items-center gap-1 text-primary hover:underline"
              >
                ← All subjects
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Class selector + reading note ── */}
      <div className="flex flex-wrap items-center gap-2">
        {subjectAcrossTracks.map(({ classTrack }) => (
          <button
            key={classTrack.slug}
            onClick={() => setActiveClass(classTrack.slug)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              activeClass === classTrack.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            {classTrack.name}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          Units in official NEB order · topics in teaching sequence
        </span>
      </div>

      {/* ── The syllabus sheet ── */}
      {activeSubject && activeClassTrack && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <ListOrdered className="h-4 w-4" />
            Teaching plan — {activeClassTrack.name}
          </h2>

          <HourAllocationBar subject={activeSubject} />

          <div className="space-y-3">
            {activeSubject.units.map((unit, i) => (
              <UnitBlock
                key={unit.id}
                unit={unit}
                index={i}
                colorClass={colorClass}
                trackTotalHours={trackTotalHours}
                classSlug={activeClassTrack.slug}
                subjectSlug={activeSubject.slug}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
