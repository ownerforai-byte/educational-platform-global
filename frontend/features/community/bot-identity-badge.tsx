"use client";

import { PlatformBadge } from "@/features/badges/platform-badge";

/**
 * Platform community bot — separate from the human owner (Sahrocky81).
 *
 * The badge visuals come from the shared PlatformBadge registry, but this
 * wrapper keeps the identity's accessible name and tooltip ("Community bot
 * verified" / "Community bot — verified platform assistant") that the board
 * tests pin — the verified marking is a trust signal, not decoration.
 */
export function BotIdentityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      title="Community bot — verified platform assistant"
      aria-label="Community bot verified"
    >
      <PlatformBadge badgeId="community-bot" flashTier={5} compact={compact} />
    </span>
  );
}
