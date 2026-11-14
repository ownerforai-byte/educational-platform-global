"use client";

import { Download, FileText, ImageIcon, Trash2 } from "lucide-react";
import type { FeedAttachment, FeedAuthor } from "@/lib/api/community-feed";
import { attachmentFileUrl } from "@/lib/api/community-feed";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { chipBtn } from "@/features/community/community-ui";
import { formatBytes } from "@/features/community/community-helpers";
import { cn } from "@/lib/utils";

export function AttachmentList({
  files,
  author,
  viewerId,
  onAuthorFollowChange,
  onRemove,
}: {
  files: FeedAttachment[];
  author?: FeedAuthor;
  viewerId?: string | null;
  onAuthorFollowChange?: (following: boolean) => void;
  onRemove?: (file: FeedAttachment) => void;
}) {
  if (files.length === 0) return null;
  return (
    <ul className="space-y-2">
      {files.map((file) => {
        const image = file.contentType.startsWith("image/");
        const FileKindIcon = image ? ImageIcon : FileText;
        return (
          <li
            key={file.id}
            className="rounded-xl border border-border/80 bg-muted/30 p-3 shadow-sm transition-[border-color,box-shadow,transform] duration-250 ease-out motion-safe:hover:-translate-y-px motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md motion-reduce:hover:translate-y-0"
          >
            {author ? (
              <div className="mb-2 border-b border-border/60 pb-2">
                <PostAuthorHeader
                  author={author}
                  viewerId={viewerId}
                  compact
                  onFollowChange={onAuthorFollowChange}
                />
              </div>
            ) : null}
            <div className="flex flex-wrap items-start justify-between gap-2 text-sm">
              <div className="flex min-w-0 items-start gap-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary">
                  <FileKindIcon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-foreground">{file.filename}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {file.contentType} · {formatBytes(file.byteSize)}
                  </span>
                </span>
              </div>
            </div>
            {image ? (
              <img
                src={attachmentFileUrl(file.id, "inline")}
                alt={file.filename}
                className="mt-3 max-h-64 w-full rounded-xl border border-border object-cover shadow-sm"
              />
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                className={cn(chipBtn, "min-h-11 text-primary hover:text-primary")}
                href={attachmentFileUrl(file.id, "attachment")}
                aria-label={`Download ${file.filename}`}
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                Download
              </a>
              {file.contentType === "application/pdf" ? (
                <a
                  className={cn(chipBtn, "min-h-11")}
                  href={attachmentFileUrl(file.id, "inline")}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open PDF ${file.filename}`}
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Open PDF
                </a>
              ) : null}
              {onRemove ? (
                <button
                  type="button"
                  className={cn(chipBtn, "min-h-11 hover:text-destructive")}
                  aria-label={`Remove ${file.filename}`}
                  onClick={() => onRemove(file)}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove
                </button>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
