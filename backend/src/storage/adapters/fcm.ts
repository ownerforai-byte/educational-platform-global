import { createRequire } from "node:module";
import type { NotificationSender } from "../ports.js";
import {
  ensureFirebaseAdmin,
  getFirestore,
  isFirebaseAdminConfigured,
} from "../firebase-admin.js";
import { upsertFcmTokenDoc } from "../firebase-store.js";
import { PUBLIC_SITE_URL } from "../../config/env.js";
import { logger } from "../../lib/logger.js";

/**
 * FCM sender port + shared push contract helpers.
 *
 * Firestore `fcm_tokens` contract (doc id = the user's uid):
 * `{ userId, token, platform?, createdAt, updatedAt }` — written by the client
 * via POST /api/access-requests/fcm (→ firebase-store.upsertFcmTokenDoc) and
 * read here / in `firebase/functions/src/fcm.ts` to target a user.
 *
 * The send path mirrors `firebase/functions/src/fcm.ts` — keep the two in
 * sync: `admin.messaging().send({ token, notification, data })`, per-token
 * failure isolation, and dead-token removal from `fcm_tokens`.
 */

export const FCM_TOKENS_COLLECTION = "fcm_tokens";

/** Reusable send input — target by uid (token(s) read from `fcm_tokens`) and/or explicit token(s). */
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

/** Widened port: token read/upsert + the contract send entry point. */
export interface FcmNotificationSender extends NotificationSender {
  /** Read the live FCM token for a uid from `fcm_tokens` (null when absent/empty). */
  readToken(userId: string): Promise<string | null>;
  /**
   * Contract upsert: `{ userId, token, platform?, createdAt, updatedAt }`.
   * `createdAt` is set on first write and preserved afterwards; pass
   * `platform` (e.g. "web") via `extra`.
   */
  upsertToken(
    userId: string,
    token: string,
    extra?: Record<string, unknown>,
  ): Promise<void>;
  sendPush(input: FcmSendInput): Promise<FcmSendResult>;
}

/* Minimal structural typings for the raw firebase-admin module. The repo's
 * bootstrap shim (../firebase-admin.js) handles credentials/init; messaging()
 * and Firestore queries/deletes are accessed through this handle so the
 * Admin send path matches the Cloud Functions sender exactly. */
type AdminMessagingHandle = {
  send: (message: Record<string, unknown>) => Promise<string>;
};
type AdminQueryDocSnap = {
  id: string;
  data: () => Record<string, unknown>;
  ref: { delete: () => Promise<void> };
};
type AdminQuerySnap = { empty: boolean; docs: AdminQueryDocSnap[] };
type AdminDbHandle = {
  collection: (name: string) => {
    where: (
      field: string,
      op: string,
      value: unknown,
    ) => { get: () => Promise<AdminQuerySnap> };
  };
};
type AdminModuleHandle = {
  messaging: (app?: unknown) => AdminMessagingHandle;
  firestore: (app?: unknown) => AdminDbHandle;
};

const require = createRequire(import.meta.url);

function getAdminSendHandles(): {
  messaging: AdminMessagingHandle;
  db: AdminDbHandle;
} {
  const app = ensureFirebaseAdmin();
  if (!app) {
    throw new Error(
      "Firebase Admin is not configured — set FIREBASE_SERVICE_ACCOUNT_PATH / FIREBASE_SERVICE_ACCOUNT_JSON / FIREBASE_PROJECT_ID+CLIENT_EMAIL+PRIVATE_KEY",
    );
  }
  const adminModule = require("firebase-admin") as AdminModuleHandle;
  return {
    messaging: adminModule.messaging(app),
    db: adminModule.firestore(app),
  };
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
 * deepLink when present. Relative paths resolve against PUBLIC_SITE_URL so
 * `webpush.fcmOptions.link` is a valid absolute URL.
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
  if (value.startsWith("/")) return `${PUBLIC_SITE_URL}${value}`;
  return undefined;
}

/** Read `fcm_tokens/{uid}` raw doc (null when missing or Admin unconfigured). */
async function readTokenDoc(
  userId: string,
): Promise<Record<string, unknown> | null> {
  const db = getFirestore();
  if (!db) return null;
  try {
    const snap = await db.collection(FCM_TOKENS_COLLECTION).doc(userId).get();
    return snap.exists ? (snap.data() ?? null) : null;
  } catch (err) {
    logger.warn("[fcm] readToken failed", {
      userId,
      detail: errorMessageOf(err),
    });
    return null;
  }
}

async function readToken(userId: string): Promise<string | null> {
  const doc = await readTokenDoc(userId);
  const token = doc?.token;
  if (typeof token !== "string") return null;
  const trimmed = token.trim();
  return trimmed ? trimmed : null;
}

/**
 * Contract upsert via the same writer the API uses
 * (firebase-store.upsertFcmTokenDoc), backfilling `createdAt` on first write.
 */
async function upsertToken(
  userId: string,
  token: string,
  extra?: Record<string, unknown>,
): Promise<void> {
  const trimmed = token.trim();
  if (!trimmed) throw new Error("fcm upsertToken: empty token");
  const existing = await readTokenDoc(userId);
  const existingCreatedAt = existing?.createdAt;
  const createdAt =
    typeof existingCreatedAt === "string" && existingCreatedAt
      ? existingCreatedAt
      : new Date().toISOString();
  await upsertFcmTokenDoc(userId, trimmed, { createdAt, ...(extra ?? {}) });
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
    const { db } = getAdminSendHandles();
    const snap = await db
      .collection(FCM_TOKENS_COLLECTION)
      .where("token", "==", token)
      .get();
    if (snap.empty) return false;
    const victims = snap.docs.filter((doc) => doc.data().token === token);
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
  message: Record<string, unknown>,
): Promise<FcmTokenSendResult> {
  try {
    const { messaging } = getAdminSendHandles();
    const messageId = await messaging.send(message);
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
 * Same contract as `firebase/functions/src/fcm.ts#sendPush`:
 * `admin.messaging().send({ token, notification: { title, body }, data: payload })`,
 * per-token failures never abort the batch, invalid/unregistered tokens are
 * removed from `fcm_tokens`. Throws only when Firebase Admin is not configured.
 */
async function sendPush(input: FcmSendInput): Promise<FcmSendResult> {
  const explicit = Array.isArray(input.tokens)
    ? input.tokens
    : input.tokens
      ? [input.tokens]
      : [];
  const resolved: string[] = [];
  if (input.uid) {
    const token = await readToken(input.uid);
    if (token) resolved.push(token);
  }
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

  // Fail fast on setup problems before touching the batch.
  getAdminSendHandles();

  const data = toDataPayload(input.payload);
  const link = resolveLink(input.payload);

  const results = await Promise.all(
    tokens.map((token) => {
      const message: Record<string, unknown> = {
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

export const fcmNotificationSender: FcmNotificationSender = {
  isConfigured: () => isFirebaseAdminConfigured(),
  readToken,
  upsertToken,
  sendPush,
};
