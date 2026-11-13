"use client";

/**
 * TopicDocView — renders a topic's concept JSON as a clean, properly formatted
 * document viewer with KaTeX math rendering, syntax highlighting, and reader controls.
 *
 * Layout (Academic Document Reader):
 *   0. Document Control Bar (Print/PDF, font size, copy link)
 *   1. Concept map      — hand-drawn SVG mind map / concept tree
 *   2. Big picture      — high-yield summary & fundamental concepts
 *   3. The explanation  — parsed note flow, definitions, equations + inline figures
 *   4. Key terms & formulas — equations, symbols, memory shortcuts
 *   5. Watch out        — traps, common exam pitfalls & misconceptions
 *   6. Practice         — practice questions & worked problems
 *
 * Every prose/math surface goes through <MathMarkdown>, which compiles markdown
 * + `$…$` / `$$…$$` / `\(…\)` / `\[…\]` LaTeX (and mhchem `\ce{}`) to KaTeX.
 */

import { useMemo, useState } from "react";
import {
  BookOpen,
  Calculator,
  Check,
  Copy,
  FileText,
  Lightbulb,
  ListOrdered,
  Network,
  Printer,
  ShieldAlert,
  Sigma,
  Sparkles,
  ZoomIn,
  ZoomOut,
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
    <figure className="my-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-4 print:border-gray-300">
      <F className="mx-auto w-full max-w-[640px] text-foreground print:text-black" />
      <figcaption className="mt-2 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground print:text-gray-700">
        {figure.caption}
      </figcaption>
    </figure>
  );
}

function Segment({ segment, fontClass }: { segment: DocSegment; fontClass: string }) {
  if (segment.kind === "definition") {
    return (
      <div className="rounded-xl border-l-4 border-primary/80 bg-primary/5 py-3 pl-4 pr-3.5 shadow-2xs print:border-black print:bg-gray-100">
        <div className={fontClass}>
          <span className="inline-block rounded-md bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary mr-2 uppercase tracking-wide print:bg-gray-200 print:text-black">
            {segment.term}
          </span>
          <MathMarkdown content={segment.body} className={`inline ${fontClass}`} />
        </div>
      </div>
    );
  }
  if (segment.kind === "displayMath") {
    return (
      <div className="my-4 overflow-x-auto rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 text-center shadow-2xs print:border-gray-300 print:bg-white">
        <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1 print:text-gray-600">
          Equation
        </div>
        <MathMarkdown content={`$$${segment.tex}$$`} className="text-base sm:text-lg" />
      </div>
    );
  }
  if (segment.kind === "list") {
    return (
      <ul className={`my-2 space-y-1.5 pl-6 ${fontClass}`}>
        {segment.items.map((item, i) => (
          <li key={i} className="marker:text-primary list-disc print:marker:text-black">
            <MathMarkdown content={item} className={`inline ${fontClass}`} />
          </li>
        ))}
      </ul>
    );
  }
  return <MathMarkdown content={segment.body} className={fontClass} />;
}

function SectionHeading({
  id,
  icon,
  children,
  tone,
}: {
  id: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <h3 className={`flex items-center gap-2 border-b border-border/60 pb-2 text-lg font-bold print:border-black ${tone ?? ""}`}>
      <a href={`#${id}`} className="flex items-center gap-2 text-inherit no-underline">
        {icon} {children}
      </a>
    </h3>
  );
}

export function TopicDocView({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  topicTitle,
  data,
}: TopicDocViewProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);

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

  const fontClass =
    fontSize === "sm"
      ? "text-xs leading-6"
      : fontSize === "lg"
        ? "text-base leading-8"
        : "text-sm leading-7";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      className="doc-view doc-viewer-paper mx-auto max-w-4xl space-y-8 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-10 print:border-none print:bg-white print:p-0 print:shadow-none"
      aria-label={`${topicTitle} document`}
    >
      {/* ── Document Reader Toolbar ── */}
      <header className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6 print:border-black print:bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-primary">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-primary">
              Docs Viewer · Verified Syllabus Document
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Font Size Adjust */}
            <div className="flex items-center rounded-lg border border-border/70 bg-background/80 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                title="Small text"
                className={`rounded px-2 py-1 font-semibold transition-colors ${fontSize === "sm" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <ZoomOut className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                title="Default text"
                className={`rounded px-2 py-1 font-semibold transition-colors ${fontSize === "base" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("lg")}
                title="Large text"
                className={`rounded px-2 py-1 font-semibold transition-colors ${fontSize === "lg" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <ZoomIn className="h-3 w-3" />
              </button>
            </div>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy document link"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border/70 bg-background/80 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Link"}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              title="Print document or Save as PDF"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Document Metadata Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary print:border print:border-black print:text-black">
            {classSlug.replace(/-notes$/, "")}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 capitalize text-primary print:border print:border-black print:text-black">
            {subjectSlug}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground print:border print:border-black print:text-black">
            {minutes} min read
          </span>
          <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-sky-600 dark:text-sky-400 print:border print:border-black print:text-black">
            LaTeX / KaTeX Typeset
          </span>
          {formulas.length > 0 && (
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-amber-600 dark:text-amber-400 print:hidden">
              {formulas.length} equation{formulas.length === 1 ? "" : "s"}
            </span>
          )}
          {figureCount > 0 && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-emerald-600 dark:text-emerald-400 print:hidden">
              {figureCount} diagram{figureCount === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground print:text-black">
          {topicTitle}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground print:text-gray-700">
          {branchCount > 0
            ? `Structured academic document with ${branchCount} conceptual branches, formal derivations, exam shortcuts, and practice problems.`
            : "Complete verified syllabus document with KaTeX mathematical formulas, definitions, and practice exercises."}
        </p>
      </header>

      {/* ── Mini TOC / Outline ── */}
      <nav
        aria-label="Document contents"
        className="rounded-xl border border-border/70 bg-muted/30 p-3.5 print:hidden"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Document Outline
        </p>
        <ol className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                <span className="font-bold text-primary">{i + 1}.</span> {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── 0. Concept Map ── */}
      <section id="doc-map" className="scroll-mt-24 space-y-4 print:break-inside-avoid">
        <SectionHeading id="doc-map" icon={<Network className="h-4 w-4 text-fuchsia-500" />}>
          Concept map
        </SectionHeading>
        <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/[0.03] p-4 sm:p-6 print:border-gray-300 print:bg-white">
          {branchCount > 0 ? (
            <>
              <DocMindMap map={conceptMap} />
              <p className="mt-3 text-center text-[11px] text-muted-foreground print:hidden">
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
      <section id="doc-overview" className="scroll-mt-24 space-y-4 print:break-inside-avoid">
        <SectionHeading id="doc-overview" icon={<Sparkles className="h-4 w-4 text-amber-500" />}>
          1. Big picture
        </SectionHeading>
        {data?.summary && (
          <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5 p-4 sm:p-5 shadow-2xs print:border-black print:bg-gray-100">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 print:text-black">
              Executive Summary
            </div>
            <MathMarkdown content={data.summary} className={fontClass} />
          </div>
        )}
        {overview.length > 0 ? (
          <ol className="space-y-2">
            {overview.map((c, i) => (
              <li
                key={`${c}-${i}`}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5 shadow-2xs print:border-gray-300 print:bg-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary print:bg-gray-200 print:text-black">
                  {i + 1}
                </span>
                <MathMarkdown content={c} className={`inline ${fontClass}`} />
              </li>
            ))}
          </ol>
        ) : !data?.summary ? (
          <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
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
          <p className="rounded-xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
            No long-form explanation authored here yet. Use the key terms and practice below.
          </p>
        ) : (
          blocks.map((block, bi) => (
            <div key={`block-${block.index}`} className="space-y-3 print:break-inside-avoid">
              {block.heading && (
                <h4 className="mb-2 mt-4 flex items-baseline gap-2 text-base sm:text-lg font-bold text-foreground print:text-black">
                  <span className="text-primary font-bold">{bi + 1}.</span>
                  <MathMarkdown content={block.heading} className="inline text-base sm:text-lg font-bold" />
                </h4>
              )}
              <div className="space-y-3">
                {block.segments.map((seg, si) => (
                  <Segment key={`seg-${block.index}-${si}`} segment={seg} fontClass={fontClass} />
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
        <section id="doc-remember" className="scroll-mt-24 space-y-4 print:break-inside-avoid">
          <SectionHeading id="doc-remember" icon={<ListOrdered className="h-4 w-4 text-violet-500" />}>
            3. Key terms &amp; formulas
          </SectionHeading>
          {keyPoints.length > 0 && (
            <ol className="space-y-2">
              {keyPoints.map((p, i) => (
                <li
                  key={`${p}-${i}`}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-2xs print:border-gray-300 print:bg-white"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-500 print:bg-gray-200 print:text-black">
                    {i + 1}
                  </span>
                  <MathMarkdown content={p} className={fontClass} />
                </li>
              ))}
            </ol>
          )}
          {formulas.length > 0 && (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground print:text-gray-700">
                <Sigma className="h-3.5 w-3.5 text-sky-500" /> Core Mathematical Formulas
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {formulas.map((f, i) => (
                  <div
                    key={`${f}-${i}`}
                    className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 shadow-2xs print:border-gray-300 print:bg-white print:break-inside-avoid"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Formula {i + 1}
                      </span>
                    </div>
                    <MathMarkdown content={f} className="mt-1.5 text-sm sm:text-base font-semibold" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {tricks.length > 0 && (
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground print:text-gray-700">
                <Calculator className="h-3.5 w-3.5 text-amber-500" /> Memory Shortcuts &amp; Exam Tricks
              </p>
              {tricks.map((t, i) => (
                <div
                  key={`${t}-${i}`}
                  className="rounded-xl border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 p-3.5 shadow-2xs print:border-black print:bg-gray-100"
                >
                  <MathMarkdown content={t} className={`inline ${fontClass}`} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 4. Watch out ── */}
      {traps.length > 0 && (
        <section id="doc-traps" className="scroll-mt-24 space-y-3 print:break-inside-avoid">
          <SectionHeading id="doc-traps" icon={<ShieldAlert className="h-4 w-4 text-rose-500" />}>
            4. Watch out (Common Traps &amp; Exam Pitfalls)
          </SectionHeading>
          <div className="space-y-2.5">
            {traps.map((t, i) => (
              <div
                key={`${t}-${i}`}
                className="flex items-start gap-3 rounded-xl border border-rose-500/30 border-l-4 border-l-rose-500 bg-rose-500/10 dark:bg-rose-500/5 p-3.5 shadow-2xs print:border-black print:bg-gray-100"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 print:text-black" />
                <MathMarkdown content={t} className={`inline ${fontClass}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. Practice ── */}
      <section id="doc-practice" className="scroll-mt-24 space-y-3 print:break-inside-avoid">
        <SectionHeading id="doc-practice" icon={<FileText className="h-4 w-4 text-emerald-500" />}>
          5. Practice
        </SectionHeading>
        {practice.length > 0 ? (
          <ol className="space-y-2.5">
            {practice.map((q, i) => (
              <li
                key={`${q}-${i}`}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-2xs print:border-gray-300 print:bg-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 print:bg-gray-200 print:text-black">
                  Q{i + 1}
                </span>
                <MathMarkdown content={q} className={fontClass} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
            No practice questions authored here yet — check the MCQ and Numericals tabs.
          </p>
        )}
      </section>

      {/* Document Footer */}
      <footer className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground print:border-black print:text-black">
        <p>Official Nepal Curriculum Syllabus Document · Typeset with KaTeX &amp; Markdown Engine</p>
      </footer>
    </article>
  );
}
