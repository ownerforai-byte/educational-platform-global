import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

/**
 * /exam-countdown render tests — guards the 2026-11-09 rebuild
 * (plan-pro-app.md verdict #10): AD dates as source of truth, honest stale
 * calendar notice, real journey progress (no orphaned localStorage key),
 * no fake 999-day study-plan horizon.
 */

const mockGetProgress = vi.fn();

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => mockGetProgress(...args),
}));

import ExamCountdownPage from "@/app/(app)/exam-countdown/page";

function entry(topicId: string, completed = true) {
  return {
    id: `row-${topicId}`,
    topicId,
    completed,
    completedAt: completed ? "2026-11-01T00:00:00Z" : null,
    updatedAt: "2026-11-01T00:00:00Z",
    status: completed ? "completed" : "started",
  };
}

describe("/exam-countdown (rebuilt)", () => {
  beforeEach(() => {
    mockGetProgress.mockReset();
  });

  it("shows the honest stale-calendar notice and no fake countdown when all dates have passed", async () => {
    mockGetProgress.mockResolvedValue([]);
    render(<ExamCountdownPage />);

    // All configured dates (May 2025) are in the past → the page says so…
    const banner = await screen.findByText(/published exam dates for this cycle have passed/i);
    expect(banner).toBeInTheDocument();

    // …and never shows a fabricated "Next exam in 0 days" summary.
    expect(screen.queryByText(/next exam in/i)).not.toBeInTheDocument();

    // Per-subject chips show "passed" with the date, not "0 days left".
    expect((await screen.findAllByText(/— passed/i)).length).toBeGreaterThan(0);
  });

  it("derives syllabus coverage from the real journey API, not localStorage", async () => {
    // One completed Class 11 physics topic (unit ids follow the syllabus).
    mockGetProgress.mockImplementation(async () => {
      const { SYLLABUS, slugifySyllabusTopic } = await import("@/lib/syllabus");
      const cls = SYLLABUS.find((c) => c.slug === "class-11-notes")!;
      const physics = cls.subjects.find((s) => s.slug === "physics")!;
      const unit = physics.units[0];
      const topicSlug = slugifySyllabusTopic(unit.topics[0]);
      return [entry(`class-11-notes/physics/${unit.id}/${topicSlug}`)];
    });
    render(<ExamCountdownPage />);

    // The physics card renders with real coverage (1 completed topic):
    // the subject row shows "1/" in its coverage line.
    await screen.findByText("Physics");
    expect(screen.getAllByText(/\b1\//).length).toBeGreaterThan(0);
  });

  it("labels study plans honestly when no exam date is upcoming", async () => {
    mockGetProgress.mockResolvedValue([]);
    render(<ExamCountdownPage />);
    const labels = await screen.findAllByText(/no exam date published/i);
    expect(labels.length).toBeGreaterThan(0);
  });

  it("switches classes via the labelled group", async () => {
    mockGetProgress.mockResolvedValue([]);
    render(<ExamCountdownPage />);
    const group = screen.getByRole("group", { name: /choose class/i });
    const class12 = within(group).getByRole("button", { name: "Class 12" });
    fireEvent.click(class12);
    expect(class12).toHaveAttribute("aria-pressed", "true");
  });
});
