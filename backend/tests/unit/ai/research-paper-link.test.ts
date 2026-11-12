import { describe, it, expect } from "vitest";
import {
  originalResearchPaperLink,
  shortResearchPaperName,
} from "../../../src/ai/complete-answer";
import type { WebSearchResult } from "../../../src/ai/search-engine";

/**
 * Owner request 2026-11-08: "make the veer chat also add the original research
 * paper link at last for any academic question, simply for any question add
 * link of research paper at last with its short meaningful name".
 */

const paper = (overrides: Partial<WebSearchResult> = {}): WebSearchResult => ({
  title: "Capacitor dielectric research paper",
  link: "https://doi.org/10.1000/capacitor",
  snippet: "Journal article on capacitor dielectrics.",
  displayLink: "doi.org",
  ...overrides,
});

describe("originalResearchPaperLink", () => {
  it("always produces one short-named link, even with no search results", () => {
    const link = originalResearchPaperLink("Explain how a capacitor stores charge");
    expect(link).toContain("**Original research paper:**");
    expect(link).toContain("[capacitor stores charge research papers]");
    expect(link).toContain("https://www.semanticscholar.org/search?q=");
    expect(link.startsWith("\n\n")).toBe(true);
    // Never fabricates a DOI or a paper URL.
    expect(link).not.toContain("doi.org/10.");
    expect(link).not.toContain("arxiv.org/abs/");
  });

  it("uses a VERIFIED paper URL and its short title when one was found", () => {
    const link = originalResearchPaperLink("Explain capacitor", [paper()]);
    expect(link).toContain(
      "[Capacitor dielectric research paper](<https://doi.org/10.1000/capacitor>)",
    );
    expect(link).not.toContain("semanticscholar.org");
  });

  it("ignores insecure or non-paper results and falls back honestly", () => {
    const link = originalResearchPaperLink("What is photosynthesis?", [
      paper({ link: "http://doi.org/10.1000/insecure" }),
      paper({ title: "A blog post", link: "https://example.com/blog" }),
    ]);
    expect(link).toContain("semanticscholar.org/search?q=");
    expect(link).not.toContain("insecure");
    expect(link).not.toContain("example.com");
  });

  it("never returns an empty string, even for an empty question", () => {
    const link = originalResearchPaperLink("");
    expect(link).toContain("**Original research paper:**");
    expect(link).toContain("https://www.semanticscholar.org/search?q=");
  });

  it("escapes parentheses in verified paper URLs", () => {
    const link = originalResearchPaperLink("capacitor", [
      paper({ link: "https://arxiv.org/abs/2401.01234(v2)" }),
    ]);
    expect(link).toContain("%28");
    expect(link).toContain("%29");
  });
});

describe("shortResearchPaperName", () => {
  it("drops question words and keeps a short meaningful topic", () => {
    expect(shortResearchPaperName("Explain how a capacitor stores charge")).toBe(
      "capacitor stores charge",
    );
    expect(shortResearchPaperName("What is photosynthesis?")).toBe("photosynthesis");
  });

  it("strips markdown-breaking characters and caps the length", () => {
    const name = shortResearchPaperName(
      "[Very long] **paper** about `many` complicated (things) that go on and on and on",
    );
    expect(name.length).toBeLessThanOrEqual(48);
    expect(name).not.toMatch(/[\[\]<>`*_()]/);
  });

  it("falls back to a generic name for empty input", () => {
    expect(shortResearchPaperName("")).toBe("Research papers");
  });
});
