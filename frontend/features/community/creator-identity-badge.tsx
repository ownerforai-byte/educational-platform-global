"use client";

import { PlatformBadge } from "@/features/badges/platform-badge";

/** Platform creator (owner account) — distinct from Community bot and plan chips. */
export function CreatorIdentityBadge({ compact = false }: { compact?: boolean }) {
  return <PlatformBadge badgeId="creator" flashTier={5} compact={compact} />;
}