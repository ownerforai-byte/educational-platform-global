import { describe, expect, it } from "vitest";

import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * The client-side mirror of the backend's academic contract.
 *
 * The consoles at /chat and /ai build their own system message from this file,
 * so a rule added in the backend must be mirrored here or those surfaces drift
 * and start answering shallow again. These assertions pin the owner's two
 * passes of 2026-09-30: the deep-answer contract (scan first, keywords under
 * each idea, output over raw code) and the follow-up — roots → ideas →
 * concepts, paste-the-verified-knowledge-with-a-light-polish, graded coverage,
 * real images inside the reply, and — when no source has a picture — drawing
 * the figure itself in a fenced svg block the platform paints.
 */
describe("PLATFORM_SYSTEM_PROMPT — the client mirror of the academic contract", () => {
  it("mirrors the deep-answer grounding layer", () => {
    for (const clause of [
      "GROUNDING — SCAN FIRST, THEN ANSWER",
      "SHAPE OF AN ACADEMIC REPLY",
      "**Key words:**",
      "OUTPUT, NOT RAW CODE",
      "CLASS SCOPE — STRICTLY NEB CLASS 11 AND CLASS 12",
      "SOURCE HIERARCHY",
    ]) {
      expect(PLATFORM_SYSTEM_PROMPT, `missing clause: ${clause}`).toContain(clause);
    }
  });

  it("requires the concept walk: roots → ideas → concepts, whole surface", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("ROOTS → IDEAS → CONCEPTS");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Root first");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Cover the WHOLE surface");
    // Existing house rule that the walk must not contradict.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("CONCEPTUAL ORDER");
  });

  it("allows verified knowledge to be pasted with a light grammar polish", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("PASTE THE VERIFIED KNOWLEDGE, POLISH THE GRAMMAR");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("only LIGHT polish for grammar");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Never shorten a source to save space");
  });

  it("grades coverage and forbids faking it", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("COVERAGE IS GRADED, NEVER FAKED");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("STRONG means the platform's own records really teach this concept");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("never dress a passing mention up as the syllabus treatment");
  });

  it("lets the tutor embed real images and never invent one", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("IMAGES IN THE REPLY");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("![short description of what is visible](url)");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Never invent, guess");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("a real image only when a genuine, verifiable URL is in front of you");
  });

  it("teaches the tutor to draw the figure when no source has one", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("DRAW THE FIGURE YOURSELF WHEN NO SOURCE HAS ONE");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("whose language is svg");
    expect(PLATFORM_SYSTEM_PROMPT).toContain('viewBox="0 0 640 400"');
    // The constructs the renderer refuses must be named, so the model does not
    // lose the figure to the code-block fallback.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("no script or style elements");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("no url(#...) references");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("white card");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("on the fence line");
  });

  it("mirrors the run-fence law: the platform runs the tutor's code on screen", () => {
    // Owner 2026-10-03: the tutor may write code AND present it live, and it is
    // told never to hurry the code. Mirror of backend/src/ai/artifact-rules.ts.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("ON-SCREEN ARTEFACTS — THE run FENCE");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("the platform RUNS your code");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("live, responsive widget");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("inline style and inline script only");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("the closing html tag on the very last line");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("no CDN, no remote image, no fetch");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("controls reachable at 360 pixels");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("NEVER rush it and never shorten it");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("no placeholders, no TODO");
  });

  it("no longer caps a complete answer at three sources", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("use every source attached to the message");
    expect(PLATFORM_SYSTEM_PROMPT).not.toContain("AT MOST 3");
    expect(PLATFORM_SYSTEM_PROMPT).not.toContain("never more than three");
  });

  it("gives the owner's exact self-introduction for identity questions (owner 2026-10-07)", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("IDENTITY — WHO YOU ARE AND WHO MADE YOU");
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "I am Veer AI, trained and created by Ravikisan. He is an undergraduate student who started this platform from the beginning of Class 11, along with his studies.",
    );

    // The "never AI" ban and this line contradict each other, so the ban must
    // carve out exactly this one exception on this surface too.
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "The ONE sanctioned exception is the owner's own self-introduction",
    );
    expect(PLATFORM_SYSTEM_PROMPT).toContain("never \"assistant\"");

    // Short by design — exempt from the 250-word floor and links-last, or the
    // sentence would get padded out on its way to the student.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("EXEMPT from the 250-word floor");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("links-last rule");
    // Live check 2026-10-07: without this the model tacks "Explore further:"
    // onto the identity reply, because links-last is absolute everywhere else.
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      'do NOT append an "Explore further:" link block',
    );
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "the links-last rule does not apply to this reply",
    );
    // Grounding must not turn this into a syllabus lesson: live check
    // 2026-10-07, "who created you?" matched "creation" physics.
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "An identity question SHORT-CIRCUITS every other rule",
    );
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "no physics, no derivation, no worked example",
    );

    // The first-hello rule must point at the new block instead of the old
    // "answer that you are Veer" wording it used to carry.
    expect(PLATFORM_SYSTEM_PROMPT).toContain(
      "give the owner's exact self-introduction verbatim",
    );
    expect(PLATFORM_SYSTEM_PROMPT).not.toContain(
      "answer that you are Veer, using that greeting line",
    );
  });

  it("mirrors the ChatGPT/Claude-grade reply craft", () => {
    // Owner 2026-10-03: "improve ai — like it replies like ChatGPT, Claude".
    // Mirror of backend/src/ai/reply-craft.ts.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("REPLY CRAFT — CHATGPT/CLAUDE GRADE");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("the direct answer lands in the first two or three lines");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("short MEANINGFUL headings");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("never mechanical labels");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("a table for any comparison or set of values");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("every formula and mechanism lands in a worked example");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("the ending a conclusion not a cliffhanger");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("an invitation to the natural next step");
  });
});
