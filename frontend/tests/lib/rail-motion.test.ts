import { describe, it, expect } from "vitest";

import {
  normalizeRailOffset,
  parseDurationSecs,
  railResumeDelaySecs,
} from "@/lib/rail-motion";

/**
 * Pure motion math for hand-scrubbing the continuous rails: offsets wrap into
 * one loop and the resume delay restarts the keyframes in phase, so a dropped
 * rail never snaps.
 */
describe("rail-motion", () => {
  it("wraps offsets into a single loop", () => {
    expect(normalizeRailOffset(0, 1000)).toBe(0);
    expect(normalizeRailOffset(-400, 1000)).toBe(-400);
    // Exactly one loop back is the seam: same card as 0.
    expect(normalizeRailOffset(-1000, 1000)).toBe(0);
    // Past the end keeps travelling through the loop.
    expect(normalizeRailOffset(-1250, 1000)).toBe(-250);
    // Swiping right past the start wraps to the loop's end — passed cards
    // come back instead of hitting a wall.
    expect(normalizeRailOffset(50, 1000)).toBe(-950);
    expect(normalizeRailOffset(1000, 1000)).toBe(0);
    // Degenerate widths never divide.
    expect(normalizeRailOffset(-400, 0)).toBe(0);
    expect(normalizeRailOffset(Number.NaN, 1000)).toBe(0);
  });

  it("resumes the loop in phase with a negative delay", () => {
    // Start of the loop: no delay.
    expect(railResumeDelaySecs(0, 1000, 60)).toBe(0);
    // Half a loop travelled: restart 30s into the 60s cycle.
    expect(railResumeDelaySecs(-500, 1000, 60)).toBe(30);
    // Wrapped offsets resolve to the same phase.
    expect(railResumeDelaySecs(-1500, 1000, 60)).toBe(30);
    expect(railResumeDelaySecs(500, 1000, 60)).toBe(30);
    // Degenerate inputs hold the rail at the loop start.
    expect(railResumeDelaySecs(-500, 0, 60)).toBe(0);
    expect(railResumeDelaySecs(-500, 1000, 0)).toBe(0);
  });

  it("parses CSS durations", () => {
    expect(parseDurationSecs("58s")).toBe(58);
    expect(parseDurationSecs("1200ms")).toBe(1.2);
    expect(parseDurationSecs("")).toBe(0);
    expect(parseDurationSecs(undefined)).toBe(0);
  });
});
