import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "Community",
  description: "Public study posts. Guests can read. Verified members can publish.",
};

export default function CommunityPage() {
  return <CommunityBoard view="feed" />;
}
