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
const EUKARYOTIC_CELLS =
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r";
const MONERA =
  "monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano";

describe("rich figure registry (biology, from scratch)", () => {
  it("is covered by the shared registry guard via registeredFigureSlugs()", () => {
    for (const slug of Object.keys(RICH_FIGURES)) {
      expect(registeredFigureSlugs()).toContain(slug);
    }
  });

  it("leads the cell-division topic with a raster figure and keeps only the classification SVGs listed in keepSvg", () => {
    const entry = getTopicFigures(CELL_DIVISION);
    expect(entry).toBeDefined();
    expect(entry!.figures.length).toBeGreaterThan(0);
    // Every rich (raster) figure: a public asset path, no SVG component.
    for (const figure of entry!.figures) {
      if (figure.src !== undefined) {
        expect(figure.src).toMatch(/^\/docs\/figures\/biology\//);
        expect(figure.src).toMatch(/\.(jpg|jpeg|png|webp)$/);
        expect(figure.Component).toBeUndefined();
      } else {
        // Kept SVG figures must be classification-style and explicitly whitelisted.
        expect(figure.keyword).toBeDefined();
        expect(entry!.keepSvg).toContain(figure.keyword);
        expect(figure.Component).toBeDefined();
      }
    }
    // The plate comes first; the kept flowcharts/diagrams follow.
    expect(entry!.figures[0].src).toBeDefined();
    expect(entry!.figures.some((f) => f.keyword === "cell cycle")).toBe(true);
    // The superseded shallow stage panels stay replaced.
    expect(entry!.figures.some((f) => f.keyword === "metaphase")).toBe(false);
  });

  it("merges keepSvg figures for the monera topic and drops the superseded structural SVG", () => {
    const entry = getTopicFigures(MONERA);
    expect(entry).toBeDefined();
    // The raster cutaway leads the entry.
    expect(entry!.figures[0].src).toMatch(/bacterial-cell-cutaway\.jpg$/);
    // Classification SVGs survive…
    expect(entry!.figures.some((f) => f.keyword === "gram")).toBe(true);
    expect(entry!.figures.some((f) => f.keyword === "heterocyst")).toBe(true);
    // …but the shallow labelled structural diagram is replaced by the raster.
    expect(entry!.figures.filter((f) => f.keyword === "nucleoid")).toHaveLength(1);
    expect(entry!.figures.find((f) => f.keyword === "nucleoid")!.src).toBeDefined();
  });

  it("keeps the classification SVGs for the eukaryotic-cells topic alongside the ultrastructure plate", () => {
    const entry = getTopicFigures(EUKARYOTIC_CELLS);
    expect(entry).toBeDefined();
    expect(entry!.figures[0].src).toMatch(/organelle-ultrastructure\.jpg$/);
    for (const keyword of ["plasma membrane", "cellulose", "diffusion", "microtubule"]) {
      expect(entry!.figures.some((f) => f.keyword === keyword)).toBe(true);
    }
    // The shallow single-organelle cutaways stay replaced.
    expect(entry!.figures.some((f) => f.keyword === "nucleus")).toBe(false);
    expect(entry!.figures.some((f) => f.keyword === "lysosome")).toBe(false);
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
