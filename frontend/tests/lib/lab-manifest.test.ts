import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  ACTIVITY_MANIFEST,
  ACTIVITY_SUBJECTS,
  PILOT_ACTIVITIES,
  activityHref,
  getActivity,
  getActivityForTopic,
  listOfferedActivities,
} from "@/lib/lab-manifest";
import { LABS } from "@/lib/lab-catalog";
import { LAB_METADATA_LIST } from "@/lib/lab-metadata";
import { LAB_VISUAL_INDEX } from "@/lib/lab-visual-index";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import { nextTopic, previousTopic, topicHref } from "@/lib/syllabus-neighbors";
import { modulePathExists, readLibSource } from "../helpers/resolve-lib-shim";

const FRONTEND_ROOT = process.cwd();
const APP_ROOT = path.join(FRONTEND_ROOT, "app", "(app)");

/** Exact syllabus topic slug → placement (same rule as the coverage script). */
const placements = new Map<string, { classSlug: string; subject: string; unitId: string }>();
const unitIds = new Set<string>();
for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    for (const unit of subject.units) {
      unitIds.add(unit.id);
      for (const title of unit.topics) {
        placements.set(slugifySyllabusTopic(title), {
          classSlug: cls.slug,
          subject: subject.slug,
          unitId: unit.id,
        });
      }
    }
  }
}

const loadersSource = readLibSource(FRONTEND_ROOT, path.join("lib", "lab-activity-loaders.ts"));

describe("3D activity manifest", () => {
  it("keeps ids and canonical slugs unique and URL-safe", () => {
    expect(new Set(ACTIVITY_MANIFEST.map((a) => a.id)).size).toBe(ACTIVITY_MANIFEST.length);
    expect(new Set(ACTIVITY_MANIFEST.map((a) => a.slug)).size).toBe(ACTIVITY_MANIFEST.length);

    for (const activity of ACTIVITY_MANIFEST) {
      // Devanagari (U+0900–U+097F) is allowed: the syllabus emits Devanagari
      // topic slugs for every Nepali topic, and those become the activity
      // slug. Same charset rule as `slugifySyllabusTopic` and the content
      // `Slug` atom.
      expect(activity.slug).toMatch(
        /^[a-z0-9\u0900-\u097f]+(-[a-z0-9\u0900-\u097f]+)*$/,
      );
      expect(activityHref(activity.id)).toBe(
        `/lab/${encodeURIComponent(activity.slug)}`,
      );
      // The canonical URL must round-trip through the same manifest.
      expect(getActivity(activity.slug)?.id).toBe(activity.id);
      // …and so must the percent-encoded form a browser sends for a
      // Devanagari segment.
      expect(getActivity(encodeURIComponent(activity.slug))?.id).toBe(activity.id);
    }
  });

  it("covers every subject in the syllabus", () => {
    expect(ACTIVITY_SUBJECTS).toEqual([
      "physics",
      "chemistry",
      "biology",
      "mathematics",
      "english",
      "nepali",
    ]);
    for (const subject of ACTIVITY_SUBJECTS) {
      expect(
        listOfferedActivities(subject).length,
        `${subject} has no activities`,
      ).toBeGreaterThan(0);
    }
  });

  it("gives every syllabus topic exactly one activity", () => {
    // The whole point of the 2026-11-11 coverage pass: no topic is left
    // without a lab, and no topic is claimed twice.
    const covered = new Set<string>();
    for (const activity of ACTIVITY_MANIFEST) {
      for (const slug of activity.topicSlugs) {
        expect(covered.has(slug), `topic "${slug}" is claimed twice`).toBe(false);
        covered.add(slug);
      }
    }
    for (const [slug, placement] of placements) {
      expect(
        covered.has(slug),
        `topic "${slug}" (${placement.subject}) has no activity`,
      ).toBe(true);
    }
  });

  it("places every pilot on an exact syllabus topic with matching class/subject/unit", () => {
    for (const activity of PILOT_ACTIVITIES) {
      expect(activity.topicSlugs.length).toBeGreaterThan(0);
      for (const slug of activity.topicSlugs) {
        const placement = placements.get(slug);
        expect(placement, `${activity.id} topic "${slug}" is not a syllabus slug`).toBeDefined();
        expect(placement?.classSlug).toBe(activity.curriculum.classSlug);
        expect(placement?.subject).toBe(activity.curriculum.subject);
        expect(placement?.unitId).toBe(activity.curriculum.unitId);
      }
    }
  });

  it("never assigns one topic to two activities", () => {
    const owners = new Map<string, string>();
    for (const activity of ACTIVITY_MANIFEST) {
      for (const slug of activity.topicSlugs) {
        const owner = owners.get(slug);
        expect(owner, `topic "${slug}" claimed by ${owner} and ${activity.id}`).toBeUndefined();
        owners.set(slug, activity.id);
      }
    }
  });

  it("declares kind, lifecycle, tier and fallback for every activity", () => {
    for (const activity of ACTIVITY_MANIFEST) {
      expect(["3d-sim", "animation", "theory", "practical"]).toContain(activity.kind);
      expect(["live", "pilot", "retired"]).toContain(activity.lifecycle);
      expect(["high", "mid", "low"]).toContain(activity.deviceTier);
      expect(activity.fallback.kind).toMatch(/^(2d-diagram|static-image|text)$/);
      expect(activity.fallback.summary.trim().length).toBeGreaterThan(8);
      expect(ACTIVITY_SUBJECTS).toContain(activity.curriculum.subject);
    }
  });

  it("resolves every renderer without loading a visual", () => {
    const catalogIds = new Set(Object.keys(LABS));
    const registryIds = new Set(LAB_METADATA_LIST.map((lab) => lab.id));

    for (const activity of ACTIVITY_MANIFEST) {
      const renderer = activity.renderer;
      if (renderer.kind === "module") {
        expect(
          modulePathExists(FRONTEND_ROOT, renderer.modulePath),
          `${renderer.modulePath} missing`,
        ).toBe(true);
        expect(loadersSource).toContain(`"${renderer.modulePath}"`);
      } else if (renderer.kind === "visual") {
        expect(LAB_VISUAL_INDEX).toContain(renderer.entry);
      } else if (renderer.kind === "catalog") {
        expect(catalogIds.has(renderer.entryId)).toBe(true);
      } else {
        expect(registryIds.has(renderer.labId)).toBe(true);
      }
    }
  });

  it("reaches parity with the three live sources", () => {
    const visualEntries = new Set(
      ACTIVITY_MANIFEST.flatMap((a) => (a.renderer.kind === "visual" ? [a.renderer.entry] : [])),
    );
    const pilotTopics = new Set(PILOT_ACTIVITIES.flatMap((a) => a.topicSlugs));

    for (const entry of LAB_VISUAL_INDEX) {
      const syllabusSlugs = entry.slugs.filter((slug) => placements.has(slug));
      // Represented by a derived activity, curated by a pilot (which takes over
      // that topic), or exempt because no slug is an exact syllabus topic.
      const curated = syllabusSlugs.length > 0 && syllabusSlugs.every((slug) => pilotTopics.has(slug));
      expect(visualEntries.has(entry) || curated || syllabusSlugs.length === 0).toBe(true);
    }

    for (const lab of LAB_METADATA_LIST) {
      if (lab.category === "class11") continue; // cross-subject shelf: registry-only
      const represented = ACTIVITY_MANIFEST.some(
        (a) => a.renderer.kind === "registry" && a.renderer.labId === lab.id,
      );
      expect(represented, `registry lab ${lab.id} is missing from the manifest`).toBe(true);
    }

    for (const id of Object.keys(LABS)) {
      const represented = ACTIVITY_MANIFEST.some(
        (a) => a.renderer.kind === "catalog" && a.renderer.entryId === id,
      );
      expect(represented, `catalog entry ${id} is missing from the manifest`).toBe(true);
    }
  });

  it("resolves topics exactly, never by prefix or similarity", () => {
    expect(getActivityForTopic("projectile-motion-and-its-applications")?.slug).toBe(
      "projectile-motion",
    );
    expect(getActivityForTopic("projectile-motion")).toBeUndefined();
    expect(getActivityForTopic("covalent-bond")).toBeUndefined();
    // Declared alias (unit-level topic-map key) is the only escape hatch.
    expect(getActivity("chemical-bonding-and-shapes-of-molecules")?.id).toBe(
      "pilot/chemistry-covalent-bonding",
    );
  });

  it("does not declare duplicate lineage before a parity review", () => {
    for (const activity of ACTIVITY_MANIFEST) {
      expect(activity.replaces ?? []).toEqual([]);
    }
  });
});

describe("journey wiring", () => {
  it("walks syllabus order: next and previous topics are symmetric", () => {
    const anchor = "projectile-motion-and-its-applications";
    const next = nextTopic("class-11-notes", "physics", "kinematics", anchor);

    // The successor may cross a unit boundary (kinematics → dynamics), which is
    // exactly the behaviour the journey needs; it must stay in the same subject.
    expect(next).not.toBeNull();
    expect(next?.subject).toBe("physics");
    expect(next?.topicSlug).not.toBe(anchor);

    const back = next
      ? previousTopic(next.classSlug, next.subject, next.unitId, next.topicSlug)
      : null;
    expect(back?.topicSlug).toBe(anchor);
  });

  it("builds the canonical topic route", () => {
    expect(
      topicHref({
        classSlug: "class-11-notes",
        subject: "physics",
        unitId: "kinematics",
        unitTitle: "Kinematics",
        topicSlug: "projectile-motion-and-its-applications",
        topicTitle: "Projectile Motion and its Applications",
      }),
    ).toBe(
      "/class-11-notes/physics/chapters/kinematics/topics/projectile-motion-and-its-applications",
    );
  });

  it("points every pilot at routes that exist", () => {
    const chapterRoute = path.join(
      APP_ROOT,
      "class-11-notes",
      "[subject]",
      "chapters",
      "[unit]",
    );
    expect(fs.existsSync(path.join(chapterRoute, "page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(APP_ROOT, "pyqs", "page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(APP_ROOT, "chat", "page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(APP_ROOT, "lab", "3d", "page.tsx"))).toBe(true);

    for (const pilot of PILOT_ACTIVITIES) {
      expect(pilot.relatedNotesHref).toMatch(/^\/class-(11|12)-notes\/[a-z]+\/chapters\/[a-z0-9-]+$/);
      expect(pilot.practiceHref).toBe("/pyqs");
    }
  });
});
