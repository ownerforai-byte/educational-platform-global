"use client";

/**
 * DocMindMap — the concept map drawn at the top of every topic document.
 *
 * Renders a real radial concept tree in SVG (centre → branches → leaf points)
 * with curved connectors and coloured branch nodes, so the structure a learner
 * should memorise is visible before the prose starts. Theme-aware: every colour
 * comes from Tailwind classes with currentColor / fixed accent classes that are
 * safe in dark mode.
 *
 * The diagram is generated from `DocConceptMap` (authored mindmap when the
 * content has one, otherwise derived from the concept JSON — see
 * `doc-mindmap.ts`), so all 696 topics get a clearly drawn map.
 */

import { useMemo } from "react";
import { MathMarkdown } from "@/components/content/math-markdown";
import type { DocConceptMap, MindMapBranch } from "./doc-mindmap";

const BRANCH_TONES = [
  "text-sky-500",
  "text-emerald-500",
  "text-amber-500",
  "text-violet-500",
  "text-rose-500",
  "text-teal-500",
] as const;

const NODE_FILLS = [
  "fill-sky-500/12",
  "fill-emerald-500/12",
  "fill-amber-500/12",
  "fill-violet-500/12",
  "fill-rose-500/12",
  "fill-teal-500/12",
] as const;

export interface DocMindMapProps {
  map: DocConceptMap;
  className?: string;
}

interface PlacedBranch {
  branch: MindMapBranch;
  x: number;
  y: number;
  side: 1 | -1;
  tone: string;
  fill: string;
}

function wrap(text: string, perLine: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (!line) {
      line = word;
      continue;
    }
    if ((line + " " + word).length <= perLine) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === 0) return [text.slice(0, perLine)];
  const joined = lines.join(" ").length;
  if (joined < text.replace(/\s+/g, " ").trim().length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[,.;:]$/, "")}…`;
  }
  return lines;
}

/** Layout: centre node, branches alternating above/below along both sides. */
function layout(branches: MindMapBranch[]): PlacedBranch[] {
  const count = branches.length;
  if (count === 0) return [];
  const placed: PlacedBranch[] = [];
  // Two columns (left / right), stacked vertically inside each column.
  const perColumn = Math.ceil(count / 2);
  branches.forEach((branch, i) => {
    const column = i < perColumn ? -1 : 1;
    const indexInColumn = i < perColumn ? i : i - perColumn;
    const rowsInColumn = i < perColumn ? perColumn : count - perColumn;
    const rowGap = rowsInColumn > 1 ? 150 : 0;
    const topY = 70;
    const totalHeight = (rowsInColumn - 1) * rowGap;
    const y = topY + indexInColumn * rowGap;
    const baseY = Math.max(topY, 190 - totalHeight / 2);
    const x = column === -1 ? 128 : 692;
    placed.push({
      branch,
      x,
      y: baseY + indexInColumn * rowGap,
      side: column as 1 | -1,
      tone: BRANCH_TONES[i % BRANCH_TONES.length],
      fill: NODE_FILLS[i % NODE_FILLS.length],
    });
    void y;
  });
  return placed;
}

export function DocMindMap({ map, className }: DocMindMapProps) {
  const placed = useMemo(() => layout(map.branches), [map.branches]);
  const centerX = 410;
  const centerY = 190;
  const hasBranches = placed.length > 0;
  const height = hasBranches
    ? Math.max(380, ...placed.map((p) => p.y + 90)) + 40
    : 240;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 820 ${height}`}
        className="mx-auto h-auto w-full max-w-[880px] text-foreground"
        role="img"
        aria-label={`Concept map for ${map.centralConcept}`}
      >
        {/* centre → branch connectors */}
        {placed.map((p, i) => {
          const ctrlX = p.side === -1 ? centerX - 120 : centerX + 120;
          return (
            <path
              key={`link-${i}`}
              d={`M ${centerX + p.side * 118} ${centerY + (p.y - centerY) * 0.18} C ${ctrlX} ${centerY + (p.y - centerY) * 0.28} ${p.side === -1 ? p.x + 105 : p.x - 105} ${p.y - 26} ${p.side === -1 ? p.x + 105 : p.x - 105} ${p.y}`}
              fill="none"
              strokeWidth="2"
              className={`stroke-current ${p.tone}`}
              opacity="0.55"
            />
          );
        })}

        {/* centre node */}
        <g>
          <ellipse cx={centerX} cy={centerY} rx="126" ry="46" className="fill-current text-primary/12" />
          <ellipse cx={centerX} cy={centerY} rx="126" ry="46" fill="none" strokeWidth="2.5" className="stroke-current text-primary" />
          {wrap(map.centralConcept, 24, 2).map((line, i, arr) => (
            <text
              key={`center-${i}`}
              x={centerX}
              y={centerY + (i - (arr.length - 1) / 2) * 17 + 5}
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              className="fill-current text-primary"
            >
              {line}
            </text>
          ))}
        </g>

        {/* branches */}
        {placed.map((p, i) => {
          const nodeW = 210;
          const lines = wrap(p.branch.topic, 24, 2);
          const details = p.branch.details ?? [];
          const leaves = p.branch.subtopics ?? [];
          const headerH = 22 + lines.length * 15;
          const bodyLines: string[] = [];
          for (const d of details) bodyLines.push(...wrap(d, 32, 2));
          for (const leaf of leaves) {
            bodyLines.push(...wrap(leaf.name, 32, 1));
          }
          const shown = bodyLines.slice(0, 4);
          const boxH = headerH + shown.length * 15 + 12;
          const nodeX = p.x - nodeW / 2;
          const nodeY = p.y;
          return (
            <g key={`branch-${i}`}>
              {/* connector from branch node to its points */}
              {shown.length > 0 && (
                <line
                  x1={p.x}
                  y1={nodeY + 16}
                  x2={p.x}
                  y2={nodeY + boxH - 4}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="stroke-current text-muted-foreground"
                  opacity="0.5"
                />
              )}
              <rect
                x={nodeX}
                y={nodeY - 16}
                width={nodeW}
                height={boxH}
                rx="12"
                strokeWidth="2"
                className={`fill-current ${p.fill} stroke-current ${p.tone}`}
              />
              {/* branch header band */}
              <rect x={nodeX} y={nodeY - 16} width={nodeW} height={headerH} rx="12" className={`fill-current ${p.fill}`} />
              {lines.map((line, li) => (
                <text
                  key={`bt-${i}-${li}`}
                  x={p.x}
                  y={nodeY + 2 + li * 15}
                  fontSize="11.5"
                  fontWeight="800"
                  textAnchor="middle"
                  className={`fill-current ${p.tone}`}
                >
                  {line}
                </text>
              ))}
              {shown.map((line, li) => (
                <text
                  key={`bd-${i}-${li}`}
                  x={nodeX + 12}
                  y={nodeY - 16 + headerH + 14 + li * 15}
                  fontSize="11"
                  className="fill-current text-foreground"
                  opacity="0.82"
                >
                  {li === 0 || line.startsWith("•") ? line : `• ${line}`}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Expanded key beneath the drawing, so long points stay readable + KaTeX-safe */}
      {hasBranches && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {map.branches.map((branch, i) => (
            <div key={`key-${i}`} className="rounded-2xl border border-border/60 bg-card/60 p-3">
              <p className={`text-xs font-bold ${BRANCH_TONES[i % BRANCH_TONES.length]}`}>{branch.topic}</p>
              <ul className="mt-1.5 space-y-1">
                {(branch.details ?? []).map((d, di) => (
                  <li key={`kd-${i}-${di}`} className="flex gap-1.5 text-[11.5px] leading-5 text-foreground/85">
                    <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                    <MathMarkdown content={d} className="inline text-[11.5px] leading-5" />
                  </li>
                ))}
                {(branch.subtopics ?? []).map((leaf, li) => (
                  <li key={`kl-${i}-${li}`} className="text-[11.5px] leading-5 text-foreground/85">
                    <span className="font-semibold">{leaf.name}</span>
                    {leaf.points.length > 0 && <span className="text-muted-foreground"> — {leaf.points.join("; ")}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
