import { aiSparkTierFor, type AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

/**
 * ACCESS LEVELS — the single source of truth for "who can see what".
 *
 * Owner request (2026-10-17): "assign the roles visitor, plus, pro member and
 * owner everywhere … different interfaces … add features according to access
 * level." The platform already had five AI-spark tiers; this module turns those
 * tiers into the platform's ACCESS LADDER and gives every surface one helper to
 * ask "may this viewer reach this?".
 *
 * Ladder (low → high), matching the owner's wording and the clarification that
 * "member" stays its own rung:
 *
 *   visitor  → signed-out guest. Public overview, simple footer (version +
 *              intro + hidden /plans link), live approval-status check.
 *   member   → signed-in base. Indexes bar locked to SEARCH ONLY.
 *   plus     → 2–3 indexes (Home + Class 11 + Search).
 *   pro      → ALL indexes (Home, Class 11, Class 12, … AI). No rails, no
 *              owner features. Unlocks the home features + CEE spark gates.
 *   owner    → everything: all indexes, owner rails, owner console, unlimited
 *              Veer sparks.
 *
 * "for plus no indexes (only search) … for pro all indexes" is expressed as a
 * per-index `minLevel` in lib/navigation.ts, filtered by the sidebar + drawer.
 * This module only resolves a viewer's rung and compares it — it renders
 * nothing, so tests can import it without a DOM.
 */

export type AccessLevel = "visitor" | "member" | "plus" | "pro" | "owner";

export const ACCESS_LEVELS: readonly AccessLevel[] = [
  "visitor",
  "member",
  "plus",
  "pro",
  "owner",
] as const;

/** Numeric rung — a viewer may reach anything at or below their rank. */
export const ACCESS_RANK: Record<AccessLevel, number> = {
  visitor: 0,
  member: 1,
  plus: 2,
  pro: 3,
  owner: 4,
};

/** Human tier name for badges, the profile card, and the public overview. */
export const ACCESS_LABELS: Record<AccessLevel, string> = {
  visitor: "Visitor",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};

/** The same rung in plain words, shown on the public overview + /plans. */
export const ACCESS_TAGLINES: Record<AccessLevel, string> = {
  visitor: "A simple overview for visitors",
  member: "Search the whole library",
  plus: "Home, Class 11 and Search",
  pro: "Every index, no daily cap",
  owner: "Everything, plus the rails and console",
};

/**
 * Resolve the viewer's access rung. This mirrors aiSparkTierFor exactly (same
 * owner-allowlist-first rule) but reports the signed-out state as "visitor"
 * instead of "guest", so UI copy reads naturally.
 */
export function accessLevelFor(
  user: AiSparkUserLike | null | undefined,
): AccessLevel {
  const tier = aiSparkTierFor(user);
  return tier === "guest" ? "visitor" : (tier as AccessLevel);
}

/** Whether this viewer reaches at least `min` (visitor = 0, owner = 4). */
export function hasLevel(
  user: AiSparkUserLike | null | undefined,
  min: AccessLevel,
): boolean {
  return ACCESS_RANK[accessLevelFor(user)] >= ACCESS_RANK[min];
}
