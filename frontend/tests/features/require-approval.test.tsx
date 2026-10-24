import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * LOGIN + OWNER-APPROVAL WALL ("the auth system", owner request 2026-10-17:
 * "apply the auth system lost in last few commits like waiting for approval
 * after creating account, lock for everything (also the periodic table in
 * header)").
 *
 * RequireApproval locks every (app) route behind a signed-in, APPROVED account:
 * signed-out visitors meet the lock screen (sign in / create account / check
 * approval status) carrying the mandated clearance notice; the notice board
 * stays open; an approved session renders the route. The session resolves in
 * the browser, so — same style as tests/features/home-public.test.tsx — we mock
 * useSession + usePathname and render the three states, then pin the layout
 * wiring at source level.
 */

const session = vi.hoisted(() => ({
  user: null as unknown,
  isLoading: false,
}));

const pathname = vi.hoisted(() => ({ value: "/home" }));

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

import { RequireApproval } from "@/features/auth/components/require-approval";

const CONTENT = <div data-testid="route-content">the library</div>;

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
  pathname.value = "/home";
});

describe("RequireApproval — login + owner-approval wall", () => {
  it("locks a signed-out visitor out of an app route", () => {
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("approval-lock")).toBeInTheDocument();
    expect(screen.queryByTestId("route-content")).toBeNull();
  });

  it("locks the periodic table (the header entry) for a signed-out visitor", () => {
    pathname.value = "/periodic-table";
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("approval-lock")).toBeInTheDocument();
    expect(screen.queryByTestId("route-content")).toBeNull();
  });

  it("carries the mandated clearance notice verbatim", () => {
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(
      screen.getByText(/Access to full write privileges requires clearance/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Login works after administrative approval and system verification only.",
      ),
    ).toBeInTheDocument();
  });

  it("offers sign-in, create-account and the approval-status screen", () => {
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/login");
    expect(hrefs).toContain("/signup");
    expect(hrefs).toContain("/welcome");
  });

  it("opens the route for an approved, signed-in account", () => {
    session.user = { id: "u1", email: "student@example.com" };
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("route-content")).toBeInTheDocument();
    expect(screen.queryByTestId("approval-lock")).toBeNull();
  });

  it("lets the notice board through without an account", () => {
    pathname.value = "/notice";
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("route-content")).toBeInTheDocument();
    expect(screen.queryByTestId("approval-lock")).toBeNull();
  });

  it("lets the plans page through without an account (visible to all users)", () => {
    pathname.value = "/plans";
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("route-content")).toBeInTheDocument();
    expect(screen.queryByTestId("approval-lock")).toBeNull();
  });

  it("renders neither side while the session resolves — no lock flash", () => {
    session.isLoading = true;
    render(<RequireApproval>{CONTENT}</RequireApproval>);
    expect(screen.getByTestId("approval-pending")).toBeInTheDocument();
    expect(screen.queryByTestId("route-content")).toBeNull();
    expect(screen.queryByTestId("approval-lock")).toBeNull();
  });
});

describe("auth wall wiring", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("is mounted in the (app) layout, in front of the coin gate", () => {
    const layout = read("app/(app)/layout.tsx");
    expect(layout).toContain(
      'import { RequireApproval } from "@/features/auth/components/require-approval"',
    );
    expect(layout).toContain("<RequireApproval>");

    // The auth wall wraps (sits outside) RouteCreditGate, so a signed-out
    // visitor meets the approval lock first — never a coin ask.
    const authWall = layout.indexOf("<RequireApproval>");
    const coinGate = layout.indexOf("<RouteCreditGate>");
    expect(authWall).toBeGreaterThan(-1);
    expect(coinGate).toBeGreaterThan(authWall);
  });

  it("keeps only the notice board and the plans page public inside the shell", () => {
    const gate = read("features/auth/components/require-approval.tsx");
    expect(gate).toContain('const PUBLIC_PATHS = ["/notice", "/plans"] as const;');
    // The periodic table must NOT be on the open list.
    expect(gate).not.toContain('"/periodic-table"');
  });
});
