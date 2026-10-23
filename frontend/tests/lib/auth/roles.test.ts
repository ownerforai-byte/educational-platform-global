import { describe, it, expect } from "vitest";
import { atLeast, canAccessAdminPanel, canAccessController, canManageContent, ROLE_RANK } from "@/lib/auth/roles";

describe("RBAC roles", () => {
  it("ranks roles correctly", () => {
    expect(ROLE_RANK.member).toBe(0);
    expect(ROLE_RANK.plus).toBe(1);
    expect(ROLE_RANK.pro).toBe(2);
    expect(ROLE_RANK.owner).toBe(3);
  });

  it("atLeast returns true for equal or higher rank", () => {
    expect(atLeast("plus", "member")).toBe(true);
    expect(atLeast("pro", "plus")).toBe(true);
    expect(atLeast("owner", "pro")).toBe(true);
    expect(atLeast("member", "plus")).toBe(false);
  });

  it("canAccessAdminPanel allows ADMIN and OWNER", () => {
    expect(canAccessAdminPanel("pro")).toBe(true);
    expect(canAccessAdminPanel("owner")).toBe(true);
    expect(canAccessAdminPanel("plus")).toBe(false);
    expect(canAccessAdminPanel("member")).toBe(false);
    expect(canAccessAdminPanel(null)).toBe(false);
  });

  it("canAccessController allows ADMIN and OWNER", () => {
    expect(canAccessController("pro")).toBe(true);
    expect(canAccessController("owner")).toBe(true);
    expect(canAccessController("plus")).toBe(false);
    expect(canAccessController("member")).toBe(false);
    expect(canAccessController(undefined)).toBe(false);
  });

  it("canManageContent allows TEACHER, ADMIN, OWNER", () => {
    expect(canManageContent("plus")).toBe(true);
    expect(canManageContent("pro")).toBe(true);
    expect(canManageContent("owner")).toBe(true);
    expect(canManageContent("member")).toBe(false);
  });
});
