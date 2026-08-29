"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quantum3D } from "@/components/lab/quantum-3d";
import { ArrowLeft, Atom, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Orbit, Radio, Zap, ChevronRight, Clock } from "lucide-react";

export default function Quantum3DPage() {
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
            <span className="text-sm font-medium">Quantum 3D</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Atom className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Quantum Mechanics 3D</h1>
              <p className="mt-1 text-muted-foreground">
                Explore atomic orbitals, probability distributions, wave functions, and quantum spin in interactive 3D
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
              <Terminal className="h-4 w-4 text-purple-500" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>6 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-purple-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border-2 border-purple-500/20 shadow-lg">
              <Quantum3D />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-3 border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-purple-800 dark:text-purple-200">Time-dependent wave function evolution and orbital transitions</p>
              </div>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-3 border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-100 mb-1">📊 Probability</p>
                <p className="text-xs text-purple-800 dark:text-purple-200">Density plots and probability cloud visualizations</p>
              </div>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-3 border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-100 mb-1">🎯 3D Orbitals</p>
                <p className="text-xs text-purple-800 dark:text-purple-200">s, p, d, f orbital shapes with quantum number labels</p>
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
                Quantum mechanics forms <strong>Chapter 35-38</strong> in NEB Class 12 Physics (Modern Physics). Students struggle with wave-particle duality, Heisenberg's uncertainty principle, and interpreting orbital shapes. These concepts appear in <strong>8-12 marks</strong> in board exams.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing probability density |ψ|² with wave function ψ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Mixing up quantum numbers (n, l, mₗ, mₛ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Incorrect orbital shapes (p vs d orbitals)</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Wave-particle duality: 3-5 marks</li>
                  <li>• Quantum numbers: 2-4 marks</li>
                  <li>• Orbital identification: 2-3 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory & Definitions */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">2</span>
                📖 Quantum Mechanics Theory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Quantum mechanics describes nature at atomic and subatomic scales. Key principles include wave-particle duality, quantization, and probability.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">🔢 Quantum Numbers</p>
                  <table className="w-full text-xs mt-2">
                    <thead>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <th className="text-left py-1">Symbol</th>
                        <th className="text-left py-1">Name</th>
                        <th className="text-left py-1">Values</th>
                      </tr>
                    </thead>
                    <tbody className="text-purple-800 dark:text-purple-200">
                      <tr><td className="py-1 font-mono">n</td><td>Principal</td><td>1, 2, 3, ...</td></tr>
                      <tr><td className="py-1 font-mono">l</td><td>Azimuthal</td><td>0 to n-1</td></tr>
                      <tr><td className="py-1 font-mono">mₗ</td><td>Magnetic</td><td>-l to +l</td></tr>
                      <tr><td className="py-1 font-mono">mₛ</td><td>Spin</td><td>±½</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">🌊 Wave-Particle Duality</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                      <span><strong>de Broglie:</strong> λ = h/mv</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                      <span><strong>Planck:</strong> E = hf</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                      <span><strong>Heisenberg:</strong> Δx·Δp ≥ ℏ/2</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">⚛️ Atomic Orbitals</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li><strong>s orbital:</strong> l=0, spherical shape</li>
                    <li><strong>p orbital:</strong> l=1, dumbbell shape</li>
                    <li><strong>d orbital:</strong> l=2, cloverleaf shape</li>
                    <li><strong>f orbital:</strong> l=3, complex shape</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">📊 Schrödinger Equation</p>
                  <p className="text-center text-lg font-mono font-bold text-orange-700 dark:text-orange-300 my-2">
                    Ĥψ = Eψ
                  </p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">
                    Hamiltonian operator × wave function = Energy × wave function
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
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Select Orbital</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Choose from s, p, d, f orbitals with different quantum numbers</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Adjust n Value</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">See how orbital size increases with principal quantum number</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Probability View</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Toggle between wave function and probability density visualization</p>
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
          <p>Quantum Mechanics Visualizations • NEB/CDC Aligned • Class 12 Modern Physics</p>
        </footer>
      </main>
    </div>
  );
}
