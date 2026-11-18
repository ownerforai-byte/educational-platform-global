import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  QuadArena,
  newQuadSession,
  parseQuadHistory,
  quadSessionPrefix,
  serializeQuadPanel,
  type QuadTurn,
} from "@/features/ai/components/quad-arena";
import {
  getChatHistory,
  getChatSessions,
  quadReply,
  saveChatHistory,
  type QuadLaneReply,
} from "@/lib/api/ai";
import { useSession } from "@/features/auth/hooks/use-session";
import type { SessionUser } from "@/features/auth/types";

/**
 * Regression gate for the owner's Model Quad (owner 2026-11-18: "4 square
 * interfaces showing reply (from 4 models …) from one prompt switchable to all
 * 6 subjects with chat history — history also changes with the subject, model
 * remains same").
 */

vi.mock("@/lib/api/ai", () => ({
  quadReply: vi.fn(),
  getChatHistory: vi.fn(),
  getChatSessions: vi.fn(),
  saveChatHistory: vi.fn(),
}));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: vi.fn(),
}));

vi.mock("@/components/content/math-markdown", () => ({
  MathMarkdown: ({ content }: { content: string }) => <p>{content}</p>,
}));

vi.mock("@/components/chat/step-cards", () => ({
  StepCards: ({ steps }: { steps: string[] }) => (
    <div>{steps.map((s, i) => <p key={i}>{s}</p>)}</div>
  ),
}));

const OWNER: SessionUser = {
  id: "owner-1",
  email: "someone-else@example.com",
  fullName: "Owner",
  role: "owner",
};

const MEMBER: SessionUser = {
  id: "member-1",
  email: "student@example.com",
  fullName: "Student",
  role: "member",
  plan: "member",
};

function lane(label: string, model: string, answer: string): QuadLaneReply {
  return {
    name: label.toLowerCase(),
    label,
    model,
    configured: true,
    ok: true,
    answer,
    ms: 12,
  };
}

const FOUR_LANES = [
  lane("Agnes", "agnes-3.0-flash", "Answer one."),
  lane("Groq", "openai/gpt-oss-20b", "Answer two."),
  lane("Gemini", "gemini-3.8-flash", "Answer three."),
  lane("LLM7.io", "gpt-oss:20b", "Answer four."),
];

function turn(prompt: string, labels: string[]): QuadTurn {
  return {
    prompt,
    panels: labels.map((label, i) => ({
      label,
      model: `model-${i}`,
      answer: `${label} reply to ${prompt}`,
      ok: true,
    })),
  };
}

describe("Model Quad arena", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(getChatSessions).mockResolvedValue({ sessions: [], migrated: true });
    vi.mocked(saveChatHistory).mockResolvedValue({ saved: 5, migrated: true });
    vi.mocked(getChatHistory).mockResolvedValue({ messages: [], migrated: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the owner gate and no console to anyone below the owner rung", () => {
    vi.mocked(useSession).mockReturnValue({
      user: MEMBER,
      isLoading: false,
      refresh: vi.fn(),
      logoutUser: vi.fn(),
    });

    render(<QuadArena />);

    expect(screen.getByText("Owner access only")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(/four models answer it side by side/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Physics")).not.toBeInTheDocument();
  });

  it("answers one prompt in four labelled squares and saves one history turn per model", async () => {
    vi.mocked(useSession).mockReturnValue({
      user: OWNER,
      isLoading: false,
      refresh: vi.fn(),
      logoutUser: vi.fn(),
    });
    vi.mocked(quadReply).mockResolvedValue({
      prompt: "Define inertia.",
      session: "quad:physics:test",
      subject: "physics",
      replies: FOUR_LANES,
    });

    render(<QuadArena />);

    fireEvent.change(
      screen.getByPlaceholderText(/four models answer it side by side/i),
      { target: { value: "Define inertia." } },
    );
    fireEvent.click(screen.getByRole("button", { name: /Ask all four/i }));

    for (const l of ["Agnes", "Groq", "Gemini", "LLM7.io"]) {
      expect(await screen.findByRole("article", { name: `Reply from ${l}` })).toBeInTheDocument();
    }
    expect(screen.getByText("Answer four.")).toBeInTheDocument();

    // The request carries the subject identity, the subject session namespace
    // and the new prompt (the server appends the prompt to the thread itself).
    await waitFor(() => expect(quadReply).toHaveBeenCalledTimes(1));
    const sent = vi.mocked(quadReply).mock.calls[0][0];
    expect(sent.prompt).toBe("Define inertia.");
    expect(sent.subject).toBe("physics");
    expect(sent.session?.startsWith(quadSessionPrefix("physics"))).toBe(true);
    expect(sent.messages?.[0].role).toBe("system");

    // One saved turn = 1 user message + one labelled assistant message per
    // answering model.
    await waitFor(() => expect(saveChatHistory).toHaveBeenCalledTimes(1));
    const saved = vi.mocked(saveChatHistory).mock.calls[0][1];
    expect(saved).toHaveLength(5);
    expect(saved[0]).toEqual({ role: "user", content: "Define inertia." });
    expect(saved[1].content.startsWith("**Agnes · agnes-3.0-flash**")).toBe(true);
  });

  it("switches history with the subject while the four model lanes stay the same", async () => {
    vi.mocked(useSession).mockReturnValue({
      user: OWNER,
      isLoading: false,
      refresh: vi.fn(),
      logoutUser: vi.fn(),
    });
    vi.mocked(getChatHistory).mockImplementation(async (session = "") => ({
      messages: session.startsWith(quadSessionPrefix("physics"))
        ? [{ role: "user", content: "Physics turn" }]
        : session.startsWith(quadSessionPrefix("mathematics"))
          ? [{ role: "user", content: "Mathematics turn" }]
          : [],
      migrated: true,
    }));

    render(<QuadArena />);

    // Physics first (the default desk), then Mathematics — each tab shows its
    // own thread and never the other's.
    expect(await screen.findByText("Physics turn")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mathematics" }));
    expect(await screen.findByText("Mathematics turn")).toBeInTheDocument();
    expect(screen.queryByText("Physics turn")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Physics" }));
    expect(await screen.findByText("Physics turn")).toBeInTheDocument();
    expect(screen.queryByText("Mathematics turn")).not.toBeInTheDocument();
  });

  it("round-trips a saved thread: serialised panels parse back to the same squares", () => {
    const thread: QuadTurn[] = [turn("What is force?", ["Agnes", "Groq", "Gemini", "LLM7.io"])];
    const saved = thread.flatMap((t) => [
      { role: "user" as const, content: t.prompt },
      ...t.panels.map((panel) => ({ role: "assistant" as const, content: serializeQuadPanel(panel) })),
    ]);

    expect(parseQuadHistory(saved)).toEqual(thread);
  });

  it("namespaces fresh sessions per subject", () => {
    expect(newQuadSession("physics").startsWith("quad:physics:")).toBe(true);
    expect(newQuadSession("mathematics").startsWith("quad:mathematics:")).toBe(true);
    expect(newQuadSession("physics")).not.toBe(newQuadSession("physics"));
  });
});
