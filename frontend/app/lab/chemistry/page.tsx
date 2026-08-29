"use client";

import { useState } from "react";
import Link from "next/link";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

const LABS = [
  {
    "id": "ch-3d-periodic",
    "title": "Periodic Table 3D",
    "description": "Interactive 3D periodic table.",
    "type": "3d",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Periodicity"
  },
  {
    "id": "ch-3d-advanced",
    "title": "Chemistry 3D Advanced",
    "description": "Molecular dynamics, VSEPR, spectroscopy.",
    "type": "3d",
    "status": "new",
    "color": "#10b981",
    "unit": "Unit: All"
  },
  {
    "id": "ch-3d-micro",
    "title": "Microscopy 3D",
    "description": "Atomic structure, orbitals, crystal lattice.",
    "type": "3d",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Atomic"
  },
  {
    "id": "ch-th-atomic",
    "title": "Atomic Structure Theory",
    "description": "Bohr model, quantum numbers.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Atomic"
  },
  {
    "id": "ch-th-bonding",
    "title": "Chemical Bonding Theory",
    "description": "Ionic, covalent, VSEPR.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Bonding"
  },
  {
    "id": "ch-th-eq",
    "title": "Equilibrium Theory",
    "description": "Le Chatelier's principle.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Equilibrium"
  },
  {
    "id": "ch-th-thermo",
    "title": "Thermochemistry Theory",
    "description": "Enthalpy, entropy, Gibbs.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Thermo"
  },
  {
    "id": "ch-th-kinetics",
    "title": "Chemical Kinetics Theory",
    "description": "Reaction rates, activation energy.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Kinetics"
  },
  {
    "id": "ch-th-acid",
    "title": "Acid-Base Theory",
    "description": "pH, pOH, buffers.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Acid-Base"
  },
  {
    "id": "ch-th-redox",
    "title": "Redox Theory",
    "description": "Oxidation-reduction, cells.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Redox"
  },
  {
    "id": "ch-th-organic",
    "title": "Organic Chemistry Theory",
    "description": "Hydrocarbons, nomenclature.",
    "type": "theory",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Organic"
  },
  {
    "id": "ch-calc-ph",
    "title": "pH Calculator",
    "description": "Calculate pH.",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Acid-Base"
  },
  {
    "id": "ch-calc-titration",
    "title": "Titration Simulator",
    "description": "Strong acid-strong base.",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Equilibrium"
  },
  {
    "id": "ch-calc-gas",
    "title": "Gas Laws Calc",
    "description": "Boyle's, Charles's law.",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Gases"
  },
  {
    "id": "ch-calc-molarmass",
    "title": "Molar Mass Calc",
    "description": "Enter formula, get mass.",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Stoichiometry"
  },
  {
    "id": "ch-calc-stoich",
    "title": "Stoichiometry Lab",
    "description": "Moles, limiting reagent.",
    "type": "calculator",
    "status": "active",
    "color": "#10b981",
    "unit": "Unit: Stoichiometry"
  },
  {
    "id": "molecular-builder",
    "title": "Molecular Builder 3D",
    "description": "Build molecules.",
    "type": "3d",
    "status": "premium",
    "color": "#f59e0b",
    "unit": "Premium"
  }
];

type Tab = "3d" | "theory" | "calculator";

export default function ChemistryLabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("3d");
  const filtered = LABS.filter((l) =>
    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#10b98120" }}>
            <Cuboid className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Chemistry Lab 3D</h1>
            <p className="text-sm text-muted-foreground">17 interactive labs · Syllabus-aligned</p>
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
          <p className="text-sm">No {activeTab} labs found for Chemistry.</p>
        </div>
      )}
    </div>
  );
}
