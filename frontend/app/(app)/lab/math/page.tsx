"use client";

import { useState } from "react";
import Link from "next/link";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

const LABS = [
  {
    "id": "math-3d-geometry",
    "title": "3D Geometry",
    "description": "Points, lines, planes in 3D.",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: 3D Geo"
  },
  {
    "id": "math-3d-surfaces",
    "title": "3D Mathematical Surfaces",
    "description": "Saddle, wave, ripple, peak surfaces.",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-3d-advanced",
    "title": "Mathematics 3D Advanced",
    "description": "Surfaces + contours, Mandelbulb.",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Vector Calc"
  },
  {
    "id": "math-3d-fourier",
    "title": "Fourier Series 3D",
    "description": "Square, sawtooth, triangle waves.",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Fourier"
  },
  {
    "id": "math-3d-decay",
    "title": "Nuclear Decay Simulator",
    "description": "Stochastic radioactive decay.",
    "type": "3d",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Exponential"
  },
  {
    "id": "symbols-math",
    "title": "Symbols — Mathematics",
    "description": "Unit circle with theta, sin, cos, tan.",
    "type": "3d",
    "status": "new",
    "color": "#8b5cf6",
    "unit": "Unit: Trig"
  },
  {
    "id": "math-th-calculus",
    "title": "Calculus Theory",
    "description": "Limits, derivatives, integrals.",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-th-trig",
    "title": "Trigonometry Theory",
    "description": "Identities, equations.",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Trig"
  },
  {
    "id": "math-th-algebra",
    "title": "Algebra Theory",
    "description": "Matrices, complex numbers.",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-th-stats",
    "title": "Statistics Theory",
    "description": "Probability, distributions.",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Stats"
  },
  {
    "id": "math-th-geo",
    "title": "Coordinate Geometry Theory",
    "description": "Lines, circles, conics.",
    "type": "theory",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Geo"
  },
  {
    "id": "math-th-theorems",
    "title": "Theorems Theory",
    "description": "All NEB theorem proofs from Class 11 & 12.",
    "type": "theory",
    "status": "development",
    "color": "#8b5cf6",
    "unit": "All Units"
  },
  {
    "id": "math-calc-deriv",
    "title": "Derivative Calculator",
    "description": "Compute derivatives.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-calc-quad",
    "title": "Quadratic Solver",
    "description": "Solve ax^2+bx+c=0.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-calc-stats",
    "title": "Statistics Calculator",
    "description": "Mean, median, mode.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Stats"
  },
  {
    "id": "math-calc-matrix",
    "title": "Matrix Calculator",
    "description": "Add, multiply, transpose.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "math-calc-trig",
    "title": "Trigonometry Lab",
    "description": "Unit circle, graphs.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Trig"
  },
  {
    "id": "math-calc-series",
    "title": "Sequences & Series",
    "description": "AP and GP.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Sequences"
  },
  {
    "id": "math-calc-vectors",
    "title": "Vector Operations",
    "description": "Dot/cross product.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "math-calc-limit",
    "title": "Limit Calculator",
    "description": "Estimate limits.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Calculus"
  },
  {
    "id": "math-calc-system",
    "title": "System Solver",
    "description": "2x2 and 3x3 systems.",
    "type": "calculator",
    "status": "active",
    "color": "#8b5cf6",
    "unit": "Unit: Algebra"
  },
  {
    "id": "equation-solver",
    "title": "Universal Equation Solver",
    "description": "Solve any equation.",
    "type": "calculator",
    "status": "premium",
    "color": "#f59e0b",
    "unit": "Premium"
  }
];

type Tab = "3d" | "theory" | "calculator";

export default function MathLabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("3d");
  const filtered = LABS.filter((l) =>
    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#8b5cf620" }}>
            <Cuboid className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Math Lab 3D</h1>
            <p className="text-sm text-muted-foreground">21 interactive labs · Syllabus-aligned</p>
          </div>
        </div>
        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">
          ← Back to all labs
        </Link>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        {(["3d", "theory", "calculator"] as const).map((t) => {
          const count = LABS.filter((l) => (t === "3d" ? l.type === "3d" : t === "theory" ? l.type === "theory" : l.type === "calculator")).length;
          const isActive = activeTab === t;
          return (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "3d" && <Cuboid className="h-4 w-4" />}
              {t === "theory" && <BookOpen className="h-4 w-4" />}
              {t === "calculator" && <Calculator className="h-4 w-4" />}
              <span className="capitalize">{t}</span>
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((lab) => (
          <Link key={lab.id} href={`/lab/${lab.id}`} className="block group">
            <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 h-full flex flex-col">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${lab.color}18` }}>
                  {lab.type === "3d" && <Cuboid className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "theory" && <BookOpen className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "calculator" && <Calculator className="h-4 w-4" style={{ color: lab.color }} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: `${lab.color}40`, color: lab.color, backgroundColor: `${lab.color}10` }}>{lab.unit ?? lab.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>
                  {lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">No {activeTab} labs found for Math.</p>
        </div>
      )}
    </div>
  );
}
