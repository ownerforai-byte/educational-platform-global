import { logger } from "../lib/logger.js";
import { fcmNotificationSender } from "../storage/adapters/fcm.js";
import { appendNotificationLog } from "../storage/firebase-store.js";
import { NOTIFICATION_RULES } from "./notification.rules.js";
import type {
  NotificationKind,
  NotificationPayload,
  NotificationRule,
  UserNotificationContext,
} from "./notification.types.js";

export interface DispatchNotificationResult {
  sent: boolean;
  reason?: string;
  kind: NotificationKind;
  payload?: NotificationPayload;
  inAppLogId?: string | null;
  pushSuccessCount?: number;
  pushFailureCount?: number;
}

// In-memory per-user cooldown tracking: key = `${userId}:${kind}` -> timestamp ms
const cooldownTracker = new Map<string, number>();

/** Clear cooldown entry (mostly for testing). */
export function resetNotificationCooldown(userId: string, kind?: NotificationKind): void {
  if (kind) {
    cooldownTracker.delete(`${userId}:${kind}`);
  } else {
    for (const key of cooldownTracker.keys()) {
      if (key.startsWith(`${userId}:`)) cooldownTracker.delete(key);
    }
  }
}

/** Check if a rule's cooldown has passed for this user. */
export function isCooldownSatisfied(
  userId: string,
  kind: NotificationKind,
  cooldownMs?: number,
  now = Date.now(),
): boolean {
  if (!cooldownMs || cooldownMs <= 0) return true;
  const key = `${userId}:${kind}`;
  const lastSent = cooldownTracker.get(key);
  if (!lastSent) return true;
  return now - lastSent >= cooldownMs;
}

/** Record that a notification was sent for this user and kind. */
export function recordNotificationSent(
  userId: string,
  kind: NotificationKind,
  now = Date.now(),
): void {
  const key = `${userId}:${kind}`;
  cooldownTracker.set(key, now);
}

/**
 * Directly dispatch a crafted notification payload to a user via both
 * In-App Log (Firestore) and Push (FCM).
 */
export async function sendNotification(
  userId: string,
  payload: NotificationPayload,
): Promise<DispatchNotificationResult> {
  const now = Date.now();

  // 1. In-App Notification Log (persisted to Firestore notification_logs collection)
  let inAppLogId: string | null = null;
  try {
    inAppLogId = await appendNotificationLog({
      userId,
      kind: payload.kind,
      title: payload.title,
      body: payload.body,
      deepLink: payload.deepLink,
      requestId: (payload.metadata?.requestId as string) || undefined,
    });
  } catch (err) {
    logger.warn("[notification.service] failed to append in-app notification log", {
      userId,
      kind: payload.kind,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  // 2. FCM Web/Mobile Push notification
  let pushSuccess = 0;
  let pushFailure = 0;
  try {
    const pushResult = await fcmNotificationSender.sendPush({
      uid: userId,
      title: payload.title,
      body: payload.body,
      payload: {
        kind: payload.kind,
        category: payload.category,
        deepLink: payload.deepLink,
        url: payload.deepLink,
        actionLabel: payload.actionLabel || "Open",
        ...(payload.metadata ? { metadata: JSON.stringify(payload.metadata) } : {}),
      },
    });
    pushSuccess = pushResult.successCount;
    pushFailure = pushResult.failureCount;
  } catch (err) {
    logger.warn("[notification.service] FCM sendPush failed or not configured", {
      userId,
      kind: payload.kind,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  recordNotificationSent(userId, payload.kind, now);

  logger.info("[notification.service] dispatched notification", {
    userId,
    kind: payload.kind,
    inAppLogId,
    pushSuccess,
    pushFailure,
  });

  return {
    sent: true,
    kind: payload.kind,
    payload,
    inAppLogId,
    pushSuccessCount: pushSuccess,
    pushFailureCount: pushFailure,
  };
}

/**
 * Evaluate condition logic and dispatch notification if condition and cooldown pass.
 */
export async function sendConditionalNotification(
  kind: NotificationKind,
  context: UserNotificationContext,
  customRule?: Partial<NotificationRule>,
): Promise<DispatchNotificationResult> {
  const standardRule = NOTIFICATION_RULES[kind];
  if (!standardRule) {
    return {
      sent: false,
      kind,
      reason: `Unknown notification kind: ${kind}`,
    };
  }

  const rule: NotificationRule = {
    ...standardRule,
    ...customRule,
  };

  // Check user preferences if category is muted
  if (rule.category === "curriculum" && context.preferences?.studyReminders === false) {
    return {
      sent: false,
      kind,
      reason: "User opted out of study reminders",
    };
  }
  if (rule.category === "system" && context.preferences?.systemAlerts === false) {
    return {
      sent: false,
      kind,
      reason: "User opted out of system alerts",
    };
  }

  // Check cooldown
  if (!isCooldownSatisfied(context.userId, kind, rule.cooldownMs)) {
    return {
      sent: false,
      kind,
      reason: `Cooldown not satisfied for ${kind}`,
    };
  }

  // Evaluate condition
  let conditionMet = false;
  try {
    conditionMet = rule.condition(context);
  } catch (err) {
    logger.warn("[notification.service] condition evaluation error", {
      userId: context.userId,
      kind,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      sent: false,
      kind,
      reason: "Condition evaluation threw an error",
    };
  }

  if (!conditionMet) {
    return {
      sent: false,
      kind,
      reason: `Condition for ${kind} not satisfied`,
    };
  }

  // Build payload
  const partialPayload = rule.buildPayload(context);
  const fullPayload: NotificationPayload = {
    kind,
    category: rule.category,
    title: partialPayload.title,
    body: partialPayload.body,
    deepLink: partialPayload.deepLink,
    actionLabel: partialPayload.actionLabel,
    metadata: {
      ...partialPayload.metadata,
      ...context.metadata,
    },
  };

  return sendNotification(context.userId, fullPayload);
}

/**
 * Scan all standard notification rules for a user context and dispatch any
 * that are currently eligible.
 */
export async function evaluateAndDispatchAllEligible(
  context: UserNotificationContext,
  allowedKinds?: NotificationKind[],
): Promise<DispatchNotificationResult[]> {
  const kindsToEvaluate = allowedKinds ?? (Object.keys(NOTIFICATION_RULES) as NotificationKind[]);
  const results: DispatchNotificationResult[] = [];

  for (const kind of kindsToEvaluate) {
    const res = await sendConditionalNotification(kind, context);
    if (res.sent) {
      results.push(res);
    }
  }

  return results;
}
