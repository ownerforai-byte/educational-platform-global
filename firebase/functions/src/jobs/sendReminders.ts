import { ACCESS_BOT } from "../config";
import { sendGuidedPush } from "../fcm";
import { getSupabaseAdmin, type UserAccessRequest } from "../supabase";

function minutesFromNowIso(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

function minutesAgoIso(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

/**
 * Expiry warnings + one onboarding guidance tip while access is live.
 */
export async function sendReminders(): Promise<{
  reminders: number;
  guidance: number;
  errors: number;
}> {
  const db = getSupabaseAdmin();
  const nowIso = new Date().toISOString();
  const reminderHorizon = minutesFromNowIso(ACCESS_BOT.reminderBeforeExpiryMinutes);
  const guidanceCutoff = minutesAgoIso(ACCESS_BOT.guidanceAfterApprovalMinutes);

  let reminders = 0;
  let guidance = 0;
  let errors = 0;

  const { data: dueReminders, error: remErr } = await db
    .from("user_access_requests")
    .select("*")
    .eq("status", "approved")
    .is("reminder_sent_at", null)
    .gt("expires_at", nowIso)
    .lte("expires_at", reminderHorizon)
    .limit(100);

  if (remErr) throw remErr;

  for (const row of (dueReminders ?? []) as UserAccessRequest[]) {
    if (!row.fcm_token) {
      await db
        .from("user_access_requests")
        .update({ reminder_sent_at: nowIso })
        .eq("id", row.id);
      continue;
    }
    try {
      await sendGuidedPush(row.fcm_token, {
        kind: "reminder",
        requestId: row.id,
        deepLink: row.deep_link || "/home/member",
        title: "Access ending soon",
        body: `Less than ${ACCESS_BOT.reminderBeforeExpiryMinutes} minutes left. Finish your current topic or open Verner now.`,
      });
      await db
        .from("user_access_requests")
        .update({ reminder_sent_at: nowIso, last_error: null })
        .eq("id", row.id);
      reminders += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "FCM send failed";
      await db
        .from("user_access_requests")
        .update({ last_error: message })
        .eq("id", row.id);
      errors += 1;
    }
  }

  const { data: dueGuidance, error: guideErr } = await db
    .from("user_access_requests")
    .select("*")
    .eq("status", "approved")
    .is("guidance_sent_at", null)
    .lte("approved_at", guidanceCutoff)
    .gt("expires_at", nowIso)
    .limit(100);

  if (guideErr) throw guideErr;

  for (const row of (dueGuidance ?? []) as UserAccessRequest[]) {
    if (!row.fcm_token) {
      await db
        .from("user_access_requests")
        .update({ guidance_sent_at: nowIso })
        .eq("id", row.id);
      continue;
    }
    try {
      await sendGuidedPush(row.fcm_token, {
        kind: "guidance",
        requestId: row.id,
        deepLink: "/onboarding",
        title: "Study tip from Verner",
        body: "Pick one subject goal, then open Notes → unit → topic. Tap to continue guided setup.",
      });
      await db
        .from("user_access_requests")
        .update({ guidance_sent_at: nowIso, last_error: null })
        .eq("id", row.id);
      guidance += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "FCM send failed";
      await db
        .from("user_access_requests")
        .update({ last_error: message })
        .eq("id", row.id);
      errors += 1;
    }
  }

  return { reminders, guidance, errors };
}
