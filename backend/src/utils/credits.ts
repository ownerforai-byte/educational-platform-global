import { supabaseAdmin } from "../db/supabase";

/**
 * Daily credit pool (owner policy 2026-09-26, corrected 2026-10-04).
 *
 *  - Every AI chat message costs 1 credit — for EVERY signed-in user.
 *  - Every signed-in user gets a DAILY_POOL of 4 platform credits.
 *  - Students/customers are ALWAYS billed (they must purchase/earn coins).
 *  - Owner-allowlist emails follow the profile toggle:
 *      gate ON  → owners are billed like everyone else;
 *      gate OFF → owners chat free (no deduction, no lock).
 *  - Credits reset to DAILY_POOL at 12:00 AM (UTC day rollover) — enforced
 *    lazily here (first AI call after midnight resets) and eagerly by the
 *    midnight cron job in jobs/creditsResetJob.ts.
 *  - PRO accounts (premium_status) stay unlimited and are never billed.
 *  - A credit is REFUNDED whenever the answer the student paid for never
 *    arrives (provider failure / timeout — see api/ai.ts + creditCheck).
 *  - HARDENED 2026-09-27 (owner): the pool is HARDCODED — no env var,
 *    config or refresh endpoint can refill it mid-day. A spent pool
 *    refills ONLY at the next UTC midnight; the only in-day escape is a
 *    PRO plan (premium_status → unlimited).
 *
 * Concurrency: every balance write is a compare-and-swap (CAS) — the UPDATE
 * carries `.eq("credits", <value just read>)`, so two parallel requests can
 * never both apply the same old balance (a lost update would silently hand
 * out free messages or drop a reset). A 0-row result means somebody else
 * won the race: re-read and reconcile instead of failing or double-granting.
 *
 * The watermark lives in profiles.credits_reset_date (see
 * db/migrations/003_daily_credits_reset.sql): it stores the UTC date the
 * current balance belongs to. A stale date = a new day = reset.
 */

/**
 * Daily platform-credit pool for logged users — HARDCODED 2026-09-27.
 * No env/config override exists: a spent pool refills ONLY at the next UTC
 * midnight (never on refresh, reload or restart), unless the account
 * carries a PRO plan (premium_status → hasFullAccess → unlimited).
 */
export const DAILY_CREDIT_POOL = 4;

/** Cost of one AI chat message, in credits. */
export const AI_MESSAGE_COST = 1;

// ── Coin gate (owner toggle 2026-10-02, corrected 2026-10-04) ───────────────
// The profile button controls OWNER-allowlist emails ONLY:
//   gate ON  → owners are billed 1 credit per AI message (like all students);
//   gate OFF → owners chat free (no deduction, no lock).
// Students/customers are ALWAYS billed regardless of the toggle — they must
// purchase/earn coins (PRO/premium stays unlimited).
//
// The flag is GLOBAL: one row controls ALL owner-allowlist emails at once.
// Profile toggle ON  → coin billing enabled for every owner gmail.
// Profile toggle OFF → no owner gmail is asked for coins (free mode for owners).
let coinGateCache: { enabled: boolean; at: number } | null = null;
const COIN_GATE_TTL_MS = 15_000;

/**
 * Normalise any stored encoding of the flag to "is the gate OFF?".
 *
 * The settings.value column is untyped (boolean, number, or string depending
 * on who wrote it), so a strict `=== false` check keeps the gate stuck ON
 * when the row holds "false" / 0 / "0" / "off". Every falsy encoding counts
 * as OFF; anything else (including missing) counts as ON (fail closed).
 */
export function isCoinGateOffValue(value: unknown): boolean {
  if (value === false) return true;
  if (value === 0) return true;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "false" || v === "0" || v === "off" || v === "no" || v === "disabled";
  }
  if (value !== null && typeof value === "object") {
    const rec = value as Record<string, unknown>;
    if ("enabled" in rec) return isCoinGateOffValue(rec.enabled);
    if ("value" in rec) return isCoinGateOffValue(rec.value);
  }
  return false;
}

/** Drop the cached flag so a profile toggle takes effect immediately. */
export function invalidateCoinGateCache(): void {
  coinGateCache = null;
}

/** True when the owner wants AI chat to cost credits (the default). */
export async function isCoinGateEnabled(): Promise<boolean> {
  const now = Date.now();
  if (coinGateCache && now - coinGateCache.at < COIN_GATE_TTL_MS) {
    return coinGateCache.enabled;
  }
  let enabled = true; // default ON: bill unless the owner explicitly turns it off
  try {
    const { data } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "coin_gate_enabled")
      .maybeSingle();
    if (data && isCoinGateOffValue((data as { value?: unknown }).value)) enabled = false;
  } catch {
    // Fail closed to billing — the safer default on a settings read error.
  }
  coinGateCache = { enabled, at: now };
  return enabled;
}

/** How often a CAS write re-reads and retries before giving up. */
const CAS_ATTEMPTS = 4;

/** UTC calendar date (YYYY-MM-DD) for "now". */
export function todayUtc(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Did a `.select()`-backed UPDATE actually touch a row?
 *
 * PostgREST answers 200 with an empty array when the WHERE clause matched
 * nothing — the silent-zero-row failure mode behind the 2026-09-26 "reset
 * logged but never persisted" bug. Real responses are arrays; tolerate any
 * other non-null shape (test doubles) as "matched".
 */
export function updateMatchedRows(data: unknown): boolean {
  if (Array.isArray(data)) return data.length > 0;
  return data !== null && data !== undefined;
}

interface ResetResult {
  credits: number;
  resetDone: boolean;
  unlimited: boolean;
}

/**
 * Ensure the user's balance reflects TODAY's daily pool.
 *
 * BILL-EVERYONE ECONOMY (corrected 2026-10-04): the coin pool exists for
 * EVERY signed-in user. Students/customers are always billed; owner emails
 * are billed when the gate is ON and free when it is OFF (handled by the
 * caller — this function only maintains the pool, it never decides free).
 *
 * Called before any credit spend (and by /api/user/me + /api/auth/me so the
 * UI shows the refreshed pool right after midnight). When the watermark is
 * older than today's UTC date, the balance is topped up to DAILY_CREDIT_POOL
 * — top-up (max), never overwrite, so a granted larger balance survives the
 * reset and only users who dipped into their pool refill.
 *
 * PRO accounts (premium_status) skip the reset entirely and stay unlimited.
 *
 * The write is CAS-guarded on the balance just read: if a parallel request
 * or the midnight cron reset first, this update matches zero rows — we then
 * re-read and return the winner's fresh balance (never double-grant, never
 * report a stale 0 that would cause a false 402).
 */
export async function ensureDailyCredits(
  userId: string,
  email?: string | null,
  role?: string | null,
  premiumStatus?: boolean | null,
  now: Date = new Date(),
): Promise<ResetResult> {
  const today = todayUtc(now);

  let currentCredits = 0;
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits, credits_reset_date, premium_status, role")
      .eq("id", userId)
      .maybeSingle();

    // PRO accounts stay unlimited; everyone else draws the daily pool.
    const proUnlimited = (profile?.premium_status ?? !!premiumStatus) === true;
    if (proUnlimited) {
      return { credits: Infinity, resetDone: false, unlimited: true };
    }

    currentCredits = profile?.credits ?? 0;
    const watermark = (profile?.credits_reset_date as string | undefined) ?? null;

    if (watermark === today) {
      return { credits: currentCredits, resetDone: false, unlimited: false };
    }

    // New day (or first-ever watermark): refill to the daily pool. `max`
    // protects balances larger than the pool (owner grants, plan bonuses).
    const resetTo = Math.max(currentCredits, DAILY_CREDIT_POOL);

    // CAS: only apply if the balance is still what we just read, and only
    // when the watermark is actually stale (re-checked by the read above —
    // a concurrent writer that already refreshed it changed `credits` too).
    const { data: updatedRows, error } = await supabaseAdmin
      .from("profiles")
      .update({ credits: resetTo, credits_reset_date: today })
      .eq("id", userId)
      .eq("credits", currentCredits)
      .select("id");

    if (error) {
      console.error("[credits] daily reset failed for", userId, error.message);
      // Fail conservative: report the pre-reset balance so spend checks still
      // behave on stale data rather than granting a free day.
      return { credits: currentCredits, resetDone: false, unlimited: false };
    }

    if (updateMatchedRows(updatedRows)) {
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

    // 0 rows → a parallel reset/spend already wrote. Re-read to see whether
    // the pool is now fresh (→ return its balance) or still stale because a
    // spend won (→ retry the reset against the newer balance).
    const { data: fresh } = await supabaseAdmin
      .from("profiles")
      .select("credits, credits_reset_date")
      .eq("id", userId)
      .maybeSingle();

    if (fresh && (fresh.credits_reset_date as string | null) === today) {
      // Somebody else completed today's reset — report their fresh balance.
      return { credits: fresh.credits ?? currentCredits, resetDone: false, unlimited: false };
    }
    if (fresh) currentCredits = fresh.credits ?? currentCredits;
    // else: profile vanished → fall through to the next attempt, then fail.
  }

  console.error(
    "[credits] daily reset could not CAS the profile row for",
    userId,
    "- failing conservative",
  );
  return { credits: currentCredits, resetDone: false, unlimited: false };
}

/**
 * Spend `cost` credits for `userId` atomically — a compare-and-swap so two
 * parallel requests can never both spend the same last credit (a plain
 * `SET credits = $read - cost` would lose one of the decrements).
 * Returns the remaining balance, or null when funds were insufficient
 * (or the write kept losing races beyond CAS_ATTEMPTS).
 */
export async function spendCredits(
  userId: string,
  cost: number,
  reason: string,
): Promise<number | null> {
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    // Read current balance first (the caller has just run ensureDailyCredits,
    // so this reflects today's pool).
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .maybeSingle();

    const current = profile?.credits ?? 0;
    if (current < cost) return null;

    // Conditional update: succeeds only if the balance is STILL the value we
    // just read — otherwise a concurrent spend/reset happened and we retry.
    const { data: updated, error } = await supabaseAdmin
      .from("profiles")
      .update({ credits: current - cost })
      .eq("id", userId)
      .eq("credits", current)
      .select("credits")
      .maybeSingle();

    if (error) {
      console.error("[credits] spend failed for", userId, error.message);
      return null;
    }

    if (updated !== null && updated !== undefined) {
      const { error: txError } = await supabaseAdmin.from("credit_transactions").insert({
        user_id: userId,
        amount: -cost,
        type: "SPEND",
        reason,
      });
      if (txError) {
        console.error("[credits] spend transaction log failed for", userId, txError.message);
      }
      return (updated.credits as number | undefined) ?? current - cost;
    }

    // CAS lost to a concurrent writer — re-read and retry.
  }

  console.error("[credits] spend gave up after repeated concurrent updates for", userId);
  return null;
}

/**
 * Give `amount` credits back (failed AI answer, aborted feature run).
 * Same CAS discipline as spendCredits; the ledger entry is a GRANT so the
 * owner panel's grant/spend totals stay balanced.
 * Returns the new balance, or null when the refund could not be applied.
 */
export async function refundCredits(
  userId: string,
  amount: number,
  reason: string,
): Promise<number | null> {
  if (amount <= 0) return null;

  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .maybeSingle();

    const current = profile?.credits ?? 0;
    const target = current + amount;

    const { data: updated, error } = await supabaseAdmin
      .from("profiles")
      .update({ credits: target })
      .eq("id", userId)
      .eq("credits", current)
      .select("credits")
      .maybeSingle();

    if (error) {
      console.error("[credits] refund failed for", userId, error.message);
      return null;
    }

    if (updated !== null && updated !== undefined) {
      const { error: txError } = await supabaseAdmin.from("credit_transactions").insert({
        user_id: userId,
        amount,
        type: "GRANT",
        reason,
      });
      if (txError) {
        console.error("[credits] refund transaction log failed for", userId, txError.message);
      }
      console.info(`[credits] refund ${userId}: +${amount} (${reason})`);
      return (updated.credits as number | undefined) ?? target;
    }

    // CAS lost to a concurrent writer — re-read and retry.
  }

  console.error("[credits] refund gave up after repeated concurrent updates for", userId);
  return null;
}
