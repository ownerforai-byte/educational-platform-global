"use client";

import React, { useState } from "react";
import {
  DerivationOrTheorem,
  SolvedProblem,
} from "@/lib/derivations-data";
import { DerivationVisual } from "./derivation-visual";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  Layers,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

interface DerivationDetailViewProps {
  derivation: DerivationOrTheorem;
}

export function DerivationDetailView({ derivation }: DerivationDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"proof" | "problems" | "terms">("proof");
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(
    derivation.solvedProblems[0]?.id ?? null,
  );

  return (
    <div className="space-y-8">
      {/* ── 1. HEADER & META ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              derivation.subject === "mathematics"
                ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/30"
                : derivation.subject === "physics"
                ? "bg-sky-500/10 text-sky-500 border-sky-500/30"
                : derivation.subject === "chemistry"
                ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
            }`}
          >
            {derivation.subject === "mathematics"
              ? "Mathematics Theorem"
              : `${derivation.subject} Derivation`}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {derivation.unit} · {derivation.nebCode}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {derivation.title}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {derivation.statement}
        </p>

        {/* Core Formula Banner */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Core Equation / Theorem Formulation
            </span>
            <div className="text-lg font-mono font-black text-foreground">
              <MathMarkdown content={`$$${derivation.coreFormula}$$`} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-semibold text-foreground">
              {derivation.proofSteps.length} Rigorous Steps
            </span>
            <span className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-semibold text-foreground">
              {derivation.solvedProblems.length} Solved Exam Problems
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. VISUAL FIRST (User explicitly requested: visual first) ───────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Interactive Scientific Diagram &amp; Geometric Representation</span>
          </h2>
          <span className="text-[11px] text-muted-foreground">Visual Reference Engine</span>
        </div>

        <DerivationVisual
          visualType={derivation.visualType}
          title={derivation.title}
        />
      </div>

      {/* ── 3. TABS: PROOF, SOLVED PROBLEMS, CONCERNED TERMS ───────────────── */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("proof")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "proof"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Full Proof &amp; Derivation ({derivation.proofSteps.length} Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab("problems")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "problems"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Important Solved Questions with Visuals ({derivation.solvedProblems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("terms")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "terms"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Concerned Terms &amp; Definitions ({derivation.concernedTerms.length})</span>
        </button>
      </div>

      {/* ── TAB 1: STEP-BY-STEP PROOF ────────────────────────────────────── */}
      {activeTab === "proof" && (
        <div className="space-y-6">
          {/* Assumptions */}
          {derivation.assumptions && derivation.assumptions.length > 0 && (
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-2">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Preconditions &amp; Fundamental Physical Assumptions</span>
              </h3>
              <ul className="space-y-1 text-xs text-muted-foreground pl-4 list-disc">
                {derivation.assumptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sequential Step Cards */}
          <div className="space-y-4">
            {derivation.proofSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/40 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">
                    {step.title}
                  </h4>
                </div>

                {/* Mathematical Equation Block */}
                <div className="rounded-xl bg-muted/40 p-4 border border-border/60 overflow-x-auto text-sm font-mono">
                  <MathMarkdown content={`$$${step.latex}$$`} />
                </div>

                {/* Physical / Mathematical Justification */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Mathematical &amp; Physical Conclusion (Q.E.D.)
            </h4>
            <p className="text-xs text-foreground/90 font-medium">
              {derivation.conclusion}
            </p>
          </div>

          {/* Key Takeaways & Exam Traps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>High-Yield NEB &amp; CEE Takeaways</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {derivation.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
              <h4 className="text-xs font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Frequent Examination Pitfalls &amp; Traps</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {derivation.examTraps.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: SOLVED QUESTIONS WITH VISUALS ─────────────────────────── */}
      {activeTab === "problems" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground">
                Important Solved Questions with Step-by-Step Visuals
              </h3>
              <p className="text-xs text-muted-foreground">
                Hand-picked high-frequency examination questions from NEB board papers and CEE past entrance exams.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {derivation.solvedProblems.map((prob) => {
              const isExpanded = expandedProblemId === prob.id;
              return (
                <div
                  key={prob.id}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedProblemId(isExpanded ? null : prob.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {prob.examBadge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wide border border-primary/20">
                            {prob.examBadge}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-muted-foreground">
                          Given: {prob.given}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-foreground">
                        {prob.question}
                      </h4>
                    </div>

                    <div className="p-1 rounded-lg bg-muted text-muted-foreground shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-border/60 space-y-4 bg-muted/10">
                      {/* Step by step solution */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
                          Step-by-Step Solution:
                        </span>
                        <div className="space-y-1.5 pl-3 border-l-2 border-primary/40">
                          {prob.stepByStep.map((step, sIdx) => (
                            <div key={sIdx} className="text-xs text-muted-foreground leading-relaxed">
                              <MathMarkdown content={step} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Visual Description Card */}
                      {prob.visualDescription && (
                        <div className="rounded-xl border border-border/70 bg-card p-3 flex items-start gap-2.5">
                          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <div className="text-xs space-y-0.5">
                            <span className="font-bold text-foreground block">Visual Interpretation:</span>
                            <span className="text-muted-foreground">{prob.visualDescription}</span>
                          </div>
                        </div>
                      )}

                      {/* Final Answer Banner */}
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          Final Answer:
                        </span>
                        <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-300">
                          <MathMarkdown content={prob.finalAnswer} />
                        </span>
                      </div>

                      {/* Exam Tip */}
                      {prob.tipOrTrap && (
                        <div className="text-[11px] text-muted-foreground bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg flex items-start gap-2">
                          <span className="text-amber-500 font-bold">💡 Tip:</span>
                          <span>{prob.tipOrTrap}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 3: CONCERNED TERMS ──────────────────────────────────────── */}
      {activeTab === "terms" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {derivation.concernedTerms.map((term, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-foreground">
                  {term.term}
                </h4>
                {term.symbol && (
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-primary">
                    {term.symbol}
                  </span>
                )}
              </div>
              {term.units && (
                <span className="text-[10px] font-mono text-muted-foreground block">
                  SI Units: {term.units}
                </span>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {term.definition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
