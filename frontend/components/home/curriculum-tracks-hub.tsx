"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Brain,
  Layers,
  ArrowRight,
  Sparkles,
  FileText,
  Compass,
  GraduationCap,
  Clock,
  ExternalLink,
} from "lucide-react";
import type { ClassSyllabus, SubjectSyllabus } from "@/lib/syllabus";

interface CurriculumTracksHubProps {
  class11: ClassSyllabus;
  class12: ClassSyllabus;
}

const SUBJECT_THEMES: Record<string, { icon: string; border: string; bg: string; badge: string; text: string }> = {
  mathematics: { icon: "🔢", border: "hover:border-violet-500/50", bg: "from-violet-500/10 via-purple-500/5 to-transparent", badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400", text: "text-violet-500" },
  physics:     { icon: "⚡", border: "hover:border-sky-500/50",    bg: "from-sky-500/10 via-blue-500/5 to-transparent",     badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400",       text: "text-sky-500" },
  chemistry:   { icon: "🧪", border: "hover:border-amber-500/50",  bg: "from-amber-500/10 via-orange-500/5 to-transparent",  badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",  text: "text-amber-500" },
  biology:     { icon: "🌿", border: "hover:border-emerald-500/50",bg: "from-emerald-500/10 via-teal-500/5 to-transparent", badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",text: "text-emerald-500" },
  english:     { icon: "📖", border: "hover:border-blue-500/50",   bg: "from-blue-500/10 via-indigo-500/5 to-transparent",   badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400",     text: "text-blue-500" },
  nepali:      { icon: "🇳🇵", border: "hover:border-rose-500/50",   bg: "from-rose-500/10 via-red-500/5 to-transparent",      badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",     text: "text-rose-500" },
};

export function CurriculumTracksHub({ class11, class12 }: CurriculumTracksHubProps) {
  const [activeClass, setActiveClass] = useState<"class-11" | "class-12">("class-11");

  const currentClassData = activeClass === "class-11" ? class11 : class12;
  const notesClassSlug = activeClass === "class-11" ? "class-11-notes" : "class-12-notes";

  return (
    <section id="section-curriculum" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>Academic Curriculum Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Complete Notes, Syllabus &amp; Mindmaps
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Official curriculum-aligned theory chapters, visual mind maps, and unit-by-unit syllabus breakdowns for National Examination Board (+2) science &amp; general subjects.
          </p>
        </div>

        {/* Class Switcher Pills */}
        <div className="flex items-center p-1 rounded-2xl border border-border/70 bg-card shadow-sm self-start md:self-auto">
          <button
            onClick={() => setActiveClass("class-11")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeClass === "class-11"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Class 11 (Grade XI)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">6 Subjects</span>
          </button>
          <button
            onClick={() => setActiveClass("class-12")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeClass === "class-12"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Class 12 (Grade XII)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">6 Subjects</span>
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentClassData.subjects.map((subject) => {
          const theme = SUBJECT_THEMES[subject.slug] || {
            icon: "📚",
            border: "hover:border-primary/50",
            bg: "from-primary/10 to-transparent",
            badge: "bg-primary/15 text-primary",
            text: "text-primary",
          };

          const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
          const totalHours = subject.units.reduce((acc, u) => acc + (u.hours || 0), 0);

          return (
            <div
              key={subject.slug}
              className={`group flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-br ${theme.bg} bg-card p-6 shadow-sm transition-all duration-200 ${theme.border} hover:shadow-lg`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow-sm">{theme.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {subject.units.length} Units &bull; {totalTopics} Topics
                      </p>
                    </div>
                  </div>
                  {totalHours > 0 && (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${theme.badge} flex items-center gap-1`}>
                      <Clock className="h-3 w-3" />
                      {totalHours}h
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>

                {/* Sample units preview */}
                <div className="mt-4 pt-3 border-t border-border/50">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                    Key Syllabus Units:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {subject.units.slice(0, 3).map((u) => (
                      <span
                        key={u.id}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted/60 text-foreground/80 truncate max-w-[200px]"
                      >
                        {u.title}
                      </span>
                    ))}
                    {subject.units.length > 3 && (
                      <span className="text-[11px] text-muted-foreground px-1.5 py-0.5">
                        +{subject.units.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Hub */}
              <div className="mt-6 pt-4 border-t border-border/60 grid grid-cols-2 gap-2">
                <Link
                  href={`/${notesClassSlug}/${subject.slug}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary py-2 px-3 text-xs font-semibold transition-all shadow-sm"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Notes &amp; Theory
                </Link>

                <Link
                  href={`/${notesClassSlug}/${subject.slug}/mindmap`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted/70 text-foreground py-2 px-3 text-xs font-semibold transition-colors"
                >
                  <Brain className="h-3.5 w-3.5 text-violet-400" />
                  Mind Map
                </Link>

                <Link
                  href={`/syllabus/${subject.slug}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground py-2 px-3 text-xs font-medium transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Syllabus
                </Link>

                <Link
                  href={`/lab?subject=${subject.slug}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted/70 text-muted-foreground hover:text-foreground py-2 px-3 text-xs font-medium transition-colors"
                >
                  <FlaskConical className="h-3.5 w-3.5 text-sky-400" />
                  Subject Lab
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Curriculum Secondary Portals Banner */}
      <div className="mt-8 rounded-3xl border border-border/70 bg-gradient-to-r from-card via-muted/30 to-card p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/levels"
          className="group flex flex-col p-3.5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground group-hover:text-primary">
            <Compass className="h-4 w-4 text-primary" />
            Curriculum Levels
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Hierarchical tree view of levels, grades &amp; chapters</p>
        </Link>

        <Link
          href="/notes"
          className="group flex flex-col p-3.5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground group-hover:text-primary">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            Imported R Notes
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">All curated master notes from the unified archive</p>
        </Link>

        <Link
          href="/legend"
          className="group flex flex-col p-3.5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground group-hover:text-primary">
            <Layers className="h-4 w-4 text-amber-400" />
            Legend &amp; Key Facts
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Formula sheets, definitions, and key concept summaries</p>
        </Link>

        <Link
          href="/syllabus"
          className="group flex flex-col p-3.5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground group-hover:text-primary">
            <FileText className="h-4 w-4 text-sky-400" />
            Full Syllabus Explorer
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Official NEB marks weightage and teaching guidelines</p>
        </Link>
      </div>
    </section>
  );
}
