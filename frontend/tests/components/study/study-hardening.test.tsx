import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
vi.mock("@/lib/api/progress", () => ({ getProgress: vi.fn().mockResolvedValue([]) }));

import { ReportCardView } from "@/components/study/report-card-view";
import { MyNotesView } from "@/components/study/my-notes-view";
import { SettingsView } from "@/components/study/settings-view";

function signIn(id: string | null) {
  if (id === null) window.localStorage.removeItem("rvk:session");
  else
    window.localStorage.setItem(
      "rvk:session",
      JSON.stringify({ user: { id, email: `${id}@example.com` }, accessToken: null, expiresAt: null, savedAt: 1 }),
    );
}

beforeEach(() => window.localStorage.clear());

describe("report card", () => {
  it("hides the weak-topic panel when printing and does not claim history is unrecorded", () => {
    render(<ReportCardView />);
    const panel = screen.getByText(/weak-topic call-out/i).closest(".print\\:hidden");
    expect(panel).not.toBeNull();
    expect(screen.queryByText(/does not record/i)).toBeNull();
    expect(screen.getByText(/does not highlight weak topics yet/i)).toBeInTheDocument();
  });
});

describe("my notes scope guard", () => {
  it("rejects a save after the account changed in another tab and reloads", async () => {
    signIn("a");
    render(<MyNotesView />);
    signIn("b");
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "A note" } });
    fireEvent.change(screen.getByLabelText("Note"), { target: { value: "body" } });
    fireEvent.click(screen.getByText("Add note"));
    expect(await screen.findByText(/account changed in another tab/i)).toBeInTheDocument();
    expect(window.localStorage.getItem("neb-my-notes:v1:u:b")).toBeNull();
    expect(screen.queryByText("A note")).toBeNull();
  });
});

describe("guest goals prompt", () => {
  it("asks before moving guest goals and only then writes the account key", async () => {
    signIn(null);
    const { writeGoals, DEFAULT_GOALS } = await import("@/lib/study-goals");
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 90, onboarded: true });
    signIn("a");
    render(<SettingsView />);
    const move = await screen.findByText("Move to my account");
    expect(window.localStorage.getItem("neb-study-goals:v1:u:a")).toBeNull();
    fireEvent.click(move);
    await waitFor(() => expect(window.localStorage.getItem("neb-study-goals:v1:u:a")).toContain("90"));
    expect(screen.queryByText("Move to my account")).toBeNull();
  });

  it("warns that account goals will be replaced", async () => {
    signIn("a");
    const { writeGoals, DEFAULT_GOALS } = await import("@/lib/study-goals");
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 120, onboarded: true });
    signIn(null);
    writeGoals({ ...DEFAULT_GOALS, dailyMinutes: 30, onboarded: true });
    signIn("a");
    render(<SettingsView />);
    expect(await screen.findByText(/will replace them/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Not now"));
    expect(JSON.parse(window.localStorage.getItem("neb-study-goals:v1:u:a")!).dailyMinutes).toBe(120);
  });
});
