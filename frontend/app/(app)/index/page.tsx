import { buildSiteIndex } from "@/lib/site-index";
import { SiteIndexView } from "@/components/index/site-index-view";

export const metadata = {
  title: "Everything Index — Every Page, Routed From One Head Page",
  description:
    "Complete index of the platform: every lab, graph, derivation, theorem, chapter and reference page, each with a short opening, its name and its link.",
};

/**
 * The head page for the whole platform.
 *
 * It is built from the same registries that drive the real routes (labs,
 * graphs, pro-knowledge chapters, proof tracks, the official syllabus), so a
 * page that exists is always listed here — and the orphaned subject theory
 * routes are reachable from it even before their own hubs link out.
 */
export default function SiteIndexPage() {
  const groups = buildSiteIndex();

  return <SiteIndexView groups={groups} />;
}
