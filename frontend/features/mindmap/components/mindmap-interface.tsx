"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, ZoomIn, ZoomOut, Maximize, Download, ChevronDown, ChevronRight, X, ChevronLeft, ChevronUp } from "lucide-react";
import type { MindmapNode, MindmapSource } from "../types";

/* ============================================================
   Color palette — bright, high-contrast, tree-friendly
   ============================================================ */

const LEVEL_COLORS = [
  { fill: "#6366f1", bg: "#eef2ff", text: "#ffffff", ring: "#a5b4fc", edge: "#818cf8", shadow: "rgba(99,102,241,0.35)" },
  { fill: "#8b5cf6", bg: "#f5f3ff", text: "#ffffff", ring: "#c4b5fd", edge: "#a78bfa", shadow: "rgba(139,92,246,0.3)" },
  { fill: "#0ea5e9", bg: "#f0f9ff", text: "#ffffff", ring: "#7dd3fc", edge: "#38bdf8", shadow: "rgba(14,165,233,0.25)" },
  { fill: "#10b981", bg: "#f0fdf4", text: "#ffffff", ring: "#6ee7b7", edge: "#34d399", shadow: "rgba(16,185,129,0.25)" },
  { fill: "#f59e0b", bg: "#fffbeb", text: "#ffffff", ring: "#fcd34d", edge: "#fbbf24", shadow: "rgba(245,158,11,0.25)" },
  { fill: "#ef4444", bg: "#fef2f2", text: "#ffffff", ring: "#fca5a5", edge: "#f87171", shadow: "rgba(239,68,68,0.2)" },
];

function levelColor(depth: number) {
  return LEVEL_COLORS[Math.min(depth, LEVEL_COLORS.length - 1)];
}

/* ============================================================
   Layout: horizontal tree (root left, children fan right)
   ============================================================ */

type LayoutNode = {
  id: string;
  label: string;
  depth: number;
  parentId: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  children: LayoutNode[];
  collapsed: boolean;
};

function estimateNodeWidth(label: string): number {
  return Math.max(120, Math.min(220, label.length * 8.5 + 32));
}

function estimateNodeHeight(depth: number): number {
  return depth === 0 ? 48 : 36;
}

function buildLayoutTree(node: MindmapNode, depth: number, parentId: string | null): LayoutNode {
  const w = estimateNodeWidth(node.label);
  const h = estimateNodeHeight(depth);
  return {
    id: node.id,
    label: node.label,
    depth,
    parentId,
    x: 0,
    y: 0,
    w,
    h,
    children: (node.children ?? []).map((c) => buildLayoutTree(c, depth + 1, node.id)),
    collapsed: false,
  };
}

function subtreeHeight(node: LayoutNode): number {
  if (node.collapsed || node.children.length === 0) return node.h + 16;
  return node.children.reduce((s, c) => s + subtreeHeight(c), 0) + (node.children.length - 1) * 12;
}

function layoutTree(node: LayoutNode, x: number, y: number): LayoutNode {
  node.x = x;
  node.y = y;
  if (node.collapsed || node.children.length === 0) return node;

  let curY = y;
  for (const child of node.children) {
    const ch = subtreeHeight(child);
    layoutTree(child, x + 200, curY + ch / 2 - child.h / 2);
    curY += ch + 12;
  }

  const totalH = Array.from(node.children).reduce((s, c) => s + subtreeHeight(c), 0) + (node.children.length - 1) * 12;
  node.y = y + totalH / 2 - node.h / 2;
  return node;
}

function flattenTree(node: LayoutNode, acc: LayoutNode[]): void {
  acc.push(node);
  if (!node.collapsed) {
    for (const child of node.children) flattenTree(child, acc);
  }
}

/* ============================================================
   MindmapInterface — horizontal tree diagram
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

  // Build tree layout
  useEffect(() => {
    const raw = buildLayoutTree(root, 0, null);
    const totalH = subtreeHeight(raw);
    const svgH = Math.max(600, totalH + 80);
    layoutTree(raw, 60, 40);
    const flat: LayoutNode[] = [];
    flattenTree(raw, flat);
    setTreeRoot(raw);
    setLayoutNodes(flat);
  }, [root]);

  const handleZoomIn = useCallback(() => setScale((s) => Math.min(s * 1.25, 5)), []);
  const handleZoomOut = useCallback(() => setScale((s) => Math.max(s / 1.25, 0.15)), []);
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
    setScale((s) => Math.max(0.15, Math.min(5, s * delta)));
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

  const flatNodes = useMemo(() => {
    if (!treeRoot) return [];
    const arr: LayoutNode[] = [];
    flattenTree(treeRoot, arr);
    return arr;
  }, [treeRoot]);

  const byId = useMemo(() => new Map(flatNodes.map((n) => [n.id, n])), [flatNodes]);

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    for (const n of flatNodes) {
      if (n.label.toLowerCase().includes(q)) matches.add(n.id);
    }
    return matches;
  }, [searchQuery, flatNodes]);

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
  const maxH = Math.max(600, ...flatNodes.map((n) => n.y + n.h));

  return (
    <div
      id="mindmap"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-white",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3 bg-white">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight truncate">
            Mind map · {title}
          </h3>
          <p className="text-xs text-muted-foreground">{SOURCE_LABEL[source]}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
              searchOpen
                ? "border-indigo-400 bg-indigo-50 text-indigo-600"
                : "border-border hover:bg-gray-50",
            )}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button onClick={handleZoomOut} className="p-1.5 rounded-md border border-border hover:bg-gray-50 text-xs" title="Zoom out">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleZoomIn} className="p-1.5 rounded-md border border-border hover:bg-gray-50 text-xs" title="Zoom in">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleFit} className="p-1.5 rounded-md border border-border hover:bg-gray-50 text-xs" title="Fit to screen">
            <Maximize className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleExport} className="p-1.5 rounded-md border border-border hover:bg-gray-50 text-xs" title="Export SVG">
            <Download className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10px] text-muted-foreground hidden md:inline">
            {nodeCount} nodes · depth {rootDepth}
          </span>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-b border-border/60 px-4 py-2 flex items-center gap-2 bg-white">
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
          <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* SVG canvas */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-white"
        style={{ height: Math.max(640, maxH + 80) }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${Math.max(900, ...flatNodes.map((n) => n.x + n.w + 40))} ${maxH + 80}`}
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
              const pc = levelColor(parent.depth);
              const nc = levelColor(node.depth);
              const midX = parent.x + parent.w + 24;
              const nx = node.x;
              const my = parent.y + parent.h / 2;
              const ny = node.y + node.h / 2;

              return (
                <g key={`e-${node.id}`}>
                  {/* Curved edge */}
                  <path
                    d={`M ${parent.x + parent.w} ${my} C ${midX} ${my}, ${midX} ${ny}, ${nx} ${ny}`}
                    fill="none"
                    stroke={isSearchMatch ? "#f59e0b" : pc.edge}
                    strokeWidth={isSearchMatch ? 3 : 2}
                    strokeOpacity={isSearchMatch ? 1 : 0.7}
                    className="transition-all duration-200"
                  />
                  {/* Edge dot at child */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={3}
                    fill={isSearchMatch ? "#f59e0b" : nc.fill}
                    opacity={isSearchMatch ? 1 : 0.8}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {flatNodes.map((node) => {
              const color = levelColor(node.depth);
              const isRoot = node.depth === 0;
              const isMatch = searchMatches.has(node.id);
              const hasChildren = node.children.length > 0;
              const isCollapsed = node.collapsed;
              const truncatedLabel = node.label.length > 20 ? `${node.label.slice(0, 18)}…` : node.label;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  style={{ opacity: isMatch || !searchQuery ? 1 : 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasChildren) toggleNode(node.id);
                  }}
                >
                  {/* Shadow */}
                  <rect
                    x={2}
                    y={3}
                    width={node.w}
                    height={node.h}
                    rx={isRoot ? 12 : 8}
                    fill="rgba(0,0,0,0.08)"
                  />

                  {/* Node body */}
                  <rect
                    x={0}
                    y={0}
                    width={node.w}
                    height={node.h}
                    rx={isRoot ? 12 : 8}
                    fill={isRoot ? color.fill : color.bg}
                    stroke={isMatch ? "#f59e0b" : color.fill}
                    strokeWidth={isMatch ? 3 : isRoot ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Root glow */}
                  {isRoot && (
                    <rect
                      x={2}
                      y={2}
                      width={node.w - 4}
                      height={node.h - 4}
                      rx={10}
                      fill="url(#mm-root-glow)"
                      opacity={0.5}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={node.w / 2}
                    y={node.h / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isRoot ? color.text : "var(--foreground)"}
                    fontSize={isRoot ? 13 : 11}
                    fontWeight={isRoot ? 700 : 600}
                    className="pointer-events-none select-none"
                  >
                    {truncatedLabel}
                  </text>

                  {/* Collapse/expand badge */}
                  {hasChildren && (
                    <g>
                      <circle
                        cx={node.w + 6}
                        cy={node.h / 2}
                        r={9}
                        fill={color.fill}
                        stroke="#fff"
                        strokeWidth={1.5}
                      />
                      {isCollapsed ? (
                        <text
                          x={node.w + 6}
                          y={node.h / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize={10}
                          fontWeight={700}
                          className="pointer-events-none"
                        >
                          {node.children.length}
                        </text>
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" style={{ color: "#fff", transform: `translate(${node.w + 1.5}px, ${node.h / 2 - 7}px)` }} />
                      )}
                    </g>
                  )}

                  {/* Search match ring */}
                  {isMatch && (
                    <rect
                      x={-5}
                      y={-5}
                      width={node.w + 10}
                      height={node.h + 10}
                      rx={isRoot ? 14 : 10}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      strokeDasharray="5 3"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="16" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  )}

                  <title>{node.label}{hasChildren ? (isCollapsed ? " (collapsed — click to expand)" : " (click to collapse)") : ""}</title>
                </g>
              );
            })}
          </g>

          {/* Gradients */}
          <defs>
            <radialGradient id="mm-root-glow" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[11px] text-gray-600 bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
          {LEVEL_COLORS.slice(0, 4).map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: c.fill }} />
              {i === 0 ? "Root" : `L${i}`}
            </span>
          ))}
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border-2 border-dashed border-amber-400 shrink-0" />
            Found
          </span>
          <span className="hidden sm:inline text-gray-400 ml-1">Scroll to zoom · Drag to pan · Click nodes to collapse</span>
        </div>
      </div>
    </div>
  );
}
