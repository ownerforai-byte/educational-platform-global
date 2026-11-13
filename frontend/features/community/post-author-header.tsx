"use client";

import Link from "next/link";
import type { FeedAuthor } from "@/lib/api/community-feed";
import { profilePath } from "@/lib/api/profile";
import { FollowButton } from "@/features/profile/follow-button";
import { cn } from "@/lib/utils";

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
  const href = profilePath(author.username, author.id);
  const handle = author.username ? `@${author.username}` : author.id.slice(0, 8);

  return (
    <div className={cn("flex items-start gap-2.5", compact && "gap-2")}>
      <Link
        href={href}
        className={cn(
          "shrink-0 rounded-full bg-muted bg-cover bg-center ring-1 ring-border",
          compact ? "h-8 w-8" : "h-11 w-11",
        )}
        style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
        aria-label={`${author.fullName} profile`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link href={href} className="truncate text-sm font-semibold text-foreground hover:underline">
            {author.fullName}
          </Link>
          <Link href={href} className="truncate text-xs text-muted-foreground hover:text-foreground hover:underline">
            {handle}
          </Link>
          <FollowButton
            username={author.username}
            targetUserId={author.id}
            initialFollowing={Boolean(author.followingByYou)}
            viewerId={viewerId}
            size="xs"
            onChange={onFollowChange}
          />
        </div>
        {createdAt ? (
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            <time dateTime={createdAt}>{formatPostWhen(createdAt)}</time>
            {" · "}
            <Link href={href} className="font-medium text-primary hover:underline">
              View profile
            </Link>
          </p>
        ) : (
          <Link href={href} className="text-[11px] font-medium text-primary hover:underline">
            View profile
          </Link>
        )}
      </div>
    </div>
  );
}
