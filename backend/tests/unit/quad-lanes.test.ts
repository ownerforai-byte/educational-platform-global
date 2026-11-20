import { describe, expect, it } from "vitest";
import { QUAD_SIZE, selectQuadLanes } from "../../src/api/ai/quad.controller";

/**
 * Regression gate for the Model Quad's lane selection (owner 2026-11-18,
 * latest word: "remove gemini — keep 2 free models from nvidia and call both
 * from same key — wire it to 2 place"). The desk must ALWAYS show four
 * squares, the squares must be REAL model lanes (never the internal keyword
 * engine, never the Diagram Hub lane), the owner's pinned four — Agnes twice
 * (3.0 Flash + 2.5 Flash on one key) and two NVIDIA NIM models (Nemotron 3
 * Ultra + Gemma 4 31B on one key) — must win whenever their keys are
 * live, and a square whose lane has no key must say so honestly instead of
 * silently answering with another model.
 */
describe("Model Quad lane selection", () => {
  it("always returns exactly four squares", () => {
    for (const registered of [
      [],
      ["internal"],
      ["groq"],
      ["agnes", "agnes-2", "nvidia", "nvidia-2"],
      ["groq", "gemini", "llm7", "ovh", "deepseek", "mistral"],
      ["internal", "diagram-hub", "agnes", "agnes-2", "nvidia", "nvidia-2", "groq"],
    ]) {
      expect(selectQuadLanes(registered)).toHaveLength(QUAD_SIZE);
    }
  });

  it("pins the owner's four — Agnes ×2, NVIDIA ×2 — when their keys are live", () => {
    // Extra registered lanes (gemini, groq, llm7, …) must NOT crowd the
    // pinned four — Gemini was removed from the desk by owner decision.
    const lanes = selectQuadLanes([
      "internal",
      "agnes",
      "agnes-2",
      "nvidia",
      "nvidia-2",
      "gemini",
      "groq",
      "llm7",
    ]);
    expect(lanes.map((lane) => lane.name)).toEqual([
      "agnes",
      "agnes-2",
      "nvidia",
      "nvidia-2",
    ]);
    expect(lanes.every((lane) => lane.configured)).toBe(true);
  });

  it("runs each key TWICE as two distinct models (Agnes pair and NVIDIA pair)", () => {
    const lanes = selectQuadLanes(["agnes", "agnes-2", "nvidia", "nvidia-2"]);
    const agnesModels = lanes
      .filter((lane) => lane.name.startsWith("agnes"))
      .map((lane) => lane.model);
    const nvidiaModels = lanes
      .filter((lane) => lane.name.startsWith("nvidia"))
      .map((lane) => lane.model);
    expect(agnesModels).toHaveLength(2);
    expect(nvidiaModels).toHaveLength(2);
    expect(new Set(agnesModels).size).toBe(2);
    expect(new Set(nvidiaModels).size).toBe(2);
  });

  it("falls through a pinned lane whose key is missing, in pin order", () => {
    // No second NVIDIA model key — the fourth square borrows the next
    // configured lane (Gemini is a plain filler now, never a pin).
    const lanes = selectQuadLanes(["agnes", "agnes-2", "nvidia", "gemini"]);
    expect(lanes.map((lane) => lane.name)).toEqual(["agnes", "agnes-2", "nvidia", "gemini"]);
  });

  it("never puts the internal engine, the Diagram Hub lane or duplicates on a square", () => {
    const lanes = selectQuadLanes([
      "internal",
      "diagram-hub",
      "agnes",
      "agnes-2",
      "nvidia",
      "nvidia-2",
      "groq",
    ]);
    const names = lanes.map((lane) => lane.name);
    expect(names).not.toContain("internal");
    expect(names).not.toContain("diagram-hub");
    expect(new Set(names).size).toBe(names.length);
  });

  it("fills empty deployments with honest 'not configured' placeholders", () => {
    const lanes = selectQuadLanes(["internal"]);
    expect(lanes.every((lane) => !lane.configured)).toBe(true);
    // Placeholders are the pinned four in pin order — the owner sees exactly
    // which keys to add.
    expect(lanes.map((lane) => lane.name)).toEqual(["agnes", "agnes-2", "nvidia", "nvidia-2"]);
  });
});
