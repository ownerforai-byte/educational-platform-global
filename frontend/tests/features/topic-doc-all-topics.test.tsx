/**
 * Every one of the 696 syllabus topics must render a real document: the
 * `article.doc-view` shell, the concept-map section, and at least one
 * explanation/overview section — with no raw LaTeX leaking into the SVG labels.
 *
 * This is the guard that a per-topic sample test cannot give: it mounts the
 * real DocView against the shipped concept JSON for all 696 topics.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";
import { noteMatchesTopic } from "@/lib/note-topic-match";
import { TopicDocView } from "@/features/docs/doc-view";

const ROOT = join(process.cwd(), "..", "content", "notes", "concepts");
const files: string[] = [];
function walk(d: string) { for (const e of readdirSync(d)) { const p = join(d, e); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith(".json")) files.push(p); } }

describe("all 696 syllabus topics render a real document", () => {
  it("every topic mounts doc sections and a concept map", () => {
    walk(ROOT);
    const idx = files.map((f) => {
      const j = JSON.parse(readFileSync(f, "utf8"));
      return { slug: String(j.topicSlug ?? ""), fn: basename(f), j };
    });

    let count = 0;
    const failures: string[] = [];

    for (const c of SYLLABUS) for (const s of c.subjects) for (const u of s.units) for (const t of u.topics) {
      const slug = slugifySyllabusTopic(t);
      const hit = idx.find((e) => noteMatchesTopic(e.slug, e.fn, slug));
      if (!hit) { failures.push(`NO DATA ${slug}`); continue; }

      const { container, unmount } = render(
        <TopicDocView
          classSlug={c.slug}
          subjectSlug={s.slug}
          unitId={u.id}
          topicSlug={slug}
          topicTitle={String(t)}
          data={hit.j as never}
        />,
      );

      const missing: string[] = [];
      if (!container.querySelector("article.doc-view")) missing.push("article");
      for (const id of ["doc-map", "doc-overview", "doc-explain"]) {
        if (!container.querySelector(`section#${id}`)) missing.push(id);
      }
      const mapSvg = container.querySelector("svg[role='img'][aria-label^='Concept map']");
      if (!mapSvg) missing.push("map-svg");
      const mapTexts = mapSvg ? [...mapSvg.querySelectorAll("text")].map((n) => n.textContent ?? "") : [];
      if (mapTexts.length < 4) missing.push(`map-labels(${mapTexts.length})`);
      if (mapTexts.some((x) => x.includes("\\") || x.includes("$"))) missing.push("raw-latex-in-svg");

      if (missing.length) failures.push(`${s.slug}/${slug} :: ${missing.join(",")}`);
      count++;
      unmount();
    }

    console.log(`\nRENDERED ${count} topics, ${failures.length} failures`);
    failures.slice(0, 25).forEach((f) => console.log("  FAIL", f));
    expect(failures).toEqual([]);
    expect(count).toBe(696);
  }, 600000);
});
