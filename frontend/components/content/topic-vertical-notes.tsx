"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { loadData } from "@/lib/data-loader";
import { MathMarkdown } from "@/components/content/math-markdown";
import { get3DComponentForTopic } from "@/lib/topic-3d-map";
import { SchematicDiagram } from "@/components/lab/schematic-diagram";
import { TopicMindMap } from "@/components/lab/topic-mindmap";
import { getHighYieldTopicData } from "@/lib/high-yield-topic-facts";
import {
  BookOpen,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  FileText,
  Calculator,
  ListOrdered,
  Layers,
  HelpCircle,
  TrendingUp,
  Brain,
  Zap,
  Atom,
  ExternalLink,
  Workflow,
  Scale,
  ShieldAlert,
  Target,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface RichTopicConcept {
  title?: string;
  unitSlug?: string;
  topicSlug?: string;
  topicTitle?: string;
  relevance?: number;
  notes?: string[];
  confusion?: string[];
  practice?: string[];
  universalFacts?: string[];
  examples?: string[];
  practiceQuestions?: string[];
  formulas?: string[];
  keyPoints?: string[];
  summary?: string;
  specialNotes?: string[];
  importantStatements?: string[];
  importantNotes?: string[];
  examShortTricks?: string[];
  examNotes?: string[];
  mcs?: Array<{ question: string; options: string[]; answer: string }>;
  importantConcepts?: string[];
  importantTasks?: string[];
  numericals?: string[];
  duplicateType?: number;
  animation3D?: string;
  motionGraphics?: string;
}

interface ManifestItem {
  unitSlug: string;
  topicSlug: string;
  title: string;
  noteCount: number;
  source: "ravikishan" | "r-export";
  duplicateType?: number;
  filename: string;
}

interface TopicVerticalNotesProps {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
}

// Boilerplate detector to reject placeholder strings
function isBoilerplate(text: string): boolean {
  if (!text) return true;
  return (
    /^Key Formula \d+:/i.test(text) ||
    /^Key Point \d+:/i.test(text) ||
    /^Example \d+:/i.test(text) ||
    /^Q\d+\.\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)/i.test(
      text
    )
  );
}

export function TopicVerticalNotes({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  topicTitle,
}: TopicVerticalNotesProps) {
  const [sources, setSources] = useState<Array<{ meta: ManifestItem; data: RichTopicConcept }>>([]);
  const [supplementary, setSupplementary] = useState<RichTopicConcept | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [visualTab, setVisualTab] = useState<"schematic" | "mindmap" | "3d">("schematic");

  // Interactive self-check quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

  // Visual Workspace Refresh & Animation Replay state
  const [visualKey, setVisualKey] = useState(0);
  const [isVisualRefreshing, setIsVisualRefreshing] = useState(false);

  const handleRefreshVisualWorkspace = () => {
    setIsVisualRefreshing(true);
    setVisualKey((k) => k + 1);
    setTimeout(() => setIsVisualRefreshing(false), 500);
  };

  // 1. Resolve 3D component if available
  const TopicVisual3D = useMemo(() => {
    return get3DComponentForTopic(topicSlug);
  }, [topicSlug]);

  // 2. Resolve High-Yield Topic Engine Data
  const highYield = useMemo(() => {
    return getHighYieldTopicData(subjectSlug, topicSlug, topicTitle);
  }, [subjectSlug, topicSlug, topicTitle]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Fetch primary syllabus-notes manifest
    const manifestPath = `syllabus-notes/${subjectSlug}/_manifest.json`;
    loadData<ManifestItem[]>(manifestPath)
      .then(async (manifest) => {
        if (cancelled) return;

        const relevant = manifest.filter(
          (m) => m.unitSlug === unitId && (m.topicSlug === topicSlug || m.filename.includes(topicSlug))
        );

        if (relevant.length > 0) {
          const loaded = await Promise.all(
            relevant.map(async (meta) => {
              try {
                const data = await loadData<RichTopicConcept>(
                  `syllabus-notes/${subjectSlug}/${unitId}/${meta.filename}`
                );
                return { meta, data };
              } catch {
                return null;
              }
            })
          );
          if (!cancelled) {
            const valid = loaded.filter((x): x is { meta: ManifestItem; data: RichTopicConcept } => x !== null);
            valid.sort((a, b) => (a.meta.duplicateType ?? 1) - (b.meta.duplicateType ?? 1));
            setSources(valid);
          }
        }

        // Fetch supplementary from ravikishan manifest if available
        try {
          const rkManifest = await loadData<Array<{ path: string; data: RichTopicConcept }>>("ravikishan/manifest.json");
          if (!cancelled) {
            const rkMatch = rkManifest.find((m) => {
              const parts = m.path.split("/");
              return (
                parts.includes(unitId) &&
                (m.data?.topicSlug === topicSlug || parts[parts.length - 1].includes(topicSlug))
              );
            });
            if (rkMatch) setSupplementary(rkMatch.data);
          }
        } catch {
          // Ignore if ravikishan manifest not present
        }

        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [subjectSlug, unitId, topicSlug]);

  const activeData = sources[activeSourceIndex]?.data || supplementary;

  // Extract raw lists
  const rawNotes = activeData?.notes ?? supplementary?.notes ?? [];
  const rawExamples = (activeData?.examples ?? supplementary?.examples ?? []).filter((e) => !isBoilerplate(e));
  const rawImportantConcepts = activeData?.importantConcepts ?? supplementary?.importantConcepts ?? [];
  const rawImportantNotes = activeData?.importantNotes ?? supplementary?.importantNotes ?? [];
  const rawImportantStatements = activeData?.importantStatements ?? supplementary?.importantStatements ?? [];
  const summary = activeData?.summary ?? supplementary?.summary;
  const rawUniversalFacts = activeData?.universalFacts ?? supplementary?.universalFacts ?? [];
  const rawSpecialNotes = activeData?.specialNotes ?? supplementary?.specialNotes ?? [];
  const rawConfusion = activeData?.confusion ?? supplementary?.confusion ?? [];
  const rawKeyPoints = (activeData?.keyPoints ?? supplementary?.keyPoints ?? []).filter((kp) => !isBoilerplate(kp));
  const rawFormulas = (activeData?.formulas ?? supplementary?.formulas ?? []).filter((f) => !isBoilerplate(f));
  const rawExamShortTricks = activeData?.examShortTricks ?? supplementary?.examShortTricks ?? [];
  const rawImportantTasks = activeData?.importantTasks ?? supplementary?.importantTasks ?? [];
  const rawPracticeQuestions = (activeData?.practiceQuestions ?? supplementary?.practiceQuestions ?? []).filter(
    (q) => !isBoilerplate(q)
  );
  const rawPractice = activeData?.practice ?? supplementary?.practice ?? [];
  const rawNumericals = activeData?.numericals ?? supplementary?.numericals ?? [];

  // Populate missing or boilerplate content using High-Yield Facts Engine
  const populatedFormulas = useMemo(() => {
    if (rawFormulas.length > 0) return rawFormulas;
    return highYield.speedFormulas.map(
      (sf) => `**${sf.name}**: $${sf.formula}$ — ${sf.description}${sf.dimensions ? ` [Dimension: $${sf.dimensions}$]` : ""}`
    );
  }, [rawFormulas, highYield]);

  const populatedExamples = useMemo(() => {
    if (rawExamples.length > 0) return rawExamples;
    return highYield.workedNumericals.map(
      (wn) => `**Problem:** ${wn.problem}\n\n**Given:** $${wn.given}$\n\n${wn.steps.join("\n\n")}\n\n**Result:** $${wn.answer}$`
    );
  }, [rawExamples, highYield]);

  const populatedKeyPoints = useMemo(() => {
    if (rawKeyPoints.length > 0) return rawKeyPoints;
    return highYield.keyTermsAndDefinitions.map(
      (kt) => `**${kt.term}**: ${kt.definition} *(Significance: ${kt.significance})*`
    );
  }, [rawKeyPoints, highYield]);

  // Generate 3 concept check questions from entrance traps
  const conceptCheckQuiz = useMemo(() => {
    return highYield.entranceTraps.slice(0, 3).map((trap, idx) => ({
      id: idx,
      question: `Entrance Concept Check: Which statement is scientifically accurate regarding "${trap.trap.slice(0, 40)}..."?`,
      options: [
        trap.trap, // The common misconception
        trap.truth, // The counter-intuitive correct answer
      ],
      correctIndex: 1,
      explanation: `${trap.truth} (${trap.examRef})`,
    }));
  }, [highYield]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading complete topic study materials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Source Switcher Tabs if multiple versions exist */}
      {sources.length > 1 && (
        <div className="rounded-2xl border border-border/70 bg-card p-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground px-2">
            Available Note Versions:
          </span>
          <div className="flex gap-1.5">
            {sources.map((s, idx) => {
              const isSelected = activeSourceIndex === idx;
              const typeNum = s.meta.duplicateType ?? (idx + 1);
              return (
                <button
                  key={s.meta.filename + idx}
                  onClick={() => setActiveSourceIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Version {typeNum} {typeNum === 1 ? "(Primary)" : "(Secondary)"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── CHEMISTRY QUICK LAUNCH BANNER ── */}
      {(subjectSlug.toLowerCase().includes("chem") ||
        topicTitle.toLowerCase().includes("element") ||
        topicTitle.toLowerCase().includes("atom")) && (
        <div className="rounded-3xl border border-teal-500/30 bg-teal-500/10 p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold shrink-0">
              <Atom className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Entrance &amp; NEB Essential
                </span>
                <h4 className="text-sm font-bold text-foreground">Interactive 118-Element Periodic Table &amp; CEE Questions</h4>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Explore electronic configurations, boiling/freezing points, past CEE entrance MCQs, speed formulas, and volatile/coinage metal filters.
              </p>
            </div>
          </div>
          <Link
            href="/periodic-table"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-md shrink-0"
          >
            <span>Open Periodic Table</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* ── 1. CONCEPTUAL DIAGRAM, CLEAR MINDMAP & 3D INTERACTIVE VISUAL ───────────────── */}
      <section className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FlaskConical className="h-5 w-5 text-sky-400" />
            <h3 className="text-base font-bold text-foreground">
              Visual Workspace: Interactive Schematics, Mindmaps &amp; 3D Simulations
            </h3>
          </div>

          {/* Visual Mode Switcher Tabs & Refresh Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRefreshVisualWorkspace}
              className="px-2.5 py-1 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="Refresh visual simulation, reset WebGL camera, and replay animations"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isVisualRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Visual</span>
            </button>

            <div className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/80 p-1 text-xs">
              <button
                onClick={() => setVisualTab("schematic")}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  visualTab === "schematic"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive Schematic</span>
              </button>
              <button
                onClick={() => setVisualTab("mindmap")}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  visualTab === "mindmap"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Workflow className="h-3.5 w-3.5" />
                <span>Clear Mindmap (5 Branches)</span>
              </button>
              {TopicVisual3D && (
                <button
                  onClick={() => setVisualTab("3d")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    visualTab === "3d"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>3D Visual</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {visualTab === "schematic" && (
            <SchematicDiagram
              key={`schem-${visualKey}`}
              subjectSlug={subjectSlug}
              topicSlug={topicSlug}
              topicTitle={topicTitle}
              unitId={unitId}
            />
          )}

          {visualTab === "mindmap" && (
            <TopicMindMap
              key={`mm-${visualKey}`}
              subjectSlug={subjectSlug}
              topicSlug={topicSlug}
              topicTitle={topicTitle}
              unitId={unitId}
            />
          )}

          {visualTab === "3d" && TopicVisual3D && (
            <div key={`3d-${visualKey}`} className="rounded-2xl border border-border/60 bg-background/50 overflow-hidden min-h-[380px] flex flex-col justify-center">
              <TopicVisual3D />
            </div>
          )}
        </div>
      </section>

      {/* ── 2. CEE & NEB HIGH-YIELD FACT BANK & CONSTANTS ─────────────────────── */}
      <section className="rounded-3xl border border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-emerald-500/20 bg-emerald-500/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Target className="h-5 w-5 text-emerald-500" />
            <div>
              <h3 className="text-base font-bold text-foreground">
                CEE &amp; NEB High-Yield Fact Bank
              </h3>
              <p className="text-xs text-muted-foreground">
                Governing Principles, Exact Physical Values, and 10-Second Calculation Shortcuts
              </p>
            </div>
          </div>
          <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Exam Guaranteed Points
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Governing Laws */}
          {highYield.governingLaws.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Official Governing Laws &amp; Validity Conditions:
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {highYield.governingLaws.map((law, idx) => (
                  <div key={idx} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground">{law.name}</h4>
                      <Scale className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{law.statement}</p>
                    <div className="pt-2 border-t border-emerald-500/20">
                      <MathMarkdown content={law.formula} className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400" />
                      <p className="text-[10px] text-muted-foreground italic mt-1">Constraint: {law.conditions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Physical Constants & Values Table */}
          {highYield.constantsAndValues.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Standard Physical Values &amp; Metric Constants:
              </span>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                {highYield.constantsAndValues.map((c, idx) => (
                  <div key={idx} className="rounded-xl border border-border/60 bg-muted/20 p-3 text-center">
                    <div className="text-xs font-mono font-bold text-primary truncate">
                      <MathMarkdown content={`$${c.symbol}$`} />
                    </div>
                    <div className="text-sm font-extrabold text-foreground mt-0.5">{c.value}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{c.name} ({c.unit})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High-Yield Entrance Traps */}
          {highYield.entranceTraps.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Entrance Trap Warnings (Past IOE / CEE Exam Goldmine):
                </span>
              </div>
              <div className="space-y-2.5">
                {highYield.entranceTraps.map((tr, idx) => (
                  <div key={idx} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold text-xs shrink-0 mt-0.5">TRAP:</span>
                      <p className="text-xs text-rose-400 line-through font-medium leading-relaxed">{tr.trap}</p>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-amber-500/10">
                      <span className="text-emerald-500 font-bold text-xs shrink-0 mt-0.5">TRUTH:</span>
                      <p className="text-xs text-foreground font-semibold leading-relaxed">{tr.truth}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold">
                        {tr.examRef}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CONCEPT BLOCK WITH WORKED NUMERICALS ──────────────────────── */}
      <section className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">
              Core Concept Explanations &amp; Step-by-Step Worked Problems
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            Theory &amp; Context
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Notes Paragraphs */}
          {rawNotes.length > 0 ? (
            <div className="space-y-4">
              {rawNotes.map((note, idx) => (
                <div key={idx} className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                  <MathMarkdown content={note} className="space-y-2 text-sm leading-relaxed text-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-5 space-y-2">
              <p className="text-sm text-foreground leading-relaxed">
                {highYield.title} covers essential fundamentals in {highYield.category}. Study the governing principles, speed formulas, and worked numericals populated below.
              </p>
            </div>
          )}

          {/* Important Concepts pills */}
          {rawImportantConcepts.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Key Conceptual Pillars:
              </span>
              <ul className="space-y-1.5 pl-2">
                {rawImportantConcepts.map((ic, i) => (
                  <li key={i} className="text-xs text-foreground flex items-start gap-2">
                    <span className="text-primary font-bold">&bull;</span>
                    <span>{ic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Worked Examples / Numericals */}
          {populatedExamples.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Step-by-Step Worked Numerical Problems:
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {populatedExamples.map((ex, i) => (
                  <div key={i} className="rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <h4 className="text-xs font-bold text-foreground">Worked Problem #{i + 1}</h4>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      <MathMarkdown content={ex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. IMPORTANT NOTES BLOCK ────────────────────────────────────── */}
      {(rawImportantNotes.length > 0 || rawImportantStatements.length > 0) && (
        <section className="rounded-3xl border border-amber-500/30 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="text-base font-bold text-foreground">Important Notes &amp; Governing Principles</h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              Exam Crucial
            </span>
          </div>

          <div className="p-6 space-y-4">
            {rawImportantNotes.map((inote, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">⚠️</span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">{inote}</p>
              </div>
            ))}

            {rawImportantStatements.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Mandatory Formal Statements &amp; Validity Conditions:
                </span>
                <div className="space-y-2">
                  {rawImportantStatements.map((stmt, idx) => (
                    <div key={idx} className="rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 text-xs text-foreground flex items-start gap-2">
                      <span className="text-amber-500 font-mono font-bold shrink-0">{idx + 1}.</span>
                      <span>{stmt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. SMART SUMMARIES & UNIVERSAL FACTS ─────────────────────────── */}
      {(summary || rawUniversalFacts.length > 0) && (
        <section className="rounded-3xl border border-emerald-500/30 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <h3 className="text-base font-bold text-foreground">Smart Summary &amp; Universal Facts</h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Quick Revision
            </span>
          </div>

          <div className="p-6 space-y-4">
            {summary && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  Core Summary
                </h4>
                <p className="text-sm text-foreground leading-relaxed">{summary}</p>
              </div>
            )}

            {rawUniversalFacts.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Universal Concept Truths:
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {rawUniversalFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-3 text-xs text-foreground">
                      <span className="text-emerald-500 font-bold shrink-0">★</span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6. SPECIAL NOTES & MISCONCEPTION TRAPS ───────────────────────── */}
      {(rawSpecialNotes.length > 0 || rawConfusion.length > 0) && (
        <section className="rounded-3xl border border-rose-500/30 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="h-5 w-5 text-rose-500" />
              <h3 className="text-base font-bold text-foreground">Special Notes &amp; Common Misconceptions</h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
              Traps &amp; Nuances
            </span>
          </div>

          <div className="p-6 space-y-4">
            {rawSpecialNotes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Special Context Notes:
                </span>
                {rawSpecialNotes.map((sn, idx) => (
                  <div key={idx} className="rounded-xl border border-border/50 bg-muted/20 p-3.5 text-xs text-foreground flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">&bull;</span>
                    <span>{sn}</span>
                  </div>
                ))}
              </div>
            )}

            {rawConfusion.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Common Confusion Traps:
                </span>
                <div className="space-y-2">
                  {rawConfusion.map((c, idx) => (
                    <div key={idx} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
                      <span className="text-rose-500 shrink-0 font-bold">❌/✅</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 7. KEY BULLET POINTS & DEFINITIONS ──────────────────────────── */}
      {populatedKeyPoints.length > 0 && (
        <section className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ListOrdered className="h-5 w-5 text-violet-400" />
              <h3 className="text-base font-bold text-foreground">Key Scientific Terms &amp; Definitions</h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400">
              High-Yield Points
            </span>
          </div>

          <div className="p-6">
            <ul className="space-y-3">
              {populatedKeyPoints.map((kp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-400 text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="leading-relaxed">
                    <MathMarkdown content={kp} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 8. FORMULAS & 10-SECOND SPEED TRICKS ─────────────────────────── */}
      {populatedFormulas.length > 0 && (
        <section className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calculator className="h-5 w-5 text-sky-400" />
              <h3 className="text-base font-bold text-foreground">Formulas &amp; Calculation Shortcuts</h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500">
              Formula Bank
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {populatedFormulas.map((f, idx) => (
                <div key={idx} className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                    Equation #{idx + 1}
                  </span>
                  <MathMarkdown content={f} className="text-sm font-semibold text-foreground font-mono" />
                </div>
              ))}
            </div>

            {rawExamShortTricks.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Exam Memory Tricks &amp; Mnemonics:
                </span>
                {rawExamShortTricks.map((trick, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs text-foreground">
                    <span className="text-amber-500 font-bold shrink-0">💡</span>
                    <span>{trick}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 9. INTERACTIVE 3-QUESTION CONCEPT CHECK QUIZ ─────────────────── */}
      {conceptCheckQuiz.length > 0 && (
        <section className="rounded-3xl border border-indigo-500/30 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-indigo-500/20 bg-indigo-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Brain className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-foreground">
                Quick 3-Question Self-Check Concept Quiz
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">
              Self-Test
            </span>
          </div>

          <div className="p-6 space-y-5">
            {conceptCheckQuiz.map((q, idx) => {
              const selectedAnswer = quizAnswers[q.id];
              const isRevealed = quizRevealed[q.id];

              return (
                <div key={q.id} className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="space-y-2 pl-7">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedAnswer === optIdx;
                      const isCorrect = optIdx === q.correctIndex;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                            setQuizRevealed((prev) => ({ ...prev, [q.id]: true }));
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                            isRevealed
                              ? isCorrect
                                ? "bg-emerald-500/15 border-emerald-500/40 text-foreground font-semibold"
                                : isChosen
                                ? "bg-rose-500/15 border-rose-500/40 text-foreground"
                                : "bg-card/60 border-border text-muted-foreground"
                              : "bg-card/80 border-border hover:border-primary/50 text-foreground"
                          }`}
                        >
                          <span className="leading-relaxed">{opt}</span>
                          {isRevealed && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isRevealed && (
                    <div className="ml-7 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-foreground">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Explanation: </span>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 10. IMPORTANT TASKS & PRACTICE QUESTIONS ─────────────────────── */}
      {(rawImportantTasks.length > 0 || rawPracticeQuestions.length > 0 || rawPractice.length > 0 || rawNumericals.length > 0) && (
        <section className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border/60 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h3 className="text-base font-bold text-foreground">
                Important Tasks, Practice Questions &amp; Numericals
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              Practice Tasks
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Important Tasks */}
            {rawImportantTasks.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Study Tasks to Complete:
                </span>
                <div className="space-y-2">
                  {rawImportantTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 p-3 text-xs text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Questions */}
            {rawPracticeQuestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Board-Style Conceptual Questions:
                </span>
                <div className="space-y-2">
                  {rawPracticeQuestions.map((q, idx) => (
                    <div key={idx} className="rounded-xl border border-border/50 bg-card p-3.5 text-xs text-foreground flex items-start gap-2.5">
                      <span className="font-bold text-primary shrink-0">Q{idx + 1}:</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Numericals */}
            {(rawNumericals.length > 0 || rawPractice.length > 0) && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                  Worked Numerical Problems:
                </span>
                <div className="space-y-2">
                  {[...rawNumericals, ...rawPractice].map((num, idx) => (
                    <div key={idx} className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3.5 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
                      <span className="text-sky-500 font-bold shrink-0">→</span>
                      <span>{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
