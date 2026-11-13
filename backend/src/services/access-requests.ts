import { supabaseAdmin } from "../db/supabase";
import { logger } from "../lib/logger.js";
import { getRealtimeStore } from "../storage/index.js";

export type AccessRequestRow = {
  id: string;
  user_id: string;
  status: "pending" | "approved" | "expired";
  fcm_token: string | null;
  deep_link: string;
};

async function mirrorSettled(
  label: string,
  tasks: Array<Promise<unknown>>,
): Promise<void> {
  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      logger.warn(`[access-requests] ${label} mirror failed`, {
        detail: result.reason instanceof Error ? result.reason.message : result.reason,
      });
    }
  }
}

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
  const realtime = getRealtimeStore();

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
      await mirrorSettled("fcm-update", [
        realtime.upsertFcmToken(userId, fcmToken, { requestId: updated.id }),
        realtime.upsertAccessSession({
          requestId: updated.id,
          userId,
          status: updated.status,
        }),
      ]);
      return updated as AccessRequestRow;
    }
    await mirrorSettled("existing-session", [
      realtime.upsertAccessSession({
        requestId: existing.id,
        userId,
        status: existing.status,
      }),
    ]);
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

  if (insertErr || !inserted) {
    console.error(
      "[access-requests] insert failed:",
      insertErr?.message ?? "no row returned",
    );
    return null;
  }
  const mirrors: Array<Promise<unknown>> = [
    realtime.upsertAccessSession({
      requestId: inserted.id,
      userId,
      status: inserted.status,
      requestedAt: new Date().toISOString(),
    }),
  ];
  if (fcmToken) {
    mirrors.unshift(realtime.upsertFcmToken(userId, fcmToken, { requestId: inserted.id }));
  }
  await mirrorSettled("insert", mirrors);
  return inserted as AccessRequestRow;
}

/** Attach / refresh the device FCM token on the latest open request. */
export async function saveFcmTokenForUser(
  userId: string,
  fcmToken: string,
  opts?: { deepLink?: string },
): Promise<AccessRequestRow | null> {
  const token = fcmToken.trim();
  if (!token) return null;
  return ensureAccessRequest(userId, { fcmToken: token, deepLink: opts?.deepLink });
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
