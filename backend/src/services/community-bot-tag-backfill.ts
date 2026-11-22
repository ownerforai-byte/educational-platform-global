import {
  communityPostHasBotComment,
  listRecentCommunityPostsForBotBackfill,
} from "../db/repositories/community-feed.repository.js";
import { COMMUNITY_BOT_ID, ensureCommunityBotProfile, mentionsCommunityBot } from "../lib/community-bot.js";

export type TaggedPostStub = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: string;
};

/**
 * Replays {@link publishTaggedBotReply} for posts that mention the bot but have
 * no bot comment yet (batch job for cron / owner maintenance).
 */
export async function runTaggedBotReplyBackfill(
  publish: (row: TaggedPostStub, approvedBy: string) => Promise<void>,
  opts: { limit?: number } = {},
): Promise<{ scanned: number; replied: number; skipped: number }> {
  const limit = Math.min(Math.max(opts.limit ?? 40, 1), 200);
  await ensureCommunityBotProfile();

  const { data: posts, error } = await listRecentCommunityPostsForBotBackfill(limit * 3);

  if (error || !posts?.length) {
    return { scanned: 0, replied: 0, skipped: 0 };
  }

  let scanned = 0;
  let replied = 0;
  let skipped = 0;

  for (const row of posts as TaggedPostStub[]) {
    if (replied >= limit) break;
    if (!mentionsCommunityBot(`${row.title}\n${row.body}`)) continue;
    scanned += 1;
    if (await communityPostHasBotComment(row.id, COMMUNITY_BOT_ID)) {
      skipped += 1;
      continue;
    }
    await publish(row, row.author_id);
    replied += 1;
  }

  return { scanned, replied, skipped };
}