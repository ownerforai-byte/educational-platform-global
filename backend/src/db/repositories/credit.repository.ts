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

export async function readCreditsWatermark(
  userId: string,
): Promise<{ credits: number; credits_reset_date: string | null } | null> {
  const { data } = await getAdminClient()
    .from("profiles")
    .select("credits, credits_reset_date")
    .eq("id", userId)
    .maybeSingle();
  return data ?? null;
}

/**
 * Compare-and-swap balance write. When `selectCredits` is true, returns the
 * post-update credits row on match (for spend/refund callers).
 */
export async function casUpdateCredits(
  userId: string,
  expectedCredits: number,
  nextCredits: number,
  resetDate?: string,
  selectCredits = false,
): Promise<{
  matched: boolean;
  credits: number | null;
  error: { message: string } | null;
}> {
  const updatePayload = {
    credits: nextCredits,
    ...(resetDate !== undefined ? { credits_reset_date: resetDate } : {}),
  };

  if (selectCredits) {
    const { data, error } = await getAdminClient()
      .from("profiles")
      .update(updatePayload)
      .eq("id", userId)
      .eq("credits", expectedCredits)
      .select("credits")
      .maybeSingle();
    if (error) return { matched: false, credits: null, error };
    if (data == null) return { matched: false, credits: null, error: null };
    return { matched: true, credits: (data.credits as number | undefined) ?? nextCredits, error: null };
  }

  const { data, error } = await getAdminClient()
    .from("profiles")
    .update(updatePayload)
    .eq("id", userId)
    .eq("credits", expectedCredits)
    .select("id");
  const matched = Array.isArray(data) ? data.length > 0 : data != null;
  return { matched, credits: matched ? nextCredits : null, error };
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

export async function listCreditTransactions(
  userId: string,
  limit = 50,
): Promise<{ data: Array<Record<string, unknown>>; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return { data: (data as Array<Record<string, unknown>> | null) ?? [], error };
}
