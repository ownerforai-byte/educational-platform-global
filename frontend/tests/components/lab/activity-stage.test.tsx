import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ActivityStage } from "@/components/lab/activity-stage";
import { PILOT_ACTIVITIES } from "@/lib/lab-manifest";

// The stage must never load a visual until the learner asks for it. `vi.hoisted`
// keeps the spy inside the hoisted mock factory (a plain top-level `const` is
// not initialised yet when the factory runs).
const mocks = vi.hoisted(() => ({ loadActivityRenderer: vi.fn() }));

vi.mock("@/lib/lab-activity-loaders", () => ({
  loadActivityRenderer: mocks.loadActivityRenderer,
}));

describe("ActivityStage", () => {
  beforeEach(() => {
    // jsdom ships no matchMedia; use-scene-tier reads it for mobile/reduced-motion.
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  it("shows the manifest fallback when WebGL is unavailable and loads nothing", async () => {
    const activity = PILOT_ACTIVITIES[0];
    render(<ActivityStage activity={activity} />);

    // jsdom has no WebGL context, so the fallback is the correct surface.
    expect(await screen.findByTestId("activity-fallback")).toBeInTheDocument();
    expect(screen.getByText(activity.fallback.summary)).toBeInTheDocument();
    expect(mocks.loadActivityRenderer).not.toHaveBeenCalled();
  });

  it("keyboard orbit/zoom reaches the mounted canvas and Escape closes the scene", async () => {
    // jsdom has no WebGL: stub getContext so the stage reaches its idle state.
    const ctxSpy = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue({} as CanvasRenderingContext2D);
    // A minimal stand-in renderer: just a canvas the stage can wrap.
    mocks.loadActivityRenderer.mockResolvedValue(function FakeRenderer() {
      return <canvas data-testid="fake-scene-canvas" />;
    });
    const activity = PILOT_ACTIVITIES[0];
    render(<ActivityStage activity={activity} />);

    // Open the scene (the idle-state button), then focus the stage.
    fireEvent.click(await screen.findByRole("button", { name: /open the 3d scene/i }));
    const stage = await screen.findByTestId("activity-stage");
    const canvas = await screen.findByTestId("fake-scene-canvas");

    const dispatched: string[] = [];
    const spy = vi
      .spyOn(canvas, "dispatchEvent")
      .mockImplementation((event: Event) => {
        dispatched.push(event.type);
        return true;
      });

    stage.focus();
    for (const key of ["ArrowRight", "ArrowLeft", "=", "-"]) {
      fireEvent.keyDown(stage, { key });
    }
    expect(dispatched).toContain("pointerdown");
    expect(dispatched).toContain("pointermove");
    expect(dispatched).toContain("pointerup");
    expect(dispatched).toContain("wheel");
    spy.mockRestore();

    // Escape closes: the stage unmounts the renderer and returns to idle.
    fireEvent.keyDown(stage, { key: "Escape" });
    expect(
      await screen.findByRole("button", { name: /open the 3d scene/i }),
    ).toBeInTheDocument();
    expect(mocks.loadActivityRenderer).toHaveBeenCalledTimes(1);
    ctxSpy.mockRestore();
  });
});
