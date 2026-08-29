"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabDashboard, LabItem } from "@/components/lab/lab-dashboard";
import { Atom, FlaskConical, Calculator, Cuboid, Eye, Microscope, SquareFunction, Zap, Move3d, Sun, Flame, Thermometer, Timer, Ruler, Waves, Radio, Sigma, Leaf, ExternalLink, Star } from "lucide-react";

// Import all 3D components
import { Physics3D } from "@/components/lab/physics-3d";
import { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";
import { Physics3DMirrors } from "@/components/lab/physics-3d-mirrors";
import { PhysicsOptics } from "@/components/lab/physics-optics";
import { Physics3DLenses } from "@/components/lab/physics-3d-lenses";
import { Physics3DPrism } from "@/components/lab/physics-3d-prism";
import { Physics3DGravitation } from "@/components/lab/physics-3d-gravitation";
import { Physics3DElectrostatics } from "@/components/lab/physics-3d-electrostatics";
import { Physics3DVectors } from "@/components/lab/physics-3d-vectors";
import { Physics3DVectorsComprehensive } from "@/components/lab/physics-3d-vectors-comprehensive";
import { Physics2DVectorsGraph } from "@/components/lab/physics-2d-vectors-graph";
import { Physics3DThermodynamics } from "@/components/lab/physics-3d-thermodynamics";

// Heat Determination series — labelled 3D classic experiments
import { Physics3DHeatDeterminations } from "@/components/lab/physics-3d-heat-determinations";
import { LeesDiscExperiment } from "@/components/lab/physics-3d-lees-disc";
import { SearlesBarExperiment } from "@/components/lab/physics-3d-searles-bar";
import { NewtonCoolingExperiment } from "@/components/lab/physics-3d-newtons-cooling";
import { LinearExpansionExperiment } from "@/components/lab/physics-3d-linear-expansion";

// Syllabus-mapped suites (Class 11 + 12)
import { MechanicsSuite3D } from "@/components/lab/physics-3d-mechanics-i";
import { ElasticityGasSuite3D } from "@/components/lab/physics-3d-elasticity-gas";
import { ElectricitySuite3D } from "@/components/lab/physics-3d-electricity-i";
import { MagnetismEMISuite3D } from "@/components/lab/physics-3d-magnetism-emi";
import { WaveOpticsSuite3D } from "@/components/lab/physics-3d-wave-optics";
import { ModernPhysicsSuite3D } from "@/components/lab/physics-3d-modern";

// Symbol-at-place suites (labelled 3D)
import MechanicsSymbols from "@/components/lab/physics-3d-mechanics-symbols";
import ElectricitySymbols from "@/components/lab/physics-3d-electricity-symbols";
import WavesSymbols from "@/components/lab/physics-3d-waves-symbols";
import AtomicSymbols from "@/components/lab/physics-3d-atomic-symbols";
import MathSymbols from "@/components/lab/math-3d-symbols";

// Syllabus-gap suites (added from lib/syllabus.ts review)
import { Biology3DSuite } from "@/components/lab/biology-3d-suite";
import { Biology3DDiversitySuite } from "@/components/lab/biology-3d-diversity-suite";
import { Chemistry3DSyllabusSuite } from "@/components/lab/chemistry-3d-syllabus-suite";
import { Math3DSyllabusSuite } from "@/components/lab/math-3d-syllabus-suite";
import { Physics3DMeasurement } from "@/components/lab/physics-3d-measurement";

import { Chemistry3D } from "@/components/lab/chemistry-3d";
import { ChemistryAdvanced3D } from "@/components/lab/chemistry-advanced-3d";
import { ChemistryModern3D } from "@/components/lab/chemistry-modern-3d";
import { Chemistry3DMolecules } from "@/components/lab/chemistry-3d-molecules";

import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathAdvanced3D } from "@/components/lab/math-advanced-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { Math3DGeometryLabeled } from "@/components/lab/math-3d-geometry-labelledby";
import { Quantum3D } from "@/components/lab/quantum-3d";

const PHYSICS_3D_LABS: LabItem[] = [
  { id: "physics-3d", title: "Physics 3D", description: "Electric field, double pendulum, gravitational field, and 3D vector explorer.", category: "physics", icon: <Cuboid className="h-4 w-4" />, status: "development", component: Physics3D, hasPage: true, pagePath: "/lab/3d/physics-3d", featured: true },
  { id: "physics-advanced", title: "Physics 3D Advanced", description: "Electromagnetism, wave optics, relativity, quantum orbitals, nuclear decay, fluid flow, N-body orbits, PVT surface.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: Physics3DAdvanced },
  { id: "physics-mirrors-3d", title: "3D Spherical Mirrors", description: "Interactive 3D concave and convex mirrors with labelled parts: focus, pole, object, image, and ray diagrams.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "new", component: Physics3DMirrors },
  { id: "physics-optics", title: "Optics Lab", description: "Reflection, refraction, lateral shift, prism dispersion, diffraction, and 3D lens.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "active", component: PhysicsOptics, hasPage: true, pagePath: "/lab/3d/optics", featured: true },
  { id: "physics-lenses-3d", title: "3D Lenses (Convex & Concave)", description: "Interactive 3D convex and concave lenses with CSS2D labelled parts: optical center, principal axis, focus, object, image, and complete ray diagrams. Lens formula: 1/f = 1/v - 1/u.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "new", component: Physics3DLenses },
  { id: "physics-prism-3d", title: "3D Prism & Dispersion", description: "Interactive 3D triangular prism showing refraction and color dispersion with labeled parts: refracting surfaces, angle of prism, deviation, and spectrum colors. Includes prism calculator.", category: "physics", icon: <Eye className="h-4 w-4" />, status: "new", component: Physics3DPrism },
  { id: "physics-gravitation-3d", title: "3D Gravitation & Orbits", description: "Interactive orbital motion system with sun, planet, and moon. Labels: gravitational force vectors, velocity vectors, orbital radius. Includes gravitational field visualization with field lines.", category: "physics", icon: <Cuboid className="h-4 w-4" />, status: "new", component: Physics3DGravitation },
  { id: "physics-electrostatics-3d", title: "3D Electrostatics", description: "Interactive electric field lines between charges, Coulomb's Law visualization, and electric dipole with labelled charges (+Q, -Q), field lines, and equipotential surfaces. Formulas: F = kq1q2/r², E = kQ/r².", category: "physics", icon: <Zap className="h-4 w-4" />, status: "new", component: Physics3DElectrostatics },
  { id: "physics-vectors-3d", title: "3D Vectors & Products", description: "Interactive 3D vector addition, dot product (A·B = |A||B|cosθ), and cross product (A×B = |A||B|sinθ n̂) with labelled components, magnitudes, angles, and graphical representations.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: Physics3DVectors },
  { id: "physics-vectors-comprehensive-3d", title: "3D Vectors Comprehensive (All Cases)", description: "Complete 3D vector visualization with all cases: perpendicular, parallel, antiparallel. Shows X,X', Y,Y', Z,Z' axes, negative vectors with signs, resultant, components, and interactive problems with solutions.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: Physics3DVectorsComprehensive },
  { id: "physics-vectors-2d-graph", title: "2D Vector Graph (X,Y Input)", description: "Interactive 2D Cartesian graph with X,X', Y,Y' axes. Input-based vector visualization showing vectors, resultant, triangle law, parallelogram law, and component breakdown. Perfect for understanding 2D vector addition.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: Physics2DVectorsGraph },
  { id: "physics-thermodynamics-3d", title: "3D Thermodynamics", description: "Piston-cylinder system with work calculation (W = PΔV), heat engine animation with piston and flywheel, and P-V diagrams showing isothermal, adiabatic, isobaric, and isochoric processes. First Law: ΔU = Q - W.", category: "physics", icon: <Sun className="h-4 w-4" />, status: "new", component: Physics3DThermodynamics, hasPage: true, pagePath: "/lab/3d/thermodynamics", featured: true },
  { id: "physics-heat-determinations-3d", title: "3D Heat Determinations Suite", description: "Four classic determination experiments in one suite — Lee's disc, Searle's bar, Newton's law of cooling and linear expansion — each with CSS2D labelled apparatus parts, live formulas, theory inside and below the canvas.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "new", component: Physics3DHeatDeterminations },
  { id: "physics-lees-disc-3d", title: "3D Lee's Disc Method", description: "Determination of thermal conductivity K of bad conductors (cardboard, wood, rubber, ebonite, glass) with labelled steam chamber, sample disc, copper Lee's disc, thermometers & clamping weights. K = m·c·(dθ/dt)·d / [A(θ₁−θ₂)].", category: "physics", icon: <Thermometer className="h-4 w-4" />, status: "new", component: LeesDiscExperiment },
  { id: "physics-searles-3d", title: "3D Searle's Bar Method", description: "Determination of thermal conductivity K of good conductors (copper, aluminium, brass, iron) with labelled steam chest, thermojunctions T₁/T₂, cooling-water coil, IN/OUT bulbs T₃/T₄ and measuring jar. K = ṁ·s·Δθ·L / [A(T₁−T₂)].", category: "physics", icon: <Ruler className="h-4 w-4" />, status: "new", component: SearlesBarExperiment },
  { id: "physics-newton-cooling-3d", title: "3D Newton's Law of Cooling", description: "Determination of cooling constant k with labelled double-wall calorimeter, stirrer, thermometer and a live exponential T–t decay graph. T(t)=Ts+(T₀−Ts)e^(−kt), half-excess time ln2/k.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "new", component: NewtonCoolingExperiment },
  { id: "physics-linear-expansion-3d", title: "3D Linear Expansion Apparatus", description: "Determination of coefficient α with labelled fixed clamp A, steam jacket, test rod and micrometer screw gauge B animated through a heating cycle. α = ΔL/(L₀·ΔT) for six metals.", category: "physics", icon: <Ruler className="h-4 w-4" />, status: "new", component: LinearExpansionExperiment },
  { id: "physics-mechanics-suite-3d", title: "3D Mechanics Suite (Class 11)", description: "Projectile motion, circular motion (conical pendulum, vertical circle, banked road), momentum & collisions, and work-energy-power — labelled 3D with live formulas and theory.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: MechanicsSuite3D },
  { id: "physics-elasticity-gas-suite-3d", title: "3D Elasticity & Ideal Gas Suite", description: "Hooke's law spring, Young's modulus wire determination, and a kinetic-molecular ideal-gas cylinder with PV = nRT readouts — labelled 3D.", category: "physics", icon: <Flame className="h-4 w-4" />, status: "new", component: ElasticityGasSuite3D },
  { id: "physics-electricity-suite-3d", title: "3D Electricity I Suite (Class 12)", description: "Parallel-plate capacitor with sliding dielectric (C = κε₀A/d, energy ½CV²) and meter bridge Wheatstone determination of unknown resistance — labelled 3D.", category: "physics", icon: <Zap className="h-4 w-4" />, status: "new", component: ElectricitySuite3D },
  { id: "physics-magnetism-emi-suite-3d", title: "3D Magnetism & EMI Suite", description: "Biot–Savart fields (straight wire, circular loop, solenoid), Lorentz force orbit, and Faraday/Lenz induction with LR-circuit readouts — labelled 3D.", category: "physics", icon: <Move3d className="h-4 w-4" />, status: "new", component: MagnetismEMISuite3D },
  { id: "physics-wave-optics-suite-3d", title: "3D Wave Optics Suite", description: "Young's double-slit interference (β = λD/d), single-slit diffraction (sinc²), and Brewster polarisation — labelled 3D with live readouts.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "new", component: WaveOpticsSuite3D },
  { id: "physics-modern-suite-3d", title: "3D Modern Physics & Communication Suite", description: "Photoelectric effect, Bohr atom & hydrogen spectrum, binding-energy curve (fission/fusion), and semiconductors/logic/AM-FM modulation — labelled 3D.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: ModernPhysicsSuite3D },
  { id: "symbols-mechanics", title: "Symbols — Mechanics (labelled)", description: "Pendulum & Projectile render θ, L, mg, T, ω and v₀, vₓ, v_y, g, H, R, T exactly where each quantity acts, with live values below.", category: "physics", icon: <Timer className="h-4 w-4" />, status: "new", component: MechanicsSymbols },
  { id: "symbols-electricity", title: "Symbols — Electricity (labelled)", description: "Ohm's-law circuit with ε, V, I, R and ammeter/voltmeter at their exact wiring, a moving charge, and live P pane.", category: "physics", icon: <Radio className="h-4 w-4" />, status: "new", component: ElectricitySymbols },
  { id: "symbols-waves", title: "Symbols — Waves (labelled)", description: "Travelling transverse wave with A, crest, trough, λ, v, f at their exact places; tune amplitude, wavelength and speed.", category: "physics", icon: <Waves className="h-4 w-4" />, status: "new", component: WavesSymbols },
  { id: "symbols-atomic", title: "Symbols — Atomic (labelled)", description: "Bohr model with +Ze, rₙ, Eₙ, hν at exact shells; electron orbits your chosen n.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: AtomicSymbols },
  { id: "physics-measurement-3d", title: "3D Measurement Instruments", description: "Unit: Physical Quantities. Vernier calliper (L.C. = 0.1 mm) and micrometer screw gauge (L.C. = 0.01 mm) with labelled parts, zero error and live MSR/VSR readings.", category: "physics", icon: <Ruler className="h-4 w-4" />, status: "new", component: Physics3DMeasurement },
  { id: "quantum-3d", title: "Quantum 3D", description: "Quantum mechanics visualizations including orbitals, probability distributions, and spin.", category: "physics", icon: <Atom className="h-4 w-4" />, status: "new", component: Quantum3D, hasPage: true, pagePath: "/lab/3d/quantum-3d", featured: true },
];

const BIOLOGY_3D_LABS: LabItem[] = [
  { id: "biology-suite-3d", title: "Biology 3D Suite", description: "Units: Biomolecules & Cell Biology, Microbiology, Ecology. Eukaryotic cell (plant/animal), mitosis vs meiosis stages, DNA double helix, bacteriophage structure, food chain & energy pyramid — all labelled.", category: "biology", icon: <Leaf className="h-4 w-4" />, status: "new", component: Biology3DSuite },
  { id: "biology-diversity-3d", title: "Biology 3D Diversity & Ecology Suite", description: "Units: Biomolecules (carbs/proteins/lipids/enzyme action), Monera (prokaryotic bacterial cell, Gram±), Floral Diversity (flower morphology, Spirogyra, Mucor, Yeast, Mushroom, Marchantia, Pinus), Ecology (carbon & nitrogen cycles) — all labelled.", category: "biology", icon: <Leaf className="h-4 w-4" />, status: "new", component: Biology3DDiversitySuite },
];

const CHEMISTRY_3D_LABS: LabItem[] = [
  { id: "chemistry-3d", title: "Chemistry 3D", description: "Advanced 3D molecular and chemical structure visualizations.", category: "chemistry", icon: <Cuboid className="h-4 w-4" />, status: "development", component: ChemistryAdvanced3D },
  { id: "chemistry-modern-3d", title: "Chemistry 3D Advanced", description: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR, galvanic cell, phase diagrams.", category: "chemistry", icon: <FlaskConical className="h-4 w-4" />, status: "new", component: ChemistryModern3D },
  { id: "chemistry-molecules-3d", title: "3D Molecular Structures", description: "Interactive 3D molecules with clearly labelled atoms and bonds. H₂O, CO₂, CH₄, NH₃, C₆H₁₂O₆.", category: "chemistry", icon: <Microscope className="h-4 w-4" />, status: "new", component: Chemistry3DMolecules, hasPage: true, pagePath: "/lab/3d/chemistry-molecules", featured: true },
  { id: "chemistry-syllabus-3d", title: "Chemistry 3D Syllabus Suite", description: "Units: Atomic Structure, Periodic Table, Chemical Bonding, Organic. Bohr shells for Z = 1–20, VSEPR shapes with lone pairs, Period-3 trend bars, hydrocarbons up to benzene — all labelled.", category: "chemistry", icon: <FlaskConical className="h-4 w-4" />, status: "new", component: Chemistry3DSyllabusSuite },
];

const MATH_3D_LABS: LabItem[] = [
  { id: "math-3d", title: "Mathematics 3D", description: "Advanced 3D mathematical visualizations and geometry.", category: "mathematics", icon: <Cuboid className="h-4 w-4" />, status: "development", component: MathGeometry3D },
  { id: "math-modern-3d", title: "Mathematics 3D Advanced", description: "Surfaces + contours, divergence/curl, Mandelbulb, parametric surfaces, matrix transforms.", category: "mathematics", icon: <SquareFunction className="h-4 w-4" />, status: "new", component: MathModern3D },
  { id: "math-geometry-3d", title: "Mathematics Geometry 3D", description: "Advanced 3D geometry visualizations.", category: "mathematics", icon: <Cuboid className="h-4 w-4" />, status: "new", component: MathGeometry3D },
  { id: "math-geometry-labeled-3d", title: "3D Geometry with Labels", description: "Interactive 3D shapes with labelled parts. Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid, Torus.", category: "mathematics", icon: <SquareFunction className="h-4 w-4" />, status: "new", component: Math3DGeometryLabeled, hasPage: true, pagePath: "/lab/3d/math-geometry", featured: true },
  { id: "math-syllabus-3d", title: "Mathematics 3D Syllabus Suite", description: "Units: Analytic Geometry, Statistics & Probability, Calculus. Conic sections sliced from a double cone (ellipse → parabola → hyperbola), normal distribution with μ/σ sliders, surfaces with tangent planes and partial derivatives.", category: "mathematics", icon: <Calculator className="h-4 w-4" />, status: "new", component: Math3DSyllabusSuite },
];

const ALL_3D_LABS = [...PHYSICS_3D_LABS, ...BIOLOGY_3D_LABS, ...CHEMISTRY_3D_LABS, ...MATH_3D_LABS];

export default function ThreeDPage() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<"all" | "physics" | "chemistry" | "mathematics" | "biology">("all");

  const filteredLabs = useMemo(() => {
    if (activeSubject === "all") return ALL_3D_LABS;
    return ALL_3D_LABS.filter(lab => lab.category === activeSubject);
  }, [activeSubject]);

  const SelectedComponent = useMemo(() => {
    if (selectedLabId) {
      const lab = ALL_3D_LABS.find(l => l.id === selectedLabId);
      return lab ? lab.component : null;
    }
    return filteredLabs[0]?.component || null;
  }, [selectedLabId, filteredLabs]);

  const featuredLabs = useMemo(() => ALL_3D_LABS.filter(lab => lab.featured), []);
  const labsWithPages = useMemo(() => ALL_3D_LABS.filter(lab => lab.hasPage), []);

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-6 sm:py-10 px-4 sm:px-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">🎯 3D Labs</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Interactive 3D visualizations with labelled components for Physics, Chemistry, and Mathematics.
        </p>
      </div>

      {/* Featured Labs Section */}
      {featuredLabs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-lg font-semibold">Featured Labs</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLabs.map(lab => (
              <a
                key={lab.id}
                href={lab.pagePath}
                className="group block rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {lab.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{lab.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{lab.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Links */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Quick Access:</p>
        <div className="flex flex-wrap gap-2">
          {labsWithPages.map(lab => (
            <a
              key={lab.id}
              href={lab.pagePath}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm group"
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">{lab.icon}</span>
              <span className="hidden sm:inline text-foreground/80">{lab.title}</span>
              <span className="sm:hidden text-foreground/60">{lab.title.split(" ")[0]}</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      <Tabs value={activeSubject} onValueChange={(v) => setActiveSubject(v as typeof activeSubject)} className="w-full">
        <TabsList className="flex-wrap h-auto sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="all" className="gap-2 py-2 px-3">
            <Cuboid className="h-4 w-4" />
            <span>All 3D Labs</span>
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
          <TabsTrigger value="biology" className="gap-2 py-2 px-3">
            <Leaf className="h-4 w-4" />
            <span className="hidden xs:inline">Biology</span>
            <span className="xs:hidden">Bio</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="gap-2 py-2 px-3">
            <Calculator className="h-4 w-4" />
            <span className="hidden xs:inline">Mathematics</span>
            <span className="xs:hidden">Math</span>
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

        <TabsContent value="biology" className="mt-0">
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
      </Tabs>
    </div>
  );
}
