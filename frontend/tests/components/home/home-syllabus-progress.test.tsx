import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import type { JourneySummary } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

type JourneyState = {
  entries: ProgressEntry[];
  summary: JourneySummary | null;
  loading: boolean;
  failed: boolean;
};

const journey = vi.hoisted(() => ({
  current: {
    entries: [] as ProgressEntry[],
    summary: null as JourneySummary | null,
    loading: true,
    failed: false,
  },
}));

vi.mock("@/components/study/use-journey", () => ({
  useJourney: () => journey.current,
}));

import { HomeSyllabusProgressBar } from "@/components/home/home-syllabus-progress";

const TOPIC_PATH = "class-11-notes/physics/kinematics";

function entry(
  topicSlug: string,
  over: Partial<ProgressEntry> = {},
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

function summary(percent: number): JourneySummary {
  return {
    total: 10,
    completed: 4,
    inProgress: 1,
    notStarted: 5,
    percent,
  };
}

function setJourney(next: Partial<JourneyState>) {
  journey.current = {
    entries: [],
    summary: null,
    loading: false,
    failed: false,
    ...next,
  };
}

beforeEach(() => {
  setJourney({ loading: true });
});

describe("HomeSyllabusProgressBar", () => {
  it("stays hidden while the journey is loading", () => {
    setJourney({ loading: true, summary: summary(40) });

    const { container } = render(<HomeSyllabusProgressBar />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("stays hidden when the journey failed or returned no summary", () => {
    setJourney({ failed: true, summary: summary(40) });
    const failed = render(<HomeSyllabusProgressBar />);
    expect(failed.container).toBeEmptyDOMElement();
    failed.unmount();

    setJourney({ failed: false, summary: null });
    const empty = render(<HomeSyllabusProgressBar />);
    expect(empty.container).toBeEmptyDOMElement();
    expect(screen.queryByText("0%")).toBeNull();
  });

  it("shows the syllabus percent once the summary is ready", () => {
    setJourney({
      summary: summary(42),
      entries: [entry("vectors", { status: "completed", completed: true })],
    });

    render(<HomeSyllabusProgressBar />);

    expect(screen.getByText("Syllabus")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar", { name: "Syllabus coverage" });
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(screen.queryByRole("link", { name: "Continue" })).toBeNull();
  });

  it("links Continue to the in-progress topic", () => {
    setJourney({
      summary: summary(42),
      entries: [
        entry("vectors", { status: "completed", completed: true }),
        entry("friction", { status: "in_progress" }),
      ],
    });

    render(<HomeSyllabusProgressBar />);

    expect(screen.getByRole("link", { name: "Continue" })).toHaveAttribute(
      "href",
      "/class-11-notes/physics/chapters/kinematics/topics/friction",
    );
  });

  it("omits Continue when nothing is in progress", () => {
    setJourney({
      summary: { ...summary(20), inProgress: 0 },
      entries: [entry("vectors", { status: "completed", completed: true })],
    });

    render(<HomeSyllabusProgressBar />);

    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Continue" })).toBeNull();
  });
});
