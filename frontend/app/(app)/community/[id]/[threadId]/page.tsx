import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Discussion Thread", description: "Community discussion thread." };

/**
 * `/community/<space>/<thread>`.
 *
 * The segment is named `id` (not `subjectId`) because Next.js forbids two
 * different dynamic slug names at the same path level — `community/[id]` already
 * owns that position for the space page. Both URL shapes keep working:
 *   /community/<space>          → community/[id]/page.tsx
 *   /community/<space>/<thread> → this page
 */
export default async function ThreadPage({ params }: { params: Promise<{ id: string; threadId: string }> }) {
  const { id, threadId: _ } = await params;
  return (
    <UnderDevelopment
      title="Discussion Thread"
      description="Peer discussion threads with answers, upvotes and Veer AI replies — coming soon."
      backHref={`/community/${id}`}
      backLabel="Back to Community"
    />
  );
}
