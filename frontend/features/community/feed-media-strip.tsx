"use client";

import { FileText } from "lucide-react";
import type { FeedAttachment } from "@/lib/api/community-feed";
import { attachmentFileUrl } from "@/lib/api/community-feed";
import { cn } from "@/lib/utils";

export function FeedMediaStrip({
  files,
  compact,
  className,
}: {
  files: FeedAttachment[];
  compact?: boolean;
  className?: string;
}) {
  const images = files.filter((f) => f.contentType.startsWith("image/"));
  const pdfs = files.filter((f) => f.contentType === "application/pdf");
  if (images.length === 0 && pdfs.length === 0) return null;

  if (images.length > 0) {
    const shown = images.slice(0, compact ? 2 : 4);
    const extra = images.length - shown.length;
    return (
      <div
        className={cn(
          "grid gap-0.5 overflow-hidden rounded-md border border-border/80 bg-muted/20",
          shown.length === 1 ? "grid-cols-1" : "grid-cols-2",
          className,
        )}
      >
        {shown.map((file, index) => (
          <a
            key={file.id}
            href={attachmentFileUrl(file.id, "inline")}
            className={cn(
              "relative block overflow-hidden bg-muted/40",
              compact ? "max-h-28" : "max-h-40 sm:max-h-52",
              shown.length === 3 && index === 0 ? "row-span-2 max-h-none min-h-[7rem]" : "",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={attachmentFileUrl(file.id, "inline")}
              alt={file.filename}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {extra > 0 && index === shown.length - 1 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                +{extra}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    );
  }

  const pdf = pdfs[0];
  if (!pdf) return null;
  return (
    <a
      href={attachmentFileUrl(pdf.id, "inline")}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 rounded-md border border-border/80 bg-muted/30 px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/50",
        className,
      )}
    >
      <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="truncate font-medium">{pdf.filename}</span>
    </a>
  );
}