import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

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

import ProfilePage from "@/app/(app)/profile/page";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const ownerUser = {
  id: "u1",
  email: "harindarsah98172@gmail.com",
  fullName: "Harindra Sah",
  role: "OWNER" as const,
  credits: 42,
  creditsLimit: 100,
  premiumStatus: true,
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
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("ProfilePage", () => {
  it("opens directly on the Progress tab (profile → progress)", async () => {
    render(<ProfilePage />);

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

    expect(screen.getByText("Harindra Sah")).toBeInTheDocument();
    expect(screen.getByText("harindarsah98172@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("HS")).toBeInTheDocument(); // initials
    expect(screen.getByText("Owner")).toBeInTheDocument(); // role badge
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText(/42/)).toBeInTheDocument(); // credits shown
    // Owner console shortcut present for allowlisted owners.
    expect(screen.getByRole("link", { name: /owner console/i })).toHaveAttribute(
      "href",
      "/owner"
    );
  });

  it("switches to the Account tab with account details", async () => {
    render(<ProfilePage />);

    fireEvent.click(screen.getByRole("tab", { name: /account/i }));

    expect(screen.getByText("Full name")).toBeInTheDocument();
    // "Premium" appears in the header badge AND the account row — both present.
    expect(screen.getAllByText("Premium").length).toBeGreaterThanOrEqual(2);
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
    expect(replace).toHaveBeenCalledWith("/login?next=/profile");
  });

  it("shows a loading skeleton while the session resolves", () => {
    sessionState.user = null;
    sessionState.isLoading = true;

    const { container } = render(<ProfilePage />);
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
    expect(replace).not.toHaveBeenCalled();
  });
});
