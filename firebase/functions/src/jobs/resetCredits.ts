import { logger } from "firebase-functions";
import { getSupabaseAdmin } from "../supabase";

/** Matches backend `services/credit.service.ts` DAILY_CREDIT_POOL. */
export const DAILY_CREDIT_POOL = 4;

function todayUtc(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function updateMatchedRows(data: unknown): boolean {
  if (Array.isArray(data)) return data.length > 0;
  return data !== null && data !== undefined;
}

/**
 * Midnight bulk refill for regular (non-PRO) profiles whose watermark is stale.
 * Lazy per-request `ensureDailyCredits` on the web API remains the safety net.
 */
export async function runDailyCreditsReset(now: Date = new Date()): Promise<number> {
  const db = getSupabaseAdmin();
  const today = todayUtc(now);

  const { data: stale, error } = await db
    .from("profiles")
    .select("id, credits, role, premium_status")
    .neq("credits_reset_date", today)
    .limit(1000);

  if (error) {
    logger.error("[credits-cron] fetch stale profiles failed", { message: error.message });
    return 0;
  }

  const regular = (stale ?? []).filter((p) => p.premium_status !== true);
  if (regular.length === 0) return 0;

  const updates = regular.map((p) => {
    const current = p.credits ?? 0;
    const resetTo = Math.max(current, DAILY_CREDIT_POOL);
    return {
      id: p.id as string,
      grant: resetTo - current,
      current,
      resetTo,
      promise: db
        .from("profiles")
        .update({ credits: resetTo, credits_reset_date: today })
        .eq("id", p.id)
        .eq("credits", current)
        .select("id"),
    };
  });

  const CHUNK = 50;
  const winners: Array<{ id: string; grant: number }> = [];
  let ok = 0;
  for (let i = 0; i < updates.length; i += CHUNK) {
    const slice = updates.slice(i, i + CHUNK);
    const results = await Promise.allSettled(slice.map((u) => u.promise));
    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      const u = slice[j];
      if (r.status === "fulfilled" && !r.value.error && updateMatchedRows(r.value.data)) {
        ok += 1;
        winners.push({ id: u.id, grant: u.grant });
      }
    }
  }

  if (winners.length > 0) {
    const { data: tx } = await db
      .from("credit_transactions")
      .insert(
        winners.map((w) => ({
          user_id: w.id,
          amount: w.grant,
          type: "GRANT",
          reason: "Daily platform credit pool refill (12:00 AM reset)",
        })),
      )
      .select("id");
    logger.info(`[credits-cron] logged ${tx?.length ?? 0} refill transactions`);
  }

  logger.info(`[credits-cron] reset ${ok}/${regular.length} profiles to the daily pool (${today})`);
  return ok;
}
