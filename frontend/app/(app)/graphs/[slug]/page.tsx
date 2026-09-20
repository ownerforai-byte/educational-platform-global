import { notFound } from "next/navigation";
import { getGraphBySlug, ALL_GRAPHS } from "@/lib/graphs";
import { GraphDetailView } from "@/components/graphs/graph-detail-view";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGraphBySlug(slug);
  if (!g) return { title: "Graph not found" };
  return { title: `${g.name} — Graph Bank`, description: g.basis };
}

export default async function GraphDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGraphBySlug(slug);
  if (!g) notFound();

  const idx = ALL_GRAPHS.findIndex((x) => x.id === g.id);
  const prev = idx > 0 ? ALL_GRAPHS[idx - 1] : undefined;
  const next = idx < ALL_GRAPHS.length - 1 ? ALL_GRAPHS[idx + 1] : undefined;

  return <GraphDetailView g={g} prev={prev} next={next} />;
}
