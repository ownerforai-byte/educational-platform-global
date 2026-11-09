/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ IMPORTANT — RETAINED CODE, NOT DEAD CODE ⚠️  See lib/stream-sources.ts.
 * ═══════════════════════════════════════════════════════════════════════════
 * All three PDF sources (webnotee, platform, nepalenotes) are LIVE. Owner
 * request 2026-11-08 hides ONLY the small badge that says which source a note
 * came from — see SHOW_SOURCE_BADGE. Streams and every source PDF keep working.
 * DO NOT delete this component, its call sites, or the hidden badge branch.
 *
 * DOC-COUNT-DRIVEN: renders ONE large rectangular block per entry in `pdfs`.
 * There is deliberately NO fixed two-block limit built in here; the caller
 * passes the chapter's real document count. Built once, rendered from every
 * chapter page and every topic Resources tab (six subjects, both classes).
 *
 * "Direct stream" means the document is framed live from where it lives — a
 * Google Drive /preview URL, a WebNotee article, or a platform PDF — and is
 * read in place. There is deliberately NO download control here.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { FileText, Radio } from "lucide-react";
import { type ChapterStreamPdf } from "@/lib/chapter-resources";
import { SHOW_SOURCE_BADGE } from "@/lib/stream-sources";

export function DirectStreamPdfBlocks({
  pdfs,
  unitTitle,
}: {
  pdfs: ChapterStreamPdf[];
  unitTitle?: string;
}) {
  // All sources are live. This view is pure and doc-count driven: no streams
  // for a chapter simply means that chapter has no documents filed to it.
  if (pdfs.length === 0) return null;

  return (
    <section className="space-y-3" aria-label="Direct stream documents">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Radio className="h-4 w-4 text-emerald-500" />
          Direct stream
          {unitTitle ? <span className="font-normal text-muted-foreground">· {unitTitle}</span> : null}
        </h3>
        <span className="text-[11px] font-medium text-muted-foreground">
          Live read · no download · {pdfs.length} {pdfs.length === 1 ? "stream" : "streams"}
        </span>
      </div>

      <div className="space-y-4">
        {pdfs.map((pdf, index) => (
          <div
            key={pdf.id}
            className="overflow-hidden rounded-2xl border border-border/70 bg-background"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Stream {index + 1}
                </span>
                <FileText className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate text-sm font-medium text-foreground" title={pdf.title}>
                  {pdf.title}
                </span>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                {pdf.scope === "chapter" ? "This chapter" : "Subject reference"}
              </span>
            </div>

            <iframe
              src={pdf.src}
              title={pdf.title}
              loading="lazy"
              allow="fullscreen"
              className="block h-[60vh] min-h-[480px] w-full border-0 bg-white sm:h-[72vh] sm:min-h-[620px]"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              {/* ⚠️ Only this source label is hidden for now (owner 2026-11-08).
                  Retained markup — flip SHOW_SOURCE_BADGE to show it again. */}
              {SHOW_SOURCE_BADGE ? <span>{pdf.sourceLabel}</span> : <span />}
              <span>Direct stream · read in place</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
