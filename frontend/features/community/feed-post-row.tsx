"use client";

import { memo, useEffect, useRef, useState } from "react";
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
import { sharePath, sharePost, type FeedComment, type FeedPost } from "@/lib/api/community-feed";
import { profilePath } from "@/lib/api/profile";
import { isCommunityBot, resolveFeedAuthor } from "@/lib/community-bot";
import { publicUrl } from "@/lib/site-url";
import { isCreatorAuthor } from "@/lib/owner";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { BotAnswerButton } from "@/features/community/bot-answer-button";
import { BotIdentityBadge } from "@/features/community/bot-identity-badge";
import { CreatorIdentityBadge } from "@/features/community/creator-identity-badge";
import { canDeleteCommunityFeed } from "@/features/community/community-helpers";
import {
  actionBtn,
  categoryLabel,
  postKindLabel,
  questionStatusClass,
  questionStatusLabel,
  relativeTime,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/features/auth/types";
import { CommentList } from "@/features/community/comment-list";
import { CommentComposer } from "@/features/community/comment-composer";
import { FeedMediaStrip } from "@/features/community/feed-media-strip";
import { QuotedPostCard } from "@/features/community/quoted-post-card";
import { MarkdownBody } from "@/features/community/markdown-body";
import type { SignInAction } from "@/features/community/sign-in-overlay";

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
  /** True while Veer is generating a reply for this post in the background. */
  botTyping?: boolean;
  threadComments: FeedComment[];
  threadLoading: boolean;
  threadError: string | null;
  followUpBotCommentId: string | null;
  composerFocusTrigger: number;
  onToggleComments: (postId: string) => void;
  onSelectFollowUp: (commentId: string) => void;
  onClearFollowUp: () => void;
  onFollowChange: (authorId: string, following: boolean) => void;
  onSubmitComment: (
    postId: string,
    body: string,
    followUpToBot: boolean,
    replyToCommentId?: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  onSaveCommentEdit: (postId: string, commentId: string, nextBody: string) => Promise<{ ok: boolean; error?: string }>;
  onDeleteComment: (postId: string, commentId: string) => void;
  onAcceptAnswer?: (postId: string, commentId: string) => void;
  onToggleCommentLike?: (postId: string, commentId: string) => void;
}

export interface FeedPostRowProps extends FeedPostRowThreadProps {
  item: FeedPost;
  isLeading?: boolean;
  viewerId?: string | null;
  canModerate: boolean;
  saved?: boolean;
  aiReplyBusy: boolean;
  onLike: (item: FeedPost) => void;
  onRepost?: (item: FeedPost) => void;
  onQuotePost?: (item: FeedPost) => void;
  onToggleSave: (postId: string) => void;
  onDelete: (postId: string) => void;
  onAssistantReply: (item: FeedPost) => void;
  onPrefetch?: (postId: string) => void;
  /** Opens the sign-in overlay for signed-out viewers (share / comment). */
  onRequireSignIn?: (action: SignInAction) => void;
}

export const FeedPostRow = memo(function FeedPostRow({
  item,
  isLeading = false,
  viewerId,
  canModerate,
  saved,
  aiReplyBusy,
  onLike,
  // NOTE: repost/quote stay in the props contract (callers still pass them)
  // but the action bar shows exactly three stat boxes — like, comment, share
  // (owner 2026-11-27: "keep only one, count + below it its link").
  onToggleSave,
  onDelete,
  onAssistantReply,
  onPrefetch,
  onRequireSignIn,
  viewer = null,
  commentsExpanded,
  botTyping = false,
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
  onAcceptAnswer,
  onToggleCommentLike,
}: FeedPostRowProps) {
  const rowRef = useRef<HTMLElement | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareCount, setShareCount] = useState<number | null>(null);
  /** Copies the public link and bumps the persisted share count. */
  const share = () => {
    // Shares are counted per account — a signed-out viewer gets the overlay.
    if (!viewerId) {
      onRequireSignIn?.("share");
      return;
    }
    const url = publicUrl(sharePath(item.id));
    const done = () => {
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(done, () => {});
    } else {
      const area = document.createElement("textarea");
      area.value = url;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        done();
      } finally {
        area.remove();
      }
    }
    void sharePost(item.id)
      .then((res) => setShareCount(res.shareCount))
      .catch(() => undefined);
  };
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
  const canEditPost = own;
  const canDeletePost = own || canDeleteCommunityFeed(viewer ?? null);
  const canInvokeBot = Boolean(
    viewer && !botAuthor && item.assistantReply?.canApprove && !item.assistantReply?.posted,
  );
  const botReplied = Boolean(item.assistantReply?.posted);
  const filesMeta = attachmentSummary(item.attachments);
  const visual = item.category !== "general" ? getSubjectVisual(item.category) : null;
  // Prefer the server truth (savedByYou) but fall back to the local saved set
  // so the Saved-posts view stays visually consistent.
  const savedNow = Boolean(saved || item.savedByYou);

  const warm = () => onPrefetch?.(item.id);

  return (
    <article
      ref={rowRef}
      className="overflow-hidden rounded-md border border-border/90 bg-card transition-[border-color,box-shadow] duration-200 ease-out motion-safe:hover:border-border motion-safe:hover:shadow-sm"
    >
      <div className="space-y-1 px-2.5 py-2 sm:px-3">
          {/* Top metadata line: category, author, time, resource & Veer indicators */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded px-1.5 py-px text-[10px] font-medium",
                visual ? visual.badge : "border border-border/80 bg-muted/50 text-foreground",
              )}
            >
              {visual ? <span aria-hidden>{visual.glyph}</span> : null}
              {categoryLabel(item.category)}
            </span>
            {postKindLabel(item.kind) ? (
              <span className="rounded border border-border/70 bg-background px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {postKindLabel(item.kind)}
              </span>
            ) : null}
            {item.kind === "question" ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[10px] font-bold",
                  questionStatusClass(item.kind, item.solved),
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    item.solved ? "bg-emerald-500" : "bg-amber-500 animate-pulse motion-reduce:animate-none",
                  )}
                />
                {questionStatusLabel(item.kind, item.solved)}
              </span>
            ) : null}

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

            <time
              dateTime={item.createdAt}
              title={new Date(item.createdAt).toLocaleString()}
              className="text-xs tabular-nums text-muted-foreground"
            >
              {relativeTime(item.createdAt)}
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
              isLeading ? "font-display text-base sm:text-lg" : "text-sm",
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

          {/* The post appears in full — nothing is truncated in the feed */}
          {item.body ? (
            <MarkdownBody
              text={item.body}
              className="text-sm leading-relaxed text-foreground/90"
            />
          ) : null}

          {item.quotedPost ? (
            <QuotedPostCard post={item.quotedPost} className="mt-1" />
          ) : null}

          {item.attachments.length > 0 ? (
            <FeedMediaStrip files={item.attachments} compact={!isLeading} className="mt-1" />
          ) : null}
      </div>

      <div className="border-t border-border bg-muted/30 px-2 py-2 sm:px-3">
        {/* Three small stat boxes — the count on top, its action link below,
            like a native app. One box per metric: like, comment, share. */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => onLike(item)}
            aria-pressed={item.likedByYou}
            aria-label={item.likedByYou ? "Unlike post" : "Like post"}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-1.5 transition-colors",
              item.likedByYou
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/70 bg-background text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <span className="text-[13px] font-bold leading-none tabular-nums">{item.likeCount}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
              <Heart className={cn("h-3.5 w-3.5", item.likedByYou && "fill-current")} aria-hidden />
              {item.likedByYou ? "Liked" : "Like"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onToggleComments(item.id)}
            aria-expanded={commentsExpanded}
            aria-label={`${commentsExpanded ? "Hide" : "Show"} ${item.commentCount} comments`}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-1.5 transition-colors",
              commentsExpanded
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border/70 bg-background text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <span className="text-[13px] font-bold leading-none tabular-nums">{item.commentCount ?? 0}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {commentsExpanded ? "Hide" : "Comment"}
            </span>
          </button>

          <button
            type="button"
            onClick={share}
            aria-label="Copy share link"
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-1.5 transition-colors",
              shareCopied
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-border/70 bg-background text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <span className="text-[13px] font-bold leading-none tabular-nums">
              {shareCopied ? "✓" : (shareCount ?? item.shareCount ?? 0)}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
              {shareCopied ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Share2 className="h-3.5 w-3.5" aria-hidden />
              )}
              {shareCopied ? "Copied" : "Share"}
            </span>
          </button>
        </div>

        {/* Slim utility row — save, Veer, edit, delete */}
        <div className="mt-1.5 flex items-center justify-end gap-1">

          <button
            type="button"
            onClick={() => onToggleSave(item.id)}
            aria-pressed={savedNow}
            aria-label={savedNow ? "Saved post" : "Save post"}
            className={cn(
              actionBtn,
              "min-h-9 min-w-9 justify-center gap-1 px-2 text-xs tabular-nums",
              savedNow
                ? "bg-primary/12 font-semibold text-primary hover:bg-primary/18"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <Bookmark className={cn("h-4 w-4 shrink-0", savedNow && "fill-current")} aria-hidden />
            <span>{item.saveCount ?? 0}</span>
          </button>

          {canInvokeBot ? (
            <BotAnswerButton
              visible
              busy={aiReplyBusy}
              variant="comment"
              onPublish={() => onAssistantReply(item)}
            />
          ) : null}

          {canEditPost ? (
            <Link
              href={`/ai/community/posts/${item.id}/edit`}
              aria-label="Edit post"
              className={cn(actionBtn, "min-h-9 min-w-9 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground")}
            >
              <Pencil className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
          {canDeletePost ? (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              aria-label="Delete post"
              className={cn(actionBtn, "min-h-9 min-w-9 justify-center px-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>

      {commentsExpanded ? (
        <section
          aria-label={`Replies on ${item.title}`}
          className="border-t border-border/80 bg-muted/20 px-2.5 py-2.5 sm:px-3"
        >
          {threadError ? <p role="alert" className="px-1 pt-2 text-sm text-destructive">{threadError}</p> : null}
          <CommentComposer
            signedIn={Boolean(viewer)}
            viewerName={viewer?.fullName}
            isBotPost={botAuthor}
            replyTo={threadComments.find((comment) => comment.id === followUpBotCommentId) ?? null}
            focusTrigger={composerFocusTrigger}
            onClearReply={onClearFollowUp}
            onRequireSignIn={() => onRequireSignIn?.("comment")}
            onSubmitComment={(body, followUp, replyToCommentId) =>
              onSubmitComment(item.id, body, followUp, replyToCommentId)
            }
          />
          {threadLoading ? (
            <p role="status" className="flex items-center gap-2 px-1 py-3 text-sm text-muted-foreground"><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />Loading replies…</p>
          ) : (
            <CommentList
              comments={threadComments}
              viewer={viewer}
              botTyping={botTyping}
              followUpBotCommentId={followUpBotCommentId}
              postKind={item.kind}
              postAuthorId={item.author.id}
              postAuthorName={item.author.fullName}
              acceptedCommentId={item.acceptedCommentId}
              onSelectFollowUp={onSelectFollowUp}
              onOpenComposer={() => undefined}
              onFollowChange={onFollowChange}
              onSaveEdit={(commentId, body) => onSaveCommentEdit(item.id, commentId, body)}
              onDelete={(commentId) => onDeleteComment(item.id, commentId)}
              onAcceptAnswer={
                item.kind === "question" && viewer?.id === item.author.id
                  ? (commentId) => onAcceptAnswer?.(item.id, commentId)
                  : undefined
              }
              onToggleCommentLike={(commentId) => onToggleCommentLike?.(item.id, commentId)}
            />
          )}
        </section>
      ) : null}
    </article>
  );
});
