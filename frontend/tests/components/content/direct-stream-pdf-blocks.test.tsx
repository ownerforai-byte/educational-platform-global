import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DirectStreamPdfBlocks } from "@/components/content/direct-stream-pdf-blocks";
import { getChapterStreamPdfs } from "@/lib/chapter-resources";

afterEach(cleanup);

describe("DirectStreamPdfBlocks", () => {
  it("renders two large live rectangular streams with no download control", () => {
    const pdfs = getChapterStreamPdfs("class-11-notes", "physics", "kinematics");
    render(<DirectStreamPdfBlocks pdfs={pdfs} unitTitle="Kinematics" />);

    const frames = screen.getAllByTitle(/./).filter((el) => el.tagName === "IFRAME");
    expect(frames).toHaveLength(2);
    for (const frame of frames) {
      expect(frame.getAttribute("src")).toBeTruthy();
      expect(frame.getAttribute("loading")).toBe("lazy");
      // Large, full-width rectangular blocks — not the small h-72 card previews.
      expect(frame.className).toContain("w-full");
      expect(frame.className).toMatch(/min-h-\[480px\]/);
    }

    expect(screen.getByText("Direct stream")).toBeInTheDocument();
    expect(screen.getByText(/no download/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /download/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /download/i })).toBeNull();
  });

  it("renders nothing when a chapter has no stream sources", () => {
    const { container } = render(<DirectStreamPdfBlocks pdfs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
