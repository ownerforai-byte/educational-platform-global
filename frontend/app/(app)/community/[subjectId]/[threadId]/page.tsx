import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Discussion Thread", description: "Community discussion thread." };

export default async function ThreadPage({ params }: { params: Promise<{ subjectId: string; threadId: string }> }) {
  const { subjectId, threadId: _ } = await params;
  return (
    <UnderDevelopment
      title="Discussion Thread"
      description="Peer discussion threads with answers, upvotes and Veer AI replies — coming soon."
      backHref={`/community/${subjectId}`}
      backLabel="Back to Community"
    />
  );
}
