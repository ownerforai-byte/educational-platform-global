"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabDashboard, LabItem } from "@/components/lab/lab-dashboard";
import { 
  Atom, FlaskConical, Calculator, Cuboid, Eye, Microscope, SquareFunction, 
  Zap, Move3d, Sun, Waves, Orbit, DNA, Brain, Rocket, Satellite, Binary,
  Film, Animation, Sparkles, Lightning, Wind, Flame, TestTube
} from "lucide-react";

// Import existing 3D components
import { Physics3D } from "@/components/lab/physics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { MathAdvanced3D } from "@/components/lab/math-advanced-3d";

// New Motion Graphics Components for Grade 11
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
  MotionClass11WaveInterference
} from "@/components/lab/motion-graphics";

// Class 11 Enhanced Components
import { 
  Class11KinematicsMotion,
  Class11LawsOfMotion,
  Class11RotationalMotion,
  Class11AtomicStructure,
  Class11ChemicalBonding,
  Class11Thermodynamics
} from "@/components/lab/class11";

const MOTION_GRAPHICS_LABS: LabItem[] = [
  // Electromagnetic Waves
  {
    id: "motion-em-waves",
    title: "Electromagnetic Waves",
    description: "3D visualization of EM wave propagation showing electric and magnetic field oscillations perpendicular to each other and to direction of propagation. Maxwell's equations in action.",
    category: "physics",
    icon: <Waves className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsEMWaves
  },
  
  // Semiconductor Physics
  {
    id: "motion-semiconductors",
    title: "Semiconductor Physics",
    description: "Interactive 3D visualization of semiconductor band structure, doping, p-n junctions, and transistor operation. Essential for modern electronics.",
    category: "physics",
    icon: <Zap className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsSemiconductors
  },
  
  // Organic Chemistry Reactions
  {
    id: "motion-organic-chem",
    title: "Organic Chemistry Reactions",
    description: "3D animated visualizations of organic reaction mechanisms: SN1, SN2, E1, E2, addition, substitution, and polymerization reactions.",
    category: "chemistry",
    icon: <FlaskConical className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsOrganicChemistry
  },
  
  // Calculus in Motion
  {
    id: "motion-calculus",
    title: "Calculus in Motion",
    description: "Visualize limits, derivatives, integrals, and differential equations through 3D animations. See how functions change in real-time.",
    category: "mathematics",
    icon: <SquareFunction className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsCalculus
  },
  
  // Advanced Thermodynamics
  {
    id: "motion-thermodynamics",
    title: "Advanced Thermodynamics",
    description: "3D simulation of heat engines, Carnot cycles, entropy flow, and thermodynamic processes with interactive P-V-T surfaces.",
    category: "physics",
    icon: <Flame className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsThermodynamics
  },
  
  // Wave Optics
  {
    id: "motion-optics",
    title: "Wave Optics Animations",
    description: "Interference patterns, diffraction gratings, polarization, and Doppler effect visualized in 3D with moving wavefronts.",
    category: "physics",
    icon: <Eye className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsOptics
  },
  
  // Electromagnetism
  {
    id: "motion-electromagnetism",
    title: "Electromagnetism in 3D",
    description: "Faraday's Law, Lenz's Law, electromagnetic induction, and Maxwell's unified theory visualized through animated magnetic and electric fields.",
    category: "physics",
    icon: <Satellite className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsElectromagnetism
  },
  
  // Quantum Mechanics
  {
    id: "motion-quantum",
    title: "Quantum Mechanics Visualized",
    description: "Schrodinger's cat, wave-particle duality, probability distributions, quantum tunneling, and atomic orbitals in 3D motion.",
    category: "physics",
    icon: <Atom className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsQuantum
  },
  
  // Special Relativity
  {
    id: "motion-relativity",
    title: "Special Relativity",
    description: "Time dilation, length contraction, Lorentz transformations, and spacetime diagrams animated to show relativistic effects.",
    category: "physics",
    icon: <Rocket className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsRelativity
  },
  
  // Fluid Dynamics
  {
    id: "motion-fluid-dynamics",
    title: "Fluid Dynamics",
    description: "3D particle flow visualization showing laminar vs turbulent flow, Bernoulli's principle, and vortex formation.",
    category: "physics",
    icon: <Wind className="h-4 w-4" />,
    status: "new",
    component: MotionGraphicsFluidDynamics
  },
  
  // Class 11 Specific Motion Graphics
  {
    id: "class11-motion-kinematics",
    title: "Class 11: Kinematics Motion Graphics",
    description: "Enhanced 3D motion graphics for kinematic equations, projectile motion, and relative motion with animated trajectories.",
    category: "class11",
    icon: <Move3d className="h-4 w-4" />,
    status: "new",
    component: Class11KinematicsMotion
  },
  
  {
    id: "class11-motion-laws",
    title: "Class 11: Laws of Motion Animations",
    description: "Animated demonstrations of Newton's Three Laws with force vectors, pulley systems, and friction visualization.",
    category: "class11",
    icon: <Brain className="h-4 w-4" />,
    status: "new",
    component: Class11LawsOfMotion
  },
  
  {
    id: "class11-motion-rotational",
    title: "Class 11: Rotational Motion",
    description: "3D animations of circular motion, centripetal force, angular momentum, and rolling motion with spinning objects.",
    category: "class11",
    icon: <Orbit className="h-4 w-4" />,
    status: "new",
    component: Class11RotationalMotion
  },
  
  {
    id: "class11-motion-atomic",
    title: "Class 11: Atomic Structure Animations",
    description: "Animated atomic models showing electron orbits, quantum jumps, emission spectra, and atomic structure for first 30 elements.",
    category: "class11",
    icon: <DNA className="h-4 w-4" />,
    status: "new",
    component: Class11AtomicStructure
  },
  
  {
    id: "class11-motion-bonding",
    title: "Class 11: Chemical Bonding Animations",
    description: "3D animations of ionic bond formation, covalent bond sharing, metallic bonding sea of electrons, and hydrogen bonding.",
    category: "class11",
    icon: <TestTube className="h-4 w-4" />,
    status: "new",
    component: Class11ChemicalBonding
  },
  
  {
    id: "class11-motion-thermo",
    title: "Class 11: Thermodynamics Motion",
    description: "Animated piston-cylinder systems, heat transfer visualization, thermodynamic cycles, and entropy changes.",
    category: "class11",
    icon: <Sun className="h-4 w-4" />,
    status: "new",
    component: Class11Thermodynamics
  },
  
  // NEW: Wave Interference with Labelled Meanings
  {
    id: "class11-motion-wave-interference",
    title: "Class 11: Wave Interference 3D",
    description: "3D motion graphics showing wave superposition, constructive/destructive interference, standing waves, and phase differences with clearly labelled components. NEB/CDC Physics aligned.",
    category: "class11",
    icon: <Waves className="h-4 w-4" />,
    status: "new",
    component: MotionClass11WaveInterference
  },
];

const PHYSICS_MOTION_LABS = MOTION_GRAPHICS_LABS.filter(l => l.category === "physics");
const CHEMISTRY_MOTION_LABS = MOTION_GRAPHICS_LABS.filter(l => l.category === "chemistry");
const MATH_MOTION_LABS = MOTION_GRAPHICS_LABS.filter(l => l.category === "mathematics");
const CLASS11_MOTION_LABS = MOTION_GRAPHICS_LABS.filter(l => l.category === "class11");

const ALL_MOTION_LABS = [...PHYSICS_MOTION_LABS, ...CHEMISTRY_MOTION_LABS, ...MATH_MOTION_LABS, ...CLASS11_MOTION_LABS];

export default function MotionGraphicsPage() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<"all" | "physics" | "chemistry" | "mathematics" | "class11">("all");

  const filteredLabs = useMemo(() => {
    if (activeSubject === "all") return ALL_MOTION_LABS;
    return ALL_MOTION_LABS.filter(lab => lab.category === activeSubject);
  }, [activeSubject]);

  const SelectedComponent = useMemo(() => {
    if (selectedLabId) {
      const lab = ALL_MOTION_LABS.find(l => l.id === selectedLabId);
      return lab ? lab.component : null;
    }
    return filteredLabs[0]?.component || null;
  }, [selectedLabId, filteredLabs]);

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-6 sm:py-10 px-4 sm:px-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          <Film className="h-6 w-6 inline-block mr-2" />
          Motion Graphics Labs
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Advanced 3D motion graphics and animations for Complex Grade 11 concepts in Physics, Chemistry, Mathematics, and Class 11 curriculum.
        </p>
      </div>

      <Tabs value={activeSubject} onValueChange={(v) => setActiveSubject(v as typeof activeSubject)} className="w-full">
        <TabsList className="flex-wrap h-auto sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="all" className="gap-2 py-2 px-3">
            <Animation className="h-4 w-4" />
            <span>All Motion Labs</span>
          </TabsTrigger>
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
            <Sparkles className="h-4 w-4" />
            <span className="hidden xs:inline">Class 11</span>
            <span className="xs:hidden">C11</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <LabDashboard 
            labs={filteredLabs} 
            onSelectLab={(id) => setSelectedLabId(id)}
            selectedLabId={selectedLabId}
          />
          <Card className="mt-6 p-4 bg-card rounded-lg shadow-sm">
            {SelectedComponent && <SelectedComponent />}
          </Card>
        </TabsContent>

        <TabsContent value="physics" className="mt-0">
          <LabDashboard 
            labs={filteredLabs} 
            onSelectLab={(id) => setSelectedLabId(id)}
            selectedLabId={selectedLabId}
          />
          <Card className="mt-6 p-4 bg-card rounded-lg shadow-sm">
            {SelectedComponent && <SelectedComponent />}
          </Card>
        </TabsContent>

        <TabsContent value="chemistry" className="mt-0">
          <LabDashboard 
            labs={filteredLabs} 
            onSelectLab={(id) => setSelectedLabId(id)}
            selectedLabId={selectedLabId}
          />
          <Card className="mt-6 p-4 bg-card rounded-lg shadow-sm">
            {SelectedComponent && <SelectedComponent />}
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="mt-0">
          <LabDashboard 
            labs={filteredLabs} 
            onSelectLab={(id) => setSelectedLabId(id)}
            selectedLabId={selectedLabId}
          />
          <Card className="mt-6 p-4 bg-card rounded-lg shadow-sm">
            {SelectedComponent && <SelectedComponent />}
          </Card>
        </TabsContent>

        <TabsContent value="class11" className="mt-0">
          <LabDashboard 
            labs={filteredLabs} 
            onSelectLab={(id) => setSelectedLabId(id)}
            selectedLabId={selectedLabId}
          />
          <Card className="mt-6 p-4 bg-card rounded-lg shadow-sm">
            {SelectedComponent && <SelectedComponent />}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
