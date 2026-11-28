import { describe, expect, test } from "vitest";
import {
  canonicalContentIdentity,
  canonicalRouteModuleKey,
  canUnlockModule,
  tierForUser,
} from "../../src/utils/sectionAccess";

const none = async () => ({});

describe("canUnlockModule (spark unlock tier check)", () => {
  test("member is refused /srs (plus) and /mock-exams (pro)", async () => {
    const member = { role: "member", plan: "member" };
    expect(await canUnlockModule(member, false, "route:/srs", none)).toBe(false);
    expect(await canUnlockModule(member, false, "route:/mock-exams", none)).toBe(false);
  });

  test("plus opens /srs but not /mock-exams", async () => {
    const plus = { role: "member", plan: "plus" };
    expect(await canUnlockModule(plus, false, "route:/srs", none)).toBe(true);
    expect(await canUnlockModule(plus, false, "route:/mock-exams", none)).toBe(false);
  });

  test("pro and owner open everything", async () => {
    expect(await canUnlockModule({ plan: "pro" }, false, "route:/mock-exams", none)).toBe(true);
    expect(await canUnlockModule({ plan: "plus" }, false, "route:/downloads", none)).toBe(true);
    expect(await canUnlockModule({}, true, "route:/mock-exams", none)).toBe(true);
  });

  test("owner overrides move the rung", async () => {
    const member = { plan: "member" };
    expect(await canUnlockModule(member, false, "route:/srs", async () => ({ srs: "member" }))).toBe(true);
    expect(await canUnlockModule({ plan: "plus" }, false, "route:/srs", async () => ({ srs: "owner" }))).toBe(false);
  });

  test("ungated routes remain allowed, but malformed keys fail closed", async () => {
    expect(await canUnlockModule({}, false, "route:/notes", none)).toBe(true);
    expect(await canUnlockModule({}, false, undefined, none)).toBe(false);
    expect(await canUnlockModule({}, false, "note:class-11/physics/u/n.json", none)).toBe(false);
  });

  test("tierForUser", () => {
    expect(tierForUser({ plan: "plus" }, false)).toBe("plus");
    expect(tierForUser({}, false)).toBe("member");
  });
});

describe("canonical unlock identities", () => {
  const target = {
    kind: "concepts" as const,
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug: "kinematics",
    filename: "motion.json",
  };

  test("class aliases resolve to the same physical content", () => {
    const canonical = canonicalContentIdentity(target);
    expect(canonical?.relativePath).toBe("notes/concepts/class-11/physics/kinematics/motion.json");
    expect(canonicalContentIdentity({ ...target, classSlug: "class-11" })?.key).toBe(canonical?.key);
    expect(canonicalContentIdentity({ ...target, kind: "theory" })?.key).not.toBe(canonical?.key);
  });

  test("rejects traversal and malformed content coordinates", () => {
    expect(canonicalContentIdentity({ ...target, filename: "../motion.json" })).toBeNull();
    expect(canonicalContentIdentity({ ...target, subjectSlug: "../physics" })).toBeNull();
    expect(canonicalContentIdentity({ ...target, classSlug: "class-13" })).toBeNull();
  });

  test("canonicalizes internal routes and rejects external or malformed routes", () => {
    expect(canonicalRouteModuleKey("/srs?tab=one")).toBe("route:/srs");
    expect(canonicalRouteModuleKey("route:/pdfs/read")).toBe("route:/pdfs");
    expect(canonicalRouteModuleKey("https://example.test/srs")).toBeNull();
    expect(canonicalRouteModuleKey("/srs/../mock-exams")).toBeNull();
    expect(canonicalRouteModuleKey("/srs/%2e%2e/mock-exams")).toBeNull();
    expect(canonicalRouteModuleKey("/srs/%2fmock-exams")).toBeNull();
    expect(canonicalRouteModuleKey("/srs/%zz")).toBeNull();
  });
});
