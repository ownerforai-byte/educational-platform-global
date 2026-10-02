"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { UnderDevelopment } from "@/components/content/under-development";

/**
 * In-page PDF reader for the resource system.
 *
 * A PDF resource stores its file in `media_url` (Supabase Storage public URL,
 * a direct .pdf host, or a Google Drive link). This viewer embeds it in an
 * `<iframe>` so a student reads it immediately inside the app — no download,
 * no leaving the page. It mirrors the existing `VideoViewer`/`NotesViewer`
 * surface, and falls back to "Open in new tab" for media the browser cannot
 * render inline.
 *
 * URL handling:
 *  - Google Drive `/file/d/{id}/view` → rewritten to `/file/d/{id}/preview`,
 *    which is the Drive URL that renders inside an iframe.
 *  - Direct `.pdf` URLs → embedded as-is (Chrome/Edge/Safari render native
 *    PDFs in iframes).
 *  - Anything else → not an inline-renderable PDF, so we show the plain link.
 */

function drivePreviewUrl(url: string): string | null {
  const match = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null;
}

function isGoogleDrive(url: string): boolean {
  return url.includes("drive.google.com");
}

function isInlinePdf(url: string): boolean {
  const bare = url.split("?")[0].toLowerCase();
  return bare.endsWith(".pdf") || isGoogleDrive(url);
}

export function PdfViewer({
  title,
  mediaUrl,
}: {
  title: string;
  mediaUrl: string | null;
}) {
  if (!mediaUrl) {
    return <UnderDevelopment />;
  }

  const drivePreview = drivePreviewUrl(mediaUrl);
  const frameSrc = drivePreview ?? mediaUrl;
  const renderInline = isInlinePdf(mediaUrl);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="truncate">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          asChild
          aria-label="Open PDF in a new tab"
        >
          <a
            href={mediaUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in new tab
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        {renderInline ? (
          <div className="w-full overflow-hidden rounded-md border border-border bg-white">
            <iframe
              src={frameSrc}
              title={title}
              className="h-[75vh] min-h-[480px] w-full"
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <a
            href={mediaUrl}
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
