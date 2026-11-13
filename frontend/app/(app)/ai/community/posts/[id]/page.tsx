import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "Community post",
};

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CommunityBoard view="post" id={id} />;
}
