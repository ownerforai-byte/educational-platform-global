"use client";

import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabDashboard, LabItem } from "@/components/lab/lab-dashboard";
import { Atom, FlaskConical, Calculator, Zap, Waves, Timer, CircuitBoard, Scale, ScanEye, Eye, Grid3x3, Sigma, FunctionSquare, Table2, Move3d, Infinity as InfinityIcon, Columns3, Beaker, TestTube, Microscope, DNA, Orbit, Wind, Flame, Sun, Moon, Stars, Layover, Cuboid, Sphere, Cylinder, Pyramid, SquareFunction, Lambda, Integral, Division, X, Plus, Minus, Percent, Hash, Code2, BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Target, Crosshair, Compass, Rocket, Satellite, Binary, CPU, Database, Server, Network, GitBranch, GitCommit, GitPullRequest, Crown, Gem, CreditCard, Sparkles, Brain, Robot, Lightning, ShieldCheck } from "lucide-react";

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

    // Class 11 Labs
    { id: "class11-physics-3d", title: "Class 11 Physics 3D", description: "3D visualizations for Class 11 Physics concepts.", category: "class11", icon: <Rocket className="h-4 w-4" />, status: "active", component: Class11Physics3D },
    { id: "class11-chemistry-3d", title: "Class 11 Chemistry 3D", description: "3D visualizations for Class 11 Chemistry concepts.", category: "class11", icon: <Microscope className="h-4 w-4" />, status: "active", component: Class11Chemistry3D },
    { id: "class11-math-3d", title: "Class 11 Math 3D", description: "3D visualizations for Class 11 Math concepts.", category: "class11", icon: <Target className="h-4 w-4" />, status: "active", component: Class11Math3D },
    { id: "class11-physics-plus", title: "Class 11 Physics 3D Plus", description: "Extended 3D physics visualizations for Class 11.", category: "class11", icon: <Satellite className="h-4 w-4" />, status: "new", component: Class11Physics3DPlus },
    { id: "class11-chemistry-plus", title: "Class 11 Chemistry 3D Plus", description: "Extended 3D chemistry visualizations for Class 11.", category: "class11", icon: <DNA className="h-4 w-4" />, status: "new", component: Class11Chemistry3DPlus },
    { id: "class11-math-plus", title: "Class 11 Math 3D Plus", description: "Extended 3D math visualizations for Class 11.", category: "class11", icon: <Binary className="h-4 w-4" />, status: "new", component: Class11Math3DPlus },
    
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
