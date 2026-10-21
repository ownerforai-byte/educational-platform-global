import { describe, expect, it } from "vitest";
import { speechTextFromMarkdown } from "@/lib/hooks/use-voice-output";

/**
 * Voice output cleanup (owner 2026-10-21: "make it voice supported").
 *
 * Read-aloud is only usable if the spoken text is actually speakable. Raw
 * markdown is not: a fenced svg or a run artefact would be read out character
 * by character, LaTeX commands would be spelled letter by letter, and URLs
 * would be read as punctuation soup. These assertions pin the cleanup that
 * turns a Veer reply into natural speech.
 */
describe("speechTextFromMarkdown — the read-aloud cleanup", () => {
  it("drops fenced code and artefacts instead of reading them out", () => {
    const reply = [
      "Here is the refraction diagram.",
      "```svg",
      '<svg viewBox="0 0 10 10"><rect x="0" y="0" width="4" height="4"/></svg>',
      "```",
      "And here is the playground you can drive.",
      "```run",
      "<!DOCTYPE html><html><body><button>go</button></body></html>",
      "```",
    ].join("\n");

    const spoken = speechTextFromMarkdown(reply);
    expect(spoken).toContain("Here is the refraction diagram.");
    expect(spoken).toContain("And here is the playground you can drive.");
    expect(spoken).not.toContain("svg");
    expect(spoken).not.toContain("DOCTYPE");
    expect(spoken).not.toContain("viewBox");
    expect(spoken).not.toContain("button");
  });

  it("drops an unterminated fence — the stream is still open", () => {
    const spoken = speechTextFromMarkdown("The answer is 42.\n\n```svg\n<svg viewBox=\"0 0 10 10\">");
    expect(spoken).toContain("The answer is 42.");
    expect(spoken).not.toContain("viewBox");
  });

  it("speaks LaTeX as words, not as commands", () => {
    expect(speechTextFromMarkdown("Energy is $E = mc^2$ exactly.")).toContain("E = mc^2");
    expect(speechTextFromMarkdown("$\\frac{a}{b}$ is the ratio.")).toContain("a over b");
    expect(speechTextFromMarkdown("$\\sqrt{9}$ is three.")).toContain("square root of 9");
    // A raw backslash command must never reach the voice as letters.
    expect(speechTextFromMarkdown("$\\mathrm{kg}$ is the unit.")).not.toContain("\\mathrm");
  });

  it("drops URLs and callout markers but keeps the prose", () => {
    const spoken = speechTextFromMarkdown(
      ":::formula\nThe energy is E equals m c squared.\n:::\nSee https://example.com/notes for more.",
    );
    expect(spoken).toContain("The energy is E equals m c squared.");
    expect(spoken).not.toContain("https://example.com");
    expect(spoken).not.toContain(":::");
  });

  it("strips heading marks, emphasis and list bullets", () => {
    const spoken = speechTextFromMarkdown("## Why it bends\n\n- **First** reason\n- Second reason");
    expect(spoken).toContain("Why it bends");
    expect(spoken).toContain("First reason");
    expect(spoken).toContain("Second reason");
    expect(spoken).not.toContain("##");
    expect(spoken).not.toContain("**");
  });

  it("returns an empty string for an empty reply", () => {
    expect(speechTextFromMarkdown("")).toBe("");
    expect(speechTextFromMarkdown("   ")).toBe("");
  });
});