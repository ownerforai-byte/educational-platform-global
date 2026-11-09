"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  LogIn,
  Trophy,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getProgress } from "@/lib/api/progress";
import { entryStatus, groupJourney } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

/**
 * The student's certificate board — every certificate is derived from the
 * same journey rows the progress pages use, so a certificate can never be
 * shown for a unit the platform does not consider complete.
 *
 * Rule (as the page promises): finishing every topic in a unit certifies the
 * unit; certifying every unit in a subject unlocks the subject certificate.
 */

type CertFilter = "all" | "earned" | "in_progress" | "locked";
type UnitState = Exclude<CertFilter, "all">;

const FILTERS: Array<{ value: CertFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "earned", label: "Certified" },
  { value: "in_progress", label: "In progress" },
  { value: "locked", label: "Not started" },
];

function titleize(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface UnitCert {
  key: string;
  title: string;
  total: number;
  completed: number;
  percent: number;
  state: UnitState;
}

interface SubjectCert {
  key: string;
  classSlug: string;
  className: string;
  subjectSlug: string;
  subjectName: string;
  units: UnitCert[];
  /** Subject certificate: every unit certified. */
  mastered: boolean;
  certifiedUnits: number;
  totalTopics: number;
  completedTopics: number;
}

function finishUnit(unit: UnitCert): UnitCert {
  unit.percent = unit.total > 0 ? Math.round((unit.completed / unit.total) * 100) : 0;
  unit.state =
    unit.total > 0 && unit.completed === unit.total
      ? "earned"
      : unit.completed > 0
        ? "in_progress"
        : "locked";
  return unit;
}

/** Group the journey into subject → unit certificates. */
function buildSubjectCerts(entries: ProgressEntry[]): SubjectCert[] {
  return groupJourney(entries).map((group) => {
    const byUnit = new Map<string, UnitCert>();
    for (const entry of group.entries) {
      const unitSlug = entry.unitSlug ?? "general";
      let unit = byUnit.get(unitSlug);
      if (!unit) {
        unit = {
          key: `${group.key}/${unitSlug}`,
          title: entry.topic?.chapter?.title ?? titleize(unitSlug),
          total: 0,
          completed: 0,
          percent: 0,
          state: "locked",
        };
        byUnit.set(unitSlug, unit);
      }
      unit.total += 1;
      if (entryStatus(entry) === "completed") unit.completed += 1;
    }
    const units = [...byUnit.values()].map(finishUnit);
    const certifiedUnits = units.filter((u) => u.state === "earned").length;
    return {
      key: group.key,
      classSlug: group.classSlug,
      className: group.className,
      subjectSlug: group.subjectSlug,
      subjectName: group.subjectName,
      units,
      mastered: units.length > 0 && certifiedUnits === units.length,
      certifiedUnits,
      totalTopics: group.total,
      completedTopics: group.completed,
    };
  });
}

const chipClass = (active: boolean) =>
  `rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-foreground hover:border-primary/50"
  }`;

function UnitRow({ unit, href }: { unit: UnitCert; href: string }) {
  const earned = unit.state === "earned";
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-muted/40"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {earned ? (
            <Award className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          ) : unit.state === "in_progress" ? (
            <BookOpen className="h-4 w-4 shrink-0 text-sky-500" aria-hidden="true" />
          ) : (
            <Lock className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
          )}
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold text-foreground">
              {unit.title}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {unit.completed}/{unit.total} topics
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              earned
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : unit.state === "in_progress"
                  ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {earned ? (
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            ) : null}
            {earned ? "Certified" : unit.state === "in_progress" ? `${unit.percent}%` : "Locked"}
          </span>
        </span>
      </Link>
    </li>
  );
}

export function CertificatesBoard() {
  const [entries, setEntries] = useState<ProgressEntry[] | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CertFilter>("all");
  const [subject, setSubject] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getProgress()
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch((err) => {
        if (cancelled) return;
        const failure = err as { status?: number; code?: string };
        if (failure.status === 401 || failure.code === "UNAUTHORIZED") {
          setNeedsSignIn(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load certificates");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const subjects = useMemo(() => buildSubjectCerts(entries ?? []), [entries]);

  const stats = useMemo(() => {
    let unitCerts = 0;
    let subjectCerts = 0;
    let totalTopics = 0;
    let completedTopics = 0;
    for (const s of subjects) {
      unitCerts += s.certifiedUnits;
      if (s.mastered) subjectCerts += 1;
      totalTopics += s.totalTopics;
      completedTopics += s.completedTopics;
    }
    return {
      unitCerts,
      subjectCerts,
      earned: unitCerts + subjectCerts,
      totalTopics,
      completedTopics,
      percent: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    };
  }, [subjects]);

  const visibleSubjects = useMemo(
    () => (subject === "all" ? subjects : subjects.filter((s) => s.key === subject)),
    [subjects, subject],
  );

  const visibleUnits = useMemo(
    () =>
      visibleSubjects.flatMap((s) =>
        s.units.filter((u) => filter === "all" || u.state === filter),
      ),
    [visibleSubjects, filter],
  );

  if (needsSignIn) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <LogIn className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <h2 className="mt-3 text-base font-bold text-foreground">Sign in to earn certificates</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          Certificates are tied to your account&apos;s completed units — sign in and your progress
          is certified here automatically.
        </p>
        <Link
          href="/login?next=/certificates"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
        >
          Sign in
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.05] p-6 text-center">
        <h2 className="text-base font-bold text-foreground">Certificates could not load</h2>
        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (entries === null) {
    return (
      <div className="space-y-3" aria-busy="true" aria-live="polite">
        <div className="h-20 animate-pulse rounded-2xl border border-border bg-card" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
          ))}
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Trophy className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            Certificates earned
          </div>
          <p className="mt-1 text-2xl font-black tabular-nums text-foreground">{stats.earned}</p>
          <p className="text-[11px] text-muted-foreground">
            {stats.unitCerts} unit · {stats.subjectCerts} subject
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Units certified
          </div>
          <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
            {stats.unitCerts}
            <span className="ml-1 text-xs font-semibold text-muted-foreground">
              / {subjects.reduce((n, s) => n + s.units.length, 0)}
            </span>
          </p>
          <p className="text-[11px] text-muted-foreground">Finish every topic in a unit</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            Syllabus complete
          </div>
          <p className="mt-1 text-2xl font-black tabular-nums text-foreground">{stats.percent}%</p>
          <p className="text-[11px] text-muted-foreground">
            {stats.completedTopics} of {stats.totalTopics} topics
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div role="group" aria-label="Certificate status" className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={chipClass(filter === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {subjects.length > 1 && (
          <div role="group" aria-label="Subject" className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSubject("all")}
              aria-pressed={subject === "all"}
              className={chipClass(subject === "all")}
            >
              All subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSubject(subject === s.key ? "all" : s.key)}
                aria-pressed={subject === s.key}
                className={chipClass(subject === s.key)}
              >
                {s.subjectName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Per-subject certificate sections */}
      {visibleUnits.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <Award className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-foreground">Nothing here yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            {stats.totalTopics === 0
              ? "Complete units in your subjects to earn your first certificate."
              : "No certificates match these filters yet — try All, or keep studying."}
          </p>
          <Link
            href="/progress"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Track your progress
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleSubjects.map((s) => {
            const units = s.units.filter((u) => filter === "all" || u.state === filter);
            if (units.length === 0) return null;
            const subjectPct =
              s.totalTopics > 0 ? Math.round((s.completedTopics / s.totalTopics) * 100) : 0;
            return (
              <section
                key={s.key}
                aria-label={`${s.subjectName} certificates`}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <div>
                    <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                      {s.subjectName}
                      {s.mastered && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                          <Award className="h-3 w-3" aria-hidden="true" />
                          Subject certified
                        </span>
                      )}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {s.className} · {s.certifiedUnits}/{s.units.length} units certified
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${subjectPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                      {subjectPct}%
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5 p-3">
                  {units.map((unit) => (
                    <UnitRow
                      key={unit.key}
                      unit={unit}
                      href={`/${s.classSlug}/${s.subjectSlug}`}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
