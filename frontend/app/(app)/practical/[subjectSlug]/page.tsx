"use client";
export const dynamic = "force-dynamic";

import { use, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Search,
  BookOpen,
  Zap,
  Award,
  Activity,
  ArrowLeft,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { getPracticalBySlug, experimentSlug } from "@/lib/practical-syllabus";
import type { PracticalExperiment } from "@/lib/practical-syllabus";
import { PhysicsPracticalStudio } from "@/components/practical/physics-practical-studio";
import { ChemistryPracticalStudio } from "@/components/practical/chemistry-practical-studio";
import { BiologyPracticalStudio } from "@/components/practical/biology-practical-studio";
import { VivaVoceMastery } from "@/components/practical/viva-voce-mastery";
import { ObservationCalculationEngine } from "@/components/practical/observation-calculation-engine";

function ExperimentCard({
  experiment,
  notebookHref,
}: {
  experiment: PracticalExperiment;
  notebookHref: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all shadow-sm overflow-hidden">
      {/* The whole card opens the experiment's own practical-file page —
          deep write-ups live on routed pages, not inline on this listing. */}
      <Link
        href={notebookHref}
        className="absolute inset-0 z-0"
        aria-label={`Open practical file writeup: ${experiment.title}`}
      />
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            •
          </span>
          <div className="min-w-0">
            <span className="font-bold text-foreground text-sm truncate block">
              {experiment.title}
            </span>
            <p className="text-xs text-muted-foreground truncate">{experiment.aim}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {experiment.labHref && (
            <Link
              href={experiment.labHref}
              className="relative z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Interactive Lab <ExternalLink className="h-3 w-3" />
            </Link>
          )}
          <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Practical File</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PracticalSubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = use(params);
  const subject = getPracticalBySlug(subjectSlug);

  const [activeTab, setActiveTab] = useState<"simulator" | "syllabus" | "viva" | "calculator">("simulator");
  const [selectedGrade, setSelectedGrade] = useState<"all" | "class-11" | "class-12">("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (!subject) {
    return (
      <div className="mx-auto max-w-5xl py-20 px-4 text-center space-y-4">
        <p className="text-xl font-bold text-foreground">Practical Subject Not Found</p>
        <Link
          href="/practical"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Practical Subjects
        </Link>
      </div>
    );
  }

  const totalExperiments = subject.units.reduce(
    (sum, unit) => sum + unit.experiments.length,
    0
  );

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredUnits = subject.units
    .filter((unit) => selectedGrade === "all" || unit.grade === selectedGrade)
    .map((unit) => {
      if (!normalizedSearchQuery) return unit;
      const matchedExps = unit.experiments.filter((experiment) =>
        `${unit.title} ${experiment.title} ${experiment.aim} ${(experiment.theory ?? []).join(" ")}`
          .toLowerCase()
          .includes(normalizedSearchQuery),
      );
      return { ...unit, experiments: matchedExps };
    })
    .filter((unit) => unit.experiments.length > 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 py-6 md:py-10 px-4 sm:px-6">
      {/* Subject Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/80 to-background p-6 sm:p-8 shadow-xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${subject.colorClass}/5 pointer-events-none`}
        />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.colorClass} text-3xl shadow-lg`}
            >
              {subject.emoji}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  {subject.name}
                </h1>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
                  NEB Grade 11 &amp; 12
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {subject.description}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {subject.units.length} Units · {totalExperiments} Experiments
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/practical"
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Subjects
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "simulator"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border/60 hover:bg-muted text-muted-foreground"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>Interactive Visual Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("syllabus")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "syllabus"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border/60 hover:bg-muted text-muted-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Complete Practical Experiments ({totalExperiments})</span>
          </button>

          <button
            onClick={() => setActiveTab("viva")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "viva"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border/60 hover:bg-muted text-muted-foreground"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Viva Voce Mastery</span>
          </button>

          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "calculator"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border/60 hover:bg-muted text-muted-foreground"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Observation &amp; Graph Tool</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: INTERACTIVE VISUAL STUDIO */}
      {activeTab === "simulator" && (
        <div className="space-y-6">
          {subjectSlug === "physics" && <PhysicsPracticalStudio />}
          {subjectSlug === "chemistry" && <ChemistryPracticalStudio />}
          {subjectSlug === "biology" && <BiologyPracticalStudio />}
        </div>
      )}

      {/* TAB CONTENT 2: COMPLETE EXPERIMENTS SYLLABUS EXPLORER */}
      {activeTab === "syllabus" && (
        <div className="space-y-6">
          {/* Filters and Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-border/70 bg-card/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Class Filter:</span>
              {(["all", "class-11", "class-12"] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    selectedGrade === grade
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {grade === "all" ? "All Grades" : grade === "class-11" ? "Class 11" : "Class 12"}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px] flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                aria-label="Search practical experiments"
                placeholder="Search experiments by title or aim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-xl border border-border bg-card pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Units and Experiments List */}
          <div className="space-y-8">
            {filteredUnits.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No experiments match “{searchQuery}”.
              </p>
            ) : filteredUnits.map((unit, ui) => (
              <div key={unit.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${subject.colorClass} text-xs font-bold text-white shadow-md`}
                  >
                    {ui + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{unit.title}</h2>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                      {unit.grade === "class-11" ? "NEB Class 11 Practical Unit" : "NEB Class 12 Practical Unit"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {unit.experiments.map((exp) => (
                    <ExperimentCard
                      key={experimentSlug(exp)}
                      experiment={exp}
                      notebookHref={`/practical/${subjectSlug}/${experimentSlug(exp)}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: VIVA VOCE MASTERY */}
      {activeTab === "viva" && (
        <VivaVoceMastery subjectFilter={subjectSlug as any} />
      )}

      {/* TAB CONTENT 4: OBSERVATION & GRAPH CALCULATOR */}
      {activeTab === "calculator" && <ObservationCalculationEngine />}
    </div>
  );
}
