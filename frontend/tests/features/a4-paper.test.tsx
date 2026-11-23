import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TopicDocView } from "@/features/docs/doc-view";

/**
 * Owner request (A4 paper Docs Viewer): the document must read like a real
 * printout — ONE continuous A4-proportioned paper sheet on a desk surface,
 * all content flowing on it like a book. No chunked page sheets, no page
 * folios, no card backgrounds.
 */
describe("TopicDocView A4 paper render", () => {
  const baseProps = {
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitId: "kinematics",
    topicSlug: "projectile-motion-and-its-applications",
    topicTitle: "Projectile motion and its applications",
  };

  it("renders one continuous A4 sheet with the printed title and every section", () => {
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

    // The article shell and all six section anchors survive the redesign.
    expect(container.querySelector("article.doc-view")).toBeTruthy();
    for (const id of ["doc-map", "doc-overview", "doc-explain", "doc-remember", "doc-practice"]) {
      expect(container.querySelector(`section#${id}`)).toBeTruthy();
    }

    // Exactly one A4 paper sheet carries the whole document.
    const sheets = container.querySelectorAll("[data-a4-paper]");
    expect(sheets).toHaveLength(1);
    const paper = sheets[0] as HTMLElement;
    expect(paper.className).toContain("a4-paper");
    expect(paper.getAttribute("role")).toBe("document");

    // The title is printed on the sheet, like a book's chapter page.
    const printedTitle = paper.querySelector("h1.a4-title");
    expect(printedTitle?.textContent).toContain("Projectile motion");
    expect(screen.getByText(/End of document/)).toBeTruthy();

    // The old paginated pager is gone: no page sheets, no folios.
    expect(container.querySelector("[data-doc-page]")).toBeNull();
    expect(screen.queryByText(/Page 1 of/)).toBeNull();
  });
});
