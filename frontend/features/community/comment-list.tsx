"use client";

import { memo, useState } from "react";
import {
  AlertCircle,
  Award,
  Check,
  Ellipsis,
  Loader2,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import type { CommunityPostKind } from "@/lib/api/community-feed";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SessionUser } from "@/features/auth/types";
import type { FeedComment } from "@/lib/api/community-feed";
import { isCommunityBot, COMMUNITY_BOT_AVATAR_URL, COMMUNITY_BOT_DISPLAY_NAME } from "@/lib/community-bot";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { MemberOnlyMarkdown } from "@/features/community/member-only-markdown";
import { canDeleteCommunityFeed } from "@/features/community/community-helpers";
import {
  actionBtn,
  chipBtn,
  inputClass,
  primaryCta,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

interface CommentRowProps {
  comment: FeedComment;
  viewer: SessionUser | null;
  followUpActive: boolean;
  onSelectFollowUp: (commentId: string) => void;
  onFollowChange: (authorId: string, following: boolean) => void;
  onSaveEdit: (commentId: string, nextBody: string) => Promise<{ ok: boolean; error?: string }>;
  onDelete: (commentId: string) => void;
  postKind?: CommunityPostKind;
  postAuthorId?: string;
  acceptedCommentId?: string | null;
  onAcceptAnswer?: (commentId: string) => void;
}

const CommentRow = memo(function CommentRow({
  comment,
  viewer,
  followUpActive,
  onSelectFollowUp,
  onFollowChange,
  onSaveEdit,
  onDelete,
  postKind,
  postAuthorId,
  acceptedCommentId,
  onAcceptAnswer,
}: CommentRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.body);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const botComment =
    comment.author.role === "assistant" || isCommunityBot(comment.author.id);
  const pendingComment = comment.id.startsWith("pending-comment-");
  const canEdit = Boolean(viewer && viewer.id === comment.author.id && !botComment);
  const canDelete = Boolean(
    viewer &&
      !botComment &&
      (viewer.id === comment.author.id || canDeleteCommunityFeed(viewer)),
  );

  async function handleSave() {
    const clean = draft.trim();
    if (!clean || saving) return;
    setSaving(true);
    setEditError(null);
    const result = await onSaveEdit(comment.id, clean);
    setSaving(false);
    if (result.ok) {
      setEditing(false);
    } else {
      // Preserve the user's attempted revision in the open editor on failure.
      setEditError(result.error || "Could not save comment.");
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border/90 bg-background px-3 py-2.5 shadow-sm transition-colors duration-200",
        "hover:border-border",
        followUpActive && "ring-1 ring-primary/25",
        botComment && "border-primary/30 bg-primary/[0.03]",
      )}
    >
      <div className="space-y-2">
        {pendingComment ? (
          <div className="flex items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            Sending
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-1.5">
            <PostAuthorHeader
              author={comment.author}
              createdAt={comment.createdAt}
              viewerId={viewer?.id}
              compact
              onFollowChange={(following) => onFollowChange(comment.author.id, following)}
            />
            {comment.replyTo ? (
              <p className="rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground">
                Replying to @{comment.replyTo.username || comment.replyTo.fullName}
              </p>
            ) : null}
          </div>

          {(canEdit || canDelete) && !pendingComment ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Comment options"
                  className={cn(
                    actionBtn,
                    "min-h-10 min-w-10 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <Ellipsis className="h-4 w-4" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl p-1 shadow-elev-3">
                {canEdit ? (
                  <DropdownMenuItem
                    onSelect={() => {
                      setDraft(comment.body);
                      setEditError(null);
                      setEditing(true);
                    }}
                    className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px]"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                    Edit
                  </DropdownMenuItem>
                ) : null}
                {canDelete ? (
                  <DropdownMenuItem
                    onSelect={() => onDelete(comment.id)}
                    className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px] text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete comment
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        {editing ? (
          <form
            className="mt-2 space-y-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSave();
            }}
          >
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={3}
              aria-label="Edit comment"
              className={cn(inputClass, "text-sm")}
            />
            {editError ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-2.5 py-1.5 text-xs text-destructive"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                {editError}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={saving || !draft.trim()}
                className={cn(primaryCta, "min-h-10 px-3.5 py-1.5 text-xs")}
              >
                {saving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                )}
                {editError ? "Retry save" : "Save comment"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setEditing(false);
                  setEditError(null);
                }}
                className={cn(chipBtn, "min-h-10 px-3 py-1.5 text-xs")}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-0.5">
            <MemberOnlyMarkdown
              text={comment.body}
              locked={botComment && !viewer}
            />
          </div>
        )}

        {viewer && !pendingComment ? (
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            <button
              type="button"
              aria-label={`Reply to @${comment.author.username || comment.author.fullName}`}
              onClick={() => onSelectFollowUp(comment.id)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Reply
            </button>
            {postKind === "question" &&
            viewer.id === postAuthorId &&
            onAcceptAnswer &&
            !botComment ? (
              <button
                type="button"
                aria-pressed={acceptedCommentId === comment.id}
                onClick={() => onAcceptAnswer(comment.id)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium",
                  acceptedCommentId === comment.id
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Award className="h-3.5 w-3.5" aria-hidden />
                {acceptedCommentId === comment.id ? "Accepted" : "Accept answer"}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export function CommentList({
  comments,
  viewer,
  botTyping = false,
  followUpBotCommentId,
  onSelectFollowUp,
  onFollowChange,
  onSaveEdit,
  onDelete,
  postKind,
  postAuthorId,
  acceptedCommentId,
  onAcceptAnswer,
}: {
  comments: FeedComment[];
  viewer: SessionUser | null;
  /** True while Veer is generating a reply for this post in the background. */
  botTyping?: boolean;
  followUpBotCommentId: string | null;
  onSelectFollowUp: (commentId: string) => void;
  onOpenComposer: () => void;
  onFollowChange: (authorId: string, following: boolean) => void;
  onSaveEdit: (commentId: string, nextBody: string) => Promise<{ ok: boolean; error?: string }>;
  onDelete: (commentId: string) => void;
  postKind?: CommunityPostKind;
  postAuthorId?: string;
  acceptedCommentId?: string | null;
  onAcceptAnswer?: (commentId: string) => void;
}) {
  if (comments.length === 0 && !botTyping) {
    return <p className="px-1 py-2 text-sm text-muted-foreground">No replies yet.</p>;
  }

  const ids = new Set(comments.map((comment) => comment.id));
  const children = new Map<string, FeedComment[]>();
  const roots: FeedComment[] = [];
  for (const comment of comments) {
    if (comment.parentId && ids.has(comment.parentId)) {
      const list = children.get(comment.parentId) ?? [];
      list.push(comment);
      children.set(comment.parentId, list);
    } else {
      roots.push(comment);
    }
  }

  function branch(comment: FeedComment, depth: number) {
    const nested = children.get(comment.id) ?? [];
    return (
      <li key={comment.id}>
        <CommentRow
          comment={comment}
          viewer={viewer}
          followUpActive={followUpBotCommentId === comment.id}
          onSelectFollowUp={onSelectFollowUp}
          onFollowChange={onFollowChange}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
          postKind={postKind}
          postAuthorId={postAuthorId}
          acceptedCommentId={acceptedCommentId}
          onAcceptAnswer={onAcceptAnswer}
        />
        {nested.length > 0 ? (
          <ul className={cn("ml-5 border-l border-border/80 pl-3", depth > 2 && "ml-3")}>
            {nested.map((child) => branch(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <ul className="space-y-2">
      {roots.map((comment) => branch(comment, 0))}
      {botTyping ? (
        <li
          role="status"
          aria-label="Veer AI is writing a reply"
          className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/[0.03] px-3 py-2.5"
        >
          <span
            aria-hidden
            className="h-7 w-7 shrink-0 rounded-full border border-primary/25 bg-background object-cover"
            style={{ backgroundImage: `url(${COMMUNITY_BOT_AVATAR_URL})`, backgroundSize: "cover" }}
          />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-primary">
              {COMMUNITY_BOT_DISPLAY_NAME}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Writing a reply
              <span className="inline-flex gap-0.5" aria-hidden>
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1 w-1 rounded-full bg-primary/70 motion-safe:animate-bounce motion-reduce:animate-none"
                    style={{ animationDelay: `${dot * 150}ms` }}
                  />
                ))}
              </span>
            </span>
          </span>
        </li>
      ) : null}
    </ul>
  );
}
