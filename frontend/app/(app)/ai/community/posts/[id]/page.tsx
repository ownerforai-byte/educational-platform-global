import type { Metadata } from "next";
import { Suspense } from "react";
import { CommunityBoard, CommunityLoading } from "@/features/community/community-board";

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
