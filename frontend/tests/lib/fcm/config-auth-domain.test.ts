import { describe, expect, it } from "vitest";
import { resolveAuthDomain } from "@/lib/fcm/config";

describe("resolveAuthDomain", () => {
  it("falls back to *.firebaseapp.com on localhost (vitest/jsdom)", () => {
    expect(resolveAuthDomain("auth.example.com", "proj")).toBe("proj.firebaseapp.com");
  });
});