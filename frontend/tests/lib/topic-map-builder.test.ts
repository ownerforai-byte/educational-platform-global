import { describe, it, expect } from "vitest";
import { buildTopicMindmap, buildUnitMindmap, splitTopicTitle } from "@/features/mindmap/topic-map-builder";
import type { MindmapNode } from "@/features/mindmap/types";

const RICH_CONTENT = {
  topicTitle: "Atomic Structure: Rutherford model, Bohr postulates and hydrogen spectrum",
  summary: "How electrons are arranged around the nucleus.",
  importantConcepts: [
    "**Rutherford model**: a dense positive nucleus with electrons outside it.",
    "**Bohr postulate**: angular momentum is quantised as mvr = nh/2π.",
    "**Hydrogen spectrum**: emission lines arise from electron transitions.",
  ],
  keyPoints: [
    "The nucleus carries almost all the mass.",
    "Only certain orbits are allowed.",
  ],
  formulas: [
    "**Radius of nth orbit**: r = n²h²/(4π²mZe²).",
    "**Energy of nth level**: E = -13.6/n² eV.",
  ],
  examShortTricks: ["Count lines with (n₂ - n₁)(n₂ - n₁ + 1)/2."],
  confusion: ["Bohr's model fails for multi-electron atoms."],
  practiceQuestions: ["Calculate the wavelength of the Hα line."],
  notes: [
    "**Derivation**: centripetal force equals Coulomb attraction.",
    "**Conditions**: valid for hydrogen-like species only.",
    "**Limitation**: cannot explain fine structure.",
  ],
};

function walk(node: MindmapNode, visit: (n: MindmapNode, depth: number) => void, depth = 0) {
  visit(node, depth);
  for (const child of node.children ?? []) walk(child, visit, depth + 1);
}

function depthOf(node: MindmapNode): number {
  let max = 0;
  walk(node, (_n, d) => {
    max = Math.max(max, d);
  });
  return max;
}

function allNodes(node: MindmapNode): MindmapNode[] {
  const out: MindmapNode[] = [];
  walk(node, (n) => out.push(n));
  return out;
}

describe("deep topic mindmap builder", () => {
  it("splits a NEB topic title into its syllabus parts", () => {
    const parts = splitTopicTitle("States of Matter: solid, liquid and gas");
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.join(" ")).toContain("liquid");
  });

  it("builds a multi-level tree from the topic's own content", () => {
    const root = buildTopicMindmap(RICH_CONTENT);
    expect(root.label.length).toBeGreaterThan(0);
    expect((root.children ?? []).length).toBeGreaterThanOrEqual(4);
    // branch → sub-branch → point: three levels below the root at minimum.
    expect(depthOf(root)).toBeGreaterThanOrEqual(3);
  });

  it("gives every branch children so each one can be folded and unfolded", () => {
    const root = buildTopicMindmap(RICH_CONTENT);
    const branches = root.children ?? [];
    expect(branches.length).toBeGreaterThan(0);
    for (const branch of branches) {
      expect(branch.children?.length ?? 0, `branch "${branch.label}" is a dead end`).toBeGreaterThan(0);
    }
  });

  it("never emits an empty label or a duplicate id", () => {
    const nodes = allNodes(buildTopicMindmap(RICH_CONTENT));
    const ids = new Set<string>();
    for (const node of nodes) {
      expect(node.label.trim().length).toBeGreaterThan(0);
      expect(ids.has(node.id), `duplicate node id ${node.id}`).toBe(false);
      ids.add(node.id);
    }
  });

  it("still produces a usable map when the topic ships no content", () => {
    const root = buildTopicMindmap({ topicTitle: "Nervous System" });
    expect(root.label).toBe("Nervous System");
    expect((root.children ?? []).length).toBeGreaterThan(0);
  });

  it("adds unit context as its own branch", () => {
    const root = buildTopicMindmap({
      topicTitle: "Photosynthesis",
      unitTitle: "Plant Physiology",
      unitTopics: ["Photosynthesis", "Respiration", "Transpiration"],
    });
    const labels = (root.children ?? []).map((c) => c.label.toLowerCase());
    expect(labels.some((l) => l.includes("other topics"))).toBe(true);
  });

  it("builds a unit map with a branch per topic", () => {
    const root = buildUnitMindmap("Plant Physiology", [
      { title: "Photosynthesis: light and dark reactions", slug: "photosynthesis" },
      { title: "Respiration", slug: "respiration" },
    ]);
    expect((root.children ?? []).length).toBe(2);
    expect((root.children?.[0]?.children ?? []).length).toBeGreaterThan(0);
  });

  it("keeps every topic's map distinct (no generic shared tree)", () => {
    const a = buildTopicMindmap({ ...RICH_CONTENT, topicTitle: "Photosynthesis" });
    const b = buildTopicMindmap({ ...RICH_CONTENT, topicTitle: "Newton's laws of motion" });
    expect(a.label).not.toBe(b.label);
  });
});