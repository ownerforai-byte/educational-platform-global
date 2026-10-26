"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useNotificationState } from "@/lib/hooks/use-notifications";

/**
 * Header notification bell (plan.md §14 — 5.2).
 *
 * The badge used to be a static pulsing dot that ignored the real state. It
 * now derives from the shared read-id store and HIDES at zero — "mark all
 * read" on the notifications page clears it here instantly, and the storage
 * event keeps other open tabs in sync.
 */
export function NotificationBell() {
  const { hydrated, unreadCount } = useNotificationState();
  const showBadge = hydrated && unreadCount > 0;

  return (
    <Link
      href="/notifications"
      className="relative inline-flex items-center justify-center h-8 w-8 rounded-xl border border-border/80 bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all shadow-sm shrink-0"
      title={showBadge ? `Notifications — ${unreadCount} new` : "Notifications"}
      aria-label={
        showBadge
          ? `Notifications, ${unreadCount} new`
          : "Notifications"
      }
    >
      <Bell className="h-4 w-4" />
      {showBadge && (
        <span
          data-testid="notification-bell-badge"
          className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground ring-2 ring-background"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
