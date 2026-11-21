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
import { EcologyOrganisationLevels } from "./ecology-organisation-levels";
import { AbioticFactors } from "./abiotic-factors";
import { SpeciesInteractionsMatrix } from "./species-interactions-matrix";
import { PopulationGrowthCurves } from "./population-growth-curves";
import { EcosystemComponents } from "./ecosystem-components";
import { PondEcosystemZonation } from "./pond-ecosystem-zonation";
import { ForestStratification } from "./forest-stratification";
import { PondVsForestEcosystem } from "./pond-vs-forest-ecosystem";
import { GrazingVsDetritusChain } from "./grazing-vs-detritus-chain";
import { FoodWeb } from "./food-web";
import { EcologicalPyramids } from "./ecological-pyramids";
import { CarbonCycle } from "./carbon-cycle";
import { WaterCycle } from "./water-cycle";
import { SuccessionStages } from "./succession-stages";
import { PhosphorusSulphurCycles } from "./phosphorus-sulphur-cycles";
import { AdaptationTypes } from "./adaptation-types";
import { HydrophyteAdaptations } from "./hydrophyte-adaptations";
import { XerophyteAdaptations } from "./xerophyte-adaptations";
import { HydrophyteVsXerophyte } from "./hydrophyte-vs-xerophyte";
import { PlantHabitatSpectrum } from "./plant-habitat-spectrum";
import { AnimalAdaptationModes } from "./animal-adaptation-modes";
import { GreenhouseEffect } from "./greenhouse-effect";
import { OzoneDepletion } from "./ozone-depletion";
import { AcidRainFormation } from "./acid-rain-formation";
import { EutrophicationSequence } from "./eutrophication-sequence";
import { ClimateChangeImpacts } from "./climate-change-impacts";
import { HabitatVsNiche } from "./habitat-vs-niche";
import { ForestNutrientCycle } from "./forest-nutrient-cycle";
import { EnergyFlowTenPercent } from "./energy-flow-ten-percent";
import { ProductivityGppNpp } from "./productivity-gpp-npp";
import { ProtozoaLocomotion } from "./protozoa-locomotion";
import { ProtozoaClassification } from "./protozoa-classification";
import { AmoebaStructure } from "./amoeba-structure";
import { ProtozoaNutritionModes } from "./protozoa-nutrition-modes";
import { ProtozoaReproduction } from "./protozoa-reproduction";
import { ParameciumStructure } from "./paramecium-structure";
import { PlasmodiumLifeCycle } from "./plasmodium-life-cycle";
import { MalarialFeverTimeline } from "./malarial-fever-timeline";
import { PlasmodiumRbcStages } from "./plasmodium-rbc-stages";
import { MalariaControlTriangle } from "./malaria-control-triangle";
import { PlasmodiumSpeciesComparison } from "./plasmodium-species-comparison";
import { MalariaDiseaseBurden } from "./malaria-disease-burden";
import { MalariaFeverPatterns } from "./malaria-fever-patterns";
import { MalariaControlMeasures } from "./malaria-control-measures";
import { MalariaDiagnosisTreatment } from "./malaria-diagnosis-treatment";
import { MalariaComplications } from "./malaria-complications";
import { BodySymmetryTypes } from "./body-symmetry-types";
import { GermLayers } from "./germ-layers";
import { BodyCavityTypes } from "./body-cavity-types";
import { PhylaOverviewTree } from "./phyla-overview-tree";
import { SegmentationBodyPlans } from "./segmentation-body-plans";
import { PoriferaCanalSystem } from "./porifera-canal-system";
import { CnidariaPolypMedusa } from "./cnidaria-polyp-medusa";
import { WormPhylaComparison } from "./worm-phyla-comparison";
import { ArthropodaBodyPlan } from "./arthropoda-body-plan";
import { MolluscaEchinodermata } from "./mollusca-echinodermata";
import { EarthwormExternalFeatures } from "./earthworm-external-features";
import { EarthwormAlimentaryCanal } from "./earthworm-alimentary-canal";
import { EarthwormSetaeLocomotion } from "./earthworm-setae-locomotion";
import { EarthwormCirculationRespiration } from "./earthworm-circulation-respiration";
import { EarthwormDigestiveGlands } from "./earthworm-digestive-glands";
import { EarthwormEconomicImportance } from "./earthworm-economic-importance";
import { SeptalNephridiaStructure } from "./septal-nephridia-structure";
import { NephridiaTypesComparison } from "./nephridia-types-comparison";
import { EarthwormExcretoryProducts } from "./earthworm-excretory-products";
import { EarthwormNervousSystem } from "./earthworm-nervous-system";
import { EarthwormReflexArc } from "./earthworm-reflex-arc";
import { EarthwormReproductiveSystem } from "./earthworm-reproductive-system";
import { EarthwormCopulationCocoon } from "./earthworm-copulation-cocoon";
import { EarthwormMaleFemaleOrgans } from "./earthworm-male-female-organs";
import { EarthwormSpermPathway } from "./earthworm-sperm-pathway";
import { EarthwormLifeCycle } from "./earthworm-life-cycle";
import { FrogHabitHabitat } from "./frog-habit-habitat";
import { FrogExternalFeatures } from "./frog-external-features";
import { FrogAlimentaryCanal } from "./frog-alimentary-canal";
import { FrogFeedingMechanics } from "./frog-feeding-mechanics";
import { FrogDigestionChemistry } from "./frog-digestion-chemistry";
import { FrogHeartInternal } from "./frog-heart-internal";
import { FrogBloodComposition } from "./frog-blood-composition";
import { FrogCirculationPath } from "./frog-circulation-path";
import { FrogRespirationModes } from "./frog-respiration-modes";
import { FrogMaleReproductiveSystem } from "./frog-male-reproductive-system";
import { FrogFemaleReproductiveSystem } from "./frog-female-reproductive-system";
import { FrogAmplexusFertilisation } from "./frog-amplexus-fertilisation";
import { FrogGametogenesis } from "./frog-gametogenesis";
import { FrogDevelopmentStages } from "./frog-development-stages";
import { FrogMetamorphosis } from "./frog-metamorphosis";
import { ThreeDomainsTree } from "./three-domains-tree";
import { FiveKingdomsChart } from "./five-kingdoms-chart";
import { BinomialNomenclatureRules } from "./binomial-nomenclature-rules";
import { TaxonomicHierarchyLadder } from "./taxonomic-hierarchy-ladder";
import { KingdomsComparisonTable } from "./kingdoms-comparison-table";
import { NepalFloraStats } from "./nepal-flora-stats";
import { NepalVegetationZones } from "./nepal-vegetation-zones";
import { FloraHotspotMap } from "./flora-hotspot-map";
import { FloraSpeciesStatus } from "./flora-species-status";
import { FloraConservationStrategies } from "./flora-conservation-strategies";
import { FungalHyphaeTypes } from "./fungal-hyphae-types";
import { FungalCellStructure } from "./fungal-cell-structure";
import { FungalClassesChart } from "./fungal-classes-chart";
import { FungalNutritionModes } from "./fungal-nutrition-modes";
import { FungalSporeCases } from "./fungal-spore-cases";
import { MucorStructure } from "./mucor-structure";
import { MucorReproduction } from "./mucor-reproduction";
import { YeastCellStructure } from "./yeast-cell-structure";
import { YeastReproduction } from "./yeast-reproduction";
import { MucorVsYeast } from "./mucor-vs-yeast";
import { YeastFermentation } from "./yeast-fermentation";
import { MushroomStructure } from "./mushroom-structure";
import { MushroomLifeCycle } from "./mushroom-life-cycle";
import { PoisonousVsEdibleMushrooms } from "./poisonous-vs-edible-mushrooms";
import { MushroomCultivationSteps } from "./mushroom-cultivation-steps";
import { FungiEconomicImportance } from "./fungi-economic-importance";
import { LichenSymbiosis } from "./lichen-symbiosis";
import { LichenGrowthForms } from "./lichen-growth-forms";
import { LichenReproduction } from "./lichen-reproduction";
import { LichenImportance } from "./lichen-importance";
import { LichenPioneerSuccession } from "./lichen-pioneer-succession";
import { AlgaeThreeClasses } from "./algae-three-classes";
import { AlgalThallusTypes } from "./algal-thallus-types";
import { SpirogyraStructure } from "./spirogyra-structure";
import { SpirogyraConjugation } from "./spirogyra-conjugation";
import { AlgaeEconomicUses } from "./algae-economic-uses";
import { AlgaeVsLandPlants } from "./algae-vs-land-plants";
import { BryophyteGroups } from "./bryophyte-groups";
import { MossLifeCycle } from "./moss-life-cycle";
import { MarchantiaStructure } from "./marchantia-structure";
import { ArchegoniumAntheridium } from "./archegonium-antheridium";
import { BryophyteImportance } from "./bryophyte-importance";
import { BryophyteVsFernDominance } from "./bryophyte-vs-fern-dominance";
import { FernStructure } from "./fern-structure";
import { FernLifeCycle } from "./fern-life-cycle";
import { FernProthallus } from "./fern-prothallus";
import { PteridophyteDiversity } from "./pteridophyte-diversity";
import { VascularTissueBundle } from "./vascular-tissue-bundle";
import { GymnospermVsAngiosperm } from "./gymnosperm-vs-angiosperm";
import { PinusMorphology } from "./pinus-morphology";
import { PineConesMaleFemale } from "./pine-cones-male-female";
import { PinePollinationSeed } from "./pine-pollination-seed";
import { GymnospermDiversityUses } from "./gymnosperm-diversity-uses";
import { RootTypes } from "./root-types";
import { StemMorphology } from "./stem-morphology";
import { LeafVenationPhyllotaxy } from "./leaf-venation-phyllotaxy";
import { InflorescenceTypes } from "./inflorescence-types";
import { FlowerStructure } from "./flower-structure";
import { FruitTypes } from "./fruit-types";
import { TaxonRanksLadder } from "./taxon-ranks-ladder";
import { TaxonomicAids } from "./taxonomic-aids";
import { ClassificationSystemsTimeline } from "./classification-systems-timeline";
import { DichotomousKeyExample } from "./dichotomous-key-example";
import { SpeciesConcept } from "./species-concept";
import { FloralFormulaAnatomy } from "./floral-formula-anatomy";
import { BrassicaceaeFeatures } from "./brassicaceae-features";
import { FabaceaeFeatures } from "./fabaceae-features";
import { SolanaceaeFeatures } from "./solanaceae-features";
import { LiliaceaeFeatures } from "./liliaceae-features";
import { FamiliesComparisonTable } from "./families-comparison-table";
import { FamiliesEconomicImportance } from "./families-economic-importance";

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
      {
        Component: CarbonCycle,
        caption:
          "The carbon cycle: photosynthesis pulls CO₂ in, respiration and combustion push it out, oceans dissolve the buffer, and fossil fuels inject ancient carbon faster than plants can fix it.",
        alt: "Carbon cycle with atmosphere producers consumers dead matter fossil fuels and ocean pool",
        keyword: "carbon",
      },
      {
        Component: WaterCycle,
        caption:
          "The water cycle: the sun pumps evaporation and transpiration up, condensation builds clouds, precipitation returns it, and runoff plus infiltration route it back to sea and groundwater.",
        alt: "Water cycle with evaporation transpiration condensation precipitation runoff and groundwater",
        keyword: "runoff",
      },
      {
        Component: PhosphorusSulphurCycles,
        caption:
          "Sedimentary cycles without an atmospheric pool: phosphorus and sulphur move rock → soil → organisms → decomposers — slower and more local than the gaseous carbon and nitrogen cycles.",
        alt: "Phosphorus and sulphur sedimentary cycles between rock soil organisms and decomposers",
        keyword: "atmosphere",
      },
      {
        Component: SuccessionStages,
        caption:
          "Succession as a relay: lichens build the first soil on bare rock, mosses, grasses and shrubs take over in turn, until the stable climax forest — diversity and biomass rising at every stage.",
        alt: "Succession sere from bare rock through lichen moss grass shrub to climax forest",
        keyword: "pioneer",
      },
    ],
  },
  "ecological-adaptation-concept-of-adaptation-hydrophytes-and-xerophytes": {
    title: "Ecological adaptation: hydrophytes and xerophytes",
    figures: [
      {
        Component: AdaptationTypes,
        caption:
          "Three kinds of answer to the environment: morphological (shape — spines, webbed feet), physiological (chemistry — camel tolerance, salt excretion) and behavioural (habits — nocturnality, hibernation).",
        alt: "Morphological physiological and behavioural adaptation panels with examples",
        keyword: "mesophyte",
      },
      {
        Component: HydrophyteAdaptations,
        caption:
          "Hydrophytes in three forms: free-floating (swollen, air-filled petioles), submerged (thin ribbon leaves, no cuticle) and emergent (stomata on top, air channels to the roots).",
        alt: "Hydrophyte adaptations for free floating submerged and emergent plants",
        keyword: "hydrophyte",
      },
      {
        Component: XerophyteAdaptations,
        caption:
          "The cactus manual: leaves become spines, cuticle thickens, the succulent stem stores water, CAM opens stomata only at night, and roots spread wide and deep for rare rain.",
        alt: "Xerophyte cactus adaptations with spines cuticle succulent stem CAM and roots",
        keyword: "xerophyte",
      },
      {
        Component: HydrophyteVsXerophyte,
        caption:
          "Mirror-image strategies for water balance: every character flips between the water-loving hydrophyte and the drought-proofed xerophyte.",
        alt: "Hydrophyte versus xerophyte adaptation comparison table",
        keyword: "hydrophyte",
      },
      {
        Component: PlantHabitatSpectrum,
        caption:
          "The full habitat spectrum: hydrophyte, mesophyte, xerophyte, plus the salty halophyte (mangroves with salt glands and breathing roots) and the perching epiphyte.",
        alt: "Plant life forms across habitats with key adaptations",
        keyword: "mesophyte",
      },
      {
        Component: AnimalAdaptationModes,
        caption:
          "Animals adapt by lifestyle: streamlined swimmers, long-limbed cursors, blind burrowers, grasping climbers and the desert specialist's water-saving kit.",
        alt: "Animal adaptation modes aquatic cursorial fossorial arboreal and desert",
        keyword: "mesophyte",
      },
    ],
  },
  "ecological-imbalances-greenhouse-effects-and-climate-change-depletion-of-ozone-layer-acid-rain-a": {
    title: "Ecological imbalances",
    figures: [
      {
        Component: GreenhouseEffect,
        caption:
          "The greenhouse mechanism: sunlight passes in, Earth re-radiates infrared, greenhouse gases absorb and re-emit it back — a natural blanket we are thickening with fossil CO₂.",
        alt: "Greenhouse effect with solar input infrared trapping and enhanced effect",
        keyword: "greenhouse",
      },
      {
        Component: OzoneDepletion,
        caption:
          "Ozone depletion chemistry: UV cracks CFCs into chlorine radicals, and one Cl• catalytically destroys about 100,000 O₃ molecules — the Montreal Protocol is healing the layer.",
        alt: "Ozone depletion by CFC chlorine radicals and UV consequences",
        keyword: "CFC",
      },
      {
        Component: AcidRainFormation,
        caption:
          "Acid rain's supply chain: SO₂ from coal and NOx from vehicles dissolve in cloud droplets to sulphuric and nitric acid, falling at pH 4–5 on lakes, soils, forests and marble.",
        alt: "Acid rain formation from SO2 and NOx and its effects",
        keyword: "acid rain",
      },
      {
        Component: EutrophicationSequence,
        caption:
          "Eutrophication in seven steps: fertiliser runoff feeds an algal bloom, the bloom shades out plants, decomposition crashes the oxygen, fish die — and released nutrients restart the loop.",
        alt: "Eutrophication sequence from runoff to algal bloom oxygen crash and fish kill",
        keyword: "eutrophication",
      },
      {
        Component: ClimateChangeImpacts,
        caption:
          "Impacts and answers: melting Himalayan glaciers and rising seas, shifting species and failing monsoons — answered by mitigation (cut emissions) and adaptation (defend and adjust).",
        alt: "Climate change impacts on ice ecosystems agriculture and responses",
        keyword: "mitigation",
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
  // ── Biology Unit 4 — Faunal diversity ──────────────────────────────────
  "protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with": {
    title: "Protista & Protozoa",
    figures: [
      {
        Component: ProtozoaClassification,
        caption:
          "The four protozoan locomotion groups: amoeboid pseudopodia (Sarcodina), flagella (Mastigophora), cilia (Ciliophora) and the non-motile sporozoans (Sporozoa) — the whole classification in one look.",
        alt: "Protozoa classification tree with sarcodina mastigophora ciliophora and sporozoa and their locomotor organelles",
        keyword: "pseudopodia",
      },
      {
        Component: ProtozoaLocomotion,
        caption:
          "Pseudopodial locomotion: the ectoplasm streams forward into a hyaline cap, endoplasm follows, and the amoeba advances — sol-to-gel reversal in motion.",
        alt: "Amoeboid movement diagram with ectoplasm endoplasm and advancing pseudopodium",
        keyword: "locomotion",
      },
      {
        Component: AmoebaStructure,
        caption:
          "Amoeba's organelle kit: nucleus, contractile vacuole for osmoregulation, food vacuoles for digestion — a single cell doing every job of a body.",
        alt: "Amoeba structure with nucleus contractile vacuole food vacuole and pseudopodia",
        keyword: "contractile vacuole",
      },
      {
        Component: ProtozoaNutritionModes,
        caption:
          "Feeding across Protozoa: holozoic engulfment in Amoeba, pinocytosis, saprozoic absorption, and the parasitic absorption of Sporozoa — one phylum, four strategies.",
        alt: "Protozoa nutrition modes holozoic saprozoic and parasitic compared",
        keyword: "nutrition",
      },
      {
        Component: ProtozoaReproduction,
        caption:
          "Reproduction routes: binary fission doubles a population, multiple fission (schizogony) explodes it, and conjugation reshuffles genes in ciliates.",
        alt: "Protozoa reproduction binary fission multiple fission and conjugation",
        keyword: "binary fission",
      },
    ],
  },
  "paramecium-caudatum-plasmodium-vivax-habits-and-habitat-structure-reproduction-life-cycle": {
    title: "Paramecium & Plasmodium",
    figures: [
      {
        Component: ParameciumStructure,
        caption:
          "Paramecium caudatum, the slipper animalcule: pellicle with cilia rows, oral groove leading to the gullet, two nuclei, trichocysts and contractile vacuoles with radiating canals.",
        alt: "Paramecium structure with oral groove cilia trichocyst nuclei and contractile vacuole",
        keyword: "oral groove",
      },
      {
        Component: PlasmodiumLifeCycle,
        caption:
          "Plasmodium's double life: sporozoites enter with an Anopheles bite, multiply in liver then RBCs, gametocytes leave, and fertilisation completes in the mosquito gut — two hosts, two phases.",
        alt: "Plasmodium life cycle between human and female Anopheles mosquito with liver and RBC phases",
        keyword: "sporozoite",
      },
      {
        Component: PlasmodiumRbcStages,
        caption:
          "Inside the red cell: ring form (signet ring) → trophozoite → schizont bursting into merozoites, each invading a fresh RBC — the 48-hour clock behind the fever.",
        alt: "Plasmodium stages inside red blood cell ring trophozoite schizont and merozoite release",
        keyword: "schizogony",
      },
      {
        Component: MalarialFeverTimeline,
        caption:
          "The paroxysm in three acts: shaking cold stage, burning hot stage, then drenching sweat — timed to the synchronised release of merozoites and toxins from RBCs.",
        alt: "Malarial fever paroxysm timeline with cold hot and sweating stages",
        keyword: "fever",
      },
      {
        Component: MalariaControlTriangle,
        caption:
          "Malaria control is a triangle: treat the patient, break the mosquito vector, remove the breeding water — weakening any side collapses transmission.",
        alt: "Malaria control triangle linking patient treatment vector control and environmental measures",
        keyword: "mosquito",
      },
      {
        Component: PlasmodiumSpeciesComparison,
        caption:
          "P. vivax vs P. falciparum: benign tertian 48-hour fever vs malignant irregular fever, RBC selectivity, relapse from dormant liver forms, and why falciparum kills.",
        alt: "Comparison of Plasmodium vivax and falciparum fever cycles RBC preference and relapse",
        keyword: "gametocyte",
      },
    ],
  },
  "economic-importance-of-p-falciparum": {
    title: "Economic importance of P. falciparum",
    figures: [
      {
        Component: MalariaDiseaseBurden,
        caption:
          "The economic weight of falciparum: hundreds of millions of cases, hundreds of thousands of deaths, children under five hit hardest — plus lost workdays that keep endemic regions poor.",
        alt: "Malaria disease burden stat cards with annual cases deaths and child mortality",
        keyword: "mortality",
      },
      {
        Component: MalariaFeverPatterns,
        caption:
          "Reading the chart: P. vivax spikes cleanly every third day (benign tertian) while P. falciparum burns continuously and irregularly — the fever curve is a diagnostic clue.",
        alt: "Fever chart comparing tertian periodic spikes with continuous malignant fever",
        keyword: "tertian",
      },
      {
        Component: MalariaControlMeasures,
        caption:
          "Control on three fronts: chemotherapy (quinine → chloroquine → artemisinin), vector attack (sprays, nets, larvivorous fish), and environmental drainage of breeding sites.",
        alt: "Three columns of malaria control chemotherapy vector control and environmental measures",
        keyword: "quinine",
      },
      {
        Component: MalariaDiagnosisTreatment,
        caption:
          "The clinical pipeline: suspect fever → confirm with blood smear or rapid test → treat with antimalarials → follow up, because vivax hides in the liver and relapses.",
        alt: "Malaria diagnosis and treatment pathway from suspicion to confirmation to drugs and follow up",
        keyword: "diagnosis",
      },
      {
        Component: MalariaComplications,
        caption:
          "Why falciparum is an emergency: cerebral malaria clogs brain capillaries, anaemia follows mass RBC loss, and blackwater fever dumps haemoglobin into the urine.",
        alt: "Malaria complications cerebral malaria severe anaemia and blackwater fever",
        keyword: "blackwater",
      },
    ],
  },
  "animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals": {
    title: "Animalia — body plans",
    figures: [
      {
        Component: BodySymmetryTypes,
        caption:
          "Symmetry ladder: asymmetric (sponges), radial (cnidarians — any cut through the centre matches), bilateral (a single head-tail plane) — the first big branching in animal classification.",
        alt: "Body symmetry types asymmetric radial and bilateral with cut planes",
        keyword: "symmetry",
      },
      {
        Component: GermLayers,
        caption:
          "Diploblastic ectoderm+endoderm (cnidarians) vs triploblastic mesoderm-in-the-middle (flatworms onward) — every organ you own is labelled by its layer.",
        alt: "Germ layers diploblastic versus triploblastic embryonic layers",
        keyword: "diploblastic",
      },
      {
        Component: BodyCavityTypes,
        caption:
          "Coelom options: acoelomate (solid flatworm), pseudocoelomate (fluid-filled, unlined — roundworm), true coelomate (lined — annelids onward); the cavity frees organs to move and grow.",
        alt: "Body cavity types acoelomate pseudocoelomate and coelomate cross sections",
        keyword: "coelom",
      },
      {
        Component: PhylaOverviewTree,
        caption:
          "The animal tree at a glance: symmetry splits, coelom splits, and the nine major phyla hang from the branches — Porifera to Chordata.",
        alt: "Animal phylum overview tree from porifera to chordata",
        keyword: "phylum",
      },
      {
        Component: SegmentationBodyPlans,
        caption:
          "Metamerism: annelid segments repeat like train cars, arthropods tag them into head-thorax-abdomen, vertebrates chain vertebrae — segmentation enables specialisation.",
        alt: "Segmentation patterns in annelids arthropods and vertebrates",
        keyword: "metamerism",
      },
    ],
  },
  "diagnostic-features-and-classification-of-phyla-up-to-class-porifera-coelenterata-cnidaria-platy": {
    title: "Phyla up to class",
    figures: [
      {
        Component: PoriferaCanalSystem,
        caption:
          "The sponge's water highway: water enters through ostia, choanocytes with flagella trap food, and it exits via the osculum — filter-feeding with no mouth at all.",
        alt: "Porifera canal system with ostia choanocyte chamber and osculum water flow",
        keyword: "canal system",
      },
      {
        Component: CnidariaPolypMedusa,
        caption:
          "Two body plans, one phylum: sessile polyp (hydra) and floating medusa (jellyfish) — the same sack-in-a-sack turned upside down, both armed with cnidoblast stingers.",
        alt: "Cnidaria polyp and medusa forms with cnidoblast cells",
        keyword: "cnidoblast",
      },
      {
        Component: WormPhylaComparison,
        caption:
          "Three worm phyla in one table: flat unsegmented acoelomate Platyhelminthes, round pseudocoelomate Nematoda, and long true-coelom segmented Annelida.",
        alt: "Comparison of platyhelminthes nematoda and annelida body plans",
        keyword: "Platyhelminthes",
      },
      {
        Component: ArthropodaBodyPlan,
        caption:
          "Arthropod engineering: jointed appendages, chitinous exoskeleton moulted at each growth step, segmented body tagmatism and compound eyes — the phylum with the most species.",
        alt: "Arthropoda body plan with exoskeleton jointed legs and tagmata",
        keyword: "jointed appendages",
      },
      {
        Component: MolluscaEchinodermata,
        caption:
          "Soft body + shell (Mollusca: foot, mantle, visceral mass) versus spiny skin + water-vascular tube feet (Echinodermata) — two very different solutions to life on the sea floor.",
        alt: "Mollusca versus Echinodermata body plans with mantle foot and tube feet",
        keyword: "water vascular",
      },
    ],
  },
  "earthworm-pheretima-posthuma-habit-and-habitat-external-features-digestive-system-alimentary-can": {
    title: "Earthworm — external & digestive",
    figures: [
      {
        Component: EarthwormExternalFeatures,
        caption:
          "Reading Pheretima from outside: prostomium, peristomium, 100+ segments, the glandular clitellum at 14–16, genital papillae, and S-shaped setae on every segment but the first and last.",
        alt: "Earthworm external features with clitellum setae segments and body regions",
        keyword: "clitellum",
      },
      {
        Component: EarthwormAlimentaryCanal,
        caption:
          "The alimentary canal station by station: buccal cavity → muscular pharynx → oesophagus → grinding gizzard → calciferous stomach → typhlosole-boosted intestine → anus.",
        alt: "Earthworm alimentary canal from mouth to anus with gizzard and typhlosole",
        keyword: "typhlosole",
      },
      {
        Component: EarthwormSetaeLocomotion,
        caption:
          "Locomotion mechanics: setae anchor a segment, circular muscles stretch it forward, longitudinal muscles pull it up — peristalsis powered by a hydrostatic skeleton.",
        alt: "Earthworm S-shaped locomotion with setae anchoring and muscle alternation",
        keyword: "setae",
      },
      {
        Component: EarthwormCirculationRespiration,
        caption:
          "Closed circulation with dorsal and ventral vessels joined by lateral hearts, and respiration through the moist skin — no lungs, just a capillary net at the surface.",
        alt: "Earthworm closed circulatory system vessels and cutaneous respiration",
        keyword: "chloragogen",
      },
      {
        Component: EarthwormDigestiveGlands,
        caption:
          "The gland trio: pharyngeal glands start digestion, calciferous glands neutralise humic acid, and chloragogen cells around the gut act as the worm's liver.",
        alt: "Earthworm digestive glands pharyngeal calciferous and chloragogen functions",
        keyword: "calciferous",
      },
      {
        Component: EarthwormEconomicImportance,
        caption:
          "Farmers' friend ledger: vermicompost from castings, burrows that aerate and drain soil, Darwin's tonnage estimate — against a darker side as parasite host.",
        alt: "Earthworm economic importance vermicomposting cycle and soil benefits",
        keyword: "vermicompost",
      },
      {
        Component: EarthwormDigestive,
        caption:
          "The earthworm's straight alimentary canal in side view: pharynx sucks, the gizzard grinds, calciferous glands neutralise humic acid, and the typhlosole-folded intestine is the main absorption zone.",
        alt: "Horizontal alimentary canal of earthworm from mouth through pharynx, gizzard, stomach, intestine with typhlosole to anus",
        keyword: "gizzard",
      },
    ],
  },
  "earthworm-excretory-system-types-of-nephridia-structure-and-arrangement-of-septal-nephridia-nerv": {
    title: "Earthworm — excretory & nervous",
    figures: [
      {
        Component: SeptalNephridiaStructure,
        caption:
          "Septal nephridium anatomy: ciliated nephrostome funnel → neck through the septum → lipped body loop → terminal duct emptying into the intestine — the filtering unit in detail.",
        alt: "Septal nephridium structure with nephrostome neck body loop and terminal duct",
        keyword: "nephrostome",
      },
      {
        Component: NephridiaTypesComparison,
        caption:
          "Three nephridia, three addresses: septal (into intestine), integumentary (out through skin), pharyngeal (into pharynx) — same blueprint, different plumbing.",
        alt: "Septal integumentary and pharyngeal nephridia compared by position and opening",
        keyword: "integumentary",
      },
      {
        Component: EarthwormExcretoryProducts,
        caption:
          "What leaves, and through which door: urea and ammonia, discharged enteronephrically into the intestine (saving water) or exonephrically through skin pores.",
        alt: "Earthworm excretory products and enteronephric versus exonephric routes",
        keyword: "urea",
      },
      {
        Component: EarthwormNervousSystem,
        caption:
          "The ladder plan: bilobed brain on the roof, circumpharyngeal commissures around the pharynx, then a double ventral nerve cord with a ganglion and three nerve pairs per segment.",
        alt: "Earthworm nervous system with brain commissures ventral nerve cord and segmental ganglia",
        keyword: "nerve cord",
      },
      {
        Component: EarthwormReflexArc,
        caption:
          "One segment's fast lane: skin receptor → sensory fibre → ventral-cord ganglion → motor fibre → muscle — most reflexes never consult the brain.",
        alt: "Earthworm reflex arc from skin receptor to muscle response via ganglion",
        keyword: "reflex",
      },
    ],
  },
  "earthworm-reproductive-systems-male-and-female-reproductive-organs-copulation-cocoon-formation-a": {
    title: "Earthworm — reproduction",
    figures: [
      {
        Component: EarthwormReproductiveSystem,
        caption:
          "Hermaphrodite kit in one diagram: testes (10–11), seminal vesicles (11–12), spermathecae ×4 (6–9) on the male side; ovaries (13) and oviduct (14) on the female side — all crowded into the anterior third.",
        alt: "Earthworm reproductive system with testes seminal vesicles spermathecae ovaries and pores",
        keyword: "spermatheca",
      },
      {
        Component: EarthwormMaleFemaleOrgans,
        caption:
          "Male vs female kit side by side: two testes vs one ovary pair, prostates vs ovisac, male pore on segment 18 vs female pore on 14 — and the spacing that forbids self-fertilisation.",
        alt: "Earthworm male and female reproductive organs compared in a table",
        keyword: "prostate",
      },
      {
        Component: EarthwormSpermPathway,
        caption:
          "The sperm's journey: made in testes, matured in seminal vesicles, carried by vasa deferentia, activated by prostatic fluid, and exchanged into the partner's spermathecae during copulation.",
        alt: "Earthworm sperm pathway from testes to male pore via seminal vesicles",
        keyword: "seminal vesicle",
      },
      {
        Component: EarthwormCopulationCocoon,
        caption:
          "Copulation head-to-tail on a rainy night, then the clitellum spins a cocoon carrying eggs and stored sperm — a miniature worm hatches, no larva.",
        alt: "Earthworm copulation and cocoon formation leading to young worms",
        keyword: "copulation",
      },
      {
        Component: EarthwormLifeCycle,
        caption:
          "Direct development: cocoon → juvenile (no clitellum yet) → growing worm → adult — the hatchling is a small version of the parent, skipping any larval stage.",
        alt: "Earthworm life cycle from cocoon to juvenile to adult worm",
        keyword: "cocoon",
      },
    ],
  },
  "frog-rana-tigrina-habit-and-habitat-external-features-digestive-system-alimentary-canal-digestiv": {
    title: "Frog — habit, habitat & digestive",
    figures: [
      {
        Component: FrogHabitHabitat,
        caption:
          "A double life: webbed swimming and skin respiration in water, lung breathing on land — with hibernation in winter, aestivation in summer and monsoon breeding.",
        alt: "Frog amphibious habitat with hibernation aestivation and breeding seasons",
        keyword: "hibernation",
      },
      {
        Component: FrogExternalFeatures,
        caption:
          "Rana tigrina outside in: protruding eyes with nictitating membranes, tympanum for hearing, webbed hind limbs for swimming, four-fingered forelimbs for landing.",
        alt: "Frog external features with eyes tympanum webbed feet and body regions",
        keyword: "tympanum",
      },
      {
        Component: FrogFeedingMechanics,
        caption:
          "The feeding sequence: spot, flip the sticky forked tongue (attached at the front), and swallow whole — with the eyeballs retracting to push the meal down.",
        alt: "Frog feeding sequence tongue flip and swallowing with eye retraction",
        keyword: "tongue",
      },
      {
        Component: FrogAlimentaryCanal,
        caption:
          "A carnivore's short canal: buccal cavity with maxillary and vomerine teeth (grip only), oesophagus, acidic stomach, duodenum-ileum, reduced large intestine, single cloaca.",
        alt: "Frog alimentary canal from buccal cavity to cloaca with liver and pancreas",
        keyword: "vomerine",
      },
      {
        Component: FrogDigestionChemistry,
        caption:
          "Digestion chemistry by station: pepsin and HCl in the stomach, enzyme-free bile emulsifying fat, pancreatic amylase-lipase-trypsin, then intestinal maltase and peptidase finishing the job.",
        alt: "Frog digestion table of sites enzymes and substrates",
        keyword: "pepsin",
      },
    ],
  },
  "frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respirato": {
    title: "Frog — blood vascular & respiratory",
    figures: [
      {
        Component: FrogHeartCirculation,
        caption:
          "The frog's three-chambered heart in cross-section: two atria receive oxygenated and deoxygenated blood separately, but the single ventricle mixes them — an incomplete double circulation.",
        alt: "Frog heart with sinus venosus, two atria, single ventricle, truncus arteriosus and three pairs of arches",
        keyword: "ventricle",
      },
      {
        Component: FrogHeartInternal,
        caption:
          "Inside the three-chambered heart: sinus venosus feeding both atria, a single ventricle, and a truncus arteriosus whose spiral valve sorts blood into carotid, systemic and pulmocutaneous arches.",
        alt: "Frog heart internal structure with sinus venosus atria ventricle truncus and arches",
        keyword: "sinus venosus",
      },
      {
        Component: FrogBloodComposition,
        caption:
          "Frog blood: plasma plus cells — and the exam twist that frog RBCs are nucleated and oval, unlike mammalian discs; WBCs defend, platelets clot.",
        alt: "Frog blood composition plasma RBC WBC platelets with nucleated red cells",
        keyword: "nucleated",
      },
      {
        Component: FrogCirculationPath,
        caption:
          "Trace a drop: body veins → sinus venosus → right atrium → ventricle → truncus → pulmocutaneous arch to lungs AND skin → back via left atrium — incomplete double circulation.",
        alt: "Frog circulation pathway between body lungs skin and heart chambers",
        keyword: "pulmocutaneous",
      },
      {
        Component: FrogRespirationModes,
        caption:
          "Three breathing modes on one animal: cutaneous (always on, even underwater), buccopharyngeal (mouth-floor pump), and positive-pressure pulmonary breathing on land.",
        alt: "Frog respiration modes cutaneous buccopharyngeal and pulmonary compared",
        keyword: "buccopharyngeal",
      },
      {
        Component: FrogHeartCirculation,
        caption:
          "The frog's three-chambered heart in cross-section: two atria receive oxygenated and deoxygenated blood separately, but the single ventricle mixes them — an incomplete double circulation carried by carotid, systemic and pulmocutaneous arches.",
        alt: "Frog heart with sinus venosus, two atria, single ventricle, truncus arteriosus and three pairs of arches",
        keyword: "ventricle",
      },
    ],
  },
  "frog-reproductive-system-male-and-female-reproductive-organs": {
    title: "Frog — reproductive system",
    figures: [
      {
        Component: FrogMaleReproductiveSystem,
        caption:
          "Male system: yellow oval testes on the kidneys, 10–12 vasa efferentia threading into Bidder's canal inside the kidney, out through the urinogenital duct — sperm and urine share the exit.",
        alt: "Frog male reproductive system with testes vasa efferentia bidder canal and cloaca",
        keyword: "vasa efferentia",
      },
      {
        Component: FrogFemaleReproductiveSystem,
        caption:
          "Female system: lobed ovaries shedding eggs into the coelom, ciliated oviducal funnels sweeping them in, jelly coat added along the coiled oviduct, storage in the ovisac until amplexus.",
        alt: "Frog female reproductive system with ovaries oviducts and cloaca",
        keyword: "oviduct",
      },
      {
        Component: FrogGametogenesis,
        caption:
          "Making gametes: thousands of cheap motile sperm vs hundreds of yolk-loaded eggs — an asymmetry that external fertilisation in water demands.",
        alt: "Spermatogenesis versus oogenesis in the frog with gamete sizes",
        keyword: "gamete",
      },
      {
        Component: FrogAmplexusFertilisation,
        caption:
          "Amplexus: the male grips the female's back with nuptial pads, both release gametes into water, and fertilisation happens outside — hundreds of eggs for low odds.",
        alt: "Amplexus with male clasping female and external fertilisation in water",
        keyword: "amplexus",
      },
      {
        Component: FrogDevelopmentStages,
        caption:
          "Early development: zygote → cleavage → blastula → gastrula (three germ layers) → neurula — with the organ fate table for ectoderm, mesoderm and endoderm.",
        alt: "Frog development stages from zygote to neurula with germ layer fates",
        keyword: "gastrula",
      },
      {
        Component: FrogMetamorphosis,
        caption:
          "Metamorphosis end to end: jelly egg → gilled tadpole → limbed froglet → adult — gills become lungs, the tail is absorbed, and thyroxine (which needs iodine) drives the whole switch.",
        alt: "Frog metamorphosis stages from egg through tadpole and froglet to adult",
        keyword: "metamorphosis",
      },
    ],
  },
  // ── Biology Unit 5 — Floral diversity ──────────────────────────────────
  "introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system-mone": {
    title: "Three domains, binomial nomenclature, five kingdoms",
    figures: [
      {
        Component: ThreeDomainsTree,
        caption:
          "Above the kingdoms sit three domains: Bacteria and Archaea split the old prokaryotes by rRNA and membrane chemistry, while every eukaryote — amoeba to baobab — belongs to Eukarya.",
        alt: "Three domain tree with bacteria archaea and eukarya branches",
        keyword: "three domains",
      },
      {
        Component: FiveKingdomsChart,
        caption:
          "Whittaker's 1969 sorting machine: cell structure, body organisation and nutrition place every organism into Monera, Protista, Fungi, Plantae or Animalia.",
        alt: "Five kingdom chart comparing cell type body organisation and nutrition",
        keyword: "five kingdom",
      },
      {
        Component: KingdomsComparisonTable,
        caption:
          "The three 'difficult' kingdoms side by side: Monera has no nucleus, Protista is a single eukaryotic cell, and Fungi is multicellular but absorbs its food through chitin walls.",
        alt: "Monera protista fungi comparison across nucleus wall organelles and nutrition",
        keyword: "whittaker",
      },
      {
        Component: BinomialNomenclatureRules,
        caption:
          "Binomial nomenclature anatomy: Mangifera indica — genus capitalised, epithet small, printed in italics; Linnaeus' 1753 rules made one name mean the same thing worldwide.",
        alt: "Binomial nomenclature with genus and specific epithet and naming rules",
        keyword: "binomial",
      },
      {
        Component: TaxonomicHierarchyLadder,
        caption:
          "Seven rungs from Kingdom to Species, shown for human and mango — descending the ladder, groups shrink and shared features sharpen.",
        alt: "Taxonomic hierarchy ladder with human and mango examples per rank",
        keyword: "hierarchy",
      },
    ],
  },
  "status-of-flora-in-nepal-and-world-representation": {
    title: "Status of flora in Nepal",
    figures: [
      {
        Component: NepalFloraStats,
        caption:
          "Nepal's flora by numbers: about 7,000 flowering plants, thousands of fungi and algae, and just 30 gymnosperms — roughly 2% of the world's flowering plants on 0.1% of its land.",
        alt: "Nepal flora species counts as horizontal bars by plant group",
        keyword: "nepal",
      },
      {
        Component: NepalVegetationZones,
        caption:
          "Altitude is Nepal's climate dial: six vegetation belts from tropical sal forests to the nival snowline — climb 1,000 m and cross what driving 1,000 km north would show.",
        alt: "Nepal vegetation zones from tropical to nival with altitude bands",
        keyword: "forest",
      },
      {
        Component: FloraHotspotMap,
        caption:
          "Where the unique plants live — Himal endemics, mid-hill orchids and Rhododendron, Terai sal — and what threatens them: deforestation, over-harvest, invasives, climate shift.",
        alt: "Flora hotspots of Nepal with threats listed",
        keyword: "hotspot",
      },
      {
        Component: FloraSpeciesStatus,
        caption:
          "Status vocabulary decoded: endemic (found only here), native, exotic, and the IUCN threat ladder — high endemism plus high threat is what makes a region a priority.",
        alt: "Species status categories endemic native exotic threatened",
        keyword: "endemic",
      },
      {
        Component: FloraConservationStrategies,
        caption:
          "Two conservation strategies: in situ reserves protect species where they evolve; ex situ seed banks and botanic gardens keep the insurance copy.",
        alt: "In situ versus ex situ flora conservation strategies",
        keyword: "conservation",
      },
    ],
  },
  "fungi-general-introduction-and-characteristic-features-of-phycomycetes-ascomycetes-basidiomycete": {
    title: "Fungi — general introduction",
    figures: [
      {
        Component: FungalHyphaeTypes,
        caption:
          "The fungal body is threads, not tissue: septate hyphae divide into cells, coenocytic hyphae stream as one multinucleate tube — and both grow only at their tips.",
        alt: "Septate versus coenocytic fungal hyphae compared",
        keyword: "hypha",
      },
      {
        Component: FungalCellStructure,
        caption:
          "Inside one fungal cell: chitin wall, eukaryotic nucleus, vacuole, glycogen stores — and no chloroplast, which is why fungi never photosynthesise.",
        alt: "Fungal cell structure with chitin wall and organelles",
        keyword: "chitin",
      },
      {
        Component: FungalNutritionModes,
        caption:
          "Absorbers, not swallowers: saprophytes digest dead matter outside the body, parasites pierce hosts with haustoria, symbionts trade minerals for sugars.",
        alt: "Fungal nutrition saprophytic parasitic and symbiotic modes",
        keyword: "saprophytic",
      },
      {
        Component: FungalClassesChart,
        caption:
          "Four classes sorted by spore case: Phycomycetes (sporangium), Ascomycetes (8-spored ascus), Basidiomycetes (4-spored basidium), Deuteromycetes (sex unknown).",
        alt: "Four fungal classes with spore structures and examples",
        keyword: "ascus",
      },
      {
        Component: FungalSporeCases,
        caption:
          "Count the spores: hundreds in a sporangium, exactly eight in an ascus, four on a basidium — the case tells you the class.",
        alt: "Sporangium ascus and basidium spore cases compared",
        keyword: "sporangium",
      },
    ],
  },
  "structure-and-reproduction-of-mucor-and-yeast": {
    title: "Mucor and Yeast",
    figures: [
      {
        Component: MucorStructure,
        caption:
          "Mucor's blueprint: coenocytic hyphae, anchoring rhizoids, and vertical sporangiophores lifting globous sporangia — the black dust on old bread is thousands of ripe sporangia.",
        alt: "Mucor structure with rhizoids mycelium and sporangium on sporangiophore",
        keyword: "mucor",
      },
      {
        Component: MucorReproduction,
        caption:
          "Two modes: asexual sporangiospores for speed, sexual conjugation between + and − strains producing a thick-walled zygospore that survives harsh times.",
        alt: "Mucor asexual sporangiospores and sexual conjugation to zygospore",
        keyword: "zygospore",
      },
      {
        Component: YeastCellStructure,
        caption:
          "Yeast gave up filaments: single oval cells with a large vacuole, budding daughters, and bud scars marking every division — a fungus built for sugary juices.",
        alt: "Yeast cell with bud vacuole nucleus and bud scar",
        keyword: "yeast",
      },
      {
        Component: YeastReproduction,
        caption:
          "Budding sequence in four frames — bud emerges, nucleus divides, cells separate — with the sexual back-up: two cells fuse and become an ascus of ascospores.",
        alt: "Yeast budding sequence and ascospore formation",
        keyword: "budding",
      },
      {
        Component: MucorVsYeast,
        caption:
          "Same kingdom, different architecture: filamentous Mucor vs unicellular yeast, sporangiospores vs budding, zygospore vs ascus — compared feature by feature.",
        alt: "Mucor versus yeast comparison table",
        keyword: "fermentation",
      },
      {
        Component: YeastFermentation,
        caption:
          "Fermentation economics: glucose → pyruvate → ethanol + CO₂ with only 2 ATP per glucose — inefficient for yeast, but the waste products are bread, beer and wine.",
        alt: "Yeast fermentation pathway to ethanol and carbon dioxide with uses",
        keyword: "fermentation",
      },
    ],
  },
  "introduction-of-mushrooms-poisonous-and-non-poisonous-mushrooms-economic-importance-of-fungi": {
    title: "Mushrooms & economic importance of fungi",
    figures: [
      {
        Component: MushroomStructure,
        caption:
          "Mushroom anatomy: pileus cap, spore-bearing gills, stipe with annulus ring, volva cup at the base — and the real body, the mycelium, hidden underground.",
        alt: "Mushroom structure with pileus gills stipe annulus volva and mycelium",
        keyword: "pileus",
      },
      {
        Component: MushroomLifeCycle,
        caption:
          "The spore circle: basidiospores → primary mycelium → dikaryotic secondary mycelium → basidiocarp → meiosis on the basidia → spores again.",
        alt: "Mushroom life cycle from spores to basidiocarp and back",
        keyword: "basidiospores",
      },
      {
        Component: PoisonousVsEdibleMushrooms,
        caption:
          "The Amanita warning signs: warty cap, ring, cup-like volva, white gills — against the plain button mushroom. Never identify wild fungi by folklore alone.",
        alt: "Poisonous Amanita versus edible button mushroom features",
        keyword: "poisonous",
      },
      {
        Component: MushroomCultivationSteps,
        caption:
          "Five controlled steps: compost → spawning → casing → pinning → cropping, with temperature and humidity tuned at each stage — Nepal's oyster-mushroom cash crop.",
        alt: "Mushroom cultivation steps from compost to cropping",
        keyword: "edible",
      },
      {
        Component: FungiEconomicImportance,
        caption:
          "Four ledgers: food (mushrooms, bread), medicine (penicillin, statins), industry (alcohol, enzymes) — and harm (rusts, moulds, mycotoxins) from the same absorptive lifestyle.",
        alt: "Fungi economic importance food medicine industry and harm",
        keyword: "antibiotic",
      },
    ],
  },
  "lichen-general-introduction-characteristic-features-and-economic-importance-of-lichen": {
    title: "Lichen",
    figures: [
      {
        Component: LichenSymbiosis,
        caption:
          "A lichen slice: fungal cortex shielding an algal layer — the phycobiont photosynthesises sugars, the mycobiont supplies water, minerals and UV armour.",
        alt: "Lichen cross section with cortex algal layer and medulla",
        keyword: "symbiosis",
      },
      {
        Component: LichenGrowthForms,
        caption:
          "Three growth forms: crustose glued flat to rock, foliose leafy and peelable, fruticose shrubby and free-hanging — form follows attachment.",
        alt: "Crustose foliose and fruticose lichen growth forms",
        keyword: "crustose",
      },
      {
        Component: LichenReproduction,
        caption:
          "Reproducing a two-in-one body: soredia are ready-made symbiosis packets, isidia are warty outgrowths, fragmentation carries both partners in every broken piece.",
        alt: "Lichen reproduction by soredia isidia and fragmentation",
        keyword: "soredia",
      },
      {
        Component: LichenPioneerSuccession,
        caption:
          "First life on bare rock: lichen acids etch minerals, dead thalli become the first humus, mosses follow, then grasses — primary succession, starting from stone.",
        alt: "Lichen pioneer succession from bare rock to grasses",
        keyword: "pioneer",
      },
      {
        Component: LichenImportance,
        caption:
          "Lichens at work: litmus dye, perfumes, usnic-acid antibiotic, reindeer food — plus their day job as air-pollution monitors that die near SO₂.",
        alt: "Lichen importance in industry ecology pollution monitoring",
        keyword: "litmus",
      },
    ],
  },
  "algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-an": {
    title: "Algae — green, brown, red",
    figures: [
      {
        Component: AlgaeThreeClasses,
        caption:
          "Algae by colour: Chlorophyceae (green, starch, freshwater), Phaeophyceae (brown, fucoxanthin, kelps to 30 m), Rhodophyceae (red, phycoerythrin, deepest-living).",
        alt: "Green brown and red algal classes with pigments and habitats",
        keyword: "chlorophyceae",
      },
      {
        Component: AlgalThallusTypes,
        caption:
          "Every body plan algae invented: one cell, a colony like Volvox, unbranched filaments like Spirogyra, and sheet-like parenchymatous thalli — no roots, stems or leaves.",
        alt: "Algal thallus forms unicellular colonial filamentous and parenchymatous",
        keyword: "thallus",
      },
      {
        Component: SpirogyraStructure,
        caption:
          "Spirogyra, the water silk: cylindrical cells in a slippery sheath, each with a spiral ribbon chloroplast studded with pyrenoids — the fastest field identification.",
        alt: "Spirogyra filament with spiral chloroplasts and nucleus",
        keyword: "spirogyra",
      },
      {
        Component: SpirogyraConjugation,
        caption:
          "Conjugation without flagella: tube bridges between two filaments make the ladder pattern, one cell's whole contents crawl across, and a thick-walled zygospore forms.",
        alt: "Spirogyra ladder conjugation with zygospore formation",
        keyword: "gametes",
      },
      {
        Component: AlgaeVsLandPlants,
        caption:
          "Why algae are not plants: thallus without tissues, no vascular bundle, no retained embryo, no cuticle — the gap bryophytes later half-closed.",
        alt: "Algae versus land plants comparison table",
        keyword: "algae",
      },
      {
        Component: AlgaeEconomicUses,
        caption:
          "Algae in the economy: nori and kelp as food, agar from Gelidium in every petri dish, algin in ice cream, seaweed fertiliser — and half the world's oxygen.",
        alt: "Algae economic uses food phycocolloids agriculture environment",
        keyword: "agar",
      },
    ],
  },
  "bryophyta-general-introduction-and-characteristic-features-of-liverworts-hornworts-and-moss-morp": {
    title: "Bryophyta — liverworts, hornworts, moss",
    figures: [
      {
        Component: BryophyteGroups,
        caption:
          "Three bryophyte lines: liverworts with flat thalli and gemma cups, hornworts with long horn capsules, mosses with leafy shoots and protonema — all rhizoid-rooted and vascular-free.",
        alt: "Liverworts hornworts and mosses compared with key structures",
        keyword: "liverwort",
      },
      {
        Component: MarchantiaStructure,
        caption:
          "Marchantia's body plan: dichotomous branching thallus, dorsal air pores, gemma cups for cloning, rhizoids below — and umbrella stalks raising the sex organs.",
        alt: "Marchantia thallus with gemma cups rhizoids and archegoniophore",
        keyword: "marchantia",
      },
      {
        Component: ArchegoniumAntheridium,
        caption:
          "The sex organs: a flask-shaped archegonium holding one egg, and a sac-like antheridium releasing biflagellate sperm that must swim — water dependence in one diagram.",
        alt: "Archegonium and antheridium structure with swimming sperm",
        keyword: "archegonium",
      },
      {
        Component: MossLifeCycle,
        caption:
          "Moss alternation: spore → protonema filament → leafy gametophyte → dependent sporophyte capsule → meiosis → spores. The green plant is the haploid generation.",
        alt: "Moss life cycle with protonema gametophyte and sporophyte",
        keyword: "protonema",
      },
      {
        Component: BryophyteVsFernDominance,
        caption:
          "The great flip: in mosses the gametophyte dominates and the sporophyte is a guest; in ferns it reverses — the diploid generation took over as plants conquered land.",
        alt: "Gametophyte versus sporophyte dominance in moss and fern",
        keyword: "gametophyte",
      },
      {
        Component: BryophyteImportance,
        caption:
          "Why bryophytes matter: amphibians of the plant kingdom, peat-forming Sphagnum, pioneer soil-builders, and cheap pollution indicators.",
        alt: "Bryophyte importance peat pioneers and pollution indicators",
        keyword: "amphibians",
      },
    ],
  },
  "pteridophyta-general-introduction-and-characteristic-features-of-pteridophytes-morphological-str": {
    title: "Pteridophyta — ferns",
    figures: [
      {
        Component: FernStructure,
        caption:
          "Dryopteris's body: underground rhizome with true roots, and great fronds divided into pinnae — the first plants tall enough to need plumbing.",
        alt: "Fern structure with rhizome roots frond pinnae and sori",
        keyword: "frond",
      },
      {
        Component: VascularTissueBundle,
        caption:
          "The plumbing that changed everything: xylem carries water up through dead hollow vessels, phloem moves sugars both ways — pteridophytes are the first owners.",
        alt: "Vascular bundle with xylem and phloem roles",
        keyword: "xylem",
      },
      {
        Component: FernLifeCycle,
        caption:
          "Two free-living generations: sorus → spores → heart-shaped prothallus → fertilisation in water → new sporophyte — both generations photosynthesise independently.",
        alt: "Fern life cycle from sorus to prothallus to sporophyte",
        keyword: "sorus",
      },
      {
        Component: FernProthallus,
        caption:
          "The prothallus: a 5–10 mm, one-cell-thick heart carrying both archegonia and antheridia — the fern's weakest link, which seed plants later hid inside pollen and ovules.",
        alt: "Fern prothallus with archegonia antheridia and rhizoids",
        keyword: "prothallus",
      },
      {
        Component: PteridophyteDiversity,
        caption:
          "Four faces of the group: clubmoss Lycopodium, heterosporous Selaginella, silica-armoured horsetail Equisetum, and true fern Dryopteris — Selaginella's two spore sizes preview the seed.",
        alt: "Lycopodium Selaginella Equisetum and Dryopteris compared",
        keyword: "lycopodium",
      },
    ],
  },
  "gymnosperm-general-introduction-and-characteristic-features-of-gymnosperms-morphology-and-reprod": {
    title: "Gymnosperm — Pinus",
    figures: [
      {
        Component: GymnospermVsAngiosperm,
        caption:
          "'Naked seed' decoded: gymnosperm ovules sit exposed on cone scales with no ovary or fruit; angiosperm ovules hide inside an ovary that becomes the fruit.",
        alt: "Naked seed on cone versus enclosed seed in fruit",
        keyword: "naked seed",
      },
      {
        Component: PinusMorphology,
        caption:
          "Pinus's mountain toolkit: needle leaves in fascicles, thick cuticle, sunken stomata, resin canals sealing wounds — xerophyte engineering in an evergreen.",
        alt: "Pinus morphology with needle fascicles and resin canals",
        keyword: "needle",
      },
      {
        Component: PineConesMaleFemale,
        caption:
          "Two cones, one tree: small soft male cones releasing yellow pollen below, large woody female cones with naked ovules above — the arrangement discourages self-pollination.",
        alt: "Male and female pine cones with positions and structures",
        keyword: "male cone",
      },
      {
        Component: PinePollinationSeed,
        caption:
          "Wind-borne to winged seed: two-winged pollen lands at the micropyle, a pollen tube delivers sperm without water, and two years later a winged seed flies.",
        alt: "Pine pollination to winged seed formation over two years",
        keyword: "pollen",
      },
      {
        Component: GymnospermDiversityUses,
        caption:
          "Living gymnosperms and their uses: Cycas the sago palm, Pinus the timber-and-resin tree — chir pine forests of the mid-hills supply resin, turpentine and pulp.",
        alt: "Gymnosperm diversity Cycas and Pinus with economic uses",
        keyword: "cycas",
      },
    ],
  },
  "angiosperm-morphology-of-root-stem-leaves-inflorescences-flowers-and-fruit": {
    title: "Angiosperm morphology",
    figures: [
      {
        Component: RootTypes,
        caption:
          "Three root systems: dicot tap root with laterals, monocot fibrous cluster, and adventitious roots arising from stems or leaves for support, climbing or storage.",
        alt: "Tap fibrous and adventitious root systems compared",
        keyword: "tap root",
      },
      {
        Component: StemMorphology,
        caption:
          "Reading a stem: nodes carry leaves and axillary buds, internodes stretch between them, and the same bud can become a branch, tendril, thorn or runner.",
        alt: "Stem morphology with nodes internodes buds and modifications",
        keyword: "node",
      },
      {
        Component: LeafVenationPhyllotaxy,
        caption:
          "Leaf fingerprints: reticulate nets in dicots, parallel veins in monocots — plus phyllotaxy, the alternate/opposite/whorled rhythm of leaves on the stem.",
        alt: "Reticulate and parallel venation with phyllotaxy patterns",
        keyword: "venation",
      },
      {
        Component: InflorescenceTypes,
        caption:
          "Flower packing: raceme stalks each flower, spike sits them sessile, umbel rays from one point, head compacts a disc — grouped flowers pollinate in one visit.",
        alt: "Inflorescence types raceme spike umbel and head",
        keyword: "inflorescence",
      },
      {
        Component: FlowerStructure,
        caption:
          "Four whorls on a receptacle: green calyx, colourful corolla, pollen-bearing androecium, and the ovary-style-stigma gynoecium — outside-in order matters.",
        alt: "Flower structure with four whorls calyx corolla androecium gynoecium",
        keyword: "sepal",
      },
      {
        Component: FruitTypes,
        caption:
          "The ovary's afterlife: ovary becomes fruit, ovule becomes seed — drupe with a stony stone, berry fleshy throughout, legume a splitting pod.",
        alt: "Fruit types drupe berry and legume with pericarp layers",
        keyword: "drupe",
      },
    ],
  },
  "taxonomic-study-definition-taxonomic-hierarchy-classification-systems-artificial-natural-and-phy": {
    title: "Taxonomic study",
    figures: [
      {
        Component: TaxonRanksLadder,
        caption:
          "Seven obligatory categories from Kingdom to Species — each rank is a taxon, and descending the ladder trades breadth for shared detail.",
        alt: "Taxonomic categories ladder kingdom to species",
        keyword: "hierarchy",
      },
      {
        Component: ClassificationSystemsTimeline,
        caption:
          "Three generations of classification: artificial (few characters, Linnaeus), natural (overall similarity, Bentham & Hooker), phylogenetic (evolutionary ancestry, DNA-informed).",
        alt: "Artificial natural and phylogenetic classification systems timeline",
        keyword: "taxonomy",
      },
      {
        Component: SpeciesConcept,
        caption:
          "Species — the only real rung: an interbreeding population, reproductively isolated from others, sharing one gene pool; higher ranks are human convenience.",
        alt: "Species concept with interbreeding and reproductive isolation",
        keyword: "species",
      },
      {
        Component: TaxonomicAids,
        caption:
          "The taxonomist's toolkit: herbarium sheets, museum jars, living botanical gardens, and paper aids — keys, floras, monographs and manuals.",
        alt: "Taxonomic aids herbarium museum botanical garden and keys",
        keyword: "herbarium",
      },
      {
        Component: DichotomousKeyExample,
        caption:
          "A key in action: each couplet offers two contrasting choices; pick the matching one and follow its pointer until a single name survives.",
        alt: "Dichotomous key couplets leading to species identification",
        keyword: "key",
      },
    ],
  },
  "angiosperm-families-with-economic-importance-brassicaceae-fabaceae-solanaceae-and-liliaceae": {
    title: "Angiosperm families",
    figures: [
      {
        Component: FloralFormulaAnatomy,
        caption:
          "Reading a floral formula: symbols for bract, symmetry and sex, then K C A G with numbers, brackets for fusion and an underline for an inferior ovary.",
        alt: "Floral formula symbols decoded with worked example",
        keyword: "floral formula",
      },
      {
        Component: BrassicaceaeFeatures,
        caption:
          "Brassicaceae: four petals in a cross, six tetradynamous stamens (2+4), silique fruit — the mustard family's formula ⊕ ⚥ K₂+₂ C₄ A₂+₄ G(₂).",
        alt: "Brassicaceae cruciform corolla tetradynamous stamens and silique",
        keyword: "brassicaceae",
      },
      {
        Component: FabaceaeFeatures,
        caption:
          "Fabaceae: butterfly-shaped papilionaceous corolla (banner, wings, keel), diadelphous stamens 9+1, legume fruit — plus Rhizobium nodules that fix nitrogen.",
        alt: "Fabaceae papilionaceous flower diadelphous stamens and legume",
        keyword: "papilionaceous",
      },
      {
        Component: SolanaceaeFeatures,
        caption:
          "Solanaceae: wheel-shaped five-lobed corolla, epipetalous stamens stuck to the petals, berry fruit — the alkaloid family of potato, tomato and tobacco.",
        alt: "Solanaceae rotate corolla epipetalous stamens and berry",
        keyword: "solanaceae",
      },
      {
        Component: LiliaceaeFeatures,
        caption:
          "Liliaceae, the monocot blueprint: trimerous flowers with six look-alike tepals, 3+3 stamens, superior tricarpellary ovary, capsule fruit — onion, garlic, aloe.",
        alt: "Liliaceae trimerous flower tepals and capsule",
        keyword: "liliaceae",
      },
      {
        Component: FamiliesComparisonTable,
        caption:
          "Four families at a glance: symmetry, merosity, stamens, carpels, fruit and placentation — the stamens row alone separates all four.",
        alt: "Comparison table of four angiosperm families",
        keyword: "placentation",
      },
      {
        Component: FamiliesEconomicImportance,
        caption:
          "Why these families matter: mustard oil and pulses, potato and chilli, onion and aloe — food and pharmacy, each family a distinct chemistry kit.",
        alt: "Economic importance of the four families with crops",
        keyword: "economic",
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
