import { describe, it, expect } from "vitest";
import { atLeast, canAccessAdminPanel, canAccessController, canManageContent, ROLE_RANK } from "@/lib/auth/roles";

describe("RBAC roles", () => {
  it("ranks roles correctly", () => {
    expect(ROLE_RANK.STUDENT).toBe(0);
    expect(ROLE_RANK.TEACHER).toBe(1);
    expect(ROLE_RANK.ADMIN).toBe(2);
    expect(ROLE_RANK.OWNER).toBe(3);
  });

  it("atLeast returns true for equal or higher rank", () => {
    expect(atLeast("TEACHER", "STUDENT")).toBe(true);
    expect(atLeast("ADMIN", "TEACHER")).toBe(true);
    expect(atLeast("OWNER", "ADMIN")).toBe(true);
    expect(atLeast("STUDENT", "TEACHER")).toBe(false);
  });

  it("canAccessAdminPanel allows ADMIN and OWNER", () => {
    expect(canAccessAdminPanel("ADMIN")).toBe(true);
    expect(canAccessAdminPanel("OWNER")).toBe(true);
    expect(canAccessAdminPanel("TEACHER")).toBe(false);
    expect(canAccessAdminPanel("STUDENT")).toBe(false);
    expect(canAccessAdminPanel(null)).toBe(false);
  });

  it("canAccessController allows ADMIN and OWNER", () => {
    expect(canAccessController("ADMIN")).toBe(true);
    expect(canAccessController("OWNER")).toBe(true);
    expect(canAccessController("TEACHER")).toBe(false);
    expect(canAccessController("STUDENT")).toBe(false);
    expect(canAccessController(undefined)).toBe(false);
  });

  it("canManageContent allows TEACHER, ADMIN, OWNER", () => {
    expect(canManageContent("TEACHER")).toBe(true);
    expect(canManageContent("ADMIN")).toBe(true);
    expect(canManageContent("OWNER")).toBe(true);
    expect(canManageContent("STUDENT")).toBe(false);
  });
});
