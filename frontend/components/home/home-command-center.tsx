"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Brain,
  Target,
  Trophy,
  Calendar,
  Layers,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Atom,
  Calculator,
  Dna,
  Zap,
} from "lucide-react";

interface HomeCommandCenterProps {
  totalTheorems: number;
  totalDerivations: number;
}

const QUICK_SEARCH_ITEMS = [
  { label: "Physics 3D Mechanics Suite", href: "/lab/physics/physics-mechanics-suite-3d", category: "Physics Lab" },
  { label: "Chemistry Molecular Builder 3D", href: "/lab/chemistry/molecular-builder", category: "Chemistry Lab" },
  { label: "Biology 3D Cell Anatomy", href: "/lab/biology/cell-3d", category: "Biology Lab" },
  { label: "Math Equation Solver", href: "/lab/math/equation-solver", category: "Math Lab" },
  { label: "AI Quiz Generator", href: "/ai-quiz", category: "Assessment" },
  { label: "NEB Board Exam Countdown", href: "/exam-countdown", category: "Schedule" },
  { label: "Mathematical Theorems & Proofs", href: "/theorems", category: "Rigor" },
  { label: "Physics & Chemistry Derivations", href: "/derivations", category: "Rigor" },
  { label: "Numerical Physics Mastery", href: "/knowledge/numerical-physics", category: "Knowledge" },
  { label: "Numerical Chemistry Calculations", href: "/knowledge/numerical-chemistry", category: "Knowledge" },
  { label: "Loksewa Aayog Preparation", href: "/loksewa", category: "Competitive" },
  { label: "World Knowledge & Current Affairs", href: "/world-knowledge", category: "General" },
  { label: "Class 11 Complete Notes", href: "/class-11-notes", category: "Curriculum" },
  { label: "Class 12 Complete Notes", href: "/class-12-notes", category: "Curriculum" },
];

export function HomeCommandCenter({
  totalTheorems,
  totalDerivations,
}: HomeCommandCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = searchQuery.trim()
    ? QUICK_SEARCH_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-10">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Top badge */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
            <span>NEB Class 11 &amp; 12 Global Unified Knowledge Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Master Every Concept Through{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              3D Labs &amp; Deep Notes
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            The complete educational suite: interactive 3D science labs, computational solvers, step-by-step theorem proofs, verified derivations, AI quizzes, and curriculum-aligned notes across all 6 NEB subjects.
          </p>

          {/* Quick Smart Search */}
          <div className="relative w-full max-w-xl mt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jump to any lab, subject, theorem, calculator, or note..."
                className="w-full rounded-2xl border border-border/70 bg-card/90 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-lg backdrop-blur-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {filteredItems.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-2xl border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1.5">
                  Matching Modules ({filteredItems.length})
                </div>
                {filteredItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSearchQuery("")}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                        {item.category}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Category Jump Navigation Dock */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { label: "Curriculum Tracks", id: "section-curriculum", icon: GraduationCap },
              { label: "3D Virtual Labs", id: "section-labs", icon: FlaskConical },
              { label: "Theorems & Derivations", id: "section-rigor", icon: Trophy },
              { label: "AI Quizzes & Exam Countdown", id: "section-assessment", icon: Target },
              { label: "High-Yield & Loksewa", id: "section-knowledge", icon: BookOpen },
              { label: "AI Study Assistant", id: "section-ai", icon: Brain },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => scrollTo(btn.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3.5 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "NEB Subjects", count: "6", subtitle: "Physics, Chem, Math, Bio, Eng, Nep", icon: BookOpen, color: "text-sky-400" },
            { label: "3D Virtual Labs", count: "96+", subtitle: "Physics, Chem, Bio & Math Suites", icon: FlaskConical, color: "text-violet-400" },
            { label: "Theorem Proofs", count: `${totalTheorems}+`, subtitle: "Step-by-step rigorous proofs", icon: Trophy, color: "text-amber-400" },
            { label: "Derivations", count: `${totalDerivations}+`, subtitle: "Formula derivations with steps", icon: Zap, color: "text-rose-400" },
            { label: "Curated Notes", count: "1,500+", subtitle: "Full NEB curriculum chapters", icon: Layers, color: "text-emerald-400" },
            { label: "Practice & PYQs", count: "500+", subtitle: "AI quiz engine + Past questions", icon: Target, color: "text-blue-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold tracking-tight text-foreground">{stat.count}</span>
                  <Icon className={`h-5 w-5 ${stat.color} transition-transform group-hover:scale-110`} />
                </div>
                <h2 className="text-xs font-semibold text-foreground/90 mt-1">{stat.label}</h2>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 leading-snug">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
