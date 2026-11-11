import { describe, it, expect, vi } from "vitest";
import {
  LAB_VISUAL_INDEX,
  RESOLVER_CONFLICTS,
  resolveLabVisualEntry,
  resolveLabVisualId,
} from "@/lib/lab-visual-index";

describe("lab-visual-index", () => {
  it("has the generated 453 plus the manual science/math extension with the right split", () => {
    // 453 auto-generated entries + 183 manual chapter-animation entries that
    // close the Physics/Chemistry/Biology/Mathematics topic gap (2026-11-11).
    expect(LAB_VISUAL_INDEX).toHaveLength(636);
    const chapter = LAB_VISUAL_INDEX.filter((e) => e.kind === "chapter-animation");
    const direct  = LAB_VISUAL_INDEX.filter((e) => e.kind === "direct-visual");
    expect(chapter).toHaveLength(341);
    expect(direct).toHaveLength(295);
  });

  it("the manual extension block carries a real syllabus topic per entry", () => {
    // Every manual entry must name the topic it teaches, so the manifest can
    // derive a coverage row. Generated entries reuse one shared topicSlug, so
    // the check is on the manual block's own shape: a non-empty slug + title.
    const manual = LAB_VISUAL_INDEX.filter(
      (e) => e.kind === "chapter-animation" && e.labId === "ChapterAnimation" && e.slugs.length === 1,
    );
    expect(manual.length).toBeGreaterThanOrEqual(183);
    for (const entry of manual) {
      if (entry.kind !== "chapter-animation") continue;
      expect(entry.slugs[0].length).toBeGreaterThan(0);
      expect(entry.chapterProps.topicSlug.length).toBeGreaterThan(0);
      expect(entry.chapterProps.topicTitle.length).toBeGreaterThan(0);
      expect(entry.entranceTopic.length).toBeGreaterThan(0);
    }
  });

  it("has no alias collisions between different visuals", () => {
    // Build slug → set of labIds
    const slugToLabIds = new Map<string, Set<string>>();
    for (const entry of LAB_VISUAL_INDEX) {
      for (const slug of entry.slugs) {
        const key = slug.toLowerCase();
        const set = slugToLabIds.get(key) ?? new Set<string>();
        set.add(entry.labId);
        slugToLabIds.set(key, set);
      }
    }
    const collisions = [...slugToLabIds.entries()].filter(([, ids]) => ids.size > 1);
    expect(collisions).toEqual([]);
  });

  it("RESOLVER_CONFLICTS is empty (no unresolvable conflicts)", () => {
    expect(RESOLVER_CONFLICTS).toEqual([]);
  });

  it("resolver returns null for unknown slugs", () => {
    expect(resolveLabVisualEntry("nonexistent-topic-zzz")).toBeNull();
    expect(resolveLabVisualId("nonexistent-topic-zzz")).toBeNull();
  });

  it("resolver is case-insensitive and de-apostrophizes", () => {
    // "physical-quantities" → ChapterAnimation
    expect(resolveLabVisualEntry("physical-quantities")?.labId).toBe("ChapterAnimation");
    expect(resolveLabVisualId("PHYSICAL-QUANTITIES")).toBe("ChapterAnimation");
    // Apostrophe variant: "newton's-law-of-cooling" normalizes to
    // "newton-s-law-of-cooling", which is a registered alias of the canonical
    // "newtons-law-of-cooling" slug — both resolve to the same ChapterAnimation.
    const coolingEntry = LAB_VISUAL_INDEX.find((e) =>
      e.slugs.includes("newtons-law-of-cooling")
    );
    expect(coolingEntry).toBeDefined();
    expect(resolveLabVisualEntry("newton-s-law-of-cooling")?.labId).toBe(coolingEntry?.labId);
    expect(resolveLabVisualEntry("newton's-law-of-cooling")?.labId).toBe(coolingEntry?.labId);
  });

  it("every entry has valid structure", () => {
    for (const entry of LAB_VISUAL_INDEX) {
      expect(entry.slugs.length).toBeGreaterThanOrEqual(1);
      expect(entry.entranceTopic.length).toBeGreaterThan(0);
      expect(["chapter-animation", "direct-visual"]).toContain(entry.kind);
      expect(entry.labId.length).toBeGreaterThan(0);
    }
  });

  it("every distinct labId has a registered loader (no unknown targets)", async () => {
    const { hasLabVisualLoader } = await import("@/lib/lab-visual-loaders");
    const labIds = [...new Set(LAB_VISUAL_INDEX.map((e) => e.labId))];
    expect(labIds).toHaveLength(142); // 141 direct visuals + ChapterAnimation
    for (const labId of labIds) {
      expect(hasLabVisualLoader(labId)).toBe(true);
    }
  });

  it("getLabVisualNode builds a node for every entry", async () => {
    const { getLabVisualNode } = await import("@/lib/lab-visual-loaders");
    for (const entry of LAB_VISUAL_INDEX) {
      expect(getLabVisualNode(entry)).not.toBeNull();
    }
  });

  it("direct visuals resolve to their named component", () => {
    // Find a known direct visual entry
    const entry = LAB_VISUAL_INDEX.find((e) => e.labId === "ProjectileMotionVisual");
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe("direct-visual");
    const resolved = resolveLabVisualEntry("projectile-motion-and-its-applications");
    expect(resolved?.labId).toBe("ProjectileMotionVisual");
  });

  it("chapter entries have chapterProps with topicSlug and topicTitle", () => {
    for (const entry of LAB_VISUAL_INDEX.filter((e) => e.kind === "chapter-animation")) {
      expect(entry.kind).toBe("chapter-animation");
      if (entry.kind === "chapter-animation") {
        expect(entry.chapterProps.topicSlug.length).toBeGreaterThan(0);
        expect(entry.chapterProps.topicTitle.length).toBeGreaterThan(0);
      }
    }
  });
});

