import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { CuratedNotesBlock, curateNotesPrompt } from "@/components/content/curated-notes-block";

/**
 * The one-tap notes curation block (owner 2026-11-09: "a large block everywhere
 * where notes are curated by a single button"). Pins the single-control
 * contract: exactly one button, and it sends the curation request.
 */
describe("CuratedNotesBlock", () => {
  it("renders as one large block with a single control", () => {
    const onCurate = vi.fn();
    render(<CuratedNotesBlock onCurate={onCurate} />);

    expect(screen.getByRole("region", { name: "Curated notes" })).toBeInTheDocument();
    expect(screen.getByText("Curated notes, assembled for you")).toBeInTheDocument();
    // Exactly ONE interactive control in the block.
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(onCurate).not.toHaveBeenCalled();
  });

  it("sends the curation request on the single button", () => {
    const onCurate = vi.fn();
    render(<CuratedNotesBlock onCurate={onCurate} />);

    fireEvent.click(screen.getByRole("button", { name: /curate my notes/i }));

    expect(onCurate).toHaveBeenCalledTimes(1);
    expect(onCurate.mock.calls[0][0]).toMatch(/Curate my revision notes/);
    expect(onCurate.mock.calls[0][0]).toMatch(/self-check/);
  });

  it("places the request on one subject when the home has one", () => {
    const onCurate = vi.fn();
    render(<CuratedNotesBlock onCurate={onCurate} subjectName="Physics" />);

    fireEvent.click(screen.getByRole("button", { name: /curate my notes/i }));

    expect(curateNotesPrompt("Physics")).toMatch(/for Physics/);
    expect(onCurate.mock.calls[0][0]).toMatch(/for Physics/);
  });
});
