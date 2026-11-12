import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/home",
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock("@/lib/api/ai", () => ({ search: vi.fn() }));
vi.mock("@/components/theme/theme-provider", () => ({
  THEME_OPTIONS: [
    { id: "nebula", label: "Nebula Sky", description: "Space theme", badge: "Space", colors: { bg: "#000", primary: "#fff", border: "#333" }, isDark: true },
    { id: "light", label: "Clean Slate", description: "Day theme", badge: "Day", colors: { bg: "#fff", primary: "#00f", border: "#ddd" }, isDark: false },
  ],
  useTheme: () => ({ theme: "nebula", setTheme: vi.fn(), resolvedTheme: "dark" }),
}));
vi.mock("@/features/auth/hooks/use-session", () => ({
  // A member session so the gated directory cards actually render.
  useSession: () => ({
    user: { id: "u1", email: "member@example.com", fullName: "Member", role: "member" },
    refresh: vi.fn(),
  }),
}));
vi.mock("@/features/auth/actions", () => ({ logoutAction: vi.fn() }));

import { GlobalSearch } from "@/components/layout/global-search";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("sidebar theme section", () => {
  // 2026-11-11: appearance moved OUT of the sidebar (owner: "appearance out of
  // sidebar") into Settings, and the flat scroll strip became grouped,
  // collapsible directory cards. The old "Collapse Theme" button therefore no
  // longer exists; these assertions track the directory behaviour that does.
  it("links the destinations as collapsible directory sections, not a scroll strip", () => {
    render(<SidebarNavigation />);

    // Curriculum lives on the Info page now; the sidebar keeps the Labs &
    // Reference directory card, which still expands/collapses in place.
    const labs = screen.getByRole("button", { name: "Collapse Labs & Reference" });
    expect(labs).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(labs);
    expect(screen.getByRole("button", { name: "Expand Labs & Reference" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("keeps the theme palette out of the sidebar header", () => {
    render(<SidebarNavigation />);
    expect(screen.queryByRole("button", { name: "Choose Theme Palette" })).not.toBeInTheDocument();
  });
});

describe("global header search", () => {
  it("shows local results for a query matching syllabus content and navigates on click", async () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "vectors" } });

    // Local search is synchronous — results appear immediately
    const results = await screen.findAllByRole("button", { name: /Vectors/i });
    expect(results.length).toBeGreaterThan(0);

    fireEvent.click(results[0]);
    expect(push).toHaveBeenCalled();
    const href = push.mock.calls[0][0] as string;
    expect(href).toMatch(/vectors/);
  });

  it("sends Enter searches to the complete results page", () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "kinematics" } });
    fireEvent.submit(input.closest("form")!);
    expect(push).toHaveBeenCalledWith("/search?q=kinematics");
  });

  it("shows 'no results' for a query that matches nothing", () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "zzzznothing" } });
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it("shows kind badges (Subject, Unit, Topic, Lab, Graph, Page) on results", async () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "physics" } });

    // Should find subject-level and unit-level matches with kind badges
    await waitFor(() => {
      const results = screen.getAllByRole("button", { name: /Physics/i });
      // At least one result should exist
      expect(results.length).toBeGreaterThan(0);
    });

    // Check that kind badges are rendered
    const badges = document.querySelectorAll("span");
    const kindTexts = Array.from(badges).map((b) => b.textContent);
    const validKinds = ["Subject", "Unit", "Chapter", "Topic", "Concept", "Example", "Lab", "Graph", "Page"];
    expect(kindTexts.some((t) => validKinds.includes(t ?? ""))).toBe(true);
  });

  it("finds and badges units, chapters, concepts, and examples", async () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    // Search for a concept / derivation (e.g. Bernoulli or Gravitation)
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "gravitation" } });

    await waitFor(() => {
      const results = screen.getAllByRole("button", { name: /gravitation/i });
      expect(results.length).toBeGreaterThan(0);
    });

    const spans = Array.from(document.querySelectorAll("span")).map((s) => s.textContent);
    expect(spans.some((t) => ["Chapter", "Unit", "Topic", "Concept"].includes(t ?? ""))).toBe(true);
  });

  it("navigates by arrow keys and selects with Enter", () => {
    render(<GlobalSearch />);
    const input = screen.getByRole("searchbox", { name: "Search subjects, topics and labs" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "kinematics" } });

    // Arrow down then Enter should select the first result
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.submit(input.closest("form")!);

    // Should have navigated to a result href, not the search page
    expect(push).toHaveBeenCalled();
    const href = push.mock.calls[0][0] as string;
    expect(href).toMatch(/kinematics/i);
  });
});
