/**
 * Canonical platform identity for automated community replies.
 * Keep `backend/src/lib/community-bot.ts` in sync (backend rootDir cannot import here).
 */

/** Stable Firebase-style uid used as `author_id` on bot comments. */
export const COMMUNITY_BOT_ID = "rn-study-assistant";

export const COMMUNITY_BOT_USERNAME = "community-bot";

export const COMMUNITY_BOT_DISPLAY_NAME = "Community bot";

/** Static asset served from `frontend/public/avatars/community-bot.svg`. */
export const COMMUNITY_BOT_AVATAR_URL = "/avatars/community-bot.svg";

/**
 * Stored on `profiles.avatar_path` — resolved to {@link COMMUNITY_BOT_AVATAR_URL}
 * by the profile media URL helper (no R2 object).
 */
export const COMMUNITY_BOT_AVATAR_PATH = "platform/community-bot.svg";

export function isCommunityBotId(id: string): boolean {
  return id === COMMUNITY_BOT_ID;
}
