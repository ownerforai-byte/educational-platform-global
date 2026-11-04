import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { useState } from "react";

/**
 * RouteCreditGate x study desk: tier is checked before an unlock is offered,
 * locked study-desk content is never mounted, and an in-progress attempt
 * survives the unlock window ending (a new attempt still needs an unlock).
 */

const state = vi.hoisted(() => ({
  pathname: "/srs",
  unlocked: false,
  credit: {} as Record<string, unknown>,
  openModule: vi.fn(async () => true),
}));

vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/lib/api/config", () => ({
  getPublicConfig: () => Promise.resolve({ coinGateEnabled: true, sectionMinTiers: {} }),
}));
vi.mock("@/features/credits/credit-provider", () => ({ useCredit: () => state.credit }));

import { RouteCreditGate } from "@/features/credits/route-gate";
import { useAttemptHold } from "@/features/credits/attempt-hold";

function setUser(plan: string | null) {
  state.credit = {
    user: plan === null ? null : { email: "s@example.com", role: "member", plan, credits: 5 },
    isAuthenticated: plan !== null,
    isUnlocked: () => state.unlocked,
    remainingClock: () => "00:10:00",
    openModule: state.openModule,
    requestAccess: () => {},
    noticeTitle: "Access Notice",
    error: null,
  };
}

let mounts = 0;
function Probe() {
  const [n] = useState(() => ++mounts);
  return <div>Cards (mount {n})</div>;
}

beforeEach(() => {
  state.pathname = "/srs";
  state.unlocked = false;
  state.openModule.mockClear();
  mounts = 0;
});

describe("RouteCreditGate tier check", () => {
  it("offers no unlock to a Member on Plus-only /srs and spends nothing", () => {
    setUser("member");
    render(<RouteCreditGate><div>section gate output</div></RouteCreditGate>);
    expect(screen.getByText("section gate output")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /upgrade/i })).toBeNull();
    expect(state.openModule).not.toHaveBeenCalled();
  });

  it("still offers the unlock to a Plus user on /srs", () => {
    setUser("plus");
    render(<RouteCreditGate><div>section gate output</div></RouteCreditGate>);
    expect(screen.getByRole("button", { name: /upgrade/i })).toBeInTheDocument();
  });

  it("keeps existing behaviour for accessible sections (member on /notes)", () => {
    state.pathname = "/notes";
    setUser("member");
    render(<RouteCreditGate><div>notes</div></RouteCreditGate>);
    expect(screen.getByRole("button", { name: /upgrade/i })).toBeInTheDocument();
  });
});

describe("no locked study content mounted", () => {
  it.each(["/srs", "/mock-exams", "/downloads"])("%s children are not mounted while locked", (p) => {
    state.pathname = p;
    setUser("pro");
    render(<RouteCreditGate><Probe /></RouteCreditGate>);
    expect(screen.queryByText(/Cards \(mount/)).toBeNull();
    expect(mounts).toBe(0);
    expect(screen.getByRole("button", { name: /upgrade/i })).toBeInTheDocument();
  });

  it("mounts the content once unlocked", () => {
    setUser("plus");
    state.unlocked = true;
    render(<RouteCreditGate><Probe /></RouteCreditGate>);
    expect(screen.getByText("Cards (mount 1)")).toBeInTheDocument();
  });

  it("keeps the blurred preview on other gated routes", () => {
    state.pathname = "/notes";
    setUser("member");
    render(<RouteCreditGate><Probe /></RouteCreditGate>);
    expect(screen.getByText(/Cards \(mount/)).toBeInTheDocument();
  });
});

describe("attempt preserved across the window ending", () => {
  function Exam() {
    const [started, setStarted] = useState(false);
    const [answer, setAnswer] = useState("");
    const { canStart } = useAttemptHold(started);
    return (
      <div>
        <button disabled={!canStart} onClick={() => setStarted(true)}>start</button>
        <input aria-label="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </div>
    );
  }

  it("does not remount the exam when the window closes mid-attempt", () => {
    state.pathname = "/mock-exams";
    setUser("pro");
    state.unlocked = true;
    const { rerender } = render(<RouteCreditGate><Exam /></RouteCreditGate>);
    fireEvent.click(screen.getByText("start"));
    fireEvent.change(screen.getByLabelText("answer"), { target: { value: "B" } });

    state.unlocked = false;
    act(() => rerender(<RouteCreditGate><Exam /></RouteCreditGate>));

    expect((screen.getByLabelText("answer") as HTMLInputElement).value).toBe("B");
    expect(screen.queryByRole("button", { name: /unlock — /i })).toBeNull();
    expect(screen.getByText("start")).toBeDisabled();
  });

  it("locks again when no attempt is held and the window closes", () => {
    state.pathname = "/mock-exams";
    setUser("pro");
    state.unlocked = true;
    const { rerender } = render(<RouteCreditGate><Exam /></RouteCreditGate>);
    state.unlocked = false;
    act(() => rerender(<RouteCreditGate><Exam /></RouteCreditGate>));
    expect(screen.getByRole("button", { name: /upgrade/i })).toBeInTheDocument();
    expect(screen.queryByLabelText("answer")).toBeNull();
  });
});
