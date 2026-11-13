import type { FeedAuthor } from "@/lib/api/community-feed";
import {
  COMMUNITY_BOT_AVATAR_URL,
  COMMUNITY_BOT_DISPLAY_NAME,
  COMMUNITY_BOT_ID,
  COMMUNITY_BOT_USERNAME,
  isCommunityBotId,
} from "@rn/shared/constants";

export {
  COMMUNITY_BOT_AVATAR_URL,
  COMMUNITY_BOT_DISPLAY_NAME,
  COMMUNITY_BOT_ID,
  COMMUNITY_BOT_USERNAME,
};

/** True when `authorId` is the platform community bot. */
export function isCommunityBot(authorId: string): boolean {
  return isCommunityBotId(authorId);
}

export function communityBotAvatarUrl(): string {
  return COMMUNITY_BOT_AVATAR_URL;
}

/** Normalize feed author payloads so bot rows always show canonical name + avatar. */
export function resolveFeedAuthor(author: FeedAuthor): FeedAuthor {
  if (!isCommunityBot(author.id)) return author;
  return {
    ...author,
    fullName: COMMUNITY_BOT_DISPLAY_NAME,
    username: COMMUNITY_BOT_USERNAME,
    avatarUrl: COMMUNITY_BOT_AVATAR_URL,
    role: author.role ?? "assistant",
    plan: author.plan ?? "pro",
  };
}
