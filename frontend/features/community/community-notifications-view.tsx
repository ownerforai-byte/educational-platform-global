"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AtSign, Award, Bell, Heart, Loader2, MessageCircle, Quote, Repeat2, UserPlus } from "lucide-react";
import {
  listSocialNotifications,
  markSocialNotificationsRead,
  sharePath,
  type SocialNotificationItem,
} from "@/lib/api/community-feed";
import { CommunityBackLink } from "@/features/community/community-helpers";
import { chipBtn, emptyStatePanel, relativeTime, surfaceCardFlat } from "@/features/community/community-ui";
import { SOCIAL_NOTIFICATION_REFRESH_EVENT } from "@/lib/hooks/use-social-notification-unread";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<string, string> = {
  like: "liked your post",
  comment: "commented on your post",
  reply: "replied to your comment",
  follow: "started following you",
  repost: "reposted your post",
  mention: "mentioned you",
  accept: "accepted your answer",
  quote: "quoted your post",
};

const KIND_ICON: Record<string, typeof Heart> = {
  like: Heart,
  comment: MessageCircle,
  reply: MessageCircle,
  follow: UserPlus,
  repost: Repeat2,
  mention: AtSign,
  accept: Award,
  quote: Quote,
};

const KIND_ICON_CLASS: Record<string, string> = {
  like: "text-rose-500",
  comment: "text-primary",
  reply: "text-primary",
  follow: "text-emerald-500",
  repost: "text-sky-500",
  mention: "text-violet-500",
  accept: "text-amber-500",
  quote: "text-cyan-500",
};

export function CommunityNotificationsView() {
  const [items, setItems] = useState<SocialNotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<number | null>(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = useCallback(async (nextCursor: number, append: boolean) => {
    const res = await listSocialNotifications({ cursor: nextCursor });
    setUnreadCount(res.unreadCount);
    setItems((current) => (append ? [...current, ...res.items] : res.items));
    setCursor(res.nextCursor);
  }, []);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    void load(0, false)
      .catch(() => undefined)
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [load]);

  const markAllRead = useCallback(() => {
    void markSocialNotificationsRead({ all: true }).then(() => {
      setItems((current) => current.map((row) => ({ ...row, readAt: row.readAt ?? new Date().toISOString() })));
      setUnreadCount(0);
      window.dispatchEvent(new Event(SOCIAL_NOTIFICATION_REFRESH_EVENT));
    });
  }, []);

  // Opening a notification marks just that one read and deep-links to the
  // exact comment when the event was on a reply.
  const openNotification = useCallback((id: string) => {
    void markSocialNotificationsRead({ ids: [id] }).then(() => {
      setItems((current) =>
        current.map((row) => (row.id === id ? { ...row, readAt: row.readAt ?? new Date().toISOString() } : row)),
      );
      setUnreadCount((count) => Math.max(0, count - 1));
      window.dispatchEvent(new Event(SOCIAL_NOTIFICATION_REFRESH_EVENT));
    });
  }, []);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <CommunityBackLink href="/ai/community" label="Back to feed" />
        {unreadCount > 0 ? (
          <button type="button" onClick={markAllRead} className={cn(chipBtn, "min-h-10 px-3 text-[13px]")}>
            Mark all read ({unreadCount})
          </button>
        ) : null}
      </header>

      {loading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading notifications…
        </p>
      ) : null}

      {!loading && items.length === 0 ? (
        <p className={cn(emptyStatePanel, "p-8 text-center text-sm text-muted-foreground")}>
          No notifications yet.
        </p>
      ) : null}

      <ul className="space-y-2">
        {items.map((item) => {
          const href = item.postId
            ? item.commentId
              ? `${sharePath(item.postId)}#comment-${item.commentId}`
              : sharePath(item.postId)
            : "/ai/community";
          const actorName = item.actor?.fullName ?? "Someone";
          const label =
            item.kind === "like" && item.commentId
              ? "liked your comment"
              : KIND_LABEL[item.kind] ?? "sent you a notification";
          const Icon = KIND_ICON[item.kind] ?? Bell;
          const iconClass = KIND_ICON_CLASS[item.kind] ?? "text-muted-foreground";
          return (
            <li key={item.id}>
              <Link
                href={href}
                onClick={() => {
                  if (!item.readAt) openNotification(item.id);
                }}
                className={cn(
                  surfaceCardFlat,
                  "flex items-start gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-muted/40",
                  !item.readAt && "border-primary/25 bg-primary/5",
                )}
              >
                {item.actor?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.actor.avatarUrl}
                    alt=""
                    aria-hidden
                    className="h-9 w-9 shrink-0 rounded-full border border-border/70 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/60",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", iconClass)} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-snug text-foreground">
                    <span className="font-semibold">{actorName}</span>{" "}
                    <span className="text-muted-foreground">{label}</span>
                    {item.postTitle ? (
                      <span className="text-muted-foreground"> “{item.postTitle}”</span>
                    ) : null}
                  </span>
                  <time
                    dateTime={item.createdAt}
                    title={new Date(item.createdAt).toLocaleString()}
                    className="mt-0.5 block text-xs tabular-nums text-muted-foreground"
                  >
                    {relativeTime(item.createdAt)}
                  </time>
                </span>
                {!item.readAt ? (
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      {cursor != null ? (
        <button
          type="button"
          disabled={loadingMore}
          onClick={() => {
            setLoadingMore(true);
            void load(cursor, true).finally(() => setLoadingMore(false));
          }}
          className={cn(chipBtn, "mx-auto flex min-h-11 w-full justify-center sm:w-auto sm:px-6")}
        >
          {loadingMore ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </div>
  );
}