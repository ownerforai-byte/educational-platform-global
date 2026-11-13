import { supabaseAdmin } from "../db/supabase";

/**
 * Canonical community bot identity — mirror `packages/shared/src/constants/community-bot.ts`.
 */
export const COMMUNITY_BOT_ID = "rn-study-assistant";

export const COMMUNITY_BOT_USERNAME = "community-bot";

export const COMMUNITY_BOT_DISPLAY_NAME = "Community bot";

export const COMMUNITY_BOT_AVATAR_URL = "/avatars/community-bot.svg";

export const COMMUNITY_BOT_AVATAR_PATH = "platform/community-bot.svg";

export function isCommunityBotId(id: string): boolean {
  return id === COMMUNITY_BOT_ID;
}

/** @deprecated Use {@link isCommunityBotId} */
export const COMMUNITY_ASSISTANT_ID = COMMUNITY_BOT_ID;

/** @deprecated Use {@link ensureCommunityBotProfile} */
export const ensureCommunityAssistantProfile = ensureCommunityBotProfile;

type DbError = { message?: string; code?: string } | null;

function isMissingTable(error: DbError): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

/** Idempotent seed + refresh for the bot profile row used as comment `author_id`. */
export async function ensureCommunityBotProfile(): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", COMMUNITY_BOT_ID)
    .maybeSingle();
  if (error && !isMissingTable(error)) throw error;

  const row = {
    id: COMMUNITY_BOT_ID,
    full_name: COMMUNITY_BOT_DISPLAY_NAME,
    username: COMMUNITY_BOT_USERNAME,
    avatar_path: COMMUNITY_BOT_AVATAR_PATH,
    role: "assistant",
    plan: "pro",
    access_status: "ACTIVE",
    premium_status: false,
  };

  if (data) {
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name: COMMUNITY_BOT_DISPLAY_NAME,
        username: COMMUNITY_BOT_USERNAME,
        avatar_path: COMMUNITY_BOT_AVATAR_PATH,
        role: "assistant",
      })
      .eq("id", COMMUNITY_BOT_ID);
    if (updateError && !isMissingTable(updateError)) {
      const msg = (updateError.message ?? "").toLowerCase();
      if (!msg.includes("duplicate") && !msg.includes("unique")) throw updateError;
    }
    return;
  }

  const { error: insertError } = await supabaseAdmin.from("profiles").insert(row);
  if (insertError && !isMissingTable(insertError)) {
    const msg = (insertError.message ?? "").toLowerCase();
    if (!msg.includes("duplicate") && !msg.includes("unique")) throw insertError;
  }
}

export function communityBotAuthorOverlay(
  id: string,
  profile: { plan?: string | null; role?: string | null } | undefined,
  followingByYou: boolean,
) {
  return {
    id,
    fullName: COMMUNITY_BOT_DISPLAY_NAME,
    username: COMMUNITY_BOT_USERNAME,
    plan: profile?.plan ?? "pro",
    role: profile?.role ?? "assistant",
    avatarUrl: COMMUNITY_BOT_AVATAR_URL,
    followingByYou,
  };
}
