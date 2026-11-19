import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { guides } from "@/lib/platform-content";
import { guideToPlainText } from "@/lib/guide-content-format";

/**
 * GET /llms-full.txt — the complete, plain-text corpus for AI answer engines.
 *
 * `llms.txt` is the index; this is the full text. Together they let a model read
 * the whole public knowledge surface in one fetch and cite it accurately without
 * scraping rendered HTML. Public/unauthenticated only.
 */
export const dynamic = "force-static";

export function GET() {
  const base = CANONICAL_SITE_URL.replace(/\/+$/, "");
  const out: string[] = [];
  out.push("# Ravikisan's Platform — full public study journal");
  out.push("");
  out.push(
    "An independent, syllabus-first study companion for NEB (+2) Class 11 and 12 students in Nepal. " +
      "This document contains the full text of every open article. It is not official NEB material.",
  );
  out.push(`Source: ${base}`);
  out.push("");
  out.push("=".repeat(80));
  out.push("");
  for (const guide of guides) {
    out.push(guideToPlainText(guide));
    out.push("");
    out.push(`Article URL: ${base}/blog/${guide.slug}`);
    out.push(`Markdown version: ${base}/blog/${guide.slug}/markdown`);
    out.push("");
    out.push("-".repeat(80));
    out.push("");
  }
  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
