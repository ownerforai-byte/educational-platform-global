"use client";

import React, { useState, useMemo } from "react";
import {
  CELL_ORGANELLES,
  PLANT_VS_ANIMAL_COMPARISON,
  type CellOrganelleData,
} from "@/lib/cell-organelles-data";
import {
  Search,
  BookOpen,
  History,
  Activity,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ChevronDown,
  Atom,
  Dna,
  Zap,
  FlaskConical,
  Scale,
  GraduationCap,
} from "lucide-react";

export function CellOrganellesEncyclopedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "double" | "single" | "non-membranous" | "plant" | "animal"
  >("all");
  const [expandedId, setExpandedId] = useState<string | null>("nucleus");
  const [viewMode, setViewMode] = useState<"encyclopedia" | "comparison">("encyclopedia");

  const filteredOrganelles = useMemo(() => {
    return CELL_ORGANELLES.filter((org) => {
      // Category filter
      if (activeFilter === "double" && org.membraneType !== "Double Membrane") return false;
      if (activeFilter === "single" && org.membraneType !== "Single Membrane") return false;
      if (activeFilter === "non-membranous" && org.membraneType !== "Non-membranous") return false;
      if (activeFilter === "plant" && org.foundIn !== "plant-only") return false;
      if (activeFilter === "animal" && org.foundIn !== "animal-only") return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        org.name.toLowerCase().includes(q) ||
        (org.nepaliName && org.nepaliName.toLowerCase().includes(q)) ||
        org.nicknames.some((n) => n.toLowerCase().includes(q)) ||
        org.history.discoverer.toLowerCase().includes(q) ||
        org.functions.primary.some((f) => f.toLowerCase().includes(q)) ||
        org.ultrastructure.description.toLowerCase().includes(q)
      );
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-8 mt-10 pt-8 border-t border-border/70">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>NEB Class 11 Biology Unit 1 Reference</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-2">
            Cell Organelle Encyclopedia &amp; Master Comparison
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Exhaustive scientific profiles for all 13 eukaryotic organelles: discovery chronicle, discoverers,
            ultrastructure, biochemical pathways, and plant vs. animal cell differences.
          </p>
        </div>

        {/* View Switcher: Encyclopedia vs Comparison Table */}
        <div className="flex items-center p-1 rounded-2xl bg-muted/60 border border-border/70 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode("encyclopedia")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "encyclopedia"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Organelles ({CELL_ORGANELLES.length})</span>
          </button>
          <button
            onClick={() => setViewMode("comparison")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "comparison"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>Plant vs Animal Matrix</span>
          </button>
        </div>
      </div>

      {viewMode === "encyclopedia" ? (
        <>
          {/* Controls: Search & Category Filter Pills */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: `All (${CELL_ORGANELLES.length})` },
                { id: "double", label: "Double Membrane (3)" },
                { id: "single", label: "Single Membrane (6)" },
                { id: "non-membranous", label: "Non-Membranous (4)" },
                { id: "plant", label: "Plant Only (3)" },
                { id: "animal", label: "Animal Only (2)" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveFilter(pill.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeFilter === pill.id
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, scientist, or function..."
                className="w-full rounded-xl border border-border bg-card/90 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Organelle Cards Grid / Dossier */}
          <div className="space-y-4">
            {filteredOrganelles.map((org) => {
              const isExpanded = expandedId === org.id;

              return (
                <div
                  key={org.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-card ${
                    isExpanded
                      ? "border-primary/50 shadow-lg ring-1 ring-primary/20"
                      : "border-border/70 hover:border-border hover:shadow-md"
                  }`}
                >
                  {/* Card Header (Collapsible Trigger) */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : org.id)}
                    className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm font-black text-lg"
                        style={{
                          backgroundColor: `${org.accentColor}18`,
                          borderColor: `${org.accentColor}35`,
                          color: org.accentColor,
                        }}
                      >
                        {org.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                            {org.name}
                          </h3>
                          {org.nepaliName && (
                            <span className="text-xs text-muted-foreground font-normal">
                              ({org.nepaliName})
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {org.nicknames.map((nick, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-muted text-foreground/80"
                            >
                              ★ {nick}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <span
                        className={`text-[10.5px] font-bold px-2.5 py-1 rounded-xl border ${
                          org.membraneType === "Double Membrane"
                            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
                            : org.membraneType === "Single Membrane"
                            ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {org.membraneType}
                      </span>
                      <span
                        className={`text-[10.5px] font-bold px-2.5 py-1 rounded-xl border ${
                          org.foundIn === "plant-only"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : org.foundIn === "animal-only"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-muted text-foreground/70 border-border/70"
                        }`}
                      >
                        {org.foundIn === "plant-only"
                          ? "Plant Cells Only"
                          : org.foundIn === "animal-only"
                          ? "Animal Cells Only"
                          : "Plant & Animal"}
                      </span>
                      <div
                        className={`h-8 w-8 rounded-xl flex items-center justify-center border border-border/60 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 bg-primary/10 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Deep-Dive Dossier */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-border/50 space-y-6">
                      {/* Grid of details: History vs Ultrastructure */}
                      <div className="grid gap-5 md:grid-cols-2">
                        {/* 1. Discovery & Historical Chronicle */}
                        <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-3">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <History className="h-4 w-4" />
                            Discovery &amp; Historical Chronicle
                          </h4>
                          <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                            <p>
                              <strong className="text-foreground">Discoverer:</strong> {org.history.discoverer} ({org.history.year})
                            </p>
                            <p>
                              <strong className="text-foreground">Origin of Name:</strong> {org.history.naming}
                            </p>
                          </div>
                          <div className="space-y-1 pt-1">
                            <p className="text-[11px] font-bold text-foreground">Key Historical Milestones:</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {org.history.milestones.map((m, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                  <span className="text-amber-500 font-bold shrink-0">▸</span>
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {org.history.nobelPrize && (
                            <div className="mt-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300">
                              <Award className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                              <span>{org.history.nobelPrize}</span>
                            </div>
                          )}
                        </div>

                        {/* 2. Ultrastructure & Chemical Makeup */}
                        <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-3">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                            <Layers className="h-4 w-4" />
                            Ultrastructure &amp; Composition
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Average Dimensions:</strong> {org.ultrastructure.size}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {org.ultrastructure.description}
                          </p>
                          <div className="space-y-1 pt-1">
                            <p className="text-[11px] font-bold text-foreground">Anatomical Sub-components:</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {org.ultrastructure.components.map((comp, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                  <span className="text-sky-500 font-bold shrink-0">✓</span>
                                  <span>{comp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-xs text-muted-foreground pt-1 leading-relaxed border-t border-border/40">
                            <strong className="text-foreground">Chemical Composition:</strong> {org.ultrastructure.chemicalComposition}
                          </p>
                        </div>
                      </div>

                      {/* 3. Biochemical & Cellular Functions */}
                      <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          <Activity className="h-4 w-4" />
                          Physiological &amp; Biochemical Functions
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-bold text-foreground mb-1.5">Primary Cellular Roles:</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {org.functions.primary.map((fn, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                  <span className="text-emerald-500 font-bold shrink-0">●</span>
                                  <span>{fn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-foreground mb-1.5">Secondary &amp; Regulatory Roles:</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {org.functions.secondary.map((fn, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                  <span className="text-emerald-500 font-bold shrink-0">○</span>
                                  <span>{fn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-2 rounded-xl bg-background/80 border border-border/60 p-2.5 text-xs text-muted-foreground font-mono">
                          <span className="font-bold text-primary mr-1">Pathway:</span>
                          {org.functions.biochemicalPathway}
                        </div>
                      </div>

                      {/* 4. NEB Board Exam Essentials & High-Yield Tips */}
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-4 space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          <Sparkles className="h-4 w-4" />
                          NEB Board Exam Essentials &amp; High-Yield Facts
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                          <div className="space-y-1">
                            <p className="font-bold text-foreground">High-Yield Memory Points:</p>
                            <ul className="space-y-1 text-muted-foreground">
                              {org.examTips.highYieldFacts.map((fact, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-amber-500 font-bold">★</span>
                                  <span>{fact}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-foreground">Common Student Confusions:</p>
                            <ul className="space-y-1 text-muted-foreground">
                              {org.examTips.commonMistakes.map((mis, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-red-500 font-bold">✗</span>
                                  <span>{mis}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-amber-500/20 text-xs">
                          <span className="font-bold text-foreground mr-1">Frequent Board Exam Question:</span>
                          <span className="text-muted-foreground italic">
                            {org.examTips.sampleQuestions[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Plant vs Animal Cell Master Comparison Table */
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/40">
                    <th className="py-3.5 px-4 font-extrabold text-foreground uppercase tracking-wider w-1/5">
                      Diagnostic Feature
                    </th>
                    <th className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider w-2/5">
                      Plant Cell (Plant Eukaryote)
                    </th>
                    <th className="py-3.5 px-4 font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider w-2/5">
                      Animal Cell (Metazoan Eukaryote)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {PLANT_VS_ANIMAL_COMPARISON.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-foreground align-top">
                        {row.feature}
                        <div className="text-[10px] font-normal text-muted-foreground mt-1">
                          {row.significance}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground align-top leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{row.plantCell}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground align-top leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{row.animalCell}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Study Cheat Sheet */}
          <div className="rounded-3xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6 space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              NEB Class 11 Exam Strategy: How to Draw and Score 5/5 Marks
            </h4>
            <div className="grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground leading-relaxed">
              <div className="rounded-2xl border border-border/60 bg-card p-3.5">
                <p className="font-bold text-foreground mb-1">1. Dual Envelope Boundary</p>
                Always draw plant cells with TWO distinct boundary lines: the thick outer non-living cell wall and the thin inner plasma membrane.
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-3.5">
                <p className="font-bold text-foreground mb-1">2. Nuclear Position</p>
                Push the plant nucleus to the side (eccentric) because the central vacuole takes up 80–90% of space; keep the animal nucleus dead center.
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-3.5">
                <p className="font-bold text-foreground mb-1">3. Organelle Signatures</p>
                Remember: Centrosome + Lysosomes = Animal Cell. Cell Wall + Large Vacuole + Chloroplasts = Plant Cell.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
