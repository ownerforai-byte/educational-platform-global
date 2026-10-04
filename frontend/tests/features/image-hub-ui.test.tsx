import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImageHub } from "@/features/image-hub";
import type { ImageHistoryRow } from "@/features/image-hub/history";

/**
 * UI contract for the Image Hub. The route asks only for a login (open to
 * every student since 2026-10-04), so a browser can reach it in production —
 * this render suite still pins the behaviour without a network.
 *
 * Three contracts now:
 *   · the composer modes (ACADEMIC FIGURE → POST /api/ai/figure, PICTURE →
 *     the Agnes raster chain, puter.js as the browser fallback) exactly as
 *     before;
 *   · the account history: the gallery loads from GET /api/ai/image-history
 *     on mount, and a browser-drawn puter.js picture is POSTed there right
 *     after it lands (server draws save themselves);
 *   · clearing the gallery also clears the account history (DELETE).
 */

const historyRows: ImageHistoryRow[] = [];
/** When set, POST /api/ai/figure resolves with this instead of throwing. */
let figureReply: unknown;

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(async (path: string, init?: RequestInit) => {
    if (path.startsWith("/api/ai/image-history")) {
      const method = init?.method ?? "GET";
      if (method === "GET") return { items: [...historyRows], migrated: true };
      if (method === "DELETE") {
        historyRows.length = 0;
        return { cleared: true };
      }
      if (method === "POST") {
        historyRows.unshift({
          id: `srv-${historyRows.length + 1}`,
          kind: "picture",
          prompt: String(JSON.parse(String(init?.body)).prompt),
          url: String(JSON.parse(String(init?.body)).url),
          engine: "puter.js (browser)",
          createdAt: new Date().toISOString(),
        });
        return { saved: true };
      }
    }
    if (path === "/api/ai/figure" && figureReply !== undefined) return figureReply;
    throw new Error("503 engines down");
  }),
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

/** Calls to the DRAW endpoints only — the history CRUD is counted separately. */
function drawCalls(): number {
  return mockedApiFetch.mock.calls.filter(
    ([path]) => path === "/api/ai/image" || path === "/api/ai/figure",
  ).length;
}

function historyCalls(method: "GET" | "POST" | "DELETE"): number {
  return mockedApiFetch.mock.calls.filter(
    ([path, init]) =>
      typeof path === "string" &&
      path.startsWith("/api/ai/image-history") &&
      (init?.method ?? "GET").toUpperCase() === method,
  ).length;
}

beforeEach(() => {
  sessionStorage.clear();
  historyRows.length = 0;
  figureReply = undefined;
  mockedApiFetch.mockClear();
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
    // The account-history badge (the empty state repeats the phrase, so count).
    expect(screen.getAllByText(/saved to your account/i).length).toBeGreaterThan(0);
  });

  it("loads the account history on mount and shows both kinds", async () => {
    historyRows.push(
      {
        id: "srv-fig",
        kind: "figure",
        prompt: "saved figure from another device",
        svg: '<svg viewBox="0 0 900 640"><g><title>Wall — holds the cell firm</title></g></svg>',
        caption: "Plant cell",
        archetype: "labelled",
        engine: "vector figure",
        parts: [{ name: "Wall", detail: "holds the cell firm" }],
        createdAt: new Date(Date.now() - 60_000).toISOString(),
      },
      {
        id: "srv-pic",
        kind: "picture",
        prompt: "saved picture from another device",
        url: "https://img.example/saved.png",
        engine: "agnes-image-2.1-flash",
        createdAt: new Date(Date.now() - 120_000).toISOString(),
      },
    );

    render(<ImageHub />);

    await waitFor(
      () => {
        expect(screen.getByText("saved picture from another device")).not.toBeNull();
      },
      { timeout: 4000 },
    );
    expect(screen.getByText(/Labelled structure · vector figure/)).not.toBeNull();
    expect(screen.getByText(/Parts & details \(1\)/)).not.toBeNull();
    expect(historyCalls("GET")).toBe(1);
  });

  it("draws a vector figure with its parts legend in the gallery", async () => {
    figureReply = FIGURE_REPLY;
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
    // The server saved the figure itself — the hub never re-POSTs it.
    expect(historyCalls("POST")).toBe(0);
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

    // Both server DRAW engines were attempted before the browser fallback.
    expect(drawCalls()).toBe(2);
    expect(mockedPuter).toHaveBeenCalledTimes(1);
    // The puter picture exists only in the browser → the hub records it.
    await waitFor(() => {
      expect(historyCalls("POST")).toBe(1);
    });
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

    // Server draw first (mocked failure), then puter — never the figure writer.
    expect(drawCalls()).toBe(1);
    expect(mockedPuter).toHaveBeenCalledTimes(1);
    expect(screen.getByText("a nebula over Kathmandu")).not.toBeNull();
    expect(promptBox().value).toBe("");
    await waitFor(() => {
      expect(historyCalls("POST")).toBe(1);
    });
  });

  it("restores a saved session and drops anything that is neither figure nor picture", async () => {
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

  it("clears the gallery AND the account history together", async () => {
    historyRows.push({
      id: "srv-pic",
      kind: "picture",
      prompt: "a saved picture",
      url: "https://img.example/saved.png",
      engine: "agnes-image-2.1-flash",
      createdAt: new Date().toISOString(),
    });

    render(<ImageHub />);

    await waitFor(
      () => {
        expect(screen.getByText("a saved picture")).not.toBeNull();
      },
      { timeout: 4000 },
    );

    fireEvent.click(screen.getByRole("button", { name: /clear history/i }));

    await waitFor(() => {
      expect(screen.getByText(/no images yet/i)).not.toBeNull();
    });
    expect(historyCalls("DELETE")).toBe(1);
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
