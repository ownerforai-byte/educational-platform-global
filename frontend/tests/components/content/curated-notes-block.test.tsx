import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { CuratedNotesBlock } from "@/components/content/curated-notes-block";

vi.mock("@/lib/api/curate-notes", () => ({
  curateNotes: vi.fn(),
}));

import { curateNotes } from "@/lib/api/curate-notes";

const mockedCurate = vi.mocked(curateNotes);

const PLACE = {
  surface: "chapter-tab",
  classLevel: "Class 12",
  subject: "Physics",
  chapter: "Mechanics",
  topic: "Projectile Motion",
};

const NOTES = {
  title: "Curated notes — Projectile Motion · Mechanics · Physics · Class 12",
  bulletCount: 3,
  provider: "agnes" as const,
  sections: [
    {
      heading: "Key terms",
      bullets: ["Trajectory is parabolic.", "Range is maximum at 45°."],
    },
    { heading: "Common mistakes", bullets: ["Mixing up g's sign."] },
  ],
};

/**
 * The one-tap notes curation (owner 2026-11-09). Since the same day's
 * follow-up, the AI behind the button is Agnes on the backend and the block
 * renders 20–80 place-aware bullets. Pins: one control, the place travels
 * with the request, the bullets render, and failures are honest.
 */
describe("CuratedNotesBlock", () => {
  beforeEach(() => {
    mockedCurate.mockReset();
  });

  it("renders as one large block with a single control", () => {
    render(<CuratedNotesBlock place={PLACE} />);

    expect(screen.getByRole("region", { name: "Curated notes" })).toBeInTheDocument();
    expect(screen.getByText(/Curated notes for/)).toBeInTheDocument();
    // Exactly ONE interactive control before the first run (the button).
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(mockedCurate).not.toHaveBeenCalled();
  });

  it("sends the PLACE with the request and renders Agnes's bullets", async () => {
    mockedCurate.mockResolvedValue(NOTES);
    render(<CuratedNotesBlock place={PLACE} />);

    fireEvent.click(screen.getByRole("button", { name: /curate my notes/i }));

    await waitFor(() => expect(mockedCurate).toHaveBeenCalledTimes(1));
    expect(mockedCurate).toHaveBeenCalledWith(PLACE);

    expect(screen.getByText("Trajectory is parabolic.")).toBeInTheDocument();
    expect(screen.getByText("Mixing up g's sign.")).toBeInTheDocument();
    expect(screen.getByText(/3 bullets/)).toBeInTheDocument();
  });

  it("shows an honest error and a retry when Agnes cannot answer", async () => {
    mockedCurate.mockRejectedValue(
      new Error("Curated notes are not set up on this deployment yet (Agnes key missing)."),
    );
    render(<CuratedNotesBlock place={PLACE} />);

    fireEvent.click(screen.getByRole("button", { name: /curate my notes/i }));

    await waitFor(() =>
      expect(screen.getByText("Curated notes unavailable")).toBeInTheDocument(),
    );
    expect(screen.getByText(/Agnes key missing/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
