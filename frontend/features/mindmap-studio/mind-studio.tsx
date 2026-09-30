"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DIAGRAM_TYPES,
  ENGINE_LABELS,
  generateDiagram,
  type DiagramType,
} from "./generate";

const MAP_STORAGE_KEY = "mindstudio-map-v1";
const OVERRIDE_STORAGE_KEY = "mindstudio-overrides-v1";
const FACT_TYPES = [
  "definition",
  "numeric",
  "formula",
  "comparison",
  "exception",
  "historical",
] as const;
const NODE_TYPES = ["concept", "fact", "question", "link"] as const;

const nodePalette: Record<string, string> = {
  concept: "#8b5cf6",
  fact: "#38bdf8",
  question: "#f59e0b",
  link: "#34d399",
};

const typeLabels: Record<NodeType, string> = {
  concept: "Concept",
  fact: "Fact",
  question: "Question",
  link: "Link",
};

type NodeType = (typeof NODE_TYPES)[number];
type FactType = (typeof FACT_TYPES)[number];

type MindNode = {
  id: string;
  text: string;
  type: NodeType;
  color: string;
  tags: string[];
  x: number;
  y: number;
  parentId?: string;
  collapsed?: boolean;
};

type Levels = {
  domain: string;
  subject: string;
  topic: string;
  concept: string;
};

type ClassificationCard = {
  nodeId: string;
  levels: Levels;
  factType: FactType;
  tags: string[];
  confidence: number;
  overrides: string[];
  reason: string;
};

type PanelPosition = { x: number; y: number };

type OverrideMap = Record<
  string,
  Partial<Pick<ClassificationCard, "factType" | "tags" | "levels">>
>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function unique(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

function buildSeedNodes(): MindNode[] {
  return [
    {
      id: "root",
      text: "Physics",
      type: "concept",
      color: "#8b5cf6",
      tags: ["science", "motion", "forces"],
      x: 0,
      y: 0,
    },
    {
      id: "circular-motion",
      text: "Circular Motion",
      type: "concept",
      color: "#60a5fa",
      tags: ["motion", "rotation", "kinematics"],
      x: -230,
      y: 140,
      parentId: "root",
    },
    {
      id: "centripetal-force",
      text: "Centripetal force",
      type: "fact",
      color: "#f59e0b",
      tags: ["force", "inward", "acceleration"],
      x: 160,
      y: 170,
      parentId: "root",
    },
    {
      id: "equation",
      text: "F = mv²/r",
      type: "fact",
      color: "#38bdf8",
      tags: ["formula", "magnitude", "velocity"],
      x: 280,
      y: 40,
      parentId: "root",
    },
    {
      id: "why-inward",
      text: "Why is it inward?",
      type: "question",
      color: "#f97316",
      tags: ["question", "intuition"],
      x: -140,
      y: 300,
      parentId: "circular-motion",
    },
    {
      id: "gravity-link",
      text: "Related: gravity",
      type: "link",
      color: "#34d399",
      tags: ["gravity", "field"],
      x: 210,
      y: 320,
      parentId: "centripetal-force",
    },
  ];
}

function getDefaultClassifications(nodes: MindNode[], overrides: OverrideMap): ClassificationCard[] {
  return nodes.map((node) => ({
    ...classifyText(node.text, node.id, overrides),
    nodeId: node.id,
  }));
}

function splitWords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9^/+=\-\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length > 2);
}

function classifyText(text: string, nodeId: string, overrides: OverrideMap): ClassificationCard {
  const lower = text.toLowerCase();
  const words = splitWords(text);
  const matched = new Set<string>();

  const keywordMap: Record<string, string[]> = {
    physics: ["physics", "motion", "force", "energy", "momentum", "acceleration", "velocity", "friction"],
    mechanics: ["mechanics", "motion", "force", "mass", "kinematics", "dynamics", "momentum"],
    circular: ["circular", "orbit", "rotation", "centripetal", "angular", "tangential"],
    gravity: ["gravity", "field", "mass", "orbit", "planet", "planetary"],
    formula: ["formula", "equation", "derive", "expression", "constant"],
    comparison: ["greater", "less", "compare", "versus", "than", "vs", "difference"],
    exception: ["unless", "except", "excluding", "special", "rare", "exception"],
    history: ["historical", "archimedes", "galileo", "newton", "before", "timeline"],
  };

  const domainMatches = Object.entries(keywordMap).flatMap(([key, values]) =>
    values.some((value) => lower.includes(value)) ? [key] : [],
  );

  let domain = "General Science";
  let subject = "Inquiry";
  let topic = "Foundation";
  let concept = text.trim().slice(0, 36) || "Concept";

  if (lower.includes("physics") || lower.includes("motion") || lower.includes("force")) {
    domain = "Physics";
    subject = "Mechanics";
    if (lower.includes("circular") || lower.includes("centripetal") || lower.includes("rotation")) {
      topic = "Circular Motion";
      concept = "Centripetal force";
    } else if (lower.includes("gravity") || lower.includes("orbit")) {
      topic = "Gravitation";
      concept = "Orbital force";
    } else if (lower.includes("velocity") || lower.includes("acceleration")) {
      topic = "Kinematics";
      concept = "Motion relations";
    }
  } else if (lower.includes("chem") || lower.includes("molecule") || lower.includes("atom")) {
    domain = "Chemistry";
    subject = "Matter";
    topic = "Structure";
  } else if (lower.includes("math") || lower.includes("graph") || lower.includes("equation")) {
    domain = "Mathematics";
    subject = "Quantitative Reasoning";
    topic = "Algebra";
  }

  if (domainMatches.length > 0) {
    domainMatches.forEach((value) => matched.add(value));
  }

  if (lower.includes("formula") || lower.includes("mv^2/r") || lower.includes("=") || /[A-Za-z]=/.test(text)) {
    matched.add("formula");
  }

  if (lower.includes("vs") || lower.includes("compare") || lower.includes("greater") || lower.includes("less")) {
    matched.add("comparison");
  }

  if (lower.includes("except") || lower.includes("unless") || lower.includes("special case")) {
    matched.add("exception");
  }

  if (lower.includes("history") || lower.includes("newton") || lower.includes("galileo") || lower.includes("archimedes")) {
    matched.add("history");
  }

  const tagPool = unique([
    ...words.slice(0, 8),
    ...Object.entries(keywordMap)
      .filter(([key]) => matched.has(key))
      .map(([key]) => key),
    "concept",
    "study",
    "analysis",
    "learning",
  ]).slice(0, 5);

  let factType: FactType = "definition";
  if (lower.includes("equals") || lower.includes("= ") || lower.includes("mv") || lower.includes("formula") || lower.includes("equation")) {
    factType = "formula";
  } else if (/\d/.test(text) || lower.includes("rate") || lower.includes("speed") || lower.includes("mass") || lower.includes("value")) {
    factType = "numeric";
  } else if (lower.includes("vs") || lower.includes("compare") || lower.includes("greater") || lower.includes("less") || lower.includes("difference")) {
    factType = "comparison";
  } else if (lower.includes("except") || lower.includes("unless") || lower.includes("special case")) {
    factType = "exception";
  } else if (lower.includes("newton") || lower.includes("history") || lower.includes("archimedes") || lower.includes("galileo")) {
    factType = "historical";
  }

  const override = overrides[nodeId];
  if (override) {
    if (override.levels) {
      concept = override.levels.concept ?? concept;
      topic = override.levels.topic ?? topic;
      subject = override.levels.subject ?? subject;
      domain = override.levels.domain ?? domain;
    }
    if (override.factType) {
      factType = override.factType;
    }
    if (override.tags && override.tags.length > 0) {
      tagPool.splice(0, tagPool.length, ...override.tags);
    }
  }

  const confidenceBase = 52 + matched.size * 7 + (text.length > 80 ? 12 : 0);
  const confidence = clamp(confidenceBase, 62, 98);

  const reason = override
    ? `User override applied; deterministic rules reinforced with ${factType}-focused cues.`
    : `Matched ${Array.from(matched).slice(0, 2).join(" + ") || "core topic"} signals and structural wording for ${domain.toLowerCase()}.`;

  return {
    nodeId,
    levels: { domain, subject, topic, concept },
    factType,
    tags: unique(tagPool).slice(0, 5),
    confidence,
    overrides: override ? ["manual override"] : [],
    reason,
  };
}

function Panel({
  title,
  position,
  setPosition,
  children,
  className = "",
  minimized = false,
  onToggleMinimized,
}: {
  title: string;
  position: PanelPosition;
  setPosition: (next: PanelPosition) => void;
  children: React.ReactNode;
  className?: string;
  minimized?: boolean;
  onToggleMinimized?: () => void;
}) {
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.baseX + dx,
        y: dragRef.current.baseY + dy,
      });
    };

    const onPointerUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [setPosition]);

  return (
    <div
      className={[
        "pointer-events-auto absolute min-w-[260px] rounded-2xl border border-white/15 bg-slate-950/45 text-white shadow-2xl shadow-slate-950/35 backdrop-blur-xl",
        className,
      ].join(" ")}
      style={{ left: position.x, top: position.y, width: "min(420px, calc(100vw - 32px))" }}
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 text-sm font-medium"
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("button") || target.closest("input") || target.closest("textarea")) {
            return;
          }
          dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            baseX: position.x,
            baseY: position.y,
          };
        }}
      >
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {onToggleMinimized ? (
            <button
              className="rounded border border-white/15 bg-slate-900/60 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200"
              onClick={onToggleMinimized}
            >
              {minimized ? "Open" : "Min"}
            </button>
          ) : null}
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
      </div>
      {!minimized ? <div className="p-3">{children}</div> : null}
    </div>
  );
}

export function MindStudio() {
  const [nodes, setNodes] = useState<MindNode[]>(() => {
    if (typeof window === "undefined") return buildSeedNodes();
    try {
      const saved = window.localStorage.getItem(MAP_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as MindNode[]) : buildSeedNodes();
    } catch {
      return buildSeedNodes();
    }
  });
  const [selectedNodeId, setSelectedNodeId] = useState("root");
  const [classifierText, setClassifierText] = useState(
    "Centripetal force is the inward force required to keep an object moving in a circular path. F = mv²/r.",
  );
  const [overrides, setOverrides] = useState<OverrideMap>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = window.localStorage.getItem(OVERRIDE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as OverrideMap) : {};
    } catch {
      return {};
    }
  });
  const [classifications, setClassifications] = useState<ClassificationCard[]>(() => {
    const demoNodes = buildSeedNodes();
    return getDefaultClassifications(demoNodes, {});
  });
  const [inspectedNodeId, setInspectedNodeId] = useState("centripetal-force");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [history, setHistory] = useState<MindNode[][]>([buildSeedNodes()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(null);
  const [panelMinimized, setPanelMinimized] = useState({
    canvas: false,
    classifier: false,
    data: false,
    inspector: false,
  });
  const [panelPositions, setPanelPositions] = useState({
    canvas: { x: 22, y: 22 },
    classifier: { x: 1060, y: 26 },
    data: { x: 1060, y: 308 },
    inspector: { x: 520, y: 440 },
  });
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ── AI Generate (Agnes → guest pool → puter.js) ─────────────────────────
  const [genOpen, setGenOpen] = useState(true);
  const [genTopic, setGenTopic] = useState("");
  const [genType, setGenType] = useState<DiagramType>("mindmap");
  const [genBusy, setGenBusy] = useState(false);
  const [genStatus, setGenStatus] = useState<{
    kind: "busy" | "done" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(nodes));
    }
  }, [nodes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(overrides));
    }
  }, [overrides]);

  useEffect(() => {
    const refreshed = getDefaultClassifications(nodes, overrides);
    setClassifications(refreshed);
  }, [nodes, overrides]);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? nodes[0],
    [nodes, selectedNodeId],
  );

  const activeClassification = useMemo(() => {
    const text = classifierText.trim();
    const id = selectedNode?.id ?? "selected-node";
    return classifyText(text || selectedNode?.text || "New concept", id, overrides);
  }, [classifierText, overrides, selectedNode]);

  const inspectorCard = useMemo(
    () => classifications.find((card) => card.nodeId === inspectedNodeId) ?? activeClassification,
    [classifications, activeClassification, inspectedNodeId],
  );

  const factTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    classifications.forEach((card) => {
      totals[card.factType] = (totals[card.factType] ?? 0) + 1;
    });
    return Object.entries(totals).map(([factType, count]) => ({ factType, count }));
  }, [classifications]);

  const topTags = useMemo(() => {
    const tally: Record<string, number> = {};
    classifications.forEach((card) => {
      card.tags.forEach((tag) => {
        tally[tag] = (tally[tag] ?? 0) + 1;
      });
    });
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag, count]) => ({ tag, count }));
  }, [classifications]);

  const commitNodes = useCallback(
    (nextNodes: MindNode[]) => {
      const trimmed = history.slice(0, historyIndex + 1);
      setHistory([...trimmed, nextNodes]);
      setHistoryIndex(trimmed.length);
      setNodes(nextNodes);
    },
    [history, historyIndex],
  );

  const createNode = useCallback(
    (parentId?: string) => {
      const base = selectedNode ?? nodes[0] ?? { x: 0, y: 0 };
      const next: MindNode = {
        id: `node-${Date.now()}`,
        text: `New ${typeLabels["concept"]}`,
        type: "concept",
        color: nodePalette.concept,
        tags: ["new"],
        x: (base.x ?? 0) + 170,
        y: (base.y ?? 0) + 120,
        parentId: parentId ?? base.id,
      };
      const nextNodes = [...nodes, next];
      commitNodes(nextNodes);
      setSelectedNodeId(next.id);
    },
    [commitNodes, nodes, selectedNode],
  );

  /** Frame a node set in the canvas viewport after a generation. */
  const fitToNodes = useCallback((nextNodes: MindNode[]) => {
    if (!nextNodes.length) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 900;
    const height = rect?.height ?? 540;
    const pad = 90;
    const xs = nextNodes.map((node) => node.x);
    const ys = nextNodes.map((node) => node.y);
    const minX = Math.min(...xs) - pad;
    const maxX = Math.max(...xs) + pad;
    const minY = Math.min(...ys) - pad;
    const maxY = Math.max(...ys) + pad;
    const nextScale = clamp(
      Math.min(width / Math.max(maxX - minX, 1), height / Math.max(maxY - minY, 1)),
      0.45,
      1.2,
    );
    setScale(nextScale);
    setPan({
      x: width / 2 - ((minX + maxX) / 2) * nextScale,
      y: height / 2 - ((minY + maxY) / 2) * nextScale,
    });
  }, []);

  /** Ask the engine chain for a diagram, replace the map, frame the result. */
  const handleGenerate = useCallback(async () => {
    const topic = genTopic.trim();
    if (!topic || genBusy) return;
    setGenBusy(true);
    setGenStatus({ kind: "busy", text: "Starting…" });
    try {
      const result = await generateDiagram({
        topic,
        type: genType,
        onEngine: (engine) =>
          setGenStatus({
            kind: "busy",
            text:
              engine === "agnes"
                ? "Asking Agnes…"
                : engine === "guest-pool"
                  ? "Agnes busy — using the guest pool…"
                  : "Switching to puter.js…",
          }),
      });
      commitNodes(result.nodes);
      setSelectedNodeId("root");
      setInspectedNodeId("root");
      fitToNodes(result.nodes);
      const typeLabel = DIAGRAM_TYPES.find((d) => d.id === genType)?.label ?? genType;
      const credits =
        typeof result.credits === "number" ? ` · ${result.credits} credits left` : "";
      setGenStatus({
        kind: "done",
        text: `${typeLabel}: ${result.nodes.length} nodes via ${ENGINE_LABELS[result.engine]}${credits} · Ctrl+Z undoes`,
      });
    } catch (error) {
      setGenStatus({
        kind: "error",
        text: (error instanceof Error ? error.message : "Generation failed").slice(0, 180),
      });
    } finally {
      setGenBusy(false);
    }
  }, [commitNodes, fitToNodes, genBusy, genTopic, genType]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        if (historyIndex > 0) {
          const previousIndex = historyIndex - 1;
          setHistoryIndex(previousIndex);
          setNodes(history[previousIndex]);
        }
      }
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
          const nextIndex = historyIndex + 1;
          setHistoryIndex(nextIndex);
          setNodes(history[nextIndex]);
        }
      }
      if (event.key.toLowerCase() === "n" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        createNode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [createNode, history, historyIndex]);

  const renameNode = (id: string) => {
    const current = nodes.find((node) => node.id === id);
    if (!current) return;
    const nextText = window.prompt("Rename node", current.text);
    if (!nextText || !nextText.trim()) return;
    const nextNodes = nodes.map((node) =>
      node.id === id ? { ...node, text: nextText.trim(), tags: unique([nextText.trim(), ...node.tags]).slice(0, 5) } : node,
    );
    commitNodes(nextNodes);
  };

  const deleteNode = (id: string) => {
    if (id === "root") return;
    const nextNodes = nodes.filter((node) => node.id !== id);
    commitNodes(nextNodes);
    setSelectedNodeId("root");
  };

  const mergeNode = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    const source = nodes.find((node) => node.id === sourceId);
    const target = nodes.find((node) => node.id === targetId);
    if (!source || !target) return;
    const mergedText = `${target.text} • ${source.text}`;
    const nextNodes = nodes
      .filter((node) => node.id !== sourceId)
      .map((node) =>
        node.id === targetId ? { ...node, text: mergedText, tags: unique([...node.tags, ...source.tags]).slice(0, 5) } : node,
      );
    commitNodes(nextNodes);
    setSelectedNodeId(targetId);
  };

  const toggleCollapse = (id: string) => {
    const nextNodes = nodes.map((node) => (node.id === id ? { ...node, collapsed: !node.collapsed } : node));
    commitNodes(nextNodes);
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!draggingNodeId || !dragOrigin) return;
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      const worldX = (event.clientX - canvasRect.left - pan.x) / scale;
      const worldY = (event.clientY - canvasRect.top - pan.y) / scale;
      const dx = worldX - dragOrigin.x;
      const dy = worldY - dragOrigin.y;
      const nextNodes = nodes.map((node) =>
        node.id === draggingNodeId ? { ...node, x: node.x + dx, y: node.y + dy } : node,
      );
      setNodes(nextNodes);
      setDragOrigin({ x: worldX, y: worldY });
    },
    [draggingNodeId, dragOrigin, nodes, pan.x, pan.y, scale],
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", () => {
      setDraggingNodeId(null);
      setDragOrigin(null);
    });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove]);

  const handleCanvasWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    const nextScale = clamp(scale * (event.deltaY > 0 ? 0.9 : 1.1), 0.45, 1.8);
    const worldX = (cursorX - pan.x) / scale;
    const worldY = (cursorY - pan.y) / scale;
    setScale(nextScale);
    setPan({
      x: cursorX - worldX * nextScale,
      y: cursorY - worldY * nextScale,
    });
  };

  const applyOverride = () => {
    const next = {
      ...overrides,
      [selectedNode?.id ?? "selected-node"]: {
        factType: activeClassification.factType,
        levels: activeClassification.levels,
        tags: activeClassification.tags,
      },
    };
    setOverrides(next);
    setInspectedNodeId(selectedNode?.id ?? "selected-node");
  };

  const exportMap = () => {
    const json = JSON.stringify({ nodes, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mindstudio-map.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importMap = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const incoming = Array.isArray(parsed.nodes) ? (parsed.nodes as MindNode[]) : buildSeedNodes();
        const safeNodes = incoming.length ? incoming : buildSeedNodes();
        commitNodes(safeNodes);
        setSelectedNodeId(safeNodes[0]?.id ?? "root");
      } catch {
        window.alert("Could not import Mind Studio map. Ensure the JSON is valid.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040916] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),transparent_40%)]" />

      <Panel
        title="Canvas"
        position={panelPositions.canvas}
        setPosition={(next) => setPanelPositions((current) => ({ ...current, canvas: next }))}
        className="w-[calc(100vw-120px)] max-w-[980px]"
        minimized={panelMinimized.canvas}
        onToggleMinimized={() => setPanelMinimized((current) => ({ ...current, canvas: !current.canvas }))}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => createNode(selectedNode?.id)}>
                + Node
              </Button>
              <Button size="sm" variant="outline" onClick={exportMap}>
                Export JSON
              </Button>
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
              <span>Zoom {scale.toFixed(2)}x</span>
              <span>•</span>
              <span>{nodes.length} nodes</span>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="application/json" onChange={importMap} className="hidden" />

          {/* AI Generate — Agnes first, guest pool, puter.js last */}
          <div className="rounded-xl border border-violet-400/25 bg-violet-500/5 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                AI Generate · mindmap, tree, flowchart &amp; more
              </span>
              <button
                type="button"
                aria-expanded={genOpen}
                className="rounded border border-white/15 bg-slate-900/60 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200"
                onClick={() => setGenOpen((open) => !open)}
              >
                {genOpen ? "Hide" : "Show"}
              </button>
            </div>

            {genOpen ? (
              <div className="mt-3 space-y-2">
                <Textarea
                  value={genTopic}
                  onChange={(event) => setGenTopic(event.target.value)}
                  rows={2}
                  placeholder='Topic or pasted text — e.g. "Photosynthesis", "The Mughal Empire", a whole chapter…'
                  className="border-white/10 bg-slate-900/70 text-sm text-slate-100 placeholder:text-slate-500"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={genType}
                    onValueChange={(next) => setGenType(next as DiagramType)}
                  >
                    <SelectTrigger className="h-8 w-[190px] border-white/15 bg-slate-900/60 text-xs text-slate-100">
                      <SelectValue>
                        {DIAGRAM_TYPES.find((d) => d.id === genType)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="border-white/15 bg-slate-950 text-slate-100">
                      {DIAGRAM_TYPES.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    size="sm"
                    onClick={() => void handleGenerate()}
                    disabled={genBusy || !genTopic.trim()}
                    className="bg-violet-500 text-white hover:bg-violet-400/90"
                  >
                    {genBusy ? (
                      <>
                        <span className="mr-1 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                        Generating…
                      </>
                    ) : (
                      "Generate with AI"
                    )}
                  </Button>

                  {genStatus ? (
                    <span
                      role="status"
                      aria-live="polite"
                      className={[
                        "text-[11px]",
                        genStatus.kind === "done" ? "text-emerald-300" : "",
                        genStatus.kind === "error" ? "text-rose-300" : "",
                        genStatus.kind === "busy" ? "text-slate-300" : "",
                      ].join(" ")}
                    >
                      {genStatus.text}
                    </span>
                  ) : null}
                </div>
                <p className="text-[10px] leading-relaxed text-slate-400">
                  Agnes (platform AI) → guest pool → puter.js in your browser. Generation
                  replaces the map — Ctrl+Z undoes. Classification stays local.
                </p>
              </div>
            ) : null}
          </div>

          <div
            ref={canvasRef}
            className="relative h-[540px] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle,_rgba(15,23,42,0.76),rgba(2,6,23,0.94))]"
            onWheel={handleCanvasWheel}
            onClick={() => setSelectedNodeId("root")}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transformOrigin: "0 0",
              }}
            >
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/30 bg-violet-500/8 blur-2xl" />
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isRoot = node.id === "root";
                const children = nodes.filter((child) => child.parentId === node.id);
                return (
                  <div key={node.id}>
                    {node.parentId && (
                      <div
                        className="absolute h-px bg-gradient-to-r from-sky-400/30 via-violet-400/60 to-cyan-300/30"
                        style={{
                          left: Math.min(node.x, nodes.find((n) => n.id === node.parentId)?.x ?? node.x) + (isRoot ? 0 : 30),
                          top: Math.min(node.y, nodes.find((n) => n.id === node.parentId)?.y ?? node.y) + (isRoot ? 0 : 30),
                          width: Math.abs((nodes.find((n) => n.id === node.parentId)?.x ?? node.x) - node.x) + 60,
                          height: 2,
                          transform: `rotate(${Math.atan2((nodes.find((n) => n.id === node.parentId)?.y ?? node.y) - node.y, (nodes.find((n) => n.id === node.parentId)?.x ?? node.x) - node.x) * 180 / Math.PI}deg)`,
                          transformOrigin: "left center",
                        }}
                      />
                    )}
                    <div
                      className={[
                        "absolute flex cursor-pointer select-none flex-col items-center rounded-2xl border px-3 py-2 text-center shadow-lg transition-all duration-150",
                        isSelected ? "border-white/80 ring-2 ring-cyan-400/80" : "border-white/10",
                        isRoot ? "min-w-[150px]" : "min-w-[150px]",
                      ].join(" ")}
                      style={{
                        left: node.x,
                        top: node.y,
                        background: `linear-gradient(135deg, ${node.color}44, rgba(15,23,42,0.78))`,
                        boxShadow: isSelected ? `0 0 0 1px ${node.color}, 0 0 25px ${node.color}55` : `0 16px 30px rgba(15,23,42,0.45)`,
                        transform: `translate(-50%, -50%)`,
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedNodeId(node.id);
                        setInspectedNodeId(node.id);
                      }}
                      onPointerDown={(event) => {
                        event.stopPropagation();
                        setDraggingNodeId(node.id);
                        const rect = canvasRef.current?.getBoundingClientRect();
                        if (!rect) return;
                        const worldX = (event.clientX - rect.left - pan.x) / scale;
                        const worldY = (event.clientY - rect.top - pan.y) / scale;
                        setDragOrigin({ x: worldX, y: worldY });
                      }}
                    >
                      <div className="mb-1 flex w-full items-center justify-between gap-2">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ background: node.color }} />
                        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-300">{typeLabels[node.type]}</span>
                      </div>
                      <strong className="max-w-[160px] text-sm font-semibold text-white">{node.text}</strong>
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {node.tags.slice(0, 3).map((tag) => (
                          <span key={`${node.id}-${tag}`} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {isSelected ? (
                        <div className="mt-2 flex items-center gap-1">
                          <button
                            className="rounded border border-white/15 bg-slate-900/80 px-1.5 py-1 text-[10px] text-slate-100"
                            onClick={(event) => {
                              event.stopPropagation();
                              renameNode(node.id);
                            }}
                          >
                            Rename
                          </button>
                          <button
                            className="rounded border border-white/15 bg-slate-900/80 px-1.5 py-1 text-[10px] text-slate-100"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleCollapse(node.id);
                            }}
                          >
                            {node.collapsed ? "Expand" : "Collapse"}
                          </button>
                          {node.id !== "root" ? (
                            <button
                              className="rounded border border-white/15 bg-slate-900/80 px-1.5 py-1 text-[10px] text-slate-100"
                              onClick={(event) => {
                                event.stopPropagation();
                                deleteNode(node.id);
                              }}
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    {children.length > 0 && !node.collapsed ? null : null}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-4 right-4 w-36 rounded-xl border border-white/10 bg-slate-950/70 p-3 shadow-lg shadow-slate-950/40 backdrop-blur-md">
              <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Minimap</div>
              <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-slate-900/70">
                {nodes.map((node) => (
                  <div
                    key={`mini-${node.id}`}
                    className="absolute rounded-full border border-white/20 bg-violet-400/80"
                    style={{
                      left: `${((node.x + 300) / 700) * 100}%`,
                      top: `${((node.y + 220) / 500) * 100}%`,
                      width: `${node.id === "root" ? 12 : 6}px`,
                      height: `${node.id === "root" ? 12 : 6}px`,
                    }}
                  />
                ))}
                <div
                  className="absolute rounded border border-cyan-400/70 bg-cyan-400/10"
                  style={{
                    left: `${((pan.x + 100) / 700) * 100}%`,
                    top: `${((pan.y + 100) / 500) * 100}%`,
                    width: `${Math.max(16, 80 / scale)}%`,
                    height: `${Math.max(16, 70 / scale)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        title="Classifier"
        position={panelPositions.classifier}
        setPosition={(next) => setPanelPositions((current) => ({ ...current, classifier: next }))}
        minimized={panelMinimized.classifier}
        onToggleMinimized={() => setPanelMinimized((current) => ({ ...current, classifier: !current.classifier }))}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Input</span>
            <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[10px] text-violet-200">
              {selectedNode?.text ?? "No selection"}
            </div>
          </div>
          <Textarea
            value={classifierText}
            onChange={(event) => setClassifierText(event.target.value)}
            className="min-h-[120px] bg-slate-950/60 text-sm text-slate-100"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={applyOverride}>Apply override</Button>
            <Button size="sm" variant="outline" onClick={() => setClassifierText(selectedNode?.text ?? classifierText)}>
              Use node text
            </Button>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
              <span>Classification</span>
              <span>{Math.round(activeClassification.confidence)}%</span>
            </div>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500" style={{ width: `${activeClassification.confidence}%` }} />
            </div>
            <div className="space-y-2 text-sm text-slate-200">
              <div><span className="text-slate-400">Domain:</span> {activeClassification.levels.domain}</div>
              <div><span className="text-slate-400">Subject:</span> {activeClassification.levels.subject}</div>
              <div><span className="text-slate-400">Topic:</span> {activeClassification.levels.topic}</div>
              <div><span className="text-slate-400">Concept:</span> {activeClassification.levels.concept}</div>
              <div><span className="text-slate-400">Fact:</span> {activeClassification.factType}</div>
              <div className="flex flex-wrap gap-2">
                {activeClassification.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-cyan-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-slate-200">{activeClassification.reason}</div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        title="Data View"
        position={panelPositions.data}
        setPosition={(next) => setPanelPositions((current) => ({ ...current, data: next }))}
        minimized={panelMinimized.data}
        onToggleMinimized={() => setPanelMinimized((current) => ({ ...current, data: !current.data }))}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Fact summary</div>
            <div className="space-y-2">
              {factTotals.map(({ factType, count }) => (
                <div key={factType}>
                  <div className="mb-1 flex justify-between text-[11px] text-slate-300">
                    <span>{factType}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-500"
                      style={{ width: `${(count / Math.max(classifications.length, 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Top tags</div>
            <div className="flex flex-wrap gap-2">
              {topTags.map(({ tag, count }) => (
                <div key={tag} className="flex min-w-[90px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 p-2">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-300">{tag}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${(count / Math.max(topTags[0]?.count ?? 1, 1)) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-300">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {classifications.map((card) => (
              <div
                key={card.nodeId}
                className={[
                  "group relative rounded-2xl border border-white/10 bg-slate-950/50 p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10",
                  inspectedNodeId === card.nodeId ? "border-cyan-400/80 ring-1 ring-cyan-400/70" : "",
                ].join(" ")}
                onClick={() => setInspectedNodeId(card.nodeId)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span className="text-sm font-semibold text-white">{nodes.find((node) => node.id === card.nodeId)?.text ?? "Unknown"}</span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                    {card.factType}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {card.tags.slice(0, 4).map((tag) => (
                    <span key={`${card.nodeId}-${tag}`} className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-violet-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-300">{card.reason}</div>

                <div className="pointer-events-none absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <button className="rounded border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100">Edit</button>
                  <button className="rounded border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100">Link</button>
                  <button className="rounded border border-white/10 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100">Pin</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel
        title="Inspector"
        position={panelPositions.inspector}
        setPosition={(next) => setPanelPositions((current) => ({ ...current, inspector: next }))}
        minimized={panelMinimized.inspector}
        onToggleMinimized={() => setPanelMinimized((current) => ({ ...current, inspector: !current.inspector }))}
      >
        <div className="space-y-3 text-sm text-slate-200">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-white">{nodes.find((node) => node.id === inspectedNodeId)?.text ?? "Selection"}</span>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-100">
              {inspectorCard?.factType ?? "definition"}
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Classification</div>
            <div className="space-y-2 text-xs">
              <div><span className="text-slate-400">Domain:</span> {inspectorCard?.levels.domain}</div>
              <div><span className="text-slate-400">Subject:</span> {inspectorCard?.levels.subject}</div>
              <div><span className="text-slate-400">Topic:</span> {inspectorCard?.levels.topic}</div>
              <div><span className="text-slate-400">Concept:</span> {inspectorCard?.levels.concept}</div>
              <div><span className="text-slate-400">Confidence:</span> {Math.round(inspectorCard?.confidence ?? 0)}%</div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Reasoning</div>
            <p className="text-xs leading-6 text-slate-200">{inspectorCard?.reason ?? "No reasoning yet."}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Tags</div>
            <div className="flex flex-wrap gap-2">
              {(inspectorCard?.tags ?? []).map((tag) => (
                <span key={`${inspectorCard?.nodeId ?? "tag"}-${tag}`} className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-fuchsia-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {inspectorCard?.overrides?.length ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-100">
              Overrides: {inspectorCard.overrides.join(", ")}
            </div>
          ) : null}
        </div>
      </Panel>

      {paletteOpen ? (
        <div className="absolute inset-0 z-50 flex items-start justify-center bg-slate-950/45 p-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/60">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Command palette</div>
              <button className="rounded border border-white/10 bg-slate-900/70 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200" onClick={() => setPaletteOpen(false)}>
                Esc
              </button>
            </div>
            <Input
              placeholder="Search commands…"
              className="mb-3 bg-slate-900/70 text-slate-100"
              autoFocus
              onKeyDown={(event) => {
                if (event.key === "Escape") setPaletteOpen(false);
              }}
            />
            <div className="space-y-2">
              {[
                { label: "New node", action: () => createNode(selectedNode?.id) },
                { label: "Open inspector", action: () => setPanelMinimized((current) => ({ ...current, inspector: false })) },
                { label: "Focus root", action: () => setSelectedNodeId("root") },
                { label: "Export map", action: exportMap },
                { label: "Apply override", action: applyOverride },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-white/10"
                  onClick={() => {
                    item.action();
                    setPaletteOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">⌘K</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
