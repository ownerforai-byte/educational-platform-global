import { describe, expect, it } from "vitest";
import {
  FIGURE_CONDITIONS,
  FIGURE_CONDITION_LAW,
  MAX_CONDITION_MATCHES,
  conditionGuideFor,
  isDiagramRequest,
} from "../../src/ai/figure-conditions";
import { buildFigureBrief } from "../../src/ai/academic-figures";
import { upgradeMessages } from "../../src/ai/complete-answer";

/**
 * SYLLABUS CONDITION CATALOGUE (owner 2026-11-10): every physics/maths drawing
 * request must receive the precise standard cases for its topic — and only
 * those, so an unrelated figure never pays for the whole catalogue.
 */

describe("isDiagramRequest — drawing intent, not prose questions", () => {
  it("recognises draw/graph/diagram requests", () => {
    expect(isDiagramRequest("Draw the detailed diagram for this Physics topic, in English:\n\nconcave mirror")).toBe(true);
    expect(isDiagramRequest("graph of velocity versus time")).toBe(true);
    expect(isDiagramRequest("sketch the feasible region")).toBe(true);
    expect(isDiagramRequest("labelled diagram of the nephron")).toBe(true);
  });

  it("leaves ordinary questions alone", () => {
    expect(isDiagramRequest("What is a cell?")).toBe(false);
    expect(isDiagramRequest("Explain how a capacitor stores charge")).toBe(false);
    expect(isDiagramRequest("Who are you?")).toBe(false);
    expect(isDiagramRequest("")).toBe(false);
  });
});

describe("conditionGuideFor — the matched syllabus laws", () => {
  it("teaches all six concave-mirror object positions", () => {
    const guide = conditionGuideFor("ray diagram for a concave mirror, all object positions");
    expect(guide).toContain("SYLLABUS CONDITION GUIDE");
    expect(guide).toContain(FIGURE_CONDITION_LAW);
    expect(guide).toContain("between C and F");
    expect(guide).toContain("between F and P");
    expect(guide).toContain("virtual, erect, magnified");
  });

  it("teaches all six convex-lens object positions", () => {
    const guide = conditionGuideFor("convex lens image formation");
    expect(guide).toContain("beyond 2F₁");
    expect(guide).toContain("between F₁ and O");
    expect(guide).toContain("2F₂");
  });

  it("teaches the kinematics graph cases with slope and area meanings", () => {
    const guide = conditionGuideFor("velocity-time graph for uniform acceleration");
    expect(guide).toContain("slope = a");
    expect(guide).toContain("area under v-t = displacement");
    expect(guide).toContain("m s⁻¹");
  });

  it("teaches the four gas processes on all three axes", () => {
    const guide = conditionGuideFor("P-V diagram of isothermal and adiabatic processes");
    expect(guide).toContain("isothermal");
    expect(guide).toContain("adiabatic");
    expect(guide).toContain("P-T");
    expect(guide).toContain("V-T");
  });

  it("teaches every quadratic sign case", () => {
    const guide = conditionGuideFor("graph of a quadratic function");
    expect(guide).toContain("a > 0 / a < 0");
    expect(guide).toContain("D > 0");
    expect(guide).toContain("D = 0");
    expect(guide).toContain("D < 0");
    expect(guide).toContain("vertex");
  });

  it("teaches LPP feasible regions and corner points", () => {
    const guide = conditionGuideFor("linear programming feasible region");
    expect(guide).toContain("corner points");
    expect(guide).toContain("objective");
    expect(guide).toContain("infeasible");
  });

  it("teaches open/closed pipe harmonics for standing waves", () => {
    const guide = conditionGuideFor("standing waves in a closed pipe");
    expect(guide).toContain("odd harmonics only");
    expect(guide).toContain("λₙ = 4L/n");
  });

  it("stays silent for topics outside the catalogue", () => {
    expect(conditionGuideFor("labelled diagram of the human heart")).toBe("");
    expect(conditionGuideFor("life cycle of plasmodium")).toBe("");
    expect(conditionGuideFor("")).toBe("");
  });

  it("caps the number of matched blocks so prompts stay small", () => {
    // A request touching many families still carries at most the cap.
    const guide = conditionGuideFor(
      "draw the graph of a quadratic function, the velocity-time graph, a concave mirror, a convex lens, the P-V diagram and a parabola",
    );
    // Each condition guide is one line beginning "FAMILY NAME — …".
    const blocks = guide.split("\n").filter((line) => /^[A-Z].* — /.test(line));
    expect(blocks.length).toBeGreaterThan(0);
    expect(blocks.length).toBeLessThanOrEqual(MAX_CONDITION_MATCHES);
  });

  it("every catalogue entry has a non-trivial guide", () => {
    for (const condition of FIGURE_CONDITIONS) {
      expect(condition.guide.length).toBeGreaterThan(80);
      expect(condition.id).toBeTruthy();
    }
  });
});

describe("the catalogue rides every drawing lane", () => {
  it("buildFigureBrief carries the matched conditions", () => {
    const brief = buildFigureBrief({
      request: "concave mirror ray diagram for an object between C and F",
      kind: "ray",
    });
    expect(brief).toContain("SYLLABUS CONDITION GUIDE");
    expect(brief).toContain("beyond C, real, inverted, magnified");
  });

  it("buildFigureBrief stays unchanged for unmatched topics", () => {
    const brief = buildFigureBrief({ request: "labelled human heart", kind: "labelled" });
    expect(brief).not.toContain("SYLLABUS CONDITION GUIDE");
  });

  it("upgradeMessages carries the matched conditions for the rebuild pass", () => {
    const messages = upgradeMessages(
      "Draw the v-t graph for a body in free fall",
      "draft",
      "research",
    );
    expect(messages[0].content).toContain("SYLLABUS CONDITION GUIDE");
    expect(messages[0].content).toContain("free fall");
  });
});