import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "New community post",
};

export default function NewCommunityPostPage() {
  return <CommunityBoard view="new" />;
}
