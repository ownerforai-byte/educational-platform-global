"use client";

import React, { useState, useMemo } from "react";
import {
  DERIVATIONS_AND_THEOREMS,
  DerivationOrTheorem,
} from "@/lib/derivations-data";
import { DerivationVisual } from "./derivation-visual";
import { DerivationDetailView } from "./derivation-detail-view";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  BookOpen,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

export function DerivationsHubView() {
  const [selectedTrack, setSelectedTrack] = useState<"grade-11" | "extra" | "all">("grade-11");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDerivationId, setActiveDerivationId] = useState<string | null>(null);

  // Filtered derivations list based on curriculum track, subject, and search query
  const filteredDerivations = useMemo(() => {
    return DERIVATIONS_AND_THEOREMS.filter((d) => {
      const matchesTrack =
        selectedTrack === "all" ||
        (selectedTrack === "grade-11" && d.gradeTrack === "grade-11") ||
        (selectedTrack === "extra" && d.isExtra);

      const matchesSubject =
        selectedSubject === "all" ||
        (selectedSubject === "math" && d.subject === "mathematics") ||
        d.subject === selectedSubject;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.unit.toLowerCase().includes(q) ||
        d.statement.toLowerCase().includes(q) ||
        d.coreFormula.toLowerCase().includes(q) ||
        d.nebCode.toLowerCase().includes(q);

      return matchesTrack && matchesSubject && matchesSearch;
    });
  }, [selectedTrack, selectedSubject, searchQuery]);

  // If a derivation is actively selected, find it
  const activeDerivation = useMemo(() => {
    if (!activeDerivationId) return null;
    return DERIVATIONS_AND_THEOREMS.find((d) => d.id === activeDerivationId) || null;
  }, [activeDerivationId]);

  // Counts by track
  const grade11Count = useMemo(
    () => DERIVATIONS_AND_THEOREMS.filter((d) => d.gradeTrack === "grade-11").length,
    [],
  );
  const extraCount = useMemo(
    () => DERIVATIONS_AND_THEOREMS.filter((d) => d.isExtra).length,
    [],
  );

  // Subject collections based on current filters
  const mathTheorems = useMemo(() => {
    return filteredDerivations.filter((d) => d.subject === "mathematics");
  }, [filteredDerivations]);

  const physicsDerivations = useMemo(() => {
    return filteredDerivations.filter((d) => d.subject === "physics");
  }, [filteredDerivations]);

  const chemistryDerivations = useMemo(() => {
    return filteredDerivations.filter((d) => d.subject === "chemistry");
  }, [filteredDerivations]);

  const biologyPrinciples = useMemo(() => {
    return filteredDerivations.filter((d) => d.subject === "biology");
  }, [filteredDerivations]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 px-4 sm:px-6">
      {/* ── 1. PAGE HEADER & CURRICULUM BANNER ───────────────────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Complete Rigorous Library · Visuals First · Quality Proofs</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Derivations &amp; Mathematical Theorems Hub
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              Organized strictly according to the official Nepal NEB Grade 11 Syllabus (2076/2078). Every theorem and derivation features its interactive geometric visual first, followed by rigorous step-by-step proofs, concerned terms, and important solved exam questions with visual solutions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search theorems, formulas, NEB code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-border bg-card text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── 2. CURRICULUM TRACK SELECTOR (User requested strict Grade 11 vs Extra organization) ── */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-2 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setSelectedTrack("grade-11");
                setActiveDerivationId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedTrack === "grade-11"
                  ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Official NEB Grade 11 Syllabus</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                {grade11Count}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedTrack("extra");
                setActiveDerivationId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedTrack === "extra"
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Extra: Grade 12 &amp; CEE Entrance</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-background/20 font-mono">
                {extraCount}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedTrack("all");
                setActiveDerivationId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedTrack === "all"
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>All Tracks ({DERIVATIONS_AND_THEOREMS.length})</span>
            </button>
          </div>

          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-1">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>
              {selectedTrack === "grade-11"
                ? "Showing official NEB Grade 11 units (Mat. 007, Phy. 101, Che. 201, Bio. 201)."
                : selectedTrack === "extra"
                ? "Advanced topics outside Grade 11 board syllabus, tagged [EXTRA] for CEE/IOE entrance."
                : "Combined view with Grade 11 and Extra items clearly labeled."}
            </span>
          </div>
        </div>

        {/* ── 3. SUBJECT FILTER TABS ───────────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={() => {
              setSelectedSubject("all");
              setActiveDerivationId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Subjects ({filteredDerivations.length})
          </button>

          <button
            onClick={() => {
              setSelectedSubject("math");
              setActiveDerivationId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedSubject === "math"
                ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/50"
                : "bg-card border border-border text-foreground hover:border-indigo-500/50"
            }`}
          >
            <Calculator className="h-3.5 w-3.5 text-indigo-400" />
            <span>Math (Theorems with Visuals)</span>
          </button>

          <button
            onClick={() => {
              setSelectedSubject("physics");
              setActiveDerivationId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedSubject === "physics"
                ? "bg-sky-600 text-white shadow-sm ring-2 ring-sky-400/50"
                : "bg-card border border-border text-foreground hover:border-sky-500/50"
            }`}
          >
            <Atom className="h-3.5 w-3.5 text-sky-400" />
            <span>Physics Derivations</span>
          </button>

          <button
            onClick={() => {
              setSelectedSubject("chemistry");
              setActiveDerivationId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedSubject === "chemistry"
                ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/50"
                : "bg-card border border-border text-foreground hover:border-amber-500/50"
            }`}
          >
            <FlaskConical className="h-3.5 w-3.5 text-amber-400" />
            <span>Chemistry Popular Derivations</span>
          </button>

          <button
            onClick={() => {
              setSelectedSubject("biology");
              setActiveDerivationId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedSubject === "biology"
                ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/50"
                : "bg-card border border-border text-foreground hover:border-emerald-500/50"
            }`}
          >
            <Dna className="h-3.5 w-3.5 text-emerald-400" />
            <span>Biology Mechanisms</span>
          </button>
        </div>
      </div>

      {/* ── 4. ACTIVE DETAILED DERIVATION INLINE MODAL ─────────────────────── */}
      {activeDerivation ? (
        <div className="rounded-3xl border-2 border-primary/50 bg-card p-6 sm:p-8 shadow-xl space-y-6 relative animate-fade-in">
          <button
            onClick={() => setActiveDerivationId(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
            title="Close Detailed View"
          >
            <X className="h-5 w-5" />
          </button>

          <DerivationDetailView derivation={activeDerivation} />
        </div>
      ) : null}

      {/* ── 5. SECTION: "MATH" (User: all theorems of math under section named math with visual first) ── */}
      {(selectedSubject === "all" || selectedSubject === "math") && mathTheorems.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-foreground">
                  Math — Theorems with Visuals, Rigorous Proofs &amp; Solved Questions
                </h2>
                <p className="text-xs text-muted-foreground">
                  Visual first, formal theorem statement, step-by-step mathematical proof, and important questions solved with visuals.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              {mathTheorems.length} Theorems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mathTheorems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveDerivationId(item.id)}
                className="group rounded-3xl border border-border/80 bg-card hover:border-indigo-500/60 p-5 space-y-4 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Badges: Curriculum Track & Solved Count */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {item.isExtra ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          [EXTRA: Grade 12 / Entrance]
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                          {item.nebCode}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {item.unit}
                      </span>
                    </div>

                    <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                      <GraduationCap className="h-3 w-3 text-indigo-400" />
                      <span>{item.solvedProblems.length} Solved Questions</span>
                    </span>
                  </div>

                  {/* VISUAL FIRST (User requested visual first!) */}
                  <div className="rounded-2xl border border-border/60 bg-muted/20 overflow-hidden pointer-events-none p-1">
                    <DerivationVisual visualType={item.visualType} title={item.title} />
                  </div>

                  {/* Theorem Title */}
                  <h3 className="text-base font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                    {item.title}
                  </h3>

                  {/* Formula Preview */}
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center text-xs font-mono font-bold text-foreground">
                    <MathMarkdown content={`$$${item.coreFormula}$$`} />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-bold text-indigo-500">
                  <span>View Proof &amp; Solved Questions with Visuals</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. SECTION: "PHYSICS DERIVATIONS" ─────────────────────────────── */}
      {(selectedSubject === "all" || selectedSubject === "physics") && physicsDerivations.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                <Atom className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-foreground">
                  Physics — Quality Calculus Derivations with Interactive Schematics
                </h2>
                <p className="text-xs text-muted-foreground">
                  Complete mechanics, kinematics, circular motion, kinetic theory, and optics derivations with diagrams and numerical problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20">
              {physicsDerivations.length} Derivations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {physicsDerivations.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveDerivationId(item.id)}
                className="group rounded-3xl border border-border/80 bg-card hover:border-sky-500/60 p-5 space-y-4 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {item.isExtra ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          [EXTRA: Grade 12 / Entrance]
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          {item.nebCode}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {item.unit}
                      </span>
                    </div>

                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {item.proofSteps.length} Rigorous Steps
                    </span>
                  </div>

                  {/* VISUAL FIRST */}
                  <div className="rounded-2xl border border-border/60 bg-muted/20 overflow-hidden pointer-events-none p-1">
                    <DerivationVisual visualType={item.visualType} title={item.title} />
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-sky-500 transition-colors">
                    {item.title}
                  </h3>

                  {/* Formula Preview */}
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center text-xs font-mono font-bold text-foreground">
                    <MathMarkdown content={`$$${item.coreFormula}$$`} />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-bold text-sky-500">
                  <span>View Step-by-Step Derivation</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. SECTION: "CHEMISTRY POPULAR DERIVATIONS" ───────────────────── */}
      {(selectedSubject === "all" || selectedSubject === "chemistry") && chemistryDerivations.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-foreground">
                  Chemistry — All Popular Physical &amp; Electrochemistry Derivations
                </h2>
                <p className="text-xs text-muted-foreground">
                  Bohr hydrogen atom, Kp-Kc relation, Avogadro molecular mass, Arrhenius kinetics, and Nernst equations.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {chemistryDerivations.length} Popular Derivations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chemistryDerivations.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveDerivationId(item.id)}
                className="group rounded-3xl border border-border/80 bg-card hover:border-amber-500/60 p-5 space-y-4 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {item.isExtra ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          [EXTRA: Grade 12 / Entrance]
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {item.nebCode}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {item.unit}
                      </span>
                    </div>

                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {item.solvedProblems.length} Solved Problems
                    </span>
                  </div>

                  {/* VISUAL FIRST */}
                  <div className="rounded-2xl border border-border/60 bg-muted/20 overflow-hidden pointer-events-none p-1">
                    <DerivationVisual visualType={item.visualType} title={item.title} />
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>

                  {/* Formula Preview */}
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center text-xs font-mono font-bold text-foreground">
                    <MathMarkdown content={`$$${item.coreFormula}$$`} />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-bold text-amber-500">
                  <span>View Full Chemistry Derivation</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. SECTION: "BIOLOGY PRINCIPLES & MECHANISMS" ─────────────────── */}
      {(selectedSubject === "all" || selectedSubject === "biology") && biologyPrinciples.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Dna className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-foreground">
                  Biology — Fundamental Principles, Genetics &amp; Visual Mechanics
                </h2>
                <p className="text-xs text-muted-foreground">
                  Watson-Crick B-DNA double helix, mitosis vs meiosis crossing-over, Lindeman 10% trophic law, and Hardy-Weinberg equilibrium.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {biologyPrinciples.length} Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {biologyPrinciples.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveDerivationId(item.id)}
                className="group rounded-3xl border border-border/80 bg-card hover:border-emerald-500/60 p-5 space-y-4 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {item.isExtra ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          [EXTRA: Grade 12 / Entrance]
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {item.nebCode}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {item.unit}
                      </span>
                    </div>

                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {item.concernedTerms.length} Key Terms
                    </span>
                  </div>

                  {/* VISUAL FIRST */}
                  <div className="rounded-2xl border border-border/60 bg-muted/20 overflow-hidden pointer-events-none p-1">
                    <DerivationVisual visualType={item.visualType} title={item.title} />
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                    {item.title}
                  </h3>

                  {/* Formula Preview */}
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center text-xs font-mono font-bold text-foreground">
                    <MathMarkdown content={`$$${item.coreFormula}$$`} />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-bold text-emerald-500">
                  <span>View Mechanism &amp; Solved Problems</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredDerivations.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">No derivations found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search keywords, switching between Grade 11 and Extra tracks, or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSubject("all");
              setSelectedTrack("grade-11");
            }}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
