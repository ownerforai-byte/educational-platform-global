import type { MetadataRoute } from "next";
import { BLOCKED_AI_AGENTS } from "../../backend/src/utils/botPolicy";

// Crawl directives are advisory; request rejection is enforced separately.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [...BLOCKED_AI_AGENTS],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        // Crawl-noise reduction only: machine surfaces and private consoles.
        disallow: ["/api/", "/owner/", "/controller/"],
      },
    ],
  };
}