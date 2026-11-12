import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import {
  getTopicFigures,
  registeredFigureSlugs,
} from "@/features/docs/figures/registry";
import { parseNotes, readingMinutes } from "@/features/docs/doc-parser";
import {
  buildDocConceptMap,
  deriveMindmap,
  normaliseAuthoredMindmap,
} from "@/features/docs/doc-mindmap";
import { TopicDocView } from "@/features/docs/doc-view";

/**
 * The DocView registry mounts hand-authored SVG figures on real syllabus
 * topics. Every slug must resolve to an actual syllabus topic — a stale slug
 * would silently stop rendering (and leave the figure unreachable). Same
 * discipline as the topic-video registry test.
 */
describe("topic doc figure registry", () => {
  const allSlugs = new Set(
    SYLLABUS.flatMap((cls) =>
      cls.subjects.flatMap((subj) =>
        subj.units.flatMap((unit) => unit.topics.map((topic) => slugifySyllabusTopic(topic))),
      ),
    ),
  );

  it("every figure slug is a real syllabus topic", () => {
    const stale = registeredFigureSlugs().filter((slug) => !allSlugs.has(slug));
    expect(stale).toEqual([]);
  });

  it("every figure entry has at least one figure with caption, alt and an anchor", () => {
    for (const slug of registeredFigureSlugs()) {
      const entry = getTopicFigures(slug);
      expect(entry).toBeDefined();
      expect(entry!.figures.length).toBeGreaterThan(0);
      for (const figure of entry!.figures) {
        expect(figure.caption.length).toBeGreaterThan(10);
        expect(figure.alt.length).toBeGreaterThan(5);
        expect(figure.afterNoteIndex !== undefined || figure.keyword !== undefined).toBe(true);
      }
    }
  });
});

describe("doc parser", () => {
  it("splits bold-lead notes into definition + trailing body", () => {
    const blocks = parseNotes([
      "**Snell's law:** the ratio of sines equals the refractive-index ratio.",
      "This follows from **Fermat's principle** and holds for plane boundaries.",
    ]);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].segments[0]).toEqual({
      kind: "definition",
      term: "Snell's law",
      body: "the ratio of sines equals the refractive-index ratio.",
    });
    expect(blocks[1].segments[0].kind).toBe("paragraph");
  });

  it("recognises display math lines as their own segment", () => {
    const blocks = parseNotes(["Intro line.\n$$n_1 \\sin i = n_2 \\sin r$$"]);
    expect(blocks[0].segments[1]).toEqual({
      kind: "displayMath",
      tex: "n_1 \\sin i = n_2 \\sin r",
    });
  });

  it("readingMinutes scales with text length", () => {
    expect(readingMinutes("short")).toBe(1);
    expect(readingMinutes(Array(700).fill("word").join(" "))).toBeGreaterThanOrEqual(3);
  });
});

describe("doc concept map", () => {
  it("prefers an authored mindmap and normalises details", () => {
    const map = buildDocConceptMap({
      topicTitle: "Banking of Roads",
      mindmap: {
        centralConcept: "Banking of Roads",
        branches: [
          { topic: "Why Banking?", details: ["Flat roads rely on friction", "Tilt adds a normal-force component"] },
          { topic: "Design Speed", details: ["v = sqrt(rg tan theta)"] },
        ],
      },
    });
    expect(map.source).toBe("authored");
    expect(map.branches).toHaveLength(2);
    expect(map.branches[0].details?.[1]).toMatch(/normal-force/);
  });

  it("falls back to a derived map when the authored one is unusable", () => {
    expect(normaliseAuthoredMindmap({ centralConcept: "X", branches: [{ topic: "only one" }] })).toBeNull();
    const derived = deriveMindmap({
      topicTitle: "Ohm's law",
      keyPoints: ["V = IR", "R depends on material and dimensions"],
      formulas: ["$V = IR$"],
      notes: ["**Resistance:** opposition to current flow."],
    });
    expect(derived.source).toBe("derived");
    expect(derived.branches.length).toBeGreaterThanOrEqual(2);
    expect(derived.centralConcept).toBe("Ohm's law");
  });

  it("always builds at least two branches even from notes alone", () => {
    const map = buildDocConceptMap({
      topicTitle: "Limits",
      notes: [
        "**Right-hand limit:** approach from values greater than a.",
        "**Left-hand limit:** approach from values smaller than a.",
        "**Existence:** the two one-sided limits must agree.",
      ],
    });
    expect(map.branches.length).toBeGreaterThanOrEqual(2);
    const points = map.branches.reduce((n, b) => n + (b.details?.length ?? 0), 0);
    expect(points).toBeGreaterThanOrEqual(3);
  });
});

describe("TopicDocView", () => {
  const baseProps = {
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitId: "refraction-at-plane-surfaces",
    topicSlug: "laws-of-refraction-refractive-index",
    topicTitle: "Laws of refraction, refractive index",
  };

  it("renders the registry figure on a matching topic", () => {
    render(
      <TopicDocView
        {...baseProps}
        data={{
          notes: ["**Snell's law:** n₁ sin i = n₂ sin r governs refraction at a boundary."],
          keyPoints: ["n depends on the pair of media, not on the angle."],
        }}
      />,
    );
    expect(screen.getByText(/bends towards the normal/)).toBeTruthy();
    expect(screen.getByRole("img", { name: /Refraction of a ray/ })).toBeTruthy();
  });

  it("renders the concept map section with the central concept", () => {
    render(
      <TopicDocView
        {...baseProps}
        data={{
          notes: ["**Snell's law:** n₁ sin i = n₂ sin r governs refraction."],
          keyPoints: ["n depends on the media pair"],
          formulas: ["$n_1 \\sin i = n_2 \\sin r$"],
        }}
      />,
    );
    expect(screen.getAllByText("Concept map").length).toBeGreaterThan(0);
    expect(screen.getByRole("img", { name: /Concept map for/ })).toBeTruthy();
  });

  it("renders all six section headings and gracefully handles empty data", () => {
    render(<TopicDocView {...baseProps} data={{}} />);
    for (const label of ["Concept map", "1. Big picture", "2. The explanation", "5. Practice"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(/No long-form explanation authored/)).toBeTruthy();
  });
});

describe("TopicDocView with a real concept JSON", () => {
  // Rendering a shipped payload proves the whole doc (concept map, KaTeX
  // formulas, authored figure) survives real content, not just fixtures.
  const realJson = JSON.parse(
    readFileSync(
      join(
        process.cwd(),
        "..",
        "content",
        "notes",
        "concepts",
        "class-11",
        "physics",
        "kinematics",
        "05-projectile-motion-and-its-applications.json",
      ),
      "utf8",
    ),
  ) as Record<string, unknown>;

  it("renders map, formulas and the projectile figure from shipped content", () => {
    render(
      <TopicDocView
        classSlug="class-11-notes"
        subjectSlug="physics"
        unitId="kinematics"
        topicSlug="projectile-motion-and-its-applications"
        topicTitle={String(realJson.topicTitle)}
        data={realJson as never}
      />,
    );
    expect(screen.getByRole("img", { name: /Concept map for/ })).toBeTruthy();
    expect(screen.getAllByText("Projectile motion and its applications").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1. Big picture").length).toBeGreaterThan(0);
    // KatеX markup is produced by MathMarkdown for the authored formulas.
    expect(document.querySelectorAll(".katex").length).toBeGreaterThan(0);
    expect(screen.getByRole("img", { name: /Projectile trajectory parabola/i })).toBeTruthy();
  });
});
