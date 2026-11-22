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
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r": {
    title: "Organelle ultrastructure — the powerhouse, the food factory and the protein line",
    figures: [
      {
        src: "/docs/figures/biology/organelle-ultrastructure.jpg",
        caption:
          "Three organelles in cutaway, drawn the way an electron micrograph plus a model kit would show them. Mitochondrion (left): a smooth outer membrane and an inner membrane folded into cristae — the folds pack in far more ATP-synthase surface than a flat sac could; the grainy matrix holds its own circular DNA and ribosomes, the reason mitochondria inherit only from the mother. Chloroplast (centre): a double envelope around stacked green thylakoid discs (grana) threaded by stroma lamellae; the stacks are the photosynthetic membranes where light is captured, and the stroma around them fixes CO₂ into sugar, storing it first as a starch granule. Rough endoplasmic reticulum and Golgi (right): ribosome-studded sheets where proteins are threaded and folded, feeding vesicles to the Golgi's stacked cisternae, which finish, tag and ship them. One theme runs through all three: membrane folds and stacks multiply working surface inside a fixed volume.",
        alt: "Detailed cutaway illustrations of a mitochondrion with cristae, a chloroplast with grana stacks and stroma, and rough endoplasmic reticulum with ribosomes leading to a Golgi apparatus with vesicles",
        keyword: "mitochondria",
      },
    ],
  },
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
