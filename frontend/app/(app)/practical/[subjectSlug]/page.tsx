"use client";
export const dynamic = "force-dynamic";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Target,
  Beaker,
  ListChecks,
  ScrollText,
  BookOpenCheck,
  ExternalLink,
  Lightbulb,
  Search,
  BookOpen,
  Zap,
  Award,
  Activity,
  Printer,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Atom,
  Microscope,
  FileText,
} from "lucide-react";
import { getPracticalBySlug } from "@/lib/practical-syllabus";
import type { PracticalExperiment, PracticalUnit } from "@/lib/practical-syllabus";
import { PhysicsPracticalStudio } from "@/components/practical/physics-practical-studio";
import { ChemistryPracticalStudio } from "@/components/practical/chemistry-practical-studio";
import { BiologyPracticalStudio } from "@/components/practical/biology-practical-studio";
import { VivaVoceMastery } from "@/components/practical/viva-voce-mastery";
import { ObservationCalculationEngine } from "@/components/practical/observation-calculation-engine";
import { PracticalNotebookModal } from "@/components/practical/practical-notebook-modal";

function Section({
  icon: Icon,
  title,
  children,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
          : "rounded-xl border border-border/50 bg-muted/20 p-4"
      }
    >
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className={`h-4 w-4 ${accent ? "text-amber-500" : "text-primary"}`} />
        <h4
          className={`text-xs font-bold uppercase tracking-wider ${
            accent ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
          }`}
        >
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function ExperimentCard({
  experiment,
  onOpenNotebook,
}: {
  experiment: PracticalExperiment;
  onOpenNotebook: (exp: PracticalExperiment) => void;
}) {
  const [open, setOpen] = useState(false);
  const ToggleIcon = open ? ChevronUp : ChevronDown;

  return (
    <div className="rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all shadow-sm overflow-hidden">
      <div
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            •
          </span>
          <span className="font-bold text-foreground text-sm truncate">{experiment.title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenNotebook(experiment);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Notebook Record</span>
          </button>

          {experiment.labHref && (
            <Link
              href={experiment.labHref}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Interactive Lab <ExternalLink className="h-3 w-3" />
            </Link>
          )}

          <ToggleIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4 bg-background/50">
          <Section icon={Target} title="Objective & Aim">
            <p className="text-sm text-foreground leading-relaxed font-medium">{experiment.aim}</p>
          </Section>

          {experiment.requirement && experiment.requirement.length > 0 && (
            <Section icon={Beaker} title="Apparatus & Reagents Required">
              <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/90">
                {experiment.requirement.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          {experiment.theory && experiment.theory.length > 0 && (
            <Section icon={Lightbulb} title="Theoretical Principles & Derivations">
              <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                {experiment.theory.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </Section>
          )}

          {experiment.procedure && experiment.procedure.length > 0 && (
            <Section icon={ListChecks} title="Step-by-Step Practical Procedure">
              <ol className="space-y-2">
                {experiment.procedure.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed">
                    <span className="shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {experiment.observation && experiment.observation.length > 0 && (
            <Section icon={ScrollText} title="Observations & Recorded Values">
              <ul className="list-disc pl-5 space-y-1 text-xs text-foreground">
                {experiment.observation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          {experiment.calculation && experiment.calculation.length > 0 && (
            <Section icon={BookOpenCheck} title="Calculations & Formulae">
              <div className="space-y-1 font-mono text-xs text-foreground bg-muted/40 p-3 rounded-xl border border-border/40">
                {experiment.calculation.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </Section>
          )}

          {experiment.result && (
            <Section icon={ScrollText} title="Final Result & Conclusion">
              <p className="text-sm font-semibold text-foreground leading-relaxed">{experiment.result}</p>
            </Section>
          )}

          {experiment.precautions && experiment.precautions.length > 0 && (
            <Section icon={Lightbulb} title="Essential Precautions & Error Sources" accent>
              <ul className="list-disc pl-5 space-y-1 text-xs text-foreground">
                {experiment.precautions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenNotebook(experiment)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <FileText className="h-4 w-4" />
              <span>Open Certified Practical File Blueprint</span>
            </button>
          </div>
        </div>
      )}
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
  const [modalExperiment, setModalExperiment] = useState<PracticalExperiment | null>(null);

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

  const filteredUnits = subject.units
    .filter((unit) => selectedGrade === "all" || unit.grade === selectedGrade)
    .map((unit) => {
      if (!searchQuery) return unit;
      const matchedExps = unit.experiments.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.aim.toLowerCase().includes(searchQuery.toLowerCase())
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
                type="text"
                placeholder="Search experiments by title or aim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-xl border border-border bg-card pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Units and Experiments List */}
          <div className="space-y-8">
            {filteredUnits.map((unit, ui) => (
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
                      key={exp.title}
                      experiment={exp}
                      onOpenNotebook={(e) => setModalExperiment(e)}
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

      {/* Practical Record Notebook Modal */}
      <PracticalNotebookModal
        experiment={modalExperiment}
        subjectName={subject.name}
        onClose={() => setModalExperiment(null)}
      />
    </div>
  );
}
