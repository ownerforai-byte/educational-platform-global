import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";

// ─── Mocks ──────────────────────────────────────────────────────────────────

const replace = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push, refresh: vi.fn() }),
  usePathname: () => "/profile",
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

const logoutUser = vi.fn();
const sessionState: { user: unknown; isLoading: boolean } = {
  user: null,
  isLoading: false,
};

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: sessionState.user,
    isLoading: sessionState.isLoading,
    refresh: vi.fn(),
    logoutUser,
  }),
}));

const getProgress = vi.fn();
const updateProgress = vi.fn();

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => getProgress(...args),
  updateProgress: (...args: unknown[]) => updateProgress(...args),
}));

const getOwnerSettings = vi.fn();
const updateOwnerSettings = vi.fn();

vi.mock("@/lib/api/owner", () => ({
  getOwnerSettings: (...args: unknown[]) => getOwnerSettings(...args),
  updateOwnerSettings: (...args: unknown[]) => updateOwnerSettings(...args),
}));

const getAiSparkUsage = vi.fn();

vi.mock("@/lib/api/ai", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getAiSparkUsage: (...args: unknown[]) => getAiSparkUsage(...args),
}));

import ProfilePage from "@/app/(app)/profile/page";

// ─── Fixtures ───────────────────────────────────────────────────────────────

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
  fullName: "Aayush Sharma",
  role: "member" as const,
  credits: 4,
  creditsLimit: 100,
  premiumStatus: false,
};

const progressEntries = [
  {
    id: "p1",
    topicId: "t1",
    completed: true,
    completedAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z",
    topic: {
      slug: "cell-structure",
      title: "Cell Structure",
      chapter: {
        slug: "cell",
        title: "Cell Biology",
        subject: { slug: "biology", name: "Biology" },
      },
    },
  },
  {
    id: "p2",
    topicId: "t2",
    completed: false,
    completedAt: null,
    updatedAt: "2026-09-01T00:00:00.000Z",
    topic: { slug: "motion", title: "Laws of Motion" },
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = ownerUser;
  sessionState.isLoading = false;
  getProgress.mockResolvedValue(progressEntries);
  updateProgress.mockResolvedValue({});
  getOwnerSettings.mockResolvedValue({ settings: [] });
  updateOwnerSettings.mockResolvedValue({ settings: [] });
  getAiSparkUsage.mockResolvedValue({
    tier: "owner",
    limit: null,
    used: 3,
    remaining: null,
  });
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("ProfilePage", () => {
  it("opens directly on the Progress tab (profile → progress)", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    // Default tab heading is the progress view.
    expect(screen.getByText("My Progress")).toBeInTheDocument();

    // The shared progress panel loaded its data (ring + topics visible).
    expect(await screen.findByText("Cell Structure")).toBeInTheDocument();
    expect(screen.getByText("Laws of Motion")).toBeInTheDocument();
    expect(getProgress).toHaveBeenCalledTimes(1);

    // Progress tab is the selected one.
    const progressTab = screen.getByRole("tab", { name: /progress/i });
    expect(progressTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders the identity header from the session user", () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    expect(screen.getByText("Harindra Sah")).toBeInTheDocument();
    expect(screen.getByText("sahrocky81@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("HS")).toBeInTheDocument(); // initials
    expect(screen.getByText("Owner")).toBeInTheDocument(); // canonical access-tier badge
    // The unified access-tier card replaces the separate plan badge.
    expect(screen.getByText(/Owner plan/)).toBeInTheDocument();
    // Balance shows in the wallet card (and wherever else it appears) —
    // profile features 2026-10-13 added the Content Spark Wallet card.
    expect(screen.getAllByText(/42/).length).toBeGreaterThanOrEqual(1);
    // Plan & AI spark card: tier, allowance meter and reset countdown.
    expect(screen.getByText(/Plan & AI Spark/)).toBeInTheDocument();
    expect(screen.getByText("content sparks available")).toBeInTheDocument();
    // Study stats strip: streak + counters.
    expect(screen.getByText("day streak")).toBeInTheDocument();
    // Owner console shortcut present for allowlisted owners.
    expect(screen.getByRole("link", { name: /owner console/i })).toHaveAttribute(
      "href",
      "/owner"
    );
  });

  it("switches to the Account tab with account details", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    fireEvent.click(screen.getByRole("tab", { name: /account/i }));

    expect(screen.getByText("Full name")).toBeInTheDocument();
    // The Account tab shows the unified access-tier row, not duplicated plan text.
    expect(screen.getByText("Access tier")).toBeInTheDocument();
    expect(screen.getByText(/Unlimited Veer sparks/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /full progress page/i })
    ).toHaveAttribute("href", "/progress");

    // Progress panel stays mounted (previous tab content preserved).
    expect(await screen.findByText("Cell Structure")).toBeInTheDocument();
  });

  it("redirects guests to login with a next return target", () => {
    sessionState.user = null;
    sessionState.isLoading = false;

    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));
    expect(replace).toHaveBeenCalledWith("/login?next=/profile");
  });

  it("shows a loading skeleton while the session resolves", () => {
    sessionState.user = null;
    sessionState.isLoading = true;

    const { container } = render(<ProfilePage />);
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
    expect(replace).not.toHaveBeenCalled();
  });

  it("displays scholar level details and XP for logged-in user", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    // Shows Scholar Rank and XP
    expect(screen.getByText("Scholar Rank")).toBeInTheDocument();
    expect(screen.getAllByText(/Novice Scholar/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Total Scholar XP")).toBeInTheDocument();

    // Check level indicator in header
    expect(screen.getByText(/Level 1 · Novice Scholar/i)).toBeInTheDocument();
  });

  it("switches to Level Details tab to see scholar progression", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    const levelTab = screen.getByRole("tab", { name: /level details/i });
    expect(levelTab).toBeInTheDocument();
    fireEvent.click(levelTab);

    expect(screen.getByText("Scholar Level & Academic Hierarchy")).toBeInTheDocument();
    expect(screen.getByText("Scholar Progression Roadmap")).toBeInTheDocument();
  });

  it("switches to Curriculum tab for grade focus and subjects", () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    fireEvent.click(screen.getByRole("tab", { name: /curriculum/i }));

    expect(screen.getByText("Academic Grade & Curriculum Settings")).toBeInTheDocument();
    expect(screen.getByText("CDC Nepal Curriculum")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /class 11 science/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /class 12 science/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /physics/i })).toHaveAttribute(
      "href",
      "/class-11-notes/physics",
    );
  });

  it("has no owner billing switch — access runs through SparkGate", () => {
    sessionState.user = ownerUser;
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    // The owner ON/OFF coin gate was removed 2026-11-06: no switch, no dot,
    // and nothing writes the retired settings key from this page.
    expect(screen.queryByText("Owner Spark Gate Control")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Toggle Spark Gate")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /turn gate/i })).not.toBeInTheDocument();
    expect(updateOwnerSettings).not.toHaveBeenCalled();
    // The owner console shortcut is still there — only the switch is gone.
    expect(screen.getByRole("link", { name: /owner console/i })).toHaveAttribute(
      "href",
      "/owner",
    );
  });

  it("renders the same wallet for a non-owner student", async () => {
    sessionState.user = studentUser;
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    expect(screen.queryByText("Owner Spark Gate Control")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Toggle Spark Gate")).not.toBeInTheDocument();
    // But student DOES see level details
    expect(screen.getByText("Scholar Rank")).toBeInTheDocument();
    expect(screen.getByText("Total Scholar XP")).toBeInTheDocument();
  });

  it("filters the activity feed with search, status chips and clear", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    fireEvent.click(screen.getByRole("tab", { name: /activity/i }));
    const panel = screen.getByRole("tabpanel", { name: /activity/i });

    // Both recorded sessions are listed in the feed.
    await within(panel).findByText("Cell Structure");
    expect(within(panel).getByText("Laws of Motion")).toBeInTheDocument();

    // Search narrows the feed.
    fireEvent.change(within(panel).getByRole("textbox", { name: /search activity/i }), {
      target: { value: "motion" },
    });
    expect(within(panel).getByText("Laws of Motion")).toBeInTheDocument();
    expect(within(panel).queryByText("Cell Structure")).not.toBeInTheDocument();

    // Clearing the query restores the feed.
    fireEvent.click(within(panel).getByRole("button", { name: /clear search/i }));
    expect(await within(panel).findByText("Cell Structure")).toBeInTheDocument();

    // The Completed status chip keeps only finished sessions.
    fireEvent.click(within(panel).getByRole("button", { name: "Completed" }));
    expect(within(panel).getByText("Cell Structure")).toBeInTheDocument();
    expect(within(panel).queryByText("Laws of Motion")).not.toBeInTheDocument();

    // "Clear filters" resets everything.
    fireEvent.click(within(panel).getByRole("button", { name: /clear filters/i }));
    expect(await within(panel).findByText("Laws of Motion")).toBeInTheDocument();
  });
});
