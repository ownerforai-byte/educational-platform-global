"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  Send,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { MathMarkdown } from "@/components/content/math-markdown";
import { apiFetch } from "@/lib/api-client";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";

interface MathSolveResponse {
  solution: string;
  provider: string;
  subject: string;
  classLevel: string;
  remaining?: number;
  limit?: number;
}

const PRESETS = [
  {
    label: "Projectile Trajectory",
    subject: "physics" as const,
    classLevel: "11",
    problem:
      "Derive the equation of the parabolic trajectory of a projectile launched with velocity u at an angle θ with the horizontal. Find its maximum height and horizontal range.",
  },
  {
    label: "Limits: L'Hôpital's Rule",
    subject: "mathematics" as const,
    classLevel: "11",
    problem:
      "Evaluate the limit: \\lim_{x \\to 0} \\frac{\\sin(ax) - \\tan(ax)}{x^3} using step-by-step expansion or L'Hôpital's rule.",
  },
  {
    label: "Integration by Parts",
    subject: "mathematics" as const,
    classLevel: "12",
    problem:
      "Evaluate \\int e^{2x} \\cos(3x) \\, dx using integration by parts, showing the recurrence relation.",
  },
  {
    label: "Carnot Engine Efficiency",
    subject: "physics" as const,
    classLevel: "11",
    problem:
      "Derive the expression for the thermal efficiency of a reversible Carnot engine operating between temperatures T_1 (source) and T_2 (sink): \\eta = 1 - \\frac{T_2}{T_1}.",
  },
  {
    label: "First Order Chemical Kinetics",
    subject: "chemistry" as const,
    classLevel: "12",
    problem:
      "Derive the integrated rate equation for a first-order reaction A \\to Products. Show that the half-life t_{1/2} is independent of the initial concentration.",
  },
];

const SYMBOLS = [
  { label: "\\frac{a}{b}", insert: "\\frac{numerator}{denominator}" },
  { label: "\\sqrt{x}", insert: "\\sqrt{x}" },
  { label: "\\int", insert: "\\int_{a}^{b} f(x) \\, dx" },
  { label: "\\lim", insert: "\\lim_{x \\to 0} " },
  { label: "\\sum", insert: "\\sum_{i=1}^{n} " },
  { label: "\\theta", insert: "\\theta" },
  { label: "\\pi", insert: "\\pi" },
  { label: "\\vec{v}", insert: "\\vec{v}" },
  { label: "\\Delta", insert: "\\Delta " },
  { label: "\\infty", insert: "\\infty" },
];

export default function MathStudioPage() {
  const [problem, setProblem] = useState("");
  const [subject, setSubject] = useState<"mathematics" | "physics" | "chemistry">("mathematics");
  const [classLevel, setClassLevel] = useState<"11" | "12" | "general">("11");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<MathSolveResponse | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSolve() {
    if (!problem.trim()) {
      toast.error("Please enter a math problem or derivation prompt.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch<MathSolveResponse>("/api/ai/solve-math", {
        method: "POST",
        body: JSON.stringify({
          problem,
          subject,
          classLevel,
          stepByStep: true,
          verification: true,
        }),
      });

      setResponse(res);
      toast.success("Solution generated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to solve. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!response?.solution) return;
    navigator.clipboard.writeText(response.solution);
    setCopied(true);
    toast.success("Solution copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  function insertSymbol(sym: string) {
    setProblem((prev) => prev + sym);
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-3 sm:px-4 py-6 sm:py-10">
      {/* ── Breadcrumb & Navigation ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to AI Studio Hub
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Zap className="h-3.5 w-3.5" /> Cerebras 2000+ tok/s
        </span>
      </div>

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-emerald-500/[0.08] via-card to-card p-6 sm:p-8 shadow-sm">
        <div className="absolute -top-12 -right-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <Calculator className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Veer AI Math & Derivation Studio
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Rigorous step-by-step calculus, trigonometry, mechanics & algebraic derivations with verified proofs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AiPlanStrip />

      {/* ── Input Box & Controls ────────────────────────────────────────── */}
      <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Subject:</span>
            {(["mathematics", "physics", "chemistry"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-all ${
                  subject === s
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Class Level */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Class:</span>
            {(["11", "12", "general"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setClassLevel(c)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  classLevel === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {c === "general" ? "General" : `Class ${c}`}
              </button>
            ))}
          </div>
        </div>

        {/* Quick presets */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            <span>Preset Exam Derivations & Numericals:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setProblem(p.problem);
                  setSubject(p.subject);
                  setClassLevel(p.classLevel as any);
                }}
                className="rounded-xl border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Math symbol helper bar */}
        <div className="flex flex-wrap items-center gap-1 border-t border-border/40 pt-3">
          <span className="text-[11px] text-muted-foreground mr-1">Insert symbol:</span>
          {SYMBOLS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertSymbol(s.insert)}
              className="rounded-lg border border-border/50 bg-background px-2 py-0.5 text-xs font-mono text-muted-foreground hover:border-emerald-500 hover:text-foreground transition-all"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Problem textarea */}
        <div className="relative">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleSolve();
              }
            }}
            placeholder="Type any math equation, word problem, calculus limit, or derivation prompt... (e.g. Find the derivative of f(x) = x^x from first principles)"
            rows={4}
            className="w-full resize-none rounded-2xl border border-border/70 bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-muted-foreground">
            Tip: Press <kbd className="rounded border bg-muted px-1">Ctrl + Enter</kbd> to solve instantly.
          </p>

          <div className="flex items-center gap-2">
            {problem && (
              <button
                type="button"
                onClick={() => {
                  setProblem("");
                  setResponse(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleSolve}
              disabled={loading || !problem.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Solving with Cerebras...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Solve Step-by-Step
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Solution Output Section ─────────────────────────────────────── */}
      {response && (
        <div className="rounded-3xl border border-emerald-500/30 bg-card p-6 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <BookOpen className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-foreground">Verified Mathematical Solution</h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                Provider: {response.provider}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Solution
                </>
              )}
            </button>
          </div>

          {/* Formatted Markdown Solution with KaTeX equations */}
          <div className="rounded-2xl bg-muted/20 p-4 border border-border/30 overflow-x-auto">
            <MathMarkdown content={response.solution} />
          </div>
        </div>
      )}
    </div>
  );
}

