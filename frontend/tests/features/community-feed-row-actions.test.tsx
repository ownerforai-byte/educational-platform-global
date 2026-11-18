import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { FeedPost } from "@/lib/api/community-feed";
import { FeedPostRow } from "@/features/community/feed-post-row";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/features/profile/follow-button", () => ({ FollowButton: () => null }));

const post: FeedPost = {
  id: "post-1",
  title: "A useful study note",
  body: "Short explanation.",
  category: "general",
  visibility: "public",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  author: { id: "author-1", fullName: "Author", username: "author", plan: "member", role: "member" },
  likeCount: 3,
  likedByYou: false,
  commentCount: 2,
  saveCount: 7,
  savedByYou: false,
  attachments: [],
};

function renderRow(overrides: Partial<React.ComponentProps<typeof FeedPostRow>> = {}) {
  const onToggleSave = vi.fn();
  const onCopyLink = vi.fn();
  const props: React.ComponentProps<typeof FeedPostRow> = {
    item: post,
    canModerate: false,
    saved: false,
    copied: false,
    aiReplyBusy: false,
    commentsExpanded: false,
    threadComments: [],
    threadLoading: false,
    threadError: null,
    followUpBotCommentId: null,
    composerFocusTrigger: 0,
    onToggleComments: vi.fn(),
    onSelectFollowUp: vi.fn(),
    onClearFollowUp: vi.fn(),
    onFollowChange: vi.fn(),
    onSubmitComment: vi.fn(async () => ({ ok: true })),
    onSaveCommentEdit: vi.fn(async () => ({ ok: true })),
    onDeleteComment: vi.fn(),
    onLike: vi.fn(),
    onToggleSave,
    onCopyLink,
    onDelete: vi.fn(),
    onAssistantReply: vi.fn(),
    ...overrides,
  };
  return { ...render(<FeedPostRow {...props} />), onToggleSave, onCopyLink };
}

describe("FeedPostRow actions", () => {
  it("renders an independent rounded card and its public save count", () => {
    const { container } = renderRow();
    expect(container.querySelector("article")?.className).toContain("rounded-2xl");
    expect(screen.getByRole("button", { name: "Save post" })).toHaveTextContent("7");
    expect(screen.getByRole("button", { name: "Show 2 comments" })).toBeInTheDocument();
  });

  it("uses the share button and clipboard fallback when native sharing is unavailable", async () => {
    const { onCopyLink } = renderRow();
    fireEvent.click(screen.getByRole("button", { name: "Share post" }));
    expect(onCopyLink).toHaveBeenCalledWith(post.id);
  });

  it("prefers native sharing when available", async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, "share");
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    const { onCopyLink, unmount } = renderRow();
    fireEvent.click(screen.getByRole("button", { name: "Share post" }));
    expect(share).toHaveBeenCalledWith({ title: post.title, url: `${window.location.origin}/ai/community/posts/${post.id}` });
    expect(onCopyLink).not.toHaveBeenCalled();
    unmount();
    if (original) Object.defineProperty(navigator, "share", original);
    else Reflect.deleteProperty(navigator, "share");
  });

  it("reconciles the saved active style with the server value on the row", () => {
    renderRow({ item: { ...post, savedByYou: true }, saved: false });
    expect(screen.getByRole("button", { name: "Saved post" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Saved post" })).toHaveTextContent("7");
  });

  it("expands comments from the icon and collapses on an outside pointer", () => {
    function Harness() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <FeedPostRow
            item={post}
            canModerate={false}
            saved={false}
            copied={false}
            aiReplyBusy={false}
            commentsExpanded={open}
            threadComments={[]}
            threadLoading={false}
            threadError={null}
            followUpBotCommentId={null}
            composerFocusTrigger={0}
            onToggleComments={() => setOpen((value) => !value)}
            onSelectFollowUp={vi.fn()}
            onClearFollowUp={vi.fn()}
            onFollowChange={vi.fn()}
            onSubmitComment={vi.fn(async () => ({ ok: true }))}
            onSaveCommentEdit={vi.fn(async () => ({ ok: true }))}
            onDeleteComment={vi.fn()}
            onLike={vi.fn()}
            onToggleSave={vi.fn()}
            onCopyLink={vi.fn()}
            onDelete={vi.fn()}
            onAssistantReply={vi.fn()}
          />
          <button type="button">Outside</button>
        </>
      );
    }
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Show 2 comments" }));
    expect(screen.getByRole("region", { name: "Comments on A useful study note" })).toBeInTheDocument();
    expect(screen.getByText("No comments yet")).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("region", { name: "Comments on A useful study note" })).not.toBeInTheDocument();
  });
});
