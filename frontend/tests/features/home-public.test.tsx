import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

/**
 * HOME FOR PUBLIC (SIGNED-OUT) VISITORS
 * (owner request 2026-10-16: "design a home for public (non paid users) also,
 * with a message of login works after administrative approval and system
 * verification only for users").
 *
 * /home is one route with two audiences:
 *   signed in   → member rails behind the Spark gate (unchanged),
 *   signed out  → the designed public home carrying the mandated access
 *                 message and only destinations that are genuinely free.
 * Rendering both branches here with a mocked session keeps the switch honest
 * without a backend.
 */

const session = vi.hoisted(() => ({
  user: null as unknown,
  isLoading: false,
}));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

import { HomeAudience } from "@/components/home/home-audience";
import { HomePublic } from "@/components/home/home-public";

/** The member tree is passed in as a prop (server-rendered by the page). */
const MEMBER_TREE = <div data-testid="member-rails" />;

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
});

describe("public home", () => {
  it("carries the mandated access message word for word", () => {
    render(<HomePublic />);
    expect(
      screen.getByText(
        "Login works after administrative approval and system verification only for users.",
      ),
    ).toBeInTheDocument();
  });

  it("explains the approval flow in three steps", () => {
    render(<HomePublic />);
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
    expect(screen.getByText("Administrative approval")).toBeInTheDocument();
    expect(screen.getByText("System verification")).toBeInTheDocument();
  });

  it("sends visitors to the login flow and the notice board", () => {
    render(<HomePublic />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/login");
    expect(hrefs).toContain("/notice");
  });

  it("only advertises destinations that are free or public", () => {
    render(<HomePublic />);
    const hrefs = new Set(
      screen.getAllByRole("link").map((a) => a.getAttribute("href")),
    );
    for (const free of [
      "/chat",
      "/lab",
      "/periodic-table",
      "/graphs",
      "/mindmap",
      "/quiz",
      "/pro-plan",
    ]) {
      expect(hrefs.has(free), `missing public entry: ${free}`).toBe(true);
    }
    // No spark-gated library route is advertised as open.
    expect(hrefs.has("/class-11-notes")).toBe(false);
    expect(hrefs.has("/syllabus")).toBe(false);
  });
});

describe("home audience branch", () => {
  it("shows the public home to a signed-out visitor", () => {
    render(<HomeAudience member={MEMBER_TREE} />);
    expect(screen.getByTestId("public-home")).toBeInTheDocument();
    expect(screen.queryByTestId("member-rails")).toBeNull();
  });

  it("shows the member tree (rails behind the Spark gate) to a signed-in viewer", () => {
    session.user = { id: "u1", email: "student@example.com" };
    render(<HomeAudience member={MEMBER_TREE} />);
    expect(screen.getByTestId("member-rails")).toBeInTheDocument();
    expect(screen.queryByTestId("public-home")).toBeNull();
  });

  it("renders nothing while the session resolves — no flash of either side", () => {
    session.isLoading = true;
    render(<HomeAudience member={MEMBER_TREE} />);
    expect(screen.queryByTestId("public-home")).toBeNull();
    expect(screen.queryByTestId("member-rails")).toBeNull();
  });
});
