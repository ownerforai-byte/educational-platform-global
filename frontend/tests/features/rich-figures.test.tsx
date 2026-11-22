/**
 * Rich figures (owner request 2026-11-22) — biology topics get detailed,
 * realistic raster illustrations instead of the shallow SVG set. An entry in
 * the rich registry must fully replace the SVG entry for its topic, and the
 * raster figure must actually render inside the Docs Viewer.
 */
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import {
  getTopicFigures,
  registeredFigureSlugs,
} from "@/features/docs/figures/registry";
import { RICH_FIGURES } from "@/features/docs/figures/rich-biology";
import { TopicDocView } from "@/features/docs/doc-view";

const CELL_DIVISION =
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign";

describe("rich figure registry (biology, from scratch)", () => {
  it("is covered by the shared registry guard via registeredFigureSlugs()", () => {
    for (const slug of Object.keys(RICH_FIGURES)) {
      expect(registeredFigureSlugs()).toContain(slug);
    }
  });

  it("replaces the SVG entry for the cell-division topic with a raster figure", () => {
    const entry = getTopicFigures(CELL_DIVISION);
    expect(entry).toBeDefined();
    expect(entry!.figures.length).toBeGreaterThan(0);
    for (const figure of entry!.figures) {
      // Rich = raster: a public asset path, no SVG component.
      expect(figure.src).toMatch(/^\/docs\/figures\/biology\//);
      expect(figure.src).toMatch(/\.(jpg|jpeg|png|webp)$/);
      expect(figure.Component).toBeUndefined();
    }
  });

  it("a topic without a rich entry still falls back to its SVG figures", () => {
    // Any slug from the SVG registry that rich figures do not cover yet.
    const svgOnly = registeredFigureSlugs().find((slug) => !(slug in RICH_FIGURES));
    expect(svgOnly).toBeDefined();
    const entry = getTopicFigures(svgOnly!);
    expect(entry).toBeDefined();
    expect(entry!.figures.some((f) => f.Component)).toBe(true);
  });
});

describe("rich figure render", () => {
  it("renders the raster illustration inside the Docs Viewer", () => {
    const entry = getTopicFigures(CELL_DIVISION)!;
    const figure = entry.figures[0];
    const { container } = render(
      <TopicDocView
        classSlug="class-11-notes"
        subjectSlug="biology"
        unitId="biomolecules-and-cell-biology"
        topicSlug={CELL_DIVISION}
        topicTitle="Cell division"
        data={{
          summary: "Growth and reproduction happen through cell division.",
          notes: [
            "**Mitosis:** the division that produces two identical diploid cells.",
            "**Prophase:** chromosomes condense and the spindle forms.",
            "**Meiosis:** the reduction division that makes gametes.",
          ],
          keyPoints: ["Mitosis conserves the chromosome number."],
        }}
      />,
    );

    const img = container.querySelector(`img[src='${figure.src}']`);
    expect(img).toBeTruthy();
    expect(img?.getAttribute("alt")).toBe(figure.alt);
    expect(container.textContent).toContain("Metaphase");
  });
});
