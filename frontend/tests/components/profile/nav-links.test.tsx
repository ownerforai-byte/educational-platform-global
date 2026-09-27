import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// ─── Mocks ──────────────────────────────────────────────────────────────────

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/home",
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const sessionState: { user: unknown } = { user: null };

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: sessionState.user,
    isLoading: false,
    refresh: vi.fn(),
    logoutUser: vi.fn(),
  }),
}));

vi.mock("@/features/auth/actions", () => ({
  logoutAction: vi.fn(),
}));

import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";

const ownerUser = {
  id: "u1",
  email: "harindarsah98172@gmail.com",
  fullName: "Harindra Sah",
  role: "OWNER" as const,
  credits: 42,
  creditsLimit: 100,
  premiumStatus: true,
};

const studentUser = {
  id: "u2",
  email: "student@example.com",
  fullName: "Sita Student",
  role: "STUDENT" as const,
  credits: 5,
  creditsLimit: 50,
};

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = ownerUser;
});

// ─── Sidebar ────────────────────────────────────────────────────────────────

describe("SidebarNavigation", () => {
  it("links My Profile to /profile for signed-in users", () => {
    sessionState.user = studentUser;
    render(<SidebarNavigation />);

    const profileLink = screen.getByRole("link", { name: /my profile/i });
    expect(profileLink).toHaveAttribute("href", "/profile");
    // Progress stays a separate entry.
    expect(
      screen.getByRole("link", { name: /my progress/i })
    ).toHaveAttribute("href", "/progress");
  });

  it("owner section points at real owner console routes, not stale /admin", () => {
    render(<SidebarNavigation />);

    const consoleLink = screen.getByRole("link", { name: /owner console/i });
    expect(consoleLink).toHaveAttribute("href", "/owner");
    expect(
      screen.getByRole("link", { name: /user management/i })
    ).toHaveAttribute("href", "/owner/users");

    // No stale admin link anywhere in the sidebar.
    const hrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain("/admin");
  });

  it("hides the owner section from non-owner users", () => {
    sessionState.user = studentUser;
    render(<SidebarNavigation />);

    expect(screen.queryByRole("link", { name: /owner console/i })).toBeNull();
  });
});

// ─── Mobile nav ─────────────────────────────────────────────────────────────

describe("MobileNav", () => {
  it("every My Profile entry (section + footer) opens /profile", () => {
    render(<MobileNav />);

    // Slide-in panel is closed initially — open it.
    fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));

    const profileLinks = screen.getAllByRole("link", { name: /my profile/i });
    expect(profileLinks.length).toBeGreaterThanOrEqual(2); // section + footer
    for (const link of profileLinks) {
      expect(link).toHaveAttribute("href", "/profile");
    }
    // Progress remains a separate entry.
    expect(screen.getByRole("link", { name: /my progress/i })).toHaveAttribute(
      "href",
      "/progress"
    );
  });
});

// ─── Header user menu ───────────────────────────────────────────────────────

describe("UserNav", () => {
  it("dropdown exposes My Profile → /profile", async () => {
    render(<UserNav />);

    // Open the dropdown.
    const trigger = screen.getByRole("button", { name: /user profile menu/i });
    fireEvent.click(trigger);

    const profileLink = screen.getByRole("link", { name: /my profile/i });
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("link", { name: /credit wallet/i })).toHaveAttribute(
      "href",
      "/credits"
    );
  });
});
