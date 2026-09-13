// Topic-visual mapping for schematic diagrams
// All entries sourced from scripts/theorem-index.json

export const TOPIC_VISUALS: Record<string, string[]> = {
  // BIOLOGY (66 topics)
  biology: [
    "nephron", "kidney", "excret", "urinary", "renal", // Excretory
    "cell", "organelle", "prokaryotic", "eukaryotic", "mitosis", "meiosis", "cell-division", // Cell Biology
    "neuron", "synapse", "nervous", "brain", // Nervous
    "ecosystem", "food-chain", "food-web", "biogeochemical", "ecological", "biodiversity", "succession", // Ecology
    "evolution", "darwin", "haldane", "miller", "origin-of-life", "pangenesis", // Evolutionary
    "protista", "fungi", "bryophyta", "pteridophyta", "gymnospermae", "angiospermae", "algae", // Plant Diversity
    "protozoa", "porifera", "coelenterata", "platyhelminthes", "aschelminthes", "annelida", "arthropoda", "mollusca", "echinodermata", "chordata", // Animal Diversity
    "biomolecules", "protein", "carbohydrate", "lipid", "nucleic-acid", "enzyme", // Biomolecules
    "photosynthesis", "respiration", "transpiration", // Plant Physiology
    "plant-anatomy", "vegetation", "conservation", "habitat", "adaptation", // Environmental
  ],
  
  // CHEMISTRY (162 topics)
  chemistry: [
    "atom", "atomic-structure", "electron", "proton", "neutron", "orbit", "orbitals", "quantum", "bohr", "rutherford", // Atomic Structure
    "bond", "ionic", "covalent", "metallic", "hybridization", "vsepr", "molecular-orbital", "resonance", "dipole", "polar", // Chemical Bonding
    "equilibrium", "le-chatelier", "law-of-mass-action", "reaction-quotient", // Equilibrium
    "thermodynamics", "enthalpy", "entropy", "gibbs-energy", "first-law", "second-law", // Thermochemistry
    "redox", "oxidation", "reduction", "electrode", "electrolysis", "galvanic", "daniell", // Electrochemistry
    "kinetics", "rate-constant", "activation-energy", "catalyst", // Chemical Kinetics
    "solution", "concentration", "molarity", "molality", "colligative", "osmosis", // Solutions
    "solid-state", "crystal", "lattice", "unit-cell", "defects", // Solid State
    "gaseous-state", "ideal-gas", "real-gas", "van-der-waals", "liquid-state", // States of Matter
    "organic", "iupac", "nomenclature", "isomerism", "functional-group", "hydrocarbon", "alkane", "alkene", "alkyne", "aromatic", "benzene", // Organic
    "inorganic", "metals", "non-metals", "alkali", "alkaline-earth", "halogen", "noble-gas", "transition", // Inorganic
    "periodic", "table", "trends", "electronegativity", "ionization", "atomic-radius", // Periodicity
    "stoichiometry", "mole", "avogadro", "limiting-reagent", "percentage-composition", // Stoichiometry
    "analytical", "qualitative", "定量", "spectroscopy", "chromatography", // Analytical
    "surface", "adsorption", "catalysis", "colloid", "emulsion", "gel", "sol", // Surface Chemistry
    "核", "nuclear", "fission", "fusion", "radioactive", // Nuclear
    "applied", "industry", "fertilizer", "polymer", "drug", "detergent", "cosmetic", // Applied
  ],
  
  // MATHEMATICS (90 topics)
  mathematics: [
    "calculus", "integral", "derivative", "limit", "continuity", "differentiation", "integration", "area-under-curve", // Calculus
    "algebra", "polynomial", "quadratic", "equation", "inequality", "logarithm", "exponent", "complex-number", // Algebra
    "trigonometry", "trigonometric", "identity", "inverse", "circular-function", // Trigonometry
    "coordinate", "geometry", "line", "circle", "ellipse", "parabola", "hyperbola", "straight-line", // Coordinate Geometry
    "vector", "dot-product", "cross-product", "scalar", "vector-triple-product", // Vector Algebra
    "probability", "statistics", "mean", "median", "mode", "standard-deviation", "variance", "distribution", // Statistics
    "matrix", "determinant", "inverse", "adjoint", "linear-equation", // Matrices
    "set", "logic", "set-theory", "union", "intersection", "complement", // Sets & Logic
    "sequence", "series", "arithmetic", "geometric", "progression", // Sequence & Series
    "function", "domain", "range", "injective", "surjective", "bijective", // Functions
    "mathematical-induction", "pigeonhole", "binomial-theorem", "permutation", "combination", // Discrete Math
    "numerical", "integration-method", "root-finding", "newton-raphson", // Numerical Methods
    "mechanics", "statics", "dynamics", "force", "moment", "work", "energy", // Engineering Mechanics
    "analytic", "curve-sketching", "asymptote", "tangent", "normal", // Curve Sketching
  ],
  
  // NEPALI (5 topics)
  nepali: [
    "bhasha", "vyakarana", "shabda", "vachana", "ling", "karak", "sandehipad", // General Grammar
    "swar", "vyanjan", "antastha", "paushthya", "ghosha", // Varnas
    "tadbhav", "aagantuk", "deeshaj", "videshaj", // Shabd types
  ],
  
  // PHYSICS (155 topics)
  physics: [
    "kinematics", "motion", "velocity", "acceleration", "projectile", "uniform-circular", // Kinematics
    "dynamics", "newton", "force", "friction", "inertia", "momentum", "impulse", // Dynamics
    "work-energy", "power", "conservation", "kinetic-energy", "potential-energy", // Work Energy Power
    "circular-motion", "centripetal", "conical-pendulum", "banking", // Circular Motion
    "gravitation", "gravity", "g", "escape-velocity", "orbit", "satellite", // Gravitation
    "elasticity", "hooke-law", "stress", "strain", "young-modulus", // Elasticity
    "fluid-mechanics", "bernoulli", "viscosity", "surface-tension", "capillarity", // Fluid
    "thermodynamics", "heat", "temperature", "thermal-expansion", "calorimetry", // Heat & Thermodynamics
    "ideal-gas", "kinetic-theory", "gas-laws", "molecular-properties", // Gases
    "optics", "reflection", "refraction", "lens", "mirror", "prism", "dispersion", "interference", "diffraction", "polarization", "yDSE", // Optics
    "electrostatics", "charge", "coulomb", "electric-field", "potential", "capacitance", "dielectric", // Electrostatics
    "current-electricity", "ohm", "resistance", "resistivity", "conductivity", "kirchhoff", "potential-difference", // Current Electricity
    "magnetism", "magnetic-field", "biot-savart", "ampere", "lorentz-force", // Magnetism
    "electromagnetic-induction", "faraday", "lenz-law", "self-inductance", "mutual-inductance", // EM Induction
    "alternating-current", "ac", "impedance", "resonance", "transformer", // AC
    "electromagnetic-waves", "em-wave", "maxwell", // EM Waves
    "modern-physics", "photoelectric", " Compton", "wave-particle", "duality", // Modern Physics
    "nuclear-physics", "nucleus", "radioactivity", "decay", "binding-energy", "mass-energy", "fission", "fusion", // Nuclear
    "semiconductor", "diode", "transistor", "logic-gate", "energy-band", // Semiconductor
    "communication", "modulation", "signal", "antenna", // Communication
    "dimensions", "dimensional-analysis", "error", "measurement", // Physical Quantities
    "recent-trends", "particle-physics", "quark", "lepton", "dark-matter", "black-hole", "big-bang", // Recent Trends
    "solids", "crystal", "band-theory", "conductor", "insulator", "semiconductor", // Solids
    "vectors", "scalar", "vector-addition", "triangle-law", "parallelogram-law", // Vectors
    "simple-harmonic", "oscillation", "wave", "sound", // SHM & Waves
  ],
};

export function getTopicVisualKeyword(topicSlug: string, topicTitle: string, subjectSlug: string): string | null {
  const slug = topicSlug.toLowerCase();
  const title = topicTitle.toLowerCase();
  const subject = subjectSlug.toLowerCase();
  
  const relevantKeywords = TOPIC_VISUALS[subject] || [];
  
  for (const keyword of relevantKeywords) {
    if (slug.includes(keyword) || title.includes(keyword)) {
      return keyword;
    }
  }
  
  return null;
}
