import { describe, expect, test, vi } from "vitest";

import {
  continuationRequest,
  describeVerdict,
  detectTruncation,
  joinContinued,
  MAX_CONTINUATIONS,
} from "../src/ai/truncation";
import { completeAnswer } from "../src/ai/complete-answer";

/**
 * Contract suite for the TRUNCATION GUARD (owner report 2026-09-30: "why it
 * just stops"). A reply that ends mid-sentence is the worst failure mode and it
 * used to ship silently, because the only gate — enforceReplyFloor — checks
 * whether a reply is too SHORT, and a long reply cut off mid-clause is
 * comfortably long enough to pass it.
 *
 * Pins:
 *   1. detection — provider finish_reason, unclosed fence, unclosed $$,
 *      no terminator, dangling joiner;
 *   2. NO false positives on well-formed replies;
 *   3. the continuation instruction asks for a continuation, not a rewrite;
 *   4. seam healing when joining;
 *   5. completeAnswer(): repair BEFORE the length floor, bounded attempts, and
 *      never failing the request when a continuation itself errors.
 */

describe("detectTruncation", () => {
  test("a provider that says it hit the ceiling is conclusive", () => {
    const v = detectTruncation("A complete-looking sentence that just happens to end well.", "length");
    expect(v.truncated).toBe(true);
    expect(v.reason).toBe("finish-reason");

    // max_tokens / MAX_TOKENS are the same signal under other names.
    expect(detectTruncation("Everything is fine here.", "max_tokens").truncated).toBe(true);
    expect(detectTruncation("Everything is fine here.", "MAX_TOKENS").truncated).toBe(true);
    // A normal stop reason must not trigger it.
    expect(detectTruncation("Everything is fine here.", "stop").truncated).toBe(false);
  });

  test("an unclosed code fence or display-math block is a cut", () => {
    const fence = detectTruncation("Here is the function:\n```python\ndef f():\n    return 1");
    expect(fence.truncated).toBe(true);
    expect(fence.reason).toBe("unclosed-fence");

    const math = detectTruncation("The energy is\n$$E = \\frac{1}{2}mv^2");
    expect(math.truncated).toBe(true);
    expect(math.reason).toBe("unclosed-math");
  });

  test("a reply that ends mid-sentence is a cut", () => {
    const v = detectTruncation("The capacitor stores charge in its dielectric because the plates");
    expect(v.truncated).toBe(true);
    expect(["no-terminator", "dangling-join"]).toContain(v.reason);
  });

  test("a reply stopping on a joining word is the strong signal", () => {
    const v = detectTruncation("The current builds up quickly and the inductance resists any sudden change and");
    expect(v.truncated).toBe(true);
    expect(v.reason).toBe("dangling-join");
    expect(v.detail).toContain("and");
  });

  test("well-formed replies are NOT flagged", () => {
    const complete = [
      "A capacitor stores charge on its plates.",
      "",
      "**Key words:** capacitance — charge stored per volt",
      "",
      "Exam trap: the time constant is RC, not R/C.",
    ].join("\n");
    expect(detectTruncation(complete).truncated).toBe(false);

    // Legitimate ending variants.
    expect(detectTruncation("So the answer is 9.8 m/s.").truncated).toBe(false);
    expect(detectTruncation("The result follows from the definition)").truncated).toBe(false);
    expect(detectTruncation("**In short:** it is a race between charge and leakage").truncated).toBe(false);
  });

  test("an empty reply is not reported as truncated (that is the floor's job)", () => {
    expect(detectTruncation("").truncated).toBe(false);
    expect(detectTruncation("   \n  ").truncated).toBe(false);
  });

  test("describeVerdict is a compact log line", () => {
    expect(describeVerdict(detectTruncation("All done properly."))).toBe("complete");
    expect(describeVerdict(detectTruncation("cut off right here", "length"))).toContain("truncated(");
  });
});

describe("continuation request and seam healing", () => {
  test("the request asks for a continuation, never a rewrite", () => {
    const req = continuationRequest("the provider hit its output ceiling");
    expect(req).toContain("CUT OFF");
    expect(req).toContain("Continue it from exactly where it stopped");
    expect(req).toContain("Do NOT repeat");
    expect(req).toContain("ONLY the continuation text");
  });

  test("joinContinued heals the seam without fusing words or doubling spaces", () => {
    // A broken word gets a space so two halves do not fuse into one token.
    expect(joinContinued("the plates", "separate")).toBe("the plates separate");
    // A sentence that already ended gets a single clean space.
    expect(joinContinued("The capacitor stores charge.", "It discharges slowly.")).toBe(
      "The capacitor stores charge. It discharges slowly.",
    );
    // An empty continuation is a no-op, never a trailing space.
    expect(joinContinued("ends here", "   ")).toBe("ends here");
  });
});

describe("completeAnswer — repair order and bounds", () => {
  const messages = [
    { role: "system" as const, content: "RULES" },
    { role: "user" as const, content: "explain a capacitor in full" },
  ];

  /** A reply long enough to clear the length floor, with the interesting text
   *  LAST so the cut/seam lands where the assertion can see it. */
  const longEnough = (tail: string) =>
    `${"The dielectric blocks direct current while allowing the plates to build charge. ".repeat(45)} ${tail}`.trim();

  test("a complete answer is passed through untouched — no wasted call", async () => {
    const chat = vi.fn(async () => longEnough("A capacitor stores charge. Exam trap: RC, not R/C."));
    const res = await completeAnswer({ chat, messages, question: "what is a capacitor" });

    expect(chat).toHaveBeenCalledTimes(1);
    expect(res.continued).toBe(false);
    expect(res.continuations).toBe(0);
    expect(res.text).toContain("A capacitor stores charge.");
  });

  test("a cut answer is continued and stitched back together", async () => {
    let call = 0;
    const chat = vi.fn(async () => {
      call += 1;
      return call === 1
        ? longEnough("A capacitor stores charge on its plates, and the amount it stores depends").replace(/\.$/, "")
        : " on the voltage across it and the size of the plates.";
    });

    const res = await completeAnswer({ chat, messages, question: "what is a capacitor" });

    expect(res.continued).toBe(true);
    expect(res.continuations).toBe(1);
    expect(res.text).toContain("depends on the voltage");
    // The seam must not fuse the broken word into one token.
    expect(res.text).not.toContain("dependson");
    // The continuation must not restart the answer.
    expect(res.text.match(/A capacitor stores charge on its plates/g)?.length ?? 0).toBe(1);
  });

  test("continuation is bounded — a model that keeps cutting cannot loop forever", async () => {
    // Always returns a cut, so only the bounded attempts may happen.
    const chat = vi.fn(async () => longEnough("always cut off right in the midd").replace(/\.$/, ""));
    const res = await completeAnswer({ chat, messages, question: "explain everything" });

    expect(res.continuations).toBeLessThanOrEqual(MAX_CONTINUATIONS);
    // 1 initial turn + at most MAX_CONTINUATIONS continuations.
    expect(chat.mock.calls.length).toBeLessThanOrEqual(1 + MAX_CONTINUATIONS);
  });

  test("a failing continuation still ships the partial answer, never a 500", async () => {
    let call = 0;
    const chat = vi.fn(async () => {
      call += 1;
      if (call === 1) return "The student asks about the circuit and the teacher";
      throw new Error("provider exploded");
    });

    const res = await completeAnswer({ chat, messages, question: "explain the circuit" });
    expect(res.text).toContain("The student asks about the circuit");
    expect(res.notes.join(" ")).toContain("continuation failed");
  });

  test("the length floor still applies after truncation repair", async () => {
    // A short but complete answer must be expanded by the existing floor.
    const chat = vi.fn(async (turn: Array<{ content: string }>) => {
      const last = turn[turn.length - 1]?.content ?? "";
      if (last.startsWith("Your previous reply is BELOW")) {
        return "A capacitor is a two-conductor system that stores charge on its plates. ".repeat(30);
      }
      return "A capacitor stores charge.";
    });

    const res = await completeAnswer({ chat, messages, question: "explain a capacitor" });
    expect(res.expanded).toBe(true);
    expect(res.words).toBeGreaterThanOrEqual(res.floor);
  });
});

