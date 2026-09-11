import { describe, expect, it } from "vitest";
import { NOTE_STATUS, getNoteStatus } from "@/lib/content/note-status";

describe("getNoteStatus", () => {
  it("marks missing bodies as BROKEN", () => {
    expect(getNoteStatus(null)).toBe(NOTE_STATUS.BROKEN);
    expect(getNoteStatus(undefined)).toBe(NOTE_STATUS.BROKEN);
  });

  it("marks entries without usable notes as EMPTY", () => {
    expect(getNoteStatus({ title: "t" })).toBe(NOTE_STATUS.EMPTY);
    expect(getNoteStatus({ title: "t", notes: [] })).toBe(NOTE_STATUS.EMPTY);
    expect(getNoteStatus({ title: "t", notes: ["   ", "\n"] })).toBe(NOTE_STATUS.EMPTY);
    expect(getNoteStatus({ title: "t", notes: "" })).toBe(NOTE_STATUS.EMPTY);
  });

  it("marks filled entries as OK", () => {
    expect(getNoteStatus({ title: "t", notes: ["hello"] })).toBe(NOTE_STATUS.OK);
    expect(getNoteStatus({ title: "t", notes: ["  ", "real text"] })).toBe(NOTE_STATUS.OK);
    expect(getNoteStatus({ title: "t", notes: "$x^2$" })).toBe(NOTE_STATUS.OK);
  });
});
