import { randomUUID } from "node:crypto";
import {
  deleteCommunityFeedPostsByAuthor,
  insertCommunityFeedPost,
} from "../db/repositories/community-feed.repository.js";
import { COMMUNITY_BOT_ID, ensureCommunityBotProfile } from "../lib/community-bot.js";
import {
  fetchDailyNatureImage,
  formatNaturePostMarkdown,
  natureSceneForUtcDay,
} from "./community-bot-nature-image.js";

async function insertBotPost(opts: {
  title: string;
  body: string;
  category: string;
  visibility: "public" | "profile_only";
}): Promise<{ ok: true; id: string } | { ok: false; reason: string }> {
  await ensureCommunityBotProfile();
  const now = new Date().toISOString();
  const id = randomUUID();
  const { error } = await insertCommunityFeedPost({
    id,
    author_id: COMMUNITY_BOT_ID,
    title: opts.title,
    body: opts.body,
    category: opts.category,
    visibility: opts.visibility,
    created_at: now,
    updated_at: now,
  });
  if (error) return { ok: false, reason: error.message };
  return { ok: true, id };
}

export type DailyPublicPostResult =
  | { ok: false; reason: string }
  | {
      ok: true;
      id: string;
      deletedPrior: number | null;
      imageFromGoogle: boolean;
    };

/**
 * Once per day: wipe prior bot-authored feed posts, publish one public nature
 * vibe with a Google Custom Search photo (or local SVG fallback).
 */
export async function runCommunityBotDailyPublicPost(now = new Date()): Promise<DailyPublicPostResult> {
  await ensureCommunityBotProfile();
  const { error: purgeError, deleted } = await deleteCommunityFeedPostsByAuthor(COMMUNITY_BOT_ID);
  if (purgeError) return { ok: false, reason: purgeError.message };

  const scene = natureSceneForUtcDay(now);
  const image = await fetchDailyNatureImage(scene);
  const body = formatNaturePostMarkdown(scene, image);

  const inserted = await insertBotPost({
    title: scene.title,
    body,
    category: scene.category,
    visibility: "public",
  });
  if (!inserted.ok) return inserted;

  return {
    ok: true,
    id: inserted.id,
    deletedPrior: deleted,
    imageFromGoogle: Boolean(image),
  };
}

/** Profile timeline posts are disabled — only the daily public nature post ships. */
export async function runCommunityBotProfileDiscoveryPost() {
  return { ok: true as const, skipped: true, reason: "profile_discovery_disabled" };
}