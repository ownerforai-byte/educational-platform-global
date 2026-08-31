"use client";

import React, { useState, useMemo, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertCircle, BookOpen, Atom, Calculator, ChevronRight, ChevronDown, FlaskConical, Dna, Microscope, Activity, TestTube, Atom as AtomIcon, Brain, Eye, Zap, Thermometer, Scale, Timer, TrendingUp, Star, Globe, Search, Cuboid, Infinity as InfinityIcon, Columns3, Move3d, Target, Crosshair, Binary, Sparkles, Bolt, Grid3x3, Sigma, BarChart3, FunctionSquare, Triangle, Hexagon, Radio, TreeDeciduous, Heart as HeartIcon, Users as UsersIcon, Leaf as LeafIcon, Box, Flame, Wind as WindIcon, CircuitBoard } from "lucide-react";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { MathAdvancedMotionLab } from "@/components/lab/math-motion-3d";
import { MathInteractive } from "@/components/lab/math-interactive";
import MathSymbols from "@/components/lab/math-3d-symbols";
import { MathSeriesLab } from "@/components/lab/math-series-lab";
import { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { BiologyLab } from "@/components/lab/biology-lab";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import {
  BiologyAdvanced3D,
  BiologyEvolution3D,
  BiologyPunnettCalculator,
  BiologyPopulationCalculator,
  BiologyPhotosynthesisCalculator,
} from "@/components/lab/biology-3d";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { PremiumEquationSolver } from "@/components/lab/premium-equation-solver";
import { PremiumAdvancedCircuitSimulator } from "@/components/lab/premium-advanced-circuit";
import { PremiumPlaceholder } from "@/components/lab/premium-placeholder";
import { getSubjectSyllabus } from "@/lib/syllabus";

const CLASS_OPTIONS = [
  { value: "class-11-notes", label: "Class 11" },
  { value: "class-12-notes", label: "Class 12" },
];

const SUBJECT_OPTIONS: Record<string, { value: string; label: string; icon: React.ReactNode }[]> = {
  "class-11-notes": [
    { value: "mathematics", label: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
    { value: "physics", label: "Physics", icon: <Atom className="h-4 w-4" /> },
    { value: "chemistry", label: "Chemistry", icon: <FlaskConical className="h-4 w-4" /> },
    { value: "biology", label: "Biology", icon: <Dna className="h-4 w-4" /> },
  ],
  "class-12-notes": [
    { value: "mathematics", label: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
    { value: "physics", label: "Physics", icon: <Atom className="h-4 w-4" /> },
    { value: "chemistry", label: "Chemistry", icon: <FlaskConical className="h-4 w-4" /> },
    { value: "biology", label: "Biology", icon: <Dna className="h-4 w-4" /> },
  ],
};

type LabCategory = "physics" | "chemistry" | "mathematics" | "biology" | "class11";

interface LabItem {
  id: string;
  title: string;
  description: string;
  category: LabCategory;
  icon: React.ReactNode;
  status: "active" | "new" | "premium" | "development";
  creditCost?: number;
  component: () => React.ReactNode;
}

function SyllabusViewer({ classSlug, subjectSlug }: { classSlug: string; subjectSlug: string }) {
  const subjectSyllabus = getSubjectSyllabus(classSlug, subjectSlug);

  if (!subjectSyllabus) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] space-y-3">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Syllabus not available for this combination</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-3 pb-3 border-b">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">{subjectSyllabus.name} Syllabus</h2>
        <span className="text-sm text-muted-foreground">({subjectSyllabus.description})</span>
      </div>

      <div className="space-y-4">
        {subjectSyllabus.units.map((unit, unitIdx) => (
          <UnitCard key={unit.id} unit={unit} index={unitIdx + 1} />
        ))}
      </div>

      <div className="pt-3 border-t text-sm text-muted-foreground">
        Total: {subjectSyllabus.units.reduce((sum, u) => sum + (u.hours || 0), 0)} teaching hours across {subjectSyllabus.units.length} units
      </div>
    </div>
  );
}

function UnitCard({
  unit,
  index,
}: {
  unit: { id: string; title: string; topics: string[]; hours?: number };
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 rounded-lg px-4 py-3 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
              {index}
            </span>
            {unit.title}
          </span>
          <div className="flex items-center gap-2">
            {unit.hours && (
              <span className="text-xs text-muted-foreground">{unit.hours} hrs</span>
            )}
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </CardTitle>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0 pb-4 px-4">
          <ul className="space-y-1.5 mt-3" role="list">
            {unit.topics.map((topic, topicIdx) => (
              <li
                key={topicIdx}
                className="flex items-start gap-2 py-1.5 border-b border-muted last:border-b-0 text-sm"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center justify-center mt-0.5">
                  {topicIdx + 1}
                </span>
                <span className="text-foreground/80 leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

// Labs are grouped by subject so each subject only shows its own labs
const LABS_BY_SUBJECT: Record<LabCategory, LabItem[]> = {
  physics: [
    // 3D Labs
    { id: "ph-3d-dynamics", title: "Dynamics 3D", description: "Inclined plane, friction, elastic collision, momentum conservation in 3D.", category: "physics", icon: <span className="text-blue-500">🚀</span>, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-3d-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay.", category: "physics", icon: <span className="text-blue-500">🛰️</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-heat-determinations", title: "Heat Determination Labs", description: "Lee's disc, Searle's bar, Newton's law of cooling & linear expansion in 3D.", category: "physics", icon: <span className="text-blue-500">🔥</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-3d-quantum", title: "Quantum 3D", description: "Quantum mechanics visualizations including orbitals, probability distributions, and spin.", category: "physics", icon: <span className="text-blue-500">⭐</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-3d-wave", title: "Wave Simulator 3D", description: "Real-time 3D wave propagation with sine, cosine, and damped modes.", category: "physics", icon: <span className="text-blue-500">🌊</span>, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-3d-pendulum", title: "Pendulum 3D", description: "Pendulum with trail visualization and period calculations.", category: "physics", icon: <span className="text-blue-500">⏱️</span>, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-3d-em", title: "EM Wave 3D", description: "Electromagnetic wave propagation with E and B field visualization.", category: "physics", icon: <span className="text-blue-500">📻</span>, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-3d-magnetic", title: "Magnetic Field 3D", description: "Bar magnet field lines and iron filings pattern.", category: "physics", icon: <span className="text-blue-500">🧭</span>, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-3d-vectors", title: "Vector Addition 3D", description: "Interactive 3D vectors — components, dot product, cross product, parallelogram rule.", category: "physics", icon: <span className="text-blue-500">↗️</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-3d-optics", title: "Optics & Lens 3D", description: "Ray diagrams for convex/concave lenses and mirrors with live lens equation.", category: "physics", icon: <span className="text-blue-500">👁️</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-3d-refraction", title: "Refraction 3D", description: "Snell's law visualization with total internal reflection and critical angle.", category: "physics", icon: <span className="text-blue-500">🔬</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "ph-3d-classic", title: "Physics 3D Classic", description: "Electric field, double pendulum, and gravitational field visualizers.", category: "physics", icon: <span className="text-blue-500">📦</span>, status: "development", component: () => <PhysicsLab /> },
    // Theory Labs
    { id: "ph-th-kinematics", title: "Kinematics Theory", description: "Equations of motion, projectile motion, relative velocity theory and examples.", category: "physics", icon: <BookOpen className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="kinematics" /> },
    { id: "ph-th-laws", title: "Laws of Motion Theory", description: "Newton's laws, friction, circular motion theory and examples.", category: "physics", icon: <Activity className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="laws-motion" /> },
    { id: "ph-th-work", title: "Work & Energy Theory", description: "Work-energy theorem, conservation of energy, power theory.", category: "physics", icon: <Flame className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="work-energy" /> },
    { id: "ph-th-grav", title: "Gravitation Theory", description: "Universal gravitation, gravitational potential, satellite motion.", category: "physics", icon: <AtomIcon className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="gravitation" /> },
    { id: "ph-th-thermo", title: "Thermodynamics Theory", description: "Laws of thermodynamics, heat engines, entropy theory.", category: "physics", icon: <Thermometer className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="thermodynamics" /> },
    { id: "ph-th-optics", title: "Optics Theory", description: "Reflection, refraction, lens formula, mirror equation.", category: "physics", icon: <Eye className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="optics" /> },
    { id: "ph-th-electro", title: "Electrostatics Theory", description: "Coulomb's law, electric field, potential, capacitance.", category: "physics", icon: <Zap className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="electrostatics" /> },
    { id: "ph-th-current", title: "Current Electricity Theory", description: "Ohm's law, circuits, Kirchhoff's laws, electrical power.", category: "physics", icon: <CircuitBoard className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="current" /> },
    { id: "ph-th-emw", title: "EM Waves Theory", description: "Electromagnetic spectrum, wave properties, polarization.", category: "physics", icon: <Radio className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="emw" /> },
    { id: "ph-th-modern", title: "Modern Physics Theory", description: "Photoelectric effect, atomic models, nuclear physics.", category: "physics", icon: <AtomIcon className="h-4 w-4 text-blue-500" />, status: "active", component: () => <TheoryPanel subject="physics" topic="modern" /> },
    // Calculator Labs
    { id: "ph-calc-ohms", title: "Ohm's Law Calculator", description: "Calculate V, I, R with interactive controls.", category: "physics", icon: <Zap className="h-4 w-4 text-blue-500" />, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-calc-heat", title: "Heat Calculator", description: "Calorimetry, latent heat, thermal expansion.", category: "physics", icon: <Thermometer className="h-4 w-4 text-blue-500" />, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-calc-optics", title: "Optics Lab", description: "Reflection, refraction, lateral shift, prism dispersion.", category: "physics", icon: <Eye className="h-4 w-4 text-blue-500" />, status: "active", component: () => <PhysicsLab /> },
    { id: "ph-calc-projectile", title: "Projectile Motion", description: "Launch projectiles with adjustable velocity, angle, and gravity.", category: "physics", icon: <span className="text-blue-500">🚀</span>, status: "active", component: () => <PhysicsLab /> },
    // General
    { id: "ai-tutor", title: "AI Lab Tutor", description: "Get instant help with lab concepts. AI explains, solves, and visualizes any problem.", category: "physics", icon: <Brain className="h-4 w-4 text-amber-500" />, status: "active", component: () => <PremiumPlaceholder title="AI Lab Tutor" icon={<Brain className="h-5 w-5 text-amber-500" />} description="Get instant help with lab concepts." /> },
    { id: "advanced-circuit", title: "Advanced Circuit Simulator", description: "Build and test complex circuits with 50+ components.", category: "physics", icon: <Bolt className="h-4 w-4 text-amber-500" />, status: "active", component: () => <PremiumAdvancedCircuitSimulator /> },
  ],

  chemistry: [
    // 3D Labs
    { id: "ch-3d-periodic", title: "Periodic Table 3D", description: "Interactive 3D periodic table with element details, categories, and search.", category: "chemistry", icon: <Globe className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", category: "chemistry", icon: <span className="text-emerald-500">🔺</span>, status: "new", component: () => <ChemistryLab /> },
    { id: "ch-3d-micro", title: "Microscopy 3D", description: "Atomic structure, electron orbitals, crystal lattice visualization.", category: "chemistry", icon: <Microscope className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    // Theory Labs
    { id: "ch-th-atomic", title: "Atomic Structure Theory", description: "Bohr model, quantum numbers, electronic configuration.", category: "chemistry", icon: <AtomIcon className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="atomic" /> },
    { id: "ch-th-bonding", title: "Chemical Bonding Theory", description: "Ionic, covalent, metallic bonds, VSEPR theory.", category: "chemistry", icon: <Hexagon className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="bonding" /> },
    { id: "ch-th-eq", title: "Equilibrium Theory", description: "Chemical equilibrium, Le Chatelier's principle, Kc/Kp.", category: "chemistry", icon: <Scale className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="equilibrium" /> },
    { id: "ch-th-thermo", title: "Thermochemistry Theory", description: "Enthalpy, entropy, Gibbs free energy, Hess's law.", category: "chemistry", icon: <Flame className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="thermo" /> },
    { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", description: "Reaction rates, order of reaction, activation energy.", category: "chemistry", icon: <Timer className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="kinetics" /> },
    { id: "ch-th-acid", title: "Acid-Base Theory", description: "pH, pOH, strong/weak acids, buffers, titration theory.", category: "chemistry", icon: <TestTube className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="acid-base" /> },
    { id: "ch-th-redox", title: "Redox Theory", description: "Oxidation-reduction, electrochemical cells, corrosion.", category: "chemistry", icon: <Zap className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="redox" /> },
    { id: "ch-th-organic", title: "Organic Chemistry Theory", description: "Hydrocarbons, functional groups, nomenclature.", category: "chemistry", icon: <Dna className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <TheoryPanel subject="chemistry" topic="organic" /> },
    // Calculator Labs
    { id: "ch-calc-ph", title: "pH Calculator", description: "Calculate pH from concentration for acids and bases.", category: "chemistry", icon: <TestTube className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    { id: "ch-calc-titration", title: "Titration Simulator", description: "Simulate strong acid-strong base titration and track pH changes.", category: "chemistry", icon: <FlaskConical className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    { id: "ch-calc-gas", title: "Gas Laws Calculator", description: "Boyle's, Charles's, ideal gas law solver.", category: "chemistry", icon: <WindIcon className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    { id: "ch-calc-molarmass", title: "Molar Mass Calculator", description: "Enter a chemical formula and get molar mass.", category: "chemistry", icon: <Microscope className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    { id: "ch-calc-stoich", title: "Stoichiometry Lab", description: "Moles, percent composition, limiting reagent.", category: "chemistry", icon: <Dna className="h-4 w-4 text-emerald-500" />, status: "active", component: () => <ChemistryLab /> },
    // General
    { id: "molecular-builder", title: "Molecular Builder 3D", description: "Build any molecule from scratch. Simulate reactions.", category: "chemistry", icon: <AtomIcon className="h-4 w-4 text-amber-500" />, status: "active", component: () => <PremiumPlaceholder title="Molecular Builder 3D" icon={<AtomIcon className="h-5 w-5 text-amber-500" />} description="Build molecules from scratch." /> },
  ],

  biology: [
    // 3D Labs
    { id: "bio-3d-cell", title: "Cell Structure 3D", description: "Plant and animal cell ultrastructure — organelles, membranes, nucleus in 3D.", category: "biology", icon: <Microscope className="h-4 w-4 text-green-500" />, status: "active", component: () => <BiologyAdvanced3D /> },
    { id: "bio-3d-dna", title: "DNA & Genetics 3D", description: "Double-helix DNA structure, replication, transcription, translation.", category: "biology", icon: <Dna className="h-4 w-4 text-green-500" />, status: "active", component: () => <BiologyAdvanced3D /> },
    { id: "bio-3d-advanced", title: "Biology 3D Advanced", description: "Cell ultrastructure, molecular genetics, ecology networks, human systems, evolution trees.", category: "biology", icon: <FlaskConical className="h-4 w-4 text-green-500" />, status: "new", component: () => <BiologyAdvanced3D /> },
    { id: "bio-3d-ecology", title: "Ecology & Ecosystem 3D", description: "Food chains, food webs, biogeochemical cycles, population dynamics in 3D.", category: "biology", icon: <TreeDeciduous className="h-4 w-4 text-green-500" />, status: "new", component: () => <BiologyAdvanced3D /> },
    { id: "bio-3d-human", title: "Human Body Systems 3D", description: "Circulatory, respiratory, nervous, and digestive systems with interactive organ labels.", category: "biology", icon: <HeartIcon className="h-4 w-4 text-green-500" />, status: "new", component: () => <BiologyAdvanced3D /> },
    { id: "bio-3d-evolution", title: "Evolution & Classification 3D", description: "Phylogenetic trees, taxonomy hierarchy, fossil record timeline, adaptive radiation.", category: "biology", icon: <UsersIcon className="h-4 w-4 text-green-500" />, status: "new", component: () => <BiologyEvolution3D /> },
    // Theory Labs
    { id: "bio-th-cell", title: "Cell Theory & Structure", description: "Cell theory, prokaryotic vs eukaryotic cells, organelles, membrane transport.", category: "biology", icon: <Microscope className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="cell" /> },
    { id: "bio-th-genetics", title: "Genetics & Heredity", description: "Mendelian genetics, DNA structure, replication, transcription, translation.", category: "biology", icon: <Dna className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="genetics" /> },
    { id: "bio-th-ecology", title: "Ecology & Environment", description: "Ecosystems, biomes, biogeochemical cycles, biodiversity, conservation.", category: "biology", icon: <TreeDeciduous className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="ecology" /> },
    { id: "bio-th-human", title: "Human Physiology", description: "Circulatory, respiratory, digestive, nervous, and excretory systems.", category: "biology", icon: <HeartIcon className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="human" /> },
    { id: "bio-th-evolution", title: "Evolution & Classification", description: "Origin of life, natural selection, phylogenetic classification, taxonomy.", category: "biology", icon: <UsersIcon className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="evolution" /> },
    { id: "bio-th-plant", title: "Plant Physiology", description: "Photosynthesis, transpiration, nutrition, plant hormones, transport in plants.", category: "biology", icon: <LeafIcon className="h-4 w-4 text-green-500" />, status: "active", component: () => <TheoryPanel subject="biology" topic="plant" /> },
    // Calculator Labs
    { id: "bio-calc-punnett", title: "Punnett Square Solver", description: "Predict offspring genotypes and phenotypes from parental crosses.", category: "biology", icon: <Dna className="h-4 w-4 text-green-500" />, status: "active", component: () => <BiologyPunnettCalculator /> },
    { id: "bio-calc-population", title: "Population Growth Calculator", description: "Exponential and logistic population growth models with carrying capacity.", category: "biology", icon: <UsersIcon className="h-4 w-4 text-green-500" />, status: "active", component: () => <BiologyPopulationCalculator /> },
    { id: "bio-calc-photosynthesis", title: "Photosynthesis Rate Calculator", description: "Calculate rate of photosynthesis under varying light, CO₂, and temperature.", category: "biology", icon: <LeafIcon className="h-4 w-4 text-green-500" />, status: "active", component: () => <BiologyPhotosynthesisCalculator /> },
  ],

  mathematics: [
    // 3D Labs
    { id: "math-3d-geometry", title: "3D Geometry", description: "Points, lines, planes in 3D space with interactive visualization.", category: "mathematics", icon: <Box className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathGeometry3D /> },
    { id: "math-3d-surfaces", title: "3D Mathematical Surfaces", description: "Explore saddle, wave, ripple, peak, plane, and cylinder surfaces.", category: "mathematics", icon: <Grid3x3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathModern3D /> },
    { id: "math-3d-advanced", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces.", category: "mathematics", icon: <Binary className="h-4 w-4 text-violet-500" />, status: "new", component: () => <MathModern3D /> },
    { id: "math-3d-fourier", title: "Fourier Series 3D", description: "Build square, sawtooth, and triangle waves from sums of sines.", category: "mathematics", icon: <Sigma className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathAdvancedMotionLab /> },
    { id: "math-3d-decay", title: "Nuclear Decay Simulator", description: "Stochastic radioactive decay visualization with half-life controls.", category: "mathematics", icon: <AtomIcon className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathAdvancedMotionLab /> },
    // Theory Labs
    { id: "math-th-calculus", title: "Calculus Theory", description: "Limits, derivatives, integrals, fundamental theorem.", category: "mathematics", icon: <FunctionSquare className="h-4 w-4 text-violet-500" />, status: "active", component: () => <TheoryPanel subject="mathematics" topic="calculus" /> },
    { id: "math-th-trig", title: "Trigonometry Theory", description: "Identities, equations, graphs, inverse functions.", category: "mathematics", icon: <Triangle className="h-4 w-4 text-violet-500" />, status: "active", component: () => <TheoryPanel subject="mathematics" topic="trigonometry" /> },
    { id: "math-th-algebra", title: "Algebra Theory", description: "Matrices, determinants, complex numbers, vectors.", category: "mathematics", icon: <Columns3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <TheoryPanel subject="mathematics" topic="algebra" /> },
    { id: "math-th-stats", title: "Statistics Theory", description: "Probability, distributions, hypothesis testing.", category: "mathematics", icon: <BarChart3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <TheoryPanel subject="mathematics" topic="statistics" /> },
    { id: "math-th-geo", title: "Coordinate Geometry Theory", description: "Lines, circles, conics in coordinate plane.", category: "mathematics", icon: <Crosshair className="h-4 w-4 text-violet-500" />, status: "active", component: () => <TheoryPanel subject="mathematics" topic="geometry" /> },
    // Calculator Labs
    { id: "math-calc-deriv", title: "Derivative Calculator", description: "Compute derivatives and integrals numerically.", category: "mathematics", icon: <FunctionSquare className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="derivative" /> },
    { id: "math-calc-quad", title: "Quadratic Solver", description: "Solve ax² + bx + c = 0 and visualize the parabola.", category: "mathematics", icon: <Sigma className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="quadratic" /> },
    { id: "math-calc-stats", title: "Statistics Calculator", description: "Mean, median, mode, standard deviation.", category: "mathematics", icon: <BarChart3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="statistics" /> },
    { id: "math-calc-matrix", title: "Matrix Calculator", description: "Add, multiply, and transpose matrices.", category: "mathematics", icon: <Grid3x3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="matrix" /> },
    { id: "math-calc-trig", title: "Trigonometry Lab", description: "Unit circle visualization and sine/cosine/tangent graphing.", category: "mathematics", icon: <Target className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathSymbols /> },
    { id: "math-calc-series", title: "Sequences & Series", description: "Arithmetic and geometric progressions.", category: "mathematics", icon: <TrendingUp className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathSeriesLab /> },
    { id: "math-calc-vectors", title: "Vector Operations", description: "Add, dot product, cross product of 3D vectors.", category: "mathematics", icon: <Move3d className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="vectors" /> },
    { id: "math-calc-limit", title: "Limit Calculator", description: "Estimate limits numerically.", category: "mathematics", icon: <InfinityIcon className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="limit" /> },
    { id: "math-calc-system", title: "System Solver", description: "Solve 2×2 and 3×3 systems of linear equations.", category: "mathematics", icon: <Columns3 className="h-4 w-4 text-violet-500" />, status: "active", component: () => <MathInteractive defaultTab="system" /> },
    // General
    { id: "equation-solver", title: "Universal Equation Solver", description: "Solve any physics, chemistry, or math equation.", category: "mathematics", icon: <Sparkles className="h-4 w-4 text-amber-500" />, status: "active", component: () => <PremiumEquationSolver /> },
  ],

  class11: [
    { id: "class11-physics", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations for Class 11.", category: "class11", icon: <span className="text-blue-500">🚀</span>, status: "new", component: () => <PhysicsLab /> },
    { id: "class11-chemistry", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations for Class 11.", category: "class11", icon: <Microscope className="h-4 w-4 text-emerald-500" />, status: "new", component: () => <ChemistryLab /> },
    { id: "class11-math", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations for Class 11.", category: "class11", icon: <Binary className="h-4 w-4 text-violet-500" />, status: "new", component: () => <Class11Math3DPlus /> },
    { id: "class11-biology", title: "Class 11 Biology 3D Plus", description: "Extended 3D biology visualizations — cells, genetics, ecology for Class 11.", category: "class11", icon: <Dna className="h-4 w-4 text-green-500" />, status: "new", component: () => <BiologyLab /> },
  ],
};

function LabDashboard({
  _classSlug,
  subjectSlug,
}: {
  _classSlug: string;
  subjectSlug: string;
}) {
  const [activeLab, setActiveLab] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"3d" | "theory" | "calculator">("3d");

  // Get labs for the selected subject only
  const subjectLabs = useMemo(() => {
    const categoryMap: Record<string, LabCategory> = {
      physics: "physics",
      chemistry: "chemistry",
      biology: "biology",
      mathematics: "mathematics",
    };
    return LABS_BY_SUBJECT[categoryMap[subjectSlug] ?? "physics"] ?? [];
  }, [subjectSlug]);

  const filteredLabs = useMemo(() => {
    return subjectLabs.filter((lab) => {
      if (typeFilter === "3d") return !lab.id.includes("th-") && !lab.id.includes("calc");
      if (typeFilter === "theory") return lab.id.includes("th-");
      return lab.id.includes("calc");
    });
  }, [subjectLabs, typeFilter]);

  const activeLabData = activeLab ? subjectLabs.find((l) => l.id === activeLab) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {subjectSlug === "physics" && "Physics"}
            {subjectSlug === "chemistry" && "Chemistry"}
            {subjectSlug === "biology" && "Biology"}
            {subjectSlug === "mathematics" && "Mathematics"}
            <span className="text-muted-foreground font-normal text-lg ml-2">Labs</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {filteredLabs.length} {typeFilter} lab{filteredLabs.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Type toggle */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {(["3d", "theory", "calculator"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              typeFilter === type
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {type === "3d" && <Cuboid className="h-3.5 w-3.5" />}
            {type === "theory" && <BookOpen className="h-3.5 w-3.5" />}
            {type === "calculator" && <Calculator className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <span className="text-xs opacity-70">
              ({subjectLabs.filter((l) =>
                type === "3d" ? !l.id.includes("th-") && !l.id.includes("calc") :
                type === "theory" ? l.id.includes("th-") :
                l.id.includes("calc")
              ).length})
            </span>
          </button>
        ))}
      </div>

      {!activeLab ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLabs.map((lab) => (
            <Card
              key={lab.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${
                lab.status === "premium" ? "opacity-90" : ""
              }`}
              onClick={() => {
                if (lab.status !== "premium") setActiveLab(lab.id);
              }}
            >
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {lab.icon}
                </div>
                <CardTitle className="text-sm font-medium leading-tight">{lab.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{lab.description}</p>
                {lab.status === "premium" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{lab.creditCost?.toLocaleString()} credits</span>
                  </div>
                )}
                {lab.status === "new" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                    <Sparkles className="h-3 w-3" />
                    <span>New</span>
                  </div>
                )}
                {lab.status === "development" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                    <span>⚙️ In Development</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {filteredLabs.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No {typeFilter} labs found</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different filter or check back soon</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveLab(null)}
            className="flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Dashboard
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeLabData && activeLabData.icon}
                {activeLabData?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeLabData?.component && (
                <Suspense fallback={
                  <div className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                }>
                  {typeof activeLabData.component === "function"
                    ? React.createElement(activeLabData.component as React.ElementType)
                    : activeLabData.component}
                </Suspense>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function LabContent({
  classSlug,
  subjectSlug,
  onClassChange,
  onSubjectChange,
}: {
  classSlug: string;
  subjectSlug: string;
  onClassChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}) {
  const subjects = SUBJECT_OPTIONS[classSlug] || [];

  return (
    <div className="container mx-auto py-8 px-4 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Labs</h1>
        <p className="text-muted-foreground">
          Explore concepts through interactive simulations and theory content
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-2">
          <label htmlFor="class-select" className="text-sm font-medium">Class</label>
          <Select value={classSlug} onValueChange={onClassChange}>
            <SelectTrigger id="class-select" className="w-full sm:w-48 touch-manipulation">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {CLASS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <label htmlFor="subject-select" className="text-sm font-medium">Subject</label>
          <Select value={subjectSlug} onValueChange={onSubjectChange}>
            <SelectTrigger id="subject-select" className="w-full sm:w-48 touch-manipulation">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <LabDashboard _classSlug={classSlug} subjectSlug={subjectSlug} />
      <SyllabusViewer classSlug={classSlug} subjectSlug={subjectSlug} />
    </div>
  );
}

function LabPageInner() {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("mathematics");

  return (
    <LabContent
      classSlug={classSlug}
      subjectSlug={subjectSlug}
      onClassChange={setClassSlug}
      onSubjectChange={setSubjectSlug}
    />
  );
}

export default function LabPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    }>
      <LabPageInner />
    </Suspense>
  );
}
