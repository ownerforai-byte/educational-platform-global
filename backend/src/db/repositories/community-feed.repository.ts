import { getAdminClient } from "./base.repository.js";

export type CommunityFeedPostVisibility = "public" | "profile_only";

export async function insertCommunityFeedPost(row: {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: string;
  visibility: CommunityFeedPostVisibility;
  created_at: string;
  updated_at: string;
}): Promise<{ error: { message: string } | null }> {
  const { error } = await getAdminClient().from("community_feed_posts").insert(row);
  return { error: error ? { message: error.message ?? "insert failed" } : null };
}