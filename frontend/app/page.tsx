"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MathModern3D
} from "@/components/lab/math-modern-3d";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { PhysicsLab } from "@/components/lab/physics-lab";
import { BiologyLab } from "@/components/lab/biology-lab";
import {
  FlaskConical,
  Beaker,
  Atom,
  Microscope,
  ArrowRight,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const [activeLab, setActiveLab] = useState<string>("math");

  const labCards = [
    { key: "math", label: "Math", icon: Atom, desc: "3D geometry, calculus & vectors", color: "from-blue-500 to-cyan-500" },
    { key: "chemistry", label: "Chemistry", icon: Beaker, desc: "Molecules, reactions & stoichiometry", color: "from-emerald-500 to-teal-500" },
    { key: "physics", label: "Physics", icon: FlaskConical, desc: "Optics, gravitation & heat", color: "from-violet-500 to-purple-500" },
    { key: "biology", label: "Biology", icon: Microscope, desc: "Cells, plants & human body", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Hero / Introduction */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Manim Educativo</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Interactive 3D visualisations for NEB Class 11 &amp; 12 science. Explore concepts in Math, Chemistry, Physics and Biology with animated simulations.
            </p>
          </div>
          <Link
            href="/subjects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            Explore Subjects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Quick access cards */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/subjects", label: "Subjects", icon: BookOpen, color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20" },
            { href: "/lab", label: "Science Lab", icon: FlaskConical, color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20" },
            { href: "/chat", label: "AI Tutor", icon: Sparkles, color: "from-violet-500/10 to-purple-500/10 border-violet-500/20" },
            { href: "/levels", label: "Curriculum", icon: GraduationCap, color: "from-amber-500/10 to-orange-500/10 border-amber-500/20" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group flex flex-col items-center gap-2 rounded-xl border ${card.color} bg-gradient-to-br p-4 text-center hover:scale-[1.02] transition-transform`}
              >
                <Icon className="h-6 w-6 text-foreground" />
                <span className="text-sm font-semibold text-foreground">{card.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Science Lab Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Science Lab
          </h2>
          <Link
            href="/lab"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View all labs <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {labCards.map((lab) => (
            <button
              key={lab.key}
              onClick={() => setActiveLab(lab.key)}
              className={`flex-1 min-w-[100px] px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeLab === lab.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {lab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden min-h-[400px]">
          {activeLab === "math" && <MathModern3D />}
          {activeLab === "chemistry" && <ChemistryLab />}
          {activeLab === "physics" && <PhysicsLab />}
          {activeLab === "biology" && <BiologyLab />}
        </div>
      </div>
    </div>
  );
}
