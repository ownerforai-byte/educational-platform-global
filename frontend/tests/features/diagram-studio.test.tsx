import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

/**
 * DIAGRAM HUB smoke (owner 2026-10-25, trained 2026-11-10 / 2026-11-12): the
 * drawing room renders its composer + subject chips, the dedicated free Gemini
 * lane streams ONE ```svg fence that the shared MathMarkdown pipeline turns
 * into a picture (never raw code), and the figure's floating DETAIL DOTS open
 * a widget with related concepts, contrasts and deeper detail.
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

import { DiagramStudio } from "@/components/ai/diagram-studio";

const HEART_SVG = `<svg viewBox="0 0 100 100">
  <g><title>Left atrium | Receives oxygenated blood</title><circle cx='50' cy='50' r='10'/></g>
  <g class="edu-detail-dot"><title>DETAIL DOT | Atrial pressure | Related: Right atrium; Ventricle; Pulmonary vein | Relations: Pulmonary vein drives atrial pressure because inflow exceeds outflow in diastole; Atrial pressure drives mitral opening because the gradient exceeds ventricular pressure | Contrasts: Atrium vs Ventricle — atria receive, ventricles pump; Systole vs Diastole — contraction vs relaxation | Detail: Low-pressure filling phase driven by the pressure gradient, no valve resistance | Exam: do not confuse atrial systole with ventricular systole</title><circle cx='80' cy='20' r='5'/></g>
</svg>`;

/** The dedicated lane streams ONE svg fence directly — no background draw. */
async function* fakeStream() {
  yield "Labelled human heart — chambers and vessels.\n\n";
  yield "```svg Labelled human heart — chambers and vessels\n";
  yield HEART_SVG;
  yield "\n```\n\n- Left atrium receives oxygenated blood";
  yield { done: true };
}

beforeEach(() => {
  vi.clearAllMocks();
  streamChatMock.mockImplementation(() => fakeStream());
  enhancePromptMock.mockResolvedValue({ prompt: "Enhanced: labelled heart" });
  saveChatHistoryMock.mockResolvedValue({ saved: 2, migrated: true });
});

afterEach(() => {
  // The widget is portaled to document.body, outside React's cleanup root.
  fireEvent.keyDown(window, { key: "Escape" });
  document.querySelectorAll(".edu-visual__dot-popover").forEach((el) => el.remove());
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
    // ONE inline SVG, trained to carry floating detail dots with related
    // concepts and contrasts — the picture itself, never raw code on screen.
    expect(payload[0].content).toContain("```svg");
    expect(payload[0].content).toContain("900x640");
    expect(payload[0].content).toContain("edu-detail-dot");
    expect(payload[0].content).toContain("Related:");
    expect(payload[0].content).toContain("Relations:");
    expect(payload[0].content).toContain("Contrasts:");
    // The agent is trained to CREATE the dot information per question,
    // from a freshly generated knowledge brief — not pre-coded content.
    expect(payload[0].content).toContain("THE AGENT CREATES THE INFORMATION");
    expect(payload[0].content).toContain("DIAGRAM KNOWLEDGE BRIEF");
    expect(payload[0].content).toContain("SOURCE OF TRUTH");

    // The hub names the WORK, never a provider: the server resolves "diagram"
    // to its own dedicated free Gemini key/model.
    const options = streamChatMock.mock.calls[0][2] as {
      task?: string;
      subject?: string;
      signal?: AbortSignal;
    };
    expect(options.task).toBe("diagram");
    // The chosen subject scopes the per-question knowledge derivation.
    expect(options.subject).toBe("Physics");
    expect(options.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.stringify(streamChatMock.mock.calls[0])).not.toContain("diagram-hub");

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

  it("reveals all the related / contrast information from a floating detail dot", async () => {
    render(<DiagramStudio />);
    fireEvent.change(screen.getByPlaceholderText(/name the diagram/i), {
      target: { value: "labelled human heart" },
    });
    fireEvent.click(screen.getByRole("button", { name: /draw diagram/i }));

    const dot = await waitFor(() => {
      const found = document.querySelector<SVGGElement>(
        "figure.edu-visual svg g.edu-detail-dot",
      );
      expect(found).not.toBeNull();
      return found as SVGGElement;
    });
    // Dots are keyboard-reachable and visibly interactive before any hover.
    expect(dot.getAttribute("tabindex")).toBe("0");
    expect(dot.getAttribute("role")).toBe("button");

    // HOVER reveals the whole payload — not just a one-line tooltip.
    fireEvent.mouseOver(dot);
    await waitFor(() =>
      expect(document.querySelector(".edu-visual__dot-popover")).not.toBeNull(),
    );
    let widget = document.querySelector(".edu-visual__dot-popover") as HTMLElement;
    expect(widget.textContent).toContain("Atrial pressure");
    expect(widget.textContent).toContain("Right atrium");
    expect(widget.textContent).toContain("Pulmonary vein");
    expect(widget.textContent).toContain("Pulmonary vein drives atrial pressure");
    expect(widget.querySelector(".edu-visual__dot-section--relations")).not.toBeNull();
    expect(widget.textContent).toContain("Atrium vs Ventricle");
    expect(widget.textContent).toContain("Systole vs Diastole");
    expect(widget.textContent).toContain("do not confuse atrial systole");
    // Relations AND contrasts render as rows (full clauses), related as chips.
    expect(widget.querySelectorAll(".edu-visual__dot-row").length).toBe(4);
    expect(widget.querySelectorAll(".edu-visual__dot-chip").length).toBe(3);

    // CLICK pins the widget so it can be scrolled and read in full.
    fireEvent.click(dot);
    await waitFor(() =>
      expect(document.querySelector(".edu-visual__dot-popover--pinned")).not.toBeNull(),
    );
    widget = document.querySelector(".edu-visual__dot-popover") as HTMLElement;
    expect(widget.textContent).toContain("Esc or ✕ to close");

    fireEvent.click(widget.querySelector(".edu-visual__dot-close") as HTMLElement);
    expect(document.querySelector(".edu-visual__dot-popover")).toBeNull();
  });

  it("forwards the chosen subject so the agent derives knowledge for that syllabus", async () => {
    render(<DiagramStudio />);
    fireEvent.click(screen.getByRole("button", { name: "Chemistry" }));
    fireEvent.change(screen.getByPlaceholderText(/name the diagram/i), {
      target: { value: "electrochemical cell" },
    });
    fireEvent.click(screen.getByRole("button", { name: /draw diagram/i }));

    await waitFor(() => expect(streamChatMock).toHaveBeenCalledTimes(1));
    const options = streamChatMock.mock.calls[0][2] as { subject?: string; task?: string };
    expect(options.task).toBe("diagram");
    expect(options.subject).toBe("Chemistry");
    const outbound = streamChatMock.mock.calls[0][0] as { role: string; content: string }[];
    expect(outbound[1].content).toContain("Chemistry");
    expect(outbound[1].content).toContain("electrochemical cell");
  });
});
