/**
 * CONTENT SPARK pool (`profiles.credits`) — business rules + CAS writes.
 * Persistence goes through `db/repositories/credit.repository.ts`.
 * `utils/credits.ts` re-exports this module for legacy import paths.
 */

import {
  casUpdateCredits,
  insertCreditTransaction,
  readCreditsWatermark,
  readProfileCredits,
} from "../db/repositories/credit.repository.js";

export const DAILY_CREDIT_POOL = 4;

/** @deprecated AI chat uses AI sparks — kept at 0 for legacy /api/config clients. */
export const AI_MESSAGE_COST = 0;

const CAS_ATTEMPTS = 4;

export function todayUtc(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function updateMatchedRows(data: unknown): boolean {
  if (Array.isArray(data)) return data.length > 0;
  return data !== null && data !== undefined;
}

interface ResetResult {
  credits: number;
  resetDone: boolean;
  unlimited: boolean;
}

const resetInFlight = new Map<string, Promise<ResetResult>>();

export async function ensureDailyCredits(
  userId: string,
  email?: string | null,
  role?: string | null,
  premiumStatus?: boolean | null,
  now: Date = new Date(),
): Promise<ResetResult> {
  void email;
  void role;
  const inFlight = resetInFlight.get(userId);
  if (inFlight) return inFlight;
  const run = doEnsureDailyCredits(userId, premiumStatus, now).finally(() => {
    resetInFlight.delete(userId);
  });
  resetInFlight.set(userId, run);
  return run;
}

async function doEnsureDailyCredits(
  userId: string,
  premiumStatus?: boolean | null,
  now: Date = new Date(),
): Promise<ResetResult> {
  const today = todayUtc(now);

  let currentCredits = 0;
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const profile = await readProfileCredits(userId);

    const proUnlimited = (profile?.premium_status ?? !!premiumStatus) === true;
    if (proUnlimited) {
      return { credits: Infinity, resetDone: false, unlimited: true };
    }

    currentCredits = profile?.credits ?? 0;
    const watermark = profile?.credits_reset_date ?? null;

    if (watermark === today) {
      return { credits: currentCredits, resetDone: false, unlimited: false };
    }

    const resetTo = Math.max(currentCredits, DAILY_CREDIT_POOL);

    const { matched, error } = await casUpdateCredits(
      userId,
      currentCredits,
      resetTo,
      today,
    );

    if (error) {
      console.error("[credits] daily reset failed for", userId, error.message);
      return { credits: currentCredits, resetDone: false, unlimited: false };
    }

    if (matched) {
      const { error: txError } = await insertCreditTransaction({
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

    const fresh = await readCreditsWatermark(userId);
    if (fresh && fresh.credits_reset_date === today) {
      return { credits: fresh.credits ?? currentCredits, resetDone: false, unlimited: false };
    }
    if (fresh) currentCredits = fresh.credits ?? currentCredits;
  }

  console.error(
    "[credits] daily reset could not CAS the profile row for",
    userId,
    "- failing conservative",
  );
  return { credits: currentCredits, resetDone: false, unlimited: false };
}

export async function spendCredits(
  userId: string,
  cost: number,
  reason: string,
): Promise<number | null> {
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const current = await readProfileCredits(userId).then((p) => p?.credits ?? 0);
    if (current < cost) return null;

    const { matched, credits, error } = await casUpdateCredits(
      userId,
      current,
      current - cost,
      undefined,
      true,
    );

    if (error) {
      console.error("[credits] spend failed for", userId, error.message);
      return null;
    }

    if (matched) {
      const { error: txError } = await insertCreditTransaction({
        user_id: userId,
        amount: -cost,
        type: "SPEND",
        reason,
      });
      if (txError) {
        console.error("[credits] spend transaction log failed for", userId, txError.message);
      }
      return credits ?? current - cost;
    }
  }

  console.error("[credits] spend gave up after repeated concurrent updates for", userId);
  return null;
}

export async function refundCredits(
  userId: string,
  amount: number,
  reason: string,
): Promise<number | null> {
  if (amount <= 0) return null;

  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const current = await readProfileCredits(userId).then((p) => p?.credits ?? 0);
    const target = current + amount;

    const { matched, credits, error } = await casUpdateCredits(
      userId,
      current,
      target,
      undefined,
      true,
    );

    if (error) {
      console.error("[credits] refund failed for", userId, error.message);
      return null;
    }

    if (matched) {
      const { error: txError } = await insertCreditTransaction({
        user_id: userId,
        amount,
        type: "GRANT",
        reason,
      });
      if (txError) {
        console.error("[credits] refund transaction log failed for", userId, txError.message);
      }
      console.info(`[credits] refund ${userId}: +${amount} (${reason})`);
      return credits ?? target;
    }
  }

  console.error("[credits] refund gave up after repeated concurrent updates for", userId);
  return null;
}

export { readProfileCredits, readCreditsBalance } from "../db/repositories/credit.repository.js";
