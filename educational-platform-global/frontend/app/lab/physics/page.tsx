"use client";

import { useState } from "react";
import Link from "next/link";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

const LABS = [
  {
    "id": "ph-3d-dynamics",
    "title": "Dynamics 3D",
    "description": "Inclined plane, friction, elastic collision, momentum conservation.",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Dynamics"
  },
  {
    "id": "ph-3d-advanced",
    "title": "Physics 3D Advanced",
    "description": "Electromagnetism, wave optics, relativity, quantum orbitals.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Modern Physics"
  },
  {
    "id": "ph-3d-quantum",
    "title": "Quantum 3D",
    "description": "Quantum mechanics — orbitals, probability distributions, spin.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Modern Physics"
  },
  {
    "id": "ph-3d-wave",
    "title": "Wave Simulator 3D",
    "description": "Real-time 3D wave propagation.",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Waves"
  },
  {
    "id": "ph-3d-pendulum",
    "title": "Pendulum 3D",
    "description": "Pendulum with trail visualization.",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Oscillations"
  },
  {
    "id": "ph-3d-em",
    "title": "EM Wave 3D",
    "description": "EM wave propagation with E and B fields.",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: EM Waves"
  },
  {
    "id": "ph-3d-magnetic",
    "title": "Magnetic Field 3D",
    "description": "Bar magnet field lines.",
    "type": "3d",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Magnetism"
  },
  {
    "id": "ph-3d-vectors",
    "title": "Vector Addition 3D",
    "description": "3D vectors — components, dot/cross product.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Vectors"
  },
  {
    "id": "ph-3d-optics",
    "title": "Optics & Lens 3D",
    "description": "Ray diagrams for convex/concave lenses.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-refraction",
    "title": "Refraction 3D",
    "description": "Snell's law with TIR.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-3d-classic",
    "title": "Physics 3D Classic",
    "description": "Electric field, double pendulum.",
    "type": "3d",
    "status": "development",
    "color": "#3b82f6",
    "unit": "Unit: Classic"
  },
  {
    "id": "heat-determinations",
    "title": "Heat Determinations Suite",
    "description": "Lee's disc, Searle's bar, Newton cooling.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "lees-disc",
    "title": "Lee's Disc Experiment",
    "description": "Thermal conductivity of bad conductors.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "searles-bar",
    "title": "Searle's Bar Experiment",
    "description": "Thermal conductivity of good conductors.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "newton-cooling",
    "title": "Newton's Law of Cooling",
    "description": "Cooling constant k determination.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "linear-expansion",
    "title": "Linear Expansion",
    "description": "Coefficient of linear expansion.",
    "type": "3d",
    "status": "new",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "physics-mechanics-suite-3d",
    "title": "3D Mechanics Suite",
    "description": "Projectile, circular motion, momentum.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Mechanics"
  },
  {
    "id": "physics-elasticity-gas-suite-3d",
    "title": "3D Elasticity & Gas Suite",
    "description": "Hooke's law, Young's modulus, ideal gas.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Elasticity"
  },
  {
    "id": "physics-electricity-suite-3d",
    "title": "3D Electricity Suite",
    "description": "Capacitor, dielectric, meter bridge.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Electricity"
  },
  {
    "id": "physics-magnetism-emi-suite-3d",
    "title": "3D Magnetism & EMI Suite",
    "description": "Biot-Savart, Lorentz force, Faraday.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Magnetism"
  },
  {
    "id": "physics-wave-optics-suite-3d",
    "title": "3D Wave Optics Suite",
    "description": "Young's double slit, diffraction.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Wave Optics"
  },
  {
    "id": "physics-modern-suite-3d",
    "title": "3D Modern Physics Suite",
    "description": "Photoelectric, Bohr, semiconductors.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Modern"
  },
  {
    "id": "symbols-mechanics",
    "title": "Symbols — Mechanics",
    "description": "Pendulum & projectile labelled symbols.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Mechanics"
  },
  {
    "id": "symbols-electricity",
    "title": "Symbols — Electricity",
    "description": "Ohm's law circuit labelled.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Electricity"
  },
  {
    "id": "symbols-waves",
    "title": "Symbols — Waves",
    "description": "Travelling wave labelled.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Waves"
  },
  {
    "id": "symbols-atomic",
    "title": "Symbols — Atomic",
    "description": "Bohr model labelled.",
    "type": "3d",
    "status": "new",
    "color": "#3b82f6",
    "unit": "Unit: Atomic"
  },
  {
    "id": "ph-th-kinematics",
    "title": "Kinematics Theory",
    "description": "Equations of motion, projectile motion.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ph-th-laws",
    "title": "Laws of Motion Theory",
    "description": "Newton's laws, friction.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Dynamics"
  },
  {
    "id": "ph-th-work",
    "title": "Work & Energy Theory",
    "description": "Work-energy theorem, power.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Work Energy"
  },
  {
    "id": "ph-th-grav",
    "title": "Gravitation Theory",
    "description": "Universal gravitation, satellites.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Gravitation"
  },
  {
    "id": "ph-th-thermo",
    "title": "Thermodynamics Theory",
    "description": "Laws of thermo, heat engines.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Thermo"
  },
  {
    "id": "ph-th-optics",
    "title": "Optics Theory",
    "description": "Reflection, refraction, lenses.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-th-electro",
    "title": "Electrostatics Theory",
    "description": "Coulomb's law, capacitance.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Electrostatics"
  },
  {
    "id": "ph-th-current",
    "title": "Current Electricity Theory",
    "description": "Ohm's law, Kirchhoff's laws.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Current"
  },
  {
    "id": "ph-th-emw",
    "title": "EM Waves Theory",
    "description": "EM spectrum, polarization.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: EM Waves"
  },
  {
    "id": "ph-th-modern",
    "title": "Modern Physics Theory",
    "description": "Photoelectric effect, nuclear physics.",
    "type": "theory",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Modern"
  },
  {
    "id": "ph-calc-ohms",
    "title": "Ohm's Law Calc",
    "description": "Calculate V, I, R.",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Electricity"
  },
  {
    "id": "ph-calc-heat",
    "title": "Heat Calculator",
    "description": "Calorimetry, latent heat.",
    "type": "calculator",
    "status": "active",
    "color": "#ef4444",
    "unit": "Unit: Heat"
  },
  {
    "id": "ph-calc-optics",
    "title": "Optics Lab",
    "description": "Reflection, refraction.",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Optics"
  },
  {
    "id": "ph-calc-projectile",
    "title": "Projectile Motion",
    "description": "Launch projectiles.",
    "type": "calculator",
    "status": "active",
    "color": "#3b82f6",
    "unit": "Unit: Kinematics"
  },
  {
    "id": "ai-tutor",
    "title": "AI Lab Tutor",
    "description": "Get instant help.",
    "type": "calculator",
    "status": "premium",
    "color": "#f59e0b",
    "unit": "Premium"
  },
  {
    "id": "advanced-circuit",
    "title": "Advanced Circuit Simulator",
    "description": "50+ components.",
    "type": "calculator",
    "status": "premium",
    "color": "#f59e0b",
    "unit": "Premium"
  }
];

type Tab = "3d" | "theory" | "calculator";

export default function PhysicsLabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("3d");
  const filtered = LABS.filter((l) =>
    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#3b82f620" }}>
            <Cuboid className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Physics Lab 3D</h1>
            <p className="text-sm text-muted-foreground">42 interactive labs · Syllabus-aligned</p>
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
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "${lab.color}18" }}>
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
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: "${lab.color}40", color: lab.color, backgroundColor: "${lab.color}10" }}>{lab.unit ?? lab.type}</span>
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
          <p className="text-sm">No {activeTab} labs found for Physics.</p>
        </div>
      )}
    </div>
  );
}
