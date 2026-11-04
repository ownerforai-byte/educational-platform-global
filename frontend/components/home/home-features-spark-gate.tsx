"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { aiSparkTierFor } from "@/lib/ai/ai-spark-tiers";
import { ACCESS_LABELS } from "@/lib/access-level";

/**
 * Home features gate — Pro and Owner see the content directly.
 * Lower tiers get the same muted disabled card used everywhere else:
 * greyed out, cursor-not-allowed, no glowing button, no plans link.
 */
export function HomeFeaturesSparkGate({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSession();
  if (isLoading) return null;

  const tier = aiSparkTierFor(user ?? null);
  if (tier === "owner" || tier === "pro") return <>{children}</>;

  return (
    <div
      aria-disabled="true"
      className="cursor-not-allowed rounded-2xl border border-border/60 bg-muted/40 p-6 text-center opacity-60 grayscale"
    >
      <p className="text-sm font-extrabold tracking-tight text-muted-foreground">
        Home features
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
        Available to {ACCESS_LABELS["pro"]} and above
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Subject rails, study tools and the full home dashboard open on the Pro plan.
      </p>
    </div>
  );
}
