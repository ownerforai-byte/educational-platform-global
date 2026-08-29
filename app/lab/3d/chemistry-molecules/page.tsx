"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chemistry3DMolecules } from "@/components/lab/chemistry-3d-molecules";
import { ArrowLeft, FlaskConical, Terminal, RefreshCw, Maximize2, Minimize2, Share2, Bookmark, Atom as AtomIcon, Beaker, ChevronRight, Clock } from "lucide-react";

export default function ChemistryMolecules3DPage() {
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
            <span className="text-sm font-medium">3D Molecules</span>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">3D Molecular Structures</h1>
              <p className="mt-1 text-muted-foreground">
                Interactive 3D molecules with clearly labelled atoms, bonds, and molecular geometry
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
              <Terminal className="h-4 w-4 text-emerald-500" />
              <span>NEB/CDC Aligned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>5 Hours</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Animations & 3D Simulations */}
        <Card className="border-l-4 border-l-emerald-500 mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">1</span>
              🎬 Visual Animations & 3D Simulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden border-2 border-emerald-500/20 shadow-lg">
              <Chemistry3DMolecules />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100 mb-1">🎥 Animation</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">Bond rotation and molecular vibration visualization</p>
              </div>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100 mb-1">📊 Bond Angles</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">Live display of bond angles and lengths</p>
              </div>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100 mb-1">🎯 3D View</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">Interactive rotation with atom and bond labels</p>
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
                Chemical bonding and molecular geometry carries <strong>6-10 marks</strong> in Class 11 & 12 Chemistry. Students struggle with VSEPR theory application, predicting molecular shapes, and understanding bond polarity. NEB focuses heavily on Lewis structures and hybridization.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Common Exam Pitfalls</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Incorrect Lewis dot structures for polyatomic ions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Misidentifying lone pair vs bonding pair effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Confusing hybridization types (sp³ vs sp²d)</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">NEB Mark Distribution</p>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Lewis structures: 2-4 marks</li>
                  <li>• VSEPR shapes: 2-4 marks</li>
                  <li>• Hybridization: 2-3 marks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Complete Theory & Definitions */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">2</span>
                📖 Molecular Structure Theory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Molecular geometry determines chemical properties. VSEPR theory predicts shapes based on electron pair repulsion.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-4 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">⚛️ Common Molecules</p>
                  <table className="w-full text-xs mt-2">
                    <thead>
                      <tr className="border-b border-emerald-200 dark:border-emerald-800">
                        <th className="text-left py-1">Molecule</th>
                        <th className="text-left py-1">Shape</th>
                        <th className="text-left py-1">Bond Angle</th>
                      </tr>
                    </thead>
                    <tbody className="text-emerald-800 dark:text-emerald-200">
                      <tr><td className="py-1 font-mono">H₂O</td><td className="py-1">Bent</td><td className="py-1">104.5°</td></tr>
                      <tr><td className="py-1 font-mono">CO₂</td><td className="py-1">Linear</td><td className="py-1">180°</td></tr>
                      <tr><td className="py-1 font-mono">CH₄</td><td className="py-1">Tetrahedral</td><td className="py-1">109.5°</td></tr>
                      <tr><td className="py-1 font-mono">NH₃</td><td className="py-1">Trigonal Pyramidal</td><td className="py-1">107°</td></tr>
                      <tr><td className="py-1 font-mono">BF₃</td><td className="py-1">Trigonal Planar</td><td className="py-1">120°</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">🔄 VSEPR Theory</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li><strong>2 electron pairs:</strong> Linear (180°)</li>
                    <li><strong>3 electron pairs:</strong> Trigonal planar (120°)</li>
                    <li><strong>4 electron pairs:</strong> Tetrahedral (109.5°)</li>
                    <li><strong>5 electron pairs:</strong> Trigonal bipyramidal</li>
                    <li><strong>6 electron pairs:</strong> Octahedral (90°)</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">🧬 Hybridization</p>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li><strong>sp:</strong> 2 domains, linear (BeCl₂, CO₂)</li>
                    <li><strong>sp²:</strong> 3 domains, trigonal planar (BF₃)</li>
                    <li><strong>sp³:</strong> 4 domains, tetrahedral (CH₄)</li>
                    <li><strong>sp³d:</strong> 5 domains, trigonal bipyramidal</li>
                    <li><strong>sp³d²:</strong> 6 domains, octahedral (SF₆)</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">🎨 Bond Properties</p>
                  <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                    <li><strong>σ bond:</strong> Single bond, head-on overlap</li>
                    <li><strong>π bond:</strong> Double/triple bond, side overlap</li>
                    <li><strong>Bond length:</strong> Decreases with bond order</li>
                    <li><strong>Bond energy:</strong> Increases with bond order</li>
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
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Select Molecule</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Choose from H₂O, CO₂, CH₄, NH₃, C₆H₁₂O₆ and more</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">Toggle Labels</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Show/hide atom symbols, bond angles, and distances</p>
                </div>
                <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 p-4">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-100 mb-2">View from Angle</p>
                  <p className="text-xs text-teal-800 dark:text-teal-200">Rotate to see 3D geometry from any perspective</p>
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
          <p>Molecular Structure Visualizations • NEB/CDC Aligned • Class 11 & 12 Chemistry</p>
        </footer>
      </main>
    </div>
  );
}
