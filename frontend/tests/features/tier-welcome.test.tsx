import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * THE TIER WELCOME FLOW (owner direction 2026-10-23: "dont show login page
 * directly to any tier — create one welcome pages for each tier then after
 * that home page … opening direct welcome page after getting/knowing the tier
 * access then after clicking go - home page appears then all study materials").
 *
 * Every post-auth landing goes to the viewer's welcome page (never the login
 * form, never straight home); each welcome is gated to its own rung; and its
 * Go button opens that rung's tier home.
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

import {
  UniversalWelcome,
  MemberWelcome,
  PlusWelcome,
  ProWelcome,
  OwnerWelcome,
} from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";
import { TierHomeRouter } from "@/components/home/tier-home-router";
import { OWNER_EMAILS } from "@/lib/owner";

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
  replace.mockReset();
});

describe("TierWelcomeGate — one welcome page per viewer", () => {
  it("renders only the header, welcome body and footer for a signed-out visitor", () => {
    render(
      <TierWelcomeGate tier="visitor">
        <UniversalWelcome />
      </TierWelcomeGate>,
    );
    expect(
      screen.getByRole("heading", { name: /welcome to ravikisan/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go — continue to sign in/i }),
    ).toHaveAttribute("href", "/login");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.queryByRole("searchbox")).toBeNull();
    expect(screen.queryByRole("navigation", { name: /quick navigation/i })).toBeNull();
    expect(replace).not.toHaveBeenCalled();
  });

  it("never shows the universal welcome to an accessed user", () => {
    session.user = { email: "student@example.com" }; // no plan → member
    render(
      <TierWelcomeGate tier="visitor">
        <UniversalWelcome />
      </TierWelcomeGate>,
    );
    expect(
      screen.queryByRole("heading", { name: /welcome to ravikisan/i }),
    ).toBeNull();
    expect(replace).toHaveBeenCalledWith("/welcome/member");
  });

  it("moves a visitor off a member welcome to the guest welcome", () => {
    render(
      <TierWelcomeGate tier="member">
        <MemberWelcome />
      </TierWelcomeGate>,
    );
    expect(replace).toHaveBeenCalledWith("/welcome/guest");
  });

  it("shows each rung its own welcome (plus / pro / owner)", () => {
    session.user = { email: "student@example.com", plan: "plus" };
    const { unmount: u1 } = render(
      <TierWelcomeGate tier="plus">
        <PlusWelcome />
      </TierWelcomeGate>,
    );
    expect(screen.getByRole("heading", { name: /exam-ready/i })).toBeInTheDocument();
    u1();

    session.user = { email: "student@example.com", plan: "pro" };
    const { unmount: u2 } = render(
      <TierWelcomeGate tier="pro">
        <ProWelcome />
      </TierWelcomeGate>,
    );
    expect(screen.getByRole("heading", { name: /no caps/i })).toBeInTheDocument();
    u2();

    // Owner resolves by the real allowlist (lib/owner.ts), not by plan.
    session.user = { email: [...OWNER_EMAILS][0] };
    render(
      <TierWelcomeGate tier="owner">
        <OwnerWelcome />
      </TierWelcomeGate>,
    );
    expect(screen.getByRole("heading", { name: /plus the controls/i })).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });
});

describe("Go button → the tier home, then all study materials", () => {
  it("each welcome Go opens only its own tier home; visitor Go opens only login", () => {
    session.user = { email: "student@example.com" };
    const { unmount: u1 } = render(<MemberWelcome />);
    expect(screen.getByRole("link", { name: /go to my study desk/i })).toHaveAttribute(
      "href",
      "/home/member",
    );
    u1();

    session.user = { email: "student@example.com", plan: "plus" };
    const { unmount: u2 } = render(<PlusWelcome />);
    expect(screen.getByRole("link", { name: /go to my plus home/i })).toHaveAttribute(
      "href",
      "/home/plus",
    );
    u2();

    render(<UniversalWelcome />);
    expect(screen.getByRole("link", { name: /go — continue to sign in/i })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.queryByRole("link", { name: /go to my study desk/i })).toBeNull();
  });
});

describe("the entry feed — access first, then the matching welcome", () => {
  it("sends visitors to the universal welcome and users to their tier welcome", () => {
    // Visitor at the root: the universal welcome is rendered directly.
    const { unmount } = render(<TierHomeRouter landOn="welcome" />);
    expect(
      screen.getByRole("heading", { name: /welcome to ravikisan/i }),
    ).toBeInTheDocument();
    unmount();

    // A signed-in viewer is replaced onto their own tier welcome.
    session.user = { email: "student@example.com" };
    render(<TierHomeRouter landOn="welcome" />);
    expect(replace).toHaveBeenCalledWith("/welcome/member");
  });

  it("the root page feeds the welcome flow", () => {
    const src = readFileSync(path.resolve("app/page.tsx"), "utf8");
    expect(src).toContain('landOn="welcome"');
  });
});

describe("welcome pages and post-auth landings are wired", () => {
  const read = (p: string) => readFileSync(path.resolve(p), "utf8");

  it("all five tier welcome routes exist, each gated at its own rung", () => {
    for (const [tier, route] of [
      ["visitor", "guest"],
      ["member", "member"],
      ["plus", "plus"],
      ["pro", "pro"],
      ["owner", "owner"],
    ] as const) {
      const src = read(`app/welcome/${route}/page.tsx`);
      expect(src, `${route} welcome misses its gate`).toContain(
        `<TierWelcomeGate tier="${tier}">`,
      );
    }
    // The visitor route carries the universal welcome (Go → login).
    expect(read("app/welcome/guest/page.tsx")).toContain("UniversalWelcome");
  });

  it("every post-auth landing goes to the viewer's welcome page", () => {
    for (const file of [
      "app/auth/callback/page.tsx",
      "features/auth/components/login-form.tsx",
      "features/auth/components/signup-form.tsx",
      "app/login/logged-in-redirect.tsx",
    ]) {
      expect(read(file), file).toContain("tierWelcomePathFor");
      expect(read(file), file).not.toContain("tierHomePathFor");
    }
    // The approval-status screen keeps its own /welcome route untouched.
    expect(read("app/welcome/page.tsx")).toContain("WelcomeStatus");
  });
});
