import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const push = vi.fn();
const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace, refresh: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const sessionState: { user: { id: string } | null; isLoading: boolean } = {
  user: { id: "user-1" },
  isLoading: false,
};

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: sessionState.user,
    isLoading: sessionState.isLoading,
    refresh: vi.fn(),
    logoutUser: vi.fn(),
  }),
}));

const listFeed = vi.fn();

vi.mock("@/lib/api/community-feed", () => ({
  COMMUNITY_CATEGORIES: [
    { id: "general", label: "General" },
    { id: "physics", label: "Physics" },
  ],
  listFeed: (...args: unknown[]) => listFeed(...args),
  listMine: vi.fn(),
  getPost: vi.fn(),
  getPerson: vi.fn(),
  createPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
  toggleLike: vi.fn(),
  addComment: vi.fn(),
  updateComment: vi.fn(),
  deleteComment: vi.fn(),
  deleteAttachment: vi.fn(),
  uploadAttachment: vi.fn(),
  approveAssistantReply: vi.fn(),
  publishAssistantReply: vi.fn(),
  sharePath: (id: string) => `/ai/community/posts/${id}`,
  attachmentFileUrl: (id: string) => `/api/community/feed/attachments/${id}/file`,
}));

import { CommunityBoard } from "@/features/community/community-board";

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = { id: "user-1" };
  sessionState.isLoading = false;
  listFeed.mockResolvedValue({ posts: [], nextCursor: null, migrated: true });
});

describe("CommunityBoard composer", () => {
  it("hides the composer on the feed and sends New post to /ai/community/new", async () => {
    render(<CommunityBoard view="feed" />);

    expect(await screen.findByRole("heading", { name: "Community" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /new post/i })).toHaveAttribute("href", "/ai/community/new");
    expect(screen.getByLabelText("Search posts")).toBeInTheDocument();
    expect(screen.queryByLabelText("Title")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Body")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /publish/i })).not.toBeInTheDocument();
  });

  it("shows the composer on the dedicated new-post route", async () => {
    render(<CommunityBoard view="new" />);

    expect(await screen.findByRole("heading", { name: "New post", level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /publish/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});
