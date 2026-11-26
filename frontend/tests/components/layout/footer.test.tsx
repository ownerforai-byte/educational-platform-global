import type { AnchorHTMLAttributes } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/layout/footer";

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("Footer account column", () => {
  it("links the dashboard for everyone and keeps member-only pages locked for guests", () => {
    render(<Footer user={null} />);
    const account = screen.getByRole("navigation", { name: "Footer Account" });

    // Owner request 2026-11-07: Dashboard sits under Account and is available
    // for all — a live link even for a signed-out guest. Its own approval gate
    // handles the click.
    expect(within(account).getByRole("link", { name: "Dashboard" }).getAttribute("href")).toBe(
      "/dashboard",
    );

    // The rest of the column still needs an approved, signed-in account.
    expect(within(account).queryByRole("link", { name: "My Profile" })).toBeNull();
    expect(within(account).getByText("My Profile").getAttribute("aria-disabled")).toBe("true");
  });

  it("keeps Credits and Billing together in one Billing column, in that order", () => {
    render(<Footer user={null} />);
    const billing = screen.getByRole("navigation", { name: "Footer Billing" });

    // Owner request 2026-11-07: Credits is the first entry, the existing
    // Billing destination is the second. Guests see them as locked text, so
    // read the list items rather than querying for links.
    const labels = Array.from(billing.querySelectorAll("li")).map((li) => li.textContent?.trim());
    expect(labels).toEqual(["Credits", "Billing"]);

    const account = screen.getByRole("navigation", { name: "Footer Account" });
    expect(within(account).queryByText("Credits")).toBeNull();
    expect(within(account).queryByText("Billing")).toBeNull();
  });

  it("no longer lists Plans & Pricing in the Platform column", () => {
    render(<Footer user={null} />);
    const platform = screen.getByRole("navigation", { name: "Footer Platform" });
    expect(within(platform).queryByText(/Plans & Pricing/i)).toBeNull();
  });

  it("seals Plans & Pricing under the locked 'Not Good' group (owner request)", () => {
    render(<Footer user={null} />);
    const further = screen.getByRole("navigation", { name: "Footer Further" });

    // The plans link is sealed: blurred, aria-hidden and tabIndex={-1}, so it
    // is never a live link role — the same treatment as the "Further" group
    // on the plans page footer.
    expect(within(further).queryByRole("link", { name: /Plans & Pricing/i })).toBeNull();
    expect(further.textContent).toContain("Plans & Pricing");
    expect(further.textContent).toContain("Not Good");
  });

  it("seals Plans & Pricing in the mobile essentials strip too", () => {
    render(<Footer user={null} />);

    // The mobile strip is aria-hidden by design, so the plans text must never
    // be a live link role — only blurred, sealed text plus the Not Good badge.
    expect(screen.queryByRole("link", { name: /Plans & Pricing/i })).toBeNull();
    expect(screen.getAllByText(/Not Good/i).length).toBeGreaterThanOrEqual(2);
  });

  it("adds 'What it has' under Platform as a live guest link (owner 2026-11-08)", () => {
    render(<Footer user={null} />);
    const platform = screen.getByRole("navigation", { name: "Footer Platform" });
    const link = within(platform).getByRole("link", { name: "What it has" });
    expect(link.getAttribute("href")).toBe("/what-it-has");
  });
});
