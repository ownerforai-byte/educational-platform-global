import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImageHub } from "@/features/image-hub";

/**
 * UI contract for the Image Hub (owner request 2026-10-02). The route is
 * owner-gated, so a browser can never reach it during tests — this render
 * test is the substitute: prompt → engine order (server fails → puter.js
 * fallback, via the real requestHubImage) → the picture lands in the
 * gallery and the prompt clears.
 */

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn().mockRejectedValue(new Error("503 engines down")),
}));
vi.mock("@/lib/puter-image", () => ({
  drawFigureWithPuter: vi.fn(async () => "data:image/png;base64,TESTPIXELS"),
}));

import { apiFetch } from "@/lib/api-client";
import { drawFigureWithPuter } from "@/lib/puter-image";

const mockedApiFetch = vi.mocked(apiFetch);
const mockedPuter = vi.mocked(drawFigureWithPuter);

beforeEach(() => {
  sessionStorage.clear();
  mockedApiFetch.mockClear().mockRejectedValue(new Error("503 engines down"));
  mockedPuter.mockClear();
});

describe("ImageHub", () => {
  it("renders the composer and the empty gallery", () => {
    render(<ImageHub />);
    expect(screen.getByPlaceholderText(/describe the image/i)).not.toBeNull();
    expect(screen.getByRole("button", { name: /draw image/i })).not.toBeNull();
    expect(screen.getByText(/no images yet/i)).not.toBeNull();
    expect(screen.getByText(/Owner only/i)).not.toBeNull();
  });

  it("falls back to puter.js when the server fails, then shows the picture in the gallery", async () => {
    render(<ImageHub />);

    fireEvent.change(screen.getByPlaceholderText(/describe the image/i), {
      target: { value: "a nebula over Kathmandu" },
    });
    fireEvent.click(screen.getByRole("button", { name: /draw image/i }));

    await waitFor(
      () => {
        expect(screen.getByText("puter.js (browser)")).not.toBeNull();
      },
      { timeout: 4000 },
    );

    // The real engine order ran: server first (mocked failure), then puter.
    expect(mockedApiFetch).toHaveBeenCalledTimes(1);
    expect(mockedPuter).toHaveBeenCalledTimes(1);
    // The caption is in the gallery and the composer cleared.
    expect(screen.getByText("a nebula over Kathmandu")).not.toBeNull();
    expect(
      (screen.getByPlaceholderText(/describe the image/i) as HTMLTextAreaElement).value,
    ).toBe("");
  });

  it("keeps the prompt and shows an error when both engines fail", async () => {
    mockedPuter.mockResolvedValue(null);
    render(<ImageHub />);

    fireEvent.change(screen.getByPlaceholderText(/describe the image/i), {
      target: { value: "never drawn" },
    });
    fireEvent.click(screen.getByRole("button", { name: /draw image/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/neither engine could draw this/i)).not.toBeNull();
      },
      { timeout: 4000 },
    );
    expect(
      (screen.getByPlaceholderText(/describe the image/i) as HTMLTextAreaElement).value,
    ).toBe("never drawn");
    expect(screen.getByText(/no images yet/i)).not.toBeNull();
  });
});
