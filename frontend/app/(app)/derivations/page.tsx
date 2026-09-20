import { getTheoremProofRoutes, getSyllabusTheoremItems } from "@/lib/theorem-topics";
import { DerivationsPageClient, type DerivationTrackCard } from "@/components/derivations/derivations-page-client";

export const metadata = {
  title: "Formula Derivations & Mechanisms Vault — NEB Physics, Chemistry, Biology & Math",
  description:
    "Interactive geometric visualizations, line-by-line algebraic proofs, and official NEB curriculum order derivations across Class 11 and 12 STEM.",
};

export const dynamic = "force-dynamic";

export default async function DerivationsPage() {
  const routes = getTheoremProofRoutes();

  const trackCards: DerivationTrackCard[] = routes.map(({ classSlug, subjectSlug }) => {
    const items = getSyllabusTheoremItems(classSlug, subjectSlug);
    return {
      classSlug,
      subjectSlug,
      total: items.length,
      available: items.filter((i) => i.hasCuratedContent).length,
      units: new Set(items.map((i) => i.unitId)).size,
    };
  });

  return <DerivationsPageClient trackCards={trackCards} />;
}
