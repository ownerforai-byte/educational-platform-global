import { notFound } from "next/navigation";
import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { guides } from "@/lib/platform-content";
import { guideToMarkdown } from "@/lib/guide-content-format";

type Context = { params: Promise<{ slug: string }> };

/**
 * GET /blog/<slug>/markdown — the same article as clean Markdown.
 *
 * AI crawlers and static knowledge tools consume Markdown more reliably than
 * rendered HTML, so each public article is also served here. The canonical HTML
 * page remains the human view; this endpoint exists purely for machine readers.
 */
export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const base = CANONICAL_SITE_URL.replace(/\/+$/, "");
  return new Response(guideToMarkdown(guide), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Location": `${base}/blog/${guide.slug}`,
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
