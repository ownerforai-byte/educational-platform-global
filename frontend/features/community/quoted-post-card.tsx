"use client";

import Link from "next/link";
import type { FeedQuotedPost } from "@/lib/api/community-feed";
import { sharePath } from "@/lib/api/community-feed";
import { plainExcerpt } from "@/features/community/community-helpers";
import { cn } from "@/lib/utils";

export function QuotedPostCard({
  post,
  className,
}: {
  post: FeedQuotedPost;
  className?: string;
}) {
  const excerpt = plainExcerpt(post.body, 120);
  const authorName = post.author.fullName;
  return (
    <Link
      href={sharePath(post.id)}
      className={cn(
        "block rounded-md border border-border/90 bg-muted/25 px-2 py-1.5 transition-colors hover:border-primary/35 hover:bg-muted/40",
        className,
      )}
    >
      <p className="text-[11px] text-muted-foreground">
        <span className="font-semibold text-foreground">{authorName}</span>
        <span className="mx-1">·</span>
        <span className="line-clamp-1">{post.title}</span>
      </p>
      {excerpt ? (
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{excerpt}</p>
      ) : null}
      <span className="sr-only">Open quoted post by {authorName}</span>
    </Link>
  );
}