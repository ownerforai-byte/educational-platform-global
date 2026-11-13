/**
 * Profile storage quota — tracks bytes via storage_objects to avoid double-counting paths.
 */
import { supabaseAdmin } from "../db/supabase";
import type { SessionUser } from "../auth/types";
import { isOwnerEmail } from "../middleware/auth";

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
  if (oldPath && oldPath !== newPath) {
    await releaseStoragePath(ownerId, oldPath);
  }
  if (oldPath === newPath) {
    const snap = await getStorageSnapshot(ownerId, user);
    if ("missing" in snap) return { ok: false, reason: "missing" };
    const { data: row } = await supabaseAdmin
      .from("storage_objects")
      .select("byte_size")
      .eq("path", oldPath)
      .maybeSingle();
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
  return reserveStoragePath(ownerId, newPath, newBytes, user);
}
