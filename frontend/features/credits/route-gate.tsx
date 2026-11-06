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
import { Timer } from "lucide-react";
import {
  TOKEN_MATRIX,
  categoryForPath,
  creditModuleKey,
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
    isUnlocked,
    remainingClock,
  } = useCredit();
  // Live owner gate: OFF → the WHOLE coin-gated library is free for owner
  // emails (the toggle no longer stops at AI chat).
  const coinGateEnabled = useCoinGateEnabled();

  const [held, setHeld] = useState(false);
  const overrides = useSectionTierOverrides();
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div
        className="cursor-not-allowed rounded-2xl border border-border/60 bg-muted/40 p-8 text-center opacity-60 grayscale"
        aria-disabled="true"
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-muted-foreground">
          Unavailable on this plan
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
          This section requires a higher plan
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Notes, PYQs, formula sheets and labs open on the Plus plan and above.
        </p>
        {/* Plans live in the footer only — no plans link here. */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/home"
            className="inline-flex items-center rounded-2xl border border-border/70 px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:border-muted-foreground"
          >
            Go to my home
          </a>
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
