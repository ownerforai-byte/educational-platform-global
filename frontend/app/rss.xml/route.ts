import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { guides } from "@/lib/platform-content";

/**
 * GET /rss.xml — the public study journal as an RSS feed.
 *
 * Gives aggregators and crawlers a standard, diffable syndication surface with
 * stable GUIDs, so new articles can be picked up cheaply. Only the open,
 * ungated articles are listed.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = CANONICAL_SITE_URL.replace(/\/+$/, "");
  const items = guides
    .slice()
    .sort((a, b) => (a.updated < b.updated ? 1 : -1))
    .map((guide) => {
      const link = `${base}/blog/${guide.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(guide.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(`${guide.updated}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <category>${escapeXml(guide.category)}</category>`,
        `      <description>${escapeXml(guide.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ravikisan's Platform — Study Journal</title>
    <link>${base}/blog</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Open, syllabus-first study guides and subject explainers for NEB (+2) Class 11 and 12 students in Nepal.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
