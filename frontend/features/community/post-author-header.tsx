"use client";

import Link from "next/link";
import type { FeedAuthor } from "@/lib/api/community-feed";
import { profilePath } from "@/lib/api/profile";
import { FollowButton } from "@/features/profile/follow-button";
import { BadgeCheck, Bot, Clock3, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { isCommunityBot, resolveFeedAuthor } from "@/lib/community-bot";
import { BotIdentityBadge } from "@/features/community/bot-identity-badge";
import { CreatorIdentityBadge } from "@/features/community/creator-identity-badge";
import { planLabel } from "@/features/community/community-ui";
import { isCreatorAuthor } from "@/lib/owner";

function formatPostWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function PostAuthorHeader({
  author,
  createdAt,
  viewerId,
  compact = false,
  onFollowChange,
}: {
  author: FeedAuthor;
  createdAt?: string;
  viewerId?: string | null;
  compact?: boolean;
  onFollowChange?: (following: boolean) => void;
}) {
  const resolved = resolveFeedAuthor(author);
  const bot = isCommunityBot(resolved.id);
  const creator = !bot && isCreatorAuthor(resolved);
  const href = profilePath(resolved.username, resolved.id);
  const handle = resolved.username ? `@${resolved.username}` : resolved.id.slice(0, 8);

  return (
    <div className={cn("flex items-start gap-2.5", compact && "gap-2")}>
      <Link
        href={href}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted bg-cover bg-center ring-2",
          "transition-[box-shadow,ring-color,transform] duration-250 ease-out",
          "focus-visible:outline-none focus-visible:ring-primary/50 hover:ring-primary/40",
          "motion-safe:hover:scale-[1.03] motion-reduce:hover:scale-100",
          bot
            ? "bg-primary/10 ring-primary/35 shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_0_20px_-6px_hsl(var(--primary)/0.35)]"
            : "ring-border/80",
          compact ? "h-8 w-8" : "h-11 w-11",
        )}
        aria-label={`${resolved.fullName} profile`}
      >
        {resolved.avatarUrl ? (
          // Community feed only — lazy load profile avatars (not prefetched app-wide).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolved.avatarUrl}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : bot ? (
          <Bot className={cn("text-primary", compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden />
        ) : (
          <UserRound className={cn("text-muted-foreground", compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden />
        )}
        {bot ? (
          <span
            className={cn(
              "absolute z-10 flex items-center justify-center rounded-full bg-background shadow-sm ring-2 ring-primary/45",
              compact ? "-bottom-0.5 -right-0.5 h-3.5 w-3.5" : "-bottom-0.5 -right-0.5 h-4 w-4",
            )}
            aria-hidden
          >
            <BadgeCheck className={cn("text-primary", compact ? "h-2.5 w-2.5" : "h-3 w-3")} />
          </span>
        ) : null}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={href}
            className={cn(
              "truncate text-sm font-semibold hover:underline",
              bot
                ? "community-bot-badge max-w-full rounded-md px-1.5 py-0.5 text-primary"
                : "text-foreground",
            )}
          >
            <span
              className={cn(
                "relative z-[1]",
                bot &&
                  "bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%_auto] bg-clip-text font-bold text-transparent motion-safe:animate-gradient-text",
              )}
            >
              {resolved.fullName}
            </span>
          </Link>
          {bot ? (
            <BotIdentityBadge compact={compact} />
          ) : creator ? (
            <CreatorIdentityBadge compact={compact} />
          ) : (
            <span className="rounded-md border border-border/80 bg-muted/40 px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted-foreground">
              {planLabel(resolved.plan)}
            </span>
          )}
          <Link href={href} className="truncate text-xs text-muted-foreground hover:text-foreground hover:underline">
            {handle}
          </Link>
          {!bot ? (
            <FollowButton
              username={resolved.username}
              targetUserId={resolved.id}
              initialFollowing={Boolean(resolved.followingByYou)}
              viewerId={viewerId}
              size="xs"
              onChange={onFollowChange}
            />
          ) : null}
        </div>
        {createdAt ? (
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
              <time dateTime={createdAt}>{formatPostWhen(createdAt)}</time>
            </span>
            <span aria-hidden className="text-border">·</span>
            <Link href={href} className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline">
              <UserRound className="h-3 w-3 shrink-0" aria-hidden />
              View profile
            </Link>
          </p>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
          >
            <UserRound className="h-3 w-3 shrink-0" aria-hidden />
            View profile
          </Link>
        )}
      </div>
    </div>
  );
}
