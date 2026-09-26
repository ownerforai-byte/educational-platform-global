import { supabaseAdmin } from "../db/supabase";
import { DAILY_CREDIT_POOL, todayUtc } from "../utils/credits";
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

  const updates = regular.map((p) => {
    const resetTo = Math.max(p.credits ?? 0, DAILY_CREDIT_POOL);
    return supabaseAdmin
      .from("profiles")
      .update({ credits: resetTo, credits_reset_date: today })
      .eq("id", p.id);
  });

  // Bounded concurrency: Supabase PostgREST handles this easily for small
  // user counts; chunk keeps it safe as the platform grows.
  const CHUNK = 50;
  let ok = 0;
  for (let i = 0; i < updates.length; i += CHUNK) {
    const results = await Promise.allSettled(updates.slice(i, i + CHUNK).map((u) => u));
    for (const r of results) if (r.status === "fulfilled" && !r.value.error) ok += 1;
  }

  // One auditable transaction batch for the refill.
  const { data: tx } = await supabaseAdmin
    .from("credit_transactions")
    .insert(
      regular.map((p) => ({
        user_id: p.id,
        amount: Math.max(p.credits ?? 0, DAILY_CREDIT_POOL) - (p.credits ?? 0),
        type: "GRANT",
        reason: "Daily platform credit pool refill (12:00 AM reset)",
      })),
    )
    .select("id");

  console.info(
    `[credits-cron] reset ${ok}/${regular.length} profiles to the daily pool (${today})` +
      (tx ? `, ${tx.length} transactions logged` : ""),
  );
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
