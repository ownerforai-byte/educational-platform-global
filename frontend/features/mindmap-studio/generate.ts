/**
 * AI DIAGRAM GENERATION for Mind Studio.
 *
 * Engine policy — the same "Agnes first, puter.js fallback" rule the platform's
 * image tools follow, plus the guest pool between them:
 *   1. agnes       — signed-in chat via /api/ai (server-side AGNES_API_KEY)
 *   2. guest-pool  — /api/ai/guest daily pool when signed out
 *   3. puter       — puter.js in the student's browser (User-Pays, free)
 *
 * The model returns ONE JSON object describing a tree; we sanitize it (unique
 * ids, a single root, no cycles, hard caps) and lay it out per diagram type
 * into the absolute canvas coordinates mind-studio.tsx already understands.
 * Nothing here renders UI and nothing here talks to the network except
 * generateDiagram — so the whole pipeline is unit-testable with fake engines.
 */

import { chat, guestChat } from "@/lib/api/ai";
import { chatWithPuter } from "@/lib/puter-chat";
import type { AIChatMessage } from "@/types/api";

/* ── Diagram types ─────────────────────────────────────────────────────── */

export const DIAGRAM_TYPES = [
  { id: "mindmap", label: "Mindmap" },
  { id: "tree", label: "Tree diagram" },
  { id: "flowchart", label: "Flowchart" },
  { id: "hierarchy", label: "Hierarchy / org chart" },
  { id: "timeline", label: "Timeline" },
  { id: "sequence", label: "Sequence diagram" },
] as const;

export type DiagramType = (typeof DIAGRAM_TYPES)[number]["id"];

export const ENGINE_LABELS: Record<Engine, string> = {
  agnes: "Agnes (platform AI)",
  "guest-pool": "Agnes guest pool",
  puter: "puter.js (your browser)",
};

export type Engine = "agnes" | "guest-pool" | "puter";

/** Hard ceiling on generated nodes — keeps the canvas readable and output in budget. */
export const MAX_NODES = 120;

const NODE_KINDS = ["concept", "fact", "question", "link"] as const;
type NodeKind = (typeof NODE_KINDS)[number];

const TYPE_GUIDANCE: Record<DiagramType, string> = {
  mindmap:
    "Mindmap: 3-6 main branches spreading from the root, 2-3 levels deep, balanced left and right.",
  tree: "Tree diagram: a strict top-down taxonomy — root, then categories, subcategories and leaves, 3-4 levels.",
  flowchart:
    "Flowchart: an ordered process read left to right — chain the steps in sequence and branch at decision points (use kind 'question' for decisions).",
  hierarchy:
    "Hierarchy / org chart: clear superior-to-subordinate lines, 3-4 levels, groups of similar size.",
  timeline:
    "Timeline: chronological order read left to right — dates or eras as branches, events as ordered steps beneath them.",
  sequence:
    "Sequence diagram: the root has 3-6 actors/scenes as direct children; beneath EACH actor, that actor's own steps or messages in time order (a step label may start with '-> Other: ' to show direction). Never leave actors empty.",
};

const SYSTEM_PROMPT = [
  "You are the diagram engine of Mind Studio. You convert a topic into a structured diagram.",
  "Reply with ONLY one JSON object. No prose, no markdown, no code fences.",
  'Schema: {"title": string, "nodes": [{"id": string, "parent": string|null, "label": string, "kind": "concept"|"fact"|"question"|"link", "tags": string[]}]}',
  "Rules:",
  "- Exactly ONE node has \"parent\": null — the root; its id must be unique and its label is the diagram title.",
  '- Every other node\'s "parent" must equal the id of another node (a tree: exactly one parent each).',
  "- ids are short lowercase slugs, unique within the diagram.",
  "- labels are concise noun phrases of at most 6 words; tags are 0-4 short lowercase keywords.",
  "- kind: concept = branch/topic, fact = statement or data, question = decision or open question, link = cross reference.",
  "- Keep it to 7-40 nodes so the JSON fits comfortably in one reply.",
].join("\n");

/* ── Spec (parsed model output) and laid-out output ────────────────────── */

interface SpecNode {
  id: string;
  parent: string | null;
  label: string;
  kind: NodeKind;
  tags: string[];
}

export interface DiagramSpec {
  title: string;
  nodes: SpecNode[];
}

/** Structurally assignable to the studio's private MindNode type. */
export interface LaidNode {
  id: string;
  text: string;
  type: NodeKind;
  color: string;
  tags: string[];
  x: number;
  y: number;
  parentId?: string;
}

export interface GenerateResult {
  nodes: LaidNode[];
  engine: Engine;
  title: string;
  credits?: number;
}

/** Injectable engines — tests pass fakes and never touch the network. */
export interface GenerateDeps {
  authChat?: (messages: AIChatMessage[]) => Promise<{ response: string; credits?: number }>;
  guest?: (messages: AIChatMessage[]) => Promise<{ response: string; remaining?: number }>;
  puter?: (prompt: string) => Promise<string>;
  /** Milliseconds before a server engine is abandoned for the next one. */
  timeoutMs?: number;
}

/* ── Prompt building ───────────────────────────────────────────────────── */

export function buildDiagramPrompt(
  type: DiagramType,
  topic: string,
): { system: string; user: string } {
  const label = DIAGRAM_TYPES.find((d) => d.id === type)?.label ?? type;
  const system = [SYSTEM_PROMPT, TYPE_GUIDANCE[type]].join("\n");
  const user = `Diagram type: ${label}\nTopic:\n${(topic ?? "").trim().slice(0, 2000)}`;
  return { system, user };
}

/* ── Parsing / sanitizing ──────────────────────────────────────────────── */

function slug(value: string, fallback: string): string {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || fallback;
}

/**
 * Parse raw model output into a safe spec: strips fences/prose, enforces one
 * root, unique ids, resolvable parents, no cycles, cleaned labels/kinds/tags
 * and the node cap. Throws with a human-readable message on unusable output.
 */
export function parseDiagramJson(raw: string): DiagramSpec {
  const text = (raw ?? "").trim();
  if (!text) throw new Error("The AI returned nothing");

  // Fences first, then first-brace-to-last-brace in case prose wrapped it.
  const unfenced = text.replace(/```[a-zA-Z]*\n?/g, "").trim();
  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  const jsonText = start >= 0 && end > start ? unfenced.slice(start, end + 1) : unfenced;

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("The AI reply was not valid JSON — try again");
  }

  const obj = parsed as { title?: unknown; nodes?: unknown };
  if (!obj || typeof obj !== "object" || !Array.isArray(obj.nodes) || obj.nodes.length === 0) {
    throw new Error("The AI reply has no nodes array");
  }

  const rawNodes = obj.nodes.slice(0, MAX_NODES) as Array<Record<string, unknown>>;

  // Pass 1 — unique ids.
  const usedIds = new Set<string>();
  const ids: string[] = [];
  rawNodes.forEach((node, index) => {
    let id = slug(String(node.id ?? ""), `n${index + 1}`);
    let attempt = id;
    let counter = 2;
    while (usedIds.has(attempt)) {
      attempt = `${id}-${counter}`;
      counter += 1;
    }
    usedIds.add(attempt);
    ids.push(attempt);
  });

  // The studio treats the id "root" as special (undeletable, click target) —
  // only the real root may keep it.
  const parentRaw = rawNodes.map((node) => {
    const p = node.parent;
    return p === null || p === undefined ? null : String(p);
  });
  // Root = first node with an explicit null parent; if the model forgot one,
  // the first node stands in (its children then re-point at it below).
  let rootIndex = parentRaw.findIndex((p) => p === null);
  if (rootIndex < 0) rootIndex = 0;
  const rootId = ids[rootIndex];
  ids.forEach((id, i) => {
    if (id === "root" && i !== rootIndex) {
      const renamed = `node-${id}`;
      usedIds.delete(id);
      usedIds.add(renamed);
      ids[i] = renamed;
    }
  });

  // Pass 2 — parents must exist, not be self, and form no cycles.
  const parents: Array<string | null> = ids.map((_, i) => {
    if (i === rootIndex) return null;
    const p = parentRaw[i];
    if (!p || !usedIds.has(p) || ids[i] === p) return ids[rootIndex];
    return p;
  });
  // Cycle repair: walk ancestors; if we come back to the node, detach to root.
  parents.forEach((_, i) => {
    if (i === rootIndex) return;
    const seen = new Set<number>();
    let cursor: number | null = i;
    while (cursor !== null && cursor !== rootIndex) {
      if (seen.has(cursor)) {
        parents[i] = ids[rootIndex];
        break;
      }
      seen.add(cursor);
      const parentValue: string | null = parents[cursor];
      cursor = parentValue === null ? null : ids.indexOf(parentValue);
      if (cursor === -1) {
        parents[i] = ids[rootIndex];
        break;
      }
    }
  });

  const nodes: SpecNode[] = rawNodes.map((node, i) => {
    const label =
      typeof node.label === "string" && node.label.trim()
        ? node.label.trim().slice(0, 140)
        : "Idea";
    const kind = NODE_KINDS.includes(node.kind as NodeKind)
      ? (node.kind as NodeKind)
      : "concept";
    const tags = Array.isArray(node.tags)
      ? (node.tags as unknown[])
          .filter((t): t is string => typeof t === "string" && !!t.trim())
          .map((t) => t.trim().toLowerCase().slice(0, 24))
          .slice(0, 4)
      : [];
    return { id: ids[i], parent: parents[i], label, kind, tags };
  });

  if (nodes.length < 2) throw new Error("The diagram came back with fewer than 2 nodes");

  const title =
    typeof obj.title === "string" && obj.title.trim()
      ? obj.title.trim().slice(0, 80)
      : nodes[rootIndex].label;

  return { title, nodes };
}

/* ── Layouts ───────────────────────────────────────────────────────────── */

const DEPTH_COLORS = ["#8b5cf6", "#60a5fa", "#38bdf8", "#34d399", "#f59e0b", "#f472b6"];

interface TreeIndex {
  rootId: string;
  childrenOf: Map<string, string[]>;
  depth: Map<string, number>;
}

function buildTreeIndex(spec: DiagramSpec): TreeIndex {
  const root = spec.nodes.find((n) => n.parent === null) ?? spec.nodes[0];
  const childrenOf = new Map<string, string[]>();
  const depth = new Map<string, number>([[root.id, 0]]);
  for (const node of spec.nodes) {
    if (!node.parent || node.parent === node.id) continue;
    const bucket = childrenOf.get(node.parent);
    if (bucket) bucket.push(node.id);
    else childrenOf.set(node.parent, [node.id]);
  }
  // BFS depths (guards against any residual cycle: a node is visited once).
  const queue = [root.id];
  while (queue.length) {
    const id = queue.shift() as string;
    for (const child of childrenOf.get(id) ?? []) {
      if (depth.has(child)) continue;
      depth.set(child, (depth.get(id) ?? 0) + 1);
      queue.push(child);
    }
  }
  for (const node of spec.nodes) if (!depth.has(node.id)) depth.set(node.id, 1);
  return { rootId: root.id, childrenOf, depth };
}

/** Post-order leaf slots: parents center over their children (tidy tree). */
function tidySlots(index: TreeIndex, fromIds: string[]): { slot: Map<string, number>; width: number } {
  let counter = 0;
  const slot = new Map<string, number>();
  const seen = new Set<string>();
  const visit = (id: string): number => {
    if (seen.has(id)) return slot.get(id) ?? counter;
    seen.add(id);
    const kids = (index.childrenOf.get(id) ?? []).filter((k) => !seen.has(k));
    if (!kids.length) {
      const s = counter;
      counter += 1;
      slot.set(id, s);
      return s;
    }
    const childSlots = kids.map(visit);
    const s = (childSlots[0] + childSlots[childSlots.length - 1]) / 2;
    slot.set(id, s);
    return s;
  };
  fromIds.forEach(visit);
  return { slot, width: counter };
}

function defaultTags(node: SpecNode): string[] {
  if (node.tags.length) return node.tags;
  return node.label
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && w.length < 16)
    .slice(0, 3);
}

/**
 * Turn a sanitized spec into canvas coordinates for the chosen diagram type.
 * The root is always emitted as id "root" (the studio's special node).
 */
export function layoutDiagram(spec: DiagramSpec, type: DiagramType): LaidNode[] {
  const index = buildTreeIndex(spec);
  const rootSpecId = index.rootId;
  const remap = (id: string): string => (id === rootSpecId ? "root" : id);
  const emit = (id: string, x: number, y: number): LaidNode => {
    const node = spec.nodes.find((n) => n.id === id) as SpecNode;
    const isRoot = id === rootSpecId;
    // Children of the spec root must point at the emitted id "root" — only
    // the root node itself ships without a parent.
    const parentId = !isRoot && node.parent ? remap(node.parent) : undefined;
    return {
      id: remap(id),
      text: node.label,
      type: node.kind,
      color: DEPTH_COLORS[Math.min(index.depth.get(id) ?? 0, DEPTH_COLORS.length - 1)],
      tags: defaultTags(node),
      x: Math.round(x),
      y: Math.round(y),
      ...(parentId && parentId !== remap(id) ? { parentId } : {}),
    };
  };

  const rootChildren = index.childrenOf.get(rootSpecId) ?? [];
  const positions = new Map<string, { x: number; y: number }>();

  if (type === "tree" || type === "hierarchy") {
    const gapX = type === "hierarchy" ? 250 : 210;
    const gapY = type === "hierarchy" ? 165 : 135;
    const { slot, width } = tidySlots(index, [rootSpecId]);
    const center = (width - 1) / 2;
    for (const [id, s] of slot) {
      positions.set(id, {
        x: (s - center) * gapX,
        y: (index.depth.get(id) ?? 0) * gapY,
      });
    }
  } else if (type === "flowchart" || type === "timeline") {
    const gapX = type === "timeline" ? 240 : 270;
    const gapY = 115;
    const { slot, width } = tidySlots(index, [rootSpecId]);
    const center = (width - 1) / 2;
    for (const [id, s] of slot) {
      positions.set(id, {
        x: (index.depth.get(id) ?? 0) * gapX,
        y: (s - center) * gapY,
      });
    }
  } else if (type === "mindmap") {
    // Root at the origin; level-1 branches alternate right/left, and each
    // side grows outward with depth while siblings stack on the cross axis.
    positions.set(rootSpecId, { x: 0, y: 0 });
    const right = rootChildren.filter((_, i) => i % 2 === 0);
    const left = rootChildren.filter((_, i) => i % 2 === 1);
    const sides: Array<{ sign: number; roots: string[] }> = [
      { sign: 1, roots: right },
      { sign: -1, roots: left },
    ];
    for (const side of sides) {
      if (!side.roots.length) continue;
      const { slot, width } = tidySlots(index, side.roots);
      const center = (width - 1) / 2;
      for (const [id, s] of slot) {
        positions.set(id, {
          x: side.sign * (index.depth.get(id) ?? 0) * 245,
          y: (s - center) * 115,
        });
      }
    }
  } else {
    // sequence — actors as lanes under a title node.
    positions.set(rootSpecId, { x: 0, y: -180 });
    const hasGrandchildren = rootChildren.some(
      (a) => (index.childrenOf.get(a) ?? []).length > 0,
    );

    if (!hasGrandchildren && rootChildren.length > 1) {
      // Flat output (steps came back as root children): one ordered column.
      rootChildren.forEach((id, i) => {
        positions.set(id, { x: 0, y: -40 + i * 105 });
      });
    } else {
      rootChildren.forEach((actorId, lane) => {
        const x = (lane - (rootChildren.length - 1) / 2) * 300;
        positions.set(actorId, { x, y: -40 });
        // DFS order of everything beneath the actor → one vertical lane.
        let step = 0;
        const walk = (id: string) => {
          for (const child of index.childrenOf.get(id) ?? []) {
            positions.set(child, { x, y: 40 + step * 105 });
            step += 1;
            walk(child);
          }
        };
        walk(actorId);
      });
    }
  }

  // Safety: every node must end up with coordinates.
  const out: LaidNode[] = [];
  for (const node of spec.nodes) {
    const pos = positions.get(node.id) ?? { x: 0, y: 0 };
    out.push(emit(node.id, pos.x, pos.y));
  }
  return out;
}

/* ── Engine chain ──────────────────────────────────────────────────────── */

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out`)), ms),
    ),
  ]);
}

/**
 * Generate a laid-out diagram, trying each engine in order. `onEngine`
 * reports before every attempt so the UI can narrate the fallback chain.
 */
export async function generateDiagram(
  opts: { topic: string; type: DiagramType; onEngine?: (engine: Engine) => void },
  deps: GenerateDeps = {},
): Promise<GenerateResult> {
  const authChat = deps.authChat ?? chat;
  const guest = deps.guest ?? guestChat;
  const puter = deps.puter ?? chatWithPuter;
  const timeoutMs = deps.timeoutMs ?? 90_000;

  const topic = (opts.topic ?? "").trim();
  if (!topic) throw new Error("Type a topic first");

  const { system, user } = buildDiagramPrompt(opts.type, topic);
  const messages: AIChatMessage[] = [
    { role: "system", content: system },
    { role: "user", content: user },
  ];

  const attempts: Array<{ engine: Engine; run: () => Promise<{ raw: string; credits?: number }> }> = [
    {
      engine: "agnes",
      run: async () => {
        const res = await withTimeout(authChat(messages), timeoutMs, "Agnes");
        return { raw: res.response, credits: res.credits };
      },
    },
    {
      engine: "guest-pool",
      run: async () => {
        const res = await withTimeout(guest(messages), timeoutMs, "guest pool");
        return { raw: res.response };
      },
    },
    {
      engine: "puter",
      // Timed out as a whole: script load + optional sign-in popup + chat —
      // a declined/stuck puter sign-in must not leave the UI busy forever.
      run: async () => {
        const raw = await withTimeout(puter(`${system}\n\n${user}`), timeoutMs, "puter.js");
        return { raw };
      },
    },
  ];

  const failures: string[] = [];
  for (const attempt of attempts) {
    try {
      opts.onEngine?.(attempt.engine);
      const { raw, credits } = await attempt.run();
      const spec = parseDiagramJson(raw);
      const nodes = layoutDiagram(spec, opts.type);
      return { nodes, engine: attempt.engine, title: spec.title, credits };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${ENGINE_LABELS[attempt.engine]}: ${message}`);
    }
  }

  throw new Error(`All engines failed — ${failures.join(" · ")}`);
}
