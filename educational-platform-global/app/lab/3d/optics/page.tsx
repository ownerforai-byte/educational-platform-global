"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhysicsOptics } from "@/components/lab/physics-optics";
import { ArrowLeft, Eye, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Waves, Sun, Prism, ChevronRight, Clock } from "lucide-react";

export default function OpticsPage() {
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
            <span className="text-sm font-medium">Optics Lab</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
              <Eye className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Optics Laboratory</h1>
              <p className="mt-1 text-muted-foreground">
                Interactive simulations of reflection, refraction, dispersion, diffraction, and lens optics
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
              <Terminal className="h-4 w-4 text-green-500" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>6 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-green-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border-2 border-green-500/20 shadow-lg">
              <PhysicsOptics />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-green-800 dark:text-green-200">Ray tracing with real-time angle and position updates</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">📊 Graph</p>
                <p className="text-xs text-green-800 dark:text-green-200">Incident vs refracted angle, deviation angle plots</p>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">🎯 3D View</p>
                <p className="text-xs text-green-800 dark:text-green-200">Three-dimensional ray propagation and lens systems</p>
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
                Optics carries <strong>8-12 marks</strong> in Class 11 & 12 board exams. Ray optics (mirrors, lenses, prisms) and wave optics (interference, diffraction) are frequently tested. Students struggle with sign conventions, lens formula application, and total internal reflection conditions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Sign convention errors in lens/mirror formulas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing real vs virtual images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Incorrect critical angle calculation</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Mirror/lens problems: 4-8 marks</li>
                  <li>• Prism and deviation: 2-4 marks</li>
                  <li>• Wave optics: 2-4 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory & Definitions */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">2</span>
                📖 Optics Theory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Optics studies light behavior including reflection, refraction, dispersion, interference, and diffraction.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">🪞 Mirrors</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li><strong>Concave:</strong> Converging mirror, real image possible</li>
                    <li><strong>Convex:</strong> Diverging mirror, always virtual image</li>
                    <li><strong>Mirror Formula:</strong> 1/f = 1/v + 1/u</li>
                    <li><strong>Magnification:</strong> m = -v/u = hᵢ/hₒ</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">🔍 Lenses</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li><strong>Convex:</strong> Converging lens, real image possible</li>
                    <li><strong>Concave:</strong> Diverging lens, always virtual image</li>
                    <li><strong>Lens Formula:</strong> 1/f = 1/v - 1/u</li>
                    <li><strong>Powers:</strong> P = 1/f (in meters)</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">🌈 Refraction & Prisms</p>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li><strong>Snell's Law:</strong> n₁sin θ₁ = n₂sin θ₂</li>
                    <li><strong>Critical Angle:</strong> sin C = 1/n</li>
                    <li><strong>Deviation:</strong> δ = (n-1)A (thin prism)</li>
                    <li><strong>Dispersion:</strong> White light splits into spectrum</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-4 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🌊 Wave Optics</p>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                    <li><strong>Interference:</strong> β = λD/d (Young's double slit)</li>
                    <li><strong>Diffraction:</strong> First minimum at sin θ = λ/a</li>
                    <li><strong>Polarization:</strong> Brewster's angle: tan θ_B = n</li>
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
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Adjust Angle</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Change incident angle and observe reflection/refraction</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Select Medium</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Choose different refractive indices for materials</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">View Spectrum</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">See white light dispersion through prism in detail</p>
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
          <p>Optics Simulations • NEB/CDC Aligned • Class 11 & 12 Physics</p>
        </footer>
      </main>
    </div>
  );
}
