import React from "react";
import Link from "next/link";
import { getEducationLevels } from "@/lib/curriculum";
import { SYLLABUS } from "@/lib/syllabus";
import { Compass, GraduationCap, BookOpen, Layers, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Curriculum Levels & Grades",
  description: "Browse academic levels, classes, and subjects across the platform.",
};

export default async function LevelsPage() {
  const levels = await getEducationLevels();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Compass className="h-4 w-4" />
          <span>Curriculum Hierarchy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Education Levels &amp; Classes
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Explore courses, syllabus units, and learning pathways by education level and class track.
        </p>
      </div>

      {/* Main Levels Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* NEB Class 11 */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-sky-500/[0.07] via-card to-card p-6 shadow-sm hover:border-sky-500/40 hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Grade XI Track
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-foreground mt-4 tracking-tight">NEB Class 11 (Grade XI)</h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Foundational +2 curriculum covering core mechanics, general chemistry, cell biology, algebra, calculus, and national languages.
            </p>
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
              {SYLLABUS[0].subjects.map((s) => (
                <Link
                  key={s.slug}
                  href={`/class-11-notes/${s.slug}`}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-card border border-border/70 text-foreground/80 hover:border-sky-500/40 hover:text-sky-500 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <Link
              href="/class-11-notes"
              className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Explore Grade 11 Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* NEB Class 12 */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-violet-500/[0.07] via-card to-card p-6 shadow-sm hover:border-violet-500/40 hover:shadow-xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500 border border-violet-500/20 shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20">
                Grade XII Board Track
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-foreground mt-4 tracking-tight">NEB Class 12 (Grade XII)</h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Advanced board exam curriculum: wave optics, electromagnetism, organic chemistry, physiology, differential equations, and board question sets.
            </p>
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
              {SYLLABUS[1].subjects.map((s) => (
                <Link
                  key={s.slug}
                  href={`/class-12-notes/${s.slug}`}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-card border border-border/70 text-foreground/80 hover:border-violet-500/40 hover:text-violet-500 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <Link
              href="/class-12-notes"
              className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              <span>Explore Grade 12 Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Database Levels */}
        {levels.map((level) => (
          <div
            key={level.id}
            className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground mt-4">{level.name}</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {level.description || "Browse all study content and exam modules in the unified library."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/50">
              <Link
                href={`/levels/${level.slug}`}
                className="flex items-center justify-between text-xs font-bold text-primary hover:underline"
              >
                <span>Browse Content Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
