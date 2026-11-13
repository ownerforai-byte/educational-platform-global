import { supabaseAdmin } from "../db/supabase";
import { upsertAccessSession, upsertFcmTokenDoc } from "../storage/firebase-store";

export type AccessRequestRow = {
  id: string;
  user_id: string;
  status: "pending" | "approved" | "expired";
  fcm_token: string | null;
  deep_link: string;
};

/**
 * Ensure the user has an open timed-access request.
 * - Reuses the latest pending/approved row when one exists.
 * - Otherwise inserts a fresh pending row (starts the 5-minute clock).
 */
export async function ensureAccessRequest(
  userId: string,
  opts?: { fcmToken?: string | null; deepLink?: string },
): Promise<AccessRequestRow | null> {
  const deepLink = opts?.deepLink ?? "/home/member";
  const fcmToken = opts?.fcmToken?.trim() || null;

  const { data: existing, error: readErr } = await supabaseAdmin
    .from("user_access_requests")
    .select("id, user_id, status, fcm_token, deep_link")
    .eq("user_id", userId)
    .in("status", ["pending", "approved"])
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readErr) {
    console.error("[access-requests] read failed:", readErr.message);
    return null;
  }

  if (existing) {
    if (fcmToken && fcmToken !== existing.fcm_token) {
      const { data: updated, error: updErr } = await supabaseAdmin
        .from("user_access_requests")
        .update({ fcm_token: fcmToken })
        .eq("id", existing.id)
        .select("id, user_id, status, fcm_token, deep_link")
        .single();
      if (updErr) {
        console.error("[access-requests] fcm update failed:", updErr.message);
        return existing as AccessRequestRow;
      }
      // Tier 2 mirror — Firestore (best-effort).
      void upsertFcmTokenDoc(userId, fcmToken, { requestId: updated.id });
      void upsertAccessSession({
        requestId: updated.id,
        userId,
        status: updated.status,
      });
      return updated as AccessRequestRow;
    }
    void upsertAccessSession({
      requestId: existing.id,
      userId,
      status: existing.status,
    });
    return existing as AccessRequestRow;
  }

  const { data: inserted, error: insertErr } = await supabaseAdmin
    .from("user_access_requests")
    .insert({
      user_id: userId,
      status: "pending",
      fcm_token: fcmToken,
      deep_link: deepLink,
    })
    .select("id, user_id, status, fcm_token, deep_link")
    .single();

  if (insertErr) {
    console.error("[access-requests] insert failed:", insertErr.message);
    return null;
  }
  if (fcmToken) {
    void upsertFcmTokenDoc(userId, fcmToken, { requestId: inserted.id });
  }
  void upsertAccessSession({
    requestId: inserted.id,
    userId,
    status: inserted.status,
    requestedAt: new Date().toISOString(),
  });
  return inserted as AccessRequestRow;
}

/** Attach / refresh the device FCM token on the latest open request. */
export async function saveFcmTokenForUser(
  userId: string,
  fcmToken: string,
): Promise<AccessRequestRow | null> {
  const token = fcmToken.trim();
  if (!token) return null;
  return ensureAccessRequest(userId, { fcmToken: token });
}

/**
 * Owner permanent approval: close open bot windows so the expiry job cannot
 * later flip the profile back to PENDING.
 */
export async function cancelOpenAccessRequests(userId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("user_access_requests")
    .update({ status: "expired", expires_at: new Date().toISOString() })
    .eq("user_id", userId)
    .in("status", ["pending", "approved"]);
  if (error) {
    console.error("[access-requests] cancel open failed:", error.message);
  }
}
