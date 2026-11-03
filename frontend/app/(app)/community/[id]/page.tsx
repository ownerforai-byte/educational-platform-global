import { notFound } from "next/navigation";
import { CommunitySpaceView } from "@/components/study/community-space-view";
import { getCommunitySpace, listCommunitySpaces } from "@/lib/community";

export function generateStaticParams() {
  return listCommunitySpaces().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = getCommunitySpace(id);
  return {
    title: space ? `${space.title} Community` : "Community Space",
    description: space ? `Study space for ${space.subjectName}, ${space.className}.` : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = getCommunitySpace(id);
  if (!space) notFound();
  return <CommunitySpaceView space={space} />;
}
