import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "Edit community post",
};

export default async function EditCommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CommunityBoard view="edit" id={id} />;
}
