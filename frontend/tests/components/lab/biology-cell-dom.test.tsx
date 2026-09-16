import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";

/**
 * Task 4 — Showcase 1 (Biology Cell 3D) *rendered DOM* contract tests.
 *
 * `biology-cell-hotspots.test.ts` covers the pure data/rules. These tests mount
 * the real components in jsdom so the rule TRs are enforced at the render site
 * too, not only in the data layer:
 *   T4-TR1  "6+ hotspots render, clickable"      → SpotIndex DOM inventory + click wiring
 *   T4-TR2  "Plant/Animal toggle"                → CellModeToggle buttons + onChange wiring
 *   AC-07   "hotspots show real concept fields"  → KnowledgeSpotPanelContent field rendering
 *   AC-15   empty fields render an explicit slot placeholder
 *
 * WebGL is not available in jsdom, so the three 3D-only modules are stubbed with
 * inert equivalents; every assertion below runs against production code.
 */

vi.mock("@react-three/drei", () => ({
  Html: ({ children }: { children?: ReactNode }) => <div data-testid="drei-html">{children}</div>,
}));

vi.mock("@react-three/fiber", () => ({
  useFrame: () => undefined,
  useThree: () => ({ camera: { position: { set: () => undefined } }, gl: { domElement: null } }),
}));

vi.mock("@/components/lab/3d-rig/shared-3d-scene", () => {
  const Shared3DSceneStub = ({ children }: { children?: ReactNode }) => (
    <div data-testid="shared-3d-scene">{children}</div>
  );
  return { Shared3DScene: Shared3DSceneStub, default: Shared3DSceneStub };
});

const { SpotIndex } = await import("@/components/lab/3d-rig/spot-index");
const { CellModeToggle } = await import("@/components/lab/3d-rig/biology-cell-scene");
const { KnowledgeSpotPanelContent } = await import("@/components/lab/3d-rig/knowledge-spot-panel");
const { CELL_HOTSPOTS } = await import("@/components/lab/3d-rig/biology-cell-hotspots");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});


describe("SpotIndex rendered DOM (T4-TR1, AC-06)", () => {
  it("renders one clickable button per hotspot, with the total count badge", () => {
    render(<SpotIndex hotspots={CELL_HOTSPOTS} activeId="" onFocus={vi.fn()} />);

    expect(screen.getAllByRole("button")).toHaveLength(CELL_HOTSPOTS.length);
    expect(CELL_HOTSPOTS.length).toBeGreaterThanOrEqual(6);
    expect(screen.getByText(String(CELL_HOTSPOTS.length))).toBeInTheDocument();

    for (const hotspot of CELL_HOTSPOTS) {
      expect(screen.getByText(hotspot.label)).toBeInTheDocument();
    }
  });

  it("reports the clicked hotspot id and its camera target (AC-06 focus wiring)", () => {
    const onFocus = vi.fn();
    const onCameraFocus = vi.fn();
    render(
      <SpotIndex
        hotspots={CELL_HOTSPOTS}
        activeId=""
        onFocus={onFocus}
        onCameraFocus={onCameraFocus}
      />,
    );

    const nucleus = CELL_HOTSPOTS.find((hotspot) => hotspot.id === "nucleus")!;
    fireEvent.click(screen.getByText(nucleus.label));

    expect(onFocus).toHaveBeenCalledWith("nucleus");
    expect(onCameraFocus).toHaveBeenCalledWith(nucleus.position);
  });

  it("marks the active hotspot only", () => {
    const { container, rerender } = render(
      <SpotIndex hotspots={CELL_HOTSPOTS} activeId="golgi" onFocus={vi.fn()} />,
    );
    expect(container.textContent?.split("\u2713").length).toBe(2); // exactly one mark

    rerender(<SpotIndex hotspots={CELL_HOTSPOTS} activeId="" onFocus={vi.fn()} />);
    expect(container.textContent).not.toContain("\u2713");
  });

  it("renders an explicit empty state when a scene publishes no hotspots", () => {
    render(<SpotIndex hotspots={[]} activeId="" onFocus={vi.fn()} />);
    expect(screen.getByText("No knowledge hotspots")).toBeInTheDocument();
  });
});

describe("CellModeToggle rendered DOM (T4-TR2)", () => {
  it("renders exactly two labelled buttons in a named group", () => {
    render(<CellModeToggle mode="plant" onChange={vi.fn()} />);

    const group = screen.getByRole("group", { name: "Cell type" });
    expect(within(group).getAllByRole("button")).toHaveLength(2);
    expect(within(group).getByRole("button", { name: /Plant/ })).toBeInTheDocument();
    expect(within(group).getByRole("button", { name: /Animal/ })).toBeInTheDocument();
  });

  it("exposes the active mode through aria-pressed", () => {
    const { rerender } = render(<CellModeToggle mode="plant" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Plant/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Animal/ })).toHaveAttribute("aria-pressed", "false");

    rerender(<CellModeToggle mode="animal" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Plant/ })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /Animal/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("emits the selected mode so the scene can add/remove organelles (T4-TR2)", () => {
    const onChange = vi.fn();
    render(<CellModeToggle mode="plant" onChange={onChange} />);

    // Clicking Animal must drive the switch that hides chloroplasts / cell wall;
    // clicking Plant must drive the switch that hides lysosomes / centrioles.
    fireEvent.click(screen.getByRole("button", { name: /Animal/ }));
    expect(onChange).toHaveBeenLastCalledWith("animal");

    fireEvent.click(screen.getByRole("button", { name: /Plant/ }));
    expect(onChange).toHaveBeenLastCalledWith("plant");
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});


describe("KnowledgeSpotPanelContent rendered DOM (AC-07, AC-15)", () => {
  const conceptData = {
    formulas: ["$F = m \\cdot a$"],
    keyPoints: ["Mitochondria produce ATP", "Nucleus stores DNA"],
  };

  it("renders the mapped field values for the hotspot", () => {
    render(
      <KnowledgeSpotPanelContent
        conceptData={conceptData}
        fieldKeys={["keyPoints"]}
        title="Nucleus"
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("Nucleus")).toBeInTheDocument();
    expect(screen.getByText("Mitochondria produce ATP")).toBeInTheDocument();
    expect(screen.getByText("Nucleus stores DNA")).toBeInTheDocument();
    // The math field is compiled to KaTeX markup rather than printed raw.
    expect(document.querySelector(".katex")).not.toBeNull();
    expect(screen.getByText("Core")).toBeInTheDocument();
    expect(screen.getByText("Contextual")).toBeInTheDocument();
  });

  it("renders an explicit slot placeholder for empty fields (AC-15)", () => {
    render(
      <KnowledgeSpotPanelContent
        conceptData={conceptData}
        fieldKeys={["keyPoints"]}
        title="Nucleus"
        onClose={vi.fn()}
      />,
    );

    // `confusion` / `examShortTricks` are core slots with no published value;
    // `keyPoints` is a core key so it is not repeated in the contextual column.
    const placeholders = screen.getAllByText(/Empty/);
    expect(placeholders).toHaveLength(2);
    expect(placeholders[0].textContent).toContain("confusion");
    expect(placeholders[1].textContent).toContain("examShortTricks");
  });

  it("closes on Escape and on the close button", () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <KnowledgeSpotPanelContent
        conceptData={conceptData}
        fieldKeys={["keyPoints"]}
        title="Nucleus"
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Nucleus")).toBeNull();

    unmount();
    render(
      <KnowledgeSpotPanelContent
        conceptData={conceptData}
        fieldKeys={["keyPoints"]}
        title="Nucleus"
        onClose={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Close knowledge panel" }));
    expect(screen.queryByText("Nucleus")).toBeNull();
  });

  it("renders nothing when the concept JSON could not be resolved", () => {
    const { container } = render(
      <KnowledgeSpotPanelContent
        conceptData={null}
        fieldKeys={["keyPoints"]}
        title="Nucleus"
        onClose={vi.fn()}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

