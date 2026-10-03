import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImageHub } from "@/features/image-hub";

/**
 * UI contract for the Image Hub. The route is owner-gated, so a browser can
 * never reach it during tests — this render test is the substitute.
 *
 * Two modes now (owner request 2026-10-03: "train it for all kind of academic
 * images like lifecycle, labelling, all parts name with their interface with
 * supporting details which opens after hovering"):
 *
 *   · ACADEMIC FIGURE (default) → POST /api/ai/figure draws a labelled vector
 *     figure, the gallery shows its caption, its archetype and the "Parts &
 *     details" legend, and the raster chain is only used when it draws nothing;
 *   · PICTURE → the raster chain (Agnes server → puter.js) exactly as before.
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

const FIGURE_REPLY = {
  svg:
    '<svg viewBox="0 0 900 640">' +
    '<g><title>Nucleus — controls the cell and holds the DNA</title>' +
    '<circle cx="100" cy="100" r="40" stroke="#0f172a"/></g>' +
    "</svg>",
  caption: "Labelled animal cell",
  kind: "labelled",
  parts: [{ name: "Nucleus", detail: "controls the cell and holds the DNA" }],
};

function promptBox(): HTMLTextAreaElement {
  return screen.getByPlaceholderText(/describe the image/i) as HTMLTextAreaElement;
}

beforeEach(() => {
  sessionStorage.clear();
  mockedApiFetch.mockClear().mockRejectedValue(new Error("503 engines down"));
  mockedPuter.mockClear();
});

describe("ImageHub", () => {
  it("renders the composer, the two modes and the empty gallery", () => {
    render(<ImageHub />);

    expect(promptBox()).not.toBeNull();
    expect(screen.getByRole("button", { name: "Academic figure" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Picture" })).not.toBeNull();
    // The figure mode is the default, so the button asks for a figure.
    expect(screen.getByRole("button", { name: /draw figure/i })).not.toBeNull();
    expect(screen.getByText(/no images yet/i)).not.toBeNull();
    expect(screen.getByText(/Owner only/i)).not.toBeNull();
  });

  it("draws a vector figure with its parts legend in the gallery", async () => {
    mockedApiFetch.mockResolvedValueOnce(FIGURE_REPLY);
    render(<ImageHub />);

    fireEvent.change(promptBox(), { target: { value: "labelled animal cell" } });
    fireEvent.click(screen.getByRole("button", { name: /draw figure/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/Labelled structure · vector figure/)).not.toBeNull();
      },
      { timeout: 4000 },
    );

    // The hover legend is listed as data too, so every part name is readable
    // without a pointer.
    expect(screen.getByText(/Parts & details \(1\)/)).not.toBeNull();
    expect(screen.getByText("Nucleus")).not.toBeNull();
    // The detail is in the legend AND inside the figure's own <title>, which is
    // exactly what the hover tooltip reads out.
    expect(screen.getAllByText(/controls the cell and holds the DNA/).length).toBeGreaterThan(0);
    expect(promptBox().value).toBe("");
  });

  it("keeps the raster chain as the figure-mode fallback (figure → Agnes → puter)", async () => {
    render(<ImageHub />);

    fireEvent.change(promptBox(), { target: { value: "a figure the writer refuses" } });
    fireEvent.click(screen.getByRole("button", { name: /draw figure/i }));

    await waitFor(
      () => {
        expect(screen.getByText("puter.js (browser)")).not.toBeNull();
      },
      { timeout: 4000 },
    );

    // Both server engines were attempted before the browser fallback.
    expect(mockedApiFetch).toHaveBeenCalledTimes(2);
    expect(mockedPuter).toHaveBeenCalledTimes(1);
  });

  it("picture mode goes straight to the raster chain", async () => {
    render(<ImageHub />);

    fireEvent.click(screen.getByRole("button", { name: "Picture" }));
    expect(screen.getByRole("button", { name: /draw image/i })).not.toBeNull();

    fireEvent.change(promptBox(), { target: { value: "a nebula over Kathmandu" } });
    fireEvent.click(screen.getByRole("button", { name: /draw image/i }));

    await waitFor(
      () => {
        expect(screen.getByText("puter.js (browser)")).not.toBeNull();
      },
      { timeout: 4000 },
    );

    // Server first (mocked failure), then puter — never the figure writer.
    expect(mockedApiFetch).toHaveBeenCalledTimes(1);
    expect(mockedPuter).toHaveBeenCalledTimes(1);
    expect(screen.getByText("a nebula over Kathmandu")).not.toBeNull();
    expect(promptBox().value).toBe("");
  });

  it("restores a saved session and drops anything that is neither figure nor picture", () => {
    sessionStorage.setItem(
      "neb_image_hub_gallery",
      JSON.stringify([
        {
          id: "f1",
          prompt: "restored figure",
          at: 1,
          svg: '<svg viewBox="0 0 900 640"><g><title>Nucleus — control centre</title></g></svg>',
          caption: "Saved figure",
          archetype: "labelled",
          parts: [{ name: "Nucleus", detail: "control centre" }],
        },
        // An item from the sessions that predate figure mode (no `kind`).
        {
          id: "p1",
          prompt: "old picture",
          at: 2,
          url: "https://img.example/old.png",
          engine: "agnes",
          label: "agnes-image-2.1-flash",
        },
        { id: "junk", prompt: "junk" },
      ]),
    );

    render(<ImageHub />);

    expect(screen.getByText("Saved figure")).not.toBeNull();
    expect(screen.getByText(/Parts & details \(1\)/)).not.toBeNull();
    expect(screen.getByText("old picture")).not.toBeNull();
    expect(screen.queryByText("junk")).toBeNull();
  });

  it("keeps the prompt and shows an error when every engine fails", async () => {
    mockedPuter.mockResolvedValue(null);
    render(<ImageHub />);

    fireEvent.change(promptBox(), { target: { value: "never drawn" } });
    fireEvent.click(screen.getByRole("button", { name: /draw figure/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/neither engine could draw this/i)).not.toBeNull();
      },
      { timeout: 4000 },
    );

    expect(promptBox().value).toBe("never drawn");
    expect(screen.getByText(/no images yet/i)).not.toBeNull();
  });
});
