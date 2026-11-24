import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The rail shell is an async server component. Pin the Suspense fallback in
 * source the same way the owner-gate test pins <HomeSubjectRails />.
 */
const read = (file: string) => readFileSync(path.resolve(file), "utf8");

const TIER_PAGES = [
  "app/(app)/home/member/page.tsx",
  "app/(app)/home/plus/page.tsx",
  "app/(app)/home/pro/page.tsx",
  "app/(app)/home/owner/page.tsx",
];

describe("home subject rails skeleton", () => {
  it("is a busy rail-shaped fallback with no corpus imports", () => {
    const skeleton = read("components/home/home-subject-rails-skeleton.tsx");
    expect(skeleton).toContain('aria-busy="true"');
    expect(skeleton).toContain("animate-pulse");
    expect(skeleton).not.toContain("home-rails-corpus");
    expect(skeleton).not.toContain("loadHomeRailCorpus");
    expect(skeleton).not.toContain("node:fs");
  });

  it("wraps HomeSubjectRails in Suspense on the owner tier home only", () => {
    const owner = read("app/(app)/home/owner/page.tsx");
    expect(owner).toContain("<HomeSubjectRails />");
    expect(owner).toContain("<Suspense fallback={<HomeSubjectRailsSkeleton />}>");
    expect(owner).toContain("</Suspense>");
    for (const page of ["app/(app)/home/member/page.tsx", "app/(app)/home/plus/page.tsx", "app/(app)/home/pro/page.tsx"]) {
      expect(read(page)).not.toContain("<HomeSubjectRails");
    }
  });

  it("mounts the syllabus bar on the tier shell above the owner-only rails", () => {
    const tierShell = read("components/home/tier-interfaces.tsx");
    expect(tierShell).toContain("<HomeSyllabusProgressBar />");
    expect(tierShell).toContain('tier === "owner" ? rails : null');
    expect(tierShell).not.toMatch(/<SparkGate[\s\S]*?\{rails\}[\s\S]*?<\/SparkGate>/);

    const bar = read("components/home/home-syllabus-progress.tsx");
    expect(bar).toContain("home-syllabus-progress");
    expect(bar).not.toContain("localStorage");
    const css = read("app/globals.css");
    expect(css).toContain(".home-syllabus-progress");
    expect(css).toContain("top: calc(env(safe-area-inset-top, 0px) + 6.75rem)");
    expect(css).toContain("top: 3.5rem");
  });
});
