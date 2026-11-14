import { getApps, initializeApp } from "firebase-admin/app";
import {
  getMessaging,
  type Message,
  type Messaging,
} from "firebase-admin/messaging";
import { logger } from "firebase-functions";
import { getFirestoreAdmin } from "./firestore";

/**
 * Firestore collection holding per-user FCM device tokens — shared push
 * contract. Doc id = the user's uid: `{ userId, token, platform?, createdAt,
 * updatedAt }`. The client writes these (registration path); this module
 * reads them to target a user. A defensive `tokens` array on the same doc is
 * also honored so multi-device users all get notified.
 */
export const FCM_TOKENS_COLLECTION = "fcm_tokens";

/** Approval push copy + payload — shared contract with the client. */
export const ACCOUNT_APPROVED_PUSH = {
  title: "Your account is approved 🎉",
  body: "Sign in to start learning.",
  kind: "account_approved",
  deepLink: "/welcome/approved",
} as const;

export interface ApprovalPushTokenResult {
  /** Masked device token — safe for logs/telemetry. */
  maskedToken: string;
  ok: boolean;
  messageId?: string;
  errorCode?: string;
  /** True when this dead token was best-effort removed from `fcm_tokens`. */
  removedToken?: boolean;
}

export interface ApprovalPushResult {
  uid: string;
  /** Unique device tokens resolved from `fcm_tokens/{uid}`. */
  targetCount: number;
  successCount: number;
  failureCount: number;
  /** Dead tokens best-effort removed from `fcm_tokens`. */
  removedCount: number;
  /** True when the uid had no stored token — nothing was sent. */
  skipped: boolean;
  results: ApprovalPushTokenResult[];
}

let messaging: Messaging | null = null;

/** Admin Messaging client — never ship this to the browser. */
function getMessagingAdmin(): Messaging {
  if (messaging) return messaging;
  if (getApps().length === 0) {
    initializeApp();
  }
  messaging = getMessaging();
  return messaging;
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

/**
 * Read the target token(s) for a uid from `fcm_tokens/{uid}`. Accepts both the
 * contract `token` field and a defensive `tokens` array extension. Returns a
 * deduped list; empty when the doc is missing or holds no live token.
 */
async function readTokensForUid(uid: string): Promise<string[]> {
  const snap = await getFirestoreAdmin()
    .collection(FCM_TOKENS_COLLECTION)
    .doc(uid)
    .get();
  if (!snap.exists) return [];
  const data = snap.data() ?? {};
  const tokens: string[] = [];
  const primary = data.token;
  if (typeof primary === "string" && primary.trim()) {
    tokens.push(primary.trim());
  }
  const extra = data.tokens;
  if (Array.isArray(extra)) {
    for (const t of extra) {
      if (typeof t === "string" && t.trim()) tokens.push(t.trim());
    }
  }
  return [...new Set(tokens)];
}

/**
 * Best-effort removal of a dead token from `fcm_tokens/{uid}`, match-guarded
 * inside a transaction: the doc is only mutated while it still stores exactly
 * the failed token value, so a client-refreshed token is never clobbered.
 * When the doc's primary `token` dies but live `tokens` remain, the next live
 * token is promoted; a doc with no live tokens left is deleted.
 */
async function removeDeadToken(
  uid: string,
  token: string,
  errorCode: string,
): Promise<boolean> {
  const db = getFirestoreAdmin();
  const ref = db.collection(FCM_TOKENS_COLLECTION).doc(uid);
  try {
    const removed = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) return false;
      const data = snap.data() ?? {};
      const primary =
        typeof data.token === "string" && data.token.trim()
          ? data.token.trim()
          : null;
      const extra: string[] = Array.isArray(data.tokens)
        ? data.tokens
            .filter((t: unknown): t is string => typeof t === "string" && t.trim().length > 0)
            .map((t: string) => t.trim())
        : [];
      const primaryDead = primary === token;
      const remaining = extra.filter((t) => t !== token);
      // Match guard — the stored token(s) changed since the send (client
      // refreshed/rotated): leave the doc alone.
      if (!primaryDead && remaining.length === extra.length) return false;

      if (primaryDead) {
        const nextPrimary = remaining[0];
        if (nextPrimary === undefined) {
          tx.delete(ref); // The doc's only token is dead.
        } else {
          tx.update(ref, { token: nextPrimary, tokens: remaining.slice(1) });
        }
      } else {
        tx.update(ref, { tokens: remaining });
      }
      return true;
    });
    if (removed) {
      logger.info("fcm: removed dead token from fcm_tokens", {
        uid,
        maskedToken: maskToken(token),
        errorCode,
      });
    }
    return removed;
  } catch (err) {
    logger.warn("fcm: dead-token cleanup failed", {
      uid,
      maskedToken: maskToken(token),
      detail: errorMessageOf(err),
    });
    return false;
  }
}

/** Send to a single token; never throws — failures come back in the result. */
async function sendToToken(
  uid: string,
  token: string,
  message: Message,
): Promise<ApprovalPushTokenResult> {
  const maskedToken = maskToken(token);
  try {
    const messageId = await getMessagingAdmin().send(message);
    return { maskedToken, ok: true, messageId };
  } catch (err) {
    const errorCode = errorCodeOf(err) ?? "unknown";
    logger.warn("fcm: approval push send failed", {
      uid,
      maskedToken,
      errorCode,
      detail: errorMessageOf(err),
    });
    let removedToken = false;
    if (isDeadTokenError(err)) {
      removedToken = await removeDeadToken(uid, token, errorCode);
    }
    return { maskedToken, ok: false, errorCode, removedToken };
  }
}

/**
 * Send the account-approval push to every device token stored for `uid`.
 *
 * Message (shared contract):
 *   notification: { title: "Your account is approved 🎉",
 *                   body: "Sign in to start learning." }
 *   data: { kind: "account_approved", deepLink: "/welcome/approved", userId }
 *
 * - Targets are read from `fcm_tokens/{uid}` (contract `token` + defensive
 *   `tokens` array), trimmed and deduped — all live tokens are notified.
 * - Per-token failures never abort the batch; invalid/unregistered tokens are
 *   best-effort removed from `fcm_tokens`, match-guarded so a refreshed token
 *   is never clobbered. Tokens are logged masked only.
 * - Throws only on setup errors (Admin init, `fcm_tokens` read failure) —
 *   those are the caller's to handle. A uid with no token is a logged no-op.
 */
export async function sendApprovalPush(uid: string): Promise<ApprovalPushResult> {
  const tokens = await readTokensForUid(uid);
  const result: ApprovalPushResult = {
    uid,
    targetCount: tokens.length,
    successCount: 0,
    failureCount: 0,
    removedCount: 0,
    skipped: tokens.length === 0,
    results: [],
  };
  if (tokens.length === 0) {
    logger.warn("fcm: no fcm_tokens for uid — approval push skipped", { uid });
    return result;
  }

  const data = {
    kind: ACCOUNT_APPROVED_PUSH.kind,
    deepLink: ACCOUNT_APPROVED_PUSH.deepLink,
    userId: uid,
  };

  const outcomes = await Promise.all(
    tokens.map((token) =>
      sendToToken(uid, token, {
        token,
        notification: {
          title: ACCOUNT_APPROVED_PUSH.title,
          body: ACCOUNT_APPROVED_PUSH.body,
        },
        data,
      }),
    ),
  );

  result.results = outcomes;
  result.successCount = outcomes.filter((o) => o.ok).length;
  result.failureCount = outcomes.length - result.successCount;
  result.removedCount = outcomes.filter((o) => o.removedToken).length;
  logger.info("fcm: approval push done", {
    uid,
    targets: outcomes.length,
    successCount: result.successCount,
    failureCount: result.failureCount,
    removedCount: result.removedCount,
  });
  return result;
}
