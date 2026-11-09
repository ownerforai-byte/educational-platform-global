import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityThreadView } from "@/components/study/community-thread-view";
import { getCommunitySpace } from "@/lib/community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; threadId: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const space = getCommunitySpace(id);
  return {
    title: space ? `Discussion — ${space.subjectName} Community` : "Community Discussion",
    description: `Discussion thread in the ${space?.subjectName ?? "community"} study space.`,
  };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string; threadId: string }>;
}) {
  const { id, threadId } = await params;
  const space = getCommunitySpace(id);
  if (!space) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href={`/community/${id}`} className="hover:text-foreground">
            {space.title}
          </Link>
          {" / "}
          <span className="text-foreground">Discussion</span>
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{space.subjectName} discussion</h1>
      </div>

      <CommunityThreadView spaceId={id} threadId={threadId} spaceName={space.subjectName} />

      <Link
        href={`/community/${id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        Back to Community
      </Link>
    </div>
  );
}
