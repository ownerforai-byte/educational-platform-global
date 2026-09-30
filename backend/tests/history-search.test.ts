import { describe, expect, it } from "vitest";
import {
  HISTORY_SEARCH_RULES,
  formatHistoryContext,
  historyTerms,
  scoreMessage,
  selectHistory,
  type HistoryMessage,
} from "../src/ai/history-search";

/**
 * The history console (owner request 2026-09-30) is the one interface whose
 * job is to search the student's OWN saved conversations and present them as
 * asked. What has to hold:
 *
 *   · the server-side search is real (matching messages, by the question's own
 *     words), never "dump everything and let the model sort it out";
 *   · a question the history cannot answer never reaches the model — no
 *     fabricated history, and no wasted call;
 *   · the presentation contract forbids answering from general knowledge,
 *     because that turns "here is what you asked" into a made-up lesson.
 */

const convo = (session: string, turns: Array<[HistoryMessage["role"], string]>): HistoryMessage[] =>
  turns.map(([role, content]) => ({ session, role, content, created_at: "2026-09-30T10:00:00Z" }));

const HISTORY: HistoryMessage[] = [
  ...convo("capacitors", [
    ["user", "explain how a capacitor stores charge"],
    ["assistant", "A capacitor stores charge on two plates separated by a dielectric."],
  ]),
  ...convo("mechanics", [
    ["user", "derive the range of a projectile"],
    ["assistant", "Range R = u^2 sin(2θ) / g follows from the time of flight."],
  ]),
  ...convo("capacitors", [
    ["user", "and what about the energy stored in a capacitor?"],
    ["assistant", "The energy is U = 1/2 C V^2, the work done charging it."],
  ]),
];

describe("historyTerms — what is worth searching for", () => {
  it("keeps the topic and drops the asking", () => {
    const terms = historyTerms("what did we discuss about capacitors earlier?");
    expect(terms).toContain("capacitors");
    expect(terms).not.toContain("what");
    expect(terms).not.toContain("earlier");
    expect(terms).not.toContain("history");
  });

  it("leaves nothing behind for a pure 'summarise everything' question", () => {
    expect(historyTerms("summarise my whole chat history")).toEqual([]);
  });
});

describe("selectHistory — a real search over the student's own words", () => {
  it("picks the asked topic's messages and leaves the other topic alone", () => {
    const selection = selectHistory(HISTORY, "what did we discuss about capacitors?");
    // Every selected message belongs to the capacitors conversations: the
    // mechanics thread is not attached at all.
    expect(selection.selected.every((m) => m.session === "capacitors")).toBe(true);
    expect(selection.selected.some((m) => m.content.includes("projectile"))).toBe(false);
    // The plural in the question finds the singular in the messages.
    expect(selection.terms).toContain("capacitors");
    expect(selection.selected.length).toBeGreaterThanOrEqual(3);
  });

  it("brings the reply along with the question it answered", () => {
    // "The energy is U = 1/2 C V^2" never says the word capacitor, but it is
    // the other half of a matched exchange — without it the presentation would
    // have a question and no answer.
    const selection = selectHistory(HISTORY, "what did we discuss about capacitors?");
    expect(selection.selected.some((m) => m.content.includes("U = 1/2 C V^2"))).toBe(true);
    expect(selection.selected.some((m) => m.content.includes("energy stored in a capacitor"))).toBe(true);
  });

  it("never borrows a neighbour from another conversation", () => {
    const selection = selectHistory(HISTORY, "derive the range of a projectile");
    expect(selection.selected.every((m) => m.session === "mechanics")).toBe(true);
  });

  it("names the conversations it found, so a thread can be reopened", () => {
    const selection = selectHistory(HISTORY, "capacitor energy");
    expect(selection.sessions.map((s) => s.session)).toEqual(["capacitors"]);
    expect(selection.sessions[0].matched).toBeGreaterThan(0);
  });

  it("reports how much it searched, so the UI can be honest", () => {
    const selection = selectHistory(HISTORY, "capacitor");
    expect(selection.considered.messages).toBe(6);
    expect(selection.considered.sessions).toBe(2);
  });

  it("attaches matches in chronological order, not relevance order", () => {
    const selection = selectHistory(HISTORY, "capacitor");
    const firstAsk = selection.selected.findIndex((m) => m.content.includes("stores charge"));
    const secondAsk = selection.selected.findIndex((m) => m.content.includes("energy stored"));
    expect(firstAsk).toBeLessThan(secondAsk);
  });

  it("returns nothing when the history does not mention the topic", () => {
    const selection = selectHistory(HISTORY, "photosynthesis light reactions");
    expect(selection.selected).toEqual([]);
  });

  it("falls back to the newest messages when the question names nothing", () => {
    const selection = selectHistory(HISTORY, "summarise everything I asked");
    expect(selection.selected.length).toBeGreaterThan(0);
    expect(selection.selected[selection.selected.length - 1].content).toContain("energy");
  });

  it("bounds what it attaches", () => {
    const big = Array.from({ length: 400 }, (_, i) =>
      convo("bulk", [["user", `question number ${i} about capacitors and charge`]])[0],
    );
    const selection = selectHistory(big, "capacitors", { maxMessages: 20, maxChars: 500 });
    expect(selection.selected.length).toBeLessThanOrEqual(20);
    expect(selection.selected.join(" ").length).toBeLessThanOrEqual(600);
  });

  it("ignores empty messages", () => {
    const selection = selectHistory(
      [...convo("x", [["user", "   "]]), ...HISTORY],
      "capacitor",
    );
    expect(selection.selected.every((m) => m.content.trim().length > 0)).toBe(true);
  });

  it("weighs a repeated term above a single mention", () => {
    expect(scoreMessage("capacitor capacitor capacitor", ["capacitor"])).toBeGreaterThan(
      scoreMessage("a capacitor once", ["capacitor"]),
    );
    expect(scoreMessage("nothing relevant", ["capacitor"])).toBe(0);
  });
});

describe("formatHistoryContext / the contract — the model may only use the history", () => {
  it("labels each conversation and each speaker", () => {
    const context = formatHistoryContext(selectHistory(HISTORY, "capacitor"));
    expect(context).toContain("[SAVED CONVERSATION]");
    expect(context).toContain("── conversation: capacitors ──");
    expect(context).toContain("STUDENT: explain how a capacitor stores charge");
    expect(context).toContain("VEER: A capacitor stores charge");
    expect(context).toContain("[END OF SAVED CONVERSATION]");
    // The mechanics thread did not match, so it is not attached at all.
    expect(context).not.toContain("projectile");
    expect(context).toContain("across 2 conversation(s)");
  });

  it("is silent when nothing matched — the caller never calls the model", () => {
    expect(formatHistoryContext(selectHistory(HISTORY, "photosynthesis"))).toBe("");
  });

  it("forbids answering from general knowledge", () => {
    for (const rule of [
      "Never answer from your own knowledge of the subject",
      "say so plainly in one line",
      "Never invent a conversation, a message, a date or a quote",
      "SEARCH THE STUDENT'S OWN SAVED CONVERSATIONS",
      "WALK THE MOMENTS",
      "what is still open",
    ]) {
      expect(HISTORY_SEARCH_RULES, `missing rule: ${rule}`).toContain(rule);
    }
  });
});
