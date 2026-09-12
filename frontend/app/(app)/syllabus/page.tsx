import React from "react";
import Link from "next/link";
import { SYLLABUS } from "@/lib/syllabus";
import {
  FileText,
  Clock,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Calendar,
} from "lucide-react";

export const metadata = {
  title: "Official Syllabus Explorer — NEB (+2)",
  description: "Official Curriculum Development Centre (CDC) & NEB syllabus for all Grade 11 and Grade 12 subjects.",
};

const SUBJECT_THEMES: Record<string, { icon: string; border: string; bg: string; badge: string }> = {
  mathematics: { icon: "🔢", border: "border-violet-500/30 hover:border-violet-500", bg: "from-violet-500/10 via-card to-card", badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
  physics:     { icon: "⚡", border: "border-sky-500/30 hover:border-sky-500",       bg: "from-sky-500/10 via-card to-card",    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
  chemistry:   { icon: "🧪", border: "border-amber-500/30 hover:border-amber-500",   bg: "from-amber-500/10 via-card to-card",  badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  biology:     { icon: "🌿", border: "border-emerald-500/30 hover:border-emerald-500", bg: "from-emerald-500/10 via-card to-card",badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  english:     { icon: "📖", border: "border-blue-500/30 hover:border-blue-500",      bg: "from-blue-500/10 via-card to-card",   badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  nepali:      { icon: "🇳🇵", border: "border-rose-500/30 hover:border-rose-500",      bg: "from-rose-500/10 via-card to-card",   badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
};

export default function SyllabusPage() {
  // Aggregate unique subjects across tracks
  const subjectMap = new Map<string, { name: string; description: string; totalUnits: number; totalHours: number }>();
  for (const cls of SYLLABUS) {
    for (const s of cls.subjects) {
      const existing = subjectMap.get(s.slug) ?? { name: s.name, description: s.description, totalUnits: 0, totalHours: 0 };
      existing.totalUnits += s.units.length;
      existing.totalHours += s.units.reduce((acc, u) => acc + (u.hours || 0), 0);
      subjectMap.set(s.slug, existing);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <FileText className="h-4 w-4" />
          <span>Curriculum Development Centre (CDC) NEB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Syllabus &amp; Curriculum Guidelines
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Comprehensive curriculum structures, teaching hour allocations, unit weightages, and historical revisions for Class 11 and Class 12.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...subjectMap.entries()].map(([slug, data]) => {
          const theme = SUBJECT_THEMES[slug] || {
            icon: "📚",
            border: "border-border/70 hover:border-primary",
            bg: "from-primary/10 via-card to-card",
            badge: "bg-primary/15 text-primary",
          };

          return (
            <div
              key={slug}
              className={`flex flex-col justify-between rounded-3xl border ${theme.border} bg-gradient-to-br ${theme.bg} p-6 shadow-sm transition-all hover:shadow-lg`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{theme.icon}</span>
                    <div>
                      <h2 className="font-bold text-foreground text-lg">{data.name}</h2>
                      <p className="text-xs text-muted-foreground">Class 11 &amp; 12 Unified</p>
                    </div>
                  </div>
                  {data.totalHours > 0 && (
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${theme.badge} flex items-center gap-1`}>
                      <Clock className="h-3 w-3" />
                      {data.totalHours}h
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {data.description}
                </p>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    {data.totalUnits} Units Total
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    CDC 2076/2078
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <Link
                  href={`/syllabus/${slug}`}
                  className="flex items-center justify-between text-xs font-bold text-primary hover:underline"
                >
                  <span>Explore Syllabus &amp; Revisions</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
