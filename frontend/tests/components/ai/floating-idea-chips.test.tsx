import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { FloatingIdeaChips } from "@/components/ai/floating-idea-chips";

describe("FloatingIdeaChips", () => {
  const onPick = vi.fn();

  beforeEach(() => {
    cleanup();
    onPick.mockClear();
  });

  it("stays hidden and untabbable while typing is off", () => {
    render(<FloatingIdeaChips visible={false} ideas={["explain simply"]} onPick={onPick} />);
    const button = screen.getByRole("button", { name: "explain simply", hidden: true });
    expect(button.closest("[aria-hidden]")).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("floats in with its ideas once typing starts", () => {
    render(<FloatingIdeaChips visible={true} ideas={["show the derivation"]} onPick={onPick} />);
    const button = screen.getByRole("button", { name: "show the derivation" });
    expect(button.closest("[aria-hidden]")).toHaveAttribute("aria-hidden", "false");
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
