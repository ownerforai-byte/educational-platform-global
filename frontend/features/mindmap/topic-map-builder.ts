import {
  buildDocConceptMap,
  type DocConceptMap,
  type MindMapInput,
} from "@/features/docs/doc-mindmap";
import type { MindmapNode } from "./types";

/**
 * Deep topic mind map builder.
 *
 * Every syllabus topic gets the same systematic, multi-level skeleton
 * (scope → concept → sub-concept → point) so a learner can fold and unfold the
 * map level by level instead of facing one flat list. Content is never
 * invented: each branch is fed from a field the topic already ships
 * (`notes`, `importantConcepts`, `keyPoints`, `formulas`, `examples`,
 * `examShortTricks`, `confusion`, `practiceQuestions`, …) through
 * `buildDocConceptMap`, plus the note headings themselves.
 */

export interface TopicMapInput extends MindMapInput {
  topicSlug?: string;
  /** Parent unit title — shown as the map's first context branch. */
  unitTitle?: string;
  /** Every topic in the unit, so a map can show where it sits. */
  unitTopics?: string[];
}

/** Guard rails: a map stays navigable even for the densest topic. */
export const TOPIC_MAP_LIMITS = {
  branches: 16,
  children: 14,
  depth: 4,
} as const;

type Draft = { label: string; children: Draft[] };

const MAX_LABEL = 96;

function cleanText(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shorten(text: string, max = MAX_LABEL): string {
  const clean = cleanText(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** `**Term:** body` → a term node with the body as its child. */
function splitLead(text: string): { term: string; body: string } | null {
  const match = text.match(/^\s*\*\*(.+?)\*\*\s*[:：]\s*([\s\S]*)$/);
  if (!match) return null;
  const term = cleanText(match[1]).replace(/[:：]\s*$/, "");
  const body = match[2].replace(/\s+/g, " ").trim();
  if (!term) return null;
  return { term: shorten(term, 60), body: body ? shorten(body) : "" };
}

/** First line of a multi-line item, so derivations keep their shape. */
function firstLine(text: string): string {
  const line = text.split("\n").map((l) => l.trim()).find(Boolean);
  return line ? cleanText(line) : "";
}

function remainingLines(text: string): string[] {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^\s*[-•]\s*/, "").trim())
    .filter(Boolean);
  return lines.slice(1, 4).map((l) => shorten(l, 80));
}

/** Split a NEB topic title into its syllabus parts. */
export function splitTopicTitle(title: string): string[] {
  const cleaned = cleanText(title);
  if (!cleaned) return [];

  const afterColon = cleaned.includes(":")
    ? cleaned.slice(cleaned.indexOf(":") + 1).trim()
    : cleaned;

  const listMatch = afterColon.match(
    /(?:introduction and functions of|functions of|types of|concept of|including|such as)\s+(.+)$/i,
  );
  const listPart = listMatch?.[1] ?? afterColon;

  const parts = listPart
    .split(/,| and |;|\/|·|\|/)
    .map((p) => p.replace(/^(and|of|the|a|an)\s+/i, "").trim())
    .filter((p) => p.length > 2 && p.length < 80);

  const unique = [...new Set(parts)];
  if (unique.length >= 2) return unique.slice(0, 12);

  if (cleaned.includes(":")) {
    const head = cleaned.slice(0, cleaned.indexOf(":")).trim();
    return [head, afterColon].filter(Boolean).slice(0, 8);
  }

  return [cleaned];
}

/** One content line → one branch-able node (never a bare paragraph). */
function itemToDraft(item: string): Draft | null {
  const lead = splitLead(item);
  if (lead) {
    const children: Draft[] = [];
    if (lead.body) children.push({ label: lead.body, children: [] });
    for (const extra of remainingLines(item)) {
      children.push({ label: extra, children: [] });
    }
    return { label: lead.term, children };
  }

  const head = firstLine(item);
  if (!head) return null;
  const extra = remainingLines(item);
  return {
    label: shorten(head),
    children: extra.map((label) => ({ label, children: [] })),
  };
}

/**
 * Group details under their own lead term so a branch with ten points becomes
 * five sub-branches instead of one long column.
 */
function groupDetails(details: string[] | undefined): Draft[] {
  if (!details || details.length === 0) return [];

  const groups: Draft[] = [];
  const index = new Map<string, Draft>();

  for (const detail of details) {
    const node = itemToDraft(detail);
    if (!node) continue;

    const lead = splitLead(detail);
    if (lead && node.children.length > 0) {
      const existing = index.get(lead.term.toLowerCase());
      if (existing) {
        existing.children.push(...node.children);
        continue;
      }
      index.set(lead.term.toLowerCase(), node);
      groups.push(node);
      continue;
    }

    groups.push(node);
    if (groups.length >= TOPIC_MAP_LIMITS.children) break;
  }

  return groups;
}

const NOTE_THEMES: Array<{ label: string; test: RegExp }> = [
  { label: "Definition & meaning", test: /definition|meaning|introduction|concept|meaning of/i },
  { label: "Derivation", test: /deriv|deduct|proof|prove/i },
  { label: "Conditions & assumptions", test: /condition|assumption|when |if the|provided that/i },
  { label: "Special cases & limits", test: /special case|limitation|exception|disadvantage|drawback/i },
  { label: "Applications & uses", test: /application|uses|used in|significance|importance/i },
  { label: "Worked examples", test: /example|numerical|problem|solved/i },
  { label: "Exam pointers", test: /exam|board question|neet|entrance/i },
];

/** Group note items by the heading theme they carry. */
function noteThemeBranches(notes: string[] | undefined): Array<{ label: string; details: string[] }> {
  if (!notes || notes.length === 0) return [];
  const buckets = new Map<string, string[]>();

  for (const note of notes) {
    const point = firstLine(note);
    if (!point) continue;
    const heading = note.match(/^\s*\*\*(.+?)\*\*/)?.[1] ?? "";
    const theme =
      NOTE_THEMES.find((t) => t.test.test(heading) || t.test.test(point))?.label ?? null;
    const key = theme ?? "More detail";
    const arr = buckets.get(key) ?? [];
    if (arr.length < 6) arr.push(point);
    buckets.set(key, arr);
  }

  return [...buckets.entries()]
    .filter(([, details]) => details.length > 0)
    .map(([label, details]) => ({ label, details }));
}

function docBranchToDraft(branch: DocConceptMap["branches"][number]): Draft | null {
  const children: Draft[] = [];

  for (const sub of branch.subtopics ?? []) {
    children.push({
      label: shorten(sub.name, 60),
      children: (sub.points ?? []).slice(0, 5).map((point) => ({ label: shorten(point, 80), children: [] })),
    });
  }

  const grouped = groupDetails(branch.details);
  const limit = branch.subtopics?.length ? 4 : TOPIC_MAP_LIMITS.children;
  for (const node of grouped) {
    if (children.length >= limit) break;
    children.push(node);
  }

  if (children.length === 0) return null;
  return { label: branch.topic, children };
}

function prune(node: Draft, depth: number): Draft | null {
  if (depth > TOPIC_MAP_LIMITS.depth) return null;
  const children = node.children
    .map((child) => prune(child, depth + 1))
    .filter((child): child is Draft => child !== null)
    .slice(0, TOPIC_MAP_LIMITS.children);
  if (!node.label.trim()) return children.length > 0 ? { label: "Detail", children } : null;
  return children.length > 0 ? { label: node.label, children } : { label: node.label, children: [] };
}

function toNode(draft: Draft, path: string): MindmapNode {
  const slug = draft.label.slice(0, 22).replace(/\s+/g, "-").toLowerCase();
  const id = `${path}-${slug}`;
  const children = draft.children.map((child, i) => toNode(child, `${id}.${i}`));
  return children.length > 0 ? { id, label: draft.label, children } : { id, label: draft.label };
}

/**
 * Build the deep, expandable topic mind map.
 *
 * Branch order is fixed so every topic reads the same way:
 *   Syllabus scope → Unit context → the content branches (core ideas, key
 *   points, formulas, …) → note-heading themes that are not already covered.
 */
export function buildTopicMindmap(input: TopicMapInput): MindmapNode {
  const topicTitle = cleanText(input.topicTitle ?? "");
  const map = buildDocConceptMap(input);

  const root: Draft = {
    label: shorten(map.centralConcept || topicTitle || "Topic overview", 64),
    children: [],
  };

  const covered = new Set<string>();
  const addBranch = (label: string, children: Draft[]) => {
    if (root.children.length >= TOPIC_MAP_LIMITS.branches) return;
    if (covered.has(label.toLowerCase()) || children.length === 0) return;
    covered.add(label.toLowerCase());
    root.children.push({ label, children });
  };

  const scope = splitTopicTitle(topicTitle);
  if (scope.length > 0) {
    addBranch(
      "Syllabus scope",
      scope.map((part) => ({
        label: shorten(part, 70),
        children: [],
      })),
    );
  }

  if (input.unitTopics && input.unitTopics.length > 1) {
    const siblings = input.unitTopics
      .map((t) => cleanText(t))
      .filter((t) => t && t.toLowerCase() !== topicTitle.toLowerCase())
      .slice(0, 12);
    if (siblings.length > 0) {
      addBranch(
        input.unitTitle ? `${input.unitTitle} · other topics` : "Other topics in this unit",
        siblings.map((sibling) => ({
          label: shorten(sibling, 70),
          children: splitTopicTitle(sibling)
            .slice(0, 4)
            .map((part) => ({ label: shorten(part, 60), children: [] })),
        })),
      );
    }
  }

  for (const branch of map.branches) {
    const draft = docBranchToDraft(branch);
    if (draft) addBranch(draft.label, draft.children);
  }

  const coveredNames = new Set(root.children.map((c) => c.label.toLowerCase()));
  for (const theme of noteThemeBranches(input.notes)) {
    if (coveredNames.has(theme.label.toLowerCase())) continue;
    addBranch(theme.label, groupDetails(theme.details));
  }

  // A map is never a dead end: a content-less topic still opens as a foldable
  // outline instead of one unclickable box.
  if (root.children.length === 0) {
    root.children.push({
      label: "Overview",
      children: [{ label: shorten(topicTitle || "Topic overview", 80), children: [] }],
    });
  }

  return toNode(prune(root, 0) ?? { label: topicTitle || "Topic overview", children: [] }, "t");
}

/** Unit-level map: unit → topics → their syllabus branches. */
export function buildUnitMindmap(
  unitTitle: string,
  topics: Array<{ title: string; slug: string }>,
): MindmapNode {
  return {
    id: `unit-${topics.length}-${unitTitle.slice(0, 16).replace(/\s+/g, "-").toLowerCase()}`,
    label: shorten(unitTitle, 64),
    children: topics.slice(0, 40).map((topic, index) => {
      const branches = splitTopicTitle(topic.title)
        .slice(0, 8)
        .map((label, i) => ({
          id: `ut-${index}-${i}-${label.slice(0, 18).replace(/\s+/g, "-").toLowerCase()}`,
          label: shorten(label, 60),
        }));
      return {
        id: `ut-${index}-${topic.slug}`,
        label: shorten(topic.title, 72),
        children: branches.length > 0 ? branches : undefined,
      } as MindmapNode;
    }),
  };
}