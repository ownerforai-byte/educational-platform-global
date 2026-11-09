import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SubjectPracticePage from "@/app/(app)/practice/[subject]/page";
import PracticePage from "@/app/(app)/practice/page";

/**
 * Wiring check for the solved past papers inside Practice: the year files are
 * read on the server and rendered through the existing `PyqYearCard`, so these
 * tests render the real pages rather than mocking the reader.
 */
describe("practice past papers", () => {
  it("renders the solved past papers for physics", async () => {
    const element = await SubjectPracticePage({
      params: Promise.resolve({ subject: "physics" }),
    });
    const html = renderToStaticMarkup(element);
    expect(html).toContain("Past papers — every question solved");
    expect(html).toContain("NEB Class 11 Physics — 2024");
    expect(html).toContain("solved past questions");
  });

  it("lists solved past questions on the practice hub", async () => {
    const html = renderToStaticMarkup(await PracticePage());
    expect(html).toContain("solved past questions");
    expect(html).toContain("solved</span>");
  });

  it("renders for a subject with no MCQ or writing bank", async () => {
    const element = await SubjectPracticePage({
      params: Promise.resolve({ subject: "biology" }),
    });
    const html = renderToStaticMarkup(element);
    expect(html).toContain("Past papers — every question solved");
  });
});
