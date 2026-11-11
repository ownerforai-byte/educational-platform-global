import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

/**
 * DIAGRAM HUB smoke (owner 2026-10-25, trained 2026-11-10): the drawing room
 * must render its composer + subject chips, and a streamed reply must arrive
 * through the shared MathMarkdown pipeline — the figure is drawn in the
 * BACKGROUND (imageStart/imageSuccess events) and the student sees a picture,
 * never raw code.
 */

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/ai/diagrams",
}));

const streamChatMock = vi.fn();
const enhancePromptMock = vi.fn();
const saveChatHistoryMock = vi.fn();

vi.mock("@/lib/api/ai", () => ({
  streamChat: (...args: unknown[]) => streamChatMock(...args),
  enhancePrompt: (...args: unknown[]) => enhancePromptMock(...args),
  saveChatHistory: (...args: unknown[]) => saveChatHistoryMock(...args),
}));

vi.mock("@/lib/puter-image", () => ({
  drawFigureWithPuter: vi.fn(async () => null),
}));

import { DiagramStudio } from "@/components/ai/diagram-studio";

const HEART_SVG =
  "<svg viewBox=\"0 0 100 100\"><g><title>Left atrium | Receives oxygenated blood</title><circle cx='50' cy='50' r='10'/></g></svg>";

/** Prose types out first; the figure lands later as a background-draw event. */
async function* fakeStream() {
  yield "Labelled human heart — chambers and vessels.";
  yield { imageStart: 1, prompt: "Labelled human heart, chambers and vessels", caption: "Human heart" };
  yield { imageSuccess: 1, svg: HEART_SVG, caption: "Human heart" };
  yield { done: true };
}

beforeEach(() => {
  vi.clearAllMocks();
  streamChatMock.mockImplementation(() => fakeStream());
  enhancePromptMock.mockResolvedValue({ prompt: "Enhanced: labelled heart" });
  saveChatHistoryMock.mockResolvedValue({ saved: 2, migrated: true });
});

describe("DiagramStudio", () => {
  it("renders the composer, the six subject chips and the draw button", () => {
    render(<DiagramStudio />);

    expect(
      screen.getByRole("heading", { name: /diagram hub/i }),
    ).toBeInTheDocument();
    for (const subject of ["Physics", "Chemistry", "Biology", "Mathematics", "Nepali", "English"]) {
      expect(screen.getByRole("button", { name: subject })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /draw diagram/i })).toBeDisabled();
    expect(screen.getByPlaceholderText(/name the diagram/i)).toHaveClass("text-[13px]", "sm:text-[13px]");
    expect(screen.getByRole("button", { name: "Biology" })).toHaveClass("min-h-11");
  });

  it("draws a diagram and renders it as a figure — never as raw code", async () => {
    render(<DiagramStudio />);

    fireEvent.change(screen.getByPlaceholderText(/name the diagram/i), {
      target: { value: "labelled human heart" },
    });
    fireEvent.click(screen.getByRole("button", { name: /draw diagram/i }));

    await waitFor(() =>
      expect(streamChatMock).toHaveBeenCalledTimes(1),
    );
    // The system message keeps the diagram contract on the wire.
    const payload = streamChatMock.mock.calls[0][0] as { role: string; content: string }[];
    expect(payload[0].role).toBe("system");
    expect(payload[0].content).toContain("DIAGRAM HUB");
    expect(payload[0].content).toContain("TRANSLATE EVERY LABEL TO ENGLISH");
    // Background drawing, never code on screen.
    expect(payload[0].content).toContain("veer-image");
    expect(payload[0].content).toContain("NEVER WRITE CODE ON SCREEN");

    await waitFor(() => {
      // The figure renders inline with hover labels: each part keeps its
      // <g><title> inspection entry — query the SVG tree directly.
      const title = document.querySelector("figure.edu-visual svg g title");
      expect(title?.textContent ?? "").toMatch(/left atrium/i);
    });
    // Never raw code: the fence compiles away — no <pre><code> block remains.
    expect(document.querySelector("figure.edu-visual pre")).toBeNull();
    await waitFor(() => expect(saveChatHistoryMock).toHaveBeenCalledTimes(1));
    // The saved turn carries the finished figure, so history re-renders it.
    const savedTurn = saveChatHistoryMock.mock.calls[0][1] as { role: string; content: string }[];
    expect(savedTurn[1].content).toContain("```svg");
    expect(savedTurn[1].content).toContain("Left atrium");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("enhances a rough brief before drawing", async () => {
    render(<DiagramStudio />);

    fireEvent.change(screen.getByPlaceholderText(/name the diagram/i), {
      target: { value: "heart" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enhance brief/i }));

    await waitFor(() =>
      expect(screen.getByPlaceholderText(/name the diagram/i)).toHaveValue(
        "Enhanced: labelled heart",
      ),
    );
  });
});
