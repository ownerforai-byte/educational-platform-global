"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Math3DGeometryLabeled } from "@/components/lab/math-3d-geometry-labelledby";
import { ArrowLeft, SquareFunction, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Cube, Circle, Cone, ChevronRight, Clock } from "lucide-react";

export default function MathGeometry3DPage() {
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
            <span className="text-sm font-medium">3D Geometry</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <SquareFunction className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">3D Geometry with Labels</h1>
              <p className="mt-1 text-muted-foreground">
                Interactive geometric shapes with clearly labelled faces, edges, vertices, and measurements
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
              <Terminal className="h-4 w-4 text-indigo-500" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>4 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-indigo-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border-2 border-indigo-500/20 shadow-lg">
              <Math3DGeometryLabeled />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Rotation, unfolding, and cross-section animations</p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">📊 Measurements</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Live calculation of surface area and volume</p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">🎯 3D View</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Interactive rotation with labelled components</p>
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
                3D geometry appears in <strong>Class 11 Mathematics (Analytic Geometry in Space)</strong> with 5-8 marks. Students struggle with Euler's formula verification, surface area/volume calculations, and identifying parts of 3D shapes from diagrams.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Forgetting Euler's formula: V - E + F = 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing curved surface area with total surface area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Incorrect volume formulas for pyramids/cones</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Surface area/volume: 3-5 marks</li>
                  <li>• Euler's formula verification: 1-2 marks</li>
                  <li>• Part identification: 1-2 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory & Definitions */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-bold">2</span>
                📖 3D Geometry Theory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                3D geometry studies solid figures with length, width, and height. Key shapes include polyhedra and curved surfaces.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">📦 Polyhedra</p>
                  <table className="w-full text-xs mt-2">
                    <thead>
                      <tr className="border-b border-indigo-200 dark:border-indigo-800">
                        <th className="text-left py-1">Shape</th>
                        <th className="text-left py-1">Faces</th>
                        <th className="text-left py-1">Edges</th>
                        <th className="text-left py-1">Vertices</th>
                      </tr>
                    </thead>
                    <tbody className="text-indigo-800 dark:text-indigo-200">
                      <tr><td className="py-1">Tetrahedron</td><td className="py-1">4</td><td className="py-1">6</td><td className="py-1">4</td></tr>
                      <tr><td className="py-1">Cube</td><td className="py-1">6</td><td className="py-1">12</td><td className="py-1">8</td></tr>
                      <tr><td className="py-1">Octahedron</td><td className="py-1">8</td><td className="py-1">12</td><td className="py-1">6</td></tr>
                      <tr><td className="py-1">Dodecahedron</td><td className="py-1">12</td><td className="py-1">30</td><td className="py-1">20</td></tr>
                      <tr><td className="py-1">Icosahedron</td><td className="py-1">20</td><td className="py-1">30</td><td className="py-1">12</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">📐 Formulas</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li><strong>Cube:</strong> V = a³, SA = 6a²</li>
                    <li><strong>Cuboid:</strong> V = lwh, SA = 2(lw + wh + lh)</li>
                    <li><strong>Sphere:</strong> V = 4/3πr³, SA = 4πr²</li>
                    <li><strong>Cylinder:</strong> V = πr²h, SA = 2πr(r+h)</li>
                    <li><strong>Cone:</strong> V = 1/3πr²h, SA = πr(r+l)</li>
                    <li><strong>Pyramid:</strong> V = 1/3 × Base × h</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">🔢 Euler's Formula</p>
                  <p className="text-center text-xl font-mono font-bold text-purple-700 dark:text-purple-300 my-2">
                    V - E + F = 2
                  </p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">
                    For any convex polyhedron: Vertices - Edges + Faces = 2
                  </p>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">📊 Slant Height</p>
                  <p className="text-center text-lg font-mono font-bold text-orange-700 dark:text-orange-300 my-2">
                    l = √(h² + r²)
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">
                    For cones and pyramids: l = slant height, h = vertical height, r = radius
                  </p>
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
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Select Shape</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Choose from cube, cuboid, sphere, cylinder, cone, pyramid, torus</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Label Parts</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Toggle face, edge, vertex labels to identify components</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Unfold View</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">See 2D net of 3D shape to understand surface area</p>
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
            <Link href="/lab/theory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>Related: Theory →</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>3D Geometry Visualizations • NEB/CDC Aligned • Class 11 Mathematics</p>
        </footer>
      </main>
    </div>
  );
}
