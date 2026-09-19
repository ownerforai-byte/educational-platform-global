import type { Plugin } from "unified";
import type { Blockquote, Paragraph, Root, RootContent } from "mdast";

/**
 * Exam callout boxes — formula / fact / trick / shortcut / trap / etc.
 *
 * Authors write plain markdown; this remark plugin rewrites the matching
 * blocks into `<div class="edu-callout edu-callout--<type>">` containers that
 * `app/globals.css` styles into colour-coded revision boxes (see
 * `.edu-callout` there). Two syntaxes are supported, and both are optional —
 * notes without either render exactly as before.
 *
 * 1. Container syntax (preferred — supports multi-block bodies):
 *
 *        :::formula Lens Maker's Formula
 *        $$ \frac{1}{f} = (n-1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right) $$
 *        Valid for a thin lens in air; distances measured from the optical centre.
 *        :::
 *
 * 2. Blockquote alert syntax (GitHub-style, single block):
 *
 *        > [!TRICK] Equal-magnitude vectors
 *        > For $|\vec A| = |\vec B| = A$, the resultant is $R = 2A\cos(\theta/2)$.
 *
 * Everything that is *not* a recognised marker is left untouched, so ordinary
 * `:::` prose and normal blockquotes are never swallowed.
 */
export const EDU_CALLOUT_LABELS = {
  formula: "Formula",
  fact: "High-Yield Fact",
  trick: "Exam Trick",
  shortcut: "10-Second Shortcut",
  exam: "Exam Favourite",
  trap: "Common Trap",
  remember: "Remember",
  definition: "Definition",
  example: "Worked Example",
  warning: "Caution",
  tip: "Quick Tip",
} as const;

export type EduCalloutType = keyof typeof EDU_CALLOUT_LABELS;

/**
 * Variant classes, written out in full on purpose: Tailwind tree-shakes the
 * `@layer components` rules in app/globals.css down to the class names it can
 * find in scanned source, and a template literal like `edu-callout--${type}`
 * is invisible to that scanner — which silently drops the variant colours.
 */
export const EDU_CALLOUT_CLASSES: Record<EduCalloutType, string> = {
  formula: "edu-callout edu-callout--formula",
  fact: "edu-callout edu-callout--fact",
  trick: "edu-callout edu-callout--trick",
  shortcut: "edu-callout edu-callout--shortcut",
  exam: "edu-callout edu-callout--exam",
  trap: "edu-callout edu-callout--trap",
  remember: "edu-callout edu-callout--remember",
  definition: "edu-callout edu-callout--definition",
  example: "edu-callout edu-callout--example",
  warning: "edu-callout edu-callout--warning",
  tip: "edu-callout edu-callout--tip",
};

/** Friendly spellings authors are likely to reach for. */
const CALLOUT_ALIASES: Record<string, EduCalloutType> = {
  law: "formula",
  derivation: "formula",
  equation: "formula",
  key: "fact",
  "key-fact": "fact",
  value: "fact",
  mnemonic: "remember",
  memory: "remember",
  "memory-trick": "remember",
  caution: "warning",
  important: "exam",
  "exam-tip": "exam",
  "exam-note": "exam",
  pyq: "exam",
  numerical: "example",
  problem: "example",
  note: "tip",
  hint: "tip",
  misconception: "trap",
  confusion: "trap",
};

const OPEN_RE = /^:{3,}\s*([A-Za-z][A-Za-z0-9_-]*)\s*(.*)$/;
const CLOSE_RE = /^:{3,}\s*$/;
const ALERT_RE = /^\[!([A-Za-z][A-Za-z0-9_-]*)\]\s*(.*)$/;

/**
 * Markdown soft-wraps adjacent lines into a single paragraph, which would
 * collapse `:::type` / body / `:::` into one block and hide the markers from
 * the mdast pass. Inserting blank lines around the markers (never inside fenced
 * code) makes each marker its own paragraph, so the tree walk below can pair
 * them up. Runs before parsing, next to `normalizeMathDelimiters`.
 */
export function normalizeCalloutBlocks(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  let fenceChar: string | null = null;
  let justClosed = false;

  const pushBlank = () => {
    if (out.length > 0 && out[out.length - 1].trim() !== "") out.push("");
  };

  for (const line of lines) {
    const fence = /^\s*(```+|~~~+)/.exec(line);
    if (fence) {
      if (fenceChar === null) fenceChar = fence[1][0];
      else if (fenceChar === fence[1][0]) fenceChar = null;
      out.push(line);
      continue;
    }
    if (fenceChar !== null) {
      out.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (OPEN_RE.test(trimmed)) {
      pushBlank();
      out.push(line, "");
      justClosed = false;
      continue;
    }
    if (CLOSE_RE.test(trimmed)) {
      pushBlank();
      out.push(line);
      justClosed = true;
      continue;
    }
    if (justClosed && trimmed !== "") {
      // Keep the line after a `:::` from merging into the closer paragraph.
      out.push("");
    }
    justClosed = false;
    out.push(line);
  }

  return out.join("\n");
}

interface CalloutMarker {
  type: EduCalloutType;
  title: string;
}

function resolveType(raw: string): EduCalloutType | null {
  const key = raw.toLowerCase();
  if (key in EDU_CALLOUT_LABELS) return key as EduCalloutType;
  return CALLOUT_ALIASES[key] ?? null;
}

/**
 * Returns the leading text node's value when the node is a paragraph that
 * starts with one — the only place a `:::` / `[!TYPE]` marker can legally sit.
 */
function leadingText(node: RootContent): string | null {
  if (node.type !== "paragraph") return null;
  const first = node.children[0];
  if (!first || first.type !== "text") return null;
  return first.value;
}

/** Drops the marker line, keeping anything that followed it on later lines. */
function stripFirstLine(paragraph: Paragraph): void {
  const first = paragraph.children[0];
  if (!first || first.type !== "text") return;
  const newline = first.value.indexOf("\n");
  if (newline === -1) {
    paragraph.children.shift();
    return;
  }
  first.value = first.value.slice(newline + 1).replace(/^[ \t]+/, "");
  if (first.value.length === 0) paragraph.children.shift();
}

function readOpener(node: RootContent): CalloutMarker | null {
  const text = leadingText(node);
  if (text === null) return null;
  const match = OPEN_RE.exec(text.split("\n")[0]);
  if (!match) return null;
  const type = resolveType(match[1]);
  if (!type) return null;
  return { type, title: match[2].replace(/[:：]\s*$/, "").trim() };
}

/** Index of the `:::` that closes the container opened at `start - 1`. */
function findClose(children: RootContent[], start: number): number {
  let depth = 0;
  for (let index = start; index < children.length; index += 1) {
    const text = leadingText(children[index]);
    if (text === null) continue;
    const line = text.split("\n")[0].trim();
    if (CLOSE_RE.test(line)) {
      if (depth === 0) return index;
      depth -= 1;
      continue;
    }
    if (readOpener(children[index])) depth += 1;
  }
  return -1;
}

function readAlert(node: RootContent): CalloutMarker & { children: RootContent[] } | null {
  if (node.type !== "blockquote") return null;
  const first = node.children[0];
  if (!first || first.type !== "paragraph") return null;
  const leading = first.children[0];
  if (!leading || leading.type !== "text") return null;
  const match = ALERT_RE.exec(leading.value.split("\n")[0].trim());
  if (!match) return null;
  const type = resolveType(match[1]);
  if (!type) return null;

  stripFirstLine(first);
  const children: RootContent[] = [...node.children];
  if (first.children.length === 0) children.shift();
  return { type, title: match[2].trim(), children };
}

/** Inline span used for the label chip and the author-supplied heading. */
function inlineSpan(className: string, value: string): RootContent {
  return {
    type: "paragraph",
    data: { hName: "span", hProperties: { className: [className] } },
    children: [{ type: "text", value }],
  } as unknown as RootContent;
}

function makeContainer(
  type: EduCalloutType,
  title: string,
  children: RootContent[],
): RootContent {
  const head: RootContent[] = [inlineSpan("edu-callout__label", EDU_CALLOUT_LABELS[type])];
  if (title) head.push(inlineSpan("edu-callout__heading", title));

  return {
    type: "blockquote",
    data: {
      hName: "div",
      hProperties: { className: EDU_CALLOUT_CLASSES[type].split(" ") },
    },
    children: [
      {
        type: "paragraph",
        data: { hName: "div", hProperties: { className: ["edu-callout__head"] } },
        children: head,
      } as unknown as RootContent,
      ...children,
    ],
  } as unknown as RootContent;
}

function transform(children: RootContent[]): RootContent[] {
  const out: RootContent[] = [];
  let index = 0;

  while (index < children.length) {
    const node = children[index];
    const opener = readOpener(node);

    if (opener) {
      const closeIndex = findClose(children, index + 1);
      if (closeIndex !== -1) {
        const openParagraph = node as Paragraph;
        stripFirstLine(openParagraph);

        const inner: RootContent[] = [];
        if (openParagraph.children.length > 0) inner.push(openParagraph);
        for (let cursor = index + 1; cursor < closeIndex; cursor += 1) {
          inner.push(children[cursor]);
        }
        const closeParagraph = children[closeIndex] as Paragraph;
        stripFirstLine(closeParagraph);
        if (closeParagraph.children.length > 0) inner.push(closeParagraph);

        out.push(makeContainer(opener.type, opener.title, inner));
        index = closeIndex + 1;
        continue;
      }
    }

    const alert = readAlert(node);
    if (alert) {
      out.push(makeContainer(alert.type, alert.title, alert.children));
      index += 1;
      continue;
    }

    out.push(node);
    index += 1;
  }

  // Recurse so nested `:::` blocks and alerts inside lists also convert.
  for (const node of out) {
    const parent = node as { children?: RootContent[] };
    if (Array.isArray(parent.children)) parent.children = transform(parent.children);
  }

  return out;
}

/** remark plugin — no options, safe to add to the shared note pipeline. */
export const remarkEduCallouts: Plugin<[], Root> = () => (tree) => {
  tree.children = transform(tree.children);
};
