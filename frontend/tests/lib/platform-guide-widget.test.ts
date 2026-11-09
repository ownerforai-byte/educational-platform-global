import { describe, expect, it } from "vitest";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";

describe("platform guide widget visibility", () => {
  it("does not float a second launcher for visitors; their chat is on the home", () => {
    expect(shouldShowPlatformGuideWidget("/home", null)).toBe(false);
    expect(shouldShowPlatformGuideWidget("/", null)).toBe(false);
    expect(shouldShowPlatformGuideWidget("/class-11-notes", null)).toBe(false);
  });

  it("shows on tier home paths when signed in", () => {
    const member = { email: "a@test.com", role: "member" as const };
    expect(shouldShowPlatformGuideWidget("/home/member", member)).toBe(true);
    expect(shouldShowPlatformGuideWidget("/home/pro", { ...member, plan: "pro" })).toBe(true);
    // The widget is now shown for every signed-in user on any app page except
    // the full-screen chat/AI surfaces; /home is no longer excluded.
    expect(shouldShowPlatformGuideWidget("/home", member)).toBe(true);
  });

  it("hides on chat and ai studio routes", () => {
    expect(shouldShowPlatformGuideWidget("/chat", null)).toBe(false);
    expect(shouldShowPlatformGuideWidget("/ai/math", { email: "a@test.com" })).toBe(false);
  });
});
