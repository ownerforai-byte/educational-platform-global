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

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({ user: null, isLoading: false, refresh: vi.fn(), logoutUser: vi.fn() }),
}));

vi.mock("@/features/profile/follow-button", () => ({
  FollowButton: () => null,
}));

const { getPost } = vi.hoisted(() => ({
  getPost: vi.fn(),
}));

vi.mock("@/lib/api/community-feed", () => ({
  COMMUNITY_CATEGORIES: [{ id: "general", label: "General" }],
  listFeed: vi.fn(),
  listMine: vi.fn(),
  getPost: (...args: unknown[]) => getPost(...args),
  getPerson: vi.fn(),
  createPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
  toggleLike: vi.fn(),
  addComment: vi.fn(),
  updateComment: vi.fn(),
  deleteComment: vi.fn(),
  publishAssistantReply: vi.fn(),
  sharePath: (id: string) => `/ai/community/posts/${id}`,
  attachmentFileUrl: vi.fn(),
}));

import { CommunityBoard } from "@/features/community/community-board";

const postId = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

beforeEach(() => {
  vi.clearAllMocks();
  getPost.mockResolvedValue({
    migrated: true,
    post: {
      id: postId,
      title: "Q",
      body: "Body",
      category: "general",
      visibility: "public",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      author: {
        id: "author-1",
        fullName: "Author",
        username: "author",
        plan: "member",
        role: "member",
      },
      likeCount: 0,
      likedByYou: false,
      commentCount: 1,
      attachments: [],
      assistantReply: { posted: true, canApprove: false },
      comments: [
        {
          id: "bot-c",
          body: "Secret bot answer for members.",
          createdAt: "2026-01-01T00:00:01.000Z",
          updatedAt: "2026-01-01T00:00:01.000Z",
          author: {
            id: "rn-study-assistant",
            fullName: "Community bot",
            username: "community-bot",
            plan: "owner",
            role: "assistant",
          },
        },
      ],
    },
  });
});

describe("CommunityBoard guest bot gate", () => {
  it("blurs Community bot replies for signed-out viewers", async () => {
    render(<CommunityBoard view="post" id={postId} />);
    expect(await screen.findByTestId("bot-answer-guest-gate")).toBeInTheDocument();
    expect(screen.getByText("Bot answers are for members")).toBeInTheDocument();
    expect(screen.queryByText("Secret bot answer for members.")).not.toBeInTheDocument();
  });
});