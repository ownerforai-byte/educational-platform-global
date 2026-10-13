import { isOwnerEmail } from "../middleware/auth";

/**
 * AI SPARK — the daily Veer (AI chat) message allowance per membership tier.
 *
 * Owner policy 2026-10-13: "restrict the ai spark to 1 for public, 7 for
 * member and unlimited for owner" plus "create for plus and pro member also
 * like 25 and 50". The tier table:
 *
 *   guest (public, signed out) → 1 message / UTC day  (guest pool, guestQuota)
 *   member                     → 7 messages / UTC day
 *   plus                       → 25 messages / UTC day
 *   pro                        → 50 messages / UTC day
 *   owner (allowlist emails)   → unlimited (never counted, never blocked)
 *
 * The counter is the SAME day-keyed CAS machinery as the guest pool
 * (guest_chat_usage — see guestQuota.ts `consumeUserSlot`), so refreshes,
 * reloads, restarts or deploys can never refill a pool: only UTC midnight
 * does. This supersedes the earlier "AI chat is free and uncounted" note in
 * api/ai.ts — chat is still free of CONTENT sparks, but it is now metered by
 * AI sparks per this table.
 *
 * The frontend mirrors these numbers for the badge/profile meter
 * (frontend/lib/ai/ai-spark-tiers.ts) — keep both tables equal.
 */

export type AiSparkTier = "guest" | "member" | "plus" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 1,
  member: 7,
  plus: 25,
  pro: 50,
  owner: Number.POSITIVE_INFINITY,
};

/** What the API reports to clients: `limit: null` means unlimited. */
export function aiSparkLimitFor(tier: AiSparkTier): number | null {
  return Number.isFinite(AI_SPARK_LIMITS[tier]) ? AI_SPARK_LIMITS[tier] : null;
}

/** Minimal user shape needed to resolve a tier. */
export interface AiSparkUser {
  email?: string | null;
  role?: string | null;
  /** profiles.plan — "member" | "plus" | "pro" (migration 008). */
  plan?: string | null;
  /** Legacy PRO flag; treated as the pro tier when plan is absent. */
  premiumStatus?: boolean | null;
}

/**
 * Resolve the tier for one request.
 *
 * Order matters: the hardcoded owner allowlist always wins (an owner is
 * unlimited whatever plan row they carry), then the plan tier, then plain
 * membership. A signed-out caller is a guest.
 */
export function aiSparkTierFor(user: AiSparkUser | null | undefined): AiSparkTier {
  if (!user) return "guest";
  if (isOwnerEmail(user.email)) return "owner";
  const plan = (user.plan ?? "").toLowerCase();
  if (plan === "pro" || user.premiumStatus === true) return "pro";
  if (plan === "plus") return "plus";
  return "member";
}

/**
 * Does this tier draw from the daily counter at all? Owners are never
 * counted — no DB read, no increment, no rollback path.
 */
export function aiSparkIsMetered(tier: AiSparkTier): boolean {
  return tier !== "owner";
}
