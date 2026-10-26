"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Coins, Sparkles, UserRound } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { GUEST_DAILY_LIMIT, readGuestCount } from "@/lib/ai/guest-quota";
import {
  AI_SPARK_LIMITS,
  AI_SPARK_TIER_LABELS,
  aiSparkTierFor,
} from "@/lib/ai/ai-spark-tiers";
import { getAiSparkUsage } from "@/lib/api/ai";
import { DUAL_SPARK_SUMMARY } from "@/lib/spark-metering";

/**
 * Live plan strip for AI Studio pages — shows the AI spark meter only.
 * Content sparks live on /credits and the header wallet; they never bill chat.
 */
export function AiPlanStrip() {
  const { user, isLoading } = useSession();
  const [aiUsed, setAiUsed] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    getAiSparkUsage()
      .then((s) => setAiUsed(s.used))
      .catch(() => setAiUsed(null));
  }, [user?.email]);

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
      <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
        <span className="inline-flex flex-wrap items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          <span className="font-semibold text-foreground">AI spark trial</span>
          <span className="text-muted-foreground">
            {left > 0
              ? `${left} AI spark${left === 1 ? "" : "s"} left today · resets at midnight UTC`
              : "Today's AI sparks used · sign in for a higher daily allowance"}
          </span>
        </span>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{DUAL_SPARK_SUMMARY}</p>
        <Link
          href="/login"
          className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <UserRound className="h-3.5 w-3.5" />
          Sign in to keep chatting
        </Link>
      </div>
    );
  }

  const tier = aiSparkTierFor(user);
  const limit = AI_SPARK_LIMITS[tier];
  const metered = Number.isFinite(limit);
  const used = aiUsed ?? 0;
  const remaining = metered ? Math.max(0, limit - used) : null;
  const contentSparks = user.credits ?? 0;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex flex-wrap items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          <span className="font-semibold text-foreground">
            AI spark ({AI_SPARK_TIER_LABELS[tier]})
          </span>
          <span className="text-muted-foreground">
            {metered
              ? `${remaining} of ${limit} Veer messages left today · resets at midnight UTC`
              : "Unlimited AI sparks on the owner plan"}
          </span>
        </span>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Coins className="h-3.5 w-3.5 text-amber-500" />
          {contentSparks} content sparks
        </Link>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{DUAL_SPARK_SUMMARY}</p>
    </div>
  );
}
