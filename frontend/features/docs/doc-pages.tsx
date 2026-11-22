"use client";

/**
 * DocPages — turns one topic's concept JSON into DocPager page items.
 *
 * This is the single common render for every topic document: the six academic
 * sections (concept map, big picture, explanation, key terms & formulas,
 * watch out, practice) are expressed as measurable page blocks. The pager
 * (doc-pager.tsx) then packs them into bound paper pages — anything that
 * does not fit on the current page moves to the next one, and a heading is
 * never stranded at the bottom of a page.
 *
 * The markup per section is intentionally identical to the previous flowing
 * DocView, so the visual language (KaTeX cards, figure groups, traps,
 * practice list) is unchanged — only the pagination around it is new.
 */

import {
  BookOpen,
  Calculator,
  FileText,
  Lightbulb,
  ListOrdered,
  Network,
  ShieldAlert,
  Sigma,
  Sparkles,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import type { DocBlock, DocSegment } from "./doc-parser";
import type { TopicFigure } from "./figures/registry";
import { ZoomableFigure } from "./figures/zoomable-figure";
import type { DocConceptMap } from "./doc-mindmap";
import { DocMindMap } from "./doc-mindmap-view";
import type { DocPagerItem } from "./doc-pager";
import type { TopicDocData } from "./doc-view";

function FigureBlock({ figure }: { figure: TopicFigure }) {
  // Owner request 2026-11-21: diagrams must be zoomable — click opens the
  // fullscreen lightbox where the SVG re-renders at viewport scale.
  return <ZoomableFigure Component={figure.Component} caption={figure.caption} alt={figure.alt} />;
}

/**
 * Owner request: when several figures anchor to the same note block, lay them
 * out side by side (2-up on md+, 3-up on xl) instead of stacking — each stays
 * individually zoomable.
 */
function FigureGroup({ figures, blockIndex }: { figures: TopicFigure[]; blockIndex: number }) {
  if (figures.length === 0) return null;
  if (figures.length === 1) return <FigureBlock figure={figures[0]} />;
  return (
    <div
      className={`my-5 grid gap-4 ${figures.length >= 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"} print:grid-cols-2`}
      data-figure-group={blockIndex}
    >
      {figures.map((f, fi) => (
        <FigureBlock key={`fig-${blockIndex}-${fi}`} figure={f} />
      ))}
    </div>
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
  if (segment.kind === "table") {
    // GFM rows re-joined and compiled through the same pipeline as every other
    // surface — remark-gfm rebuilds the real <table> (with the scroll wrapper
    // the pipeline adds), so comparison tables render as tables, never as
    // shattered pipe paragraphs.
    return <MathMarkdown content={segment.rows.join("\n")} className="my-4" />;
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
      <span id={id} className="flex items-center gap-2 scroll-mt-24">
        {icon} {children}
      </span>
    </h3>
  );
}

export interface DocPageItemsInput {
  classSlug: string;
  subjectSlug: string;
  topicTitle: string;
  data: TopicDocData | null | undefined;
  blocks: DocBlock[];
  figureMap: Map<number, TopicFigure[]>;
  conceptMap: DocConceptMap;
  fontClass: string;
  figureCount: number;
}

/**
 * Build the ordered page items for one topic document. Pure (no state) so it
 * can run on the server, in tests, and on every font-size change.
 */
export function buildDocPageItems({
  classSlug,
  subjectSlug,
  topicTitle,
  data,
  blocks,
  figureMap,
  conceptMap,
  fontClass,
}: DocPageItemsInput): DocPagerItem[] {
  const items: DocPagerItem[] = [];

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
  const overview = [...(data?.importantConcepts ?? []), ...(data?.universalFacts ?? [])];
  const branchCount = conceptMap.branches.length;

  // ── Concept map ──────────────────────────────────────────────────────────
  items.push({
    key: "sec-map",
    sectionId: "doc-map",
    node: (
      <section id="doc-map" className="scroll-mt-24 space-y-4 print:break-inside-avoid">
        <SectionHeading id="doc-map-heading" icon={<Network className="h-4 w-4 text-fuchsia-500" />}>
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
    ),
  });

  // ── Big picture ──────────────────────────────────────────────────────────
  if (data?.summary || overview.length > 0) {
    items.push({
      key: "sec-overview-head",
      sectionId: "doc-overview",
      keepWithNext: true,
      node: (
        <section id="doc-overview" className="scroll-mt-24 space-y-4">
          <SectionHeading id="doc-overview-heading" icon={<Sparkles className="h-4 w-4 text-amber-500" />}>
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
        </section>
      ),
    });
    overview.forEach((c, i) => {
      items.push({
        key: `overview-${i}`,
        node: (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5 shadow-2xs print:border-gray-300 print:bg-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary print:bg-gray-200 print:text-black">
              {i + 1}
            </span>
            <MathMarkdown content={c} className={`inline ${fontClass}`} />
          </div>
        ),
      });
    });
  } else {
    items.push({
      key: "sec-overview-empty",
      sectionId: "doc-overview",
      node: (
        <section id="doc-overview" className="scroll-mt-24 space-y-4">
          <SectionHeading id="doc-overview-heading" icon={<Sparkles className="h-4 w-4 text-amber-500" />}>
            1. Big picture
          </SectionHeading>
          <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
            No overview authored for this topic yet — go straight to the explanation below.
          </p>
        </section>
      ),
    });
  }

  // ── The explanation ──────────────────────────────────────────────────────
  items.push({
    key: "sec-explain-head",
    sectionId: "doc-explain",
    keepWithNext: true,
    node: (
      <section id="doc-explain" className="scroll-mt-24">
        <SectionHeading id="doc-explain-heading" icon={<BookOpen className="h-4 w-4 text-primary" />}>
          2. The explanation
        </SectionHeading>
      </section>
    ),
  });

  if (blocks.length === 0) {
    items.push({
      key: "explain-empty",
      node: (
        <p className="rounded-xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
          No long-form explanation authored here yet. Use the key terms and practice below.
        </p>
      ),
    });
  } else {
    blocks.forEach((block, bi) => {
      if (block.heading) {
        const blockFigures = block.segments.length === 0 ? figureMap.get(block.index) ?? [] : [];
        items.push({
          key: `block-${block.index}-heading`,
          keepWithNext: true,
          node: (
            <div>
              <h4 className="mb-2 mt-4 flex items-baseline gap-2 text-base sm:text-lg font-bold text-foreground print:text-black">
                <span className="text-primary font-bold">{bi + 1}.</span>
                <MathMarkdown content={block.heading} className="inline text-base sm:text-lg font-bold" />
              </h4>
              {block.segments.length === 0 && (
                <FigureGroup figures={blockFigures} blockIndex={block.index} />
              )}
            </div>
          ),
        });
      }
      block.segments.forEach((seg, si) => {
        const isLast = si === block.segments.length - 1;
        const blockFigures = isLast ? figureMap.get(block.index) ?? [] : [];
        items.push({
          key: `block-${block.index}-seg-${si}`,
          node: (
            <div>
              <Segment segment={seg} fontClass={fontClass} />
              {isLast && <FigureGroup figures={blockFigures} blockIndex={block.index} />}
            </div>
          ),
        });
      });
    });
  }

  // ── Key terms & formulas ─────────────────────────────────────────────────
  if (keyPoints.length > 0 || formulas.length > 0 || tricks.length > 0) {
    items.push({
      key: "sec-remember-head",
      sectionId: "doc-remember",
      keepWithNext: true,
      node: (
        <section id="doc-remember" className="scroll-mt-24">
          <SectionHeading id="doc-remember-heading" icon={<ListOrdered className="h-4 w-4 text-violet-500" />}>
            3. Key terms &amp; formulas
          </SectionHeading>
        </section>
      ),
    });

    if (keyPoints.length > 0) {
      keyPoints.forEach((p, i) => {
        items.push({
          key: `keypoint-${i}`,
          node: (
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-2xs print:border-gray-300 print:bg-white">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-500 print:bg-gray-200 print:text-black">
                {i + 1}
              </span>
              <MathMarkdown content={p} className={fontClass} />
            </div>
          ),
        });
      });
    }

    if (formulas.length > 0) {
      items.push({
        key: "formulas-label",
        keepWithNext: true,
        node: (
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground print:text-gray-700">
            <Sigma className="h-3.5 w-3.5 text-sky-500" /> Core Mathematical Formulas
          </p>
        ),
      });
      formulas.forEach((f, i) => {
        items.push({
          key: `formula-${i}`,
          node: (
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 shadow-2xs print:border-gray-300 print:bg-white print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Formula {i + 1}
                </span>
              </div>
              <MathMarkdown content={f} className="mt-1.5 text-sm sm:text-base font-semibold" />
            </div>
          ),
        });
      });
    }

    if (tricks.length > 0) {
      items.push({
        key: "tricks-label",
        keepWithNext: true,
        node: (
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground print:text-gray-700">
            <Calculator className="h-3.5 w-3.5 text-amber-500" /> Memory Shortcuts &amp; Exam Tricks
          </p>
        ),
      });
      tricks.forEach((t, i) => {
        items.push({
          key: `trick-${i}`,
          node: (
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 p-3.5 shadow-2xs print:border-black print:bg-gray-100">
              <MathMarkdown content={t} className={`inline ${fontClass}`} />
            </div>
          ),
        });
      });
    }
  }

  // ── Watch out ────────────────────────────────────────────────────────────
  if (traps.length > 0) {
    items.push({
      key: "sec-traps-head",
      sectionId: "doc-traps",
      keepWithNext: true,
      node: (
        <section id="doc-traps" className="scroll-mt-24">
          <SectionHeading id="doc-traps-heading" icon={<ShieldAlert className="h-4 w-4 text-rose-500" />}>
            4. Watch out (Common Traps &amp; Exam Pitfalls)
          </SectionHeading>
        </section>
      ),
    });
    traps.forEach((t, i) => {
      items.push({
        key: `trap-${i}`,
        node: (
          <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 border-l-4 border-l-rose-500 bg-rose-500/10 dark:bg-rose-500/5 p-3.5 shadow-2xs print:border-black print:bg-gray-100">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 print:text-black" />
            <MathMarkdown content={t} className={`inline ${fontClass}`} />
          </div>
        ),
      });
    });
  }

  // ── Practice ─────────────────────────────────────────────────────────────
  items.push({
    key: "sec-practice-head",
    sectionId: "doc-practice",
    keepWithNext: true,
    node: (
      <section id="doc-practice" className="scroll-mt-24">
        <SectionHeading id="doc-practice-heading" icon={<FileText className="h-4 w-4 text-emerald-500" />}>
          5. Practice
        </SectionHeading>
      </section>
    ),
  });
  if (practice.length > 0) {
    practice.forEach((q, i) => {
      items.push({
        key: `practice-${i}`,
        node: (
          <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-2xs print:border-gray-300 print:bg-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 print:bg-gray-200 print:text-black">
              Q{i + 1}
            </span>
            <MathMarkdown content={q} className={fontClass} />
          </div>
        ),
      });
    });
  } else {
    items.push({
      key: "practice-empty",
      node: (
        <p className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
          No practice questions authored here yet — check the MCQ and Numericals tabs.
        </p>
      ),
    });
  }

  // ── Document footer ──────────────────────────────────────────────────────
  items.push({
    key: "doc-footer",
    node: (
      <footer className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground print:border-black print:text-black">
        <p>Official Nepal Curriculum Syllabus Document · Typeset with KaTeX &amp; Markdown Engine</p>
        <p className="mt-1 print:hidden">
          {classSlug.replace(/-notes$/, "")} · {subjectSlug} · {topicTitle}
        </p>
      </footer>
    ),
  });

  return items;
}
