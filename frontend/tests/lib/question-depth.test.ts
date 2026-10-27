import { describe, it, expect } from "vitest";
import { isDeepQuestion, isFollowUpAsk } from "@/lib/ai/question-depth";

/**
 * QUESTION DEPTH (owner 2026-10-27): the left-side Veer panel answers QUICK
 * questions inline; DEEP questions auto-lead to the main interface (/chat).
 * This pins the boundary: what stays quick vs. what deserves the full console.
 */
describe("isDeepQuestion", () => {
  it("keeps quick single-fact asks in the quick panel", () => {
    expect(isDeepQuestion("what is inertia")).toBe(false);
    expect(isDeepQuestion("formula for kinetic energy")).toBe(false);
    expect(isDeepQuestion("unit of force?")).toBe(false);
    expect(isDeepQuestion("who discovered the electron")).toBe(false);
    expect(isDeepQuestion("plural of focus")).toBe(false);
    expect(isDeepQuestion("when is the NEB exam")).toBe(false);
  });

  it("routes deep work to the main interface", () => {
    expect(isDeepQuestion("derive the lens maker formula step by step")).toBe(true);
    expect(isDeepQuestion("explain how the heart pumps blood")).toBe(true);
    expect(isDeepQuestion("why does the sky look blue")).toBe(true);
    expect(isDeepQuestion("difference between mitosis and meiosis")).toBe(true);
    expect(isDeepQuestion("compare SN1 and SN2 reactions")).toBe(true);
    expect(isDeepQuestion("solve this numerical: a ball thrown at 30 degrees")).toBe(true);
    expect(isDeepQuestion("teach me thermodynamics")).toBe(true);
  });

  it("treats a long multi-part ask as deep by sheer size", () => {
    const long =
      "what is refraction and how does it relate to snell's law, plus a quick note on total internal reflection and where it is used in optical fibres please";
    expect(long.length).toBeGreaterThanOrEqual(120);
    expect(isDeepQuestion(long)).toBe(true);
  });

  it("never classifies emptiness as deep", () => {
    expect(isDeepQuestion("")).toBe(false);
    expect(isDeepQuestion("   ")).toBe(false);
  });

  it("bare follow-ups stay in the panel (their context is the panel thread)", () => {
    expect(isFollowUpAsk("explain")).toBe(true);
    expect(isFollowUpAsk("explain more")).toBe(true);
    expect(isFollowUpAsk("go deeper")).toBe(true);
    expect(isFollowUpAsk("tell me more")).toBe(true);
    expect(isFollowUpAsk("why")).toBe(true);
    // A NEW deep question (with a subject) still auto-switches.
    expect(isFollowUpAsk("explain the heart's pumping mechanism")).toBe(false);
  });
});