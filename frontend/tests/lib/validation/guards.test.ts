import { describe, expect, it } from "vitest";
import {
  ValidationError,
  asArray,
  asBoolean,
  asNumber,
  asOptionalString,
  asRecord,
  asString,
  assertNever,
  clampNumber,
  isEmail,
  isIsoDateString,
  isNonNegativeInteger,
  isNonEmptyString,
  isRecord,
  isSafeRelativePath,
  isSlug,
  isUuid,
  oneOf,
  pickDefined,
  requireNonEmptyString,
  requireSafeRelativePath,
  requireSlug,
  sanitizeSearchTerm,
} from "@/lib/validation/guards";

describe("primitive guards", () => {
  it("validates records and strings", () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isNonEmptyString("  x ")).toBe(true);
    expect(isNonEmptyString("   ")).toBe(false);
  });

  it("validates slugs, uuids, emails and dates", () => {
    expect(isSlug("class-11-notes")).toBe(true);
    expect(isSlug("class_11")).toBe(true);
    expect(isSlug("Class 11")).toBe(false);
    expect(isSlug("-leading")).toBe(false);
    expect(isUuid("7b1c2d3e-4f50-4a6b-8c7d-9e0f1a2b3c4d")).toBe(true);
    expect(isUuid("nope")).toBe(false);
    expect(isEmail("a@b.co")).toBe(true);
    expect(isEmail("a@b")).toBe(false);
    expect(isIsoDateString("2026-09-27T10:15:30.000Z")).toBe(true);
    expect(isIsoDateString("not-a-date")).toBe(false);
    expect(isNonNegativeInteger(3)).toBe(true);
    expect(isNonNegativeInteger(-1)).toBe(false);
  });

  it("rejects unsafe relative paths", () => {
    expect(isSafeRelativePath("physics/unit-1/notes.json")).toBe(true);
    expect(isSafeRelativePath("../../etc/passwd")).toBe(false);
    expect(isSafeRelativePath("a\\b.json")).toBe(false);
    expect(isSafeRelativePath("https://evil.example/x")).toBe(false);
    expect(isSafeRelativePath("bad\u0000name")).toBe(false);
  });

  it("narrows literal unions", () => {
    expect(oneOf("easy", ["easy", "hard"] as const)).toBe(true);
    expect(oneOf("medium", ["easy", "hard"] as const)).toBe(false);
  });
});

describe("coercions", () => {
  it("never throws and always returns a usable value", () => {
    expect(asArray<number>(1)).toEqual([1]);
    expect(asArray(undefined)).toEqual([]);
    expect(asRecord(null)).toEqual({});
    expect(asString(5, "fallback")).toBe("5");
    expect(asString({}, "fallback")).toBe("fallback");
    expect(asOptionalString("  ok  ")).toBe("ok");
    expect(asOptionalString("   ")).toBeUndefined();
    expect(asNumber("42")).toBe(42);
    expect(asNumber("abc", 7)).toBe(7);
    expect(asBoolean("true")).toBe(true);
    expect(asBoolean(0)).toBe(false);
    expect(clampNumber(500, 0, 100)).toBe(100);
    expect(clampNumber("abc", 5, 100)).toBe(5);
  });

  it("picks only defined keys", () => {
    const source = { a: 1, b: undefined, c: 3 } as { a: number; b?: number; c: number };
    expect(pickDefined(source, ["a", "b"] as const)).toEqual({ a: 1 });
    expect(pickDefined<{ a: number }, "a">(undefined, ["a"] as const)).toEqual({});
    expect(pickDefined<{ a: number }, "a">(null, ["a"] as const)).toEqual({});
  });

  it("sanitizes untrusted search text", () => {
    expect(sanitizeSearchTerm("  new\u0000ton   law  ")).toBe("new ton law");
    expect(sanitizeSearchTerm("x".repeat(500), 10)).toHaveLength(10);
    expect(sanitizeSearchTerm(undefined)).toBe("");
  });
});

describe("fail-fast requirements", () => {
  it("throws a ValidationError with the field name", () => {
    expect(requireSlug("physics")).toBe("physics");
    expect(() => requireSlug("Physics", "subjectSlug")).toThrow(ValidationError);

    expect(requireNonEmptyString("  notes  ")).toBe("notes");
    expect(() => requireNonEmptyString("  ", "path")).toThrow(ValidationError);

    expect(requireSafeRelativePath("a/b.json")).toBe("a/b.json");
    expect(() => requireSafeRelativePath("../secret")).toThrow(ValidationError);
  });

  it("catches an unexpected union variant at runtime", () => {
    const unexpected = "nope" as unknown as never;
    expect(() => assertNever(unexpected, "kind")).toThrow(ValidationError);
  });
});
