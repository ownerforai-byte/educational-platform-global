"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";

/**
 * Structured shape of a formula-bank entry (`HighYieldTopicData.speedFormulas`).
 * Declared structurally rather than imported so this presentational component
 * stays independent of the fact-bank module.
 */
export type StructuredFormula = {
  name: string;
  formula: string;
  description: string;
  unit: string;
  dimensions?: string;
};

/**
 * Formula strings in the bank are stored as raw LaTeX ("\\frac{1}{f} = ..."),
 * not as delimited markdown. Wrap them in display math so `MathMarkdown`
 * renders them through the `.prose` formula-card styling. Already-delimited
 * input is passed through untouched.
 */
export function toDisplayMath(formula: string): string {
  const trimmed = formula.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("$") || trimmed.startsWith("\\[") || trimmed.startsWith("\\(")) {
    return trimmed;
  }
  return `$$${trimmed}$$`;
}

type FormulaCardProps = {
  formula: StructuredFormula;
  /** 1-based position, shown as the card badge. */
  index: number;
};

/**
 * Single formula rendered as a self-contained revision card: name, copyable
 * display equation, plain-language meaning, and the SI unit / dimension chips
 * students are expected to recall in the exam.
 */
export function FormulaCard({ formula, index }: FormulaCardProps) {
  const [copied, setCopied] = useState(false);
  const latex = formula.formula.trim();

  async function handleCopy() {
    if (!latex) return;
    try {
      await navigator.clipboard.writeText(latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (insecure context / denied) — keep the card silent.
    }
  }

  return (
    <article className="group flex h-full flex-col gap-2.5 rounded-2xl border border-sky-500/25 bg-card p-4 shadow-sm transition-colors hover:border-sky-500/50">
      <header className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-sky-500/15 px-1.5 text-[10px] font-extrabold text-sky-600 dark:text-sky-400">
            {index}
          </span>
          <h4 className="text-[13px] font-bold leading-snug text-foreground">{formula.name}</h4>
        </div>
        {latex && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${formula.name} equation`}
            title={copied ? "Copied LaTeX" : "Copy LaTeX"}
            className="shrink-0 rounded-lg border border-border/60 bg-background/70 p-1.5 text-muted-foreground opacity-0 transition-all hover:text-sky-500 focus-visible:opacity-100 group-hover:opacity-100"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
      </header>

      {latex && <MathMarkdown content={toDisplayMath(latex)} className="text-sm" />}

      {formula.description && (
        <p className="text-xs leading-relaxed text-muted-foreground">{formula.description}</p>
      )}

      <footer className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        {formula.unit && (
          <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400">
            SI: {formula.unit}
          </span>
        )}
        {formula.dimensions && (
          <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            [{formula.dimensions}]
          </span>
        )}
      </footer>
    </article>
  );
}
