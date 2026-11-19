/**
 * Machine-readable renderings of the public study journal.
 *
 * These turn the same `guides` payload into formats that crawlers and AI answer
 * engines consume well: Markdown (easy to quote), plain full-text (for
 * llms-full.txt) and RSS (syndication). Keeping them in one module means the
 * blog index, article page, llms.txt, llms-full.txt, RSS and Markdown endpoint
 * can never drift apart.
 */

import type { Guide } from "./platform-content";

function nl(): string {
  return "\n";
}

/** YAML front matter + Markdown body - the format LLMs and static tools prefer. */
export function guideToMarkdown(guide: Guide): string {
  const frontMatter = [
    "---",
    "title: " + JSON.stringify(guide.title),
    "slug: " + guide.slug,
    "category: " + JSON.stringify(guide.category),
    "date: " + guide.updated,
    "tags: [" + guide.tags.map((t) => JSON.stringify(t)).join(", ") + "]",
    "description: " + JSON.stringify(guide.description),
    "---",
  ].join(nl());

  const body: string[] = [];
  body.push("# " + guide.title, "");
  body.push("> " + guide.summary, "");
  body.push(guide.description, "");
  for (const section of guide.sections) {
    body.push("## " + section.title, "");
    for (const paragraph of section.paragraphs) {
      body.push(paragraph, "");
    }
  }
  body.push(
    "---",
    "",
    "*Independent study aid - not official NEB material. Cite as: Ravikisan's Platform, " +
      guide.title +
      ".*",
    "",
  );

  return frontMatter + nl() + body.join(nl());
}

/** One article as a plain-text block (used by llms-full.txt). */
export function guideToPlainText(guide: Guide): string {
  const out: string[] = [];
  out.push("# " + guide.title);
  out.push("Category: " + guide.category + " | Reviewed: " + guide.updated);
  out.push("Tags: " + guide.tags.join(", "));
  out.push("");
  out.push(guide.description);
  out.push("");
  for (const section of guide.sections) {
    out.push("## " + section.title);
    for (const paragraph of section.paragraphs) out.push(paragraph);
    out.push("");
  }
  return out.join(nl());
}
