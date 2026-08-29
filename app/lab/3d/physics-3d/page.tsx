"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Physics3D } from "@/components/lab/physics-3d";
import { ArrowLeft, Cuboid, Zap, Atom, Move3d, Eye, Sun, Flame, Radio, Waves, Terminal, Share2, Bookmark, RefreshCw, Maximize2, Minimize2, ChevronRight, Clock } from "lucide-react";

export default function Physics3DPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/lab/3d" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to 3D Labs</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Physics 3D</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
              {isFullscreen ? "Exit Full" : "Fullscreen"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto max-w-6xl px-4 py-6 ${isFullscreen ? "fixed inset-0 bg-background z-50 overflow-auto" : ""}`}>
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cuboid className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Physics 3D Simulator</h1>
              <p className="mt-1 text-muted-foreground">
                Interactive 3D visualizations of electric fields, double pendulum, gravitational fields, and vector operations
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Bookmark">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4 text-primary" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>8 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-primary mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
              <Physics3D />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">🎥 Animation</p>
                <p className="text-xs text-muted-foreground">Interactive field visualization with real-time parameter adjustment</p>
              </div>
              <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">📊 Graph</p>
                <p className="text-xs text-muted-foreground">Field strength, force, and potential visualizations</p>
              </div>
              <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">🎯 3D View</p>
                <p className="text-xs text-muted-foreground">Multi-dimensional field representation in 3D space</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: NEB/CDC Peculiar Description & Exam Focus */}
        <Card className="border-l-4 border-l-red-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm font-bold">!</span>
              ⚡ NEB/CDC Peculiar Description & Exam Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Why This Matters for NEB Exams</p>
              <p className="text-sm text-red-800 dark:text-red-200">
                Physics 3D visualizations support <strong>Chapter 1-3 (Vectors, Kinematics, Dynamics)</strong> with emphasis on graphical understanding. Students consistently struggle with vector resolution, field line interpretation, and 3D spatial reasoning in exams.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing electric field direction vs force direction on negative charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Misinterpreting field line density as field strength</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Vector addition errors in 2D/3D problems</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Vector problems: 3-5 marks</li>
                  <li>• Field interpretation: 2-4 marks</li>
                  <li>• Graphical analysis: 2-3 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory & Definitions */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">2</span>
                📖 Complete Theory & Formulas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This simulation covers fundamental concepts in <strong>electromagnetism, gravitation, and vector mechanics</strong> — core topics in NEB Class 11 & 12 Physics.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">🔌 Electric Fields</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Coulomb's Law:</strong> F = kq₁q₂/r²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Electric Field:</strong> E = F/q = kQ/r²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Field lines point away from +ve, toward -ve charges</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">🌍 Gravitational Fields</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Newton's Law:</strong> F = GMm/r²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Field Strength:</strong> g = GM/r²</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Potential: V = -GM/r</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">📐 Vector Operations</p>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Dot Product:</strong> A·B = |A||B|cosθ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span><strong>Cross Product:</strong> A×B = |A||B|sinθ n̂</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Resolution: Aₓ = A cos θ, Aᵧ = A sin θ</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">⚡ Double Pendulum</p>
                  <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Chaotic motion demonstration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Energy conservation visualization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>Period depends on length & gravity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold">3</span>
                🎯 Interactive Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Drag to Rotate</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Click and drag to rotate the 3D view in any direction</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Scroll to Zoom</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Use mouse wheel to zoom in/out for detailed inspection</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Adjust Parameters</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Change charge magnitude, distance, and mass values</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-wrap gap-3">
            <Link href="/lab/3d" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to 3D Labs</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/lab/theory/kinematics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>Related: Theory →</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Interactive Physics Simulations • NEB/CDC Aligned • Class 11 & 12</p>
        </footer>
      </main>
    </div>
  );
}
