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

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => getProgress(...args),
}));

import { CertificatesBoard } from "@/components/certificates/certificates-board";
import type { ProgressEntry } from "@/types/api";

// ─── Fixtures ───────────────────────────────────────────────────────────────

function entry(
  classSlug: string,
  subjectSlug: string,
  subjectName: string,
  unitSlug: string,
  unitTitle: string,
  topicSlug: string,
  completed: boolean,
): ProgressEntry {
  return {
    id: completed ? `row-${topicSlug}` : `new:${classSlug}/${subjectSlug}/${unitSlug}/${topicSlug}`,
    topicId: `${classSlug}/${subjectSlug}/${unitSlug}/${topicSlug}`,
    status: completed ? "completed" : "not_started",
    completed,
    completedAt: completed ? "2026-10-02T00:00:00.000Z" : null,
    updatedAt: "2026-10-02T00:00:00.000Z",
    classSlug,
    subjectSlug,
    unitSlug,
    topicSlug,
    topic: {
      slug: topicSlug,
      title: topicSlug,
      chapter: {
        slug: unitSlug,
        title: unitTitle,
        subject: { slug: subjectSlug, name: subjectName },
      },
    },
  };
}

// Physics is fully mastered (both units certified); Chemistry has one unit
// half-done and one untouched — every certificate state in one fixture.
const catalogue: ProgressEntry[] = [
  entry("class-11-notes", "physics", "Physics", "kinematics", "Kinematics", "motion", true),
  entry("class-11-notes", "physics", "Physics", "kinematics", "Kinematics", "vectors", true),
  entry("class-11-notes", "physics", "Physics", "mechanics", "Mechanics", "forces", true),
  entry("class-11-notes", "physics", "Physics", "mechanics", "Mechanics", "energy", true),
  entry("class-11-notes", "chemistry", "Chemistry", "basics", "Basic Concepts", "mole", true),
  entry("class-11-notes", "chemistry", "Chemistry", "basics", "Basic Concepts", "atoms", false),
  entry("class-11-notes", "chemistry", "Chemistry", "organic", "Organic Chemistry", "alkanes", false),
  entry("class-11-notes", "chemistry", "Chemistry", "organic", "Organic Chemistry", "alkenes", false),
];

beforeEach(() => {
  vi.clearAllMocks();
  getProgress.mockResolvedValue(catalogue);
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("CertificatesBoard", () => {
  it("derives unit and subject certificates from real progress", async () => {
    render(<CertificatesBoard />);

    await screen.findByText("Kinematics");

    // 2 unit certificates + 1 subject certificate (Physics is fully mastered).
    expect(screen.getByText("Certificates earned")).toBeInTheDocument();
    expect(screen.getByText("2 unit · 1 subject")).toBeInTheDocument();
    expect(screen.getByText("Subject certified")).toBeInTheDocument();

    // The certified units are marked, the untouched one stays locked.
    expect(screen.getAllByText("Certified").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("filters certificates by status", async () => {
    render(<CertificatesBoard />);
    await screen.findByText("Kinematics");

    fireEvent.click(screen.getByRole("button", { name: "Certified" }));
    expect(screen.getByText("Kinematics")).toBeInTheDocument();
    expect(screen.getByText("Mechanics")).toBeInTheDocument();
    expect(screen.queryByText("Organic Chemistry")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Not started" }));
    expect(screen.queryByText("Kinematics")).not.toBeInTheDocument();
    expect(await screen.findByText("Organic Chemistry")).toBeInTheDocument();
  });

  it("filters certificates by subject", async () => {
    render(<CertificatesBoard />);
    await screen.findByText("Kinematics");

    fireEvent.click(screen.getByRole("button", { name: "Chemistry" }));

    expect(screen.queryByText("Kinematics")).not.toBeInTheDocument();
    expect(await screen.findByText("Organic Chemistry")).toBeInTheDocument();
    expect(screen.getByText("Basic Concepts")).toBeInTheDocument();
  });

  it("shows a sign-in prompt instead of an error for guests", async () => {
    getProgress.mockRejectedValue(Object.assign(new Error("Unauthorized"), { status: 401 }));

    render(<CertificatesBoard />);

    expect(await screen.findByText("Sign in to earn certificates")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/login?next=/certificates",
    );
    await waitFor(() => expect(getProgress).toHaveBeenCalledTimes(1));
  });
});
