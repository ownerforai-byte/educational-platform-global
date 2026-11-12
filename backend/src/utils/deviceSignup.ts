import { createHash } from "node:crypto";
import type { Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";
import { getGuestDeviceId, issueGuestDeviceCookie } from "./guestQuota";

/**
 * One account per device without approval (owner policy 2026-11-09):
 * "without approval no more than one account can be created from one device".
 *
 * A device is the HttpOnly `neb-gid` cookie minted by guestQuota — JS cannot
 * read or selectively rewrite it, and it survives IP changes. The first
 * account created on a device is bound to it; while that account is still
 * PENDING, a second signup from the same device is refused with
 * DEVICE_SIGNUP_LIMIT_MESSAGE. Once the owner APPROVES (ACTIVE) or REJECTS
 * the bound account, the device returns to normal guest use and may create
 * another account — rejection must not trap the device on a status screen.
 *
 * Bindings live in guest_chat_usage (migration 004) under a NON-expiring day
 * so the hourly quota cleanup (which trims day < today) never removes them —
 * this is a permanent binding, not a daily quota. The bound user id is encoded
 * in the key so approval is checked live against profiles; no new table/DDL is
 * needed. If the table is unavailable, an in-memory mirror enforces the limit
 * per instance (same degradation as the guest chat quota).
 */

/** Exact owner wording — shown before sign-in and on a blocked signup. */
export const DEVICE_SIGNUP_LIMIT_MESSAGE =
  "Only one account can be created from one device ~ be careful";

/** Far-future day: survives the guest_chat_usage `day < today` cleanup. */
const PERMANENT_DAY = "9999-12-31";

/** Day-independent, non-reversible device key (raw device id never stored). */
function deviceHash(deviceId: string): string {
  return createHash("sha256").update(`signup-dev:${deviceId}`).digest("hex").slice(0, 32);
}

function bindingPrefix(deviceId: string): string {
  return `signupdev:${deviceHash(deviceId)}:`;
}

function bindingKey(deviceId: string, userId: string): string {
  return `${bindingPrefix(deviceId)}${userId}`;
}

// ── In-memory fallback (used when guest_chat_usage is unavailable) ──────────
const memBindings = new Map<string, Set<string>>();

/** Read the user ids bound to this device (DB first, in-memory mirror). */
async function boundUserIds(deviceId: string): Promise<string[]> {
  const prefix = bindingPrefix(deviceId);
  try {
    const { data, error } = await supabaseAdmin
      .from("guest_chat_usage")
      .select("client_key")
      .like("client_key", `${prefix}%`);
    if (error) {
      console.warn("[device-signup] DB read failed, using in-memory bindings:", error.message);
      return [...(memBindings.get(deviceHash(deviceId)) ?? [])];
    }
    const ids = (data ?? [])
      .map((row) => (typeof row.client_key === "string" ? row.client_key.slice(prefix.length) : ""))
      .filter((id) => id.length > 0);
    return [...new Set(ids)];
  } catch (err) {
    console.warn("[device-signup] DB read threw, using in-memory bindings:", err instanceof Error ? err.message : err);
    return [...(memBindings.get(deviceHash(deviceId)) ?? [])];
  }
}

export interface DeviceSignupCheck {
  /** True when the device already holds an unapproved account. */
  limited: boolean;
  /** The device identity (existing cookie or freshly minted). */
  deviceId: string;
}

/**
 * Decide whether this device may create ANOTHER account. `exceptUserId`
 * excludes an account from the check (the OAuth path re-checks the same
 * account that is signing in, which must not block itself).
 *
 * Mints the device cookie when absent so the identity persists for the next
 * attempt. Fails OPEN on a profile-read error: the approval gate still keeps
 * any new account PENDING, so a storage hiccup never grants access.
 */
export async function checkDeviceSignupLimit(
  req: Request,
  res: Response,
  exceptUserId?: string,
): Promise<DeviceSignupCheck> {
  const deviceId = getGuestDeviceId(req) ?? issueGuestDeviceCookie(res);
  const userIds = (await boundUserIds(deviceId)).filter((id) => id !== exceptUserId);
  if (userIds.length === 0) return { limited: false, deviceId };

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, access_status")
      .in("id", userIds);
    if (error) {
      console.warn("[device-signup] status read failed, allowing signup:", error.message);
      return { limited: false, deviceId };
    }
    // Only a live PENDING bind blocks the device. REJECTED clears the trap so
    // the device can browse as a guest and sign up again if needed.
    const limited = (data ?? []).some((row) => row.access_status === "PENDING");
    return { limited, deviceId };
  } catch (err) {
    console.warn("[device-signup] status read threw, allowing signup:", err instanceof Error ? err.message : err);
    return { limited: false, deviceId };
  }
}

/**
 * Record that this device created this account. Best-effort: the account
 * already exists, so a storage failure must not fail the signup response —
 * the in-memory mirror still enforces the limit on this instance.
 */
export async function bindDeviceToAccount(deviceId: string, userId: string): Promise<void> {
  const key = bindingKey(deviceId, userId);
  try {
    const { error } = await supabaseAdmin
      .from("guest_chat_usage")
      .upsert(
        { client_key: key, day: PERMANENT_DAY, count: 1 },
        { onConflict: "client_key", ignoreDuplicates: true },
      );
    if (error) {
      console.warn("[device-signup] bind write failed, using in-memory binding:", error.message);
      rememberMem(deviceId, userId);
    }
  } catch (err) {
    console.warn("[device-signup] bind write threw, using in-memory binding:", err instanceof Error ? err.message : err);
    rememberMem(deviceId, userId);
  }
}

function rememberMem(deviceId: string, userId: string): void {
  const hash = deviceHash(deviceId);
  const set = memBindings.get(hash) ?? new Set<string>();
  set.add(userId);
  memBindings.set(hash, set);
}

/** Test hook: drop the in-memory mirror between cases. */
export function resetDeviceSignupMemory(): void {
  memBindings.clear();
}