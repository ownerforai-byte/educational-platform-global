import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlatformBadge } from "@/features/badges/platform-badge";
import { BADGE_CATALOG } from "@rn/shared/badges";

describe("PlatformBadge — Gradient Flash and Visual Badges", () => {
  it("renders with merit-badge-flash class and gradient background for standard badges", () => {
    const firstEarned = BADGE_CATALOG.find((b) => b.assignment === "earned");
    expect(firstEarned).toBeDefined();
    if (!firstEarned) return;

    render(<PlatformBadge badgeId={firstEarned.id} />);
    const badge = screen.getByLabelText(firstEarned.label);
    expect(badge).toBeTruthy();
    expect(badge.className).toContain("merit-badge-flash");
    expect(badge.className).toContain("bg-gradient-to-r");
    expect(badge.getAttribute("data-badge-rarity")).toBe(firstEarned.rarity);
    expect(badge.getAttribute("data-merit-tier")).toBeDefined();
  });

  it("renders special Creator identity badge with creator icon, checkmark, and flash tier", () => {
    render(<PlatformBadge badgeId="creator" flashTier={5} />);
    const badge = screen.getByLabelText("Creator");
    expect(badge).toBeTruthy();
    expect(badge.className).toContain("merit-badge-flash");
    expect(badge.getAttribute("data-merit-kind")).toBe("creator");
    expect(badge.getAttribute("data-merit-tier")).toBe("5");
    expect(badge.getAttribute("data-badge-rarity")).toBe("legendary");
  });

  it("renders Community Bot badge with community-bot-badge class", () => {
    render(<PlatformBadge badgeId="community-bot" />);
    const badge = screen.getByLabelText("Community bot");
    expect(badge).toBeTruthy();
    expect(badge.className).toContain("merit-badge-flash");
    expect(badge.className).toContain("community-bot-badge");
    expect(badge.getAttribute("data-merit-kind")).toBe("community-bot");
  });

  it("respects custom flashTier parameter constrained between 1 and 5", () => {
    render(<PlatformBadge badgeId="perfect-score" flashTier={4} />);
    const badge = screen.getByLabelText("Perfect Score");
    expect(badge.getAttribute("data-merit-tier")).toBe("4");
  });

  it("returns null for non-existent badge ID", () => {
    const { container } = render(<PlatformBadge badgeId="non-existent-badge-12345" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders compact mode with smaller text and padding", () => {
    render(<PlatformBadge badgeId="perfect-score" compact />);
    const badge = screen.getByLabelText("Perfect Score");
    expect(badge.className).toContain("text-[9px]");
  });
});
