/**
 * Profile repository — Firestore `profiles` (doc id = Firebase uid) is the
 * authoritative store (Supabase→Firebase auth migration contract; the
 * auto-approval Cloud Function flips `access_status` there).
 *
 * TRANSITION semantics (kept until the remaining direct Supabase `profiles`
 * readers/writers — credit.repository, admin consoles, deviceSignup — move):
 * - Writes go to Firestore first and mirror to the legacy Supabase row.
 * - Reads merge both, per field: the Firestore doc wins, except decisive
 *   states that only one side may hold during the transition —
 *   `access_status`: REJECTED (owner console, Supabase) > ACTIVE (bot,
 *   Firestore, or console) > anything else; `role`/`plan`: the more
 *   privileged rung wins (console grants live only on the legacy row);
 *   `premium_status`: granted when either store grants it.
 */
import { getAdminClient, isMissingTable } from "./base.repository.js";
import {
  readProfileDoc,
  upsertProfileDoc,
  updateProfileDoc,
} from "../../storage/firebase-store.js";
import { normalizeRole } from "../../auth/types.js";

export interface ProfileCreditRow {
  credits: number | null;
  credits_reset_date: string | null;
  premium_status: boolean | null;
  role: string | null;
}

export interface ProfileAccessRow {
  role: string | null;
  premium_status: boolean | null;
  access_status: string | null;
}

type ProfileRecord = Record<string, unknown>;

/**
 * Field ownership (split-storage policy — do not blindly dual-write):
 * - Firestore owns auth/ops contract fields (access, role, plan, credits).
 * - Supabase owns structured identity/media (username, bio, avatar/cover…).
 * - `full_name` is shared: PATCH writes both so login refresh cannot shadow it.
 */
export const SUPABASE_IDENTITY_KEYS = [
  "username",
  "bio",
  "location",
  "website",
  "avatar_path",
  "avatar_bytes",
  "cover_path",
  "cover_bytes",
  "profile_visibility",
  "profile_extras",
  "storage_used_bytes",
  "storage_limit_bytes",
] as const;

const FIRESTORE_AUTH_KEYS = [
  "email",
  "access_status",
  "role",
  "plan",
  "premium_status",
  "created_at",
  "credits",
  "credits_limit",
  "credits_reset_date",
  "credits_unlock",
  "premium_approved_at",
] as const;

const FIRESTORE_WRITE_KEYS = new Set<string>(["full_name", ...FIRESTORE_AUTH_KEYS]);
const SUPABASE_WRITE_KEYS = new Set<string>([
  "full_name",
  ...FIRESTORE_AUTH_KEYS,
  ...SUPABASE_IDENTITY_KEYS,
]);

const IDENTITY_KEY_SET = new Set<string>(SUPABASE_IDENTITY_KEYS);

function partitionProfileWrite(fields: Record<string, unknown>): {
  firestore: Record<string, unknown>;
  supabase: Record<string, unknown>;
} {
  const firestore: Record<string, unknown> = {};
  const supabase: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (key === "id") continue;
    if (FIRESTORE_WRITE_KEYS.has(key)) firestore[key] = value;
    if (SUPABASE_WRITE_KEYS.has(key)) supabase[key] = value;
  }
  return { firestore, supabase };
}

async function writePartitioned(
  userId: string,
  fields: Record<string, unknown>,
  mode: "update" | "upsert",
): Promise<{ error: { message: string } | null }> {
  const { firestore: fsFields, supabase: sbFields } = partitionProfileWrite(fields);
  if (Object.keys(fsFields).length > 0) {
    const firestore =
      mode === "upsert"
        ? await upsertProfileDoc(userId, fsFields)
        : await updateProfileDoc(userId, fsFields);
    if (firestore.error) return firestore;
  }
  if (Object.keys(sbFields).length > 0) {
    const payload = mode === "upsert" ? { ...sbFields, id: userId } : sbFields;
    const query =
      mode === "upsert"
        ? getAdminClient().from("profiles").upsert(payload)
        : getAdminClient().from("profiles").update(payload).eq("id", userId);
    const { error } = await query;
    if (error) return { error };
  }
  return { error: null };
}

// ── Firestore ⇄ legacy merge helpers ────────────────────────────────────────

interface ProfileSources {
  doc: ProfileRecord | null;
  row: ProfileRecord | null;
  error: { message: string } | null;
}

/** Read the Firestore doc and the legacy Supabase row in parallel (one query each). */
async function readProfileSources(userId: string, columns: string): Promise<ProfileSources> {
  const [doc, legacy] = await Promise.all([
    readProfileDoc(userId),
    getAdminClient()
      .from("profiles")
      .select(columns)
      .eq("id", userId)
      .maybeSingle(),
  ]);
  return {
    doc,
    row: (legacy.data as ProfileRecord | null) ?? null,
    error: legacy.error ?? null,
  };
}

function mergeAccessStatus(docValue: unknown, rowValue: unknown): string | null {
  const values = [docValue, rowValue];
  if (values.some((v) => v === "REJECTED")) return "REJECTED";
  if (values.some((v) => v === "ACTIVE")) return "ACTIVE";
  return (values.find((v) => typeof v === "string" && v) as string | undefined) ?? null;
}

function mergePremium(docValue: unknown, rowValue: unknown): boolean | null {
  const values = [docValue, rowValue];
  if (values.some((v) => v === true)) return true;
  if (values.some((v) => v === false)) return false;
  return null;
}

const ROLE_RANK: Record<string, number> = { member: 0, plus: 1, pro: 2, owner: 3 };
const PLAN_RANK: Record<string, number> = { member: 0, plus: 1, plus_20: 1, pro: 2 };

function rankOf(value: unknown, table: Record<string, number>, normalized?: string | null): number {
  const key = normalized ?? (typeof value === "string" ? value.trim().toLowerCase() : "");
  return table[key ?? ""] ?? -1;
}

/** The more privileged rung wins (console grants live only on the legacy row). */
function betterRole(docValue: unknown, rowValue: unknown): unknown {
  const docRank = rankOf(docValue, ROLE_RANK, normalizeRole(docValue));
  const rowRank = rankOf(rowValue, ROLE_RANK, normalizeRole(rowValue));
  return rowRank > docRank ? rowValue : docValue;
}

function betterPlan(docValue: unknown, rowValue: unknown): unknown {
  const docRank = rankOf(docValue, PLAN_RANK);
  const rowRank = rankOf(rowValue, PLAN_RANK);
  return rowRank > docRank ? rowValue : docValue;
}

/** Per-field merge; the Firestore doc wins except for the decisive states above. */
function mergeProfile(doc: ProfileRecord | null, row: ProfileRecord | null): ProfileRecord | null {
  if (!doc && !row) return null;
  const merged: ProfileRecord = { ...(row ?? {}) };
  for (const [key, value] of Object.entries(doc ?? {})) merged[key] = value;
  // Structured identity lives on the Postgres row. Restore those keys so a
  // stale Firestore copy cannot shadow a PATCH that only landed in Supabase.
  if (row) {
    for (const key of IDENTITY_KEY_SET) {
      if (Object.prototype.hasOwnProperty.call(row, key)) merged[key] = row[key];
    }
  }
  merged.access_status = mergeAccessStatus(doc?.access_status, row?.access_status);
  merged.role = betterRole(doc?.role, row?.role);
  merged.plan = betterPlan(doc?.plan, row?.plan);
  merged.premium_status = mergePremium(doc?.premium_status, row?.premium_status);
  // Display name: first non-empty (a null contract field must not wipe a
  // legacy name and vice versa). PATCH writes both stores so they stay aligned.
  const name = [doc?.full_name, row?.full_name].find(
    (v) => typeof v === "string" && v.trim(),
  );
  merged.full_name = typeof name === "string" ? name.trim() : null;
  return merged;
}

// ── Reads ───────────────────────────────────────────────────────────────────

export async function getProfileCreditRow(userId: string): Promise<ProfileCreditRow | null> {
  const { doc, row } = await readProfileSources(
    userId,
    "credits, credits_reset_date, premium_status, role",
  );
  const merged = mergeProfile(doc, row);
  if (!merged) return null;
  return {
    credits: (merged.credits as number | null | undefined) ?? null,
    credits_reset_date: (merged.credits_reset_date as string | null | undefined) ?? null,
    premium_status: (merged.premium_status as boolean | null) ?? null,
    role: (merged.role as string | null | undefined) ?? null,
  };
}

export async function getProfileAccessRow(userId: string): Promise<ProfileAccessRow | null> {
  const { doc, row } = await readProfileSources(userId, "role, access_status");
  const merged = mergeProfile(doc, row);
  if (!merged) return null;
  return {
    role: (merged.role as string | null | undefined) ?? null,
    access_status: (merged.access_status as string | null) ?? null,
    premium_status: null,
  };
}

/** Auth gate row for credit middleware (includes premium_status). */
export async function getProfileGateRow(userId: string): Promise<ProfileAccessRow | null> {
  const { doc, row } = await readProfileSources(userId, "role, premium_status, access_status");
  const merged = mergeProfile(doc, row);
  if (!merged) return null;
  return {
    role: (merged.role as string | null | undefined) ?? null,
    access_status: (merged.access_status as string | null) ?? null,
    premium_status: (merged.premium_status as boolean | null) ?? null,
  };
}

export async function getProfileFullName(userId: string): Promise<string | null> {
  try {
    const { doc, row } = await readProfileSources(userId, "full_name");
    const merged = mergeProfile(doc, row);
    const name = merged?.full_name;
    return typeof name === "string" && name.trim() ? name.trim() : null;
  } catch {
    return null;
  }
}

export async function getProfilePlanRow(
  userId: string,
): Promise<{
  plan: string | null;
  premium_status: boolean | null;
  /** True when the `plan` column is missing (migration 008 not applied). */
  planColumnMissing: boolean;
} | null> {
  const { doc, row, error } = await readProfileSources(userId, "plan, premium_status");
  if (error && doc?.plan === undefined) {
    const { data: legacy } = await getAdminClient()
      .from("profiles")
      .select("premium_status")
      .eq("id", userId)
      .maybeSingle();
    const merged = mergeProfile(doc, (legacy as ProfileRecord | null) ?? null);
    if (!merged) return null;
    return {
      plan: null,
      premium_status: mergePremium(merged.premium_status, null) === true,
      planColumnMissing: true,
    };
  }
  const merged = mergeProfile(doc, row);
  if (!merged) return null;
  return {
    plan: typeof merged.plan === "string" ? merged.plan : null,
    premium_status: merged.premium_status === true,
    planColumnMissing: false,
  };
}

export async function getProfileById(
  userId: string,
  columns: string,
): Promise<{ data: ProfileRecord | null; error: { message: string } | null }> {
  const { doc, row, error } = await readProfileSources(userId, columns);
  const merged = mergeProfile(doc, row);
  if (!merged) return { data: null, error };
  const wanted = columns
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const data: ProfileRecord = {};
  for (const key of wanted) data[key] = merged[key];
  return { data, error: null };
}

// ── Writes (Firestore authoritative + legacy mirror) ────────────────────────

export async function upsertProfileFields(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  return writePartitioned(userId, fields, "upsert");
}

export async function updateProfileFields(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  return writePartitioned(userId, fields, "update");
}

/** Username uniqueness lives on the Postgres unique index. */
export async function findProfileIdByUsername(
  username: string,
  exceptUserId?: string,
): Promise<{ id: string } | null | "missing"> {
  let query = getAdminClient().from("profiles").select("id").eq("username", username);
  if (exceptUserId) query = query.neq("id", exceptUserId);
  const { data, error } = await query.maybeSingle();
  if (error) {
    if (isMissingTable(error)) return "missing";
    throw error;
  }
  return (data as { id: string } | null) ?? null;
}

// ── Premium requests (unchanged — stays on Supabase) ───────────────────────

export async function listPremiumRequests(
  userId: string,
  limit = 5,
): Promise<{ data: Array<Record<string, unknown>>; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("premium_requests")
    .select("id, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return { data: (data as Array<Record<string, unknown>> | null) ?? [], error };
}

export async function findPendingPremiumRequest(
  userId: string,
): Promise<{ data: { id: string } | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("premium_requests")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "PENDING")
    .maybeSingle();
  return { data: (data as { id: string } | null) ?? null, error };
}

export async function insertPremiumRequest(row: {
  user_id: string;
  message: string | null;
  status: string;
}): Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("premium_requests")
    .insert(row)
    .select("id, status")
    .single();
  return { data: (data as Record<string, unknown> | null) ?? null, error };
}
