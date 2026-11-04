"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";

/**
 * CEE bank, block characteristics, and the other study layers on the periodic
 * table. The 118-element grid itself stays open to members. These layers
 * open at Plus.
 *
 * Locked state shows "Upgrade your plan" — no spark mechanics are exposed.
 */
export function CeeSparkGate({
  children,
  compact = false,
}: {
  children: ReactNode;
  /** Compact variant for the inline CEE fact cards inside hover/block panels. */
  compact?: boolean;
}) {
  const { user, isLoading } = useSession();
  if (isLoading) return null;
  if (hasLevel(user, "plus")) return <>{children}</>;

  return (
    <div
      aria-disabled="true"
      className={`cursor-not-allowed rounded-xl border border-border/60 bg-muted/40 text-muted-foreground/70 opacity-70 ${
        compact ? "px-2 py-1 text-[10px]" : "px-4 py-3 text-xs"
      }`}
    >
      <span className="font-semibold">Upgrade your plan</span>
      {!compact && (
        <span className="ml-1">to access CEE questions and study layers.</span>
      )}
    </div>
  );
}
