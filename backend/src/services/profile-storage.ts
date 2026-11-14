/**
 * Profile storage quota — tracks bytes via storage_objects to avoid double-counting paths.
 *
 * Replace flow: reserve the new key first (old key still counted), then the
 * caller uploads + writes the profile row, then releases the old key. That
 * order never double-counts a live object and never drops quota for a file
 * that is still referenced.
 */
import { supabaseAdmin } from "../db/supabase";
import type { SessionUser } from "../auth/types";
import { isOwnerEmail } from "../middleware/auth";

export const COMMUNITY_STORAGE_PREFIX = "community/";
export const PROFILE_STORAGE_PREFIX = "profiles/";

export function isCommunityStoragePath(path: string): boolean {
  return path.startsWith(COMMUNITY_STORAGE_PREFIX);
}

export function isProfileSlotPath(path: string): boolean {
  return path.startsWith(PROFILE_STORAGE_PREFIX);
}

/** Drop empty / whitespace extras so `profile_extras` stays a small JSON object. */
export function compactProfileExtras(
  prev: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...prev, ...patch };
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (value == null) continue;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") continue;
      out[key] = trimmed;
      continue;
    }
    out[key] = value;
  }
  return out;
}

export const TIER_STORAGE_LIMITS: Record<string, number> = {
  member: 25 * 1024 * 1024,
  plus: 100 * 1024 * 1024,
  pro: 500 * 1024 * 1024,
};

const UNLIMITED = Number.MAX_SAFE_INTEGER;

export function defaultLimitBytes(user: Pick<SessionUser, "role" | "plan" | "email">): number {
  if (user.role === "owner" || isOwnerEmail(user.email)) return UNLIMITED;
  const plan = (user.plan ?? user.role ?? "member").toLowerCase();
  if (plan === "pro") return TIER_STORAGE_LIMITS.pro;
  if (plan === "plus" || plan === "plus_20") return TIER_STORAGE_LIMITS.plus;
  return TIER_STORAGE_LIMITS.member;
}

export interface StorageSnapshot {
  usedBytes: number;
  limitBytes: number;
  remainingBytes: number;
  unlimited: boolean;
}

type DbError = { message?: string; code?: string } | null;

function isMissingTable(error: DbError): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

export async function getStorageSnapshot(
  userId: string,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<StorageSnapshot | { missing: true }> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("storage_used_bytes, storage_limit_bytes, plan, role")
    .eq("id", userId)
    .maybeSingle();

  if (error && isMissingTable(error)) return { missing: true };
  if (error) throw error;

  const used = Number(data?.storage_used_bytes ?? 0);
  const override = data?.storage_limit_bytes;
  const limit =
    override != null && Number.isFinite(Number(override))
      ? Number(override)
      : defaultLimitBytes(user);
  const unlimited = limit >= UNLIMITED / 2;
  return {
    usedBytes: used,
    limitBytes: unlimited ? UNLIMITED : limit,
    remainingBytes: unlimited ? UNLIMITED : Math.max(0, limit - used),
    unlimited,
  };
}

export async function reserveStoragePath(
  ownerId: string,
  path: string,
  byteSize: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<{ ok: true } | { ok: false; reason: "quota" | "missing" }> {
  if (byteSize < 0) return { ok: false, reason: "quota" };

  const snap = await getStorageSnapshot(ownerId, user);
  if ("missing" in snap) return { ok: false, reason: "missing" };

  const { data: existing, error: exErr } = await supabaseAdmin
    .from("storage_objects")
    .select("path, byte_size, ref_count")
    .eq("path", path)
    .maybeSingle();

  if (exErr && isMissingTable(exErr)) return { ok: false, reason: "missing" };
  if (exErr) throw exErr;

  const priorBytes = existing ? Number(existing.byte_size ?? 0) : 0;
  const delta = existing ? Math.max(0, byteSize - priorBytes) : byteSize;

  if (!snap.unlimited && snap.usedBytes + delta > snap.limitBytes) {
    return { ok: false, reason: "quota" };
  }

  const now = new Date().toISOString();
  if (existing) {
    const ref = Number(existing.ref_count ?? 1) + 1;
    const byteDelta = byteSize - priorBytes;
    const { error: upErr } = await supabaseAdmin
      .from("storage_objects")
      .update({ byte_size: byteSize, ref_count: ref, updated_at: now })
      .eq("path", path);
    if (upErr) throw upErr;
    if (byteDelta !== 0) {
      await bumpProfileUsed(ownerId, byteDelta);
    }
    return { ok: true };
  }

  const { error: insErr } = await supabaseAdmin.from("storage_objects").insert({
    path,
    owner_id: ownerId,
    byte_size: byteSize,
    ref_count: 1,
    created_at: now,
    updated_at: now,
  });
  if (insErr) throw insErr;
  await bumpProfileUsed(ownerId, byteSize);
  return { ok: true };
}

export async function releaseStoragePath(
  ownerId: string,
  path: string,
): Promise<void> {
  const { data: row, error } = await supabaseAdmin
    .from("storage_objects")
    .select("path, byte_size, ref_count")
    .eq("path", path)
    .maybeSingle();
  if (error) {
    if (isMissingTable(error)) return;
    throw error;
  }
  if (!row) return;

  const refs = Number(row.ref_count ?? 1);
  if (refs > 1) {
    await supabaseAdmin
      .from("storage_objects")
      .update({ ref_count: refs - 1, updated_at: new Date().toISOString() })
      .eq("path", path);
    return;
  }

  const bytes = Number(row.byte_size ?? 0);
  await supabaseAdmin.from("storage_objects").delete().eq("path", path);
  await bumpProfileUsed(ownerId, -bytes);
}

async function bumpProfileUsed(userId: string, delta: number): Promise<void> {
  if (delta === 0) return;
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("storage_used_bytes")
    .eq("id", userId)
    .maybeSingle();
  const next = Math.max(0, Number(data?.storage_used_bytes ?? 0) + delta);
  await supabaseAdmin.from("profiles").update({ storage_used_bytes: next }).eq("id", userId);
}

export async function replaceReservedPath(
  ownerId: string,
  oldPath: string | null | undefined,
  newPath: string,
  newBytes: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<{ ok: true } | { ok: false; reason: "quota" | "missing" }> {
  if (oldPath === newPath) {
    const snap = await getStorageSnapshot(ownerId, user);
    if ("missing" in snap) return { ok: false, reason: "missing" };
    const { data: row, error } = await supabaseAdmin
      .from("storage_objects")
      .select("byte_size")
      .eq("path", oldPath)
      .maybeSingle();
    if (error && isMissingTable(error)) return { ok: false, reason: "missing" };
    if (error) throw error;
    const prior = Number(row?.byte_size ?? 0);
    const delta = newBytes - prior;
    if (!snap.unlimited && snap.usedBytes + delta > snap.limitBytes) {
      return { ok: false, reason: "quota" };
    }
    await supabaseAdmin
      .from("storage_objects")
      .update({ byte_size: newBytes, updated_at: new Date().toISOString() })
      .eq("path", oldPath);
    await bumpProfileUsed(ownerId, delta);
    return { ok: true };
  }

  // Keep the old key counted until the caller finishes the swap, but check
  // quota against the *net* delta so a same-size replace is not rejected.
  const snap = await getStorageSnapshot(ownerId, user);
  if ("missing" in snap) return { ok: false, reason: "missing" };

  let oldBytes = 0;
  if (oldPath) {
    const { data: oldRow, error: oldErr } = await supabaseAdmin
      .from("storage_objects")
      .select("byte_size")
      .eq("path", oldPath)
      .maybeSingle();
    if (oldErr && isMissingTable(oldErr)) return { ok: false, reason: "missing" };
    if (oldErr) throw oldErr;
    oldBytes = Number(oldRow?.byte_size ?? 0);
  }

  const netDelta = newBytes - oldBytes;
  if (!snap.unlimited && snap.usedBytes + netDelta > snap.limitBytes) {
    return { ok: false, reason: "quota" };
  }

  const reserved = await reserveStoragePathIgnoringQuota(ownerId, newPath, newBytes);
  if (!reserved.ok) return reserved;
  return { ok: true };
}

/**
 * Insert / bump a storage_objects row without a second quota check. Callers
 * must have already verified the net delta against the snapshot.
 */
async function reserveStoragePathIgnoringQuota(
  ownerId: string,
  path: string,
  byteSize: number,
): Promise<{ ok: true } | { ok: false; reason: "missing" }> {
  const { data: existing, error: exErr } = await supabaseAdmin
    .from("storage_objects")
    .select("path, byte_size, ref_count")
    .eq("path", path)
    .maybeSingle();

  if (exErr && isMissingTable(exErr)) return { ok: false, reason: "missing" };
  if (exErr) throw exErr;

  const now = new Date().toISOString();
  if (existing) {
    const ref = Number(existing.ref_count ?? 1) + 1;
    const priorBytes = Number(existing.byte_size ?? 0);
    const byteDelta = byteSize - priorBytes;
    const { error: upErr } = await supabaseAdmin
      .from("storage_objects")
      .update({ byte_size: byteSize, ref_count: ref, updated_at: now })
      .eq("path", path);
    if (upErr) throw upErr;
    if (byteDelta !== 0) await bumpProfileUsed(ownerId, byteDelta);
    return { ok: true };
  }

  const { error: insErr } = await supabaseAdmin.from("storage_objects").insert({
    path,
    owner_id: ownerId,
    byte_size: byteSize,
    ref_count: 1,
    created_at: now,
    updated_at: now,
  });
  if (insErr) throw insErr;
  await bumpProfileUsed(ownerId, byteSize);
  return { ok: true };
}

export interface AbandonedProfileObject {
  path: string;
  refCount: number;
  byteSize: number;
}

/**
 * Profile-slot keys this owner still tracks that are not the live avatar/cover.
 * Community attachments (`community/…`) are never returned.
 */
export async function listAbandonedProfilePaths(
  ownerId: string,
  livePaths: Array<string | null | undefined>,
): Promise<AbandonedProfileObject[]> {
  const live = new Set(
    livePaths.filter((p): p is string => typeof p === "string" && p.length > 0),
  );
  const { data, error } = await supabaseAdmin
    .from("storage_objects")
    .select("path, ref_count, byte_size")
    .eq("owner_id", ownerId);

  if (error) {
    if (isMissingTable(error)) return [];
    throw error;
  }

  const abandoned: AbandonedProfileObject[] = [];
  for (const row of data ?? []) {
    const path = String(row.path ?? "");
    if (!path || isCommunityStoragePath(path)) continue;
    if (!isProfileSlotPath(path)) continue;
    if (live.has(path)) continue;
    abandoned.push({
      path,
      refCount: Number(row.ref_count ?? 1),
      byteSize: Number(row.byte_size ?? 0),
    });
  }
  return abandoned;
}
