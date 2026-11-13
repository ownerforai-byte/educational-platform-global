import type { NotificationSender } from "../ports.js";
import { isFirebaseAdminConfigured } from "../firebase-admin.js";

/** FCM sender port — messaging lives in Firebase Functions today. */
export const fcmNotificationSender: NotificationSender = {
  isConfigured: () => isFirebaseAdminConfigured(),
};
