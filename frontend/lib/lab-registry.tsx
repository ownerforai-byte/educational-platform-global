"use client";

import type { ReactNode } from "react";
import { LabContainer } from "@/components/lab/lab-workspace";
import { TheoryPanel } from "@/components/lab/theory-panel";

// Physics 3D
import { PhysicsDynamics3D } from "@/components/lab/physics-dynamics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";
import { Quantum3D } from "@/components/lab/quantum-3d";
import { PhysicsAdvancedMotionLab } from "@/components/lab/physics-advanced-motion";
import { PhysicsMotionLab } from "@/components/lab/physics-motion-3d";
import { Physics3D } from "@/components/lab/physics-3d";
import { Vectors3D, Optics3D, Refraction3D } from "@/components/lab/physics-vectors-optics-3d";
import { Physics3DHeatDeterminations } from "@/components/lab/physics-3d-heat-determinations";
import { LeesDiscExperiment } from "@/components/lab/physics-3d-lees-disc";
import { SearlesBarExperiment } from "@/components/lab/physics-3d-searles-bar";
import { NewtonCoolingExperiment } from "@/components/lab/physics-3d-newtons-cooling";
import { LinearExpansionExperiment } from "@/components/lab/physics-3d-linear-expansion";
import { MechanicsSuite3D } from "@/components/lab/physics-3d-mechanics-i";
import { ElasticityGasSuite3D } from "@/components/lab/physics-3d-elasticity-gas";
import { ElectricitySuite3D } from "@/components/lab/physics-3d-electricity-i";
import { MagnetismEMISuite3D } from "@/components/lab/physics-3d-magnetism-emi";
import { WaveOpticsSuite3D } from "@/components/lab/physics-3d-wave-optics";
import { ModernPhysicsSuite3D } from "@/components/lab/physics-3d-modern";
import MechanicsSymbols from "@/components/lab/physics-3d-mechanics-symbols";
import ElectricitySymbols from "@/components/lab/physics-3d-electricity-symbols";
import WavesSymbols from "@/components/lab/physics-3d-waves-symbols";
import AtomicSymbols from "@/components/lab/physics-3d-atomic-symbols";

// Chemistry
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { ChemistryModern3D } from "@/components/lab/chemistry-modern-3d";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { ChemistryInteractive } from "@/components/lab/chemistry-interactive";
import { ChemistryStoichiometry } from "@/components/lab/chemistry-stoichiometry";

// Math
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { MathAdvancedMotionLab } from "@/components/lab/math-motion-3d";
import { MathInteractive } from "@/components/lab/math-interactive";
import { MathSeriesLab } from "@/components/lab/math-series-lab";
import MathSymbols from "@/components/lab/math-3d-symbols";

// Biology — Core
import {
  BiologyCell3D, BiologyDNA3D, BiologyEcology3D, BiologyHuman3D, BiologyEvolution3D,
  BiologyPunnettCalculator, BiologyPopulationCalculator, BiologyPhotosynthesisCalculator,
  BiologyAdvanced3D,
} from "@/components/lab/biology-3d";

// Biology — Expanded syllabus components
import { BiologyBiomolecules3D } from "@/components/lab/biology-biomolecules-3d";
import { BiologyCell3D as BiologyCellUltraStructure3D } from "@/components/lab/biology-cell-3d";
import { BiologyCellDivision3D } from "@/components/lab/biology-cell-division-3d";
import { BiologyFloralDiversity3D } from "@/components/lab/biology-floral-diversity-3d";
import { BiologyMicrobiology3D } from "@/components/lab/biology-microbiology-3d";
import { BiologyEcology3D as BiologyEcologyExpanded3D } from "@/components/lab/biology-ecology-3d";
import { BiologyEvolution3D as BiologyEvolutionExpanded3D } from "@/components/lab/biology-evolution-3d";
import { BiologyFaunalDiversity3D } from "@/components/lab/biology-faunal-diversity-3d";
import { BiologyBiotaConservation3D } from "@/components/lab/biology-biota-conservation-3d";

// Class 11
import { Class11Physics3DPlus } from "@/components/lab/class11/class11-physics-3d-plus";
import { Class11Chemistry3DPlus } from "@/components/lab/class11/class11-chemistry-3d-plus";
import { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";
import { Class11Biology3DPlus } from "@/components/lab/class11/class11-biology-3d-plus";

// Premium
import { PremiumEquationSolver } from "@/components/lab/premium-equation-solver";
import { PremiumAdvancedCircuitSimulator } from "@/components/lab/premium-advanced-circuit";
import { PremiumPlaceholder } from "@/components/lab/premium-placeholder";

// Calculators
import { PhysicsLab } from "@/components/lab/physics-lab";

// Advanced 3D — migrated from legacy root
import { Physics3DElectrostatics } from "@/components/lab/physics-3d-electrostatics";
import { Physics3DGravitation } from "@/components/lab/physics-3d-gravitation";
import { Physics3DLenses } from "@/components/lab/physics-3d-lenses";
import { ConcaveMirror3D } from "@/components/lab/physics-3d-mirrors-concave";
import { ConvexMirror3D } from "@/components/lab/physics-3d-mirrors-convex";
import { Physics3DPrism } from "@/components/lab/physics-3d-prism";
import { Physics3DMeasurement } from "@/components/lab/physics-3d-measurement";
import { Physics3DVectorsComprehensive } from "@/components/lab/physics-3d-vectors-comprehensive";
import { Physics3DThermodynamics } from "@/components/lab/physics-3d-thermodynamics";
import { Chemistry3DMolecules } from "@/components/lab/chemistry-3d-molecules";
import { Chemistry3DSyllabusSuite } from "@/components/lab/chemistry-3d-syllabus-suite";
import { Biology3DSuite } from "@/components/lab/biology-3d-suite";
import { Biology3DDiversitySuite } from "@/components/lab/biology-3d-diversity-suite";
import { Math3DGeometryLabeled } from "@/components/lab/math-3d-geometry-labelledby";
import { Math3DSyllabusSuite } from "@/components/lab/math-3d-syllabus-suite";
import {
  MotionGraphicsEMWaves,
  MotionGraphicsSemiconductors,
  MotionGraphicsOrganicChemistry,
  MotionGraphicsCalculus,
  MotionGraphicsThermodynamics,
  MotionGraphicsOptics,
  MotionGraphicsElectromagnetism,
  MotionGraphicsQuantum,
  MotionGraphicsRelativity,
  MotionGraphicsFluidDynamics,
  MotionClass11WaveInterference,
} from "@/components/lab/motion-graphics";
import Chapter3DComponent from "@/components/lab/chapters/[chapterId]/chapters-3d";
import Topic3DComponent from "@/components/lab/topics/[topicId]/topics-3d";
import {
  Class11AtomicStructure,
  Class11ChemicalBonding,
  Class11Thermodynamics,
  Class11SetsFunctions,
  Class11Trigonometry,
  Class11Statistics,
  Class11ElectromagneticInduction,
  Class11ElectrochemistryGalvanicCell,
  Class11Probability3D,
  Class11KinematicsMotion,
  Class11LawsOfMotion,
  Class11WorkEnergy,
  Class11RotationalMotion,
  Class11PhysicsTheoryKinematics,
  Class11PhysicsTheoryLawsMotion,
  Class11ChemistryTheory,
  Class11MathTheory,
  Class11PhysicsTheoryElectromagnetism,
  Class11ChemistryTheoryElectrochemistry,
  Class11MathTheoryProbability,
} from "@/components/lab/class11";

export type LabMeta = {
  id: string;
  title: string;
  description: string;
  category: "physics" | "chemistry" | "mathematics" | "biology" | "class11";
  icon: ReactNode;
  status: "active" | "new" | "premium" | "development";
  component: () => ReactNode;
};

function wrap3D(comp: ReactNode) {
  return (
    <LabContainer title="" description="" status="active" type="3d">
      <div className="h-[60vh] min-h-[400px] w-full">{comp}</div>
    </LabContainer>
  );
}

function wrapTheory(comp: ReactNode) {
  return (
    <LabContainer title="" description="" status="active" type="theory">
      {comp}
    </LabContainer>
  );
}

function wrapCalc(comp: ReactNode) {
  return (
    <LabContainer title="" description="" status="active" type="calculator">
      {comp}
    </LabContainer>
  );
}

const labs: LabMeta[] = [
  // ── Physics 3D ──
  { id: "ph-3d-dynamics", title: "Dynamics 3D", description: "Inclined plane, friction, elastic collision, momentum conservation in 3D.", category: "physics", icon: null, status: "active", component: () => wrap3D(<PhysicsDynamics3D />) },
  { id: "ph-3d-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DAdvanced />) },
  { id: "ph-3d-quantum", title: "Quantum 3D", description: "Quantum mechanics visualizations including orbitals, probability distributions, and spin.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Quantum3D />) },
  { id: "ph-3d-wave", title: "Wave Simulator 3D", description: "Real-time 3D wave propagation with sine, cosine, and damped modes.", category: "physics", icon: null, status: "active", component: () => wrap3D(<PhysicsAdvancedMotionLab />) },
  { id: "ph-3d-pendulum", title: "Pendulum 3D", description: "Pendulum with trail visualization and period calculations.", category: "physics", icon: null, status: "active", component: () => wrap3D(<PhysicsAdvancedMotionLab />) },
  { id: "ph-3d-em", title: "EM Wave 3D", description: "Electromagnetic wave propagation with E and B field visualization.", category: "physics", icon: null, status: "active", component: () => wrap3D(<PhysicsMotionLab />) },
  { id: "ph-3d-magnetic", title: "Magnetic Field 3D", description: "Bar magnet field lines and iron filings pattern.", category: "physics", icon: null, status: "active", component: () => wrap3D(<PhysicsMotionLab />) },
  { id: "ph-3d-vectors", title: "Vector Addition 3D", description: "Interactive 3D vectors — components, dot product, cross product, parallelogram rule.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Vectors3D />) },
  { id: "ph-3d-optics", title: "Optics & Lens 3D", description: "Ray diagrams for convex/concave lenses and mirrors with live lens equation.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Optics3D />) },
  { id: "ph-3d-refraction", title: "Refraction 3D", description: "Snell's law visualization with total internal reflection and critical angle.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Refraction3D />) },
  { id: "ph-3d-classic", title: "Physics 3D Classic", description: "Electric field, double pendulum, and gravitational field visualizers.", category: "physics", icon: null, status: "development", component: () => wrap3D(<Physics3D />) },
  // ── Heat Determinations ──
  { id: "heat-determinations", title: "Heat Determinations Suite", description: "Lee's disc, Searle's bar, Newton cooling & linear expansion — labelled 3D apparatus.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DHeatDeterminations />) },
  { id: "lees-disc", title: "Lee's Disc (K bad cond.)", description: "Determination of thermal conductivity of bad conductors.", category: "physics", icon: null, status: "new", component: () => wrap3D(<LeesDiscExperiment />) },
  { id: "searles-bar", title: "Searle's Bar (K good cond.)", description: "Determination of K of good conductors.", category: "physics", icon: null, status: "new", component: () => wrap3D(<SearlesBarExperiment />) },
  { id: "newton-cooling", title: "Newton's Law of Cooling", description: "Determination of cooling constant k.", category: "physics", icon: null, status: "new", component: () => wrap3D(<NewtonCoolingExperiment />) },
  { id: "linear-expansion", title: "Linear Expansion (α)", description: "Determination of α.", category: "physics", icon: null, status: "new", component: () => wrap3D(<LinearExpansionExperiment />) },
  // ── Syllabus-mapped suites (Class 11 + 12) ──
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite (Class 11)", description: "Projectile motion, circular motion, momentum & collisions, work-energy-power — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MechanicsSuite3D />) },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Ideal Gas Suite", description: "Hooke's law spring, Young's modulus wire, kinetic-molecular ideal gas with PV = nRT — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ElasticityGasSuite3D />) },
  { id: "physics-electricity-suite-3d", title: "3D Electricity I Suite (Class 12)", description: "Parallel-plate capacitor with dielectric and meter bridge (Wheatstone) determination — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ElectricitySuite3D />) },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", description: "Biot–Savart fields (wire/loop/solenoid), Lorentz force orbit, Faraday & Lenz with LR readouts — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MagnetismEMISuite3D />) },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", description: "Young's double slit, single-slit diffraction, Brewster polarisation — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<WaveOpticsSuite3D />) },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics & Communication Suite", description: "Photoelectric, Bohr atom & spectrum, binding energy, semiconductors/logic/AM-FM — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ModernPhysicsSuite3D />) },
  // ── Symbol Diagrams ──
  { id: "symbols-mechanics", title: "Symbols — Mechanics", description: "Pendulum & Projectile with class symbols θ, L, mg, T, ω drawn exactly where each quantity acts.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MechanicsSymbols />) },
  { id: "symbols-electricity", title: "Symbols — Electricity", description: "Ohm's-law circuit with ε, V, I, R and ammeter/voltmeter at their exact wiring positions.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ElectricitySymbols />) },
  { id: "symbols-waves", title: "Symbols — Waves", description: "Travelling transverse wave with A, crest, trough, λ, v and f drawn where they act.", category: "physics", icon: null, status: "new", component: () => wrap3D(<WavesSymbols />) },
  { id: "symbols-atomic", title: "Symbols — Atomic", description: "Bohr model with +Ze, rₙ = r₁n², Eₙ and photon hν at their exact shells.", category: "physics", icon: null, status: "new", component: () => wrap3D(<AtomicSymbols />) },
  // ── Chemistry 3D ──
  { id: "ch-3d-periodic", title: "Periodic Table 3D", description: "Interactive 3D periodic table with element details, categories, and search.", category: "chemistry", icon: null, status: "active", component: () => wrap3D(<ChemistryLab />) },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<ChemistryModern3D />) },
  { id: "ch-3d-micro", title: "Microscopy 3D", description: "Atomic structure, electron orbitals, crystal lattice visualization.", category: "chemistry", icon: null, status: "active", component: () => wrap3D(<ChemistryAdvanced3D />) },
  // ── Mathematics 3D ──
  { id: "math-3d-geometry", title: "3D Geometry", description: "Points, lines, planes in 3D space with interactive visualization.", category: "mathematics", icon: null, status: "active", component: () => wrap3D(<MathGeometry3D />) },
  { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", description: "Explore saddle, wave, ripple, peak, plane, and cylinder surfaces.", category: "mathematics", icon: null, status: "active", component: () => wrap3D(<MathModern3D />) },
  { id: "math-3d-advanced", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<MathModern3D />) },
  { id: "math-3d-fourier", title: "Fourier Series 3D", description: "Build square, sawtooth, and triangle waves from sums of sines.", category: "mathematics", icon: null, status: "active", component: () => wrap3D(<MathAdvancedMotionLab />) },
  { id: "math-3d-decay", title: "Nuclear Decay Simulator", description: "Stochastic radioactive decay visualization with half-life controls.", category: "mathematics", icon: null, status: "active", component: () => wrap3D(<MathAdvancedMotionLab />) },
  { id: "symbols-math", title: "Symbols — Mathematics", description: "Unit circle with θ, r = 1, sinθ, cosθ and tanθ on their exact segments.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<MathSymbols />) },
  // ── Biology 3D ──
  { id: "bio-3d-cell", title: "Cell Structure 3D", description: "Plant and animal cell ultrastructure — organelles, membranes, nucleus in 3D.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyCell3D />) },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", description: "Double-helix DNA structure, replication, transcription, translation.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyDNA3D />) },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", description: "Interactive deep-dive: cell ultrastructure, molecular genetics, ecology networks, human organ systems, evolution & phylogeny.", category: "biology", icon: null, status: "new", component: () => wrap3D(<BiologyAdvanced3D />) },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", description: "Food chains, food webs, biogeochemical cycles, population dynamics in interactive 3D.", category: "biology", icon: null, status: "new", component: () => wrap3D(<BiologyEcology3D />) },
  { id: "bio-3d-human", title: "Human Body Systems 3D", description: "Circulatory, respiratory, nervous, and digestive systems with interactive organ labels.", category: "biology", icon: null, status: "new", component: () => wrap3D(<BiologyHuman3D />) },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", description: "Phylogenetic trees, taxonomy hierarchy, fossil record timeline, adaptive radiation.", category: "biology", icon: null, status: "new", component: () => wrap3D(<BiologyEvolution3D />) },
  // ── Biology Expanded (Syllabus-aligned, fully labelled) ──
  { id: "bio-biomolecules-3d", title: "Biomolecules 3D", description: "NEB XI Unit 1 — Carbohydrates (mono/dis/polysaccharides), proteins (4-level structure), lipids (triglyceride/phospholipid/sterol), nucleic acids (DNA/RNA), enzymes (lock & key, induced fit), water properties, minerals.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiomolecules3D />) },
  { id: "bio-cell-3d", title: "Cell Ultrastructure 3D", description: "NEB XI Unit 1 — 11 organelles with labelled SVG diagrams: cell overview, membrane (fluid mosaic), nucleus (nucleolus, chromatin, pores), mitochondria (cristae, ATP), chloroplast (thylakoids, Calvin cycle), ER (RER/SER), Golgi bodies, ribosomes, lysosomes, cell wall, cilia & flagella.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyCellUltraStructure3D />) },
  { id: "bio-cell-division-3d", title: "Cell Division 3D", description: "NEB XI Unit 1 — Amitosis (direct division), Mitosis (6 phases with interactive navigation), Meiosis (reductive division with crossing over & independent assortment).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyCellDivision3D />) },
  { id: "bio-floral-3d", title: "Floral Diversity 3D", description: "NEB XI Unit 2 — Five kingdom classification, Fungi (Phycomycetes/Mucor, Ascomycetes/Yeast, Basidiomycetes, Deuteromycetes), Algae (green/brown/red + Spirogyra conjugation), Bryophytes (Marchantia), Pteridophytes (Dryopteris), Gymnosperms (Pinus), Angiosperms (flower parts + 4 families).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyFloralDiversity3D />) },
  { id: "bio-micro-3d", title: "Microbiology 3D", description: "NEB XI Unit 3 — Bacterial cell structure (all parts labelled), 4 shapes (coccus/bacillus/vibrio/spirillum), Cyanobacteria (heterocysts, akinetes), Virus (icosahedral, enveloped, types), Bacteriophage T4 (structure + lytic cycle).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyMicrobiology3D />) },
  { id: "bio-ecology-3d", title: "Ecology 3D", description: "NEB XI Unit 4 — Ecosystem structure (pond & forest), food chains/webs with 10% energy pyramid, Carbon & Nitrogen cycles (interactive), hydrophyte vs xerophyte adaptations, greenhouse effect, ozone depletion, pollution types.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyEcologyExpanded3D />) },
  { id: "bio-evolution-3d", title: "Evolution 3D", description: "NEB XI Unit 7 — Oparin-Haldane theory & Miller-Urey experiment, 5 evidence types (morphological/anatomical/paleontological/embryological/biochemical), Lamarckism vs Darwinism vs Neo-Darwinism comparison, human evolution timeline (Australopithecus → H. sapiens).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyEvolutionExpanded3D />) },
  { id: "bio-faunal-3d", title: "Faunal Diversity 3D", description: "NEB XI Unit 8 — Protista (Paramecium structure + Plasmodium life cycle), 9 Animal phyla comparison (Porifera to Chordata with symmetry/coelom), Earthworm (Pheretima — digestive/nervous/circulatory systems), Frog (Rana tigrina — all organ systems).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyFaunalDiversity3D />) },
  { id: "bio-biota-3d", title: "Biota & Environment 3D", description: "NEB XI Unit 9 — Aquatic/terrestrial/volant adaptations, reflex action & taxes, dominance & leadership behavior, air/water/soil pollution, DDT biomagnification, migration, hibernation vs estivation, camouflage & mimicry.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiotaConservation3D />) },
  { id: "bio-conservation-3d", title: "Conservation Biology 3D", description: "NEB XI Unit 10 — In-situ vs ex-situ conservation, Nepal protected areas (13 national parks, 6 wildlife reserves), IUCN threatened categories (EX/CR/EN/VU/NT/LC), biodiversity hotspots, endangered species in Nepal.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiotaConservation3D />) },
  // ── Theory Physics ──
  { id: "ph-th-kinematics", title: "Kinematics Theory", description: "Equations of motion, projectile motion, relative velocity.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="kinematics" />) },
  { id: "ph-th-laws", title: "Laws of Motion Theory", description: "Newton's laws, friction, circular motion.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="laws-motion" />) },
  { id: "ph-th-work", title: "Work & Energy Theory", description: "Work-energy theorem, conservation of energy, power.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="work-energy" />) },
  { id: "ph-th-grav", title: "Gravitation Theory", description: "Universal gravitation, gravitational potential, satellite motion.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="gravitation" />) },
  { id: "ph-th-thermo", title: "Thermodynamics Theory", description: "Laws of thermodynamics, heat engines, entropy.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="thermodynamics" />) },
  { id: "ph-th-optics", title: "Optics Theory", description: "Reflection, refraction, lens formula, mirror equation.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="optics" />) },
  { id: "ph-th-electro", title: "Electrostatics Theory", description: "Coulomb's law, electric field, potential, capacitance.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="electrostatics" />) },
  { id: "ph-th-current", title: "Current Electricity Theory", description: "Ohm's law, circuits, Kirchhoff's laws.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="current" />) },
  { id: "ph-th-emw", title: "EM Waves Theory", description: "Electromagnetic spectrum, wave properties.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="emw" />) },
  { id: "ph-th-modern", title: "Modern Physics Theory", description: "Photoelectric effect, atomic models, nuclear physics.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="physics" topic="modern" />) },
  // ── Theory Chemistry ──
  { id: "ch-th-atomic", title: "Atomic Structure Theory", description: "Bohr model, quantum numbers, electronic configuration.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="atomic" />) },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", description: "Ionic, covalent, metallic bonds, VSEPR theory.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="bonding" />) },
  { id: "ch-th-eq", title: "Equilibrium Theory", description: "Chemical equilibrium, Le Chatelier's principle.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="equilibrium" />) },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", description: "Enthalpy, entropy, Gibbs free energy.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="thermo" />) },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", description: "Reaction rates, order of reaction, activation energy.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="kinetics" />) },
  { id: "ch-th-acid", title: "Acid-Base Theory", description: "pH, pOH, strong/weak acids, buffers.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="acid-base" />) },
  { id: "ch-th-redox", title: "Redox Theory", description: "Oxidation-reduction, electrochemical cells.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="redox" />) },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", description: "Hydrocarbons, functional groups, nomenclature.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="chemistry" topic="organic" />) },
  // ── Theory Biology ──
  { id: "bio-th-cell", title: "Cell Theory & Structure", description: "Cell theory, prokaryotic vs eukaryotic cells, organelles, membrane transport.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="cell" />) },
  { id: "bio-th-genetics", title: "Genetics & Heredity", description: "Mendelian genetics, DNA structure, replication, transcription, translation.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="genetics" />) },
  { id: "bio-th-ecology", title: "Ecology & Environment", description: "Ecosystems, biomes, biogeochemical cycles, biodiversity, conservation.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="ecology" />) },
  { id: "bio-th-human", title: "Human Physiology", description: "Circulatory, respiratory, digestive, nervous, and excretory systems.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="human" />) },
  { id: "bio-th-evolution", title: "Evolution & Classification", description: "Origin of life, natural selection, phylogenetic classification, taxonomy.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="evolution" />) },
  { id: "bio-th-plant", title: "Plant Physiology", description: "Photosynthesis, transpiration, nutrition, plant hormones, transport in plants.", category: "biology", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="biology" topic="plant" />) },
  // ── Theory Mathematics ──
  { id: "math-th-calculus", title: "Calculus Theory", description: "Limits, derivatives, integrals, fundamental theorem.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="mathematics" topic="calculus" />) },
  { id: "math-th-trig", title: "Trigonometry Theory", description: "Identities, equations, graphs, inverse functions.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="mathematics" topic="trigonometry" />) },
  { id: "math-th-algebra", title: "Algebra Theory", description: "Matrices, determinants, complex numbers.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="mathematics" topic="algebra" />) },
  { id: "math-th-stats", title: "Statistics Theory", description: "Probability, distributions, hypothesis testing.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="mathematics" topic="statistics" />) },
  { id: "math-th-geo", title: "Coordinate Geometry Theory", description: "Lines, circles, conics in coordinate plane.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<TheoryPanel subject="mathematics" topic="geometry" />) },
  // ── Calculators Physics ──
  { id: "ph-calc-ohms", title: "Ohm's Law 3D Labelled", description: "Labelled Ohm's-law circuit — ε, V, I, R and ammeter/voltmeter at their exact positions.", category: "physics", icon: null, status: "active", component: () => wrap3D(<ElectricitySymbols />) },
  { id: "ph-calc-heat", title: "Heat Determinations 3D", description: "Lee's disc, Searle's bar, Newton cooling & linear expansion — labelled 3D apparatus.", category: "physics", icon: null, status: "active", component: () => wrap3D(<Physics3DHeatDeterminations />) },
  { id: "ph-calc-optics", title: "Optics 3D Lab", description: "Ray diagrams for convex/concave lenses and mirrors with live lens equation.", category: "physics", icon: null, status: "active", component: () => wrap3D(<Optics3D />) },
  { id: "ph-calc-projectile", title: "Projectile Motion", description: "Launch projectiles with adjustable velocity, angle, and gravity.", category: "physics", icon: null, status: "active", component: () => wrapCalc(<PhysicsLab />) },
  // ── Calculators Chemistry ──
  { id: "ch-calc-ph", title: "pH Calculator", description: "Calculate pH from concentration for acids and bases.", category: "chemistry", icon: null, status: "active", component: () => wrapCalc(<ChemistryInteractive defaultTab="ph" />) },
  { id: "ch-calc-titration", title: "Titration Simulator", description: "Simulate strong acid-strong base titration and track pH changes.", category: "chemistry", icon: null, status: "active", component: () => wrapCalc(<ChemistryInteractive defaultTab="titration" />) },
  { id: "ch-calc-gas", title: "Gas Laws Calc", description: "Boyle's, Charles's, ideal gas law solver.", category: "chemistry", icon: null, status: "active", component: () => wrapCalc(<ChemistryInteractive defaultTab="gaslaws" />) },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", description: "Enter a chemical formula and get molar mass.", category: "chemistry", icon: null, status: "active", component: () => wrapCalc(<ChemistryInteractive defaultTab="molarmass" />) },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", description: "Moles, percent composition, limiting reagent.", category: "chemistry", icon: null, status: "active", component: () => wrapCalc(<ChemistryStoichiometry />) },
  // ── Calculators Biology ──
  { id: "bio-calc-punnett", title: "Punnett Square Solver", description: "Predict offspring genotypes and phenotypes from parental crosses.", category: "biology", icon: null, status: "active", component: () => wrapCalc(<BiologyPunnettCalculator />) },
  { id: "bio-calc-population", title: "Population Growth Calc", description: "Exponential and logistic population growth models with carrying capacity.", category: "biology", icon: null, status: "active", component: () => wrapCalc(<BiologyPopulationCalculator />) },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", description: "Calculate rate of photosynthesis under varying light, CO₂, and temperature.", category: "biology", icon: null, status: "active", component: () => wrapCalc(<BiologyPhotosynthesisCalculator />) },
  // ── Calculators Math ──
  { id: "math-calc-deriv", title: "Derivative Calculator", description: "Compute derivatives and integrals numerically.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="derivative" />) },
  { id: "math-calc-quad", title: "Quadratic Solver", description: "Solve ax² + bx + c = 0 and visualize the parabola.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="quadratic" />) },
  { id: "math-calc-stats", title: "Statistics Calculator", description: "Mean, median, mode, standard deviation.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="statistics" />) },
  { id: "math-calc-matrix", title: "Matrix Calculator", description: "Add, multiply, and transpose matrices.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="matrix" />) },
  { id: "math-calc-trig", title: "Trigonometry 3D Labelled", description: "Unit circle with θ, r = 1, sinθ, cosθ and tanθ on their exact segments.", category: "mathematics", icon: null, status: "active", component: () => wrap3D(<MathSymbols />) },
  { id: "math-calc-series", title: "Sequences & Series", description: "Arithmetic and geometric progressions.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathSeriesLab />) },
  { id: "math-calc-vectors", title: "Vector Operations", description: "Add, dot product, cross product of 3D vectors.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="vectors" />) },
  { id: "math-calc-limit", title: "Limit Calculator", description: "Estimate limits numerically.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="limit" />) },
  { id: "math-calc-system", title: "System Solver", description: "Solve 2x2 and 3x3 systems of linear equations.", category: "mathematics", icon: null, status: "active", component: () => wrapCalc(<MathInteractive defaultTab="system" />) },
  // ── Premium ──
  { id: "ai-tutor", title: "AI Lab Tutor", description: "Get instant help with lab concepts. AI explains, solves, and visualizes any problem.", category: "physics", icon: null, status: "premium", component: () => wrapCalc(<PremiumPlaceholder title="AI Lab Tutor" description="Get instant help with lab concepts." />) },
  { id: "advanced-circuit", title: "Advanced Circuit Simulator", description: "Build and test complex circuits with 50+ components.", category: "physics", icon: null, status: "premium", component: () => wrapCalc(<PremiumAdvancedCircuitSimulator />) },
  { id: "molecular-builder", title: "Molecular Builder 3D", description: "Build any molecule from scratch. Simulate reactions.", category: "chemistry", icon: null, status: "premium", component: () => wrap3D(<PremiumPlaceholder title="Molecular Builder 3D" description="Build molecules from scratch." />) },
  { id: "equation-solver", title: "Universal Equation Solver", description: "Solve any physics, chemistry, or math equation.", category: "mathematics", icon: null, status: "premium", component: () => wrapCalc(<PremiumEquationSolver />) },
  // ── Class 11 Labs ──
  { id: "class11-physics", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations for Class 11.", category: "class11", icon: null, status: "new", component: () => wrap3D(<Class11Physics3DPlus />) },
  { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations for Class 11.", category: "class11", icon: null, status: "new", component: () => wrap3D(<Class11Chemistry3DPlus />) },
  { id: "class11-math", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations for Class 11.", category: "class11", icon: null, status: "new", component: () => wrap3D(<Class11Math3DPlus />) },
  { id: "class11-biology", title: "Class 11 Biology 3D Plus", description: "Extended 3D biology visualizations — cells, genetics, ecology for Class 11.", category: "class11", icon: null, status: "new", component: () => wrap3D(<Class11Biology3DPlus />) },
  // ── Biology Expanded (Syllabus-aligned, fully labelled) ──
  { id: "bio-biomolecules-3d", title: "Biomolecules 3D", description: "NEB XI Unit 1 — Carbs, proteins, lipids, nucleic acids, enzymes, water & minerals with labelled SVG diagrams.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiomolecules3D />) },
  { id: "bio-cell-3d", title: "Cell Ultrastructure 3D", description: "NEB XI Unit 1 — 11 organelles: nucleus, mitochondria, chloroplast, ER, Golgi, ribosomes, lysosomes, membrane, wall, cilia & flagella.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyCellUltraStructure3D />) },
  { id: "bio-cell-division-3d", title: "Cell Division 3D", description: "NEB XI Unit 1 — Amitosis, Mitosis (6 phases), Meiosis with interactive phase navigation.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyCellDivision3D />) },
  { id: "bio-floral-3d", title: "Floral Diversity 3D", description: "NEB XI Unit 2 — Five kingdom, fungi, algae, bryophytes, pteridophytes, gymnosperms, angiosperms (4 families).", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyFloralDiversity3D />) },
  { id: "bio-micro-3d", title: "Microbiology 3D", description: "NEB XI Unit 3 — Bacterial cell, cyanobacteria, virus structure, bacteriophage T4 lytic cycle.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyMicrobiology3D />) },
  { id: "bio-ecology-3d", title: "Ecology 3D", description: "NEB XI Unit 4 — Ecosystems, food webs, carbon & nitrogen cycles, adaptations, pollution.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyEcologyExpanded3D />) },
  { id: "bio-evolution-3d", title: "Evolution 3D", description: "NEB XI Unit 7 — Origin of life, evidence, theories, human evolution timeline.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyEvolutionExpanded3D />) },
  { id: "bio-faunal-3d", title: "Faunal Diversity 3D", description: "NEB XI Unit 8 — Protista, protozoa, animal phyla, earthworm & frog organ systems.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyFaunalDiversity3D />) },
  { id: "bio-biota-3d", title: "Biota & Environment 3D", description: "NEB XI Unit 9 — Adaptations, behavior, pollution types & pesticide effects.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiotaConservation3D />) },
  { id: "bio-conservation-3d", title: "Conservation Biology 3D", description: "NEB XI Unit 10 — Biodiversity, Nepal parks, IUCN categories, hotspots.", category: "biology", icon: null, status: "active", component: () => wrap3D(<BiologyBiotaConservation3D />) },
  // ── Advanced 3D — migrated from legacy root (Physics) ──
  { id: "ph-3d-electrostatics", title: "Electrostatics 3D", description: "Coulomb's law, field lines, equipotentials, capacitors — fully labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DElectrostatics />) },
  { id: "ph-3d-gravitation", title: "Gravitation 3D", description: "Gravity field lines, orbits, satellite motion, escape velocity — labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DGravitation />) },
  { id: "ph-3d-lenses", title: "Lenses & Ray Diagrams 3D", description: "Convex/concave lens ray tracing with image formation and the lens equation.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DLenses />) },
  { id: "ph-3d-mirrors-concave", title: "Concave Mirror 3D", description: "Ray diagrams, focal point, image types and magnification for concave mirrors.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ConcaveMirror3D />) },
  { id: "ph-3d-mirrors-convex", title: "Convex Mirror 3D", description: "Virtual-image ray diagrams, field of view and magnification for convex mirrors.", category: "physics", icon: null, status: "new", component: () => wrap3D(<ConvexMirror3D />) },
  { id: "ph-3d-prism", title: "Prism 3D", description: "White-light dispersion, angle of deviation and refractive index through a prism.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DPrism />) },
  { id: "ph-3d-measurement", title: "Measurements & Instruments 3D", description: "Vernier callipers, micrometer screw gauge, least count — labelled 3D instruments.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DMeasurement />) },
  { id: "ph-3d-vectors-comprehensive", title: "Vector Addition 3D (Comprehensive)", description: "Components, dot & cross products, parallelogram rule, resultant — comprehensive suite.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DVectorsComprehensive />) },
  { id: "ph-3d-thermodynamics", title: "Thermodynamics 3D Suite", description: "Ideal gas, P–V work, heat engines and cycle visualizations in labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Physics3DThermodynamics />) },
  // ── Advanced 3D — migrated from legacy root (Chemistry / Math / Biology) ──
  { id: "ch-3d-molecules", title: "Molecules 3D", description: "Interactive 3D atoms, bonds and labelled molecules with orbit camera.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<Chemistry3DMolecules />) },
  { id: "ch-3d-syllabus-suite", title: "Chemistry Syllabus Suite 3D", description: "Syllabus-aligned 3D chemistry suite — periodic, bonding, equilibrium and more.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<Chemistry3DSyllabusSuite />) },
  { id: "bio-3d-suite", title: "Biology 3D Suite", description: "Cell, DNA, structures and processes in one interactive 3D suite.", category: "biology", icon: null, status: "new", component: () => wrap3D(<Biology3DSuite />) },
  { id: "bio-3d-diversity-suite", title: "Biodiversity 3D Suite", description: "Taxonomy, kingdoms, evolution and conservation in labelled 3D.", category: "biology", icon: null, status: "new", component: () => wrap3D(<Biology3DDiversitySuite />) },
  { id: "math-3d-labelledby", title: "3D Geometry Labelled", description: "Cube, sphere, cone, cylinder with movable, exactly-placed labels.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Math3DGeometryLabeled />) },
  { id: "math-3d-syllabus-suite", title: "Math Syllabus Suite 3D", description: "Syllabus-aligned 3D math suite — geometry, functions and calculus surfaces.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Math3DSyllabusSuite />) },
  { id: "chapters-3d", title: "Chapters 3D Navigator", description: "Animated 3D exploration of chapters with WebGL.", category: "class11", icon: null, status: "active", component: () => wrap3D(<Chapter3DComponent />) },
  { id: "topics-3d", title: "Topics 3D Navigator", description: "Animated 3D topic explorer with WebGL.", category: "class11", icon: null, status: "active", component: () => wrap3D(<Topic3DComponent />) },
  // ── Motion Graphics — migrated from legacy root ──
  { id: "mg-em-waves", title: "EM Waves — Motion Graphics", description: "Animated electromagnetic spectrum, propagation, and wave properties.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsEMWaves />) },
  { id: "mg-semiconductors", title: "Semiconductors — Motion Graphics", description: "Animated band theory, p–n junction, and diode circuits.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsSemiconductors />) },
  { id: "mg-organic-chemistry", title: "Organic Chemistry — Motion Graphics", description: "Animated reaction mechanisms, functional groups, and nomenclature.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsOrganicChemistry />) },
  { id: "mg-calculus", title: "Calculus — Motion Graphics", description: "Animated limits, derivatives, and integrals with live curves.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsCalculus />) },
  { id: "mg-thermodynamics", title: "Thermodynamics — Motion Graphics", description: "Animated heat, work, entropy, and engine cycles.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsThermodynamics />) },
  { id: "mg-optics", title: "Optics — Motion Graphics", description: "Animated reflection, refraction, and ray tracing.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsOptics />) },
  { id: "mg-electromagnetism", title: "Electromagnetism — Motion Graphics", description: "Animated fields, flux, and electromagnetic induction.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsElectromagnetism />) },
  { id: "mg-quantum", title: "Quantum — Motion Graphics", description: "Animated photoelectric effect, orbitals, and model atom.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsQuantum />) },
  { id: "mg-relativity", title: "Relativity — Motion Graphics", description: "Animated time dilation, length contraction, and frames.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsRelativity />) },
  { id: "mg-fluid-dynamics", title: "Fluid Dynamics — Motion Graphics", description: "Animated pressure, buoyancy, and Bernoulli flow.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionGraphicsFluidDynamics />) },
  { id: "mg-wave-interference", title: "Wave Interference — Motion Graphics", description: "Animated superposition, interference and standing waves.", category: "physics", icon: null, status: "new", component: () => wrap3D(<MotionClass11WaveInterference />) },
  // ── Class 11 experiments — migrated from legacy root ──
  { id: "class11-galvanic-cell", title: "Galvanic Cell 3D", description: "Labelled Zn–Cu galvanic cell with electrodes, salt bridge, and ion flow.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<Class11ElectrochemistryGalvanicCell />) },
  { id: "class11-emi", title: "Electromagnetic Induction 3D", description: "Labelled coil–magnet induction with flux, emf, and Lenz's law.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11ElectromagneticInduction />) },
  { id: "class11-probability-3d", title: "Probability 3D", description: "Labelled probability spaces, events, and Bayes visualizations.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Class11Probability3D />) },
  { id: "class11-atomic-structure", title: "Atomic Structure 3D", description: "Bohr model, shells, and sub-levels with labelled energy transitions.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<Class11AtomicStructure />) },
  { id: "class11-chemical-bonding", title: "Chemical Bonding 3D", description: "Ionic, covalent, and dative bonds with labelled electron sharing.", category: "chemistry", icon: null, status: "new", component: () => wrap3D(<Class11ChemicalBonding />) },
  { id: "class11-sets-functions", title: "Sets & Functions 3D", description: "Venn diagrams, relations, and mapped functions in labelled 3D.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Class11SetsFunctions />) },
  { id: "class11-trigonometry", title: "Trigonometry 3D", description: "Unit circle, quadrant rules, and graphs with labelled angles.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Class11Trigonometry />) },
  { id: "class11-statistics-3d", title: "Statistics 3D", description: "Bar charts, histograms, and deviation with live labels.", category: "mathematics", icon: null, status: "new", component: () => wrap3D(<Class11Statistics />) },
  { id: "class11-kinematics-motion", title: "Kinematics — Motion 3D", description: "Velocity and acceleration graphs with labelled motion models.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11KinematicsMotion />) },
  { id: "class11-laws-motion", title: "Laws of Motion 3D", description: "Newton's laws, free-body diagrams, and friction in labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11LawsOfMotion />) },
  { id: "class11-work-energy", title: "Work & Energy 3D", description: "Work done, kinetic/potential energy, and conservation with labels.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11WorkEnergy />) },
  { id: "class11-rotational-motion", title: "Rotational Motion 3D", description: "Torque, angular momentum, and moment of inertia in labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11RotationalMotion />) },
  { id: "class11-thermodynamics", title: "Thermodynamics 3D", description: "Heat engines, p–V cycles, and the first law in labelled 3D.", category: "physics", icon: null, status: "new", component: () => wrap3D(<Class11Thermodynamics />) },
  // ── Class 11 theory panels — migrated from legacy root ──
  { id: "class11-th-physics-kinematics", title: "Kinematics — Theory", description: "Equations of motion, graphs, and free fall — theory panel.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<Class11PhysicsTheoryKinematics />) },
  { id: "class11-th-physics-laws", title: "Laws of Motion — Theory", description: "Newton's laws, momentum, friction — theory panel.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<Class11PhysicsTheoryLawsMotion />) },
  { id: "class11-th-physics-em", title: "Electromagnetism — Theory", description: "Magnetic fields and electromagnetic induction — theory panel.", category: "physics", icon: null, status: "active", component: () => wrapTheory(<Class11PhysicsTheoryElectromagnetism />) },
  { id: "class11-th-chemistry", title: "Chemistry — Theory", description: "Lab technique and core chemistry — theory panel.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<Class11ChemistryTheory />) },
  { id: "class11-th-chemistry-electro", title: "Electrochemistry — Theory", description: "Galvanic cells, Nernst equation, electrolysis — theory panel.", category: "chemistry", icon: null, status: "active", component: () => wrapTheory(<Class11ChemistryTheoryElectrochemistry />) },
  { id: "class11-th-math", title: "Mathematics — Theory", description: "Algebra, sets, and functions — theory panel.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<Class11MathTheory />) },
  { id: "class11-th-math-probability", title: "Probability — Theory", description: "Probability, events, and Bayes' theorem — theory panel.", category: "mathematics", icon: null, status: "active", component: () => wrapTheory(<Class11MathTheoryProbability />) },
];

export function getLab(id: string): LabMeta | undefined {
  return labs.find((l) => l.id === id);
}

export const LAB_REGISTRY = labs;
