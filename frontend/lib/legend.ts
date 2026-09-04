/**
 * Legend & Key Facts — Comprehensive Index
 *
 * Builds a complete legend index from:
 *   1. Syllabus structure (authoritative unit/topic ordering)
 *   2. ALL concept JSON files under content/ravikishan/
 *   3. Extracted key facts, formulas, and confusions from notes
 *
 * The `universalFacts` field in JSONs is often generic filler.
 * Real content lives in the `notes` array — we extract formulas,
 * definitions, and key points from there.
 */

import { SYLLABUS } from "@/lib/syllabus";
import type { SyllabusUnit, SubjectSyllabus } from "@/lib/syllabus";

// Server-only fs imports — dynamically loaded to avoid client-side crash
async function getFs() {
  const mod = await import("node:fs/promises");
  const { join } = await import("node:path");
  return { ...mod, join };
}

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface LegendFact {
  type: "fact" | "formula" | "definition" | "tip" | "confusion" | "clarification";
  content: string;
}

export interface LegendTopic {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  /** Syllabus topic description (if available) */
  syllabusTopic?: string;
  topicSlug: string;
  topicTitle: string;
  /** Relevance score from JSON (0–100) */
  relevance: number;
  /** All parsed notes from the concept JSON */
  notes: string[];
  /** Extracted key facts (from notes + universalFacts) */
  facts: LegendFact[];
  /** Common confusions with clarifications */
  confusions: { misconception: string; clarification: string }[];
  /** Practice problems */
  practice: string[];
  /** The JSON file path relative to project root */
  filePath: string;
  /** 3D animation tag from JSON */
  animation3D?: string;
  /** Count of total content items */
  contentCount: number;
  /** First note preview (stripped of HTML) */
  preview?: string;
}

/** Alias for LegendTopic used in filtering/grouping contexts */
export type LegendEntry = LegendTopic;

export interface LegendSubject {
  classSlug: string;
  subjectSlug: string;
  subjectName: string;
  description: string;
  units: LegendUnit[];
  totalTopics: number;
  totalFacts: number;
  /** Icon emoji for visual display */
  icon: string;
  /** Color theme */
  color: string;
  gradient: string;
  border: string;
}

export interface LegendUnit {
  unitId: string;
  unitTitle: string;
  hours?: number;
  /** Syllabus topics for this unit */
  syllabusTopics: string[];
  topics: LegendTopic[];
}

// ─────────────────────────────────────────────────────────────
// Subject metadata (visuals + colors)
// ─────────────────────────────────────────────────────────────

const SUBJECT_META: Record<
  string,
  { icon: string; color: string; gradient: string; border: string; name: string; description: string }
> = {
  mathematics: {
    icon: "🔢",
    color: "text-violet-500",
    gradient: "from-violet-500/15 to-purple-500/15",
    border: "border-violet-300 dark:border-violet-700",
    name: "Mathematics",
    description: "Algebra, Calculus, Trigonometry, Vectors, Statistics & Analytical Geometry",
  },
  physics: {
    icon: "⚡",
    color: "text-sky-500",
    gradient: "from-sky-500/15 to-blue-500/15",
    border: "border-sky-300 dark:border-sky-700",
    name: "Physics",
    description: "Mechanics, Thermodynamics, Optics, Electricity, Modern Physics",
  },
  chemistry: {
    icon: "🧪",
    color: "text-amber-500",
    gradient: "from-amber-500/15 to-orange-500/15",
    border: "border-amber-300 dark:border-amber-700",
    name: "Chemistry",
    description: "Physical, Organic & Inorganic Chemistry",
  },
  biology: {
    icon: "🌿",
    color: "text-emerald-500",
    gradient: "from-emerald-500/15 to-teal-500/15",
    border: "border-emerald-300 dark:border-emerald-700",
    name: "Biology",
    description: "Botany, Zoology, Ecology & Biotechnology",
  },
  english: {
    icon: "📖",
    color: "text-blue-500",
    gradient: "from-blue-500/15 to-cyan-500/15",
    border: "border-blue-300 dark:border-blue-700",
    name: "English",
    description: "Reading, Writing, Grammar & Literature",
  },
  nepali: {
    icon: "🇳🇵",
    color: "text-red-500",
    gradient: "from-red-500/15 to-rose-500/15",
    border: "border-red-300 dark:border-red-700",
    name: "Nepali",
    description: "Grammar, Literature & Composition",
  },
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function slugifyFileName(name: string): string {
  return name
    .replace(/\.json$/, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Extract meaningful facts from a notes array */
function extractFacts(notes: string[]): LegendFact[] {
  const facts: LegendFact[] = [];
  for (const note of notes) {
    const trimmed = note.trim();
    if (!trimmed) continue;

    // Detect formulas (lines containing math patterns)
    if (/\\\[|\\\(|\\left|\\right|\\frac|\\lim|\\int|\\sum|\\prod|\\sqrt|\\hat|\\vec|\\mathbf|\\textbf|\\mathrm/.test(trimmed)) {
      facts.push({ type: "formula", content: trimmed });
      continue;
    }

    // Detect definitions (starts with bold term or "is" / "are" patterns)
    if (/^\*\*[A-Z][^\*]+\*\*:\s/.test(trimmed) || /^\*\*[\w\s]+\*\*\s+(is|are|refers|means)\s/i.test(trimmed)) {
      facts.push({ type: "definition", content: trimmed });
      continue;
    }

    // Detect bullet-point facts
    if (/^•|^[•\-\*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      facts.push({ type: "fact", content: trimmed });
      continue;
    }

    // Detect HTML heading facts
    if (/^<(h[1-4]|p)[^>]*>/.test(trimmed)) {
      facts.push({ type: "fact", content: trimmed });
      continue;
    }

    // Regular sentences that are substantial
    if (trimmed.length > 30 && !trimmed.includes("<h") && !trimmed.includes("</")) {
      facts.push({ type: "fact", content: trimmed });
    }
  }
  return facts;
}

/** Extract confusions from notes and confusion field */
function extractConfusions(
  notes: string[],
  confusionField: string[] | undefined,
  topicTitle: string,
): { misconception: string; clarification: string }[] {
  const items: { misconception: string; clarification: string }[] = [];

  // Parse confusion field — each item should have a clear misconception and clarification
  if (Array.isArray(confusionField)) {
    for (const item of confusionField) {
      // Try to split on " — " or ": " to find misconception vs clarification
      const parts = item.split(/(?:\s+—\s+)|(?:\s*:\s*)/);
      if (parts.length >= 2) {
        items.push({
          misconception: parts[0].trim(),
          clarification: parts.slice(1).join(" — ").trim(),
        });
      } else {
        // Single sentence — treat as clarification, infer misconception
        items.push({
          misconception: `Confusion about ${topicTitle}`,
          clarification: item,
        });
      }
    }
  }

  // Also extract potential confusions from notes (look for "Do not", "Remember", "Note", "Important")
  for (const note of notes) {
    const trimmed = note.trim();
    if (/^(Do not|Remember|Note:|Important:|Caution:|Warning:)/i.test(trimmed)) {
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx > 0) {
        const prefix = trimmed.slice(0, colonIdx + 1);
        const rest = trimmed.slice(colonIdx + 1).trim();
        if (rest.length > 10) {
          items.push({
            misconception: `${prefix} (common mistake)`,
            clarification: rest,
          });
        }
      }
    }
  }

  return items;
}

/** Find syllabus topic that best matches a concept file */
function findSyllabusTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): string | undefined {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return undefined;
  const subj = cls.subjects.find((s) => s.slug === subjectSlug);
  if (!subj) return undefined;
  const unit = subj.units.find((u) => u.id === unitId);
  if (!unit) return undefined;

  // Try to match topic slug to syllabus topics
  const slugLower = topicSlug.toLowerCase().replace(/-/g, " ");
  for (const t of unit.topics) {
    if (t.toLowerCase().includes(slugLower.slice(0, 20))) return t;
  }
  // Fallback: return first topic of unit
  return unit.topics[0];
}

/** Find all topics in a unit from syllabus */
function getSyllabusUnit(classSlug: string, subjectSlug: string, unitId: string): SyllabusUnit | undefined {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return undefined;
  const subj = cls.subjects.find((s) => s.slug === subjectSlug);
  if (!subj) return undefined;
  return subj.units.find((u) => u.id === unitId);
}

/** Find subject syllabus info */
function getSubjectInfo(classSlug: string, subjectSlug: string): SubjectSyllabus | undefined {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return undefined;
  return cls.subjects.find((s) => s.slug === subjectSlug);
}

// ─────────────────────────────────────────────────────────────
// Core scanner
// ─────────────────────────────────────────────────────────────

async function scanSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<LegendTopic[]> {
  const { join, readdir, readFile } = await getFs();
  const baseDir = join(process.cwd(), "content", "ravikishan", classSlug, subjectSlug);
  const topics: LegendTopic[] = [];

  try {
    const unitDirs = await readdir(baseDir, { withFileTypes: true });
    for (const unitDir of unitDirs) {
      if (!unitDir.isDirectory() || unitDir.name.startsWith(".")) continue;
      const unitId = unitDir.name;
      const unitInfo = getSyllabusUnit(classSlug, subjectSlug, unitId);
      const unitTitle = unitInfo?.title ?? unitId;

      const conceptsDir = join(baseDir, unitId, "concepts");
      try {
        const files = await readdir(conceptsDir, { withFileTypes: true });
        for (const file of files) {
          if (!file.name.endsWith(".json")) continue;
          const filePath = join("content", "ravikishan", classSlug, subjectSlug, unitId, "concepts", file.name);
          const raw = await readFile(filePath, "utf-8");
          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(raw);
          } catch {
            continue;
          }

          const topicSlug = slugifyFileName(file.name);
          const topicTitle = (parsed.topicTitle as string) ?? file.name.replace(/\.json$/, "");
          const title = (parsed.title as string) ?? topicTitle;
          const relevance = (parsed.relevance as number) ?? 50;
          const notes = (parsed.notes as string[] | undefined) ?? [];
          const confusionField = (parsed.confusion as string[] | undefined) ?? [];
          const practice = (parsed.practice as string[] | undefined) ?? [];
          const universalFacts = (parsed.universalFacts as string[] | undefined) ?? [];
          const animation3D = (parsed.animation3D as string | undefined);

          // Extract facts from notes + universalFacts
          const extractedFacts = extractFacts(notes);
          const extraFacts: LegendFact[] = universalFacts.map((f) => ({ type: "fact", content: f }));
          const allFacts = [...extractedFacts, ...extraFacts];

          // Deduplicate
          const seen = new Set<string>();
          const uniqueFacts: LegendFact[] = [];
          for (const f of allFacts) {
            const key = f.content.slice(0, 60);
            if (!seen.has(key)) {
              seen.add(key);
              uniqueFacts.push(f);
            }
          }

          // Extract confusions
          const confusions = extractConfusions(notes, confusionField, topicTitle);

          // Count content items
          const contentCount = uniqueFacts.length + confusions.length + practice.length;

          topics.push({
            classSlug,
            subjectSlug,
            unitId,
            unitTitle,
            syllabusTopic: findSyllabusTopic(classSlug, subjectSlug, unitId, topicSlug),
            topicSlug,
            topicTitle,
            relevance,
            notes,
            facts: uniqueFacts,
            confusions,
            practice,
            filePath,
            animation3D,
            contentCount,
          });
        }
      } catch {
        // No concepts/ dir — skip
      }
    }
  } catch {
    // Directory doesn't exist — skip
  }

  return topics;
}

// ─────────────────────────────────────────────────────────────
// Index builders
// ─────────────────────────────────────────────────────────────

/**
 * Build the full legend index — scans all subjects, all classes.
 * Returns LegendSubject[] organized for display.
 */
export async function getLegendIndex(): Promise<LegendSubject[]> {
  const allTopics: LegendTopic[] = [];

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      const entries = await scanSubject(cls.slug, subject.slug);
      allTopics.push(...entries);
    }
  }

  // Group by class → subject
  const subjectMap = new Map<string, LegendTopic[]>();
  for (const t of allTopics) {
    const key = `${t.classSlug}/${t.subjectSlug}`;
    const arr = subjectMap.get(key) ?? [];
    arr.push(t);
    subjectMap.set(key, arr);
  }

  // Build LegendSubject[]
  const subjects: LegendSubject[] = [];
  for (const cls of SYLLABUS) {
    for (const subj of cls.subjects) {
      const key = `${cls.slug}/${subj.slug}`;
      const topics = subjectMap.get(key) ?? [];
      if (topics.length === 0) continue; // skip if no content

      const meta = SUBJECT_META[subj.slug] ?? {
        icon: "📚",
        color: "text-muted-foreground",
        gradient: "from-gray-500/15 to-gray-400/15",
        border: "border-border",
        name: subj.name ?? subj.slug,
        description: subj.description ?? "",
      };

      // Group topics by unit
      const unitMap = new Map<string, LegendTopic[]>();
      for (const t of topics) {
        const arr = unitMap.get(t.unitId) ?? [];
        arr.push(t);
        unitMap.set(t.unitId, arr);
      }

      const units: LegendUnit[] = [];
      for (const [unitId, unitTopics] of unitMap) {
        const unitInfo = getSyllabusUnit(cls.slug, subj.slug, unitId);
        units.push({
          unitId,
          unitTitle: unitInfo?.title ?? unitId,
          hours: unitInfo?.hours,
          syllabusTopics: unitInfo?.topics ?? [],
          topics: unitTopics.sort((a, b) => b.relevance - a.relevance),
        });
      }

      // Sort units by syllabus order
      units.sort((a, b) => {
        const subjData = getSubjectInfo(cls.slug, subj.slug);
        const ua = subjData?.units.findIndex((u) => u.id === a.unitId) ?? -1;
        const ub = subjData?.units.findIndex((u) => u.id === b.unitId) ?? -1;
        return ua - ub;
      });

      const totalFacts = topics.reduce((s, t) => s + t.facts.length, 0);
      const totalConfusions = topics.reduce((s, t) => s + t.confusions.length, 0);

      subjects.push({
        classSlug: cls.slug,
        subjectSlug: subj.slug,
        subjectName: subj.name ?? subj.slug,
        description: meta.name !== subj.slug ? subj.description : meta.description,
        units,
        totalTopics: topics.length,
        totalFacts: totalFacts + totalConfusions,
        icon: meta.icon,
        color: meta.color,
        gradient: meta.gradient,
        border: meta.border,
      });
    }
  }

  // Sort subjects by syllabus order
  subjects.sort((a, b) => {
    const clsA = SYLLABUS.findIndex((c) => c.slug === a.classSlug);
    const clsB = SYLLABUS.findIndex((c) => c.slug === b.classSlug);
    if (clsA !== clsB) return clsA - clsB;
    const subjA = SYLLABUS[clsA]?.subjects.findIndex((s) => s.slug === a.subjectSlug) ?? -1;
    const subjB = SYLLABUS[clsB]?.subjects.findIndex((s) => s.slug === b.subjectSlug) ?? -1;
    return subjA - subjB;
  });

  return subjects;
}

/**
 * Get a single subject's legend data.
 */
export async function getSubjectLegend(
  classSlug: string,
  subjectSlug: string,
): Promise<LegendSubject | undefined> {
  const all = await getLegendIndex();
  return all.find((s) => s.classSlug === classSlug && s.subjectSlug === subjectSlug);
}

/**
 * Get a single topic's legend data.
 */
export async function getTopicLegend(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): Promise<LegendTopic | undefined> {
  const all = await getLegendIndex();
  for (const subj of all) {
    for (const unit of subj.units) {
      const topic = unit.topics.find((t) => t.unitId === unitId && t.topicSlug === topicSlug);
      if (topic) return topic;
    }
  }
  return undefined;
}

/**
 * Filter legends by search query and optional subject filter.
 */
export function filterLegends(
  subjects: LegendSubject[],
  query: string,
  subjectSlug?: string,
): LegendEntry[] {
  const q = query.toLowerCase().trim();
  const results: LegendEntry[] = [];
  for (const subj of subjects) {
    if (subjectSlug && subj.subjectSlug !== subjectSlug) continue;
    for (const unit of subj.units) {
      for (const topic of unit.topics) {
        const matches =
          !q ||
          topic.topicSlug.toLowerCase().includes(q) ||
          topic.topicTitle.toLowerCase().includes(q) ||
          ((topic.syllabusTopic?.toLowerCase().includes(q)) ?? false);
        if (matches) results.push(topic);
      }
    }
  }
  return results;
}

/**
 * Group filtered legends by unit.
 */
export function groupLegendsByUnit(legends: LegendEntry[]): Map<string, LegendEntry[]> {
  const map = new Map<string, LegendEntry[]>();
  for (const entry of legends) {
    const key = entry.unitId;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }
  return map;
}
