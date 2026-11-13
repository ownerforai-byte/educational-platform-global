import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "My community posts",
};

export default function MyCommunityPostsPage() {
  return <CommunityBoard view="mine" />;
}
