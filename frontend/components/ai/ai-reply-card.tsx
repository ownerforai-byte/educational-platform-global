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
  index,
  onPick,
}: {
  suggestion: ReplySuggestion;
  index: number;
  onPick?: (suggestion: ReplySuggestion) => void;
}) {
  const [copied, setCopied] = useState(false);

  // Small key-terms-style chips (owner 2026-11-09: "optimize the suggestions
  // in small boxes like those key terms") — number + label, hint on hover.
  const inner = (
    <>
      <span className="text-[8px] font-bold text-primary">{index + 1}</span>
      <span className="truncate text-[10px] font-semibold text-foreground">
        {copied ? "Prompt copied — paste it below" : suggestion.label}
      </span>
    </>
  );

  const boxClass =
    "inline-flex max-w-full items-baseline gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors hover:border-primary/45 hover:bg-primary/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (suggestion.kind === "link" && suggestion.href) {
    return (
      <Link href={suggestion.href} title={suggestion.hint} className={boxClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      title={suggestion.hint}
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

      {/* The answer — its own island, laid out like a notebook page */}
      <div
        className={cn(
          "border-b border-border/70 px-4 py-4 text-[13.5px] leading-7",
          // conceptual spacing — a page to breathe on, not a wall of text
          "[&_p]:my-2.5",
          // section labels the template prints (Concept, Features, Solved example…)
          "[&_h2]:mt-5 [&_h2]:mb-1.5 [&_h2]:text-sm [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[0.14em] [&_h2]:text-primary",
          "[&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:text-[13px] [&_h3]:font-bold [&_h3]:text-primary",
          "[&_h4]:mt-3 [&_h4]:mb-1 [&_h4]:text-[11px] [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:text-muted-foreground",
          // features — numbered lists that breathe
          "[&_ol]:my-2.5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
          "[&_ol>li]:marker:font-bold [&_ol>li]:marker:text-primary",
          "[&_ul]:my-2.5 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul>li]:marker:text-primary",
          // example / callout blocks
          "[&_blockquote]:my-3.5 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-[3px] [&_blockquote]:border-primary/50 [&_blockquote]:bg-primary/[0.05] [&_blockquote]:px-3.5 [&_blockquote]:py-2 [&_blockquote]:text-foreground/90",
          // the contrast table
          "[&_table]:my-3.5 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-border/70 [&_table]:text-[12.5px]",
          "[&_thead]:bg-primary/[0.07] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-[11px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-primary",
          "[&_td]:border-t [&_td]:border-border/60 [&_td]:px-3 [&_td]:py-2",
          // concept boundaries (---) — an ink rule fading out, not a flat line
          "[&_hr]:my-5 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-gradient-to-r [&_hr]:from-primary/40 [&_hr]:via-border [&_hr]:to-transparent",
          // key terms read like highlighter marks in a notebook
          "[&_strong]:rounded [&_strong]:bg-primary/[0.10] [&_strong]:px-1 [&_strong]:font-bold [&_strong]:text-foreground",
          "[&_code]:rounded [&_code]:bg-primary/[0.08] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[12px]",
        )}
      >
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
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {analysis.keyTerms.map((term, index) => (
              <span
                key={term}
                className={cn(
                  "inline-flex items-baseline gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold text-foreground",
                  /\b(vs\.?|versus)\b/i.test(term)
                    ? "border-primary/45 bg-primary/[0.10]"
                    : "border-primary/25 bg-primary/[0.06]",
                )}
              >
                <span className="text-[8px] font-bold text-primary">{index + 1}</span>
                <span>{term}</span>
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

      {/* Suggestions — small key-terms-style chips, derived per reply and place */}
      {suggestions.length > 0 && (
        <section
          aria-label="Suggestions"
          className="border-b border-border/70 bg-muted/20 px-3.5 py-2"
        >
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-2.5 w-2.5" aria-hidden="true" />
            Take it further
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {suggestions.map((suggestion, index) => (
              <SuggestionBox key={suggestion.label} index={index} suggestion={suggestion} />
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
