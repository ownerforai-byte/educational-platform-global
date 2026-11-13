import { ACCESS_BOT } from "../config";
import { sendGuidedPush } from "../fcm";
import { getSupabaseAdmin, type UserAccessRequest } from "../supabase";

function minutesAgoIso(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function minutesFromNowIso(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

/**
 * Promote due pending requests → approved, activate the profile, push FCM.
 */
export async function processApprovals(): Promise<{ approved: number; errors: number }> {
  const db = getSupabaseAdmin();
  const dueBefore = minutesAgoIso(ACCESS_BOT.approvalDelayMinutes);

  const { data, error } = await db
    .from("user_access_requests")
    .select("*")
    .eq("status", "pending")
    .lte("requested_at", dueBefore)
    .order("requested_at", { ascending: true })
    .limit(100);

  if (error) throw error;

  const rows = (data ?? []) as UserAccessRequest[];
  let approved = 0;
  let errors = 0;

  for (const row of rows) {
    const approvedAt = new Date().toISOString();
    const expiresAt = minutesFromNowIso(ACCESS_BOT.accessTtlMinutes);
    const deepLink = row.deep_link || "/home/member";

    const { error: updErr } = await db
      .from("user_access_requests")
      .update({
        status: "approved",
        approved_at: approvedAt,
        expires_at: expiresAt,
        last_error: null,
      })
      .eq("id", row.id)
      .eq("status", "pending");

    if (updErr) {
      errors += 1;
      continue;
    }

    // Unlock the existing owner-approval wall so login can issue a session.
    const { error: profileErr } = await db
      .from("profiles")
      .update({ access_status: "ACTIVE" })
      .eq("id", row.user_id)
      .neq("access_status", "REJECTED");

    if (profileErr) {
      await db
        .from("user_access_requests")
        .update({ last_error: profileErr.message })
        .eq("id", row.id);
      errors += 1;
      continue;
    }

    if (row.fcm_token) {
      try {
        await sendGuidedPush(row.fcm_token, {
          kind: "approved",
          requestId: row.id,
          deepLink,
          title: "You're approved — open Verner",
          body: `Access is live for the next ${ACCESS_BOT.accessTtlMinutes} minutes. Tap to sign in and start studying.`,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "FCM send failed";
        await db
          .from("user_access_requests")
          .update({ last_error: message })
          .eq("id", row.id);
        errors += 1;
        continue;
      }
    }

    approved += 1;
  }

  return { approved, errors };
}
