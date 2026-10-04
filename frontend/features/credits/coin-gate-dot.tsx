"use client";

import { Wind } from "lucide-react";
import { useCoinGateEnabled } from "./use-coin-gate";

/**
 * COIN GATE DOT — the entire visible ON/OFF announcement of the coin gate
 * (owner request 2026-10-04: "keep only a small windy dot to show on off and
 * remove long message which shows this").
 *
 *   gate OFF → a small green wind dot, gently pulsing (free breeze);
 *   gate ON  → the same dot, still and muted (billing active);
 *   loading  → nothing (the surfaces keep their existing behaviour).
 *
 * The words live only in `title` / `aria-label` — hover and screen readers
 * get the full sentence, the page shows just the dot. The whole gate is in
 * scope: the toggle owns AI chat AND the coin-gated library for owner emails
 * (students always pay regardless of the toggle).
 */
export function CoinGateDot({ className = "" }: { className?: string }) {
  const enabled = useCoinGateEnabled();

  // Still loading the config — show nothing rather than a wrong state.
  if (enabled === null) return null;
  const off = enabled === false;
  const label = off
    ? "Coin gate OFF — free mode for owner emails (students still pay)"
    : "Coin gate ON — coins required (PRO stays unlimited)";

  return (
    <span
      role="img"
      title={label}
      aria-label={label}
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${className} ${
        off
          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-500"
          : "border-border/60 bg-muted/60 text-muted-foreground/70"
      }`}
    >
      <Wind className={`h-2.5 w-2.5 ${off ? "animate-pulse" : ""}`} />
    </span>
  );
}
