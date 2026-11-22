import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { FeedPost } from "@/lib/api/community-feed";
import { CommunityFeed } from "@/features/community/community-feed";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const makePost = (id: string): FeedPost => ({
  id,
  title: `Post ${id}`,
  body: "A short study explanation.",
  category: "general",
  visibility: "public",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  author: { id: `author-${id}`, fullName: "Author", username: "author", plan: "member", role: "member" },
  likeCount: 0,
  likedByYou: false,
  commentCount: 0,
  saveCount: 0,
  savedByYou: false,
  attachments: [],
});

const noop = () => undefined;

describe("CommunityFeed cards", () => {
  it("renders each post in its own rounded card with vertical spacing", () => {
    const { container } = render(
      <CommunityFeed
        mode="feed"
        appliedQuery=""
        category=""
        postKind=""
        filter="latest"
        posts={[makePost("one"), makePost("two")]}
        queuedNewCount={0}
        cursor={null}
        loading={false}
        loadingMore={false}
        error={null}
        canModerate={false}
        copiedId={null}
        aiReplyBusyIds={new Set()}
        isSaved={() => false}
        onApplySearch={noop}
        onSelectCategory={noop}
        onSelectPostKind={noop}
        onSelectFilter={noop}
        onClearAllFilters={noop}
        onRevealQueuedPosts={noop}
        onLoadMore={noop}
        onLike={noop}
        onToggleSave={noop}
        threadPropsForPost={() => ({
          commentsExpanded: false,
          threadComments: [],
          threadLoading: false,
          threadError: null,
          followUpBotCommentId: null,
          composerFocusTrigger: 0,
          onToggleComments: noop,
          onSelectFollowUp: noop,
          onClearFollowUp: noop,
          onFollowChange: noop,
          onSubmitComment: async () => ({ ok: true }),
          onSaveCommentEdit: async () => ({ ok: true }),
          onDeleteComment: noop,
        })}
        onCopyLink={noop}
        onDelete={noop}
        onAssistantReply={noop}
        onPrefetchPost={noop}
      />,
    );
    const cards = container.querySelectorAll("article");
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      expect(card.className).toContain("rounded-md");
      expect(card.className).toContain("border-border/90");
      expect(card.className).toContain("bg-card");
    }
    expect(container.querySelector(".space-y-2")).toContainElement(cards[0]);
    expect(screen.getByRole("heading", { name: "Post one" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Post two" })).toBeInTheDocument();
  });
});
