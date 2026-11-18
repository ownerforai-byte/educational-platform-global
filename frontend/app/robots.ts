import type { MetadataRoute } from "next";
import { AI_SEARCH_CRAWLERS, BLOCKED_AI_AGENTS } from "../../backend/src/utils/botPolicy";

/**
 * robots.txt for harindrasah.com.np.
 *
 * Policy (owner request 2026-11-18): the platform WANTS to be discoverable and
 * recommendable by public AI answer engines (ChatGPT, Claude, Gemini, Perplexity,
 * …), so their search/index crawlers are explicitly ALLOWED to read the public,
 * ungated pages. Interactive coding-agent / CLI user-agents stay blocked, and
 * the private app/API surfaces are disallowed for every crawler.
 *
 * Crawl directives are advisory; request rejection is enforced separately in
 * `frontend/proxy.ts` (which welcomes AI crawlers on public paths and 403s them
 * on the private `(app)` shell and `/api/*`).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Interactive coding agents must never reach any surface.
        userAgent: [...BLOCKED_AI_AGENTS],
        disallow: "/",
      },
      {
        // AI search / index crawlers: welcome on public pages, closed on private.
        userAgent: [...AI_SEARCH_CRAWLERS],
        allow: "/",
        disallow: ["/api/", "/owner/", "/controller/", "/admin/"],
      },
      {
        userAgent: "*",
        allow: "/",
        // Crawl-noise reduction only: machine surfaces and private consoles.
        disallow: ["/api/", "/owner/", "/controller/", "/admin/"],
      },
    ],
    sitemap: "https://harindrasah.com.np/sitemap.xml",
    host: "https://harindrasah.com.np",
  };
}