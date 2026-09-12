// NEB (+2) lab catalog — metadata for the /lab/ visualization & measurement labs.
// Each entry is enough for a fully-structured page; detailed content can be
// filled in later via the same fields.
//
// `type` tells the reader what the lab is FOR:
//   - "theory"    → 3D / concept visualization lab (explore structures & ideas)
//   - "practical" → numerical measurement experiment (apparatus + procedure + result)

export type LabType = "theory" | "practical";

export type LabRelatedLink = {
  label: string;
  href: string;
};

export type LabEntry = {
  id: string;
  /** Route segment used in the URL. */
  title: string;
  subject: string; // "Biology" | "Physics"
  type: LabType;
  tagline: string;
  /** One line: what this lab is for. */
  purpose: string;
  /** Key concepts covered. */
  concepts: string[];
  // Theory labs:
  observations?: string[];
  // Practical labs:
  apparatus?: string[];
  procedure?: string[];
  result?: string;
  related?: LabRelatedLink[];
  /** Parent hub id for sub-labs; null/undefined for hubs. */
  parent?: string | null;
  /** True for hub (index) pages. */
  hub?: boolean;
};

const BIO_REL: LabRelatedLink[] = [
  { label: "Biology practical write-ups", href: "/practical/biology" },
  { label: "Biology syllabus", href: "/syllabus/biology" },
];
const PHY_REL: LabRelatedLink[] = [
  { label: "Physics practical write-ups", href: "/practical/physics" },
  { label: "Physics syllabus", href: "/syllabus/physics" },
];

export const LABS: Record<string, LabEntry> = {
  // ---------- BIOLOGY HUB ----------
  "biology": {
    id: "biology",
    title: "Biology 3D Labs",
    subject: "Biology",
    type: "theory",
    hub: true,
    parent: null,
    tagline: "Interactive 3D theory labs for NEB Class 11 & 12 Biology.",
    purpose:
      "A hub of concept-exploration labs — cell structure, cell division, biodiversity, ecosystems and evolution. These are visualization (theory) labs, not wet-lab practicals; pair them with the Biology practical write-ups for the experimental side.",
    concepts: [],
    related: [
      { label: "Biology practical write-ups", href: "/practical/biology" },
      { label: "Biology syllabus", href: "/syllabus/biology" },
    ],
  },

  "cell-3d": {
    id: "cell-3d",
    title: "Cell 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "Interactive 3D explorer of eukaryotic and prokaryotic cells.",
    purpose:
      "Understand cell structure, organelle function and the plant/animal differences that NEB Biology Class 11 expects.",
    concepts: [
      "Nucleus & nucleolus",
      "Mitochondria (ATP production)",
      "Ribosomes (protein synthesis)",
      "Endoplasmic reticulum & Golgi body",
      "Cell wall vs cell membrane",
      "Prokaryote vs eukaryote",
    ],
    observations: [
      "Identify each organelle by its 3D shape",
      "Compare a plant cell (wall, chloroplast, large vacuole) vs an animal cell",
      "Trace the endomembrane pathway from ER to membrane",
    ],
    related: BIO_REL,
  },

  "cell-division-3d": {
    id: "cell-division-3d",
    title: "Cell Division 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "Step-through 3D animation of mitosis and meiosis.",
    purpose:
      "Grasp the stages of cell division, chromosome behaviour and why meiosis produces variation — core to the NEB genetics unit.",
    concepts: [
      "Interphase, prophase, metaphase, anaphase, telophase",
      "Cytokinesis",
      "Mitosis vs meiosis",
      "Crossing over / recombination",
      "Chromosome : chromatid counting",
    ],
    observations: [
      "Follow sister chromatids separating in mitosis",
      "Watch homologues pair (synapsis) in meiosis I",
      "Observe recombination during prophase I",
    ],
    related: BIO_REL,
  },

  "floral-3d": {
    id: "floral-3d",
    title: "Floral Diversity 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D model of flower morphology and angiosperm family characters.",
    purpose:
      "Learn to key plant families by floral characters — sepal/petal number, symmetry and stamen fusion — the basis of NEB floral-diversity work.",
    concepts: [
      "Floral symmetry (actinomorphic / zygomorphic)",
      "Perianth: sepals & petals",
      "Androecium & gynoecium",
      "Placentation",
      "Family keys: Brassicaceae, Fabaceae, Solanaceae, Liliaceae",
    ],
    observations: [
      "Count the whorls; note fused vs free parts",
      "Match a flower to its family using the key",
      "Spot zygomorphic (pea-like) symmetry in Fabaceae",
    ],
    related: BIO_REL,
  },

  "faunal-3d": {
    id: "faunal-3d",
    title: "Faunal Diversity 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D tour of animal phyla and their key identifying characters.",
    purpose:
      "Recognize phylum-level features used in NEB taxonomy questions — symmetry, body plan and organ systems.",
    concepts: [
      "Symmetry: radial, bilateral, none",
      "Body cavities (a-/eu-coelom)",
      "Metamerism / segmentation",
      "Skeletal systems",
      "Representative phyla: Porifera, Annelida, Arthropoda, Chordata",
    ],
    observations: [
      "Compare a hydract (radial) vs an earthworm (bilateral)",
      "Locate the coelom",
      "Match a specimen to its phylum by character set",
    ],
    related: BIO_REL,
  },

  "biota-3d": {
    id: "biota-3d",
    title: "Biota 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D biodiversity and taxonomy framework.",
    purpose:
      "Build the classification hierarchy and understand biodiversity and taxonomic ranking for the NEB biodiversity unit.",
    concepts: [
      "Taxonomic ranks: kingdom → species",
      "Binomial nomenclature",
      "Phylogeny basics",
      "Biodiversity levels: genetic, species, ecosystem",
    ],
    observations: [
      "Place an organism up the ranks",
      "Read a scientific name (genus + species)",
      "See how clades nest inside each other",
    ],
    related: BIO_REL,
  },

  "biomolecules-3d": {
    id: "biomolecules-3d",
    title: "Biomolecules 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D structures of the four classes of biomolecules.",
    purpose:
      "Visualize monomer → polymer for carbohydrates, lipids, proteins and nucleic acids (Biology 301 biomolecules unit).",
    concepts: [
      "Monomers: monosaccharide, amino acid, fatty acid, nucleotide",
      "Polymerization & condensation",
      "Primary protein structure",
      "DNA vs RNA nucleotides",
    ],
    observations: [
      "Watch a condensation link two monomers",
      "Fold an amino acid into secondary structure",
      "Compare deoxyribose vs ribose",
    ],
    related: BIO_REL,
  },

  "micro-3d": {
    id: "micro-3d",
    title: "Microbiology 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D look at microbes: bacteria, viruses and fungi.",
    purpose:
      "Understand the prokaryotic cell, viral structure and the microbial agents behind the NEB introductory-microbiology unit.",
    concepts: [
      "Prokaryote vs eukaryote cell",
      "Bacterial morphology (coccus, bacillus)",
      "Viral capsid & envelope",
      "Symbiosis & parasitism",
    ],
    observations: [
      "Spot the nucleoid (no membrane-bound nucleus)",
      "Compare a bacterium vs a virus in size",
      "See the host-infection steps of a virus",
    ],
    related: BIO_REL,
  },

  "ecology-3d": {
    id: "ecology-3d",
    title: "Ecology 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D ecosystem model: food webs, energy flow and cycles.",
    purpose:
      "Model producers, consumers and decomposers plus nutrient & energy flow, which underpin the NEB ecology practicals.",
    concepts: [
      "Trophic levels & food chains / webs",
      "Energy pyramid (10% rule)",
      "Biogeochemical cycles (C, N, H₂O)",
      "Biotic vs abiotic factors",
    ],
    observations: [
      "Trace energy from producers to the apex",
      "Follow one carbon or nitrogen cycle",
      "Remove a species and watch the web shift",
    ],
    related: BIO_REL,
  },

  "evolution-3d": {
    id: "evolution-3d",
    title: "Evolution 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D visualizations of natural selection and speciation.",
    purpose:
      "Explain the evidence and mechanisms of evolution for the NEB evolution unit.",
    concepts: [
      "Natural selection & adaptation",
      "Antibiotic resistance",
      "Genetic drift vs selection",
      "Fossils & comparative anatomy as evidence",
    ],
    observations: [
      "Simulate selection on a trait over generations",
      "Compare homologous structures",
      "Track an allele frequency changing",
    ],
    related: BIO_REL,
  },

  "conservation-3d": {
    id: "conservation-3d",
    title: "Conservation 3D",
    subject: "Biology",
    type: "theory",
    parent: "biology",
    tagline: "3D model of threatened ecosystems and conservation strategies.",
    purpose:
      "Understand threats to biodiversity and conservation approaches for the NEB ecology / conservation themes.",
    concepts: [
      "Habitat loss, extinction & biodiversity value",
      "In-situ vs ex-situ conservation",
      "Endangered species & reserves",
    ],
    observations: [
      "Map a threatened habitat",
      "Compare a sanctuary vs captive breeding",
      "Assess the impact of habitat fragmentation",
    ],
    related: BIO_REL,
  },

  // ---------- HEAT-DETERMINATIONS HUB (Physics, practical) ----------
  "heat-determinations": {
    id: "heat-determinations",
    title: "Heat Determination Experiments",
    subject: "Physics",
    type: "practical",
    hub: true,
    parent: null,
    tagline: "Physics measurement labs for thermal properties.",
    purpose:
      "A hub of numerical practical experiments that determine thermal constants (K, α, cooling constant). Each has apparatus, procedure and expected result; full write-ups live in the Physics practical syllabus.",
    concepts: [],
    related: [
      { label: "Physics practical write-ups", href: "/practical/physics" },
      { label: "Physics syllabus", href: "/syllabus/physics" },
    ],
  },

  "lees-disc": {
    id: "lees-disc",
    title: "Lees' Disc — Thermal Conductivity",
    subject: "Physics",
    type: "practical",
    parent: "heat-determinations",
    tagline: "Steady-state experiment to find the thermal conductivity K of a metal disc.",
    purpose:
      "Determine K by balancing heat flow through a disc against its radiative loss — a Class 12 heat-determination practical.",
    concepts: [
      "Steady state & heat flow Q/t",
      "Disc geometry (area A, thickness d)",
      "Radiative & convective losses",
      "Graphical determination of the cooling slope",
    ],
    apparatus: [
      "Metal disc of known area A and thickness d",
      "Heater plate with thermometer",
      "Stopwatch",
      "Graph paper",
    ],
    procedure: [
      "Heat the disc to a steady temperature above ambient",
      "Remove it from the heater; cool it; record T every 5 s",
      "Plot the cooling curve T vs t",
      "Find dT/dt at the steady temperature and solve the heat-balance for K",
    ],
    result: "Thermal conductivity K reported in W m⁻¹ K⁻¹.",
    related: PHY_REL,
  },

  "linear-expansion": {
    id: "linear-expansion",
    title: "Linear Expansion — Coefficient of Expansion",
    subject: "Physics",
    type: "practical",
    parent: "heat-determinations",
    tagline: "Find the coefficient of linear expansion α of a metal rod.",
    purpose:
      "Measure ΔL over a known ΔT to obtain α — a standard Class 11/12 practical.",
    concepts: [
      "α = ΔL / (L₀ · ΔT)",
      "Optical-lever / vernier magnification",
      "Thermal equilibrium & lag",
      "Correction to a reference temperature",
    ],
    apparatus: [
      "Metal rod of length L₀",
      "Heating bath / flame",
      "Vernier or optical-lever arrangement",
      "Thermometer",
    ],
    procedure: [
      "Note the initial reading L₀ at temperature T₀",
      "Heat steadily to T; take the final reading L₁",
      "Compute ΔL, correcting for any lever magnification",
      "Find α = ΔL / (L₀ · ΔT)",
    ],
    result: "Coefficient of linear expansion α in K⁻¹ (order 10⁻⁵ K⁻¹ for metals).",
    related: PHY_REL,
  },

  "newton-cooling": {
    id: "newton-cooling",
    title: "Newton's Law of Cooling",
    subject: "Physics",
    type: "practical",
    parent: "heat-determinations",
    tagline: "Verify Newton's law of cooling by plotting the cooling curve.",
    purpose:
      "Confirm that the rate of cooling is proportional to the excess temperature; plot θ–t and find the time constant.",
    concepts: [
      "dθ/dt = −k (θ − θ₀)",
      "Exponential decay",
      "Log-linear plot of ln(θ − θ₀)",
      "Effect of surface & air flow",
    ],
    apparatus: [
      "Hot body / vessel of hot water",
      "Thermometer",
      "Stopwatch",
      "Ambient temperature θ₀",
    ],
    procedure: [
      "Record θ at fixed intervals (or every 10 s) until near room temperature",
      "Plot θ vs t",
      "Plot ln(θ − θ₀) vs t → a straight line whose slope is −k",
    ],
    result: "Linearity verifies Newton's law; k is the cooling constant.",
    related: PHY_REL,
  },

  "searles-bar": {
    id: "searles-bar",
    title: "Searle's Bar — Thermal Conductivity",
    subject: "Physics",
    type: "practical",
    parent: "heat-determinations",
    tagline: "Searle's method to find the thermal conductivity K of a metal rod.",
    purpose:
      "Measure heat conducted through a rod at steady state against end losses — a Class 12 heat-determination.",
    concepts: [
      "Steady-state heat flow",
      "Thermometer gradient along the rod",
      "End correction & insulation",
      "K = P·l / (A·ΔT·t)",
    ],
    apparatus: [
      "Searle's apparatus (rod with thermometer holes)",
      "Water / steam bath",
      "Thermometers",
      "Balance / micrometer for dimensions",
    ],
    procedure: [
      "Heat the rod end to steady state; read two thermometers (T₁, T₂)",
      "Collect the mass of water to find the energy input",
      "Measure length l, cross-sectional area A and ΔT",
      "Compute K = P·l / (A·ΔT·t)",
    ],
    result: "Thermal conductivity K in W m⁻¹ K⁻¹.",
    related: PHY_REL,
  },
};

export function getLab(id: string): LabEntry | undefined {
  return LABS[id];
}

export function listLabs(parent: string): LabEntry[] {
  return Object.values(LABS).filter((e) => e.parent === parent);
}
