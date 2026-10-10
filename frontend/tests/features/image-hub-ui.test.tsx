import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { ImageHub } from "@/features/image-hub";
import type { ImageHistoryRow } from "@/features/image-hub/history";

/**
 * UI contract for the Diagram Hub. The route is owner-only (owner emails since
 * 2026-10-05), so a browser can reach it in production only with an owner
 * session — this render suite still pins the behaviour without a network.
 *
 * Three contracts now:
 *   · the composer modes (ACADEMIC FIGURE → POST /api/ai/figure, PICTURE →
 *     the server raster chain, puter.js as the browser fallback) exactly as
 *     before;
 *   · the account history: the gallery loads from GET /api/ai/image-history
 *     on mount, and a browser-drawn puter.js picture is POSTed there right
 *     after it lands (server draws save themselves);
 *   · clearing the gallery also clears the account history (DELETE).
 *
 * Plus the direct-Google mode (owner 2026-10-04: "direct presenting from
 * google is best … create the details interface"): results come from
 * GET /api/ai/image-search, the not-configured answer offers the plain Google
 * Images link, and the details dialog pulls POST /api/ai/image-facts and saves
 * through the same account history.
 */

const historyRows: ImageHistoryRow[] = [];
/** When set, POST /api/ai/figure resolves with this instead of throwing. */
let figureReply: unknown;
/** When set, GET /api/ai/image-search resolves with this instead of throwing. */
let searchReply: unknown;
/** When set, POST /api/ai/image-facts resolves with this instead of throwing. */
let factsReply: unknown;

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
    if (path.startsWith("/api/ai/image-search") && searchReply !== undefined)
      return searchReply;
    if (path === "/api/ai/image-facts" && factsReply !== undefined) return factsReply;
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
  searchReply = undefined;
  factsReply = undefined;
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
    // The saved picture row above stores the provider's raw model id — that is
    // what sessions wrote before the rename — so the badge must still read the
    // hub's own wording and never surface the vendor name (owner 2026-10-07).
    expect(screen.getAllByText("Diagram").length).toBeGreaterThan(0);
    expect(screen.queryByText(/agnes/i)).toBeNull();
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

  it("keeps the raster chain as the figure-mode fallback (figure → server → puter)", async () => {
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

/** The Google-mode search box (its placeholder differs from the draw modes). */
function googleBox(): HTMLTextAreaElement {
  return screen.getByPlaceholderText(/what should google find/i) as HTMLTextAreaElement;
}

const GOOGLE_RESULTS = {
  configured: true,
  results: [
    {
      url: "https://img.example/heart-full.png",
      page: "https://anatomy.example/heart",
      host: "anatomy.example",
      title: "Labelled human heart — anterior view",
      snippet: "The four chambers and the great vessels, labelled.",
      width: 1200,
      height: 900,
      thumb: "https://thumb.example/heart.png",
    },
    {
      url: "https://img.example/heart-section.png",
      page: "",
      host: "",
      title: "Heart cross-section",
      snippet: "",
      width: 0,
      height: 0,
    },
  ],
};

function searchPath(): string | null {
  const call = mockedApiFetch.mock.calls.find(
    ([path]) => typeof path === "string" && path.startsWith("/api/ai/image-search"),
  );
  return call ? String(call[0]) : null;
}

function factsCalls(): number {
  return mockedApiFetch.mock.calls.filter(
    ([path, init]) =>
      path === "/api/ai/image-facts" &&
      (init?.method ?? "GET").toUpperCase() === "POST",
  ).length;
}

/** Switches to Google mode, types `query` and submits the search. */
async function runGoogleSearch(query: string): Promise<void> {
  fireEvent.click(screen.getByRole("button", { name: "Google" }));
  fireEvent.change(googleBox(), { target: { value: query } });
  fireEvent.click(screen.getByRole("button", { name: /search google/i }));
  await waitFor(
    () => {
      expect(screen.getByText(/google results/i)).not.toBeNull();
    },
    { timeout: 4000 },
  );
}

describe("ImageHub — direct Google presenting", () => {
  it("presents Google results without touching any draw engine", async () => {
    searchReply = GOOGLE_RESULTS;
    render(<ImageHub />);

    await runGoogleSearch("labelled diagram of the human heart");

    // The query went to the search route, encoded — never to a draw engine.
    expect(searchPath()).toContain("q=labelled%20diagram%20of%20the%20human%20heart");
    expect(drawCalls()).toBe(0);
    expect(mockedPuter).not.toHaveBeenCalled();

    // Both results are presented with their titles and a source credit.
    expect(screen.getByText("Labelled human heart — anterior view")).not.toBeNull();
    expect(screen.getByText("Heart cross-section")).not.toBeNull();
    expect(screen.getByText("anatomy.example")).not.toBeNull();
    // The grid previews Google's thumbnail and falls back to the full size.
    const img = screen.getByAltText("Labelled human heart — anterior view") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("https://thumb.example/heart.png");
    // The search box clears; the history is untouched (results are not saves).
    expect(googleBox().value).toBe("");
    expect(historyCalls("POST")).toBe(0);
    expect(screen.getAllByRole("button", { name: "Details" })).toHaveLength(2);
  });

  it("offers the direct Google Images link when the backend has no key", async () => {
    searchReply = { configured: false, results: [] };
    render(<ImageHub />);

    fireEvent.click(screen.getByRole("button", { name: "Google" }));
    fireEvent.change(googleBox(), { target: { value: "ray diagram convex lens" } });
    fireEvent.click(screen.getByRole("button", { name: /search google/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/configured on this server/i)).not.toBeNull();
      },
      { timeout: 4000 },
    );

    // Honest fallback: the real Google Images link for the exact query…
    const link = screen.getByRole("link", {
      name: /open “ray diagram convex lens” in google images/i,
    });
    expect(link.getAttribute("href")).toBe(
      "https://www.google.com/search?tbm=isch&q=ray%20diagram%20convex%20lens",
    );
    // …instead of an empty grid pretending Google found nothing.
    expect(screen.queryByText(/google results/i)).toBeNull();
    expect(historyCalls("POST")).toBe(0);
  });

  it("opens the details interface with Google metadata and Veer facts", async () => {
    searchReply = GOOGLE_RESULTS;
    factsReply = {
      facts: [
        "The human heart has four chambers: two atria and two ventricles.",
        "The right ventricle pumps deoxygenated blood to the lungs.",
      ],
    };
    render(<ImageHub />);

    await runGoogleSearch("labelled diagram of the human heart");
    fireEvent.click(screen.getAllByRole("button", { name: "Details" })[0]);

    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("aria-label")).toBe(
      "Image details: Labelled human heart — anterior view",
    );

    // Every metadata field Google gave us, honestly labelled.
    expect(within(dialog).getByText("anatomy.example")).not.toBeNull();
    expect(screen.getByText("1200 × 900 px")).not.toBeNull();
    expect(
      screen.getByText("The four chambers and the great vessels, labelled."),
    ).not.toBeNull();
    expect(screen.getByText("Found for")).not.toBeNull();

    // The facts card resolves through POST /api/ai/image-facts — best-effort.
    await waitFor(
      () => {
        expect(
          screen.getByText(/the human heart has four chambers/i),
        ).not.toBeNull();
      },
      { timeout: 4000 },
    );
    expect(screen.getByText(/official syllabus sources/i)).not.toBeNull();
    expect(factsCalls()).toBe(1);
    expect(drawCalls()).toBe(0);
  });

  it("saves a Google result into the account history from the details interface", async () => {
    searchReply = GOOGLE_RESULTS;
    factsReply = { facts: ["One syllabus fact."] };
    render(<ImageHub />);

    await runGoogleSearch("labelled diagram of the human heart");
    fireEvent.click(screen.getAllByRole("button", { name: "Details" })[0]);
    const dialog = await screen.findByRole("dialog");

    fireEvent.click(
      within(dialog).getByRole("button", { name: /save to my history/i }),
    );

    // The save is the same account-history POST every other picture uses…
    await waitFor(() => {
      expect(historyCalls("POST")).toBe(1);
    });
    expect(
      within(dialog).getByRole("button", { name: /saved to history/i }),
    ).not.toBeNull();

    // …and the gallery shows the saved item once the dialog closes.
    fireEvent.click(within(dialog).getByRole("button", { name: "Close details" }));
    await waitFor(() => {
      expect(screen.getByText("google · anatomy.example")).not.toBeNull();
    });
    // The saved result is a picture in the gallery, counted by the filter.
    expect(screen.getByRole("button", { name: /pictures \(1\)/i })).not.toBeNull();
  });
});
