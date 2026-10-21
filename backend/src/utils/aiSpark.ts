import { isOwnerEmail } from "../middleware/auth";

/**
 * AI SPARK — the daily Veer (AI chat) message allowance per membership tier.
 *
 * Owner policy 2026-10-13: "restrict the ai spark to 1 for public, 7 for
 * member and unlimited for owner" plus "create for plus and pro member also
 * like 25 and 50". Plus a 2026-10-18 add: "make the plan 30$ for 20 days" —
 * a temporary pass with the same daily spark as plus, auto-expiring 20 days
 * after activation. The tier table:
 *
 *   guest (public, signed out) → 3 messages / UTC day (guest pool, guestQuota)
 *   member                     → 7 messages / UTC day
 *   plus                       → 25 messages / UTC day
 *   plus_20 ($30 / 20 days)    → 25 messages / UTC day, expires after 20 days
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

export type AiSparkTier = "guest" | "member" | "plus" | "plus_20" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 3,
  member: 7,
  plus: 25,
  plus_20: 25,
  pro: 50,
  owner: Number.POSITIVE_INFINITY,
};

/** USD price of the temporary pass — owner 2026-10-18 "the plan 30$ for 20 days". */
export const PLUS_20_PRICE_USD = 30;
/** Lifetime of the temporary pass in days (also enforced at the profile row). */
export const PLUS_20_DURATION_DAYS = 20;

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
export function aiSparkTierFor(
  user:
    | (AiSparkUser & { planExpiresAt?: string | Date | null })
    | null
    | undefined = null,
): AiSparkTier {
  if (!user) return "guest";
  if (isOwnerEmail(user.email)) return "owner";
  const plan = (user.plan ?? "").toLowerCase();

  // plus_20 is a temporary pass: when the expiry timestamp is in the past,
  // it falls back to plain member. The 20-day lifetime is enforced here
  // and again at activation time in api/owner.ts (see AI_SPARK_PLUS_20).
  if (plan === "plus_20") {
    const expires = user.planExpiresAt
      ? new Date(user.planExpiresAt).getTime()
      : 0;
    if (Number.isFinite(expires) && expires > Date.now()) return "plus_20";
    return "member";
  }

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
