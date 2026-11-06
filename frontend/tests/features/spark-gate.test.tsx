import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

/**
 * SPARKGATE — the single gate (plan.md §8 P4 + §9): lower tiers see a muted
 * disabled state, without lock icons or plan links, and open routes render
 * untouched. It works in two modes: route mode (the section registry decides
 * the rung for the pathname) and inline mode (an explicit `minLevel` for one
 * block). Owner runtime minimums (settings `section_min_tier.*`, published on
 * /api/config) move the line in route mode.
 */

const session = vi.hoisted(() => ({ user: null as unknown, isLoading: false }));
const pathname = vi.hoisted(() => ({ value: "/pdfs" }));
const overrides = vi.hoisted(() => ({ value: {} as Record<string, string> }));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    usePathname: () => pathname.value,
  };
});

vi.mock("@/lib/hooks/use-section-tiers", () => ({
  useSectionTierOverrides: () => overrides.value,
  refreshSectionTierOverrides: vi.fn(),
}));

import { SparkGate } from "@/features/credits/spark-gate";

const CONTENT = <div data-testid="section-content">the section</div>;

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
  pathname.value = "/pdfs";
  overrides.value = {};
});

describe("SparkGate — route mode (section registry)", () => {
  it("renders the section untouched at or above its rung", () => {
    session.user = { email: "student@example.com", plan: "pro" };
    render(<SparkGate>{CONTENT}</SparkGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("shows the muted card to a lower rung", () => {
    session.user = { email: "student@example.com" }; // member; PDF Library opens at Pro
    render(<SparkGate>{CONTENT}</SparkGate>);

    expect(screen.queryByTestId("section-content")).toBeNull();
    const heading = screen.getByRole("heading", {
      name: /pdf library is unavailable on this plan/i,
    });
    expect(heading).toBeInTheDocument();
    // Plans link lives in footer only — the gate card must not carry one.
    const hrefs = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
    expect(hrefs).not.toContain("/plans");
    expect(screen.getByRole("link", { name: /go to my home/i })).toHaveAttribute(
      "href",
      "/home",
    );
    expect(heading.closest("div")).toHaveClass("grayscale");
    expect(screen.getByText(/available to pro and above/i)).toBeInTheDocument();
  });

  it("matches deep routes to their section (the unit page gates like its root)", () => {
    session.user = { email: "student@example.com" };
    pathname.value = "/pdfs/some/deep/collection";
    render(<SparkGate>{CONTENT}</SparkGate>);
    expect(screen.queryByTestId("section-content")).toBeNull();
  });

  it("lets routes outside the registry through for every rung", () => {
    session.user = { email: "student@example.com" };
    pathname.value = "/credits";
    render(<SparkGate>{CONTENT}</SparkGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("applies owner runtime minimums from /api/config", () => {
    overrides.value = { "pdf-library": "member" };
    session.user = { email: "student@example.com" }; // member
    render(<SparkGate>{CONTENT}</SparkGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("raises the line when the owner moves a section up", () => {
    overrides.value = { "class-11-notes": "owner" };
    session.user = { email: "student@example.com", plan: "pro" };
    pathname.value = "/class-11-notes/physics";
    render(<SparkGate>{CONTENT}</SparkGate>);
    expect(screen.queryByTestId("section-content")).toBeNull();
    expect(
      screen.getByRole("heading", {
        name: /class 11 notes is unavailable on this plan/i,
      }),
    ).toBeInTheDocument();
  });
});

describe("SparkGate — inline mode (explicit rung)", () => {
  it("renders the block for a viewer at the rung", () => {
    session.user = { email: "student@example.com", plan: "pro" };
    render(
      <SparkGate minLevel="pro" title="Home features">
        {CONTENT}
      </SparkGate>,
    );
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("renders the block for the owner regardless of plan", () => {
    session.user = { email: "harindarsah98172@gmail.com", role: "owner" };
    render(<SparkGate minLevel="pro">{CONTENT}</SparkGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("shows the muted card with the rung for a lower tier", () => {
    session.user = { email: "student@example.com" }; // member
    render(
      <SparkGate
        minLevel="pro"
        title="Home features"
        description="Subject rails open on the Pro plan."
      >
        {CONTENT}
      </SparkGate>,
    );

    expect(screen.queryByTestId("section-content")).toBeNull();
    expect(screen.getByText("Home features")).toBeInTheDocument();
    expect(screen.getByText(/available to pro and above/i)).toBeInTheDocument();
    expect(screen.getByText("Subject rails open on the Pro plan.")).toBeInTheDocument();
    // Disabled, not lockable: no button, no plans link, no lock icon.
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("collapses to one line in the compact variant", () => {
    session.user = { email: "student@example.com" };
    render(
      <SparkGate minLevel="plus" compact>
        {CONTENT}
      </SparkGate>,
    );
    expect(screen.queryByTestId("section-content")).toBeNull();
    expect(screen.getByText(/available to plus and above/i)).toBeInTheDocument();
  });

  it("holds the slot while the session resolves", () => {
    session.user = null;
    session.isLoading = true;
    const { container } = render(<SparkGate minLevel="plus">{CONTENT}</SparkGate>);
    expect(container.firstChild).toBeNull();
  });
});
