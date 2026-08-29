"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Scale, ChevronRight, Zap, RotateCw } from "lucide-react";
import { LawsOfMotionSimulation } from "@/components/lab/laws-of-motion-simulation";

export default function LawsOfMotionTheoryPage() {
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
            <span className="text-sm font-medium">Laws of Motion</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <Scale className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Physics Theory: Laws of Motion</h1>
              <p className="mt-1 text-muted-foreground">
                Chapter 2: Newton's Laws with Force Analysis, Friction, and Applications — NEB/CDC Class 11
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
              <span>Class 11</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>6 Hours</span>
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
            <div className="rounded-lg overflow-hidden border border-indigo-200 dark:border-indigo-800">
              <LawsOfMotionSimulation />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Interactive pulley systems and inclined planes with force vectors</p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">📊 Graph</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Force vs acceleration, friction analysis</p>
              </div>
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-3">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">🎯 3D View</p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">Free body diagrams in 3D space</p>
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
                Laws of Motion carries <strong>10-15 marks</strong> in Class 11 board exams. Students consistently struggle with tension in pulley systems, friction on inclined planes, and distinguishing between action-reaction pairs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Forgetting that action-reaction act on different objects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing static and kinetic friction directions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Wrong sign convention for inclined plane components</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Pulley system problems: 5-10 marks</li>
                  <li>• Inclined plane with friction: 3-8 marks</li>
                  <li>• Free body diagram questions: 2-5 marks</li>
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
                📜 Newton's First Law of Motion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border-2 border-blue-200 dark:border-blue-800">
                <p className="text-center text-lg font-semibold text-blue-900 dark:text-blue-100">
                  "Every object continues in its state of rest or of uniform motion in a straight line unless compelled by some external force to act otherwise."
                </p>
              </div>
              
              <p className="text-muted-foreground">
                This law introduces the concept of <strong>inertia</strong> — the natural tendency of objects to resist changes in their state of motion. The mass of an object is the measure of its inertia.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">3</span>
                📜 Newton's Second Law of Motion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The second law quantifies the relationship between force, mass, and acceleration. It states that the rate of change of momentum is directly proportional to the applied force and takes place in the direction of force.
              </p>
              
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border-2 border-green-200 dark:border-green-800">
                <p className="text-center text-3xl font-mono font-bold text-green-800 dark:text-green-200">
                  F = ma
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">Force = Mass × Acceleration</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">4</span>
                📜 Newton's Third Law of Motion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border-2 border-purple-200 dark:border-purple-800">
                <p className="text-center text-lg font-semibold text-purple-900 dark:text-purple-100">
                  "To every action, there is always an equal and opposite reaction."
                </p>
              </div>
              
              <p className="text-muted-foreground">
                Action and reaction forces act on <strong>different objects</strong>. This is why they never cancel each other out.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">Example: Walking</p>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    You push ground backward (action) → Ground pushes you forward (reaction)
                  </p>
                </div>
                
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">Example: Rocket</p>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Gas pushed downward (action) → Rocket pushed upward (reaction)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">5</span>
                🔄 Friction and Its Laws
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong>Friction</strong> is the force that opposes relative motion between surfaces in contact. It arises due to microscopic irregularities and molecular adhesion.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border-2 border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">Static Friction (fs)</p>
                  <p className="text-center text-lg font-mono font-bold text-orange-700 dark:text-orange-300 my-2">
                    fs ≤ μsN
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">Maximum value just before motion starts</p>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border-2 border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">Kinetic Friction (fk)</p>
                  <p className="text-center text-lg font-mono font-bold text-orange-700 dark:text-orange-300 my-2">
                    fk = μkN
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">Acts when object is moving</p>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border-2 border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">Limiting Friction</p>
                  <p className="text-center text-lg font-mono font-bold text-orange-700 dark:text-orange-300 my-2">
                    fs(max) = μsN
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">Just sufficient to start motion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold">6</span>
                🎨 Free Body Diagrams (FBD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A <strong>Free Body Diagram</strong> shows all forces acting on a single object, drawn as arrows originating from the object's center of mass.
              </p>
              
              <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-3">Steps to Draw FBD</p>
                <ol className="text-sm text-teal-800 dark:text-teal-200 space-y-2 list-decimal list-inside">
                  <li>Isolate the object of interest</li>
                  <li>Draw the object as a dot or simple shape</li>
                  <li>Draw all forces acting ON the object as arrows pointing away</li>
                  <li>Label each force clearly (Weight, Normal, Tension, Friction, Applied)</li>
                  <li>Choose convenient coordinate axes and resolve forces into components</li>
                  <li>Apply Newton's second law: ΣF = ma</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-pink-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white text-sm font-bold">7</span>
                🔧 Applications: Pulley Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong>Atwood Machine</strong> — Two masses connected by a string over a pulley:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-pink-50 dark:bg-pink-950/30 p-4 border-2 border-pink-200 dark:border-pink-800">
                  <p className="text-sm font-semibold text-pink-900 dark:text-pink-100 mb-2">Acceleration</p>
                  <p className="text-center text-xl font-mono font-bold text-pink-700 dark:text-pink-300 my-2">
                    a = (m₁ - m₂)g/(m₁ + m₂)
                  </p>
                  <p className="text-xs text-pink-800 dark:text-pink-200 text-center">Assuming m₁ > m₂</p>
                </div>
                
                <div className="rounded-lg bg-pink-50 dark:bg-pink-950/30 p-4 border-2 border-pink-200 dark:border-pink-800">
                  <p className="text-sm font-semibold text-pink-900 dark:text-pink-100 mb-2">Tension</p>
                  <p className="text-center text-xl font-mono font-bold text-pink-700 dark:text-pink-300 my-2">
                    T = 2m₁m₂g/(m₁ + m₂)
                  </p>
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
            <Link href="/lab/theory/kinematics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span>Previous: Kinematics</span>
            </Link>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>NEB/CDC Aligned • Class 11 Physics • Chapter 2: Laws of Motion</p>
        </footer>
      </main>
    </div>
  );
}
