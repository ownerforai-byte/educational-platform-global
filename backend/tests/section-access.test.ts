import { describe, expect, test } from "vitest";
import { canUnlockModule, tierForUser } from "../src/utils/sectionAccess";

const none = async () => ({});

describe("canUnlockModule (spark unlock tier check)", () => {
  test("member is refused /srs (plus) and /mock-exams (pro)", async () => {
    const member = { role: "member", plan: "member" };
    expect(await canUnlockModule(member, false, "route:/srs", none)).toBe(false);
    expect(await canUnlockModule(member, false, "route:/mock-exams", none)).toBe(false);
  });

  test("plus opens /srs but not /downloads", async () => {
    const plus = { role: "member", plan: "plus" };
    expect(await canUnlockModule(plus, false, "route:/srs", none)).toBe(true);
    expect(await canUnlockModule(plus, false, "route:/downloads", none)).toBe(false);
  });

  test("pro and owner open everything", async () => {
    expect(await canUnlockModule({ plan: "pro" }, false, "route:/mock-exams", none)).toBe(true);
    expect(await canUnlockModule({ premiumStatus: true }, false, "route:/downloads", none)).toBe(true);
    expect(await canUnlockModule({}, true, "route:/mock-exams", none)).toBe(true);
  });

  test("owner overrides move the rung", async () => {
    const member = { plan: "member" };
    expect(await canUnlockModule(member, false, "route:/srs", async () => ({ srs: "member" }))).toBe(true);
    expect(await canUnlockModule({ plan: "plus" }, false, "route:/srs", async () => ({ srs: "owner" }))).toBe(false);
  });

  test("keys that map to no gated section are always allowed", async () => {
    expect(await canUnlockModule({}, false, "route:/notes", none)).toBe(true);
    expect(await canUnlockModule({}, false, undefined, none)).toBe(true);
  });

  test("tierForUser", () => {
    expect(tierForUser({ plan: "plus" }, false)).toBe("plus");
    expect(tierForUser({}, false)).toBe("member");
  });
});
