import type { Metadata } from "next";
import { CommunityNewPost } from "@/features/community/community-new-post";

export const metadata: Metadata = {
  title: "New community post",
};

export default function NewCommunityPostPage() {
  return <CommunityNewPost />;
}
