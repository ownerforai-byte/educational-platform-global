"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  listSocialNotifications,
  markSocialNotificationsRead,
  sharePath,
  type SocialNotificationItem,
} from "@/lib/api/community-feed";
import { CommunityBackLink } from "@/features/community/community-helpers";
import { chipBtn, emptyStatePanel, surfaceCardFlat } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<string, string> = {
  like: "liked your post",
  comment: "commented on your post",
  reply: "replied to your comment",
  follow: "started following you",
  repost: "reposted your post",
  mention: "mentioned you",
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
          const href = item.postId ? sharePath(item.postId) : "/ai/community";
          return (
            <li key={item.id}>
              <Link
                href={href}
                className={cn(
                  surfaceCardFlat,
                  "block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-muted/40",
                  !item.readAt && "border-primary/25 bg-primary/5",
                )}
              >
                <span className="font-medium text-foreground">
                  {KIND_LABEL[item.kind] ?? item.kind}
                </span>
                <time dateTime={item.createdAt} className="mt-1 block text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </time>
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