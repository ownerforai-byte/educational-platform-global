import katex from "katex";
import * as React from "react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { KATEX_OPTIONS } from "@/lib/content/katex";

export function renderKatex(expression: string, displayMode = false) {
  const container = document.createElement("div");
  katex.render(expression, container, { ...KATEX_OPTIONS, displayMode });
  return container.innerHTML;
}

export function renderStepByStep(
  steps: Array<{ label?: string; content: string }>
) {
  return (
    <ol className="space-y-3">
      {steps.map((step, idx) => (
        <li key={idx} className="space-y-1">
          {step.label && (
            <p className="text-sm font-medium text-muted-foreground">
              {step.label}
            </p>
          )}
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <MathMarkdown content={step.content} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function renderMarkdown(content: string) {
  return <MathMarkdown content={content} />;
}
