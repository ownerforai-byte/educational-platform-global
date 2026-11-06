/**
 * 3D Activity Manifest — the single typed source of truth for lab activities.
 *
 * Roadmap: plan.md § "One 3D System for All Subjects" — Phases 2–6.
 *
 * This module is DATA ONLY. It must never import a Three.js visual, a React
 * component, or anything that pulls CSS: the manifest is read by the hub, by
 * topic notes (to decide whether to offer "See it in 3D"), and by Node scripts
 * and tests that cannot load WebGL modules. Renderers are resolved lazily
 * through `lab-activity-loaders.ts`, keyed by a renderer reference.
 *
 * The manifest has two layers:
 *   1. `PILOT_ACTIVITIES` — hand-curated entries with an explicit, reviewed
 *      curriculum placement (plan.md Phase 5 pilots).
 *   2. Activities derived from the three live sources, normalised into the same
 *      shape: `LAB_VISUAL_INDEX` (topic visuals), `LAB_METADATA_LIST` (lab
 *      registry metadata) and `LABS` (the NEB practical catalog).
 *
 * Curated pilots win: a derived activity whose topic slug or canonical slug is
 * already claimed by a pilot is dropped, so there is exactly one manifest entry
 * per activity and per topic.
 *
 * Rules enforced by `tests/lib/lab-manifest.test.ts` and
 * `scripts/lab-manifest-coverage.ts`:
 *   - `topicSlugs` are exact syllabus slugs; aliases are declared, never fuzzy
 *   - `classSlug`/`subject`/`unitId` agree with the syllabus for each topic
 *   - every renderer reference resolves to an existing file / registry id
 *   - ids and canonical slugs are unique; every activity defines a fallback
 *   - the canonical deep link is `/lab/<slug>` (owner decision, 2026-11-06)
 */

import { LABS } from "@/lib/lab-catalog";
import { LAB_METADATA_LIST } from "@/lib/lab-metadata";
import {
  LAB_VISUAL_INDEX,
  type LabVisualIndexEntry,
} from "@/lib/lab-visual-index";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/syllabus";

/** What the learner does with the activity. */
export type ActivityKind = "3d-sim" | "animation" | "theory" | "practical";

/** Lifecycle gate: only `live` and `pilot` are offered in the hub. */
export type ActivityLifecycle = "live" | "pilot" | "retired";

/** Subjects in the shared manifest. Mathematics is intentionally included. */
export type ActivitySubject = "physics" | "chemistry" | "biology" | "mathematics";

/** Capability tier used by `3d-rig/use-scene-tier.ts` to pick a renderer. */
export type DeviceTier = "high" | "mid" | "low";

/** 2D/static/text fallback shown when WebGL is unavailable or declined. */
export type ActivityFallback = {
  kind: "2d-diagram" | "static-image" | "text";
  /** One sentence describing what the learner sees instead of the canvas. */
  summary: string;
};

/** Explicit curriculum placement, verified against `lib/syllabus.ts`. */
export type ActivityCurriculum = {
  classSlug: string;
  subject: ActivitySubject;
  unitId: string;
};

/** Renderer module path, resolved by `loadActivityRenderer`. */
export type ActivityModulePath =
  | "@/components/lab/topic-visuals/projectile-motion-3d"
  | "@/components/lab/topic-visuals/chemical-bond-covalent-3d"
  | "@/components/lab/topic-visuals/cell-biology";

/** How to obtain the renderer for an activity. */
export type ActivityRendererRef =
  /** A journey-owned visual module with a lazy loader branch. */
  | { kind: "module"; modulePath: ActivityModulePath }
  /** A topic visual from the generated index (`lab-visual-loaders.tsx`). */
  | { kind: "visual"; entry: LabVisualIndexEntry }
  /** A lab from `lab-registry.tsx` (loaded lazily, never eagerly). */
  | { kind: "registry"; labId: string }
  /**
   * A NEB practical from `lab-catalog.ts`. These are written labs (apparatus,
   * procedure, observations, result) with no WebGL scene, so their renderer is
   * the catalog sheet itself — a real surface, not a placeholder canvas.
   */
  | { kind: "catalog"; entryId: string };

export type LabActivity = {
  /** Manifest id; internal, namespaced by source. */
  id: string;
  /** Canonical deep-link segment: `/lab/<slug>`. Unique across the manifest. */
  slug: string;
  title: string;
  kind: ActivityKind;
  lifecycle: ActivityLifecycle;
  curriculum: ActivityCurriculum;
  /**
   * Exact syllabus topic slugs this activity teaches. Only explicit matches —
   * the manifest never resolves a topic by prefix or fuzzy similarity.
   */
  topicSlugs: string[];
  /** Declared legacy keys (unit-level topic-map keys, prior ids). */
  aliases?: string[];
  deviceTier: DeviceTier;
  fallback: ActivityFallback;
  renderer: ActivityRendererRef;
  relatedNotesHref: string;
  practiceHref?: string;
  /** Duplicate lineage: ids this activity supersedes. Never inferred. */
  replaces?: string[];
};

/* ── syllabus lookups (exact slugs only) ────────────────────────────────── */

type Placement = {
  classSlug: string;
  subject: string;
  unitId: string;
  unitTitle: string;
};

const SYLLABUS_PLACEMENTS = new Map<string, Placement>();
const SYLLABUS_UNIT_TITLES = new Map<string, string>();
for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    for (const unit of subject.units) {
      SYLLABUS_UNIT_TITLES.set(unit.id, unit.title);
      for (const title of unit.topics) {
        SYLLABUS_PLACEMENTS.set(slugifySyllabusTopic(title), {
          classSlug: cls.slug,
          subject: subject.slug,
          unitId: unit.id,
          unitTitle: unit.title,
        });
      }
    }
  }
}

const MANIFEST_SUBJECTS = new Set<string>([
  "physics",
  "chemistry",
  "biology",
  "mathematics",
]);

function asActivitySubject(subject: string): ActivitySubject | null {
  return MANIFEST_SUBJECTS.has(subject) ? (subject as ActivitySubject) : null;
}

/** `/class-11-notes/physics/chapters/kinematics` — the chapter route. */
function notesHrefFor(placement: Placement): string {
  return `/${placement.classSlug}/${placement.subject}/chapters/${encodeURIComponent(
    placement.unitId,
  )}`;
}

/* ── curated pilots (owner decisions 2026-11-06) ────────────────────────── */

/**
 * Pilot activities (plan.md Phase 5). Both members of duplicate families stay
 * live: no `replaces` lineage is declared until a parity review decides it.
 */
export const PILOT_ACTIVITIES: LabActivity[] = [
  {
    id: "pilot/physics-projectile-motion",
    slug: "projectile-motion",
    title: "Projectile Motion 3D",
    kind: "3d-sim",
    lifecycle: "pilot",
    curriculum: {
      classSlug: "class-11-notes",
      subject: "physics",
      unitId: "kinematics",
    },
    topicSlugs: ["projectile-motion-and-its-applications"],
    deviceTier: "mid",
    fallback: {
      kind: "2d-diagram",
      summary:
        "Static trajectory diagram with launch angle, range and maximum-height readouts.",
    },
    renderer: {
      kind: "module",
      modulePath: "@/components/lab/topic-visuals/projectile-motion-3d",
    },
    relatedNotesHref: "/class-11-notes/physics/chapters/kinematics",
    practiceHref: "/pyqs",
  },
  {
    id: "pilot/chemistry-covalent-bonding",
    slug: "covalent-bonding",
    title: "Covalent Bonding 3D",
    kind: "3d-sim",
    lifecycle: "pilot",
    curriculum: {
      classSlug: "class-11-notes",
      subject: "chemistry",
      unitId: "chemical-bonding-and-shapes-of-molecules",
    },
    topicSlugs: [
      "covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds",
    ],
    // The generated index keys the bonding visual by the UNIT slug, not a topic
    // slug; the alias keeps that association explicit instead of prefix-matched.
    aliases: ["chemical-bonding-and-shapes-of-molecules"],
    deviceTier: "mid",
    fallback: {
      kind: "2d-diagram",
      summary:
        "Lewis dot structure of the same molecule with shared electron pairs marked.",
    },
    renderer: {
      kind: "module",
      modulePath: "@/components/lab/topic-visuals/chemical-bond-covalent-3d",
    },
    relatedNotesHref:
      "/class-11-notes/chemistry/chapters/chemical-bonding-and-shapes-of-molecules",
    practiceHref: "/pyqs",
  },
  {
    id: "pilot/biology-the-cell",
    slug: "the-cell",
    title: "The Cell 3D",
    kind: "3d-sim",
    lifecycle: "pilot",
    curriculum: {
      classSlug: "class-11-notes",
      subject: "biology",
      unitId: "biomolecules-and-cell-biology",
    },
    topicSlugs: [
      "cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells",
    ],
    deviceTier: "low",
    fallback: {
      kind: "2d-diagram",
      summary: "Labelled plant/animal cell cross-section with organelle callouts.",
    },
    renderer: {
      kind: "module",
      modulePath: "@/components/lab/topic-visuals/cell-biology",
    },
    relatedNotesHref:
      "/class-11-notes/biology/chapters/biomolecules-and-cell-biology",
    practiceHref: "/pyqs",
  },
];

/** Subjects the manifest supports; Mathematics is first-class (owner decision). */
export const ACTIVITY_SUBJECTS: ActivitySubject[] = [
  "physics",
  "chemistry",
  "biology",
  "mathematics",
];

/* ── derived activities ─────────────────────────────────────────────────── */

const CATEGORY_TO_SUBJECT: Record<string, ActivitySubject> = {
  physics: "physics",
  chemistry: "chemistry",
  biology: "biology",
  mathematics: "mathematics",
};

/**
 * Activities derived from the generated topic-visual index (Phases 2–4).
 *
 * One visual can serve topics in different classes/units (a capacitor visual is
 * reused by Class 11 and Class 12 electrostatics). Each activity therefore gets
 * exactly one curriculum placement, and an entry with topics in several units
 * yields one activity per placement — never one activity claiming a Class 11
 * topic while declaring a Class 12 unit.
 */
export function deriveTopicActivities(): LabActivity[] {
  const out: LabActivity[] = [];
  const usedSlugs = new Set<string>();

  for (const entry of LAB_VISUAL_INDEX) {
    const placed = entry.slugs
      .map((slug) => ({ slug, placement: SYLLABUS_PLACEMENTS.get(slug) }))
      .filter(
        (row): row is { slug: string; placement: Placement } =>
          Boolean(row.placement) && Boolean(asActivitySubject(row.placement!.subject)),
      );

    // No exact syllabus topic → no implicit association. Reported as an
    // exemption by the coverage script instead of being guessed at.
    if (placed.length === 0) continue;

    const groups = new Map<string, { slug: string; placement: Placement }[]>();
    for (const row of placed) {
      const key = `${row.placement.classSlug}|${row.placement.subject}|${row.placement.unitId}`;
      const bucket = groups.get(key) ?? [];
      bucket.push(row);
      groups.set(key, bucket);
    }

    for (const rows of groups.values()) {
      const first = rows[0].placement;
      const subject = asActivitySubject(first.subject);
      if (!subject) continue;

      const title =
        entry.kind === "chapter-animation"
          ? entry.chapterProps.topicTitle
          : entry.entranceTopic;

      // Syllabus slugs are truncated at 96 chars and can end mid-word, e.g.
      // "…-their-properties-a-m-"; a URL slug never carries a trailing hyphen.
      const base = rows[0].slug.replace(/-+$/, "");
      let slug = base;
      let suffix = 2;
      while (usedSlugs.has(slug)) slug = `${base}-${suffix++}`;
      usedSlugs.add(slug);

      out.push({
        id: `topic/${slug}`,
        slug,
        title,
        kind: entry.kind === "chapter-animation" ? "animation" : "3d-sim",
        lifecycle: "live",
        curriculum: {
          classSlug: first.classSlug,
          subject,
          unitId: first.unitId,
        },
        topicSlugs: rows.map((row) => row.slug),
        deviceTier: "mid",
        fallback: {
          kind: "2d-diagram",
          summary: `Static labelled diagram of ${title} with the same annotations as the 3D scene.`,
        },
        renderer: { kind: "visual", entry },
        relatedNotesHref: notesHrefFor(first),
        practiceHref: "/pyqs",
      });
    }
  }

  return out;
}

/** Activities derived from the lab registry metadata (data-only list). */
export function deriveLabRegistryActivities(): LabActivity[] {
  const out: LabActivity[] = [];

  for (const lab of LAB_METADATA_LIST) {
    const subject = CATEGORY_TO_SUBJECT[lab.category];
    // `class11` is a cross-subject shelf, not a curriculum subject: it stays a
    // registry-only entry (exemption) rather than being forced into a subject.
    if (!subject) continue;

    // Registry metadata carries no syllabus unit id, and the manifest forbids
    // guessing one; the unit label is preserved as a display-only alias.
    out.push({
      id: `registry/${lab.id}`,
      slug: lab.id,
      title: lab.title,
      kind: lab.type === "theory" ? "theory" : "3d-sim",
      lifecycle: lab.status === "development" ? "retired" : "live",
      curriculum: {
        classSlug: "class-11-notes",
        subject,
        unitId: "",
      },
      topicSlugs: [],
      // The registry's `unit` field is a display label ("Unit: Work & Energy"),
      // not a resolvable key, so it is deliberately NOT promoted to an alias.
      deviceTier: "mid",
      fallback: {
        kind: "text",
        summary: `${lab.title} stays available as a written walkthrough when WebGL is unavailable.`,
      },
      renderer: { kind: "registry", labId: lab.id },
      relatedNotesHref: `/${"class-11-notes"}/${subject}`,
      practiceHref: "/pyqs",
    });
  }

  return out;
}

/** Activities derived from the NEB practical catalog (data-only). */
export function deriveCatalogActivities(): LabActivity[] {
  return Object.values(LABS).map((lab) => {
    const subject =
      CATEGORY_TO_SUBJECT[lab.subject.toLowerCase()] ?? "physics";

    return {
      id: `catalog/${lab.id}`,
      slug: lab.route.replace(/\//g, "-"),
      title: lab.title,
      kind: lab.type === "practical" ? "practical" : "theory",
      lifecycle: "live",
      curriculum: {
        classSlug: "class-11-notes",
        subject,
        unitId: "",
      },
      // The catalog is a hierarchy (hub → unit → concept) with no syllabus
      // topic mapping. An empty list is honest; the coverage script counts
      // these as "catalog exemption", never as covered topics.
      topicSlugs: [],
      deviceTier: "low",
      fallback: {
        kind: "text",
        summary: `${lab.tagline} Available as a written practical sheet.`,
      },
      renderer: { kind: "catalog", entryId: lab.id },
      relatedNotesHref: `/class-11-notes/${subject}`,
      practiceHref: "/practical",
    } satisfies LabActivity;
  });
}

/* ── the merged manifest ────────────────────────────────────────────────── */

function merge(): LabActivity[] {
  const claimedSlugs = new Set(PILOT_ACTIVITIES.map((a) => a.slug));
  const claimedTopics = new Set(PILOT_ACTIVITIES.flatMap((a) => a.topicSlugs));
  const claimedAliases = new Set(PILOT_ACTIVITIES.flatMap((a) => a.aliases ?? []));

  const derived = [
    ...deriveTopicActivities(),
    ...deriveLabRegistryActivities(),
    ...deriveCatalogActivities(),
  ].filter((activity) => {
    if (claimedSlugs.has(activity.slug)) return false;
    if (activity.topicSlugs.some((slug) => claimedTopics.has(slug))) return false;
    if ((activity.aliases ?? []).some((alias) => claimedAliases.has(alias))) return false;
    return true;
  });

  return [...PILOT_ACTIVITIES, ...derived];
}

/** Every activity, pilots first. */
export const ACTIVITY_MANIFEST: LabActivity[] = merge();

const BY_ID = new Map<string, LabActivity>();
const BY_SLUG = new Map<string, LabActivity>();
const BY_TOPIC = new Map<string, LabActivity>();

for (const activity of ACTIVITY_MANIFEST) {
  BY_ID.set(activity.id, activity);
  if (!BY_SLUG.has(activity.slug)) BY_SLUG.set(activity.slug, activity);
  for (const topic of activity.topicSlugs) {
    if (!BY_TOPIC.has(topic)) BY_TOPIC.set(topic, activity);
  }
  for (const alias of activity.aliases ?? []) {
    if (!BY_SLUG.has(alias)) BY_SLUG.set(alias, activity);
  }
}

/** Canonical deep link for an activity (`/lab/[id]` is canonical). */
export function activityHref(activityOrId: string): string {
  const activity = BY_ID.get(activityOrId) ?? BY_SLUG.get(activityOrId);
  return `/lab/${activity?.slug ?? activityOrId}`;
}

/** Look up an activity by manifest id or canonical/legacy slug. */
export function getActivity(id: string): LabActivity | undefined {
  return BY_ID.get(id) ?? BY_SLUG.get(id);
}

/**
 * Resolve a syllabus topic slug to its activity. Exact topic slugs and declared
 * aliases only — a canonical activity slug is NOT a topic, so `projectile-motion`
 * (the activity) never resolves as `projectile-motion-and-its-applications` (the
 * topic). Unknown topics return `undefined` so the note surface hides the 3D
 * affordance instead of guessing.
 */
export function getActivityForTopic(topicSlug: string): LabActivity | undefined {
  const direct = BY_TOPIC.get(topicSlug);
  if (direct) return direct;
  return ACTIVITY_MANIFEST.find((activity) => activity.aliases?.includes(topicSlug));
}

/** Activities offered in the hub and notes: pilots plus everything live. */
export function listOfferedActivities(subject?: ActivitySubject): LabActivity[] {
  return ACTIVITY_MANIFEST.filter(
    (activity) =>
      activity.lifecycle !== "retired" &&
      (!subject || activity.curriculum.subject === subject),
  );
}

/** Whether an activity is one of the curated pilots. */
export function isPilot(activity: LabActivity): boolean {
  return activity.lifecycle === "pilot";
}
