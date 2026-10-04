"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  ShieldAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  downloadDoc,
  downloadFileName,
  frameSrcFor,
  isViewableSrc,
  titleFromSrc,
} from "@/lib/pdf-src";

/**
 * In-app document tab (`/pdfs/read?src=…&title=…`).
 *
 * Every "Open" control in the portal points here instead of at the raw file,
 * so a document always renders inside this app's shell — in its own tab —
 * never as the browser's native, chrome-less PDF page.
 *
 * The `src` query is untrusted: it is only framed after `isViewableSrc`
 * accepts it (same-origin document roots or the CSP `frame-src` hosts), so the
 * route can't be used to frame arbitrary origins.
 *
 * Controls stay separated on purpose: *Download* saves the file (blob fetch),
 * *Open externally* is the explicit escape hatch, *Close* ends the tab. No
 * single click both opens and downloads.
 */
function DocumentReader() {
  const params = useSearchParams();
  const src = (params.get("src") ?? "").trim();
  const titleParam = (params.get("title") ?? "").trim();
  const allowed = isViewableSrc(src);
  const title = titleParam || titleFromSrc(src || "/");
  const [saving, setSaving] = useState(false);

  const onDownload = async () => {
    if (saving || !allowed) return;
    setSaving(true);
    try {
      await downloadDoc(src, downloadFileName(src, titleParam || undefined));
    } finally {
      setSaving(false);
    }
  };

  const onClose = () => {
    window.close();
    // Browsers only close script-opened tabs; a tab opened by hand falls back.
    window.setTimeout(() => {
      window.location.href = "/pdfs";
    }, 300);
  };

  if (!allowed) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border/60 bg-card p-6 text-center shadow-lg">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-500">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">Document not available</h1>
        <p className="mt-1.5 break-words text-sm text-muted-foreground">
          The reader only opens files from this site, Supabase Storage and Google Drive.
          Nothing was loaded for{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">{src || "(missing src)"}</code>
          .
        </p>
        <Button size="sm" asChild className="mt-4">
          <Link href="/pdfs">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to PDF Library
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="shrink-0">
            <Link href="/pdfs">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Library
            </Link>
          </Button>
          <span className="hidden h-8 w-px shrink-0 bg-border/60 sm:block" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-500">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold leading-tight text-foreground">{title}</h1>
            <p className="text-[11px] text-muted-foreground">
              Opened in its own app tab · read below, download separately
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button size="sm" onClick={onDownload} disabled={saving}>
            <Download className="mr-1.5 h-4 w-4" />
            {saving ? "Saving…" : "Download"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={src} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Open externally
            </a>
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} title="Close this tab">
            <X className="mr-1.5 h-4 w-4" />
            Close
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-lg">
        <iframe
          key={src}
          src={frameSrcFor(src)}
          title={title}
          className="h-[calc(100vh-14rem)] min-h-[480px] w-full"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}

export default function PdfReadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Opening document…</p>
          </div>
        </div>
      }
    >
      <DocumentReader />
    </Suspense>
  );
}
