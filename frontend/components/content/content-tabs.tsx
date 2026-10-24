"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Download,
  ExternalLink,
  FileQuestion,
  FileText,
  Globe2,
  Lightbulb,
  Link2,
  ListChecks,
  Loader2,
  Lock,
  NotebookPen,
  PanelTop,
  Pencil,
  Plus,
  ScrollText,
  StickyNote,
  Target,
  Trash2,
  Zap,
} from "lucide-react";
import { RavikishanTopicResources } from "./ravikishan-topic-resources";
import { ConceptFieldPanel, type RavikishanConceptField } from "./ravikishan-concept-panels";
import { EmptyState } from "./empty-state";
import { AnalyticalGeometryResources } from "./analytical-geometry-resources";
import { LimitsContinuityResources } from "./limits-continuity-resources";
import { LogicSetsResources } from "./logic-sets-resources";
import { FunctionsResources } from "./functions-resources";
import { CurveSketchingResources } from "./curve-sketching-resources";
import { SequenceSeriesResources } from "./sequence-series-resources";
import { MatricesDeterminantsResources } from "./matrices-determinants-resources";
import { QuadraticEquationResources } from "./quadratic-equation-resources";
import { ComplexNumberResources } from "./complex-number-resources";
import { DifferentiationResources } from "./differentiation-resources";
import { ApplicationDerivativesResources } from "./application-derivatives-resources";
import { AntiderivativesResources } from "./antiderivatives-resources";
import { NumericalIntegrationResources } from "./numerical-integration-resources";
import { TrigonometryResources } from "./trigonometry-resources";
import { VectorsResources } from "./vectors-resources";
import { StatisticsProbabilityResources } from "./statistics-probability-resources";
import { getTopicPath } from "@/features/syllabus/content-router";
import { getTopicEntryBySlug } from "@/lib/syllabus";
import type { SyllabusUnit } from "@/lib/syllabus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DOCS, type Doc } from "@/lib/docs-catalog";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/access-level";
import {
  useDeleteR1Journal,
  useR1Journal,
  useSaveR1Journal,
} from "@/features/r1/hooks";
import type { R1JournalEntry } from "@/lib/api/r1";

type ContentTabsProps = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  unit?: SyllabusUnit;
};

type ResourceSpec = {
  title: string;
  description: string;
  component: ComponentType;
  match: (unitId: string, subjectSlug: string, topicSlug: string) => boolean;
};

const ALGEBRA_SECTION = {
  title: "Algebra Resources",
  description:
    "Interactive resources for logic, functions, curve sketching, sequences, matrices, quadratic equations, and complex numbers.",
};

const ALGEBRA_TOPIC_RESOURCES: {
  keyword: string;
  title: string;
  description: string;
  component: ComponentType;
}[] = [
  { keyword: "logic", title: "Logic & Sets", description: "Statement logic, set operations, and Venn diagram applications.", component: LogicSetsResources },
  { keyword: "function", title: "Functions", description: "Domain, range, composition, inverse functions, and types of functions.", component: FunctionsResources },
  { keyword: "curve", title: "Curve Sketching", description: "Increasing/decreasing intervals, maxima/minima, and concavity analysis.", component: CurveSketchingResources },
  { keyword: "sequence", title: "Sequences & Series", description: "AP/GP, convergence tests, mean value theorem, and series sums.", component: SequenceSeriesResources },
  { keyword: "matrice", title: "Matrices & Determinants", description: "Matrix operations, determinants, and solving linear systems.", component: MatricesDeterminantsResources },
  { keyword: "quadratic", title: "Quadratic Equations", description: "Factorization, completing the square, and nature of roots.", component: QuadraticEquationResources },
  { keyword: "complex", title: "Complex Numbers", description: "Argand diagram, polar form, and De Moivre's theorem.", component: ComplexNumberResources },
];

const UNIT_RESOURCES: ResourceSpec[] = [
  { title: "Analytical Geometry Resources", description: "PDF exercise solutions, theory summaries, and interactive conic section & straight-line visualizations for this unit.", component: AnalyticalGeometryResources, match: (u, s) => u === "analytic-geometry" && s === "mathematics" },
  { title: "Trigonometry Resources", description: "Interactive unit circle, inverse trigonometric functions, and trigonometric equation solver.", component: TrigonometryResources, match: (u, s) => u === "trigonometry" && s === "mathematics" },
  { title: "Vectors Resources", description: "Interactive 2D vector diagrams, dot product visualization, and linear dependence explorer.", component: VectorsResources, match: (u, s) => u === "vectors" && s === "mathematics" },
  { title: "Statistics & Probability Resources", description: "Interactive data dispersion analyzer, probability simulator, and binomial distribution visualizer.", component: StatisticsProbabilityResources, match: (u, s) => u === "statistics-and-probability" && s === "mathematics" },
  { title: "Limits and Continuity Resources", description: "Interactive limit visualizations, continuity analysis, and theory summaries for this unit.", component: LimitsContinuityResources, match: (u, s) => u === "limits-and-continuity" && s === "mathematics" },
  { title: "Differentiation Resources", description: "Interactive derivative calculators, tangent/normal visualizations, and theory summaries.", component: DifferentiationResources, match: (u, s) => u === "differentiation" && s === "mathematics" },
  { title: "Application of Derivatives", description: "Tangent/normal lines, max/min, increasing/decreasing intervals, rate of change.", component: ApplicationDerivativesResources, match: (u, s) => u === "application-of-derivatives" && s === "mathematics" },
  { title: "Antiderivatives & Integration", description: "Indefinite integrals, definite integrals, area under curves, and fundamental theorem.", component: AntiderivativesResources, match: (u, s) => u === "antiderivatives" && s === "mathematics" },
  { title: "Numerical Integration", description: "Trapezoidal rule, Simpson's rule, and numerical approximation methods.", component: NumericalIntegrationResources, match: (u, s) => u === "numerical-integration" && s === "mathematics" },
];

// Nepali Math XI unit capsules (Mat. 007). Each unit's Resources tab leads with
// exactly one capsule; the four calculus sub-units all belong to Unit 6.
const MATH_NEPALI_CAPSULES: Record<number, { name: string; file: string }> = {
  1: { name: "Algebra", file: "Math_XI_Unit_01_algebra_NP.docx" },
  2: { name: "Trigonometry", file: "Math_XI_Unit_02_trigonometry_NP.docx" },
  3: { name: "Analytic Geometry", file: "Math_XI_Unit_03_analytic-geometry_NP.docx" },
  4: { name: "Vectors", file: "Math_XI_Unit_04_vectors_NP.docx" },
  5: { name: "Statistics & Probability", file: "Math_XI_Unit_05_statistics-probability_NP.docx" },
  6: { name: "Calculus", file: "Math_XI_Unit_06_calculus_NP.docx" },
  7: { name: "Computational Methods / Mechanics", file: "Math_XI_Unit_07_computational-mechanics_NP.docx" },
};

const MATH_UNIT_CAPSULE_NO: Record<string, number> = {
  algebra: 1,
  trigonometry: 2,
  "analytic-geometry": 3,
  vectors: 4,
  "statistics-and-probability": 5,
  "limits-and-continuity": 6,
  differentiation: 6,
  "application-of-derivatives": 6,
  antiderivatives: 6,
  "numerical-integration": 7,
};

function NepaliCapsuleCard({ unitNo }: { unitNo: number }) {
  const capsule = MATH_NEPALI_CAPSULES[unitNo];
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20">
      <FileText className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold">Unit {unitNo} — {capsule.name}: नेपाली रिसोर्स केप्सुल</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Likely NEB questions with short answers and exam shortcuts, comparison tables, professor&apos;s theory with viva bank, and a quick memo.
        </p>
      </div>
      <Button asChild size="sm" variant="outline" className="shrink-0">
        <a href={`/materials/${capsule.file}`} download>
          <ExternalLink className="w-3.5 h-3.5 mr-1" />
          Download DOCX
        </a>
      </Button>
    </div>
  );
}

function ResourceCard({ title, description, Component }: { title: string; description: string; Component: ComponentType }) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </CardHeader>
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  );
}

function renderResources(
  unitId: string,
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
): ReactNode {
  const body = renderUnitResources(unitId, subjectSlug, topicSlug, topicTitle);
  const capsuleNo = subjectSlug === "mathematics" ? MATH_UNIT_CAPSULE_NO[unitId] : undefined;
  if (!capsuleNo) return body;
  return (
    <div className="space-y-4">
      <NepaliCapsuleCard unitNo={capsuleNo} />
      {body}
    </div>
  );
}

function renderUnitResources(
  unitId: string,
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
): ReactNode {
  // Class 11 Algebra — topic-level classification within the unit section
  if (unitId === "algebra" && subjectSlug === "mathematics") {
    const sub = ALGEBRA_TOPIC_RESOURCES.find((r) => topicSlug.includes(r.keyword));
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{ALGEBRA_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{ALGEBRA_SECTION.description}</p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
          <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">NEB Class 11 Algebra — Official Master Resource Document</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete unit notes covering Logic, Real Numbers, Functions, Curves, Sequences, Matrices, Quadratics, Complex Numbers, and Binomial Theorem.
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <a href="/materials/Math_XI_Unit_01_algebra.docx">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              Download DOCX
            </a>
          </Button>
        </div>
        {sub ? (
          <ResourceCard title={sub.title} description={sub.description} Component={sub.component} />
        ) : (
          <EmptyState
            title="Coming soon"
            description={`Interactive resources for ${topicTitle} will be available here.`}
          />
        )}
      </div>
    );
  }

  // Unit-level resources for all other matches
  const spec = UNIT_RESOURCES.find((r) => r.match(unitId, subjectSlug, topicSlug));
  if (!spec) {
    return (
      <EmptyState
        title="Coming soon"
        description={`Resources for ${topicTitle} will be available here.`}
      />
    );
  }
  return (
    <div className="space-y-4">
      <ResourceCard title={spec.title} description={spec.description} Component={spec.component} />
    </div>
  );
}

// ── The tab registry — one tab per content "part" ──────────────────────────
//
// Owner request (2026-10-23): "in last of each notes of each chapter and topic
// … currently there are only four which you have to add all diversities
// including journal … formulas and journal are different tabs … create all
// possible tabs which can be classified in the parts and the parts will be
// tabs … they will be accessed with tier plan." So every part of a topic's
// content (the concept-JSON fields, plus Notes / Journal / Resources) is its
// own tab — never an endless column inside one tab — and each tab declares the
// tier-plan rung that opens it (plan.md §2–§3). Locked tabs stay visible with
// a lock badge and a one-tap path to /plans (plan.md §4).

type TabKind = "notes" | "field" | "journal" | "resources";

type ContentTab = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** Tier-plan rung that opens this tab (plan.md §2.1). */
  minTier: AccessLevel;
  kind: TabKind;
  /** Set for kind "field" — the concept-JSON part this tab shows. */
  field?: RavikishanConceptField;
  description: string;
};

function buildTabs(notesTier: AccessLevel): ContentTab[] {
  return [
    // ── Theory (Member rung) ──
    { id: "notes", label: "Notes", icon: BookOpen, minTier: notesTier, kind: "notes", description: "The full theory notes for this topic." },
    { id: "summary", label: "Summary", icon: BookMarked, minTier: "member", kind: "field", field: "summary", description: "The short recap of the whole topic." },
    { id: "formulas", label: "Formulas", icon: Calculator, minTier: "member", kind: "field", field: "formulas", description: "Every formula of the topic." },
    { id: "key-points", label: "Key Points", icon: CheckCircle2, minTier: "member", kind: "field", field: "keyPoints", description: "The points to remember." },
    { id: "important-notes", label: "Important Notes", icon: StickyNote, minTier: "member", kind: "field", field: "importantNotes", description: "The notes the exam leans on." },
    { id: "important-concepts", label: "Important Concepts", icon: Brain, minTier: "member", kind: "field", field: "importantConcepts", description: "The core concepts of the topic." },
    { id: "important-statements", label: "Important Statements", icon: ScrollText, minTier: "member", kind: "field", field: "importantStatements", description: "Statements worth writing exactly." },
    { id: "bounds", label: "Bounds & Limits", icon: Target, minTier: "member", kind: "field", field: "bounds", description: "Where each formula stops being valid." },
    { id: "related", label: "Related Topics", icon: Link2, minTier: "member", kind: "field", field: "related", description: "Topics that connect to this one." },

    // ── Exam engine (Plus rung) ──
    { id: "numericals", label: "Numericals", icon: Pencil, minTier: "plus", kind: "field", field: "numericals", description: "Drill problems for this topic." },
    { id: "examples", label: "Worked Examples", icon: Lightbulb, minTier: "plus", kind: "field", field: "examples", description: "Solved examples, step by step." },
    { id: "practice", label: "Practice (Solved)", icon: ClipboardList, minTier: "plus", kind: "field", field: "practice", description: "Solved practice problems." },
    { id: "practice-questions", label: "Practice Qs", icon: FileQuestion, minTier: "plus", kind: "field", field: "practiceQuestions", description: "Practice questions to attempt yourself." },
    { id: "important-tasks", label: "Important Tasks", icon: ListChecks, minTier: "plus", kind: "field", field: "importantTasks", description: "The tasks to finish before the exam." },
    { id: "mcqs", label: "MCQ Bank", icon: PanelTop, minTier: "plus", kind: "field", field: "mcs", description: "Entrance-pattern MCQs with answers." },
    { id: "exam-tricks", label: "Exam Short Tricks", icon: Zap, minTier: "plus", kind: "field", field: "examShortTricks", description: "10-second shortcuts for the exam hall." },
    { id: "exam-tips", label: "Exam Tips", icon: BookMarked, minTier: "plus", kind: "field", field: "examNotes", description: "How the exam asks — and how to answer." },
    { id: "confusions", label: "Confusions & Traps", icon: AlertTriangle, minTier: "plus", kind: "field", field: "confusion", description: "The ❌→✅ misconceptions that cost marks." },
    { id: "special-notes", label: "Special Notes", icon: AlertCircle, minTier: "plus", kind: "field", field: "specialNotes", description: "The special notes the syllabus keeps returning to." },
    { id: "facts", label: "Universal Facts", icon: Globe2, minTier: "plus", kind: "field", field: "universalFacts", description: "High-yield facts that hold everywhere." },

    // ── Personal + documents ──
    { id: "journal", label: "Journal", icon: NotebookPen, minTier: "plus", kind: "journal", description: "Your private study journal for this topic." },
    { id: "resources", label: "Resources & Docs", icon: FileText, minTier: "member", kind: "resources", description: "All documents, added PDFs and unit resources." },
  ];
}

/** Locked tabs stay visible (plan.md §4) — dimmed, with a one-tap path to /plans. */
function LockedTabCard({ tab }: { tab: ContentTab }) {
  return (
    <Card className="mx-auto max-w-xl border-primary/20 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        <Lock className="h-5 w-5 text-primary" />
      </div>
      <CardTitle className="mt-4 text-xl">
        {tab.label} opens at {ACCESS_LABELS[tab.minTier]}
      </CardTitle>
      <p className="mt-2 text-sm text-muted-foreground">{tab.description}</p>
      <Button asChild className="mt-6 h-10 rounded-xl px-5 text-sm font-semibold">
        <Link href="/plans">See the plans</Link>
      </Button>
    </Card>
  );
}

function todayIso(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * The Journal tab (plan.md §3, section "Journal" — Plus rung). The journal
 * store keeps ONE entry per user per day, so saving here attaches today's
 * entry to this topic with a `topic:<slug>` tag; the entries tagged with this
 * topic are listed under the composer.
 */
function TopicJournalPanel({
  topicTitle,
  topicPath,
}: {
  topicTitle: string;
  topicPath: string;
}) {
  const tag = useMemo(() => `topic:${topicPath}`.slice(0, 40), [topicPath]);
  const { data: entries, isLoading } = useR1Journal();
  const saveEntry = useSaveR1Journal();
  const deleteEntry = useDeleteR1Journal();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const tagged = useMemo(
    () => (entries ?? []).filter((e: R1JournalEntry) => (e.tags ?? []).includes(tag)),
    [entries, tag],
  );

  const save = async () => {
    if (!body.trim()) return;
    await saveEntry.mutateAsync({
      entryDate: todayIso(),
      title: title.trim() || undefined,
      body: body.trim(),
      tags: [tag],
    });
    setTitle("");
    setBody("");
  };

  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Journal · {topicTitle}</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Your private reflections on this topic. The journal keeps one entry
            per day — saving here attaches today&apos;s entry to this topic.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={200}
            className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What did you learn in this topic?"
            rows={4}
            maxLength={20000}
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div className="flex items-center justify-between">
            <Link href="/journal" className="text-xs font-semibold text-primary hover:underline">
              Open the full Journal →
            </Link>
            <Button
              onClick={save}
              disabled={saveEntry.isPending || !body.trim()}
              className="h-9 rounded-xl px-4 text-xs font-semibold"
            >
              {saveEntry.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" /> Save entry
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Entries on this topic
        </h4>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : tagged.length === 0 ? (
          <p className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-5 text-center text-xs text-muted-foreground">
            Nothing yet — write the first entry for {topicTitle}.
          </p>
        ) : (
          <div className="space-y-3">
            {tagged.map((e) => (
              <Card key={e.id}>
                <CardContent className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-primary">{e.entryDate}</span>
                      {e.title && <span className="truncate text-sm font-semibold">{e.title}</span>}
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                      {e.body}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEntry.mutate(e.id)}
                    aria-label={`Delete entry ${e.entryDate}`}
                    className="rounded-lg p-1.5 text-muted-foreground/60 transition hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The Resources tab's document shelf — ALL documents and added PDFs from the
 * shared catalog (lib/docs-catalog.ts), this subject first.
 */
function DocumentsAndPdfs({ subjectSlug }: { subjectSlug: string }) {
  const subjectName = subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1);
  const sorted = useMemo(() => {
    const own: Doc[] = [];
    const rest: Doc[] = [];
    for (const doc of DOCS) (doc.subject === subjectName ? own : rest).push(doc);
    return [...own, ...rest];
  }, [subjectName]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">All Documents &amp; Added PDFs</CardTitle>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Every document the platform ships — open or download any of them here.
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <Link href="/pdfs">
              PDF Library <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 sm:grid-cols-2">
          {sorted.map((doc) => (
            <li
              key={doc.key}
              className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-2.5"
            >
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold leading-tight">{doc.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {doc.subject} · {doc.topic} · {doc.kind.toUpperCase()}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/80">
                  {doc.description}
                </p>
                <div className="mt-1.5 flex gap-3">
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    Open <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={doc.href}
                    download
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <Download className="h-3 w-3" /> Download
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TabPanel({
  tab,
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  topicTitle,
  topicPath,
}: {
  tab: ContentTab;
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
  topicPath: string;
}) {
  if (tab.kind === "notes") {
    return (
      <RavikishanTopicResources
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topicSlug}
      />
    );
  }

  if (tab.kind === "journal") {
    return <TopicJournalPanel topicTitle={topicTitle} topicPath={topicPath} />;
  }

  if (tab.kind === "resources") {
    return (
      <div className="space-y-4">
        <DocumentsAndPdfs subjectSlug={subjectSlug} />
        {renderResources(unitId, subjectSlug, topicSlug, topicTitle)}
      </div>
    );
  }

  if (!tab.field) return null;
  return (
    <ConceptFieldPanel
      field={tab.field}
      classSlug={classSlug}
      subjectSlug={subjectSlug}
      unitId={unitId}
      topicSlug={topicSlug}
      topicTitle={topicTitle}
    />
  );
}

export function ContentTabs({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  unit,
}: ContentTabsProps) {
  const { user } = useSession();

  const topicTitle = unit
    ? getTopicEntryBySlug(unit, topicSlug)?.title ?? topicSlug
    : topicSlug;

  const topicPath = getTopicPath(classSlug, subjectSlug, unitId, topicSlug);

  // Tier-plan access (plan.md §2.1): Class 11 core notes open at Member,
  // Class 12 at Plus.
  const notesTier: AccessLevel = /class-12/.test(classSlug) ? "plus" : "member";
  const tabs = useMemo(() => buildTabs(notesTier), [notesTier]);

  const [activeTab, setActiveTab] = useState<string>("notes");
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const unlocked = hasLevel(user, active.minTier);

  return (
    <div className="space-y-4">
      {/* Tab navigation — one tab per content part; swipe/scroll sideways. */}
      <div
        className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border"
        role="tablist"
        aria-label="Topic content sections"
      >
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const locked = !hasLevel(user, tab.minTier);
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.description}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : locked
                    ? "text-muted-foreground/60 hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TabIcon className="h-3.5 w-3.5" />
              {tab.label}
              {locked && <Lock className="h-3 w-3" />}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="min-h-[200px]" role="tabpanel">
        {!unlocked ? (
          <LockedTabCard tab={active} />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{active.label}</h3>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {ACCESS_LABELS[active.minTier]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{active.description}</p>
            <TabPanel
              tab={active}
              classSlug={classSlug}
              subjectSlug={subjectSlug}
              unitId={unitId}
              topicSlug={topicSlug}
              topicTitle={topicTitle}
              topicPath={topicPath}
            />
          </div>
        )}
      </div>

      {/* Source Info */}
      <p className="text-xs text-muted-foreground font-mono">
        Source: {topicPath}
      </p>
    </div>
  );
}
