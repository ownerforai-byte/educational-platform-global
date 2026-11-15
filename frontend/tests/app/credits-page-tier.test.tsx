import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

const sessionState = {
  user: null as {
    id: string;
    email: string;
    role: string;
    premiumStatus?: boolean;
    plan?: string;
  } | null,
  isLoading: false,
};

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: sessionState.user,
    isLoading: sessionState.isLoading,
    logoutUser: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/lib/api/credits", () => ({
  getUserCredits: vi.fn(),
  getUserTransactions: vi.fn().mockResolvedValue([]),
}));

import { getUserCredits } from "@/lib/api/credits";
import CreditsPage from "@/app/(app)/credits/page";

const baseCredits = {
  id: "u1",
  email: "student@example.com",
  fullName: "Student",
  credits: 40,
  creditsLimit: 50,
  premiumApprovedAt: null,
  pendingRequests: [] as Array<{ id: string; status: string; created_at: string }>,
};

describe("CreditsPage account status", () => {
  beforeEach(() => {
    sessionState.user = null;
    vi.mocked(getUserCredits).mockReset();
  });

  it("shows live guest tier when signed out", async () => {
    vi.mocked(getUserCredits).mockRejectedValue(new Error("401"));

    render(<CreditsPage />);

    await waitFor(() => {
      expect(screen.getByText("Guest")).toBeInTheDocument();
    });
    expect(screen.getByText("Home chat widget only")).toBeInTheDocument();
  });

  it("derives Member from credits + session instead of hardcoded Free", async () => {
    sessionState.user = {
      id: "u1",
      email: "student@example.com",
      role: "member",
    };
    vi.mocked(getUserCredits).mockResolvedValue({
      ...baseCredits,
      role: "member",
      premiumStatus: false,
    });

    render(<CreditsPage />);

    await waitFor(() => {
      expect(screen.getByText("Member")).toBeInTheDocument();
    });
    expect(screen.queryByText("Free")).not.toBeInTheDocument();
    expect(screen.queryByText(/PRO · Active/i)).not.toBeInTheDocument();
  });

  it("derives Pro tier when premiumStatus is set", async () => {
    sessionState.user = {
      id: "u1",
      email: "student@example.com",
      role: "member",
      premiumStatus: true,
    };
    vi.mocked(getUserCredits).mockResolvedValue({
      ...baseCredits,
      role: "member",
      premiumStatus: true,
    });

    render(<CreditsPage />);

    await waitFor(() => {
      expect(screen.getAllByText("Pro").length).toBeGreaterThan(0);
    });
  });
});