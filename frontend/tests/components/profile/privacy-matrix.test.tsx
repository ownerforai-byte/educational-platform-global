/**
 * Privacy matrix — the same account seen from both sides:
 *
 *  - the owner page shows credits/limit and the reset countdown; the public
 *    shell for that same user shows NO credit number, NO wallet card and NO
 *    AI-spark allowance — asserted on the rendered document and on the API
 *    payloads the views consumed;
 *  - `progress: null` hides progress stats, bars and badges publicly and shows
 *    the private note, while the owner page still shows its own progress;
 *  - badges are earned-only in public, and an unearned rule title is only ever
 *    the owner's "next milestone";
 *  - a brand-new account gets honest empty states — no invented numbers.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";

// ─── Mocks (hoisted so the module factories can see them) ───────────────────

const state = vi.hoisted(() => ({
  pathname: "/profile/harindra",
}));

const api = vi.hoisted(() => ({
  // private surface
  getMyProfile: vi.fn(),
  getStorage: vi.fn(),
  updateMyProfile: vi.fn(),
  getProgress: vi.fn(),
  getAiSparkUsage: vi.fn(),
  getUserCredits: vi.fn(),
  // public surface
  getPublicProfile: vi.fn(),
  getProfileProgress: vi.fn(),
  getProfilePosts: vi.fn(),
  getProfileFiles: vi.fn(),
  getProfileFollowers: vi.fn(),
  getProfileFollowing: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => state.pathname,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: React.ReactNode } & Record<string, unknown>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({
    user: {
      id: "u1",
      email: "sahrocky81@gmail.com",
      fullName: "Harindra Sah",
      role: "owner",
      credits: 42,
      creditsLimit: 100,
      premiumStatus: true,
    },
    isLoading: false,
    refresh: vi.fn(),
    logoutUser: vi.fn(),
  }),
}));

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => api.getProgress(...args),
  updateProgress: vi.fn(),
}));

vi.mock("@/lib/api/ai", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getAiSparkUsage: (...args: unknown[]) => api.getAiSparkUsage(...args),
}));

vi.mock("@/lib/api/credits", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getUserCredits: (...args: unknown[]) => api.getUserCredits(...args),
}));

vi.mock("@/lib/api/profile", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getMyProfile: (...args: unknown[]) => api.getMyProfile(...args),
  getStorage: (...args: unknown[]) => api.getStorage(...args),
  updateMyProfile: (...args: unknown[]) => api.updateMyProfile(...args),
  getPublicProfile: (...args: unknown[]) => api.getPublicProfile(...args),
  getProfileProgress: (...args: unknown[]) => api.getProfileProgress(...args),
  getProfilePosts: (...args: unknown[]) => api.getProfilePosts(...args),
  getProfileFiles: (...args: unknown[]) => api.getProfileFiles(...args),
  getProfileFollowers: (...args: unknown[]) => api.getProfileFollowers(...args),
  getProfileFollowing: (...args: unknown[]) => api.getProfileFollowing(...args),
}));

import ProfilePage from "@/app/(app)/profile/page";
import { PublicProfileShell } from "@/features/profile/public-profile-shell";

// ─── Fixtures — ONE account, both sides ─────────────────────────────────────

const storage = {
  usedBytes: 2 * 1024 * 1024,
  limitBytes: 20 * 1024 * 1024,
  remainingBytes: 18 * 1024 * 1024,
  unlimited: false,
};

const zeroStats = {
  posts: 0,
  comments: 0,
  likesReceived: 0,
  filesShared: 0,
  followers: 0,
  following: 0,
};

const meProfile = {
  id: "u1",
  fullName: "Harindra Sah",
  username: "harindra",
  bio: null,
  location: null,
  website: null,
  plan: "pro",
  role: "owner",
  visibility: "public",
  avatarUrl: null,
  coverUrl: null,
  extras: {},
  isYou: true,
};

const publicProfile = {
  ...meProfile,
  bio: "NEB aspirant.",
  location: "Kathmandu",
  isYou: false,
};

/** Exactly one completed topic: "First Step" is earned, "Ten Down" is next. */
const oneCompleted = [
  {
    id: "p1",
    topicId: "t1",
    completed: true,
    completedAt: "2025-06-02T00:00:00.000Z",
    updatedAt: "2025-06-02T00:00:00.000Z",
    status: "completed",
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
];

const publicCounts = {
  completed: 1,
  inProgress: 0,
  notStarted: 54,
  total: 55,
  percent: 2,
  subjects: [{ subjectSlug: "biology", completed: 1, inProgress: 0, total: 55 }],
};

function seedPublic({ progress }: { progress: typeof publicCounts | null }) {
  api.getPublicProfile.mockResolvedValue({
    profile: publicProfile,
    stats: zeroStats,
    following: false,
    migrated: false,
  });
  api.getProfileProgress.mockResolvedValue({ progress, migrated: false });
  api.getProfilePosts.mockResolvedValue({ posts: [], migrated: false });
  api.getProfileFiles.mockResolvedValue({ files: [], migrated: false });
  api.getProfileFollowers.mockResolvedValue({ users: [], migrated: false });
  api.getProfileFollowing.mockResolvedValue({ users: [], migrated: false });
}

function renderPublic(tab: Parameters<typeof PublicProfileShell>[0]["initialTab"] = "overview") {
  state.pathname = tab === "overview" ? "/profile/harindra" : `/profile/harindra/${tab}`;
  return render(<PublicProfileShell username="harindra" initialTab={tab} />);
}

async function renderOwner() {
  render(<ProfilePage />);
  fireEvent.click(await screen.findByRole("button", { name: /my profile/i }));
  await screen.findByRole("tab", { name: /overview/i });
}

beforeEach(() => {
  vi.clearAllMocks();
  state.pathname = "/profile/harindra";
  api.getMyProfile.mockResolvedValue({
    profile: meProfile,
    stats: zeroStats,
    storage,
  });
  api.getStorage.mockResolvedValue(storage);
  api.getProgress.mockResolvedValue(oneCompleted);
  api.getAiSparkUsage.mockResolvedValue({ tier: "owner", limit: null, used: 3, remaining: null });
  api.updateMyProfile.mockResolvedValue({ profile: meProfile });
  api.getUserCredits.mockResolvedValue({ credits: 42, creditsLimit: 100 });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── Owner-visible credits vs public privacy ────────────────────────────────

describe("credits are owner-only", () => {
  it("the owner page renders credits/limit and the reset countdown", async () => {
    await renderOwner();

    // Balance with limit, wherever the owner reads it.
    expect(screen.getAllByText(/42 \/ 100/).length).toBeGreaterThanOrEqual(1);
    // The daily reset countdown is visible on the account card…
    expect(screen.getByText("Daily reset")).toBeInTheDocument();
    expect(screen.getAllByText(/in \d+h \d+m/).length).toBeGreaterThanOrEqual(1);
    // …and on the plan/spark and wallet cards.
    expect(screen.getByText("Plan & AI Spark")).toBeInTheDocument();
    expect(screen.getByText(/Resets in \d+h \d+m/)).toBeInTheDocument();
    expect(screen.getByText("Content Spark Wallet")).toBeInTheDocument();
    expect(screen.getByText("content sparks available")).toBeInTheDocument();
  });

  it("the public shell for the same user exposes no credit number, wallet card or AI-spark allowance", async () => {
    seedPublic({ progress: publicCounts });
    renderPublic("overview");
    await screen.findByRole("heading", { name: "Harindra Sah" });

    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/credit/i);
    expect(text).not.toMatch(/wallet/i);
    expect(text).not.toMatch(/spark/i);
    expect(text).not.toMatch(/veer/i);
    // The owner's balance number never appears as a figure.
    expect(screen.queryByText("42")).toBeNull();

    // The credit API is never touched by the public surface.
    expect(api.getUserCredits).not.toHaveBeenCalled();
    expect(api.getAiSparkUsage).not.toHaveBeenCalled();

    // The payloads the public views consumed carry no credit data.
    for (const result of [
      ...api.getPublicProfile.mock.results,
      ...api.getProfileProgress.mock.results,
    ]) {
      expect(JSON.stringify(await result.value)).not.toMatch(/credit/i);
    }
    expect(api.getProfileProgress).toHaveBeenCalledWith("harindra");

    // The same holds on the deeper tabs.
    cleanup();
    seedPublic({ progress: publicCounts });
    renderPublic("about");
    expect((await screen.findAllByText("Kathmandu")).length).toBeGreaterThanOrEqual(1);
    expect(document.body.textContent ?? "").not.toMatch(/credit/i);
  });
});

// ─── Progress privacy ───────────────────────────────────────────────────────

describe("hidden progress", () => {
  it("progress: null hides stats, bars and badges publicly but the owner keeps their progress", async () => {
    seedPublic({ progress: null });
    renderPublic("overview");

    expect(await screen.findByText(/progress is private/i)).toBeInTheDocument();
    // No bars, no derived statistics, no badges — just the quiet notes.
    expect(screen.queryAllByRole("progressbar")).toHaveLength(0);
    expect(screen.queryByText("topics completed")).toBeNull();
    expect(screen.queryByText(/of the syllabus/)).toBeNull();
    expect(screen.getByText(/badges are private/i)).toBeInTheDocument();

    seedPublic({ progress: null });
    cleanup();
    renderPublic("progress");
    expect(await screen.findByText(/progress is private/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("progressbar")).toHaveLength(0);

    // The owner's own page is untouched by the public privacy flag.
    cleanup();
    await renderOwner();
    expect((await screen.findAllByText("Cell Structure")).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Topics completed").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Earned-only badges ─────────────────────────────────────────────────────

describe("badges are earned-only in public", () => {
  it("an unearned rule title is absent publicly and is the owner's next milestone", async () => {
    // Private: "First Step" earned, "Ten Down" only as the next milestone.
    await renderOwner();
    expect((await screen.findAllByText("First Step")).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Next: Ten Down/)).toBeInTheDocument();

    // Public: only the earned badge — the unearned rule title never renders.
    cleanup();
    seedPublic({ progress: publicCounts });
    renderPublic("badges");
    expect(await screen.findByText("First Step")).toBeInTheDocument();
    expect(screen.getByText(/only badges this learner has already earned/i)).toBeInTheDocument();
    expect(screen.queryByText("Ten Down")).toBeNull();
    expect(screen.queryByText("Fifty Club")).toBeNull();
    expect(screen.queryByText("Warm Up")).toBeNull();
    expect(screen.queryByText(/Next:/)).toBeNull();
  });
});

// ─── Honest empty states ────────────────────────────────────────────────────

describe("brand-new account", () => {
  it("shows honest empty states with no invented numbers or badges", async () => {
    api.getProgress.mockResolvedValue([]);
    api.getMyProfile.mockResolvedValue({
      profile: meProfile,
      stats: zeroStats,
      storage: { usedBytes: 0, limitBytes: 20 * 1024 * 1024, remainingBytes: 20 * 1024 * 1024, unlimited: false },
    });

    // Owner side: real zeros, real rule count, no badge titles.
    await renderOwner();
    expect(screen.getByText(/0 of 9 badges earned/)).toBeInTheDocument();
    expect(screen.getByText(/no badges yet/i)).toBeInTheDocument();
    expect(screen.queryByText("First Step")).toBeNull();
    expect(screen.queryByText("Ten Down")).toBeNull();

    // Public side: zero counts, no invented badges or percentages.
    cleanup();
    seedPublic({
      progress: { completed: 0, inProgress: 0, notStarted: 0, total: 0, percent: 0, subjects: [] },
    });
    renderPublic("badges");
    expect(await screen.findByText(/no public badges yet/i)).toBeInTheDocument();
    expect(screen.queryByText("First Step")).toBeNull();
    expect(screen.queryByText("Ten Down")).toBeNull();

    cleanup();
    renderPublic("overview");
    await screen.findByRole("heading", { name: "Harindra Sah" });
    expect(document.body.textContent ?? "").not.toMatch(/[1-9]\d*% of the syllabus/);
  });
});
