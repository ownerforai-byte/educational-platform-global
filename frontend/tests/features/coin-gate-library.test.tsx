import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

/**
 * RouteCreditGate is a transparent passthrough: it always renders its
 * children and never shows coin-lock UI. CoinGateDot remains the small ON/OFF
 * indicator whose words live in title/aria-label, nothing else.
 */

const state = vi.hoisted(() => ({
  pathname: "/notes",
  coinGateEnabled: true,
  /** True → getPublicConfig never resolves (the loading state). */
  pendingConfig: false,
  credit: {} as Record<string, unknown>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => state.pathname,
}));

vi.mock("@/lib/api/config", () => ({
  getPublicConfig: () =>
    state.pendingConfig
      ? new Promise(() => {/* never resolves — config still loading */})
      : Promise.resolve({ coinGateEnabled: state.coinGateEnabled }),
}));

vi.mock("@/features/credits/credit-provider", () => ({
  useCredit: () => state.credit,
}));

import { RouteCreditGate } from "@/features/credits/route-gate";
import { CoinGateDot } from "@/features/credits/coin-gate-dot";

const OWNER_USER = {
  email: "harindarsah98172@gmail.com",
  role: "owner",
  credits: 42,
};
const STUDENT_USER = {
  email: "student@example.com",
  role: "member",
  credits: 4,
};

/** Lock-copy text is used to verify that no coin-gate lock UI is rendered. */
const LOCK_COPY = /unavailable on this plan/i;

function setSession(user: Record<string, unknown> | null): void {
  state.credit = {
    user,
    isAuthenticated: user !== null,
    isUnlocked: () => false,
    remainingClock: () => "00:20:00",
    openModule: async () => true,
    requestAccess: () => {},
    noticeTitle: "Access Notice",
    error: null,
  };
}

function renderGate() {
  return render(
    <RouteCreditGate>
      <div>Library content</div>
    </RouteCreditGate>,
  );
}

beforeEach(() => {
  state.pathname = "/notes";
  state.coinGateEnabled = true;
  state.pendingConfig = false;
  setSession(null);
});

describe("RouteCreditGate — transparent passthrough", () => {
  it("owner + gate OFF → passes with no lock and no countdown badge", () => {
    state.coinGateEnabled = false;
    setSession(OWNER_USER);

    renderGate();

    expect(screen.queryByText(LOCK_COPY)).toBeNull();
    expect(screen.getByText("Library content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /unlock/i })).toBeNull();
    expect(screen.queryByText(/until re-lock/i)).toBeNull();
  });

  it("student + gate OFF → renders children without lock UI", () => {
    state.coinGateEnabled = false;
    setSession(STUDENT_USER);

    renderGate();

    expect(screen.getByText("Library content")).toBeInTheDocument();
    expect(screen.queryByText(LOCK_COPY)).toBeNull();
  });

  it("owner + gate ON → renders children without lock UI", () => {
    state.coinGateEnabled = true;
    setSession(OWNER_USER);

    renderGate();

    expect(screen.getByText("Library content")).toBeInTheDocument();
    expect(screen.queryByText(LOCK_COPY)).toBeNull();
  });

  it("guest + gate OFF → renders children without lock UI", () => {
    state.coinGateEnabled = false;
    setSession(null);

    renderGate();

    expect(screen.getByText("Library content")).toBeInTheDocument();
    expect(screen.queryByText(LOCK_COPY)).toBeNull();
  });
});

describe("CoinGateDot — the only ON/OFF indicator", () => {
  it("green windy dot with an OFF title when the gate is OFF", async () => {
    state.coinGateEnabled = false;

    render(<CoinGateDot />);

    const dot = await screen.findByTitle(/Spark gate OFF/);
    expect(dot).toBeInTheDocument();
    expect(dot.getAttribute("aria-label")).toMatch(/Spark gate OFF/);
    expect(dot.className).toContain("emerald");
  });

  it("muted dot with an ON title when the gate is ON", async () => {
    state.coinGateEnabled = true;

    render(<CoinGateDot />);

    const dot = await screen.findByTitle(/Spark gate ON/);
    expect(dot).toBeInTheDocument();
    expect(dot.className).not.toContain("emerald");
  });

  it("renders nothing while the config is still loading", async () => {
    state.pendingConfig = true;
    // The gate flag is a module-level shared store now (one poll for every
    // consumer), so earlier tests in this file have already resolved it.
    // First-load behaviour must be observed from a fresh module registry.
    vi.resetModules();
    const { CoinGateDot: FreshCoinGateDot } = await import(
      "@/features/credits/coin-gate-dot"
    );

    const { container } = render(<FreshCoinGateDot />);

    expect(container.firstChild).toBeNull();
  });
});
