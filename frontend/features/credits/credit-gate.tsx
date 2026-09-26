"use client";

/**
 * CreditGate — the blur/security wrapper for any coin-gated block.
 *
 * Unauthenticated → content is blurred and inert; any click raises the notice.
 * Authenticated   → shows the unlock overlay with the category's coin cost;
 *                   after paying, children mount for the 2-hour window.
 * Window expiry   → children unmount, blur returns, overlay reappears —
 *                   no page reload (driven by the frame-by-frame timer).
 */

import { useState, type ReactNode } from "react";
import { Lock, Coins, Loader2, Timer } from "lucide-react";
import { TOKEN_MATRIX, type ContentCategory } from "./constants";
import { useCredit } from "./credit-provider";

export interface CreditGateProps {
  /** Unique key for this block's unlock window (e.g. "/lab/cell-organelles"). */
  moduleKey: string;
  /** Pricing category from the token matrix. */
  category: ContentCategory;
  children: ReactNode;
  /** Compact variant for inline rows / cards. */
  compact?: boolean;
  /** Custom overlay headline (defaults to the category label). */
  label?: string;
}

export function CreditGate({
  moduleKey,
  category,
  children,
  compact = false,
  label,
}: CreditGateProps) {
  const {
    isAuthenticated,
    isUnlocked,
    remainingClock,
    openModule,
    requestAccess,
    error,
  } = useCredit();
  const [working, setWorking] = useState(false);

  const rule = TOKEN_MATRIX[category];
  const open = isUnlocked(moduleKey);
  const headline = label ?? rule.label;

  // Authenticated + window open → render the real content.
  if (open) {
    return (
      <div className="relative">
        {/* Countdown badge */}
        <div className="pointer-events-none absolute right-2 top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-500 backdrop-blur-sm">
          <Timer className="h-3 w-3" />
          {remainingClock(moduleKey)}
        </div>
        {children}
      </div>
    );
  }

  const onUnlock = async () => {
    if (working) return;
    setWorking(true);
    try {
      // requestAccess() raises the notice for unauthenticated guests;
      // openModule handles auth check + coin deduction + window start.
      if (!isAuthenticated) {
        requestAccess();
        return;
      }
      await openModule(moduleKey, category);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div
      data-gate={category}
      data-gate-handled="true"
      data-gate-title="Sign in to unlock this content"
      className="relative overflow-hidden rounded-2xl border border-border/70"
    >
      {/* Blurred, inert content layer */}
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none blur-sm opacity-40 ${
          compact ? "min-h-[8rem]" : "min-h-[16rem]"
        } flex items-center justify-center bg-muted/40`}
      >
        <Lock className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Unlock overlay — sticky so the button stays reachable on tall content */}
      <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-[2px]">
        <div className="sticky top-20 flex justify-center px-4 py-6">
          <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-3xl border border-border/70 bg-card p-5 text-center shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>

            <p className="text-sm font-bold leading-snug text-foreground">
              {rule.emoji} {headline}
            </p>

            <button
              type="button"
              onClick={onUnlock}
              disabled={working}
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              {working ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Coins className="h-4 w-4" />
              )}
              {working ? "Unlocking…" : `Unlock — ${rule.cost} coins`}
            </button>

            <p className="text-[11px] font-medium text-muted-foreground">
              Open for 2 hours, then auto-locks
            </p>

            {error && (
              <p className="max-w-xs rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-[11px] font-semibold text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
