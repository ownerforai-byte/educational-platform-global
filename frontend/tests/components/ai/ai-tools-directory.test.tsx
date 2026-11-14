import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory";
import { useSession } from "@/features/auth/hooks/use-session";
import { CARD_STAGGER_MS } from "@/lib/hooks/use-staggered-reveal";

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: vi.fn(),
}));

const subjects = [
  { slug: "physics", title: "Physics Classroom", description: "Physics help." },
  { slug: "chemistry", title: "Chemistry Classroom", description: "Chemistry help." },
  { slug: "biology", title: "Biology Classroom", description: "Biology help." },
  { slug: "mathematics", title: "Mathematics Classroom", description: "Math help." },
  { slug: "nepali", title: "Nepali Classroom", description: "Nepali help." },
  { slug: "english", title: "English Classroom", description: "English help." },
];

function revealAllTools(count: number) {
  act(() => {
    vi.advanceTimersByTime(Math.max(0, count - 1) * CARD_STAGGER_MS);
  });
}

describe("AI tools directory", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(useSession).mockReturnValue({
      user: {
        id: "member-1",
        email: "student@example.com",
        fullName: "Student",
        role: "member",
        plan: "member",
      },
      isLoading: false,
      refresh: vi.fn(),
      logoutUser: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("lists the AI interfaces and marks higher-tier tools unavailable without a lock", () => {
    render(<AiToolsDirectory subjects={subjects} />);
    revealAllTools(20);

    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getByRole("link", { name: /Community/ })).toHaveAttribute(
      "href",
      "/ai/community",
    );
    expect(screen.getByRole("link", { name: /Veer Study Assistant/ })).toHaveAttribute(
      "href",
      "/chat",
    );
    expect(screen.getByText("Physics Classroom")).toBeInTheDocument();
    // Gated tools are now aria-disabled cards carrying a "<tier>+" badge; the
    // old "Unavailable · Plus/Owner access" copy was replaced. Assert the
    // behaviour (non-link, disabled) rather than the literal label.
    expect(document.querySelectorAll('[aria-disabled="true"]').length).toBeGreaterThan(0);
    expect(screen.queryByText(/lock/i)).not.toBeInTheDocument();
  });

  it("filters cards by category", () => {
    render(<AiToolsDirectory subjects={subjects} />);
    revealAllTools(20);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    revealAllTools(6);

    expect(screen.getByText("Nepali Language Tutor")).toBeInTheDocument();
    expect(screen.getByText("English Grammar Console")).toBeInTheDocument();
    expect(screen.getByText("Nepali Classroom")).toBeInTheDocument();
    expect(screen.getByText("English Classroom")).toBeInTheDocument();
    expect(screen.queryByText("Math & Derivation Solver")).not.toBeInTheDocument();
  });

  it("opens plus-tier interfaces for plus members", () => {
    vi.mocked(useSession).mockReturnValue({
      user: {
        id: "plus-1",
        email: "plus@example.com",
        fullName: "Plus Student",
        role: "plus",
        plan: "plus",
      },
      isLoading: false,
      refresh: vi.fn(),
      logoutUser: vi.fn(),
    });

    render(<AiToolsDirectory subjects={subjects} />);
    revealAllTools(20);

    expect(screen.getByRole("link", { name: /Math & Derivation Solver/ })).toHaveAttribute(
      "href",
      "/ai/math",
    );
    // Plus unlocks the math solver, but owner-only tools stay gated.
    expect(document.querySelectorAll('[aria-disabled="true"]').length).toBeGreaterThan(0);
  });
});
