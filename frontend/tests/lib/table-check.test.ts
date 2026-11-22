import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";

describe("table render check", () => {
  it("renders a GFM table as a real table", () => {
    const md = "| Feature | Mitosis | Meiosis |\n| --- | --- | --- |\n| Cells | 2 | 4 |\n| Ploidy | same | halved |";
    const html = renderNoteHtml(md);
    console.log("HTML:", html.slice(0, 600));
    expect(html).toContain("<table");
  });
});
