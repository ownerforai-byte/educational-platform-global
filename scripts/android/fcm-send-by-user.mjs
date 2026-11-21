#!/usr/bin/env node
/**
 * Example: send FCM to one user via Firebase Admin (HTTP v1 through Admin SDK).
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json \
 *     node scripts/android/fcm-send-by-user.mjs <userId> "Title" "Body" "/ai/community"
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const userId = process.argv[2];
const title = process.argv[3] ?? "Verner";
const body = process.argv[4] ?? "Open the app to continue.";
const deepLink = process.argv[5] ?? "/home/member";

if (!userId) {
  console.error("Usage: node scripts/android/fcm-send-by-user.mjs <userId> [title] [body] [deepLink]");
  process.exit(1);
}

const { fcmNotificationSender } = await import("../../backend/src/storage/adapters/fcm.js");

if (!fcmNotificationSender.isConfigured()) {
  console.error("Firebase Admin not configured. Set GOOGLE_APPLICATION_CREDENTIALS.");
  process.exit(2);
}

const result = await fcmNotificationSender.sendPush({
  uid: userId,
  title,
  body,
  payload: {
    kind: "community_activity",
    category: "system",
    deepLink,
    url: deepLink,
    actionLabel: "Open",
    metadata: JSON.stringify({ socialKind: "mention" }),
  },
});

console.log(JSON.stringify(result, null, 2));