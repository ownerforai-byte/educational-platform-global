"use client";

import { useState } from "react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { cn } from "@/lib/utils";
import type { PyqYear } from "@/lib/pyq-bank";

function ExpandableQuestion({
  index,
  q,
}: {
  index: number;
  q: { question: string; marks?: string | number; solution?: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-muted/40"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">
          <span className="mb-1 inline-flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {index}
            </span>
            {typeof q.marks !== "undefined" && q.marks !== "" ? (
              <span className="shrink-0 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {q.marks} mark{q.marks === 1 ? "" : "s"}
              </span>
            ) : null}
          </span>
          <span className="block text-sm leading-relaxed text-foreground">
            {q.question}
          </span>
        </span>
        <span
          className={cn(
            "mt-1 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-primary transition-transform",
            open && "text-amber-500",
          )}
        >
          {open ? "Hide" : "Show"}
          <span className="sr-only"> solution</span>
        </span>
      </button>

      {open ? (
        <div className="border-t border-border/70 bg-primary/5 px-4 py-3">
          {q.solution ? (
            <MathMarkdown content={q.solution} className="text-sm" />
          ) : (
            <p className="text-xs text-muted-foreground">Solution not provided yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function PyqYearCard({ year, pyq }: { year: number; pyq: PyqYear }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="animate-slide-up">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 hover:bg-primary/10"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {year}
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold">{pyq.title}</p>
            <p className="text-[11px] text-muted-foreground">
              {pyq.questions.length} questions · {pyq.examSource ?? "NEB"}
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {open ? "Collapse" : "Expand"}
        </span>
      </button>

      {open ? (
        <div className="mt-2 space-y-2">
          {pyq.questions.map((q, idx) => (
            <ExpandableQuestion key={idx} index={idx + 1} q={q} />
          ))}
        </div>
      ) : null}
    </section>
  );
}