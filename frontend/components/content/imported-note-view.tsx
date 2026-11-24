"use client";

import { PaperJsonBody } from "@/components/content/paper-json-body";
import { MathMarkdown } from "@/components/content/math-markdown";
import { isStandaloneReaderChrome } from "@/lib/standalone-reader";

export function ImportedNoteView({
  title,
  notes,
  source,
}: {
  title: string;
  notes: string[];
  source: "ravikishan" | "r-export";
}) {
  const standalone = isStandaloneReaderChrome();

  return (
    <article className="doc-view space-y-3">
      {!standalone && (
        <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
          <h1 className="text-lg font-bold tracking-tight">{title}</h1>
          <span className="shrink-0 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {source === "ravikishan" ? "Ravikishan" : "R Export"}
          </span>
        </div>
      )}
      <PaperJsonBody>
        <h1 className="a4-title mb-4 text-left">{title}</h1>
        {notes.map((note, idx) => (
          <div key={idx} className="pb-4">
            <MathMarkdown content={note} className="space-y-3 text-[13px] leading-relaxed" />
          </div>
        ))}
      </PaperJsonBody>
    </article>
  );
}