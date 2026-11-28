/**
 * Profile storage quota — tracks bytes via storage_objects to avoid double-counting paths.
 *
 * Replace flow: reserve the new key first (old key still counted), then the
 * caller uploads + writes the profile row, then releases the old key. That
 * order never double-counts a live object and never drops quota for a file
 * that is still referenced.
 */
import { supabaseAdmin } from "../db/supabase";
import { adjustStorageObject, type StorageAccountingResult } from "../db/repositories/storage.repository";
import { normalizeRole, type SessionUser } from "../auth/types";
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

function normalizePlanTier(value: unknown): SessionUser["plan"] {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase();
  if (v === "member" || v === "plus" || v === "pro") return v;
  return null;
}

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
  const storedRole = normalizeRole(data?.role ?? user.role);
  const storedPlan = normalizePlanTier(data?.plan ?? user.plan);
  const limit =
    override != null && Number.isFinite(Number(override))
      ? Number(override)
      : defaultLimitBytes({ email: user.email, role: storedRole, plan: storedPlan });
  const unlimited = limit >= UNLIMITED / 2;
  return {
    usedBytes: used,
    limitBytes: unlimited ? UNLIMITED : limit,
    remainingBytes: unlimited ? UNLIMITED : Math.max(0, limit - used),
    unlimited,
  };
}

type StorageMutationResult = { ok: true } | { ok: false; reason: "quota" | "missing" };

function normalizeAccountingResult(result: StorageAccountingResult): StorageMutationResult {
  if (result.ok) return { ok: true };
  if (result.reason === "quota") return { ok: false, reason: "quota" };
  if (result.reason === "missing" || result.reason === "missing_profile") {
    return { ok: false, reason: "missing" };
  }
  throw new Error(`Storage accounting failed: ${result.reason ?? "unknown"}`);
}

export async function reserveStoragePath(
  ownerId: string,
  path: string,
  byteSize: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<StorageMutationResult> {
  if (!Number.isSafeInteger(byteSize) || byteSize < 0) return { ok: false, reason: "quota" };
  return normalizeAccountingResult(await adjustStorageObject({
    mode: "reserve",
    ownerId,
    path,
    byteSize,
    limitBytes: defaultLimitBytes(user),
  }));
}

/**
 * Set the byte size of one account object. A rewrite of the same path updates
 * the ledger in place so chat history and other overwrites do not stack refs.
 */
export async function accountStorageObject(
  ownerId: string,
  path: string,
  byteSize: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<StorageMutationResult> {
  if (!Number.isSafeInteger(byteSize) || byteSize < 0) return { ok: false, reason: "quota" };
  return normalizeAccountingResult(await adjustStorageObject({
    mode: "account",
    ownerId,
    path,
    byteSize,
    limitBytes: defaultLimitBytes(user),
  }));
}

export async function releaseStoragePath(
  ownerId: string,
  path: string,
): Promise<void> {
  const result = await adjustStorageObject({
    mode: "release",
    ownerId,
    path,
    byteSize: 0,
    limitBytes: Number.MAX_SAFE_INTEGER,
  });
  if (!result.ok && result.reason !== "missing" && result.reason !== "missing_profile") {
    throw new Error(`Storage accounting failed: ${result.reason ?? "unknown"}`);
  }
}

export async function replaceReservedPath(
  ownerId: string,
  oldPath: string | null | undefined,
  newPath: string,
  newBytes: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<StorageMutationResult> {
  if (!Number.isSafeInteger(newBytes) || newBytes < 0) return { ok: false, reason: "quota" };
  return normalizeAccountingResult(await adjustStorageObject({
    mode: "replace",
    ownerId,
    path: newPath,
    byteSize: newBytes,
    limitBytes: defaultLimitBytes(user),
    oldPath: oldPath || null,
  }));
}

export async function promoteStoragePath(
  ownerId: string,
  pendingPath: string,
  finalPath: string,
  byteSize: number,
  user: Pick<SessionUser, "role" | "plan" | "email">,
): Promise<StorageMutationResult> {
  if (!Number.isSafeInteger(byteSize) || byteSize < 0 || !pendingPath || !finalPath) {
    return { ok: false, reason: "quota" };
  }
  return normalizeAccountingResult(await adjustStorageObject({
    mode: "promote",
    ownerId,
    path: finalPath,
    byteSize,
    limitBytes: defaultLimitBytes(user),
    oldPath: pendingPath,
  }));
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
