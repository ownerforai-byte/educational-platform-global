"use client";

import { apiFetch } from "@/lib/api-client";
import { readStatusToken } from "@/features/auth/pending-signup-identity";
import {
  isFirebaseWebConfigured,
  readFcmVapidKey,
  readFirebaseWebConfig,
} from "./config";

/* ------------------------------------------------------------------ *
 * Results
 * ------------------------------------------------------------------ */

/** Stable machine-readable failure reasons (safe to branch on / log). */
export type FcmFailureReason =
  | "not-browser"
  | "fcm-not-configured"
  | "missing-vapid-key"
  | "unsupported"
  | "permission-denied"
  | "permission-dismissed"
  | "permission-request-failed"
  | "messaging-unavailable"
  | "sdk-load-failed"
  | "sw-register-failed"
  | "token-fetch-failed"
  | "empty-token"
  | "save-failed"
  | "unexpected-error";

/** Explicit registration result (`registerFcmToken`). */
export type FcmRegisterResult =
  | { ok: true; token: string; requestId?: string; status?: string }
  | { ok: false; reason: string };

/**
 * Quiet change-detection result (`syncFcmToken`). `changed` is true when the
 * device token (or the stored deep link / status token) drifted and the new
 * value was re-registered with the backend.
 */
export type FcmSyncResult =
  | { ok: true; token: string; changed: boolean }
  | { ok: false; reason: string };

export type FcmPermissionState =
  | "granted"
  | "denied"
  | "dismissed"
  | "unsupported"
  | "request-failed";

/* ------------------------------------------------------------------ *
 * Registration cache (last value successfully stored via the API)
 * ------------------------------------------------------------------ */

export type FcmRegistrationCache = {
  token: string;
  deepLink: string | null;
  statusToken: string | null;
  requestId?: string;
  status?: string;
  registeredAt: number;
};

const CACHE_KEY = "neb_fcm_registration";

/** Last successfully registered token — the baseline for change detection. */
export function readFcmRegistrationCache(): FcmRegistrationCache | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FcmRegistrationCache> | null;
    if (!parsed || typeof parsed.token !== "string" || !parsed.token) return null;
    return {
      token: parsed.token,
      deepLink: typeof parsed.deepLink === "string" ? parsed.deepLink : null,
      statusToken: typeof parsed.statusToken === "string" ? parsed.statusToken : null,
      requestId: typeof parsed.requestId === "string" ? parsed.requestId : undefined,
      status: typeof parsed.status === "string" ? parsed.status : undefined,
      registeredAt: typeof parsed.registeredAt === "number" ? parsed.registeredAt : 0,
    };
  } catch {
    return null;
  }
}

function writeFcmRegistrationCache(entry: FcmRegistrationCache): void {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    /* private mode / quota — change detection simply degrades to re-registering */
  }
}

/** Call on sign-out so the next user re-registers instead of being skipped. */
export function clearFcmRegistrationCache(): void {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ *
 * Service worker
 * ------------------------------------------------------------------ */

function encodeConfigQuery(): string | null {
  const config = readFirebaseWebConfig();
  if (!config) return null;
  const json = JSON.stringify(config);
  const b64 = btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return b64;
}

/**
 * Register the dedicated messaging SW (public web config injected via `?cfg=`,
 * base64url JSON — matches `public/firebase-messaging-sw.js`). The dedicated
 * SW keeps the PWA cache SW independent. Re-registering is idempotent and lets
 * the browser pick up SW updates.
 */
function registerMessagingServiceWorker(): Promise<ServiceWorkerRegistration> {
  const cfg = encodeConfigQuery();
  const swUrl = cfg
    ? `/firebase-messaging-sw.js?cfg=${encodeURIComponent(cfg)}`
    : "/firebase-messaging-sw.js";
  return navigator.serviceWorker.register(swUrl, {
    scope: "/firebase-cloud-messaging-push-scope",
  });
}

/* ------------------------------------------------------------------ *
 * Permission + token
 * ------------------------------------------------------------------ */

function logDetail(context: string, err: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[fcm] ${context}`, err);
  }
}

/**
 * Resolve notification permission. Prompts only when `request` is not false
 * and the current state is "default" (never re-prompts after denial).
 */
export async function ensureNotificationPermission(
  opts?: { request?: boolean },
): Promise<FcmPermissionState> {
  if (
    typeof window === "undefined" ||
    !("Notification" in window) ||
    !("serviceWorker" in navigator)
  ) {
    return "unsupported";
  }
  try {
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";
    if (opts?.request === false) return "dismissed";
    const result = await Notification.requestPermission();
    if (result === "granted") return "granted";
    return result === "denied" ? "denied" : "dismissed";
  } catch {
    // e.g. Safari requiring a user gesture for requestPermission()
    return "request-failed";
  }
}

function permissionFailureReason(state: FcmPermissionState): FcmFailureReason {
  switch (state) {
    case "denied":
      return "permission-denied";
    case "dismissed":
      return "permission-dismissed";
    case "request-failed":
      return "permission-request-failed";
    case "unsupported":
      return "unsupported";
    default:
      return "permission-denied";
  }
}

/**
 * Fetch the current FCM device token (permission + messaging SW + `getToken`).
 * Does not store anything. By default prompts for permission; pass
 * `requestPermission: false` for quiet background checks (see `syncFcmToken`).
 */
export async function fetchFcmDeviceToken(opts?: {
  requestPermission?: boolean;
}): Promise<{ ok: true; token: string } | { ok: false; reason: FcmFailureReason }> {
  if (typeof window === "undefined") return { ok: false, reason: "not-browser" };
  if (!isFirebaseWebConfigured()) return { ok: false, reason: "fcm-not-configured" };
  const vapidKey = readFcmVapidKey();
  if (!vapidKey) return { ok: false, reason: "missing-vapid-key" };
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return { ok: false, reason: "unsupported" };
  }

  const permission = await ensureNotificationPermission({
    request: opts?.requestPermission !== false,
  });
  if (permission !== "granted") {
    return { ok: false, reason: permissionFailureReason(permission) };
  }

  let getToken: typeof import("firebase/messaging").getToken;
  let getFirebaseMessaging: typeof import("./firebase-app").getFirebaseMessaging;
  try {
    [{ getToken }, { getFirebaseMessaging }] = await Promise.all([
      import("firebase/messaging"),
      import("./firebase-app"),
    ]);
  } catch (err) {
    logDetail("sdk-load-failed", err);
    return { ok: false, reason: "sdk-load-failed" };
  }

  const messaging = await getFirebaseMessaging();
  if (!messaging) return { ok: false, reason: "messaging-unavailable" };

  let registration: ServiceWorkerRegistration;
  try {
    registration = await registerMessagingServiceWorker();
  } catch (err) {
    logDetail("sw-register-failed", err);
    return { ok: false, reason: "sw-register-failed" };
  }

  let token: string;
  try {
    token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
  } catch (err) {
    logDetail("token-fetch-failed", err);
    return { ok: false, reason: "token-fetch-failed" };
  }
  if (!token) return { ok: false, reason: "empty-token" };
  return { ok: true, token };
}

/* ------------------------------------------------------------------ *
 * Store via backend API
 * ------------------------------------------------------------------ */

type PersistInput = {
  token: string;
  deepLink?: string;
  statusToken?: string | null;
};

type PersistOutcome =
  | { ok: true; changed: boolean; requestId?: string; status?: string }
  | { ok: false; reason: FcmFailureReason };

// Registrations are serialized so a "register now" (always stores) and a
// quiet sync (stores only on change) racing each other cannot interleave.
let persistChain: Promise<unknown> = Promise.resolve();

function persistRegistration(input: PersistInput, force: boolean): Promise<PersistOutcome> {
  const run = persistChain.then(() => doPersistRegistration(input, force));
  persistChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function doPersistRegistration(
  input: PersistInput,
  force: boolean,
): Promise<PersistOutcome> {
  const statusToken = input.statusToken ?? readStatusToken();
  const deepLink = input.deepLink ?? null;
  const cached = readFcmRegistrationCache();
  if (
    !force &&
    cached &&
    cached.token === input.token &&
    cached.deepLink === deepLink &&
    cached.statusToken === (statusToken ?? null)
  ) {
    return { ok: true, changed: false, requestId: cached.requestId, status: cached.status };
  }

  try {
    const res = await apiFetch<{ ok: boolean; requestId?: string; status?: string }>(
      "/api/access-requests/fcm",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fcmToken: input.token,
          ...(statusToken ? { statusToken } : {}),
          ...(deepLink ? { deepLink } : {}),
        }),
      },
    );
    writeFcmRegistrationCache({
      token: input.token,
      deepLink,
      statusToken: statusToken ?? null,
      requestId: res?.requestId,
      status: res?.status,
      registeredAt: Date.now(),
    });
    return { ok: true, changed: true, requestId: res?.requestId, status: res?.status };
  } catch (err) {
    logDetail("save-failed", err);
    return { ok: false, reason: "save-failed" };
  }
}

/* ------------------------------------------------------------------ *
 * Public entry points
 * ------------------------------------------------------------------ */

/**
 * Ask for notification permission, fetch the FCM device token, and POST it to
 * `/api/access-requests/fcm` (session cookie or pending statusToken). Always
 * stores (re-)registers so a fresh sign-in refreshes the server-side record.
 * Never throws — every failure is a `{ ok: false, reason }` result.
 */
export async function registerFcmToken(opts?: {
  deepLink?: string;
  statusToken?: string | null;
}): Promise<FcmRegisterResult> {
  try {
    const fetched = await fetchFcmDeviceToken({ requestPermission: true });
    if (!fetched.ok) return { ok: false, reason: fetched.reason };
    const persisted = await persistRegistration(
      {
        token: fetched.token,
        deepLink: opts?.deepLink,
        statusToken: opts?.statusToken,
      },
      true,
    );
    if (!persisted.ok) return { ok: false, reason: persisted.reason };
    return {
      ok: true,
      token: fetched.token,
      requestId: persisted.requestId,
      status: persisted.status,
    };
  } catch {
    return { ok: false, reason: "unexpected-error" };
  }
}

/**
 * Quiet token-refresh sync: re-fetches the current token with `getToken`
 * (which reflects any FCM token rotation) and re-registers it only when it —
 * or the stored deep link / status token — changed since the last successful
 * registration. Never prompts for permission and never throws.
 */
export async function syncFcmToken(opts?: {
  deepLink?: string;
  statusToken?: string | null;
}): Promise<FcmSyncResult> {
  try {
    const fetched = await fetchFcmDeviceToken({ requestPermission: false });
    if (!fetched.ok) return { ok: false, reason: fetched.reason };
    const persisted = await persistRegistration(
      {
        token: fetched.token,
        deepLink: opts?.deepLink,
        statusToken: opts?.statusToken,
      },
      false,
    );
    if (!persisted.ok) return { ok: false, reason: persisted.reason };
    return { ok: true, token: fetched.token, changed: persisted.changed };
  } catch {
    return { ok: false, reason: "unexpected-error" };
  }
}
