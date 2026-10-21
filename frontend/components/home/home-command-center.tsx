"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Brain,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Atom,
  Zap,
} from "lucide-react";

interface HomeCommandCenterProps {
  totalTheorems: number;
  totalDerivations: number;
}

export function HomeCommandCenter({
  totalTheorems,
  totalDerivations,
}: HomeCommandCenterProps) {
  const [activeTab, setActiveTab] = useState<"all" | "class11" | "class12" | "entrance" | "stem">("all");

  return (
    <div className="relative border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-12 overflow-hidden">
      {/* Multi-layer Glow Effects */}
      <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Top badge & Hero */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
            <span>NEB Class 11 &amp; 12 Global Unified Knowledge Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            Master Every Concept Through{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              3D Labs &amp; Deep Notes
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            The complete educational platform: interactive 3D science labs, computational solvers,
            step-by-step theorem proofs, verified derivations, Veer quizzes, and curriculum-aligned notes across all 6 NEB subjects.
          </p>

          {/* Academic Stream Switcher Tabs */}
          <div className="pt-2 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="Portal focus"
              className="inline-flex flex-wrap items-center p-1 rounded-2xl bg-muted/60 border border-border/60 backdrop-blur-sm gap-1"
            >
              {[
                { id: "all", label: "All Portals" },
                { id: "class11", label: "Grade 11 Focus" },
                { id: "class12", label: "Grade 12 Focus" },
                { id: "stem", label: "Interactive STEM & 3D" },
                { id: "entrance", label: "CEE & Entrance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portal Jump Dock (Adapts to Active Tab) */}
          <div className="flex flex-wrap justify-center gap-2 pt-1 max-w-4xl">
            {activeTab === "all" && (
              <>
                {[
                  { label: "Curriculum & Notes", href: "/levels", icon: GraduationCap },
                  { label: "3D Virtual Labs", href: "/lab", icon: FlaskConical },
                  { label: "Theorems & Proofs", href: "/theorems", icon: Trophy },
                  { label: "Derivations Vault", href: "/derivations", icon: Zap },
                  { label: "Veer Quizzes & PYQs", href: "/quiz", icon: Target },
                  { label: "Knowledge Hub", href: "/knowledge", icon: BookOpen },
                  { label: "Veer Study Assistant", href: "/chat", icon: Brain },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3.5 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/periodic-table"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/40 bg-teal-500/10 px-3.5 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:border-teal-500 hover:bg-teal-500/20 transition-all shadow-sm"
                >
                  <Atom className="h-3.5 w-3.5 text-teal-500" />
                  <span>Periodic Table &amp; CEE</span>
                </Link>
              </>
            )}

            {activeTab === "class11" && (
              <>
                <Link
                  href="/class-11-notes"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3.5 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-all shadow-sm"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Grade 11 Master Hub</span>
                </Link>
                {[
                  { label: "Class 11 Derivations", href: "/derivations/class-11-notes" },
                  { label: "Class 11 Proofs", href: "/theorems/class-11-notes" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-all shadow-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}

            {activeTab === "class12" && (
              <>
                <Link
                  href="/class-12-notes"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-3.5 py-2 text-xs font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 transition-all shadow-sm"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Grade 12 Master Hub</span>
                </Link>
                {[
                  { label: "Class 12 Derivations", href: "/derivations/class-12-notes" },
                  { label: "Class 12 Proofs", href: "/theorems/class-12-notes" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-all shadow-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}

            {activeTab === "stem" && (
              <>
                <Link
                  href="/lab"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-3.5 py-2 text-xs font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 transition-all shadow-sm"
                >
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>3D Virtual Labs Hub</span>
                </Link>
                <Link
                  href="/lab/bio-3d-organelles"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>13 Cell Organelles 3D</span>
                </Link>
                <Link
                  href="/lab/bio-3d-cell"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3.5 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-all shadow-sm"
                >
                  <Atom className="h-3.5 w-3.5" />
                  <span>Plant &amp; Animal Cell 3D</span>
                </Link>
                <Link
                  href="/graphs"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all shadow-sm"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Interactive Graph Bank</span>
                </Link>
                <Link
                  href="/periodic-table"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-sm"
                >
                  <Atom className="h-3.5 w-3.5" />
                  <span>118 Elements Table</span>
                </Link>
                <Link
                  href="/mindmap"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-all shadow-sm"
                >
                  <span>Visual Mindmaps</span>
                </Link>
              </>
            )}

            {activeTab === "entrance" && (
              <>
                <Link
                  href="/periodic-table"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/40 bg-teal-500/10 px-3.5 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-all shadow-sm"
                >
                  <Atom className="h-3.5 w-3.5" />
                  <span>118 Elements &amp; CEE Trends</span>
                </Link>
                <Link
                  href="/knowledge/numerical-physics"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all shadow-sm"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Numerical Physics Mastery</span>
                </Link>
                <Link
                  href="/knowledge/numerical-chemistry"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-sm"
                >
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Numerical Chemistry Calculations</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Compact Live Stats Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/60 bg-card/60 px-6 py-4 shadow-sm backdrop-blur-md">
          {[
            { label: "3D Labs", count: "50+" },
            { label: "Theorem Proofs", count: `${totalTheorems}+` },
            { label: "Derivations", count: `${totalDerivations}+` },
            { label: "Curated Notes", count: "1,500+" },
            { label: "NEB Subjects", count: "6" },
            { label: "Practice & PYQs", count: "500+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tracking-tight text-foreground">{stat.count}</span>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
