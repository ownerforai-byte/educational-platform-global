"use client";

import { BadgeCheck, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Sahrocky81 — platform owner-operated assistant identity on the community board. */
export function BotIdentityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "community-bot-badge inline-flex items-center gap-0.5 rounded-md border border-amber-500/35 bg-gradient-to-r from-amber-500/15 to-amber-400/10 font-semibold tracking-wide text-amber-800 shadow-sm shadow-amber-500/15 dark:text-amber-200",
        compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px]",
      )}
      title="Sahrocky81 — owner-verified platform assistant"
      aria-label="Sahrocky81 owner verified"
    >
      <Crown className={cn("relative z-[1]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <BadgeCheck className={cn("relative z-[1]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <span className="relative z-[1]">Sahrocky81</span>
      <span className="relative z-[1] opacity-90">· Owner</span>
    </span>
  );
}
