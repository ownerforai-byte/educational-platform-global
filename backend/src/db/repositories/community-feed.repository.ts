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

/** Removes every feed post by author (likes, comments, saves cascade in DB). */
export async function deleteCommunityFeedPostsByAuthor(
  authorId: string,
): Promise<{ error: { message: string } | null; deleted: number | null }> {
  const { error, count } = await getAdminClient()
    .from("community_feed_posts")
    .delete({ count: "exact" })
    .eq("author_id", authorId);
  return {
    error: error ? { message: error.message ?? "delete failed" } : null,
    deleted: count ?? null,
  };
}