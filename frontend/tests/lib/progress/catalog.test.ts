import { describe, expect, it } from "vitest";
import { SYLLABUS, getUnitTopicEntries } from "@/lib/syllabus";
import {
  buildProgressCatalog,
  entryStatus,
  groupJourney,
  journeyRowToEntry,
  parseTopicPathId,
  summarizeJourney,
  topicHref,
  topicPathId,
} from "@/lib/progress/catalog";
import type { JourneyRow, ProgressEntry } from "@/types/api";

// A real syllabus path, taken from the source of truth rather than hard-coded,
// so the test cannot drift when units are added.
const cls = SYLLABUS[0];
const subject = cls.subjects[0];
const unit = subject.units[0];
const topic = getUnitTopicEntries(unit)[0];

const path = {
  classSlug: cls.slug,
  subjectSlug: subject.slug,
  unitSlug: unit.id,
  topicSlug: topic.slug,
};

function makeRow(over: Partial<JourneyRow> = {}): JourneyRow {
  return {
    id: "row-1",
    ...path,
    status: "started",
    startedAt: "2026-10-01T00:00:00.000Z",
    lastViewedAt: "2026-10-02T00:00:00.000Z",
    viewCount: 2,
    completedAt: null,
    updatedAt: "2026-10-02T00:00:00.000Z",
    ...over,
  };
}

describe("topicPathId", () => {
  it("round-trips a syllabus path", () => {
    expect(parseTopicPathId(topicPathId(path))).toEqual(path);
    expect(topicPathId(path)).toBe(
      `${cls.slug}/${subject.slug}/${unit.id}/${topic.slug}`
    );
  });

  it("rejects anything that is not a four-segment path", () => {
    expect(parseTopicPathId("physics/kinematics")).toBeNull();
    expect(parseTopicPathId("a/b/c/d/e")).toBeNull();
    expect(parseTopicPathId("a//c/d")).toBeNull();
    expect(parseTopicPathId("")).toBeNull();
  });
});

describe("buildProgressCatalog", () => {
  it("lists the whole syllabus as not started when nothing is tracked yet", () => {
    // This is the "My Progress is stuck" regression: an empty API response
    // used to render an empty page. The catalogue side must still be full.
    const entries = buildProgressCatalog([]);

    expect(entries.length).toBeGreaterThan(600);
    expect(entries.every((e) => e.status === "not_started")).toBe(true);
    expect(entries.every((e) => e.completed === false)).toBe(true);
    expect(entries[0].topicId).toBe(topicPathId(path));
    expect(entries[0].topic?.title).toBe(topic.title);
    expect(entries[0].topic?.chapter?.subject?.name).toBe(subject.name);
  });

  it("merges a tracked row into its syllabus slot", () => {
    const entries = buildProgressCatalog([
      makeRow({ status: "completed", completedAt: "2026-10-03T00:00:00.000Z" }),
    ]);

    const tracked = entries.find((e) => e.topicId === topicPathId(path));
    expect(tracked).toBeDefined();
    expect(tracked).toMatchObject({
      id: "row-1",
      status: "completed",
      completed: true,
      completedAt: "2026-10-03T00:00:00.000Z",
      viewCount: 2,
    });
    expect(entries.filter((e) => e.status === "completed")).toHaveLength(1);
    expect(entries.length).toBeGreaterThan(600);
  });

  it("keeps tracked rows whose path left the syllabus instead of hiding them", () => {
    const orphan = makeRow({
      id: "orphan",
      unitSlug: "a-unit-that-was-renamed",
      topicSlug: "a-topic-that-was-removed",
      status: "started",
    });

    const entries = buildProgressCatalog([orphan]);
    const kept = entries.find((e) => e.id === "orphan");

    expect(kept).toBeDefined();
    expect(kept?.status).toBe("in_progress");
    expect(kept?.topic?.title).toBe("A Topic That Was Removed");
  });

  it("accepts Devanagari syllabus slugs (Nepali topic routes)", () => {
    const entries = buildProgressCatalog([
      makeRow({
        id: "nepali",
        unitSlug: "path-1",
        topicSlug: "पाठ-१-वीर-पुर्खा-कविता",
        status: "completed",
        completedAt: "2026-10-03T00:00:00.000Z",
      }),
    ]);

    const kept = entries.find((e) => e.id === "nepali");
    expect(kept?.status).toBe("completed");
    expect(kept?.topicSlug).toBe("पाठ-१-वीर-पुर्खा-कविता");
  });
});

describe("journeyRowToEntry", () => {
  it("labels a tracked row from the syllabus", () => {
    const entry = journeyRowToEntry(makeRow({ status: "completed" }));
    expect(entry).toMatchObject({
      id: "row-1",
      topicId: topicPathId(path),
      status: "completed",
      completed: true,
      classSlug: cls.slug,
      subjectSlug: subject.slug,
      unitSlug: unit.id,
      topicSlug: topic.slug,
    });
    expect(entry.topic?.title).toBe(topic.title);
  });
});

describe("entryStatus", () => {
  const base: ProgressEntry = {
    id: "x",
    topicId: "a/b/c/d",
    completed: false,
    completedAt: null,
    updatedAt: "",
  };

  it("reads the explicit status when present", () => {
    expect(entryStatus({ ...base, status: "completed" })).toBe("completed");
    expect(entryStatus({ ...base, status: "in_progress" })).toBe("in_progress");
    expect(entryStatus({ ...base, status: "not_started" })).toBe("not_started");
  });

  it("treats a legacy row without a status as in progress, never as untouched", () => {
    expect(entryStatus({ ...base, id: "row-9" })).toBe("in_progress");
    expect(entryStatus({ ...base, id: "row-9", completed: true })).toBe("completed");
    expect(entryStatus({ ...base, id: "new:a/b/c/d" })).toBe("not_started");
  });
});

describe("summarizeJourney", () => {
  it("counts each bucket and the completion percentage", () => {
    const entries = buildProgressCatalog([
      makeRow({ status: "completed", completedAt: "2026-10-03T00:00:00.000Z" }),
      makeRow({ id: "row-2", ...path, topicSlug: "other-topic", status: "started" }),
    ]);

    const summary = summarizeJourney(entries);
    expect(summary.total).toBe(entries.length);
    expect(summary.completed).toBe(1);
    expect(summary.inProgress).toBe(1);
    expect(summary.notStarted).toBe(entries.length - 2);
    expect(summary.percent).toBe(Math.round((1 / entries.length) * 100));
  });

  it("is zeroed for an empty catalogue", () => {
    expect(summarizeJourney([])).toEqual({
      total: 0,
      completed: 0,
      inProgress: 0,
      notStarted: 0,
      percent: 0,
    });
  });
});

describe("groupJourney", () => {
  it("buckets by class + subject in catalogue order", () => {
    const entries = buildProgressCatalog([
      makeRow({ status: "completed", completedAt: "2026-10-03T00:00:00.000Z" }),
    ]);
    const groups = groupJourney(entries);

    expect(groups.length).toBeGreaterThan(1);
    expect(groups[0].key).toBe(`${cls.slug}/${subject.slug}`);
    expect(groups[0].className).toBe(cls.name);
    expect(groups[0].subjectName).toBe(subject.name);
    expect(groups[0].total).toBeGreaterThan(0);
    // The tracked topic sits in the first group.
    expect(groups[0].completed).toBe(1);
    expect(groups.reduce((n, g) => n + g.total, 0)).toBe(entries.length);
  });
});

describe("topicHref", () => {
  // The route both classes ship: /{class}/{subject}/chapters/{unit}/topics/{topic}
  const route = `/${cls.slug}/${subject.slug}/chapters/${unit.id}/topics/${topic.slug}`;
  const isNotesClass = cls.slug === "class-11-notes" || cls.slug === "class-12-notes";

  it("resolves a tracked topic back to the page that produced it", () => {
    const entry = journeyRowToEntry(makeRow({ status: "completed" }));
    expect(topicHref(entry)).toBe(isNotesClass ? route : "/progress");
  });

  it("never invents a route for a foreign class", () => {
    const entry = journeyRowToEntry(makeRow());
    expect(topicHref({ ...entry, classSlug: "bachelor-4-year" })).toBe("/progress");
    expect(topicHref({ ...entry, unitSlug: undefined })).toBe("/progress");
    expect(topicHref({ ...entry, topicSlug: undefined })).toBe("/progress");
  });

  it("falls back for an entry with no path at all", () => {
    expect(
      topicHref({
        id: "legacy-1",
        topicId: "legacy-1",
        completed: true,
        completedAt: "2026-10-02T00:00:00.000Z",
        updatedAt: "2026-10-02T00:00:00.000Z",
      })
    ).toBe("/progress");
  });
});
