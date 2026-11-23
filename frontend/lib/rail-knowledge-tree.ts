/**
 * rail-knowledge-tree — the hierarchical image on a rail card.
 *
 * Owner request 2026-11-24: every home-rail card carries a "Knowledge map"
 * row whose figure is a hierarchical tree of that topic's knowledge — the
 * concept at the root, its branches in the middle, the examinable facts as
 * leaves — so a reader sees the whole structure of the topic at a glance
 * before the rows walk through it.
 *
 * The tree is DATA (see rail-knowledge-trees.ts); this module lays it out and
 * emits one self-contained `<svg>…</svg>` block that passes the same
 * note-visuals guard as every other rail figure (lib/content/visuals.ts):
 * shape/text primitives only, no <script>/<style>/<defs>/gradients/markers/
 * <use>/external fetches/url(#…)/ids/on* handlers. Arrowheads are plain
 * <polygon>s; shading is flat translucent fill; the drawing is inked on white
 * "paper" in both themes by `.rail-figure`.
 *
 * Layout (fixed 640-wide canvas, height grows with the tree):
 *   · root box centred at the top,
 *   · its children in one evenly spaced row below it,
 *   · each child's leaves stacked in a column under that child,
 *   · straight connector lines root→child and child→leaf.
 */

export interface KnowledgeTreeNode {
  label: string;
  children?: KnowledgeTreeNode[];
}

/* Ink palette — same vocabulary the hand-drawn diagrams in rail-diagrams.ts
   use, so the two figure kinds sit together visually. */
const INK = "#0f172a";
const MUTED = "#475569";
const ROOT_FILL = "rgba(37,99,235,0.16)";
const CHILD_FILL = "rgba(8,145,178,0.14)";
const LEAF_FILL = "rgba(22,163,74,0.10)";

const FONT = 12.5;
/** Rough per-character advance for font-size 12.5 bold-ish labels. */
const CHAR_W = 6.9;
const BOX_PAD_X = 10;
const BOX_H = 30;
const GAP_X = 10;
const LEVEL_GAP = 46;
const LEAF_GAP = 12;

function boxWidth(label: string): number {
  return Math.max(64, Math.round(label.length * CHAR_W) + BOX_PAD_X * 2);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function box(
  cx: number,
  y: number,
  w: number,
  label: string,
  fill: string,
  fontSize = FONT,
): string {
  const x = cx - w / 2;
  return [
    `<rect x="${x}" y="${y}" width="${w}" height="${BOX_H}" rx="7" fill="${fill}" stroke="${INK}" stroke-width="1.6"/>`,
    `<text x="${cx}" y="${y + BOX_H / 2 + fontSize * 0.36}" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="${INK}">${escapeXml(label)}</text>`,
  ].join("\n  ");
}

/**
 * Lay out one knowledge tree and return the guard-safe SVG string.
 * Roots hold 2–5 branches; each branch holds 0–4 leaves. Deeper input is
 * flattened by the caller — the drawing stays three levels tall on purpose.
 */
export function knowledgeTreeSvg(root: KnowledgeTreeNode): string {
  const branches = (root.children ?? []).slice(0, 5);
  const rootW = boxWidth(root.label);

  // Pass 1: width of every branch column (its own box or its widest leaf).
  const columns = branches.map((branch) => {
    const leaves = (branch.children ?? []).slice(0, 4);
    const own = boxWidth(branch.label);
    const widestLeaf = leaves.reduce(
      (max, leaf) => Math.max(max, boxWidth(leaf.label)),
      0,
    );
    return { branch, leaves, width: Math.max(own, widestLeaf) };
  });

  const totalWidth =
    columns.reduce((sum, col) => sum + col.width, 0) +
    GAP_X * Math.max(0, columns.length - 1);
  const canvasW = Math.max(640, totalWidth + 24);
  const left = (canvasW - totalWidth) / 2;

  const rootY = 14;
  const childY = rootY + BOX_H + LEVEL_GAP;
  const leafTop = childY + BOX_H + LEVEL_GAP - 14;

  const maxLeaves = columns.reduce(
    (m, c) => Math.max(m, c.leaves.length),
    0,
  );
  const canvasH = leafTop + 10 + maxLeaves * (BOX_H + LEAF_GAP) + 4;

  // Pass 2: place every column, then emit boxes and connectors.
  const parts: string[] = [
    `<rect x="0" y="0" width="${canvasW}" height="${canvasH}" fill="#ffffff"/>`,
  ];
  const rootCx = canvasW / 2;
  parts.push(box(rootCx, rootY, rootW, root.label, ROOT_FILL, 13.5));

  let cursor = left;
  for (const col of columns) {
    const cx = cursor + col.width / 2;
    parts.push(box(cx, childY, boxWidth(col.branch.label), col.branch.label, CHILD_FILL));
    // root → branch connector
    parts.push(
      `<line x1="${rootCx}" y1="${rootY + BOX_H}" x2="${cx}" y2="${childY}" stroke="${MUTED}" stroke-width="1.6"/>`,
    );
    let ly = leafTop;
    let prevBottom = childY + BOX_H;
    for (const leaf of col.leaves) {
      parts.push(box(cx, ly, boxWidth(leaf.label), leaf.label, LEAF_FILL, 12));
      parts.push(
        `<line x1="${cx}" y1="${prevBottom}" x2="${cx}" y2="${ly}" stroke="${MUTED}" stroke-width="1.4"/>`,
      );
      prevBottom = ly + BOX_H;
      ly += BOX_H + LEAF_GAP;
    }
    cursor += col.width + GAP_X;
  }

  return `<svg viewBox="0 0 ${canvasW} ${canvasH}" role="img">\n  ${parts.join("\n  ")}\n</svg>`;
}
