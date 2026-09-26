import { createHash } from "node:crypto";
import { supabaseAdmin } from "../db/supabase";

/**
 * Server-side daily guest chat quota (owner policy 2026-09-26):
 * GUEST_DAILY_LIMIT messages per guest per UTC day, keyed by a hash of the
 * client IP — clearing localStorage or switching tabs buys nothing.
 *
 * Design notes (2026-09-26 redesign):
 *  - Previously this lived in an in-memory Map, so every restart/deploy
 *    silently refilled every guest's pool. It now persists in
 *    guest_chat_usage (migration 004) with CAS increments, so the limit
 *    survives process restarts and multiple instances.
 *  - Raw IPs are never stored: the key is `day:sha256(ip)[:32]`.
 *  - Availability fallback: if the table is missing or the DB errors, the
 *    original in-memory counter takes over instead of hard-failing guest
 *    chat (schema drift on one environment must not take the feature down).
 */

/** Daily guest message allowance (the guest "credit pool"). */
export const GUEST_DAILY_LIMIT = Number(process.env.GUEST_DAILY_LIMIT) || 5;

/** How often a CAS write re-reads and retries before giving up. */
const CAS_ATTEMPTS = 4;

export type GuestSlotResult =
  /** One message was consumed; `remaining` is what is left today. */
  | { status: "ok"; remaining: number }
  /** Pool already empty for today. */
  | { status: "limited"; remaining: 0 }
  /** Storage gave up (contention) — caller should answer 503, not count. */
  | { status: "unavailable" };

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Day-scoped, non-reversible client key (one row per guest per UTC day). */
function clientKey(ip: string): string {
  return `${todayUtc()}:${createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
}

// ── In-memory fallback (used when guest_chat_usage is unavailable) ──────────

interface MemUsage {
  count: number;
  date: string;
}
const memUsage = new Map<string, MemUsage>();

function memConsume(ip: string): GuestSlotResult {
  const date = todayUtc();
  const entry = memUsage.get(ip);
  if (!entry || entry.date !== date) {
    memUsage.set(ip, { count: 1, date });
    return { status: "ok", remaining: GUEST_DAILY_LIMIT - 1 };
  }
  if (entry.count >= GUEST_DAILY_LIMIT) {
    return { status: "limited", remaining: 0 };
  }
  entry.count += 1;
  return { status: "ok", remaining: GUEST_DAILY_LIMIT - entry.count };
}

function memRollback(ip: string): void {
  const entry = memUsage.get(ip);
  if (entry && entry.date === todayUtc() && entry.count > 0) entry.count -= 1;
}

// ── Persistent quota (guest_chat_usage) ─────────────────────────────────────

/**
 * Consume one guest message slot.
 * Returns `{status:"ok", remaining}` on success, `"limited"` when today's
 * pool is empty, `"unavailable"` only if even the fallback could not decide.
 */
export async function consumeGuestSlot(ip: string): Promise<GuestSlotResult> {
  const key = clientKey(ip);
  const today = todayUtc();

  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const { data: row, error } = await supabaseAdmin
      .from("guest_chat_usage")
      .select("count")
      .eq("client_key", key)
      .maybeSingle();

    if (error) {
      console.warn("[guest-quota] DB read failed, using in-memory quota:", error.message);
      return memConsume(ip);
    }

    if (!row) {
      // First message today → insert the day's row (ON CONFLICT DO NOTHING,
      // so a racing insert loses cleanly and the loop re-reads it).
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("guest_chat_usage")
        .upsert(
          { client_key: key, day: today, count: 1 },
          { onConflict: "client_key", ignoreDuplicates: true },
        )
        .select("count");

      if (insertError) {
        // 23505 = a concurrent insert won → retry; anything else (missing
        // table, permissions) → degrade to the in-memory quota.
        if (insertError.code === "23505") continue;
        console.warn("[guest-quota] DB insert failed, using in-memory quota:", insertError.message);
        return memConsume(ip);
      }
      if (inserted && inserted.length > 0) {
        return { status: "ok", remaining: GUEST_DAILY_LIMIT - 1 };
      }
      continue; // conflict without error shape → re-read
    }

    if ((row.count ?? 0) >= GUEST_DAILY_LIMIT) {
      return { status: "limited", remaining: 0 };
    }

    // CAS increment: only if nobody else changed the count since the read.
    const { data: updated, error: updateError } = await supabaseAdmin
      .from("guest_chat_usage")
      .update({ count: (row.count ?? 0) + 1 })
      .eq("client_key", key)
      .eq("count", row.count)
      .select("count");

    if (updateError) {
      console.warn("[guest-quota] DB update failed, using in-memory quota:", updateError.message);
      return memConsume(ip);
    }
    if (updated && updated.length > 0) {
      return { status: "ok", remaining: GUEST_DAILY_LIMIT - ((row.count ?? 0) + 1) };
    }
    // CAS lost → re-read and retry.
  }

  console.warn("[guest-quota] give-up after repeated CAS contention for key", key.slice(0, 8));
  return { status: "unavailable" };
}

/**
 * Give back the slot a failed attempt consumed: the student was never
 * answered, so charging the pool for it would be dishonest. Best-effort.
 */
export async function rollbackGuestSlot(ip: string): Promise<void> {
  const key = clientKey(ip);

  try {
    const { data: row, error } = await supabaseAdmin
      .from("guest_chat_usage")
      .select("count")
      .eq("client_key", key)
      .maybeSingle();
    if (error || !row || (row.count ?? 0) <= 0) {
      memRollback(ip);
      return;
    }
    await supabaseAdmin
      .from("guest_chat_usage")
      .update({ count: (row.count ?? 0) - 1 })
      .eq("client_key", key)
      .eq("count", row.count);
  } catch (err) {
    console.warn("[guest-quota] rollback failed:", err instanceof Error ? err.message : err);
    memRollback(ip);
  }
}

let cleanupStarted = false;

/**
 * Hourly trim: drop yesterday's rows (bounded map/tables). Installed once at
 * module load by the guest route.
 */
export function startGuestQuotaCleanup(): void {
  if (cleanupStarted) return;
  cleanupStarted = true;

  setInterval(() => {
    const today = todayUtc();
    for (const [key, entry] of memUsage) {
      if (entry.date !== today) memUsage.delete(key);
    }
    (async () => {
      try {
        const { error } = await supabaseAdmin
          .from("guest_chat_usage")
          .delete()
          .lt("day", today);
        if (error && !/42P01|PGRST205/.test(error.message)) {
          console.warn("[guest-quota] cleanup failed:", error.message);
        }
      } catch {
        /* table may not exist yet on an un-migrated environment */
      }
    })();
  }, 60 * 60 * 1000).unref();
}
