import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DirectStreamPdfBlocks } from "@/components/content/direct-stream-pdf-blocks";
import type { ChapterStreamPdf } from "@/lib/chapter-resources";

afterEach(cleanup);

const makePdfs = (count: number): ChapterStreamPdf[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `doc-${index}`,
    title: `Chapter document ${index + 1}`,
    src: `/pdfs/doc-${index}.pdf`,
    sourceLabel: "Platform document",
    scope: "chapter" as const,
    source: "platform" as const,
  }));

describe("DirectStreamPdfBlocks", () => {
  /**
   * IMPORTANT — owner request 2026-11-08: block count follows the real doc/PDF
   * count for the chapter. There is deliberately NO fixed two-block cap.
   * Sources are disabled right now, so this test feeds synthetic entries to
   * prove the retained renderer still scales when they are switched back on.
   */
  it.each([1, 2, 3, 5, 8])("renders one large stream block per document (%i docs)", (count) => {
    render(<DirectStreamPdfBlocks pdfs={makePdfs(count)} unitTitle="Kinematics" />);

    const frames = screen.getAllByTitle(/Chapter document/).filter((el) => el.tagName === "IFRAME");
    expect(frames).toHaveLength(count);
    for (const frame of frames) {
      expect(frame.getAttribute("src")).toBeTruthy();
      expect(frame.getAttribute("loading")).toBe("lazy");
      // Large, full-width rectangular blocks — not the small h-72 card previews.
      expect(frame.className).toContain("w-full");
      expect(frame.className).toMatch(/min-h-\[480px\]/);
    }

    expect(screen.getByText("Direct stream")).toBeInTheDocument();
    expect(screen.getByText(/no download/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${count} streams?`))).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /download/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /download/i })).toBeNull();
  });

  it("renders nothing when a chapter has no stream sources", () => {
    const { container } = render(<DirectStreamPdfBlocks pdfs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
