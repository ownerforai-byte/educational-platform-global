/**
 * Rich biology figures — owner request 2026-11-22.
 *
 * The SVG figure set is great for classification-style diagrams (keys,
 * tables, flowcharts) but too shallow for the visual heart of biology.
 * This registry replaces those shallow figures with rich, detailed,
 * realistic illustrations — actual ultrastructure rendered the way a
 * museum wall chart or a modern textbook plate would show it — while the
 * caption carries the conceptual explanation.
 *
 * Conventions:
 *  • Assets live in `frontend/public/docs/figures/biology/` (served at
 *    `/docs/figures/biology/…`).
 *  • One entry per syllabus topic slug (exact match, same discipline as
 *    the SVG registry — guarded by the same tests).
 *  • An entry here REPLACES the SVG entry for that topic entirely.
 *  • Illustrations are generated artwork: no in-image text dependency —
 *    the caption and the topic's own labels carry the naming, so a
 *    garbled render can never teach something wrong.
 */

import type { TopicFiguresEntry } from "./registry";

export const RICH_FIGURES: Record<string, TopicFiguresEntry> = {
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign": {
    title: "Mitosis under the microscope",
    figures: [
      {
        src: "/docs/figures/biology/mitosis-stages.jpg",
        caption:
          "Mitosis in five snapshots, left to right. Early prophase: chromatin condenses into visible X-shaped chromosomes (each still a duplicated sister-chromatid pair). Late prophase: the nuclear envelope breaks down and the spindle begins to reach for the chromosomes. Metaphase: chromosomes line up single file on the cell's equator. Anaphase: the spindle pulls the sister chromatids apart to opposite poles. Telophase: two nuclei reform around identical diploid chromosome sets and the cytoplasm divides. Because sister chromatids are exact copies, every daughter cell is genetically identical to the parent — the basis of growth, repair and asexual reproduction.",
        alt: "Row of five cells showing mitosis stages from early prophase through telophase, with condensed red and blue chromosomes and spindle fibers",
        keyword: "prophase",
      },
    ],
  },
};
