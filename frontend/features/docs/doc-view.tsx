"use client";

/**
 * TopicDocView — renders a topic's concept JSON as a paginated academic
 * document viewer with KaTeX math rendering, syntax highlighting, and reader
 * controls.
 *
 * Owner request (pagination): the document used to flow as one endless
 * article, which made long topics feel random and tiring. Every content
 * block is now expressed as bound paper pages via DocPager — a block that
 * does not fit on the current page moves to the next one, and headings are
 * never stranded at a page bottom. The block → page-item building lives in
 * doc-pages.tsx; the measuring/packing/print machinery lives in doc-pager.tsx.
 *
 * Persistent chrome (toolbar, metadata, outline) stays above the pages so
 * the reader controls are always reachable; the outline buttons jump
 * straight to the page holding that section.
 *
 * Every prose/math surface goes through <MathMarkdown>, which compiles
 * markdown + `$…$` / `$$…$$` / `\(…\)` / `\[…\]` LaTeX (and mhchem `\ce{}`)
 * to KaTeX.
 */

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  FileText,
  Printer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { parseNotes, readingMinutes } from "./doc-parser";
import { getTopicFigures, type TopicFigure } from "./figures/registry";
import { buildDocConceptMap, type RawMindmap } from "./doc-mindmap";
import { buildDocPageItems } from "./doc-pages";
import { DocPager, type DocPagerApi } from "./doc-pager";

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
  const pagerApiRef = useRef<DocPagerApi | null>(null);

  const notes = useMemo(() => data?.notes ?? [], [data]);
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

  const formulas = data?.formulas ?? [];
  const figureCount = figuresEntry?.figures.length ?? 0;
  const branchCount = conceptMap.branches.length;
  void unitId;

  const fontClass =
    fontSize === "sm"
      ? "text-xs leading-6"
      : fontSize === "lg"
        ? "text-base leading-8"
        : "text-sm leading-7";

  const items = useMemo(
    () =>
      buildDocPageItems({
        classSlug,
        subjectSlug,
        topicTitle,
        data,
        blocks,
        figureMap,
        conceptMap,
        fontClass,
        figureCount,
      }),
    [classSlug, subjectSlug, topicTitle, data, blocks, figureMap, conceptMap, fontClass, figureCount],
  );

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

  const jumpToSection = (sectionId: string) => {
    pagerApiRef.current?.goToSection(sectionId);
  };

  return (
    <article
      className="doc-view doc-viewer-paper mx-auto max-w-4xl space-y-6 rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-10 print:border-none print:bg-white print:p-0 print:shadow-none"
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

      {/* ── Mini TOC / Outline — jumps straight to the page holding a section ── */}
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
              <button
                type="button"
                onClick={() => jumpToSection(s.id)}
                className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                <span className="font-bold text-primary">{i + 1}.</span> {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Paginated document body ── */}
      <DocPager
        items={items}
        measureKey={fontSize}
        ariaLabel={`${topicTitle} document`}
        onApiReady={(api) => {
          pagerApiRef.current = api;
        }}
      />
    </article>
  );
}
