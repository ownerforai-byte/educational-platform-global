var fs = require("fs");
var path = require("path");
var APP_DIR = path.join(__dirname, "..", "frontend", "app", "lab");

// All lab IDs with their metadata
var LABS = [
  // PHYSICS 3D
  { id: "ph-3d-dynamics", title: "Dynamics 3D", desc: "Inclined plane, friction, elastic collision, momentum conservation.", comp: "PhysicsDynamics3D", file: "physics-dynamics-3d", cat: "physics", type: "3d", status: "active", unit: "Unit: Dynamics", color: "#3b82f6" },
  { id: "ph-3d-advanced", title: "Physics 3D Advanced", desc: "Electromagnetism, wave optics, relativity, quantum orbitals.", comp: "Physics3DAdvanced", file: "physics-advanced-3d", cat: "physics", type: "3d", status: "new", unit: "Unit: Modern Physics", color: "#3b82f6" },
  { id: "ph-3d-quantum", title: "Quantum 3D", desc: "Quantum mechanics — orbitals, probability distributions, spin.", comp: "Quantum3D", file: "quantum-3d", cat: "physics", type: "3d", status: "new", unit: "Unit: Modern Physics", color: "#3b82f6" },
  { id: "ph-3d-wave", title: "Wave Simulator 3D", desc: "Real-time 3D wave propagation.", comp: "PhysicsAdvancedMotionLab", file: "physics-advanced-motion", cat: "physics", type: "3d", status: "active", unit: "Unit: Waves", color: "#3b82f6" },
  { id: "ph-3d-pendulum", title: "Pendulum 3D", desc: "Pendulum with trail visualization.", comp: "PhysicsAdvancedMotionLab", file: "physics-advanced-motion", cat: "physics", type: "3d", status: "active", unit: "Unit: Oscillations", color: "#3b82f6" },
  { id: "ph-3d-em", title: "EM Wave 3D", desc: "EM wave propagation with E and B fields.", comp: "PhysicsMotionLab", file: "physics-motion-3d", cat: "physics", type: "3d", status: "active", unit: "Unit: EM Waves", color: "#3b82f6" },
  { id: "ph-3d-magnetic", title: "Magnetic Field 3D", desc: "Bar magnet field lines.", comp: "PhysicsMotionLab", file: "physics-motion-3d", cat: "physics", type: "3d", status: "active", unit: "Unit: Magnetism", color: "#3b82f6" },
  { id: "ph-3d-vectors", title: "Vector Addition 3D", desc: "3D vectors — components, dot/cross product.", comp: "Vectors3D", file: "physics-vectors-optics-3d", cat: "physics", type: "3d", status: "new", unit: "Unit: Vectors", color: "#3b82f6", named: true },
  { id: "ph-3d-optics", title: "Optics & Lens 3D", desc: "Ray diagrams for convex/concave lenses.", comp: "Optics3D", file: "physics-vectors-optics-3d", cat: "physics", type: "3d", status: "new", unit: "Unit: Optics", color: "#3b82f6", named: true },
  { id: "ph-3d-refraction", title: "Refraction 3D", desc: "Snell's law with TIR.", comp: "Refraction3D", file: "physics-vectors-optics-3d", cat: "physics", type: "3d", status: "new", unit: "Unit: Optics", color: "#3b82f6", named: true },
  { id: "ph-3d-classic", title: "Physics 3D Classic", desc: "Electric field, double pendulum.", comp: "Physics3D", file: "physics-3d", cat: "physics", type: "3d", status: "development", unit: "Unit: Classic", color: "#3b82f6" },
  // Heat
  { id: "heat-determinations", title: "Heat Determinations Suite", desc: "Lee's disc, Searle's bar, Newton cooling.", comp: "Physics3DHeatDeterminations", file: "physics-3d-heat-determinations", cat: "physics", type: "3d", status: "new", unit: "Unit: Heat", color: "#ef4444" },
  { id: "lees-disc", title: "Lee's Disc Experiment", desc: "Thermal conductivity of bad conductors.", comp: "LeesDiscExperiment", file: "physics-3d-lees-disc", cat: "physics", type: "3d", status: "new", unit: "Unit: Heat", color: "#ef4444" },
  { id: "searles-bar", title: "Searle's Bar Experiment", desc: "Thermal conductivity of good conductors.", comp: "SearlesBarExperiment", file: "physics-3d-searles-bar", cat: "physics", type: "3d", status: "new", unit: "Unit: Heat", color: "#ef4444" },
  { id: "newton-cooling", title: "Newton's Law of Cooling", desc: "Cooling constant k determination.", comp: "NewtonCoolingExperiment", file: "physics-3d-newtons-cooling", cat: "physics", type: "3d", status: "new", unit: "Unit: Heat", color: "#ef4444" },
  { id: "linear-expansion", title: "Linear Expansion", desc: "Coefficient of linear expansion.", comp: "LinearExpansionExperiment", file: "physics-3d-linear-expansion", cat: "physics", type: "3d", status: "new", unit: "Unit: Heat", color: "#ef4444" },
  // Suites
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite", desc: "Projectile, circular motion, momentum.", comp: "MechanicsSuite3D", file: "physics-3d-mechanics-i", cat: "physics", type: "3d", status: "new", unit: "Unit: Mechanics", color: "#3b82f6", named: true },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Gas Suite", desc: "Hooke's law, Young's modulus, ideal gas.", comp: "ElasticityGasSuite3D", file: "physics-3d-elasticity-gas", cat: "physics", type: "3d", status: "new", unit: "Unit: Elasticity", color: "#3b82f6", named: true },
  { id: "physics-electricity-suite-3d", title: "3D Electricity Suite", desc: "Capacitor, dielectric, meter bridge.", comp: "ElectricitySuite3D", file: "physics-3d-electricity-i", cat: "physics", type: "3d", status: "new", unit: "Unit: Electricity", color: "#3b82f6", named: true },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", desc: "Biot-Savart, Lorentz force, Faraday.", comp: "MagnetismEMISuite3D", file: "physics-3d-magnetism-emi", cat: "physics", type: "3d", status: "new", unit: "Unit: Magnetism", color: "#3b82f6", named: true },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", desc: "Young's double slit, diffraction.", comp: "WaveOpticsSuite3D", file: "physics-3d-wave-optics", cat: "physics", type: "3d", status: "new", unit: "Unit: Wave Optics", color: "#3b82f6", named: true },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics Suite", desc: "Photoelectric, Bohr, semiconductors.", comp: "ModernPhysicsSuite3D", file: "physics-3d-modern", cat: "physics", type: "3d", status: "new", unit: "Unit: Modern", color: "#3b82f6", named: true },
  // Symbols (default exports)
  { id: "symbols-mechanics", title: "Symbols — Mechanics", desc: "Pendulum & projectile labelled symbols.", comp: "MechanicsSymbols", file: "physics-3d-mechanics-symbols", cat: "physics", type: "3d", status: "new", unit: "Unit: Mechanics", color: "#3b82f6", defImp: true },
  { id: "symbols-electricity", title: "Symbols — Electricity", desc: "Ohm's law circuit labelled.", comp: "ElectricitySymbols", file: "physics-3d-electricity-symbols", cat: "physics", type: "3d", status: "new", unit: "Unit: Electricity", color: "#3b82f6", defImp: true },
  { id: "symbols-waves", title: "Symbols — Waves", desc: "Travelling wave labelled.", comp: "WavesSymbols", file: "physics-3d-waves-symbols", cat: "physics", type: "3d", status: "new", unit: "Unit: Waves", color: "#3b82f6", defImp: true },
  { id: "symbols-atomic", title: "Symbols — Atomic", desc: "Bohr model labelled.", comp: "AtomicSymbols", file: "physics-3d-atomic-symbols", cat: "physics", type: "3d", status: "new", unit: "Unit: Atomic", color: "#3b82f6", defImp: true },
  // CHEMISTRY
  { id: "ch-3d-periodic", title: "Periodic Table 3D", desc: "Interactive 3D periodic table.", comp: "ChemistryLab", file: "chemistry-lab", cat: "chemistry", type: "3d", status: "active", unit: "Unit: Periodicity", color: "#10b981" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", desc: "Molecular dynamics, VSEPR, spectroscopy.", comp: "ChemistryModern3D", file: "chemistry-modern-3d", cat: "chemistry", type: "3d", status: "new", unit: "Unit: All", color: "#10b981" },
  { id: "ch-3d-micro", title: "Microscopy 3D", desc: "Atomic structure, orbitals, crystal lattice.", comp: "ChemistryAdvanced3D", file: "chemistry-advanced-3d", cat: "chemistry", type: "3d", status: "active", unit: "Unit: Atomic", color: "#10b981" },
  // MATH
  { id: "math-3d-geometry", title: "3D Geometry", desc: "Points, lines, planes in 3D.", comp: "MathGeometry3D", file: "math-geometry-3d", cat: "math", type: "3d", status: "active", unit: "Unit: 3D Geo", color: "#8b5cf6" },
  { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", desc: "Saddle, wave, ripple, peak surfaces.", comp: "MathLab", file: "math-lab", cat: "math", type: "3d", status: "active", unit: "Unit: Calculus", color: "#8b5cf6" },
  { id: "math-3d-advanced", title: "Mathematics 3D Advanced", desc: "Surfaces + contours, Mandelbulb.", comp: "MathModern3D", file: "math-modern-3d", cat: "math", type: "3d", status: "new", unit: "Unit: Vector Calc", color: "#8b5cf6" },
  { id: "math-3d-fourier", title: "Fourier Series 3D", desc: "Square, sawtooth, triangle waves.", comp: "MathAdvancedMotionLab", file: "math-motion-3d", cat: "math", type: "3d", status: "active", unit: "Unit: Fourier", color: "#8b5cf6" },
  { id: "math-3d-decay", title: "Nuclear Decay Simulator", desc: "Stochastic radioactive decay.", comp: "MathAdvancedMotionLab", file: "math-motion-3d", cat: "math", type: "3d", status: "active", unit: "Unit: Exponential", color: "#8b5cf6" },
  { id: "symbols-math", title: "Symbols — Mathematics", desc: "Unit circle with theta, sin, cos, tan.", comp: "MathSymbols", file: "math-3d-symbols", cat: "math", type: "3d", status: "new", unit: "Unit: Trig", color: "#8b5cf6", defImp: true },
  // BIOLOGY (non-custom)
  { id: "bio-3d-cell", title: "Cell Structure 3D", desc: "Plant and animal cell ultrastructure.", comp: "BiologyCell3D", file: "biology-3d", cat: "biology", type: "3d", status: "active", unit: "Unit 1", color: "#22c55e" },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", desc: "Double helix, replication, transcription, translation.", comp: "BiologyDNA3D", file: "biology-3d", cat: "biology", type: "3d", status: "active", unit: "Unit 1", color: "#3b82f6" },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", desc: "Interactive deep-dive all units.", comp: "BiologyAdvanced3D", file: "biology-3d", cat: "biology", type: "3d", status: "new", unit: "All Units", color: "#10b981" },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", desc: "Food chains, biogeochemical cycles.", comp: "BiologyEcology3D", file: "biology-3d", cat: "biology", type: "3d", status: "new", unit: "Unit 4", color: "#22c55e" },
  { id: "bio-3d-human", title: "Human Body Systems 3D", desc: "Circulatory, respiratory, nervous systems.", comp: "BiologyHuman3D", file: "biology-3d", cat: "biology", type: "3d", status: "new", unit: "Unit 9", color: "#ef4444" },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", desc: "Phylogenetic trees, taxonomy.", comp: "BiologyEvolution3D", file: "biology-3d", cat: "biology", type: "3d", status: "new", unit: "Unit 7", color: "#f59e0b" },
  { id: "bio-calc-punnett", title: "Punnett Square Solver", desc: "Predict offspring genotypes.", comp: "BiologyPunnettCalculator", file: "biology-3d", cat: "biology", type: "calculator", status: "active", unit: "Unit 1", color: "#22c55e" },
  { id: "bio-calc-population", title: "Population Growth Calc", desc: "Exponential and logistic growth.", comp: "BiologyPopulationCalculator", file: "biology-3d", cat: "biology", type: "calculator", status: "active", unit: "Unit 4", color: "#22c55e" },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", desc: "Rate under varying conditions.", comp: "BiologyPhotosynthesisCalculator", file: "biology-3d", cat: "biology", type: "calculator", status: "active", unit: "Unit 4", color: "#22c55e" },
  // THEORY - physics
  { id: "ph-th-kinematics", title: "Kinematics Theory", desc: "Equations of motion, projectile motion.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Kinematics", color: "#3b82f6", extra: ' subject="physics" topic="kinematics"' },
  { id: "ph-th-laws", title: "Laws of Motion Theory", desc: "Newton's laws, friction.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Dynamics", color: "#3b82f6", extra: ' subject="physics" topic="laws-motion"' },
  { id: "ph-th-work", title: "Work & Energy Theory", desc: "Work-energy theorem, power.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Work Energy", color: "#3b82f6", extra: ' subject="physics" topic="work-energy"' },
  { id: "ph-th-grav", title: "Gravitation Theory", desc: "Universal gravitation, satellites.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Gravitation", color: "#3b82f6", extra: ' subject="physics" topic="gravitation"' },
  { id: "ph-th-thermo", title: "Thermodynamics Theory", desc: "Laws of thermo, heat engines.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Thermo", color: "#3b82f6", extra: ' subject="physics" topic="thermodynamics"' },
  { id: "ph-th-optics", title: "Optics Theory", desc: "Reflection, refraction, lenses.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Optics", color: "#3b82f6", extra: ' subject="physics" topic="optics"' },
  { id: "ph-th-electro", title: "Electrostatics Theory", desc: "Coulomb's law, capacitance.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Electrostatics", color: "#3b82f6", extra: ' subject="physics" topic="electrostatics"' },
  { id: "ph-th-current", title: "Current Electricity Theory", desc: "Ohm's law, Kirchhoff's laws.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Current", color: "#3b82f6", extra: ' subject="physics" topic="current"' },
  { id: "ph-th-emw", title: "EM Waves Theory", desc: "EM spectrum, polarization.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: EM Waves", color: "#3b82f6", extra: ' subject="physics" topic="emw"' },
  { id: "ph-th-modern", title: "Modern Physics Theory", desc: "Photoelectric effect, nuclear physics.", comp: "TheoryPanel", file: "theory-panel", cat: "physics", type: "theory", status: "active", unit: "Unit: Modern", color: "#3b82f6", extra: ' subject="physics" topic="modern"' },
  // THEORY - chemistry
  { id: "ch-th-atomic", title: "Atomic Structure Theory", desc: "Bohr model, quantum numbers.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Atomic", color: "#10b981", extra: ' subject="chemistry" topic="atomic"' },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", desc: "Ionic, covalent, VSEPR.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Bonding", color: "#10b981", extra: ' subject="chemistry" topic="bonding"' },
  { id: "ch-th-eq", title: "Equilibrium Theory", desc: "Le Chatelier's principle.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Equilibrium", color: "#10b981", extra: ' subject="chemistry" topic="equilibrium"' },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", desc: "Enthalpy, entropy, Gibbs.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Thermo", color: "#10b981", extra: ' subject="chemistry" topic="thermo"' },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", desc: "Reaction rates, activation energy.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Kinetics", color: "#10b981", extra: ' subject="chemistry" topic="kinetics"' },
  { id: "ch-th-acid", title: "Acid-Base Theory", desc: "pH, pOH, buffers.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Acid-Base", color: "#10b981", extra: ' subject="chemistry" topic="acid-base"' },
  { id: "ch-th-redox", title: "Redox Theory", desc: "Oxidation-reduction, cells.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Redox", color: "#10b981", extra: ' subject="chemistry" topic="redox"' },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", desc: "Hydrocarbons, nomenclature.", comp: "TheoryPanel", file: "theory-panel", cat: "chemistry", type: "theory", status: "active", unit: "Unit: Organic", color: "#10b981", extra: ' subject="chemistry" topic="organic"' },
  // THEORY - biology
  { id: "bio-th-cell", title: "Cell Theory & Structure", desc: "Cell theory, organelles.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 1", color: "#22c55e", extra: ' subject="biology" topic="cell"' },
  { id: "bio-th-genetics", title: "Genetics & Heredity", desc: "Mendelian genetics, DNA.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 1", color: "#22c55e", extra: ' subject="biology" topic="genetics"' },
  { id: "bio-th-ecology", title: "Ecology & Environment", desc: "Ecosystems, biogeochemical cycles.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 4", color: "#22c55e", extra: ' subject="biology" topic="ecology"' },
  { id: "bio-th-human", title: "Human Physiology", desc: "Organ systems.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 9", color: "#22c55e", extra: ' subject="biology" topic="human"' },
  { id: "bio-th-evolution", title: "Evolution & Classification", desc: "Origin of life, natural selection.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 7", color: "#22c55e", extra: ' subject="biology" topic="evolution"' },
  { id: "bio-th-plant", title: "Plant Physiology", desc: "Photosynthesis, transpiration.", comp: "TheoryPanel", file: "theory-panel", cat: "biology", type: "theory", status: "active", unit: "Unit 4", color: "#22c55e", extra: ' subject="biology" topic="plant"' },
  // THEORY - math
  { id: "math-th-calculus", title: "Calculus Theory", desc: "Limits, derivatives, integrals.", comp: "TheoryPanel", file: "theory-panel", cat: "math", type: "theory", status: "active", unit: "Unit: Calculus", color: "#8b5cf6", extra: ' subject="mathematics" topic="calculus"' },
  { id: "math-th-trig", title: "Trigonometry Theory", desc: "Identities, equations.", comp: "TheoryPanel", file: "theory-panel", cat: "math", type: "theory", status: "active", unit: "Unit: Trig", color: "#8b5cf6", extra: ' subject="mathematics" topic="trigonometry"' },
  { id: "math-th-algebra", title: "Algebra Theory", desc: "Matrices, complex numbers.", comp: "TheoryPanel", file: "theory-panel", cat: "math", type: "theory", status: "active", unit: "Unit: Algebra", color: "#8b5cf6", extra: ' subject="mathematics" topic="algebra"' },
  { id: "math-th-stats", title: "Statistics Theory", desc: "Probability, distributions.", comp: "TheoryPanel", file: "theory-panel", cat: "math", type: "theory", status: "active", unit: "Unit: Stats", color: "#8b5cf6", extra: ' subject="mathematics" topic="statistics"' },
  { id: "math-th-geo", title: "Coordinate Geometry Theory", desc: "Lines, circles, conics.", comp: "TheoryPanel", file: "theory-panel", cat: "math", type: "theory", status: "active", unit: "Unit: Geo", color: "#8b5cf6", extra: ' subject="mathematics" topic="geometry"' },
  // CALCULATORS - physics
  { id: "ph-calc-ohms", title: "Ohm's Law Calc", desc: "Calculate V, I, R.", comp: "PhysicsInteractive", file: "physics-interactive", cat: "physics", type: "calculator", status: "active", unit: "Unit: Electricity", color: "#3b82f6", extra: ' defaultTab="ohms"' },
  { id: "ph-calc-heat", title: "Heat Calculator", desc: "Calorimetry, latent heat.", comp: "PhysicsHeatLab", file: "physics-heat", cat: "physics", type: "calculator", status: "active", unit: "Unit: Heat", color: "#ef4444" },
  { id: "ph-calc-optics", title: "Optics Lab", desc: "Reflection, refraction.", comp: "PhysicsOptics", file: "physics-optics", cat: "physics", type: "calculator", status: "active", unit: "Unit: Optics", color: "#3b82f6" },
  { id: "ph-calc-projectile", title: "Projectile Motion", desc: "Launch projectiles.", comp: "PhysicsLab", file: "physics-lab", cat: "physics", type: "calculator", status: "active", unit: "Unit: Kinematics", color: "#3b82f6" },
  // CALCULATORS - chemistry
  { id: "ch-calc-ph", title: "pH Calculator", desc: "Calculate pH.", comp: "ChemistryInteractive", file: "chemistry-interactive", cat: "chemistry", type: "calculator", status: "active", unit: "Unit: Acid-Base", color: "#10b981", extra: ' defaultTab="ph"' },
  { id: "ch-calc-titration", title: "Titration Simulator", desc: "Strong acid-strong base.", comp: "ChemistryInteractive", file: "chemistry-interactive", cat: "chemistry", type: "calculator", status: "active", unit: "Unit: Equilibrium", color: "#10b981", extra: ' defaultTab="titration"' },
  { id: "ch-calc-gas", title: "Gas Laws Calc", desc: "Boyle's, Charles's law.", comp: "ChemistryInteractive", file: "chemistry-interactive", cat: "chemistry", type: "calculator", status: "active", unit: "Unit: Gases", color: "#10b981", extra: ' defaultTab="gaslaws"' },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", desc: "Enter formula, get mass.", comp: "ChemistryInteractive", file: "chemistry-interactive", cat: "chemistry", type: "calculator", status: "active", unit: "Unit: Stoichiometry", color: "#10b981", extra: ' defaultTab="molarmass"' },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", desc: "Moles, limiting reagent.", comp: "ChemistryStoichiometry", file: "chemistry-stoichiometry", cat: "chemistry", type: "calculator", status: "active", unit: "Unit: Stoichiometry", color: "#10b981" },
  // CALCULATORS - math
  { id: "math-calc-deriv", title: "Derivative Calculator", desc: "Compute derivatives.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Calculus", color: "#8b5cf6", extra: ' defaultTab="derivative"' },
  { id: "math-calc-quad", title: "Quadratic Solver", desc: "Solve ax^2+bx+c=0.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Algebra", color: "#8b5cf6", extra: ' defaultTab="quadratic"' },
  { id: "math-calc-stats", title: "Statistics Calculator", desc: "Mean, median, mode.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Stats", color: "#8b5cf6", extra: ' defaultTab="statistics"' },
  { id: "math-calc-matrix", title: "Matrix Calculator", desc: "Add, multiply, transpose.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Algebra", color: "#8b5cf6", extra: ' defaultTab="matrix"' },
  { id: "math-calc-trig", title: "Trigonometry Lab", desc: "Unit circle, graphs.", comp: "MathTrigonometry", file: "math-trigonometry", cat: "math", type: "calculator", status: "active", unit: "Unit: Trig", color: "#8b5cf6" },
  { id: "math-calc-series", title: "Sequences & Series", desc: "AP and GP.", comp: "MathSeriesLab", file: "math-series-lab", cat: "math", type: "calculator", status: "active", unit: "Unit: Sequences", color: "#8b5cf6" },
  { id: "math-calc-vectors", title: "Vector Operations", desc: "Dot/cross product.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Vectors", color: "#8b5cf6", extra: ' defaultTab="vectors"' },
  { id: "math-calc-limit", title: "Limit Calculator", desc: "Estimate limits.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Calculus", color: "#8b5cf6", extra: ' defaultTab="limit"' },
  { id: "math-calc-system", title: "System Solver", desc: "2x2 and 3x3 systems.", comp: "MathInteractive", file: "math-interactive", cat: "math", type: "calculator", status: "active", unit: "Unit: Algebra", color: "#8b5cf6", extra: ' defaultTab="system"' },
  // CLASS 11
  { id: "class11-physics", title: "Class 11 Physics 3D Plus", desc: "Extended 3D physics.", comp: "Class11Physics3DPlus", file: "class11/class11-physics-3d-plus", cat: "class11", type: "3d", status: "new", unit: "Class 11 Physics", color: "#f43f5e" },
  { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", desc: "Extended 3D chemistry.", comp: "Class11Chemistry3DPlus", file: "class11/class11-chemistry-3d-plus", cat: "class11", type: "3d", status: "new", unit: "Class 11 Chemistry", color: "#f43f5e" },
  { id: "class11-math", title: "Class 11 Math 3D Plus", desc: "Extended 3D math.", comp: "Class11Math3DPlus", file: "class11/class11-math-3d-plus", cat: "class11", type: "3d", status: "new", unit: "Class 11 Math", color: "#f43f5e" },
  { id: "class11-biology", title: "Class 11 Biology 3D Plus", desc: "Extended 3D biology.", comp: "Class11Biology3DPlus", file: "class11/class11-biology-3d-plus", cat: "class11", type: "3d", status: "new", unit: "Class 11 Biology", color: "#f43f5e" },
  // PREMIUM
  { id: "ai-tutor", title: "AI Lab Tutor", desc: "Get instant help.", comp: "PremiumPlaceholder", file: "premium-placeholder", cat: "physics", type: "calculator", status: "premium", unit: "Premium", color: "#f59e0b", extra: ' title="AI Lab Tutor" description="Get instant help."' },
  { id: "advanced-circuit", title: "Advanced Circuit Simulator", desc: "50+ components.", comp: "PremiumAdvancedCircuitSimulator", file: "premium-advanced-circuit", cat: "physics", type: "calculator", status: "premium", unit: "Premium", color: "#f59e0b" },
  { id: "molecular-builder", title: "Molecular Builder 3D", desc: "Build molecules.", comp: "PremiumPlaceholder", file: "premium-placeholder", cat: "chemistry", type: "3d", status: "premium", unit: "Premium", color: "#f59e0b", extra: ' title="Molecular Builder 3D" description="Build molecules."' },
  { id: "equation-solver", title: "Universal Equation Solver", desc: "Solve any equation.", comp: "PremiumEquationSolver", file: "premium-equation-solver", cat: "math", type: "calculator", status: "premium", unit: "Premium", color: "#f59e0b" },
];

function slug(id) { return id.replace(/[^a-z0-9-]/gi, "-").toLowerCase(); }

function genPage(l) {
  var s = slug(l.id);
  var catDir = l.cat === "math" ? "math" : l.cat === "class11" ? "class11" : l.cat;
  var compName = l.comp.replace(/[^a-zA-Z0-9]/g, "") + "Page";
  var extra = l.extra || "";
  var shortDesc = l.desc.length > 55 ? l.desc.substring(0, 52) + "..." : l.desc;
  var statusLabel = l.status === "premium" ? "Premium" : l.status === "new" ? "New" : l.status === "development" ? "Dev" : "Active";
  var statusCls = l.status === "premium"
    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
    : l.status === "new"
    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";

  var related = LABS.filter(function(r) { return r.cat === l.cat && r.id !== l.id; }).slice(0, 6).map(function(r) { return "{ id: '" + r.id + "', title: '" + r.title + "' }"; });

  var impType = l.defImp ? "import " + l.comp + " from" : "import { " + l.comp + " } from";
  var theoryCheck = l.type === "theory" ? '            {"theory" === "theory" && (\n              <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n                <BookOpen className="h-3.5 w-3.5" />\n                <span className="hidden sm:inline">All Theory</span>\n              </Link>\n            )}' : "";
  var calcCheck = l.type === "calculator" ? '            {"calculator" === "calculator" && (\n              <Link href="/lab/calculators" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n                <span className="h-3.5 w-3.5">+</span>\n                <span className="hidden sm:inline">Calculators</span>\n              </Link>\n            )}' : "";

  var code = '"use client";\n\n';
  code += 'import Link from "next/link";\n';
  code += 'import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";\n';
  code += impType + ' "@/components/lab/' + l.file + '";\n\n';
  code += 'export default function ' + compName + '() {\n';
  code += '  return (\n';
  code += '    <div className="min-h-screen bg-background">\n';
  code += '      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">\n';
  code += '        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">\n';
  code += '          <div className="flex items-center gap-3">\n';
  code += '            <Link href="/lab/' + catDir + '" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">\n';
  code += '              <ArrowLeft className="h-4 w-4" />\n';
  code += '              <span className="hidden sm:inline">Back to ' + l.cat.charAt(0).toUpperCase() + l.cat.slice(1) + ' Lab</span>\n';
  code += '            </Link>\n';
  code += '            <div className="h-5 w-px bg-border" />\n';
  code += '            <div className="flex items-center gap-2">\n';
  code += '              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "' + l.color + '18" }}>\n';
  code += '                <Cuboid className="h-4 w-4" style={{ color: "' + l.color + '" }} />\n';
  code += '              </div>\n';
  code += '              <div>\n';
  code += '                <h1 className="text-sm font-semibold leading-none">' + l.title + '</h1>\n';
  code += '                <p className="text-[10px] text-muted-foreground mt-0.5">' + l.unit + ' · ' + shortDesc + '</p>\n';
  code += '              </div>\n';
  code += '            </div>\n';
  code += '          </div>\n';
  code += '          <div className="flex items-center gap-2">\n';
  if (l.type === "theory") {
    code += '            <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n';
    code += '              <BookOpen className="h-3.5 w-3.5" />\n';
    code += '              <span className="hidden sm:inline">All Theory</span>\n';
    code += '            </Link>\n';
  }
  code += '            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">\n';
  code += '              <Cuboid className="h-3.5 w-3.5" />\n';
  code += '              <span className="hidden sm:inline">All 3D</span>\n';
  code += '            </Link>\n';
  code += '          </div>\n';
  code += '        </div>\n';
  code += '      </div>\n';
  code += '      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-5">\n';
  code += '        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">\n';
  code += '          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, ' + l.color + '08, transparent)" }}>\n';
  code += '            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "' + l.color + '18" }}>\n';
  code += '              <Cuboid className="h-4 w-4" style={{ color: "' + l.color + '" }} />\n';
  code += '            </div>\n';
  code += '            <div className="flex-1 min-w-0">\n';
  code += '              <h2 className="font-semibold text-base">' + l.title + '</h2>\n';
  code += '              <p className="text-xs text-muted-foreground truncate">' + l.desc + '</p>\n';
  code += '            </div>\n';
  code += '            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ' + statusCls + '`}>' + statusLabel + '</span>\n';
  code += '          </div>\n';
  code += '          <div className="p-5">\n';
  code += '            <' + l.comp + extra + ' />\n';
  code += '          </div>\n';
  code += '        </div>\n';
  code += '        <div className="mt-5">\n';
  code += '          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>\n';
  code += '          <div className="flex flex-wrap gap-2">\n';
  code += '            {[' + related.join(", ") + '].map((l) => (\n';
  code += '              <Link key={l.id} href={"/lab/" + l.id} className="stat-pill">\n';
  code += '                <span className="text-muted-foreground">{l.title}</span>\n';
  code += '              </Link>\n';
  code += '            ))}\n';
  code += '          </div>\n';
  code += '        </div>\n';
  code += '      </div>\n';
  code += '    </div>\n';
  code += '  );\n';
  code += '}\n';
  return { code: code, catDir: catDir, slug: s };
}

function genCatPage(cat, labs) {
  var colors = { physics: "#3b82f6", chemistry: "#10b981", math: "#8b5cf6", biology: "#22c55e", class11: "#f43f5e" };
  var color = colors[cat] || "#64748b";
  var label = cat === "class11" ? "Class 11" : cat.charAt(0).toUpperCase() + cat.slice(1);
  var labsJson = JSON.stringify(labs.map(function(l) { return { id: l.id, title: l.title, description: l.desc, type: l.type, status: l.status, color: l.color, unit: l.unit }; }), null, 2);
  var className = label.replace(/\s+/g, "") + "LabPage";

  var code = '"use client";\n\n';
  code += 'import { useState } from "react";\n';
  code += 'import Link from "next/link";\n';
  code += 'import { Cuboid, BookOpen, Calculator } from "lucide-react";\n\n';
  code += 'const LABS = ' + labsJson + ';\n\n';
  code += 'type Tab = "3d" | "theory" | "calculator";\n\n';
  code += 'export default function ' + className + '() {\n';
  code += '  const [activeTab, setActiveTab] = useState<Tab>("3d");\n';
  code += '  const filtered = LABS.filter((l) =>\n';
  code += '    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"\n';
  code += '  );\n\n';
  code += '  return (\n';
  code += '    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">\n';
  code += '      <div>\n';
  code += '        <div className="flex items-center gap-3 mb-2">\n';
  code += '          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "' + color + '20" }}>\n';
  code += '            <Cuboid className="h-5 w-5 text-' + (cat === "physics" ? "blue" : cat === "chemistry" ? "emerald" : cat === "math" ? "violet" : cat === "biology" ? "green" : "rose") + '-600" />\n';
  code += '          </div>\n';
  code += '          <div>\n';
  code += '            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">' + label + ' Lab 3D</h1>\n';
  code += '            <p className="text-sm text-muted-foreground">' + labs.length + ' interactive labs · Syllabus-aligned</p>\n';
  code += '          </div>\n';
  code += '        </div>\n';
  code += '        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">\n';
  code += '          ← Back to all labs\n';
  code += '        </Link>\n';
  code += '      </div>\n\n';
  code += '      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">\n';
  code += '        {(["3d", "theory", "calculator"] as const).map((t) => {\n';
  code += '          const count = LABS.filter((l) => (t === "3d" ? l.type === "3d" : t === "theory" ? l.type === "theory" : l.type === "calculator")).length;\n';
  code += '          const isActive = activeTab === t;\n';
  code += '          return (\n';
  code += '            <button key={t} onClick={() => setActiveTab(t)}\n';
  code += '              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>\n';
  code += '              {t === "3d" && <Cuboid className="h-4 w-4" />}\n';
  code += '              {t === "theory" && <BookOpen className="h-4 w-4" />}\n';
  code += '              {t === "calculator" && <Calculator className="h-4 w-4" />}\n';
  code += '              <span className="capitalize">{t}</span>\n';
  code += '              <span className="text-xs opacity-70">({count})</span>\n';
  code += '            </button>\n';
  code += '          );\n';
  code += '        })}\n';
  code += '      </div>\n\n';
  code += '      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">\n';
  code += '        {filtered.map((lab) => (\n';
  code += '          <Link key={lab.id} href={`/lab/${lab.id}`} className="block group">\n';
  code += '            <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 h-full flex flex-col">\n';
  code += '              <div className="flex items-start gap-3">\n';
  code += '                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "${lab.color}18" }}>\n';
  code += '                  {lab.type === "3d" && <Cuboid className="h-4 w-4" style={{ color: lab.color }} />}\n';
  code += '                  {lab.type === "theory" && <BookOpen className="h-4 w-4" style={{ color: lab.color }} />}\n';
  code += '                  {lab.type === "calculator" && <Calculator className="h-4 w-4" style={{ color: lab.color }} />}\n';
  code += '                </div>\n';
  code += '                <div className="min-w-0 flex-1">\n';
  code += '                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>\n';
  code += '                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>\n';
  code += '                </div>\n';
  code += '              </div>\n';
  code += '              <div className="mt-3 flex items-center justify-between">\n';
  code += '                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: "${lab.color}40", color: lab.color, backgroundColor: "${lab.color}10" }}>{lab.unit ?? lab.type}</span>\n';
  code += '                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>\n';
  code += '                  {lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active"}\n';
  code += '                </span>\n';
  code += '              </div>\n';
  code += '            </div>\n';
  code += '          </Link>\n';
  code += '        ))}\n';
  code += '      </div>\n\n';
  code += '      {filtered.length === 0 && (\n';
  code += '        <div className="py-16 text-center text-muted-foreground">\n';
  code += '          <p className="text-sm">No {activeTab} labs found for ' + label + '.</p>\n';
  code += '        </div>\n';
  code += '      )}\n';
  code += '    </div>\n';
  code += '  );\n';
  code += '}\n';
  return code;
}

function main() {
  var byCat = {};
  for (var i = 0; i < LABS.length; i++) {
    var l = LABS[i];
    if (!byCat[l.cat]) byCat[l.cat] = [];
    byCat[l.cat].push(l);
  }

  var created = 0;
  var skipped = 0;

  // Category hubs
  var catDirs = { physics: "physics", chemistry: "chemistry", math: "math", biology: "biology", class11: "class11" };
  for (var cat in byCat) {
    var dir = path.join(APP_DIR, catDirs[cat] || cat);
    fs.mkdirSync(dir, { recursive: true });
    var hubPath = path.join(dir, "page.tsx");
    if (!fs.existsSync(hubPath)) {
      fs.writeFileSync(hubPath, genCatPage(cat, byCat[cat]), "utf8");
      console.log("✓ " + hubPath);
      created++;
    } else {
      console.log("  (skip hub) " + hubPath);
    }
  }

  // Individual pages
  for (var j = 0; j < LABS.length; j++) {
    var lab = LABS[j];
    var catDir = catDirs[lab.cat] || lab.cat;
    var dir = path.join(APP_DIR, catDir, slug(lab.id));
    fs.mkdirSync(dir, { recursive: true });
    var pagePath = path.join(dir, "page.tsx");

    if (fs.existsSync(pagePath)) {
      skipped++;
      continue;
    }

    var result = genPage(lab);
    fs.writeFileSync(pagePath, result.code, "utf8");
    console.log("✓ " + pagePath);
    created++;
  }

  console.log("\nTotal: created=" + created + ", skipped=" + skipped);
}

main();
