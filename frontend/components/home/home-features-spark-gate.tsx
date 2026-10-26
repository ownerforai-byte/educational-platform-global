"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { CreditGate } from "@/features/credits";
import { aiSparkTierFor } from "@/lib/ai/ai-spark-tiers";

/**
 * Home features under the Spark gate (owner decision): the owner and Pro
 * members see the home features directly; every other visitor sees the same
 * Spark access gate the rest of the library uses, so the features are only
 * available through the spark/coin flow.
 *
 * While the session is still loading we render nothing, so an owner or Pro
 * member never sees an access-state flash on first paint.
 */
export function HomeFeaturesSparkGate({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSession();
  if (isLoading) return null;

  const tier = aiSparkTierFor(user ?? null);
  if (tier === "owner" || tier === "pro") return <>{children}</>;

  return (
    <CreditGate
      moduleKey="home:features"
      category="reference"
      label="Home features — Owner & Pro members"
    >
      {children}
    </CreditGate>
  );
}
