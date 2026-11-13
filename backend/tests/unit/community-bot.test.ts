import { describe, expect, it } from "vitest";
import { COMMUNITY_BOT_AVATAR_PATH, COMMUNITY_BOT_DISPLAY_NAME, isCommunityBotId } from "../../src/lib/community-bot";
import { profileMediaPublicUrl } from "../../src/services/profile-media-url";

describe("community bot identity", () => {
  it("recognizes the fixed author id", () => {
    expect(isCommunityBotId("rn-study-assistant")).toBe(true);
    expect(isCommunityBotId("other-user")).toBe(false);
  });

  it("maps seeded avatar_path to the static public URL", () => {
    expect(profileMediaPublicUrl(COMMUNITY_BOT_AVATAR_PATH)).toBe("/avatars/community-bot.svg");
  });

  it("uses the canonical display name constant", () => {
    expect(COMMUNITY_BOT_DISPLAY_NAME).toBe("Community bot");
  });
});
