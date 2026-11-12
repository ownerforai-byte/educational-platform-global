"use client";

/**
 * TopicDocView — renders a topic's concept JSON as a proper document:
 * header, mini TOC, then five sections (Big picture / The explanation /
 * Key terms & formulas / Watch out / Practice) with registry SVG figures
 * injected inline in the explanation flow.
 */

import { useMemo } from "react";
import {
  BookOpen, Calculator, FileText, Lightbulb, ListOrdered, ShieldAlert, Sparkles,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { parseNotes, readingMinutes, type DocSegment } from "./doc-parser";
import { getTopicFigures, type TopicFigure } from "./figures/registry";

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
      const i = notes.findIndex((n) => n.includes(f.keyword!));
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
      <div className="border-l-4 border-primary/50 bg-primary/5 py-3 pl-4 pr-3">
        <div className="text-sm leading-7">
          <strong className="font-bold text-foreground">{segment.term}.</strong>{" "}
          <MathMarkdown content={segment.body} className="inline text-sm leading-7" />
        </div>
      </div>
    );
  }
  if (segment.kind === "displayMath") {
    return (
      <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3 text-center">
        <MathMarkdown content={`$$${segment.tex}$$`} className="text-base" />
      </div>
    );
  }
  if (segment.kind === "list") {
    return (
      <ul className="list-disc space-y-1 pl-6 text-sm leading-7">
        {segment.items.map((item, i) => (
          <li key={i}><MathMarkdown content={item} className="inline text-sm leading-7" /></li>
        ))}
      </ul>
    );
  }
  return <MathMarkdown content={segment.body} className="text-sm leading-7" />;
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

  return (
    <article className="doc-view space-y-8" aria-label={`${topicTitle} document`}>
      {/* ── Header ── */}
      <header className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">{classSlug.replace(/-notes$/, "")}</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">{subjectSlug}</span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">{minutes} min read</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">{topicTitle}</h2>
        {figuresEntry && (
          <p className="mt-1 text-xs text-muted-foreground">Includes {figuresEntry.figures.length} authored diagram{figuresEntry.figures.length === 1 ? "" : "s"}: {figuresEntry.title}.</p>
        )}
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

      {/* ── 1. Big picture ── */}
      <section id="doc-overview" className="scroll-mt-24 space-y-4">
        <h3 className="flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold">
          <Sparkles className="h-4 w-4 text-amber-500" /> 1. Big picture
        </h3>
        {data?.summary && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm leading-7">{data.summary}</p>
          </div>
        )}
        {overview.length > 0 ? (
          <ol className="space-y-2">
            {overview.map((c, i) => (
              <li key={`${c}-${i}`} className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 text-sm leading-relaxed">
                <span className="font-bold text-primary">{i + 1}.</span>{c}
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
        <h3 className="flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold">
          <BookOpen className="h-4 w-4 text-primary" /> 2. The explanation
        </h3>
        {blocks.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
            No long-form explanation authored here yet. Use the key terms and practice below.
          </p>
        ) : (
          blocks.map((block, bi) => (
            <div key={`block-${block.index}`}>
              {block.heading && (
                <h4 className="mb-2 mt-4 text-base font-bold text-foreground">
                  <span className="mr-2 text-primary">{bi + 1}.</span>{block.heading}
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
          <h3 className="flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold">
            <ListOrdered className="h-4 w-4 text-violet-500" /> 3. Key terms & formulas
          </h3>
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
                <p key={`${t}-${i}`} className="rounded-xl bg-amber-500/5 p-3 text-sm leading-relaxed">{t}</p>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 4. Watch out ── */}
      {traps.length > 0 && (
        <section id="doc-traps" className="scroll-mt-24 space-y-3">
          <h3 className="flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold">
            <ShieldAlert className="h-4 w-4 text-rose-500" /> 4. Watch out
          </h3>
          {traps.map((t, i) => (
            <div key={`${t}-${i}`} className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />{t}
            </div>
          ))}
        </section>
      )}

      {/* ── 5. Practice ── */}
      <section id="doc-practice" className="scroll-mt-24 space-y-3">
        <h3 className="flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold">
          <FileText className="h-4 w-4 text-emerald-500" /> 5. Practice
        </h3>
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
