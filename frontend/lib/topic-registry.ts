/**
 * topic-registry — the canonical topic layer: "write topics once, route by place".
 *
 * Every important topic in the platform gets exactly ONE canonical entry here,
 * carrying its *place* (class + subject + unit, all resolved against
 * lib/syllabus.ts) and its *need* (importance tier + payload location).
 * Duplicate/legacy slugs and legacy unit slugs are registered as aliases so
 * that old deep-links and manifest entries keep resolving to the one
 * canonical route instead of fragmenting into duplicateType: 1/2 variants.
 *
 * Consumers:
 *   - frontend/scripts/content/registry.ts  (validate + emit public/data JSON)
 *   - frontend routing / deep-linking code  (resolveTopicSlug, topicRoute)
 *
 * Content payload itself stays as JSON under content/ravikishan/...
 * This file only says *where a topic lives and how to reach it*.
 */

import { SYLLABUS } from "./syllabus";

export type ClassSlug = "class-11-notes" | "class-12-notes";
export type TopicImportance = "high-yield" | "core" | "reference";
export type TopicPayloadKind = "json" | "ts" | "db";

export type TopicEntry = {
  /** Canonical slug — exactly one entry per slug, globally unique. */
  slug: string;
  title: string;
  /** Syllabus class slug (must exist in lib/syllabus.ts). */
  classSlug: ClassSlug;
  /** Syllabus subject slug. */
  subjectSlug: string;
  /** Syllabus unit slug — the "place" the topic routes to. */
  unitSlug: string;
  /**
   * "high-yield" = exam-priority, "core" = must-know, "reference" = look-up.
   * Drives ordering / badge surfaces later; never invent new tiers.
   */
  importance: TopicImportance;
  /**
   * Legacy or duplicate slugs that must resolve to this entry
   * (e.g. `newton-law-gravitation` → `newton-s-law-of-gravitation`).
   */
  aliases?: string[];
  /**
   * Legacy unit slugs whose content should route to `unitSlug`
   * (e.g. manifest unit `work-energy-power` → syllabus unit
   * `work-energy-and-power`).
   */
  legacyUnits?: string[];
  /** Where the content payload lives. Default: "json" under content/ravikishan. */
  payload?: TopicPayloadKind;
  /** Free-form authoring note. */
  notes?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Seed registry — entries are verified against the manifest's real duplicate
// patterns. Expand this list as more topics get authored; one entry per
// important topic, aliases absorb the old duplicates.
// ─────────────────────────────────────────────────────────────────────────────
export const TOPIC_REGISTRY: TopicEntry[] = [
  // ── Physics, Class 11 ─────────────────────────────────────────────────────
  {
    slug: "mirror-formula",
    title: "Mirror Formula",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "reflection-at-curved-mirror",
    importance: "high-yield",
    aliases: ["01-mirror-formula", "02-mirror-formula"],
    notes: "Two manifest variants (duplicateType 1/2) collapse here.",
  },
  {
    slug: "total-internal-reflection",
    title: "Total Internal Reflection",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "refraction-at-plane-surfaces",
    importance: "high-yield",
  },
  {
    slug: "lateral-shift",
    title: "Lateral Shift",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "refraction-at-plane-surfaces",
    importance: "core",
  },
  {
    slug: "ideal-gas-equation",
    title: "Ideal Gas Equation",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "ideal-gas",
    importance: "high-yield",
  },
  {
    slug: "newton-s-law-of-gravitation",
    title: "Newton's Law of Gravitation",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "gravitation",
    importance: "high-yield",
    aliases: ["newton-law-gravitation"],
  },
  {
    slug: "coulomb-law",
    title: "Coulomb's Law and Force Between Multiple Charges",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "electric-charges",
    importance: "high-yield",
    aliases: ["coulomb-s-law-and-force-between-multiple-charges"],
  },
  {
    slug: "work-energy-theorem",
    title: "Work-Energy Theorem",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "work-energy-and-power",
    importance: "high-yield",
    legacyUnits: ["work-energy-power"],
    notes: "Manifest carries a legacy `work-energy-power` unit with the same topics.",
  },
  {
    slug: "quantity-of-heat",
    title: "Quantity of Heat",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "quantity-of-heat",
    importance: "core",
    legacyUnits: ["heat-and-temperature"],
    notes: "Duplicate copy lives under the heat-and-temperature unit in the manifest.",
  },
  {
    slug: "specific-heat-capacity",
    title: "Specific Heat Capacity",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "quantity-of-heat",
    importance: "core",
  },
  {
    slug: "stefan-boltzmann-law",
    title: "Stefan-Boltzmann Law",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "rate-of-heat-flow",
    importance: "high-yield",
  },

  // ── Other subjects, Class 11 ─────────────────────────────────────────────
  {
    slug: "cell-division",
    title: "Cell Division",
    classSlug: "class-11-notes",
    subjectSlug: "biology",
    unitSlug: "biomolecules-and-cell-biology",
    importance: "core",
  },
  {
    slug: "trigonometric-functions",
    title: "Trigonometric Functions",
    classSlug: "class-11-notes",
    subjectSlug: "mathematics",
    unitSlug: "trigonometry",
    importance: "high-yield",
  },

  // ── Class 12 (seeds — expand as Class 12 topics are authored) ───────────
  {
    slug: "electrochemical-cells",
    title: "Electrochemical Cells",
    classSlug: "class-12-notes",
    subjectSlug: "chemistry",
    unitSlug: "electro-chemistry",
    importance: "core",
    notes: "Class-12 seed entry; corpus directory lands when Class 12 content ships.",
  },
  {
    slug: "limits-and-continuity",
    title: "Limits and Continuity",
    classSlug: "class-12-notes",
    subjectSlug: "mathematics",
    unitSlug: "limits-and-continuity",
    importance: "high-yield",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Resolution + routing
// ─────────────────────────────────────────────────────────────────────────────
const bySlug = new Map<string, TopicEntry>(TOPIC_REGISTRY.map((e) => [e.slug, e]));

const aliasIndex = new Map<string, string>();
for (const entry of TOPIC_REGISTRY) {
  for (const alias of entry.aliases ?? []) aliasIndex.set(alias, entry.slug);
}

/** Legacy-unit slug → canonical unit slug, e.g. "work-energy-power" → "work-energy-and-power". */
export const LEGACY_UNIT_INDEX: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const entry of TOPIC_REGISTRY) {
    for (const legacy of entry.legacyUnits ?? []) out[legacy] = entry.unitSlug;
  }
  return out;
})();

/**
 * Resolve any slug/alias to its canonical slug.
 * Returns undefined when the slug is unknown (NOT an alias target).
 */
export function resolveTopicSlug(input: string): string | undefined {
  if (bySlug.has(input)) return input;
  return aliasIndex.get(input);
}

/** Resolve any slug/alias to its canonical TopicEntry. */
export function getTopic(input: string): TopicEntry | undefined {
  const canonical = resolveTopicSlug(input);
  return canonical ? bySlug.get(canonical) : undefined;
}

/**
 * Deep-link route for a topic's *place*. Mirrors note-routes.ts:
 * a topic with a resolvable syllabus unit always lands on its chapter page.
 *   /class-11-notes/physics/chapters/reflection-at-curved-mirror
 */
export function topicRoute(entry: TopicEntry): string {
  return `/${entry.classSlug}/${entry.subjectSlug}/chapters/${entry.unitSlug}`;
}

/**
 * Relative payload directory for a topic's content JSON files,
 * resolved from the repo root.
 */
export function topicPayloadDir(entry: TopicEntry): string {
  return [
    "content",
    "ravikishan",
    entry.classSlug,
    entry.subjectSlug,
    entry.unitSlug,
  ].join("/");
}

/**
 * Look up a syllabus unit by (class, subject, unit) slugs.
 * Returns undefined when the place does not exist in lib/syllabus.ts.
 */
export function findSyllabusUnit(
  classSlug: ClassSlug,
  subjectSlug: string,
  unitSlug: string,
):
  | {
      classDef: (typeof SYLLABUS)[number];
      subject: { slug: string; name: string; units: { id: string; title: string }[] };
      unit: { id: string; title: string };
    }
  | undefined {
  const classDef = SYLLABUS.find((c) => c.slug === classSlug);
  if (!classDef) return undefined;
  const subject = classDef.subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return undefined;
  const unit = subject.units.find((u) => u.id === unitSlug);
  if (!unit) return undefined;
  return {
    classDef,
    subject: { slug: subject.slug, name: subject.name, units: subject.units.map((u) => ({ id: u.id, title: u.title })) },
    unit: { id: unit.id, title: unit.title },
  };
}

export type RegistryIndexTopic = {
  slug: string;
  title: string;
  class: ClassSlug;
  subject: string;
  unit: string;
  importance: TopicImportance;
  route: string;
  payloadDir: string;
  aliases: string[];
  legacyUnits: string[];
};

/**
 * Flat, serializable index of the registry. This is the shape emitted to
 * frontend/public/data/topic-registry.json by scripts/content/registry.ts.
 */
export function buildRegistryIndex(): {
  version: 1;
  topics: RegistryIndexTopic[];
  aliasMap: Record<string, string>;
  legacyUnitMap: Record<string, string>;
} {
  return {
    version: 1,
    topics: TOPIC_REGISTRY.map((e) => ({
      slug: e.slug,
      title: e.title,
      class: e.classSlug,
      subject: e.subjectSlug,
      unit: e.unitSlug,
      importance: e.importance,
      route: topicRoute(e),
      payloadDir: topicPayloadDir(e),
      aliases: e.aliases ?? [],
      legacyUnits: e.legacyUnits ?? [],
    })),
    aliasMap: Object.fromEntries(aliasIndex),
    legacyUnitMap: LEGACY_UNIT_INDEX,
  };
}
