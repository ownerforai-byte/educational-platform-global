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
import { EukaryoticCell } from "./eukaryotic-cell";
import { MitosisStages } from "./mitosis-stages";
import { BiomoleculeClasses } from "./biomolecule-classes";
import { BacterialCell } from "./bacterial-cell";
import { BacteriophageStructure } from "./bacteriophage-structure";
import { NitrogenCycle } from "./nitrogen-cycle";
import { EarthwormDigestive } from "./earthworm-digestive";
import { FrogHeartCirculation } from "./frog-heart-circulation";
import { PlasmaMembraneFluidMosaic } from "./plasma-membrane-fluid-mosaic";
import { MitochondrionCutaway } from "./mitochondrion-cutaway";
import { ChloroplastCutaway } from "./chloroplast-cutaway";
import { NucleusStructure } from "./nucleus-structure";
import { GolgiSecretoryPathway } from "./golgi-secretory-pathway";
import { CarbohydrateTypes } from "./carbohydrate-types";
import { ProteinStructureLevels } from "./protein-structure-levels";
import { TriglycerideFormation } from "./triglyceride-formation";
import { NucleotideDnaHelix } from "./nucleotide-dna-helix";
import { CellTheoryTimeline } from "./cell-theory-timeline";
import { ProkaryoteVsEukaryote } from "./prokaryote-vs-eukaryote";
import { CellSizeScale } from "./cell-size-scale";
import { UnicellularToMulticellular } from "./unicellular-to-multicellular";
import { MicroscopeComparison } from "./microscope-comparison";
import { CellCyclePhases } from "./cell-cycle-phases";
import { MeiosisIStages } from "./meiosis-one-stages";
import { CrossingOver } from "./crossing-over";
import { MitosisVsMeiosisOutcome } from "./mitosis-vs-meiosis-outcome";
import { BacterialShapes } from "./bacterial-shapes";
import { BacterialNutritionModes } from "./bacterial-nutrition-modes";
import { BacterialGrowthCurve } from "./bacterial-growth-curve";
import { BinaryFissionRecombination } from "./binary-fission-recombination";
import { VirusShapeTypes } from "./virus-shape-types";
import { LyticLysogenicCycle } from "./lytic-lysogenic-cycle";
import { VirusVsBacteria } from "./virus-vs-bacteria";
import { HivRetrovirus } from "./hiv-retrovirus";
import { RecombinantDnaSteps } from "./recombinant-dna-steps";
import { PcrSteps } from "./pcr-steps";
import { CloningVectorPlasmid } from "./cloning-vector-plasmid";
import { IndustrialMicrobiology } from "./industrial-microbiology";
import { BiotechApplicationsMap } from "./biotech-applications-map";

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
  "biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-": {
    title: "The four classes of biomolecules",
    figures: [
      {
        Component: BiomoleculeClasses,
        caption:
          "The four great biomolecule classes with their monomers, elements and functions. Carbohydrates and lipids store energy; proteins do the work; nucleic acids store and transmit information.",
        alt: "Four panels showing carbohydrates, proteins, lipids and nucleic acids with monomers and functions",
        keyword: "carbohydrates",
      },
      {
        Component: CarbohydrateTypes,
        caption:
          "Carbohydrates from three angles: single monosaccharides (glucose, fructose), pairs joined by glycosidic bonds (sucrose, lactose, maltose), and long storage or structural polysaccharide chains (starch, glycogen, cellulose).",
        alt: "Carbohydrate classification from monosaccharides through glycosidic-bonded disaccharides to polysaccharide chains",
        keyword: "monosaccharide",
      },
      {
        Component: ProteinStructureLevels,
        caption:
          "Protein structure at four levels: the amino-acid sequence (primary), hydrogen-bonded α-helices and β-sheets (secondary), the folded 3-D globule (tertiary), and multi-subunit assemblies like haemoglobin (quaternary).",
        alt: "Four levels of protein structure from amino acid sequence to quaternary subunit assembly",
        keyword: "peptide",
      },
      {
        Component: TriglycerideFormation,
        caption:
          "How a fat is built: glycerol's three −OH groups each ester-bond to a fatty acid, releasing three water molecules. Straight saturated tails pack into solid fats; kinked unsaturated tails stay liquid as oils.",
        alt: "Triglyceride formation from glycerol and three fatty acids with ester bonds and saturated versus unsaturated tails",
        keyword: "ester",
      },
      {
        Component: NucleotideDnaHelix,
        caption:
          "Nucleic acids in three zoom levels: one nucleotide (phosphate + sugar + base), the phosphodiester-linked backbone of a chain, and the double helix held together by A=T and G≡C complementary pairing.",
        alt: "Nucleotide anatomy, polynucleotide chain and DNA double helix with complementary base pairing",
        keyword: "nucleotide",
      },
    ],
  },
  "cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells": {
    title: "Cell introduction: prokaryotic and eukaryotic",
    figures: [
      {
        Component: CellTheoryTimeline,
        caption:
          "Cell theory assembled over 190 years: Hooke names 'cells' in cork, Leeuwenhoek sees living microbes, Schleiden and Schwann claim all life is cellular, Virchow adds that cells come only from cells.",
        alt: "Timeline of cell theory from Hooke 1665 to Virchow 1855 with the three tenets",
        keyword: "cell theory",
      },
      {
        Component: ProkaryoteVsEukaryote,
        caption:
          "Side-by-side: the prokaryote keeps its DNA naked in a nucleoid with 70S ribosomes and no internal compartments; the eukaryote wraps its DNA in a nuclear envelope and partitions work into membrane-bound organelles.",
        alt: "Prokaryotic and eukaryotic cells side by side showing nucleoid versus true nucleus and organelles",
        keyword: "prokaryotic",
      },
      {
        Component: CellSizeScale,
        caption:
          "A logarithmic size ladder from virus (nm) through mycoplasma, bacterium and red blood cell (µm) to the egg (mm) — and why diffusion forces cells to stay small: surface area grows as r² but volume as r³.",
        alt: "Logarithmic scale comparing virus, mycoplasma, bacterium, red blood cell, plant cell and egg sizes",
        keyword: "unicellular",
      },
      {
        Component: UnicellularToMulticellular,
        caption:
          "Levels of organisation: a unicellular Amoeba does every job alone, a Volvox colony shares the work, and multicellular life specialises cells into tissues, organs and organ systems — division of labour at every step.",
        alt: "Organisation ladder from unicellular cell through colony, tissue and organ to complete organism",
        keyword: "unicellular",
      },
      {
        Component: MicroscopeComparison,
        caption:
          "How we see cells: the light microscope resolves about 0.2 µm and can watch living cells; the electron microscope resolves about 0.2 nm — revealing ribosomes, membranes and viruses — but only on dead, prepared specimens.",
        alt: "Light microscope versus electron microscope with resolution limits and what each reveals",
        keyword: "microscope",
      },
    ],
  },
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r": {
    title: "Eukaryotic cell structure",
    figures: [
      {
        Component: EukaryoticCell,
        caption:
          "Animal cell (left) and plant cell (right). Shared organelles — nucleus, mitochondria, ER, Golgi, ribosomes — plus the plant-only set: cell wall, chloroplasts and the large central vacuole.",
        alt: "Labelled animal and plant cell diagrams showing nucleus, mitochondria, ER, Golgi, ribosomes, lysosome, chloroplast, vacuole and cell wall",
        keyword: "mitochondria",
      },
      {
        Component: PlasmaMembraneFluidMosaic,
        caption:
          "Zooming into the plasma membrane: a fluid mosaic of phospholipids — hydrophilic heads out, hydrophobic tails in — studded with integral and peripheral proteins, channel proteins, glycoproteins and cholesterol that tune fluidity.",
        alt: "Fluid mosaic model of the plasma membrane with phospholipid bilayer, proteins, glycoprotein chains and cholesterol",
        keyword: "plasma membrane",
      },
      {
        Component: NucleusStructure,
        caption:
          "Zooming into the nucleus: a double envelope (continuous with rough ER) pierced by pores that export mRNA and import enzymes, the dense nucleolus making rRNA, and chromatin — DNA wound on histones — suspended in nucleoplasm.",
        alt: "Nucleus with double nuclear envelope, pores, nucleolus, chromatin threads and nucleoplasm",
        keyword: "nucleus",
      },
      {
        Component: MitochondrionCutaway,
        caption:
          "Zooming into a mitochondrion: the inner membrane folds into cristae carrying the electron-transport chain, while the matrix holds Krebs-cycle enzymes, its own circular DNA and 70S ribosomes — a semi-autonomous endosymbiont.",
        alt: "Mitochondrion cutaway with outer membrane, cristae, matrix, circular DNA and ribosomes",
        keyword: "mitochondria",
      },
      {
        Component: ChloroplastCutaway,
        caption:
          "Zooming into a chloroplast: grana stacks of thylakoid membranes run the light reaction (chlorophyll), while the surrounding stroma fixes CO₂ into sugar in the Calvin cycle — also with its own DNA and ribosomes.",
        alt: "Chloroplast cutaway with double membrane, grana stacks, stroma lamellae, circular DNA and ribosomes",
        keyword: "chloroplast",
      },
      {
        Component: GolgiSecretoryPathway,
        caption:
          "Zooming into the endomembrane assembly line: rough ER synthesises proteins, transport vesicles carry them to the Golgi (cis → trans) for modification and addressing, then secretory vesicles ship them out or lysosomes digest with them.",
        alt: "Secretory pathway from rough ER through transport vesicles and Golgi cisternae to secretory vesicles and lysosome",
        keyword: "Golgi",
      },
    ],
  },
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign": {
    title: "Stages of mitosis",
    figures: [
      {
        Component: MitosisStages,
        caption:
          "Mitosis in six stages: interphase replicates the DNA, prophase condenses it, metaphase lines it on the equator, anaphase splits the chromatids, telophase rebuilds nuclei, and cytokinesis separates two identical daughter cells.",
        alt: "Six-cell sequence showing interphase, prophase, metaphase, anaphase, telophase and cytokinesis with chromosome behaviour",
        keyword: "prophase",
      },
      {
        Component: CellCyclePhases,
        caption:
          "The cell cycle as a ring: G₁ growth, S DNA synthesis, G₂ preparation make up interphase (~90% of the cycle); the M phase then divides. Checkpoints between phases stop damaged cells from dividing.",
        alt: "Cell cycle ring with G1, S, G2 interphase and M phase annotated",
        keyword: "cell cycle",
      },
      {
        Component: MeiosisIStages,
        caption:
          "Meiosis I, the reduction division: homologous chromosomes pair and cross over in prophase I, line up as pairs in metaphase I, and separate whole chromosomes in anaphase I — halving 2n to n without splitting centromeres.",
        alt: "Meiosis I stages showing synapsis, crossing over, paired metaphase alignment and homolog separation",
        keyword: "meiosis",
      },
      {
        Component: CrossingOver,
        caption:
          "Crossing over close-up: paired maternal and paternal chromosomes break and rejoin at a chiasma, so two chromatids leave with swapped segments — new gene combinations that make every gamete unique.",
        alt: "Crossing over between homologous chromosomes at a chiasma producing recombinant chromatids",
        keyword: "crossing over",
      },
      {
        Component: MitosisVsMeiosisOutcome,
        caption:
          "The decisive contrast: mitosis yields two identical diploid daughters for growth and repair; meiosis yields four different haploid gametes — the raw variation on which evolution acts.",
        alt: "Mitosis producing two identical diploid cells versus meiosis producing four different haploid gametes",
        keyword: "haploid",
      },
    ],
  },
  "monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano": {
    title: "Bacterial cell structure",
    figures: [
      {
        Component: BacterialCell,
        caption:
          "A prokaryotic cell: genetic material free in the nucleoid (no nuclear membrane), 70S ribosomes, mesosome for respiration, and the capsule–wall–membrane armour with flagellum and pili outside.",
        alt: "Labelled rod-shaped bacterial cell showing capsule, peptidoglycan wall, plasma membrane, nucleoid DNA, ribosomes, mesosome, pili and flagellum",
        keyword: "nucleoid",
      },
      {
        Component: BacterialShapes,
        caption:
          "Shape is the first ID step: cocci named by arrangement (single, diplo-, strepto-, staphylo-), rods (bacilli), commas (vibrio) and spirals (spirillum) — combined with the Gram reaction for lab identification.",
        alt: "Bacterial shapes and arrangements: cocci in singles pairs chains and clusters, bacilli, vibrio and spirillum",
        keyword: "cocci",
      },
      {
        Component: BacterialNutritionModes,
        caption:
          "The nutrition map: autotrophs make their own food — photoautotrophs from light (cyanobacteria) or chemoautotrophs from inorganic chemistry — while heterotrophs feed as saprophytes, parasites or symbionts.",
        alt: "Classification tree of bacterial nutrition with photoautotroph chemoautotroph saprophytic parasitic and symbiotic examples",
        keyword: "cyanobacteria",
      },
      {
        Component: BacterialGrowthCurve,
        caption:
          "The growth curve in a closed batch: lag (adapting), log (exponential doubling — most antibiotic-sensitive), stationary (nutrients run out) and decline (waste wins). Label it — a standard NEB diagram question.",
        alt: "Bacterial growth curve with lag log stationary and decline phases annotated",
        keyword: "growth curve",
      },
      {
        Component: BinaryFissionRecombination,
        caption:
          "Reproduction two ways: binary fission copies one cell into two identical ones in ~20 minutes, while conjugation, transformation and transduction swap genes without making new cells.",
        alt: "Binary fission sequence plus conjugation transformation and transduction recombination routes",
        keyword: "binary fission",
      },
    ],
  },
  "virus-general-introduction-structure-and-importance-of-virus-bacteriophage": {
    title: "Bacteriophage structure",
    figures: [
      {
        Component: BacteriophageStructure,
        caption:
          "A T4-type bacteriophage: the polyhedral head stores dsDNA, the contractile sheath injects it, and the tail fibres anchor to the host's wall — a complete parasite with no metabolism of its own.",
        alt: "T4 bacteriophage with labelled head, DNA, collar, sheath, base plate and tail fibres on a bacterial surface",
        keyword: "capsid",
      },
      {
        Component: VirusShapeTypes,
        caption:
          "Four ways to pack a genome: helical rods (TMV), icosahedral shells (adenovirus), membrane-enveloped spheres with spikes (influenza, HIV) and the complex head-plus-tail syringe of T4.",
        alt: "Helical icosahedral enveloped and complex virus architectures compared",
        keyword: "TMV",
      },
      {
        Component: LyticLysogenicCycle,
        caption:
          "Two phage strategies: the lytic cycle hijacks and bursts the host in ~25 minutes; the lysogenic cycle hides as a prophage in the host chromosome, replicating silently until stress switches it to lytic.",
        alt: "Lytic versus lysogenic bacteriophage cycles side by side with induction pathway",
        keyword: "lytic",
      },
      {
        Component: VirusVsBacteria,
        caption:
          "Why antibiotics fail against flu: viruses are non-cellular, non-metabolic and untouched by antibiotics, while bacteria are living cells with walls and ribosomes to attack — the clinical consequence of the comparison.",
        alt: "Comparison table of virus versus bacteria across size structure genome metabolism reproduction and antibiotic response",
        keyword: "lytic",
      },
      {
        Component: HivRetrovirus,
        caption:
          "HIV, the retrovirus: gp120 spikes dock on helper-T CD4 receptors, reverse transcriptase writes RNA backwards into DNA, the provirus hides in the genome, and dying T cells collapse immunity into AIDS.",
        alt: "HIV structure with envelope spikes capsid RNA and reverse transcriptase plus replication steps",
        keyword: "HIV",
      },
    ],
  },
  "impacts-of-biotechnology-in-the-field-of-microbiology": {
    title: "Impacts of biotechnology in microbiology",
    figures: [
      {
        Component: RecombinantDnaSteps,
        caption:
          "Recombinant DNA in five steps: restriction enzymes cut donor gene and plasmid into matching sticky ends, ligase seals them, bacteria take up the chimera, and selected clones churn out the protein.",
        alt: "Recombinant DNA technology steps from donor DNA and plasmid through ligation to transformed bacterial clones",
        keyword: "recombinant",
      },
      {
        Component: PcrSteps,
        caption:
          "PCR's three-temperature cycle — denature at 94 °C, anneal primers at 55 °C, extend with heat-stable Taq at 72 °C — doubles the target DNA every cycle, reaching a billion copies in thirty.",
        alt: "PCR cycle diagram with denaturation annealing and extension steps and exponential amplification",
        keyword: "PCR",
      },
      {
        Component: CloningVectorPlasmid,
        caption:
          "Anatomy of a cloning vector: an origin of replication so it copies itself, an antibiotic-resistance marker to select transformants, and a multiple cloning site where the foreign gene is spliced in.",
        alt: "Plasmid cloning vector with ori antibiotic marker multiple cloning site and inserted gene in a bacterium",
        keyword: "plasmid",
      },
      {
        Component: IndustrialMicrobiology,
        caption:
          "Microbes as factories: a stirred, aseptic fermenter holds pH, temperature and oxygen steady while the culture converts sugar medium into antibiotics, enzymes, vitamins, single-cell protein and biofuels.",
        alt: "Industrial fermenter with stirrer pH temperature and aeration controls and product list",
        keyword: "industry",
      },
      {
        Component: BiotechApplicationsMap,
        caption:
          "One toolkit, four arenas: insulin and vaccines in medicine, Bt cotton and golden rice in agriculture, oil-eating bacteria in the environment, and DNA fingerprinting in forensics.",
        alt: "Four panels mapping biotechnology applications in medicine agriculture environment and forensics",
        keyword: "vaccine",
      },
    ],
  },
  "biogeochemical-cycles-carbon-and-nitrogen-cycles-concept-of-succession": {
    title: "The nitrogen cycle",
    figures: [
      {
        Component: NitrogenCycle,
        caption:
          "N₂ from the air is fixed by lightning, Rhizobium and industry into ammonia, oxidised by Nitrosomonas and Nitrobacter to nitrate, assimilated by plants, eaten by animals, and returned by ammonification and denitrification.",
        alt: "Nitrogen cycle flow diagram with fixation, nitrification, assimilation, ammonification and denitrification pathways",
        keyword: "nitrification",
      },
    ],
  },
  "earthworm-pheretima-posthuma-habit-and-habitat-external-features-digestive-system-alimentary-can": {
    title: "Earthworm alimentary canal",
    figures: [
      {
        Component: EarthwormDigestive,
        caption:
          "The earthworm's straight alimentary canal: pharynx sucks, the gizzard grinds, calciferous glands neutralise humic acid, and the typhlosole-folded intestine is the main absorption zone.",
        alt: "Horizontal alimentary canal of earthworm from mouth through pharynx, gizzard, stomach, intestine with typhlosole to anus",
        keyword: "gizzard",
      },
    ],
  },
  "frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respirato": {
    title: "Frog heart and circulation",
    figures: [
      {
        Component: FrogHeartCirculation,
        caption:
          "The frog's three-chambered heart: two atria receive oxygenated and deoxygenated blood separately, but the single ventricle mixes them — an incomplete double circulation carried by carotid, systemic and pulmocutaneous arches.",
        alt: "Frog heart with sinus venosus, two atria, single ventricle, truncus arteriosus and three pairs of arches",
        keyword: "ventricle",
      },
    ],
  },
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
