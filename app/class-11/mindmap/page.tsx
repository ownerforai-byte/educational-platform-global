"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Atom, FlaskConical, Calculator, BookOpen, Network, ChevronLeft, Eye, Lightbulb, Cuboid } from "lucide-react";
import { MindmapInterface } from "@/features/mindmap/components/mindmap-interface";
import type { MindmapNode } from "@/features/mindmap/types";

// Class 11 Complete Curriculum Mind Map
const allSubjectsMindmap: MindmapNode = {
  id: "class11-all",
  label: "Class 11 Complete Curriculum",
  children: [
    {
      id: "physics",
      label: "Physics (10 Units)",
      children: [
        { id: "physical-world", label: "Unit 1: Physical World & Measurement" },
        { id: "kinematics", label: "Unit 2: Kinematics (Motion in Straight Line)" },
        { id: "laws-motion", label: "Unit 3: Laws of Motion" },
        { id: "work-energy", label: "Unit 4: Work, Energy & Power" },
        { id: "rotational", label: "Unit 5: Rotational Motion" },
        { id: "gravitation", label: "Unit 6: Gravitation" },
        { id: "oscillations", label: "Unit 7: Oscillations & Waves" },
        { id: "thermodynamics", label: "Unit 8: Thermodynamics" },
        { id: "optics", label: "Unit 9: Optics (Mirrors & Lenses)" },
        { id: "electrostatics", label: "Unit 10: Electrostatics" },
      ]
    },
    {
      id: "chemistry",
      label: "Chemistry (5 Units)",
      children: [
        { id: "atomic-structure", label: "Unit 1: Atomic Structure" },
        { id: "periodic-table", label: "Unit 2: Periodic Table" },
        { id: "chemical-bonding", label: "Unit 3: Chemical Bonding" },
        { id: "thermodynamics", label: "Unit 4: Thermodynamics" },
        { id: "equilibrium", label: "Unit 5: Equilibrium" },
      ]
    },
    {
      id: "mathematics",
      label: "Mathematics (6 Units)",
      children: [
        { id: "sets", label: "Unit 1: Sets" },
        { id: "functions", label: "Unit 2: Relations & Functions" },
        { id: "trigonometry", label: "Unit 3: Trigonometry" },
        { id: "coordinate-geometry", label: "Unit 4: Coordinate Geometry" },
        { id: "calculus", label: "Unit 5: Calculus" },
        { id: "statistics", label: "Unit 6: Statistics" },
      ]
    },
    {
      id: "biology",
      label: "Biology",
      children: [
        { id: "botany", label: "Botany" },
        { id: "zoology", label: "Zoology" },
        { id: "cell-biology", label: "Cell Biology" },
        { id: "genetics", label: "Genetics" },
        { id: "ecology", label: "Ecology" },
      ]
    },
    {
      id: "languages",
      label: "Languages",
      children: [
        { id: "english", label: "English" },
        { id: "nepali", label: "Nepali" },
      ]
    },
  ]
};

// Motion Graphics Labs Mind Map with 3D Optics
const motionGraphicsMindmap: MindmapNode = {
  id: "motion-graphics-labs",
  label: "Class 11 Motion Graphics Labs",
  children: [
    {
      id: "physics-labs",
      label: "Physics Labs (5 FREE)",
      children: [
        { id: "kinematics-motion", label: "1. Kinematics Motion" },
        { id: "laws-motion", label: "2. Laws of Motion" },
        { id: "work-energy", label: "3. Work, Energy & Power" },
        { id: "rotational-motion", label: "4. Rotational Motion" },
        { id: "oscillations-waves", label: "5. Oscillations & Waves" },
      ]
    },
    {
      id: "chemistry-labs",
      label: "Chemistry Labs (3 FREE)",
      children: [
        { id: "atomic-structure", label: "1. Atomic Structure" },
        { id: "chemical-bonding", label: "2. Chemical Bonding" },
        { id: "thermodynamics", label: "3. Thermodynamics" },
      ]
    },
    {
      id: "mathematics-labs",
      label: "Mathematics Labs (3 FREE)",
      children: [
        { id: "sets-functions", label: "1. Sets & Functions" },
        { id: "trigonometry", label: "2. Trigonometry" },
        { id: "statistics", label: "3. Statistics" },
      ]
    },
    {
      id: "3d-optics-labs",
      label: "3D Optics Labs (Labeled Parts)",
      children: [
        { id: "concave-mirror", label: "3D Concave Mirror" },
        { id: "convex-mirror", label: "3D Convex Mirror" },
        { id: "mirror-formula", label: "Mirror Formula: 1/f = 1/v + 1/u" },
        { id: "focus-pole", label: "Labeled: Focus, Pole, Object, Image" },
        { id: "ray-diagrams", label: "Ray Diagrams with CSS2D Labels" },
      ]
    },
    {
      id: "premium-labs",
      label: "Premium Labs (5)",
      children: [
        { id: "vr-lab", label: "VR Laboratory (3000cr)" },
        { id: "ai-tutor", label: "AI Lab Tutor (5000cr)" },
        { id: "equation-solver", label: "Universal Equation Solver (6000cr)" },
        { id: "advanced-simulator", label: "Advanced Circuit Simulator (7000cr)" },
        { id: "molecular-builder", label: "Molecular Builder 3D (8000cr)" },
      ]
    },
    {
      id: "credit-system",
      label: "Credit System",
      children: [
        { id: "total-credits", label: "Total: 29,000 credits" },
        { id: "remaining-credits", label: "Remaining: 20,000 credits" },
        { id: "used-credits", label: "Used: 9,000 credits" },
      ]
    },
  ]
};

const mindmaps = {
  curriculum: allSubjectsMindmap,
  labs: motionGraphicsMindmap,
};

type MindmapKey = keyof typeof mindmaps;

export default function Class11MindmapPage() {
  const [activeMindmap, setActiveMindmap] = useState<MindmapKey>("labs");

  const currentMindmap = mindmaps[activeMindmap];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/class-11" passHref>
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Class 11
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Class 11 Mind Maps</h1>
              <p className="mt-2 text-muted-foreground">
                Interactive tree diagrams showing the structure and relationships of Class 11 concepts
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Tree Diagram View
            </Badge>
          </div>
        </div>
      </div>

      {/* Mindmap Selector Tabs */}
      <Tabs value={activeMindmap} onValueChange={(v) => setActiveMindmap(v as MindmapKey)} className="w-full">
        <TabsList className="flex-wrap h-auto sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="curriculum" className="gap-2 py-2 px-3">
            <BookOpen className="h-4 w-4" />
            <span>All Subjects Curriculum</span>
          </TabsTrigger>
          <TabsTrigger value="labs" className="gap-2 py-2 px-3">
            <Lightbulb className="h-4 w-4" />
            <span>Motion Graphics Labs</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Mindmap Display */}
      <div className="space-y-6">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {currentMindmap.label}
            </CardTitle>
            <CardDescription>
              {activeMindmap === "curriculum" && "Complete Class 11 curriculum structure with all subjects and units"}
              {activeMindmap === "labs" && "11 FREE Motion Graphics Labs + 3D Optics with Labels + Premium Labs + Credit System"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <MindmapInterface
                title={currentMindmap.label}
                root={currentMindmap}
                source="syllabus"
              />
            </div>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Tree diagram shows all concepts and their relationships</li>
                <li>Hover over nodes to see connections</li>
                <li>Use the tabs above to switch between different mind maps</li>
                <li>Click Expand/Collapse to toggle the view</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3D Labs Access */}
        <Card className="border-2 border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-amber-600" />
              Access All 3D Labs with Labels
            </CardTitle>
            <CardDescription>
              All 11 motion graphics labs are FREE! 3D Optics labs have labeled parts (Focus, Pole, Object, Image).
              Use your 20K credits to unlock premium labs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/lab?activeSubject=class11" passHref>
                <Button variant="outline" className="w-full h-16 text-lg gap-2">
                  <Lightbulb className="h-5 w-5" />
                  All Class 11 Labs
                </Button>
              </Link>
              <Link href="/lab/3d" passHref>
                <Button variant="outline" className="w-full h-16 text-lg gap-2">
                  <Cuboid className="h-5 w-5" />
                  3D Labs with Labels
                </Button>
              </Link>
              <Link href="/lab/theory" passHref>
                <Button variant="outline" className="w-full h-16 text-lg gap-2">
                  <BookOpen className="h-5 w-5" />
                  Theory Pages
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="h-4 w-4" />
                Physics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">10 Units, 40+ Topics</p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Kinematics with Equations</li>
                <li>Laws of Motion</li>
                <li>Work & Energy</li>
                <li>Rotational Motion</li>
                <li>Optics (Mirrors & Lenses)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Chemistry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">5 Units, 20+ Topics</p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Atomic Structure</li>
                <li>Periodic Table</li>
                <li>Chemical Bonding</li>
                <li>Thermodynamics</li>
                <li>Equilibrium</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Mathematics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">6 Units, 25+ Topics</p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Sets & Functions</li>
                <li>Trigonometry</li>
                <li>Coordinate Geometry</li>
                <li>Calculus</li>
                <li>Statistics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/class-11">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Class 11 Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
