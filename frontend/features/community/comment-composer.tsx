"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Loader2, X } from "lucide-react";
import type { FeedComment } from "@/lib/api/community-feed";
import { isCommunityBot } from "@/lib/community-bot";
import { cn } from "@/lib/utils";
import { useCommunityMentionSuggest } from "@/features/community/community-mention-suggest";

export interface CommentComposerProps {
  signedIn: boolean;
  viewerName?: string | null;
  isBotPost: boolean;
  replyTo: FeedComment | null;
  focusTrigger: number;
  onClearReply: () => void;
  onSubmitComment: (
    body: string,
    followUpToBot: boolean,
    replyToCommentId?: string,
  ) => Promise<{ ok: boolean; error?: string }>;
}

function grow(el: HTMLTextAreaElement) {
  el.style.height = "0px";
  el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
}

/**
 * Twitter-style reply box: avatar, a growing line, and a Reply button.
 * Keystrokes stay in this component so the thread above does not re-render.
 */
export function CommentComposer({
  signedIn,
  viewerName,
  isBotPost,
  replyTo,
  focusTrigger,
  onClearReply,
  onSubmitComment,
}: CommentComposerProps) {
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [posted, setPosted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mentionPanel, syncFromTextarea, onTextareaBlur, openFromAtButton } = useCommunityMentionSuggest({
    body,
    setBody,
    textareaRef,
  });

  const handle = replyTo?.author.username || replyTo?.author.fullName || "";
  const answeringBot = Boolean(
    replyTo && (replyTo.author.role === "assistant" || isCommunityBot(replyTo.author.id)),
  );
  const initial = (viewerName?.trim() || "You").slice(0, 1).toUpperCase();

  useEffect(() => {
    if (focusTrigger <= 0) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const id = window.requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      grow(el);
    });
    return () => window.cancelAnimationFrame(id);
  }, [focusTrigger]);

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (submitting) return;
    if (!signedIn) {
      setLocalError("Sign in to reply.");
      return;
    }
    const clean = body.trim();
    if (!clean) return;

    const snapshot = body;
    const followUp = answeringBot || (!replyTo && isBotPost);
    const parentId = replyTo && !replyTo.id.startsWith("pending-comment-") ? replyTo.id : undefined;
    setLocalError(null);
    setBody("");
    if (textareaRef.current) textareaRef.current.style.height = "0px";
    setSubmitting(true);

    try {
      const outcome = await onSubmitComment(clean, followUp, parentId);
      if (!outcome.ok) {
        setBody((current) => (current.trim() ? current : snapshot));
        setLocalError(outcome.error || "Could not reply.");
      } else {
        setPosted(true);
        window.setTimeout(() => setPosted(false), 3000);
        onClearReply();
      }
    } catch {
      setBody((current) => (current.trim() ? current : snapshot));
      setLocalError("Could not reply.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="mx-1 mb-2 flex gap-3 rounded-lg border border-border/90 bg-background p-3 shadow-sm"
      onSubmit={(event) => void submit(event)}
    >
      <span
        aria-hidden
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground"
      >
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        {replyTo && handle ? (
          <p className="mb-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
            Replying to <span className="font-medium text-primary">@{handle}</span>
            <button
              type="button"
              onClick={onClearReply}
              aria-label="Cancel reply"
              className="rounded-full p-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </p>
        ) : null}
        <label className="relative block">
          <span className="sr-only">Post your reply</span>
          {signedIn ? mentionPanel : null}
          <textarea
            ref={textareaRef}
            value={body}
            rows={1}
            maxLength={8000}
            disabled={!signedIn}
            placeholder={
              !signedIn
                ? "Sign in to reply"
                : handle
                  ? `Reply to @${handle}`
                  : "Post your reply — type @ for Veer AI"
            }
            aria-label="Post your reply"
            className="max-h-40 min-h-10 w-full resize-none border-0 bg-transparent py-2 text-[15px] leading-5 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            onChange={(event) => {
              setBody(event.target.value);
              if (localError) setLocalError(null);
              grow(event.currentTarget);
              syncFromTextarea();
            }}
            onKeyUp={syncFromTextarea}
            onClick={syncFromTextarea}
            onBlur={onTextareaBlur}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                void submit();
              }
            }}
          />
        </label>
        {posted ? (
          <p role="status" className="mb-2 text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
            Reply posted
            {handle ? (
              <>
                {" "}
                to <span className="text-primary">@{handle}</span>
              </>
            ) : null}
            .
          </p>
        ) : null}
        {localError ? (
          <p
            role="alert"
            className="mb-2 flex items-start gap-2 text-[13px] text-destructive"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            {localError}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-2">
          {signedIn ? (
            <button
              type="button"
              onClick={openFromAtButton}
              className="text-[12px] font-medium text-muted-foreground hover:text-primary"
            >
              @ Mention
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting || !signedIn || !body.trim()}
            className={cn(
              "inline-flex h-8 min-w-[4.5rem] items-center justify-center rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground",
              "transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : "Reply"}
          </button>
        </div>
      </div>
    </form>
  );
}
