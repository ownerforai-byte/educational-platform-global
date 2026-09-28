"use client";

/**
 * Shared knowledge furniture for every visual surface (schematics, mindmap
 * branches, and any sheet with a reveal/hide affordance).
 *
 * Knowledge is shown as a rectangular block that FLOATS over the drawing
 * itself (on hover or click — click pins it) instead of a separate box below
 * the sheet, so facts arrive in less time and less space. Facts are written
 * with compact symbols; the symbol → meaning legend is rendered permanently
 * below the sheet by {@link SymbolLegend}, while the symbol-bearing rows only
 * appear inside the block while it is visible.
 */

import type { ReactNode, CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { X } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";

/**
 * Mono rows often carry raw LaTeX (`\frac{…}{…}`). Render those through the
 * math pipeline instead of showing source; plain unicode rows stay plain.
 */
function mathContent(text: string): string | null {
  if (!/\\[a-zA-Z]+/.test(text)) return null; // no LaTeX commands
  if (text.includes("$$")) return text;
  if (text.includes("$")) return null; // inline math already delimited — leave as typed
  return `$$${text}$$`;
}

/** The permanent symbol vocabulary — meanings always shown below the sheet. */
export const KNOWLEDGE_SYMBOLS: readonly { glyph: string; meaning: string }[] = [
  { glyph: "§", meaning: "summary" },
  { glyph: "ƒ", meaning: "value · formula" },
  { glyph: "✎", meaning: "derivation" },
  { glyph: "★", meaning: "exam pointer" },
  { glyph: "✦", meaning: "key fact" },
  { glyph: "◆", meaning: "exceptional case" },
  { glyph: "❓", meaning: "exam-asked" },
  { glyph: "✗", meaning: "beginner mistake" },
  { glyph: "⚠", meaning: "common trap" },
];

/**
 * Glyph per depth-pack field, in render order. Kept here so the legend and
 * the row builder can never drift apart.
 */
export const DEPTH_SYMBOLS = {
  keyFacts: "✦",
  edgeCases: "◆",
  examAsked: "❓",
  commonMistakes: "✗",
} as const;

/** Render order of the depth fields inside the knowledge block. */
export const DEPTH_ORDER = [
  "keyFacts",
  "edgeCases",
  "examAsked",
  "commonMistakes",
] as const;

/** Exam pointer glyph: traps self-identify ("TRAP: …") and get ⚠ instead of ★. */
export function examSymbol(text: string): string {
  return /^\s*trap\b/i.test(text) ? "⚠" : "★";
}

export interface KnowledgeRow {
  /** Symbol from KNOWLEDGE_SYMBOLS rendered in the left gutter. */
  symbol: string;
  /** The fact itself — plain text or rendered markup (KaTeX etc.). */
  text: ReactNode;
  /** Monospace styling for formulas / measured values. */
  mono?: boolean;
}

interface KnowledgeBlockProps {
  title: string;
  /** Accent colour (part/branch colour) for the dot, symbols and border. */
  color: string;
  rows: KnowledgeRow[];
  onClose: () => void;
  /** "dark" pins slate styling for surfaces that hardcode a dark panel. */
  tone?: "theme" | "dark";
  style?: CSSProperties;
  className?: string;
  onPointerEnter?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerLeave?: (e: ReactPointerEvent<HTMLDivElement>) => void;
}

/**
 * Floating rectangular knowledge block. Position it with `style` (absolute
 * coordinates inside a relative sheet container) — schematics anchor it next
 * to the hovered chip, hub surfaces can pin it to a corner.
 */
export function KnowledgeBlock({
  title,
  color,
  rows,
  onClose,
  tone = "theme",
  style,
  className = "",
  onPointerEnter,
  onPointerLeave,
}: KnowledgeBlockProps) {
  return (
    <div
      data-knowledge-block=""
      data-tone={tone}
      role="group"
      aria-label={`Knowledge: ${title}`}
      className={`knowledge-block ${className}`}
      style={{ ...style, ["--kb-color" as string]: color }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="knowledge-block__head">
        <span className="knowledge-block__dot" aria-hidden />
        <h5 className="knowledge-block__title">{title}</h5>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close knowledge block"
          className="knowledge-block__close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <ul className="knowledge-block__rows">
        {rows.map((row, i) => (
          <li key={`${row.symbol}-${i}`} className="knowledge-block__row">
            <span className="knowledge-block__symbol" aria-hidden>
              {row.symbol}
            </span>
            {row.mono && typeof row.text === "string" && mathContent(row.text) ? (
              <span className="knowledge-block__text knowledge-block__text--mono">
                <MathMarkdown
                  content={mathContent(row.text) as string}
                  className="knowledge-block__math"
                />
              </span>
            ) : (
              <span
                className={`knowledge-block__text${row.mono ? " knowledge-block__text--mono" : ""}`}
              >
                {row.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SymbolLegendProps {
  /** Short affordance hint shown before the symbols (e.g. "hover / tap a label"). */
  hint?: string;
  tone?: "theme" | "dark";
  className?: string;
}

/**
 * The permanent symbol → meaning strip rendered below every sheet that uses
 * KnowledgeBlock rows. Always visible — the meanings never hide.
 */
export function SymbolLegend({ hint, tone = "theme", className = "" }: SymbolLegendProps) {
  return (
    <div
      data-tone={tone}
      className={`symbol-legend ${className}`}
      aria-label="Symbol legend"
    >
      {hint && <span className="symbol-legend__hint">{hint}</span>}
      {KNOWLEDGE_SYMBOLS.map((s) => (
        <span key={s.glyph} className="symbol-legend__item" title={s.meaning}>
          <span className="symbol-legend__glyph" aria-hidden>
            {s.glyph}
          </span>
          <span className="symbol-legend__meaning">{s.meaning}</span>
        </span>
      ))}
    </div>
  );
}
