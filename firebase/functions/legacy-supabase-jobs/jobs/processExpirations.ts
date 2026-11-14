import { sendGuidedPush } from "../fcm";
import { getSupabaseAdmin, type UserAccessRequest } from "../supabase";

/**
 * Expire approved windows past expires_at and re-pend the profile.
 */
export async function processExpirations(): Promise<{ expired: number; errors: number }> {
  const db = getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data, error } = await db
    .from("user_access_requests")
    .select("*")
    .eq("status", "approved")
    .lte("expires_at", nowIso)
    .order("expires_at", { ascending: true })
    .limit(100);

  if (error) throw error;

  const rows = (data ?? []) as UserAccessRequest[];
  let expired = 0;
  let errors = 0;

  for (const row of rows) {
    const { error: updErr } = await db
      .from("user_access_requests")
      .update({ status: "expired", last_error: null })
      .eq("id", row.id)
      .eq("status", "approved");

    if (updErr) {
      errors += 1;
      continue;
    }

    // Only revoke if no newer approved window is still active for this user.
    const { data: stillActive } = await db
      .from("user_access_requests")
      .select("id")
      .eq("user_id", row.user_id)
      .eq("status", "approved")
      .gt("expires_at", nowIso)
      .limit(1);

    if (!stillActive?.length) {
      await db
        .from("profiles")
        .update({ access_status: "PENDING" })
        .eq("id", row.user_id)
        .eq("access_status", "ACTIVE");
    }

    if (row.fcm_token) {
      try {
        await sendGuidedPush(row.fcm_token, {
          kind: "expired",
          requestId: row.id,
          deepLink: "/welcome",
          title: "Access window ended",
          body: "Your timed access expired. Open Verner and request access again to continue.",
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

    expired += 1;
  }

  return { expired, errors };
}
