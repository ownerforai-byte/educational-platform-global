import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * ONE TIER PAGE PER VIEWER (owner direction 2026-10-23: "identify the access of
 * plan of user and feed him the page of his plan whether it is guest, member,
 * plus, pro or owner … once logged then only tier pages — no all or two tier
 * pages at once").
 *
 * The gate renders the hardcoded interface ONLY at the viewer's own rung and
 * replaces everyone else onto their own home ("/" for visitors); /home feeds
 * the same rung→page router; a plus_20 pass resolves to the Plus rung; and the
 * login/signup pages bounce signed-in sessions away ("no login page again").
 */

const session = vi.hoisted(() => ({ user: null as unknown, isLoading: false }));
const replace = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({ replace }),
  };
});

import { TierHomeGate } from "@/components/home/tier-home-gate";

const HOME = <div data-testid="tier-home">tier interface</div>;

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
  replace.mockReset();
});

describe("TierHomeGate — one tier page per viewer", () => {
  it("renders the interface at the viewer's own rung, no redirect", () => {
    session.user = { email: "student@example.com" }; // no plan → member
    render(<TierHomeGate tier="member">{HOME}</TierHomeGate>);
    expect(screen.getByTestId("tier-home")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("replaces a viewer who opens a wrong tier page onto their own home", () => {
    session.user = { email: "student@example.com" }; // member opening /home/plus
    render(<TierHomeGate tier="plus">{HOME}</TierHomeGate>);
    expect(screen.queryByTestId("tier-home")).toBeNull();
    expect(replace).toHaveBeenCalledWith("/home/member");
  });

  it("sends signed-out visitors to the public overview", () => {
    render(<TierHomeGate tier="member">{HOME}</TierHomeGate>);
    expect(screen.queryByTestId("tier-home")).toBeNull();
    expect(replace).toHaveBeenCalledWith("/");
  });

  it("treats the temporary plus_20 pass as the Plus rung", () => {
    session.user = {
      email: "student@example.com",
      plan: "plus_20",
      planExpiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    };
    render(<TierHomeGate tier="plus">{HOME}</TierHomeGate>);
    expect(screen.getByTestId("tier-home")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("never shows two tier interfaces: a pro on /home/owner lands on /home/pro", () => {
    session.user = { email: "student@example.com", plan: "pro" };
    render(<TierHomeGate tier="owner">{HOME}</TierHomeGate>);
    expect(screen.queryByTestId("tier-home")).toBeNull();
    expect(replace).toHaveBeenCalledWith("/home/pro");
  });

  it("waits for the session without moving the viewer", () => {
    session.isLoading = true;
    render(<TierHomeGate tier="member">{HOME}</TierHomeGate>);
    expect(screen.queryByTestId("tier-home")).toBeNull();
    expect(replace).not.toHaveBeenCalled();
  });
});

describe("tier pages and auth pages are wired to the feed", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("every tier route page is wrapped in the gate at its own rung", () => {
    for (const tier of ["member", "plus", "pro", "owner"] as const) {
      const src = read(`app/(app)/home/${tier}/page.tsx`);
      expect(src, `${tier} page misses its gate`).toContain(
        `<TierHomeGate tier="${tier}">`,
      );
    }
  });

  it("/home feeds the rung router and the auth pages bounce signed-in users", () => {
    expect(read("app/(app)/home/page.tsx")).toContain("TierHomeRouter");
    expect(read("app/login/page.tsx")).toContain("LoggedInRedirect");
    expect(read("app/signup/page.tsx")).toContain("LoggedInRedirect");
  });
});
