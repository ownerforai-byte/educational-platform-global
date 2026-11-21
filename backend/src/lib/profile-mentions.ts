import { COMMUNITY_BOT_USERNAME } from "./community-bot.js";

const MENTION_RE = /(?:^|[^\w@])@([a-zA-Z0-9_][a-zA-Z0-9_.-]{1,30})\b/g;

/** Usernames @mentioned in post/comment text (excludes the community bot handle). */
export function extractMentionUsernames(text: string): string[] {
  const found = new Set<string>();
  for (const match of text.matchAll(MENTION_RE)) {
    const raw = match[1]?.trim().toLowerCase();
    if (!raw || raw === COMMUNITY_BOT_USERNAME.toLowerCase()) continue;
    found.add(raw);
  }
  return [...found];
}