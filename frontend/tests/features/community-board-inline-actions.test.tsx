import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { beforeAll } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { listFeed, getPost, toggleSave, viewer, savedState } = vi.hoisted(() => ({
  listFeed: vi.fn(),
  getPost: vi.fn(),
  toggleSave: vi.fn(),
  viewer: { id: "viewer-1", fullName: "Viewer", role: "member" },
  savedState: { saved: false, saveCount: 4 },
}));
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({ user: viewer, isLoading: false }),
}));
vi.mock("@/features/profile/follow-button", () => ({ FollowButton: () => null }));
vi.mock("@/lib/api/community-feed", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api/community-feed")>();
  return {
    ...actual,
    listFeed: (...args: unknown[]) => listFeed(...args),
    listMine: vi.fn(),
    getPost: (...args: unknown[]) => getPost(...args),
    getPerson: vi.fn(),
    createPost: vi.fn(),
    updatePost: vi.fn(),
    deletePost: vi.fn(),
    toggleLike: vi.fn(),
    toggleSave: (...args: unknown[]) => toggleSave(...args),
    addComment: vi.fn(),
    updateComment: vi.fn(),
    deleteComment: vi.fn(),
    deleteAttachment: vi.fn(),
    uploadAttachment: vi.fn(),
    publishAssistantReply: vi.fn(),
  };
});

import { CommunityBoard } from "@/features/community/community-board";

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

const post = {
  id: "feed-post-1",
  title: "Feed integration question",
  body: "A study question?",
  category: "general",
  visibility: "public" as const,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  author: { id: "author-1", fullName: "Author", username: "author", plan: "member", role: "member" },
  likeCount: 0,
  likedByYou: false,
  commentCount: 1,
  saveCount: 4,
  savedByYou: false,
  attachments: [],
};

beforeEach(() => {
  vi.clearAllMocks();
  savedState.saved = false;
  savedState.saveCount = 4;
  listFeed.mockImplementation(async () => ({
    posts: [{ ...post, savedByYou: savedState.saved, saveCount: savedState.saveCount }],
    nextCursor: null,
    migrated: true,
  }));
  getPost.mockResolvedValue({
    migrated: true,
    post: {
      ...post,
      comments: [{
        id: "comment-1",
        body: "Loaded reply",
        createdAt: "2026-01-02T00:00:00.000Z",
        updatedAt: "2026-01-02T00:00:00.000Z",
        author: { id: "commenter", fullName: "Commenter", username: "commenter", plan: "member", role: "member" },
      }],
    },
  });
  toggleSave.mockImplementation(async () => {
    savedState.saved = true;
    savedState.saveCount = 5;
    return { saveCount: 5, savedByYou: true };
  });
});

describe("CommunityBoard inline feed actions", () => {
  it("fetches comments once on expand, collapses outside, and reconciles the save response", async () => {
    render(<CommunityBoard view="feed" />);
    await screen.findByRole("heading", { name: post.title });

    fireEvent.click(screen.getByRole("button", { name: "Show 1 comments" }));
    expect(await screen.findByText("Loaded reply")).toBeInTheDocument();
    expect(getPost).toHaveBeenCalledTimes(1);

    fireEvent.pointerDown(document.body);
    await waitFor(() => expect(screen.queryByRole("region", { name: `Comments on ${post.title}` })).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Show 1 comments" }));
    expect(await screen.findByText("Loaded reply")).toBeInTheDocument();
    expect(getPost).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Save post" }));
    await waitFor(() => expect(toggleSave).toHaveBeenCalledWith(post.id));
    await waitFor(() => expect(screen.getByRole("button", { name: "Saved post" })).toHaveAttribute("aria-pressed", "true"));
    expect(screen.getByRole("button", { name: "Saved post" })).toHaveTextContent("5");
  });
});
