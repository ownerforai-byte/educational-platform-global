import type { Metadata } from "next";
import { Suspense } from "react";
import { CommunityBoard } from "@/features/community/community-board";
import { CommunityLoading } from "@/features/community/community-helpers";

export const metadata: Metadata = {
  title: "Community post",
};

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<CommunityLoading />}>
      <CommunityBoard view="post" id={id} />
    </Suspense>
  );
}
