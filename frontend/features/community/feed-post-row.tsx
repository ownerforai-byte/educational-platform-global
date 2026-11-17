"use client";

import { memo } from "react";
import Link from "next/link";
import {
  Bookmark,
  Bot,
  Check,
  Ellipsis,
  FileText,
  Heart,
  ImageIcon,
  Link2,
  MessageCircle,
  Paperclip,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sharePath, type FeedPost } from "@/lib/api/community-feed";
import { profilePath } from "@/lib/api/profile";
import { isCommunityBot, resolveFeedAuthor } from "@/lib/community-bot";
import { isCreatorAuthor } from "@/lib/owner";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { BotAnswerButton } from "@/features/community/bot-answer-button";
import { BotIdentityBadge } from "@/features/community/bot-identity-badge";
import { CreatorIdentityBadge } from "@/features/community/creator-identity-badge";
import { looksLikeQuestion, plainExcerpt } from "@/features/community/community-helpers";
import { actionBtn, categoryLabel } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

function formatCompactWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function attachmentSummary(files: FeedPost["attachments"]): {
  label: string;
  kind: "image" | "pdf" | "mixed";
} | null {
  if (files.length === 0) return null;
  if (files.length === 1) {
    const first = files[0];
    if (first.contentType.startsWith("image/")) return { label: "1 image", kind: "image" };
    if (first.contentType === "application/pdf") return { label: "1 PDF", kind: "pdf" };
    return { label: "1 file", kind: "mixed" };
  }
  const allImages = files.every((f) => f.contentType.startsWith("image/"));
  if (allImages) return { label: `${files.length} images`, kind: "image" };
  return { label: `${files.length} files`, kind: "mixed" };
}

export interface FeedPostRowProps {
  item: FeedPost;
  isLeading?: boolean;
  viewerId?: string | null;
  canModerate: boolean;
  saved: boolean;
  copied: boolean;
  aiReplyBusy: boolean;
  onLike: (item: FeedPost) => void;
  onToggleSave: (postId: string) => void;
  onCopyLink: (postId: string) => void;
  onDelete: (postId: string) => void;
  onAssistantReply: (item: FeedPost) => void;
  onPrefetch?: (postId: string) => void;
}

export const FeedPostRow = memo(function FeedPostRow({
  item,
  isLeading = false,
  viewerId,
  canModerate,
  saved,
  copied,
  aiReplyBusy,
  onLike,
  onToggleSave,
  onCopyLink,
  onDelete,
  onAssistantReply,
  onPrefetch,
}: FeedPostRowProps) {
  const author = resolveFeedAuthor(item.author);
  const botAuthor = isCommunityBot(author.id);
  const creatorAuthor = !botAuthor && isCreatorAuthor(author);
  const authorHref = profilePath(author.username, author.id);
  const postHref = sharePath(item.id);
  const own = Boolean(viewerId && viewerId === item.author.id);
  const canEditOrDelete = own || canModerate;
  const canInvokeBot = Boolean(
    viewerId && item.assistantReply?.canApprove && !item.assistantReply.posted,
  );
  const botReplied = Boolean(item.assistantReply?.posted);
  const filesMeta = attachmentSummary(item.attachments);
  const visual = item.category !== "general" ? getSubjectVisual(item.category) : null;
  const excerpt = plainExcerpt(item.body, isLeading ? 220 : 135);

  const warm = () => onPrefetch?.(item.id);

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between gap-2.5 px-4 py-3.5 transition-colors sm:px-5 sm:py-4",
        isLeading
          ? "min-h-[124px] bg-primary/[0.035] shadow-elev-1"
          : "min-h-[96px] hover:bg-muted/30",
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          {/* Top metadata line: category, author, time, resource & Veer indicators */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                visual ? visual.badge : "border border-border/80 bg-muted/50 text-foreground",
              )}
            >
              {visual ? <span aria-hidden>{visual.glyph}</span> : null}
              {categoryLabel(item.category)}
            </span>

            <Link
              href={authorHref}
              className={cn(
                "truncate font-medium hover:text-foreground hover:underline",
                botAuthor && "text-primary font-semibold",
              )}
            >
              {author.fullName}
            </Link>
            {botAuthor ? (
              <BotIdentityBadge compact />
            ) : creatorAuthor ? (
              <CreatorIdentityBadge compact />
            ) : null}

            <time dateTime={item.createdAt} className="text-[13px] text-muted-foreground">
              {formatCompactWhen(item.createdAt)}
            </time>

            {filesMeta ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                {filesMeta.kind === "image" ? (
                  <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                ) : filesMeta.kind === "pdf" ? (
                  <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
                ) : (
                  <Paperclip className="h-3.5 w-3.5 shrink-0" aria-hidden />
                )}
                {filesMeta.label}
              </span>
            ) : null}

            {botReplied ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                <Bot className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Veer replied
              </span>
            ) : null}
          </div>

          {/* Title + compact plain-text excerpt */}
          <h2
            className={cn(
              "font-semibold leading-snug tracking-tight text-foreground",
              isLeading ? "font-display text-lg sm:text-xl" : "text-base",
            )}
          >
            <Link
              href={postHref}
              onMouseEnter={warm}
              onFocus={warm}
              className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.title}
            </Link>
          </h2>

          {excerpt ? (
            <p
              className={cn(
                "text-sm leading-relaxed text-muted-foreground",
                isLeading ? "line-clamp-2" : "line-clamp-1",
              )}
            >
              {excerpt}
            </p>
          ) : null}
        </div>

        {/* Stable aligned participation & action controls (44px touch targets) */}
        <div className="flex shrink-0 flex-wrap items-center gap-1 sm:pt-0.5">
          <button
            type="button"
            onClick={() => onLike(item)}
            aria-pressed={item.likedByYou}
            aria-label={item.likedByYou ? "Unlike post" : "Like post"}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2.5 text-[13px] tabular-nums",
              item.likedByYou
                ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <Heart className={cn("h-4 w-4 shrink-0", item.likedByYou && "fill-current")} aria-hidden />
            <span>{item.likeCount}</span>
          </button>

          <Link
            href={`${postHref}?comment=1`}
            onMouseEnter={warm}
            onFocus={warm}
            aria-label={`${item.commentCount} comments`}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2.5 text-[13px] tabular-nums text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            <span>{item.commentCount}</span>
          </Link>

          <button
            type="button"
            onClick={() => onToggleSave(item.id)}
            aria-pressed={saved}
            aria-label={saved ? "Saved post" : "Save post"}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2.5 text-[13px]",
              saved
                ? "bg-primary/12 font-semibold text-primary hover:bg-primary/18"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <Bookmark className={cn("h-4 w-4 shrink-0", saved && "fill-current")} aria-hidden />
            <span className="sr-only">{saved ? "Saved" : "Save post"}</span>
          </button>

          {canInvokeBot && looksLikeQuestion(item) ? (
            <BotAnswerButton
              visible
              busy={aiReplyBusy}
              variant="comment"
              onPublish={() => onAssistantReply(item)}
            />
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Post options"
                className={cn(
                  actionBtn,
                  "min-h-11 min-w-11 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" aria-hidden />
                ) : (
                  <Ellipsis className="h-4 w-4" aria-hidden />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl p-1 shadow-elev-3">
              <DropdownMenuItem
                onSelect={() => onCopyLink(item.id)}
                className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-primary" aria-hidden />
                    Link copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" aria-hidden />
                    Copy link
                  </>
                )}
              </DropdownMenuItem>
              {canEditOrDelete ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/ai/community/posts/${item.id}/edit`}
                      className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[13px]"
                    >
                      <Pencil className="h-4 w-4" aria-hidden />
                      Edit post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => onDelete(item.id)}
                    className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px] text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete post
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  );
});
