import type { LabCategory, LabStatus, LabType } from "./lab-types";

export interface LabMetadata {
  id: string;
  title: string;
  description?: string;
  category: LabCategory;
  type: LabType;
  status: LabStatus;
  color: string;
  unit?: string;
  creditCost?: number;
}

/**
 * Lightweight metadata list for labs (no 3D canvas or component imports).
 * Used by site-index, search, and directory routes to avoid dragging
 * the entire Three.js bundle and all WebGL shaders into non-lab pages.
 */
export const LAB_METADATA_LIST: LabMetadata[] = [
  {
    "id": "ph-3d-dynamics",
    "title": "Dynamics 3D",
    "description": "Inclined plane, friction, elastic collision, momentum conservation in 3D.",
    "category": "physics",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Dynamics"
  },
  {
    "id": "ph-3d-advanced",
    "title": "Physics 3D Advanced",
    "description": "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Modern Physics"
  },
  {
    "id": "ph-3d-quantum",
    "title": "Quantum 3D",
    "description": "Quantum mechanics visualizations including orbitals, probability distributions, and spin.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Quantum"
  },
  {
    "id": "ph-3d-wave",
    "title": "Wave Simulator 3D",
    "description": "Real-time 3D wave propagation with sine, cosine, and damped modes.",
    "category": "physics",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Waves"
  },
  {
    "id": "ph-3d-pendulum",
    "title": "Pendulum 3D",
    "description": "Pendulum with trail visualization and period calculations.",
    "category": "physics",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Oscillations"
  },
  {
    "id": "ph-3d-em",
    "title": "EM Wave 3D",
    "description": "Electromagnetic wave propagation with E and B field visualization.",
    "category": "physics",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: EM Waves"
  },
  {
    "id": "ph-3d-magnetic",
    "title": "Magnetic Field 3D",
    "description": "Bar magnet field lines and iron filings pattern.",
    "category": "physics",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Magnetism"
  },
  {
    "id": "ph-3d-vectors",
    "title": "Vector Addition 3D",
    "description": "Interactive 3D vectors — components, dot product, cross product.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "ph-3d-optics",
    "title": "Optics & Lens 3D",
    "description": "Ray diagrams for convex/concave lenses and mirrors with live lens equation.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-refraction",
    "title": "Refraction 3D",
    "description": "Snell's law visualization with total internal reflection.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-wave-suite",
    "title": "Wave Optics Suite 3D",
    "description": "Young's double slit, single-slit diffraction, and Brewster polarisation in interactive 3D.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-classic",
    "title": "Physics 3D Classic",
    "description": "Electric field, double pendulum, and gravitational field visualizers.",
    "category": "physics",
    "type": "3d",
    "status": "development",
    "color": "#3b82f6",
    "unit": "Unit: Classic"
  },
  {
    "id": "ph-th-kinematics",
    "title": "Kinematics Theory",
    "description": "Equations of motion, projectile motion, relative velocity theory.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ph-th-laws",
    "title": "Laws of Motion Theory",
    "description": "Newton's laws, friction, circular motion theory.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Dynamics"
  },
  {
    "id": "ph-th-work",
    "title": "Work & Energy Theory",
    "description": "Work-energy theorem, conservation of energy, power.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Work Energy"
  },
  {
    "id": "ph-th-grav",
    "title": "Gravitation Theory",
    "description": "Universal gravitation, gravitational potential, satellite motion.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-th-thermo",
    "title": "Thermodynamics Theory",
    "description": "Laws of thermodynamics, heat engines, entropy.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Thermo"
  },
  {
    "id": "ph-th-optics",
    "title": "Optics Theory",
    "description": "Reflection, refraction, lens formula, mirror equation.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-th-electro",
    "title": "Electrostatics Theory",
    "description": "Coulomb's law, electric field, potential, capacitance.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Electrostatics"
  },
  {
    "id": "ph-th-current",
    "title": "Current Electricity Theory",
    "description": "Ohm's law, circuits, Kirchhoff's laws.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Current"
  },
  {
    "id": "ph-th-emw",
    "title": "EM Waves Theory",
    "description": "Electromagnetic spectrum, wave properties, polarization.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: EM Waves"
  },
  {
    "id": "ph-th-modern",
    "title": "Modern Physics Theory",
    "description": "Photoelectric effect, atomic models, nuclear physics.",
    "category": "physics",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Modern"
  },
  {
    "id": "ph-calc-ohms",
    "title": "Ohm's Law Calculator",
    "description": "Calculate V, I, R with interactive controls.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Electricity"
  },
  {
    "id": "ph-calc-heat",
    "title": "Heat Calculator",
    "description": "Calorimetry, latent heat, thermal expansion.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "ph-calc-optics",
    "title": "Optics Lab",
    "description": "Reflection, refraction, lateral shift, prism dispersion.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-calc-projectile",
    "title": "Projectile Motion",
    "description": "Launch projectiles with adjustable velocity, angle, and gravity.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ai-tutor",
    "title": "Veer Lab Tutor",
    "description": "Get instant help with lab concepts. Veer explains, solves, and visualizes.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#f59e0b"
  },
  {
    "id": "advanced-circuit",
    "title": "Advanced Circuit Simulator",
    "description": "Build and test complex circuits with 50+ components.",
    "category": "physics",
    "type": "calculator",
    "status": "active",
    "color": "#f59e0b"
  },
  {
    "id": "ch-3d-periodic",
    "title": "Periodic Table 3D — All Blocks (CEE)",
    "description": "The full 118-element all-blocks periodic table with CEE question bank, reactions, ores and element data — the canonical table for the whole platform.",
    "category": "chemistry",
    "type": "3d",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Periodicity"
  },
  {
    "id": "ch-3d-advanced",
    "title": "Chemistry 3D Advanced",
    "description": "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.",
    "category": "chemistry",
    "type": "3d",
    "status": "new",
    "color": "#10b981",
    "unit": "Unit: Advanced"
  },
  {
    "id": "ch-3d-micro",
    "title": "Microscopy 3D",
    "description": "Atomic structure, electron orbitals, crystal lattice visualization.",
    "category": "chemistry",
    "type": "3d",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Microscopy"
  },
  {
    "id": "ch-th-atomic",
    "title": "Atomic Structure Theory",
    "description": "Bohr model, quantum numbers, electronic configuration.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Atomic"
  },
  {
    "id": "ch-th-bonding",
    "title": "Chemical Bonding Theory",
    "description": "Ionic, covalent, metallic bonds, VSEPR theory.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Bonding"
  },
  {
    "id": "ch-th-eq",
    "title": "Equilibrium Theory",
    "description": "Chemical equilibrium, Le Chatelier's principle, Kc/Kp.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Equilibrium"
  },
  {
    "id": "ch-th-thermo",
    "title": "Thermochemistry Theory",
    "description": "Enthalpy, entropy, Gibbs free energy, Hess's law.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Thermo"
  },
  {
    "id": "ch-th-kinetics",
    "title": "Chemical Kinetics Theory",
    "description": "Reaction rates, order of reaction, activation energy.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Kinetics"
  },
  {
    "id": "ch-th-acid",
    "title": "Acid-Base Theory",
    "description": "pH, pOH, strong/weak acids, buffers, titration.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Acid-Base"
  },
  {
    "id": "ch-th-redox",
    "title": "Redox Theory",
    "description": "Oxidation-reduction, electrochemical cells, corrosion.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Redox"
  },
  {
    "id": "ch-th-organic",
    "title": "Organic Chemistry Theory",
    "description": "Hydrocarbons, functional groups, nomenclature.",
    "category": "chemistry",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Organic"
  },
  {
    "id": "ch-calc-ph",
    "title": "pH Calculator",
    "description": "Calculate pH from concentration for acids and bases.",
    "category": "chemistry",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Acid-Base"
  },
  {
    "id": "ch-calc-titration",
    "title": "Titration Simulator",
    "description": "Simulate strong acid-strong base titration and track pH changes.",
    "category": "chemistry",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Titration"
  },
  {
    "id": "ch-calc-gas",
    "title": "Gas Laws Calculator",
    "description": "Boyle's, Charles's, ideal gas law solver.",
    "category": "chemistry",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Gas Laws"
  },
  {
    "id": "ch-calc-molarmass",
    "title": "Molar Mass Calculator",
    "description": "Enter a chemical formula and get molar mass.",
    "category": "chemistry",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Stoichiometry"
  },
  {
    "id": "ch-calc-stoich",
    "title": "Stoichiometry Lab",
    "description": "Moles, percent composition, limiting reagent.",
    "category": "chemistry",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Stoichiometry"
  },
  {
    "id": "molecular-builder",
    "title": "Molecular Builder 3D",
    "description": "Build any molecule from scratch. Simulate reactions.",
    "category": "chemistry",
    "type": "3d",
    "status": "active",
    "color": "#f59e0b"
  },
  {
    "id": "bio-3d-cell",
    "title": "Cell Structure 3D",
    "description": "Real WebGL: eukaryotic cell ultrastructure + cell division tabs (from Biology 3D Suite).",
    "category": "biology",
    "type": "3d",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Cell Biology"
  },
  {
    "id": "bio-3d-organelles",
    "title": "Cell Organelles 3D Explorer",
    "description": "Interactive 3D models, historical discovery chronicles, and functions of all 14 cell organelles.",
    "category": "biology",
    "type": "3d",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Cell Biology"
  },
  {
    "id": "bio-3d-dna",
    "title": "DNA & Genetics 3D",
    "description": "Double-helix DNA structure, replication, transcription, translation.",
    "category": "biology",
    "type": "3d",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Genetics"
  },
  {
    "id": "bio-3d-advanced",
    "title": "Biology 3D Advanced",
    "description": "Cell ultrastructure, molecular genetics, ecology networks, human systems.",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Advanced"
  },
  {
    "id": "bio-3d-ecology",
    "title": "Ecology & Ecosystem 3D",
    "description": "Real WebGL: biogeochemical C & N cycles tab (from Biology Diversity & Ecology Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Ecology"
  },
  {
    "id": "bio-3d-human",
    "title": "Human Body Systems 3D",
    "description": "Real WebGL: beating heart, breathing lungs, blood-path circulation tab (Human Physiology in the Biology Syllabus Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Human Physiology"
  },
  {
    "id": "bio-3d-evolution",
    "title": "Evolution & Classification 3D",
    "description": "Real WebGL: phylogenetic tree, fossil record layers, Darwin's finches tab (Evolution in the Biology Syllabus Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Evolution"
  },
  {
    "id": "bio-th-cell",
    "title": "Cell Theory & Structure",
    "description": "Cell theory, prokaryotic vs eukaryotic cells, organelles, membrane transport.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Cell Biology"
  },
  {
    "id": "bio-th-genetics",
    "title": "Genetics & Heredity",
    "description": "Mendelian genetics, DNA structure, replication, transcription, translation.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Genetics"
  },
  {
    "id": "bio-th-ecology",
    "title": "Ecology & Environment",
    "description": "Ecosystems, biomes, biogeochemical cycles, biodiversity, conservation.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Ecology"
  },
  {
    "id": "bio-th-human",
    "title": "Human Physiology",
    "description": "Circulatory, respiratory, digestive, nervous, and excretory systems.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Human Physiology"
  },
  {
    "id": "bio-th-evolution",
    "title": "Evolution & Classification",
    "description": "Origin of life, natural selection, phylogenetic classification, taxonomy.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Evolution"
  },
  {
    "id": "bio-th-plant",
    "title": "Plant Physiology",
    "description": "Photosynthesis, transpiration, nutrition, plant hormones, transport in plants.",
    "category": "biology",
    "type": "theory",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Plant Biology"
  },
  {
    "id": "bio-calc-punnett",
    "title": "Punnett Square Solver",
    "description": "Predict offspring genotypes and phenotypes from parental crosses.",
    "category": "biology",
    "type": "calculator",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Genetics"
  },
  {
    "id": "bio-calc-population",
    "title": "Population Growth Calculator",
    "description": "Exponential and logistic population growth models with carrying capacity.",
    "category": "biology",
    "type": "calculator",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Ecology"
  },
  {
    "id": "bio-calc-photosynthesis",
    "title": "Photosynthesis Rate Calculator",
    "description": "Calculate rate of photosynthesis under varying light, CO₂, and temperature.",
    "category": "biology",
    "type": "calculator",
    "status": "active",
    "color": "#22c55e",
    "unit": "Unit: Plant Biology"
  },
  {
    "id": "math-3d-geometry",
    "title": "3D Geometry",
    "description": "Points, lines, planes in 3D space with interactive visualization.",
    "category": "mathematics",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: 3D Geometry"
  },
  {
    "id": "math-3d-perpendicular",
    "title": "Perpendicular Distance 3D",
    "category": "mathematics",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Straight Line & Coordinates in Space"
  },
  {
    "id": "math-3d-surfaces",
    "title": "3D Mathematical Surfaces",
    "description": "Explore saddle, wave, ripple, peak, plane, and cylinder surfaces.",
    "category": "mathematics",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-3d-advanced",
    "title": "Mathematics 3D Advanced",
    "description": "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces.",
    "category": "mathematics",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Vector Calculus"
  },
  {
    "id": "math-3d-fourier",
    "title": "Fourier Series 3D",
    "description": "Build square, sawtooth, and triangle waves from sums of sines.",
    "category": "mathematics",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Fourier"
  },
  {
    "id": "math-3d-decay",
    "title": "Nuclear Decay Simulator",
    "description": "Stochastic radioactive decay visualization with half-life controls.",
    "category": "mathematics",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Exponential"
  },
  {
    "id": "math-th-calculus",
    "title": "Calculus Theory",
    "description": "Limits, derivatives, integrals, fundamental theorem.",
    "category": "mathematics",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-th-trig",
    "title": "Trigonometry Theory",
    "description": "Identities, equations, graphs, inverse functions.",
    "category": "mathematics",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Trig"
  },
  {
    "id": "math-th-algebra",
    "title": "Algebra Theory",
    "description": "Matrices, determinants, complex numbers, vectors.",
    "category": "mathematics",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-th-stats",
    "title": "Statistics Theory",
    "description": "Probability, distributions, hypothesis testing.",
    "category": "mathematics",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Stats"
  },
  {
    "id": "math-th-geo",
    "title": "Coordinate Geometry Theory",
    "description": "Lines, circles, conics in coordinate plane.",
    "category": "mathematics",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Geometry"
  },
  {
    "id": "math-calc-deriv",
    "title": "Derivative Calculator",
    "description": "Compute derivatives and integrals numerically.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-calc-quad",
    "title": "Quadratic Solver",
    "description": "Solve ax² + bx + c = 0 and visualize the parabola.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-calc-stats",
    "title": "Statistics Calculator",
    "description": "Mean, median, mode, standard deviation.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Stats"
  },
  {
    "id": "math-calc-matrix",
    "title": "Matrix Calculator",
    "description": "Add, multiply, and transpose matrices.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-calc-trig",
    "title": "Trigonometry Lab",
    "description": "Unit circle visualization and sine/cosine/tangent graphing.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Trig"
  },
  {
    "id": "math-calc-series",
    "title": "Sequences & Series",
    "description": "Arithmetic and geometric progressions.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Sequences"
  },
  {
    "id": "math-calc-vectors",
    "title": "Vector Operations",
    "description": "Add, dot product, cross product of 3D vectors.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "math-calc-limit",
    "title": "Limit Calculator",
    "description": "Estimate limits numerically.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-calc-system",
    "title": "System Solver",
    "description": "Solve 2×2 and 3×3 systems of linear equations.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "equation-solver",
    "title": "Universal Equation Solver",
    "description": "Solve any physics, chemistry, or math equation.",
    "category": "mathematics",
    "type": "calculator",
    "status": "active",
    "color": "#f59e0b"
  },
  {
    "id": "class11-physics",
    "title": "Class 11 Physics 3D Plus",
    "description": "Extended 3D physics visualizations for Class 11.",
    "category": "class11",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Class 11 Physics"
  },
  {
    "id": "class11-chemistry",
    "title": "Class 11 Chemistry 3D Plus",
    "description": "Extended 3D chemistry visualizations for Class 11.",
    "category": "class11",
    "type": "3d",
    "status": "new",
    "color": "#10b981",
    "unit": "Unit: Class 11 Chemistry"
  },
  {
    "id": "class11-math",
    "title": "Class 11 Math 3D Plus",
    "description": "Extended 3D math visualizations for Class 11.",
    "category": "class11",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Class 11 Math"
  },
  {
    "id": "class11-biology",
    "title": "Class 11 Biology 3D Plus",
    "description": "Real WebGL: cells, division, DNA, bacteriophage & ecosystem tabs (from Biology 3D Suite).",
    "category": "class11",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Class 11 Biology"
  },
  {
    "id": "ph-3d-electrostatics",
    "title": "Electrostatics 3D",
    "description": "Electric field, force and potential from point charges with field-line visualization.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Electrostatics"
  },
  {
    "id": "ph-3d-gravitation",
    "title": "Gravitation 3D",
    "description": "Gravitational field, potential and orbital mechanics with live force vectors.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-3d-lenses",
    "title": "Lenses 3D",
    "description": "Convex and concave lens ray diagrams with adjustable object distance.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-measurement",
    "title": "Measurement 3D",
    "description": "Vernier caliper, screw gauge and dimensional analysis visualized in 3D.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Measurement"
  },
  {
    "id": "ph-3d-mirrors",
    "title": "Mirrors 3D",
    "description": "Concave and convex mirror ray diagrams with focal points and image formation.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-prism",
    "title": "Prism 3D",
    "description": "Dispersion and minimum deviation of light through a triangular prism.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-thermodynamics",
    "title": "Thermodynamics 3D",
    "description": "Gas laws, PV diagram and first law of thermodynamics in interactive 3D.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Thermo"
  },
  {
    "id": "ph-3d-vectors-full",
    "title": "Vectors Comprehensive 3D",
    "description": "Scalar and vector quantities, addition, resolution into components, and 3D vector operations.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "ph-3d-vectors-classic",
    "title": "Vector Lab Classic 3D",
    "description": "Tabbed classic vector lab — basics, addition, and components with live arrows and magnitude readouts.",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "ph-sim-acceleration",
    "title": "Ball Acceleration Sim",
    "description": "Constant acceleration motion with real-time position, velocity and acceleration graphs.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ph-sim-bounce",
    "title": "Bouncing Ball Sim",
    "description": "Coefficient of restitution and energy loss on each bounce.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ph-sim-gravity",
    "title": "Gravity Sim",
    "description": "Free-fall and projectile motion under gravity with adjustable g.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-sim-threebody",
    "title": "Three-Body Sim",
    "description": "Chaos in gravitational three-body systems.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-sim-double-pendulum",
    "title": "Double Pendulum Sim",
    "description": "Chaotic double pendulum with adjustable speed.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Oscillations"
  },
  {
    "id": "ph-sim-pi-collisions",
    "title": "Pi Collisions Sim",
    "description": "Elastic collision demonstration where bounce count approximates digits of pi.",
    "category": "physics",
    "type": "calculator",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Work Energy"
  },
  {
    "id": "ch-3d-molecules",
    "title": "3D Molecules",
    "description": "Interactive 3D molecular geometries with bond angles and VSEPR theory.",
    "category": "chemistry",
    "type": "3d",
    "status": "new",
    "color": "#10b981",
    "unit": "Unit: Bonding"
  },
  {
    "id": "ch-3d-syllabus-suite",
    "title": "Chemistry Syllabus Suite 3D",
    "description": "Syllabus-mapped 3D chemistry visualizations across all class 11 topics.",
    "category": "chemistry",
    "type": "3d",
    "status": "new",
    "color": "#10b981",
    "unit": "Unit: Chemistry"
  },
  {
    "id": "ph-3d-syllabus-suite",
    "title": "Physics Syllabus Suite 3D",
    "category": "physics",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Syllabus Suite"
  },
  {
    "id": "math-3d-labeled",
    "title": "3D Geometry Labeled",
    "description": "Labelled 3D solid geometry — solids, planes, vectors in space.",
    "category": "mathematics",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Geometry"
  },
  {
    "id": "math-3d-syllabus-suite",
    "title": "Math Syllabus Suite 3D",
    "description": "Syllabus-mapped interactive 3D math visualizations.",
    "category": "mathematics",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Math"
  },
  {
    "id": "math-advanced",
    "title": "Math Advanced 3D",
    "description": "Advanced math visualizations including parametric and implicit surfaces.",
    "category": "mathematics",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Math"
  },
  {
    "id": "bio-3d-suite",
    "title": "Biology 3D Suite",
    "description": "NEB Biology XI curriculum-mapped 3D visualizations in official unit order.",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Biology"
  },
  {
    "id": "bio-3d-diversity",
    "title": "Biology Diversity & Ecology Suite 3D",
    "description": "Diversity of life, ecosystems, and conservation in 3D.",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Diversity"
  },
  {
    "id": "bio-3d-syllabus-suite",
    "title": "Biology Syllabus Suite 3D — Microbiology to Environment",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Biology"
  },
  {
    "id": "bio-3d-biomolecules",
    "title": "Biomolecules 3D",
    "description": "Real WebGL: carbohydrates, proteins, lipids & enzyme action tab (from Biology Diversity & Ecology Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Cell Biology"
  },
  {
    "id": "bio-3d-biota-conservation",
    "title": "Biota & Conservation 3D",
    "description": "Real WebGL: species richness, in-situ/ex-situ conservation & red panda tab (Biodiversity in the Biology Syllabus Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Ecology"
  },
  {
    "id": "bio-3d-cell-division",
    "title": "Cell Division 3D",
    "description": "Real WebGL: mitosis & meiosis chromosome-separation tab (from Biology 3D Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Genetics"
  },
  {
    "id": "bio-3d-faunal",
    "title": "Faunal Diversity 3D",
    "description": "Real WebGL anatomy: Paramecium ultrastructure & conjugation, Plasmodium life cycle, nine phyla body plans, and Earthworm & Frog systems (digestive, excretory, nervous, reproductive) — leader-line labels + reveal bar on every scene.",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Diversity"
  },
  {
    "id": "bio-3d-floral",
    "title": "Floral Diversity 3D",
    "description": "Real WebGL: plant-kingdom diversity tab (from Biology Diversity & Ecology Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Diversity"
  },
  {
    "id": "bio-3d-micro",
    "title": "Microbiology 3D",
    "description": "Real WebGL: bacterial cell & virus scene (Microbiology in the Biology Syllabus Suite).",
    "category": "biology",
    "type": "3d",
    "status": "new",
    "color": "#22c55e",
    "unit": "Unit: Cell Biology"
  }
];
