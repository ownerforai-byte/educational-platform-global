import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { packDocPages, type DocPagerItem } from "@/features/docs/doc-pager";
import { TopicDocView } from "@/features/docs/doc-view";

/**
 * Owner request (paged Docs Viewer): the common page renderer must pack
 * content blocks into fixed-height pages — a block that does not fit moves to
 * the next page, and a heading (keepWithNext) is never stranded at the bottom
 * of a page.
 */
describe("packDocPages", () => {
  const item = (key: string, keepWithNext = false): DocPagerItem => ({
    key,
    keepWithNext,
    node: null,
  });

  it("moves a block that does not fit to the next page", () => {
    const items = [item("a"), item("b"), item("c")];
    const pages = packDocPages(items, [600, 600, 200], 1000);
    expect(pages).toEqual([[0], [1, 2]]);
  });

  it("fills a page up to the budget before breaking", () => {
    const items = [item("a"), item("b"), item("c")];
    const pages = packDocPages(items, [400, 400, 400], 1000);
    expect(pages).toEqual([[0, 1], [2]]);
  });

  it("never leaves a keepWithNext heading at the bottom of a page", () => {
    const items = [item("a"), item("heading", true), item("c")];
    const pages = packDocPages(items, [900, 80, 300], 1000);
    // The heading fits after "a", but "c" does not — so the heading moves to
    // the next page and opens it together with "c".
    expect(pages).toEqual([[0], [1, 2]]);
  });

  it("keeps a chained heading + label + first block together", () => {
    const items = [
      item("a"),
      item("h1", true),
      item("h2", true),
      item("body"),
    ];
    const pages = packDocPages(items, [950, 60, 60, 200], 1000);
    expect(pages).toEqual([[0], [1, 2, 3]]);
  });

  it("gives an oversized single item its own page instead of looping", () => {
    const items = [item("big"), item("b")];
    const pages = packDocPages(items, [5000, 100], 1000);
    expect(pages).toEqual([[0], [1]]);
  });

  it("returns one page when everything fits", () => {
    const items = [item("a"), item("b")];
    expect(packDocPages(items, [100, 100], 1000)).toEqual([[0, 1]]);
  });
});

describe("TopicDocView paginated render", () => {
  const baseProps = {
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitId: "kinematics",
    topicSlug: "projectile-motion-and-its-applications",
    topicTitle: "Projectile motion and its applications",
  };

  it("renders every section as stacked book pages with a folio (jsdom: one page)", () => {
    const { container } = render(
      <TopicDocView
        {...baseProps}
        data={{
          summary: "Motion under gravity alone.",
          notes: ["**Projectile:** an object thrown into space under gravity."],
          keyPoints: ["Range depends on launch angle."],
          formulas: ["$R = \\frac{u^2 \\sin 2\\theta}{g}$"],
          practiceQuestions: ["Derive the range formula."],
        }}
      />,
    );

    // The article shell and all six section anchors survive the refactor.
    expect(container.querySelector("article.doc-view")).toBeTruthy();
    for (const id of ["doc-map", "doc-overview", "doc-explain", "doc-remember", "doc-practice"]) {
      expect(container.querySelector(`section#${id}`)).toBeTruthy();
    }

    // In jsdom every measured height is 0, so all blocks fit on one paper
    // sheet: a thin-bordered page with a book folio at its foot.
    const sheet = container.querySelector("[data-doc-page='1']");
    expect(sheet).toBeTruthy();
    expect(sheet?.className).toContain("border");
    expect(screen.getByText(/Page 1 of 1/)).toBeTruthy();

    // The old single-page reader controls are gone — the book is bound
    // vertically and read by scrolling.
    expect(container.querySelector("nav[aria-label='Document pages']")).toBeNull();
  });
});
