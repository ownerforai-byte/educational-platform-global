import { getAdminClient } from "./base.repository.js";

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

export async function getProfileCreditRow(userId: string): Promise<ProfileCreditRow | null> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("credits, credits_reset_date, premium_status, role")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}

export async function getProfileAccessRow(userId: string): Promise<ProfileAccessRow | null> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("role, access_status")
    .eq("id", userId)
    .maybeSingle();
  return data
    ? {
        role: data.role ?? null,
        access_status: data.access_status ?? null,
        premium_status: null,
      }
    : null;
}

/** Auth gate row for credit middleware (includes premium_status). */
export async function getProfileGateRow(userId: string): Promise<ProfileAccessRow | null> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("role, premium_status, access_status")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}

export async function getProfileFullName(userId: string): Promise<string | null> {
  const { data, error } = await getAdminClient()
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();
  if (error) return null;
  const name = data?.full_name;
  return typeof name === "string" && name.trim() ? name.trim() : null;
}

export async function getProfilePlanRow(
  userId: string,
): Promise<{
  plan: string | null;
  premium_status: boolean | null;
  /** True when the `plan` column is missing (migration 008 not applied). */
  planColumnMissing: boolean;
} | null> {
  const { data, error } = await getAdminClient()
    .from("profiles")
    .select("plan, premium_status")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    const { data: legacy } = await getAdminClient()
      .from("profiles")
      .select("premium_status")
      .eq("id", userId)
      .maybeSingle();
    if (!legacy) return null;
    return {
      plan: null,
      premium_status: legacy.premium_status === true,
      planColumnMissing: true,
    };
  }
  if (!data) return null;
  return {
    plan: typeof data.plan === "string" ? data.plan : null,
    premium_status: data.premium_status === true,
    planColumnMissing: false,
  };
}

export async function upsertProfileFields(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  const { error } = await getAdminClient().from("profiles").upsert({ id: userId, ...fields });
  return { error };
}

export async function updateProfileFields(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  const { error } = await getAdminClient().from("profiles").update(fields).eq("id", userId);
  return { error };
}

export async function getProfileById(
  userId: string,
  columns: string,
): Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("profiles")
    .select(columns)
    .eq("id", userId)
    .maybeSingle();
  return { data: (data as Record<string, unknown> | null) ?? null, error };
}

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
