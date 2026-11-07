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
});
