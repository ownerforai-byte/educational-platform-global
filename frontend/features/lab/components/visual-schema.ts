// Visual schema mapping for theorems by unit
// Maps topic slugs/titles to appropriate schematic diagrams

export interface VisualSchema {
  title: string;
  subtitle: string;
  diagramType: string;
  keywords: string[];
}

export const VISUAL_SCHEMAS: Record<string, VisualSchema[]> = {
  biology: [
    // Default fallback (covers all biology theorems not specifically matched)
    {
      title: "Biological Systems & Organisms",
      subtitle: "Biodiversity, Classification & Ecological Relationships",
      diagramType: "default-biology",
      keywords: ["cell", "organism", "biodiversity", "ecology", "evolution", "classification", "adaptation", "behavior", "protista", "fungi", "vegetation", "conservation", "biotech", "monera", "virus", "biomolecule"],
    },
    {
      title: "Nephron & Excretory System",
      subtitle: "Filtration, Reabsorption & Secretion",
      diagramType: "nephron",
      keywords: ["nephron", "kidney", "excret", "urinary", "renal"],
    },
    {
      title: "Cell Structure & Division",
      subtitle: "Eukaryotic Cell Organelles & Mitosis/Meiosis",
      diagramType: "cell",
      keywords: ["cell", "organelle", "prokaryotic", "eukaryotic", "mitosis", "meiosis", "cell-division"],
    },
    {
      title: "Neuron & Synaptic Transmission",
      subtitle: "Nervous System Signal Transduction",
      diagramType: "neuron",
      keywords: ["neuron", "synapse", "nervous", "brain"],
    },
    {
      title: "Ecological Pyramids & Cycles",
      subtitle: "Energy Flow & Biogeochemical Cycling",
      diagramType: "ecology",
      keywords: ["ecosystem", "food-chain", "food-web", "biogeochemical", "ecological", "biodiversity", "succession"],
    },
    {
      title: "Evolutionary Evidence",
      subtitle: "Origin of Life & Natural Selection",
      diagramType: "evolution",
      keywords: ["evolution", "darwin", "haldane", "miller", "origin-of-life", "pangenesis"],
    },
    {
      title: "Plant Diversity Classification",
      subtitle: "Bryophytes, Pteridophytes, Gymnosperms & Angiosperms",
      diagramType: "plant-diversity",
      keywords: ["protista", "fungi", "bryophyta", "pteridophyta", "gymnospermae", "angiospermae", "algae"],
    },
    {
      title: "Animal Phyla Classification",
      subtitle: "From Protozoa to Chordata Diagnostic Features",
      diagramType: "animal-diversity",
      keywords: ["protozoa", "porifera", "coelenterata", "platyhelminthes", "aschelminthes", "annelida", "arthropoda", "mollusca", "echinodermata", "chordata"],
    },
    {
      title: "Biomolecular Structure",
      subtitle: "Proteins, Carbohydrates, Lipids & Nucleic Acids",
      diagramType: "biomolecules",
      keywords: ["biomolecules", "protein", "carbohydrate", "lipid", "nucleic-acid", "enzyme"],
    },
    {
      title: "Photosynthesis & Respiration",
      subtitle: "Energy Transformation in Living Systems",
      diagramType: "photosynthesis",
      keywords: ["photosynthesis", "respiration", "transpiration"],
    },
    {
      title: "Vegetation & Conservation",
      subtitle: "Biotic Communities & Biodiversity Conservation",
      diagramType: "vegetation",
      keywords: ["plant-anatomy", "vegetation", "conservation", "habitat", "adaptation"],
    },
    {
      title: "Introduction to Biology",
      subtitle: "Scope, Fields & Relation with Other Sciences",
      diagramType: "biology-intro",
      keywords: ["introduction", "scope", "fields"],
    },
    {
      title: "Microbiology & Biotechnology",
      subtitle: "Monera, Viruses & Biotech Applications",
      diagramType: "microbiology",
      keywords: ["monera", "bacteria", "virus", "biotech", "microbiology"],
    },
  ],
  chemistry: [
    // Default fallback for unmatched chemistry theorems
    {
      title: "Chemical Principles & Reactions",
      subtitle: "General Chemistry Concepts & Applications",
      diagramType: "default-chemistry",
      keywords: ["chemical", "reaction", "compound", "element", "atom", "molecule", "industry", "aromatic", "hydrocarbon", "alkane", "alkene", "alkyne", "benzene"],
    },
    {
      title: "Atomic Structure & Quantum Mechanics",
      subtitle: "Bohr Model, Quantum Numbers & Electron Configuration",
      diagramType: "atomic",
      keywords: ["atom", "atomic-structure", "electron", "proton", "neutron", "orbit", "orbitals", "quantum", "bohr", "rutherford"],
    },
    {
      title: "Chemical Bonding & Molecular Structure",
      subtitle: "Ionic, Covalent, Metallic Bonds & Hybridization",
      diagramType: "bonding",
      keywords: ["bond", "ionic", "covalent", "metallic", "hybridization", "vsepr", "molecular-orbital", "resonance", "dipole", "polar"],
    },
    {
      title: "Chemical Equilibrium",
      subtitle: "Dynamic Equilibrium & Le Chatelier's Principle",
      diagramType: "equilibrium",
      keywords: ["equilibrium", "le-chatelier", "law-of-mass-action", "reaction-quotient"],
    },
    {
      title: "Thermodynamics",
      subtitle: "Enthalpy, Entropy & Gibbs Free Energy",
      diagramType: "thermodynamics",
      keywords: ["thermodynamics", "enthalpy", "entropy", "gibbs-energy", "first-law", "second-law"],
    },
    {
      title: "Electrochemistry",
      subtitle: "Redox Reactions & Electrochemical Cells",
      diagramType: "electrochemistry",
      keywords: ["redox", "oxidation", "reduction", "electrode", "electrolysis", "galvanic", "daniell"],
    },
    {
      title: "Chemical Kinetics",
      subtitle: "Reaction Rates & Activation Energy",
      diagramType: "kinetics",
      keywords: ["kinetics", "rate-constant", "activation-energy", "catalyst"],
    },
    {
      title: "Solutions & Colligative Properties",
      subtitle: "Concentration Terms & Vapor Pressure Lowering",
      diagramType: "solutions",
      keywords: ["solution", "concentration", "molarity", "molality", "colligative", "osmosis"],
    },
    {
      title: "Solid State Chemistry",
      subtitle: "Crystal Lattices, Unit Cells & Defects",
      diagramType: "solid-state",
      keywords: ["solid-state", "crystal", "lattice", "unit-cell", "defects"],
    },
    {
      title: "States of Matter",
      subtitle: "Gas Laws, Kinetic Theory & Real Gas Behavior",
      diagramType: "states-of-matter",
      keywords: ["gaseous-state", "ideal-gas", "real-gas", "van-der-waals", "liquid-state"],
    },
    {
      title: "Organic Chemistry Fundamentals",
      subtitle: "IUPAC Nomenclature & Isomerism",
      diagramType: "organic",
      keywords: ["organic", "iupac", "nomenclature", "isomerism", "functional-group", "hydrocarbon", "alkane", "alkene", "alkyne", "aromatic", "benzene"],
    },
    {
      title: "Inorganic Chemistry - Metals & Non-Metals",
      subtitle: "Extraction, Properties & Periodic Trends",
      diagramType: "inorganic",
      keywords: ["inorganic", "metals", "non-metals", "alkali", "alkaline-earth", "halogen", "noble-gas", "transition"],
    },
    {
      title: "Periodicity & Periodic Table",
      subtitle: "Element Classification & Periodic Trends",
      diagramType: "periodic",
      keywords: ["periodic", "table", "trends", "electronegativity", "ionization", "atomic-radius"],
    },
    {
      title: "Stoichiometry & Mole Concept",
      subtitle: "Law of Conservation of Mass & Chemical Calculations",
      diagramType: "stoichiometry",
      keywords: ["stoichiometry", "mole", "avogadro", "limiting-reagent", "percentage-composition"],
    },
    {
      title: "Surface Chemistry",
      subtitle: "Adsorption, Catalysis & Colloids",
      diagramType: "surface",
      keywords: ["surface", "adsorption", "catalysis", "colloid", "emulsion", "gel", "sol"],
    },
    {
      title: "Nuclear Chemistry",
      subtitle: "Radioactivity, Fission & Fusion",
      diagramType: "nuclear",
      keywords: ["nuclear", "radioactive", "decay", "fission", "fusion", "binding-energy"],
    },
    {
      title: "Applied Chemistry",
      subtitle: "Industrial Processes & Chemical Manufactures",
      diagramType: "applied",
      keywords: ["applied", "industry", "fertilizer", "polymer", "drug", "detergent", "hber", "contact", "solvay"],
    },
    {
      title: "Chemical Industry & Environmental Impact",
      subtitle: "Chemical Manufacturing Stages & Economics",
      diagramType: "chemical-industry",
      keywords: ["chemical-industry", "manufacture", "environmental-impact", "economics"],
    },
    {
      title: "Bio-Inorganic Chemistry",
      subtitle: "Metal Ions in Biological Systems",
      diagramType: "bio-inorganic",
      keywords: ["bio-inorganic", "metal-ions", "biological-systems", "nutrients"],
    },
  ],
  mathematics: [
    {
      title: "Calculus: Limits & Continuity",
      subtitle: "Limit Laws & Continuous Functions",
      diagramType: "limits",
      keywords: ["limits", "continuity", "limit-theorem", "squeeze-theorem"],
    },
    {
      title: "Derivatives & Differentiation",
      subtitle: "Fundamental Theorem of Differential Calculus",
      diagramType: "derivatives",
      keywords: ["derivative", "differentiation", "chain-rule", "implicit"],
    },
    {
      title: "Integration & Area Under Curve",
      subtitle: "Fundamental Theorem of Integral Calculus",
      diagramType: "integration",
      keywords: ["integral", "integration", "area-under-curve", "fundamental-theorem"],
    },
    {
      title: "Differential Equations",
      subtitle: "Formation & Solution Methods",
      diagramType: "differential-equations",
      keywords: ["differential-equation", "formation", "variable-separable"],
    },
    {
      title: "Algebra: Sets & Logic",
      subtitle: "Set Operations & Logical Equivalence",
      diagramType: "sets-logic",
      keywords: ["set", "logic", "set-theory", "union", "intersection", "complement"],
    },
    {
      title: "Algebra: Complex Numbers",
      subtitle: "Argand Plane & Complex Operations",
      diagramType: "complex-numbers",
      keywords: ["complex-number", "argand", "polar-form"],
    },
    {
      title: "Algebra: Quadratic Equations",
      subtitle: "Roots, Discriminant & Nature of Roots",
      diagramType: "quadratic",
      keywords: ["quadratic", "equation", "roots", "discriminant"],
    },
    {
      title: "Algebra: Matrices & Determinants",
      subtitle: "Matrix Operations & Cramer's Rule",
      diagramType: "matrices",
      keywords: ["matrix", "determinant", "inverse", "adjoint", "linear-equation"],
    },
    {
      title: "Trigonometry: Identities & Equations",
      subtitle: "General Solutions & Inverse Functions",
      diagramType: "trigonometry",
      keywords: ["trigonometry", "trigonometric", "identity", "inverse", "general-solution"],
    },
    {
      title: "Coordinate Geometry: Straight Lines",
      subtitle: "Point-Slope Form & Angle Between Lines",
      diagramType: "straight-line",
      keywords: ["straight-line", "slope", "point-slope", "angle-bisector"],
    },
    {
      title: "Coordinate Geometry: Conics",
      subtitle: "Parabola, Ellipse & Hyperbola",
      diagramType: "conics",
      keywords: ["parabola", "ellipse", "hyperbola", "conic", "focus", "directrix"],
    },
    {
      title: "Vector Algebra",
      subtitle: "Dot Product, Cross Product & Applications",
      diagramType: "vectors",
      keywords: ["vector", "dot-product", "cross-product", "scalar-triple", "work", "torque"],
    },
    {
      title: "Sequence & Series",
      subtitle: "Arithmetic & Geometric Progressions",
      diagramType: "sequence-series",
      keywords: ["sequence", "series", "arithmetic", "geometric", "progression"],
    },
    {
      title: "Probability & Statistics",
      subtitle: "Bayes' Theorem & Measures of Dispersion",
      diagramType: "probability",
      keywords: ["probability", "statistics", "bayes", "mean", "variance", "standard-deviation"],
    },
    {
      title: "Curve Sketching",
      subtitle: "Asymptotes, Tangents & Critical Points",
      diagramType: "curve-sketching",
      keywords: ["curve-sketching", "asymptote", "tangent", "normal", "critical-point"],
    },
    {
      title: "Numerical Methods",
      subtitle: "Root Finding & Numerical Integration",
      diagramType: "numerical",
      keywords: ["numerical", "integration-method", "root-finding", "newton-raphson"],
    },
    {
      title: "Engineering Mechanics",
      subtitle: "Statics, Dynamics & Force Systems",
      diagramType: "mechanics",
      keywords: ["mechanics", "statics", "dynamics", "force", "moment", "equilibrium"],
    },
    {
      title: "Mathematical Induction",
      subtitle: "Principle of Mathematical Induction",
      diagramType: "induction",
      keywords: ["mathematical-induction", "pigeonhole", "binomial-theorem"],
    },
    {
      title: "Mathematical Foundations",
      subtitle: "Core Mathematical Principles & Problem Solving",
      diagramType: "default-mathematics",
      keywords: ["math", "algebra", "geometry", "calculus", "theorem", "proof", "logic", "set", "real-number", "function", "domain", "range", "polynomial", "equation"],
    },
  ],
  nepali: [
    {
      title: "व्याकरण: वर्णमाला",
      subtitle: "स्वर र व्यञ्जन वर्णको वर्गीकरण",
      diagramType: "varnamala",
      keywords: ["swar", "vyanjan", "vargikaran", "varna"],
    },
    {
      title: "व्याकरण: शब्द विज्ञान",
      subtitle: "तद्धभ, आगन्तुक एवं देशज शब्दहरू",
      diagramType: "shabda",
      keywords: ["tadbhav", "aagantuk", "deeshaj", "videshaj", "shabda"],
    },
    {
      title: "व्याकरण: वचन र लिङ्ग",
      subtitle: "एकवचन, बहுவचन एवं पुल्लिङ्ग, स्त्रीलिङ्ग",
      diagramType: "vachana",
      keywords: ["vachana", "ling", "ekavachana", "bahuvachana"],
    },
    {
      title: "व्याकरण: карक",
      subtitle: "कर्म कारक,kartru卡rak etc.",
      diagramType: "karak",
      keywords: ["karak", "karma", "kartu", "sambandhana"],
    },
    {
      title: "संयुक्तपद एवं समास",
      subtitle: "द्वन्द्व, बहुब्रीही, तत्पुरुष समास",
      diagramType: "samasa",
      keywords: ["sandehipad", "samasa", "dvandva", "bahubrihi", "tatpurusha"],
    },
  ],
  physics: [
    // Default fallback for unmatched physics theorems
    {
      title: "Physical Principles & Laws",
      subtitle: "Fundamental Physics Concepts & Applications",
      diagramType: "default-physics",
      keywords: ["physics", "law", "principle", "force", "energy", "motion"],
    },
    {
      title: "Projectile Motion",
      subtitle: "Trajectory, Range & Maximum Height",
      diagramType: "projectile",
      keywords: ["projectile", "trajectory", "range", "maximum-height", "uniform-horizontal"],
    },
    {
      title: "Newton's Laws of Motion",
      subtitle: "First, Second & Third Law with Examples",
      diagramType: "newton-laws",
      keywords: ["newton", "laws-of-motion", "first-law", "second-law", "third-law", "inertia"],
    },
    {
      title: "Work-Energy Theorem",
      subtitle: "Kinetic Energy, Potential Energy & Conservation",
      diagramType: "work-energy",
      keywords: ["work-energy", "power", "conservation", "kinetic-energy", "potential-energy", "work-theorem"],
    },
    {
      title: "Circular Motion",
      subtitle: "Centripetal Force & Conical Pendulum",
      diagramType: "circular-motion",
      keywords: ["circular-motion", "centripetal", "conical-pendulum", "banking", "vertical-circle"],
    },
    {
      title: "Gravitation",
      subtitle: "Newton's Law of Gravitation & Escape Velocity",
      diagramType: "gravitation",
      keywords: ["gravitation", "gravity", "g", "escape-velocity", "orbit", "satellite", "newton-law-gravitation"],
    },
    {
      title: "Hooke's Law & Elasticity",
      subtitle: "Stress-Strain Relationship & Young's Modulus",
      diagramType: "elasticity",
      keywords: ["elasticity", "hooke-law", "stress", "strain", "young-modulus", "force-constant"],
    },
    {
      title: "Bernoulli's Equation",
      subtitle: "Fluid Dynamics & Pressure-Velocity Relation",
      diagramType: "bernoulli",
      keywords: ["bernoulli", "fluid", "viscosity", "surface-tension", "capillarity"],
    },
    {
      title: "Heat & Thermodynamics",
      subtitle: "Calorimetry, Thermal Expansion & Heat Transfer",
      diagramType: "heat-thermo",
      keywords: ["heat", "temperature", "thermal-expansion", "calorimetry", "newton-law-cooling", "first-law"],
    },
    {
      title: "Ideal Gas & Kinetic Theory",
      subtitle: "Gas Laws & Molecular Properties",
      diagramType: "ideal-gas",
      keywords: ["ideal-gas", "kinetic-theory", "gas-laws", "molecular-properties", "avogadro"],
    },
    {
      title: "Reflection at Curved Mirrors",
      subtitle: "Mirror Formula & Magnification",
      diagramType: "mirror",
      keywords: ["mirror", "reflection", "mirror-formula", "magnification", "real-image", "virtual-image"],
    },
    {
      title: "Refraction at Plane Surfaces",
      subtitle: "Snell's Law & Total Internal Reflection",
      diagramType: "refraction-plane",
      keywords: ["refraction", "snell-law", "total-internal-reflection", "critical-angle"],
    },
    {
      title: "Lens Maker's Formula",
      subtitle: "Thin Lens Equation & Power of Lens",
      diagramType: "lens",
      keywords: ["lens", "lens-maker-formula", "power-of-lens", "angular-magnification"],
    },
    {
      title: "Dispersion & Chromatic Aberration",
      subtitle: "Prismatic Dispersion & Achromatic Combination",
      diagramType: "dispersion",
      keywords: ["dispersion", "prism", "chromatic-aberration", "achromatism", "dispersive-power"],
    },
    {
      title: "Electric Charges & Coulomb's Law",
      subtitle: "Electrostatic Force & Charge Quantization",
      diagramType: "electric-charges",
      keywords: ["electric-charges", "coulomb", "charge", "electrostatic-force", "charging-by-induction"],
    },
    {
      title: "Electric Field & Gauss's Law",
      subtitle: "Field Lines & Electric Flux",
      diagramType: "electric-field",
      keywords: ["electric-field", "field-lines", "gauss-law", "electric-flux", "point-charges"],
    },
    {
      title: "Potential & Potential Energy",
      subtitle: "Electric Potential Due to Point Charge",
      diagramType: "potential",
      keywords: ["potential", "potential-difference", "potential-energy", "electron-volt", "equipotential"],
    },
    {
      title: "Capacitance & Capacitors",
      subtitle: "Parallel Plate Capacitor & Combination",
      diagramType: "capacitor",
      keywords: ["capacitance", "capacitor", "parallel-plate", "combination", "dielectric"],
    },
    {
      title: "Current Electricity & Ohm's Law",
      subtitle: "Drift Velocity, Resistance & Resistivity",
      diagramType: "current-electricity",
      keywords: ["current", "ohm", "resistance", "resistivity", "conductivity", "drift-velocity", "ohms-law"],
    },
    {
      title: "Magnetism & Electromagnetic Induction",
      subtitle: "Biot-Savart Law, Faraday's Law & Lenz's Law",
      diagramType: "magnetism",
      keywords: ["magnetism", "magnetic-field", "biot-savart", "ampere", "lorentz-force", "faraday", "lenz-law"],
    },
    {
      title: "Alternating Current",
      subtitle: "AC Generator, Impedance & Resonance",
      diagramType: "ac",
      keywords: ["alternating-current", "ac", "impedance", "resonance", "transformer"],
    },
    {
      title: "Electromagnetic Waves",
      subtitle: "Maxwell's Equations & EM Spectrum",
      diagramType: "em-waves",
      keywords: ["electromagnetic-waves", "em-wave", "maxwell", "spectrum"],
    },
    {
      title: "Photoelectric Effect",
      subtitle: "Einstein's Photoelectric Equation",
      diagramType: "photoelectric",
      keywords: ["photoelectric", "Compton", "wave-particle", "duality", "einstein-equation"],
    },
    {
      title: "Nuclear Physics",
      subtitle: "Mass-Energy Relation & Binding Energy",
      diagramType: "nuclear",
      keywords: ["nuclear", "nucleus", "radioactivity", "decay", "binding-energy", "mass-energy", "fission", "fusion", "big-bang"],
    },
    {
      title: "Semiconductor Electronics",
      subtitle: "Energy Bands, Diodes & Transistors",
      diagramType: "semiconductor",
      keywords: ["semiconductor", "diode", "transistor", "logic-gate", "energy-band", "conductor", "insulator"],
    },
    {
      title: "Dimensions & Error Analysis",
      subtitle: "Dimensional Formula & Measurement Errors",
      diagramType: "dimensions",
      keywords: ["dimensions", "dimensional-analysis", "error", "measurement", "physical-quantity"],
    },
    {
      title: "Particle Physics & Recent Trends",
      subtitle: "Quarks, Leptons, Dark Matter & Black Holes",
      diagramType: "particle-physics",
      keywords: ["particle-physics", "quark", "lepton", "dark-matter", "black-hole", "recent-trends"],
    },
    {
      title: "Simple Harmonic Motion",
      subtitle: "Oscillations, Spring-Mass System & Pendulum",
      diagramType: "shm",
      keywords: ["simple-harmonic", "oscillation", "spring-mass", "pendulum", "restoring-force"],
    },
    {
      title: "Wave Optics",
      subtitle: "Interference, Diffraction & Polarization",
      diagramType: "wave-optics",
      keywords: ["interference", "diffraction", "polarization", "yDSE", "slit", "wavefront"],
    },
    {
      title: "Vector Addition Laws",
      subtitle: "Triangle, Parallelogram & Polygon Laws",
      diagramType: "vectors",
      keywords: ["vectors", "triangle-law", "parallelogram-law", "polygon-law", "vector-addition"],
    },
    {
      title: "Linear Momentum & Impulse",
      subtitle: "Conservation of Momentum",
      diagramType: "momentum",
      keywords: ["momentum", "impulse", "collision", "conservation"],
    },
  ],
};

export function getVisualSchema(topicSlug: string, topicTitle: string, unitId?: string): VisualSchema | null {
  const slug = (topicSlug || "").toLowerCase();
  const title = (topicTitle || "").toLowerCase();
  const unit = (unitId || "").toLowerCase();
  
  // Determine which subject this belongs to
  const subjectKeywords = ["biology", "chemistry", "mathematics", "nepali", "physics"];
  let subjectMatch = null;
  for (const k of subjectKeywords) {
    if (slug.includes(k) || title.includes(k) || (unit && unit.includes(k))) {
      subjectMatch = k;
      break;
    }
  }
  
  // First try: match within the same subject
  if (subjectMatch && VISUAL_SCHEMAS[subjectMatch]) {
    for (const schema of VISUAL_SCHEMAS[subjectMatch]) {
      if (schema.keywords.some(k => slug.includes(k) || title.includes(k))) {
        return schema;
      }
    }
  }
  
  // Second try: match any subject
  for (const schemas of Object.values(VISUAL_SCHEMAS)) {
    for (const schema of schemas) {
      if (schema.keywords.some(k => slug.includes(k) || title.includes(k))) {
        return schema;
      }
    }
  }
  
  // Last resort: return the default/fallback schema of any subject
  const fallbackSubject = subjectMatch || Object.keys(VISUAL_SCHEMAS)[0];
  const fallbackSchemas = VISUAL_SCHEMAS[fallbackSubject];
  if (fallbackSchemas && fallbackSchemas.length > 0) {
    // Return the first one (which should be the default fallback)
    return fallbackSchemas[0];
  }
  
  return null;
}
