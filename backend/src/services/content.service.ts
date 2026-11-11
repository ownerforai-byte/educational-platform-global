import { getAdminClient } from "../db/repositories/base.repository.js";
import { countCompletedTopics } from "../db/repositories/progress.repository.js";

export async function getActiveChapterBySlug(slug: string) {
  return getAdminClient()
    .from("chapters")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
}

export async function listActiveTopicsForChapter(chapterId: string) {
  return getAdminClient()
    .from("topics")
    .select("*")
    .eq("chapter_id", chapterId)
    .eq("is_active", true)
    .order("order", { ascending: true });
}

export async function completedTopicCount(userId: string, topicIds: string[]): Promise<number> {
  if (topicIds.length === 0) return 0;
  return countCompletedTopics(userId, topicIds);
}
