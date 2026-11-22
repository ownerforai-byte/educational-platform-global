"use client";

import Link from "next/link";
import {
  Bookmark,
  Check,
  Ellipsis,
  Heart,
  Link2,
  Loader2,
  MessageCircle,
  Share2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reportPost, sharePath } from "@/lib/api/community-feed";
import { isCommunityBot } from "@/lib/community-bot";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { AttachmentList } from "@/features/community/attachment-list";
import { FeedMediaStrip } from "@/features/community/feed-media-strip";
import { QuotedPostCard } from "@/features/community/quoted-post-card";
import { BotAnswerButton } from "@/features/community/bot-answer-button";
import { CommentList } from "@/features/community/comment-list";
import { CommentComposer } from "@/features/community/comment-composer";
import { PostComposer } from "@/features/community/post-composer";
import { MarkdownBody } from "@/features/community/markdown-body";
import { useCommunityBoard } from "@/features/community/community-board-context";
import {
  CommunityBackLink,
  CommunityLoading,
  looksLikeQuestion,
} from "@/features/community/community-helpers";
import { CommunityErrorAlert } from "@/features/community/community-alerts";
import { CommunityCelebrationBanner } from "@/features/community/community-action-success";
import {
  actionBtn,
  categoryLabel,
  surfaceCardFlat,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export function CommunityPostDetailView() {
  const {
    view,
    user,
    sessionLoading,
    error,
    celebration,
    dismissCelebration,
    setError,
    loading,
    post,
    moderate,
    copiedId,
    copy,
    isSaved,
    aiReplyBusyIds,
    followUpBotCommentId,
    setFollowUpBotCommentId,
    composerFocusTrigger,
    openAndFocusComposer,
    onLike,
    onRepost,
    onToggleSave,
    onDeletePost,
    onAssistantReply,
    patchAuthorFollowing,
    handleSubmitComment,
    handleSaveCommentEdit,
    handleDeleteComment,
    handleAcceptAnswer,
  } = useCommunityBoard();

  return (
    <>
      {view === "new" ? (
        <>
          <header className="space-y-3">
            <CommunityBackLink href="/ai/community" label="Back to feed" />
            <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
              <Plus className="h-6 w-6 text-primary" aria-hidden />
              New post
            </h1>
          </header>
          <PostComposer user={user} sessionLoading={sessionLoading} mode="create" redirectOnSuccess />
        </>
      ) : null}

      <CommunityErrorAlert error={error} />
      {celebration ? (
        <CommunityCelebrationBanner
          action={celebration.kind}
          postId={celebration.postId}
          onDismiss={dismissCelebration}
        />
      ) : null}

      {loading && !post && view !== "new" ? <CommunityLoading /> : null}

      {view === "edit" && post ? (
        <>
          <header className="space-y-3">
            <CommunityBackLink href={sharePath(post.id)} label="Back to post" />
          </header>
          <PostComposer
            user={user}
            sessionLoading={sessionLoading}
            mode="edit"
            initial={post}
            redirectOnSuccess
          />
        </>
      ) : null}

      {view === "post" && post ? (
        <div className="space-y-6">
          <CommunityBackLink href="/ai/community" label="Back to feed" />

          <article className={cn(surfaceCardFlat, "space-y-4 p-5 sm:p-6")}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {(() => {
                    const visual =
                      post.category !== "general" ? getSubjectVisual(post.category) : null;
                    return (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                          visual
                            ? visual.badge
                            : "border border-border/80 bg-muted/50 text-foreground",
                        )}
                      >
                        {visual ? <span aria-hidden>{visual.glyph}</span> : null}
                        {categoryLabel(post.category)}
                      </span>
                    );
                  })()}
                </div>
                <h1 className="font-display text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                  {post.title}
                </h1>
              </div>

              {user?.id === post.author.id || moderate ? (
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
                      <Ellipsis className="h-4 w-4" aria-hidden />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 rounded-xl p-1 shadow-elev-3">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/ai/community/posts/${post.id}/edit`}
                        className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[13px]"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                        Edit post
                      </Link>
                    </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => void onDeletePost(post.id)}
                        className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px] text-destructive focus:bg-destructive/10 focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                        Delete post
                      </DropdownMenuItem>
                      {user && user.id !== post.author.id ? (
                        <DropdownMenuItem
                          onSelect={() => {
                            void reportPost(post.id, "Reported from post menu");
                          }}
                          className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px]"
                        >
                          Report post
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>

            <PostAuthorHeader
              author={post.author}
              createdAt={post.createdAt}
              viewerId={user?.id}
              onFollowChange={(following) => patchAuthorFollowing(post.author.id, following)}
            />

            <MarkdownBody text={post.body} className="text-base leading-relaxed text-foreground" />

            {post.quotedPost ? <QuotedPostCard post={post.quotedPost} /> : null}

            {post.attachments.length > 0 ? (
              <>
                <FeedMediaStrip files={post.attachments} />
                <AttachmentList files={post.attachments} />
              </>
            ) : null}

            <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3">
              <button
                type="button"
                onClick={() => onLike(post)}
                aria-pressed={post.likedByYou}
                aria-label={post.likedByYou ? "Unlike post" : "Like post"}
                className={cn(
                  actionBtn,
                  "min-h-11 px-3 text-[13px] tabular-nums",
                  post.likedByYou
                    ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Heart className={cn("h-4 w-4", post.likedByYou && "fill-current")} aria-hidden />
                <span>{post.likeCount}</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(post.id)}
                aria-pressed={post.savedByYou || isSaved(post.id)}
                aria-label={post.savedByYou || isSaved(post.id) ? "Saved post" : "Save post"}
                className={cn(
                  actionBtn,
                  "min-h-11 px-3 text-[13px] tabular-nums",
                  post.savedByYou || isSaved(post.id)
                    ? "bg-primary/12 font-semibold text-primary hover:bg-primary/18"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Bookmark
                  className={cn("h-4 w-4", (post.savedByYou || isSaved(post.id)) && "fill-current")}
                  aria-hidden
                />
                <span>{post.saveCount ?? 0}</span>
              </button>

              {onRepost ? (
                <button
                  type="button"
                  onClick={() => onRepost(post)}
                  aria-pressed={post.repostedByYou ?? false}
                  aria-label={post.repostedByYou ? "Undo repost" : "Repost"}
                  className={cn(
                    actionBtn,
                    "min-h-11 px-3 text-[13px] tabular-nums",
                    post.repostedByYou
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Share2 className="h-4 w-4" aria-hidden />
                  <span>{post.repostCount ?? 0}</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => void copy(post.id)}
                aria-label={copiedId === post.id ? "Link copied" : "Copy post link"}
                className={cn(
                  actionBtn,
                  "min-h-11 px-3 text-[13px]",
                  copiedId === post.id
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {copiedId === post.id ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden />
                    Copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" aria-hidden />
                    Copy link
                  </>
                )}
              </button>

              <span className="ml-auto inline-flex items-center gap-1.5 px-2 text-[13px] tabular-nums text-muted-foreground">
                <MessageCircle className="h-4 w-4" aria-hidden />
                {post.commentCount ?? (post.comments ?? []).length}{" "}
                {(post.commentCount ?? (post.comments ?? []).length) === 1 ? "comment" : "comments"}
              </span>
            </div>
          </article>

          <section aria-labelledby="post-comments-heading" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="post-comments-heading"
                className="flex items-center gap-2 text-base font-semibold tracking-tight"
              >
                Comments
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                  {post.commentCount ?? (post.comments ?? []).length}
                </span>
              </h2>

              <BotAnswerButton
                visible={Boolean(
                  user &&
                    !isCommunityBot(post.author.id) &&
                    post.assistantReply?.canApprove &&
                    !post.assistantReply?.posted,
                )}
                busy={aiReplyBusyIds.has(post.id)}
                question={post.kind === "question" || looksLikeQuestion(post)}
                variant="comment"
                onPublish={() => onAssistantReply(post)}
              />
            </div>

            {aiReplyBusyIds.has(post.id) ? (
              <div
                role="status"
                className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-[13px] font-medium text-primary"
              >
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Generating Veer reply…
              </div>
            ) : null}

            <CommentComposer
              signedIn={Boolean(user)}
              viewerName={user?.fullName}
              isBotPost={isCommunityBot(post.author.id)}
              replyTo={(post.comments ?? []).find((comment) => comment.id === followUpBotCommentId) ?? null}
              focusTrigger={composerFocusTrigger}
              onClearReply={() => setFollowUpBotCommentId(null)}
              onSubmitComment={(body, followUp, replyToCommentId) =>
                handleSubmitComment(post.id, body, followUp, replyToCommentId)
              }
            />

            <CommentList
              comments={post.comments ?? []}
              viewer={user}
              followUpBotCommentId={followUpBotCommentId}
              postKind={post.kind}
              postAuthorId={post.author.id}
              acceptedCommentId={post.acceptedCommentId}
              onSelectFollowUp={(commentId) => {
                const next = followUpBotCommentId === commentId ? null : commentId;
                setFollowUpBotCommentId(next);
                setError(null);
                if (next) openAndFocusComposer(next);
              }}
              onOpenComposer={() => openAndFocusComposer()}
              onFollowChange={patchAuthorFollowing}
              onSaveEdit={(commentId, body) => handleSaveCommentEdit(post.id, commentId, body)}
              onDelete={(commentId) => handleDeleteComment(post.id, commentId)}
              onAcceptAnswer={
                post.kind === "question" && user?.id === post.author.id
                  ? (commentId) => handleAcceptAnswer(post.id, commentId)
                  : undefined
              }
            />
          </section>
        </div>
      ) : null}
    </>
  );
}