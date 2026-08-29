import type { KatexOptions } from "katex";

/**
 * Shared KaTeX macros available to every math expression on the platform.
 * Keeps authoring terse and consistent across subjects.
 */
export const KATEX_MACROS: Record<string, string> = {
  // ── Number sets / logic ────────────────────────────────────────────────
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\Q": "\\mathbb{Q}",
  "\\C": "\\mathbb{C}",
  "\\oo": "\\infty",
  // ── Set notation ───────────────────────────────────────────────────────
  // \set{x}{x > 0}  →  { x | x > 0 }
  "\\set": "\\left\\{\\,#1\\;\\middle|\\;#2\\,\\right\\}",
  "\\card": "\\left|#1\\right|",
  "\\pow": "\\mathcal{P}\\!\\left(#1\\right)",
  // ── Calculus ───────────────────────────────────────────────────────────
  "\\dd": "\\mathrm{d}",
  "\\dx": "\\,dx",
  "\\dt": "\\,dt",
  // \limto{x}{0}  →  lim_{x → 0}
  "\\limto": "\\lim_{#1 \\to #2}",
  // ── Linear algebra / determinants ──────────────────────────────────────
  "\\tr": "\\operatorname{tr}",
  "\\rank": "\\operatorname{rank}",
  "\\adj": "\\operatorname{adj}",
  "\\diag": "\\operatorname{diag}",
  "\\T": "^{\\mathsf{T}}",
  "\\inv": "^{-1}",
  "\\orth": "^{\\perp}",
  // ── Vectors (existing) + misc science ─────────────────────────────────
  "\\abs": "\\left|#1\\right|",
  "\\norm": "\\left\\lVert#1\\right\\rVert",
  // ── Vectors ────────────────────────────────────────────────────────────
  "\\ve": "\\vec{#1}",
  "\\vv": "\\boldsymbol{#1}",
  // Unit vectors along the coordinate axes
  "\\uvi": "\\hat{\\imath}",
  "\\uvj": "\\hat{\\jmath}",
  "\\uvk": "\\hat{k}",
  "\\dotp": "\\cdot",
  "\\cross": "\\times",
  // \proj{u}{v}  →  proj_u v
  "\\proj": "\\text{proj}_{#1}\\,#2",
  "\\unit": "\\,\\mathrm{#1}",
  "\\degree": "^{\\circ}",
  "\\half": "\\tfrac{1}{2}",
  "\\ee": "\\mathrm{e}",
  "\\ii": "\\mathrm{i}",
  "\\eps": "\\varepsilon",
};

export const KATEX_OPTIONS: KatexOptions & { macros: Record<string, string> } = {
  throwOnError: false,
  strict: false,
  errorColor: "#ef4444",
  trust: false,
  output: "htmlAndMathml",
  macros: KATEX_MACROS,
};

/**
 * Normalizes math delimiters that remark-math does not understand natively
 * into its `$` / `$$` forms. Code fences and inline code are left untouched
 * so snippets keep their literal backslashes.
 */
export function normalizeMathDelimiters(text: string): string {
  const segments = text.split(/(`[^`\n]*`|```[\s\S]*?```)/g);
  return segments
    .map((segment) => {
      if (!segment) return segment;
      if (segment.startsWith("`")) return segment;
      return segment
        .replace(/\\\[((?:.|\n)*?)\\\]/g, (_m, body) => `$$${String(body).trim()}$$`)
        .replace(/\\\(((?:.|\n)*?)\\\)/g, (_m, body) => `$${String(body).trim()}$`);
    })
    .join("");
}
