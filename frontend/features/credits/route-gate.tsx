"use client";

/**
 * RouteCreditGate — one integration point that puts the whole feature surface
 * behind the coin matrix.
 *
 * Mounted once in the (app) layout around `{children}`. For every route the
 * category resolver maps to a paid category it:
 *   - guests   → blurred layer, any click raises the AdminApprovalModal notice,
 *   - members  → unlock overlay showing the category's coin cost,
 *   - unlocked → children render normally with a live 2-hour countdown badge,
 *   - expiry   → children unmount, blur returns, overlay reappears — no reload.
 *
 * Public routes (home baseline, AI chat, auth, credits wallet) and privileged
 * control surfaces resolve to null and pass straight through untouched.
 */

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Lock, Coins, Loader2, Timer, ShieldCheck } from "lucide-react";
import {
  TOKEN_MATRIX,
  categoryForPath,
  type ContentCategory,
} from "./constants";
import { useCredit } from "./credit-provider";

export function RouteCreditGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const {
    isAuthenticated,
    isUnlocked,
    remainingClock,
    openModule,
    requestAccess,
    noticeTitle,
    error,
  } = useCredit();

  const [working, setWorking] = useState(false);
  const category = categoryForPath(pathname ?? "/");
  const moduleKey = `route:${pathname ?? "/"}`;

  // Public / exempt route → render untouched (home baseline integrity).
  if (category === null) return <>{children}</>;

  const open = isUnlocked(moduleKey);

  // Unlocked window → render content + live countdown badge.
  if (open) {
    return (
      <div className="relative">
        <div className="pointer-events-none fixed bottom-4 left-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-500 backdrop-blur-sm shadow-lg">
          <Timer className="h-3.5 w-3.5" />
          {remainingClock(moduleKey)}
          <span className="font-medium text-emerald-500/80">until re-lock</span>
        </div>
        {children}
      </div>
    );
  }

  const rule = TOKEN_MATRIX[category];

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
        {children}
      </div>

      {/* Unlock overlay — sticky card stays in the viewport on any page length.
          (Absolute-center would bury the button mid-document on tall pages.) */}
      <div className="absolute inset-0 z-30 bg-background/70 backdrop-blur-[3px]">
        <div className="sticky top-20 flex justify-center px-4 py-8">
          <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-border/70 bg-card p-6 text-center shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>

            <div>
              <p className="text-base font-extrabold tracking-tight text-foreground">
                {rule.emoji} {rule.label}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                This section is part of the coin-gated library. Unlock it for 2
                hours — it auto-locks again when the window ends.
              </p>
            </div>

            <button
              type="button"
              onClick={onUnlock}
              disabled={working}
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
            >
              {working ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Coins className="h-4 w-4" />
              )}
              {working
                ? "Unlocking…"
                : isAuthenticated
                  ? `Unlock — ${rule.cost} coins`
                  : "Sign in to unlock"}
            </button>

            {!isAuthenticated && (
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Login works after administrative approval only
              </p>
            )}

            <p className="text-[11px] font-medium text-muted-foreground">
              Open for 2 hours, then auto-locks
            </p>

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

  // First paint: render children (public routes must not flash a lock).
  // The gate takes over immediately after hydration.
  if (!mounted) return <>{children}</>;
  return <RouteCreditGate>{children}</RouteCreditGate>;
}
