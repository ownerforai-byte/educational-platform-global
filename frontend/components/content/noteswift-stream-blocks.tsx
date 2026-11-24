"use client";

import { ExternalLink, FileText, Sparkles } from "lucide-react";
import type { NoteswiftStreamPdf } from "@/lib/streams/noteswift-catalog";
import { Button } from "@/components/ui/button";

/**
 * One rectangular stream block per NoteSwift **solution PDF** (Drive /preview).
 * Theory articles are not framed — optional link-out only.
 */
export function NoteswiftStreamBlocks({
  pdfs,
  unitTitle,
}: {
  pdfs: NoteswiftStreamPdf[];
  unitTitle?: string;
}) {
  if (pdfs.length === 0) return null;

  return (
    <section className="space-y-3" aria-label="NoteSwift exercise solution PDFs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-violet-500" />
          NoteSwift · exercise solutions
          {unitTitle ? (
            <span className="font-normal text-muted-foreground">· {unitTitle}</span>
          ) : null}
        </h3>
        <span className="text-[11px] font-medium text-muted-foreground">
          Live PDF stream · {pdfs.length} {pdfs.length === 1 ? "solution sheet" : "solution sheets"}
        </span>
      </div>

      <div className="space-y-4">
        {pdfs.map((pdf, index) => (
          <div
            key={pdf.id}
            className="overflow-hidden rounded-2xl border border-violet-500/25 bg-background"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-violet-500/5 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Solution {index + 1}
                </span>
                <FileText className="h-3.5 w-3.5 shrink-0 text-violet-600" aria-hidden="true" />
                <span className="truncate text-sm font-medium text-foreground" title={pdf.title}>
                  {pdf.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {pdf.scope === "chapter" ? "This chapter" : "Subject reference"}
                </span>
                <Button asChild size="sm" variant="ghost" className="h-8 rounded-full text-xs">
                  <a href={pdf.articleUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-3.5 w-3.5" />
                    Source page
                  </a>
                </Button>
              </div>
            </div>

            <iframe
              src={pdf.src}
              title={pdf.title}
              loading="lazy"
              allow="fullscreen"
              className="block h-[60vh] min-h-[480px] w-full border-0 bg-white sm:h-[72vh] sm:min-h-[620px]"
            />

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              NoteSwift solution PDF · read in place
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}