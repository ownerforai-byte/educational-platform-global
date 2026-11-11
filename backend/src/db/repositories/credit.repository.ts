import { getAdminClient } from "./base.repository.js";
import type { ProfileCreditRow } from "./user.repository.js";

export async function readProfileCredits(userId: string): Promise<ProfileCreditRow | null> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("credits, credits_reset_date, premium_status, role")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}

export async function readCreditsBalance(userId: string): Promise<number> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .maybeSingle();
  return data?.credits ?? 0;
}

export async function casUpdateCredits(
  userId: string,
  expectedCredits: number,
  nextCredits: number,
  resetDate?: string,
): Promise<{ matched: boolean; error: { message: string } | null }> {
  let query = getAdminClient()
    .from("profiles")
    .update({
      credits: nextCredits,
      ...(resetDate !== undefined ? { credits_reset_date: resetDate } : {}),
    })
    .eq("id", userId)
    .eq("credits", expectedCredits)
    .select("id");

  const { data, error } = await query;
  const matched = Array.isArray(data) ? data.length > 0 : data != null;
  return { matched, error };
}

export async function insertCreditTransaction(row: {
  user_id: string;
  amount: number;
  type: "GRANT" | "SPEND";
  reason: string;
}): Promise<{ error: { message: string } | null }> {
  const { error } = await getAdminClient().from("credit_transactions").insert(row);
  return { error };
}
