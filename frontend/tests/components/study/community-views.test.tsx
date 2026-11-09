import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ─── Mocks ──────────────────────────────────────────────────────────────────

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

const listThreads = vi.fn();
const createThread = vi.fn();
const getThread = vi.fn();
const createReply = vi.fn();
const toggleUpvote = vi.fn();

vi.mock("@/lib/api/community", () => ({
  listThreads: (...args: unknown[]) => listThreads(...args),
  createThread: (...args: unknown[]) => createThread(...args),
  getThread: (...args: unknown[]) => getThread(...args),
  createReply: (...args: unknown[]) => createReply(...args),
  toggleUpvote: (...args: unknown[]) => toggleUpvote(...args),
}));

import { CommunitySpaceView } from "@/components/study/community-space-view";
import { CommunityThreadView } from "@/components/study/community-thread-view";
import type { CommunitySpace } from "@/lib/community";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const space: CommunitySpace = {
  id: "class-11-notes-physics",
  title: "Physics (Class 11 Notes)",
  classSlug: "class-11-notes",
  className: "Class 11 Notes",
  subjectSlug: "physics",
  subjectName: "Physics",
  subjectHref: "/class-11-notes/physics",
};

const thread = {
  id: "t1",
  spaceId: space.id,
  title: "Why does friction act opposite to motion?",
  body: "In the block-on-incline problem, is friction always opposite to velocity?",
  author: "Aarav S.",
  createdAt: "2026-11-01T10:00:00.000Z",
  replyCount: 1,
  upvotes: 2,
  upvotedByYou: false,
};

const reply = {
  id: "r1",
  body: "Friction opposes relative motion between the surfaces, not velocity itself.",
  author: "Sita T.",
  createdAt: "2026-11-01T11:00:00.000Z",
};

beforeEach(() => {
  vi.clearAllMocks();
  listThreads.mockResolvedValue({ threads: [thread], migrated: true });
  createThread.mockResolvedValue({
    thread: { ...thread, id: "t2", title: "New discussion", body: "Hello", replyCount: 0, upvotes: 0 },
    migrated: true,
  });
  getThread.mockResolvedValue({ thread, replies: [reply], migrated: true });
  createReply.mockResolvedValue({
    reply: { id: "r2", body: "My own reply", author: "You.", createdAt: "2026-11-02T00:00:00.000Z" },
    migrated: true,
  });
  toggleUpvote.mockResolvedValue({ upvotes: 3, upvotedByYou: true, migrated: true });
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("CommunitySpaceView", () => {
  it("lists live threads and toggles upvotes", async () => {
    render(<CommunitySpaceView space={space} />);

    expect(
      await screen.findByText("Why does friction act opposite to motion?"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Aarav S\. ·/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /upvote why does friction/i }));
    await waitFor(() => expect(toggleUpvote).toHaveBeenCalledWith("t1"));
    // The button reflects the server's toggle result (2 → 3, now pressed).
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /upvote why does friction/i })).toHaveAttribute(
        "aria-pressed",
        "true",
      ),
    );
  });

  it("posts a new discussion through the composer", async () => {
    render(<CommunitySpaceView space={space} />);
    await screen.findByText("Why does friction act opposite to motion?");

    fireEvent.click(screen.getByRole("button", { name: /start a discussion/i }));
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New discussion" },
    });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: /post discussion/i }));

    await waitFor(() =>
      expect(createThread).toHaveBeenCalledWith(space.id, "New discussion", "Hello"),
    );
    expect(await screen.findByText("New discussion")).toBeInTheDocument();
  });

  it("says so honestly when the community tables are not migrated", async () => {
    listThreads.mockResolvedValue({ threads: [], migrated: false });

    render(<CommunitySpaceView space={space} />);

    expect(await screen.findByText(/not set up on this deployment yet/)).toBeInTheDocument();
  });
});

describe("CommunityThreadView", () => {
  it("renders the thread with its replies and posts new ones", async () => {
    render(<CommunityThreadView spaceId={space.id} threadId="t1" spaceName="Physics" />);

    expect(await screen.findByText("Why does friction act opposite to motion?")).toBeInTheDocument();
    expect(screen.getByText(/Friction opposes relative motion/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Your reply"), { target: { value: "My own reply" } });
    fireEvent.click(screen.getByRole("button", { name: /post reply/i }));

    await waitFor(() => expect(createReply).toHaveBeenCalledWith("t1", "My own reply"));
    expect(await screen.findByText("My own reply")).toBeInTheDocument();
  });

  it("upvotes the thread and reports a missing thread honestly", async () => {
    const { unmount } = render(
      <CommunityThreadView spaceId={space.id} threadId="t1" spaceName="Physics" />,
    );
    await screen.findByText("Why does friction act opposite to motion?");

    fireEvent.click(screen.getByRole("button", { name: /upvote this discussion/i }));
    await waitFor(() => expect(toggleUpvote).toHaveBeenCalledWith("t1"));
    unmount();

    getThread.mockResolvedValue({ thread: null, replies: [], migrated: true });
    render(<CommunityThreadView spaceId={space.id} threadId="gone" spaceName="Physics" />);
    expect(await screen.findByText(/does not exist/)).toBeInTheDocument();
    expect(screen.getByText(/may have been deleted/i)).toBeInTheDocument();
  });
});
