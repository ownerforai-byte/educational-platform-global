import type { Metadata } from "next";
import { CommunityUnavailable } from "@/features/community/community-helpers";

export const metadata: Metadata = {
  title: "Community post unavailable",
};

export default function CommunityUnavailablePage() {
  return <CommunityUnavailable />;
}
