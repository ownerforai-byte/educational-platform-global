"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Server-controlled AI identity chip. Distinct from a human "verified" tick:
 * only rendered when the author id is `rn-study-assistant`.
 */
export function BotIdentityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "community-bot-badge inline-flex items-center gap-0.5 rounded-md border border-primary/25 bg-primary/10 font-semibold uppercase tracking-wide text-primary shadow-sm shadow-primary/10",
        compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px]",
      )}
      title="Verified AI assistant issued by the server — not a human verification badge"
      aria-label="Verified AI assistant"
    >
      <Bot className={cn("relative z-[1]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      <span className="relative z-[1]">Verified AI</span>
    </span>
  );
}
