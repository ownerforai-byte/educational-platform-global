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

const getProgress = vi.fn();
const updateProgress = vi.fn();

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => getProgress(...args),
  updateProgress: (...args: unknown[]) => updateProgress(...args),
}));

import { ProgressPanel } from "@/components/progress/progress-panel";
import type { ProgressEntry } from "@/types/api";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const path = (topicSlug: string) =>
  `class-11-notes/physics/kinematics/${topicSlug}`;

function entry(
  topicSlug: string,
  title: string,
  status: ProgressEntry["status"]
): ProgressEntry {
  const completed = status === "completed";
  return {
    id: completed ? `row-${topicSlug}` : `new:${path(topicSlug)}`,
    topicId: path(topicSlug),
    status,
    completed,
    completedAt: completed ? "2026-10-02T00:00:00.000Z" : null,
    updatedAt: "2026-10-02T00:00:00.000Z",
    startedAt: status === "not_started" ? null : "2026-10-01T00:00:00.000Z",
    lastViewedAt: status === "not_started" ? null : "2026-10-02T00:00:00.000Z",
    viewCount: status === "not_started" ? 0 : 3,
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "kinematics",
    topicSlug,
    topic: {
      slug: topicSlug,
      title,
      chapter: {
        slug: "kinematics",
        title: "Kinematics",
        subject: {
          slug: "physics",
          name: "Physics",
          class: { slug: "class-11-notes", name: "Class 11 Notes" },
        },
      },
    },
  };
}

const catalogue = [
  entry("equations-of-motion", "Equations of Motion", "completed"),
  entry("newtons-laws", "Newton's Laws of Motion", "in_progress"),
  entry("work-and-energy", "Work and Energy", "not_started"),
];

beforeEach(() => {
  vi.clearAllMocks();
  getProgress.mockResolvedValue(catalogue);
  updateProgress.mockResolvedValue(catalogue[1]);
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("ProgressPanel", () => {
  it("loads the journey once and shows the full summary", async () => {
    render(<ProgressPanel />);

    expect(await screen.findByText("Equations of Motion")).toBeInTheDocument();
    expect(getProgress).toHaveBeenCalledTimes(1);

    expect(screen.getByText("1 / 3 completed")).toBeInTheDocument();
    expect(screen.getByText("1 completed")).toBeInTheDocument();
    expect(screen.getByText("1 in progress")).toBeInTheDocument();
    expect(screen.getByText("1 not started")).toBeInTheDocument();
  });

  it("opens on started topics and can reveal the untouched ones", async () => {
    render(<ProgressPanel />);

    // Default filter = Started: completed + in progress are visible…
    expect(await screen.findByText("Equations of Motion")).toBeInTheDocument();
    expect(screen.getByText("Newton's Laws of Motion")).toBeInTheDocument();
    expect(screen.queryByText("Work and Energy")).not.toBeInTheDocument();

    // …and a click on "Not started" shows exactly the untouched topics.
    fireEvent.click(screen.getByRole("button", { name: "Not started" }));
    expect(await screen.findByText("Work and Energy")).toBeInTheDocument();
    expect(screen.queryByText("Equations of Motion")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(await screen.findByText("Equations of Motion")).toBeInTheDocument();
    expect(screen.queryByText("Work and Energy")).not.toBeInTheDocument();
  });

  it("marks a topic complete through the API and updates its badge", async () => {
    updateProgress.mockResolvedValue({
      ...catalogue[1],
      id: "row-newtons-laws",
      status: "completed",
      completed: true,
      completedAt: "2026-10-04T00:00:00.000Z",
      topicId: path("newtons-laws"),
    });

    render(<ProgressPanel />);
    await screen.findByText("Newton's Laws of Motion");

    fireEvent.click(screen.getByRole("button", { name: "Mark topic complete" }));

    await waitFor(() => {
      expect(updateProgress).toHaveBeenCalledWith({
        topic_id: path("newtons-laws"),
        completed: true,
      });
    });
    // Its row flipped from a clock ("in progress") to a filled check: the
    // toggle button now reads "Mark topic incomplete" for it as well.
    await waitFor(() => {
      expect(
        screen.getAllByRole("button", { name: "Mark topic incomplete" })
      ).toHaveLength(2);
    });
  });

  it("filters by subject when a subject card is picked", async () => {
    render(<ProgressPanel />);
    await screen.findByText("Equations of Motion");

    fireEvent.click(screen.getByRole("button", { name: /Physics/ }));

    // Physics is the only subject here, so the list survives the filter…
    expect(await screen.findByText("Equations of Motion")).toBeInTheDocument();

    // …and the card is marked active, with a way back to all subjects.
    expect(screen.getByRole("button", { name: /Clear subject/ })).toBeInTheDocument();
  });

  it("shows a sign-in prompt instead of an error for guests", async () => {
    getProgress.mockRejectedValue(
      Object.assign(new Error("Unauthorized"), { status: 401 })
    );

    render(<ProgressPanel />);

    expect(await screen.findByText("Sign in to track your journey")).toBeInTheDocument();
    expect(screen.queryByText(/Failed to load progress/)).not.toBeInTheDocument();
  });
});
