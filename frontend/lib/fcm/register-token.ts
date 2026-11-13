"use client";

import { apiFetch } from "@/lib/api-client";
import { readStatusToken } from "@/features/auth/pending-signup-identity";
import { isFcmConfigured, readFcmVapidKey, readFirebaseWebConfig } from "./config";

function encodeConfigQuery(): string | null {
  const config = readFirebaseWebConfig();
  if (!config) return null;
  const json = JSON.stringify(config);
  const b64 = btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return b64;
}

export type FcmRegisterResult =
  | { ok: true; token: string; requestId?: string; status?: string }
  | { ok: false; reason: string };

/**
 * Ask for notification permission, fetch an FCM device token, and POST it
 * to `/api/access-requests/fcm` (session cookie or pending statusToken).
 */
export async function registerFcmToken(opts?: {
  deepLink?: string;
  statusToken?: string | null;
}): Promise<FcmRegisterResult> {
  if (typeof window === "undefined") {
    return { ok: false, reason: "not-browser" };
  }
  if (!isFcmConfigured()) {
    return { ok: false, reason: "fcm-not-configured" };
  }
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return { ok: false, reason: "unsupported" };
  }

  const permission =
    Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();
  if (permission !== "granted") {
    return { ok: false, reason: "permission-denied" };
  }

  const [{ getToken }, { getFirebaseMessaging }] = await Promise.all([
    import("firebase/messaging"),
    import("./firebase-app"),
  ]);
  const messaging = await getFirebaseMessaging();
  const vapidKey = readFcmVapidKey();
  if (!messaging || !vapidKey) {
    return { ok: false, reason: "messaging-unavailable" };
  }

  // Prefer the dedicated messaging SW so the PWA cache SW stays independent.
  const cfg = encodeConfigQuery();
  const swUrl = cfg
    ? `/firebase-messaging-sw.js?cfg=${encodeURIComponent(cfg)}`
    : "/firebase-messaging-sw.js";
  const registration = await navigator.serviceWorker.register(swUrl, {
    scope: "/firebase-cloud-messaging-push-scope",
  });

  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  });
  if (!token) {
    return { ok: false, reason: "empty-token" };
  }

  const statusToken = opts?.statusToken ?? readStatusToken();
  try {
    const res = await apiFetch<{ ok: boolean; requestId?: string; status?: string }>(
      "/api/access-requests/fcm",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fcmToken: token,
          ...(statusToken ? { statusToken } : {}),
          ...(opts?.deepLink ? { deepLink: opts.deepLink } : {}),
        }),
      },
    );
    return {
      ok: true,
      token,
      requestId: res.requestId,
      status: res.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "save-failed";
    return { ok: false, reason: message };
  }
}
