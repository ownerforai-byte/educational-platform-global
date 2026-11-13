import { describe, expect, it } from "vitest";
import {
  classifyBinaryUpload,
  classifyRealtimeDoc,
  classifyRelational,
} from "../../src/storage/policy";

describe("storage policy", () => {
  it("routes every binary to tier 3 (R2)", () => {
    expect(
      classifyBinaryUpload({
        contentType: "image/png",
        byteLength: 100,
        path: "a.png",
      }),
    ).toBe(3);
    expect(
      classifyBinaryUpload({
        contentType: "application/pdf",
        byteLength: 5_000_000,
        path: "notes.pdf",
      }),
    ).toBe(3);
  });

  it("keeps FCM/session docs on tier 2 and relational on tier 1", () => {
    expect(classifyRealtimeDoc("fcm_token")).toBe(2);
    expect(classifyRelational("profile")).toBe(1);
  });
});
