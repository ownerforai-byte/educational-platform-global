import type { CommunityCategory } from "@/lib/api/community-feed";
import type { CommunitySpace } from "@/lib/community";

const CATEGORY_IDS = new Set([
  "general",
  "physics",
  "chemistry",
  "biology",
  "mathematics",
  "english",
  "nepali",
]);

/** Map a syllabus study space to the public feed subject category. */
export function feedCategoryForSpace(space: CommunitySpace): CommunityCategory {
  const slug = space.subjectSlug.toLowerCase();
  return CATEGORY_IDS.has(slug) ? (slug as CommunityCategory) : "general";
}

export function publicFeedHrefForSpace(space: CommunitySpace, kind?: string): string {
  const params = new URLSearchParams();
  params.set("category", feedCategoryForSpace(space));
  if (kind) params.set("kind", kind);
  return `/ai/community?${params.toString()}`;
}