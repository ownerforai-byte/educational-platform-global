/**
 * Topic figure registry — maps an exact syllabus topic slug to authored SVG
 * figures. Same discipline as the TopicVideo registry: explicit slugs only,
 * no fuzzy matching, guarded by a test.
 *
 * Each entry places one or more figures into the doc flow. `afterNoteIndex`
 * anchors a figure right after that note block (0-based); `keyword` anchors
 * after the first note block whose text contains it. Use whichever anchors
 * more robustly. Slugs verified against slugifySyllabusTopic() output.
 */

import type { ComponentType } from "react";
import { SnellsLawRayDiagram } from "./snells-law-ray-diagram";
import { OhmsLawCircuit } from "./ohms-law-circuit";
import { IonicCovalentBonding } from "./ionic-covalent-bonding";
import { EnergyFlowEcosystem } from "./energy-flow-ecosystem";
import { DerivativeTangentLine } from "./derivative-tangent-line";
import { WaveProperties } from "./wave-properties";

export interface TopicFigure {
  /** Rendered SVG component (theme-aware, uses currentColor). */
  Component: ComponentType<{ className?: string }>;
  /** Figure caption shown under the diagram. */
  caption: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Anchor: insert after this 0-based note block index. */
  afterNoteIndex?: number;
  /** Or: insert after the first note block containing this keyword. */
  keyword?: string;
}

interface TopicFiguresEntry {
  title: string;
  figures: TopicFigure[];
}

const REGISTRY: Record<string, TopicFiguresEntry> = {
  // ── Physics ──────────────────────────────────────────────────────────────
  "laws-of-refraction-refractive-index": {
    title: "Refraction at a boundary",
    figures: [
      {
        Component: SnellsLawRayDiagram,
        caption:
          "A ray bends towards the normal entering a denser medium (n₂ > n₁) and away when leaving it. Snell's law n₁ sin i = n₂ sin r fixes the angles.",
        alt: "Ray diagram showing incident, refracted and normal lines at a boundary between two media with different refractive indices",
        keyword: "Snell",
      },
    ],
  },
  "ohm-s-law-electrical-resistance-resistivity-conductivity": {
    title: "Ohm's law circuit",
    figures: [
      {
        Component: OhmsLawCircuit,
        caption:
          "A cell drives current I through a resistor R; the voltmeter reads V = IR across the element. Doubling R at fixed V halves I — the straight-line V–I graph is Ohm's law.",
        alt: "Simple circuit diagram with a cell, ammeter in series, resistor and voltmeter in parallel with the resistor",
        keyword: "Ohm",
      },
    ],
  },
  "wavefront-and-huygens-principle": {
    title: "Anatomy of a progressive wave",
    figures: [
      {
        Component: WaveProperties,
        caption:
          "Amplitude a, wavelength λ and one full oscillation period T on a progressive wave; on the right, Huygens' wavefronts with every point acting as a new source.",
        alt: "Sine wave with amplitude and wavelength labelled beside circular wavefronts radiating from a point source",
        keyword: "wavefront",
      },
    ],
  },
  // ── Chemistry ────────────────────────────────────────────────────────────
  "ionic-bond-and-its-properties": {
    title: "Ionic bond formation",
    figures: [
      {
        Component: IonicCovalentBonding,
        caption:
          "Left: sodium transfers its valence electron to chlorine — the Na⁺ and Cl⁻ ions then attract electrostatically. Compare with the shared pair on the right.",
        alt: "Diagram of ionic bond formation via electron transfer from sodium to chlorine",
        keyword: "transfer",
      },
    ],
  },
  "covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds": {
    title: "Covalent bond formation",
    figures: [
      {
        Component: IonicCovalentBonding,
        caption:
          "Right: two hydrogen atoms share an electron pair — both nuclei attract the same pair, which is the covalent bond. Compare with full transfer on the left.",
        alt: "Diagram of covalent bond formation via a shared electron pair between two hydrogen atoms",
        keyword: "shared",
      },
    ],
  },
  // ── Biology ──────────────────────────────────────────────────────────────
  "ecological-pyramids-and-energy-flow": {
    title: "Energy flow through an ecosystem",
    figures: [
      {
        Component: EnergyFlowEcosystem,
        caption:
          "Solar energy fixed by producers passes to herbivores and carnivores with ~90% lost as heat at each step — energy flows one way, nutrients cycle back through decomposers.",
        alt: "Flow diagram of ecosystem energy flow from the sun through producers, herbivores, carnivores and decomposers with heat loss",
        keyword: "energy",
      },
    ],
  },
  // ── Mathematics ──────────────────────────────────────────────────────────
  "geometric-interpretation-tangent-and-normal": {
    title: "Tangent and normal to a curve",
    figures: [
      {
        Component: DerivativeTangentLine,
        caption:
          "The derivative at P is the slope of the tangent; the normal is perpendicular to it (product of slopes = −1).",
        alt: "Curve with a tangent line touching at point P and a normal line perpendicular to it",
        keyword: "tangent",
      },
    ],
  },
};

/**
 * Look up figures for a topic. Exact slug match only — never fuzzy, so a
 * typo'd or renamed slug can never put the wrong diagram on a page.
 */
export function getTopicFigures(topicSlug: string): TopicFiguresEntry | undefined {
  return REGISTRY[topicSlug];
}

/** All registered slugs (for tests and tooling). */
export function registeredFigureSlugs(): string[] {
  return Object.keys(REGISTRY);
}
