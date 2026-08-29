"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Zap, ChevronRight } from "lucide-react";
import { KinematicsSimulation } from "@/components/lab/kinematics-simulation";

export default function KinematicsTheoryPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/lab/theory" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Theory Labs</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Kinematics</span>
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
      <main className={`container mx-auto max-w-4xl px-4 py-6 ${isFullscreen ? "fixed inset-0 bg-background z-50 overflow-auto" : ""}`}>
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Zap className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Physics Theory: Kinematics</h1>
              <p className="mt-1 text-muted-foreground">
                Chapter 1: Motion in a Straight Line — NEB/CDC Class 11 Complete Theory
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
              <Terminal className="h-4 w-4 text-blue-500" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Class 11</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>5 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-blue-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-blue-200 dark:border-blue-800">
              <KinematicsSimulation />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-blue-800 dark:text-blue-200">Interactive motion visualization with real-time parameter adjustment</p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">📊 Graph</p>
                <p className="text-xs text-blue-800 dark:text-blue-200">Position-time, velocity-time, and acceleration-time graphs</p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">🎯 3D View</p>
                <p className="text-xs text-blue-800 dark:text-blue-200">Projectile motion in three-dimensional space</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Peculiar Description - NEB/CDC Focus */}
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
                Kinematics carries <strong>8-12 marks</strong> in Class 11 board exams. Students consistently struggle with sign conventions in free fall and distinguishing between distance/displacement in graphical problems.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Forgetting negative sign for downward acceleration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing distance traveled with displacement magnitude</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Using wrong equation when time is not given</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Numerical problems: 5-10 marks</li>
                  <li>• Graph interpretation: 3-5 marks</li>
                  <li>• Theory derivations: 2-5 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory Description */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">2</span>
                📖 Complete Theory & Definitions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong>Kinematics</strong> (from Greek "kinein" meaning "to move") is the branch of mechanics that describes the motion of objects without considering the forces that cause the motion. It provides the mathematical framework for analyzing how objects move through space and time.
              </p>
              
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">Key Quantities in Kinematics</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <th className="text-left pb-2 text-blue-900 dark:text-blue-100">Quantity</th>
                        <th className="text-left pb-2 text-blue-900 dark:text-blue-100">Symbol</th>
                        <th className="text-left pb-2 text-blue-900 dark:text-blue-100">Type</th>
                        <th className="text-left pb-2 text-blue-900 dark:text-blue-100">SI Unit</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-800 dark:text-blue-200">
                      <tr className="border-b border-blue-100 dark:border-blue-900">
                        <td className="py-2">Position</td>
                        <td className="py-2 font-mono">x, r</td>
                        <td className="py-2">Vector</td>
                        <td className="py-2">meter (m)</td>
                      </tr>
                      <tr className="border-b border-blue-100 dark:border-blue-900">
                        <td className="py-2">Distance</td>
                        <td className="py-2 font-mono">d, s</td>
                        <td className="py-2">Scalar</td>
                        <td className="py-2">meter (m)</td>
                      </tr>
                      <tr className="border-b border-blue-100 dark:border-blue-900">
                        <td className="py-2">Displacement</td>
                        <td className="py-2 font-mono">Δx</td>
                        <td className="py-2">Vector</td>
                        <td className="py-2">meter (m)</td>
                      </tr>
                      <tr className="border-b border-blue-100 dark:border-blue-900">
                        <td className="py-2">Speed</td>
                        <td className="py-2 font-mono">v</td>
                        <td className="py-2">Scalar</td>
                        <td className="py-2">m/s</td>
                      </tr>
                      <tr className="border-b border-blue-100 dark:border-blue-900">
                        <td className="py-2">Velocity</td>
                        <td className="py-2 font-mono">v</td>
                        <td className="py-2">Vector</td>
                        <td className="py-2">m/s</td>
                      </tr>
                      <tr>
                        <td className="py-2">Acceleration</td>
                        <td className="py-2 font-mono">a</td>
                        <td className="py-2">Vector</td>
                        <td className="py-2">m/s²</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">3</span>
                📐 Equations of Motion (Kinematic Equations)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These equations apply ONLY when acceleration is <strong>constant</strong>. They relate five kinematic variables: displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t).
              </p>
              
              <div className="grid gap-3">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border-2 border-green-200 dark:border-green-800">
                  <p className="text-center text-xl font-mono font-bold text-green-800 dark:text-green-200">
                    v = u + at
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">Eliminates displacement (s)</p>
                </div>
                
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border-2 border-green-200 dark:border-green-800">
                  <p className="text-center text-xl font-mono font-bold text-green-800 dark:text-green-200">
                    s = ut + ½at²
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">Eliminates final velocity (v)</p>
                </div>
                
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border-2 border-green-200 dark:border-green-800">
                  <p className="text-center text-xl font-mono font-bold text-green-800 dark:text-green-200">
                    v² = u² + 2as
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">Eliminates time (t)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold">4</span>
                🌍 Free Fall and Gravity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                When an object falls freely under gravity alone (neglecting air resistance), it experiences constant acceleration equal to <strong>g = 9.8 m/s²</strong> directed towards Earth's center.
              </p>
              
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3">Properties of Free Fall</p>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>All objects fall with same acceleration regardless of mass (Galileo's experiment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Upward motion: acceleration = -g (deceleration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>At highest point: velocity = 0 (but acceleration = g)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Time of ascent = Time of descent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Speed at launch = Speed at return (same height)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold">5</span>
                📈 Graphical Representation of Motion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Distance-Time Graph</p>
                  <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                    <li>• Slope = speed</li>
                    <li>• Horizontal line = at rest</li>
                    <li>• Straight line = uniform speed</li>
                    <li>• Curve = changing speed</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Velocity-Time Graph</p>
                  <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                    <li>• Slope = acceleration</li>
                    <li>• Area under curve = displacement</li>
                    <li>• Horizontal line = constant velocity</li>
                    <li>• Straight line = uniform acceleration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-wrap gap-3">
            <Link href="/lab/theory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Theory Labs</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/lab/theory/laws-of-motion" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>Next: Laws of Motion</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>NEB/CDC Aligned • Class 11 Physics • Chapter 1: Kinematics</p>
        </footer>
      </main>
    </div>
  );
}
