"use client";

/**
 * TopicDocView — renders a topic's concept JSON as an A4-paper academic
 * document with KaTeX math rendering, syntax highlighting, and reader
 * controls.
 *
 * Owner request (A4 paper): the previous bound-page pager felt like a web
 * widget — chunked sheets, page folios, card backgrounds. The document now
 * reads like a real printout: ONE continuous A4-proportioned paper sheet on
 * a desk surface, all content flowing on it like a book — justified
 * paragraphs, small print-size letters, generous paper margins. The
 * block → item building lives in doc-pages.tsx; the paper typography lives
 * in the `.a4-paper` rules in app/globals.css.
 *
 * Persistent chrome (toolbar, outline) stays above the paper so the reader
 * controls are always reachable; the outline buttons scroll the paper to
 * the section anchor. Every prose/math surface goes through <MathMarkdown>,
 * which compiles markdown + `$…$` / `$$…$$` / `\(…\)` / `\[…\]` LaTeX (and
 * mhchem `\ce{}`) to KaTeX.
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
  const paperRef = useRef<HTMLDivElement>(null);

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
      ? "text-[11.5px] leading-[1.7]"
      : fontSize === "lg"
        ? "text-[15px] leading-[1.8]"
        : "text-[13px] leading-[1.8]";

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
    const el =
      paperRef.current?.querySelector(`#${CSS.escape(sectionId)}`) ??
      document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article
      className="doc-view"
      aria-label={`${topicTitle} document`}
    >
      {/* ── Document Reader Toolbar (desk chrome — never printed) ── */}
      <header className="print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
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

        {/* ── Mini TOC / Outline — scrolls the paper to the section ── */}
        <nav
          aria-label="Document contents"
          className="mt-3 rounded-xl border border-border/70 bg-muted/30 p-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Document Outline
          </p>
          <ol className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
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
      </header>

      {/* ── The desk the A4 sheet lies on ── */}
      <div className="a4-desk mt-4 rounded-xl px-2 py-6 sm:px-6 sm:py-10 print:p-0">
        {/* ── The A4 paper: one continuous sheet, all content printed on it ── */}
        <div
          ref={paperRef}
          data-a4-paper=""
          className="a4-paper"
          role="document"
        >
          {/* Printed document head — badges, title, standfirst */}
          <header className="a4-head mb-8 border-b-2 border-neutral-800 pb-5">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              <span className="text-neutral-800">{classSlug.replace(/-notes$/, "")}</span>
              <span aria-hidden>·</span>
              <span className="capitalize">{subjectSlug}</span>
              <span aria-hidden>·</span>
              <span>{minutes} min read</span>
              {formulas.length > 0 && (
                <span>
                  {formulas.length} equation{formulas.length === 1 ? "" : "s"}
                </span>
              )}
              {figureCount > 0 && (
                <span>
                  {figureCount} diagram{figureCount === 1 ? "" : "s"}
                </span>
              )}
            </div>
            <h1 className="a4-title">{topicTitle}</h1>
            <p className="a4-standfirst mt-2">
              {branchCount > 0
                ? `Structured academic document with ${branchCount} conceptual branches, formal derivations, exam shortcuts, and practice problems.`
                : "Complete verified syllabus document with definitions, worked explanations, and practice exercises."}
            </p>
          </header>

          {/* The printed body: every block flows on the same sheet */}
          <div className="flow-root">
            {items.map((it) => (
              <div
                key={it.key}
                data-doc-section={it.sectionId ?? undefined}
                className="flow-root pb-4"
              >
                {it.node}
              </div>
            ))}
          </div>

          {/* Printed foot rule, like a book's end-of-document rule */}
          <footer className="a4-foot mt-10 border-t border-neutral-300 pt-3 text-center text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            End of document · {topicTitle}
          </footer>
        </div>
      </div>
    </article>
  );
}
