import type { MetadataRoute } from "next";
import { PLATFORM_SITE_URL } from "@/lib/ai/prompts";
import { SYLLABUS, getUnitTopicEntries } from "@/lib/core/syllabus";

/**
 * /sitemap.xml — the machine-readable map of everything a crawler should
 * index. The human page (/sitemap-page) and the route registry (/site-index)
 * already exist; this is the artifact robots.ts points crawlers at.
 *
 * Built from the same canonical syllabus the pages are generated from, so a
 * topic page cannot exist without appearing here (and vice versa — a removed
 * topic drops out on the next deploy).
 */

const BASE = (PLATFORM_SITE_URL || "").replace(/\/+$/, "");

/** Marketing / hub routes worth indexing (auth-gated pages are omitted). */
const HUB_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/home", priority: 0.9 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/what-it-has", priority: 0.8 },
  { path: "/features", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/class-11-notes", priority: 0.9 },
  { path: "/class-12-notes", priority: 0.9 },
  { path: "/syllabus", priority: 0.8 },
  { path: "/formulas", priority: 0.8 },
  { path: "/theorems", priority: 0.7 },
  { path: "/derivations", priority: 0.7 },
  { path: "/exams", priority: 0.8 },
  { path: "/exams/neb", priority: 0.8 },
  { path: "/exams/cee", priority: 0.8 },
  { path: "/exams/ioe", priority: 0.8 },
  { path: "/blog", priority: 0.6 },
  { path: "/official-sources", priority: 0.6 },
  { path: "/help", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const hubs: MetadataRoute.Sitemap = HUB_ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));

  // Subject → chapter → topic pages, straight from the syllabus registry.
  const corpus: MetadataRoute.Sitemap = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      corpus.push({
        url: `${BASE}/${cls.slug}/${subject.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const unit of subject.units) {
        corpus.push({
          url: `${BASE}/${cls.slug}/${subject.slug}/chapters/${unit.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
        for (const topic of getUnitTopicEntries(unit)) {
          corpus.push({
            url: `${BASE}/${cls.slug}/${subject.slug}/chapters/${unit.id}/topics/${topic.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  }

  return [...hubs, ...corpus];
}
