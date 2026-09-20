"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Trophy,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  CheckCircle2,
  Construction,
  BookOpen,
  X,
  Binary,
} from "lucide-react";

export type TheoremTrackCard = {
  classSlug: string;
  subjectSlug: string;
  total: number;
  available: number;
};

export type TheoremEntryData = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
  preview: string;
  hasProof: boolean;
};

const SUBJECT_CONFIG: Record<
  string,
  {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    borderHover: string;
    gradientBg: string;
  }
> = {
  physics: {
    name: "Physics",
    icon: Atom,
    accentColor: "text-amber-500 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    borderHover: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    gradientBg: "from-amber-500/[0.08] via-card to-card",
  },
  chemistry: {
    name: "Chemistry",
    icon: FlaskConical,
    accentColor: "text-cyan-500 dark:text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    borderHover: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
    gradientBg: "from-cyan-500/[0.08] via-card to-card",
  },
  biology: {
    name: "Biology",
    icon: Dna,
    accentColor: "text-emerald-500 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    borderHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    gradientBg: "from-emerald-500/[0.08] via-card to-card",
  },
  mathematics: {
    name: "Mathematics",
    icon: Sigma,
    accentColor: "text-violet-500 dark:text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    borderHover: "hover:border-violet-500/50 hover:shadow-violet-500/10",
    gradientBg: "from-violet-500/[0.08] via-card to-card",
  },
};

const FEATURED_THEOREMS = [
  {
    title: "Bernoulli's Theorem & Equation of Continuity",
    subject: "physics",
    classSlug: "class-11-notes",
    unit: "Fluids & Hydrodynamics",
    code: "PHY-11-FL-04",
    link: "/theorems/class-11-notes/physics",
  },
  {
    title: "Carnot Engine & Second Law of Thermodynamics",
    subject: "physics",
    classSlug: "class-11-notes",
    unit: "Thermodynamics",
    code: "PHY-11-TH-02",
    link: "/theorems/class-11-notes/physics",
  },
  {
    title: "Gauss's Theorem & Electric Flux Applications",
    subject: "physics",
    classSlug: "class-12-notes",
    unit: "Electrostatics",
    code: "PHY-12-ES-01",
    link: "/theorems/class-12-notes/physics",
  },
  {
    title: "Ampere's Circuital Law & Biot-Savart Rule",
    subject: "physics",
    classSlug: "class-12-notes",
    unit: "Magnetic Effect of Current",
    code: "PHY-12-MG-03",
    link: "/theorems/class-12-notes/physics",
  },
  {
    title: "Rolle's Theorem & Lagrange's Mean Value Theorem",
    subject: "mathematics",
    classSlug: "class-12-notes",
    unit: "Calculus & Applications of Derivatives",
    code: "MAT-12-CALC-05",
    link: "/theorems/class-12-notes/mathematics",
  },
  {
    title: "Bohr's Postulates & Hydrogen Spectral Series",
    subject: "physics",
    classSlug: "class-12-notes",
    unit: "Modern Physics & Atomic Structure",
    code: "PHY-12-MP-02",
    link: "/theorems/class-12-notes/physics",
  },
];

export function TheoremsExplorer({
  trackCards,
  allEntries,
}: {
  trackCards: TheoremTrackCard[];
  allEntries: TheoremEntryData[];
}) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const classLabel = (slug: string) =>
    slug === "class-11-notes"
      ? "NEB Class 11 (Grade XI)"
      : slug === "class-12-notes"
      ? "NEB Class 12 (Grade XII)"
      : slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Filter track cards based on user selection
  const filteredTrackCards = useMemo(() => {
    return trackCards.filter((card) => {
      const matchSubject = selectedSubject === "all" || card.subjectSlug === selectedSubject;
      const matchClass = selectedClass === "all" || card.classSlug === selectedClass;
      return matchSubject && matchClass;
    });
  }, [trackCards, selectedSubject, selectedClass]);

  // Filter raw entries based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allEntries.filter(
      (e) =>
        e.topicTitle.toLowerCase().includes(q) ||
        e.unitTitle.toLowerCase().includes(q) ||
        e.subjectSlug.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
    );
  }, [allEntries, searchQuery]);

  // Group track cards by class
  const cardsByClass = useMemo(() => {
    const map = new Map<string, TheoremTrackCard[]>();
    for (const card of filteredTrackCards) {
      const list = map.get(card.classSlug) ?? [];
      list.push(card);
      map.set(card.classSlug, list);
    }
    return map;
  }, [filteredTrackCards]);

  return (
    <div className="space-y-10">
      {/* Search and Filter Controls */}
      <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Subject Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedSubject("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSubject === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-foreground/80 hover:bg-muted"
              }`}
            >
              All Subjects
            </button>
            {(["physics", "chemistry", "biology", "mathematics"] as const).map((s) => {
              const conf = SUBJECT_CONFIG[s];
              const Icon = conf.icon;
              const isActive = selectedSubject === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? `${conf.badgeBg} ring-1 ring-primary/30`
                      : "bg-muted/40 text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{conf.name}</span>
                </button>
              );
            })}
          </div>

          {/* Grade filter pills */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedClass("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedClass === "all"
                  ? "bg-muted text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Grades
            </button>
            <button
              onClick={() => setSelectedClass("class-11-notes")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedClass === "class-11-notes"
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Grade 11
            </button>
            <button
              onClick={() => setSelectedClass("class-12-notes")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedClass === "class-12-notes"
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Grade 12
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search theorems, formal proofs, laws (e.g. Bernoulli, Carnot, Gauss, Rolle, Bohr)..."
            className="w-full rounded-2xl border border-border/80 bg-background/80 pl-10 pr-9 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Live Search Results (if searching) */}
      {searchQuery.trim() && (
        <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span>Search Results ({searchResults.length} proofs found)</span>
            </h3>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-primary hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No theorems found matching &ldquo;{searchQuery}&rdquo;. Try another term or browse the tracks below.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.slice(0, 12).map((item, idx) => (
                <Link
                  key={`${item.classSlug}-${item.subjectSlug}-${item.topicSlug}-${idx}`}
                  href={`/theorems/${item.classSlug}/${item.subjectSlug}`}
                  className="group rounded-2xl border border-border/60 bg-muted/20 p-3.5 hover:border-amber-500/40 hover:bg-muted/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[10px] text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {item.subjectSlug}
                      </span>
                      <span>{item.classSlug === "class-11-notes" ? "Class 11" : "Class 12"}</span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                      {item.topicTitle}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                      {item.preview || `Part of unit: ${item.unitTitle}`}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-semibold text-primary">
                    <span>View Formal Proof</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Featured High-Yield Theorems Showcase */}
      {!searchQuery.trim() && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>High-Yield Board Examination Theorems</span>
            </h2>
            <span className="text-xs text-muted-foreground">Repeated NEB Questions</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_THEOREMS.filter(
              (t) =>
                (selectedSubject === "all" || t.subject === selectedSubject) &&
                (selectedClass === "all" || t.classSlug === selectedClass)
            ).map((theorem) => {
              const conf = SUBJECT_CONFIG[theorem.subject] ?? SUBJECT_CONFIG.physics;
              const Icon = conf.icon;
              return (
                <Link
                  key={theorem.title}
                  href={theorem.link}
                  className={`group flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b ${conf.gradientBg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${conf.borderHover}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl border ${conf.badgeBg}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background/80 border border-border/60 text-muted-foreground">
                        {theorem.code}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-foreground text-sm mt-3 tracking-tight group-hover:text-primary transition-colors">
                      {theorem.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">{theorem.unit}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                    <span>Explore Proof Scaffold</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Syllabus-Ordered Track Cards by Class */}
      <div className="space-y-8">
        {[...cardsByClass.entries()].map(([classSlug, cards]) => (
          <div
            key={classSlug}
            className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm"
          >
            <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-bold text-foreground text-base">{classLabel(classSlug)}</h3>
                  <p className="text-xs text-muted-foreground">
                    Official syllabus curriculum sequence for theorems and mathematical derivations
                  </p>
                </div>
              </div>
              <Link
                href={`/theorems/${classSlug}`}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>View Full Class Index</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => {
                const conf = SUBJECT_CONFIG[card.subjectSlug] ?? SUBJECT_CONFIG.physics;
                const Icon = conf.icon;
                return (
                  <Link
                    key={card.subjectSlug}
                    href={`/theorems/${card.classSlug}/${card.subjectSlug}`}
                    className={`group flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/10 p-5 transition-all hover:bg-muted/30 ${conf.borderHover}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${conf.badgeBg}`}
                        >
                          {card.total} Topics
                        </span>
                        {card.available === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Construction className="h-2.5 w-2.5" /> Soon
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Proofs Ready
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 mt-3.5">
                        <div className={`p-1.5 rounded-lg border ${conf.badgeBg}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                          {conf.name}
                        </h4>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {card.available > 0
                          ? `${card.available} curated proofs with formal statements & geometric diagrams`
                          : "Full syllabus route indexed — derivations authored in sequence"}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary">
                      <span>Study Proofs</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Vault Navigation Banner */}
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Binary className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Looking for Algebraic Step-by-Step Formula Derivations?
            </h3>
            <p className="text-xs text-muted-foreground">
              Access the Formula Derivations Vault with boundary conditions and NEB mark breakdowns.
            </p>
          </div>
        </div>
        <Link
          href="/derivations"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <span>Open Derivations Vault</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
