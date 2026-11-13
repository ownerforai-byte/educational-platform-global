import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";

import { HomePublic } from "@/components/home/home-public";

const session = vi.hoisted(() => ({ user: null as unknown, isLoading: false }));
const replace = vi.hoisted(() => vi.fn());
const postGuide = vi.hoisted(() => vi.fn());

vi.mock("@/lib/api/platform-guide", () => ({
  postPlatformGuideMessage: postGuide,
}));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({ replace }),
  };
});

vi.mock("@/features/credits/spark-gate", () => ({
  SparkGate: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/home/home-introduction", () => ({
  HomeIntroduction: () => <div data-testid="member-home" />,
}));

vi.mock("@/components/home/home-subject-rails", () => ({
  HomeSubjectRails: () => null,
}));

import HomePage from "@/app/(app)/home/page";

/**
 * THE GUEST HOME (owner 2026-10-25: the flow is "welcome → guest home → login
 * page → study home", and the guest home is designed "with only one or two
 * buttons with sign in, hide others").
 */
describe("guest home — sign in is the only action", () => {
  it("explains the approval requirement without exposing gated study routes", () => {
    render(<HomePublic />);

    expect(
      screen.getAllByText(/After signing, the account is approved by the system verification and administrative approval\./).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /^sign in$/i })).toHaveAttribute(
      "href",
      "/welcome/join",
    );
    expect(screen.getByTestId("guest-home-note-link")).toHaveAttribute(
      "href",
      "/welcome/join",
    );
    expect(screen.getAllByRole("link", { name: /access (notice|works)/i }).some((link) => link.getAttribute("href") === "/plans")).toBe(true);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).not.toContain("/notice");
  });

  it("routes guests to the inspiring note before the bare login wall", () => {
    render(<HomePublic />);

    // Account-request and plan CTAs stay hidden; primary actions open the
    // guest note (create / sign-in / check approval), not a bare /login wall.
    expect(screen.queryByRole("link", { name: /request an account/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /see all plans/i })).toBeNull();

    const joinLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/welcome/join");
    expect(joinLinks.length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).not.toContain("/login");
  });

  it("keeps the public overview clear and factual", () => {
    render(<HomePublic />);

    expect(screen.getByRole("heading", { name: "Your NEB syllabus, organized for daily study." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Syllabus-led study" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Exam preparation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Interactive science" })).toBeInTheDocument();

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).not.toContain("/class-11-notes");
    expect(hrefs).not.toContain("/lab");
    expect(hrefs).not.toContain("/chat");
  });
});

describe("visitor platform chat", () => {
  beforeEach(() => {
    postGuide.mockReset();
  });

  it("introduces Veer AI without volunteering the creator's name", () => {
    render(<HomePublic />);
    const chat = within(screen.getByRole("region", { name: "Chat with AI" }));
    expect(chat.queryByText(/Ravikisan/)).toBeNull();
    expect(chat.getByText(/Quick answers/)).toBeInTheDocument();
    expect(chat.getByPlaceholderText("Ask me anything")).toHaveAttribute("maxLength", "500");
    expect(chat.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  it("names the creator only when the visitor asks who created the platform", async () => {
    const reply = "Ravikisan created this platform. He built it in around three months while continuing his studies.";
    postGuide.mockResolvedValue({ reply });
    render(<HomePublic />);
    const chat = within(screen.getByRole("region", { name: "Chat with AI" }));
    fireEvent.change(chat.getByRole("textbox"), { target: { value: "Who created this platform?" } });
    fireEvent.click(chat.getByRole("button", { name: "Send" }));
    expect(postGuide).toHaveBeenCalledWith("Who created this platform?");
    expect(await chat.findByText(reply)).toBeInTheDocument();
  });

  it("answers an unrelated question briefly instead of redirecting", async () => {
    const reply = "Gravity is the pull between masses; on Earth it accelerates falling objects at about 9.8 m/s².";
    postGuide.mockResolvedValue({ reply });
    render(<HomePublic />);
    const chat = within(screen.getByRole("region", { name: "Chat with AI" }));
    fireEvent.change(chat.getByRole("textbox"), { target: { value: "Explain gravity" } });
    fireEvent.click(chat.getByRole("button", { name: "Send" }));
    expect(await chat.findByText(reply)).toBeInTheDocument();
  });

  it("allows another attempt after a request fails", async () => {
    postGuide.mockRejectedValueOnce(new Error("Guide unavailable"));
    render(<HomePublic />);
    const chat = within(screen.getByRole("region", { name: "Chat with AI" }));
    fireEvent.change(chat.getByRole("textbox"), { target: { value: "Where are the notes?" } });
    fireEvent.click(chat.getByRole("button", { name: "Send" }));
    expect(await chat.findByText("Guide unavailable")).toBeInTheDocument();
    await waitFor(() => expect(chat.getByRole("textbox")).not.toBeDisabled());
    postGuide.mockResolvedValueOnce({ reply: "Use the platform's notes section." });
    fireEvent.change(chat.getByRole("textbox"), { target: { value: "Where are the notes?" } });
    fireEvent.click(chat.getByRole("button", { name: "Send" }));
    expect(await chat.findByText("Use the platform's notes section.")).toBeInTheDocument();
    expect(chat.queryByText("Guide unavailable")).toBeNull();
  });
});

describe("member home route", () => {
  beforeEach(() => {
    session.user = null;
    session.isLoading = false;
    replace.mockReset();
  });

  it("feeds the viewer's rung to the tier interface, never the public overview", () => {
    // /home resolves the session's rung and lands on the exact tier interface
    // (the interface itself is pinned in tests/features/tier-home-gate.test.tsx).
    session.user = { email: "student@example.com" }; // no plan → member
    render(<HomePage />);
    expect(replace).toHaveBeenCalledWith("/home/member");
    expect(screen.queryByTestId("public-home")).toBeNull();
  });
});
