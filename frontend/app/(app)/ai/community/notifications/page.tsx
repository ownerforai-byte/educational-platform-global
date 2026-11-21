import type { Metadata } from "next";
import { CommunityBoard } from "@/features/community/community-board";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Likes, replies, follows, and other community activity.",
};

export default function CommunityNotificationsPage() {
  return <CommunityBoard view="notifications" />;
}