"use client";

import { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle, BookOpen, Beaker, Atom, Calculator, FlaskConical, Dna, Microscope, Leaf, Activity, TestTube, TestTubeDiagonal, Atom as AtomIcon, Brain, Eye, Wind, Zap, Waves, Thermometer, Gauge, Compass, Ruler, Scale, Clock, TrendingUp, Database, FileText, ChevronRight, ChevronDown, Info, Lightbulb, Target, Award, Star, Heart, Shield, Globe, Users, GraduationCap, School, Library, PenTool, Book, FileText as FileTextIcon, Search, Filter, SortAsc, SortDesc, Grid, List, Maximize2, Minimize2, Settings, RefreshCw, Download, Upload, Share2, Bookmark, Heart as HeartIcon, Bell, User, LogOut, Menu, X, Home, LayoutDashboard, BookOpen as BookOpenIcon, GraduationCap as GraduationCapIcon, Award as AwardIcon, Star as StarIcon, TrendingUp as TrendingUpIcon, Database as DatabaseIcon, FileText as FileTextIcon2, ChevronRight as ChevronRightIcon, ChevronDown as ChevronDownIcon, Info as InfoIcon, Lightbulb as LightbulbIcon, Target as TargetIcon, Award as AwardIcon2, Star as StarIcon2, Heart as HeartIcon2, Shield as ShieldIcon, Globe as GlobeIcon, Users as UsersIcon, GraduationCap as GraduationCapIcon2, School as SchoolIcon, Library as LibraryIcon, PenTool as PenToolIcon, Book as BookIcon, Search as SearchIcon, Filter as FilterIcon, SortAsc as SortAscIcon, SortDesc as SortDescIcon, Grid as GridIcon, List as ListIcon, Maximize2 as Maximize2Icon, Minimize2 as Minimize2Icon, Settings as SettingsIcon, RefreshCw as RefreshCwIcon, Download as DownloadIcon, Upload as UploadIcon, Share2 as Share2Icon, Bookmark as BookmarkIcon } from "lucide-react";
import { MathLab } from "@/components/lab/math-lab";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { BiologyLab } from "@/components/lab/biology-lab";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathSurfaces3D } from "@/components/lab/math-surfaces-3d";
import { Parabola3D } from "@/components/lab/parabola-3d";
import { VectorViewer } from "@/components/lab/vector-viewer";
import { CoordinateAxes3D } from "@/components/lab/coordinate-axes-3d";
import { InteractiveFunctionGraph } from "@/components/lab/interactive-function-graph";
import { PhysicsMechanics3D } from "@/components/lab/physics-mechanics-3d";
import { PhysicsOptics3D } from "@/components/lab/physics-optics-3d";
import { PhysicsElectricity3D } from "@/components/lab/physics-electricity-3d";
import { PhysicsModern3D } from "@/components/lab/physics-modern-3d";
import { ChemistryMolecules3D } from "@/components/lab/chemistry-molecules-3d";
import { ChemistryReactions3D } from "@/components/lab/chemistry-reactions-3d";
import { ChemistryPeriodic3D } from "@/components/lab/chemistry-periodic-3d";
import { ChemistryThermo3D } from "@/components/lab/chemistry-thermo-3d";
import { BiologyCells3D } from "@/components/lab/biology-cells-3d";
import { BiologyDNA3D } from "@/components/lab/biology-dna-3d";
import { BiologyEcology3D } from "@/components/lab/biology-ecology-3d";
import { BiologyHuman3D } from "@/components/lab/biology-human-3d";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { PremiumLab } from "@/components/lab/premium-lab";
import { useSubjectNav } from "@/features/syllabus/hooks";
import { useState } from "react";

const CLASS_OPTIONS = [
  { value: "class-11-notes", label: "Class 11" },
  { value: "class-12-notes", label: "Class 12" },
];

const SUBJECT_OPTIONS: Record<string, { value: string; label: string; icon: typeof Calculator }[]> = {
  "class-11-notes": [
    { value: "mathematics", label: "Mathematics", icon: Calculator },
    { value: "physics", label: "Physics", icon: Atom },
    { value: "chemistry", label: "Chemistry", icon: Beaker },
    { value: "biology", label: "Biology", icon: BookOpen },
  ],
  "class-12-notes": [
    { value: "mathematics", label: "Mathematics", icon: Calculator },
    { value: "physics", label: "Physics", icon: Atom },
    { value: "chemistry", label: "Chemistry", icon: Beaker },
    { value: "biology", label: "Biology", icon: BookOpen },
  ],
};

function SyllabusViewer({ classSlug, subjectSlug }: { classSlug: string; subjectSlug: string }) {
  const { data: subjectNav, isLoading, error, refetch } = useSubjectNav(classSlug, subjectSlug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading syllabus...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive">Failed to load syllabus</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!subjectNav?.subject) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">No syllabus data available for this subject</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{subjectNav.subject.name}</h2>
        <p className="text-muted-foreground">{subjectNav.subject.description}</p>
      </div>

      <div className="space-y-4">
        {subjectNav.units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} classSlug={classSlug} subjectSlug={subjectSlug} />
        ))}
      </div>
    </div>
  );
}

function UnitCard({
  unit,
  classSlug,
  subjectSlug,
}: {
  unit: { id: string; title: string; topics: string[]; topicEntries: { slug: string; title: string; index: number }[]; hours?: number };
  classSlug: string;
  subjectSlug: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
            {unit.title}
          </span>
          {unit.hours && (
            <span className="text-sm text-muted-foreground">{unit.hours} hours</span>
          )}
        </CardTitle>
      </CardHeader>
      {expanded && (
        <CardContent>
          <ul className="space-y-2" role="list">
            {unit.topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2 py-2 border-b last:border-b-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{topic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

const labs = [
  {
    id: "math-geometry",
    title: "Coordinate Geometry",
    description: "Interactive 3D coordinate geometry with points, lines, planes, and vectors",
    component: MathGeometry3D,
    category: "math",
    icon: Calculator,
  },
  {
    id: "math-surfaces",
    title: "3D Surfaces",
    description: "Explore mathematical surfaces in 3D space",
    component: MathSurfaces3D,
    category: "math",
    icon: Atom,
  },
  {
    id: "math-parabola",
    title: "Parabola Explorer",
    description: "Interactive parabola visualization with roots, vertex, and focus",
    component: Parabola3D,
    category: "math",
    icon: TrendingUp,
  },
  {
    id: "math-vectors",
    title: "Vector Explorer",
    description: "Interactive vector addition and angle visualization",
    component: VectorViewer,
    category: "math",
    icon: ArrowRight,
  },
  {
    id: "math-coords",
    title: "3D Coordinate System",
    description: "Explore 3D coordinate axes and projections",
    component: CoordinateAxes3D,
    category: "math",
    icon: Box,
  },
  {
    id: "math-graph",
    title: "Function Grapher",
    description: "Plot and explore mathematical functions",
    component: InteractiveFunctionGraph,
    category: "math",
    icon: LineChart,
  },
  {
    id: "physics-mechanics",
    title: "Mechanics",
    description: "Forces, motion, and energy visualizations",
    component: PhysicsMechanics3D,
    category: "physics",
    icon: Atom,
  },
  {
    id: "physics-optics",
    title: "Optics",
    description: "Light, reflection, refraction, and lenses",
    component: PhysicsOptics3D,
    category: "physics",
    icon: Eye,
  },
  {
    id: "physics-electricity",
    title: "Electricity & Magnetism",
    description: "Electric fields, circuits, and magnetic phenomena",
    component: PhysicsElectricity3D,
    category: "physics",
    icon: Zap,
  },
  {
    id: "physics-modern",
    title: "Modern Physics",
    description: "Quantum mechanics, nuclear physics, and particle physics",
    component: PhysicsModern3D,
    category: "physics",
    icon: AtomIcon,
  },
  {
    id: "chemistry-molecules",
    title: "Molecular Structures",
    description: "3D molecular visualization and bonding",
    component: ChemistryMolecules3D,
    category: "chemistry",
    icon: FlaskConical,
  },
  {
    id: "chemistry-reactions",
    title: "Chemical Reactions",
    description: "Reaction mechanisms and kinetics",
    component: ChemistryReactions3D,
    category: "chemistry",
    icon: Beaker,
  },
  {
    id: "chemistry-periodic",
    title: "Periodic Table",
    description: "Interactive periodic table with element properties",
    component: ChemistryPeriodic3D,
    category: "chemistry",
    icon: Grid,
  },
  {
    id: "chemistry-thermo",
    title: "Thermochemistry",
    description: "Heat, energy, and thermodynamics visualizations",
    component: ChemistryThermo3D,
    category: "chemistry",
    icon: Thermometer,
  },
  {
    id: "biology-cells",
    title: "Cell Biology",
    description: "Cell structure and organelles in 3D",
    component: BiologyCells3D,
    category: "biology",
    icon: Microscope,
  },
  {
    id: "biology-dna",
    title: "DNA & Genetics",
    description: "DNA structure, replication, and inheritance",
    component: BiologyDNA3D,
    category: "biology",
    icon: Dna,
  },
  {
    id: "biology-ecology",
    title: "Ecology",
    description: "Ecosystems, food chains, and environmental interactions",
    component: BiologyEcology3D,
    category: "biology",
    icon: Leaf,
  },
  {
    id: "biology-human",
    title: "Human Physiology",
    description: "Human body systems and organ functions",
    component: BiologyHuman3D,
    category: "biology",
    icon: Activity,
  },
  {
    id: "theory-math",
    title: "Math Theory",
    description: "Mathematical concepts and proofs",
    component: TheoryPanel,
    category: "math",
    icon: BookOpen,
    premium: false,
  },
  {
    id: "theory-physics",
    title: "Physics Theory",
    description: "Physics principles and derivations",
    component: TheoryPanel,
    category: "physics",
    icon: BookOpen,
    premium: false,
  },
  {
    id: "theory-chemistry",
    title: "Chemistry Theory",
    description: "Chemical principles and reactions",
    component: TheoryPanel,
    category: "chemistry",
    icon: BookOpen,
    premium: false,
  },
  {
    id: "theory-biology",
    title: "Biology Theory",
    description: "Biological concepts and processes",
    component: TheoryPanel,
    category: "biology",
    icon: BookOpen,
    premium: false,
  },
  {
    id: "premium-all",
    title: "Premium Labs",
    description: "Advanced simulations and experiments",
    component: PremiumLab,
    category: "premium",
    icon: Star,
    premium: true,
  },
];

function LabDashboard({ classSlug, subjectSlug }: { classSlug: string; subjectSlug: string }) {
  const [activeLab, setActiveLab] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredLabs = labs.filter((lab) => {
    if (filter === "all") return true;
    if (filter === "premium") return lab.premium;
    return lab.category === filter;
  });

  const activeLabData = activeLab ? labs.find((l) => l.id === activeLab) : null;
  const ActiveComponent = activeLabData?.component;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lab Dashboard</h2>
          <p className="text-muted-foreground">Choose an interactive simulation to explore</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "math" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("math")}
          >
            Math
          </Button>
          <Button
            variant={filter === "physics" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("physics")}
          >
            Physics
          </Button>
          <Button
            variant={filter === "chemistry" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("chemistry")}
          >
            Chemistry
          </Button>
          <Button
            variant={filter === "biology" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("biology")}
          >
            Biology
          </Button>
          <Button
            variant={filter === "premium" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("premium")}
          >
            Premium
          </Button>
        </div>
      </div>

      {!activeLab ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLabs.map((lab) => {
            const Icon = lab.icon;
            return (
              <Card
                key={lab.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => !lab.premium && setActiveLab(lab.id)}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-medium">{lab.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{lab.description}</p>
                  {lab.premium && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Premium</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
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
                {activeLabData && <activeLabData.icon className="h-5 w-5" />}
                {activeLabData?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ActiveComponent && (
                <Suspense fallback={
                  <div className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                }>
                  <ActiveComponent />
                </Suspense>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function LabContent() {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("mathematics");

  const subjects = SUBJECT_OPTIONS[classSlug] || [];

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Labs</h1>
        <p className="text-muted-foreground">
          Explore concepts through interactive 3D visualizations and syllabus-aligned content
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-2">
          <label htmlFor="class-select" className="text-sm font-medium">
            Class
          </label>
          <Select value={classSlug} onValueChange={setClassSlug}>
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
          <label htmlFor="subject-select" className="text-sm font-medium">
            Subject
          </label>
          <Select value={subjectSlug} onValueChange={setSubjectSlug}>
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

      <LabDashboard classSlug={classSlug} subjectSlug={subjectSlug} />
      <SyllabusViewer classSlug={classSlug} subjectSlug={subjectSlug} />
    </div>
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
      <LabContent />
    </Suspense>
  );
}
