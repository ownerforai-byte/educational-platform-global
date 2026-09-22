"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Copy,
  Check,
  Printer,
  X,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import type { PracticalExperiment } from "@/lib/practical-syllabus";

interface PracticalNotebookModalProps {
  experiment: PracticalExperiment | null;
  subjectName: string;
  onClose: () => void;
}

export function PracticalNotebookModal({
  experiment,
  subjectName,
  onClose,
}: PracticalNotebookModalProps) {
  const [copied, setCopied] = useState(false);

  if (!experiment) return null;

  const fullMarkdown = `
# NEB PRACTICAL RECORD NOTEBOOK
**Subject:** ${subjectName}
**Experiment:** ${experiment.title}

---

## 1. AIM / OBJECTIVE
${experiment.aim}

## 2. APPARATUS & CHEMICALS REQUIRED
${experiment.requirement?.map((r) => `- ${r}`).join("\n") || "Standard laboratory equipment."}

## 3. PRINCIPLE & THEORY
${experiment.theory?.map((t) => `${t}`).join("\n\n") || "Standard theoretical derivation."}

## 4. STEP-BY-STEP PROCEDURE
${experiment.procedure?.map((p, i) => `${i + 1}. ${p}`).join("\n") || "Step-by-step practical procedure."}

## 5. OBSERVATIONS & RECORD DATA
${experiment.observation?.map((o) => `- ${o}`).join("\n") || "Recorded experimental readings."}

## 6. CALCULATIONS & ERROR ANALYSIS
${experiment.calculation?.map((c) => `- ${c}`).join("\n") || "Calculations and numerical evaluations."}

## 7. FINAL RESULT & CONCLUSION
${experiment.result || "Experiment successfully completed with standard precision."}

## 8. PRECAUTIONS & SOURCES OF ERROR
${experiment.precautions?.map((p) => `- ${p}`).join("\n") || "Standard lab precautions."}
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-muted/40">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Official Practical Record Notebook Format
              </h3>
              <p className="text-[11px] text-muted-foreground">{subjectName} Practical Blueprint</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy Record"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border hover:bg-muted"
            >
              <Printer className="h-3.5 w-3.5" /> Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable Notebook) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-foreground leading-relaxed bg-background/50">
          {/* Header block */}
          <div className="text-center border-b border-border/60 pb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              National Examination Board (NEB) Practical File Writeup
            </span>
            <h2 className="text-lg font-black text-foreground">{experiment.title}</h2>
          </div>

          {/* Aim Section */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> 1. Aim of the Experiment
            </h4>
            <div className="p-3 rounded-xl bg-card border border-border/60 font-medium">
              {experiment.aim}
            </div>
          </div>

          {/* Apparatus Required */}
          {experiment.requirement && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                2. Apparatus & Reagents Required
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                {experiment.requirement.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Principle / Theory */}
          {experiment.theory && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> 3. Principle & Theoretical Formula
              </h4>
              <div className="space-y-2 p-4 rounded-xl bg-muted/40 border border-border/50">
                {experiment.theory.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Procedure */}
          {experiment.procedure && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                4. Step-by-Step Laboratory Procedure
              </h4>
              <ol className="space-y-1.5 pl-1">
                {experiment.procedure.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Observations */}
          {experiment.observation && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                5. Tabular Observations
              </h4>
              <div className="p-3 rounded-xl bg-card border border-border/60 space-y-1">
                {experiment.observation.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calculations */}
          {experiment.calculation && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                6. Calculations & Standard Substitution
              </h4>
              <div className="p-3 rounded-xl bg-muted/40 font-mono space-y-1 border border-border/40">
                {experiment.calculation.map((c, i) => (
                  <div key={i}>{c}</div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {experiment.result && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> 7. Final Result & Inferences
              </h4>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-semibold text-foreground">
                {experiment.result}
              </div>
            </div>
          )}

          {/* Precautions */}
          {experiment.precautions && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> 8. Precautions & Sources of Error
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {experiment.precautions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
