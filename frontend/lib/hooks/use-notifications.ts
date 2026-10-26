"use client";

import { useSyncExternalStore } from "react";
import {
  getNotificationSnapshot,
  getServerNotificationSnapshot,
  subscribeNotifications,
  type NotificationSnapshot,
} from "@/lib/notifications";

/**
 * Shared notification state hook (plan.md §14 — 5.1/5.2).
 *
 * Backed by the module store in `lib/notifications.ts`, so the notifications
 * page and the header bell always agree — marking all read zeroes both badges
 * instantly, in this tab and in every other open tab.
 */
export function useNotificationState(): NotificationSnapshot {
  return useSyncExternalStore(
    subscribeNotifications,
    getNotificationSnapshot,
    getServerNotificationSnapshot,
  );
}
