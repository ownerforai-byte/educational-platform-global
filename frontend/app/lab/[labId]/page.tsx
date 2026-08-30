"use client";

import React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Maximize2, Minimize2,
  Atom, FlaskConical, Calculator,
  Rocket, Waves, Timer, Scale, ScanEye, Eye,
  Flame, Compass, Satellite, Stars, TestTube, Beaker,
  Microscope, Globe, Pyramid, FunctionSquare,
  Sigma, Grid3x3, Binary, Atom as AtomIcon, Radio, Activity,
  Aperture, Box, Thermometer, Ruler, Zap, CircuitBoard,
  Brain, Bolt, Sparkles, ShieldCheck, Infinity as InfinityIcon,
  Columns3, Move3d, Target, TrendingUp, Crosshair, Triangle, BarChart3,
  GraduationCap,
} from "lucide-react";
import { CreditBadge } from "@/components/layout/credit-badge";
import { getLab, LAB_REGISTRY } from "@/lib/lab-registry";

// ── Component map: wired up from the source pages ──
import { PhysicsDynamics3D } from "@/components/lab/physics-dynamics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";
import { Quantum3D } from "@/components/lab/quantum-3d";
import { PhysicsAdvancedMotionLab } from "@/components/lab/physics-advanced-motion";
import { PhysicsMotionLab } from "@/components/lab/physics-motion-3d";
import { Physics3D } from "@/components/lab/physics-3d";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { ChemistryModern3D } from "@/components/lab/chemistry-modern-3d";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { Class11Physics3DPlus } from "@/components/lab/class11/class11-physics-3d-plus";
import { Class11Chemistry3DPlus } from "@/components/lab/class11/class11-chemistry-3d-plus";
import { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";
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
import MathSymbols from "@/components/lab/math-3d-symbols";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { ChemistryInteractive } from "@/components/lab/chemistry-interactive";
import { ChemistryStoichiometry } from "@/components/lab/chemistry-stoichiometry";
import { MathInteractive } from "@/components/lab/math-interactive";
import { MathSeriesLab } from "@/components/lab/math-series-lab";
import { MathAdvancedMotionLab } from "@/components/lab/math-motion-3d";
import { PremiumEquationSolver } from "@/components/lab/premium-equation-solver";
import { PremiumAdvancedCircuitSimulator } from "@/components/lab/premium-advanced-circuit";
import { PremiumPlaceholder } from "@/components/lab/premium-placeholder";
import { BiologyCell3D, BiologyDNA3D, BiologyEcology3D, BiologyHuman3D, BiologyEvolution3D, BiologyPunnettCalculator, BiologyPopulationCalculator, BiologyPhotosynthesisCalculator, BiologyAdvanced3D } from "@/components/lab/biology-3d";
import { Class11Biology3DPlus } from "@/components/lab/class11/class11-biology-3d-plus";
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
  MotionGraphicsEMWaves, MotionGraphicsSemiconductors, MotionGraphicsOrganicChemistry,
  MotionGraphicsCalculus, MotionGraphicsThermodynamics, MotionGraphicsOptics,
  MotionGraphicsElectromagnetism, MotionGraphicsQuantum, MotionGraphicsRelativity,
  MotionGraphicsFluidDynamics, MotionClass11WaveInterference,
} from "@/components/lab/motion-graphics";
import Chapter3DComponent from "@/components/lab/chapters/[chapterId]/chapters-3d";
import Topic3DComponent from "@/components/lab/topics/[topicId]/topics-3d";
import {
  Class11AtomicStructure, Class11ChemicalBonding, Class11Thermodynamics,
  Class11SetsFunctions, Class11Trigonometry, Class11Statistics,
  Class11ElectromagneticInduction, Class11ElectrochemistryGalvanicCell,
  Class11Probability3D, Class11KinematicsMotion, Class11LawsOfMotion,
  Class11WorkEnergy, Class11RotationalMotion, Class11PhysicsTheoryKinematics,
  Class11PhysicsTheoryLawsMotion, Class11ChemistryTheory, Class11MathTheory,
  Class11PhysicsTheoryElectromagnetism, Class11ChemistryTheoryElectrochemistry,
  Class11MathTheoryProbability,
} from "@/components/lab/class11";

const COMPONENT_MAP: Record<string, React.FC<any>> = {
  // Physics 3D
  "ph-3d-dynamics": () => <PhysicsDynamics3D />,
  "ph-3d-advanced": () => <Physics3DAdvanced />,
  "ph-3d-quantum": () => <Quantum3D />,
  "ph-3d-classic": () => <Physics3D />,
  "ph-3d-wave": () => <PhysicsAdvancedMotionLab />,
  "ph-3d-pendulum": () => <PhysicsAdvancedMotionLab />,
  "ph-3d-em": () => <PhysicsMotionLab />,
  "ph-3d-magnetic": () => <PhysicsMotionLab />,
  "ph-3d-vectors": () => <Vectors3D />,
  "ph-3d-optics": () => <Optics3D />,
  "ph-3d-refraction": () => <Refraction3D />,
  // Heat
  "heat-determinations": () => <Physics3DHeatDeterminations />,
  "lees-disc": () => <LeesDiscExperiment />,
  "searles-bar": () => <SearlesBarExperiment />,
  "newton-cooling": () => <NewtonCoolingExperiment />,
  "linear-expansion": () => <LinearExpansionExperiment />,
  "physics-mechanics-suite-3d": () => <MechanicsSuite3D />,
  "physics-elasticity-gas-suite-3d": () => <ElasticityGasSuite3D />,
  "physics-electricity-suite-3d": () => <ElectricitySuite3D />,
  "physics-magnetism-emi-suite-3d": () => <MagnetismEMISuite3D />,
  "physics-wave-optics-suite-3d": () => <WaveOpticsSuite3D />,
  "physics-modern-suite-3d": () => <ModernPhysicsSuite3D />,
  // Symbols
  "symbols-mechanics": () => <MechanicsSymbols />,
  "symbols-electricity": () => <ElectricitySymbols />,
  "symbols-waves": () => <WavesSymbols />,
  "symbols-atomic": () => <AtomicSymbols />,
  "symbols-math": () => <MathSymbols />,
  // Chemistry
  "ch-3d-periodic": () => <ChemistryLab />,
  "ch-3d-advanced": () => <ChemistryModern3D />,
  "ch-3d-micro": () => <ChemistryAdvanced3D />,
  // Math
  "math-3d-geometry": () => <MathGeometry3D />,
  "math-3d-surfaces": () => <MathModern3D />,
  "math-3d-advanced": () => <MathModern3D />,
  "math-3d-fourier": () => <MathAdvancedMotionLab />,
  "math-3d-decay": () => <MathAdvancedMotionLab />,
  // Biology 3D
  "bio-3d-cell": () => <BiologyCell3D />,
  "bio-3d-dna": () => <BiologyDNA3D />,
  "bio-3d-advanced": () => <BiologyAdvanced3D />,
  "bio-3d-ecology": () => <BiologyEcology3D />,
  "bio-3d-human": () => <BiologyHuman3D />,
  "bio-3d-evolution": () => <BiologyEvolution3D />,
  // Theory Physics
  "ph-th-kinematics": () => <TheoryPanel subject="physics" topic="kinematics" />,
  "ph-th-laws": () => <TheoryPanel subject="physics" topic="laws-motion" />,
  "ph-th-work": () => <TheoryPanel subject="physics" topic="work-energy" />,
  "ph-th-grav": () => <TheoryPanel subject="physics" topic="gravitation" />,
  "ph-th-thermo": () => <TheoryPanel subject="physics" topic="thermodynamics" />,
  "ph-th-optics": () => <TheoryPanel subject="physics" topic="optics" />,
  "ph-th-electro": () => <TheoryPanel subject="physics" topic="electrostatics" />,
  "ph-th-current": () => <TheoryPanel subject="physics" topic="current" />,
  "ph-th-emw": () => <TheoryPanel subject="physics" topic="emw" />,
  "ph-th-modern": () => <TheoryPanel subject="physics" topic="modern" />,
  // Theory Chemistry
  "ch-th-atomic": () => <TheoryPanel subject="chemistry" topic="atomic" />,
  "ch-th-bonding": () => <TheoryPanel subject="chemistry" topic="bonding" />,
  "ch-th-eq": () => <TheoryPanel subject="chemistry" topic="equilibrium" />,
  "ch-th-thermo": () => <TheoryPanel subject="chemistry" topic="thermo" />,
  "ch-th-kinetics": () => <TheoryPanel subject="chemistry" topic="kinetics" />,
  "ch-th-acid": () => <TheoryPanel subject="chemistry" topic="acid-base" />,
  "ch-th-redox": () => <TheoryPanel subject="chemistry" topic="redox" />,
  "ch-th-organic": () => <TheoryPanel subject="chemistry" topic="organic" />,
  // Theory Biology
  "bio-th-cell": () => <TheoryPanel subject="biology" topic="cell" />,
  "bio-th-genetics": () => <TheoryPanel subject="biology" topic="genetics" />,
  "bio-th-ecology": () => <TheoryPanel subject="biology" topic="ecology" />,
  "bio-th-human": () => <TheoryPanel subject="biology" topic="human" />,
  "bio-th-evolution": () => <TheoryPanel subject="biology" topic="evolution" />,
  "bio-th-plant": () => <TheoryPanel subject="biology" topic="plant" />,
  // Calculators Physics
  "ph-calc-ohms": () => <ElectricitySymbols />,
  "ph-calc-heat": () => <Physics3DHeatDeterminations />,
  "ph-calc-optics": () => <Optics3D />,
  "ph-calc-projectile": () => <PhysicsLab />,
  // Calculators Chemistry
  "ch-calc-ph": () => <ChemistryInteractive defaultTab="ph" />,
  "ch-calc-titration": () => <ChemistryInteractive defaultTab="titration" />,
  "ch-calc-gas": () => <ChemistryInteractive defaultTab="gaslaws" />,
  "ch-calc-molarmass": () => <ChemistryInteractive defaultTab="molarmass" />,
  "ch-calc-stoich": () => <ChemistryStoichiometry />,
  // Calculators Biology
  "bio-calc-punnett": () => <BiologyPunnettCalculator />,
  "bio-calc-population": () => <BiologyPopulationCalculator />,
  "bio-calc-photosynthesis": () => <BiologyPhotosynthesisCalculator />,
  // Calculators Math
  "math-calc-deriv": () => <MathInteractive defaultTab="derivative" />,
  "math-calc-quad": () => <MathInteractive defaultTab="quadratic" />,
  "math-calc-stats": () => <MathInteractive defaultTab="statistics" />,
  "math-calc-matrix": () => <MathInteractive defaultTab="matrix" />,
  "math-calc-trig": () => <MathSymbols />,
  "math-calc-series": () => <MathSeriesLab />,
  "math-calc-vectors": () => <MathInteractive defaultTab="vectors" />,
  "math-calc-limit": () => <MathInteractive defaultTab="limit" />,
  "math-calc-system": () => <MathInteractive defaultTab="system" />,
  // Premium
  "ai-tutor": () => <PremiumPlaceholder title="AI Lab Tutor" icon={<Brain className="h-5 w-5 text-amber-500" />} description="Get instant help with lab concepts." />,
  "advanced-circuit": () => <PremiumAdvancedCircuitSimulator />,
  "molecular-builder": () => <PremiumPlaceholder title="Molecular Builder 3D" icon={<AtomIcon className="h-5 w-5 text-amber-500" />} description="Build molecules from scratch." />,
  "equation-solver": () => <PremiumEquationSolver />,
  // Class 11
  "class11-physics": () => <Class11Physics3DPlus />,
  "class11-chemistry": () => <Class11Chemistry3DPlus />,
  "class11-math": () => <Class11Math3DPlus />,
  "class11-biology": () => <Class11Biology3DPlus />,
  // Advanced 3D — migrated from legacy root
  "ph-3d-electrostatics": () => <Physics3DElectrostatics />,
  "ph-3d-gravitation": () => <Physics3DGravitation />,
  "ph-3d-lenses": () => <Physics3DLenses />,
  "ph-3d-mirrors-concave": () => <ConcaveMirror3D />,
  "ph-3d-mirrors-convex": () => <ConvexMirror3D />,
  "ph-3d-prism": () => <Physics3DPrism />,
  "ph-3d-measurement": () => <Physics3DMeasurement />,
  "ph-3d-vectors-comprehensive": () => <Physics3DVectorsComprehensive />,
  "ph-3d-thermodynamics": () => <Physics3DThermodynamics />,
  "ch-3d-molecules": () => <Chemistry3DMolecules />,
  "ch-3d-syllabus-suite": () => <Chemistry3DSyllabusSuite />,
  "bio-3d-suite": () => <Biology3DSuite />,
  "bio-3d-diversity-suite": () => <Biology3DDiversitySuite />,
  "math-3d-labelledby": () => <Math3DGeometryLabeled />,
  "math-3d-syllabus-suite": () => <Math3DSyllabusSuite />,
  "chapters-3d": () => <Chapter3DComponent />,
  "topics-3d": () => <Topic3DComponent />,
  // Motion Graphics — migrated from legacy root
  "mg-em-waves": () => <MotionGraphicsEMWaves />,
  "mg-semiconductors": () => <MotionGraphicsSemiconductors />,
  "mg-organic-chemistry": () => <MotionGraphicsOrganicChemistry />,
  "mg-calculus": () => <MotionGraphicsCalculus />,
  "mg-thermodynamics": () => <MotionGraphicsThermodynamics />,
  "mg-optics": () => <MotionGraphicsOptics />,
  "mg-electromagnetism": () => <MotionGraphicsElectromagnetism />,
  "mg-quantum": () => <MotionGraphicsQuantum />,
  "mg-relativity": () => <MotionGraphicsRelativity />,
  "mg-fluid-dynamics": () => <MotionGraphicsFluidDynamics />,
  "mg-wave-interference": () => <MotionClass11WaveInterference />,
  // Class 11 experiments — migrated from legacy root
  "class11-galvanic-cell": () => <Class11ElectrochemistryGalvanicCell />,
  "class11-emi": () => <Class11ElectromagneticInduction />,
  "class11-probability-3d": () => <Class11Probability3D />,
  "class11-atomic-structure": () => <Class11AtomicStructure />,
  "class11-chemical-bonding": () => <Class11ChemicalBonding />,
  "class11-sets-functions": () => <Class11SetsFunctions />,
  "class11-trigonometry": () => <Class11Trigonometry />,
  "class11-statistics-3d": () => <Class11Statistics />,
  "class11-kinematics-motion": () => <Class11KinematicsMotion />,
  "class11-laws-motion": () => <Class11LawsOfMotion />,
  "class11-work-energy": () => <Class11WorkEnergy />,
  "class11-rotational-motion": () => <Class11RotationalMotion />,
  "class11-thermodynamics": () => <Class11Thermodynamics />,
  // Class 11 theory — migrated from legacy root
  "class11-th-physics-kinematics": () => <Class11PhysicsTheoryKinematics />,
  "class11-th-physics-laws": () => <Class11PhysicsTheoryLawsMotion />,
  "class11-th-physics-em": () => <Class11PhysicsTheoryElectromagnetism />,
  "class11-th-chemistry": () => <Class11ChemistryTheory />,
  "class11-th-chemistry-electro": () => <Class11ChemistryTheoryElectrochemistry />,
  "class11-th-math": () => <Class11MathTheory />,
  "class11-th-math-probability": () => <Class11MathTheoryProbability />,
};

const SUBJECT_CONFIG: Record<string, { label: string; color: string }> = {
  physics: { label: "Physics", color: "#3b82f6" },
  chemistry: { label: "Chemistry", color: "#10b981" },
  mathematics: { label: "Mathematics", color: "#8b5cf6" },
  biology: { label: "Biology", color: "#22c55e" },
  class11: { label: "Class 11", color: "#f43f5e" },
};

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", label: "Active" },
  new: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", label: "New" },
  premium: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", label: "Premium" },
  development: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", label: "Dev" },
};

const CATEGORY_NAV: { id: string; label: string; href: string }[] = [
  { id: "lab/3d", label: "3D Simulations", href: "/lab/3d" },
  { id: "lab/theory", label: "Theory Labs", href: "/lab/theory" },
  { id: "lab/class11", label: "Class 11", href: "/lab/class11" },
  { id: "lab", label: "All Labs", href: "/lab" },
  { id: "lab/heat-determinations", label: "Heat Determinations", href: "/lab/heat-determinations" },
];

export default function LabDetailPage() {
  const params = useParams<{ labId: string }>();
  const router = useRouter();
  const [fullscreen, setFullscreen] = useState(false);

  const lab = useMemo(() => getLab(params.labId), [params.labId]);
  const subjectCfg = lab ? SUBJECT_CONFIG[lab.category] : null;
  const ComponentFactory = lab ? COMPONENT_MAP[params.labId] : null;

  if (!lab) {
    return (
      <div className="container mx-auto max-w-4xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-3">Lab Not Found</h1>
        <p className="text-muted-foreground mb-6">This simulation doesn't exist.</p>
        <Link href="/lab" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Back to Lab
        </Link>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={`py-4 md:py-6 ${fullscreen ? "fixed inset-0 z-50 overflow-auto" : ""}`}>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"><ArrowLeft className="h-3.5 w-3.5" /></div>
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-5 w-px bg-border" />
            <Link href="/lab" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <FlaskConical className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${subjectCfg?.color ?? "#3b82f6"}18` }}>
                <span style={{ color: subjectCfg?.color ?? "#3b82f6" }}><FlaskConical className="h-4 w-4" /></span>
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">{lab.title}</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">{subjectCfg?.label ?? "Lab"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {typeof window !== "undefined" && <CreditBadge />}
            <button onClick={() => setFullscreen(!fullscreen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{fullscreen ? "Exit" : "Fullscreen"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex gap-2 overflow-x-auto text-xs">
          {CATEGORY_NAV.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`shrink-0 px-3 py-1 rounded-full border transition-colors ${
                cat.href === `/lab/${params.labId}` || (cat.href === "/lab" && params.labId !== "3d" && params.labId !== "theory" && params.labId !== "class11" && params.labId !== "heat-determinations")
                  ? "bg-primary/10 border-primary/30 text-primary font-semibold"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {/* Lab Header Card */}
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card mb-5">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(to right, ${subjectCfg?.color ?? "#3b82f6"}08, transparent)` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${subjectCfg?.color ?? "#3b82f6"}18` }}>
              <FlaskConical className="h-4 w-4" style={{ color: subjectCfg?.color ?? "#3b82f6" }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base truncate">{lab.title}</h2>
              <p className="text-xs text-muted-foreground truncate">{lab.description}</p>
            </div>
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[lab.status]?.bg ?? ""} ${STATUS_STYLE[lab.status]?.text ?? ""} ${
              lab.status === "new" ? "border-blue-200 dark:border-blue-800" :
              lab.status === "premium" ? "border-amber-200 dark:border-amber-800" :
              lab.status === "development" ? "border-purple-200 dark:border-purple-800" :
              "border-emerald-200 dark:border-emerald-800"
            }`}>
              {STATUS_STYLE[lab.status]?.label ?? "Active"}
            </span>
          </div>
          {ComponentFactory ? (
            <div className={`sim-canvas-wrap ${fullscreen ? "min-h-[calc(100vh-140px)]" : "min-h-[70vh]"}`}>
              <div className="w-full h-full min-h-[400px]">
                <ComponentFactory />
              </div>
            </div>
          ) : (
            <div className={`${fullscreen ? "min-h-[calc(100vh-140px)]" : "min-h-[70vh]"} flex flex-col items-center justify-center gap-3`}>
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Simulation not yet implemented</h3>
                <p className="text-sm text-muted-foreground mt-1">This lab will be added soon.</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick links to related labs in same category */}
        <div className="flex flex-wrap gap-2">
          {LAB_REGISTRY.filter(l => l.category === lab.category && l.id !== lab.id).slice(0, 8).map((related) => (
            <Link key={related.id} href={`/lab/${related.id}`} className="stat-pill">
              <span className="text-muted-foreground">{related.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
