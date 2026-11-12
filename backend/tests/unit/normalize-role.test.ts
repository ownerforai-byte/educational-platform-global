import { describe, expect, it } from "vitest";
import { normalizeRole } from "../../src/auth/types";

describe("normalizeRole", () => {
  it("passes ladder values through", () => {
    expect(normalizeRole("member")).toBe("member");
    expect(normalizeRole("plus")).toBe("plus");
    expect(normalizeRole("pro")).toBe("pro");
    expect(normalizeRole("owner")).toBe("owner");
  });

  it("maps learner legacy labels to member — never owner", () => {
    expect(normalizeRole("STUDENT")).toBe("member");
    expect(normalizeRole("student")).toBe("member");
    expect(normalizeRole("TEACHER")).toBe("member");
    expect(normalizeRole("teacher")).toBe("member");
  });

  it("maps ADMIN/OWNER legacy labels to owner", () => {
    expect(normalizeRole("ADMIN")).toBe("owner");
    expect(normalizeRole("OWNER")).toBe("owner");
  });

  it("returns null for unknown values", () => {
    expect(normalizeRole(null)).toBeNull();
    expect(normalizeRole("")).toBeNull();
    expect(normalizeRole("guest")).toBeNull();
  });
});
