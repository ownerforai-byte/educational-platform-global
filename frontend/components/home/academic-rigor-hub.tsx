"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  FileText,
  FlaskConical,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Microscope,
  Zap,
  Atom,
} from "lucide-react";

interface AcademicRigorHubProps {
  theoremEntriesCount: number;
  theoremByClass: Map<string, Map<string, number>>;
  derivationEntriesCount: number;
  derivationByClass: Map<string, Map<string, number>>;
}

export function AcademicRigorHub({
  theoremEntriesCount,
  theoremByClass,
  derivationEntriesCount,
  derivationByClass,
}: AcademicRigorHubProps) {
  return (
    <section id="section-rigor" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <Trophy className="h-4 w-4" />
            <span>Academic Rigor &amp; Proofs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Theorems, Mathematical Derivations &amp; Lab Manuals
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Complete step-by-step mathematical proofs, verified Physics and Chemistry derivations, and laboratory experiment manuals for board exams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/theorems"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <span>Theorems</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="/derivations"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <span>Derivations</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="/practical"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <span>Practicals</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Card 1: Theorems & Proofs */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:border-amber-500/40 hover:shadow-lg transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {theoremEntriesCount}+ Theorem Proofs
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-4">
              Mathematical Theorems &amp; Proofs
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Step-by-step rigorous proofs across Calculus, Trigonometry, Coordinate Geometry, and Algebra for Class 11 and 12.
            </p>

            {/* Class Breakdown */}
            <div className="mt-4 space-y-2.5">
              {[...theoremByClass.entries()].map(([classSlug, subjectMap]) => {
                const classLabel = classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                const total = [...subjectMap.values()].reduce((a, b) => a + b, 0);

                return (
                  <div key={classSlug} className="rounded-2xl border border-border/50 bg-muted/30 p-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                      <span>{classLabel}</span>
                      <span className="text-[11px] text-muted-foreground">{total} proofs</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {[...subjectMap.entries()].map(([subj, count]) => (
                        <Link
                          key={subj}
                          href={`/theorems/${classSlug}/${subj}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-card border border-border/50 text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        >
                          <span className="capitalize">{subj}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">({count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Link
              href="/theorems"
              className="flex items-center justify-between text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
            >
              <span>Explore All Theorem Proofs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: Derivations Vault */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:border-violet-500/40 hover:shadow-lg transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                {derivationEntriesCount}+ Derivations
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-4">
              Physics &amp; Chemistry Derivations
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Essential derivations for board exams: equations of motion, thermodynamics, optics, electrostatics, kinetics &amp; chemical equilibria.
            </p>

            {/* Derivations breakdown */}
            <div className="mt-4 space-y-2.5">
              {[...derivationByClass.entries()].map(([classSlug, subjectMap]) => {
                const classLabel = classSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                const total = [...subjectMap.values()].reduce((a, b) => a + b, 0);

                return (
                  <div key={classSlug} className="rounded-2xl border border-border/50 bg-muted/30 p-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                      <span>{classLabel}</span>
                      <span className="text-[11px] text-muted-foreground">{total} derivations</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {[...subjectMap.entries()].map(([subj, count]) => (
                        <Link
                          key={subj}
                          href={`/derivations/${classSlug}/${subj}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-card border border-border/50 text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        >
                          <span className="capitalize">{subj}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">({count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Link
              href="/derivations"
              className="flex items-center justify-between text-xs font-bold text-violet-500 hover:text-violet-600 transition-colors"
            >
              <span>Explore Derivations Vault</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Card 3: Practical Science Manuals */}
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:border-emerald-500/40 hover:shadow-lg transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <FlaskConical className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Lab Manuals
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mt-4">
              Practical Science Experiments
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Complete laboratory syllabus for NEB Class 11 &amp; 12. Objectives, apparatus, procedural steps, observations, and error analyses.
            </p>

            <div className="mt-4 space-y-2">
              {[
                { name: "Physics Practical", slug: "physics", desc: "Spherometer, Vernier, Lee's Disc, Ohm's Law, Prism & Lenses", icon: Atom, color: "text-sky-400" },
                { name: "Chemistry Practical", slug: "chemistry", desc: "Volumetric Titration, Salt Analysis, Organic Functional Groups", icon: FlaskConical, color: "text-amber-400" },
                { name: "Biology Practical", slug: "biology", desc: "Microscopic Mounts, Plant/Animal Tissues, Physiology Experiments", icon: Microscope, color: "text-emerald-400" },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    href={`/practical/${p.slug}`}
                    className="group/item flex items-center justify-between p-3 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/70 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`h-4 w-4 ${p.color} shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{p.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover/item:text-primary shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Link
              href="/practical"
              className="flex items-center justify-between text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <span>View All Practical Syllabuses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
