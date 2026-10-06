import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";

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

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => getProgress(...args),
}));

import { HomeJourneyStrip } from "@/components/home/home-journey-strip";
import type { ProgressEntry } from "@/types/api";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const TOPIC_PATH = "class-11-notes/physics/kinematics";

function entry(
  topicSlug: string,
  over: Partial<ProgressEntry> = {}
): ProgressEntry {
  return {
    id: `new:${TOPIC_PATH}/${topicSlug}`,
    topicId: `${TOPIC_PATH}/${topicSlug}`,
    completed: false,
    completedAt: null,
    updatedAt: "2026-10-01T00:00:00.000Z",
    status: "not_started",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "kinematics",
    topicSlug,
    ...over,
  };
}

/** The chapter route a tracked topic must link back to. */
const topicRoute = (topicSlug: string) =>
  `/class-11-notes/physics/chapters/kinematics/topics/${topicSlug}`;

function unauthorized() {
  return Object.assign(new Error("Unauthorized"), {
    status: 401,
    code: "UNAUTHORIZED",
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ─── Cases ──────────────────────────────────────────────────────────────────

describe("HomeJourneyStrip", () => {
  it("shows the skeleton first, then the summary", async () => {
    getProgress.mockResolvedValue([entry("vectors", { status: "in_progress" })]);

    const { container } = render(<HomeJourneyStrip />);

    // Skeleton: a busy band, not a flash of the guest door.
    expect(container.querySelector("[aria-busy='true']")).not.toBeNull();

    expect(
      await screen.findByRole("progressbar", { name: "Topics completed" })
    ).toBeInTheDocument();
  });

  it("gives a guest the sign-in door, not an error box", async () => {
    getProgress.mockRejectedValue(unauthorized());

    render(<HomeJourneyStrip />);

    expect(
      await screen.findByText("Your journey starts with one topic")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in to start/ })
    ).toHaveAttribute("href", "/login?next=/");
    expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
      "href",
      "/progress"
    );
    // No progress bar is promised to someone with no account.
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("summarises the counts and links the three most recent topics", async () => {
    getProgress.mockResolvedValue([
      entry("vectors", {
        status: "completed",
        completed: true,
        completedAt: "2026-10-05T00:00:00.000Z",
        lastViewedAt: "2026-10-05T00:00:00.000Z",
      }),
      entry("friction", {
        status: "in_progress",
        startedAt: "2026-10-04T00:00:00.000Z",
        lastViewedAt: "2026-10-04T00:00:00.000Z",
      }),
      entry("newtons-laws", {
        status: "completed",
        completed: true,
        completedAt: "2026-10-03T00:00:00.000Z",
        lastViewedAt: "2026-10-03T00:00:00.000Z",
      }),
      // Never opened: counts, but never a resume link.
      entry("work-energy", {}),
    ]);

    render(<HomeJourneyStrip />);

    const bar = await screen.findByRole("progressbar", {
      name: "Topics completed",
    });
    expect(bar).toHaveAttribute("aria-valuenow", "50"); // 2 of 4
    expect(screen.getByText("2 completed")).toBeInTheDocument();
    expect(screen.getByText("1 in progress")).toBeInTheDocument();
    expect(screen.getByText("4 topics in all")).toBeInTheDocument();

    const recent = screen.getByRole("list").closest("ul")!;
    const links = within(recent).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toHaveLength(3);
    // Newest activity first.
    expect(links[0]).toHaveAttribute("href", topicRoute("vectors"));
    expect(links[1]).toHaveAttribute("href", topicRoute("friction"));
    expect(links[2]).toHaveAttribute("href", topicRoute("newtons-laws"));

    expect(
      screen.getByRole("link", { name: /Open My Progress/ })
    ).toHaveAttribute("href", "/progress");
  });

  it("prompts a fresh account instead of showing an empty bar", async () => {
    getProgress.mockResolvedValue([entry("vectors"), entry("friction")]);

    render(<HomeJourneyStrip />);

    expect(await screen.findByText(/No topics yet/)).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("renders nothing at all when the API is down", async () => {
    getProgress.mockRejectedValue(
      Object.assign(new Error("Request failed: 500"), { status: 500 })
    );

    const { container } = render(<HomeJourneyStrip />);

    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });
});
