import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import { noteMatchesTopic } from "@/lib/note-topic-match";

const slug = "immune-system-innate-and-adaptive-immunity";

it("debug", () => {
  const coords: string[] = [];
  for (const cls of SYLLABUS) {
    const classDir = cls.slug.replace(/-notes$/, "");
    for (const subj of cls.subjects) {
      for (const unit of subj.units) {
        for (const topic of unit.topics) {
          const s = slugifySyllabusTopic(topic);
          if (s.includes("immune")) coords.push(`${classDir}/${unit.slug} <- ${s}`);
        }
      }
    }
  }
  console.log("syllabus immune coords:", coords);
  const corpus = JSON.parse(
    readFileSync(join(process.cwd(), "public/data/content/manifest.json"), "utf-8"),
  ) as Array<{ path: string; data: { topicSlug?: string; notes?: string[] } }>;
  const out: string[] = [];
  for (const item of corpus) {
    if (item.path.includes("immune-system-innate")) {
      const parts = item.path.split("/");
      out.push(`corpus: ${item.path}`);
      out.push(`  coord: ${parts[2]}/${parts[4]}`);
      out.push(
        `  match: ${noteMatchesTopic(item.data.topicSlug, item.path.split("/").pop(), slug)}`,
      );
    }
  }
  writeFileSync("debug-immune-out.txt", coords.join("\n") + "\n---\n" + out.join("\n"));
});
