"use client";

import { ReactNode } from "react";
import { BookOpen, Eye, Brain, Lightbulb } from "lucide-react";

type TheoryPanelProps = {
  title?: string;
  vocabulary?: ReactNode;
  look?: ReactNode;
  predict?: ReactNode;
  principle?: ReactNode;
  why?: ReactNode;
};

/**
 * TheoryPanel — a richer, bordered theory block that helps students:
 * 1) "Picture it" — what to actually look at in the sim
 * 2) "Think ahead" — what the model predicts before they change inputs
 * 3) "The principle" — the deeper law/formula behind it
 * 4) "Why it matters" — real-world hook
 */
export function TheoryPanel({
  title = "Theory & What to Notice",
  vocabulary,
  look,
  predict,
  principle,
  why,
}: TheoryPanelProps) {
  return (
    <div className="space-y-2 rounded-lg border border-primary/25 bg-primary/5 p-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <p className="text-xs font-bold uppercase tracking-wide text-primary">📘 {title}</p>
      </div>

      {vocabulary && (
        <div className="rounded-md border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">🔤 Vocabulary</p>
          <p className="mt-0.5">{vocabulary}</p>
        </div>
      )}

      {look && (
        <div className="rounded-md border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <Eye className="h-3.5 w-3.5 text-emerald-500" /> Picture it
          </p>
          <p className="mt-0.5">{look}</p>
        </div>
      )}

      {predict && (
        <div className="rounded-md border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <Brain className="h-3.5 w-3.5 text-violet-500" /> Predict before you change
          </p>
          <p className="mt-0.5">{predict}</p>
        </div>
      )}

      {principle && (
        <div className="rounded-md border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> The principle
          </p>
          <p className="mt-0.5">{principle}</p>
        </div>
      )}

      {why && (
        <div className="rounded-md border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <span className="text-base leading-none">🌍</span> Why it matters
          </p>
          <p className="mt-0.5">{why}</p>
        </div>
      )}
    </div>
  );
}