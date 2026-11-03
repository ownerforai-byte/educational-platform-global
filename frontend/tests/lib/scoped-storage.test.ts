import { describe, it, expect, beforeEach } from "vitest";
import { key, storageScope } from "@/lib/scoped-storage";
import { readGoals, writeGoals, DEFAULT_GOALS } from "@/lib/study-goals";
import { readNotes, writeNotes, addNote, EMPTY_DRAFT } from "@/lib/personal-notes";
import { readSrsStore, writeSrsStore } from "@/lib/srs";
import { markCheckIn, getStreak } from "@/lib/streaks";
import { categoryForPath } from "@/features/credits/constants";

function signIn(id: string | null) {
  if (id === null) window.localStorage.removeItem("rvk:session");
  else
    window.localStorage.setItem(
      "rvk:session",
      JSON.stringify({ user: { id, email: `${id}@example.com` }, accessToken: null, expiresAt: null, savedAt: 1 }),
    );
}

beforeEach(() => window.localStorage.clear());

describe("account-scoped study storage (R2)", () => {
  it("namespaces keys by user id and falls back to a stable anonymous id", () => {
    signIn("a");
    expect(key("x:v1")).toBe("x:v1:u:a");
    signIn(null);
    const anon = key("x:v1");
    expect(anon).toMatch(/^x:v1:anon:.+/);
    expect(key("x:v1")).toBe(anon);
    expect(storageScope().startsWith("anon:")).toBe(true);
  });

  it("keeps goals, notes, srs and streaks apart for two students on one browser", () => {
    signIn("a");
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 120, onboarded: true });
    writeNotes(addNote([], { ...EMPTY_DRAFT, title: "A secret", body: "x" }, "n1", "2025-01-01"));
    writeSrsStore({ c1: { ease: 2.5, interval: 1, due: "2025-01-02", reps: 1, lapses: 0 } as never });
    markCheckIn();

    signIn("b");
    expect(readGoals().onboarded).toBe(false);
    expect(readGoals().dailyMinutes).toBe(DEFAULT_GOALS.dailyMinutes);
    expect(readNotes()).toEqual([]);
    expect(readSrsStore()).toEqual({});
    expect(getStreak().count).toBe(0);

    signIn("a");
    expect(readGoals().dailyMinutes).toBe(120);
    expect(readNotes()).toHaveLength(1);
    expect(getStreak().count).toBeGreaterThan(0);
  });
});

describe("spark layer reaches actual-content exports (R1)", () => {
  it.each(["/srs", "/mock-exams", "/downloads"])("%s is not public", (p) => {
    expect(categoryForPath(p)).not.toBeNull();
  });
  it.each(["/dashboard", "/settings", "/planner", "/analytics", "/streaks", "/report-card", "/onboarding", "/my-notes", "/billing", "/community", "/ask", "/referrals"])(
    "%s stays public",
    (p) => expect(categoryForPath(p)).toBeNull(),
  );
});

describe("notes scope captured at load (CWE-639 style cross-account write)", () => {
  it("rejects a save when the account changed after load and writes nothing", async () => {
    const { notesScope } = await import("@/lib/personal-notes");
    signIn("a");
    const scope = notesScope();
    signIn("b");
    const notes = addNote([], { ...EMPTY_DRAFT, title: "A only", body: "x" }, "n1", "2025-01-01");
    expect(writeNotes(notes, scope)).toBe(false);
    expect(readNotes()).toEqual([]);
    signIn("a");
    expect(readNotes()).toEqual([]);
  });

  it("writes under the captured scope when it is still current", async () => {
    const { notesScope } = await import("@/lib/personal-notes");
    signIn("a");
    const scope = notesScope();
    expect(writeNotes(addNote([], { ...EMPTY_DRAFT, title: "t", body: "x" }, "n1", "2025-01-01"), scope)).toBe(true);
    expect(readNotes()).toHaveLength(1);
  });
});

describe("guest goals transfer needs explicit confirmation", () => {
  it("is never implicit: signing in does not move or overwrite anything", async () => {
    const { findGuestGoals } = await import("@/lib/study-goals");
    signIn(null);
    writeGoals({ ...DEFAULT_GOALS, subjects: ["class-11/physics"], onboarded: true });
    signIn("a");
    expect(readGoals().onboarded).toBe(false);
    expect(findGuestGoals()?.onboarded).toBe(true);
  });

  it("finds nothing when signed out or when no guest goals exist", async () => {
    const { findGuestGoals } = await import("@/lib/study-goals");
    signIn(null);
    expect(findGuestGoals()).toBeNull();
    signIn("a");
    expect(findGuestGoals()).toBeNull();
    expect(readGoals()).toEqual(DEFAULT_GOALS);
  });

  it("transfer moves guest goals to the account and clears the guest copy", async () => {
    const { findGuestGoals, transferGuestGoals } = await import("@/lib/study-goals");
    signIn(null);
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 90, onboarded: true });
    signIn("a");
    expect(transferGuestGoals()?.dailyMinutes).toBe(90);
    expect(readGoals().dailyMinutes).toBe(90);
    expect(findGuestGoals()).toBeNull();
  });

  it("discard removes guest goals without touching the account", async () => {
    const { findGuestGoals, discardGuestGoals } = await import("@/lib/study-goals");
    signIn("a");
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 120, onboarded: true });
    signIn(null);
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 30, onboarded: true });
    signIn("a");
    discardGuestGoals();
    expect(findGuestGoals()).toBeNull();
    expect(readGoals().dailyMinutes).toBe(120);
  });
});
