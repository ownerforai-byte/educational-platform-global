"use client";

import { memo, useState } from "react";
import {
  AlertCircle,
  Check,
  Ellipsis,
  Loader2,
  MessageCircle,
  MessageSquare,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SessionUser } from "@/features/auth/types";
import type { FeedComment } from "@/lib/api/community-feed";
import { isCommunityBot } from "@/lib/community-bot";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { MemberOnlyMarkdown } from "@/features/community/member-only-markdown";
import { canModerate } from "@/features/community/community-helpers";
import {
  actionBtn,
  chipBtn,
  emptyStatePanel,
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
}

const CommentRow = memo(function CommentRow({
  comment,
  viewer,
  followUpActive,
  onSelectFollowUp,
  onFollowChange,
  onSaveEdit,
  onDelete,
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
    viewer && ((viewer.id === comment.author.id && !botComment) || canModerate(viewer)),
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
    <li className="px-4 py-4 sm:px-5">
      <div
        className={cn(
          "space-y-2",
          botComment &&
            "rounded-xl border border-primary/25 bg-primary/[0.04] p-3.5 ring-1 ring-primary/10 sm:p-4",
        )}
      >
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
            {comment.replyTo && (botComment || Boolean(comment.parentId)) ? (
              <p className="pl-10 text-xs font-medium text-muted-foreground">
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

        {viewer && botComment ? (
          <div className="pt-1">
            <button
              type="button"
              className={cn(
                chipBtn,
                "min-h-10",
                followUpActive && "border-primary/50 bg-primary/12 text-primary",
              )}
              aria-pressed={followUpActive}
              aria-label="Ask Community bot a follow-up"
              onClick={() => onSelectFollowUp(comment.id)}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {followUpActive ? "Addressing Veer" : "Ask follow-up"}
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
});

export function CommentList({
  comments,
  viewer,
  followUpBotCommentId,
  onSelectFollowUp,
  onOpenComposer,
  onFollowChange,
  onSaveEdit,
  onDelete,
}: {
  comments: FeedComment[];
  viewer: SessionUser | null;
  followUpBotCommentId: string | null;
  onSelectFollowUp: (commentId: string) => void;
  onOpenComposer: () => void;
  onFollowChange: (authorId: string, following: boolean) => void;
  onSaveEdit: (commentId: string, nextBody: string) => Promise<{ ok: boolean; error?: string }>;
  onDelete: (commentId: string) => void;
}) {
  if (comments.length === 0) {
    return (
      <div className={cn(emptyStatePanel, "space-y-2.5 p-6 text-center")}>
        <MessageSquare className="mx-auto h-8 w-8 text-primary/40" aria-hidden />
        <p className="text-sm font-medium text-foreground">No comments yet</p>
        <p className="text-sm text-muted-foreground">
          Add the first answer, explanation, or follow-up question.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-elev-0">
      {comments.map((comment) => (
        <CommentRow
          key={comment.id}
          comment={comment}
          viewer={viewer}
          followUpActive={followUpBotCommentId === comment.id}
          onSelectFollowUp={onSelectFollowUp}
          onFollowChange={onFollowChange}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
