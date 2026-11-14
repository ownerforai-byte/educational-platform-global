import { describe, expect, it } from "vitest";
import { isR2ObjectMissingError } from "../../src/storage/r2";

describe("isR2ObjectMissingError", () => {
  it("treats NoSuchKey / NotFound / 404 as missing", () => {
    expect(isR2ObjectMissingError({ name: "NoSuchKey" })).toBe(true);
    expect(isR2ObjectMissingError({ Code: "NoSuchKey" })).toBe(true);
    expect(isR2ObjectMissingError({ name: "NotFound", $metadata: { httpStatusCode: 404 } })).toBe(true);
    expect(isR2ObjectMissingError({ $metadata: { httpStatusCode: 404 } })).toBe(true);
  });

  it("does not swallow bucket or credential failures", () => {
    expect(isR2ObjectMissingError({ name: "NoSuchBucket", $metadata: { httpStatusCode: 404 } })).toBe(false);
    expect(isR2ObjectMissingError({ name: "AccessDenied", $metadata: { httpStatusCode: 403 } })).toBe(false);
    expect(isR2ObjectMissingError(new Error("network"))).toBe(false);
    expect(isR2ObjectMissingError(null)).toBe(false);
  });
});
