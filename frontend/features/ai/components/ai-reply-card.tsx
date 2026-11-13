"use client";

/**
 * AI REPLY CARD — signed-in / premium Veer replies as a compact briefing
 * document: smaller type, invitation-like section spacing, report hierarchy.
 * VisitorHomeChat (public sign-in widget) does not use this component.
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
  title = "Veer briefing",
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
  title?: string;
  meta?: string;
  reply: string;
  context: ReplyContext;
  children: React.ReactNode;
  actions?: React.ReactNode;
  compact?: boolean;
  isVerifiedOwner?: boolean;
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
        "overflow-hidden rounded-xl border border-border/90 bg-card shadow-[0_1px_0_hsl(var(--border)/0.6)]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-border/80 bg-muted/40 px-3.5 py-2">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Study briefing
          </p>
          <p className="mt-0.5 flex min-w-0 items-center gap-1.5 truncate text-[11px] font-semibold tracking-wide text-foreground">
            <Leaf className="h-3 w-3 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span className="truncate">{title}</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          {meta ? (
            <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{meta}</p>
          ) : null}
          <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
            Organised for learning
          </p>
        </div>
      </header>

      {/* Report body — conceptual spacing, smaller letters */}
      <div
        className={cn(
          "border-b border-border/70 px-4 py-4 sm:px-5 sm:py-5",
          "text-[12.5px] leading-[1.65]",
          "[&_p]:my-2.5 [&_p]:max-w-[68ch]",
          "[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:rounded-lg [&_h2]:border [&_h2]:border-border/80 [&_h2]:bg-muted/50 [&_h2]:px-2.5 [&_h2]:py-1.5 [&_h2]:text-[11px] [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[0.14em]",
          "[&_h3]:mt-3.5 [&_h3]:mb-1.5 [&_h3]:text-[11px] [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-[0.1em] [&_h3]:text-muted-foreground",
          "[&_h4]:mt-3 [&_h4]:mb-1 [&_h4]:text-[10px] [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:text-muted-foreground",
          "[&_ol]:my-2.5 [&_ol]:space-y-1.5 [&_ol]:rounded-xl [&_ol]:border [&_ol]:border-dashed [&_ol]:border-border/80 [&_ol]:bg-background/80 [&_ol]:py-2 [&_ol]:pl-5 [&_ol]:pr-3",
          "[&_ul]:my-2.5 [&_ul]:space-y-1.5 [&_ul]:rounded-xl [&_ul]:border [&_ul]:border-dashed [&_ul]:border-border/80 [&_ul]:bg-background/80 [&_ul]:py-2 [&_ul]:pl-5 [&_ul]:pr-3",
          "[&_blockquote]:my-3 [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-border [&_blockquote]:border-l-[3px] [&_blockquote]:border-l-primary/50 [&_blockquote]:bg-muted/40 [&_blockquote]:px-3.5 [&_blockquote]:py-2.5",
          "[&_table]:my-3 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-border/80 [&_table]:text-[11.5px]",
          "[&_thead]:bg-muted/55 [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-[9px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.12em]",
          "[&_td]:border-t [&_td]:border-border/60 [&_td]:px-2.5 [&_td]:py-1.5",
          "[&_hr]:my-4 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-gradient-to-r [&_hr]:from-primary/35 [&_hr]:via-border [&_hr]:to-transparent",
          "[&_strong]:font-semibold [&_strong]:tracking-[0.01em]",
          "[&_code]:rounded [&_code]:bg-muted/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[11px]",
        )}
      >
        {children}
      </div>

      {!compact && isVerifiedOwner && (analysis.relatedTerms.length > 0 || analysis.contrasts.length > 0) && (
        <div className="space-y-2 border-b border-border/70 px-3 py-2.5">
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
        <div className="border-b border-border/70 px-3 py-2.5">
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
        <div className="border-b border-border/70 px-3 py-2.5">
          <VeerSection
            title="Take it further"
            icon={BookMarked}
            border="dash"
            scroll="x"
            aria-label="Suggestions"
          >
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
        <div className="border-b border-border/70 px-3.5 py-2">{actions}</div>
      )}

      <div className="p-2.5">
        <AdSlot />
      </div>
    </section>
  );
}
