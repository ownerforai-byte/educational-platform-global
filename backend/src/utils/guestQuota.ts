import { createHash, randomBytes } from "node:crypto";
import type { Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";
import { isProductionEnv } from "../config/env";

/**
 * Server-side daily guest chat quota (owner policy 2026-09-26, hardened
 * 2026-09-26: "a user cannot refresh an exhausted quota"):
 *
 *   5 messages per guest per UTC day, enforced under TWO independent
 *   identities — BOTH must have remaining allowance:
 *
 *     1. DEVICE  — an HttpOnly, JS-invisible cookie minted by the server
 *        (1-year lifetime). Survives IP changes, VPN hops, and wifi→mobile
 *        switches; invisible to page JS, so "clear the counter in devtools"
 *        doesn't exist for it.
 *     2. IP      — the client address (hashed, never stored raw).
 *
 *   Clearing cookies alone → the IP counter still blocks. Changing/spoofing
 *   the IP alone → the cookie counter still blocks. Only clearing BOTH at
 *   once refills the pool, which is far past "annoying casual abuse" — the
 *   quota is effectively unrefreshable by the user.
 *
 *   Both keys live in guest_chat_usage (migration 004) with CAS increments,
 *   so restarts/deploys/multiple instances never refill a pool either. If
 *   the table is unavailable, the matching in-memory counter takes over per
 *   key instead of hard-failing guest chat (schema drift on one environment
 *   must not take the feature down).
 *
 *   A message is charged only when EVERY key consumed cleanly: if any key is
 *   already exhausted, previously consumed keys are rolled back — a failed
 *   attempt never burns someone else's (or their other key's) allowance.
 */

/** Daily guest message allowance (the guest "credit pool"). */
export const GUEST_DAILY_LIMIT = Number(process.env.GUEST_DAILY_LIMIT) || 5;

/** HttpOnly device-identity cookie (server-minted, never page-readable). */
export const GUEST_COOKIE_NAME = "neb-gid";

/** Cookie lifetime: one school year of continuity. */
const COOKIE_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Only accept our own minted shape as a device id (defensive parsing). */
const DEVICE_ID_RE = /^[a-f0-9]{16,64}$/;

/** How often a CAS write re-reads and retries before giving up. */
const CAS_ATTEMPTS = 4;

export type GuestSlotResult =
  /** Every identity consumed one message; `remaining` is the WORST of them. */
  | { status: "ok"; remaining: number }
  /** At least one identity is out for today. */
  | { status: "limited"; remaining: 0 }
  /** Storage gave up (contention) — caller should answer 503, not count. */
  | { status: "unavailable" };

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Day-scoped, non-reversible key for one identity (raw ids never stored). */
function scopedKey(scope: "ip" | "dev", id: string): string {
  const digest = createHash("sha256").update(`${scope}:${id}`).digest("hex").slice(0, 32);
  return `${todayUtc()}:${digest}`;
}

/** All identity keys this request must be charged against, in order. */
function identityKeys(ip: string, deviceId?: string | null): string[] {
  const keys = [scopedKey("ip", ip)];
  if (deviceId && DEVICE_ID_RE.test(deviceId)) keys.push(scopedKey("dev", deviceId));
  return [...new Set(keys)];
}

// ── Device cookie ───────────────────────────────────────────────────────────

/** Read the device identity cookie, validating its shape. */
export function getGuestDeviceId(req: Request): string | null {
  const raw = req.cookies?.[GUEST_COOKIE_NAME];
  return typeof raw === "string" && DEVICE_ID_RE.test(raw) ? raw : null;
}

/**
 * Mint a fresh device identity and set it on the response.
 * HttpOnly + Secure(pro) + SameSite=Lax: page JS can neither read nor
 * selectively delete it without clearing ALL site cookies.
 * Returns the id so THIS request can already be charged against it.
 */
export function issueGuestDeviceCookie(res: Response): string {
  const id = randomBytes(16).toString("hex");
  res.cookie(GUEST_COOKIE_NAME, id, {
    httpOnly: true,
    secure: isProductionEnv(),
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  });
  return id;
}

// ── In-memory fallback (per key, used when guest_chat_usage is unavailable) ─

interface MemUsage {
  count: number;
  date: string;
}
const memUsage = new Map<string, MemUsage>();

function memConsume(key: string): GuestSlotResult {
  const date = todayUtc();
  const entry = memUsage.get(key);
  if (!entry || entry.date !== date) {
    memUsage.set(key, { count: 1, date });
    return { status: "ok", remaining: GUEST_DAILY_LIMIT - 1 };
  }
  if (entry.count >= GUEST_DAILY_LIMIT) {
    return { status: "limited", remaining: 0 };
  }
  entry.count += 1;
  return { status: "ok", remaining: GUEST_DAILY_LIMIT - entry.count };
}

function memRollback(key: string): void {
  const entry = memUsage.get(key);
  if (entry && entry.date === todayUtc() && entry.count > 0) entry.count -= 1;
}

// ── Persistent quota (guest_chat_usage) ─────────────────────────────────────

/** Consume ONE message on ONE identity key. */
async function consumeKey(key: string): Promise<GuestSlotResult> {
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const { data: row, error } = await supabaseAdmin
      .from("guest_chat_usage")
      .select("count")
      .eq("client_key", key)
      .maybeSingle();

    if (error) {
      console.warn("[guest-quota] DB read failed, using in-memory quota:", error.message);
      return memConsume(key);
    }

    if (!row) {
      // First message today for this identity → insert the day's row
      // (ON CONFLICT DO NOTHING, so a racing insert loses cleanly and the
      // loop re-reads it).
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("guest_chat_usage")
        .upsert(
          { client_key: key, day: todayUtc(), count: 1 },
          { onConflict: "client_key", ignoreDuplicates: true },
        )
        .select("count");

      if (insertError) {
        // 23505 = a concurrent insert won → retry; anything else (missing
        // table, permissions) → degrade to the in-memory quota.
        if (insertError.code === "23505") continue;
        console.warn("[guest-quota] DB insert failed, using in-memory quota:", insertError.message);
        return memConsume(key);
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
      return memConsume(key);
    }
    if (updated && updated.length > 0) {
      return { status: "ok", remaining: GUEST_DAILY_LIMIT - ((row.count ?? 0) + 1) };
    }
    // CAS lost → re-read and retry.
  }

  console.warn("[guest-quota] give-up after repeated CAS contention for key", key.slice(0, 8));
  return { status: "unavailable" };
}

/** Return ONE message on ONE identity key (best-effort). */
async function rollbackKey(key: string): Promise<void> {
  try {
    const { data: row, error } = await supabaseAdmin
      .from("guest_chat_usage")
      .select("count")
      .eq("client_key", key)
      .maybeSingle();
    if (error || !row || (row.count ?? 0) <= 0) {
      memRollback(key);
      return;
    }
    await supabaseAdmin
      .from("guest_chat_usage")
      .update({ count: (row.count ?? 0) - 1 })
      .eq("client_key", key)
      .eq("count", row.count);
  } catch (err) {
    console.warn("[guest-quota] rollback failed:", err instanceof Error ? err.message : err);
    memRollback(key);
  }
}

/**
 * Consume one guest message across ALL of this request's identities.
 * Every key must allow it; a mid-way `limited` rolls back the keys already
 * charged so no allowance is ever burned for a message that wasn't sent.
 */
export async function consumeGuestSlot(
  ip: string,
  deviceId?: string | null,
): Promise<GuestSlotResult> {
  const keys = identityKeys(ip, deviceId);
  const charged: string[] = [];
  let remaining = GUEST_DAILY_LIMIT;

  for (const key of keys) {
    const result = await consumeKey(key);
    if (result.status !== "ok") {
      // Another identity already said no → give back what we just charged.
      await Promise.all(charged.map(rollbackKey));
      return result;
    }
    charged.push(key);
    remaining = Math.min(remaining, result.remaining);
  }

  return { status: "ok", remaining };
}

/**
 * Give back the slot a failed attempt consumed: the student was never
 * answered, so charging the pool for it would be dishonest. Best-effort
 * across every identity key.
 */
export async function rollbackGuestSlot(ip: string, deviceId?: string | null): Promise<void> {
  const keys = identityKeys(ip, deviceId);
  await Promise.all(keys.map(rollbackKey));
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
