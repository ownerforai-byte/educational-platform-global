import { describe, expect, it } from "vitest";
import { formatPublicErrorRef, resolveErrorNumber, ErrorNumbers } from "../../src/lib/error-numbers.js";

describe("error-numbers", () => {
  it("maps community AI context to a stable catalog number", () => {
    expect(resolveErrorNumber({ context: "community-feed-ai", status: 503 })).toBe(
      ErrorNumbers.COMMUNITY_AI,
    );
  });

  it("formats a unique public ref from catalog number and incident id", () => {
    expect(formatPublicErrorRef(5101, "ab12cd34")).toBe("5101-AB12");
  });
});