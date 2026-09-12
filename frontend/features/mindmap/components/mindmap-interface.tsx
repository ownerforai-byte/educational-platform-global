"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  ChevronDown,
  X,
  Workflow,
  Sparkles,
} from "lucide-react";
import type { MindmapNode, MindmapSource } from "../types";

/* ============================================================
   Branch-Isolated Color Palette
   Each primary branch receives a distinct, non-confusable color
   inherited by all its sub-nodes.
   ============================================================ */

export const BRANCH_PALETTES = [
  {
    name: "Branch 1",
    fill: "#10b981", // Emerald
    bg: "rgba(16, 185, 129, 0.14)",
    stroke: "#10b981",
    edge: "#10b981",
    text: "#6ee7b7",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  {
    name: "Branch 2",
    fill: "#0ea5e9", // Sky Cyan
    bg: "rgba(14, 165, 233, 0.14)",
    stroke: "#0ea5e9",
    edge: "#0ea5e9",
    text: "#7dd3fc",
    glow: "rgba(14, 165, 233, 0.35)",
  },
  {
    name: "Branch 3",
    fill: "#a855f7", // Purple
    bg: "rgba(168, 85, 247, 0.14)",
    stroke: "#a855f7",
    edge: "#a855f7",
    text: "#d8b4fe",
    glow: "rgba(168, 85, 247, 0.35)",
  },
  {
    name: "Branch 4",
    fill: "#f59e0b", // Amber
    bg: "rgba(245, 158, 11, 0.14)",
    stroke: "#f59e0b",
    edge: "#f59e0b",
    text: "#fcd34d",
    glow: "rgba(245, 158, 11, 0.35)",
  },
  {
    name: "Branch 5",
    fill: "#f43f5e", // Rose
    bg: "rgba(244, 63, 94, 0.14)",
    stroke: "#f43f5e",
    edge: "#f43f5e",
    text: "#fda4af",
    glow: "rgba(244, 63, 94, 0.35)",
  },
  {
    name: "Branch 6",
    fill: "#14b8a6", // Teal
    bg: "rgba(20, 184, 166, 0.14)",
    stroke: "#14b8a6",
    edge: "#14b8a6",
    text: "#5eead4",
    glow: "rgba(20, 184, 166, 0.35)",
  },
  {
    name: "Branch 7",
    fill: "#6366f1", // Indigo
    bg: "rgba(99, 102, 241, 0.14)",
    stroke: "#6366f1",
    edge: "#6366f1",
    text: "#a5b4fc",
    glow: "rgba(99, 102, 241, 0.35)",
  },
];

const ROOT_STYLE = {
  fill: "#3b82f6",
  bg: "#1e3a8a",
  stroke: "#60a5fa",
  edge: "#60a5fa",
  text: "#ffffff",
  glow: "rgba(96, 165, 250, 0.5)",
};

function getBranchStyle(branchIndex: number) {
  if (branchIndex < 0) return ROOT_STYLE;
  return BRANCH_PALETTES[branchIndex % BRANCH_PALETTES.length];
}

/* ============================================================
   Layout: horizontal tree with Branch Tracking
   ============================================================ */

type LayoutNode = {
  id: string;
  label: string;
  depth: number;
  branchIndex: number;
  parentId: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  children: LayoutNode[];
  collapsed: boolean;
};

function estimateNodeWidth(label: string): number {
  return Math.max(130, Math.min(240, label.length * 8.5 + 34));
}

function estimateNodeHeight(depth: number): number {
  return depth === 0 ? 52 : 38;
}

function buildLayoutTree(
  node: MindmapNode,
  depth: number,
  parentId: string | null,
  assignedBranchIndex: number
): LayoutNode {
  const w = estimateNodeWidth(node.label);
  const h = estimateNodeHeight(depth);

  return {
    id: node.id,
    label: node.label,
    depth,
    branchIndex: assignedBranchIndex,
    parentId,
    x: 0,
    y: 0,
    w,
    h,
    children: (node.children ?? []).map((c, idx) => {
      // Depth 0 children determine the root branches (0, 1, 2...)
      const childBranch = depth === 0 ? idx : assignedBranchIndex;
      return buildLayoutTree(c, depth + 1, node.id, childBranch);
    }),
    collapsed: false,
  };
}

function subtreeHeight(node: LayoutNode): number {
  if (node.collapsed || node.children.length === 0) return node.h + 20;
  return (
    node.children.reduce((s, c) => s + subtreeHeight(c), 0) +
    (node.children.length - 1) * 14
  );
}

function layoutTree(node: LayoutNode, x: number, y: number): LayoutNode {
  node.x = x;
  node.y = y;
  if (node.collapsed || node.children.length === 0) return node;

  let curY = y;
  for (const child of node.children) {
    const ch = subtreeHeight(child);
    layoutTree(child, x + 220, curY + ch / 2 - child.h / 2);
    curY += ch + 14;
  }

  const totalH =
    Array.from(node.children).reduce((s, c) => s + subtreeHeight(c), 0) +
    (node.children.length - 1) * 14;
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
   MindmapInterface — Non-White Blueprint Canvas with Branch Isolation
   ============================================================ */

const SOURCE_LABEL: Record<MindmapSource, string> = {
  syllabus: "Official Syllabus Mindmap (Non-White Blueprint Canvas)",
  imported: "Imported Curriculum Study Map",
  override: "Custom Interactive Map",
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
  const [treeRoot, setTreeRoot] = useState<LayoutNode | null>(null);

  // Build tree layout with branch indexing
  useEffect(() => {
    const raw = buildLayoutTree(root, 0, null, -1);
    layoutTree(raw, 60, 40);
    setTreeRoot(raw);
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
    [offset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      setOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    },
    [isPanning, panStart]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
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
  const maxH = Math.max(640, ...flatNodes.map((n) => n.y + n.h));

  // Count active root branches
  const activeBranchCount = useMemo(() => {
    return treeRoot?.children?.length ?? 0;
  }, [treeRoot]);

  return (
    <div
      id="mindmap"
      className={cn(
        "overflow-hidden rounded-3xl border border-blue-900/40 bg-[#070b16] shadow-xl text-slate-100",
        className
      )}
    >
      {/* ── 1. HEADER BAR (Dark Blueprint Theme) ────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/40 px-5 py-3.5 bg-[#090e1f]/90 backdrop-blur-md">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Workflow className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-white truncate">
              {title}
            </h3>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeBranchCount} Isolated Branches
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{SOURCE_LABEL[source]}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all",
              searchOpen
                ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                : "border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            )}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search Nodes</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-xs"
            title="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-xs"
            title="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleFit}
            className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-xs"
            title="Fit to screen"
          >
            <Maximize className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleExport}
            className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-xs"
            title="Export SVG"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline ml-1">
            {nodeCount} concepts · depth {rootDepth}
          </span>
        </div>
      </div>

      {/* ── 2. SEARCH BAR ────────────────────────────────────────────────── */}
      {searchOpen && (
        <div className="border-b border-blue-900/40 px-5 py-2.5 flex items-center gap-3 bg-[#0a1024]">
          <Search className="h-4 w-4 text-amber-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas, keywords…"
            className="flex-1 text-xs sm:text-sm bg-transparent outline-none placeholder:text-slate-500 text-white font-medium"
            autoFocus
          />
          {searchQuery && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              {searchMatches.size} match{searchMatches.size !== 1 ? "es" : ""}
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchOpen(false);
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── 3. SVG BLUEPRINT CANVAS (Non-White Background) ───────────────── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-[#070b16] select-none"
        style={{ height: Math.max(620, maxH + 90) }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Subtle engineering grid dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${Math.max(920, ...flatNodes.map((n) => n.x + n.w + 60))} ${maxH + 90}`}
          className="w-full h-full"
          role="img"
          aria-label={`Branch-isolated mind map for ${title}`}
          style={{ cursor: isPanning ? "grabbing" : "grab" }}
        >
          <defs>
            <radialGradient id="mm-blueprint-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
            {/* Edges with Branch-Specific Non-Confusable Colors */}
            {flatNodes.map((node) => {
              if (!node.parentId) return null;
              const parent = byId.get(node.parentId);
              if (!parent) return null;

              const isSearchMatch =
                searchMatches.size > 0 &&
                (searchMatches.has(node.id) || searchMatches.has(parent.id));

              const branchStyle = getBranchStyle(node.branchIndex);
              const edgeColor = isSearchMatch ? "#f59e0b" : branchStyle.edge;
              const edgeWidth = isSearchMatch ? 3.5 : node.depth === 1 ? 3 : 2;

              const midX = parent.x + parent.w + 28;
              const nx = node.x;
              const my = parent.y + parent.h / 2;
              const ny = node.y + node.h / 2;

              return (
                <g key={`e-${node.id}`}>
                  {/* Glow layer for branch trunk */}
                  <path
                    d={`M ${parent.x + parent.w} ${my} C ${midX} ${my}, ${midX} ${ny}, ${nx} ${ny}`}
                    fill="none"
                    stroke={edgeColor}
                    strokeWidth={edgeWidth + 4}
                    strokeOpacity={0.15}
                  />
                  {/* Crisp branch line */}
                  <path
                    d={`M ${parent.x + parent.w} ${my} C ${midX} ${my}, ${midX} ${ny}, ${nx} ${ny}`}
                    fill="none"
                    stroke={edgeColor}
                    strokeWidth={edgeWidth}
                    strokeOpacity={isSearchMatch ? 1 : 0.85}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  {/* Pinpoint Dot at Child Terminal */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={node.depth === 1 ? 4 : 3}
                    fill={edgeColor}
                    stroke="#ffffff"
                    strokeWidth={1}
                    opacity={isSearchMatch ? 1 : 0.9}
                  />
                </g>
              );
            })}

            {/* Nodes with Branch-Specific Fill, Glow & High Contrast Text */}
            {flatNodes.map((node) => {
              const isRoot = node.depth === 0;
              const branchStyle = getBranchStyle(node.branchIndex);
              const isMatch = searchMatches.has(node.id);
              const hasChildren = node.children.length > 0;
              const isCollapsed = node.collapsed;
              const truncatedLabel =
                node.label.length > 24 ? `${node.label.slice(0, 22)}…` : node.label;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02]"
                  style={{ opacity: isMatch || !searchQuery ? 1 : 0.25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasChildren) toggleNode(node.id);
                  }}
                >
                  {/* Drop Shadow */}
                  <rect
                    x={2}
                    y={3}
                    width={node.w}
                    height={node.h}
                    rx={isRoot ? 14 : 10}
                    fill="rgba(0, 0, 0, 0.4)"
                  />

                  {/* Node Body (Dark with Neon Edge) */}
                  <rect
                    x={0}
                    y={0}
                    width={node.w}
                    height={node.h}
                    rx={isRoot ? 14 : 10}
                    fill={isRoot ? branchStyle.bg : "#0c1328"}
                    stroke={isMatch ? "#f59e0b" : branchStyle.stroke}
                    strokeWidth={isMatch ? 3 : isRoot ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />

                  {/* Root Hub Center Glow */}
                  {isRoot && (
                    <rect
                      x={2}
                      y={2}
                      width={node.w - 4}
                      height={node.h - 4}
                      rx={12}
                      fill="url(#mm-blueprint-glow)"
                    />
                  )}

                  {/* Node Branch Badge on left edge */}
                  {!isRoot && (
                    <rect
                      x={0}
                      y={0}
                      width={5}
                      height={node.h}
                      rx={2}
                      fill={branchStyle.stroke}
                    />
                  )}

                  {/* Node Label Text */}
                  <text
                    x={isRoot ? node.w / 2 : node.w / 2 + 3}
                    y={node.h / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isRoot ? "#ffffff" : isMatch ? "#fbbf24" : branchStyle.text}
                    fontSize={isRoot ? 13 : 11}
                    fontWeight={isRoot ? 800 : 700}
                    className="pointer-events-none select-none font-sans"
                  >
                    {truncatedLabel}
                  </text>

                  {/* Collapse/Expand Count Badge */}
                  {hasChildren && (
                    <g>
                      <circle
                        cx={node.w + 7}
                        cy={node.h / 2}
                        r={9.5}
                        fill={branchStyle.fill}
                        stroke="#070b16"
                        strokeWidth={2}
                      />
                      {isCollapsed ? (
                        <text
                          x={node.w + 7}
                          y={node.h / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffffff"
                          fontSize={10}
                          fontWeight={800}
                          className="pointer-events-none"
                        >
                          {node.children.length}
                        </text>
                      ) : (
                        <ChevronDown
                          className="h-3.5 w-3.5"
                          style={{
                            color: "#ffffff",
                            transform: `translate(${node.w + 2}px, ${node.h / 2 - 7}px)`,
                          }}
                        />
                      )}
                    </g>
                  )}

                  {/* Search Match Highlight Ring */}
                  {isMatch && (
                    <rect
                      x={-5}
                      y={-5}
                      width={node.w + 10}
                      height={node.h + 10}
                      rx={isRoot ? 16 : 12}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      strokeDasharray="5 3"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="16"
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  )}

                  <title>
                    {node.label}
                    {hasChildren
                      ? isCollapsed
                        ? " (Click to expand branch)"
                        : " (Click to collapse branch)"
                      : ""}
                  </title>
                </g>
              );
            })}
          </g>
        </svg>

        {/* ── 4. NON-CONFUSABLE BRANCH LEGEND BAR ────────────────────────── */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300 bg-[#090e1f]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blue-900/40 shadow-lg">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-extrabold text-white text-xs">Branch Isolation:</span>
            {BRANCH_PALETTES.slice(0, activeBranchCount || 5).map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[10px] font-bold"
                style={{
                  backgroundColor: b.bg,
                  borderColor: b.stroke,
                  color: b.text,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: b.fill }}
                />
                <span>Branch {i + 1}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>Search Match</span>
            </span>
            <span className="hidden sm:inline text-slate-500">
              Pan: Drag · Zoom: Wheel · Expand: Click node
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
