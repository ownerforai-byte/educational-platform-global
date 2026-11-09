"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  AlertTriangle,
  Atom,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ExternalLink,
  FileText,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  ListChecks,
  ListOrdered,
  Maximize2,
  Minimize2,
  RotateCcw,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { loadData } from "@/lib/data-loader";
import { classDirOfTrack, parseContentPath, type ContentKind } from "@/lib/content/paths";
import { MathMarkdown } from "@/components/content/math-markdown";
import { NoteBlocks } from "@/components/content/rich-note";
import { selectCanonicalNoteEntry } from "@/lib/note-routes";
import { EntranceQuiz } from "@/components/content/entrance-quiz";
import { getEntranceQuestions } from "@/lib/entrance-questions";
import { FormulaCard } from "@/components/content/formula-card";
import {
  emptyHighYieldTopicData,
  hasHighYieldTopicData,
  type HighYieldTopicData,
} from "@/lib/high-yield-topic-facts-match";
import {
  ensureHighYieldForSubject,
  getLoadedHighYieldTopicData,
} from "@/lib/high-yield-topic-facts-lazy";
import { resolveLabVisualEntry } from "@/lib/lab-visual-index";
import { getLabVisualNode } from "@/lib/lab-visual-loaders";
import { getActivityForTopic } from "@/lib/lab-manifest";
import { noteMatchesTopic } from "@/lib/note-topic-match";
import { resolveUnitSlug } from "@/lib/syllabus-notes-manifest";
import { ActivityJourney } from "@/components/lab/activity-journey";

const SchematicDiagramLazy = dynamic(
  () => import("@/components/lab/schematic-diagram").then((m) => m.SchematicDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[380px] animate-pulse rounded-2xl border border-border/60 bg-background/50" />
    ),
  },
);

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
  formulaSpecs?: unknown[];
  blocks?: unknown[];
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

export type TopicLearningSection = "notes" | "mcq" | "numericals" | "entrance" | "self-check";

interface TopicVerticalNotesProps {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
  section?: TopicLearningSection;
}

type LearningSectionProps = {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children: React.ReactNode;
};

function LearningSection({
  id,
  title,
  description,
  icon: Icon,
  badge,
  children,
}: LearningSectionProps) {
  return (
    <section aria-labelledby={id} className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/20 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-start gap-2.5">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 id={id} className="text-base font-bold text-foreground">{title}</h3>
            {description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>}
          </div>
        </div>
        {badge && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function isBoilerplate(text: string): boolean {
  if (!text) return true;
  return (
    /^Key Formula \d+:/i.test(text) ||
    /^Key Point \d+:/i.test(text) ||
    /^Example \d+:/i.test(text) ||
    /^Q\d+\.\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)/i.test(text)
  );
}

function VisualWorkspace({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  topicTitle,
  concepts,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
  concepts: RichTopicConcept[];
}) {
  const [visualTab, setVisualTab] = useState<"schematic" | "3d">("schematic");
  const [visualKey, setVisualKey] = useState(0);
  const [isVisualRefreshing, setIsVisualRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);
  const visualPanelRef = useRef<HTMLDivElement>(null);

  // O(1) synchronous lookup: whether this topic has a 3D visual (drives tab
  // visibility). This pulls in NO three.js and NO topic-visual chunk — the
  // visuals only load when the 3D branch below actually mounts.
  const labVisualEntry = useMemo(() => resolveLabVisualEntry(topicSlug), [topicSlug]);
  // Manifest association (explicit topic slug or declared alias only). When it
  // exists the learner gets the five journey actions beside the inline scene.
  const manifestActivity = useMemo(() => getActivityForTopic(topicSlug), [topicSlug]);

  useEffect(() => {
    const sync = () => setIsFullscreen(document.fullscreenElement === visualPanelRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const visualTabs = useMemo<Array<"schematic" | "3d">>(
    () => (labVisualEntry ? ["schematic", "3d"] : ["schematic"]),
    [labVisualEntry],
  );

  const onVisualTabKeyDown = (event: React.KeyboardEvent) => {
    const index = visualTabs.indexOf(visualTab);
    if (index < 0) return;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % visualTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + visualTabs.length) % visualTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = visualTabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = visualTabs[nextIndex];
    setVisualTab(next);
    document.getElementById(`visual-tab-${next}`)?.focus();
  };

  const toggleFullscreen = async () => {
    setFullscreenError(null);
    try {
      if (document.fullscreenElement === visualPanelRef.current) await document.exitFullscreen();
      else if (visualPanelRef.current?.requestFullscreen) await visualPanelRef.current.requestFullscreen();
      else setFullscreenError("Fullscreen is not supported here. You can still zoom and pan the diagram.");
    } catch {
      setFullscreenError("Fullscreen could not be opened. You can still zoom and pan the diagram.");
    }
  };

  return (
    <section
      ref={visualPanelRef}
      aria-labelledby="visual-workspace-heading"
      className={`rounded-3xl border border-border/70 bg-card shadow-sm ${isFullscreen ? "h-screen overflow-y-auto" : "overflow-hidden"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/20 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="h-5 w-5 text-sky-500" />
          <div>
            <h3 id="visual-workspace-heading" className="text-base font-bold">See the concept in action</h3>
            <p className="mt-1 text-xs text-muted-foreground">Use the labels and hotspots before returning to the explanation.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsVisualRefreshing(true);
              setVisualKey((key) => key + 1);
              setTimeout(() => setIsVisualRefreshing(false), 500);
            }}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 text-xs font-bold text-primary"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isVisualRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/60 px-3 text-xs font-bold text-muted-foreground"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {isFullscreen ? "Exit" : "Full screen"}
          </button>
          <div role="tablist" aria-label="Visual mode" className="flex rounded-xl border border-border/60 bg-background p-1">
            <button
              type="button"
              role="tab"
              id="visual-tab-schematic"
              aria-selected={visualTab === "schematic"}
              aria-controls="visual-panel"
              tabIndex={visualTab === "schematic" ? 0 : -1}
              onKeyDown={onVisualTabKeyDown}
              onClick={() => setVisualTab("schematic")}
              className={`min-h-10 rounded-lg px-3 text-xs font-bold ${visualTab === "schematic" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Schematic
            </button>
            {labVisualEntry && (
              <button
                type="button"
                role="tab"
                id="visual-tab-3d"
                aria-selected={visualTab === "3d"}
                aria-controls="visual-panel"
                tabIndex={visualTab === "3d" ? 0 : -1}
                onKeyDown={onVisualTabKeyDown}
                onClick={() => setVisualTab("3d")}
                className={`min-h-10 rounded-lg px-3 text-xs font-bold ${visualTab === "3d" ? "bg-sky-600 text-white" : "text-muted-foreground"}`}
              >
                3D visual
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="visual-panel" role="tabpanel" aria-labelledby={`visual-tab-${visualTab}`} className="space-y-4 p-3 sm:p-6">
        {fullscreenError && <p role="status" className="text-sm text-muted-foreground">{fullscreenError}</p>}
        {visualTab === "schematic" ? (
          <SchematicDiagramLazy
            key={`schematic-${visualKey}`}
            subjectSlug={subjectSlug}
            topicSlug={topicSlug}
            topicTitle={topicTitle}
            unitId={unitId}
            classSlug={classSlug}
            concepts={concepts}
          />
        ) : labVisualEntry ? (
          <>
            <div key={`3d-${visualKey}`} className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-border/60">
              {getLabVisualNode(labVisualEntry)}
            </div>
            {manifestActivity && (
              <div className="rounded-2xl border border-border/60 bg-muted/10 p-3">
                <ActivityJourney activity={manifestActivity} />
              </div>
            )}
          </>
        ) : null}
        <p className="rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-[11px] text-muted-foreground">
          {visualTab === "3d" ? "Drag to rotate · Scroll to zoom · Pinch on touch" : "Hover or tap a labelled hotspot, then walk through the guided tour."}
        </p>
      </div>
    </section>
  );
}

function FactBank({ factBank }: { factBank: HighYieldTopicData }) {
  return (
    <LearningSection
      id="note-fact-bank"
      title="Remember the high-yield facts"
      description="Connect each law to its formula and its validity conditions instead of memorising isolated lines."
      icon={Target}
      badge="Exam revision"
    >
      <div className="flex flex-wrap gap-2">
        {[
          ["Governing laws", factBank.governingLaws.length],
          ["Constants", factBank.constantsAndValues.length],
          ["Entrance traps", factBank.entranceTraps.length],
          ["Speed formulas", factBank.speedFormulas.length],
        ].filter(([, count]) => Number(count) > 0).map(([label, count]) => (
          <span key={label} className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            <strong className="mr-1 text-foreground">{count}</strong>{label}
          </span>
        ))}
      </div>

      {factBank.governingLaws.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Laws and when they apply</h4>
          <div className="space-y-3">
            {factBank.governingLaws.map((law, index) => (
              <article key={`${law.name}-${index}`} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h5 className="text-sm font-bold">{law.name}</h5>
                  <Scale className="h-4 w-4 shrink-0 text-emerald-500" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{law.statement}</p>
                <div className="mt-3 border-t border-emerald-500/20 pt-3">
                  <MathMarkdown content={law.formula} className="text-sm font-bold text-emerald-600 dark:text-emerald-400" />
                  <p className="mt-2 text-xs italic text-muted-foreground">Valid when: {law.conditions}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {factBank.constantsAndValues.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Constants and exact values</h4>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {factBank.constantsAndValues.map((constant, index) => (
              <div key={`${constant.name}-${index}`} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <MathMarkdown content={`$${constant.symbol}$`} className="text-xs font-bold text-primary" />
                <p className="mt-1 text-sm font-extrabold">{constant.value} <span className="font-normal text-muted-foreground">{constant.unit}</span></p>
                <p className="mt-1 text-xs text-muted-foreground">{constant.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </LearningSection>
  );
}

function answerIndex(answer: string, options: string[]): number {
  const normalized = answer.trim().toLowerCase();
  const exact = options.findIndex((option) => option.trim().toLowerCase() === normalized);
  if (exact >= 0) return exact;
  const letter = normalized.match(/^[a-d](?:[).:]\s*|\s+)?$/)?.[0]?.[0];
  return letter ? letter.charCodeAt(0) - 97 : -1;
}

/** Map ManifestItem.source to the ContentKind the backend expects. */
function kindForSource(source: ManifestItem["source"]): ContentKind {
  if (source === "ravikishan") return "concepts";
  return "theory";
}

/**
 * Note resolution order for the workspace:
 *
 *   1. The shipped subject manifest (`syllabus-notes/<subject>/_manifest.json`)
 *      — flat and class-blind, with the payload shipped publicly under the
 *      same path. It is matched for EVERY class page now: near-miss slugs
 *      ("alkanes" vs "alkanes-conformations-…") and class-12-unit-keyed notes
 *      (e.g. `heredity-and-evolution` → Mendel) live here and used to be
 *      unreachable from the pages that needed them. The gated fetch is
 *      attempted first; on failure the shipped copy is read from the entry's
 *      own physical folder, so a cross-class entry can never blank the note
 *      area just because the gated path resolves `concepts/<page-class>/…`.
 *   2. The supplementary `content/manifest.json` — its paths carry the real
 *      class directory and filename, so it is filtered by the page's class.
 *
 * Topic matching is shared across both branches and the server's
 * "coming soon" decider: `@/lib/note-topic-match`.
 */

/** Last path segment when it is a plain `.json` filename. */
function filenameFromContentPath(relPath: string): string | undefined {
  const filename = relPath.split(/[\\/]/).at(-1);
  return filename && /\.json$/i.test(filename) ? filename : undefined;
}

/**
 * Fetch one paid note body from the spark-gated server endpoint.
 * The `moduleKey` passed here is the same key the credits/unlock endpoint
 * wrote to `profiles.credits_unlock` — the backend verifies the window.
 */
async function fetchTopicNoteBody(params: {
  kind: ContentKind;
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  filename: string;
  moduleKey?: string;
}): Promise<RichTopicConcept> {
  // The proxy has no timeout and the backend can stall on its auth lookups; an
  // unbounded await left the topic workspace on the loading spinner forever.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NOTE_REVEAL_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch("/api/content/reveal", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `content/reveal returned ${res.status}`);
  }
  return res.json() as Promise<RichTopicConcept>;
}

/** Upper bound for one gated note body; past this the caller uses its fallback. */
const NOTE_REVEAL_TIMEOUT_MS = 9000;

export function TopicVerticalNotes({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  topicTitle,
  section = "notes",
}: TopicVerticalNotesProps) {
  const [sources, setSources] = useState<Array<{ meta: ManifestItem; data: RichTopicConcept }>>([]);
  const [supplementary, setSupplementary] = useState<RichTopicConcept | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteLoadFailed, setNoteLoadFailed] = useState(false);
  const [bankVersion, setBankVersion] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [selfCheckAnswers, setSelfCheckAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    let cancelled = false;
    ensureHighYieldForSubject(subjectSlug).then(() => {
      if (!cancelled) setBankVersion((version) => version + 1);
    });
    return () => {
      cancelled = true;
    };
  }, [subjectSlug]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSources([]);
    setSupplementary(null);
    setNoteLoadFailed(false);
    setMcqAnswers({});
    setSelfCheckAnswers({});

    const classDir = classDirOfTrack(classSlug);

    /**
     * One built manifest entry → its note body.
     *
     * The gated endpoint is authoritative for members, but the same payload is
     * already shipped publicly under `public/data/syllabus-notes` (byte-checked
     * by `content:build --check`). When the endpoint is unavailable the shipped
     * copy is used so the page renders instead of going blank.
     */
    const loadManifestNote = async (meta: ManifestItem): Promise<RichTopicConcept | null> => {
      try {
        return await fetchTopicNoteBody({
          kind: kindForSource(meta.source),
          classSlug,
          subjectSlug,
          unitSlug: unitId,
          filename: meta.filename,
          // moduleKey matches the key stored in credits_unlock by
          // the /api/user/credits/unlock endpoint.
          moduleKey: `note:${classSlug}/${subjectSlug}/${unitId}/${meta.filename}`,
        });
      } catch {
        try {
          return await loadData<RichTopicConcept>(
            `syllabus-notes/${subjectSlug}/${meta.unitSlug}/${meta.filename}`,
          );
        } catch {
          return null;
        }
      }
    };

    loadData<ManifestItem[]>(`syllabus-notes/${subjectSlug}/_manifest.json`)
      .then(async (manifest) => {
        if (cancelled) return;

        // 1. Class-correct source first: `content/manifest.json` embeds the
        //    payload and its path names the real class dir + filename, so a
        //    class-12 page reads its own file rather than a class-11 copy.
        let supplementaryManifest: Array<{ path: string; data: RichTopicConcept }> = [];
        try {
          supplementaryManifest = await loadData<Array<{ path: string; data: RichTopicConcept }>>(
            "content/manifest.json",
          );
        } catch {
          // Corpus unavailable — fall through to the flat manifest below.
        }
        if (cancelled) return;

        const match = supplementaryManifest.find((item) => {
          const parsed = parseContentPath(item.path);
          if (!parsed || parsed.classDir !== classDir || parsed.unitSlug !== unitId) return false;
          const filename = filenameFromContentPath(item.path);
          return noteMatchesTopic(
            typeof item.data?.topicSlug === "string" ? item.data.topicSlug : undefined,
            filename,
            topicSlug,
          );
        });

        if (match) {
          const parsed = parseContentPath(match.path);
          const filename = filenameFromContentPath(match.path);
          let body: RichTopicConcept | null = null;
          if (filename && parsed) {
            try {
              body = await fetchTopicNoteBody({
                kind: parsed.kind,
                classSlug,
                subjectSlug: parsed.subjectSlug ?? subjectSlug,
                unitSlug: unitId,
                filename,
                moduleKey: `note:${classSlug}/${subjectSlug}/${unitId}/${filename}`,
              });
            } catch {
              body = null;
            }
          }
          if (cancelled) return;
          if (body) setSupplementary(body);
          else setSupplementary(match.data);
        } else {
          // 2. Fallback: the flat subject manifest — notes filed under shared
          //    or legacy unit folders (and near-miss slugs) still surface
          //    here; the shipped public copy is the load fallback in
          //    `loadManifestNote`, so cross-class entries render too.
          const wantedUnit = resolveUnitSlug(unitId);
          const relevant = manifest.filter(
            (item) =>
              resolveUnitSlug(item.unitSlug) === wantedUnit &&
              noteMatchesTopic(item.topicSlug, item.filename, topicSlug),
          );
          if (relevant.length > 0) {
            const loaded = await Promise.all(
              relevant.map(async (meta) => {
                const data = await loadManifestNote(meta);
                return data ? { meta, data } : null;
              }),
            );
            if (cancelled) return;
            const valid = loaded.filter((item): item is { meta: ManifestItem; data: RichTopicConcept } => item !== null);
            const canonicalMeta = selectCanonicalNoteEntry(valid.map((source) => source.meta));
            const canonical = valid.find((source) => source.meta === canonicalMeta);
            setSources(canonical ? [canonical] : []);
            if (!canonical) setNoteLoadFailed(true);
          } else {
            // Neither source carries a note for this topic.
            setNoteLoadFailed(true);
          }
        }

        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setNoteLoadFailed(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [subjectSlug, unitId, topicSlug]);

  const highYield = useMemo(() => {
    void bankVersion;
    return getLoadedHighYieldTopicData(subjectSlug, topicSlug, topicTitle, unitId);
  }, [subjectSlug, topicSlug, topicTitle, unitId, bankVersion]);
  const factBank = useMemo(
    () => highYield ?? emptyHighYieldTopicData(topicTitle, subjectSlug),
    [highYield, topicTitle, subjectSlug],
  );
  const activeData = sources[0]?.data ?? supplementary;

  const rawNotes = activeData?.notes ?? [];
  const rawExamples = (activeData?.examples ?? []).filter((item) => !isBoilerplate(item));
  const rawImportantConcepts = activeData?.importantConcepts ?? [];
  const rawImportantNotes = activeData?.importantNotes ?? [];
  const rawImportantStatements = activeData?.importantStatements ?? [];
  const summary = activeData?.summary;
  const rawUniversalFacts = activeData?.universalFacts ?? [];
  const rawSpecialNotes = activeData?.specialNotes ?? [];
  const rawConfusion = activeData?.confusion ?? [];
  const rawKeyPoints = (activeData?.keyPoints ?? []).filter((item) => !isBoilerplate(item));
  const rawFormulas = (activeData?.formulas ?? []).filter((item) => !isBoilerplate(item));
  const rawExamShortTricks = activeData?.examShortTricks ?? [];
  const rawImportantTasks = activeData?.importantTasks ?? [];
  const rawPracticeQuestions = (activeData?.practiceQuestions ?? []).filter((item) => !isBoilerplate(item));
  const rawPractice = activeData?.practice ?? [];
  const rawNumericals = activeData?.numericals ?? [];
  const rawMcqs = (activeData?.mcs ?? []).filter((item) => item.question?.trim() && item.options?.length > 0);

  const entranceQuestions = useMemo(() => getEntranceQuestions(subjectSlug, unitId), [subjectSlug, unitId]);
  const populatedFormulas = useMemo(
    () => rawFormulas.length > 0
      ? rawFormulas
      : factBank.speedFormulas.map((formula) => `**${formula.name}**: $${formula.formula}$ — ${formula.description}${formula.dimensions ? ` [Dimension: $${formula.dimensions}$]` : ""}`),
    [rawFormulas, factBank],
  );
  const structuredFormulas = useMemo(() => rawFormulas.length > 0 ? [] : factBank.speedFormulas, [rawFormulas, factBank]);
  const populatedExamples = useMemo(
    () => rawExamples.length > 0
      ? rawExamples
      : factBank.workedNumericals.map((example) => `**Problem:** ${example.problem}\n\n**Given:** ${example.given}\n\n${example.steps.map((step, index) => `**Step ${index + 1}:** ${step}`).join("\n\n")}\n\n**Answer:** ${example.answer}`),
    [rawExamples, factBank],
  );
  const populatedKeyPoints = useMemo(
    () => rawKeyPoints.length > 0
      ? rawKeyPoints
      : factBank.keyTermsAndDefinitions.map((item) => `**${item.term}**: ${item.definition} *(Why it matters: ${item.significance})*`),
    [rawKeyPoints, factBank],
  );
  const conceptCheckQuiz = useMemo(
    () => factBank.entranceTraps.slice(0, 3).map((trap, index) => ({
      id: index,
      question: `Concept check ${index + 1}: which statement is accurate?`,
      options: [trap.trap, trap.truth],
      explanation: `${trap.truth} (${trap.examRef})`,
    })),
    [factBank],
  );

  if (loading) {
    return (
      <div id="topic-notes" className="flex scroll-mt-24 flex-col items-center justify-center gap-3 py-12" role="status" aria-live="polite" aria-busy="true">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Loading the canonical notes and learning activities…</p>
      </div>
    );
  }

  if (section === "mcq") {
    return (
      <div id="topic-notes" className="scroll-mt-24">
        <LearningSection
          id="topic-mcqs-heading"
          title={`Topic MCQs${rawMcqs.length ? ` — ${rawMcqs.length} questions` : ""}`}
          description="Choose an answer to reveal the correct option immediately. Scroll down for the next question."
          icon={ListChecks}
          badge="Instant feedback"
        >
          {rawMcqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center">
              <p className="text-sm font-semibold">No topic-specific MCQs are authored yet.</p>
              <p className="mt-2 text-xs text-muted-foreground">Use the Entrance Question Bank tab for the available exam-style practice.</p>
            </div>
          ) : rawMcqs.map((question, questionIndex) => {
            const selected = mcqAnswers[questionIndex];
            const correct = answerIndex(question.answer, question.options);
            return (
              <article key={`${question.question}-${questionIndex}`} className="rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{questionIndex + 1}</span>
                  <h4 className="text-sm font-bold leading-relaxed">{question.question}</h4>
                </div>
                <div className="mt-4 space-y-2 sm:pl-9">
                  {question.options.map((option, optionIndex) => {
                    const revealed = selected !== undefined;
                    const isCorrect = optionIndex === correct;
                    const isSelected = optionIndex === selected;
                    return (
                      <button
                        key={`${option}-${optionIndex}`}
                        type="button"
                        onClick={() => setMcqAnswers((answers) => ({ ...answers, [questionIndex]: optionIndex }))}
                        className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${revealed && isCorrect ? "border-emerald-500/40 bg-emerald-500/10" : revealed && isSelected ? "border-rose-500/40 bg-rose-500/10" : "border-border/60 bg-card hover:border-primary/40"}`}
                      >
                        <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                        {revealed && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                        {revealed && isSelected && !isCorrect && <XCircle className="h-4 w-4 shrink-0 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined && (
                  <p className="mt-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 text-xs leading-relaxed sm:ml-9">
                    <strong>Correct answer: </strong>{question.answer}
                  </p>
                )}
              </article>
            );
          })}
        </LearningSection>
      </div>
    );
  }

  if (section === "numericals") {
    const additionalNumericals = [...rawNumericals, ...rawPractice];
    return (
      <div id="topic-notes" className="scroll-mt-24 space-y-6">
        <LearningSection
          id="topic-numericals-heading"
          title="Step-by-step numericals"
          description="Follow the given values, reasoning steps and final answer in order. Every problem stays in one vertical reading flow."
          icon={Calculator}
          badge={`${populatedExamples.length + additionalNumericals.length} worked sets`}
        >
          {populatedExamples.length === 0 && additionalNumericals.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">No worked numericals are authored for this topic yet.</p>
          ) : (
            <>
              {populatedExamples.map((example, index) => (
                <article key={`${example}-${index}`} className="rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold"><span className="rounded-full bg-primary/15 px-2 py-1 text-xs text-primary">{index + 1}</span>Worked problem</h4>
                  <MathMarkdown content={example} className="space-y-3 text-sm leading-relaxed text-foreground" />
                </article>
              ))}
              {additionalNumericals.map((numerical, index) => (
                <article key={`${numerical}-${index}`} className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 sm:p-5">
                  <h4 className="mb-3 text-sm font-bold text-sky-600 dark:text-sky-400">Additional numerical {index + 1}</h4>
                  <MathMarkdown content={numerical} className="text-sm leading-relaxed" />
                </article>
              ))}
            </>
          )}
        </LearningSection>

        {(rawPracticeQuestions.length > 0 || rawImportantTasks.length > 0) && (
          <LearningSection id="topic-practice-heading" title="Practice after the worked examples" icon={FileText} badge="Your turn">
            {rawPracticeQuestions.map((question, index) => (
              <div key={`${question}-${index}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-4 text-sm leading-relaxed">
                <strong className="shrink-0 text-primary">Q{index + 1}</strong><span>{question}</span>
              </div>
            ))}
            {rawImportantTasks.map((task, index) => (
              <div key={`${task}-${index}`} className="flex items-start gap-3 rounded-xl bg-emerald-500/5 p-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{task}</div>
            ))}
          </LearningSection>
        )}
      </div>
    );
  }

  if (section === "entrance") {
    return (
      <div id="topic-notes" className="scroll-mt-24">
        <LearningSection
          id="topic-entrance-heading"
          title={`Entrance Question Bank — ${entranceQuestions.length} questions`}
          description="Use Learn mode for immediate explanations or Test mode to attempt the full vertical bank before scoring."
          icon={Target}
          badge="CEE / IOE / NEB"
        >
          <EntranceQuiz questions={entranceQuestions} title={topicTitle} />
        </LearningSection>
      </div>
    );
  }

  if (section === "self-check") {
    return (
      <div id="topic-notes" className="scroll-mt-24">
        <LearningSection
          id="topic-self-check-heading"
          title="Quick 3-question self-check"
          description="Answer without reopening the notes. Each choice immediately explains the misconception or confirms the correct idea."
          icon={Brain}
          badge="Recall, don't reread"
        >
          {conceptCheckQuiz.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">No self-check questions are available for this topic yet.</p>
          ) : conceptCheckQuiz.map((question, index) => {
            const selected = selfCheckAnswers[question.id];
            return (
              <article key={question.id} className="rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-500">{index + 1}</span>
                  <h4 className="text-sm font-bold">{question.question}</h4>
                </div>
                <div className="mt-4 space-y-2 sm:pl-9">
                  {question.options.map((option, optionIndex) => {
                    const revealed = selected !== undefined;
                    const isCorrect = optionIndex === 1;
                    const isSelected = selected === optionIndex;
                    return (
                      <button
                        key={`${option}-${optionIndex}`}
                        type="button"
                        onClick={() => setSelfCheckAnswers((answers) => ({ ...answers, [question.id]: optionIndex }))}
                        className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left text-sm ${revealed && isCorrect ? "border-emerald-500/40 bg-emerald-500/10" : revealed && isSelected ? "border-rose-500/40 bg-rose-500/10" : "border-border/60 bg-card hover:border-indigo-500/40"}`}
                      >
                        <span>{option}</span>
                        {revealed && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined && <p className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed sm:ml-9"><strong>Explanation: </strong>{question.explanation}</p>}
              </article>
            );
          })}
        </LearningSection>
      </div>
    );
  }

  return (
    <div id="topic-notes" className="scroll-mt-24 space-y-6">
      {(subjectSlug.toLowerCase().includes("chem") || topicTitle.toLowerCase().includes("element") || topicTitle.toLowerCase().includes("atom")) && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-teal-500/30 bg-teal-500/10 p-5">
          <div className="flex items-center gap-3"><Atom className="h-8 w-8 shrink-0 text-teal-600" /><div><h3 className="text-sm font-bold">Interactive periodic table and CEE questions</h3><p className="mt-1 text-xs text-muted-foreground">Explore configurations, properties and entrance MCQs.</p></div></div>
          <Link href="/periodic-table" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-teal-600 px-4 text-xs font-bold text-white">Open periodic table<ExternalLink className="h-3.5 w-3.5" /></Link>
        </div>
      )}

      {noteLoadFailed && !activeData && (
        <p role="status" className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-foreground">
          This topic&apos;s note body could not be loaded. Refresh the page to retry; the mind map and quick checks below still work.
        </p>
      )}

      <nav aria-label="Note learning path" className="rounded-3xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3"><BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><h2 className="text-base font-bold">Understand {topicTitle} in four passes</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Start with the big picture, understand the explanation, lock in the terms and formulas, then remove common traps.</p></div></div>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1", "Big picture", "note-start"],
            ["2", "Understand", "note-explain"],
            ["3", "Remember", "note-remember"],
            ["4", "Avoid traps", "note-traps"],
          ].map(([number, label, target]) => (
            <li key={target}><a href={`#${target}`} className="flex min-h-11 items-center gap-2 rounded-xl border border-border/60 bg-card px-3 text-xs font-semibold transition-colors hover:border-primary/40"><span className="text-primary">{number}.</span>{label}</a></li>
          ))}
        </ol>
      </nav>

      <div id="note-start" className="scroll-mt-24 space-y-6">
        {(summary || rawImportantConcepts.length > 0 || rawUniversalFacts.length > 0) && (
          <LearningSection id="note-start-heading" title="1. Start with the big picture" description="Read this first so every later detail has somewhere to fit." icon={Sparkles} badge="Overview">
            {summary && <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"><h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Core summary</h4><p className="mt-2 text-sm leading-7">{summary}</p></div>}
            {rawImportantConcepts.length > 0 && <div><h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your concept roadmap</h4><ol className="mt-3 space-y-2">{rawImportantConcepts.map((concept, index) => <li key={`${concept}-${index}`} className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 text-sm leading-relaxed"><span className="font-bold text-primary">{index + 1}.</span>{concept}</li>)}</ol></div>}
            {rawUniversalFacts.length > 0 && <div><h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Facts that anchor the topic</h4><ul className="mt-3 space-y-2">{rawUniversalFacts.map((fact, index) => <li key={`${fact}-${index}`} className="flex items-start gap-2 text-sm leading-relaxed"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />{fact}</li>)}</ul></div>}
          </LearningSection>
        )}
        <VisualWorkspace classSlug={classSlug} subjectSlug={subjectSlug} unitId={unitId} topicSlug={topicSlug} topicTitle={topicTitle} concepts={activeData ? [activeData] : []} />
      </div>

      <div id="note-explain" className="scroll-mt-24">
        <LearningSection id="note-explain-heading" title="2. Understand the explanation" description="Read one idea at a time. After each block, pause and explain it in your own words before continuing." icon={BookOpen} badge={`${rawNotes.length} explanation blocks`}>
          {rawNotes.length === 0 ? <p className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">No long-form note blocks are authored here. Use the visual, key terms and worked examples to build the explanation.</p> : rawNotes.map((note, index) => (
            <article key={`${note}-${index}`} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">Idea {index + 1} of {rawNotes.length}</p>
              <MathMarkdown content={note} className="space-y-3 text-sm leading-7 text-foreground" />
            </article>
          ))}
          <NoteBlocks blocks={activeData?.blocks} formulaSpecs={activeData?.formulaSpecs} />
        </LearningSection>
      </div>

      <div id="note-remember" className="scroll-mt-24 space-y-6">
        {hasHighYieldTopicData(highYield) && <FactBank factBank={factBank} />}
        {populatedKeyPoints.length > 0 && (
          <LearningSection id="note-key-points-heading" title="3. Remember the key terms" description="Use these definitions to check whether your explanation is precise." icon={ListOrdered} badge="Vocabulary">
            <ol className="space-y-3">{populatedKeyPoints.map((point, index) => <li key={`${point}-${index}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-4"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-500">{index + 1}</span><MathMarkdown content={point} className="text-sm leading-relaxed" /></li>)}</ol>
          </LearningSection>
        )}
        {populatedFormulas.length > 0 && (
          <LearningSection id="note-formulas-heading" title="Formulas and calculation shortcuts" description="Read each formula together with its meaning and conditions, not as an isolated symbol string." icon={Calculator} badge={`${structuredFormulas.length || populatedFormulas.length} formulas`}>
            {structuredFormulas.length > 0 ? <div className="grid gap-3 lg:grid-cols-2">{structuredFormulas.map((formula, index) => <FormulaCard key={`${formula.name}-${index}`} formula={formula} index={index + 1} />)}</div> : <div className="space-y-3">{populatedFormulas.map((formula, index) => <div key={`${formula}-${index}`} className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-sky-500">Equation {index + 1}</p><MathMarkdown content={formula} className="mt-2 text-sm font-semibold" /></div>)}</div>}
            {rawExamShortTricks.length > 0 && <div className="space-y-2 border-t border-border/60 pt-4"><h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Memory shortcuts</h4>{rawExamShortTricks.map((trick, index) => <p key={`${trick}-${index}`} className="rounded-xl bg-amber-500/5 p-3 text-sm leading-relaxed">{trick}</p>)}</div>}
          </LearningSection>
        )}
      </div>

      <div id="note-traps" className="scroll-mt-24 space-y-6">
        {(rawImportantNotes.length > 0 || rawImportantStatements.length > 0) && (
          <LearningSection id="note-important-heading" title="Important conditions and formal statements" icon={AlertTriangle} badge="Check before using">
            {rawImportantNotes.map((note, index) => <div key={`${note}-${index}`} className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-relaxed"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />{note}</div>)}
            {rawImportantStatements.map((statement, index) => <div key={`${statement}-${index}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-4 text-sm leading-relaxed"><span className="font-bold text-amber-500">{index + 1}.</span>{statement}</div>)}
          </LearningSection>
        )}
        {(rawSpecialNotes.length > 0 || rawConfusion.length > 0 || factBank.entranceTraps.length > 0) && (
          <LearningSection id="note-traps-heading" title="4. Avoid the common traps" description="Compare the tempting mistake with the correct reasoning so you can catch it in an exam." icon={ShieldAlert} badge="Final check">
            {rawSpecialNotes.map((note, index) => <p key={`${note}-${index}`} className="rounded-xl border border-border/60 p-4 text-sm leading-relaxed">{note}</p>)}
            {rawConfusion.map((confusion, index) => <div key={`${confusion}-${index}`} className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm leading-relaxed"><HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />{confusion}</div>)}
            {factBank.entranceTraps.map((trap, index) => <article key={`${trap.trap}-${index}`} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4"><p className="text-xs font-bold uppercase tracking-wide text-rose-500">Trap</p><p className="mt-1 text-sm text-muted-foreground line-through">{trap.trap}</p><p className="mt-3 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Correct idea</p><p className="mt-1 text-sm leading-relaxed">{trap.truth}</p><p className="mt-2 text-[10px] text-muted-foreground">{trap.examRef}</p></article>)}
          </LearningSection>
        )}
      </div>
    </div>
  );
}
