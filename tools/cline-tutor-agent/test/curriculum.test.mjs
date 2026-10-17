import assert from "node:assert/strict";
import test from "node:test";
import { createCurriculumCatalog } from "../src/curriculum.mjs";

const catalog = createCurriculumCatalog();

test("loads both classes and multiple subjects from served curriculum data", () => {
  assert.ok(catalog.size > 700, `expected a broad catalog, got ${catalog.size}`);
  const subjects = catalog.listSubjects();
  assert.ok(subjects.some((item) => item.className === "Class 11" && item.subjectSlug === "physics"));
  assert.ok(subjects.some((item) => item.className === "Class 12" && item.subjectSlug === "biology"));
});

test("search prioritizes a matching title and returns a canonical route and excerpt", () => {
  const [result] = catalog.search("Newton law gravitation", { subject: "physics", classLevel: "11", limit: 4 });
  assert.ok(result, "expected a physics result");
  assert.match(`${result.title} ${result.topicSlug}`.toLowerCase(), /gravitation/);
  assert.match(result.url, /^\/class-11-notes\/physics\/chapters\//);
  assert.ok(result.excerpt.length > 0);
});

test("searches note-body concepts even when the phrase is absent from topic titles", () => {
  const results = catalog.search("photosynthesis plant", { subject: "biology", limit: 6 });
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.subject === "Biology"));
  assert.ok(results.some((item) => item.excerpt.toLowerCase().includes("photosynthesis")));
});

test("filters to Class 12 instead of mixing with Class 11 results", () => {
  const results = catalog.search("biodiversity", { subject: "biology", classLevel: "12", limit: 8 });
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.className === "Class 12"));
});

test("topic retrieval is exact, scoped, bounded, and read-only", () => {
  const result = catalog.search("mendel laws inheritance", { subject: "biology", limit: 6 })[0];
  assert.ok(result);
  const topic = catalog.getTopic({ topicSlug: result.topicSlug, subject: "biology" });
  assert.equal(topic?.topicSlug, result.topicSlug);
  assert.ok(topic.content.length <= 14_000);
  assert.equal(catalog.getTopic({ topicSlug: "not-a-real-topic" }), null);
});

test("blank and unrelated queries do not fabricate curriculum matches", () => {
  assert.deepEqual(catalog.search("   "), []);
  assert.deepEqual(catalog.search("unrelated xyzzy topic", { minScore: 4 }), []);
});
