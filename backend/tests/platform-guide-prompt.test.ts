import { describe, expect, it } from "vitest";
import { clampReplyWords } from "../src/ai/platform-guide-prompt";

describe("platform guide reply clamp", () => {
  it("truncates beyond 50 words", () => {
    const long = Array.from({ length: 60 }, (_, i) => `w${i}`).join(" ");
    const out = clampReplyWords(long);
    expect(out.split(/\s+/).length).toBeLessThanOrEqual(51);
    expect(out.endsWith("…")).toBe(true);
  });

  it("keeps short replies intact", () => {
    expect(clampReplyWords("Hello platform visitor.")).toBe("Hello platform visitor.");
  });
});
