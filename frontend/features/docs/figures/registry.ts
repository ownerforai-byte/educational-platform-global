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
import { PeriodicTrendsDiagram } from "./periodic-trends";
import { HybridisationShapes } from "./hybridisation-shapes";
import { GalvanicCell } from "./galvanic-cell";
import { ThinLensRays } from "./thin-lens-rays";
import { ConcaveMirrorRays } from "./concave-mirror-rays";
import { ProjectileMotion } from "./projectile-motion";
import { FaradayInduction } from "./faraday-induction";

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
  "projectile-motion-and-its-applications": {
    title: "Anatomy of a projectile path",
    figures: [
      {
        Component: ProjectileMotion,
        caption:
          "Horizontal velocity stays constant while the vertical velocity falls to zero at the apex and grows again on the way down — the two independent motions add to a parabola.",
        alt: "Parabolic projectile trajectory with launch velocity, angle, apex, horizontal and vertical velocity components and range",
        keyword: "projectile",
      },
    ],
  },
  "mirror-formula": {
    title: "Rays at a concave mirror",
    figures: [
      {
        Component: ConcaveMirrorRays,
        caption:
          "Parallel rays reflect off a convex mirror and diverge; traced back they meet at the virtual focus behind the mirror. The mirror formula 1/u + 1/v = 1/f uses f < 0.",
        alt: "Concave mirror diagram with parallel incident rays spreading out from a virtual focus behind the mirror",
        keyword: "mirror",
      },
    ],
  },
  "spherical-lenses-angular-magnification": {
    title: "Ray construction for a thin lens",
    figures: [
      {
        Component: ThinLensRays,
        caption:
          "Three construction rays — parallel-to-axis, through the optical centre, and through F — meet at the image. An object between F and 2F gives a real, inverted, enlarged image beyond 2F′.",
        alt: "Thin converging lens with three construction rays forming a real inverted image beyond the second focal point",
        keyword: "lens",
      },
    ],
  },
  "faraday-s-laws-of-electromagnetic-induction": {
    title: "Faraday's induction experiment",
    figures: [
      {
        Component: FaradayInduction,
        caption:
          "Sliding a magnet in or out of a coil changes the flux linked with it, so an emf ε = −N dΦ/dt appears and the galvanometer needle deflects. No motion, no emf.",
        alt: "Bar magnet moving through a solenoid connected to a galvanometer, with the emf formula",
        keyword: "magnet",
      },
    ],
  },
  // ── Chemistry ────────────────────────────────────────────────────────────
  "periodic-trend-and-periodicity-atomic-radii-ionic-radii-ionization-energy-electron-affinity-elec": {
    title: "Periodic trends",
    figures: [
      {
        Component: PeriodicTrendsDiagram,
        caption:
          "Across a period the added protons pull the same shell tighter, so radius falls while ionisation energy and electronegativity rise. Down a group each new shell makes the atom larger and the outer electron easier to remove.",
        alt: "Grid of elements in periods and groups with arrows showing atomic radius falling across a period and rising down a group",
        keyword: "atomic radius",
      },
    ],
  },
  "hybridization-involving-s-and-p-orbitals-only": {
    title: "Hybrid orbitals and molecular shape",
    figures: [
      {
        Component: HybridisationShapes,
        caption:
          "Hybrid orbitals arrange themselves as far apart as possible: four sp³ orbitals at 109.5°, three sp² orbitals at 120° plus a perpendicular p orbital, two sp orbitals at 180°.",
        alt: "Comparison of sp3 tetrahedral, sp2 trigonal planar and sp linear hybrid orbital shapes with bond angles",
        keyword: "hybrid",
      },
    ],
  },
  "electrochemical-cells-galvanic-cell-cell-potential-standard-electrode-potential": {
    title: "A galvanic cell at work",
    figures: [
      {
        Component: GalvanicCell,
        caption:
          "Zinc is oxidised at the anode and copper ions are reduced at the cathode; electrons travel through the wire while the salt bridge keeps charge balanced in both solutions.",
        alt: "Galvanic cell with zinc anode, copper cathode, salt bridge, electron flow and half equations",
        keyword: "galvanic",
      },
    ],
  },
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
