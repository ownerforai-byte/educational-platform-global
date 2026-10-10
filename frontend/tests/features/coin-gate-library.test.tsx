import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

/**
 * WHOLE-LIBRARY COIN GATE + THE WINDY DOT
 * (owner request 2026-10-04: "coin gate for owner … make it applicable for
 * whole coin gate library and keep only a small windy dot to show on off and
 * remove long message which shows this").
 *
 *   · RouteCreditGate: owner emails pass every paid route when the global
 *     `coin_gate_enabled` setting is OFF (the toggle no longer stops at AI
 *     chat); students and guests still unlock for coins either way, and an
 *     owner with the toggle ON is billed like a student.
 *   · CoinGateDot: the ONLY visible ON/OFF announcement left — a small windy
 *     dot whose words live in title/aria-label, nothing else.
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
  role: "OWNER",
  credits: 42,
};
const STUDENT_USER = {
  email: "student@example.com",
  role: "STUDENT",
  credits: 4,
};

/** /notes is not public, not exempt and matches no special route → theory. */
const LOCK_COPY = /part of the coin-gated library/i;

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

describe("RouteCreditGate — whole-library coin gate", () => {
  it("owner + gate OFF → passes with no lock and no countdown badge", async () => {
    state.coinGateEnabled = false;
    setSession(OWNER_USER);

    renderGate();

    // Wait for the config-resolved state (the first paint still shows the
    // lock while coinGateEnabled is null) — then assert the pass-through.
    await waitFor(() => {
      expect(screen.queryByText(LOCK_COPY)).toBeNull();
    });
    expect(screen.getByText("Library content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /unlock/i })).toBeNull();
    expect(screen.queryByText(/until re-lock/i)).toBeNull();
  });

  it("student + gate OFF → still locks (the toggle never frees students)", async () => {
    state.coinGateEnabled = false;
    setSession(STUDENT_USER);

    renderGate();

    expect(await screen.findByText(LOCK_COPY)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /unlock — \d+ coins/i }),
    ).toBeInTheDocument();
  });

  it("owner + gate ON → billed like a student (bill-everyone)", async () => {
    state.coinGateEnabled = true;
    setSession(OWNER_USER);

    renderGate();

    expect(await screen.findByText(LOCK_COPY)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /unlock — \d+ coins/i }),
    ).toBeInTheDocument();
  });

  it("guest + gate OFF → the lock stays (gate OFF only frees owner emails)", async () => {
    state.coinGateEnabled = false;
    setSession(null);

    renderGate();

    expect(await screen.findByText(LOCK_COPY)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in to unlock/i }),
    ).toBeInTheDocument();
  });
});

describe("CoinGateDot — the only ON/OFF indicator", () => {
  it("green windy dot with an OFF title when the gate is OFF", async () => {
    state.coinGateEnabled = false;

    render(<CoinGateDot />);

    const dot = await screen.findByTitle(/Coin gate OFF/);
    expect(dot).toBeInTheDocument();
    expect(dot.getAttribute("aria-label")).toMatch(/Coin gate OFF/);
    expect(dot.className).toContain("emerald");
  });

  it("muted dot with an ON title when the gate is ON", async () => {
    state.coinGateEnabled = true;

    render(<CoinGateDot />);

    const dot = await screen.findByTitle(/Coin gate ON/);
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
