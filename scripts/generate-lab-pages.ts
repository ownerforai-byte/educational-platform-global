/**
 * Generates all per-lab pages from the registry.
 * Run: npx tsx scripts/generate-lab-pages.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const APP_DIR = join(__dirname, "..", "frontend", "app", "lab");

interface LabDef {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "3d" | "theory" | "calculator";
  status: string;
  componentImport: string;
  color: string;
  unit: string;
  extraProps?: string; // e.g. ' subject="physics" topic="kinematics"'
}

const LABS: LabDef[] = [
  // PHYSICS 3D
  { id: "ph-3d-dynamics", title: "Dynamics 3D", description: "Inclined plane, friction, elastic collision, momentum conservation.", category: "physics", type: "3d", status: "active", componentImport: "PhysicsDynamics3D", color: "#3b82f6", unit: "Unit: Dynamics" },
  { id: "ph-3d-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals.", category: "physics", type: "3d", status: "new", componentImport: "Physics3DAdvanced", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "ph-3d-quantum", title: "Quantum 3D", description: "Quantum mechanics — orbitals, probability distributions, spin.", category: "physics", type: "3d", status: "new", componentImport: "Quantum3D", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "ph-3d-wave", title: "Wave Simulator 3D", description: "Real-time 3D wave propagation — sine, cosine, damped modes.", category: "physics", type: "3d", status: "active", componentImport: "PhysicsAdvancedMotionLab", color: "#3b82f6", unit: "Unit: Waves" },
  { id: "ph-3d-pendulum", title: "Pendulum 3D", description: "Pendulum with trail visualization and period calculations.", category: "physics", type: "3d", status: "active", componentImport: "PhysicsAdvancedMotionLab", color: "#3b82f6", unit: "Unit: Oscillations" },
  { id: "ph-3d-em", title: "EM Wave 3D", description: "Electromagnetic wave propagation with E and B field visualization.", category: "physics", type: "3d", status: "active", componentImport: "PhysicsMotionLab", color: "#3b82f6", unit: "Unit: EM Waves" },
  { id: "ph-3d-magnetic", title: "Magnetic Field 3D", description: "Bar magnet field lines and iron filings pattern.", category: "physics", type: "3d", status: "active", componentImport: "PhysicsMotionLab", color: "#3b82f6", unit: "Unit: Magnetism" },
  { id: "ph-3d-vectors", title: "Vector Addition 3D", description: "Interactive 3D vectors — components, dot/cross product.", category: "physics", type: "3d", status: "new", componentImport: "Vectors3D", color: "#3b82f6", unit: "Unit: Vectors" },
  { id: "ph-3d-optics", title: "Optics & Lens 3D", description: "Ray diagrams for convex/concave lenses and mirrors.", category: "physics", type: "3d", status: "new", componentImport: "Optics3D", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-3d-refraction", title: "Refraction 3D", description: "Snell's law visualization with total internal reflection.", category: "physics", type: "3d", status: "new", componentImport: "Refraction3D", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-3d-classic", title: "Physics 3D Classic", description: "Electric field, double pendulum, gravitational field.", category: "physics", type: "3d", status: "development", componentImport: "Physics3D", color: "#3b82f6", unit: "Unit: Classic Mechanics" },
  { id: "heat-determinations", title: "Heat Determinations Suite", description: "Lee's disc, Searle's bar, Newton cooling & linear expansion.", category: "physics", type: "3d", status: "new", componentImport: "Physics3DHeatDeterminations", color: "#ef4444", unit: "Unit: Heat" },
  { id: "lees-disc", title: "Lee's Disc Experiment", description: "Thermal conductivity of bad conductors.", category: "physics", type: "3d", status: "new", componentImport: "LeesDiscExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "searles-bar", title: "Searle's Bar Experiment", description: "Thermal conductivity of good conductors.", category: "physics", type: "3d", status: "new", componentImport: "SearlesBarExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "newton-cooling", title: "Newton's Law of Cooling", description: "Determination of cooling constant k.", category: "physics", type: "3d", status: "new", componentImport: "NewtonCoolingExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "linear-expansion", title: "Linear Expansion (alpha)", description: "Determination of coefficient of linear expansion.", category: "physics", type: "3d", status: "new", componentImport: "LinearExpansionExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite", description: "Projectile, circular motion, momentum, work-energy-power.", category: "physics", type: "3d", status: "new", componentImport: "MechanicsSuite3D", color: "#3b82f6", unit: "Unit: Mechanics" },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Ideal Gas Suite", description: "Hooke's law, Young's modulus, kinetic-molecular ideal gas.", category: "physics", type: "3d", status: "new", componentImport: "ElasticityGasSuite3D", color: "#3b82f6", unit: "Unit: Elasticity" },
  { id: "physics-electricity-suite-3d", title: "3D Electricity Suite", description: "Parallel-plate capacitor, dielectric, meter bridge.", category: "physics", type: "3d", status: "new", componentImport: "ElectricitySuite3D", color: "#3b82f6", unit: "Unit: Electricity" },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", description: "Biot-Savart fields, Lorentz force, Faraday & Lenz.", category: "physics", type: "3d", status: "new", componentImport: "MagnetismEMISuite3D", color: "#3b82f6", unit: "Unit: Magnetism" },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", description: "Young's double slit, single-slit diffraction, Brewster polarization.", category: "physics", type: "3d", status: "new", componentImport: "WaveOpticsSuite3D", color: "#3b82f6", unit: "Unit: Wave Optics" },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics Suite", description: "Photoelectric, Bohr atom, binding energy, semiconductors.", category: "physics", type: "3d", status: "new", componentImport: "ModernPhysicsSuite3D", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "symbols-mechanics", title: "Symbols — Mechanics", description: "Pendulum & projectile with theta, L, mg, T, omega drawn.", category: "physics", type: "3d", status: "new", componentImport: "MechanicsSymbols", color: "#3b82f6", unit: "Unit: Mechanics" },
  { id: "symbols-electricity", title: "Symbols — Electricity", description: "Ohm's-law circuit with epsilon, V, I, R at exact positions.", category: "physics", type: "3d", status: "new", componentImport: "ElectricitySymbols", color: "#3b82f6", unit: "Unit: Electricity" },
  { id: "symbols-waves", title: "Symbols — Waves", description: "Travelling wave with A, crest, trough, lambda, v, f drawn.", category: "physics", type: "3d", status: "new", componentImport: "WavesSymbols", color: "#3b82f6", unit: "Unit: Waves" },
  { id: "symbols-atomic", title: "Symbols — Atomic", description: "Bohr model with +Ze, r_n, E_n, photon hν at exact shells.", category: "physics", type: "3d", status: "new", componentImport: "AtomicSymbols", color: "#3b82f6", unit: "Unit: Atomic Physics" },

  // CHEMISTRY 3D
  { id: "ch-3d-periodic", title: "Periodic Table 3D", description: "Interactive 3D periodic table with element details.", category: "chemistry", type: "3d", status: "active", componentImport: "ChemistryLab", color: "#10b981", unit: "Unit: Periodicity" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, VSEPR.", category: "chemistry", type: "3d", status: "new", componentImport: "ChemistryModern3D", color: "#10b981", unit: "Unit: All" },
  { id: "ch-3d-micro", title: "Microscopy 3D", description: "Atomic structure, electron orbitals, crystal lattice.", category: "chemistry", type: "3d", status: "active", componentImport: "ChemistryAdvanced3D", color: "#10b981", unit: "Unit: Atomic Structure" },

  // MATH 3D
  { id: "math-3d-geometry", title: "3D Geometry", description: "Points, lines, planes in 3D space.", category: "mathematics", type: "3d", status: "active", componentImport: "MathGeometry3D", color: "#8b5cf6", unit: "Unit: 3D Geometry" },
  { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", description: "Saddle, wave, ripple, peak, plane, cylinder surfaces.", category: "mathematics", type: "3d", status: "active", componentImport: "MathLab", color: "#8b5cf6", unit: "Unit: Calculus" },
  { id: "math-3d-advanced", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb.", category: "mathematics", type: "3d", status: "new", componentImport: "MathModern3D", color: "#8b5cf6", unit: "Unit: Vector Calculus" },
  { id: "math-3d-fourier", title: "Fourier Series 3D", description: "Build square, sawtooth, triangle waves from sums of sines.", category: "mathematics", type: "3d", status: "active", componentImport: "MathAdvancedMotionLab", color: "#8b5cf6", unit: "Unit: Fourier Analysis" },
  { id: "math-3d-decay", title: "Nuclear Decay Simulator", description: "Stochastic radioactive decay with half-life controls.", category: "mathematics", type: "3d", status: "active", componentImport: "MathAdvancedMotionLab", color: "#8b5cf6", unit: "Unit: Exponential Functions" },
  { id: "symbols-math", title: "Symbols — Mathematics", description: "Unit circle with theta, r=1, sinθ, cosθ, tanθ.", category: "mathematics", type: "3d", status: "new", componentImport: "MathSymbols", color: "#8b5cf6", unit: "Unit: Trigonometry" },

  // BIOLOGY 3D
  { id: "bio-3d-cell", title: "Cell Structure 3D", description: "Plant and animal cell ultrastructure.", category: "biology", type: "3d", status: "active", componentImport: "BiologyCell3D", color: "#22c55e", unit: "Unit 1" },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", description: "Double helix, replication, transcription, translation.", category: "biology", type: "3d", status: "active", componentImport: "BiologyDNA3D", color: "#3b82f6", unit: "Unit 1" },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", description: "Interactive deep-dive: cell, genetics, ecology, human, evolution.", category: "biology", type: "3d", status: "new", componentImport: "BiologyAdvanced3D", color: "#10b981", unit: "All Units" },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", description: "Food chains, biogeochemical cycles.", category: "biology", type: "3d", status: "new", componentImport: "BiologyEcology3D", color: "#22c55e", unit: "Unit 4" },
  { id: "bio-3d-human", title: "Human Body Systems 3D", description: "Circulatory, respiratory, nervous, digestive systems.", category: "biology", type: "3d", status: "new", componentImport: "BiologyHuman3D", color: "#ef4444", unit: "Unit 9" },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", description: "Phylogenetic trees, taxonomy hierarchy.", category: "biology", type: "3d", status: "new", componentImport: "BiologyEvolution3D", color: "#f59e0b", unit: "Unit 7" },

  // THEORY PHYSICS
  { id: "ph-th-kinematics", title: "Kinematics Theory", description: "Equations of motion, projectile motion, relative velocity.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Kinematics", extraProps: ' subject="physics" topic="kinematics"' },
  { id: "ph-th-laws", title: "Laws of Motion Theory", description: "Newton's laws, friction, circular motion.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Dynamics", extraProps: ' subject="physics" topic="laws-motion"' },
  { id: "ph-th-work", title: "Work & Energy Theory", description: "Work-energy theorem, conservation of energy, power.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Work Energy", extraProps: ' subject="physics" topic="work-energy"' },
  { id: "ph-th-grav", title: "Gravitation Theory", description: "Universal gravitation, gravitational potential, satellite motion.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Gravitation", extraProps: ' subject="physics" topic="gravitation"' },
  { id: "ph-th-thermo", title: "Thermodynamics Theory", description: "Laws of thermodynamics, heat engines, entropy.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Thermodynamics", extraProps: ' subject="physics" topic="thermodynamics"' },
  { id: "ph-th-optics", title: "Optics Theory", description: "Reflection, refraction, lens formula, mirror equation.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Optics", extraProps: ' subject="physics" topic="optics"' },
  { id: "ph-th-electro", title: "Electrostatics Theory", description: "Coulomb's law, electric field, potential, capacitance.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Electrostatics", extraProps: ' subject="physics" topic="electrostatics"' },
  { id: "ph-th-current", title: "Current Electricity Theory", description: "Ohm's law, circuits, Kirchhoff's laws.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Current Electricity", extraProps: ' subject="physics" topic="current"' },
  { id: "ph-th-emw", title: "EM Waves Theory", description: "Electromagnetic spectrum, wave properties.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: EM Waves", extraProps: ' subject="physics" topic="emw"' },
  { id: "ph-th-modern", title: "Modern Physics Theory", description: "Photoelectric effect, atomic models, nuclear physics.", category: "physics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#3b82f6", unit: "Unit: Modern Physics", extraProps: ' subject="physics" topic="modern"' },

  // THEORY CHEMISTRY
  { id: "ch-th-atomic", title: "Atomic Structure Theory", description: "Bohr model, quantum numbers, electronic configuration.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Atomic Structure", extraProps: ' subject="chemistry" topic="atomic"' },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", description: "Ionic, covalent, metallic bonds, VSEPR theory.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Bonding", extraProps: ' subject="chemistry" topic="bonding"' },
  { id: "ch-th-eq", title: "Equilibrium Theory", description: "Chemical equilibrium, Le Chatelier's principle.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Equilibrium", extraProps: ' subject="chemistry" topic="equilibrium"' },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", description: "Enthalpy, entropy, Gibbs free energy.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Thermochemistry", extraProps: ' subject="chemistry" topic="thermo"' },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", description: "Reaction rates, order of reaction, activation energy.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Kinetics", extraProps: ' subject="chemistry" topic="kinetics"' },
  { id: "ch-th-acid", title: "Acid-Base Theory", description: "pH, pOH, strong/weak acids, buffers.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Acid-Base", extraProps: ' subject="chemistry" topic="acid-base"' },
  { id: "ch-th-redox", title: "Redox Theory", description: "Oxidation-reduction, electrochemical cells.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Redox", extraProps: ' subject="chemistry" topic="redox"' },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", description: "Hydrocarbons, functional groups, nomenclature.", category: "chemistry", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#10b981", unit: "Unit: Organic", extraProps: ' subject="chemistry" topic="organic"' },

  // THEORY BIOLOGY
  { id: "bio-th-cell", title: "Cell Theory & Structure", description: "Cell theory, prokaryotic vs eukaryotic cells, organelles.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 1", extraProps: ' subject="biology" topic="cell"' },
  { id: "bio-th-genetics", title: "Genetics & Heredity", description: "Mendelian genetics, DNA structure, replication, transcription, translation.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 1", extraProps: ' subject="biology" topic="genetics"' },
  { id: "bio-th-ecology", title: "Ecology & Environment", description: "Ecosystems, biomes, biogeochemical cycles, biodiversity.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 4", extraProps: ' subject="biology" topic="ecology"' },
  { id: "bio-th-human", title: "Human Physiology", description: "Circulatory, respiratory, digestive, nervous, excretory systems.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 9", extraProps: ' subject="biology" topic="human"' },
  { id: "bio-th-evolution", title: "Evolution & Classification", description: "Origin of life, natural selection, phylogenetic classification.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 7", extraProps: ' subject="biology" topic="evolution"' },
  { id: "bio-th-plant", title: "Plant Physiology", description: "Photosynthesis, transpiration, nutrition, plant hormones.", category: "biology", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#22c55e", unit: "Unit 4", extraProps: ' subject="biology" topic="plant"' },

  // THEORY MATH
  { id: "math-th-calculus", title: "Calculus Theory", description: "Limits, derivatives, integrals, fundamental theorem.", category: "mathematics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Calculus", extraProps: ' subject="mathematics" topic="calculus"' },
  { id: "math-th-trig", title: "Trigonometry Theory", description: "Identities, equations, graphs, inverse functions.", category: "mathematics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Trigonometry", extraProps: ' subject="mathematics" topic="trigonometry"' },
  { id: "math-th-algebra", title: "Algebra Theory", description: "Matrices, determinants, complex numbers.", category: "mathematics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Algebra", extraProps: ' subject="mathematics" topic="algebra"' },
  { id: "math-th-stats", title: "Statistics Theory", description: "Probability, distributions, hypothesis testing.", category: "mathematics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Statistics", extraProps: ' subject="mathematics" topic="statistics"' },
  { id: "math-th-geo", title: "Coordinate Geometry Theory", description: "Lines, circles, conics in coordinate plane.", category: "mathematics", type: "theory", status: "active", componentImport: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Geometry", extraProps: ' subject="mathematics" topic="geometry"' },

  // CALCULATORS PHYSICS
  { id: "ph-calc-ohms", title: "Ohm's Law Calc", description: "Calculate V, I, R with interactive controls.", category: "physics", type: "calculator", status: "active", componentImport: "PhysicsInteractive", color: "#3b82f6", unit: "Unit: Electricity", extraProps: ' defaultTab="ohms"' },
  { id: "ph-calc-heat", title: "Heat Calculator", description: "Calorimetry, latent heat, thermal expansion.", category: "physics", type: "calculator", status: "active", componentImport: "PhysicsHeatLab", color: "#ef4444", unit: "Unit: Heat" },
  { id: "ph-calc-optics", title: "Optics Lab", description: "Reflection, refraction, lateral shift, prism dispersion.", category: "physics", type: "calculator", status: "active", componentImport: "PhysicsOptics", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-calc-projectile", title: "Projectile Motion", description: "Launch projectiles with adjustable velocity, angle, gravity.", category: "physics", type: "calculator", status: "active", componentImport: "PhysicsLab", color: "#3b82f6", unit: "Unit: Kinematics" },

  // CALCULATORS CHEMISTRY
  { id: "ch-calc-ph", title: "pH Calculator", description: "Calculate pH from concentration.", category: "chemistry", type: "calculator", status: "active", componentImport: "ChemistryInteractive", color: "#10b981", unit: "Unit: Acid-Base", extraProps: ' defaultTab="ph"' },
  { id: "ch-calc-titration", title: "Titration Simulator", description: "Strong acid-strong base titration, track pH.", category: "chemistry", type: "calculator", status: "active", componentImport: "ChemistryInteractive", color: "#10b981", unit: "Unit: Equilibrium", extraProps: ' defaultTab="titration"' },
  { id: "ch-calc-gas", title: "Gas Laws Calc", description: "Boyle's, Charles's, ideal gas law solver.", category: "chemistry", type: "calculator", status: "active", componentImport: "ChemistryInteractive", color: "#10b981", unit: "Unit: Gases", extraProps: ' defaultTab="gaslaws"' },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", description: "Enter formula, get molar mass.", category: "chemistry", type: "calculator", status: "active", componentImport: "ChemistryInteractive", color: "#10b981", unit: "Unit: Stoichiometry", extraProps: ' defaultTab="molarmass"' },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", description: "Moles, percent composition, limiting reagent.", category: "chemistry", type: "calculator", status: "active", componentImport: "ChemistryStoichiometry", color: "#10b981", unit: "Unit: Stoichiometry" },

  // CALCULATORS BIOLOGY
  { id: "bio-calc-punnett", title: "Punnett Square Solver", description: "Predict offspring genotypes and phenotypes.", category: "biology", type: "calculator", status: "active", componentImport: "BiologyPunnettCalculator", color: "#22c55e", unit: "Unit 1" },
  { id: "bio-calc-population", title: "Population Growth Calc", description: "Exponential and logistic growth models.", category: "biology", type: "calculator", status: "active", componentImport: "BiologyPopulationCalculator", color: "#22c55e", unit: "Unit 4" },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", description: "Rate under varying light, CO2, temperature.", category: "biology", type: "calculator", status: "active", componentImport: "BiologyPhotosynthesisCalculator", color: "#22c55e", unit: "Unit 4" },

  // CALCULATORS MATH
  { id: "math-calc-deriv", title: "Derivative Calculator", description: "Compute derivatives and integrals numerically.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Calculus", extraProps: ' defaultTab="derivative"' },
  { id: "math-calc-quad", title: "Quadratic Solver", description: "Solve ax^2+bx+c=0 and visualize parabola.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extraProps: ' defaultTab="quadratic"' },
  { id: "math-calc-stats", title: "Statistics Calculator", description: "Mean, median, mode, standard deviation.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Statistics", extraProps: ' defaultTab="statistics"' },
  { id: "math-calc-matrix", title: "Matrix Calculator", description: "Add, multiply, transpose matrices.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extraProps: ' defaultTab="matrix"' },
  { id: "math-calc-trig", title: "Trigonometry Lab", description: "Unit circle, sine/cosine/tangent graphing.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathTrigonometry", color: "#8b5cf6", unit: "Unit: Trigonometry" },
  { id: "math-calc-series", title: "Sequences & Series", description: "Arithmetic and geometric progressions.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathSeriesLab", color: "#8b5cf6", unit: "Unit: Sequences" },
  { id: "math-calc-vectors", title: "Vector Operations", description: "Add, dot product, cross product of 3D vectors.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Vectors", extraProps: ' defaultTab="vectors"' },
  { id: "math-calc-limit", title: "Limit Calculator", description: "Estimate limits numerically.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Calculus", extraProps: ' defaultTab="limit"' },
  { id: "math-calc-system", title: "System Solver", description: "Solve 2x2 and 3x3 linear systems.", category: "mathematics", type: "calculator", status: "active", componentImport: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extraProps: ' defaultTab="system"' },

  // CLASS 11
  { id: "class11-physics", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations.", category: "class11", type: "3d", status: "new", componentImport: "Class11Physics3DPlus", color: "#f43f5e", unit: "Class 11 Physics" },
  { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations.", category: "class11", type: "3d", status: "new", componentImport: "Class11Chemistry3DPlus", color: "#f43f5e", unit: "Class 11 Chemistry" },
  { id: "class11-math", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations.", category: "class11", type: "3d", status: "new", componentImport: "Class11Math3DPlus", color: "#f43f5e", unit: "Class 11 Math" },
  { id: "class11-biology", title: "Class 11 Biology 3D Plus", description: "Extended 3D biology visualizations.", category: "class11", type: "3d", status: "new", componentImport: "Class11Biology3DPlus", color: "#f43f5e", unit: "Class 11 Biology" },

  // PREMIUM
  { id: "ai-tutor", title: "AI Lab Tutor", description: "Get instant help with lab concepts.", category: "physics", type: "calculator", status: "premium", componentImport: "PremiumPlaceholder", color: "#f59e0b", unit: "Premium", extraProps: ' title="AI Lab Tutor" description="Get instant help with lab concepts."' },
  { id: "advanced-circuit", title: "Advanced Circuit Simulator", description: "Build and test complex circuits with 50+ components.", category: "physics", type: "calculator", status: "premium", componentImport: "PremiumAdvancedCircuitSimulator", color: "#f59e0b", unit: "Premium" },
  { id: "molecular-builder", title: "Molecular Builder 3D", description: "Build any molecule from scratch.", category: "chemistry", type: "3d", status: "premium", componentImport: "PremiumPlaceholder", color: "#f59e0b", unit: "Premium", extraProps: ' title="Molecular Builder 3D" description="Build molecules from scratch."' },
  { id: "equation-solver", title: "Universal Equation Solver", description: "Solve any physics, chemistry, or math equation.", category: "mathematics", type: "calculator", status: "premium", componentImport: "PremiumEquationSolver", color: "#f59e0b", unit: "Premium" },
];

function slugify(id: string): string {
  return id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

function generatePage(lab: LabDef): string {
  const slug = slugify(lab.id);
  const categoryDir = lab.category === "class11" ? "class11" : lab.category;
  const compName = lab.componentImport.replace(/[^a-zA-Z0-9]/g, "");
  const extraProps = lab.extraProps ?? "";
  const statusLabel = lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active";
  const statusClass = lab.status === "premium"
    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
    : lab.status === "new"
    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";

  const relatedIds = LABS.filter((l) => l.category === lab.category && l.id !== lab.id).slice(0, 6).map((l) => ({ id: l.id, title: l.title }));
  const relatedJson = JSON.stringify(relatedIds);

  return `"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";
import { ${lab.componentImport} } from "@/components/lab/${slug}";

export default function ${compName}Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/${categoryDir}" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to ${lab.category.charAt(0).toUpperCase() + lab.category.slice(1)} Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "${lab.color}18" }}>
                <Cuboid className="h-4 w-4" style={{ color: "${lab.color}" }} />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">${lab.title}</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">${lab.unit} · ${lab.description.slice(0, 55)}${lab.description.length > 55 ? "..." : ""}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lab.type === "theory" && (
              <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">All Theory</span>
              </Link>
            )}
            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <Cuboid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All 3D</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-5">
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, ${lab.color}08, transparent)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "${lab.color}18" }}>
              <Cuboid className="h-4 w-4" style={{ color: "${lab.color}" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">${lab.title}</h2>
              <p className="text-xs text-muted-foreground truncate">${lab.description}</p>
            </div>
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}>
              ${statusLabel}
            </span>
          </div>
          <div className="p-5">
            <${lab.componentImport} ${extraProps.trim()} />
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {${relatedJson}.map((l) => (
              <Link key={l.id} href={"/lab/" + l.id} className="stat-pill">
                <span className="text-muted-foreground">{l.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
}

function generateCategoryPage(category: string, labs: LabDef[]): string {
  const colorMap: Record<string, string> = { physics: "#3b82f6", chemistry: "#10b981", mathematics: "#8b5cf6", biology: "#22c55e", class11: "#f43f5e" };
  const color = colorMap[category] ?? "#64748b";
  const label = category === "class11" ? "Class 11" : category.charAt(0).toUpperCase() + category.slice(1);
  const labsJson = JSON.stringify(labs.map((l) => ({ id: l.id, title: l.title, description: l.description, type: l.type, status: l.status, color: l.color, unit: l.unit })), null, 2);

  return `"use client";

import { useState } from "react";
import Link from "next/link";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

const LABS = ${labsJson};

type Tab = "3d" | "theory" | "calculator";

export default function ${label.replace(/\\s+/g, "")}LabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("3d");
  const filtered = LABS.filter((l) =>
    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "\${color}20" }}>
            <Cuboid className="h-5 w-5" style={{ color }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">${label} Lab 3D</h1>
            <p className="text-sm text-muted-foreground">${labs.length} interactive labs · Syllabus-aligned</p>
          </div>
        </div>
        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">
          ← Back to all labs
        </Link>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        {(["3d", "theory", "calculator"] as const).map((t) => {
          const count = LABS.filter((l) => (t === "3d" ? l.type === "3d" : t === "theory" ? l.type === "theory" : l.type === "calculator")).length;
          const isActive = activeTab === t;
          return (
            <button key={t} onClick={() => setActiveTab(t)}
              className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all \${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}\`}>
              {t === "3d" && <Cuboid className="h-4 w-4" />}
              {t === "theory" && <BookOpen className="h-4 w-4" />}
              {t === "calculator" && <Calculator className="h-4 w-4" />}
              <span className="capitalize">{t}</span>
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((lab) => (
          <Link key={lab.id} href={\`/lab/\${lab.id}\`} className="block group">
            <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 h-full flex flex-col">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "\${lab.color}18" }}>
                  {lab.type === "3d" && <Cuboid className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "theory" && <BookOpen className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "calculator" && <Calculator className="h-4 w-4" style={{ color: lab.color }} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: "\${lab.color}40", color: lab.color, backgroundColor: "\${lab.color}10" }}>{lab.unit ?? lab.type}</span>
                <span className={\`text-[10px] px-2 py-0.5 rounded-full font-medium \${lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}\`}>
                  {lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">No {activeTab} labs found for {label}.</p>
        </div>
      )}
    </div>
  );
}
`;
}

function main() {
  const byCategory: Record<string, LabDef[]> = {};
  for (const lab of LABS) {
    if (!byCategory[lab.category]) byCategory[lab.category] = [];
    byCategory[lab.category].push(lab);
  }

  let created = 0;

  // Category hub pages
  for (const [category, labs] of Object.entries(byCategory)) {
    const dir = join(APP_DIR, category);
    mkdirSync(dir, { recursive: true });
    const pagePath = join(dir, "page.tsx");
    if (!require("fs").existsSync(pagePath)) {
      writeFileSync(pagePath, generateCategoryPage(category, labs));
      console.log(`✓ ${pagePath}`);
      created++;
    } else {
      console.log(`  (skip exists) ${pagePath}`);
    }
  }

  // Individual lab pages
  const bioSlugs = ["biomolecules-3d", "cell-3d", "cell-division-3d", "floral-3d", "micro-3d", "ecology-3d", "evolution-3d", "faunal-3d", "biota-3d", "conservation-3d"];
  for (const lab of LABS) {
    const slug = slugify(lab.id);
    const categoryDir = lab.category === "class11" ? "class11" : lab.category;
    const dir = join(APP_DIR, categoryDir, slug);
    mkdirSync(dir, { recursive: true });
    const pagePath = join(dir, "page.tsx");

    // Skip biology pages that already have custom pages
    if (lab.category === "biology" && bioSlugs.includes(slug)) continue;
    if (require("fs").existsSync(pagePath)) continue;

    writeFileSync(pagePath, generatePage(lab));
    console.log(`✓ ${pagePath}`);
    created++;
  }

  console.log(`\nTotal pages generated: ${created}`);
}

main();
