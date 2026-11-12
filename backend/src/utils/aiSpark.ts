import { isOwnerEmail } from "../middleware/auth";

/**
 * AI SPARK — the daily Veer (AI chat) message allowance per access rung.
 *
 * Owner request 2026-11-07: one clean ladder, one number per rung. The
 * retired visitor name is guest and the phantom plus_20 pass is gone (legacy
 * plus_20 rows resolve to Plus). Member's allowance was previously
 * inconsistent across surfaces (3 in copy, 15 in tables); it is 13 everywhere
 * now. The tier table:
 *
 *   guest  (signed out)        → no Veer access (home guide widget only)
 *   member (signed-in base)    → 13 messages / UTC day
 *   plus   (granted plan/role) → 25 messages / UTC day
 *   pro    (granted plan/role) → 50 messages / UTC day
 *   owner  (allowlist/role)    → unlimited (never counted, never blocked)
 *
 * The counter is the SAME day-keyed CAS machinery as the guest pool
 * (guest_chat_usage — see guestQuota.ts `consumeUserSlot`), so refreshes,
 * reloads, restarts or deploys can never refill a pool: only UTC midnight
 * does. Chat is free of CONTENT sparks but metered by AI sparks per this
 * table.
 *
 * The frontend mirrors these numbers for the badge/profile meter
 * (frontend/lib/ai/ai-spark-tiers.ts) — keep both tables equal.
 */

export type AiSparkTier = "guest" | "member" | "plus" | "pro" | "owner";

/** Daily Veer message allowance per tier (owner = unlimited). */
export const AI_SPARK_LIMITS: Record<AiSparkTier, number> = {
  guest: 0,
  member: 13,
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
  /** profiles.plan — legacy values (member, plus_20) read at their mapped rung. */
  plan?: string | null;
  /** Legacy PRO flag; treated as the pro tier. */
  premiumStatus?: boolean | null;
}

/**
 * Resolve the tier for one request — the ONE resolver the spark allowance
 * and the section gates share. Order: root owner email or live role:"owner"
 * grant, then pro, then plus, then Member. Signed-out is guest.
 */
export function aiSparkTierFor(
  user: AiSparkUser | null | undefined = null,
): AiSparkTier {
  if (!user) return "guest";
  if (isOwnerEmail(user.email)) return "owner";
  const role = (user.role ?? "").toLowerCase();
  if (role === "owner") return "owner";
  const plan = (user.plan ?? "").toLowerCase();
  if (role === "pro" || plan === "pro" || user.premiumStatus === true) return "pro";
  if (role === "plus" || plan === "plus" || plan === "plus_20") return "plus";
  return "member";
}

/**
 * Does this tier draw from the daily counter at all? Owners are never
 * counted — no DB read, no increment, no rollback path.
 */
export function aiSparkIsMetered(tier: AiSparkTier): boolean {
  return tier !== "owner";
}
