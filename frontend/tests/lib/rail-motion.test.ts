import { describe, it, expect } from "vitest";

import {
  RAIL_FLICK_MAX_MS,
  RAIL_FLICK_MIN_PX,
  RAIL_IDLE_RESUME_MS,
  isRailFlick,
  normalizeRailOffset,
  parseDurationSecs,
  railFlickTarget,
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

  /**
   * Owner request 2026-10-06: "make it swipable like i can see the previous and
   * next by swiping" and "if untouched for 3s and clicked outside its area then
   * it continues its cycle". A flick steps one card; a slow drag does not.
   */
  it("steps exactly one card on a flick, in the flick's direction", () => {
    const step = 400;
    const setWidth = 4000;
    // Swipe left (dx < 0) from the boundary at -800 → the next card at -1200.
    expect(railFlickTarget(-800, step, -60, setWidth)).toBe(-1200);
    // Swipe right (dx > 0) → the previous card at -400.
    expect(railFlickTarget(-800, step, 60, setWidth)).toBe(-400);
    // Off a boundary it snaps to the nearest one first, then steps once.
    expect(railFlickTarget(-950, step, -60, setWidth)).toBe(-1200);
    expect(railFlickTarget(-950, step, 60, setWidth)).toBe(-400);
    // Stepping past the loop seam wraps, exactly like a hand-scrub: at offset
    // 0 (the seam) the previous card is the LAST one in the set, and one set
    // further on the loop has come round again.
    expect(railFlickTarget(0, step, 60, setWidth)).toBe(-3600);
    expect(railFlickTarget(-4000, step, -60, setWidth)).toBe(-400);
    // A degenerate card step leaves the offset alone (only wraps it).
    expect(railFlickTarget(-950, 0, -60, setWidth)).toBe(-950);
  });

  it("only treats a quick, deliberate gesture as a flick", () => {
    expect(isRailFlick(-120, 180)).toBe(true);
    expect(isRailFlick(120, 180)).toBe(true);
    // A nudge is not a flick...
    expect(isRailFlick(RAIL_FLICK_MIN_PX - 1, 100)).toBe(false);
    // ...nor is a long, slow drag (that one is a scrub, no snapping).
    expect(isRailFlick(-300, RAIL_FLICK_MAX_MS + 1)).toBe(false);
  });

  it("holds a hand-swiped rail for three seconds before it may resume", () => {
    expect(RAIL_IDLE_RESUME_MS).toBe(3000);
  });
});
