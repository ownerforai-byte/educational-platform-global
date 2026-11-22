"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, CircleHelp, Flame, PenLine } from "lucide-react";
import {
  listFeed,
  listTrending,
  type FeedPost,
} from "@/lib/api/community-feed";
import { primaryCta, surfaceCardFlat } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

const LINKS = [
  {
    href: "/ai/community/notifications",
    title: "Notifications",
    description: "Likes, replies, follows, and reposts from the feed.",
  },
  {
    href: "/ai/community?view=trending",
    title: "Trending",
    description: "Posts with the most engagement in recent discussions.",
  },
  {
    href: "/community",
    title: "Study spaces",
    description: "Class & subject threads with optional anonymity (Plus).",
  },
  {
    href: "/ai/community/chat",
    title: "Lobby chat",
    description: "Live room for quick study chatter alongside the feed.",
  },
] as const;

interface RailState {
  trending: FeedPost[];
  unanswered: FeedPost[];
  failed: boolean;
}

/** Titles only — the rail links out, it never renders post bodies. */
function RailList({
  icon,
  label,
  posts,
  emptyText,
  accent,
}: {
  icon: typeof Flame;
  label: string;
  posts: FeedPost[];
  emptyText: string;
  accent: string;
}) {
  const Icon = icon;
  return (
    <div className={cn(surfaceCardFlat, "p-3")}>
      <p className={cn("flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide", accent)}>
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {label}
      </p>
      {posts.length === 0 ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="mt-1.5 space-y-0.5">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/ai/community/posts/${post.id}`}
                className="group flex items-baseline gap-2 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground/90 group-hover:text-foreground">
                  {post.title}
                </span>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                  {post.kind === "question" && !post.solved
                    ? `${post.commentCount} replies`
                    : `${post.likeCount} likes`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Learning discovery rail: real feed data only — trending + open questions. */
export function CommunityDiscoveryRail({ className }: { className?: string }) {
  const [state, setState] = useState<RailState | null>(null);

  useEffect(() => {
    let alive = true;
    // Both endpoints are the same ones the timeline uses; failures leave the
    // static shortcut list, never a broken rail.
    Promise.allSettled([listTrending(), listFeed({ filter: "unanswered" })]).then(
      ([trending, unanswered]) => {
        if (!alive) return;
        setState({
          trending: trending.status === "fulfilled" ? (trending.value.posts ?? []).slice(0, 4) : [],
          unanswered:
            unanswered.status === "fulfilled" ? (unanswered.value.posts ?? []).slice(0, 4) : [],
          failed: trending.status === "rejected" && unanswered.status === "rejected",
        });
      },
    );
    return () => {
      alive = false;
    };
  }, []);

  return (
    <aside aria-label="Learning discovery" className={cn("sticky top-20 space-y-3", className)}>
      <div className={cn(surfaceCardFlat, "space-y-3 p-4")}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Learning community
        </p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          The <span className="font-medium text-foreground">public feed</span> is open to guests.
          Study spaces and posting need a signed-in member account.
        </p>
        <Link
          href="/ai/community/new"
          className={cn(primaryCta, "inline-flex w-full justify-center gap-2 py-2.5 text-sm")}
        >
          <PenLine className="h-4 w-4" aria-hidden />
          Ask or share
        </Link>
      </div>

      {state && !state.failed ? (
        <>
          <RailList
            icon={CircleHelp}
            label="Questions awaiting answers"
            posts={state.unanswered}
            emptyText="No open questions right now — a good moment to start one."
            accent="text-amber-600 dark:text-amber-400"
          />
          <RailList
            icon={Flame}
            label="Trending discussions"
            posts={state.trending}
            emptyText="Nothing trending yet. Engage with a discussion to shape it."
            accent="text-rose-600 dark:text-rose-400"
          />
        </>
      ) : null}

      <div
        className={cn(
          surfaceCardFlat,
          "border-primary/25 bg-gradient-to-br from-primary/[0.06] via-card to-card p-3.5",
        )}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          <Bot className="h-3.5 w-3.5" aria-hidden />
          Veer AI
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Mention <span className="font-semibold text-foreground">@veer</span> under any post and
          the curriculum-grounded assistant answers with board-style explanations.
        </p>
      </div>

      <ul className={cn(surfaceCardFlat, "divide-y divide-border/60 p-1")}>
        {LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-[13px] font-semibold text-foreground">{item.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
