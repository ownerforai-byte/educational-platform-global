"use client";

/**
 * EntranceInsight — an entrance-exam focus panel shown under a topic lab.
 *
 * Data comes from lib/entrance-insights.ts, matched by the topic title. When a
 * topic has no curated entry the component renders nothing, so non-physics
 * scenes (or unmapped topics) are never given hollow placeholder content.
 */

import {
  GraduationCap,
  Sigma,
  ListChecks,
  AlertTriangle,
  FileQuestion,
  TrendingUp,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { getEntranceInsight } from "@/lib/entrance-insights";

export function EntranceInsight({ topic }: { topic: string }) {
  const data = getEntranceInsight(topic);
  if (!data) return null;

  return (
    <section className="mt-4 space-y-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.05] p-4 sm:p-5">
      <header className="space-y-1.5">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-foreground">
          <GraduationCap className="h-4 w-4 text-indigo-500" />
          Entrance Exam Focus — {data.title}
        </h3>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span>{data.weightage}</span>
        </p>
      </header>

      {data.formulas.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            <Sigma className="h-3.5 w-3.5" />
            Must-know formulas
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.formulas.map((f, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/70 bg-card px-3 py-2 space-y-1"
              >
                <MathMarkdown content={`$$${f.tex}$$`} />
                {f.note && (
                  <p className="text-[11px] text-muted-foreground">{f.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <ListChecks className="h-3.5 w-3.5" />
          Key points that decide MCQs
        </p>
        <ul className="space-y-1">
          {data.keyPoints.map((k, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="shrink-0 font-bold text-emerald-500">✓</span>
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1.5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-500">
          <AlertTriangle className="h-3.5 w-3.5" />
          Common traps
        </p>
        <ul className="space-y-1">
          {data.traps.map((t, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="shrink-0 font-bold text-red-500">✗</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {data.pyq && (
        <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/[0.06] p-3 space-y-1">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            <FileQuestion className="h-3.5 w-3.5" />
            Typical entrance question
          </p>
          <p className="text-sm text-foreground leading-relaxed">{data.pyq}</p>
        </div>
      )}
    </section>
  );
}
