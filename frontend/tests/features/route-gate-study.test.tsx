import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouteCreditGate } from "@/features/credits/route-gate";

describe("RouteCreditGate passthrough", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/srs");
  });

  it.each(["/srs", "/mock-exams", "/notes"])(
    "renders children unconditionally on %s",
    (path) => {
      window.history.replaceState({}, "", path);
      render(
        <RouteCreditGate>
          <div>Study content</div>
        </RouteCreditGate>,
      );

      expect(screen.getByText("Study content")).toBeInTheDocument();
      expect(screen.queryByText(/unavailable on this plan/i)).toBeNull();
    },
  );

  it("does not show coin lock UI or an unlocked-window countdown", () => {
    render(
      <RouteCreditGate>
        <div>Exam content</div>
      </RouteCreditGate>,
    );

    expect(screen.getByText("Exam content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /unlock|upgrade/i })).toBeNull();
    expect(screen.queryByText(/until re-lock|window ended|\d\d:\d\d:\d\d/i)).toBeNull();
  });
});
