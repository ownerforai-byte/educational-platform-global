import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { FeedComment } from "@/lib/api/community-feed";
import { CommentList } from "@/features/community/comment-list";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/features/profile/follow-button", () => ({ FollowButton: () => null }));

const callbacks = {
  onSelectFollowUp: vi.fn(),
  onOpenComposer: vi.fn(),
  onFollowChange: vi.fn(),
  onSaveEdit: vi.fn(async () => ({ ok: true })),
  onDelete: vi.fn(),
};

describe("community inline comments", () => {
  it("shows a reply target for bot replies and threaded human replies", () => {
    const comments: FeedComment[] = [
      {
        id: "bot-reply", body: "I can help.", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z",
        author: { id: "rn-study-assistant", fullName: "Veer", username: "veer", plan: "pro", role: "assistant" },
        replyTo: { id: "author", fullName: "Study Author", username: "study-author" },
      },
      {
        id: "human-reply", body: "Thanks!", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z",
        author: { id: "human", fullName: "Student", username: "student", plan: "member", role: "member" },
        parentId: "bot-reply", replyTo: { id: "rn-study-assistant", fullName: "Veer", username: "veer" },
      },
      {
        id: "top-level", body: "Another note", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z",
        author: { id: "human-2", fullName: "Another Student", username: "another", plan: "member", role: "member" },
      },
    ];
    render(
      <CommentList comments={comments} viewer={null} followUpBotCommentId={null} {...callbacks} />,
    );
    expect(screen.getByText("Replying to @study-author")).toBeInTheDocument();
    expect(screen.getByText("Replying to @veer")).toBeInTheDocument();
    expect(screen.queryByText(/Replying to @Another Student/)).not.toBeInTheDocument();
    expect(screen.getByTestId("bot-answer-guest-gate")).toBeInTheDocument();
  });
});
