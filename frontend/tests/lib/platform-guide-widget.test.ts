import { describe, expect, it } from "vitest";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";

describe("platform guide widget visibility", () => {
  it("shows on visitor home paths only when signed out", () => {
    expect(shouldShowPlatformGuideWidget("/home", null)).toBe(true);
    expect(shouldShowPlatformGuideWidget("/", null)).toBe(true);
    expect(shouldShowPlatformGuideWidget("/class-11-notes", null)).toBe(false);
  });

  it("shows on tier home paths when signed in", () => {
    const member = { email: "a@test.com", role: "member" as const };
    expect(shouldShowPlatformGuideWidget("/home/member", member)).toBe(true);
    expect(shouldShowPlatformGuideWidget("/home/pro", { ...member, plan: "pro" })).toBe(true);
    expect(shouldShowPlatformGuideWidget("/home", member)).toBe(false);
  });

  it("hides on chat and ai studio routes", () => {
    expect(shouldShowPlatformGuideWidget("/chat", null)).toBe(false);
    expect(shouldShowPlatformGuideWidget("/ai/math", { email: "a@test.com" })).toBe(false);
  });
});
