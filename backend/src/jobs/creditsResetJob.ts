import { supabaseAdmin } from "../db/supabase";
import { DAILY_CREDIT_POOL, todayUtc, updateMatchedRows } from "../utils/credits";
import { hasFullAccess } from "../middleware/auth";
import cron from "node-cron";

/**
 * Midnight cron (owner policy 2026-09-26): refill EVERY regular logged user's
 * credit pool to DAILY_CREDIT_POOL at 12:00 AM.
 *
 * A self-hosted node-cron timer runs inside the backend process — no external
 * scheduler needed on Render. The per-user lazy reset in utils/credits.ts is
 * the safety net: even if this job is delayed or the process restarts, the
 * first AI call (or /me fetch) of the day still applies the new pool.
 *
 * Owner/admin/premium profiles are excluded — their balances are managed
 * manually (owner grants) and must never be clobbered by the daily pool.
 */

let started = false;

/** Reset every regular profile whose watermark is older than today. */
export async function runDailyCreditsReset(now: Date = new Date()): Promise<number> {
  const today = todayUtc(now);

  // Stale profiles only. `neq` skips NULL watermarks — those are handled by
  // the lazy per-user reset (first request of the day), which also backfills
  // their watermark.
  const { data: stale, error } = await supabaseAdmin
    .from("profiles")
    .select("id, credits, role, premium_status")
    .neq("credits_reset_date", today)
    .limit(1000);

  if (error) {
    console.error("[credits-cron] fetch stale profiles failed:", error.message);
    return 0;
  }

  const regular = (stale ?? []).filter(
    (p) => !hasFullAccess(((p.role as string) ?? "").toUpperCase() || null, !!p.premium_status),
  );
  if (regular.length === 0) return 0;

  // CAS per profile: only apply if the balance is still the value we read,
  // so a lazy per-user reset (or an in-flight spend) racing this job can
  // never double-grant — a 0-row update means somebody else won, and that
  // profile is skipped for the GRANT ledger batch below.
  const updates = regular.map((p) => {
    const current = p.credits ?? 0;
    const resetTo = Math.max(current, DAILY_CREDIT_POOL);
    return {
      id: p.id,
      grant: resetTo - current,
      promise: supabaseAdmin
        .from("profiles")
        .update({ credits: resetTo, credits_reset_date: today })
        .eq("id", p.id)
        .eq("credits", current)
        .select("id"),
    };
  });

  // Bounded concurrency: Supabase PostgREST handles this easily for small
  // user counts; chunk keeps it safe as the platform grows.
  const CHUNK = 50;
  const winners: typeof regular = [];
  let ok = 0;
  for (let i = 0; i < updates.length; i += CHUNK) {
    const slice = updates.slice(i, i + CHUNK);
    const results = await Promise.allSettled(slice.map((u) => u.promise));
    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      if (r.status === "fulfilled" && !r.value.error && updateMatchedRows(r.value.data)) {
        ok += 1;
        winners.push(regular[i + j]);
      }
    }
  }

  // One auditable transaction batch for the refill — winners only.
  if (winners.length > 0) {
    const { data: tx } = await supabaseAdmin
      .from("credit_transactions")
      .insert(
        winners.map((p) => ({
          user_id: p.id,
          amount: Math.max(p.credits ?? 0, DAILY_CREDIT_POOL) - (p.credits ?? 0),
          type: "GRANT",
          reason: "Daily platform credit pool refill (12:00 AM reset)",
        })),
      )
      .select("id");
    console.info(`[credits-cron] logged ${tx?.length ?? 0} refill transactions`);
  }

  console.info(`[credits-cron] reset ${ok}/${regular.length} profiles to the daily pool (${today})`);
  return ok;
}

export function startCreditsResetJob(): void {
  if (started) return;
  started = true;

  // 12:00 AM every day — "0 0 * * *". Render runs UTC; midnight UTC is the
  // documented reset time (todayUtc() matches it exactly).
  cron.schedule("0 0 * * *", async () => {
    try {
      await runDailyCreditsReset();
    } catch (err) {
      console.error("[credits-cron] unexpected failure:", err);
    }
  });

  console.info("[credits-cron] scheduled daily reset at 12:00 AM (server time)");
}
