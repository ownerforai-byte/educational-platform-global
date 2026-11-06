import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
