import { supabaseAdmin } from "../db/supabase";
import { hasFullAccess } from "../middleware/auth";

/**
 * Daily credit pool (owner policy 2026-09-26).
 *
 *  - Every AI chat message costs 1 credit.
 *  - Every logged user gets a DAILY_POOL of 8 platform credits.
 *  - Credits reset to DAILY_POOL at 12:00 AM (UTC day rollover) — enforced
 *    lazily here (first AI call after midnight resets) and eagerly by the
 *    midnight cron job in jobs/creditsResetJob.ts.
 *  - Owner/admin accounts keep their effectively-unlimited manual balance.
 *
 * The watermark lives in profiles.credits_reset_date (see
 * db/migrations/003_daily_credits_reset.sql): it stores the UTC date the
 * current balance belongs to. A stale date = a new day = reset.
 */

/** Daily platform-credit pool for logged users. */
export const DAILY_CREDIT_POOL = Number(process.env.DAILY_CREDIT_POOL) || 8;

/** Cost of one AI chat message, in credits. */
export const AI_MESSAGE_COST = 1;

/** UTC calendar date (YYYY-MM-DD) for "now". */
export function todayUtc(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

interface ResetResult {
  credits: number;
  resetDone: boolean;
  unlimited: boolean;
}

/**
 * Ensure the user's balance reflects TODAY's daily pool.
 *
 * Called before any credit spend (and by /api/user/me + /api/auth/me so the
 * UI shows the refreshed pool right after midnight). When the watermark is
 * older than today's UTC date, the balance is topped up to DAILY_CREDIT_POOL
 * — top-up (max), never overwrite, so an owner-granted larger balance
 * survives the reset and only users who dipped into their pool refill.
 *
 * Privileged roles (OWNER/ADMIN/premium) skip the reset entirely.
 */
export async function ensureDailyCredits(
  userId: string,
  email?: string | null,
  role?: string | null,
  premiumStatus?: boolean | null,
  now: Date = new Date(),
): Promise<ResetResult> {
  const privileged = hasFullAccess((role ?? "").toUpperCase() || null, !!premiumStatus);
  const today = todayUtc(now);

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("credits, credits_reset_date, premium_status, role")
    .eq("id", userId)
    .maybeSingle();

  const isPrivileged =
    privileged ||
    hasFullAccess(
      ((profile?.role as string | undefined) ?? "").toUpperCase() || null,
      profile?.premium_status ?? !!premiumStatus,
    );

  if (isPrivileged) {
    return { credits: Infinity, resetDone: false, unlimited: true };
  }

  const currentCredits = profile?.credits ?? 0;
  const watermark = (profile?.credits_reset_date as string | undefined) ?? null;

  if (watermark === today) {
    return { credits: currentCredits, resetDone: false, unlimited: false };
  }

  // New day (or first-ever watermark): refill to the daily pool. `max`
  // protects balances larger than the pool (owner grants, plan bonuses).
  const resetTo = Math.max(currentCredits, DAILY_CREDIT_POOL);

  // `.select()` makes the write VERIFIABLE: PostgREST returns 200 with an
  // empty array when RLS (or a wrong id) matches no row, so a missing row
  // must be treated as a failure — never logged as a success (the 2026-09-26
  // "daily reset 0 -> 8" log that never persisted).
  const { data: updatedRows, error } = await supabaseAdmin
    .from("profiles")
    .update({ credits: resetTo, credits_reset_date: today })
    .eq("id", userId)
    .select("id");

  if (error || !updatedRows || updatedRows.length === 0) {
    console.error(
      "[credits] daily reset FAILED for",
      userId,
      error?.message ?? "0 rows updated (RLS blocked the write or profile missing)",
    );
    // Fail conservative: report the pre-reset balance so spend checks still
    // behave on stale data rather than granting a free day.
    return { credits: currentCredits, resetDone: false, unlimited: false };
  }

  const { error: txError } = await supabaseAdmin.from("credit_transactions").insert({
    user_id: userId,
    amount: resetTo - currentCredits,
    type: "GRANT",
    reason: "Daily platform credit pool refill",
  });
  if (txError) {
    console.error("[credits] grant transaction log failed for", userId, txError.message);
  }

  console.info(`[credits] daily reset ${userId}: ${currentCredits} -> ${resetTo} (${today})`);
  return { credits: resetTo, resetDone: true, unlimited: false };
}

/**
 * Spend `cost` credits for `userId` atomically — guarded by a WHERE clause so
 * two parallel requests can never both spend the same last credit.
 * Returns the remaining balance, or null when funds were insufficient.
 */
export async function spendCredits(
  userId: string,
  cost: number,
  reason: string,
): Promise<number | null> {
  // Read current balance first (the caller has just run ensureDailyCredits,
  // so this reflects today's pool).
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .maybeSingle();

  const current = profile?.credits ?? 0;
  if (current < cost) return null;

  // Conditional update: only succeeds if the balance is still >= cost.
  const { data: updated, error } = await supabaseAdmin
    .from("profiles")
    .update({ credits: current - cost })
    .eq("id", userId)
    .gte("credits", cost)
    .select("credits")
    .maybeSingle();

  if (error) {
    console.error("[credits] spend failed for", userId, error.message);
    return null;
  }
  if (!updated) {
    // Balance said >= cost just above, yet no row came back → the write was
    // blocked (RLS) or the row vanished. Loud log: this is indistinguishable
    // from "insufficient funds" at the call site otherwise.
    console.error(
      "[credits] spend update matched NO row for",
      userId,
      `(had ${current}, needed ${cost}) — possible RLS block`,
    );
    return null;
  }

  await supabaseAdmin.from("credit_transactions").insert({
    user_id: userId,
    amount: -cost,
    type: "SPEND",
    reason,
  });

  return updated.credits as number;
}
