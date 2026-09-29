"use client";

import { Check, Copy, RefreshCw, Layers, AlignLeft, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ChatMessageActions — the shared per-answer action row.
 *
 * Rendered by BOTH surfaces (the floating widget's AIChatInterface and the
 * /chat tutor console) at the same position: a compact row directly under the
 * answer. Copy · Regenerate · Go deeper · Keep it short · Practice quiz.
 *
 * The component is presentation-only; each surface passes its own handlers so
 * the widget and the console share one layout without sharing state.
 */
export interface ChatMessageActionsProps {
  copied: boolean;
  onCopy: () => void;
  onRegenerate?: () => void;
  onDeeper?: () => void;
  onShorter?: () => void;
  onPractice?: () => void;
  /** Hide the thread-level actions (deeper/shorter/practice) on older answers. */
  isLatest?: boolean;
  disabled?: boolean;
  className?: string;
}

function ActionButton({
  onClick,
  disabled,
  title,
  icon: Icon,
  label,
}: {
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

export function ChatMessageActions({
  copied,
  onCopy,
  onRegenerate,
  onDeeper,
  onShorter,
  onPractice,
  isLatest = true,
  disabled = false,
  className,
}: ChatMessageActionsProps) {
  return (
    <div
      className={cn(
        "mt-1.5 flex flex-wrap items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        title="Copy this answer (links stay clickable, URLs are stripped)"
        className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>

      {isLatest && (
        <>
          {onRegenerate && (
            <ActionButton
              onClick={onRegenerate}
              disabled={disabled}
              title="Ask again — same question, a fresh answer"
              icon={RefreshCw}
              label="Regenerate"
            />
          )}
          {onDeeper && (
            <ActionButton
              onClick={onDeeper}
              disabled={disabled}
              title="Go deeper — intuition, full working, worked example, exam angle"
              icon={Layers}
              label="Go deeper"
            />
          )}
          {onShorter && (
            <ActionButton
              onClick={onShorter}
              disabled={disabled}
              title="Keep it short — the essentials only"
              icon={AlignLeft}
              label="Keep it short"
            />
          )}
          {onPractice && (
            <ActionButton
              onClick={onPractice}
              disabled={disabled}
              title="Turn this topic into an instant practice quiz"
              icon={Brain}
              label="Practice quiz"
            />
          )}
        </>
      )}
    </div>
  );
}
