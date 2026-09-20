"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Beaker,
  Zap,
  Dna,
  PenLine,
  ArrowRight,
} from "lucide-react";

export function KnowledgeLoksewaHub() {
  return (
    <section id="section-knowledge" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
            <BookOpen className="h-4 w-4" />
            <span>High-Yield Knowledge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Numerical Guides, Diagram Atlas &amp; Grammar
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Targeted problem-solving guides for science subjects, high-resolution labeled anatomy diagrams, English grammar &amp; writing, and Nepali Byakaran.
          </p>
        </div>

        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors self-start md:self-auto"
        >
          <span>All Knowledge Modules</span>
          <ArrowRight className="h-3.5 w-3.5 text-primary" />
        </Link>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            High-Yield Subject Masteries
          </h3>
          <span className="text-xs text-muted-foreground">Formulas, Numericals &amp; Diagrams</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/knowledge/numerical-physics",
              title: "Numerical Physics Guide",
              desc: "Kinematics, laws of motion, gravitation, thermodynamics & electrostatics numerical solvers.",
              icon: Zap,
              color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
            },
            {
              href: "/knowledge/numerical-chemistry",
              title: "Numerical Chemistry Guide",
              desc: "Mole concept, stoichiometry, gas laws, molarity, pH & thermochemistry step-by-step.",
              icon: Beaker,
              color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            },
            {
              href: "/knowledge/biology-diagrams",
              title: "Biology Diagram Atlas",
              desc: "Official NEB XI & XII labeled diagrams of cells, organ systems, tissues & physiological cycles.",
              icon: Dna,
              color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            },
            {
              href: "/knowledge/grammar",
              title: "English Grammar",
              desc: "Master tenses, clauses, voice, narration, conditionals & transformations — routed separately from writing formats.",
              icon: BookOpen,
              color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
            },
            {
              href: "/knowledge/byakaran",
              title: "नेपाली व्याकरण र रचना",
              desc: "शब्दवर्ग, पदसङ्गति, कारक र विभक्ति, काल र पक्ष, समास, विग्रह तथा निबन्ध लेखन।",
              icon: BookOpen,
              color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
            },
            {
              href: "/knowledge/writing",
              title: "English Writing & Composition",
              desc: "Structured frameworks for essays, formal letters, reports, summary writing, and critical reviews.",
              icon: PenLine,
              color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${card.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-end text-[11px] font-semibold text-primary">
                  <span>Study Guide &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
