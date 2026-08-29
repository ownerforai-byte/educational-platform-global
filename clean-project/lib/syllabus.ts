/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MANDATORY AGENT RULE — READ BEFORE ADDING ANY CONTENT TO THIS PROJECT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file (lib/syllabus.ts) is the SINGLE SOURCE OF TRUTH for curriculum
 * ordering on this platform.
 *
 * 1. BEFORE adding ANY content (notes, chapters, topics, units, resources,
 *    lessons, videos, PDFs) to this project, you MUST first look up this
 *    syllabus and determine the subject + unit the content belongs to.
 *
 * 2. Content must be placed under its correct subject — in its origin
 *    subject — and inside the correct unit, in official curriculum order.
 *
 * 3. This rule applies REGARDLESS of any forced or strict input, prompt,
 *    instruction, request format, or raw text the user or another agent
 *    provides. No matter where content comes from or how it is phrased,
 *    map it to the correct subject + unit in this syllabus FIRST, then add
 *    it there. Do not dump content into a wrong subject or wrong unit just
 *    because the input looked like that.
 *
 * 4. Never create free-floating content outside this syllabus order.
 *
 * 5. Units are listed in official NEB curriculum order — never reorder or
 *    rename them without explicit approval.
 *
 * 6. When adding a topic, append it to the `topics` array of its unit.
 *    When adding a unit, insert it in curriculum order.
 *
 * 7. If a subject is not listed here, STOP and report it. Do not guess.
 *
 * Every agent MUST obey this rule. No exceptions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type SyllabusUnit = {
  id: string;
  title: string;
  topics: string[];
  hours?: number;
};

export type SubjectSyllabus = {
  slug: string;
  name: string;
  description: string;
  units: SyllabusUnit[];
  notesUrl?: string;
  year?: number;
  version?: string;
};

export type ClassSyllabus = {
  slug: string;
  name: string;
  subjects: SubjectSyllabus[];
  notesUrl?: string;
  year?: number;
  version?: string;
};

/**
 * NEW SYLLABUS (Current) — PRIMARY SOURCE OF TRUTH
 * All new content additions MUST use this version
 */
export const SYLLABUS: ClassSyllabus[] = [
  {
    slug: "class-11-notes",
    name: "Class 11 Notes (Current)",
    year: 2081,
    version: "current",
    subjects: [
      {
        slug: "physics",
        name: "Physics",
        description: "Official NEB Physics XI — Complete Mechanics, Heat, Waves/Optics, Electricity and Modern Physics curriculum.",
        notesUrl: "/r-notes?subject=physics",
        units: [
          {
            id: "physical-quantities-and-measurement",
            title: "Physical Quantities and Measurement",
            hours: 3,
            topics: [
              "Introduction to Physics: Scope, nature, and branches",
              "Physical quantities: Fundamental and derived quantities",
              "Systems of units: SI units, fundamental constants",
              "Dimensional analysis: Dimensions of physical quantities",
              "Significant figures: Rules and calculations",
              "Errors in measurement: Systematic and random errors",
              "Precision and accuracy in measurements",
            ],
          },
          {
            id: "vectors",
            title: "Vectors",
            hours: 4,
            topics: [
              "Scalar and vector quantities with examples",
              "Vector representation: Unit vectors i, j, k",
              "Triangle law of vector addition",
              "Parallelogram law of vector addition",
              "Polygon law of vector addition",
              "Resolution of vectors into components",
              "Unit vectors and their applications",
              "Scalar (dot) product: A·B = |A||B|cos θ",
              "Vector (cross) product: A×B = |A||B|sin θ n̂",
              "Applications: Work, torque, angular momentum",
            ],
          },
          {
            id: "kinematics",
            title: "Kinematics",
            hours: 5,
            topics: [
              "Motion in one dimension: Position, displacement, distance",
              "Velocity: Average and instantaneous velocity",
              "Acceleration: Average and instantaneous acceleration",
              "Equations of motion (kinematic equations) derivation",
              "Relative velocity in one and two dimensions",
              "Free fall motion: Acceleration due to gravity (g = 9.8 m/s²)",
              "Projectile motion: Time of flight, maximum height, range",
              "Graphical representation: x-t, v-t, a-t graphs",
              "Applications: Horizontal projection, inclined plane",
            ],
          },
          {
            id: "laws-of-motion",
            title: "Laws of Motion",
            hours: 6,
            topics: [
              "Newton's First Law: Law of inertia",
              "Newton's Second Law: F = ma, derivation from momentum",
              "Newton's Third Law: Action-reaction pairs",
              "Impulse and momentum: J = Δp = FΔt",
              "Conservation of linear momentum",
              "Friction: Static, kinetic, limiting friction",
              "Coefficient of friction: μ = f/N",
              "Free body diagrams (FBD): Steps and examples",
              "Applications: Pulley systems, inclined planes",
              "Atwood machine: Acceleration and tension",
            ],
          },
          {
            id: "work-energy-power",
            title: "Work, Energy and Power",
            hours: 6,
            topics: [
              "Work done by constant force: W = F·d·cos θ",
              "Work done by variable force: W = ∫F dx",
              "Kinetic energy: KE = ½mv²",
              "Potential energy: PE = mgh, elastic PE = ½kx²",
              "Work-Energy Theorem: W = ΔKE",
              "Conservation of mechanical energy",
              "Conservative and non-conservative forces",
              "Power: P = W/t = F·v",
              "Collisions: Elastic and inelastic",
              "Coefficient of restitution: e = (v₂-v₁)/(u₁-u₂)",
            ],
          },
          {
            id: "circular-motion",
            title: "Circular Motion",
            hours: 6,
            topics: [
              "Angular displacement: θ = s/r",
              "Angular velocity: ω = dθ/dt",
              "Angular acceleration: α = dω/dt",
              "Relation between linear and angular quantities: v = rω, a = rα",
              "Centripetal acceleration: a_c = v²/r = ω²r",
              "Centripetal force: F_c = mv²/r",
              "Conical pendulum: T = mg/cos θ",
              "Motion in vertical circle: Tension at different points",
              "Banking of roads: tan θ = v²/rg",
            ],
          },
          {
            id: "gravitation",
            title: "Gravitation",
            hours: 10,
            topics: [
              "Newton's Law of Universal Gravitation: F = GMm/r²",
              "Gravitational field strength: g = GM/r²",
              "Variation of g with altitude: g' = g(1 - 2h/R)",
              "Variation of g with depth: g' = g(1 - d/R)",
              "Gravitational potential: V = -GM/r",
              "Gravitational potential energy: U = -GMm/r",
              "Escape velocity: v_e = √(2gR)",
              "Orbital velocity: v_o = √(gR)",
              "Geostationary satellites: h = 36000 km",
              "GPS and applications of satellites",
            ],
          },
          {
            id: "elasticity",
            title: "Elasticity",
            hours: 5,
            topics: [
              "Hooke's Law: F = kx",
              "Stress: σ = F/A",
              "Strain: ε = ΔL/L",
              "Young's modulus: Y = σ/ε",
              "Bulk modulus: B = -V(dP/dV)",
              "Shear modulus: η = F/A / Δx/L",
              "Poisson's ratio: ν = -ε_lateral/ε_longitudinal",
              "Elastic potential energy: U = ½kx²",
              "Stress-strain curve: Elastic limit, yield point, breaking point",
            ],
          },
          {
            id: "heat-and-temperature",
            title: "Heat and Temperature",
            hours: 3,
            topics: [
              "Temperature scales: Celsius, Fahrenheit, Kelvin",
              "Thermal equilibrium and Zeroth law of thermodynamics",
              "Molecular concept of heat and temperature",
              "Thermometers and their working principle",
              "Heat transfer: Conduction, convection, radiation",
            ],
          },
          {
            id: "thermal-expansion",
            title: "Thermal Expansion",
            hours: 4,
            topics: [
              "Linear expansion: ΔL = αL₀ΔT",
              "Superficial expansion: ΔA = βA₀ΔT",
              "Cubical expansion: ΔV = γV₀ΔT",
              "Relationship: α : β : γ = 1 : 2 : 3",
              "Anomalous expansion of water",
              "Dulong and Petit's method for liquid expansion",
            ],
          },
          {
            id: "quantity-of-heat",
            title: "Quantity of Heat",
            hours: 6,
            topics: [
              "Specific heat capacity: Q = mcΔT",
              "Latent heat: Q = mL",
              "Specific latent heat of fusion and vaporization",
              "Calorimetry: Principle of mixtures",
              "Newton's law of cooling: dQ/dt = -k(T - T₀)",
              "Triple point of water: 273.16 K",
            ],
          },
          {
            id: "rate-of-heat-flow",
            title: "Rate of Heat Flow",
            hours: 5,
            topics: [
              "Thermal conductivity: Q/t = kAΔT/L",
              "Stefan-Boltzmann law: P = σAT⁴",
              "Black body radiation",
              "Wien's displacement law: λ_max T = b",
              "Kirchhoff's law of radiation",
              "Convection currents",
            ],
          },
          {
            id: "ideal-gas",
            title: "Ideal Gas",
            hours: 8,
            topics: [
              "Gas laws: Boyle's, Charles's, Gay-Lussac's",
              "Ideal gas equation: PV = nRT",
              "Universal gas constant: R = 8.314 J/(mol·K)",
              "Kinetic theory of gases: Postulates",
              "Pressure exerted by gas: P = ⅓ρv²_rms",
              "Root mean square speed: v_rms = √(3RT/M)",
              "Average kinetic energy: KE = ³/₂kT",
              "Degrees of freedom and equipartition theorem",
              "Heat capacities: C_p and C_v, γ = C_p/C_v",
            ],
          },
          {
            id: "reflection-at-curved-mirror",
            title: "Reflection at Curved Mirror",
            hours: 2,
            topics: [
              "Mirror formula: 1/f = 1/v + 1/u",
              "Sign conventions for mirrors",
              "Magnification: m = -v/u = h_i/h_o",
              "Ray diagrams for concave and convex mirrors",
            ],
          },
          {
            id: "refraction-at-plane-surfaces",
            title: "Refraction at Plane Surfaces",
            hours: 4,
            topics: [
              "Snell's law: n₁sin θ₁ = n₂sin θ₂",
              "Refractive index: n = c/v",
              "Lateral shift in parallel slab",
              "Total internal reflection: Critical angle",
              "Apparent depth and real depth",
            ],
          },
          {
            id: "refraction-through-prisms",
            title: "Refraction through Prisms",
            hours: 4,
            topics: [
              "Prism formula: μ = sin((A+δ_m)/2) / sin(A/2)",
              "Minimum deviation condition",
              "Small angle prism: δ = (μ-1)A",
              "Dispersion and spectrum",
            ],
          },
          {
            id: "lenses",
            title: "Lenses",
            hours: 3,
            topics: [
              "Thin lens formula: 1/f = 1/v - 1/u",
              "Lens maker's formula: 1/f = (μ-1)(1/R₁ - 1/R₂)",
              "Power of lens: P = 1/f (in diopters)",
              "Combination of lenses: P = P₁ + P₂",
            ],
          },
          {
            id: "dispersion",
            title: "Dispersion",
            hours: 3,
            topics: [
              "Dispersion of white light by prism",
              "Dispersive power: ω = (μ_v - μ_r)/(μ_y - 1)",
              "Chromatic aberration",
              "Achromatic doublet: Combination of convex and concave lenses",
            ],
          },
          {
            id: "electric-charges",
            title: "Electric Charges",
            hours: 3,
            topics: [
              "Electric charge: Properties and conservation",
              "Coulomb's law: F = kq₁q₂/r²",
              "Superposition principle",
              "Charging by induction",
            ],
          },
          {
            id: "electric-field",
            title: "Electric Field",
            hours: 3,
            topics: [
              "Electric field: E = F/q",
              "Electric field lines: Properties",
              "Gauss's law: Φ = Q_enclosed/ε₀",
              "Applications: Field of point charge, line charge, sheet",
            ],
          },
          {
            id: "potential-potential-energy",
            title: "Potential, Potential Difference and Potential Energy",
            hours: 4,
            topics: [
              "Electric potential: V = kQ/r",
              "Potential difference: ΔV = W/q",
              "Electric potential energy: U = qV",
              "Electron volt (eV): 1 eV = 1.6 × 10⁻¹⁹ J",
              "Equipotential surfaces",
              "Potential gradient: E = -dV/dx",
            ],
          },
          {
            id: "capacitor",
            title: "Capacitor",
            hours: 5,
            topics: [
              "Capacitance: C = Q/V",
              "Parallel plate capacitor: C = ε₀A/d",
              "Effect of dielectric: C = κC₀",
              "Combination of capacitors: Series and parallel",
              "Energy stored: U = ½CV² = ½QV",
              "Polarization and displacement",
            ],
          },
          {
            id: "dc-circuits",
            title: "DC Circuits",
            hours: 10,
            topics: [
              "Electric current: I = Q/t",
              "Drift velocity: v_d = I/neA",
              "Ohm's law: V = IR",
              "Resistance and resistivity: R = ρL/A",
              "Series and parallel combinations",
              "Kirchhoff's laws: Junction and loop rules",
              "EMF and internal resistance: V = ε - Ir",
              "Potentiometer: Principle and applications",
              "Wheatstone bridge",
              "Energy and power: P = VI = I²R = V²/R",
            ],
          },
          {
            id: "magnetic-effects",
            title: "Magnetic Effects of Current",
            hours: 6,
            topics: [
              "Oersted's experiment",
              "Biot-Savart law",
              "Magnetic field due to straight wire: B = μ₀I/2πr",
              "Magnetic field due to circular loop",
              "Solenoid: B = μ₀nI",
              "Force on moving charge: F = qvB sin θ",
              "Force on current-carrying conductor: F = BIl sin θ",
            ],
          },
          {
            id: "electromagnetic-induction",
            title: "Electromagnetic Induction",
            hours: 5,
            topics: [
              "Faraday's laws of electromagnetic induction",
              "Lenz's law: Conservation of energy",
              "Motional EMF: ε = Blv",
              "Self-inductance: L = Φ/I",
              "Mutual inductance: M = Φ₂/I₁",
              "AC generator principle",
              "Transformer: V_s/V_p = N_s/N_p",
            ],
          },
          {
            id: "nuclear-physics",
            title: "Nuclear Physics",
            hours: 4,
            topics: [
              "Nuclear structure: Protons, neutrons, nucleons",
              "Mass defect and binding energy: BE = Δmc²",
              "Binding energy per nucleon curve",
              "Nuclear fission: Uranium-235",
              "Nuclear fusion: Hydrogen bombs, solar energy",
              "Radioactivity: Alpha, beta, gamma decay",
              "Half-life and decay constant: T₁/₂ = ln2/λ",
            ],
          },
          {
            id: "semiconductors",
            title: "Semiconductors",
            hours: 3,
            topics: [
              "Energy bands: Conduction, valence, forbidden gap",
              "Conductors, insulators, semiconductors",
              "Intrinsic and extrinsic semiconductors",
              "p-n junction diode",
              "Forward and reverse bias",
              "Rectifiers: Half-wave and full-wave",
            ],
          },
          {
            id: "modern-physics",
            title: "Modern Physics",
            hours: 8,
            topics: [
              "Photoelectric effect: Einstein's equation",
              "Wave-particle duality: de Broglie wavelength",
              "Heisenberg's uncertainty principle",
              "Bohr's atomic model: Postulates",
              "Hydrogen spectrum: Rydberg formula",
              "Laser: Principle and applications",
              "Particle physics: Quarks, leptons",
            ],
          },
          {
            id: "communication-systems",
            title: "Communication Systems",
            hours: 4,
            topics: [
              "Elements of communication system",
              "Amplitude modulation (AM)",
              "Frequency modulation (FM)",
              "Bandwidth and noise",
            ],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "Official NEB Chemistry XI — General/Physical, Inorganic, Organic and Applied chemistry.",
        notesUrl: "/r-notes?subject=chemistry",
        units: [
          {
            id: "foundation-and-fundamentals",
            title: "Foundation and Fundamentals",
            hours: 2,
            topics: [
              "General introduction of chemistry",
              "Importance and scope of chemistry",
              "Basic concepts: atoms, molecules, relative masses",
              "Atomic mass unit (amu), radicals, molecular formula",
              "Percentage composition from molecular formula",
            ],
          },
          {
            id: "stoichiometry",
            title: "Stoichiometry",
            hours: 8,
            topics: [
              "Dalton's atomic theory and its postulates",
              "Laws of stoichiometry: Conservation of mass, definite proportions, multiple proportions",
              "Avogadro's law and deductions",
              "Mole concept and calculations",
              "Limiting reactant and excess reactant",
              "Theoretical yield and percentage yield",
              "Empirical and molecular formula calculations",
            ],
          },
          {
            id: "atomic-structure",
            title: "Atomic Structure",
            hours: 8,
            topics: [
              "Rutherford's atomic model and limitations",
              "Bohr's atomic model: Postulates and applications",
              "Hydrogen spectrum",
              "Defects of Bohr's theory",
              "de Broglie's wave equation",
              "Heisenberg's Uncertainty Principle",
              "Quantum numbers: n, l, m_l, m_s",
              "s and p orbital shapes",
              "Aufbau principle, Pauli exclusion, Hund's rule",
              "Electronic configurations (Z = 1-30)",
            ],
          },
          {
            id: "periodic-table",
            title: "Periodic Table",
            hours: 5,
            topics: [
              "Modern periodic law",
              "Structure of periodic table: Groups and periods",
              "s, p, d, f blocks classification",
              "Periodic trends: Atomic radius, ionization energy, electronegativity",
              "IUPAC classification",
            ],
          },
          {
            id: "chemical-bonding",
            title: "Chemical Bonding",
            hours: 9,
            topics: [
              "Ionic bond: Formation and properties",
              "Covalent bond: Formation and properties",
              "Coordinate covalent bond",
              "Lewis dot structures",
              "Resonance",
              "VSEPR theory and molecular shapes",
              "Hybridization: sp, sp², sp³",
              "Hydrogen bonding and Vander Waals forces",
            ],
          },
          {
            id: "oxidation-reduction",
            title: "Oxidation and Reduction",
            hours: 5,
            topics: [
              "Oxidation and reduction concepts",
              "Oxidation number rules",
              "Balancing redox reactions",
              "Electrolysis: Faraday's laws",
            ],
          },
          {
            id: "states-of-matter",
            title: "States of Matter",
            hours: 8,
            topics: [
              "Gas laws: Boyle's, Charles's, Avogadro's",
              "Ideal gas equation: PV = nRT",
              "Kinetic theory of gases",
              "Real gases and van der Waals equation",
              "Liquid and solid states",
            ],
          },
          {
            id: "chemical-equilibrium",
            title: "Chemical Equilibrium",
            hours: 3,
            topics: [
              "Dynamic equilibrium",
              "Law of mass action",
              "Equilibrium constants Kc and Kp",
              "Le Chatelier's principle",
            ],
          },
          {
            id: "non-metals",
            title: "Chemistry of Non-Metals",
            hours: 21,
            topics: [
              "Hydrogen: Isotopes, heavy water",
              "Oxygen: Allotropes, ozone",
              "Nitrogen and its compounds: NH₃, HNO₃",
              "Halogens: Cl₂, Br₂, I₂ properties",
              "Carbon: Allotropes, CO, CO₂",
              "Sulphur: H₂S, SO₂, H₂SO₄",
              "Phosphorus: Allotropes, PH₃",
            ],
          },
          {
            id: "metals",
            title: "Chemistry of Metals",
            hours: 10,
            topics: [
              "Metallurgy principles",
              "Alkali metals: Sodium extraction and compounds",
              "Alkaline earth metals",
              "Metallic bonding",
            ],
          },
          {
            id: "bio-inorganic",
            title: "Bio-inorganic Chemistry",
            hours: 3,
            topics: [
              "Essential metal ions in biology",
              "Ion pumps",
              "Metal toxicity",
            ],
          },
          {
            id: "organic-basics",
            title: "Basic Concepts of Organic Chemistry",
            hours: 6,
            topics: [
              "Tetra-covalency and catenation",
              "Classification and nomenclature",
              "IUPAC rules",
              "Structural formulas",
            ],
          },
          {
            id: "organic-mechanism",
            title: "Fundamental Principles of Organic Chemistry",
            hours: 10,
            topics: [
              "Lassaigne's test",
              "Isomerism: Structural and stereo",
              "Inductive and resonance effects",
              "Reaction mechanisms",
            ],
          },
          {
            id: "hydrocarbons",
            title: "Hydrocarbons",
            hours: 8,
            topics: [
              "Alkanes: Preparation and properties",
              "Alkenes: Markovnikov's rule",
              "Alkynes: Acidic nature",
              "Test of unsaturation",
            ],
          },
          {
            id: "aromatic",
            title: "Aromatic Hydrocarbons",
            hours: 6,
            topics: [
              "Hückel's rule",
              "Benzene structure and reactions",
              "Electrophilic substitution",
            ],
          },
          {
            id: "applied-chemistry",
            title: "Applied Chemistry",
            hours: 4,
            topics: [
              "Chemical industry",
              "Environmental impact",
            ],
          },
          {
            id: "industrial-chemistry",
            title: "Modern Chemical Manufactures",
            hours: 11,
            topics: [
              "Haber's process: Ammonia",
              "Ostwald's process: Nitric acid",
              "Contact process: Sulphuric acid",
              "Solvay process: Sodium carbonate",
              "Fertilizers: Urea production",
            ],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "Official NEB Mathematics XI — Algebra, Trigonometry, Calculus, Vectors and Statistics.",
        notesUrl: "/r-notes?subject=mathematics",
        units: [
          {
            id: "logic-and-sets",
            title: "Logic and Set Theory",
            hours: 8,
            topics: [
              "Statements and logical connectives",
              "Truth tables",
              "Set operations: Union, intersection, complement",
              "Venn diagrams",
            ],
          },
          {
            id: "real-numbers",
            title: "Real Numbers",
            hours: 4,
            topics: [
              "Number system",
              "Absolute value",
              "Interval notation",
            ],
          },
          {
            id: "functions",
            title: "Functions",
            hours: 12,
            topics: [
              "Domain and range",
              "Composite and inverse functions",
              "Graph sketching",
              "Even and odd functions",
            ],
          },
          {
            id: "sequences-series",
            title: "Sequence and Series",
            hours: 12,
            topics: [
              "Arithmetic progression",
              "Geometric progression",
              "Harmonic progression",
              "Sum of series",
            ],
          },
          {
            id: "matrices",
            title: "Matrices and Determinants",
            hours: 12,
            topics: [
              "Matrix operations",
              "Determinants",
              "Adjoint and inverse",
              "System of equations",
            ],
          },
          {
            id: "quadratic-equations",
            title: "Quadratic Equations",
            hours: 10,
            topics: [
              "Nature of roots",
              "Roots and coefficients",
              "Formation of equations",
            ],
          },
          {
            id: "complex-numbers",
            title: "Complex Numbers",
            hours: 8,
            topics: [
              "Algebra of complex numbers",
              "Modulus and conjugate",
              "De Moivre's theorem",
              "nth roots of unity",
            ],
          },
          {
            id: "trigonometry",
            title: "Trigonometry",
            hours: 12,
            topics: [
              "Inverse trigonometric functions",
              "Trigonometric equations",
              "General solutions",
            ],
          },
          {
            id: "analytic-geometry",
            title: "Analytic Geometry",
            hours: 20,
            topics: [
              "Straight line equations",
              "Pair of straight lines",
              "Coordinates in space",
            ],
          },
          {
            id: "vectors-11",
            title: "Vectors",
            hours: 12,
            topics: [
              "Collinear and coplanar vectors",
              "Linear combination",
              "Dot and cross products",
            ],
          },
          {
            id: "statistics",
            title: "Statistics and Probability",
            hours: 12,
            topics: [
              "Measures of dispersion",
              "Standard deviation and variance",
              "Probability theory",
            ],
          },
          {
            id: "limits",
            title: "Limits and Continuity",
            hours: 12,
            topics: [
              "Limit of a function",
              "Indeterminate forms",
              "Continuity",
            ],
          },
          {
            id: "derivatives",
            title: "Derivatives",
            hours: 16,
            topics: [
              "Definition from first principles",
              "Differentiation rules",
              "Chain rule",
              "Implicit differentiation",
            ],
          },
          {
            id: "applications-derivatives",
            title: "Applications of Derivatives",
            hours: 12,
            topics: [
              "Rate of change",
              "Maxima and minima",
              "Tangent and normal",
              "Approximation",
            ],
          },
          {
            id: "integration",
            title: "Integration",
            hours: 16,
            topics: [
              "Basic integrals",
              "Substitution method",
              "Integration by parts",
              "Definite integrals",
            ],
          },
          {
            id: "differential-equations",
            title: "Differential Equations",
            hours: 8,
            topics: [
              "Formation of DE",
              "Separation of variables",
              "Linear DE",
            ],
          },
        ],
      },
      {
        slug: "biology",
        name: "Biology",
        description: "Official NEB Biology XI — Botany and Zoology with complete laboratory and theory.",
        notesUrl: "/r-notes?subject=biology",
        units: [
          {
            id: "introduction",
            title: "Introduction to Biology",
            hours: 2,
            topics: [
              "Scope and nature of biology",
              "Branches of biology",
              "Biology and other sciences",
            ],
          },
          {
            id: "biomolecules",
            title: "Biomolecules",
            hours: 10,
            topics: [
              "Carbohydrates: Classification and functions",
              "Proteins: Structure and function",
              "Lipids: Types and importance",
              "Nucleic acids: DNA and RNA",
              "Enzymes: Classification and mechanism",
              "Water: Properties and biological significance",
            ],
          },
          {
            id: "cell-biology",
            title: "Cell Biology",
            hours: 15,
            topics: [
              "Cell theory",
              "Prokaryotic vs eukaryotic cells",
              "Cell organelles",
              "Cell division: Mitosis and Meiosis",
            ],
          },
          {
            id: "microbiology",
            title: "Introductory Microbiology",
            hours: 5,
            topics: [
              "Monera: Bacterial cell structure",
              "Virus: Structure and importance",
              "Biotechnology applications",
            ],
          },
          {
            id: "floral-diversity",
            title: "Floral Diversity",
            hours: 30,
            topics: [
              "Five kingdom classification",
              "Fungi: Classification and examples",
              "Algae: Classification",
              "Bryophytes and Pteridophytes",
              "Gymnosperms and Angiosperms",
              "Taxonomy and families",
            ],
          },
          {
            id: "ecology",
            title: "Ecology",
            hours: 11,
            topics: [
              "Ecosystem structure and function",
              "Food chain and food web",
              "Biogeochemical cycles",
              "Ecological succession",
              "Ecological imbalances",
            ],
          },
          {
            id: "evolution",
            title: "Evolutionary Biology",
            hours: 15,
            topics: [
              "Origin of life theories",
              "Evidence of evolution",
              "Theories of evolution",
              "Human evolution",
            ],
          },
          {
            id: "faunal-diversity",
            title: "Faunal Diversity",
            hours: 34,
            topics: [
              "Protista and Protozoa",
              "Animal classification",
              "Invertebrate phyla",
              "Vertebrate phyla",
              "Earthworm and Frog anatomy",
            ],
          },
          {
            id: "environment",
            title: "Biota and Environment",
            hours: 10,
            topics: [
              "Animal adaptation",
              "Animal behavior",
              "Environmental pollution",
            ],
          },
          {
            id: "conservation",
            title: "Conservation Biology",
            hours: 3,
            topics: [
              "Biodiversity conservation",
              "Protected areas",
              "Endangered species",
            ],
          },
        ],
      },
      {
        slug: "english",
        name: "English",
        description: "English XI — Language, literature, composition and critical thinking skills.",
        notesUrl: "/r-notes?subject=english",
        units: [
          {
            id: "language-grammar",
            title: "Language and Grammar",
            hours: 20,
            topics: [
              "Parts of speech",
              "Tenses and usage",
              "Voice and mood",
              "Sentence structure",
              "Vocabulary building",
            ],
          },
          {
            id: "reading-comprehension",
            title: "Reading and Comprehension",
            hours: 15,
            topics: [
              "Reading strategies",
              "Comprehension skills",
              "Literary appreciation",
            ],
          },
          {
            id: "writing",
            title: "Writing and Composition",
            hours: 20,
            topics: [
              "Essay writing",
              "Letter writing (formal and informal)",
              "Paragraph development",
              "Summary writing",
            ],
          },
          {
            id: "critical-thinking",
            title: "Critical Thinking",
            hours: 15,
            topics: [
              "Analysis and interpretation",
              "Argumentation",
              "Literary criticism",
            ],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "नेपाली XI — भाषा, व्यारण, साहित्य, लेखन र सस्कृतिक अध्ययन।",
        notesUrl: "/r-notes?subject=nepali",
        units: [
          {
            id: "bhasha-vyakaran",
            title: "भाषा र व्यारण",
            hours: 20,
            topics: [
              "व्यारणका नियमहरू",
              "शब्द जगत",
              "ववाक्य संरचनआ",
            ],
          },
          {
            id: "sahitya",
            title: "साहित्य अध्ययन",
            hours: 25,
            topics: [
              "सहित्यिक रूपहरू",
              "कविता, गद्यों, नाटक",
              "सामाजिक संहित्य",
            ],
          },
          {
            id: "lekhan",
            title: "लेंखन र रचना",
            hours: 20,
            topics: [
              "निबन्ध लेंखन",
              "पत्र लेंखन",
              "अनुवाद",
            ],
          },
          {
            id: "sanskriti",
            title: "संस्कृतिक अध्ययन",
            hours: 15,
            topics: [
              "नेपाली संस्कृतिक परिचय",
              "सांस्कृतिक विरासत",
            ],
          },
        ],
      },
    ],
  },
];

/**
 * OLD SYLLABUS (2078) — FOR REFERENCE AND COMPARISON
 */
export const SYLLABUS_OLD: ClassSyllabus[] = [
  {
    slug: "class-11-notes-old",
    name: "Class 11 Notes (2078 - Legacy)",
    year: 2078,
    version: "old",
    subjects: [
      {
        slug: "physics",
        name: "Physics",
        description: "NEB Physics XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=physics",
        units: [
          {
            id: "physical-quantities",
            title: "Physical Quantities",
            hours: 3,
            topics: ["Units", "Dimensions", "Significant figures"],
          },
          {
            id: "vectors",
            title: "Vectors",
            hours: 4,
            topics: ["Vector addition", "Components", "Dot and cross product"],
          },
          {
            id: "kinematics",
            title: "Kinematics",
            hours: 5,
            topics: ["Equations of motion", "Projectile motion", "Relative velocity"],
          },
          {
            id: "laws-of-motion",
            title: "Laws of Motion",
            hours: 6,
            topics: ["Newton's laws", "Friction", "Pulley systems"],
          },
        ],
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        description: "NEB Chemistry XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=chemistry",
        units: [
          {
            id: "stoichiometry",
            title: "Stoichiometry",
            hours: 8,
            topics: ["Mole concept", "Laws of stoichiometry"],
          },
          {
            id: "atomic-structure",
            title: "Atomic Structure",
            hours: 8,
            topics: ["Bohr's model", "Quantum numbers"],
          },
          {
            id: "chemical-bonding",
            title: "Chemical Bonding",
            hours: 9,
            topics: ["Ionic bond", "Covalent bond", "VSEPR theory"],
          },
        ],
      },
      {
        slug: "mathematics",
        name: "Mathematics",
        description: "NEB Mathematics XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=mathematics",
        units: [
          {
            id: "algebra",
            title: "Algebra",
            hours: 44,
            topics: ["Matrices", "Quadratic equations", "Complex numbers"],
          },
          {
            id: "trigonometry",
            title: "Trigonometry",
            hours: 12,
            topics: ["Inverse circular functions"],
          },
          {
            id: "calculus",
            title: "Calculus",
            hours: 40,
            topics: ["Limits", "Derivatives", "Integration"],
          },
        ],
      },
      {
        slug: "biology",
        name: "Biology",
        description: "NEB Biology XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=biology",
        units: [
          {
            id: "biomolecules",
            title: "Biomolecules",
            hours: 10,
            topics: ["Carbohydrates", "Proteins", "Lipids", "Nucleic acids"],
          },
          {
            id: "cell-biology",
            title: "Cell Biology",
            hours: 15,
            topics: ["Cell structure", "Cell division"],
          },
        ],
      },
      {
        slug: "english",
        name: "English",
        description: "English XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=english",
        units: [
          {
            id: "grammar",
            title: "Grammar",
            hours: 20,
            topics: ["Parts of speech", "Tenses"],
          },
          {
            id: "literature",
            title: "Literature",
            hours: 25,
            topics: ["Prose", "Poetry", "Drama"],
          },
        ],
      },
      {
        slug: "nepali",
        name: "Nepali",
        description: "Nepali XI (2078) — Legacy curriculum.",
        notesUrl: "/r-notes?subject=nepali",
        units: [
          {
            id: "vyakaran",
            title: "व्यारण",
            hours: 20,
            topics: ["शब्व जगत", "वाक्य संरचना"],
          },
          {
            id: "sahitya",
            title: "सहित्य",
            hours: 25,
            topics: ["काव्य", "गद्य", "नाटक"],
          },
        ],
      },
    ],
  },
];

export function getCurrentSyllabus(): ClassSyllabus[] {
  return SYLLABUS;
}

export function getOldSyllabus(): ClassSyllabus[] {
  return SYLLABUS_OLD;
}

export function findClassSyllabus(slug: string): ClassSyllabus | undefined {
  return SYLLABUS.find((c) => c.slug === slug);
}

export function findSubject(
  classSlug: string,
  subjectSlug: string
): SubjectSyllabus | undefined {
  const classData = findClassSyllabus(classSlug);
  if (!classData) return undefined;
  return classData.subjects.find((s) => s.slug === subjectSlug);
}

export default SYLLABUS;
