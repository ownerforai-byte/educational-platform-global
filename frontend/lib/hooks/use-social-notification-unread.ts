"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchSocialNotificationSummary } from "@/lib/api/community-feed";
import { useAuth } from "@/providers/auth-provider";

/** Dispatched when a foreground FCM message looks like a community alert. */
export const SOCIAL_NOTIFICATION_REFRESH_EVENT = "rn:social-notification";

const POLL_MS = 45_000;

/**
 * Polls community unread count while signed in; refreshes on foreground push events.
 */
export function useSocialNotificationUnread(): number {
  const { user, isLoading } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setUnreadCount(0);
      return;
    }
    try {
      const summary = await fetchSocialNotificationSummary();
      setUnreadCount(summary.migrated ? summary.unreadCount : 0);
    } catch {
      /* keep last known count */
    }
  }, [user]);

  useEffect(() => {
    if (isLoading) return;
    void refresh();
  }, [isLoading, refresh]);

  useEffect(() => {
    if (!user) return;
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(id);
  }, [user, refresh]);

  useEffect(() => {
    const onPush = () => void refresh();
    window.addEventListener(SOCIAL_NOTIFICATION_REFRESH_EVENT, onPush);
    return () => window.removeEventListener(SOCIAL_NOTIFICATION_REFRESH_EVENT, onPush);
  }, [refresh]);

  return unreadCount;
}