import React from "react";
import Link from "next/link";
import { SYLLABUS } from "@/lib/syllabus";
import {
  BookOpen,
  FlaskConical,
  Brain,
  ArrowRight,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Subjects — Curriculum & Notes",
  description: "Explore all NEB (+2) subjects for Class 11 and 12: Physics, Chemistry, Mathematics, Biology, English, and Nepali.",
};

const SUBJECT_THEMES: Record<string, { icon: string; border: string; bg: string; badge: string }> = {
  mathematics: { icon: "🔢", border: "border-violet-500/30 hover:border-violet-500", bg: "from-violet-500/10 via-card to-card", badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
  physics:     { icon: "⚡", border: "border-sky-500/30 hover:border-sky-500",       bg: "from-sky-500/10 via-card to-card",    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
  chemistry:   { icon: "🧪", border: "border-amber-500/30 hover:border-amber-500",   bg: "from-amber-500/10 via-card to-card",  badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  biology:     { icon: "🌿", border: "border-emerald-500/30 hover:border-emerald-500", bg: "from-emerald-500/10 via-card to-card",badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  english:     { icon: "📖", border: "border-blue-500/30 hover:border-blue-500",      bg: "from-blue-500/10 via-card to-card",   badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  nepali:      { icon: "🇳🇵", border: "border-rose-500/30 hover:border-rose-500",      bg: "from-rose-500/10 via-card to-card",   badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Layers className="h-4 w-4" />
          <span>Complete Curriculum Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          All Subjects Directory
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Complete syllabus breakdown, theory chapters, 3D labs, and visual mindmaps for every NEB Grade 11 and Grade 12 subject.
        </p>
      </div>

      {/* Class Tracks */}
      {SYLLABUS.map((cls) => {
        const isClass11 = cls.slug === "class-11-notes";
        const notesSlug = isClass11 ? "class-11-notes" : "class-12-notes";

        return (
          <div key={cls.slug} className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{cls.name}</h2>
                <p className="text-xs text-muted-foreground">{cls.subjects.length} official subjects</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cls.subjects.map((subj) => {
                const theme = SUBJECT_THEMES[subj.slug] || {
                  icon: "📚",
                  border: "border-border/70 hover:border-primary",
                  bg: "from-primary/10 via-card to-card",
                  badge: "bg-primary/15 text-primary",
                };

                const totalTopics = subj.units.reduce((acc, u) => acc + u.topics.length, 0);
                const totalHours = subj.units.reduce((acc, u) => acc + (u.hours || 0), 0);

                return (
                  <div
                    key={subj.slug}
                    className={`flex flex-col justify-between rounded-3xl border ${theme.border} bg-gradient-to-br ${theme.bg} p-6 shadow-sm transition-all hover:shadow-lg`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{theme.icon}</span>
                          <div>
                            <h3 className="font-bold text-foreground text-lg">{subj.name}</h3>
                            <p className="text-xs text-muted-foreground">{subj.units.length} units &bull; {totalTopics} topics</p>
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
                        {subj.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                          Units Included:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {subj.units.slice(0, 3).map((u) => (
                            <span key={u.id} className="text-[10px] px-2 py-0.5 rounded bg-muted/70 text-foreground/80 truncate max-w-[180px]">
                              {u.title}
                            </span>
                          ))}
                          {subj.units.length > 3 && (
                            <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                              +{subj.units.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-2">
                      <Link
                        href={`/${notesSlug}/${subj.slug}`}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-2 px-3 text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        Notes
                      </Link>

                      <Link
                        href={`/${notesSlug}/${subj.slug}/mindmap`}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted py-2 px-3 text-xs font-semibold text-foreground transition-colors"
                      >
                        <Brain className="h-3.5 w-3.5 text-violet-400" />
                        Mind Map
                      </Link>

                      <Link
                        href={`/syllabus/${subj.slug}`}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted py-2 px-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Syllabus
                      </Link>

                      <Link
                        href={`/lab?subject=${subj.slug}`}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card hover:bg-muted py-2 px-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FlaskConical className="h-3.5 w-3.5 text-sky-400" />
                        Lab
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
