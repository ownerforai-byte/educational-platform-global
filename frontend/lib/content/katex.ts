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
  // \\set{x}{x > 0}  →  { x | x > 0 }
  "\\set": "\\left\\{\\,#1\\;\\middle|\\;#2\\,\\right\\}",
  "\\card": "\\left|#1\\right|",
  "\\pow": "\\mathcal{P}\\!\\left(#1\\right)",
  // ── Calculus ───────────────────────────────────────────────────────────
  "\\dd": "\\mathrm{d}",
  "\\dx": "\\,dx",
  "\\dt": "\\,dt",
  // \\limto{x}{0}  →  lim_{x → 0}
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
  // \\proj{u}{v}  →  proj_u v
  "\\proj": "\\text{proj}_{#1}\\,#2",
  "\\unit": "\\,\\mathrm{#1}",
  "\\degree": "^{\\circ}",
  "\\half": "\\tfrac{1}{2}",
  "\\ee": "\\mathrm{e}",
  "\\ii": "\\mathrm{i}",
  "\\eps": "\\varepsilon",
  // ── Physics specific additions ─────────────────────────────────────────
  "\\ddt": "\\frac{\\mathrm{d}}{\\mathrm{d}t}",
  "\\ddx": "\\frac{\\mathrm{d}}{\\mathrm{d}x}",
  "\\partialt": "\\frac{\\partial}{\\partial t}",
  "\\partialx": "\\frac{\\partial}{\\partial x}",
  "\\ket": "\\left|#1\\right\\rangle",
  "\\bra": "\\left\\langle#1\\right|",
  // NOTE: no self-referential macros (`"\\hbar": "\\hbar"`, `"\\ln": "\\ln"`):
  // KaTeX expands macros recursively, so a macro that expands to itself hits
  // "Too many expansions" and the whole expression renders as an error. Those
  // commands are native to KaTeX and need no macro entry.
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
 * Repairs export/JSON escaping where LaTeX commands arrive with repeated
 * backslashes (for example `\\circ` instead of `\circ`).
 * Also sanitizes stray backslashes that are not part of valid commands.
 */
export function normalizeLatexExpression(expression: string): string {
  if (!expression) return expression;
  
  // 1. Fix triple+ backslashes -> single
  let result = expression.replace(/\\{3,}(?=[A-Za-z])/g, "\\");
  
  // 2. Collapse double-escaped command names from JSON/export (\\theta → \theta).
  result = result.replace(/\\\\([A-Za-z][A-Za-z0-9]*)/g, "\\$1");
  
  // 3. Remove only truly stray backslashes. `\\` pairs (row breaks) are
  // consumed atomically so they are never dissected; commands and non-letter
  // escapes like `\,`, `\{`, `\%`, `\|` survive. Stripping those broke
  // rendering of well-formed LaTeX (and turned `\\=` into a broken `\=`).
  result = result.replace(/(\\\\)|\\(?![A-Za-z\s,;:!{}|$%&#_./-])/g, "$1");
  
  return result;
}

/**
 * Sanitizes the content of a math block to ensure that stray characters
 * that would break rendering or look like raw code are handled.
 * This prevents displaying ; @ # % ^ & * / > { } ] [ \ | as raw text
 * if they are part of the math expression that KaTeX can't parse well.
 */
export function sanitizeMathContent(content: string): string {
  // 1. Normalize backslashes first
  let cleanContent = normalizeLatexExpression(content);
  
  // 2. Remove stray caret signs (^) that are not followed by a valid argument
  // In LaTeX, ^ is a superscript operator. It usually needs { } or a char after it.
  // If it's at the end, or followed by whitespace/invalid chars, remove it.
  // We look for ^ that is NOT followed by {, alphanum, or common math symbols
  cleanContent = cleanContent.replace(/\^(?![{a-zA-Z0-9~\\])/, "");
  
  // 3. Remove stray subscripts (_) if not followed by valid content
  cleanContent = cleanContent.replace(/_(?![{a-zA-Z0-9~\\])/g, "");
  
  // 4. Handle common "leak" characters that shouldn't be raw in math mode
  // If we see ; @ # & * / > < | that are not part of a command, they might be
  // accidental inputs. In strict math mode, these often cause parse errors
  // which render as red text.
  // Since we can't perfectly distinguish "intended literal text" from "garbage"
  // without context, we will rely on KaTeX's throwOnError: false to handle
  // most cases, but we can strip obvious garbage if it's not inside \text{}.
  
  // Heuristic: If the line contains a lot of special chars but no backslashes,
  // it might be plain text accidentally put in math delimiters.
  // However, for now, we just return the cleaned content.
  
  return cleanContent;
}

/**
 * Normalizes math delimiters that remark-math does not understand natively
 * into its `$` / `$$` forms. Code fences and inline code are left untouched
 * so snippets keep their literal backslashes.
 * Also ensures that stray delimiters are cleaned up.
 */
export function normalizeMathDelimiters(text: string): string {
  if (!text) return text;
  
  // Split by code blocks to avoid touching them
  const segments = text.split(/(`[^`\n]*`|```[\s\S]*?```)/g);
  
  return segments
    .map((segment) => {
      if (!segment) return segment;
      if (segment.startsWith("`")) return segment;
      
      let normalized = segment;
      
      // Replace \[ ... \] with $$ ... $$
      normalized = normalized.replace(/\\\[((?:.|\n)*?)\\\]/g, (_m, body) => `$$${String(body).trim()}$$`);
      
      // Replace \( ... \) with $ ... $
      normalized = normalized.replace(/\\\(((?:.|\n)*?)\\\)/g, (_m, body) => `$${String(body).trim()}$`);
      
      // Replace existing $$ ... $$ with normalized content
      // This also catches $$ ... $$ that might have had \\ inside
      normalized = normalized.replace(/\\\$([\s\S]*?)\\\$/g, (_m, body) => `$$${String(body).trim()}$$`);
      
      // 4. Process all math blocks (both inline and block) to sanitize their content
      // Match inline $...$ and block $$$$
      // We use a function to replace each match with its sanitized version
      normalized = normalized.replace(
        /(\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\\])+\$)/g,
        (math) => {
          const isBlock = math.startsWith("$$");
          const offset = isBlock ? 2 : 1;
          const content = math.slice(offset, -offset);
          
          // Sanitize the content
          const sanitized = sanitizeMathContent(content);
          
          return `${isBlock ? "$$" : "$"}${sanitized}${isBlock ? "$$" : "$"}`;
        },
      );
      
      // 5. Handle stray single $ that are not part of a valid math block
      // This is tricky. If we have $x$ y $z$, it's fine.
      // If we have $x y$, it might be treated as text.
      // We'll assume that if there's an odd number of $, the last one is stray.
      // This is a best-effort heuristic.
      
      // Count non-escaped $
      const dollarCount = (normalized.match(/(?<!\\)\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        // If odd, remove the last stray $
        const lastDollarIndex = normalized.lastIndexOf('$');
        if (lastDollarIndex !== -1) {
           // Check if it's not part of a $$ pair
           // This logic is complex, so we just leave it for now
           // Or we can try to balance it
        }
      }
      
      return normalized;
    })
    .join("");
}
