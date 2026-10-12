import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { FloatingIdeaChips } from "@/components/ai/floating-idea-chips";

/**
 * FLOATING IDEA CHIPS (owner request 2026-10-12): "ideas float on screen when
 * typing starts and hide when typing off". Contracts:
 *   · hidden while the composer is empty (aria-hidden, not tabbable),
 *   · floats in the moment the student types,
 *   · a picked chip hands its text back so the composer can extend the draft.
 */
describe("FloatingIdeaChips", () => {
  const onPick = vi.fn();

  beforeEach(() => {
    cleanup();
    onPick.mockClear();
  });

  it("stays hidden and untabbable while typing is off", () => {
    render(<FloatingIdeaChips visible={false} ideas={["explain simply"]} onPick={onPick} />);
    // aria-hidden hides the row from the accessibility tree on purpose — the
    // chip must be found with the hidden opt-in and must not be tabbable.
    const button = screen.getByRole("button", { name: "explain simply", hidden: true });
    expect(button.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("floats in with its ideas once typing starts", () => {
    render(<FloatingIdeaChips visible={true} ideas={["show the derivation"]} onPick={onPick} />);
    const row = screen.getByRole("button", { name: "show the derivation" }).parentElement!;
    expect(row).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("Ideas")).toBeTruthy();
  });

  it("hands the picked idea back for the composer to extend the draft", () => {
    render(
      <FloatingIdeaChips visible={true} ideas={["list the common mistakes"]} onPick={onPick} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "list the common mistakes" }));
    expect(onPick).toHaveBeenCalledWith("list the common mistakes");
  });
});
