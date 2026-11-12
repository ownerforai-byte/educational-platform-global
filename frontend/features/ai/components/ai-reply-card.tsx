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

import {
  BookMarked,
  CheckSquare,
  Flower2,
  Leaf,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdSlot } from "@/components/ai/ad-slot";
import { VeerChip, VeerSection } from "@/components/ai/veer-chip";
import {
  analyzeReply,
  buildReplySuggestions,
  buildSelfCheck,
  type ReplyContext,
  type ReplySuggestion,
} from "@/lib/ai/reply-suggestions";

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
        "overflow-hidden rounded-2xl border border-dashed border-emerald-700/35 bg-card shadow-sm dark:border-emerald-400/30",
        className,
      )}
    >
      {/* Header strip */}
      <header className="flex items-center justify-between gap-2 border-b border-dashed border-emerald-700/30 bg-emerald-500/[0.04] px-3 py-1.5 dark:border-emerald-400/30">
        <span className="flex min-w-0 items-center gap-1.5">
          <Leaf className="h-3 w-3 shrink-0 text-emerald-600" aria-hidden="true" />
          <span className="truncate text-[11px] font-bold uppercase tracking-wider text-emerald-800/70 dark:text-emerald-300/70">
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
          "border-b border-dashed border-emerald-700/25 px-4 py-4 text-[13.5px] leading-7 dark:border-emerald-400/25",
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

      {/* Owner-only key-term panel — natural chips with dashed section frames. */}
      {!compact && isVerifiedOwner && (analysis.relatedTerms.length > 0 || analysis.contrasts.length > 0) && (
        <div className="space-y-2 border-b border-dashed border-emerald-700/25 px-2.5 py-2 dark:border-emerald-400/25">
          {analysis.relatedTerms.length > 0 && (
            <VeerSection title="Key terms" icon={Sprout} border="dash" scroll="wrap" aria-label="Key terms">
              {analysis.relatedTerms.map((term) => (
                <VeerChip
                  key={term}
                  label={term}
                  icon={Leaf}
                  title={`Ask Veer about ${term}`}
                  onClick={() =>
                    onFollowUp?.(
                      `Explain ${term} from the answer above in a concise way, including its meaning and how it connects to this topic.`,
                    )
                  }
                />
              ))}
            </VeerSection>
          )}
          {analysis.contrasts.length > 0 && (
            <VeerSection title="Contrasts" icon={Flower2} border="line" scroll="wrap">
              {analysis.contrasts.map((term) => (
                <VeerChip
                  key={term}
                  label={term}
                  title={`Compare ${term}`}
                  onClick={() =>
                    onFollowUp?.(
                      `Clearly contrast ${term} from the answer above: state the exact difference and give one short NEB-relevant example.`,
                    )
                  }
                />
              ))}
            </VeerSection>
          )}
        </div>
      )}

      {!compact && isVerifiedOwner && (
        <div className="border-b border-dashed border-emerald-700/25 px-2.5 py-2 dark:border-emerald-400/25">
          <VeerSection title="Check yourself" icon={CheckSquare} border="dash" scroll="wrap" aria-label="Check yourself">
            {selfCheck.map((check) => (
              <VeerChip
                key={check}
                label={check}
                title={check}
                onClick={() =>
                  onFollowUp?.(
                    `Ask me this self-check question and wait for my answer before explaining: ${check}`,
                  )
                }
              />
            ))}
          </VeerSection>
        </div>
      )}

      {!compact && isVerifiedOwner && onFollowUp && suggestions.length > 0 && (
        <div className="border-b border-dashed border-emerald-700/25 px-2.5 py-2 dark:border-emerald-400/25">
          <VeerSection title="Take it further" icon={BookMarked} border="dash" scroll="x" aria-label="Suggestions">
            {suggestions.map((suggestion: ReplySuggestion) => (
              <VeerChip
                key={suggestion.label}
                label={suggestion.label}
                title={suggestion.hint}
                href={suggestion.kind === "link" ? suggestion.href : undefined}
                onClick={
                  suggestion.kind === "link"
                    ? undefined
                    : () => {
                        const prompt =
                          suggestion.prompt ??
                          `Help me ${suggestion.label.toLowerCase()} for ${suggestion.hint}, using the answer above as context.`;
                        onFollowUp?.(prompt);
                      }
                }
              />
            ))}
          </VeerSection>
        </div>
      )}

      {actions && (
        <div className="border-b border-dashed border-emerald-700/25 px-3.5 py-1.5 dark:border-emerald-400/25">
          {actions}
        </div>
      )}

      {/* The ad box always closes the reply */}
      <div className="p-2.5">
        <AdSlot />
      </div>
    </section>
  );
}
