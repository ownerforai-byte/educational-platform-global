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

const getMyProfile = vi.fn();
const getStorage = vi.fn();
const updateMyProfile = vi.fn();

vi.mock("@/lib/api/profile", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getMyProfile: (...args: unknown[]) => getMyProfile(...args),
  getStorage: (...args: unknown[]) => getStorage(...args),
  updateMyProfile: (...args: unknown[]) => updateMyProfile(...args),
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
    updatedAt: "2026-09-01T00:00:00.000Z",
    topic: { slug: "motion", title: "Laws of Motion" },
  },
];

const storageFixture = {
  usedBytes: 2 * 1024 * 1024,
  limitBytes: 20 * 1024 * 1024,
  remainingBytes: 18 * 1024 * 1024,
  unlimited: false,
};

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = ownerUser;
  sessionState.isLoading = false;
  getProgress.mockResolvedValue(progressEntries);
  updateProgress.mockResolvedValue({});
  getOwnerSettings.mockResolvedValue({ settings: [] });
  updateOwnerSettings.mockResolvedValue({ settings: [] });
  getStorage.mockResolvedValue(storageFixture);
  updateMyProfile.mockResolvedValue({ profile: { id: "u1", visibility: "members" } });
  getAiSparkUsage.mockResolvedValue({
    tier: "owner",
    limit: null,
    used: 3,
    remaining: null,
  });
  getMyProfile.mockImplementation(async () => {
    const current = sessionState.user as { id: string; fullName: string; role: string } | null;
    return {
      profile: {
        id: current?.id ?? "u1",
        fullName: current?.fullName ?? "User",
        username: current?.id === "u1" ? "harindra" : "aayush",
        bio: null,
        location: null,
        website: null,
        plan: current?.role === "owner" ? "pro" : "member",
        role: current?.role ?? "member",
        visibility: "public",
        avatarUrl: null,
        coverUrl: null,
        extras: {},
        isYou: true,
      },
      stats: { posts: 0, comments: 0, likesReceived: 0, filesShared: 0, followers: 0, following: 0 },
      storage: storageFixture,
    };
  });
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("ProfilePage", () => {
  it("opens the dashboard on the Overview tab with the progress tracker one tab away", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    // Overview is the default tab; no placeholder-only landing view.
    const overviewTab = screen.getByRole("tab", { name: /overview/i });
    expect(overviewTab).toHaveAttribute("aria-selected", "true");

    // The full progress tracker lives on the Progress tab.
    fireEvent.click(screen.getByRole("tab", { name: /progress/i }));
    expect(screen.getByText("My Progress")).toBeInTheDocument();

    // The shared progress panel loaded its data (ring + topics visible).
    expect((await screen.findAllByText("Cell Structure")).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Laws of Motion").length).toBeGreaterThanOrEqual(1);
    expect(getProgress).toHaveBeenCalled();

    expect(screen.getByRole("tab", { name: /progress/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("renders the identity header from the session user", () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    expect(screen.getAllByText("Harindra Sah").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("sahrocky81@gmail.com").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("HS")).toBeInTheDocument(); // initials
    expect(screen.getAllByText("Owner").length).toBeGreaterThanOrEqual(1); // canonical access-tier badge
    // The unified access-tier card replaces the separate plan badge.
    expect(screen.getByText(/Owner plan/)).toBeInTheDocument();
    // Balance shows in the wallet card (and wherever else it appears).
    expect(screen.getAllByText(/42/).length).toBeGreaterThanOrEqual(1);
    // Plan & AI spark card: tier, allowance meter and reset countdown.
    expect(screen.getByText(/Plan & AI Spark/)).toBeInTheDocument();
    expect(screen.getByText("content sparks available")).toBeInTheDocument();
    // Study stats strip: streak + counters.
    expect(screen.getAllByText(/day streak/i).length).toBeGreaterThanOrEqual(1);
    // Owner console shortcut present for allowlisted owners.
    expect(screen.getByRole("link", { name: /owner console/i })).toHaveAttribute(
      "href",
      "/owner"
    );
  });

  it("renders both media pencils and six real statistic cards", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    expect(
      screen.getByRole("button", { name: /edit profile picture/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit cover image/i })).toBeInTheDocument();

    // Six quick statistics, each fed by real data.
    const cards = screen.getAllByTestId("stat-card");
    expect(cards).toHaveLength(6);
    expect(within(cards[0]).getByText("Topics completed")).toBeInTheDocument();
    expect(within(cards[1]).getByText("In progress")).toBeInTheDocument();
    expect(within(cards[2]).getByText("Scholar XP")).toBeInTheDocument();
    expect(within(cards[3]).getByText("Day streak")).toBeInTheDocument();
    expect(within(cards[4]).getByText("Community posts")).toBeInTheDocument();
    expect(within(cards[5]).getByText("Followers")).toBeInTheDocument();

    // The completed counter comes from the journey, not a literal.
    await waitFor(() => expect(within(cards[0]).getByText("1")).toBeInTheDocument());
    expect(getProgress).toHaveBeenCalled();
  });

  it("switches to the Account tab with account details", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    fireEvent.click(screen.getByRole("tab", { name: /account/i }));

    // "Full name" also labels the Overview personal-information row.
    expect(screen.getAllByText("Full name").length).toBeGreaterThanOrEqual(1);
    // The Account tab shows the unified access-tier row, not duplicated plan text.
    expect(screen.getAllByText("Access tier").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Unlimited Veer sparks/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /full progress page/i })
    ).toHaveAttribute("href", "/progress");

    // Overview content stays mounted (previous tab content preserved).
    expect((await screen.findAllByText("Cell Structure")).length).toBeGreaterThanOrEqual(1);
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

  it("switches to the Achievements tab for badges and the scholar ladder", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    const achievementsTab = screen.getByRole("tab", { name: /achievements/i });
    expect(achievementsTab).toBeInTheDocument();
    fireEvent.click(achievementsTab);

    expect(screen.getByText("Scholar Level & Academic Hierarchy")).toBeInTheDocument();
    expect(screen.getByText("Scholar Progression Roadmap")).toBeInTheDocument();
    expect(screen.getByText(/Earned badges/)).toBeInTheDocument();
  });

  it("switches to Curriculum tab for grade focus and subjects", () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    fireEvent.click(screen.getByRole("tab", { name: /curriculum/i }));

    expect(screen.getByText("Academic Grade & Curriculum Settings")).toBeInTheDocument();
    expect(screen.getByText("CDC Nepal Curriculum")).toBeInTheDocument();
    // Grade chips double as pressed-state buttons in Overview — scope to the tab.
    const panel = screen.getByRole("tabpanel", { name: /curriculum/i });
    expect(within(panel).getByRole("button", { name: /class 11 science/i })).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: /class 12 science/i })).toBeInTheDocument();
    expect(within(panel).getByRole("link", { name: /physics/i })).toHaveAttribute(
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

  it("renders uploaded avatar and cover instead of initials or a fake gradient", async () => {
    getMyProfile.mockResolvedValue({
      profile: {
        id: ownerUser.id,
        fullName: ownerUser.fullName,
        username: "harindra",
        bio: null,
        location: null,
        website: null,
        plan: "pro",
        role: "owner",
        visibility: "public",
        avatarUrl: "/api/profile/media?path=profiles%2Fu1%2Favatar-1.webp",
        coverUrl: "/api/profile/media?path=profiles%2Fu1%2Fcover-1.webp",
        extras: {},
        isYou: true,
      },
      stats: { posts: 0, comments: 0, likesReceived: 0, filesShared: 0, followers: 0, following: 0 },
      storage: storageFixture,
    });

    render(<ProfilePage />);
    const avatar = await screen.findByRole("img", { name: "Harindra Sah" });
    expect(avatar).toHaveAttribute("src", "/api/profile/media?path=profiles%2Fu1%2Favatar-1.webp");
    expect(avatar).toHaveAttribute("loading", "eager");
    expect(avatar).toHaveAttribute("sizes");
    expect(screen.queryByText("HS")).not.toBeInTheDocument();
    const cover = document.querySelector(
      'img[src="/api/profile/media?path=profiles%2Fu1%2Fcover-1.webp"]',
    );
    expect(cover).toBeTruthy();
    expect(cover).toHaveAttribute("loading", "eager");
    expect(cover).toHaveAttribute("sizes");

    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));
    expect(await screen.findAllByRole("img", { name: "Harindra Sah" })).not.toHaveLength(0);
    expect(screen.queryByText("HS")).not.toBeInTheDocument();
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

  it("wires the hero actions to real routes", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    expect(screen.getByRole("link", { name: "Edit Profile" })).toHaveAttribute(
      "href",
      "/profile/edit",
    );
    expect(screen.getByRole("link", { name: "Wallet" })).toHaveAttribute("href", "/credits");
    expect(screen.getByRole("link", { name: "Bookmarks" })).toHaveAttribute(
      "href",
      "/bookmarks",
    );
    // The public link resolves to /profile/<username> once media has loaded.
    await waitFor(() =>
      expect(screen.getByRole("link", { name: "View Public Profile" })).toHaveAttribute(
        "href",
        "/profile/harindra",
      ),
    );
  });

  it("keeps both visibility selects uniquely labelled and reports save failures without losing the selection", async () => {
    let resolveUpdate: (value: unknown) => void = () => {};
    updateMyProfile.mockImplementation(
      () => new Promise((resolve) => void (resolveUpdate = resolve)),
    );

    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));

    // The trigger shows the friendly option label, not the raw API value.
    const overviewSelect = screen.getByLabelText("Profile visibility (Overview)");
    expect(overviewSelect).toHaveTextContent(/Public — anyone with the link/);

    // Persist through updateMyProfile with visible save state.
    fireEvent.click(overviewSelect);
    fireEvent.click(screen.getByRole("option", { name: /members only/i }));
    await waitFor(() => expect(updateMyProfile).toHaveBeenCalledWith({ visibility: "members" }));
    expect(screen.getByText("Saving…")).toBeInTheDocument();
    resolveUpdate({ profile: { id: "u1", visibility: "members" } });
    await waitFor(() =>
      expect(screen.getByText(/Progress, badges and credits stay private/)).toBeInTheDocument(),
    );
    expect(screen.getByLabelText("Profile visibility (Overview)")).toHaveTextContent(
      /Members only/,
    );

    // Both tabs are mounted now — each select still resolves exactly once.
    fireEvent.click(screen.getByRole("tab", { name: /account/i }));
    expect(screen.getByLabelText("Profile visibility (Overview)")).toBeInTheDocument();
    const accountSelect = screen.getByLabelText("Profile visibility (Account)");
    expect(accountSelect).toHaveTextContent(/Members only/); // shared state stays in sync

    // A rejected save surfaces an error and keeps the chosen selection.
    updateMyProfile.mockRejectedValueOnce(new Error("offline"));
    fireEvent.click(accountSelect);
    fireEvent.click(screen.getByRole("option", { name: /only you/i }));
    await waitFor(() => expect(updateMyProfile).toHaveBeenLastCalledWith({ visibility: "private" }));
    const accountPanel = screen.getByRole("tabpanel", { name: /account/i });
    expect(await within(accountPanel).findByText(/Couldn.t save visibility/)).toBeInTheDocument();
    expect(screen.getByLabelText("Profile visibility (Account)")).toHaveTextContent(/only you/i);
  });

  it("logs out and routes home", async () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /my profile/i }));
    fireEvent.click(screen.getByRole("tab", { name: /account/i }));

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    await waitFor(() => expect(logoutUser).toHaveBeenCalled());
    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
  });
});
