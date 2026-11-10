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

import Link from "next/link";
import {
  BookMarked,
  CheckSquare,
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
  // Small key-terms-style chips — number + label, hint on hover.
  const inner = (
    <>
      <span className="text-[8px] font-bold text-primary">{index + 1}</span>
      <span className="truncate text-[10px] font-semibold text-foreground">{suggestion.label}</span>
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
      onClick={() => onPick?.(suggestion)}
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
  isVerifiedOwner = false,
  onFollowUp,
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
  /** Derived only from the authenticated session; never from answer text. */
  isVerifiedOwner?: boolean;
  /** Immediately sends a clicked follow-up as the next user message. */
  onFollowUp?: (prompt: string) => void;
  className?: string;
}) {
  const analysis = analyzeReply(reply);
  const suggestions = buildReplySuggestions(reply, context).map((suggestion) =>
    suggestion.kind === "prompt"
      ? suggestion
      : {
          ...suggestion,
          kind: "prompt" as const,
          href: undefined,
          prompt: `Help me ${suggestion.label.toLowerCase()} for ${suggestion.hint}, and connect it to the answer above.`,
        },
  );
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

      {/* Owner-only key-term panel — related terms and explicit contrasts. */}
      {!compact && isVerifiedOwner && (analysis.relatedTerms.length > 0 || analysis.contrasts.length > 0) && (
        <section
          aria-label="Key terms"
          className="border-b border-border/70 bg-muted/20 px-3.5 py-2"
        >
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <BookMarked className="h-2.5 w-2.5" aria-hidden="true" />
            Key terms
          </p>
          {analysis.relatedTerms.length > 0 && (
            <div className="mt-1.5">
              <p className="text-[9px] font-semibold text-muted-foreground">Related —</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {analysis.relatedTerms.map((term, index) => (
                  <button
                    key={term}
                    type="button"
                    title={`Ask Veer about ${term}`}
                    className="inline-flex items-baseline gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => onFollowUp?.(`Explain ${term} from the answer above in a concise way, including its meaning and how it connects to this topic.`)}
                  >
                    <span className="text-[8px] font-bold text-primary">{index + 1}</span>
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {analysis.contrasts.length > 0 && (
            <div className="mt-2">
              <p className="text-[9px] font-semibold text-muted-foreground">Contrasts —</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {analysis.contrasts.map((term, index) => (
                  <button
                    key={term}
                    type="button"
                    title={`Compare ${term}`}
                    className="inline-flex items-baseline gap-1 rounded-full border border-amber-500/35 bg-amber-500/[0.07] px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors hover:bg-amber-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => onFollowUp?.(`Clearly contrast ${term} from the answer above: state the exact difference and give one short NEB-relevant example.`)}
                  >
                    <span className="text-[8px] font-bold text-amber-600">{index + 1}</span>
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Check yourself — small, local, educational */}
      {!compact && isVerifiedOwner && (
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
              <li key={check}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-border/60 bg-background/60 px-2 py-1 text-left text-[10px] leading-snug text-muted-foreground transition-colors hover:border-primary/35 hover:bg-primary/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => onFollowUp?.(`Ask me this self-check question and wait for my answer before explaining: ${check}`)}
                >
                  {check}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Suggestions — small key-terms-style chips, derived per reply and place */}
      {!compact && isVerifiedOwner && onFollowUp && suggestions.length > 0 && (
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
              <SuggestionBox
                key={suggestion.label}
                index={index}
                suggestion={suggestion}
                onPick={(picked) => {
                  const prompt = picked.prompt ?? `Help me ${picked.label.toLowerCase()} for ${picked.hint}, using the answer above as context.`;
                  onFollowUp?.(prompt);
                }}
              />
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
