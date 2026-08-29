"use client";

import React from "react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabDashboard, LabItem } from "@/components/lab/lab-dashboard";
import { LabWorkspace, LabContainer } from "@/components/lab/lab-workspace";
import {
  Zap, Waves, Timer, CircuitBoard, Scale, ScanEye, Eye, Flame, Rocket,
  Cuboid, Atom, Satellite, Stars, TestTube, Beaker, FlaskConical, Microscope, Wind, Dna,
  Globe, Cylinder, Pyramid, FunctionSquare, Sigma, BarChart3, Grid3x3, Infinity as InfinityIcon,
  Columns3, Move3d, Target, TrendingUp, Crosshair, Box, Binary, GraduationCap, Brain,
  Bolt, Sparkles, ShieldCheck, Gem, CreditCard, Calculator, BookOpen, ChevronRight,
  Atom as AtomIcon, Beaker as BeakerIcon, Calculator as CalcIcon, Layers, Mic, Activity,
  Wind as WindIcon, Thermometer, Radio, Aperture, Hexagon, Triangle, Compass, TreeDeciduous, Heart, Users, Leaf,
} from "lucide-react";

import { PhysicsInteractive } from "@/components/lab/physics-interactive";
import { PhysicsOptics } from "@/components/lab/physics-optics";
import { PhysicsHeatLab } from "@/components/lab/physics-heat";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { Physics3D } from "@/components/lab/physics-3d";
import { PhysicsDynamics3D } from "@/components/lab/physics-dynamics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";
import { Quantum3D } from "@/components/lab/quantum-3d";
import { Physics3DHeatDeterminations } from "@/components/lab/physics-3d-heat-determinations";
import { PhysicsAdvancedMotionLab } from "@/components/lab/physics-advanced-motion";
import { PhysicsMotionLab } from "@/components/lab/physics-motion-3d";

// Symbol suites (labelled 3D)
import MechanicsSymbols from "@/components/lab/physics-3d-mechanics-symbols";
import ElectricitySymbols from "@/components/lab/physics-3d-electricity-symbols";
import WavesSymbols from "@/components/lab/physics-3d-waves-symbols";
import AtomicSymbols from "@/components/lab/physics-3d-atomic-symbols";
import MathSymbols from "@/components/lab/math-3d-symbols";

// Syllabus-mapped suites
import { MechanicsSuite3D } from "@/components/lab/physics-3d-mechanics-i";
import { ElasticityGasSuite3D } from "@/components/lab/physics-3d-elasticity-gas";
import { ElectricitySuite3D } from "@/components/lab/physics-3d-electricity-i";
import { MagnetismEMISuite3D } from "@/components/lab/physics-3d-magnetism-emi";
import { WaveOpticsSuite3D } from "@/components/lab/physics-3d-wave-optics";
import { ModernPhysicsSuite3D } from "@/components/lab/physics-3d-modern";

import { Vectors3D, Optics3D, Refraction3D } from "@/components/lab/physics-vectors-optics-3d";

import { ChemistryInteractive } from "@/components/lab/chemistry-interactive";
import { ChemistryStoichiometry } from "@/components/lab/chemistry-stoichiometry";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { ChemistryModern3D } from "@/components/lab/chemistry-modern-3d";

import { MathInteractive } from "@/components/lab/math-interactive";
import { MathTrigonometry } from "@/components/lab/math-trigonometry";
import { MathSeriesLab } from "@/components/lab/math-series-lab";
import { MathLab } from "@/components/lab/math-lab";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { MathAdvancedMotionLab } from "@/components/lab/math-motion-3d";

import { Class11Physics3DPlus } from "@/components/lab/class11/class11-physics-3d-plus";
import { Class11Chemistry3DPlus } from "@/components/lab/class11/class11-chemistry-3d-plus";
import { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";
import { Class11Biology3DPlus } from "@/components/lab/class11/class11-biology-3d-plus";

import { PremiumEquationSolver } from "@/components/lab/premium-equation-solver";
import { PremiumAdvancedCircuitSimulator } from "@/components/lab/premium-advanced-circuit";
import { PremiumPlaceholder } from "@/components/lab/premium-placeholder";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  BiologyCell3D, BiologyDNA3D, BiologyEcology3D, BiologyHuman3D, BiologyEvolution3D,
  BiologyPunnettCalculator, BiologyPopulationCalculator, BiologyPhotosynthesisCalculator,
  BiologyAdvanced3D,
} from "@/components/lab/biology-3d";

import { BiologyBiomolecules3D } from "@/components/lab/biology-biomolecules-3d";
import { BiologyCell3D as BiologyCellUltraStructure3D } from "@/components/lab/biology-cell-3d";
import { BiologyCellDivision3D } from "@/components/lab/biology-cell-division-3d";
import { BiologyFloralDiversity3D } from "@/components/lab/biology-floral-diversity-3d";
import { BiologyMicrobiology3D } from "@/components/lab/biology-microbiology-3d";
import { BiologyEcology3D as BiologyEcologyExpanded3D } from "@/components/lab/biology-ecology-3d";
import { BiologyEvolution3D as BiologyEvolutionExpanded3D } from "@/components/lab/biology-evolution-3d";
import { BiologyFaunalDiversity3D } from "@/components/lab/biology-faunal-diversity-3d";
import { BiologyBiotaConservation3D } from "@/components/lab/biology-biota-conservation-3d";

const INITIAL_CREDITS = 29000;

type LabCategory = "physics" | "chemistry" | "mathematics" | "biology" | "class11";
type LabType = "3d" | "theory" | "calculator";

// Helper to wrap components with proper containers
function wrapComponent(component: React.ReactNode, type: LabType) {
  if (type === "3d") {
    return (
      <LabContainer
        title=""
        description=""
        status="active"
        type="3d"
      >
        <div className="w-full">{component}</div>
      </LabContainer>
    );
  }
  if (type === "theory") {
    return (
      <LabContainer
        title=""
        description=""
        status="active"
        type="theory"
      >
        {component}
      </LabContainer>
    );
  }
  return (
    <LabContainer
      title=""
      description=""
      status="active"
      type="calculator"
    >
      {component}
    </LabContainer>
  );
}

const labs: LabItem[] = [
  // ============================================================
  // 3D LAB - PHYSICS
  // ============================================================
  { id: "ph-3d-dynamics", title: "Dynamics 3D", description: "Inclined plane, friction, elastic collision, momentum conservation in 3D.", category: "physics", icon: <Rocket className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsDynamics3D />, "3d") },
  { id: "ph-3d-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay.", category: "physics", icon: <Satellite className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Physics3DAdvanced />, "3d") },
  { id: "ph-heat-determinations", title: "Heat Determination Labs (3D, labelled)", description: "Lee's disc, Searle's bar, Newton's law of cooling & linear expansion in labelled 3D.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Physics3DHeatDeterminations />, "3d") },
  { id: "symbols-mechanics", title: "Symbols — Mechanics (labelled 3D)", description: "Pendulum & Projectile with θ, L, mg, T, ω drawn exactly where each quantity acts.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "new", component: () => wrapComponent(<MechanicsSymbols />, "3d") },
  { id: "symbols-electricity", title: "Symbols — Electricity (labelled 3D)", description: "Ohm's-law circuit with ε, V, I, R, ammeter & voltmeter at exact wiring positions.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "new", component: () => wrapComponent(<ElectricitySymbols />, "3d") },
  { id: "symbols-waves", title: "Symbols — Waves (labelled 3D)", description: "Travelling transverse wave with A, crest, trough, λ, v and f drawn where they act.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "new", component: () => wrapComponent(<WavesSymbols />, "3d") },
  { id: "symbols-atomic", title: "Symbols — Atomic (labelled 3D)", description: "Bohr model with +Ze, rₙ = r₁n², Eₙ and photon hν at their exact shells.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: () => wrapComponent(<AtomicSymbols />, "3d") },
  { id: "ph-3d-quantum", title: "Quantum 3D", description: "Quantum mechanics visualizations including orbitals, probability distributions, and spin.", category: "physics", icon: <Stars className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Quantum3D />, "3d") },
  { id: "ph-3d-wave", title: "Wave Simulator 3D", description: "Real-time 3D wave propagation with sine, cosine, and damped modes.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsAdvancedMotionLab />, "3d") },
  { id: "ph-3d-pendulum", title: "Pendulum 3D", description: "Pendulum with trail visualization and period calculations.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsAdvancedMotionLab />, "3d") },
  { id: "ph-3d-em", title: "EM Wave 3D", description: "Electromagnetic wave propagation with E and B field visualization.", category: "physics", icon: <Radio className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsMotionLab />, "3d") },
  { id: "ph-3d-magnetic", title: "Magnetic Field 3D", description: "Bar magnet field lines and iron filings pattern.", category: "physics", icon: <Compass className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsMotionLab />, "3d") },
  { id: "ph-3d-vectors", title: "Vector Addition 3D", description: "Interactive 3D vectors — components, dot product, cross product, parallelogram rule.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Vectors3D />, "3d") },
  { id: "ph-3d-optics", title: "Optics & Lens 3D", description: "Ray diagrams for convex/concave lenses and mirrors with live lens equation.", category: "physics", icon: <ScanEye className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Optics3D />, "3d") },
  { id: "ph-3d-refraction", title: "Refraction 3D", description: "Snell's law visualization with total internal reflection and critical angle.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Refraction3D />, "3d") },
  { id: "ph-3d-classic", title: "Physics 3D Classic", description: "Electric field, double pendulum, and gravitational field visualizers.", category: "physics", icon: <Cuboid className="h-4 w-4" />, status: "development", component: () => wrapComponent(<Physics3D />, "3d") },

  // ============================================================
  // THEORY LAB - PHYSICS
  // ============================================================
  { id: "ph-th-kinematics", title: "Kinematics Theory", description: "Equations of motion, projectile motion, relative velocity theory and examples.", category: "physics", icon: <BookOpen className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="kinematics" />, "theory") },
  { id: "ph-th-laws", title: "Laws of Motion Theory", description: "Newton's laws, friction, circular motion theory and examples.", category: "physics", icon: <Activity className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="laws-motion" />, "theory") },
  { id: "ph-th-work", title: "Work & Energy Theory", description: "Work-energy theorem, conservation of energy, power theory.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="work-energy" />, "theory") },
  { id: "ph-th-grav", title: "Gravitation Theory", description: "Universal gravitation, gravitational potential, satellite motion.", category: "physics", icon: <AtomIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="gravitation" />, "theory") },
  { id: "ph-th-thermo", title: "Thermodynamics Theory", description: "Laws of thermodynamics, heat engines, entropy theory.", category: "physics", icon: <Thermometer className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="thermodynamics" />, "theory") },
  { id: "ph-th-optics", title: "Optics Theory", description: "Reflection, refraction, lens formula, mirror equation.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="optics" />, "theory") },
  { id: "ph-th-electro", title: "Electrostatics Theory", description: "Coulomb's law, electric field, potential, capacitance.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="electrostatics" />, "theory") },
  { id: "ph-th-current", title: "Current Electricity Theory", description: "Ohm's law, circuits, Kirchhoff's laws, electrical power.", category: "physics", icon: <CircuitBoard className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="current" />, "theory") },
  { id: "ph-th-emw", title: "EM Waves Theory", description: "Electromagnetic spectrum, wave properties, polarization.", category: "physics", icon: <Radio className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="emw" />, "theory") },
  { id: "ph-th-modern", title: "Modern Physics Theory", description: "Photoelectric effect, atomic models, nuclear physics.", category: "physics", icon: <AtomIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="physics" topic="modern" />, "theory") },

  // ============================================================
  // 3D LAB - CHEMISTRY
  // ============================================================
  { id: "ch-3d-periodic", title: "Periodic Table 3D", description: "Interactive 3D periodic table with element details, categories, and search.", category: "chemistry", icon: <Globe className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryLab />, "3d") },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", category: "chemistry", icon: <Pyramid className="h-4 w-4" />, status: "new", component: () => wrapComponent(<ChemistryModern3D />, "3d") },
  { id: "ch-3d-micro", title: "Microscopy 3D", description: "Atomic structure, electron orbitals, crystal lattice visualization.", category: "chemistry", icon: <Microscope className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryAdvanced3D />, "3d") },

  // ============================================================
  // THEORY LAB - CHEMISTRY
  // ============================================================
  { id: "ch-th-atomic", title: "Atomic Structure Theory", description: "Bohr model, quantum numbers, electronic configuration.", category: "chemistry", icon: <AtomIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="atomic" />, "theory") },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", description: "Ionic, covalent, metallic bonds, VSEPR theory.", category: "chemistry", icon: <Hexagon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="bonding" />, "theory") },
  { id: "ch-th-eq", title: "Equilibrium Theory", description: "Chemical equilibrium, Le Chatelier's principle, Kc/Kp.", category: "chemistry", icon: <Scale className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="equilibrium" />, "theory") },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", description: "Enthalpy, entropy, Gibbs free energy, Hess's law.", category: "chemistry", icon: <Flame className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="thermo" />, "theory") },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", description: "Reaction rates, order of reaction, activation energy.", category: "chemistry", icon: <Timer className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="kinetics" />, "theory") },
  { id: "ch-th-acid", title: "Acid-Base Theory", description: "pH, pOH, strong/weak acids, buffers, titration theory.", category: "chemistry", icon: <TestTube className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="acid-base" />, "theory") },
  { id: "ch-th-redox", title: "Redox Theory", description: "Oxidation-reduction, electrochemical cells, corrosion.", category: "chemistry", icon: <Zap className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="redox" />, "theory") },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", description: "Hydrocarbons, functional groups, nomenclature.", category: "chemistry", icon: <Dna className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="chemistry" topic="organic" />, "theory") },

  // ============================================================
  // 3D LAB - BIOLOGY
  // ============================================================
  { id: "bio-3d-cell", title: "Cell Structure 3D", description: "Plant and animal cell ultrastructure — organelles, membranes, nucleus in 3D.", category: "biology", icon: <Microscope className="h-4 w-4" />, status: "active", component: () => wrapComponent(<BiologyCell3D />, "3d") },
  { id: "bio-3d-dna", title: "DNA & Genetics 3D", description: "Double-helix DNA structure, replication, transcription, translation.", category: "biology", icon: <Dna className="h-4 w-4" />, status: "active", component: () => wrapComponent(<BiologyDNA3D />, "3d") },
  { id: "bio-3d-advanced", title: "Biology 3D Advanced", description: "Cell ultrastructure, molecular genetics, ecology networks, human systems, evolution trees in interactive 3D.", category: "biology", icon: <FlaskConical className="h-4 w-4" />, status: "new", component: () => wrapComponent(<BiologyAdvanced3D />, "3d") },
  { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", description: "Food chains, food webs, biogeochemical cycles, population dynamics in 3D.", category: "biology", icon: <TreeDeciduous className="h-4 w-4" />, status: "new", component: () => wrapComponent(<BiologyEcology3D />, "3d") },
  { id: "bio-3d-human", title: "Human Body Systems 3D", description: "Circulatory, respiratory, nervous, and digestive systems with interactive organ labels.", category: "biology", icon: <Heart className="h-4 w-4" />, status: "new", component: () => wrapComponent(<BiologyHuman3D />, "3d") },
  { id: "bio-3d-evolution", title: "Evolution & Classification 3D", description: "Phylogenetic trees, taxonomy hierarchy, fossil record timeline, adaptive radiation.", category: "biology", icon: <Users className="h-4 w-4" />, status: "new", component: () => wrapComponent(<BiologyEvolution3D />, "3d") },

  // ============================================================
  // THEORY LAB - BIOLOGY
  // ============================================================
  { id: "bio-th-cell", title: "Cell Theory & Structure", description: "Cell theory, prokaryotic vs eukaryotic cells, organelles, membrane transport.", category: "biology", icon: <Microscope className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="cell" />, "theory") },
  { id: "bio-th-genetics", title: "Genetics & Heredity", description: "Mendelian genetics, DNA structure, replication, transcription, translation.", category: "biology", icon: <Dna className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="genetics" />, "theory") },
  { id: "bio-th-ecology", title: "Ecology & Environment", description: "Ecosystems, biomes, biogeochemical cycles, biodiversity, conservation.", category: "biology", icon: <TreeDeciduous className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="ecology" />, "theory") },
  { id: "bio-th-human", title: "Human Physiology", description: "Circulatory, respiratory, digestive, nervous, and excretory systems.", category: "biology", icon: <Heart className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="human" />, "theory") },
  { id: "bio-th-evolution", title: "Evolution & Classification", description: "Origin of life, natural selection, phylogenetic classification, taxonomy.", category: "biology", icon: <Users className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="evolution" />, "theory") },
  { id: "bio-th-plant", title: "Plant Physiology", description: "Photosynthesis, transpiration, nutrition, plant hormones, transport in plants.", category: "biology", icon: <Leaf className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="biology" topic="plant" />, "theory") },

  // ============================================================
  // 3D LAB - MATHEMATICS
  // ============================================================
  { id: "math-3d-geometry", title: "3D Geometry", description: "Points, lines, planes in 3D space with interactive visualization.", category: "mathematics", icon: <Box className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathGeometry3D />, "3d") },
  { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", description: "Explore saddle, wave, ripple, peak, plane, and cylinder surfaces.", category: "mathematics", icon: <Grid3x3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathLab />, "3d") },
  { id: "math-3d-advanced", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces.", category: "mathematics", icon: <Binary className="h-4 w-4" />, status: "new", component: () => wrapComponent(<MathModern3D />, "3d") },
  { id: "math-3d-fourier", title: "Fourier Series 3D", description: "Build square, sawtooth, and triangle waves from sums of sines.", category: "mathematics", icon: <Sigma className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathAdvancedMotionLab />, "3d") },
  { id: "math-3d-decay", title: "Nuclear Decay Simulator", description: "Stochastic radioactive decay visualization with half-life controls.", category: "mathematics", icon: <AtomIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathAdvancedMotionLab />, "3d") },
  { id: "symbols-math", title: "Symbols — Mathematics (labelled 3D)", description: "Unit circle draws θ, r = 1, sinθ, cosθ and tanθ on their exact segments.", category: "mathematics", icon: <Sigma className="h-4 w-4" />, status: "new", component: () => wrapComponent(<MathSymbols />, "3d") },

  // ── Syllabus-mapped 3D suites ──
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite (Class 11)", description: "Projectile motion, circular motion, momentum & collisions, work-energy-power — labelled 3D.", category: "physics", icon: <Rocket className="h-4 w-4" />, status: "new", component: () => wrapComponent(<MechanicsSuite3D />, "3d") },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Ideal Gas Suite", description: "Hooke's law spring, Young's modulus wire, kinetic-molecular ideal gas with PV = nRT — labelled 3D.", category: "physics", icon: <Compass className="h-4 w-4" />, status: "new", component: () => wrapComponent(<ElasticityGasSuite3D />, "3d") },
  { id: "physics-electricity-suite-3d", title: "3D Electricity I Suite (Class 12)", description: "Parallel-plate capacitor with dielectric and meter bridge (Wheatstone) determination — labelled 3D.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "new", component: () => wrapComponent(<ElectricitySuite3D />, "3d") },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", description: "Biot–Savart fields (wire/loop/solenoid), Lorentz force orbit, Faraday & Lenz with LR readouts — labelled 3D.", category: "physics", icon: <AtomIcon className="h-4 w-4" />, status: "new", component: () => wrapComponent(<MagnetismEMISuite3D />, "3d") },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", description: "Young's double slit, single-slit diffraction, Brewster polarisation — labelled 3D.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "new", component: () => wrapComponent(<WaveOpticsSuite3D />, "3d") },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics & Communication Suite", description: "Photoelectric, Bohr atom & spectrum, binding energy, semiconductors/logic/AM-FM — labelled 3D.", category: "physics", icon: <Stars className="h-4 w-4" />, status: "new", component: () => wrapComponent(<ModernPhysicsSuite3D />, "3d") },

  // ============================================================
  // THEORY LAB - MATHEMATICS
  // ============================================================
  { id: "math-th-calculus", title: "Calculus Theory", description: "Limits, derivatives, integrals, fundamental theorem.", category: "mathematics", icon: <FunctionSquare className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="mathematics" topic="calculus" />, "theory") },
  { id: "math-th-trig", title: "Trigonometry Theory", description: "Identities, equations, graphs, inverse functions.", category: "mathematics", icon: <Triangle className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="mathematics" topic="trigonometry" />, "theory") },
  { id: "math-th-algebra", title: "Algebra Theory", description: "Matrices, determinants, complex numbers, vectors.", category: "mathematics", icon: <Columns3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="mathematics" topic="algebra" />, "theory") },
  { id: "math-th-stats", title: "Statistics Theory", description: "Probability, distributions, hypothesis testing.", category: "mathematics", icon: <BarChart3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="mathematics" topic="statistics" />, "theory") },
  { id: "math-th-geo", title: "Coordinate Geometry Theory", description: "Lines, circles, conics in coordinate plane.", category: "mathematics", icon: <Crosshair className="h-4 w-4" />, status: "active", component: () => wrapComponent(<TheoryPanel subject="mathematics" topic="geometry" />, "theory") },

  // ============================================================
  // CALCULATOR LAB (All Subjects)
  // ============================================================
  { id: "ph-calc-ohms", title: "Ohm's Law Calc", description: "Calculate V, I, R with interactive controls.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsInteractive defaultTab="ohms" />, "calculator") },
  { id: "ph-calc-heat", title: "Heat Calculator", description: "Calorimetry, latent heat, thermal expansion.", category: "physics", icon: <Thermometer className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsHeatLab />, "calculator") },
  { id: "ph-calc-optics", title: "Optics Lab", description: "Reflection, refraction, lateral shift, prism dispersion.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsOptics />, "calculator") },
  { id: "ph-calc-projectile", title: "Projectile Motion", description: "Launch projectiles with adjustable velocity, angle, and gravity.", category: "physics", icon: <Rocket className="h-4 w-4" />, status: "active", component: () => wrapComponent(<PhysicsLab />, "calculator") },
  { id: "ch-calc-ph", title: "pH Calculator", description: "Calculate pH from concentration for acids and bases.", category: "chemistry", icon: <TestTube className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryInteractive defaultTab="ph" />, "calculator") },
  { id: "ch-calc-titration", title: "Titration Simulator", description: "Simulate strong acid-strong base titration and track pH changes.", category: "chemistry", icon: <Beaker className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryInteractive defaultTab="titration" />, "calculator") },
  { id: "ch-calc-gas", title: "Gas Laws Calc", description: "Boyle's, Charles's, ideal gas law solver.", category: "chemistry", icon: <WindIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryInteractive defaultTab="gaslaws" />, "calculator") },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", description: "Enter a chemical formula and get molar mass.", category: "chemistry", icon: <Microscope className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryInteractive defaultTab="molarmass" />, "calculator") },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", description: "Moles, percent composition, limiting reagent.", category: "chemistry", icon: <Dna className="h-4 w-4" />, status: "active", component: () => wrapComponent(<ChemistryStoichiometry />, "calculator") },
  { id: "bio-calc-punnett", title: "Punnett Square Solver", description: "Predict offspring genotypes and phenotypes from parental crosses.", category: "biology", icon: <Dna className="h-4 w-4" />, status: "active", component: () => wrapComponent(<BiologyPunnettCalculator />, "calculator") },
  { id: "bio-calc-population", title: "Population Growth Calc", description: "Exponential and logistic population growth models with carrying capacity.", category: "biology", icon: <Users className="h-4 w-4" />, status: "active", component: () => wrapComponent(<BiologyPopulationCalculator />, "calculator") },
  { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calc", description: "Calculate rate of photosynthesis under varying light, CO₂, and temperature.", category: "biology", icon: <Leaf className="h-4 w-4" />, status: "active", component: () => wrapComponent(<BiologyPhotosynthesisCalculator />, "calculator") },
  { id: "math-calc-deriv", title: "Derivative Calculator", description: "Compute derivatives and integrals numerically.", category: "mathematics", icon: <FunctionSquare className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="derivative" />, "calculator") },
  { id: "math-calc-quad", title: "Quadratic Solver", description: "Solve ax^2 + bx + c = 0 and visualize the parabola.", category: "mathematics", icon: <Sigma className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="quadratic" />, "calculator") },
  { id: "math-calc-stats", title: "Statistics Calculator", description: "Mean, median, mode, standard deviation.", category: "mathematics", icon: <BarChart3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="statistics" />, "calculator") },
  { id: "math-calc-matrix", title: "Matrix Calculator", description: "Add, multiply, and transpose matrices.", category: "mathematics", icon: <Grid3x3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="matrix" />, "calculator") },
  { id: "math-calc-trig", title: "Trigonometry Lab", description: "Unit circle visualization and sine/cosine/tangent graphing.", category: "mathematics", icon: <Target className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathTrigonometry />, "calculator") },
  { id: "math-calc-series", title: "Sequences & Series", description: "Arithmetic and geometric progressions.", category: "mathematics", icon: <TrendingUp className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathSeriesLab />, "calculator") },
  { id: "math-calc-vectors", title: "Vector Operations", description: "Add, dot product, cross product of 3D vectors.", category: "mathematics", icon: <Move3d className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="vectors" />, "calculator") },
  { id: "math-calc-limit", title: "Limit Calculator", description: "Estimate limits numerically.", category: "mathematics", icon: <InfinityIcon className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="limit" />, "calculator") },
  { id: "math-calc-system", title: "System Solver", description: "Solve 2x2 and 3x3 systems of linear equations.", category: "mathematics", icon: <Columns3 className="h-4 w-4" />, status: "active", component: () => wrapComponent(<MathInteractive defaultTab="system" />, "calculator") },

  // ============================================================
  // CLASS 11 LABS
  // ============================================================
  { id: "class11-physics", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations for Class 11.", category: "class11", icon: <Rocket className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Class11Physics3DPlus />, "3d") },
  { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations for Class 11.", category: "class11", icon: <Microscope className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Class11Chemistry3DPlus />, "3d") },
  { id: "class11-math", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations for Class 11.", category: "class11", icon: <Binary className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Class11Math3DPlus />, "3d") },
  { id: "class11-biology", title: "Class 11 Biology 3D Plus", description: "Extended 3D biology visualizations — cells, genetics, ecology for Class 11.", category: "class11", icon: <Dna className="h-4 w-4" />, status: "new", component: () => wrapComponent(<Class11Biology3DPlus />, "3d") },

  // ============================================================
  // PREMIUM LABS
  // ============================================================
  { id: "ai-tutor", title: "AI Lab Tutor", description: "Get instant help with lab concepts. AI explains, solves, and visualizes any problem.", category: "physics", icon: <Brain className="h-4 w-4" />, status: "premium", creditCost: 5000, component: () => wrapComponent(<PremiumPlaceholder title="AI Lab Tutor" icon={<Brain className="h-5 w-5 text-amber-500" />} description="Get instant help with lab concepts." />, "calculator") },
  { id: "advanced-circuit", title: "Advanced Circuit Simulator", description: "Build and test complex circuits with 50+ components.", category: "physics", icon: <Bolt className="h-4 w-4" />, status: "premium", creditCost: 7000, component: () => wrapComponent(<PremiumAdvancedCircuitSimulator />, "calculator") },
  { id: "molecular-builder", title: "Molecular Builder 3D", description: "Build any molecule from scratch. Simulate reactions.", category: "chemistry", icon: <AtomIcon className="h-4 w-4" />, status: "premium", creditCost: 8000, component: () => wrapComponent(<PremiumPlaceholder title="Molecular Builder 3D" icon={<AtomIcon className="h-5 w-5 text-amber-500" />} description="Build molecules from scratch." />, "3d") },
  { id: "equation-solver", title: "Universal Equation Solver", description: "Solve any physics, chemistry, or math equation.", category: "mathematics", icon: <Sparkles className="h-4 w-4" />, status: "premium", creditCost: 6000, component: () => wrapComponent(<PremiumEquationSolver />, "calculator") },
];

export default function LabPage() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<LabCategory>("physics");
  const [activeType, setActiveType] = useState<"3d" | "theory" | "calculator">("3d");
  const [credits, setCredits] = useState<number>(INITIAL_CREDITS);
  const [premiumLabs, setPremiumLabs] = useState<Set<string>>(new Set());

  // Filter labs by subject and type
  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchesSubject = lab.category === activeSubject;
      let matchesType = true;
      if (activeType === "3d") matchesType = !lab.id.includes("th-") && !lab.id.includes("calc");
      else if (activeType === "theory") matchesType = lab.id.includes("th-");
      else matchesType = lab.id.includes("calc");
      return matchesSubject && matchesType;
    });
  }, [activeSubject, activeType]);

  const premiumLabList = useMemo(() => labs.filter((lab) => lab.status === "premium"), [labs]);

  const handleSelectLab = (id: string) => {
    setSelectedLabId(id);
    const lab = labs.find((l) => l.id === id);
    if (lab) setActiveSubject(lab.category);
  };

  // Auto-select the first lab when subject/type changes
  useEffect(() => {
    if (filteredLabs.length > 0 && !selectedLabId) {
      setSelectedLabId(filteredLabs[0].id);
    }
  }, [activeSubject, activeType]);

  const SelectedLabComponent = useMemo(() => {
    if (selectedLabId) {
      const lab = labs.find((l) => l.id === selectedLabId);
      return lab?.component || null;
    }
    const firstLab = filteredLabs[0];
    return firstLab?.component || null;
  }, [selectedLabId, filteredLabs, labs]);

  // Get current lab for display
  const currentLab = useMemo(() => {
    return labs.find(l => l.id === selectedLabId);
  }, [selectedLabId]);

  return (
    <div className="container mx-auto max-w-7xl space-y-4 md:space-y-6 py-4 md:py-8 px-3 md:px-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <FlaskConical className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            Interactive Lab
          </h1>
        </div>
        <p className="text-xs md:text-base text-muted-foreground">
          Explore concepts through 3D simulations, theory explanations, and interactive calculators.
        </p>

        {/* Quick Links to Dedicated Pages */}
        <div className="flex gap-2 md:gap-3 mt-3 flex-wrap">
          <Link href="/lab/3d" className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-xs md:text-sm font-medium">
            <Cuboid className="h-3.5 w-3.5" />
            <span>Open 3D Lab</span>
          </Link>
          <Link href="/lab/theory" className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-green-500/10 text-green-700 border border-green-500/20 hover:bg-green-500/20 transition-colors text-xs md:text-sm font-medium">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Open Theory Lab</span>
          </Link>
          <Link href="/lab/class11" className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-purple-500/10 text-purple-700 border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-xs md:text-sm font-medium">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Class 11 Lab</span>
          </Link>
        </div>
      </div>

      {/* Main Type Toggle: 3D Lab | Theory Lab | Calculators */}
      <div className="flex gap-1 md:gap-2 p-1 bg-muted rounded-xl w-fit">
        <button
          onClick={() => setActiveType("3d")}
          className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
            activeType === "3d"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cuboid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">3D Lab</span>
          <span className="sm:hidden">3D</span>
          <span className="text-xs opacity-70">({labs.filter(l => !l.id.includes("th-") && !l.id.includes("calc")).length})</span>
        </button>
        <button
          onClick={() => setActiveType("theory")}
          className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
            activeType === "theory"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Theory</span>
          <span className="sm:hidden">Th</span>
          <span className="text-xs opacity-70">({labs.filter(l => l.id.includes("th-")).length})</span>
        </button>
        <button
          onClick={() => setActiveType("calculator")}
          className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
            activeType === "calculator"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Calc</span>
          <span className="sm:hidden">Cal</span>
          <span className="text-xs opacity-70">({labs.filter(l => l.id.includes("calc")).length})</span>
        </button>
      </div>

      {/* Subject Tabs */}
      <Tabs value={activeSubject} onValueChange={(v) => setActiveSubject(v as LabCategory)} className="w-full">
        <TabsList className="flex-wrap h-auto bg-transparent border-b rounded-none px-0 w-full justify-start gap-1">
          <TabsTrigger value="physics" className="gap-1.5 py-2 px-3 md:px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs md:text-sm">
            <Atom className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Physics</span>
            <span className="xs:hidden">Phy</span>
            <span className="text-xs opacity-60">({labs.filter(l => l.category === "physics").length})</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="gap-1.5 py-2 px-3 md:px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs md:text-sm">
            <FlaskConical className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Chemistry</span>
            <span className="xs:hidden">Chem</span>
            <span className="text-xs opacity-60">({labs.filter(l => l.category === "chemistry").length})</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="gap-1.5 py-2 px-3 md:px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs md:text-sm">
            <Calculator className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Math</span>
            <span className="xs:hidden">Math</span>
            <span className="text-xs opacity-60">({labs.filter(l => l.category === "mathematics").length})</span>
          </TabsTrigger>
          <TabsTrigger value="biology" className="gap-1.5 py-2 px-3 md:px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs md:text-sm">
            <Dna className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Biology</span>
            <span className="xs:hidden">Bio</span>
            <span className="text-xs opacity-60">({labs.filter(l => l.category === "biology").length})</span>
          </TabsTrigger>
          <TabsTrigger value="class11" className="gap-1.5 py-2 px-3 md:px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs md:text-sm">
            <GraduationCap className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Class 11</span>
            <span className="xs:hidden">11</span>
          </TabsTrigger>
        </TabsList>

        {/* Lab Content */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
          {/* Lab List — scrollable on mobile */}
          <div className="lg:w-72 xl:w-80 shrink-0">
            <div className="max-h-[50vh] lg:max-h-none overflow-y-auto pr-1">
              <LabDashboard
                labs={filteredLabs}
                onSelectLab={handleSelectLab}
                selectedLabId={selectedLabId ?? undefined}
              />
            </div>
          </div>

          {/* Lab Display — full width on mobile, flex-1 on desktop */}
          <div className="flex-1 min-w-0">
            {SelectedLabComponent ? (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Lab Header */}
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 border-b border-border bg-muted/30">
                  {currentLab?.icon && (
                    <span className="text-primary shrink-0">{currentLab.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-sm md:text-lg truncate">{currentLab?.title}</h2>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">{currentLab?.description}</p>
                  </div>
                  {currentLab && (
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                      currentLab.status === "new" ? "bg-blue-100 text-blue-700 border-blue-200" :
                      currentLab.status === "premium" ? "bg-amber-100 text-amber-700 border-amber-200" :
                      currentLab.status === "development" ? "bg-purple-100 text-purple-700 border-purple-200" :
                      "bg-green-100 text-green-700 border-green-200"
                    }`}>
                      {currentLab.status === "new" ? "New" :
                       currentLab.status === "premium" ? "Prem" :
                       currentLab.status === "development" ? "Dev" : "✓"}
                    </span>
                  )}
                </div>

                {/* Lab Content Area — responsive */}
                <div className="p-2 md:p-4">
                  {typeof SelectedLabComponent === 'function'
                    ? React.createElement(SelectedLabComponent as React.ElementType)
                    : SelectedLabComponent}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-6 md:p-12 text-center">
                <FlaskConical className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mx-auto mb-3 md:mb-4" />
                <h2 className="text-base md:text-lg font-semibold mb-2">Select a Lab</h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Choose a simulation from the list to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
