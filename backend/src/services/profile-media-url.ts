import { COMMUNITY_BOT_AVATAR_PATH, COMMUNITY_BOT_AVATAR_URL } from "../lib/community-bot";

/** Public avatar/cover URL — matches profile hub; no storage paths in JSON. */
export function profileMediaPublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const normalized = path.replace(/^\/+/, "");
  if (normalized === COMMUNITY_BOT_AVATAR_PATH) return COMMUNITY_BOT_AVATAR_URL;
  const base = process.env.R2_PUBLIC_BASE_URL?.trim();
  if (base) return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  return `/api/profile/media?path=${encodeURIComponent(path.replace(/^\/+/, ""))}`;
}
