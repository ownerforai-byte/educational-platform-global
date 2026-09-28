import { describe, it, expect } from "vitest";
import { isNavItemActive } from "@/lib/nav-active";

/**
 * The nav highlight used to be a bare `pathname.startsWith(href)`, which lit up
 * "/ai" while standing on "/ai-quiz" and made sibling tools look like the same
 * destination. A link now owns whole segments only.
 */
describe("isNavItemActive", () => {
  it("matches the exact route", () => {
    expect(isNavItemActive("/ai", "/ai")).toBe(true);
    expect(isNavItemActive("/ai-quiz", "/ai-quiz")).toBe(true);
    expect(isNavItemActive("/", "/")).toBe(true);
  });

  it("matches child routes of the same segment", () => {
    expect(isNavItemActive("/ai/tutor", "/ai")).toBe(true);
    expect(isNavItemActive("/ai/search", "/ai")).toBe(true);
    expect(isNavItemActive("/class-11-notes/physics/theory", "/class-11-notes")).toBe(
      true,
    );
    expect(isNavItemActive("/lab/3d", "/lab")).toBe(true);
  });

  it("never matches a sibling route that merely shares a prefix", () => {
    expect(isNavItemActive("/ai-quiz", "/ai")).toBe(false);
    expect(isNavItemActive("/ai/quiz", "/ai-quiz")).toBe(false);
    expect(isNavItemActive("/class-12-notes", "/class-11-notes")).toBe(false);
    expect(isNavItemActive("/graphs-of-something", "/graphs")).toBe(false);
  });

  it("does not treat every route as home", () => {
    expect(isNavItemActive("/home", "/")).toBe(false);
    expect(isNavItemActive("/ai", "/")).toBe(false);
  });
});
