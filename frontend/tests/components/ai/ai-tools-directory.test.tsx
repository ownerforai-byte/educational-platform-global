import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AiToolsDirectory } from "@/components/ai/ai-tools-directory";
import { useSession } from "@/features/auth/hooks/use-session";

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

describe("AI tools directory", () => {
  beforeEach(() => {
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

  it("lists the AI interfaces and marks higher-tier tools unavailable without a lock", () => {
    render(<AiToolsDirectory subjects={subjects} />);

    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("link", { name: /Veer Study Assistant/ })).toHaveAttribute(
      "href",
      "/chat",
    );
    expect(screen.getByText("Physics Classroom")).toBeInTheDocument();
    expect(screen.getAllByText("Unavailable · Plus access").length).toBeGreaterThan(0);
    expect(screen.getByText("Unavailable · Owner access")).toBeInTheDocument();
    expect(screen.queryByText(/lock/i)).not.toBeInTheDocument();
  });

  it("filters cards by category", () => {
    render(<AiToolsDirectory subjects={subjects} />);

    fireEvent.click(screen.getByRole("button", { name: "Language" }));

    expect(screen.getByText("Nepali Assistant")).toBeInTheDocument();
    expect(screen.getByText("Grammar Console")).toBeInTheDocument();
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

    expect(screen.getByRole("link", { name: /Math & Derivation Solver/ })).toHaveAttribute(
      "href",
      "/ai/math",
    );
    expect(screen.queryByText("Unavailable · Plus access")).not.toBeInTheDocument();
  });
});
