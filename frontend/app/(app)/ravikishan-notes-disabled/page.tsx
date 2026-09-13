import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import {
  BookOpen,
  Compass,
  Search,
  Sparkles,
  FlaskConical,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ravikishan Notes — Directory & Curriculum Guide",
  description:
    "All Ravikishan notes have been integrated into official NEB Class 11 and Class 12 topic pages. Select your subject and chapter.",
};

const SUBJECTS_11 = [
  { slug: "physics", name: "Physics", icon: "⚡" },
  { slug: "chemistry", name: "Chemistry", icon: "🧪" },
  { slug: "mathematics", name: "Mathematics", icon: "🔢" },
  { slug: "biology", name: "Biology", icon: "🌿" },
  { slug: "english", name: "English", icon: "📖" },
  { slug: "nepali", name: "Nepali", icon: "🇳🇵" },
];

const SUBJECTS_12 = [
  { slug: "physics", name: "Physics", icon: "⚡" },
  { slug: "chemistry", name: "Chemistry", icon: "🧪" },
  { slug: "mathematics", name: "Mathematics", icon: "🔢" },
  { slug: "biology", name: "Biology", icon: "🌿" },
  { slug: "english", name: "English", icon: "📖" },
  { slug: "nepali", name: "Nepali", icon: "🇳🇵" },
];

export default function RavikishanNotesDisabledPage() {
  return (
    <div className="mx-auto max-w-5xl py-10 px-4 space-y-10">
      {/* Migration Notice Banner */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Full Content Integration Complete</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Ravikishan Notes &amp; Concept Library
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All ravikishan concept notes, formulas, and solved problems are now directly linked to their official CDC curriculum units and topics under <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-semibold">/class-11-notes</code> and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-semibold">/class-12-notes</code>.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <BackButton />
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow hover:bg-primary/90 transition"
            >
              <Search className="h-3.5 w-3.5" />
              Search All Notes
            </Link>
          </div>
        </div>
      </div>

      {/* Class 11 Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Class 11 (Grade XI) Notes</h2>
              <p className="text-xs text-muted-foreground">Browse concept notes and syllabus units</p>
            </div>
          </div>
          <Link
            href="/class-11-notes"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            All Class 11 Notes <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {SUBJECTS_11.map((subj) => (
            <Link
              key={subj.slug}
              href={`/class-11-notes/${subj.slug}`}
              className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl mb-2">{subj.icon}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {subj.name}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Notes &amp; Units</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Class 12 Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Class 12 (Grade XII) Notes</h2>
              <p className="text-xs text-muted-foreground">Browse concept notes and syllabus units</p>
            </div>
          </div>
          <Link
            href="/class-12-notes"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            All Class 12 Notes <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {SUBJECTS_12.map((subj) => (
            <Link
              key={subj.slug}
              href={`/class-12-notes/${subj.slug}`}
              className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl mb-2">{subj.icon}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {subj.name}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Notes &amp; Units</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access Badges */}
      <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Compass className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Additional Study Portals:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/syllabus"
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition flex items-center gap-1.5"
          >
            <BookOpen className="h-3.5 w-3.5 text-sky-500" /> CDC Syllabus
          </Link>
          <Link
            href="/derivations"
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Derivations &amp; Proofs
          </Link>
          <Link
            href="/practical"
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition flex items-center gap-1.5"
          >
            <FlaskConical className="h-3.5 w-3.5 text-emerald-500" /> Practical Labs
          </Link>
        </div>
      </div>
    </div>
  );
}
