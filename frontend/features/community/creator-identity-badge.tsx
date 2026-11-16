"use client";

import { BadgeCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Platform creator (owner account) — distinct from Community bot and plan chips. */
export function CreatorIdentityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-orange-500/10 font-semibold tracking-wide text-amber-800 shadow-sm shadow-amber-500/10 dark:text-amber-200",
        compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px]",
      )}
      title="Platform creator"
      aria-label="Creator"
    >
      <Sparkles className={cn("shrink-0", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <BadgeCheck className={cn("shrink-0", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <span>Creator</span>
    </span>
  );
}