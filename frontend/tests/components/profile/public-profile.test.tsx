/**
 * Public (visitor) profile — rows, tabs, privacy and the absence of owner-only
 * numbers. The API module and the session hook are mocked; these tests assert
 * what a visitor is actually allowed to see.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

// ─── Mocks (hoisted so the module factories can see them) ───────────────────

const state = vi.hoisted(() => ({
  pathname: "/profile/alice",
  userId: "viewer-1" as string | null,
}));

const api = vi.hoisted(() => ({
  getPublicProfile: vi.fn(),
  getProfileProgress: vi.fn(),
  getProfilePosts: vi.fn(),
  getProfileFiles: vi.fn(),
  getProfileFollowers: vi.fn(),
  getProfileFollowing: vi.fn(),
  followUser: vi.fn(),
  unfollowUser: vi.fn(),
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
    user: state.userId ? { id: state.userId } : null,
    isLoading: false,
    refresh: vi.fn(),
    logoutUser: vi.fn(),
  }),
}));

vi.mock("@/lib/api/profile", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api/profile")>();
  return {
    ...actual,
    getPublicProfile: (...args: unknown[]) => api.getPublicProfile(...args),
    getProfileProgress: (...args: unknown[]) => api.getProfileProgress(...args),
    getProfilePosts: (...args: unknown[]) => api.getProfilePosts(...args),
    getProfileFiles: (...args: unknown[]) => api.getProfileFiles(...args),
    getProfileFollowers: (...args: unknown[]) => api.getProfileFollowers(...args),
    getProfileFollowing: (...args: unknown[]) => api.getProfileFollowing(...args),
    followUser: (...args: unknown[]) => api.followUser(...args),
    unfollowUser: (...args: unknown[]) => api.unfollowUser(...args),
  };
});

import { PublicProfileShell } from "@/features/profile/public-profile-shell";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const profile = {
  id: "u-alice",
  fullName: "Alice Sharma",
  username: "alice",
  bio: "Physics enthusiast preparing for the NEB boards.",
  location: "Kathmandu",
  website: "https://alice.example",
  plan: "pro",
  role: "student",
  visibility: "public",
  avatarUrl: "https://cdn.example/avatar.png",
  coverUrl: "https://cdn.example/cover.png",
  extras: {
    education: "BSc Physics",
    occupation: "Tutor",
    skills: "Mechanics, Optics",
    interests: "Astronomy",
    github: "https://github.com/alice",
  } as Record<string, unknown>,
  isYou: false,
};

const stats = {
  posts: 2,
  comments: 5,
  likesReceived: 9,
  filesShared: 1,
  followers: 12,
  following: 7,
};

const progress = {
  completed: 12,
  inProgress: 3,
  notStarted: 40,
  total: 55,
  percent: 22,
  subjects: [
    { subjectSlug: "physics", completed: 8, inProgress: 2, total: 30 },
    { subjectSlug: "chemistry", completed: 4, inProgress: 1, total: 25 },
  ],
};

const posts = [
  {
    id: "p1",
    title: "How I revise mechanics",
    body: "Short answer: past papers, daily.",
    category: "study-tips",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

const files = [
  {
    id: "f1",
    postId: "p1",
    filename: "mechanics-notes.pdf",
    contentType: "application/pdf",
    byteSize: 2048,
    createdAt: "2026-01-02T00:00:00.000Z",
  },
];

const follower = {
  id: "u-bob",
  fullName: "Bob Thapa",
  username: "bob",
  avatarUrl: null,
  followingByYou: false,
};

function seed({ progressPayload }: { progressPayload?: typeof progress | null } = {}) {
  api.getPublicProfile.mockResolvedValue({ profile, stats, following: false, migrated: false });
  api.getProfileProgress.mockResolvedValue({
    progress: progressPayload === undefined ? progress : progressPayload,
    migrated: false,
  });
  api.getProfilePosts.mockResolvedValue({ posts, migrated: false });
  api.getProfileFiles.mockResolvedValue({ files, migrated: false });
  api.getProfileFollowers.mockResolvedValue({ users: [follower], migrated: false });
  api.getProfileFollowing.mockResolvedValue({ users: [follower], migrated: false });
  api.followUser.mockResolvedValue({});
  api.unfollowUser.mockResolvedValue({});
}

function renderTab(tab: "overview" | "about" | "progress" | "badges" | "posts" | "files" | "followers" | "following") {
  state.pathname = tab === "overview" ? "/profile/alice" : `/profile/alice/${tab}`;
  return render(<PublicProfileShell username="alice" initialTab={tab} />);
}

beforeEach(() => {
  vi.clearAllMocks();
  state.pathname = "/profile/alice";
  state.userId = "viewer-1";
});

// ─── Row 1: public identity ─────────────────────────────────────────────────

describe("public profile identity", () => {
  it("renders the cover, avatar, name and handle", async () => {
    seed();
    const { container } = renderTab("overview");

    expect(await screen.findByRole("heading", { name: "Alice Sharma" })).toBeInTheDocument();
    expect(screen.getByAltText("Alice Sharma")).toHaveAttribute("src", profile.avatarUrl);
    expect(screen.getByText("@alice")).toBeInTheDocument();

    // The cover renders as a decorative (empty-alt) image.
    const cover = container.querySelector('img[alt=""]');
    expect(cover).not.toBeNull();
    expect(cover).toHaveAttribute("src", profile.coverUrl);
  });

  it("renders the biography, location and website", async () => {
    seed();
    renderTab("overview");

    // Overview shows the identity row and the compact About summary, so the
    // bio and location legitimately appear once per row.
    expect((await screen.findAllByText(profile.bio)).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Kathmandu").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /alice\.example/i }).length).toBeGreaterThan(0);
  });

  it("never renders an owner-only edit or remove control", async () => {
    seed();
    renderTab("overview");

    await screen.findByRole("heading", { name: "Alice Sharma" });
    expect(screen.queryByLabelText(/edit profile picture/i)).toBeNull();
    expect(screen.queryByLabelText(/remove cover/i)).toBeNull();
    expect(screen.queryByText(/^remove$/i)).toBeNull();
    // The visitor sees Follow, not the owner's Edit profile.
    expect(screen.queryByRole("link", { name: /edit profile/i })).toBeNull();
  });

  it("shows Edit profile instead of follow on your own profile", async () => {
    seed();
    state.userId = profile.id;
    api.getPublicProfile.mockResolvedValue({
      profile: { ...profile, isYou: true },
      stats,
      following: false,
      migrated: false,
    });
    renderTab("overview");

    expect(await screen.findByRole("link", { name: /edit profile/i })).toBeInTheDocument();
    expect(screen.queryByLabelText("Follow @alice")).toBeNull();
  });

  it("toggles follow when the visitor taps Follow", async () => {
    seed();
    renderTab("overview");

    const follow = await screen.findByLabelText("Follow @alice");
    fireEvent.click(follow);

    await waitFor(() => expect(api.followUser).toHaveBeenCalledWith("alice"));
    expect(await screen.findByLabelText("Unfollow @alice")).toBeInTheDocument();
  });

  it("copies the public profile link and confirms it briefly", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    seed();
    renderTab("overview");

    fireEvent.click(await screen.findByLabelText("Copy profile link"));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0][0]).toContain("/profile/alice");
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });
});

// ─── Row 2 + 3: statistics and progress ─────────────────────────────────────

describe("public progress", () => {
  it("renders progress bars and the public statistics from the payload", async () => {
    seed();
    renderTab("overview");

    expect(await screen.findByText("22% of the syllabus")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);
    expect(screen.getByText("topics completed")).toBeInTheDocument();
    expect(screen.getByText("followers")).toBeInTheDocument();
    // 12 completed topics from the progress payload (and 12 followers from the
    // stats payload), never a credit figure.
    expect(screen.getAllByText("12").length).toBeGreaterThanOrEqual(2);
    expect(api.getProfileProgress).toHaveBeenCalledWith("alice");
  });

  it("renders overall and per-subject progress on the Progress tab", async () => {
    seed();
    renderTab("progress");

    expect(await screen.findByText("22%")).toBeInTheDocument();
    expect(screen.getByText("Physics")).toBeInTheDocument();
    expect(screen.getByText("Chemistry")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/learning points/i)).toBeInTheDocument();
  });

  it("shows a quiet private note and no bars when progress is hidden", async () => {
    seed({ progressPayload: null });
    renderTab("overview");

    expect(await screen.findByText(/progress is private/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("progressbar")).toHaveLength(0);
    // The progress-dependent statistics are hidden too.
    expect(screen.queryByText("topics completed")).toBeNull();
    expect(screen.queryByText("syllabus %")).toBeNull();
    // And it is a note, not an error.
    expect(screen.queryByText(/could not load/i)).toBeNull();
  });
});

// ─── Row 4: badges ──────────────────────────────────────────────────────────

describe("public badges", () => {
  it("renders only earned badges with a verified milestone", async () => {
    seed();
    renderTab("badges");

    expect(await screen.findByText("First Step")).toBeInTheDocument();
    expect(screen.getByText("Ten Down")).toBeInTheDocument();
    expect(screen.getByText("Verified: 10 topics completed")).toBeInTheDocument();

    // Unearned rules are never shown to a visitor.
    expect(screen.queryByText("Fifty Club")).toBeNull();
    expect(screen.queryByText("Warm Up")).toBeNull();
    expect(screen.queryByText("Quarter Way")).toBeNull();
  });
});

// ─── Row 5: about ───────────────────────────────────────────────────────────

describe("public about", () => {
  it("renders public profile details and hides empty fields", async () => {
    seed();
    renderTab("about");

    expect(await screen.findByText("BSc Physics")).toBeInTheDocument();
    expect(screen.getByText("Tutor")).toBeInTheDocument();
    expect(screen.getByText("Mechanics, Optics")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByText("Interests")).toBeInTheDocument();
    // Social keys the profile does not publish stay hidden.
    expect(screen.queryByRole("link", { name: /portfolio/i })).toBeNull();
  });
});

// ─── Row 6: contributions ───────────────────────────────────────────────────

describe("public contributions", () => {
  it("renders recent posts", async () => {
    seed();
    renderTab("posts");

    const link = await screen.findByRole("link", { name: "How I revise mechanics" });
    expect(link).toHaveAttribute("href", "/ai/community/posts/p1");
    expect(screen.getByText(/past papers, daily/i)).toBeInTheDocument();
  });

  it("renders shared files with a download link", async () => {
    seed();
    renderTab("files");

    const link = await screen.findByRole("link", { name: "mechanics-notes.pdf" });
    expect(link.getAttribute("href")).toContain("/feed/attachments/f1/file");
    expect(screen.getByText("2.0 KB")).toBeInTheDocument();
  });
});

// ─── Row 7: followers / following ───────────────────────────────────────────

describe("public people lists", () => {
  it("renders followers with a follow button per person", async () => {
    seed();
    renderTab("followers");

    expect(await screen.findByText("Bob Thapa")).toBeInTheDocument();
    expect(screen.getByText("@bob")).toBeInTheDocument();
    expect(screen.getByLabelText("Follow @bob")).toBeInTheDocument();
    expect(api.getProfileFollowers).toHaveBeenCalledWith("alice");
  });

  it("renders the following list", async () => {
    seed();
    renderTab("following");

    expect(await screen.findByText("Bob Thapa")).toBeInTheDocument();
    expect(api.getProfileFollowing).toHaveBeenCalledWith("alice");
  });
});

// ─── Tabs + privacy invariants ──────────────────────────────────────────────

describe("public profile navigation and privacy", () => {
  it("marks the current tab and links every section", async () => {
    seed();
    renderTab("badges");

    await screen.findByText("First Step");
    const nav = screen.getByRole("navigation", { name: /profile sections/i });
    const current = nav.querySelector('[aria-current="page"]');
    expect(current?.textContent).toBe("Badges");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/profile/alice");
    expect(screen.getByRole("link", { name: "Progress" })).toHaveAttribute(
      "href",
      "/profile/alice/progress",
    );
  });

  it("never renders credit or wallet text", async () => {
    seed();
    renderTab("overview");

    await screen.findByRole("heading", { name: "Alice Sharma" });
    expect(document.body.textContent ?? "").not.toMatch(/credits/i);
    expect(document.body.textContent ?? "").not.toMatch(/wallet/i);
  });

  it("shows the not-found state with a search link", async () => {
    seed();
    api.getPublicProfile.mockRejectedValue(new Error("Profile not found"));
    renderTab("overview");

    expect(await screen.findByText("Profile not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /search users/i })).toHaveAttribute("href", "/users");
  });
});
