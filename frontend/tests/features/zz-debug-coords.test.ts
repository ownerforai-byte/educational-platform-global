import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import { noteMatchesTopic } from "@/lib/note-topic-match";

describe("debug coords", () => {
  it("immune in coords and corpus match", () => {
    const slug = "immune-system-innate-and-adaptive-immunity";
    const coords = new Set<string>();
    for (const cls of SYLLABUS) {
      const classDir = cls.slug.replace(/-notes$/, "");
      for (const subj of cls.subjects) for (const unit of subj.units) for (const topic of unit.topics) {
        if (slugifySyllabusTopic(topic) === slug) coords.add(`${classDir}/${unit.id}`);
      }
    }
    console.log("coords:", [...coords]);
    expect(coords.size).toBeGreaterThan(0);
    const corpus = JSON.parse(readFileSync(join(process.cwd(), "public/data/content/manifest.json"), "utf-8")) as Array<{ path: string; data: { topicSlug?: string; unitSlug?: string; notes?: string[] } }>;
    const hits: string[] = [];
    for (const item of corpus) {
      if (!item.path.startsWith("notes/concepts/") || !Array.isArray(item.data?.notes)) continue;
      const parts = item.path.split("/");
      const coord = `${parts[2]}/${parts[4] ?? "?"}`;
      if (!coords.has(coord)) continue;
      if (!noteMatchesTopic(item.data.topicSlug, parts.at(-1), slug)) continue;
      hits.push(item.path);
    }
    console.log("hits:", hits);
    expect(hits.length).toBeGreaterThan(0);
  });
});
