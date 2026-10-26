"use client";

import { AlertTriangle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Shared loading / error / empty trio for the AI surfaces (plan.md §13 — M4).
 *
 * Every Veer tool used to hand-roll its own spinner, error banner and empty
 * placeholder; these three render the same visual language everywhere so a
 * failure looks the same in the quiz studio, the tutor and the history
 * console. Error copy is preserved verbatim — only the chrome is unified.
 */

export function AiLoadingState({ label = "Asking Veer…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-muted/30 px-4 py-8 text-sm text-muted-foreground"
    >
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      {label}
    </div>
  );
}

export function AiErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/20 dark:text-rose-400"
    >
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-0.5 leading-relaxed">{message}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2.5 rounded-xl"
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AiEmptyState({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-10 text-center">
      <Sparkles className="h-5 w-5 text-muted-foreground/60" />
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} className="mt-2 rounded-xl">
          {action.label}
        </Button>
      )}
    </div>
  );
}
