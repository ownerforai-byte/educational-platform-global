import React from "react";
import Link from "next/link";
import { getEducationLevels } from "@/lib/curriculum";
import { SYLLABUS } from "@/lib/syllabus";
import {
  Compass,
  GraduationCap,
  BookOpen,
  Layers,
  ArrowRight,
  Atom,
  Binary,
  Target,
  FileCheck2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Curriculum Levels & Academic Tracks | Global STEM Hub",
  description:
    "Explore NEB Class 11, Class 12, CEE Entrance, Loksewa GK, and Interactive 3D STEM laboratories structured according to official curricula.",
};

export default async function LevelsPage() {
  let dbLevels: Array<{ id: string; name: string; slug: string; description?: string | null }> = [];
  try {
    const fetched = await getEducationLevels();
    if (Array.isArray(fetched)) {
      dbLevels = fetched;
    }
  } catch {
    dbLevels = [];
  }

  const class11Units = SYLLABUS[0].subjects.reduce((sum, s) => sum + s.units.length, 0);
  const class11Hours = SYLLABUS[0].subjects.reduce(
    (sum, s) => sum + s.units.reduce((uSum, u) => uSum + (u.hours ?? 0), 0),
    0
  );

  const class12Units = SYLLABUS[1].subjects.reduce((sum, s) => sum + s.units.length, 0);
  const class12Hours = SYLLABUS[1].subjects.reduce(
    (sum, s) => sum + s.units.reduce((uSum, u) => uSum + (u.hours ?? 0), 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Compass className="h-3.5 w-3.5" />
              <span>Official Curriculum &amp; Career Pathways</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Academic Levels &amp; Specialization Tracks
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore national NEB +2 science syllabi, interactive 3D laboratory modules, competitive
              CEE / IOE entrance preparation, and public service exam curricula — all indexed with chapter notes, verified derivations, and theorem proofs.
            </p>
          </div>

          {/* Aggregate Overview Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md p-3.5 min-w-[120px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5 text-sky-500" />
                <span>NEB Grades</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-1">XI &amp; XII</p>
              <p className="text-[10px] text-muted-foreground">12 Science Courses</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md p-3.5 min-w-[120px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-violet-500" />
                <span>Syllabus Units</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-1">{class11Units + class12Units}</p>
              <p className="text-[10px] text-muted-foreground">Official CDC 2076</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md p-3.5 min-w-[120px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Atom className="h-3.5 w-3.5 text-emerald-500" />
                <span>Interactive Labs</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-1">48+</p>
              <p className="text-[10px] text-muted-foreground">3D WebGL Engines</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-md p-3.5 min-w-[120px]">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span>Teaching Hours</span>
              </div>
              <p className="text-2xl font-black text-foreground mt-1">{class11Hours + class12Hours}</p>
              <p className="text-[10px] text-muted-foreground">Accredited Scope</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Core Tracks Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Primary Academic &amp; Preparation Tracks
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select your active focus area to enter the dedicated learning dashboard.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. NEB Class 11 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-sky-500/[0.08] via-card to-card p-6 shadow-sm hover:border-sky-500/50 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shadow-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  Grade XI Track
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mt-4 tracking-tight">
                NEB Class 11 (Grade XI)
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Foundational +2 Science: mechanics, heat &amp; thermodynamics, physical chemistry, cell biology, calculus, algebra, and national languages.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                  6 Subjects
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-sky-500" />
                  {class11Units} Units
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-sky-500" />
                  {class11Hours}h
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                {SYLLABUS[0].subjects.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/class-11-notes/${s.slug}`}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card/90 border border-border/70 text-foreground/90 hover:border-sky-500/50 hover:text-sky-500 hover:bg-sky-500/5 transition-all"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex gap-2">
                <Link
                  href="/derivations/class-11-notes/physics"
                  className="text-[11px] font-medium text-muted-foreground hover:text-sky-500 underline"
                >
                  Derivations
                </Link>
                <span className="text-muted-foreground/40">·</span>
                <Link
                  href="/theorems/class-11-notes/mathematics"
                  className="text-[11px] font-medium text-muted-foreground hover:text-sky-500 underline"
                >
                  Proofs
                </Link>
              </div>
              <Link
                href="/class-11-notes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Enter Class 11</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. NEB Class 12 */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-violet-500/[0.08] via-card to-card p-6 shadow-sm hover:border-violet-500/50 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500 border border-violet-500/20 shadow-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  Grade XII Board
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mt-4 tracking-tight">
                NEB Class 12 (Grade XII)
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Advanced Board Exam Curriculum: wave optics, electromagnetism, modern physics, organic chemistry, physiology, genetics, and calculus.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-violet-500" />
                  6 Subjects
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-violet-500" />
                  {class12Units} Units
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-violet-500" />
                  {class12Hours}h
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                {SYLLABUS[1].subjects.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/class-12-notes/${s.slug}`}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card/90 border border-border/70 text-foreground/90 hover:border-violet-500/50 hover:text-violet-500 hover:bg-violet-500/5 transition-all"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex gap-2">
                <Link
                  href="/derivations/class-12-notes/physics"
                  className="text-[11px] font-medium text-muted-foreground hover:text-violet-500 underline"
                >
                  Derivations
                </Link>
                <span className="text-muted-foreground/40">·</span>
                <Link
                  href="/theorems/class-12-notes/mathematics"
                  className="text-[11px] font-medium text-muted-foreground hover:text-violet-500 underline"
                >
                  Proofs
                </Link>
              </div>
              <Link
                href="/class-12-notes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Enter Class 12</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 3. STEM 3D Laboratories */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-emerald-500/[0.08] via-card to-card p-6 shadow-sm hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
                  <Atom className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Interactive STEM
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mt-4 tracking-tight">
                3D STEM Virtual Laboratories
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Hands-on WebGL 3D simulations: Cell Organelles 3D Studio, Physics Mechanics, Optics, Electromagnetism, and interactive 118 Elements Periodic Table.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Atom className="h-3.5 w-3.5 text-emerald-500" />
                  48+ Engines
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  WebGL Accelerated
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                <Link
                  href="/lab/bio-3d-organelles"
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card/90 border border-border/70 text-foreground/90 hover:border-emerald-500/50 hover:text-emerald-500 transition-all"
                >
                  🧬 Cell Organelles 3D
                </Link>
                <Link
                  href="/periodic-table"
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card/90 border border-border/70 text-foreground/90 hover:border-emerald-500/50 hover:text-emerald-500 transition-all"
                >
                  ⚛️ 118 Periodic Table
                </Link>
                <Link
                  href="/graphs"
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-card/90 border border-border/70 text-foreground/90 hover:border-emerald-500/50 hover:text-emerald-500 transition-all"
                >
                  📈 Science Graphs
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Physics · Chem · Bio</span>
              <Link
                href="/lab"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch 3D Labs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 4. Entrance Preparation */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-amber-500/[0.08] via-card to-card p-6 shadow-sm hover:border-amber-500/50 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm">
                  <Target className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Entrance Track
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mt-4 tracking-tight">
                CEE &amp; Engineering Entrance
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Medical Common Entrance Examination (CEE) and IOE / KU Engineering preparation with high-yield chapter MCQs, speed drills, and mock tests.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                  High-Yield MCQs
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  Timed Mock Exams
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  MBBS / BDS
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  IOE Pulchowk
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  B.Sc CSIT
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  Pharmacy
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Practice Question Bank</span>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 5. Loksewa Aayog & GK */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-teal-500/[0.08] via-card to-card p-6 shadow-sm hover:border-teal-500/50 hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 border border-teal-500/20 shadow-sm">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-bold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Public Service
                </span>
              </div>

              <h3 className="text-xl font-black text-foreground mt-4 tracking-tight">
                Loksewa GK &amp; Civil Service
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Comprehensive preparation for Nepal Public Service Commission (Loksewa Aayog), Teacher Service (TSC), and banking: Constitution, geography, history &amp; GK.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-teal-500" />
                  Nepal Constitution
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                  National GK Bank
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  Kharidar
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  Nayab Subba
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  Section Officer
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">
                  Banking
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Loksewa Study Modules</span>
              <Link
                href="/loksewa"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Enter Loksewa Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 6. Dynamic Database Catalog Levels (if registered) */}
          {dbLevels.map((level) => (
            <div
              key={level.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mt-4">{level.name}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {level.description || "Browse all study content, units, and learning objectives in this registered level."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50">
                <Link
                  href={`/levels/${level.slug}`}
                  className="flex items-center justify-between text-xs font-bold text-primary hover:underline"
                >
                  <span>Browse Content Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparative Curriculum Matrix */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Curriculum Structure &amp; Feature Comparison
          </h2>
          <p className="text-xs text-muted-foreground">
            A cross-sectional view of resources, tools, and assessments available for each level.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="py-3 px-4 font-semibold">Track Name</th>
                <th className="py-3 px-4 font-semibold">Official Code</th>
                <th className="py-3 px-4 font-semibold">Syllabus Basis</th>
                <th className="py-3 px-4 font-semibold">Interactive Labs</th>
                <th className="py-3 px-4 font-semibold">Derivations &amp; Proofs</th>
                <th className="py-3 px-4 font-semibold text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground/90">
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  NEB Class 11 Science
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">Grade XI</td>
                <td className="py-3.5 px-4">NEB 2076 / CDC</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">✓ 3D Cell &amp; Mechanics</td>
                <td className="py-3.5 px-4 text-violet-600 dark:text-violet-400 font-semibold">✓ 40+ Stepwise</td>
                <td className="py-3.5 px-4 text-right">
                  <Link href="/class-11-notes" className="font-semibold text-sky-500 hover:underline">
                    Open Hub →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  NEB Class 12 Science
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">Grade XII</td>
                <td className="py-3.5 px-4">NEB 2078 / CDC</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">✓ Wave Optics &amp; Physiology</td>
                <td className="py-3.5 px-4 text-violet-600 dark:text-violet-400 font-semibold">✓ 50+ Stepwise</td>
                <td className="py-3.5 px-4 text-right">
                  <Link href="/class-12-notes" className="font-semibold text-violet-500 hover:underline">
                    Open Hub →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  STEM Virtual Labs
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">STEM-3D</td>
                <td className="py-3.5 px-4">Experimental Science</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">✓ 48+ Simulations</td>
                <td className="py-3.5 px-4 text-muted-foreground">—</td>
                <td className="py-3.5 px-4 text-right">
                  <Link href="/lab" className="font-semibold text-emerald-500 hover:underline">
                    Launch Labs →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  CEE / IOE Entrance
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">MEC / IOE</td>
                <td className="py-3.5 px-4">Competitive Exam</td>
                <td className="py-3.5 px-4 text-muted-foreground">—</td>
                <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-semibold">Formula Cheatsheets</td>
                <td className="py-3.5 px-4 text-right">
                  <Link href="/quiz" className="font-semibold text-amber-500 hover:underline">
                    Practice →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                  Loksewa Aayog GK
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">PSC Nepal</td>
                <td className="py-3.5 px-4">Civil Service Standard</td>
                <td className="py-3.5 px-4 text-muted-foreground">—</td>
                <td className="py-3.5 px-4 text-muted-foreground">—</td>
                <td className="py-3.5 px-4 text-right">
                  <Link href="/loksewa" className="font-semibold text-teal-500 hover:underline">
                    Enter Hub →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
