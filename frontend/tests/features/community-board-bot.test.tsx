import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
  user: { id: "user-2" },
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

vi.mock("@/features/profile/follow-button", () => ({
  FollowButton: () => null,
}));

const { getPost, publishAssistantReply } = vi.hoisted(() => ({
  getPost: vi.fn(),
  publishAssistantReply: vi.fn(),
}));

vi.mock("@/lib/api/community-feed", () => ({
  COMMUNITY_CATEGORIES: [
    { id: "general", label: "General" },
    { id: "biology", label: "Biology" },
  ],
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
  deleteAttachment: vi.fn(),
  uploadAttachment: vi.fn(),
  approveAssistantReply: publishAssistantReply,
  publishAssistantReply,
  sharePath: (id: string) => `/ai/community/posts/${id}`,
  attachmentFileUrl: (id: string) => `/api/community/feed/attachments/${id}/file`,
}));

import { CommunityBoard } from "@/features/community/community-board";

const questionPost = {
  id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  title: "What is photosynthesis?",
  body: "How do plants make food?",
  category: "biology",
  visibility: "public" as const,
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
  commentCount: 0,
  attachments: [],
  comments: [],
  assistantReply: { posted: false, canApprove: true },
};

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = { id: "user-2" };
  sessionState.isLoading = false;
  getPost.mockResolvedValue({ post: { ...questionPost }, migrated: true });
  publishAssistantReply.mockImplementation(async () => ({
    comment: {
      id: "comment-bot",
      body: "Grounded assistant reply.",
      createdAt: "2026-01-01T00:00:01.000Z",
      updatedAt: "2026-01-01T00:00:01.000Z",
      author: {
        id: "rn-study-assistant",
        fullName: "Community bot",
        username: "community-bot",
        plan: "pro",
        role: "assistant",
        avatarUrl: "/avatars/community-bot.svg",
      },
    },
    assistantReply: { posted: true, canApprove: false },
  }));
});

describe("CommunityBoard Answer with Veer", () => {
  it("one-click publishes a verified AI comment without a confirm dialog", async () => {
    const confirm = vi.spyOn(window, "confirm");
    render(<CommunityBoard view="post" id={questionPost.id} />);

    const buttons = await screen.findAllByRole("button", { name: "Answer with Veer" });
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(publishAssistantReply).toHaveBeenCalledWith(questionPost.id);
    });
    expect(confirm).not.toHaveBeenCalled();
    expect(publishAssistantReply).toHaveBeenCalledTimes(1);
    confirm.mockRestore();
  });

  it("hides Answer with Veer after the bot has already replied", async () => {
    getPost.mockResolvedValue({
      post: {
        ...questionPost,
        commentCount: 1,
        assistantReply: { posted: true, canApprove: false },
        comments: [
          {
            id: "comment-bot",
            body: "Already posted.",
            createdAt: "2026-01-01T00:00:01.000Z",
            updatedAt: "2026-01-01T00:00:01.000Z",
            author: {
              id: "rn-study-assistant",
              fullName: "Community bot",
              username: "community-bot",
              plan: "pro",
              role: "assistant",
              avatarUrl: "/avatars/community-bot.svg",
            },
          },
        ],
      },
      migrated: true,
    });

    render(<CommunityBoard view="post" id={questionPost.id} />);
    expect(await screen.findByText("Already posted.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Answer with Veer" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Verified AI assistant")).toBeInTheDocument();
  });
});
