"use client";

import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabDashboard, LabItem } from "@/components/lab/lab-dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Atom, FlaskConical, Calculator, Zap, Waves, Timer, CircuitBoard, Scale, ScanEye, Eye, Grid3x3, Sigma, FunctionSquare, Table2, Move3d, Infinity as InfinityIcon, Columns3, Beaker, TestTube, Microscope, DNA, Orbit, Wind, Flame, Sun, Moon, Stars, Layover, Cuboid, Sphere, Cylinder, Pyramid, SquareFunction, Lambda, Integral, Division, X, Plus, Minus, Percent, Hash, Code2, BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Target, Crosshair, Compass, Rocket, Satellite, Binary, CPU, Database, Server, Network, GitBranch, GitCommit, GitPullRequest, Crown, Gem, CreditCard, Sparkles, Brain, Robot, Lightning, ShieldCheck, GraduationCap, BookOpen, LayoutDashboard, Film } from "lucide-react";

// Import all lab components - using the REAL implementations from /lab/ directory
import { PhysicsInteractive } from "@/components/lab/physics-interactive";
import { PhysicsOptics } from "@/components/lab/physics-optics";
import { PhysicsHeatLab } from "@/components/lab/physics-heat";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { Physics3D } from "@/components/lab/physics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";

import { ChemistryInteractive } from "@/components/lab/chemistry-interactive";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { ChemistryModern3D } from "@/components/lab/chemistry-modern-3d";
import { Chemistry3D } from "@/components/lab/chemistry-3d";

import { MathInteractive } from "@/components/lab/math-interactive";
import { MathTrigonometry } from "@/components/lab/math-trigonometry";
import { MathSeriesLab } from "@/components/lab/math-series-lab";
import { MathLab } from "@/components/lab/math-lab";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathAdvanced3D } from "@/components/lab/math-advanced-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";

import { Quantum3D } from "@/components/lab/quantum-3d";

import { Class11Physics3D, Class11Chemistry3D, Class11Math3D } from "@/components/lab/class11";
import { Class11Physics3DPlus } from "@/components/lab/class11/class11-physics-3d-plus";
import { Class11Chemistry3DPlus } from "@/components/lab/class11/class11-chemistry-3d-plus";
import { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";
import { 
  Class11KinematicsMotion,
  Class11LawsOfMotion,
  Class11WorkEnergy,
  Class11RotationalMotion,
  Class11AtomicStructure,
  Class11ChemicalBonding,
  Class11Thermodynamics,
  Class11SetsFunctions,
  Class11Trigonometry,
  Class11Statistics
} from "@/components/lab/class11";

// Enhanced 3D components with labelled parts and theory separation
import { 
  Class11KinematicsMotionEnhanced,
  Class11LawsOfMotionEnhanced
} from "@/components/lab/class11";

// Theory components for Class 11
import {
  Class11PhysicsTheoryKinematics,
  Class11PhysicsTheoryLawsMotion,
  Class11ChemistryTheory,
  Class11MathTheory
} from "@/components/lab/class11";

// NEW: Deep Theory with non-general meanings and NEB/CDC peculiar facts
import {
  Class11PhysicsTheoryElectromagnetism,
  Class11ChemistryTheoryElectrochemistry,
  Class11MathTheoryProbability
} from "@/components/lab/class11";

// NEW: 3D Models with labelled meanings for Grade 11 complex concepts
import {
  Class11ElectromagneticInduction,
  Class11ElectrochemistryGalvanicCell,
  Class11Probability3D
} from "@/components/lab/class11";

// NEW: Motion Graphics for Class 11 with labelled meanings
import { MotionClass11WaveInterference } from "@/components/lab/motion-graphics";

// 3D Mirrors with Labels
import { Physics3DMirrors } from "@/components/lab/physics-3d-mirrors";

// 3D Heat Determination labs (labelled components + theory)
import { Physics3DHeatDeterminations } from "@/components/lab/physics-3d-heat-determinations";

// Symbol-at-place suites (labelled 3D)
import MechanicsSymbols from "@/components/lab/physics-3d-mechanics-symbols";
import ElectricitySymbols from "@/components/lab/physics-3d-electricity-symbols";
import WavesSymbols from "@/components/lab/physics-3d-waves-symbols";
import AtomicSymbols from "@/components/lab/physics-3d-atomic-symbols";
import MathSymbols from "@/components/lab/math-3d-symbols";

// 3D Chemistry with Labels
import { Chemistry3DMolecules } from "@/components/lab/chemistry-3d-molecules";

// 3D Math Geometry with Labels
import { Math3DGeometryLabeled } from "@/components/lab/math-3d-geometry-labelledby";

export default function LabPage() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<"physics" | "chemistry" | "mathematics" | "class11">("physics");
  const [credits, setCredits] = useState<number>(29000);
  const [premiumLabs, setPremiumLabs] = useState<Set<string>>(new Set());

  // Define all labs with their components and categories
  const labs: LabItem[] = [
    // Physics Labs
    { id: "ohms", title: "Ohm's Law", description: "Calculate voltage, current, and resistance with interactive circuit controls.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="ohms" /> },
    { id: "wave", title: "Wave Simulator", description: "Explore frequency, amplitude, and wavelength relationships in real time.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="wave" /> },
    { id: "pendulum", title: "Simple Pendulum", description: "Visualize oscillation period with adjustable length, gravity, and angle.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="pendulum" /> },
    { id: "circuit", title: "Circuit Simulator", description: "Analyze series and parallel resistor networks with voltage drop calculations.", category: "physics", icon: <CircuitBoard className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="circuit" /> },
    { id: "energy", title: "Energy Calculator", description: "Compute kinetic, potential, and conservation-of-energy scenarios.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="energy" /> },
    { id: "lens", title: "Lens / Mirror", description: "Thin lens and spherical mirror equation solver with sign conventions.", category: "physics", icon: <ScanEye className="h-4 w-4" />, status: "active", component: () => <PhysicsInteractive defaultTab="lens" /> },
    { id: "optics", title: "Optics Lab", description: "Reflection, refraction, lateral shift, prism dispersion, diffraction, and 3D lens.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "active", component: PhysicsOptics },
    { id: "heat", title: "Heat & Thermodynamics", description: "Calorimetry, latent heat, thermal expansion, and Newton's cooling experiments.", category: "physics", icon: <Sun className="h-4 w-4" />, status: "active", component: PhysicsHeatLab },
    { id: "projectile", title: "Projectile Motion 3D", description: "Launch projectiles with adjustable velocity, angle, and gravity in 3D.", category: "physics", icon: <Rocket className="h-4 w-4" />, status: "active", component: PhysicsLab },
    { id: "circular", title: "Uniform Circular Motion", description: "3D visualization of centripetal force, velocity, and acceleration vectors.", category: "physics", icon: <Orbit className="h-4 w-4" />, status: "active", component: PhysicsLab },
    { id: "shm", title: "Simple Harmonic Motion", description: "Spring oscillation with displacement-time graph and amplitude control.", category: "physics", icon: <Compass className="h-4 w-4" />, status: "active", component: PhysicsLab },
    { id: "physics-3d", title: "Physics 3D", description: "Advanced 3D physics visualizations and interactive simulations.", category: "physics", icon: <Cuboid className="h-4 w-4" />, status: "development", component: Physics3D },
    { id: "physics-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay, fluid flow, N-body orbits, PVT surface.", category: "physics", icon: <Satellite className="h-4 w-4" />, status: "new", component: Physics3DAdvanced },
    { id: "physics-mirrors-3d", title: "3D Spherical Mirrors (Concave & Convex)", description: "Interactive 3D concave and convex mirrors with CSS2D labelled parts: focus, pole, object, image, and ray diagrams with complete theory.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "new", component: Physics3DMirrors },
    { id: "physics-heat-determinations-3d", title: "3D Heat Determination Labs", description: "Lee's disc, Searle's bar, Newton's law of cooling and linear expansion apparatus in labelled 3D with live formulas, procedure lists and full significance theory inside & below each experiment.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "new", component: Physics3DHeatDeterminations },
    { id: "symbols-mechanics-3d", title: "3D Symbols — Mechanics", description: "Pendulum & projectile render every classic symbol (θ, L, mg, T, ω, v₀, vₓ, v_y, g, H, R, T) at its exact place with descriptions below.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "new", component: () => <MechanicsSymbols /> },
    { id: "symbols-electricity-3d", title: "3D Symbols — Electricity", description: "Ohm's-law circuit with ε, V, I, R, ammeter (series) & voltmeter (parallel) at their exact wiring positions, moving charge, and live P pane below.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "new", component: () => <ElectricitySymbols /> },
    { id: "symbols-waves-3d", title: "3D Symbols — Waves", description: "Travelling transverse wave with A, crest, trough, λ, v and f drawn where they act; tune amplitude, wavelength and speed.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "new", component: () => <WavesSymbols /> },
    { id: "symbols-atomic-3d", title: "3D Symbols — Atomic", description: "Bohr model with +Ze, rₙ = r₁n², Eₙ and photon hν at their exact shells; electron orbits your chosen quantum level n.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: () => <AtomicSymbols /> },
    { id: "symbols-math-3d", title: "3D Symbols — Mathematics", description: "Unit circle draws θ, r=1, sinθ, cosθ and tanθ on their exact segments with live values.", category: "mathematics", icon: <Sigma className="h-4 w-4" />, status: "new", component: () => <MathSymbols /> },

    // Chemistry Labs
    { id: "ph", title: "pH Calculator", description: "Calculate pH from concentration for acids and bases with color-coded scale.", category: "chemistry", icon: <TestTube className="h-4 w-4" />, status: "active", component: () => <ChemistryInteractive defaultTab="ph" /> },
    { id: "titration", title: "Titration Simulator", description: "Simulate strong acid-strong base titration and track pH changes.", category: "chemistry", icon: <Beaker className="h-4 w-4" />, status: "active", component: () => <ChemistryInteractive defaultTab="titration" /> },
    { id: "concentration", title: "Concentration Calculator", description: "Compute molarity and dilution using M1V1 = M2V2.", category: "chemistry", icon: <FlaskConical className="h-4 w-4" />, status: "active", component: () => <ChemistryInteractive defaultTab="concentration" /> },
    { id: "molarmass", title: "Molar Mass Calculator", description: "Enter a chemical formula and get molar mass with element breakdown.", category: "chemistry", icon: <Microscope className="h-4 w-4" />, status: "active", component: () => <ChemistryInteractive defaultTab="molarmass" /> },
    { id: "gaslaws", title: "Gas Laws Calculator", description: "Solve combined, Boyle's, Charles's, and ideal gas law problems.", category: "chemistry", icon: <Wind className="h-4 w-4" />, status: "active", component: () => <ChemistryInteractive defaultTab="gaslaws" /> },
    { id: "stoichiometry", title: "Stoichiometry Lab", description: "Moles, percent composition, and limiting reagent calculations.", category: "chemistry", icon: <DNA className="h-4 w-4" />, status: "active", component: ChemistryLab },
    { id: "periodic", title: "3D Periodic Table", description: "Interactive 3D periodic table with element details, categories, and search.", category: "chemistry", icon: <Sphere className="h-4 w-4" />, status: "active", component: ChemistryLab },
    { id: "chemistry-3d", title: "Chemistry 3D", description: "Advanced 3D molecular and chemical structure visualizations.", category: "chemistry", icon: <Cylinder className="h-4 w-4" />, status: "development", component: ChemistryAdvanced3D },
    { id: "chemistry-modern-3d", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR, galvanic cell, phase diagrams.", category: "chemistry", icon: <Pyramid className="h-4 w-4" />, status: "new", component: ChemistryModern3D },
    { id: "chemistry-full-3d", title: "Chemistry 3D Complete", description: "Complete 3D chemistry visualization suite.", category: "chemistry", icon: <Layover className="h-4 w-4" />, status: "new", component: Chemistry3D },
    { id: "chemistry-molecules-3d", title: "3D Molecular Structures with Labels", description: "Interactive 3D molecules (H₂O, CO₂, CH₄, NH₃, C₆H₁₂O₆) with clearly labelled atoms and bonds using CSS2D labels. Rotate, zoom, and explore.", category: "chemistry", icon: <Microscope className="h-4 w-4" />, status: "new", component: Chemistry3DMolecules },

    // Mathematics Labs
    { id: "derivative", title: "Derivative & Integral", description: "Compute derivatives and integrals numerically with function graphing.", category: "mathematics", icon: <SquareFunction className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="derivative" /> },
    { id: "quadratic", title: "Quadratic Solver", description: "Solve ax² + bx + c = 0 and visualize the parabola.", category: "mathematics", icon: <Lambda className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="quadratic" /> },
    { id: "statistics", title: "Statistics Calculator", description: "Calculate mean, median, mode, standard deviation, min, and max.", category: "mathematics", icon: <BarChart3 className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="statistics" /> },
    { id: "matrix", title: "Matrix Operations", description: "Add, multiply, and transpose matrices with text-based input.", category: "mathematics", icon: <Grid3x3 className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="matrix" /> },
    { id: "plotter3d", title: "3D Surface Plotter", description: "Plot z = f(x, y) in interactive 3D with orbit controls.", category: "mathematics", icon: <Cuboid className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="plotter3d" /> },
    { id: "limit", title: "Limit Calculator", description: "Estimate limits numerically using symmetric difference quotients.", category: "mathematics", icon: <InfinityIcon className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="limit" /> },
    { id: "system", title: "System Solver", description: "Solve 2×2 and 3×3 systems of linear equations.", category: "mathematics", icon: <Code2 className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="system" /> },
    { id: "vectors", title: "Vector Operations", description: "Add, dot product, and cross product of 3D vectors.", category: "mathematics", icon: <Move3d className="h-4 w-4" />, status: "active", component: () => <MathInteractive defaultTab="vectors" /> },
    { id: "trig", title: "Trigonometry Lab", description: "Unit circle visualization and sine/cosine/tangent graphing.", category: "mathematics", icon: <Target className="h-4 w-4" />, status: "active", component: MathTrigonometry },
    { id: "series", title: "Sequences & Series", description: "Arithmetic and geometric progressions with series summation.", category: "mathematics", icon: <TrendingUp className="h-4 w-4" />, status: "active", component: MathSeriesLab },
    { id: "geometry", title: "Coordinate Geometry", description: "3D coordinate geometry with points, lines, planes, and vectors.", category: "mathematics", icon: <Crosshair className="h-4 w-4" />, status: "active", component: MathLab },
    { id: "surfaces", title: "3D Mathematical Surfaces", description: "Explore saddle, wave, ripple, peak, plane, and cylinder surfaces.", category: "mathematics", icon: <Sphere className="h-4 w-4" />, status: "active", component: MathLab },
    { id: "math-3d", title: "Mathematics 3D", description: "Advanced 3D mathematical visualizations and geometry.", category: "mathematics", icon: <Pyramid className="h-4 w-4" />, status: "development", component: MathAdvanced3D },
    { id: "math-modern-3d", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces, matrix transforms, Riemann surfaces, game theory, topology.", category: "mathematics", icon: <Binary className="h-4 w-4" />, status: "new", component: MathModern3D },
    { id: "math-geometry-3d", title: "Mathematics Geometry 3D", description: "Advanced 3D geometry visualizations.", category: "mathematics", icon: <Cylinder className="h-4 w-4" />, status: "new", component: MathGeometry3D },
    { id: "math-geometry-labeled-3d", title: "3D Geometry Shapes with Labels", description: "Interactive 3D geometric shapes (Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid, Torus) with clearly labelled parts using CSS2D labels. Explore faces, edges, vertices.", category: "mathematics", icon: <SquareFunction className="h-4 w-4" />, status: "new", component: Math3DGeometryLabeled },

    // Class 11 Labs - Original
    { id: "class11-physics-3d", title: "Class 11 Physics 3D", description: "3D visualizations for Class 11 Physics concepts.", category: "class11", icon: <Rocket className="h-4 w-4" />, status: "active", component: Class11Physics3D },
    { id: "class11-chemistry-3d", title: "Class 11 Chemistry 3D", description: "3D visualizations for Class 11 Chemistry concepts.", category: "class11", icon: <Microscope className="h-4 w-4" />, status: "active", component: Class11Chemistry3D },
    { id: "class11-math-3d", title: "Class 11 Math 3D", description: "3D visualizations for Class 11 Math concepts.", category: "class11", icon: <Target className="h-4 w-4" />, status: "active", component: Class11Math3D },
    { id: "class11-physics-plus", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations for Class 11.", category: "class11", icon: <Satellite className="h-4 w-4" />, status: "new", component: Class11Physics3DPlus },
    { id: "class11-chemistry-plus", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations for Class 11.", category: "class11", icon: <DNA className="h-4 w-4" />, status: "new", component: Class11Chemistry3DPlus },
    { id: "class11-math-plus", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations for Class 11.", category: "class11", icon: <Binary className="h-4 w-4" />, status: "new", component: Class11Math3DPlus },
    
    // Class 11 Motion Graphics Labs - NEW (11 Labs)
    { id: "class11-kinematics", title: "Kinematics Motion", description: "Interactive 3D motion graphics showing kinematic equations in action.", category: "class11", icon: <Move3d className="h-4 w-4" />, status: "new", component: Class11KinematicsMotion },
    { id: "class11-laws-motion", title: "Laws of Motion", description: "3D visualization of Newton's Three Laws with force analysis and pulley systems.", category: "class11", icon: <Scale className="h-4 w-4" />, status: "new", component: Class11LawsOfMotion },
    { id: "class11-work-energy", title: "Work, Energy & Power", description: "Interactive visualization of work-energy theorem and conservation of energy.", category: "class11", icon: <Flame className="h-4 w-4" />, status: "new", component: Class11WorkEnergy },
    { id: "class11-rotational", title: "Rotational Motion", description: "3D visualization of circular motion, centripetal force, and angular kinematics.", category: "class11", icon: <Orbit className="h-4 w-4" />, status: "new", component: Class11RotationalMotion },
    { id: "class11-atomic", title: "Atomic Structure", description: "Interactive 3D atomic model with electron configuration for first 10 elements.", category: "class11", icon: <Atom className="h-4 w-4" />, status: "new", component: Class11AtomicStructure },
    { id: "class11-bonding", title: "Chemical Bonding", description: "3D visualization of ionic, covalent, and metallic bonds with molecular structures.", category: "class11", icon: <DNA className="h-4 w-4" />, status: "new", component: Class11ChemicalBonding },
    { id: "class11-thermodynamics", title: "Thermodynamics", description: "Interactive piston-cylinder system showing thermodynamic processes and First Law.", category: "class11", icon: <Sun className="h-4 w-4" />, status: "new", component: Class11Thermodynamics },
    { id: "class11-sets", title: "Sets & Functions", description: "3D visualization of set theory and function concepts with Venn diagrams.", category: "class11", icon: <Columns3 className="h-4 w-4" />, status: "new", component: Class11SetsFunctions },
    { id: "class11-trigonometry", title: "Trigonometry", description: "Interactive unit circle and trigonometric wave visualizations.", category: "class11", icon: <Target className="h-4 w-4" />, status: "new", component: Class11Trigonometry },
    { id: "class11-statistics", title: "Statistics", description: "3D visualization of statistical measures with normal distribution curve.", category: "class11", icon: <BarChart3 className="h-4 w-4" />, status: "new", component: Class11Statistics },
    { id: "class11-oscillations", title: "Oscillations & Waves", description: "3D visualization of SHM, wave motion, and interference patterns.", category: "class11", icon: <Waves className="h-4 w-4" />, status: "new", component: () => <PhysicsInteractive defaultTab="shm" /> },
    
    // Enhanced 3D Labs with Labels and Theory Separation
    { id: "class11-kinematics-enhanced", title: "Kinematics Enhanced (with Labels)", description: "Enhanced 3D kinematics with clearly labelled components, comprehensive theory, and step-by-step equations.", category: "class11", icon: <Move3d className="h-4 w-4" />, status: "premium", component: Class11KinematicsMotionEnhanced, creditCost: 3000 },
    { id: "class11-laws-motion-enhanced", title: "Laws of Motion Enhanced (with Labels)", description: "Enhanced pulley system with labelled forces, detailed theory, free body diagrams, and real-world applications.", category: "class11", icon: <Scale className="h-4 w-4" />, status: "premium", component: Class11LawsOfMotionEnhanced, creditCost: 4000 },
    
    // NEW: 3D Models with Labelled Meanings for Grade 11 Complex Concepts
    { id: "class11-electromagnetic-induction", title: "Electromagnetic Induction 3D", description: "3D visualization of Faraday's Law and Lenz's Law with labelled magnet, coil, galvanometer, and induced current. Interactive demonstration of electromagnetic induction with NEB/CDC alignment.", category: "class11", icon: <Zap className="h-4 w-4" />, status: "new", component: Class11ElectromagneticInduction },
    { id: "class11-electrochemistry-galvanic", title: "Electrochemistry - Galvanic Cell 3D", description: "Interactive 3D Galvanic Cell with labelled anode, cathode, salt bridge, electrons, ions, and voltmeter. Demonstrates Zn-Cu cell with redox reactions. NEB/CDC Chemistry curriculum aligned.", category: "class11", icon: <FlaskConical className="h-4 w-4" />, status: "new", component: Class11ElectrochemistryGalvanicCell },
    { id: "class11-probability-3d", title: "Probability Distributions 3D", description: "3D visualization of Normal and Binomial distributions with labelled mean, standard deviation, and probability density functions. Interactive statistical concepts for Class 11 Math.", category: "class11", icon: <BarChart3 className="h-4 w-4" />, status: "new", component: Class11Probability3D },
    
    // Theory Labs for Class 11
    { id: "class11-physics-theory-kinematics", title: "Physics Theory: Kinematics", description: "Comprehensive Class 11 Physics theory for Kinematics - concepts, formulas, and detailed explanations.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "premium", component: Class11PhysicsTheoryKinematics, creditCost: 2000 },
    { id: "class11-physics-theory-laws-motion", title: "Physics Theory: Laws of Motion", description: "Complete Class 11 Physics theory for Newtons Laws of Motion with force analysis and friction.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "premium", component: Class11PhysicsTheoryLawsMotion, creditCost: 2500 },
    { id: "class11-chemistry-theory", title: "Chemistry Theory Complete", description: "Comprehensive Class 11 Chemistry theory covering atomic structure, periodic table, bonding, thermodynamics, and equilibrium.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "premium", component: Class11ChemistryTheory, creditCost: 3500 },
    { id: "class11-math-theory", title: "Mathematics Theory Complete", description: "Complete Class 11 Mathematics theory covering sets, functions, trigonometry, algebra, coordinate geometry, calculus, and statistics.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "premium", component: Class11MathTheory, creditCost: 3000 },
    
    // NEW: Deep Theory Labs with Non-General Meanings and NEB/CDC Peculiar Facts
    { id: "class11-physics-theory-electromagnetism", title: "Physics Theory: Electromagnetism (Deep)", description: "NEB/CDC Chapter 8: Deep dive into Electromagnetic Induction with peculiar exam facts - Magnetic Flux, Faraday's Laws, Lenz's Law, Self & Mutual Induction, Eddy Currents, AC Generator, Transformer with non-general definitions and NEB-specific numerical focus.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "new", component: Class11PhysicsTheoryElectromagnetism },
    { id: "class11-chemistry-theory-electrochemistry", title: "Chemistry Theory: Electrochemistry (Deep)", description: "NEB/CDC Chapter 9: Deep dive into Electrochemistry with peculiar facts - Redox Reactions, Electrochemical Series, Daniel Cell, Nernst Equation, Electrolytic Cells, Electrolysis, Faraday's Laws with NEB-specific exam focus and non-general meanings.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "new", component: Class11ChemistryTheoryElectrochemistry },
    { id: "class11-math-theory-probability", title: "Mathematics Theory: Probability & Statistics (Deep)", description: "NEB/CDC Deep Statistics and Probability: Measures of Central Tendency (Mean, Median, Mode with all methods), Dispersion (Range, Q.D., M.D., Standard Deviation), Probability Theory, Binomial Distribution, Normal Distribution with NEB peculiar facts and non-general definitions.", category: "class11", icon: <GraduationCap className="h-4 w-4" />, status: "new", component: Class11MathTheoryProbability },
    
    // Quantum Labs
    { id: "quantum-3d", title: "Quantum 3D", description: "Quantum mechanics visualizations including orbitals, probability distributions, and spin.", category: "physics", icon: <Stars className="h-4 w-4" />, status: "new", component: Quantum3D },

    // Premium Labs (require credits to unlock)
    { id: "ai-tutor", title: "AI Lab Tutor", description: "Get instant help with lab concepts. AI explains, solves, and visualizes any problem.", category: "physics", icon: <Brain className="h-4 w-4" />, status: "premium", component: null, creditCost: 5000 },
    { id: "advanced-simulator", title: "Advanced Circuit Simulator", description: "Build and test complex circuits with 50+ components. Real-time analysis with AI suggestions.", category: "physics", icon: <Lightning className="h-4 w-4" />, status: "premium", component: null, creditCost: 7000 },
    { id: "molecular-builder", title: "Molecular Builder 3D", description: "Build any molecule from scratch. Simulate reactions, calculate properties, and export structures.", category: "chemistry", icon: <Robot className="h-4 w-4" />, status: "premium", component: null, creditCost: 8000 },
    { id: "equation-solver", title: "Universal Equation Solver", description: "Solve any physics, chemistry, or math equation. Step-by-step solutions with explanations.", category: "mathematics", icon: <Sparkles className="h-4 w-4" />, status: "premium", component: null, creditCost: 6000 },
    { id: "vr-lab", title: "VR Laboratory", description: "Immersive VR experience. Perform experiments in a virtual lab with 360° interaction.", category: "class11", icon: <ShieldCheck className="h-4 w-4" />, status: "premium", component: null, creditCost: 3000 },
  ];

  // Filter out premium labs that haven't been unlocked
  const availableLabs = useMemo(() => {
    return labs.filter(lab => {
      if (lab.status === "premium") {
        return premiumLabs.has(lab.id);
      }
      return true;
    });
  }, [labs, premiumLabs]);

  // Filter labs by subject for the current tab
  const filteredLabs = useMemo(() => {
    if (activeSubject === "all") return availableLabs;
    return availableLabs.filter(lab => lab.category === activeSubject);
  }, [activeSubject, availableLabs]);

  // Get premium labs for display
  const premiumLabList = useMemo(() => {
    return labs.filter(lab => lab.status === "premium");
  }, [labs]);

  // Unlock a premium lab
  const unlockPremiumLab = (labId: string, cost: number) => {
    if (credits >= cost) {
      setCredits(credits - cost);
      setPremiumLabs(new Set(premiumLabs).add(labId));
      // Save to localStorage
      localStorage.setItem("labCredits", (29000 - (credits - cost)).toString());
      localStorage.setItem("unlockedLabs", JSON.stringify(Array.from(new Set(premiumLabs).add(labId))));
    }
  };

  // Load saved state from localStorage
  useEffect(() => {
    const savedCredits = localStorage.getItem("labCredits");
    const savedLabs = localStorage.getItem("unlockedLabs");
    if (savedCredits) {
      const used = parseInt(savedCredits);
      setCredits(Math.max(0, 29000 - used));
    }
    if (savedLabs) {
      setPremiumLabs(new Set(JSON.parse(savedLabs)));
    }
  }, []);

  // Get the currently selected lab component
  const SelectedLabComponent = useMemo(() => {
    if (selectedLabId) {
      const lab = labs.find(l => l.id === selectedLabId);
      return lab ? lab.component : null;
    }
    // Default to first lab in current subject
    const firstLab = filteredLabs[0];
    return firstLab?.component || null;
  }, [selectedLabId, filteredLabs, labs]);

  // Auto-select first lab when subject changes
  useEffect(() => {
    if (filteredLabs.length > 0 && !selectedLabId) {
      setSelectedLabId(filteredLabs[0].id);
    }
  }, [activeSubject, filteredLabs, selectedLabId]);

  // Handle lab selection
  const handleSelectLab = (id: string) => {
    setSelectedLabId(id);
    const lab = labs.find((l) => l.id === id);
    if (lab) {
      setActiveSubject(lab.category);
    }
  };

  // Handle subject tab change
  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject as typeof activeSubject);
    setSelectedLabId(null); // Will auto-select first lab in useEffect
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-6 sm:py-10 px-4 sm:px-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">🔬 Lab</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Interactive visualizations, simulations, and calculators for Physics, Chemistry, Mathematics, and Class 11.
        </p>
      </div>

      {/* Navigation to Separate Pages */}
      <div className="flex flex-wrap gap-3">
        <Link href="/lab/3d" passHref>
          <Button variant="outline" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>3D Labs</span>
          </Button>
        </Link>
        <Link href="/lab/theory" passHref>
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Theory Labs</span>
          </Button>
        </Link>
        <Link href="/lab/motion-graphics" passHref>
          <Button variant="outline" className="gap-2">
            <Film className="h-4 w-4" />
            <span>Motion Graphics</span>
          </Button>
        </Link>
      </div>

      {/* Credit Balance Display */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <CreditCard className="h-8 w-8 text-amber-600" />
            <Gem className="h-4 w-4 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Your Lab Credits</p>
            <p className="text-2xl font-bold text-amber-600">
              {credits.toLocaleString()}
              <span className="text-xs font-normal text-amber-600/70 ml-1">/ 29,000</span>
            </p>
          </div>
        </div>
        
        {/* Premium Labs Preview */}
        {premiumLabList.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground hidden sm:inline">Premium Labs:</span>
            <div className="flex items-center gap-1">
              {premiumLabList.map((lab) => (
                <button
                  key={lab.id}
                  onClick={() => {
                    if (premiumLabs.has(lab.id)) {
                      setSelectedLabId(lab.id);
                      setActiveSubject(lab.category);
                    }
                  }}
                  disabled={!premiumLabs.has(lab.id) && credits < (lab.creditCost || 0)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    premiumLabs.has(lab.id) 
                      ? "bg-green-500/10 text-green-600 border border-green-500/20 cursor-pointer hover:bg-green-500/20"
                      : credits >= (lab.creditCost || 0)
                      ? "bg-amber-500/10 text-amber-600 border border-amber-500/20 cursor-pointer hover:bg-amber-500/20"
                      : "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
                  }`}
                >
                  {lab.icon}
                  <span className="hidden md:inline">{lab.title.split(" ")[0]}</span>
                  {!premiumLabs.has(lab.id) && !premiumLabs.has(lab.id) && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-700 px-1 rounded">{(lab.creditCost || 0).toLocaleString()}cr</span>
                  )}
                </button>
              ))}
              {premiumLabList.every(l => premiumLabs.has(l.id)) ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden md:inline">All Premium Unlocked!</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    const allPremium = premiumLabList.filter(l => !premiumLabs.has(l.id));
                    if (allPremium.length > 0) {
                      const cheapest = allPremium.sort((a, b) => (a.creditCost || 0) - (b.creditCost || 0))[0];
                      if (credits >= (cheapest.creditCost || 0)) {
                        unlockPremiumLab(cheapest.id, cheapest.creditCost || 0);
                      }
                    }
                  }}
                  disabled={credits <= 0 || premiumLabList.every(l => premiumLabs.has(l.id))}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden md:inline">Unlock Next</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <LabDashboard 
        labs={availableLabs} 
        onSelectLab={handleSelectLab} 
        selectedLabId={selectedLabId}
      />

      <Tabs value={activeSubject} onValueChange={handleSubjectChange} className="w-full mt-6">
        <TabsList className="flex-wrap h-auto sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="physics" className="gap-2 py-2 px-3">
            <Atom className="h-4 w-4" />
            <span className="hidden xs:inline">Physics</span>
            <span className="xs:hidden">Phys</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="gap-2 py-2 px-3">
            <FlaskConical className="h-4 w-4" />
            <span className="hidden xs:inline">Chemistry</span>
            <span className="xs:hidden">Chem</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="gap-2 py-2 px-3">
            <Calculator className="h-4 w-4" />
            <span className="hidden xs:inline">Mathematics</span>
            <span className="xs:hidden">Math</span>
          </TabsTrigger>
          <TabsTrigger value="class11" className="gap-2 py-2 px-3">
            <Atom className="h-4 w-4" />
            <span className="hidden xs:inline">Class 11</span>
            <span className="xs:hidden">C11</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physics" className="mt-4 sm:mt-6 p-4 bg-card rounded-lg shadow-sm">
          {SelectedLabComponent && <SelectedLabComponent />}
        </TabsContent>

        <TabsContent value="chemistry" className="mt-4 sm:mt-6 p-4 bg-card rounded-lg shadow-sm">
          {SelectedLabComponent && <SelectedLabComponent />}
        </TabsContent>

        <TabsContent value="mathematics" className="mt-4 sm:mt-6 p-4 bg-card rounded-lg shadow-sm">
          {SelectedLabComponent && <SelectedLabComponent />}
        </TabsContent>

        <TabsContent value="class11" className="mt-4 sm:mt-6 p-4 bg-card rounded-lg shadow-sm">
          {SelectedLabComponent && <SelectedLabComponent />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
