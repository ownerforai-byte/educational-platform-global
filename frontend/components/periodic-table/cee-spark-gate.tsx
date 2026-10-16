"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { CreditGate } from "@/features/credits";
import { aiSparkTierFor } from "@/lib/ai/ai-spark-tiers";

/**
 * Periodic table CEE content under the Spark gate (owner request 2026-10-16:
 * "lock the periodic table cee under the gate also").
 *
 * The CEE question bank — past MCQs & traps, CEE speed formulas, high-yield
 * summaries and the CEE high-frequency facts — follows the same tier rule the
 * home features use: owner and Pro members read it directly, every other
 * visitor meets the Spark lock (members unlock it for coins, guests get the
 * sign-in notice). One unlock window keyed by the route (`/periodic-table`)
 * opens ALL CEE surfaces of the table at once — the same key the Spark
 * library directory unlocks, so one payment never double-bills.
 *
 * While the session is still loading we render nothing, so an owner or Pro
 * member never sees the lock flash on first paint.
 */
export function CeeSparkGate({
  children,
  compact = false,
}: {
  children: ReactNode;
  /** Compact variant for the inline CEE fact cards inside hover/ block panels. */
  compact?: boolean;
}) {
  const { user, isLoading } = useSession();
  if (isLoading) return null;

  const tier = aiSparkTierFor(user ?? null);
  if (tier === "owner" || tier === "pro") return <>{children}</>;

  return (
    <CreditGate
      moduleKey="/periodic-table"
      category="reference"
      label="Periodic Table CEE Question Bank — Owner & Pro members"
      compact={compact}
    >
      {children}
    </CreditGate>
  );
}
