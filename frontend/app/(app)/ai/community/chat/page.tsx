import type { Metadata } from "next";
import { CommunityChat } from "@/features/community/community-chat";

export const metadata: Metadata = {
  title: "Community chat",
  description: "Live Firestore lobby for verified community members.",
};

export default function CommunityChatPage() {
  return <CommunityChat />;
}