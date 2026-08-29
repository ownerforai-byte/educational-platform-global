"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Calculator, ExternalLink, Eye, FlaskConical, Zap, Atom, Move3d, RotateCw, FileText, GraduationCap, CheckCircle2, ChevronRight, Lightbulb, Target, Clock, Brain, Sigma, SquareFunction } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SYLLABUS, SubjectSyllabus, SyllabusUnit } from "@/lib/syllabus";
import { motion, AnimatePresence } from "framer-motion";

const CLASS_11_SLUG = "class-11-notes";

function getClass11Data() {
  return SYLLABUS.find((c) => c.slug === CLASS_11_SLUG);
}

const PHYSICS_DEEP_THEORY = {
  "physical-quantities-and-measurement": [
    {
      id: "sig-figs",
      title: "Significant Figures & Precision",
      type: "concept",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">What are Significant Figures?</h4>
            <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Significant figures are the digits in a measurement that are known with certainty plus one estimated digit. They indicate the precision of a measurement.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Rules for Counting Sig Figs</h4>
              <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li><strong>Non-zero digits:</strong> Always significant (1-9)</li>
                <li><strong>Zeros between non-zeros:</strong> Significant (101 → 3 sig figs)</li>
                <li><strong>Leading zeros:</strong> NOT significant (0.001 → 1 sig fig)</li>
                <li><strong>Trailing zeros after decimal:</strong> Significant (2.50 → 3 sig figs)</li>
                <li><strong>Trailing zeros without decimal:</strong> Ambiguous</li>
              </ul>
            </div>
            
            <div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Examples</h4>
              <div class="text-sm text-purple-800 dark:text-purple-200 space-y-2">
                <div class="flex justify-between"><span>0.00450</span><Badge variant="secondary">3 sig figs</Badge></div>
                <div class="flex justify-between"><span>2.050</span><Badge variant="secondary">4 sig figs</Badge></div>
                <div class="flex justify-between"><span>1500</span><Badge variant="secondary">2-4 sig figs</Badge></div>
                <div class="flex justify-between"><span>3.14 × 10⁸</span><Badge variant="secondary">3 sig figs</Badge></div>
              </div>
            </div>
          </div>
          
          <div class="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
            <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Operations with Significant Figures</h4>
            <div class="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Multiplication/Division</p>
                <p class="text-xs text-amber-700 dark:text-amber-300">Result has same sig figs as least precise measurement</p>
                <p class="text-xs text-amber-700 dark:text-amber-300 mt-1">Example: 2.5 × 3.42 = 8.6 (2 sig figs)</p>
              </div>
              <div>
                <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Addition/Subtraction</p>
                <p class="text-xs text-amber-700 dark:text-amber-300">Result has same decimal places as least precise</p>
                <p class="text-xs text-amber-700 dark:text-amber-300 mt-1">Example: 12.11 + 0.3 = 12.4 (1 decimal place)</p>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: "dimensions",
      title: "Dimensions and Dimensional Analysis",
      type: "formula",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Base Dimensions</h4>
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-blue-200 dark:border-blue-800">
                  <th class="text-left py-2 text-blue-900 dark:text-blue-100">Quantity</th>
                  <th class="text-left py-2 text-blue-900 dark:text-blue-100">Symbol</th>
                  <th class="text-left py-2 text-blue-900 dark:text-blue-100">Dimension</th>
                </tr>
              </thead>
              <tbody class="text-blue-800 dark:text-blue-200">
                <tr class="border-b border-blue-100 dark:border-blue-900"><td class="py-2">Mass</td><td class="py-2 font-mono">M</td><td class="py-2">[M]</td></tr>
                <tr class="border-b border-blue-100 dark:border-blue-900"><td class="py-2">Length</td><td class="py-2 font-mono">L</td><td class="py-2">[L]</td></tr>
                <tr class="border-b border-blue-100 dark:border-blue-900"><td class="py-2">Time</td><td class="py-2 font-mono">T</td><td class="py-2">[T]</td></tr>
                <tr class="border-b border-blue-100 dark:border-blue-900"><td class="py-2">Current</td><td class="py-2 font-mono">A</td><td class="py-2">[A]</td></tr>
                <tr class="border-b border-blue-100 dark:border-blue-900"><td class="py-2">Temperature</td><td class="py-2 font-mono">K</td><td class="py-2">[K]</td></tr>
              </tbody>
            </table>
          </div>
          
          <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Uses of Dimensional Analysis</h4>
            <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li><strong>Checking correctness:</strong> Both sides must have same dimensions</li>
              <li><strong>Deriving formulas:</strong> When relationship between quantities is known</li>
              <li><strong>Converting units:</strong> From one system to another</li>
              <li className="text-green-700 dark:text-green-300 italic">Limitation: Cannot determine dimensionless constants</li>
            </ul>
          </div>
        </div>
      `,
    },
  ],
  
  "vectors": [
    {
      id: "vector-laws",
      title: "Vector Addition Laws",
      type: "derivation",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Triangle Law of Vector Addition</h4>
            <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
              If two vectors are represented by two sides of a triangle taken in order, their resultant is represented by the third side taken in opposite order.
            </p>
            <div class="bg-white dark:bg-gray-900 p-3 rounded text-center font-mono text-sm">
              <p>R² = A² + B² + 2AB cos θ</p>
              <p class="text-xs text-muted-foreground mt-1">Where θ = angle between vectors</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Parallelogram Law</h4>
            <div class="grid md:grid-cols-2 gap-3 mt-3">
              <div class="bg-white dark:bg-gray-900 p-3 rounded text-center font-mono text-sm">
                <p>R = √(A² + B² + 2AB cos θ)</p>
              </div>
              <div class="bg-white dark:bg-gray-900 p-3 rounded text-center font-mono text-sm">
                <p>tan α = (B sin θ)/(A + B cos θ)</p>
                <p class="text-xs text-muted-foreground mt-1">α = angle of resultant with A</p>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: "scalar-product",
      title: "Scalar (Dot) Product",
      type: "formula",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Definition</h4>
            <div class="bg-white dark:bg-gray-900 p-4 rounded text-center">
              <p class="font-mono text-xl">A · B = |A||B|cos θ</p>
              <p class="text-sm text-muted-foreground mt-2">Where θ is the angle between the vectors</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Properties</h4>
            <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>Commutative: A · B = B · A</li>
              <li>Distributive: A · (B + C) = A · B + A · C</li>
              <li>A · A = |A|²</li>
              <li>If A · B = 0, vectors are perpendicular</li>
            </ul>
          </div>
          
          <div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
            <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Applications</h4>
            <ul class="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>Work done: W = F · d</li>
              <li>Power: P = F · v</li>
              <li>Finding angle between vectors</li>
              <li>Projection of one vector on another</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "vector-product",
      title: "Vector (Cross) Product",
      type: "formula",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Definition</h4>
            <div class="bg-white dark:bg-gray-900 p-4 rounded text-center">
              <p class="font-mono text-xl">A × B = |A||B|sin θ n̂</p>
              <p class="text-sm text-muted-foreground mt-2">n̂ = unit vector perpendicular to both A and B</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
            <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Right-Hand Rule</h4>
            <p class="text-sm text-amber-800 dark:text-amber-200">
              Point fingers in direction of A, curl towards B, thumb points in direction of A × B
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Properties</h4>
              <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>NOT commutative: A × B = −(B × A)</li>
                <li>A × A = 0</li>
                <li>If A × B = 0, vectors are parallel</li>
                <li>Distributive: A × (B + C) = A × B + A × C</li>
              </ul>
            </div>
            
            <div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Applications</h4>
              <ul class="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>Torque: τ = r × F</li>
                <li>Angular momentum: L = r × p</li>
                <li>Magnetic force: F = q(v × B)</li>
                <li>Finding area of parallelogram</li>
              </ul>
            </div>
          </div>
        </div>
      `,
    },
  ],
  
  "kinematics": [
    {
      id: "equations-motion",
      title: "Equations of Motion (Derivation)",
      type: "derivation",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">First Equation: v = u + at</h4>
            <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">From v-t graph, acceleration is the slope:</p>
            <div class="bg-white dark:bg-gray-900 p-4 rounded">
              <p class="font-mono">a = (v - u)/t</p>
              <p class="font-mono">v = u + at</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Second Equation: s = ut + ½at²</h4>
            <p class="text-sm text-green-800 dark:text-green-200 mb-3">Displacement = Area under v-t graph:</p>
            <div class="bg-white dark:bg-gray-900 p-4 rounded">
              <p class="font-mono">s = Area = ½(u + v) × t</p>
              <p class="font-mono">Substituting v = u + at:</p>
              <p class="font-mono">s = ut + ½at²</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
            <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Third Equation: v² = u² + 2as</h4>
            <div class="bg-white dark:bg-gray-900 p-4 rounded">
              <p class="font-mono">From v = u + at and s = ut + ½at²</p>
              <p class="font-mono">Eliminating t:</p>
              <p class="font-mono">v² = u² + 2as</p>
            </div>
          </div>
          
          <div class="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
            <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Notes</h4>
            <ul class="text-sm text-amber-800 dark:text-amber-200 space-y-1">
              <li>Apply only when acceleration is constant/uniform</li>
              <li>Sign convention is crucial (choose positive direction)</li>
              <li>For free fall: replace a with g (= 9.8 m/s²)</li>
              <li>Choose appropriate equation based on known quantities</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "projectile-motion",
      title: "Projectile Motion",
      type: "derivation",
      content: `
        <div class="space-y-4">
          <div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Analysis of Projectile Motion</h4>
            <p class="text-sm text-blue-800 dark:text-blue-200">
              Horizontal motion: uniform (no acceleration)<br/>
              Vertical motion: uniformly accelerated (gravity)
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-4">
            <div class="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Time of Flight</h4>
              <div class="bg-white dark:bg-gray-900 p-3 rounded text-center">
                <p class="font-mono">T = 2u sin θ / g</p>
              </div>
            </div>
            
            <div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Maximum Height</h4>
              <div class="bg-white dark:bg-gray-900 p-3 rounded text-center">
                <p class="font-mono">H = u² sin² θ / 2g</p>
              </div>
            </div>
            
            <div class="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">
              <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Horizontal Range</h4>
              <div class="bg-white dark:bg-gray-900 p-3 rounded text-center">
                <p class="font-mono">R = u² sin 2θ / g</p>
              </div>
            </div>
          </div>
          
          <div class="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">NEB Exam Focus</h4>
            <ul class="text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>Derive equations from first principles</li>
              <li>Calculate range for different angles</li>
              <li>Show that range is maximum at θ = 45°</li>
              <li>Prove that complementary angles give same range</li>
            </ul>
          </div>
        </div>
      `,
    },
  ],
};

export default function PhysicsPage() {
  const [activeTab, setActiveTab] = useState("theory");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const class11Data = getClass11Data();
  const physicsSubject = class11Data?.subjects.find((s) => s.slug === "physics");
  const physicsUnits = physicsSubject?.units || [];

  const getUnitContent = (unitId: string) => {
    return PHYSICS_DEEP_THEORY[unitId] || [];
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Link href="/class-11">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Physics XI</h1>
          </div>
          <p className="text-muted-foreground">
            Complete NEB/CDC aligned theory with derivations, examples, and exam focus
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">{physicsUnits.length} Units</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
          <Target className="h-4 w-4" />
          <span className="text-sm font-medium">88 Hours Total</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm font-medium">NEB Aligned</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Unit to Study</h2>
        <div className="grid gap-3">
          {physicsUnits.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id === selectedUnit ? null : unit.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedUnit === unit.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{unit.title}</h3>
                  <p className="text-sm text-muted-foreground">{unit.hours} Hours • {unit.topics.length} Topics</p>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${selectedUnit === unit.id ? "rotate-90" : ""}`} />
              </div>
              
              {selectedUnit === unit.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border">
                  <div className="space-y-2">
                    {unit.topics.slice(0, 5).map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                    {unit.topics.length > 5 && (
                      <p className="text-xs text-muted-foreground">+{unit.topics.length - 5} more topics</p>
                    )}
                  </div>
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedUnit && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
            <span>{physicsUnits.find(u => u.id === selectedUnit)?.title}</span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deep-theory">Deep Theory</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="exams">Exam Focus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Unit Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Select a topic from the left panel to view detailed theory content with formulas, derivations, and exam-focused notes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deep-theory" className="mt-4">
              {getUnitContent(selectedUnit).map((topic) => (
                <Card key={topic.id} className="mb-4 border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {topic.type === "derivation" && <RotateCw className="h-5 w-5" />}
                      {topic.type === "formula" && <Calculator className="h-5 w-5" />}
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent dangerouslySetInnerHTML={{ __html: topic.content }} />
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="formulas" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Formulas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-primary/5 border border-primary/20">
                      <p className="font-mono text-sm">v = u + at</p>
                      <p className="text-xs text-muted-foreground">First equation of motion</p>
                    </div>
                    <div className="p-3 rounded bg-primary/5 border border-primary/20">
                      <p className="font-mono text-sm">s = ut + ½at²</p>
                      <p className="text-xs text-muted-foreground">Second equation of motion</p>
                    </div>
                    <div className="p-3 rounded bg-primary/5 border border-primary/20">
                      <p className="font-mono text-sm">v² = u² + 2as</p>
                      <p className="text-xs text-muted-foreground">Third equation of motion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exams" className="mt-4">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    NEB/CDC Exam Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">
                      <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">High Priority Topics</h4>
                      <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                        <li>• Vector operations (dot and cross product)</li>
                        <li>• Equations of motion and projectile motion</li>
                        <li>• Newton's laws and friction problems</li>
                        <li>• Work-energy theorem applications</li>
                        <li>• Circular motion and gravitation</li>
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Long Answer (5-10 marks)</h4>
                        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                          <li>• Derive formulas from first principles</li>
                          <li>• Solve numerical problems step-by-step</li>
                          <li>• Draw and label complete diagrams</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Short Answer (2-5 marks)</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• Define key terms with examples</li>
                          <li>• State laws and principles</li>
                          <li>• Differentiate between concepts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!selectedUnit && (
        <div className="rounded-lg bg-muted/50 p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start Learning Physics</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Select any unit above to access comprehensive theory with detailed derivations, worked examples, and exam-focused content.
          </p>
        </div>
      )}
    </div>
  );
}
