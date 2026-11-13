import { r2ObjectStore } from "./adapters/r2.js";
import { firestoreRealtimeStore } from "./adapters/firestore.js";
import { fcmNotificationSender } from "./adapters/fcm.js";
import type { NotificationSender, ObjectStore, RealtimeDocStore } from "./ports.js";

export type { ObjectStore, RealtimeDocStore, NotificationSender } from "./ports.js";
export * from "./policy.js";

export function getObjectStore(): ObjectStore {
  return r2ObjectStore;
}

export function getRealtimeStore(): RealtimeDocStore {
  return firestoreRealtimeStore;
}

export function getNotificationSender(): NotificationSender {
  return fcmNotificationSender;
}
