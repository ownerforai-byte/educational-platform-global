import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MarkdownBody } from "@/features/community/markdown-body";

describe("MarkdownBody", () => {
  it("renders bold and italic instead of literal markers", () => {
    const { container } = render(<MarkdownBody text="**bold** and *italic*" />);
    expect(container.querySelector("strong")).toHaveTextContent("bold");
    expect(container.querySelector("em")).toHaveTextContent("italic");
    expect(container.textContent).not.toContain("**");
  });

  it("renders headings and bullet lists", () => {
    const { container } = render(
      <MarkdownBody text={"## Section\n\n- one\n- two"} />,
    );
    expect(container.querySelector("h2")).toHaveTextContent("Section");
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("one");
  });

  it("strips unsafe raw HTML", () => {
    const { container } = render(
      <MarkdownBody text={'<script>alert(1)</script>\n\n**safe**'} />,
    );
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("strong")).toHaveTextContent("safe");
  });
});