"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  GraduationCap,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  ChevronRight,
  Construction,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Eye,
} from "lucide-react";
import { DerivationsHubView } from "./derivations-hub-view";

export type DerivationTrackCard = {
  classSlug: string;
  subjectSlug: string;
  total: number;
  available: number;
  units: number;
};

const SUBJECT_META: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; accentColor: string; badgeBg: string }
> = {
  physics: {
    label: "Physics",
    icon: Atom,
    accentColor: "text-sky-500 dark:text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  chemistry: {
    label: "Chemistry",
    icon: FlaskConical,
    accentColor: "text-amber-500 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  biology: {
    label: "Biology",
    icon: Dna,
    accentColor: "text-emerald-500 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  mathematics: {
    label: "Mathematics",
    icon: Sigma,
    accentColor: "text-violet-500 dark:text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
};

export function DerivationsPageClient({
  trackCards,
}: {
  trackCards: DerivationTrackCard[];
}) {
  const [activeMode, setActiveMode] = useState<"interactive" | "syllabus">("interactive");

  const classLabel = (slug: string) =>
    slug === "class-11-notes"
      ? "NEB Class 11 (Grade XI)"
      : slug === "class-12-notes"
      ? "NEB Class 12 (Grade XII)"
      : slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const totalTopics = trackCards.reduce((sum, c) => sum + c.total, 0);
  const availableDerivations = trackCards.reduce((sum, c) => sum + c.available, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Formula Derivations · Step-by-Step Mechanisms</span>
              </div>
              <Link
                href="/theorems"
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Looking for formal proofs &amp; laws?</span>
                <span className="text-primary font-bold">Theorems Vault →</span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Formula Derivations &amp; Mechanisms Vault
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every crucial mathematical derivation and physical mechanism across NEB Class 11 &amp; 12 Physics, Chemistry, Biology, and Mathematics.
              Complete with governing formulas, line-by-line algebraic steps, interactive geometric visualizations, and board exam mark schemes.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-rose-500" />
                <span>Total Topics</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{totalTopics}</p>
              <p className="text-[10px] text-muted-foreground">Syllabus-Mapped</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>Interactive</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">{availableDerivations}</p>
              <p className="text-[10px] text-muted-foreground">Visual First</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md px-4 py-3 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5 text-violet-500" />
                <span>Grades</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-0.5">XI &amp; XII</p>
              <p className="text-[10px] text-muted-foreground">Official CDC 2076</p>
            </div>
          </div>
        </div>

        {/* View Mode Toggle Pill Bar */}
        <div className="relative z-10 mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-2xl border border-border/80 bg-background/80 p-1 backdrop-blur-md shadow-sm">
            <button
              onClick={() => setActiveMode("interactive")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeMode === "interactive"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Interactive Visual Studio</span>
            </button>
            <button
              onClick={() => setActiveMode("syllabus")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeMode === "syllabus"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Syllabus Sequence Directory</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Linked to:</span>
            <Link href="/periodic-table" className="text-foreground hover:text-primary underline font-medium">
              118 Elements
            </Link>
            <span>·</span>
            <Link href="/graphs" className="text-foreground hover:text-primary underline font-medium">
              Science Graphs
            </Link>
            <span>·</span>
            <Link href="/lab" className="text-foreground hover:text-primary underline font-medium">
              3D STEM Labs
            </Link>
          </div>
        </div>
      </div>

      {/* Mode 1: Interactive Visual Studio */}
      {activeMode === "interactive" && (
        <div className="rounded-3xl border border-border/70 bg-card p-2 sm:p-4 shadow-sm">
          <DerivationsHubView />
        </div>
      )}

      {/* Mode 2: Syllabus Order Tracks */}
      {activeMode === "syllabus" && (
        <div className="space-y-8">
          {["class-11-notes", "class-12-notes"].map((classSlug) => {
            const cards = trackCards.filter((c) => c.classSlug === classSlug);
            if (cards.length === 0) return null;

            return (
              <div
                key={classSlug}
                className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm"
              >
                <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-rose-500" />
                    <div>
                      <h2 className="font-bold text-foreground text-base">{classLabel(classSlug)}</h2>
                      <p className="text-xs text-muted-foreground">
                        Official NEB curriculum sequence for derivations and step mechanics
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/derivations/${classSlug}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>View Class Track</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cards.map((card) => {
                    const meta = SUBJECT_META[card.subjectSlug] ?? {
                      label: card.subjectSlug,
                      icon: Atom,
                      accentColor: "text-primary",
                      badgeBg: "bg-primary/10 text-primary border-primary/20",
                    };
                    const Icon = meta.icon;

                    return (
                      <Link
                        key={card.subjectSlug}
                        href={`/derivations/${card.classSlug}/${card.subjectSlug}`}
                        className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-4 transition-all hover:border-rose-500/40 hover:bg-muted/30"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.badgeBg}`}
                            >
                              {card.total} Topics
                            </span>
                            {card.available === 0 ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                <Construction className="h-2.5 w-2.5" /> Soon
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="h-3 w-3" /> Ready
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 mt-3">
                            <div className={`p-1.5 rounded-lg border ${meta.badgeBg}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                              {meta.label}
                            </h3>
                          </div>

                          <p className="mt-2 text-xs text-muted-foreground">
                            {card.units} units ·{" "}
                            {card.available > 0
                              ? `${card.available} with full step derivations`
                              : "Reserved syllabus slots"}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-bold text-rose-500">
                          <span>Open Track</span>
                          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cross-Vault Navigation Banner */}
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Looking for Formal Proofs and Scientific Laws?
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore the Theorems Vault with axioms, formal statements, and board exam proofs.
            </p>
          </div>
        </div>
        <Link
          href="/theorems"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-slate-950 transition-colors shadow-sm"
        >
          <span>Open Theorems Vault</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
