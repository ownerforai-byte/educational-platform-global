"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  Zap,
  Microscope,
  Award,
  Sparkles,
  Search,
  BookOpen,
  Atom,
  Flame,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getPracticalSubjects } from "@/lib/practical-syllabus";
import { PhysicsPracticalStudio } from "@/components/practical/physics-practical-studio";
import { ChemistryPracticalStudio } from "@/components/practical/chemistry-practical-studio";
import { BiologyPracticalStudio } from "@/components/practical/biology-practical-studio";
import { VivaVoceMastery } from "@/components/practical/viva-voce-mastery";
import { ObservationCalculationEngine } from "@/components/practical/observation-calculation-engine";

export default function PracticalLandingPage() {
  const subjects = getPracticalSubjects();
  const [activeTab, setActiveTab] = useState<"overview" | "simulators" | "viva" | "calculations">("overview");
  const [activeSimSubject, setActiveSimSubject] = useState<"physics" | "chemistry" | "biology">("physics");
  const [searchQuery, setSearchQuery] = useState("");

  const totalExperimentsCount = subjects.reduce(
    (sum, s) => sum + s.units.reduce((uSum, u) => uSum + u.experiments.length, 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-6 md:py-10 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/80 to-background p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NEB Class 11 & 12 Advanced Practical Laboratory Suite</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
              Virtual Science Practicals &amp; <br />
              <span className="bg-gradient-to-r from-sky-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                Pro Practical Examination Studio
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Master the complete practical syllabus for <strong>Physics, Chemistry, and Biology</strong>.
              Experience high-fidelity apparatus simulations, pro-grade theoretical principles, step-by-step
              laboratory procedures, live calculation workbenches, and official examiner Viva Voce mastery.
            </p>
          </div>

          {/* Key Stats Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 border border-border/60 px-3.5 py-2">
              <FlaskConical className="h-4 w-4 text-primary" />
              <span className="font-bold text-foreground">{totalExperimentsCount}+ Standard Experiments</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 border border-border/60 px-3.5 py-2">
              <Zap className="h-4 w-4 text-sky-500" />
              <span className="font-bold text-foreground">Interactive 2D/3D Apparatus Workbench</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 border border-border/60 px-3.5 py-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="font-bold text-foreground">Official Viva Voce Examiner Prep</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "overview", label: "Subject Practical Syllabi", icon: BookOpen },
            { id: "simulators", label: "Virtual Apparatus Simulators", icon: Zap },
            { id: "viva", label: "Viva Voce Examination Prep", icon: Award },
            { id: "calculations", label: "Live Observation & Graph Tool", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SUBJECT PRACTICAL SYLLABI OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Practical Subjects Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            {subjects.map((subject) => {
              const totalExperiments = subject.units.reduce(
                (sum, unit) => sum + unit.experiments.length,
                0
              );
              const class11Units = subject.units.filter((u) => u.grade === "class-11");
              const class12Units = subject.units.filter((u) => u.grade === "class-12");

              return (
                <div
                  key={subject.slug}
                  className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-md hover:border-primary/50 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div
                    className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${subject.colorClass} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.colorClass} text-3xl shadow-lg`}
                      >
                        {subject.emoji}
                      </div>
                      <span className="rounded-full bg-muted border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                        {totalExperiments} Experiments
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {subject.name}
                      </h2>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {subject.description}
                      </p>
                    </div>

                    {/* Grade breakdown badges */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-muted-foreground font-medium">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        Class 11: {class11Units.length} Units
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-muted-foreground font-medium">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        Class 12: {class12Units.length} Units
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Link
                      href={`/practical/${subject.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all group-hover:shadow-sm"
                    >
                      <span>Explore {subject.name.split(" ")[0]} Practical Suite</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NEB Practical Exam Scoring Scheme Card */}
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card/80 via-card to-background p-6 sm:p-8 space-y-4 shadow-lg">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <h3 className="text-base font-bold text-foreground">
                NEB Practical Examination 25 Marks Scheme &amp; Marking Criteria
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In the NEB (+2) Board Practical Examination for Physics, Chemistry, and Biology, 25 marks are awarded based on three rigorous components:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">1. Practical Experiment</span>
                  <span className="font-black text-sky-500 font-mono text-sm">15 Marks</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Apparatus setup (3m), correct procedural execution (4m), accurate observations &amp; graph (5m), and calculated results with precautions (3m).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">2. Practical Record File</span>
                  <span className="font-black text-amber-500 font-mono text-sm">5 Marks</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Clean, certified laboratory notebook containing all standard experiments with complete theory, tabulated readings, and hand-drawn diagrams.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">3. Viva Voce Examination</span>
                  <span className="font-black text-emerald-500 font-mono text-sm">5 Marks</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Oral examination by the external inspector testing foundational theory, formulas, sources of error, units, and real-world applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VIRTUAL APPARATUS SIMULATORS */}
      {activeTab === "simulators" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSimSubject("physics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSimSubject === "physics"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "border border-border/60 hover:bg-muted text-muted-foreground"
              }`}
            >
              <Atom className="h-4 w-4" /> Physics Apparatus Studio
            </button>
            <button
              onClick={() => setActiveSimSubject("chemistry")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSimSubject === "chemistry"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "border border-border/60 hover:bg-muted text-muted-foreground"
              }`}
            >
              <FlaskConical className="h-4 w-4" /> Chemistry Apparatus Studio
            </button>
            <button
              onClick={() => setActiveSimSubject("biology")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSimSubject === "biology"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "border border-border/60 hover:bg-muted text-muted-foreground"
              }`}
            >
              <Microscope className="h-4 w-4" /> Biology Apparatus Studio
            </button>
          </div>

          {activeSimSubject === "physics" && <PhysicsPracticalStudio />}
          {activeSimSubject === "chemistry" && <ChemistryPracticalStudio />}
          {activeSimSubject === "biology" && <BiologyPracticalStudio />}
        </div>
      )}

      {/* TAB 3: VIVA VOCE EXAMINATION PREP */}
      {activeTab === "viva" && <VivaVoceMastery />}

      {/* TAB 4: LIVE OBSERVATION & CALCULATION ENGINE */}
      {activeTab === "calculations" && <ObservationCalculationEngine />}
    </div>
  );
}
