"use client";

import { PlatformBadge, type DisplayBadge } from "./platform-badge";
import { cn } from "@/lib/utils";

export function PlatformBadgesRow({
  badges,
  compact = false,
  className,
}: {
  badges: DisplayBadge[];
  compact?: boolean;
  className?: string;
}) {
  if (badges.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {badges.map((badge) => (
        <PlatformBadge
          key={badge.id}
          badgeId={badge.id}
          flashTier={badge.flashTier}
          compact={compact}
        />
      ))}
    </div>
  );
}