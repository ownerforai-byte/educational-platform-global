import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Schema } from "hast-util-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
// Side-effect: registers \ce{...} / \pu{...} chemistry macros on the shared
// KaTeX instance used by rehype-katex (and lib/content/renderers.tsx).
import "katex/contrib/mhchem";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import { KATEX_OPTIONS, normalizeMathDelimiters } from "@/lib/content/katex";

/**
 * Universal note rendering pipeline — the single system every incoming note
 * goes through, regardless of source or content type.
 *
 * Supported out of the box:
 *  - Markdown: headings, lists, links, images, blockquotes
 *  - GFM: tables, strikethrough, task lists, autolinks
 *  - Math: `$...$`, `$$...$$`, `\(...\)`, `\[...\]` via KaTeX (+ mhchem `\ce`)
 *  - Raw HTML in notes: parsed then sanitized (scripts/iframes/handlers removed)
 *  - Code fences: syntax-highlighted server-side (` ```lang `), no client JS
 *
 * Trust order matters: sanitize runs FIRST on author-supplied markup; the
 * highlighter and KaTeX run afterwards and are trusted generators, so their
 * output (classes, inline styles, MathML) is never stripped.
 */
const sanitizeSchema: Schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "details",
    "summary",
    "figure",
    "figcaption",
    "mark",
    "abbr",
    "kbd",
    "ins",
    "sub",
    "sup",
    "video",
    "audio",
    "source",
  ],
  attributes: {
    ...defaultSchema.attributes,
    // KaTeX/highlight rely on classes; keep ids for deep links. Both are also
    // needed because sanitization runs before those trusted transforms.
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "className", "id"],
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ["className", /^language-./],
    ],
    input: [...(defaultSchema.attributes?.input ?? []), "disabled", "type", "checked"],
  },
};

export const noteProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath, { singleDollarTextMath: true })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeKatex, KATEX_OPTIONS)
  .use(rehypeStringify);

/** Markdown/HTML note text → sanitized static HTML string (synchronous). */
export function renderNoteHtml(noteText: string): string {
  return String(
    noteProcessor.processSync(normalizeMathDelimiters(noteText)).value,
  );
}
