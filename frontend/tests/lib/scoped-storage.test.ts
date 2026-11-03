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
