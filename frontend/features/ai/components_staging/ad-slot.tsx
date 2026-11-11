import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AD SLOT — the dedicated promotion box at the end of every AI reply
 * (owner 2026-11-09: "in each reply at last keep a separate box for ad").
 *
 * Renders a clearly-labelled, clearly-bounded slot so a real network unit can
 * drop straight in (pass `children` from the ad provider) without touching
 * the reply layout. Until then it carries a house promotion for a study
 * surface — the box must never look like part of the answer.
 */
export function AdSlot({
  className,
  label = "Sponsored",
  children,
}: {
  className?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside
      aria-label="Sponsored"
      className={cn(
        "rounded-xl border-2 border-dashed border-amber-500/40 bg-amber-500/[0.05] p-2.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
          {label}
        </span>
        <span className="text-[9px] text-muted-foreground">ad</span>
      </div>
      {children ?? (
        <Link
          href="/mock-exams"
          className="mt-1.5 flex items-center justify-between gap-2 rounded-lg border border-amber-500/30 bg-background/60 px-2.5 py-1.5 transition hover:border-amber-500/60"
        >
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-bold text-foreground">
              Timed mock papers — exam stamina in 90 minutes
            </span>
            <span className="block truncate text-[10px] text-muted-foreground">
              Full-length NEB-style papers with auto scoring
            </span>
          </span>
          <span className="shrink-0 text-[10px] font-bold text-amber-600 dark:text-amber-400">
            Open →
          </span>
        </Link>
      )}
    </aside>
  );
}
