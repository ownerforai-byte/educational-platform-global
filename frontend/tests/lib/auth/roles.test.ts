import { describe, it, expect } from "vitest";
import {
  atLeast,
  canAccessAdminPanel,
  canAccessController,
  canManageContent,
  ROLE_RANK,
} from "@/lib/auth/roles";
import { ACCESS_RANK } from "@/lib/access-level";

describe("tier ladder rungs", () => {
  it("ranks the user rungs on the single ladder (lib/access-level.ts)", () => {
    expect(ROLE_RANK.member).toBe(1);
    expect(ROLE_RANK.plus).toBe(2);
    expect(ROLE_RANK.pro).toBe(3);
    expect(ROLE_RANK.owner).toBe(4);
    // ROLE_RANK is a view over ACCESS_RANK — the ladder is defined once.
    expect(ROLE_RANK).toEqual({
      member: ACCESS_RANK.member,
      plus: ACCESS_RANK.plus,
      pro: ACCESS_RANK.pro,
      owner: ACCESS_RANK.owner,
    });
  });

  it("atLeast returns true for equal or higher rung", () => {
    expect(atLeast("plus", "member")).toBe(true);
    expect(atLeast("pro", "plus")).toBe(true);
    expect(atLeast("owner", "pro")).toBe(true);
    expect(atLeast("member", "plus")).toBe(false);
  });

  it("canAccessAdminPanel allows pro and owner", () => {
    expect(canAccessAdminPanel("pro")).toBe(true);
    expect(canAccessAdminPanel("owner")).toBe(true);
    expect(canAccessAdminPanel("plus")).toBe(false);
    expect(canAccessAdminPanel("member")).toBe(false);
    expect(canAccessAdminPanel(null)).toBe(false);
  });

  it("canAccessController allows pro and owner", () => {
    expect(canAccessController("pro")).toBe(true);
    expect(canAccessController("owner")).toBe(true);
    expect(canAccessController("plus")).toBe(false);
    expect(canAccessController("member")).toBe(false);
    expect(canAccessController(undefined)).toBe(false);
  });

  it("canManageContent allows plus, pro and owner", () => {
    expect(canManageContent("plus")).toBe(true);
    expect(canManageContent("pro")).toBe(true);
    expect(canManageContent("owner")).toBe(true);
    expect(canManageContent("member")).toBe(false);
  });
});
