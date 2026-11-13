import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

/**
 * Regression for the E2E guest-home failure (2026-11-08): /api/auth/me keeps
 * isLoading true for up to 6s on a cold Render backend, and TierHomeRouter
 * used to render only its spinner for that whole window — so a first-time
 * visitor saw no "Sign in" and the guest smoke spec's 5s visibility check
 * failed. A visitor with no cached session is a guest with certainty, so the
 * public home must be on the FIRST paint.
 */
const session = vi.hoisted(() => ({ user: null as unknown, isLoading: true }));
const replace = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return { ...actual, useRouter: () => ({ replace }) };
});

import { TierHomeRouter } from "@/components/home/tier-home-router";

beforeEach(() => {
  session.user = null;
  session.isLoading = true;
  replace.mockReset();
});

describe("TierHomeRouter — guest first paint", () => {
  it("renders the guest home even while the session probe is still loading", () => {
    render(<TierHomeRouter />);

    expect(screen.getByTestId("public-home")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^sign in$/i })).toHaveAttribute(
      "href",
      "/welcome/join",
    );
    expect(replace).not.toHaveBeenCalled();
  });

  it("renders the universal welcome at the entry with the same immediate paint", () => {
    render(<TierHomeRouter landOn="welcome" />);

    expect(screen.queryByTestId("public-home")).toBeNull();
    expect(replace).not.toHaveBeenCalled();
  });
});
