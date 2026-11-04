"use client";

/**
 * RouteCreditGate — one integration point that puts the whole feature surface
 * behind the coin matrix.
 *
 * COIN-GATE SCOPE (owner request 2026-10-04: make the owner's coin-gate
 * toggle "applicable for whole coin gate library", not only AI chat): when
 * the global `coin_gate_enabled` setting is OFF, every OWNER email passes
 * this gate for free — no disabled screen, coin ask, or countdown. Students and
 * guests always unlock for coins (the toggle has never freed them), and an
 * owner with the toggle ON is billed like any student.
 *
 * Mounted once in the (app) layout around `{children}`. For every route the
 * category resolver maps to a paid category it:
 *   - guests   → blurred layer, any click raises the AdminApprovalModal notice,
 *   - members  → unlock overlay showing the category's coin cost,
 *   - unlocked → children render normally with a live 20-minute countdown badge,
 *   - expiry   → children unmount, blur returns, unavailable overlay reappears — no reload.
 *
 * Public routes (home baseline, AI chat, auth, credits wallet) and privileged
 * control surfaces resolve to null and pass straight through untouched.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Loader2, Timer, ArrowRight, Sparkles } from "lucide-react";
import {
  TOKEN_MATRIX,
  categoryForPath,
  creditModuleKey,
  withholdsLockedContent,
  type ContentCategory,
} from "./constants";
import { AttemptHoldContext } from "./attempt-hold";
import { useCredit } from "./credit-provider";
import { useCoinGateEnabled } from "./use-coin-gate";
import { isOwnerEmail } from "@/lib/owner";
import { isSectionUnlocked, sectionForPath } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";

export function RouteCreditGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const {
    user,
    isAuthenticated,
    isUnlocked,
    remainingClock,
    openModule,
    requestAccess,
    noticeTitle,
    error,
  } = useCredit();
  // Live owner gate: OFF → the WHOLE coin-gated library is free for owner
  // emails (the toggle no longer stops at AI chat).
  const coinGateEnabled = useCoinGateEnabled();

  const [working, setWorking] = useState(false);
  const overrides = useSectionTierOverrides();
  // An in-progress attempt (mock paper) keeps the view mounted past expiry.
  const [held, setHeld] = useState(false);
  const setHold = useCallback((next: boolean) => setHeld(next), []);
  const windowOpen = isUnlocked(creditModuleKey(pathname ?? "/"));
  const holdValue = useMemo(() => ({ windowOpen, setHold }), [windowOpen, setHold]);
  const category = categoryForPath(pathname ?? "/");
  // PDF document tabs (/pdfs/read) share the PDF Library's unlock window.
  const moduleKey = creditModuleKey(pathname ?? "/");

  // Owner + gate OFF → pass straight through: no disabled state or countdown badge.
  const libraryFree =
    coinGateEnabled === false && !!user && isOwnerEmail(user.email);

  // Public / exempt route OR free owner pass → render untouched (home
  // baseline integrity).
  if (category === null || libraryFree) return <>{children}</>;

  const rule = TOKEN_MATRIX[category];
  const open = isUnlocked(moduleKey);

  // TIER FIRST: this gate wraps SectionTierGate, so without this check a
  // signed-in viewer below the section's rung could spend a spark and then
  // only see the unavailable card. A denied section passes straight through
  // (SectionTierGate renders the unavailable card): no unlock offered, no
  // spark spent. The unlock endpoint enforces the same rule server-side.
  const section = sectionForPath(pathname ?? "/", overrides);
  const tierDenied = !!user && !!section && !isSectionUnlocked(user, section);
  if (tierDenied) return <>{children}</>;

  // FREE categories (cost 0) render straight through — no disabled state or ask.
  if (rule.cost === 0 && category !== "imagehub") return <>{children}</>;

  // Unlocked window (or a held attempt that outlived it) → render content.
  if (open || held) {
    return (
      <AttemptHoldContext.Provider value={holdValue}>
        <div className="relative">
          <div className="pointer-events-none fixed bottom-safe left-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-500 backdrop-blur-sm shadow-lg">
            <Timer className="h-3.5 w-3.5" />
            {open ? (
              <>
                {remainingClock(moduleKey)}
                <span className="font-medium text-emerald-500/80">until re-lock</span>
              </>
            ) : (
              <span>Window ended: finish your attempt</span>
            )}
          </div>
          {children}
        </div>
      </AttemptHoldContext.Provider>
    );
  }

  const onUnlock = async () => {
    if (working) return;
    setWorking(true);
    try {
      // Unauthenticated → notice modal (interceptor path).
      if (!isAuthenticated) {
        requestAccess();
        return;
      }
      await openModule(moduleKey, category as ContentCategory);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="relative min-h-[60vh]">
      {/* Blurred, inert content layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none blur-[6px] opacity-30"
      >
        {withholdsLockedContent(pathname ?? "/") ? null : children}
      </div>

      {/* Upgrade prompt — replaces the old "Spark library / Unlock — N sparks"
          overlay. The unlock API call still fires silently in the background
          (onUnlock is called on button click); the user only sees the plan
          upgrade message, never the spark mechanics. */}
      <div className="absolute inset-0 z-30 bg-background/70 backdrop-blur-[3px]">
        <div className="sticky top-20 flex justify-center px-4 py-8">
          <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card p-6 text-center shadow-2xl">

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>

            {/* Heading + description */}
            <div className="space-y-1.5">
              <p className="text-lg font-extrabold tracking-tight text-foreground">
                Upgrade to access this content
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This content is available on a higher plan.
                Upgrade to access notes, PYQs, formula sheets and more.
              </p>
            </div>

            {/* Primary CTA — triggers the silent unlock in the background */}
            <button
              type="button"
              onClick={onUnlock}
              disabled={working}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              {working ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {working ? "Opening…" : "Upgrade your plan"}
            </button>

            {/* View plans link */}
            <a
              href="/plans"
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              View all plans
            </a>

            {/* Silent error (only show on hard failures like 402 / 500) */}
            {error && (
              <p className="max-w-sm rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Small helper so the layout can stay a server component boundary — this
 * client wrapper is the only thing that needs the pathname.
 */
export function RouteCreditGateBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // First paint: render children (public routes must not flash an access state).
  // The gate takes over immediately after hydration.
  if (!mounted) return <>{children}</>;
  return <RouteCreditGate>{children}</RouteCreditGate>;
}
