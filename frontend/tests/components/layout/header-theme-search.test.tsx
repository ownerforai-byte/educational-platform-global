import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const push = vi.fn();
const search = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/home",
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock("@/lib/api/ai", () => ({ search: (...args: unknown[]) => search(...args) }));
vi.mock("@/components/theme/theme-provider", () => ({
  THEME_OPTIONS: [
    { id: "nebula", label: "Nebula Sky", description: "Space theme", badge: "Space", colors: { bg: "#000", primary: "#fff", border: "#333" }, isDark: true },
    { id: "light", label: "Clean Slate", description: "Day theme", badge: "Day", colors: { bg: "#fff", primary: "#00f", border: "#ddd" }, isDark: false },
  ],
  useTheme: () => ({ theme: "nebula", setTheme: vi.fn(), resolvedTheme: "dark" }),
}));
vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({ user: null, refresh: vi.fn() }),
}));
vi.mock("@/features/auth/actions", () => ({ logoutAction: vi.fn() }));
vi.mock("@/features/r1/hooks", () => ({ useR1Access: () => ({ data: false }) }));

import { GlobalSearch } from "@/components/layout/global-search";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("sidebar theme section", () => {
  it("keeps the theme selector in an expandable section, not the header", async () => {
    render(<SidebarNavigation />);
    expect(screen.getByRole("button", { name: "Collapse Theme" })).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(screen.getByRole("button", { name: "Choose Theme Palette" })).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Collapse Theme" }));
    expect(screen.getByRole("button", { name: "Expand Theme" })).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(screen.queryByRole("button", { name: "Choose Theme Palette" })).not.toBeInTheDocument());
  });
});

describe("global header search", () => {
  it("runs a search, selects a result, and sends Enter searches to the complete results page", async () => {
    search.mockResolvedValue({ results: [{ id: "topic-1", title: "Vector addition", type: "topic", url: "/class-11-notes/physics/vectors", class: "Class 11", subject: "Physics", chapter: "Vectors" }] });
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "vectors" } });
    await waitFor(() => expect(search).toHaveBeenCalledWith("vectors"));
    const result = await screen.findByRole("button", { name: /Vector addition/ });
    fireEvent.click(result);
    expect(push).toHaveBeenCalledWith("/class-11-notes/physics/vectors");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "kinematics" } });
    fireEvent.submit(input.closest("form")!);
    expect(push).toHaveBeenCalledWith("/search?q=kinematics");
    await waitFor(() => expect(search).toHaveBeenLastCalledWith("kinematics"));
  });

  it("communicates search failures and keeps the full search route available", async () => {
    search.mockRejectedValue(new Error("unavailable"));
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "thermodynamics" } });
    expect(await screen.findByRole("status")).toHaveTextContent("Search is unavailable");
    expect(screen.getByRole("button", { name: /View all results/ })).toBeInTheDocument();
  });
});
