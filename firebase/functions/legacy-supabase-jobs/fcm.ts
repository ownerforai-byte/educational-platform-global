import * as admin from "firebase-admin";
import type { Message } from "firebase-admin/messaging";
import { logger } from "firebase-functions";
import { ACCESS_BOT } from "./config";
import { getFirestoreAdmin } from "./firestore";

if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Firestore collection holding per-user FCM device tokens — shared push
 * contract. Doc id = the user's uid: `{ userId, token, platform?, createdAt,
 * updatedAt }`. The client writes these (POST /api/access-requests/fcm →
 * backend Firestore mirror); this sender reads them to target a user.
 */
export const FCM_TOKENS_COLLECTION = "fcm_tokens";

export interface GuidedPush {
  title: string;
  body: string;
  /** In-app path, e.g. /home/member or /welcome */
  deepLink: string;
  kind: "approved" | "reminder" | "guidance" | "expired";
  requestId: string;
}

/**
 * Reusable send input — target a user by uid (token(s) read from
 * `fcm_tokens`) and/or explicit device token(s). Title/body/payload are
 * provided by the caller; payload is delivered as the FCM `data` map.
 */
export interface FcmSendInput {
  /** Firebase uid — resolved against `fcm_tokens/{uid}`. */
  uid?: string;
  /** Explicit device token(s), merged with the uid-resolved ones. */
  tokens?: string | string[];
  title: string;
  body: string;
  /** Extra data delivered as the FCM `data` payload (values coerced to string). */
  payload?: Record<string, string | number | boolean>;
}

export interface FcmTokenSendResult {
  token: string;
  ok: boolean;
  messageId?: string;
  errorCode?: string;
  /** True when the dead token was removed from `fcm_tokens`. */
  removedToken?: boolean;
}

export interface FcmSendResult {
  successCount: number;
  failureCount: number;
  results: FcmTokenSendResult[];
}

/** Error codes that mean the device token itself is dead (never deliverable). */
const DEAD_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

function errorCodeOf(err: unknown): string | undefined {
  const code = (err as { code?: unknown } | null)?.code;
  return typeof code === "string" ? code : undefined;
}

function errorMessageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * `messaging/invalid-argument` is ambiguous (bad token OR bad message), so for
 * that code only treat it as a dead token when the message names the token.
 */
function isDeadTokenError(err: unknown): boolean {
  const code = errorCodeOf(err);
  if (code && DEAD_TOKEN_CODES.has(code)) return true;
  if (code === "messaging/invalid-argument") {
    return /token/i.test(errorMessageOf(err));
  }
  return false;
}

/** Mask a token for logs — never log full device tokens. */
function maskToken(token: string): string {
  return token.length <= 12 ? "***" : `${token.slice(0, 8)}…${token.slice(-4)}`;
}

/** Coerce caller payload values to the strings FCM `data` requires. */
function toDataPayload(
  payload?: Record<string, string | number | boolean>,
): Record<string, string> {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload ?? {})) {
    if (value === undefined || value === null) continue;
    data[key] =
      typeof value === "string"
        ? value
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
  }
  return data;
}

/**
 * Absolute URL for clickable notifications: uses payload.url / click_action /
 * deepLink when present. Relative paths are resolved against the site origin
 * so `webpush.fcmOptions.link` is a valid absolute URL.
 */
function resolveLink(
  payload?: Record<string, string | number | boolean>,
): string | undefined {
  const raw =
    (payload?.url as string | undefined) ??
    (payload?.click_action as string | undefined) ??
    (payload?.deepLink as string | undefined);
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${ACCESS_BOT.siteUrl}${value}`;
  return undefined;
}

/**
 * Read the target token(s) for a uid from `fcm_tokens/{uid}`. Accepts both the
 * contract `token` field and a defensive `tokens` array extension. Returns an
 * empty array when the doc is missing or holds no live token.
 */
async function readTokensForUid(uid: string): Promise<string[]> {
  const snap = await getFirestoreAdmin()
    .collection(FCM_TOKENS_COLLECTION)
    .doc(uid)
    .get();
  if (!snap.exists) return [];
  const data = snap.data() ?? {};
  const tokens: string[] = [];
  if (typeof data.token === "string" && data.token.trim()) {
    tokens.push(data.token.trim());
  }
  if (Array.isArray(data.tokens)) {
    for (const t of data.tokens) {
      if (typeof t === "string" && t.trim()) tokens.push(t.trim());
    }
  }
  return [...new Set(tokens)];
}

/**
 * Remove a dead token from `fcm_tokens`. Only deletes docs whose stored token
 * still equals the failed one, so a client-refreshed token is never clobbered.
 * Best-effort: cleanup failures are logged, never thrown.
 */
async function removeDeadToken(
  token: string,
  errorCode?: string,
): Promise<boolean> {
  try {
    const db = getFirestoreAdmin();
    const snap = await db
      .collection(FCM_TOKENS_COLLECTION)
      .where("token", "==", token)
      .get();
    if (snap.empty) return false;
    const victims = snap.docs.filter(
      (doc) => (doc.data() as { token?: unknown }).token === token,
    );
    await Promise.all(victims.map((doc) => doc.ref.delete()));
    for (const doc of victims) {
      logger.info("[fcm] removed dead token from fcm_tokens", {
        docId: doc.id,
        token: maskToken(token),
        errorCode: errorCode ?? "unknown",
      });
    }
    return victims.length > 0;
  } catch (err) {
    logger.warn("[fcm] dead-token cleanup failed", {
      token: maskToken(token),
      detail: errorMessageOf(err),
    });
    return false;
  }
}

/** Send to a single token; never throws — failures come back in the result. */
async function sendToToken(
  token: string,
  message: Message,
): Promise<FcmTokenSendResult> {
  try {
    const messageId = await admin.messaging().send(message);
    return { token, ok: true, messageId };
  } catch (err) {
    const errorCode = errorCodeOf(err) ?? "unknown";
    logger.warn("[fcm] send failed", {
      token: maskToken(token),
      errorCode,
      detail: errorMessageOf(err),
    });
    let removedToken = false;
    if (isDeadTokenError(err)) {
      removedToken = await removeDeadToken(token, errorCode);
    }
    return { token, ok: false, errorCode, removedToken };
  }
}

/**
 * Push to a user (uid → `fcm_tokens`) and/or explicit device tokens.
 *
 * - `notification: { title, body }` + `data: payload` per the shared contract;
 *   when the payload carries a URL (`url` / `click_action` / `deepLink`) it is
 *   also set as `webpush.fcmOptions.link` so the notification is clickable.
 * - Per-token failures never abort the batch; invalid/unregistered tokens are
 *   removed from `fcm_tokens`.
 * - Throws only on setup errors (Admin not initialized, `fcm_tokens` read
 *   failure) — those are the caller's to handle.
 */
export async function sendPush(input: FcmSendInput): Promise<FcmSendResult> {
  const explicit = Array.isArray(input.tokens)
    ? input.tokens
    : input.tokens
      ? [input.tokens]
      : [];
  const resolved = input.uid ? await readTokensForUid(input.uid) : [];
  const tokens = [
    ...new Set(
      [...resolved, ...explicit]
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter(Boolean),
    ),
  ];

  if (tokens.length === 0) {
    logger.warn("[fcm] no target tokens — skipping send", {
      uid: input.uid ?? null,
      title: input.title,
    });
    return { successCount: 0, failureCount: 0, results: [] };
  }

  const data = toDataPayload(input.payload);
  const link = resolveLink(input.payload);

  const results = await Promise.all(
    tokens.map((token) => {
      const message: Message = {
        token,
        notification: { title: input.title, body: input.body },
        data,
        ...(link
          ? {
              webpush: {
                fcmOptions: { link },
                notification: {
                  title: input.title,
                  body: input.body,
                  icon: "/icon-192.png",
                  data: Object.assign({ url: link }, data),
                },
              },
            }
          : {}),
      };
      return sendToToken(token, message);
    }),
  );

  const successCount = results.filter((r) => r.ok).length;
  const failureCount = results.length - successCount;
  logger.info("[fcm] sendPush done", {
    uid: input.uid ?? null,
    title: input.title,
    targets: results.length,
    successCount,
    failureCount,
  });
  return { successCount, failureCount, results };
}

/**
 * Send one FCM web/device notification with actionable deep-link data.
 * Throws on failure (job contract: callers record `last_error` and retry);
 * dead tokens are removed from `fcm_tokens` before throwing.
 */
export async function sendGuidedPush(
  token: string,
  push: GuidedPush,
): Promise<string> {
  const link = `${ACCESS_BOT.siteUrl}${push.deepLink.startsWith("/") ? push.deepLink : `/${push.deepLink}`}`;

  const result = await sendToToken(token, {
    token,
    notification: {
      title: push.title,
      body: push.body,
    },
    data: {
      kind: push.kind,
      requestId: push.requestId,
      deepLink: push.deepLink,
      click_action: link,
    },
    webpush: {
      fcmOptions: { link },
      notification: {
        title: push.title,
        body: push.body,
        icon: "/icon-192.png",
        data: {
          kind: push.kind,
          deepLink: push.deepLink,
          url: link,
        },
      },
    },
  });

  if (!result.ok) {
    throw new Error(
      result.removedToken
        ? `FCM send failed (${result.errorCode}) — dead token removed from fcm_tokens`
        : `FCM send failed (${result.errorCode})`,
    );
  }
  return result.messageId ?? "";
}
