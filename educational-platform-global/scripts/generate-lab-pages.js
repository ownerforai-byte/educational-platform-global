const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "frontend", "app", "lab");

const LABS = [
  // PHYSICS 3D
  { id: "ph-3d-dynamics", title: "Dynamics 3D", desc: "Inclined plane, friction, elastic collision, momentum conservation.", cat: "physics", type: "3d", status: "active", comp: "PhysicsDynamics3D", color: "#3b82f6", unit: "Unit: Dynamics" },
  { id: "ph-3d-advanced", title: "Physics 3D Advanced", desc: "Electromagnetism, wave optics, relativity, quantum orbitals.", cat: "physics", type: "3d", status: "new", comp: "Physics3DAdvanced", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "ph-3d-quantum", title: "Quantum 3D", desc: "Quantum mechanics — orbitals, probability distributions, spin.", cat: "physics", type: "3d", status: "new", comp: "Quantum3D", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "ph-3d-wave", title: "Wave Simulator 3D", desc: "Real-time 3D wave propagation — sine, cosine, damped modes.", cat: "physics", type: "3d", status: "active", comp: "PhysicsAdvancedMotionLab", color: "#3b82f6", unit: "Unit: Waves" },
  { id: "ph-3d-pendulum", title: "Pendulum 3D", desc: "Pendulum with trail visualization and period calculations.", cat: "physics", type: "3d", status: "active", comp: "PhysicsAdvancedMotionLab", color: "#3b82f6", unit: "Unit: Oscillations" },
  { id: "ph-3d-em", title: "EM Wave 3D", desc: "Electromagnetic wave propagation with E and B field.", cat: "physics", type: "3d", status: "active", comp: "PhysicsMotionLab", color: "#3b82f6", unit: "Unit: EM Waves" },
  { id: "ph-3d-magnetic", title: "Magnetic Field 3D", desc: "Bar magnet field lines and iron filings pattern.", cat: "physics", type: "3d", status: "active", comp: "PhysicsMotionLab", color: "#3b82f6", unit: "Unit: Magnetism" },
  { id: "ph-3d-vectors", title: "Vector Addition 3D", desc: "Interactive 3D vectors — components, dot/cross product.", cat: "physics", type: "3d", status: "new", comp: "Vectors3D", color: "#3b82f6", unit: "Unit: Vectors" },
  { id: "ph-3d-optics", title: "Optics & Lens 3D", desc: "Ray diagrams for convex/concave lenses and mirrors.", cat: "physics", type: "3d", status: "new", comp: "Optics3D", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-3d-refraction", title: "Refraction 3D", desc: "Snell's law visualization with TIR and critical angle.", cat: "physics", type: "3d", status: "new", comp: "Refraction3D", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-3d-classic", title: "Physics 3D Classic", desc: "Electric field, double pendulum, gravitational field.", cat: "physics", type: "3d", status: "development", comp: "Physics3D", color: "#3b82f6", unit: "Unit: Classic Mechanics" },
  { id: "heat-determinations", title: "Heat Determinations Suite", desc: "Lee's disc, Searle's bar, Newton cooling & linear expansion.", cat: "physics", type: "3d", status: "new", comp: "Physics3DHeatDeterminations", color: "#ef4444", unit: "Unit: Heat" },
  { id: "lees-disc", title: "Lee's Disc Experiment", desc: "Thermal conductivity of bad conductors.", cat: "physics", type: "3d", status: "new", comp: "LeesDiscExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "searles-bar", title: "Searle's Bar Experiment", desc: "Thermal conductivity of good conductors.", cat: "physics", type: "3d", status: "new", comp: "SearlesBarExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "newton-cooling", title: "Newton's Law of Cooling", desc: "Determination of cooling constant k.", cat: "physics", type: "3d", status: "new", comp: "NewtonCoolingExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "linear-expansion", title: "Linear Expansion (alpha)", desc: "Determination of coefficient of linear expansion.", cat: "physics", type: "3d", status: "new", comp: "LinearExpansionExperiment", color: "#ef4444", unit: "Unit: Heat" },
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite", desc: "Projectile, circular motion, momentum, work-energy-power.", cat: "physics", type: "3d", status: "new", comp: "MechanicsSuite3D", color: "#3b82f6", unit: "Unit: Mechanics" },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Ideal Gas Suite", desc: "Hooke's law, Young's modulus, kinetic-molecular ideal gas.", cat: "physics", type: "3d", status: "new", comp: "ElasticityGasSuite3D", color: "#3b82f6", unit: "Unit: Elasticity" },
  { id: "physics-electricity-suite-3d", title: "3D Electricity Suite", desc: "Parallel-plate capacitor, dielectric, meter bridge.", cat: "physics", type: "3d", status: "new", comp: "ElectricitySuite3D", color: "#3b82f6", unit: "Unit: Electricity" },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", desc: "Biot-Savart fields, Lorentz force, Faraday & Lenz.", cat: "physics", type: "3d", status: "new", comp: "MagnetismEMISuite3D", color: "#3b82f6", unit: "Unit: Magnetism" },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", desc: "Young's double slit, single-slit diffraction, Brewster polarization.", cat: "physics", type: "3d", status: "new", comp: "WaveOpticsSuite3D", color: "#3b82f6", unit: "Unit: Wave Optics" },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics Suite", desc: "Photoelectric, Bohr atom, binding energy, semiconductors.", cat: "physics", type: "3d", status: "new", comp: "ModernPhysicsSuite3D", color: "#3b82f6", unit: "Unit: Modern Physics" },
  { id: "symbols-mechanics", title: "Symbols — Mechanics", desc: "Pendulum & projectile with theta, L, mg, T, omega drawn.", cat: "physics", type: "3d", status: "new", comp: "MechanicsSymbols", color: "#3b82f6", unit: "Unit: Mechanics" },
  { id: "symbols-electricity", title: "Symbols — Electricity", desc: "Ohm's-law circuit with epsilon, V, I, R at exact positions.", cat: "physics", type: "3d", status: "new", comp: "ElectricitySymbols", color: "#3b82f6", unit: "Unit: Electricity" },
  { id: "symbols-waves", title: "Symbols — Waves", desc: "Travelling wave with A, crest, trough, lambda, v, f drawn.", cat: "physics", type: "3d", status: "new", comp: "WavesSymbols", color: "#3b82f6", unit: "Unit: Waves" },
  { id: "symbols-atomic", title: "Symbols — Atomic", desc: "Bohr model with +Ze, r_n, E_n, photon hν at exact shells.", cat: "physics", type: "3d", status: "new", comp: "AtomicSymbols", color: "#3b82f6", unit: "Unit: Atomic Physics" },

  // CHEMISTRY 3D
  { id: "ch-3d-periodic", title: "Periodic Table 3D", desc: "Interactive 3D periodic table with element details.", cat: "chemistry", type: "3d", status: "active", comp: "ChemistryLab", color: "#10b981", unit: "Unit: Periodicity" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", desc: "Molecular dynamics, crystallography, spectroscopy, VSEPR.", cat: "chemistry", type: "3d", status: "new", comp: "ChemistryModern3D", color: "#10b981", unit: "Unit: All" },
  { id: "ch-3d-micro", title: "Microscopy 3D", desc: "Atomic structure, electron orbitals, crystal lattice.", cat: "chemistry", type: "3d", status: "active", comp: "ChemistryAdvanced3D", color: "#10b981", unit: "Unit: Atomic Structure" },

  // MATH 3D
  { id: "math-3d-geometry", title: "3D Geometry", desc: "Points, lines, planes in 3D space.", cat: "mathematics", type: "3d", status: "active", comp: "MathGeometry3D", color: "#8b5cf6", unit: "Unit: 3D Geometry" },
  { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", desc: "Saddle, wave, ripple, peak, plane, cylinder surfaces.", cat: "mathematics", type: "3d", status: "active", comp: "MathLab", color: "#8b5cf6", unit: "Unit: Calculus" },
  { id: "math-3d-advanced", title: "Mathematics 3D Advanced", desc: "Surfaces + contours, divergence/curl, Mandelbulb.", cat: "mathematics", type: "3d", status: "new", comp: "MathModern3D", color: "#8b5cf6", unit: "Unit: Vector Calculus" },
  { id: "math-3d-fourier", title: "Fourier Series 3D", desc: "Build square, sawtooth, triangle waves from sums of sines.", cat: "mathematics", type: "3d", status: "active", comp: "MathAdvancedMotionLab", color: "#8b5cf6", unit: "Unit: Fourier Analysis" },
  { id: "math-3d-decay", title: "Nuclear Decay Simulator", desc: "Stochastic radioactive decay with half-life controls.", cat: "mathematics", type: "3d", status: "active", comp: "MathAdvancedMotionLab", color: "#8b5cf6", unit: "Unit: Exponential Functions" },
  { id: "symbols-math", title: "Symbols — Mathematics", desc: "Unit circle with theta, r=1, sin, cos, tan.", cat: "mathematics", type: "3d", status: "new", comp: "MathSymbols", color: "#8b5cf6", unit: "Unit: Trigonometry" },

  // BIOLOGY 3D (skip ones with custom pages)
  { id: "bio-3d-cell", title: "Cell Structure 3D", desc: "Plant and animal cell ultrastructure.", cat: "biology", type: "3d", status: "active", comp: "BiologyCell3D", color: "#22c55e", unit: "Unit 1" },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", desc: "Double helix, replication, transcription, translation.", cat: "biology", type: "3d", status: "active", comp: "BiologyDNA3D", color: "#3b82f6", unit: "Unit 1" },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", desc: "Interactive deep-dive: cell, genetics, ecology, human, evolution.", cat: "biology", type: "3d", status: "new", comp: "BiologyAdvanced3D", color: "#10b981", unit: "All Units" },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", desc: "Food chains, biogeochemical cycles.", cat: "biology", type: "3d", status: "new", comp: "BiologyEcology3D", color: "#22c55e", unit: "Unit 4" },
  { id: "bio-3d-human", title: "Human Body Systems 3D", desc: "Circulatory, respiratory, nervous, digestive systems.", cat: "biology", type: "3d", status: "new", comp: "BiologyHuman3D", color: "#ef4444", unit: "Unit 9" },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", desc: "Phylogenetic trees, taxonomy hierarchy.", cat: "biology", type: "3d", status: "new", comp: "BiologyEvolution3D", color: "#f59e0b", unit: "Unit 7" },

  // THEORY PHYSICS
  { id: "ph-th-kinematics", title: "Kinematics Theory", desc: "Equations of motion, projectile motion, relative velocity.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Kinematics", extra: 'subject="physics" topic="kinematics"' },
  { id: "ph-th-laws", title: "Laws of Motion Theory", desc: "Newton's laws, friction, circular motion.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Dynamics", extra: 'subject="physics" topic="laws-motion"' },
  { id: "ph-th-work", title: "Work & Energy Theory", desc: "Work-energy theorem, conservation of energy, power.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Work Energy", extra: 'subject="physics" topic="work-energy"' },
  { id: "ph-th-grav", title: "Gravitation Theory", desc: "Universal gravitation, gravitational potential, satellite motion.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Gravitation", extra: 'subject="physics" topic="gravitation"' },
  { id: "ph-th-thermo", title: "Thermodynamics Theory", desc: "Laws of thermodynamics, heat engines, entropy.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Thermodynamics", extra: 'subject="physics" topic="thermodynamics"' },
  { id: "ph-th-optics", title: "Optics Theory", desc: "Reflection, refraction, lens formula, mirror equation.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Optics", extra: 'subject="physics" topic="optics"' },
  { id: "ph-th-electro", title: "Electrostatics Theory", desc: "Coulomb's law, electric field, potential, capacitance.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Electrostatics", extra: 'subject="physics" topic="electrostatics"' },
  { id: "ph-th-current", title: "Current Electricity Theory", desc: "Ohm's law, circuits, Kirchhoff's laws.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Current Electricity", extra: 'subject="physics" topic="current"' },
  { id: "ph-th-emw", title: "EM Waves Theory", desc: "Electromagnetic spectrum, wave properties.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: EM Waves", extra: 'subject="physics" topic="emw"' },
  { id: "ph-th-modern", title: "Modern Physics Theory", desc: "Photoelectric effect, atomic models, nuclear physics.", cat: "physics", type: "theory", status: "active", comp: "TheoryPanel", color: "#3b82f6", unit: "Unit: Modern Physics", extra: 'subject="physics" topic="modern"' },

  // THEORY CHEMISTRY
  { id: "ch-th-atomic", title: "Atomic Structure Theory", desc: "Bohr model, quantum numbers, electronic configuration.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Atomic Structure", extra: 'subject="chemistry" topic="atomic"' },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", desc: "Ionic, covalent, metallic bonds, VSEPR theory.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Bonding", extra: 'subject="chemistry" topic="bonding"' },
  { id: "ch-th-eq", title: "Equilibrium Theory", desc: "Chemical equilibrium, Le Chatelier's principle.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Equilibrium", extra: 'subject="chemistry" topic="equilibrium"' },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", desc: "Enthalpy, entropy, Gibbs free energy.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Thermochemistry", extra: 'subject="chemistry" topic="thermo"' },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", desc: "Reaction rates, order of reaction, activation energy.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Kinetics", extra: 'subject="chemistry" topic="kinetics"' },
  { id: "ch-th-acid", title: "Acid-Base Theory", desc: "pH, pOH, strong/weak acids, buffers.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Acid-Base", extra: 'subject="chemistry" topic="acid-base"' },
  { id: "ch-th-redox", title: "Redox Theory", desc: "Oxidation-reduction, electrochemical cells.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Redox", extra: 'subject="chemistry" topic="redox"' },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", desc: "Hydrocarbons, functional groups, nomenclature.", cat: "chemistry", type: "theory", status: "active", comp: "TheoryPanel", color: "#10b981", unit: "Unit: Organic", extra: 'subject="chemistry" topic="organic"' },

  // THEORY BIOLOGY
  { id: "bio-th-cell", title: "Cell Theory & Structure", desc: "Cell theory, prokaryotic vs eukaryotic cells, organelles.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 1", extra: 'subject="biology" topic="cell"' },
  { id: "bio-th-genetics", title: "Genetics & Heredity", desc: "Mendelian genetics, DNA structure, replication.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 1", extra: 'subject="biology" topic="genetics"' },
  { id: "bio-th-ecology", title: "Ecology & Environment", desc: "Ecosystems, biomes, biogeochemical cycles.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 4", extra: 'subject="biology" topic="ecology"' },
  { id: "bio-th-human", title: "Human Physiology", desc: "Circulatory, respiratory, digestive systems.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 9", extra: 'subject="biology" topic="human"' },
  { id: "bio-th-evolution", title: "Evolution & Classification", desc: "Origin of life, natural selection.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 7", extra: 'subject="biology" topic="evolution"' },
  { id: "bio-th-plant", title: "Plant Physiology", desc: "Photosynthesis, transpiration, nutrition.", cat: "biology", type: "theory", status: "active", comp: "TheoryPanel", color: "#22c55e", unit: "Unit 4", extra: 'subject="biology" topic="plant"' },

  // THEORY MATH
  { id: "math-th-calculus", title: "Calculus Theory", desc: "Limits, derivatives, integrals.", cat: "mathematics", type: "theory", status: "active", comp: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Calculus", extra: 'subject="mathematics" topic="calculus"' },
  { id: "math-th-trig", title: "Trigonometry Theory", desc: "Identities, equations, graphs.", cat: "mathematics", type: "theory", status: "active", comp: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Trigonometry", extra: 'subject="mathematics" topic="trigonometry"' },
  { id: "math-th-algebra", title: "Algebra Theory", desc: "Matrices, determinants, complex numbers.", cat: "mathematics", type: "theory", status: "active", comp: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Algebra", extra: 'subject="mathematics" topic="algebra"' },
  { id: "math-th-stats", title: "Statistics Theory", desc: "Probability, distributions.", cat: "mathematics", type: "theory", status: "active", comp: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Statistics", extra: 'subject="mathematics" topic="statistics"' },
  { id: "math-th-geo", title: "Coordinate Geometry Theory", desc: "Lines, circles, conics.", cat: "mathematics", type: "theory", status: "active", comp: "TheoryPanel", color: "#8b5cf6", unit: "Unit: Geometry", extra: 'subject="mathematics" topic="geometry"' },

  // CALCULATORS PHYSICS
  { id: "ph-calc-ohms", title: "Ohm's Law Calc", desc: "Calculate V, I, R.", cat: "physics", type: "calculator", status: "active", comp: "PhysicsInteractive", color: "#3b82f6", unit: "Unit: Electricity", extra: 'defaultTab="ohms"' },
  { id: "ph-calc-heat", title: "Heat Calculator", desc: "Calorimetry, latent heat.", cat: "physics", type: "calculator", status: "active", comp: "PhysicsHeatLab", color: "#ef4444", unit: "Unit: Heat" },
  { id: "ph-calc-optics", title: "Optics Lab", desc: "Reflection, refraction, prism dispersion.", cat: "physics", type: "calculator", status: "active", comp: "PhysicsOptics", color: "#3b82f6", unit: "Unit: Optics" },
  { id: "ph-calc-projectile", title: "Projectile Motion", desc: "Launch projectiles with adjustable params.", cat: "physics", type: "calculator", status: "active", comp: "PhysicsLab", color: "#3b82f6", unit: "Unit: Kinematics" },

  // CALCULATORS CHEMISTRY
  { id: "ch-calc-ph", title: "pH Calculator", desc: "Calculate pH from concentration.", cat: "chemistry", type: "calculator", status: "active", comp: "ChemistryInteractive", color: "#10b981", unit: "Unit: Acid-Base", extra: 'defaultTab="ph"' },
  { id: "ch-calc-titration", title: "Titration Simulator", desc: "Strong acid-strong base titration.", cat: "chemistry", type: "calculator", status: "active", comp: "ChemistryInteractive", color: "#10b981", unit: "Unit: Equilibrium", extra: 'defaultTab="titration"' },
  { id: "ch-calc-gas", title: "Gas Laws Calc", desc: "Boyle's, Charles's, ideal gas law.", cat: "chemistry", type: "calculator", status: "active", comp: "ChemistryInteractive", color: "#10b981", unit: "Unit: Gases", extra: 'defaultTab="gaslaws"' },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", desc: "Enter formula, get molar mass.", cat: "chemistry", type: "calculator", status: "active", comp: "ChemistryInteractive", color: "#10b981", unit: "Unit: Stoichiometry", extra: 'defaultTab="molarmass"' },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", desc: "Moles, percent composition, limiting reagent.", cat: "chemistry", type: "calculator", status: "active", comp: "ChemistryStoichiometry", color: "#10b981", unit: "Unit: Stoichiometry" },

  // CALCULATORS BIOLOGY
  { id: "bio-calc-punnett", title: "Punnett Square Solver", desc: "Predict offspring genotypes.", cat: "biology", type: "calculator", status: "active", comp: "BiologyPunnettCalculator", color: "#22c55e", unit: "Unit 1" },
  { id: "bio-calc-population", title: "Population Growth Calc", desc: "Exponential and logistic growth.", cat: "biology", type: "calculator", status: "active", comp: "BiologyPopulationCalculator", color: "#22c55e", unit: "Unit 4" },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", desc: "Rate under varying light, CO2, temperature.", cat: "biology", type: "calculator", status: "active", comp: "BiologyPhotosynthesisCalculator", color: "#22c55e", unit: "Unit 4" },

  // CALCULATORS MATH
  { id: "math-calc-deriv", title: "Derivative Calculator", desc: "Compute derivatives and integrals.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Calculus", extra: 'defaultTab="derivative"' },
  { id: "math-calc-quad", title: "Quadratic Solver", desc: "Solve ax^2+bx+c=0.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extra: 'defaultTab="quadratic"' },
  { id: "math-calc-stats", title: "Statistics Calculator", desc: "Mean, median, mode, std dev.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Statistics", extra: 'defaultTab="statistics"' },
  { id: "math-calc-matrix", title: "Matrix Calculator", desc: "Add, multiply, transpose matrices.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extra: 'defaultTab="matrix"' },
  { id: "math-calc-trig", title: "Trigonometry Lab", desc: "Unit circle, sin/cos/tan graphing.", cat: "mathematics", type: "calculator", status: "active", comp: "MathTrigonometry", color: "#8b5cf6", unit: "Unit: Trigonometry" },
  { id: "math-calc-series", title: "Sequences & Series", desc: "AP and GP.", cat: "mathematics", type: "calculator", status: "active", comp: "MathSeriesLab", color: "#8b5cf6", unit: "Unit: Sequences" },
  { id: "math-calc-vectors", title: "Vector Operations", desc: "Add, dot product, cross product.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Vectors", extra: 'defaultTab="vectors"' },
  { id: "math-calc-limit", title: "Limit Calculator", desc: "Estimate limits numerically.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Calculus", extra: 'defaultTab="limit"' },
  { id: "math-calc-system", title: "System Solver", desc: "Solve 2x2 and 3x3 linear systems.", cat: "mathematics", type: "calculator", status: "active", comp: "MathInteractive", color: "#8b5cf6", unit: "Unit: Algebra", extra: 'defaultTab="system"' },

  // CLASS 11
  { id: "class11-physics", title: "Class 11 Physics 3D Plus", desc: "Extended 3D physics.", cat: "class11", type: "3d", status: "new", comp: "Class11Physics3DPlus", color: "#f43f5e", unit: "Class 11 Physics" },
  { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", desc: "Extended 3D chemistry.", cat: "class11", type: "3d", status: "new", comp: "Class11Chemistry3DPlus", color: "#f43f5e", unit: "Class 11 Chemistry" },
  { id: "class11-math", title: "Class 11 Math 3D Plus", desc: "Extended 3D math.", cat: "class11", type: "3d", status: "new", comp: "Class11Math3DPlus", color: "#f43f5e", unit: "Class 11 Math" },
  { id: "class11-biology", title: "Class 11 Biology 3D Plus", desc: "Extended 3D biology.", cat: "class11", type: "3d", status: "new", comp: "Class11Biology3DPlus", color: "#f43f5e", unit: "Class 11 Biology" },

  // PREMIUM
  { id: "ai-tutor", title: "AI Lab Tutor", desc: "Get instant help with lab concepts.", cat: "physics", type: "calculator", status: "premium", comp: "PremiumPlaceholder", color: "#f59e0b", unit: "Premium", extra: 'title="AI Lab Tutor" description="Get instant help with lab concepts."' },
  { id: "advanced-circuit", title: "Advanced Circuit Simulator", desc: "Build and test complex circuits with 50+ components.", cat: "physics", type: "calculator", status: "premium", comp: "PremiumAdvancedCircuitSimulator", color: "#f59e0b", unit: "Premium" },
  { id: "molecular-builder", title: "Molecular Builder 3D", desc: "Build any molecule from scratch.", cat: "chemistry", type: "3d", status: "premium", comp: "PremiumPlaceholder", color: "#f59e0b", unit: "Premium", extra: 'title="Molecular Builder 3D" description="Build molecules from scratch."' },
  { id: "equation-solver", title: "Universal Equation Solver", desc: "Solve any physics, chemistry, or math equation.", cat: "mathematics", type: "calculator", status: "premium", comp: "PremiumEquationSolver", color: "#f59e0b", unit: "Premium" },
];

const BIO_SKIP_SLUGS = ["biomolecules-3d","cell-3d","cell-division-3d","floral-3d","micro-3d","ecology-3d","evolution-3d","faunal-3d","biota-3d","conservation-3d"];

function slugify(id) { return id.replace(/[^a-z0-9-]/gi, "-").toLowerCase(); }

function genPage(lab) {
  const slug = slugify(lab.id);
  const catDir = lab.cat === "class11" ? "class11" : lab.cat;
  const compName = lab.comp.replace(/[^a-zA-Z0-9]/g, "");
  const extra = lab.extra ? " " + lab.extra : "";
  const statusLabel = lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active";
  const statusCls = lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
    : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
  const related = LABS.filter((l) => l.cat === lab.cat && l.id !== lab.id).slice(0, 6);
  const relatedJson = JSON.stringify(related.map((r) => ({ id: r.id, title: r.title })));
  const shortDesc = lab.desc.length > 60 ? lab.desc.slice(0, 57) + "..." : lab.desc;

  const bt = "`";
  const bs = "\\$";
  return '"use client";\n\n' +
    'import Link from "next/link";\n' +
    'import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";\n' +
    'import { ' + lab.comp + ' } from "@/components/lab/' + slug + '";\n\n' +
    'export default function ' + compName + 'Page() {\n' +
    '  return (\n' +
    '    <div className="min-h-screen bg-background">\n' +
    '      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">\n' +
    '        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">\n' +
    '          <div className="flex items-center gap-3">\n' +
    '            <Link href="/lab/' + catDir + '" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">\n' +
    '              <ArrowLeft className="h-4 w-4" />\n' +
    '              <span className="hidden sm:inline">Back to ' + lab.cat.charAt(0).toUpperCase() + lab.cat.slice(1) + ' Lab</span>\n' +
    '            </Link>\n' +
    '            <div className="h-5 w-px bg-border" />\n' +
    '            <div className="flex items-center gap-2">\n' +
    '              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "' + lab.color + '18" }}>\n' +
    '                <Cuboid className="h-4 w-4" style={{ color: "' + lab.color + '" }} />\n' +
    '              </div>\n' +
    '              <div>\n' +
    '                <h1 className="text-sm font-semibold leading-none">' + lab.title + '</h1>\n' +
    '                <p className="text-[10px] text-muted-foreground mt-0.5">' + lab.unit + ' · ' + shortDesc + '</p>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <div className="flex items-center gap-2">\n' +
    '            {lab.type === "theory" && (\n' +
    '              <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n' +
    '                <BookOpen className="h-3.5 w-3.5" />\n' +
    '                <span className="hidden sm:inline">All Theory</span>\n' +
    '              </Link>\n' +
    '            )}\n' +
    '            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n' +
    '              <Cuboid className="h-3.5 w-3.5" />\n' +
    '              <span className="hidden sm:inline">All 3D</span>\n' +
    '            </Link>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n\n' +
    '      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-5">\n' +
    '        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">\n' +
    '          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, ' + lab.color + '08, transparent)" }}>\n' +
    '            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "' + lab.color + '18" }}>\n' +
    '              <Cuboid className="h-4 w-4" style={{ color: "' + lab.color + '" }} />\n' +
    '            </div>\n' +
    '            <div className="flex-1 min-w-0">\n' +
    '              <h2 className="font-semibold text-base">' + lab.title + '</h2>\n' +
    '              <p className="text-xs text-muted-foreground truncate">' + lab.desc + '</p>\n' +
    '            </div>\n' +
    '            <span className={' + bt + 'shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusCls}' + bt + '}>\n' +
    '              ' + statusLabel + '\n' +
    '            </span>\n' +
    '          </div>\n' +
    '          <div className="p-5">\n' +
    '            <' + lab.comp + extra + ' />\n' +
    '          </div>\n' +
    '        </div>\n\n' +
    '        <div className="mt-5">\n' +
    '          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>\n' +
    '          <div className="flex flex-wrap gap-2">\n' +
    '            {' + relatedJson + '.map((l) => (\n' +
    '              <Link key={l.id} href={"/lab/" + l.id} className="stat-pill">\n' +
    '                <span className="text-muted-foreground">{l.title}</span>\n' +
    '              </Link>\n' +
    '            ))}\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  );\n' +
    '}\n';
}

function genCatPage(category, labs) {
  const colors = { physics: "#3b82f6", chemistry: "#10b981", mathematics: "#8b5cf6", biology: "#22c55e", class11: "#f43f5e" };
  const color = colors[category] || "#64748b";
  const label = category === "class11" ? "Class 11" : category.charAt(0).toUpperCase() + category.slice(1);
  const labsJson = JSON.stringify(labs.map((l) => ({ id: l.id, title: l.title, description: l.desc, type: l.type, status: l.status, color: l.color, unit: l.unit })), null, 2);
  const className = label.replace(/\s+/g, "") + "LabPage";

  const bt = "`";
  const dl = "${";
  return '"use client";\n\n' +
    'import { useState } from "react";\n' +
    'import Link from "next/link";\n' +
    'import { Cuboid, BookOpen, Calculator } from "lucide-react";\n\n' +
    'const LABS = ' + labsJson + ';\n\n' +
    'type Tab = "3d" | "theory" | "calculator";\n\n' +
    'export default function ' + className + '() {\n' +
    '  const [activeTab, setActiveTab] = useState<Tab>("3d");\n' +
    '  const filtered = LABS.filter((l) =>\n' +
    '    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"\n' +
    '  );\n\n' +
    '  return (\n' +
    '    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">\n' +
    '      <div>\n' +
    '        <div className="flex items-center gap-3 mb-2">\n' +
    '          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "' + color + '20" }}>\n' +
    '            <Cuboid className="h-5 w-5" style={{ color }} />\n' +
    '          </div>\n' +
    '          <div>\n' +
    '            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">' + label + ' Lab 3D</h1>\n' +
    '            <p className="text-sm text-muted-foreground">' + labs.length + ' interactive labs · Syllabus-aligned</p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">\n' +
    '          ← Back to all labs\n' +
    '        </Link>\n' +
    '      </div>\n\n' +
    '      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">\n' +
    '        {(["3d", "theory", "calculator"] as const).map((t) => {\n' +
    '          const count = LABS.filter((l) => (t === "3d" ? l.type === "3d" : t === "theory" ? l.type === "theory" : l.type === "calculator")).length;\n' +
    '          const isActive = activeTab === t;\n' +
    '          return (\n' +
    '            <button key={t} onClick={() => setActiveTab(t)}\n' +
    '              className={' + bt + 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ' + dl + 'isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}' + bt + '}>\n' +
    '              {t === "3d" && <Cuboid className="h-4 w-4" />}\n' +
    '              {t === "theory" && <BookOpen className="h-4 w-4" />}\n' +
    '              {t === "calculator" && <Calculator className="h-4 w-4" />}\n' +
    '              <span className="capitalize">{t}</span>\n' +
    '              <span className="text-xs opacity-70">({count})</span>\n' +
    '            </button>\n' +
    '          );\n' +
    '        })}\n' +
    '      </div>\n\n' +
    '      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">\n' +
    '        {filtered.map((lab) => (\n' +
    '          <Link key={lab.id} href={' + bt + '/lab/' + dl + 'lab.id}' + bt + '} className="block group">\n' +
    '            <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 h-full flex flex-col">\n' +
    '              <div className="flex items-start gap-3">\n' +
    '                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "' + dl + 'lab.color}18" }}>\n' +
    '                  {lab.type === "3d" && <Cuboid className="h-4 w-4" style={{ color: lab.color }} />}\n' +
    '                  {lab.type === "theory" && <BookOpen className="h-4 w-4" style={{ color: lab.color }} />}\n' +
    '                  {lab.type === "calculator" && <Calculator className="h-4 w-4" style={{ color: lab.color }} />}\n' +
    '                </div>\n' +
    '                <div className="min-w-0 flex-1">\n' +
    '                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>\n' +
    '                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div className="mt-3 flex items-center justify-between">\n' +
    '                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: "' + dl + 'lab.color}40", color: lab.color, backgroundColor: "' + dl + 'lab.color}10" }}>{lab.unit ?? lab.type}</span>\n' +
    '                <span className={' + bt + 'text-[10px] px-2 py-0.5 rounded-full font-medium ' + dl + 'lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}' + bt + '}>\n' +
    '                  {lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active"}\n' +
    '                </span>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </Link>\n' +
    '        ))}\n' +
    '      </div>\n\n' +
    '      {filtered.length === 0 && (\n' +
    '        <div className="py-16 text-center text-muted-foreground">\n' +
    '          <p className="text-sm">No {activeTab} labs found for ' + label + '.</p>\n' +
    '        </div>\n' +
    '      )}\n' +
    '    </div>\n' +
    '  );\n' +
    '}\n';
}

// Main
const byCat = {};
for (const lab of LABS) {
  if (!byCat[lab.cat]) byCat[lab.cat] = [];
  byCat[lab.cat].push(lab);
}

let created = 0;

// Category hubs
for (const [cat, labs] of Object.entries(byCat)) {
  const dir = path.join(APP_DIR, cat);
  require("fs").mkdirSync(dir, { recursive: true });
  const pagePath = path.join(dir, "page.tsx");
  if (!require("fs").existsSync(pagePath)) {
    require("fs").writeFileSync(pagePath, genCatPage(cat, labs));
    console.log("✓ " + pagePath);
    created++;
  }
}

// Individual lab pages
for (const lab of LABS) {
  const slug = slugify(lab.id);
  const catDir = lab.cat === "class11" ? "class11" : lab.cat;
  const dir = path.join(APP_DIR, catDir, slug);
  require("fs").mkdirSync(dir, { recursive: true });
  const pagePath = path.join(dir, "page.tsx");

  // Skip biology custom pages
  if (lab.cat === "biology" && BIO_SKIP_SLUGS.includes(slug)) continue;
  if (require("fs").existsSync(pagePath)) continue;

  require("fs").writeFileSync(pagePath, genPage(lab));
  console.log("✓ " + pagePath);
  created++;
}

console.log("\nTotal pages generated: " + created);
