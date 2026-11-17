"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Bot, Loader2, MessageSquare, Send, X } from "lucide-react";
import { chipBtn, glassShell, inputClass, primaryCta } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export interface CommentComposerProps {
  signedIn: boolean;
  isBotPost: boolean;
  followUpCommentId: string | null;
  focusTrigger: number;
  onClearFollowUp: () => void;
  onSubmitComment: (body: string, followUpToBot: boolean) => Promise<{ ok: boolean; error?: string }>;
}

/**
 * Isolated comment form: typing updates local state only, so keystrokes never
 * re-render the post detail or the comment list above it.
 */
export function CommentComposer({
  signedIn,
  isBotPost,
  followUpCommentId,
  focusTrigger,
  onClearFollowUp,
  onSubmitComment,
}: CommentComposerProps) {
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addressingVeer = Boolean(followUpCommentId || isBotPost);

  useEffect(() => {
    if (focusTrigger <= 0) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const id = window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [focusTrigger]);

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (submitting) return;
    if (!signedIn) {
      setLocalError("Sign in to comment.");
      return;
    }
    const clean = body.trim();
    if (!clean) return;

    const snapshot = body;
    const isFollowUp = addressingVeer;
    setLocalError(null);
    setBody("");
    setSubmitting(true);

    try {
      const outcome = await onSubmitComment(clean, isFollowUp);
      if (!outcome.ok) {
        setBody((current) => (current.trim() ? current : snapshot));
        setLocalError(outcome.error || "Could not post comment.");
      }
    } catch {
      setBody((current) => (current.trim() ? current : snapshot));
      setLocalError("Could not post comment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className={cn(glassShell, "space-y-3 p-4 shadow-elev-1")}
      onSubmit={(event) => void submit(event)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <span className="font-medium text-muted-foreground">Recipient:</span>
          {addressingVeer ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Bot className="h-3.5 w-3.5" aria-hidden />
              Veer
              {followUpCommentId && !isBotPost ? (
                <button
                  type="button"
                  onClick={onClearFollowUp}
                  aria-label="Switch recipient to discussion"
                  className="ml-0.5 rounded-full p-0.5 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              ) : null}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              Discussion
            </span>
          )}
        </div>
        {signedIn ? (
          <span className="text-xs text-muted-foreground">Ctrl+Enter to post</span>
        ) : (
          <span className="text-xs text-muted-foreground">Sign in to comment.</span>
        )}
      </div>

      <label className="block text-sm">
        <span className="sr-only">Write a comment</span>
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            if (localError) setLocalError(null);
          }}
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
              event.preventDefault();
              void submit();
            }
          }}
          rows={3}
          maxLength={8000}
          placeholder={
            !signedIn
              ? "Sign in to join this discussion…"
              : addressingVeer
                ? "Ask Veer a follow-up question on this thread…"
                : "Add a helpful note, worked step, or answer…"
          }
          aria-label="Write a comment"
          className={cn(inputClass, "text-base sm:text-sm")}
        />
      </label>

      {localError ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {localError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={submitting || !body.trim()}
          className={cn(primaryCta, "min-h-11 px-4 py-2")}
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          {addressingVeer ? "Post follow-up" : "Post comment"}
        </button>
        {followUpCommentId && !isBotPost ? (
          <button
            type="button"
            onClick={onClearFollowUp}
            className={cn(chipBtn, "min-h-11")}
          >
            Reply to discussion instead
          </button>
        ) : null}
      </div>
    </form>
  );
}
