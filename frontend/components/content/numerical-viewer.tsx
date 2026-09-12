"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathMarkdown } from "@/components/content/math-markdown";
import { renderKatex, renderStepByStep } from "@/lib/content/renderers";
import { UnderDevelopment } from "@/components/content/under-development";

export function NumericalViewer({
  title,
  content,
  metadata,
}: {
  title: string;
  content: string;
  metadata: Record<string, unknown> | null;
}) {
  const meta = (metadata ?? {}) as {
    question?: string;
    data?: Record<string, string>;
    formula?: string;
    steps?: Array<{ label?: string; content: string }>;
    answer?: string;
  };

  const hasContent =
    content.trim().length > 0 ||
    Boolean(meta.question || meta.data || meta.formula || meta.answer) ||
    Boolean(meta.steps && meta.steps.length > 0);

  if (!hasContent) {
    return <UnderDevelopment />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {meta.question && (
          <div className="rounded-md border border-border bg-muted/50 p-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
              Question
            </h3>
            <MathMarkdown content={meta.question} />
          </div>
        )}

        {meta.data && Object.keys(meta.data).length > 0 && (
          <div className="rounded-md border border-border bg-muted/50 p-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
              Data
            </h3>
            <dl className="grid grid-cols-2 gap-2">
              {Object.entries(meta.data).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <dt className="text-xs text-muted-foreground">{key}</dt>
                  <dd className="text-sm font-mono">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {meta.formula && (
          <div
            className="katex-display"
            dangerouslySetInnerHTML={{
              __html: renderKatex(String(meta.formula), true),
            }}
          />
        )}

        {meta.steps && meta.steps.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
              Solution
            </h3>
            {renderStepByStep(meta.steps)}
          </div>
        )}

        {meta.answer && (
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-1">
              Answer
            </h3>
            <p className="font-medium">{String(meta.answer)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
