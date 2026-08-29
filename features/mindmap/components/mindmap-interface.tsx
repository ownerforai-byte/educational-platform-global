"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { MindmapNode, MindmapSource } from "../types";

type LaidOut = {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: number;
  parentId: string | null;
};

function flatten(
  node: MindmapNode,
  depth: number,
  parentId: string | null,
  acc: { node: MindmapNode; depth: number; parentId: string | null }[],
) {
  acc.push({ node, depth, parentId });
  for (const child of node.children ?? []) {
    flatten(child, depth + 1, node.id, acc);
  }
}

function layoutTree(root: MindmapNode, width: number, height: number): LaidOut[] {
  const flat: { node: MindmapNode; depth: number; parentId: string | null }[] = [];
  flatten(root, 0, null, flat);

  const byDepth = new Map<number, typeof flat>();
  for (const item of flat) {
    const list = byDepth.get(item.depth) ?? [];
    list.push(item);
    byDepth.set(item.depth, list);
  }

  const maxDepth = Math.max(...[...byDepth.keys()], 0);
  const padX = 40;
  const padY = 36;
  const usableW = Math.max(width - padX * 2, 200);
  const usableH = Math.max(height - padY * 2, 160);

  return flat.map((item) => {
    const siblings = byDepth.get(item.depth) ?? [item];
    const index = siblings.findIndex((s) => s.node.id === item.node.id);
    const x =
      maxDepth === 0
        ? width / 2
        : padX + (item.depth / maxDepth) * usableW;
    const y =
      siblings.length === 1
        ? height / 2
        : padY + (index / (siblings.length - 1)) * usableH;
    return {
      id: item.node.id,
      label: item.node.label,
      x,
      y,
      depth: item.depth,
      parentId: item.parentId,
    };
  });
}

const SOURCE_LABEL: Record<MindmapSource, string> = {
  syllabus: "Generated from syllabus",
  imported: "Imported content map",
  override: "Custom map",
};

export function MindmapInterface({
  title,
  root,
  source = "syllabus",
  className,
}: {
  title: string;
  root: MindmapNode;
  source?: MindmapSource;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const width = 720;
  const height = 420;

  const nodes = useMemo(() => layoutTree(root, width, height), [root]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <div
      id="mindmap"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-background",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Mind map · {title}</h3>
          <p className="text-xs text-muted-foreground">{SOURCE_LABEL[source]}</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {expanded ? (
        <div className="overflow-x-auto p-3">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="mx-auto h-auto w-full min-w-[480px] max-w-4xl"
            role="img"
            aria-label={`Mind map for ${title}`}
          >
            {nodes.map((node) => {
              if (!node.parentId) return null;
              const parent = byId.get(node.parentId);
              if (!parent) return null;
              return (
                <line
                  key={`e-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  className="stroke-border"
                  strokeWidth={1.5}
                />
              );
            })}

            {nodes.map((node) => {
              const isRoot = node.depth === 0;
              const label =
                node.label.length > 42 ? `${node.label.slice(0, 40)}…` : node.label;
              const boxW = Math.min(160, 28 + label.length * 6.2);
              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  <rect
                    x={-boxW / 2}
                    y={-16}
                    width={boxW}
                    height={32}
                    rx={8}
                    className={
                      isRoot
                        ? "fill-primary stroke-primary"
                        : "fill-card stroke-border"
                    }
                  />
                  <title>{node.label}</title>
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={
                      isRoot
                        ? "fill-primary-foreground text-[10px] font-semibold"
                        : "fill-foreground text-[10px]"
                    }
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        <p className="px-4 py-6 text-sm text-muted-foreground">
          Mind map collapsed. Expand to explore the syllabus structure for this topic.
        </p>
      )}
    </div>
  );
}
