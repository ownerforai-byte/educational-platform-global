import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

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

// Stable refs so a test can assert WHICH logout path the sidebar uses.
const logoutUser = vi.fn();
const logoutAction = vi.fn();

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: sessionState.user,
    isLoading: false,
    refresh: vi.fn(),
    logoutUser,
  }),
}));

vi.mock("@/features/auth/actions", () => ({
  logoutAction,
}));

import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";

const ownerUser = {
  id: "u1",
  email: "sahrocky81@gmail.com",
  fullName: "Harindra Sah",
  role: "owner" as const,
  credits: 42,
  creditsLimit: 100,
  premiumStatus: true,
};

const studentUser = {
  id: "u2",
  email: "student@example.com",
  fullName: "Sita Student",
  role: "member" as const,
  credits: 5,
  creditsLimit: 50,
};

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = ownerUser;
});

// ─── Sidebar ────────────────────────────────────────────────────────────────

describe("SidebarNavigation", () => {
  it("keeps footer-only My Profile and personal desk entries out of the slimmed sidebar", () => {
    sessionState.user = studentUser;
    render(<SidebarNavigation />);

    // The sidebar is slimmed to Quick Access + Curriculum & Notes + Labs &
    // Reference, so My Profile (footer-only) and the Student Desk entries
    // (like My Progress) both live outside it.
    expect(screen.queryByRole("link", { name: /my profile/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /my progress/i })).toBeNull();
  });

  it("never links stale /admin routes in the sidebar", () => {
    render(<SidebarNavigation />);

    // No stale admin link anywhere in the sidebar (the Owner console lives in
    // the footer / profile, not the slimmed sidebar).
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

  it("logs out through the instant logoutUser path, never logoutAction", async () => {
    // INSTANT LOGOUT: the sidebar must clear the local session first (the UI
    // becomes a customer in the same click) instead of awaiting the backend
    // logoutAction round-trip before anything happens on screen.
    render(<SidebarNavigation />);

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    await waitFor(() => expect(logoutUser).toHaveBeenCalledTimes(1));
    expect(logoutAction).not.toHaveBeenCalled();
  });
});

// ─── Mobile nav ─────────────────────────────────────────────────────────────

describe("MobileNav", () => {
  it("keeps My Profile in the drawer footer without duplicating it in the nav list", () => {
    render(<MobileNav />);

    // Slide-in panel is closed initially — open it.
    fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));

    const profileLinks = screen.getAllByRole("link", { name: /my profile/i });
    expect(profileLinks).toHaveLength(1);
    for (const link of profileLinks) {
      expect(link).toHaveAttribute("href", "/profile");
    }
    // Personal desk entries (like My Progress) stay out of the slimmed drawer
    // nav — they live in the footer / profile.
    expect(screen.queryByRole("link", { name: /my progress/i })).toBeNull();
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
    expect(screen.getByRole("link", { name: /spark wallet/i })).toHaveAttribute(
      "href",
      "/credits"
    );
  });
});
