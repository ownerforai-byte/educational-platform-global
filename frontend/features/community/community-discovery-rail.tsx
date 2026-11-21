"use client";

import Link from "next/link";
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
    href: "/ai/community/new",
    title: "New post",
    description: "Share a question, tip, or resource with the public feed.",
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

export function CommunityDiscoveryRail({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Community shortcuts"
      className={cn("sticky top-20 space-y-3", className)}
    >
      <div className={cn(surfaceCardFlat, "space-y-3 p-4")}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Community
        </p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          The <span className="font-medium text-foreground">public feed</span> is open to guests.
          Study spaces and posting need a signed-in member account.
        </p>
        <Link href="/ai/community/new" className={cn(primaryCta, "inline-flex w-full justify-center py-2.5 text-sm")}>
          Write a post
        </Link>
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