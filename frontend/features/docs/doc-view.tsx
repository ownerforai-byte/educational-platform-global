"use client";

/**
 * TopicDocView — renders a topic's concept JSON as a proper document.
 *
 * Layout (a real document, not a word list):
 *   0. Concept map      — hand-drawn SVG mind map / concept tree
 *   1. Big picture
 *   2. The explanation  — parsed note flow + inline authored SVG figures
 *   3. Key terms & formulas
 *   4. Watch out
 *   5. Practice
 *
 * Every prose/math surface goes through <MathMarkdown>, which compiles markdown
 * + `$…$` / `$$…$$` / `\(…\)` / `\[…\]` LaTeX (and mhchem `\ce{}`) to KaTeX on
 * the server, so highlighting, display equations and inline math all typeset
 * correctly and consistently with the rest of the platform.
 */

import { useMemo } from "react";
import {
  BookOpen, Calculator, FileText, Lightbulb, ListOrdered, Network, ShieldAlert, Sparkles, Sigma,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { parseNotes, readingMinutes, type DocSegment } from "./doc-parser";
import { getTopicFigures, type TopicFigure } from "./figures/registry";
import { buildDocConceptMap, type RawMindmap } from "./doc-mindmap";
import { DocMindMap } from "./doc-mindmap-view";

export interface TopicDocData {
  summary?: string;
  notes?: string[];
  importantConcepts?: string[];
  universalFacts?: string[];
  keyPoints?: string[];
  formulas?: string[];
  examShortTricks?: string[];
  specialNotes?: string[];
  confusion?: string[];
  importantNotes?: string[];
  importantStatements?: string[];
  practiceQuestions?: string[];
  practice?: string[];
  mindmap?: RawMindmap | null;
}

export interface TopicDocViewProps {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
  data: TopicDocData | null | undefined;
}

const SECTIONS = [
  { id: "doc-map", label: "Concept map" },
  { id: "doc-overview", label: "Big picture" },
  { id: "doc-explain", label: "The explanation" },
  { id: "doc-remember", label: "Key terms & formulas" },
  { id: "doc-traps", label: "Watch out" },
  { id: "doc-practice", label: "Practice" },
] as const;

/** Simpler, deterministic anchor: first index whose text contains the keyword. */
function keywordAnchor(figures: TopicFigure[], notes: string[]): Map<number, TopicFigure[]> {
  const map = new Map<number, TopicFigure[]>();
  for (const f of figures) {
    let at = f.afterNoteIndex;
    if (at === undefined && f.keyword !== undefined) {
      const i = notes.findIndex((n) => n.toLowerCase().includes(f.keyword!.toLowerCase()));
      at = i >= 0 ? i : 0;
    }
    if (at === undefined) at = 0;
    const arr = map.get(at) ?? [];
    arr.push(f);
    map.set(at, arr);
  }
  return map;
}

function FigureBlock({ figure }: { figure: TopicFigure }) {
  const F = figure.Component;
  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-4">
      <F className="mx-auto w-full max-w-[640px] text-foreground" />
      <figcaption className="mt-2 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground">
        {figure.caption}
      </figcaption>
    </figure>
  );
}

function Segment({ segment }: { segment: DocSegment }) {
  if (segment.kind === "definition") {
    return (
      <div className="rounded-r-xl border-l-4 border-primary/60 bg-primary/5 py-3 pl-4 pr-3">
        <div className="text-sm leading-7">
          <strong className="rounded bg-primary/10 px-1 font-bold text-primary">{segment.term}</strong>{" "}
          <MathMarkdown content={segment.body} className="inline text-sm leading-7" />
        </div>
      </div>
    );
  }
  if (segment.kind === "displayMath") {
    return (
      <div className="my-3 rounded-xl border border-sky-500/25 bg-sky-500/5 px-4 py-3 text-center">
        <MathMarkdown content={`$$${segment.tex}$$`} className="text-base" />
      </div>
    );
  }
  if (segment.kind === "list") {
    return (
      <ul className="my-1 space-y-1 pl-6 text-sm leading-7">
        {segment.items.map((item, i) => (
          <li key={i} className="marker:text-primary">
            <MathMarkdown content={item} className="inline text-sm leading-7" />
          </li>
        ))}
      </ul>
    );
  }
  return <MathMarkdown content={segment.body} className="text-sm leading-7" />;
}

function SectionHeading({
  id, icon, children, tone,
}: {
  id: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <h3 className={`flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold ${tone ?? ""}`}>
      <a href={`#${id}`} className="flex items-center gap-2 text-inherit no-underline">
        {icon} {children}
      </a>
    </h3>
  );
}

export function TopicDocView({
  classSlug, subjectSlug, unitId, topicSlug, topicTitle, data,
}: TopicDocViewProps) {
  const notes = data?.notes ?? [];
  const blocks = useMemo(() => parseNotes(notes), [notes]);
  const figuresEntry = useMemo(() => getTopicFigures(topicSlug), [topicSlug]);
  const figureMap = useMemo(
    () => keywordAnchor(figuresEntry?.figures ?? [], notes),
    [figuresEntry, notes],
  );
  const minutes = useMemo(
    () => readingMinutes(notes.join(" ") + " " + (data?.keyPoints ?? []).join(" ")),
    [notes, data],
  );
  const conceptMap = useMemo(
    () =>
      buildDocConceptMap({
        topicTitle,
        summary: data?.summary,
        notes,
        importantConcepts: data?.importantConcepts,
        keyPoints: data?.keyPoints,
        formulas: data?.formulas,
        examShortTricks: data?.examShortTricks,
        confusion: data?.confusion,
        specialNotes: data?.specialNotes,
        practiceQuestions: data?.practiceQuestions,
        mindmap: data?.mindmap ?? null,
      }),
    [topicTitle, data, notes],
  );

  const keyPoints = data?.keyPoints ?? [];
  const formulas = data?.formulas ?? [];
  const tricks = data?.examShortTricks ?? [];
  const traps = [
    ...(data?.importantNotes ?? []),
    ...(data?.specialNotes ?? []),
    ...(data?.confusion ?? []),
    ...(data?.importantStatements ?? []),
  ];
  const practice = [...(data?.practiceQuestions ?? []), ...(data?.practice ?? [])];
  const overview = [
    ...(data?.importantConcepts ?? []),
    ...(data?.universalFacts ?? []),
  ];
  void unitId;

  const figureCount = figuresEntry?.figures.length ?? 0;
  const branchCount = conceptMap.branches.length;

  return (
    <article className="doc-view space-y-8" aria-label={`${topicTitle} document`}>
      {/* ── Header ── */}
      <header className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">{classSlug.replace(/-notes$/, "")}</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 capitalize text-primary">{subjectSlug}</span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">{minutes} min read</span>
          {figureCount > 0 && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-emerald-600 dark:text-emerald-400">
              {figureCount} diagram{figureCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">{topicTitle}</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {branchCount > 0
            ? `Concept map with ${branchCount} branch${branchCount === 1 ? "" : "es"}${figureCount > 0 ? `, plus ${figureCount} authored diagram${figureCount === 1 ? "" : "s"}` : ""}.`
            : figuresEntry
              ? `Includes the ${figuresEntry.title} diagram.`
              : "Structured notes, key terms and practice."}
        </p>
      </header>

      {/* ── Mini TOC ── */}
      <nav aria-label="Document contents" className="rounded-2xl border border-border/70 bg-muted/30 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">On this page</p>
        <ol className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                <span className="font-bold text-primary">{i + 1}.</span> {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── 0. Concept map ── */}
      <section id="doc-map" className="scroll-mt-24 space-y-4">
        <SectionHeading id="doc-map" icon={<Network className="h-4 w-4 text-fuchsia-500" />}>
          Concept map
        </SectionHeading>
        <div className="rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/[0.04] p-4 sm:p-6">
          {branchCount > 0 ? (
            <>
              <DocMindMap map={conceptMap} />
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                {conceptMap.source === "authored"
                  ? "Authored concept tree for this topic — read it top-down before the explanation."
                  : "Concept tree generated from this topic's ideas, key points and formulas."}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              This topic has no concept-map data yet — the explanation below covers it in full.
            </p>
          )}
        </div>
      </section>

      {/* ── 1. Big picture ── */}
      <section id="doc-overview" className="scroll-mt-24 space-y-4">
        <SectionHeading id="doc-overview" icon={<Sparkles className="h-4 w-4 text-amber-500" />}>
          1. Big picture
        </SectionHeading>
        {data?.summary && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <MathMarkdown content={data.summary} className="text-sm leading-7" />
          </div>
        )}
        {overview.length > 0 ? (
          <ol className="space-y-2">
            {overview.map((c, i) => (
              <li key={`${c}-${i}`} className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 text-sm leading-relaxed">
                <span className="font-bold text-primary">{i + 1}.</span>
                <MathMarkdown content={c} className="inline text-sm leading-relaxed" />
              </li>
            ))}
          </ol>
        ) : !data?.summary ? (
          <p className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
            No overview authored for this topic yet — go straight to the explanation below.
          </p>
        ) : null}
      </section>

      {/* ── 2. The explanation ── */}
      <section id="doc-explain" className="scroll-mt-24 space-y-5">
        <SectionHeading id="doc-explain" icon={<BookOpen className="h-4 w-4 text-primary" />}>
          2. The explanation
        </SectionHeading>
        {blocks.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
            No long-form explanation authored here yet. Use the key terms and practice below.
          </p>
        ) : (
          blocks.map((block, bi) => (
            <div key={`block-${block.index}`}>
              {block.heading && (
                <h4 className="mb-2 mt-4 flex items-baseline gap-2 text-base font-bold text-foreground">
                  <span className="text-primary">{bi + 1}.</span>
                  <MathMarkdown content={block.heading} className="inline text-base font-bold" />
                </h4>
              )}
              <div className="space-y-3">
                {block.segments.map((seg, si) => (
                  <Segment key={`seg-${block.index}-${si}`} segment={seg} />
                ))}
              </div>
              {(figureMap.get(block.index) ?? []).map((f, fi) => (
                <FigureBlock key={`fig-${block.index}-${fi}`} figure={f} />
              ))}
            </div>
          ))
        )}
      </section>

      {/* ── 3. Key terms & formulas ── */}
      {(keyPoints.length > 0 || formulas.length > 0 || tricks.length > 0) && (
        <section id="doc-remember" className="scroll-mt-24 space-y-4">
          <SectionHeading id="doc-remember" icon={<ListOrdered className="h-4 w-4 text-violet-500" />}>
            3. Key terms &amp; formulas
          </SectionHeading>
          {keyPoints.length > 0 && (
            <ol className="space-y-2">
              {keyPoints.map((p, i) => (
                <li key={`${p}-${i}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-500">{i + 1}</span>
                  <MathMarkdown content={p} className="text-sm leading-relaxed" />
                </li>
              ))}
            </ol>
          )}
          {formulas.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Sigma className="h-3.5 w-3.5" /> Formulas
              </p>
              {formulas.map((f, i) => (
                <div key={`${f}-${i}`} className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-500">Equation {i + 1}</p>
                  <MathMarkdown content={f} className="mt-1 text-sm font-semibold" />
                </div>
              ))}
            </div>
          )}
          {tricks.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Calculator className="h-3.5 w-3.5" /> Memory shortcuts
              </p>
              {tricks.map((t, i) => (
                <div key={`${t}-${i}`} className="rounded-xl border-l-4 border-amber-500/60 bg-amber-500/5 p-3 text-sm leading-relaxed">
                  <MathMarkdown content={t} className="inline text-sm leading-relaxed" />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 4. Watch out ── */}
      {traps.length > 0 && (
        <section id="doc-traps" className="scroll-mt-24 space-y-3">
          <SectionHeading id="doc-traps" icon={<ShieldAlert className="h-4 w-4 text-rose-500" />}>
            4. Watch out
          </SectionHeading>
          {traps.map((t, i) => (
            <div key={`${t}-${i}`} className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
              <MathMarkdown content={t} className="inline text-sm leading-relaxed" />
            </div>
          ))}
        </section>
      )}

      {/* ── 5. Practice ── */}
      <section id="doc-practice" className="scroll-mt-24 space-y-3">
        <SectionHeading id="doc-practice" icon={<FileText className="h-4 w-4 text-emerald-500" />}>
          5. Practice
        </SectionHeading>
        {practice.length > 0 ? (
          <ol className="space-y-2">
            {practice.map((q, i) => (
              <li key={`${q}-${i}`} className="flex items-start gap-3 rounded-xl border border-border/60 p-3.5 text-sm leading-relaxed">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Q{i + 1}.</span>
                <MathMarkdown content={q} className="text-sm leading-relaxed" />
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
            No practice questions authored here yet — check the MCQ and Numericals tabs.
          </p>
        )}
      </section>
    </article>
  );
}
