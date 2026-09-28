/**
 * components/perf/topic-notes-prefetcher.test.tsx — regression tests for the
 * intent-driven topic notes prefetching layer.
 */

import { describe, expect, it } from "vitest";
import {
  TOPIC_ROUTE_PATTERN,
  TOPIC_TRACKS,
  networkAllowsPrefetch,
  notesManifestPath,
  parseTopicRoute,
} from "@/components/perf/topic-notes-prefetcher";

describe("topic-notes-prefetcher: route parsing", () => {
  it("tracks class-11 and class-12 notes routes", () => {
    expect(TOPIC_TRACKS).toEqual(["class-11-notes", "class-12-notes"]);
  });

  it("parses valid class-11 topic URLs", () => {
    const parsed = parseTopicRoute(
      "/class-11-notes/physics/chapters/units-and-measurement/topics/dimensional-analysis",
    );
    expect(parsed).toEqual({
      track: "class-11-notes",
      subjectSlug: "physics",
      unitId: "units-and-measurement",
      topicSlug: "dimensional-analysis",
    });
  });

  it("parses valid class-12 topic URLs with lowercase normalization", () => {
    const parsed = parseTopicRoute(
      "/class-12-notes/Chemistry/chapters/Solid-State/topics/Crystal-Lattice",
    );
    expect(parsed).toEqual({
      track: "class-12-notes",
      subjectSlug: "chemistry",
      unitId: "solid-state",
      topicSlug: "crystal-lattice",
    });
  });

  it("tolerates query parameters and hash anchors", () => {
    const parsed = parseTopicRoute(
      "/class-11-notes/biology/chapters/cell-structure/topics/nucleus?tab=notes#diagram",
    );
    expect(parsed).toEqual({
      track: "class-11-notes",
      subjectSlug: "biology",
      unitId: "cell-structure",
      topicSlug: "nucleus",
    });
  });

  it("rejects non-topic routes and foreign origins", () => {
    expect(parseTopicRoute("")).toBeNull();
    expect(parseTopicRoute("/notes")).toBeNull();
    expect(parseTopicRoute("/class-11-notes")).toBeNull();
    expect(parseTopicRoute("/class-11-notes/physics")).toBeNull();
    expect(parseTopicRoute("/class-11-notes/physics/chapters/mechanics")).toBeNull();
    expect(parseTopicRoute("https://external.com/class-11-notes/physics/chapters/a/topics/b")).toBeNull();
    expect(parseTopicRoute("//evil.com/class-11-notes/physics/chapters/a/topics/b")).toBeNull();
    expect(parseTopicRoute("/syllabus/class-11/physics")).toBeNull();
  });

  it("produces deterministic manifest paths", () => {
    expect(notesManifestPath("physics")).toBe("syllabus-notes/physics/_manifest.json");
    expect(notesManifestPath("chemistry")).toBe("syllabus-notes/chemistry/_manifest.json");
  });

  it("has a regex matching expected structure", () => {
    expect(TOPIC_ROUTE_PATTERN.test("/class-11-notes/physics/chapters/unit/topics/slug")).toBe(true);
    expect(TOPIC_ROUTE_PATTERN.test("/class-12-notes/physics/chapters/unit/topics/slug")).toBe(true);
    expect(TOPIC_ROUTE_PATTERN.test("/class-10-notes/physics/chapters/unit/topics/slug")).toBe(false);
  });
});

describe("topic-notes-prefetcher: network heuristics", () => {
  it("returns a boolean under the current test environment", () => {
    // navigator exists in vitest (jsdom) so it should return true or false cleanly
    expect(typeof networkAllowsPrefetch()).toBe("boolean");
  });
});
