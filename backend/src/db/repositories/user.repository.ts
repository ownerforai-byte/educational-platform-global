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
    .select("role, premium_status, access_status")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}
