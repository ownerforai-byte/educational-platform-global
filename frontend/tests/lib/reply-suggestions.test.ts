import { describe, it, expect } from "vitest";
import {
  analyzeReply,
  buildReplySuggestions,
  buildSelfCheck,
} from "@/lib/ai/reply-suggestions";

/**
 * The reply suggestion boxes must be derived, not fixed (owner 2026-11-09:
 * "not fixed ideas but depending on place"). These pin both halves: the reply
 * analysis that shapes the prompts, and the per-place link moves.
 */

const formulaReply =
  "**Newton's second law.** The equation is $F = m \\cdot a$.\n\nStep 1: Identify the forces.\nStep 2: Apply the formula.\n\nThis is a common **exam** topic in NEB board exams.";

const plainReply = "Photosynthesis is how plants make food from sunlight.";

describe("analyzeReply", () => {
  it("reads formulas, steps and bold terms out of the reply", () => {
    const analysis = analyzeReply(formulaReply);
    expect(analysis.hasFormulas).toBe(true);
    expect(analysis.hasSteps).toBe(true);
    expect(analysis.mentionsExam).toBe(true);
    expect(analysis.keyTerms).toContain("Newton's second law.");
  });

  it("stays quiet on a plain answer", () => {
    const analysis = analyzeReply(plainReply);
    expect(analysis.hasFormulas).toBe(false);
    expect(analysis.hasSteps).toBe(false);
    expect(analysis.keyTerms).toEqual([]);
  });

  it("puts related contrasting terms in the box, never the section labels", () => {
    const analysis = analyzeReply(
      "**Concept**\n\nThe pair **speed vs velocity** decides most traps.\n\n**Features**\n\n1. direction\n\n**Solved examples**\n\nWorked above.",
    );
    expect(analysis.keyTerms).toContain("speed vs velocity");
    // Structural labels are scaffolding, not vocabulary.
    expect(analysis.keyTerms).not.toContain("Concept");
    expect(analysis.keyTerms).not.toContain("Features");
    expect(analysis.keyTerms).not.toContain("Solved examples");
    // The halves of a pair never repeat as their own chips.
    expect(analysis.keyTerms).not.toContain("speed");
  });

  it("joins a pair written as two bold terms", () => {
    const analysis = analyzeReply("**mass** vs **weight** is the classic trap.");
    expect(analysis.keyTerms).toContain("mass vs weight");
    expect(analysis.keyTerms).not.toContain("mass");
    expect(analysis.keyTerms).not.toContain("weight");
  });

  it("extracts explicitly labelled Related and Contrasts lists", () => {
    const analysis = analyzeReply(
      "**Related —** displacement, velocity, acceleration, trajectory\n**Contrasts —** distance vs displacement (scalar vs vector), speed vs velocity (magnitude vs direction)",
    );
    expect(analysis.relatedTerms).toEqual(["displacement", "velocity", "acceleration", "trajectory"]);
    expect(analysis.contrasts).toEqual([
      "distance vs displacement (scalar vs vector)",
      "speed vs velocity (magnitude vs direction)",
    ]);
  });
});

describe("buildReplySuggestions", () => {
  it("shapes prompts from the reply itself", () => {
    const suggestions = buildReplySuggestions(formulaReply, { surface: "chat" });
    const labels = suggestions.map((s) => s.label);
    expect(labels).toContain("Walk the formula");
    expect(labels).toContain("Another worked example");
    expect(labels).toContain("Explain the key terms");
    expect(labels).toContain("Quiz me on this");
  });

  it("adds place-specific link moves", () => {
    const suggestions = buildReplySuggestions(plainReply, {
      surface: "ask",
      subjectName: "Physics",
      subjectSlug: "physics",
      topicTitle: "Laws of Motion",
      topicHref: "/class-11-notes/physics/chapters/kinematics/topics/motion",
    });
    const byLabel = new Map(suggestions.map((s) => [s.label, s]));
    expect(byLabel.get("Open the notes")?.href).toContain("/topics/motion");
    expect(byLabel.get("Practice Physics")?.href).toBe("/practice/physics");
    expect(byLabel.get("Revise as flashcards")?.href).toBe("/srs");
  });

  it("caps small surfaces at two boxes", () => {
    const suggestions = buildReplySuggestions(formulaReply, {
      surface: "widget",
      subjectSlug: "physics",
    });
    expect(suggestions.length).toBe(2);
    // The budget split keeps at least one link move on the widget.
    expect(suggestions.some((s) => s.kind === "link")).toBe(true);
  });
});

describe("buildSelfCheck", () => {
  it("builds local recall prompts from the reply and place", () => {
    const checks = buildSelfCheck(formulaReply, { surface: "chat", topicTitle: "Laws of Motion" });
    expect(checks[0]).toMatch(/Define Newton's second law/);
    expect(checks.join(" ")).toMatch(/Laws of Motion/);
    expect(checks.length).toBeLessThanOrEqual(3);
  });

  it("asks to compare a contrasting pair instead of defining it", () => {
    const checks = buildSelfCheck("**speed vs velocity** is the trap.", { surface: "chat" });
    expect(checks[0]).toMatch(/Compare speed vs velocity/);
  });
});
