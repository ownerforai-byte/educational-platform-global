"use client";

import { PlatformBadge } from "@/features/badges/platform-badge";

/** Platform community bot — separate from the human owner (Sahrocky81). */
export function BotIdentityBadge({ compact = false }: { compact?: boolean }) {
  return <PlatformBadge badgeId="community-bot" flashTier={5} compact={compact} />;
}