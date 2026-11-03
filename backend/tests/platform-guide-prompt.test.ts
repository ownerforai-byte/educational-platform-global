import { describe, expect, it } from "vitest";
import {
  PLATFORM_GUIDE_SYSTEM_PROMPT,
  clampReplyWords,
  quoteQuestion,
} from "../src/ai/platform-guide-prompt";

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

describe("platform guide scope", () => {
  it("answers the question asked instead of refusing it", () => {
    // Owner change 2026-11-03: any question gets a generic answer on its own
    // terms; refusing the topic is what the prompt must no longer do.
    expect(PLATFORM_GUIDE_SYSTEM_PROMPT).not.toMatch(/Answer ONLY about this platform/i);
    expect(PLATFORM_GUIDE_SYSTEM_PROMPT).toMatch(/answer WHATEVER you are asked/i);
    expect(PLATFORM_GUIDE_SYSTEM_PROMPT).toMatch(/full step-by-step help and practice live inside Veer/i);
  });

  it("quotes the question so a fallback reply still refers to it", () => {
    expect(quoteQuestion("what is Newton's second law?")).toBe("what is Newton's second law");
    expect(quoteQuestion("one two three four five six seven eight nine ten")).toBe(
      "one two three four five six seven eight…",
    );
    expect(quoteQuestion("   ")).toBe("your question");
  });
});
