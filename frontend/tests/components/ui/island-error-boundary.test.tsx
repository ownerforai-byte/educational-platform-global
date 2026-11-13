import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IslandErrorBoundary } from "@/components/ui/island-error-boundary";

vi.mock("@/lib/errors/app-error", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/errors/app-error")>();
  return {
    ...actual,
    reportClientError: vi.fn((scope: string, error: unknown) =>
      actual.asAppError(error),
    ),
  };
});

function Boom(): never {
  throw new Error("island exploded");
}

describe("IslandErrorBoundary", () => {
  it("renders a compact fallback when a child throws (page stays mounted)", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <div data-testid="page-shell">
        <IslandErrorBoundary name="test-island">
          <Boom />
        </IslandErrorBoundary>
      </div>,
    );
    expect(screen.getByTestId("page-shell")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    spy.mockRestore();
  });
});
