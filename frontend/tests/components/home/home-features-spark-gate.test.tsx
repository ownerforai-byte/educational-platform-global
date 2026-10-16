import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// ─── Mocks ──────────────────────────────────────────────────────────────────

const sessionState: {
  user: { email: string; plan?: string; premiumStatus?: boolean } | null;
  isLoading: boolean;
} = { user: null, isLoading: false };

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => sessionState,
}));

vi.mock("@/lib/owner", () => ({
  isOwnerEmail: (email: string | null | undefined) => email === "owner@test.dev",
}));

vi.mock("@/features/credits", () => ({
  CreditGate: ({
    moduleKey,
    label,
    children,
  }: {
    moduleKey: string;
    label?: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="credit-gate" data-module={moduleKey}>
      <p>{label}</p>
      {children}
    </div>
  ),
}));

import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

beforeEach(() => {
  sessionState.user = null;
  sessionState.isLoading = false;
});

const content = <p>home features body</p>;

describe("HomeFeaturesSparkGate", () => {
  it("shows the features directly to the owner", () => {
    sessionState.user = { email: "owner@test.dev" };
    render(<HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>);
    expect(screen.getByText("home features body")).toBeInTheDocument();
    expect(screen.queryByTestId("credit-gate")).toBeNull();
  });

  it("shows the features directly to a Pro member (plan = pro)", () => {
    sessionState.user = { email: "pro@test.dev", plan: "pro" };
    render(<HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>);
    expect(screen.getByText("home features body")).toBeInTheDocument();
    expect(screen.queryByTestId("credit-gate")).toBeNull();
  });

  it("shows the features directly to a Pro member via the legacy premium flag", () => {
    sessionState.user = { email: "legacy@test.dev", premiumStatus: true };
    render(<HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>);
    expect(screen.getByText("home features body")).toBeInTheDocument();
  });

  it("puts a plain member under the Spark gate", () => {
    sessionState.user = { email: "member@test.dev", plan: "member" };
    render(<HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>);
    const gate = screen.getByTestId("credit-gate");
    expect(gate).toHaveAttribute("data-module", "home:features");
    expect(screen.getByText("Home features — Owner & Pro members")).toBeInTheDocument();
  });

  it("puts a guest (signed out) under the Spark gate", () => {
    sessionState.user = null;
    render(<HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>);
    expect(screen.getByTestId("credit-gate")).toBeInTheDocument();
  });

  it("renders nothing while the session is loading (no lock flash for owner/Pro)", () => {
    sessionState.user = null;
    sessionState.isLoading = true;
    const { container } = render(
      <HomeFeaturesSparkGate>{content}</HomeFeaturesSparkGate>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
