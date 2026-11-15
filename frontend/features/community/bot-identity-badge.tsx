"use client";

import { BadgeCheck, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/** Platform community bot — separate from the human owner (Sahrocky81). */
export function BotIdentityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "community-bot-badge inline-flex items-center gap-0.5 rounded-md border border-primary/35 bg-gradient-to-r from-primary/15 to-primary/10 font-semibold tracking-wide text-primary shadow-sm shadow-primary/15",
        compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px]",
      )}
      title="Community bot — verified platform assistant"
      aria-label="Community bot verified"
    >
      <Bot className={cn("relative z-[1]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <BadgeCheck className={cn("relative z-[1]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <span className="relative z-[1]">Community bot</span>
    </span>
  );
}