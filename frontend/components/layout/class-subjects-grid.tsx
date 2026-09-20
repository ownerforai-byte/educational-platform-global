"use client";

import React, { useState } from "react";
import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";
import {
  Zap,
  FlaskConical,
  Dna,
  Sigma,
  BookOpen,
  Sparkles,
  Clock,
  Layers,
  ArrowRight,
  GraduationCap,
  Search,
  ChevronRight,
  Binary,
  Atom,
} from "lucide-react";

const SUBJECT_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    gradientBg: string;
    borderColor: string;
    glowColor: string;
    tagline: string;
    hasLabs?: boolean;
  }
> = {
  Physics: {
    icon: Zap,
    accentColor: "text-amber-500 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    gradientBg: "from-amber-500/10 via-card to-card",
    borderColor: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    glowColor: "bg-amber-500/10",
    tagline: "Mechanics, Heat, Waves, Electromagnetism & Modern Physics",
    hasLabs: true,
  },
  Chemistry: {
    icon: FlaskConical,
    accentColor: "text-cyan-500 dark:text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    gradientBg: "from-cyan-500/10 via-card to-card",
    borderColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
    glowColor: "bg-cyan-500/10",
    tagline: "Physical, Inorganic, Organic Chemistry & 118 Elements",
    hasLabs: true,
  },
  Biology: {
    icon: Dna,
    accentColor: "text-emerald-500 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    gradientBg: "from-emerald-500/10 via-card to-card",
    borderColor: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    glowColor: "bg-emerald-500/10",
    tagline: "Botany, Zoology, Cell Biology, Genetics & Human Physiology",
    hasLabs: true,
  },
  Mathematics: {
    icon: Sigma,
    accentColor: "text-violet-500 dark:text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    gradientBg: "from-violet-500/10 via-card to-card",
    borderColor: "hover:border-violet-500/50 hover:shadow-violet-500/10",
    glowColor: "bg-violet-500/10",
    tagline: "Algebra, Trigonometry, Calculus, Vectors & Coordinate Geometry",
    hasLabs: false,
  },
  English: {
    icon: BookOpen,
    accentColor: "text-blue-500 dark:text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    gradientBg: "from-blue-500/10 via-card to-card",
    borderColor: "hover:border-blue-500/50 hover:shadow-blue-500/10",
    glowColor: "bg-blue-500/10",
    tagline: "Literary Texts, Critical Writing, Grammar & Rhetoric",
    hasLabs: false,
  },
  Nepali: {
    icon: Sparkles,
    accentColor: "text-orange-500 dark:text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    gradientBg: "from-orange-500/10 via-card to-card",
    borderColor: "hover:border-orange-500/50 hover:shadow-orange-500/10",
    glowColor: "bg-orange-500/10",
    tagline: "अनिवार्य नेपाली — व्याकरण, साहित्य, बोध र अभिव्यक्ति",
    hasLabs: false,
  },
};

type ClassSubjectsGridProps = {
  classSlug: string;
  className: string;
};

export function ClassSubjectsGrid({ classSlug, className }: ClassSubjectsGridProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return <div className="p-8 text-center text-muted-foreground">Class not found</div>;

  const totalUnits = cls.subjects.reduce((sum, s) => sum + s.units.length, 0);
  const totalHours = cls.subjects.reduce(
    (sum, s) => sum + s.units.reduce((uSum, u) => uSum + (u.hours ?? 0), 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-8 md:py-12 px-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-8 shadow-sm">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Official NEB 2076 / 2078 Curriculum Order</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {className}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every subject structured in official board syllabus sequence. Access deep chapter notes,
              verified step-by-step derivations, rigorous mathematical proofs, and 3D virtual simulations.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span>Subjects</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{cls.subjects.length}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-emerald-500" />
                <span>Hours</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{totalHours}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 text-violet-500" />
                <span>Units</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{totalUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Subjects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cls.subjects.map((subject) => {
          const conf = SUBJECT_CONFIG[subject.name] ?? {
            icon: BookOpen,
            accentColor: "text-primary",
            badgeBg: "bg-primary/10 text-primary border-primary/20",
            gradientBg: "from-primary/10 via-card to-card",
            borderColor: "hover:border-primary/50 hover:shadow-primary/10",
            glowColor: "bg-primary/10",
            tagline: subject.description,
            hasLabs: false,
          };
          const Icon = conf.icon;
          const subjectHours = subject.units.reduce((acc, u) => acc + (u.hours ?? 0), 0);

          return (
            <div
              key={subject.slug}
              className={`group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b ${conf.gradientBg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${conf.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${conf.badgeBg} shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-foreground text-lg tracking-tight">
                        {subject.name}
                      </h2>
                      <span className="text-[11px] text-muted-foreground">
                        {subject.units.length} Units · {subjectHours} Teaching Hours
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3.5 text-xs text-muted-foreground leading-relaxed">
                  {conf.tagline}
                </p>

                {/* Direct Cross-Links Dock */}
                <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                  <Link
                    href={`/${classSlug}/${subject.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-background/80 hover:bg-primary/10 hover:text-primary px-2.5 py-1 text-xs font-semibold text-foreground/90 border border-border/60 transition-colors"
                  >
                    <BookOpen className="h-3 w-3 text-sky-500" />
                    <span>Notes</span>
                  </Link>
                  <Link
                    href={`/derivations/${classSlug}/${subject.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-background/80 hover:bg-rose-500/10 hover:text-rose-500 px-2.5 py-1 text-xs font-semibold text-foreground/90 border border-border/60 transition-colors"
                  >
                    <Binary className="h-3 w-3 text-rose-500" />
                    <span>Derivations</span>
                  </Link>
                  <Link
                    href={`/theorems/${classSlug}/${subject.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-background/80 hover:bg-amber-500/10 hover:text-amber-500 px-2.5 py-1 text-xs font-semibold text-foreground/90 border border-border/60 transition-colors"
                  >
                    <GraduationCap className="h-3 w-3 text-amber-500" />
                    <span>Proofs</span>
                  </Link>
                  {conf.hasLabs && (
                    <Link
                      href="/lab"
                      className="inline-flex items-center gap-1 rounded-xl bg-background/80 hover:bg-violet-500/10 hover:text-violet-500 px-2.5 py-1 text-xs font-semibold text-foreground/90 border border-border/60 transition-colors"
                    >
                      <Atom className="h-3 w-3 text-violet-500" />
                      <span>3D Labs</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Main action footer */}
              <div className="mt-6 pt-3.5 border-t border-border/50 flex items-center justify-between">
                <Link
                  href={`/${classSlug}/${subject.slug}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>Open Complete Subject Hub</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Curriculum Unit Explorer */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Complete Syllabus Unit Directory
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Browse and filter all {totalUnits} units across {cls.subjects.length} subjects in exact curriculum order.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search units or topics..."
              className="w-full rounded-xl border border-border/80 bg-background/80 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-4">
          {cls.subjects.map((subject) => {
            const conf = SUBJECT_CONFIG[subject.name] ?? {
              icon: BookOpen,
              accentColor: "text-primary",
              badgeBg: "bg-primary/10 text-primary border-primary/20",
              gradientBg: "",
              borderColor: "",
              glowColor: "",
              tagline: "",
            };
            const Icon = conf.icon;

            const filteredUnits = filterQuery.trim()
              ? subject.units.filter(
                  (u) =>
                    u.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    u.topics.some((t) => t.toLowerCase().includes(filterQuery.toLowerCase()))
                )
              : subject.units;

            if (filteredUnits.length === 0) return null;

            return (
              <div
                key={subject.slug}
                className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-3 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg border ${conf.badgeBg}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{subject.name}</h3>
                    <span className="text-[11px] text-muted-foreground">
                      ({filteredUnits.length} {filteredUnits.length === 1 ? "unit" : "units"})
                    </span>
                  </div>
                  <Link
                    href={`/${classSlug}/${subject.slug}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>View Subject</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filteredUnits.map((unit, idx) => (
                    <Link
                      key={unit.id}
                      href={`/${classSlug}/${subject.slug}#${unit.id}`}
                      className="group inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-1.5 text-xs text-foreground/90 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary">
                        {idx + 1}.
                      </span>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {unit.title}
                      </span>
                      {unit.hours && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-muted text-muted-foreground font-mono">
                          {unit.hours}h
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
