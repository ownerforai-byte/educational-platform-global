import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "Community profile",
};

export default async function CommunityPersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CommunityBoard view="person" id={id} />;
}
