"use client";

import { MathMarkdown } from "@/components/content/math-markdown";
import type { StepCard } from "@/lib/content/steps-blocks";

/**
 * Numbered step cards for a Veer `steps` fence. Each body goes through the
 * same MathMarkdown pipeline as the rest of the reply, so an svg figure or a
 * run widget written inside a step renders exactly as it would elsewhere.
 * Card titles render through the same pipeline too — a derivation heading
 * like "Find $F_{net}$" must show real math, not raw dollar-LaTeX
 * (owner report 2026-10-27: step-by-step derivations must be clean).
 */
export function StepCards({ steps }: { steps: StepCard[] }) {
  return (
    <ol className="my-2 space-y-3 list-none p-0">
      {steps.map((step, index) => (
        <li
          key={`${index}-${step.title}`}
          className="rounded-xl border border-border/70 bg-card p-3 shadow-sm"
        >
          <div className="mb-2 flex items-start gap-2">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {index + 1}
            </span>
            {step.title ? (
              <MathMarkdown
                content={step.title}
                className="min-w-0 flex-1 text-xs font-bold text-foreground [&_p]:my-0 [&_p]:text-xs [&_p]:font-bold [&_.katex]:text-xs"
              />
            ) : null}
          </div>
          {step.body ? (
            <MathMarkdown content={step.body} className="chat-prose" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
