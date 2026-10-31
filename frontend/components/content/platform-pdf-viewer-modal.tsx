"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  downloadDoc,
  downloadFileName,
  frameSrcFor,
} from "@/lib/pdf-src";

export type ViewableDocument = {
  title: string;
  src: string;
  subject?: string;
  topic?: string;
  kind?: string;
};

interface PlatformPdfViewerModalProps {
  doc: ViewableDocument | null;
  onClose: () => void;
}

/**
 * In-Platform Scrollable PDF & Document Viewer Modal.
 *
 * Renders multi-page PDFs (both local and Google Drive / WebNotee resources)
 * completely inside the platform using an embedded frame.
 * All pages are visible and scrollable without leaving the platform or opening Google Drive.
 */
export function PlatformPdfViewerModal({
  doc,
  onClose,
}: PlatformPdfViewerModalProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!doc) return;
    setLoading(true);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [doc, handleKeyDown]);

  if (!doc) return null;

  const frameUrl = frameSrcFor(doc.src);
  const isDocx = doc.kind === "docx" || doc.src.toLowerCase().endsWith(".docx");

  const onDownload = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await downloadDoc(doc.src, downloadFileName(doc.src, doc.title));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 md:p-6 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col rounded-2xl border border-border/70 bg-card text-card-foreground shadow-2xl transition-all duration-300 w-full overflow-hidden ${
          isExpanded
            ? "h-[98vh] max-w-[98vw]"
            : "h-[90vh] max-w-6xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-card/95 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm sm:text-base font-bold text-foreground">
                  {doc.title}
                </h2>
                {doc.subject && (
                  <span className="hidden sm:inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {doc.subject}
                  </span>
                )}
                {doc.topic && (
                  <span className="hidden md:inline-flex rounded-full border border-border/60 bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {doc.topic}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                In-platform reader · Scroll all pages below without leaving
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onDownload}
              disabled={saving}
              className="h-8 rounded-xl px-3 text-xs font-semibold"
              title="Download file to device directly"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              {saving ? "Saving…" : "Download"}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="hidden sm:inline-flex h-8 w-8 p-0 rounded-xl"
              title={isExpanded ? "Restore size" : "Expand viewer"}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isExpanded ? "Restore size" : "Expand viewer"}
              </span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-xl text-muted-foreground hover:text-foreground"
              title="Close viewer (Esc)"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Document Viewer Frame */}
        <div className="relative flex-1 w-full bg-muted/40 overflow-hidden">
          {loading && !isDocx && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/90 backdrop-blur-xs">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Loading document in platform…
              </p>
              <p className="text-xs text-muted-foreground">
                Preparing all pages for continuous scrolling
              </p>
            </div>
          )}

          {isDocx ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <FileText className="h-12 w-12 text-primary/60 mb-3" />
              <h3 className="text-base font-bold">Word Document (.docx)</h3>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">
                Microsoft Word documents cannot be previewed natively in the browser frame.
                You can download the file directly to view it on your device.
              </p>
              <Button size="sm" onClick={onDownload} className="mt-4 rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download Document
              </Button>
            </div>
          ) : (
            <iframe
              key={frameUrl}
              src={frameUrl}
              title={doc.title}
              onLoad={() => setLoading(false)}
              className="h-full w-full border-0 bg-white"
              allow="autoplay; encrypted-media; fullscreen"
            />
          )}
        </div>
      </div>
    </div>
  );
}

