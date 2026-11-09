"use client";

/**
 * AI REPLY CARD — the frame every Veer reply wears (owner 2026-11-09: "with a
 * clear boundary outside, inside all sections with clear boundary in small
 * fonts so it seems like there is space … suggestion inside boxes and many
 * things as it is an educational app … in each reply at last keep a separate
 * box for ad").
 *
 * One bordered container outside; every section (answer, key terms, self
 * check, suggestions, actions) is its own bordered box inside, in compact
 * type so the reply reads as a set of clear islands instead of one wall of
 * text. The suggestion boxes are derived per reply and per place
 * (`lib/ai/reply-suggestions`), and the ad box always closes the card.
 */

import { useState } from "react";
import Link from "next/link";
import {
  BookMarked,
  CheckSquare,
  Copy,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdSlot } from "@/components/ai/ad-slot";
import {
  analyzeReply,
  buildReplySuggestions,
  buildSelfCheck,
  type ReplyContext,
  type ReplySuggestion,
} from "@/lib/ai/reply-suggestions";

function SuggestionBox({
  suggestion,
  onPick,
}: {
  suggestion: ReplySuggestion;
  onPick?: (suggestion: ReplySuggestion) => void;
}) {
  const [copied, setCopied] = useState(false);
  const Icon = suggestion.kind === "link" ? GraduationCap : Lightbulb;

  const inner = (
    <>
      <span className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
        <span className="truncate text-[11px] font-bold text-foreground">
          {copied ? "Prompt copied — paste it below" : suggestion.label}
        </span>
      </span>
      <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
        {suggestion.hint}
      </span>
    </>
  );

  const boxClass =
    "block w-full rounded-lg border border-border/70 bg-background/70 px-2.5 py-1.5 text-left transition hover:border-primary/50 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (suggestion.kind === "link" && suggestion.href) {
    return (
      <Link href={suggestion.href} className={boxClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={boxClass}
      onClick={() => {
        if (onPick) {
          onPick(suggestion);
          return;
        }
        if (suggestion.prompt && navigator.clipboard?.writeText) {
          void navigator.clipboard.writeText(suggestion.prompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }
      }}
    >
      {inner}
    </button>
  );
}

export function AiReplyCard({
  title = "Veer tutor",
  meta,
  reply,
  context,
  children,
  actions,
  compact = false,
  className,
}: {
  /** Header label — surfaces name their own voice ("Veer tutor", "Verified professor solution"). */
  title?: string;
  /** Small right-aligned header note (model, depth, subject…). */
  meta?: string;
  /** The raw reply text — powers the derived boxes. */
  reply: string;
  /** Where the reply lives — drives the suggestion boxes. */
  context: ReplyContext;
  /** The rendered reply body (markdown pipeline output). */
  children: React.ReactNode;
  /** Per-answer action row (copy/regenerate/practice) — rendered bordered above the ad. */
  actions?: React.ReactNode;
  /** Widget variant: body + suggestions + ad only. */
  compact?: boolean;
  className?: string;
}) {
  const analysis = analyzeReply(reply);
  const suggestions = buildReplySuggestions(reply, context);
  const selfCheck = buildSelfCheck(reply, context);

  return (
    <section
      aria-label={title}
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-border/80 bg-card shadow-sm",
        className,
      )}
    >
      {/* Header strip */}
      <header className="flex items-center justify-between gap-2 border-b border-border/70 bg-muted/30 px-3 py-1.5">
        <span className="flex min-w-0 items-center gap-1.5">
          <Sparkles className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </span>
        {meta && (
          <span className="hidden shrink-0 text-[9px] uppercase tracking-wider text-muted-foreground sm:block">
            {meta}
          </span>
        )}
      </header>

      {/* The answer — its own island */}
      <div className="border-b border-border/70 px-3.5 py-3 text-[13px] leading-relaxed [&_p]:my-1.5">
        {children}
      </div>

      {/* Key terms — the reply's own vocabulary, boxed */}
      {!compact && analysis.keyTerms.length > 0 && (
        <section
          aria-label="Key terms"
          className="border-b border-border/70 bg-muted/20 px-3.5 py-2"
        >
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <BookMarked className="h-2.5 w-2.5" aria-hidden="true" />
            Key terms
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {analysis.keyTerms.map((term) => (
              <span
                key={term}
                className="rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold text-foreground"
              >
                {term}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Check yourself — small, local, educational */}
      {!compact && (
        <section
          aria-label="Check yourself"
          className="border-b border-border/70 px-3.5 py-2"
        >
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <CheckSquare className="h-2.5 w-2.5" aria-hidden="true" />
            Check yourself
          </p>
          <ul className="mt-1.5 grid gap-1 sm:grid-cols-3">
            {selfCheck.map((check) => (
              <li
                key={check}
                className="rounded-lg border border-border/60 bg-background/60 px-2 py-1 text-[10px] leading-snug text-muted-foreground"
              >
                {check}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Suggestions — boxed next moves, derived per reply and per place */}
      {suggestions.length > 0 && (
        <section
          aria-label="Suggestions"
          className="border-b border-border/70 bg-muted/20 px-3.5 py-2"
        >
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-2.5 w-2.5" aria-hidden="true" />
            Take it further
          </p>
          <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
            {suggestions.map((suggestion) => (
              <SuggestionBox key={suggestion.label} suggestion={suggestion} />
            ))}
          </div>
        </section>
      )}

      {/* Per-answer actions (surfaces keep their own controls) */}
      {actions && (
        <div className="border-b border-border/70 px-3.5 py-1.5">{actions}</div>
      )}

      {/* The ad box always closes the reply */}
      <div className="p-2.5">
        <AdSlot />
      </div>
    </section>
  );
}
