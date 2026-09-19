import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";

describe("exam callout boxes", () => {
  it("renders a ::: container as a typed callout with label and title", () => {
    const html = renderNoteHtml(
      ":::formula Lens Maker's Formula\n$$\\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$$\n:::\n",
    );

    expect(html).toContain('class="edu-callout edu-callout--formula"');
    expect(html).toContain("edu-callout__label");
    expect(html).toContain("Formula");
    expect(html).toContain("edu-callout__heading");
    expect(html).toMatch(/Lens Maker(?:&#x27;|')s Formula/);
    // Body math still compiled, markers consumed.
    expect(html).toMatch(/katex/);
    expect(html).not.toContain(":::");
  });

  it("renders a multi-block container body", () => {
    const html = renderNoteHtml(
      ":::trick Sarrus Rule\nUse it for $3\\times3$ determinants.\n\n- copy first two columns\n- add the down-right diagonals\n:::\n",
    );

    expect(html).toContain("edu-callout--trick");
    expect(html).toContain("Exam Trick");
    expect(html).toContain("Sarrus Rule");
    expect(html).toContain("<li>copy first two columns</li>");
  });

  it("renders a label-only container when no title is given", () => {
    const html = renderNoteHtml(":::fact\nWater boils at 100&deg;C at 1 atm.\n:::\n");

    expect(html).toContain("edu-callout--fact");
    expect(html).toContain("High-Yield Fact");
    expect(html).not.toContain("edu-callout__heading");
  });

  it("renders GitHub-style blockquote alerts", () => {
    const html = renderNoteHtml(
      "> [!TRAP] Equal-magnitude resultant\n> Saying $R = A + B$ always is wrong.",
    );

    expect(html).toContain("edu-callout--trap");
    expect(html).toContain("Common Trap");
    expect(html).toContain("Equal-magnitude resultant");
    expect(html).toMatch(/katex/);
    expect(html).not.toContain("[!TRAP]");
  });

  it("accepts friendly aliases", () => {
    const html = renderNoteHtml(":::mnemonic\nLARS = Left Add, Right Subtract.\n:::\n");
    expect(html).toContain("edu-callout--remember");
  });

  it("leaves unknown ::: directives untouched", () => {
    const html = renderNoteHtml(":::notatype\nkeep me\n:::\n");
    expect(html).not.toContain("edu-callout");
    expect(html).toContain(":::notatype");
    expect(html).toContain("keep me");
  });

  it("leaves an unclosed container untouched instead of swallowing the note", () => {
    const html = renderNoteHtml(":::formula\norphan\n\nRest of the note stays.");
    expect(html).not.toContain("edu-callout");
    expect(html).toContain("Rest of the note stays.");
  });

  it("leaves ordinary blockquotes untouched", () => {
    const html = renderNoteHtml("> Just a normal quote from the textbook.");
    expect(html).toContain("<blockquote>");
    expect(html).not.toContain("edu-callout");
  });

  it("supports nested containers", () => {
    const html = renderNoteHtml(
      ":::fact Newton's Third Law\n:::trick\nAction and reaction act on different bodies.\n:::\n:::\n",
    );

    expect(html).toContain("edu-callout--fact");
    expect(html).toContain("edu-callout--trick");
  });

  it("keeps markdown formatting inside the body", () => {
    const html = renderNoteHtml(
      ":::exam\n**Q.** Define *torque*. See [NEB](https://neb.gov.np).\n:::\n",
    );

    expect(html).toContain("<strong>Q.</strong>");
    expect(html).toContain("<em>torque</em>");
    expect(html).toContain('href="https://neb.gov.np"');
  });

  it("strips dangerous HTML inside a callout body", () => {
    const html = renderNoteHtml(":::tip\n<script>alert(1)</script>safe\n:::\n");
    expect(html).not.toContain("<script");
    expect(html).toContain("safe");
  });
});
