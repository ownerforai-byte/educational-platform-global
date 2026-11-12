import { describe, expect, it } from "vitest";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import { VIDEO_TOPICS } from "@/features/lab/components/topic-video-slugs";

/**
 * The topic Video registry mounts hand-authored animated explainers on real
 * syllabus topics. Every slug must resolve to an actual syllabus topic — a
 * stale slug would silently stop rendering (and leave the Video unreachable).
 */
describe("topic video registry", () => {
  const allSlugs = new Set(
    SYLLABUS.flatMap((cls) =>
      cls.subjects.flatMap((subj) =>
        subj.units.flatMap((unit) => unit.topics.map((topic) => slugifySyllabusTopic(topic))),
      ),
    ),
  );

  it("every video slug is a real syllabus topic", () => {
    const stale = Object.keys(VIDEO_TOPICS).filter((slug) => !allSlugs.has(slug));
    expect(stale).toEqual([]);
  });

  it("every video slug maps to an authored animation", () => {
    for (const key of Object.values(VIDEO_TOPICS)) {
      expect(typeof key).toBe("string");
      expect(key.length).toBeGreaterThan(0);
    }
  });
});
