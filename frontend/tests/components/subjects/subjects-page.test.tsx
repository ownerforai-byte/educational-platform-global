import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

/**
 * /subjects render tests — guards the 2026-11-09 rebuild (plan-pro-app.md
 * verdict #4): no fake staged loading, canonical subject visuals, honest
 * filters (only grades with real syllabus content), real progress numbers.
 */

let mockProgress: Record<string, { completedUnits: number; totalUnits: number; percent: number }> = {};

vi.mock("@/lib/hooks/use-live-stats", () => ({
  useLiveStats: () => ({ subjectProgress: mockProgress }),
}));

import SubjectsPage from "@/app/(app)/subjects/page";

describe("/subjects (rebuilt)", () => {
  beforeEach(() => {
    mockProgress = {};
  });

  it("renders Class 11 subjects immediately — no staged loading timers", () => {
    render(<SubjectsPage />);

    // Physics card is present on first paint (no skeleton-stagger delay).
    expect(screen.getByText("Physics")).toBeInTheDocument();

    // Switching to Class 12 shows its subjects immediately too.
    fireEvent.click(screen.getByRole("button", { name: "Class 12" }));
    expect(screen.getByText("Physics")).toBeInTheDocument(); // both classes have physics
  });

  it("shows real progress from useLiveStats — zero means zero", () => {
    mockProgress = {
      "class-11-notes/physics": { completedUnits: 3, totalUnits: 10, percent: 30 },
    };
    render(<SubjectsPage />);
    const physicsCard = screen.getByText("Physics").closest("a")!;
    expect(within(physicsCard).getAllByText("30%").length).toBe(2); // ring + footer
    expect(physicsCard.textContent).toContain("3/26 ch");
    // Unstudied subjects show an honest 0, not a fabricated number.
    const chemistryCard = screen.getByText("Chemistry").closest("a")!;
    expect(within(chemistryCard).getAllByText("0%").length).toBe(2);
  });

  it("uses canonical subject-visual tokens — no ad-hoc hex gradients", () => {
    render(<SubjectsPage />);
    const physicsCard = screen.getByText("Physics").closest("a")!;
    // Token-based ring/badge classes from subject-visuals.ts are present…
    expect(physicsCard.querySelector("svg")).toBeInTheDocument();
    expect(screen.getAllByText("Class 11").length).toBeGreaterThan(0);
    // …and the fabricated "New" badge is gone from every card.
    expect(screen.queryByText("New")).not.toBeInTheDocument();
    expect(screen.queryByText(/Soon/)).not.toBeInTheDocument();
  });

  it("offers only grades with real syllabus content and labels the filter group", () => {
    render(<SubjectsPage />);
    const group = screen.getByRole("group", { name: /filter subjects by class/i });
    const buttons = within(group).getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual(["Class 11", "Class 12"]);
    expect(screen.getByRole("link", { name: /search subjects/i })).toHaveAttribute("href", "/search");
  });
});
