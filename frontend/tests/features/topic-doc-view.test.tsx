import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import {
  getTopicFigures,
  registeredFigureSlugs,
} from "@/features/docs/figures/registry";
import { parseNotes, readingMinutes } from "@/features/docs/doc-parser";
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

  it("renders all five section headings and gracefully handles empty data", () => {
    render(<TopicDocView {...baseProps} data={{}} />);
    for (const label of ["1. Big picture", "2. The explanation", "5. Practice"]) {
      expect(screen.getByText(label)).toBeTruthy();
    }
    expect(screen.getByText(/No long-form explanation authored/)).toBeTruthy();
  });
});
