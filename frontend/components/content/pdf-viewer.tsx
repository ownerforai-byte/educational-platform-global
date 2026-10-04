"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { UnderDevelopment } from "@/components/content/under-development";
import {
  downloadDoc,
  downloadFileName,
  frameSrcFor,
  isInlinePdf,
  isViewableSrc,
  pdfViewerHref,
} from "@/lib/pdf-src";

/**
 * In-page PDF reader for the resource system.
 *
 * A PDF resource stores its file in `media_url` (Supabase Storage public URL,
 * a direct .pdf host, or a Google Drive link). This viewer embeds it in an
 * `<iframe>` so a student reads it immediately inside the app — no download,
 * no leaving the page. It mirrors the existing `VideoViewer`/`NotesViewer`
 * surface.
 *
 * Open and download are deliberately two different controls:
 *  - **Open in new tab** → the in-app viewer route (`/pdfs/read?src=…`), a
 *    new browser tab running *our* reader inside *our* shell — never the
 *    browser's native, chrome-less PDF page.
 *  - **Download** → `downloadDoc`, a blob fetch that saves the file. It never
 *    navigates, so a click can't turn into an open.
 *
 * URL handling lives in `@/lib/pdf-src`:
 *  - Google Drive `/file/d/{id}/view` → `/file/d/{id}/preview` (the URL that
 *    renders inside an iframe).
 *  - Direct `.pdf` URLs → embedded as-is (Chrome/Edge/Safari render native
 *    PDFs in iframes).
 *  - Anything else → not an inline-renderable PDF, so we show the plain link.
 */

export function PdfViewer({
  title,
  mediaUrl,
}: {
  title: string;
  mediaUrl: string | null;
}) {
  const [saving, setSaving] = useState(false);

  if (!mediaUrl) {
    return <UnderDevelopment />;
  }

  const viewable = isViewableSrc(mediaUrl);
  // Viewable media reads in our own viewer tab; anything else keeps its raw
  // link (the viewer would refuse to frame it anyway).
  const openHref = viewable ? pdfViewerHref(mediaUrl, title) : mediaUrl;
  const renderInline = isInlinePdf(mediaUrl);

  const onDownload = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await downloadDoc(mediaUrl, downloadFileName(mediaUrl, title));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="truncate">{title}</CardTitle>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            asChild
            aria-label="Open PDF in a new tab"
          >
            <a
              href={openHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            disabled={saving}
            aria-label="Download this PDF"
            className="inline-flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {saving ? "Saving…" : "Download"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {renderInline ? (
          <div className="w-full overflow-hidden rounded-md border border-border bg-white">
            <iframe
              src={frameSrcFor(mediaUrl)}
              title={title}
              className="h-[75vh] min-h-[480px] w-full"
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <a
            href={openHref}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:underline"
          >
            Open media
          </a>
        )}
      </CardContent>
    </Card>
  );
}
