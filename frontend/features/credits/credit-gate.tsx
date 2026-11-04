"use client";

/**
 * CreditGate — the blur/security wrapper for any coin-gated block.
 *
 * The unlock mechanics (content spark spend, 20-minute window) run silently
 * in the background. The user only ever sees "Upgrade your plan".
 *
 * Unauthenticated → blur + "Upgrade your plan" overlay; click triggers the
 *                   notice modal.
 * Authenticated   → same overlay; click fires the silent spark unlock API call;
 *                   after it resolves, children mount for the 20-minute window.
 * Window expiry   → children unmount, blur returns, overlay reappears —
 *                   no page reload (driven by the frame-by-frame timer).
 */

import { useState, type ReactNode } from "react";
import { ArrowRight, Loader2, Sparkles, Timer } from "lucide-react";
import { type ContentCategory } from "./constants";
import { useCredit } from "./credit-provider";

export interface CreditGateProps {
  /** Unique key for this block's unlock window (e.g. "/lab/cell-organelles"). */
  moduleKey: string;
  /** Pricing category from the token matrix. */
  category: ContentCategory;
  children: ReactNode;
  /** Compact variant for inline rows / cards. */
  compact?: boolean;
  /** Unused — kept for call-site compatibility. */
  label?: string;
}

export function CreditGate({
  moduleKey,
  category,
  children,
  compact = false,
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

  const open = isUnlocked(moduleKey);

  // Authenticated + window open → render the real content.
  if (open) {
    return (
      <div className="relative">
        {/* Tiny countdown badge — unobtrusive bottom-right corner */}
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
      data-gate-title="Upgrade your plan to access this content"
      className="relative overflow-hidden rounded-2xl border border-border/70"
    >
      {/* Blurred, inert content layer */}
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none blur-sm opacity-40 ${
          compact ? "min-h-[8rem]" : "min-h-[16rem]"
        } flex items-center justify-center bg-muted/40`}
      >
        <span
          className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60"
          aria-hidden="true"
        >
          Restricted
        </span>
      </div>

      {/* Upgrade overlay */}
      <div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-[2px]">
        <div className="sticky top-20 flex justify-center px-4 py-6">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-border/70 bg-card p-5 text-center shadow-2xl">

            {/* Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>

            {/* Heading + description */}
            <div className="space-y-1">
              <p className="text-sm font-extrabold tracking-tight text-foreground">
                Upgrade to access this content
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This content is available on a higher plan.
              </p>
            </div>

            {/* CTA — silently fires the spark unlock */}
            <button
              type="button"
              onClick={onUnlock}
              disabled={working}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              {working ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {working ? "Opening…" : "Upgrade your plan"}
            </button>

            <a
              href="/plans"
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              View all plans
            </a>

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
