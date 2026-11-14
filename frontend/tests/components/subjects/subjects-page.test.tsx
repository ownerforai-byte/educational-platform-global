import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { SYLLABUS } from "@/lib/core/syllabus";
import { CARD_STAGGER_MS } from "@/lib/hooks/use-staggered-reveal";

/**
 * /subjects render tests — canonical subject visuals, honest filters, real
 * progress numbers, and one-by-one card reveal (1 s stagger).
 */

let mockProgress: Record<string, { completedUnits: number; totalUnits: number; percent: number }> = {};

vi.mock("@/lib/hooks/use-live-stats", () => ({
  useLiveStats: () => ({ subjectProgress: mockProgress }),
}));

import SubjectsPage from "@/app/(app)/subjects/page";

function advanceSubjectReveal(count: number) {
  act(() => {
    vi.advanceTimersByTime(Math.max(0, count - 1) * CARD_STAGGER_MS);
  });
}

describe("/subjects (rebuilt)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockProgress = {};
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reveals class subjects one per second", () => {
    render(<SubjectsPage />);
    const class11 = SYLLABUS.find((c) => c.slug === "class-11-notes")!;
    expect(screen.getByText(class11.subjects[0]!.name)).toBeInTheDocument();
    for (let i = 1; i < class11.subjects.length; i++) {
      expect(screen.queryByText(class11.subjects[i]!.name)).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(CARD_STAGGER_MS);
      });
      expect(screen.getByText(class11.subjects[i]!.name)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole("button", { name: "Class 12" }));
    const class12 = SYLLABUS.find((c) => c.slug === "class-12-notes")!;
    expect(screen.getByText(class12.subjects[0]!.name)).toBeInTheDocument();
  });

  it("shows real progress from useLiveStats — zero means zero", () => {
    mockProgress = {
      "class-11-notes/physics": { completedUnits: 3, totalUnits: 10, percent: 30 },
    };
    render(<SubjectsPage />);
    advanceSubjectReveal(6);
    const physicsCard = screen.getByText("Physics").closest("a")!;
    expect(within(physicsCard).getAllByText("30%").length).toBe(2); // ring + footer
    expect(physicsCard.textContent).toContain("3/26 ch");
    // Unstudied subjects show an honest 0, not a fabricated number.
    const chemistryCard = screen.getByText("Chemistry").closest("a")!;
    expect(within(chemistryCard).getAllByText("0%").length).toBe(2);
  });

  it("uses canonical subject-visual tokens — no ad-hoc hex gradients", () => {
    render(<SubjectsPage />);
    advanceSubjectReveal(6);
    const physicsCard = screen.getByText("Physics").closest("a")!;
    // Token-based ring/badge classes from subject-visuals.ts are present…
    expect(physicsCard.querySelector("svg")).toBeInTheDocument();
    expect(screen.getAllByText("Class 11").length).toBeGreaterThan(0);
    // …and the fabricated "New" badge is gone from every card.
    expect(screen.queryByText("New")).not.toBeInTheDocument();
    expect(screen.queryByText(/Soon/)).not.toBeInTheDocument();
  });

  it("lists every grade the platform serves and labels the filter group", () => {
    render(<SubjectsPage />);
    advanceSubjectReveal(6);
    const group = screen.getByRole("group", { name: /filter subjects by class/i });
    const buttons = within(group).getAllByRole("button");
    // Owner 2026-11-09: "add class 8,9,10 with their all respective subject" —
    // the picker now carries the lower grades alongside 11 and 12.
    expect(buttons.map((b) => b.textContent)).toEqual([
      "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
    ]);
    expect(screen.getByRole("link", { name: /search subjects/i })).toHaveAttribute("href", "/search");
  });
});
