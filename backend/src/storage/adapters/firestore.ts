import type { RealtimeDocStore } from "../ports.js";
import {
  appendNotificationLog,
  upsertAccessSession,
  upsertFcmTokenDoc,
} from "../firebase-store.js";

export const firestoreRealtimeStore: RealtimeDocStore = {
  upsertFcmToken: upsertFcmTokenDoc,
  appendNotificationLog,
  upsertAccessSession,
};
