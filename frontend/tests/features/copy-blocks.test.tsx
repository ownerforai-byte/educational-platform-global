import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { renderNoteHtml } from "@/lib/content/pipeline";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * ONE-TAP COPY BLOCKS (owner request 2026-10-08): "divide the reply of ai in
 * part … present important information in a separate rectangular block so that
 * you can copy at once … answers, emails, letters, long answers, explanations
 * … keep the whole-reply copy, but now for specific parts too."
 *
 * Three contracts:
 *   · the :::copy container renders as its own bordered rectangle
 *     (lib/content/callouts.ts → .edu-callout--copy),
 *   · the tutor is TOLD to write lift-ready chunks that way on the client
 *     prompt surface (the server's master prompt is pinned separately in
 *     backend/tests/curriculum-retrieval.test.ts),
 *   · the box carries a button that copies the chunk's markdown source in one
 *     click — and a reply without a box gains no button.
 */
describe(":::copy one-tap copy blocks", () => {
  it("renders a :::copy container as a bordered rectangle with label and title", () => {
    const html = renderNoteHtml(
      ":::copy Final Answer\nThe resultant force is $F = ma = 5$ N.\n:::",
    );
    expect(html).toContain('class="edu-callout edu-callout--copy"');
    expect(html).toContain("edu-callout__label");
    expect(html).toContain("Copy Block");
    expect(html).toContain("Final Answer");
    expect(html).toContain("resultant force");
  });

  it("never converts an unclosed block while the reply is still streaming", () => {
    const html = renderNoteHtml(":::copy Final Answer\nstill typing…");
    expect(html).not.toContain("edu-callout--copy");
  });

  it("keeps prose outside the box — the rectangle wraps only its own chunk", () => {
    const html = renderNoteHtml(
      "Before the box.\n\n:::copy Key Idea\nBody.\n:::\n\nAfter the box.",
    );
    expect(html.match(/edu-callout edu-callout--copy/g)).toHaveLength(1);
    expect(html).toContain("Before the box.");
    // The box must have closed before the outro paragraph begins.
    expect(html).toContain("</div>\n<p>After the box.</p>");
  });

  it("tells the tutor to write lift-ready chunks as copy blocks (client mirror)", () => {
    for (const clause of [
      "COPY BLOCKS — LIFT-READY CHUNKS",
      ":::copy",
      "one-tap Copy button",
      "Never wrap the whole reply",
    ]) {
      expect(PLATFORM_SYSTEM_PROMPT, `missing clause: ${clause}`).toContain(clause);
    }
  });
});

describe("the copy button in a rendered reply", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    cleanup();
    writeText.mockClear();
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  it("copies the block's markdown source in one click", () => {
    render(
      <InteractiveMarkdown
        content={"Intro line.\n\n:::copy Final Answer\nThe answer is $x = 42$.\n:::"}
      />,
    );
    const button = screen.getByRole("button", { name: "Copy this block" });
    expect(button.textContent).toBe("Copy");

    fireEvent.click(button);
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("The answer is $x = 42$.");
  });

  it("shows no copy button where the reply has no lift-ready chunk", () => {
    render(<InteractiveMarkdown content={"Just a plain explanation. No boxes here."} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
