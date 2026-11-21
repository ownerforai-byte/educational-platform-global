"use client";

import { memo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bookmark,
  Bot,
  Check,
  FileText,
  Heart,
  ImageIcon,
  MessageCircle,
  Paperclip,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import { sharePath, type FeedComment, type FeedPost } from "@/lib/api/community-feed";
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
import type { SessionUser } from "@/features/auth/types";
import { CommentList } from "@/features/community/comment-list";
import { CommentComposer } from "@/features/community/comment-composer";

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

export interface FeedPostRowThreadProps {
  viewer?: SessionUser | null;
  commentsExpanded: boolean;
  threadComments: FeedComment[];
  threadLoading: boolean;
  threadError: string | null;
  followUpBotCommentId: string | null;
  composerFocusTrigger: number;
  onToggleComments: (postId: string) => void;
  onSelectFollowUp: (commentId: string) => void;
  onClearFollowUp: () => void;
  onFollowChange: (authorId: string, following: boolean) => void;
  onSubmitComment: (postId: string, body: string, followUpToBot: boolean) => Promise<{ ok: boolean; error?: string }>;
  onSaveCommentEdit: (postId: string, commentId: string, nextBody: string) => Promise<{ ok: boolean; error?: string }>;
  onDeleteComment: (postId: string, commentId: string) => void;
}

export interface FeedPostRowProps extends FeedPostRowThreadProps {
  item: FeedPost;
  isLeading?: boolean;
  viewerId?: string | null;
  canModerate: boolean;
  copied: boolean;
  saved?: boolean;
  aiReplyBusy: boolean;
  onLike: (item: FeedPost) => void;
  onRepost?: (item: FeedPost) => void;
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
  onRepost,
  onToggleSave,
  onCopyLink,
  onDelete,
  onAssistantReply,
  onPrefetch,
  viewer = null,
  commentsExpanded,
  threadComments,
  threadLoading,
  threadError,
  followUpBotCommentId,
  composerFocusTrigger,
  onToggleComments,
  onSelectFollowUp,
  onClearFollowUp,
  onFollowChange,
  onSubmitComment,
  onSaveCommentEdit,
  onDeleteComment,
}: FeedPostRowProps) {
  const rowRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!commentsExpanded) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      // Radix portals dropdown content (a comment's Edit/Delete menu) to
      // document.body, outside rowRef. Interacting with that menu must not
      // collapse the thread mid-gesture and unmount the menu.
      if (
        target instanceof Element &&
        target.closest('[data-radix-popper-content-wrapper], [data-radix-menu-content], [role="menu"]')
      ) {
        return;
      }
      if (target instanceof Node && !rowRef.current?.contains(target)) {
        onToggleComments(item.id);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [commentsExpanded, item.id, onToggleComments]);
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
  // Prefer the server truth (savedByYou) but fall back to the local saved set
  // so the Saved-posts view stays visually consistent.
  const savedNow = Boolean(saved || item.savedByYou);

  const warm = () => onPrefetch?.(item.id);

  async function sharePost() {
    const url = `${window.location.origin}${postHref}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: item.title, url });
        return;
      } catch (error) {
        if ((error as DOMException)?.name === "AbortError") return;
      }
    }
    onCopyLink(item.id);
  }

  return (
    <article
      ref={rowRef}
      className={cn(
        "group relative flex flex-col justify-between gap-2.5 rounded-2xl border border-border/80 bg-card px-4 py-3.5 shadow-sm shadow-black/[0.04] transition-[transform,box-shadow,border-color] hover:border-border hover:shadow-md hover:shadow-primary/[0.06] sm:px-5 sm:py-4",
        isLeading
          ? "min-h-[124px] ring-1 ring-primary/15 shadow-elev-1"
          : "min-h-[96px]",
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

          <button
            type="button"
            onClick={() => onToggleComments(item.id)}
            aria-expanded={commentsExpanded}
            aria-label={`${commentsExpanded ? "Hide" : "Show"} ${item.commentCount} comments`}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2.5 text-[13px] tabular-nums hover:bg-muted/70 hover:text-foreground",
              commentsExpanded ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground",
            )}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            <span>{item.commentCount}</span>
          </button>

          {onRepost ? (
            <button
              type="button"
              onClick={() => onRepost(item)}
              aria-pressed={item.repostedByYou ?? false}
              aria-label={item.repostedByYou ? "Undo repost" : "Repost"}
              className={cn(
                actionBtn,
                "min-h-11 min-w-11 justify-center px-2.5 text-[13px] tabular-nums",
                item.repostedByYou
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden />
              <span>{item.repostCount ?? 0}</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onToggleSave(item.id)}
            aria-pressed={savedNow}
            aria-label={savedNow ? "Saved post" : "Save post"}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2.5 text-[13px]",
              savedNow
                ? "bg-primary/12 font-semibold text-primary hover:bg-primary/18"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <Bookmark className={cn("h-4 w-4 shrink-0", savedNow && "fill-current")} aria-hidden />
            <span>{item.saveCount}</span>
          </button>

          {canInvokeBot && looksLikeQuestion(item) ? (
            <BotAnswerButton
              visible
              busy={aiReplyBusy}
              variant="comment"
              onPublish={() => onAssistantReply(item)}
            />
          ) : null}

          <button
            type="button"
            onClick={() => void sharePost()}
            aria-label={copied ? "Link copied" : "Share post"}
            className={cn(
              actionBtn,
              "min-h-11 min-w-11 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              copied && "text-primary",
            )}
          >
            {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
          </button>

          {canEditOrDelete ? (
            <>
              <Link
                href={`/ai/community/posts/${item.id}/edit`}
                aria-label="Edit post"
                className={cn(actionBtn, "min-h-11 min-w-11 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground")}
              >
                <Pencil className="h-4 w-4" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label="Delete post"
                className={cn(actionBtn, "min-h-11 min-w-11 justify-center px-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {commentsExpanded ? (
        <section aria-label={`Comments on ${item.title}`} className="mt-2 space-y-3 border-t border-border/60 pt-3">
          {threadError ? <p role="alert" className="text-sm text-destructive">{threadError}</p> : null}
          {threadLoading ? (
            <p role="status" className="flex items-center gap-2 py-3 text-sm text-muted-foreground"><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />Loading comments…</p>
          ) : (
            <CommentList
              comments={threadComments}
              viewer={viewer}
              followUpBotCommentId={followUpBotCommentId}
              onSelectFollowUp={onSelectFollowUp}
              onOpenComposer={() => undefined}
              onFollowChange={onFollowChange}
              onSaveEdit={(commentId, body) => onSaveCommentEdit(item.id, commentId, body)}
              onDelete={(commentId) => onDeleteComment(item.id, commentId)}
            />
          )}
          {!threadLoading ? (
            <CommentComposer
              signedIn={Boolean(viewer)}
              isBotPost={botAuthor}
              followUpCommentId={followUpBotCommentId}
              focusTrigger={composerFocusTrigger}
              onClearFollowUp={onClearFollowUp}
              onSubmitComment={(body, followUp) => onSubmitComment(item.id, body, followUp)}
            />
          ) : null}
        </section>
      ) : null}
    </article>
  );
});
