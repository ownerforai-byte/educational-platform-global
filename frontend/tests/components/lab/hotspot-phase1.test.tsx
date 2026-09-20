import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import type { ReactNode } from "react";
import type { KnowledgeHotspotDef } from "@/components/lab/3d-rig/types";

/**
 * Phase 1 — additive visual-upgrade regression contract.
 *
 * Phase 1 was an *additive* pass on the 3D rig: new presets beside the existing
 * nine, and a new opt-in `style="enhanced"` marker branch beside the existing
 * sphere marker. These tests pin both halves of that promise:
 *
 *   A. nothing was replaced   → all 9 original presets still exported, and the
 *                               default marker still emits the exact same
 *                               geometry + material values as before Phase 1;
 *   B. the upgrade is opt-in  → the rounded/emissive path only mounts when
 *                               `style="enhanced"` (or `<RoundedHotspot>`) is used,
 *                               and honours tier + reduced-motion gates.
 *
 * jsdom has no WebGL, so `useFrame` is a no-op and `Html`/`RoundedBox` are inert
 * hosts. Everything asserted below is production code; the RoundedBox stub only
 * records the props our component computed (`args/radius/smoothness/bevelSegments`).
 */

vi.mock("@react-three/fiber", () => ({
  useFrame: () => {},
}));

vi.mock("@react-three/drei", () => ({
  Html: ({ children }: { children?: ReactNode }) => (
    <div data-testid="hotspot-label">{children}</div>
  ),
  RoundedBox: ({
    children,
    args,
    radius,
    smoothness,
    bevelSegments,
  }: {
    children?: ReactNode;
    args?: number[];
    radius?: number;
    smoothness?: number;
    bevelSegments?: number;
  }) => (
    <div
      data-testid="rounded-box"
      data-args={(args ?? []).join(",")}
      data-radius={String(radius)}
      data-smoothness={String(smoothness)}
      data-bevel-segments={String(bevelSegments)}
    >
      {children}
    </div>
  ),
}));

const { KnowledgeHotspot, RoundedHotspot } = await import(
  "@/components/lab/3d-rig/knowledge-hotspot"
);
const materials = await import("@/components/lab/3d-rig/pbr-materials");
afterEach(() => {
  cleanup();
});

const ORIGINAL_PRESETS = [
  "CellCytoplasmMaterial",
  "CellMembraneMaterial",
  "GlassWaterMaterial",
  "MetalLabMaterial",
  "ChalkboardMaterial",
  "PaperNotesMaterial",
  "BenzeneRingMaterial",
  "PhysicsRubberBallMaterial",
  "MathGridPlasticMaterial",
] as const;

const DEF: KnowledgeHotspotDef = {
  id: "nucleus",
  label: "Nucleus",
  position: [0.95, 0.5, 0.15],
  iconColor: "#8b5cf6",
  fieldKeys: ["importantConcepts", "keyPoints"],
};

/** R3F intrinsics render as unknown elements in jsdom, matched by localName. */
function findAll(container: HTMLElement, localName: string): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>("*")).filter(
    (el) => el.localName.toLowerCase() === localName.toLowerCase(),
  );
}

/** Attribute names are lowercased by React DOM, so match case-insensitively. */
function readAttr(el: HTMLElement, name: string): string | null {
  const hit = Array.from(el.attributes).find((a) => a.name.toLowerCase() === name.toLowerCase());
  return hit ? hit.value : null;
}

function materialOf(container: HTMLElement): HTMLElement {
  const found = findAll(container, "meshStandardMaterial");
  expect(found).toHaveLength(1);
  return found[0];
}

describe("pbr-materials — nine original presets are untouched", () => {
  it.each(ORIGINAL_PRESETS)("still exports %s", (name) => {
    expect(materials[name]).toBeDefined();
  });

  it("exports the Phase 1 additions alongside them (added, not swapped)", () => {
    expect(materials.EmissiveLockedMaterial).toBeDefined();
    expect(materials.EmissiveActiveMaterial).toBeDefined();
    expect(materials.EmissiveCompleteMaterial).toBeDefined();
    // New file = 9 originals + 3 new presets, all still present together.
    expect(ORIGINAL_PRESETS).toHaveLength(9);
  });

  it("maps each hotspot state onto its emissive preset", () => {
    expect(materials.HOTSPOT_EMISSIVE_MATERIALS.locked).toBe(materials.EmissiveLockedMaterial);
    expect(materials.HOTSPOT_EMISSIVE_MATERIALS.active).toBe(materials.EmissiveActiveMaterial);
    expect(materials.HOTSPOT_EMISSIVE_MATERIALS.complete).toBe(materials.EmissiveCompleteMaterial);
    expect(Object.keys(materials.HOTSPOT_EMISSIVE_MATERIALS)).toEqual([
      "locked",
      "active",
      "complete",
    ]);
  });
});

describe("KnowledgeHotspot — default output is unchanged (Phase 1 constraint 5)", () => {
  it("renders the original sphere marker, never the rounded box", () => {
    const { container, queryByTestId } = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} />,
    );

    expect(queryByTestId("rounded-box")).toBeNull();
    expect(findAll(container, "mesh")).toHaveLength(1);
    expect(findAll(container, "sphereGeometry")).toHaveLength(1);
    expect(readAttr(findAll(container, "sphereGeometry")[0], "args")).toBe("0.08,24,24");
  });

  it("keeps the original marker colour, opacity and emissive intensities", () => {
    const idle = render(<KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} />);
    const idleMat = materialOf(idle.container);
    expect(readAttr(idleMat, "color")).toBe("#8b5cf6");
    expect(readAttr(idleMat, "emissive")).toBe("#8b5cf6");
    expect(readAttr(idleMat, "emissiveIntensity")).toBe("0.3");
    expect(readAttr(idleMat, "opacity")).toBe("0.85");
    expect(readAttr(idleMat, "roughness")).toBe("0.35");
    expect(readAttr(idleMat, "metalness")).toBe("0.15");

    cleanup();
    const active = render(<KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive />);
    expect(readAttr(materialOf(active.container), "emissiveIntensity")).toBe("0.55");
  });

  it("falls back to the default blue when the definition has no iconColor", () => {
    render(
      <KnowledgeHotspot
        def={{ ...DEF, iconColor: undefined }}
        onOpen={vi.fn()}
        isActive={false}
      />,
    );
    expect(readAttr(materialOf(document.body), "color")).toBe("#3b82f6");
  });

  it("still opens the hotspot by click and by keyboard", () => {
    const onOpen = vi.fn();
    render(<KnowledgeHotspot def={DEF} onOpen={onOpen} isActive={false} />);

    const label = document.querySelector("button[aria-label='Nucleus']") as HTMLButtonElement;
    expect(label).not.toBeNull();

    fireEvent.click(label);
    expect(onOpen).toHaveBeenLastCalledWith("nucleus");

    fireEvent.keyDown(label, { key: "Enter" });
    expect(onOpen).toHaveBeenCalledTimes(2);
  });
});


describe("KnowledgeHotspot — the upgrade is strictly opt-in (Phase 1 constraint 2)", () => {
  it("mounts the rounded box only when style=\"enhanced\" is passed", () => {
    const off = render(<KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} />);
    expect(off.queryByTestId("rounded-box")).toBeNull();
    expect(findAll(off.container, "sphereGeometry")).toHaveLength(1);

    cleanup();
    const on = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} style="enhanced" />,
    );
    expect(on.queryByTestId("rounded-box")).not.toBeNull();
    // The sphere marker is replaced, never merely hidden.
    expect(findAll(on.container, "sphereGeometry")).toHaveLength(0);
  });

  it("passes the rounded geometry the design specified", () => {
    const { getByTestId } = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} style="enhanced" />,
    );
    const box = getByTestId("rounded-box");
    expect(box.dataset.args).toBe("0.15,0.15,0.15");
    expect(box.dataset.radius).toBe("0.035");
  });

  it("drops bevel detail on the low tier, keeps it on medium/high", () => {
    const low = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} style="enhanced" tier="low" />,
    );
    expect(low.getByTestId("rounded-box").dataset.smoothness).toBe("1");
    expect(low.getByTestId("rounded-box").dataset.bevelSegments).toBe("1");

    for (const tier of ["medium", "high"] as const) {
      cleanup();
      const rich = render(
        <KnowledgeHotspot
          def={DEF}
          onOpen={vi.fn()}
          isActive={false}
          style="enhanced"
          tier={tier}
        />,
      );
      expect(rich.getByTestId("rounded-box").dataset.smoothness).toBe("4");
      expect(rich.getByTestId("rounded-box").dataset.bevelSegments).toBe("3");
    }
  });

  it("picks the emissive preset from the hotspot state", () => {
    const expected = {
      locked: { emissiveIntensity: "0.35", roughness: "0.5", metalness: "0.15" },
      active: { emissiveIntensity: "0.85", roughness: "0.28", metalness: "0.25" },
      complete: { emissiveIntensity: "0.6", roughness: "0.35", metalness: "0.2" },
    } as const;

    for (const state of ["locked", "active", "complete"] as const) {
      cleanup();
      const view = render(
        <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} style="enhanced" state={state} />,
      );
      const mat = materialOf(view.container);
      expect(readAttr(mat, "emissiveIntensity")).toBe(expected[state].emissiveIntensity);
      expect(readAttr(mat, "roughness")).toBe(expected[state].roughness);
      expect(readAttr(mat, "metalness")).toBe(expected[state].metalness);
      // Icon colour drives both base and emissive so the preset stays subject-tinted.
      expect(readAttr(mat, "color")).toBe("#8b5cf6");
      expect(readAttr(mat, "emissive")).toBe("#8b5cf6");
    }
  });

  it("derives the state from isActive when no state prop is given", () => {
    const idle = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive={false} style="enhanced" />,
    );
    expect(readAttr(materialOf(idle.container), "roughness")).toBe("0.5");

    cleanup();
    const active = render(
      <KnowledgeHotspot def={DEF} onOpen={vi.fn()} isActive style="enhanced" />,
    );
    expect(readAttr(materialOf(active.container), "roughness")).toBe("0.28");
  });

  it("pins emissive intensity under reduced-motion instead of pulsing", () => {
    const active = render(
      <KnowledgeHotspot
        def={DEF}
        onOpen={vi.fn()}
        isActive
        style="enhanced"
        reducedMotion
      />,
    );
    expect(readAttr(materialOf(active.container), "emissiveIntensity")).toBe("0.6");

    cleanup();
    const idle = render(
      <KnowledgeHotspot
        def={DEF}
        onOpen={vi.fn()}
        isActive={false}
        style="enhanced"
        reducedMotion
      />,
    );
    expect(readAttr(materialOf(idle.container), "emissiveIntensity")).toBe("0.3");
  });

  it("ignores state/tier noise on the classic path (still default output)", () => {
    const { container, queryByTestId } = render(
      <KnowledgeHotspot
        def={DEF}
        onOpen={vi.fn()}
        isActive={false}
        state="complete"
        tier="low"
      />,
    );
    expect(queryByTestId("rounded-box")).toBeNull();
    const mat = materialOf(container);
    expect(readAttr(mat, "emissiveIntensity")).toBe("0.3");
    expect(readAttr(mat, "roughness")).toBe("0.35");
    expect(readAttr(mat, "metalness")).toBe("0.15");
  });

  it("keeps the label button clickable and keyboard-operable in both styles", () => {
    for (const style of ["classic", "enhanced"] as const) {
      cleanup();
      const onOpen = vi.fn();
      render(<KnowledgeHotspot def={DEF} onOpen={onOpen} isActive={false} style={style} />);

      const label = document.querySelector("button[aria-label='Nucleus']") as HTMLButtonElement;
      expect(label).not.toBeNull();

      fireEvent.click(label);
      expect(onOpen).toHaveBeenLastCalledWith("nucleus");

      fireEvent.keyDown(label, { key: " " });
      expect(onOpen).toHaveBeenCalledTimes(2);
    }
  });
});

describe("RoundedHotspot", () => {
  it("is exactly the enhanced style, and nothing more", () => {
    const { queryByTestId, container } = render(
      <RoundedHotspot def={DEF} onOpen={vi.fn()} isActive={false} />,
    );
    expect(queryByTestId("rounded-box")).not.toBeNull();
    expect(findAll(container, "sphereGeometry")).toHaveLength(0);
  });

  it("forwards the full hotspot contract (click opens) unchanged", () => {
    const onOpen = vi.fn();
    render(<RoundedHotspot def={DEF} onOpen={onOpen} isActive={false} />);

    const label = document.querySelector("button[aria-label='Nucleus']") as HTMLButtonElement;
    fireEvent.click(label);
    expect(onOpen).toHaveBeenCalledWith("nucleus");
  });
});