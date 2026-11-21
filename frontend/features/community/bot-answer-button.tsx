"use client";

import { Bot, Loader2, Sparkles } from "lucide-react";
import { actionBtn, assistantPanel, chipBtn } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export function BotAnswerButton({
  visible,
  busy,
  question,
  variant = "panel",
  onPublish,
}: {
  visible: boolean;
  busy: boolean;
  question?: boolean;
  variant?: "panel" | "comment";
  onPublish: () => void;
}) {
  if (!visible) return null;

  if (variant === "comment") {
    return (
      <button
        type="button"
        disabled={busy}
        className={cn(actionBtn, "min-h-11 min-w-11 text-primary hover:bg-primary/10")}
        aria-label="Ask AI"
        onClick={onPublish}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
        <span>{busy ? "Asking…" : "Ask AI"}</span>
      </button>
    );
  }

  return (
    <div className={cn(assistantPanel(), "space-y-3 p-4 sm:p-5")}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight">Ask AI</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question
              ? "Ask AI sends the community bot to answer in this thread — visible to everyone."
              : "Ask AI sends the community bot to reply here — one answer per post."}
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled={busy}
        className={cn(chipBtn, "min-h-11 px-4 text-sm text-foreground")}
        aria-label="Ask AI"
        onClick={onPublish}
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Asking…
          </>
        ) : (
          <>
            <Bot className="h-4 w-4" aria-hidden />
            Ask AI
          </>
        )}
      </button>
    </div>
  );
}
