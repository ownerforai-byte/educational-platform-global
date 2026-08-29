"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Search, ZoomIn, ZoomOut, Maximize, Download, ChevronDown, ChevronRight, X } from "lucide-react";
import type { MindmapNode, MindmapSource } from "../types";

/* ============================================================
   Color palette by depth level
   ============================================================ */

const DEPTH_COLORS = [
  { fill: "var(--primary)", stroke: "var(--primary)", text: "var(--primary-foreground)", ring: "rgba(99,102,241,0.35)", glow: "#6366f1" },
  { fill: "var(--accent)", stroke: "var(--primary)/40", text: "var(--foreground)", ring: "rgba(99,102,241,0.18)", glow: "#818cf8" },
  { fill: "var(--card)", stroke: "var(--primary)/25", text: "var(--foreground)", ring: "rgba(99,102,241,0.10)", glow: "#a5b4fc" },
  { fill: "var(--card)", stroke: "var(--border)", text: "var(--muted-foreground)", ring: "transparent", glow: "#c4b5fd" },
  { fill: "var(--card)", stroke: "var(--border)", text: "var(--muted-foreground)", ring: "transparent", glow: "#ddd6fe" },
];

function depthColor(depth: number) {
  return DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];
}

/* ============================================================
   Layout: radial (root center, children fan out)
   ============================================================ */

type LayoutNode = {
  id: string;
  label: string;
  depth: number;
  parentId: string | null;
  x: number;
  y: number;
  children: LayoutNode[];
  collapsed: boolean;
  visible: boolean;
};

function buildLayoutTree(
  node: MindmapNode,
  depth: number,
  parentId: string | null,
): LayoutNode {
  return {
    id: node.id,
    label: node.label,
    depth,
    parentId,
    x: 0,
    y: 0,
    children: (node.children ?? []).map((c) => buildLayoutTree(c, depth + 1, node.id)),
    collapsed: false,
    visible: true,
  };
}

function countVisible(node: LayoutNode): number {
  if (node.collapsed) return 1;
  return 1 + node.children.reduce((s, c) => s + countVisible(c), 0);
}

function radialLayout(
  root: LayoutNode,
  cx: number,
  cy: number,
  radius: number,
): LayoutNode {
  const children = root.children;
  if (children.length === 0) return root;

  const totalDesc = countVisibleChildren(root);
  const angleStep = (Math.PI * 2) / Math.max(children.length, 1);

  const laidChildren = layoutRadialSubtree(children, 0, Math.PI * 2, radius, cx, cy);
  return { ...root, children: laidChildren };
}

function countVisibleChildren(node: LayoutNode): number {
  if (node.collapsed) return 0;
  return node.children.reduce((s, c) => s + 1 + countVisibleChildren(c), 0);
}

function layoutRadialSubtree(
  nodes: LayoutNode[],
  startAngle: number,
  endAngle: number,
  radius: number,
  cx: number,
  cy: number,
): LayoutNode[] {
  if (nodes.length === 0) return [];
  const total = nodes.reduce((s, n) => s + 1 + countVisibleChildren(n), 0);
  let angle = startAngle;
  const result: LayoutNode[] = [];

  for (const node of nodes) {
    const own = 1 + countVisibleChildren(node);
    const sweep = (own / total) * (endAngle - startAngle);
    const midAngle = angle + sweep / 2;
    const x = cx + radius * Math.cos(midAngle);
    const y = cy + radius * Math.sin(midAngle);
    const childRadius = radius * 0.72;
    const childNodes = node.collapsed
      ? []
      : layoutRadialSubtree(node.children, midAngle - sweep / 2, midAngle + sweep / 2, childRadius, x, y);
    result.push({ ...node, children: childNodes });
    angle += sweep;
  }
  return result;
}

function flattenLayout(node: LayoutNode, acc: LayoutNode[]): void {
  acc.push(node);
  if (!node.collapsed) {
    for (const child of node.children) flattenLayout(child, acc);
  }
}

/* ============================================================
   MindmapInterface — enhanced interactive SVG viewer
   ============================================================ */

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
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [layoutNodes, setLayoutNodes] = useState<LayoutNode[]>([]);
  const [treeRoot, setTreeRoot] = useState<LayoutNode | null>(null);

  // Initial layout
  useMemo(() => {
    const raw = buildLayoutTree(root, 0, null);
    const W = 900;
    const H = 600;
    const centered = radialLayout(raw, W / 2, H / 2, Math.min(W, H) * 0.38);
    const flat: LayoutNode[] = [];
    flattenLayout(centered, flat);
    setTreeRoot(centered);
    setLayoutNodes(flat);
  }, [root]);

  const handleZoomIn = useCallback(() => setScale((s) => Math.min(s * 1.25, 4)), []);
  const handleZoomOut = useCallback(() => setScale((s) => Math.max(s / 1.25, 0.2)), []);
  const handleFit = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    },
    [offset],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      setOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    },
    [isPanning, panStart],
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.max(0.2, Math.min(4, s * delta)));
  }, []);

  const toggleNode = useCallback((id: string) => {
    setTreeRoot((prev) => {
      if (!prev) return prev;
      function toggle(n: LayoutNode): LayoutNode {
        if (n.id === id) return { ...n, collapsed: !n.collapsed };
        return { ...n, children: n.children.map(toggle) };
      }
      return toggle(prev);
    });
  }, []);

  const updateVisibility = useCallback(() => {
    if (!treeRoot) return;
    const flat: LayoutNode[] = [];
    flattenLayout(treeRoot, flat);
    setLayoutNodes(flat);
  }, [treeRoot]);

  // Re-flatten when treeRoot changes (via toggle)
  const flatNodes = useMemo(() => {
    if (!treeRoot) return [];
    const arr: LayoutNode[] = [];
    flattenLayout(treeRoot, arr);
    return arr;
  }, [treeRoot]);

  const byId = useMemo(() => new Map(flatNodes.map((n) => [n.id, n])), [flatNodes]);

  // Search
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    for (const n of flatNodes) {
      if (n.label.toLowerCase().includes(q)) matches.add(n.id);
    }
    return matches;
  }, [searchQuery, flatNodes]);

  // Export SVG to PNG
  const handleExport = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mindmap-${title.replace(/\s+/g, "-").toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [title]);

  const nodeCount = flatNodes.length;
  const rootDepth = flatNodes[0]?.depth ?? 0;

  return (
    <div
      id="mindmap"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-background",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight truncate">
            Mind map · {title}
          </h3>
          <p className="text-xs text-muted-foreground">{SOURCE_LABEL[source]}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
              searchOpen
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:bg-accent",
            )}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
          {/* Zoom controls */}
          <button onClick={handleZoomOut} className="p-1.5 rounded-md border border-border hover:bg-accent text-xs" title="Zoom out">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleZoomIn} className="p-1.5 rounded-md border border-border hover:bg-accent text-xs" title="Zoom in">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleFit} className="p-1.5 rounded-md border border-border hover:bg-accent text-xs" title="Fit to screen">
            <Maximize className="h-3.5 w-3.5" />
          </button>
          {/* Export */}
          <button onClick={handleExport} className="p-1.5 rounded-md border border-border hover:bg-accent text-xs" title="Export SVG">
            <Download className="h-3.5 w-3.5" />
          </button>
          {/* Stats */}
          <span className="text-[10px] text-muted-foreground hidden md:inline">
            {nodeCount} nodes · depth {rootDepth}
          </span>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-b border-border/60 px-4 py-2 flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes…"
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          {searchQuery && (
            <span className="text-xs text-muted-foreground">
              {searchMatches.size} match{searchMatches.size !== 1 ? "es" : ""}
            </span>
          )}
          <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="p-1 hover:bg-accent rounded">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* SVG canvas */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: 520 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "var(--foreground)",
        }} />

        <svg
          ref={svgRef}
          viewBox="0 0 900 600"
          className="w-full h-full"
          role="img"
          aria-label={`Mind map for ${title}`}
          style={{ cursor: isPanning ? "grabbing" : "grab" }}
        >
          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
            {/* Edges */}
            {flatNodes.map((node) => {
              if (!node.parentId) return null;
              const parent = byId.get(node.parentId);
              if (!parent) return null;
              const isSearchMatch = searchMatches.size > 0 && (searchMatches.has(node.id) || searchMatches.has(parent.id));
              return (
                <line
                  key={`e-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={isSearchMatch ? "#f59e0b" : "var(--border)"}
                  strokeWidth={isSearchMatch ? 2.5 : 1.5}
                  strokeOpacity={isSearchMatch ? 1 : 0.6}
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Nodes */}
            {flatNodes.map((node) => {
              const color = depthColor(node.depth);
              const isRoot = node.depth === 0;
              const isMatch = searchMatches.has(node.id);
              const hasChildren = (node.children?.length ?? 0) > 0;
              const label = node.label.length > 22 ? `${node.label.slice(0, 20)}…` : node.label;
              const boxW = Math.min(180, 32 + node.label.length * 6.5);
              const boxH = isRoot ? 36 : 28;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: isMatch || !searchQuery ? 1 : 0.25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasChildren) toggleNode(node.id);
                  }}
                >
                  {/* Glow ring for matches */}
                  {isMatch && (
                    <rect
                      x={-boxW / 2 - 4}
                      y={-boxH / 2 - 4}
                      width={boxW + 8}
                      height={boxH + 8}
                      rx={12}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="4 2"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="12" dur="0.5s" repeatCount="indefinite" />
                    </rect>
                  )}

                  {/* Shadow */}
                  <rect
                    x={-boxW / 2 + 2}
                    y={-boxH / 2 + 2}
                    width={boxW}
                    height={boxH}
                    rx={isRoot ? 10 : 7}
                    fill="rgba(0,0,0,0.15)"
                  />

                  {/* Node body */}
                  <rect
                    x={-boxW / 2}
                    y={-boxH / 2}
                    width={boxW}
                    height={boxH}
                    rx={isRoot ? 10 : 7}
                    fill={color.fill}
                    stroke={isMatch ? "#f59e0b" : color.stroke}
                    strokeWidth={isMatch ? 2.5 : isRoot ? 2 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Root node inner glow */}
                  {isRoot && (
                    <rect
                      x={-boxW / 2 + 2}
                      y={-boxH / 2 + 2}
                      width={boxW - 4}
                      height={boxH - 4}
                      rx={8}
                      fill="url(#rootGlow)"
                      opacity={0.3}
                    />
                  )}

                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isMatch ? "#f59e0b" : color.text}
                    fontSize={isRoot ? 12 : 10}
                    fontWeight={isRoot ? 700 : 500}
                    className="pointer-events-none select-none"
                  >
                    {label}
                  </text>

                  {/* Collapse/expand indicator */}
                  {hasChildren && (
                    <g transform={`translate(${boxW / 2 + 2}, 0)`}>
                      <circle r={7} fill={isRoot ? "var(--primary)" : "var(--accent)"} opacity={0.85} />
                      {node.collapsed ? (
                        <ChevronRight className="h-3 w-3 text-primary-foreground" style={{ position: "relative" }} />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-primary-foreground" />
                      )}
                    </g>
                  )}

                  {/* Hover tooltip (title element) */}
                  <title>{node.label}{hasChildren ? (node.collapsed ? " (collapsed)" : " (click to collapse)") : ""}</title>
                </g>
              );
            })}
          </g>

          {/* Gradient defs */}
          <defs>
            <radialGradient id="rootGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] text-muted-foreground bg-background/80 backdrop-blur px-2.5 py-1.5 rounded-lg border border-border/60">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary inline-block" /> Root
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent inline-block" /> Level 1
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-card border border-border inline-block" /> Level 2+
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm border-2 border-dashed border-amber-400 inline-block" /> Found
          </span>
          <span className="hidden sm:inline text-muted-foreground/60">Scroll to zoom · Drag to pan · Click nodes to collapse</span>
        </div>
      </div>
    </div>
  );
}
