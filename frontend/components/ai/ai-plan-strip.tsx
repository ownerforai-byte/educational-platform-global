"use client";

import Link from "next/link";
import { Coins, Crown, Sparkles, UserRound } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { GUEST_DAILY_LIMIT, readGuestCount } from "@/lib/ai/guest-quota";

/**
 * Live plan + credit strip for the AI pages.
 *
 * Shows what this account can actually spend today — the 1-message free
 * trial for guests, daily credits for signed-in students, or the PRO badge —
 * and links to /credits for the full wallet. Guest usage is mirrored from
 * the shared day-keyed store, so it resets at midnight like the server pool.
 */
export function AiPlanStrip() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Checking your plan…
      </div>
    );
  }

  if (!user) {
    const used = readGuestCount();
    const left = Math.max(0, GUEST_DAILY_LIMIT - used);
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          <span className="font-semibold text-foreground">Free trial</span>
          <span className="text-muted-foreground">
            {left > 0
              ? `${left} free message left today · resets at midnight`
              : "Free trial used · sign in to continue"}
          </span>
        </span>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <UserRound className="h-3.5 w-3.5" />
          Sign in for daily credits
        </Link>
      </div>
    );
  }

  const premium = !!user.premiumStatus;
  const credits = user.credits ?? 0;
  const limit = user.creditsLimit;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
      <span className="inline-flex flex-wrap items-center gap-2 text-xs">
        {premium ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-bold text-amber-500">
            <Crown className="h-3.5 w-3.5" />
            PRO — full tutor access
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2 py-0.5 font-bold text-foreground">
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            {credits}
            {limit !== undefined && ` / ${limit}`} credits
          </span>
        )}
        <span className="text-muted-foreground">
          {premium
            ? "No daily cap on replies."
            : "Daily credits refill at midnight — one reply costs one credit."}
        </span>
      </span>
      <Link
        href="/credits"
        className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
      >
        <Coins className="h-3.5 w-3.5 text-amber-500" />
        Plan &amp; credits
      </Link>
    </div>
  );
}
