import type { MetadataRoute } from "next";

/**
 * robots.txt (C-L1 of the pre-deploy security pass). Every page is public to
 * crawlers; the account surfaces are already gated at the API, and robots.txt
 * is politeness, not a security control — do not rely on the disallows below
 * to hide anything.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Crawl-noise reduction only: machine surfaces and private consoles.
        disallow: ["/api/", "/owner/", "/controller/"],
      },
    ],
  };
}