/**
 * Profile integration — the real owner journeys through the whole
 * `/profile` page (You hub → dashboard), not snapshots:
 *
 *  - the dashboard hero's avatar pencil is the control that edits the avatar,
 *    and the cover pencil never touches it;
 *  - removing one image keeps the other mounted;
 *  - the storage meter follows the `storage` the API returns;
 *  - tab switches keep loaded data and never re-fetch progress;
 *  - the activity pager + intersecting filters + "Clear filters";
 *  - the visibility select persists, and a rejected save surfaces an error
 *    without losing the selection;
 *  - log out clears the session through the session hook.
 *
 * The profile API module and the session hook are mocked the way
 * `profile-page.test.tsx` does; jsdom gaps for the image crop dialog are
 * stubbed the way `profile-image-editor.test.tsx` does.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

const getAiSparkUsage = vi.fn();

vi.mock("@/lib/api/ai", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getAiSparkUsage: (...args: unknown[]) => getAiSparkUsage(...args),
}));

const api = vi.hoisted(() => ({
  getMyProfile: vi.fn(),
  getStorage: vi.fn(),
  updateMyProfile: vi.fn(),
  uploadAvatar: vi.fn(),
  uploadCover: vi.fn(),
  removeAvatar: vi.fn(),
  removeCover: vi.fn(),
}));

vi.mock("@/lib/api/profile", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getMyProfile: (...args: unknown[]) => api.getMyProfile(...args),
  getStorage: (...args: unknown[]) => api.getStorage(...args),
  updateMyProfile: (...args: unknown[]) => api.updateMyProfile(...args),
  uploadAvatar: (...args: unknown[]) => api.uploadAvatar(...args),
  uploadCover: (...args: unknown[]) => api.uploadCover(...args),
  removeAvatar: (...args: unknown[]) => api.removeAvatar(...args),
  removeCover: (...args: unknown[]) => api.removeCover(...args),
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

const AVATAR_URL = "/api/profile/media?path=profiles%2Fu1%2Favatar-1.webp";
const COVER_URL = "/api/profile/media?path=profiles%2Fu1%2Fcover-1.webp";
const NEW_AVATAR_URL = "/api/profile/media?path=profiles%2Fu1%2Favatar-2.webp";
const NEW_COVER_URL = "/api/profile/media?path=profiles%2Fu1%2Fcover-2.webp";

type ProfileOverrides = {
  avatarUrl?: string | null;
  coverUrl?: string | null;
  visibility?: string;
};

function profilePayload(overrides: ProfileOverrides = {}) {
  return {
    id: ownerUser.id,
    fullName: ownerUser.fullName,
    username: "harindra",
    bio: null,
    location: null,
    website: null,
    plan: "pro",
    role: "owner",
    visibility: "public",
    avatarUrl: AVATAR_URL,
    coverUrl: COVER_URL,
    extras: {},
    isYou: true,
    ...overrides,
  };
}

const stats = {
  posts: 0,
  comments: 0,
  likesReceived: 0,
  filesShared: 0,
  followers: 0,
  following: 0,
};

const storage = {
  usedBytes: 2 * 1024 * 1024,
  limitBytes: 20 * 1024 * 1024,
  remainingBytes: 18 * 1024 * 1024,
  unlimited: false,
};

const progressEntries = [
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
  {
    id: "p2",
    topicId: "t2",
    completed: false,
    updatedAt: "2025-06-01T00:00:00.000Z",
    status: "in_progress",
    topic: { slug: "motion", title: "Laws of Motion" },
  },
];

/** 12 dated sessions so the activity feed paginates (page size is 10). */
const activityTitles = [
  "Algebra Practice",
  "Algebra Basics",
  "Geometry Proofs",
  "Topic Four",
  "Topic Five",
  "Topic Six",
  "Topic Seven",
  "Topic Eight",
  "Topic Nine",
  "Topic Ten",
  "Topic Eleven",
  "Topic Twelve",
];

const activityEntries = activityTitles.map((title, index) => ({
  id: `a${index + 1}`,
  topicId: `at${index + 1}`,
  completed: index % 3 === 0,
  completedAt: index % 3 === 0 ? `2025-07-${String(12 - index).padStart(2, "0")}T00:00:00.000Z` : null,
  updatedAt: `2025-07-${String(12 - index).padStart(2, "0")}T00:00:00.000Z`,
  status: index % 3 === 0 ? "completed" : "in_progress",
  topic: { slug: `topic-${index + 1}`, title },
}));

/** PNG magic bytes so client-side sniffing accepts the file. */
const pngFile = (name = "me.png") =>
  new File(
    [new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4, 5, 6, 7, 8])],
    name,
    { type: "image/png" },
  );

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = ownerUser;
  sessionState.isLoading = false;
  getProgress.mockResolvedValue(progressEntries);
  updateProgress.mockResolvedValue({});
  getAiSparkUsage.mockResolvedValue({ tier: "owner", limit: null, used: 3, remaining: null });
  api.getMyProfile.mockResolvedValue({ profile: profilePayload(), stats, storage });
  api.getStorage.mockResolvedValue(storage);
  api.updateMyProfile.mockImplementation(
    async (payload: { visibility?: string }) => ({
      profile: profilePayload({ visibility: payload.visibility ?? "public" }),
    }),
  );
  api.uploadAvatar.mockResolvedValue({
    profile: profilePayload({ avatarUrl: NEW_AVATAR_URL }),
    byteSize: 900,
    storage: { ...storage, usedBytes: 3 * 1024 * 1024, remainingBytes: 17 * 1024 * 1024 },
  });
  api.uploadCover.mockResolvedValue({
    profile: profilePayload({ coverUrl: NEW_COVER_URL }),
    byteSize: 1800,
    storage: { ...storage, usedBytes: 4 * 1024 * 1024, remainingBytes: 16 * 1024 * 1024 },
  });
  api.removeAvatar.mockResolvedValue({
    profile: profilePayload({ avatarUrl: null }),
    storage: { ...storage, usedBytes: 1024 * 1024, remainingBytes: 19 * 1024 * 1024 },
  });
  api.removeCover.mockResolvedValue({
    profile: profilePayload({ coverUrl: null }),
    storage: { ...storage, usedBytes: 1024 * 1024, remainingBytes: 19 * 1024 * 1024 },
  });

  // jsdom has no object URLs, no image decoder and no canvas backend.
  vi.stubGlobal("URL", Object.assign(URL, {
    createObjectURL: vi.fn(() => "blob:preview"),
    revokeObjectURL: vi.fn(),
  }));
  class FakeImage {
    naturalWidth = 800;
    naturalHeight = 600;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    set src(_value: string) {
      queueMicrotask(() => this.onload?.());
    }
  }
  vi.stubGlobal("Image", FakeImage);
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: "",
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((callback) =>
    callback(new Blob(["cropped"], { type: "image/jpeg" })),
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 400,
    height: 200,
    top: 0,
    left: 0,
    bottom: 200,
    right: 400,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function openDashboard() {
  render(<ProfilePage />);
  fireEvent.click(await screen.findByRole("button", { name: /my profile/i }));
  await screen.findByRole("tab", { name: /overview/i });
}

async function uploadThroughPencil(pencilName: RegExp, pickerName: RegExp) {
  fireEvent.click(screen.getByRole("button", { name: pencilName }));
  fireEvent.change(screen.getByLabelText(pickerName), { target: { files: [pngFile()] } });
  await waitFor(() => expect(screen.getByRole("button", { name: /^upload$/i })).toBeEnabled());
  fireEvent.click(screen.getByRole("button", { name: /^upload$/i }));
}

async function removeThroughPencil(pencilName: RegExp, confirmName: string) {
  fireEvent.click(screen.getByRole("button", { name: pencilName }));
  fireEvent.click(screen.getByRole("button", { name: /^remove$/i }));
  fireEvent.click(screen.getByRole("button", { name: confirmName }));
}

// ─── Private images ─────────────────────────────────────────────────────────

describe("profile image editing through the dashboard hero", () => {
  it("the avatar pencil uploads the avatar and the new avatarUrl renders", async () => {
    api.getMyProfile.mockResolvedValue({
      profile: profilePayload({ avatarUrl: null }),
      stats,
      storage,
    });
    await openDashboard();
    // The hero starts on the initials until the upload lands.
    await waitFor(() => expect(screen.getByText("HS")).toBeInTheDocument());

    await uploadThroughPencil(/edit profile picture/i, /choose profile picture/i);

    await waitFor(() => expect(api.uploadAvatar).toHaveBeenCalledTimes(1));
    expect(api.uploadAvatar.mock.calls[0]![0]).toBeInstanceOf(File);
    expect(api.uploadCover).not.toHaveBeenCalled();

    // The uploaded avatar renders in the hero instead of the initials.
    const avatar = await screen.findByRole("img", { name: "Harindra Sah" });
    await waitFor(() => expect(avatar).toHaveAttribute("src", NEW_AVATAR_URL));
    expect(screen.queryByText("HS")).not.toBeInTheDocument();
  });

  it("the cover pencil edits the cover and never touches the avatar", async () => {
    await openDashboard();
    await waitFor(() =>
      expect(document.querySelector(`img[src="${COVER_URL}"]`)).toBeTruthy(),
    );

    await uploadThroughPencil(/edit cover image/i, /choose cover image/i);

    await waitFor(() => expect(api.uploadCover).toHaveBeenCalledTimes(1));
    expect(api.uploadAvatar).not.toHaveBeenCalled();

    // The cover swapped to the new URL; the avatar is untouched.
    await waitFor(() =>
      expect(document.querySelector(`img[src="${NEW_COVER_URL}"]`)).toBeTruthy(),
    );
    expect(screen.getByRole("img", { name: "Harindra Sah" })).toHaveAttribute(
      "src",
      AVATAR_URL,
    );
    expect(document.querySelector(`img[src="${COVER_URL}"]`)).toBeNull();
  });

  it("rejects a fake image by magic bytes before any upload", async () => {
    await openDashboard();
    fireEvent.click(screen.getByRole("button", { name: /edit profile picture/i }));
    fireEvent.change(screen.getByLabelText(/choose profile picture/i), {
      target: { files: [new File(["just text"], "fake.jpg", { type: "image/jpeg" })] },
    });

    // The dashboard's own notes are live regions too — scope to the dialog.
    const dialog = screen.getByRole("dialog", { name: "Profile picture" });
    expect(await within(dialog).findByRole("status")).toHaveTextContent(
      /not a readable image/i,
    );
    expect(within(dialog).getByRole("button", { name: /^upload$/i })).toBeDisabled();
    expect(api.uploadAvatar).not.toHaveBeenCalled();
    expect(api.uploadCover).not.toHaveBeenCalled();
  });
});

// ─── Independent removal ────────────────────────────────────────────────────

describe("independent image removal", () => {
  it("removing the profile picture keeps the cover image mounted", async () => {
    await openDashboard();
    await waitFor(() =>
      expect(document.querySelector(`img[src="${COVER_URL}"]`)).toBeTruthy(),
    );

    await removeThroughPencil(/edit profile picture/i, "Remove profile picture");

    await waitFor(() => expect(api.removeAvatar).toHaveBeenCalledTimes(1));
    expect(api.removeCover).not.toHaveBeenCalled();

    // Avatar falls back to initials, the cover <img> stays in the document.
    expect(await screen.findByText("HS")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Harindra Sah" })).toBeNull();
    expect(document.querySelector(`img[src="${COVER_URL}"]`)).toBeTruthy();
  });

  it("removing the cover keeps the profile picture", async () => {
    await openDashboard();
    await waitFor(() => expect(screen.getByRole("img", { name: "Harindra Sah" })).toHaveAttribute(
      "src",
      AVATAR_URL,
    ));

    await removeThroughPencil(/edit cover image/i, "Remove cover image");

    await waitFor(() => expect(api.removeCover).toHaveBeenCalledTimes(1));
    expect(api.removeAvatar).not.toHaveBeenCalled();

    expect(screen.getByRole("img", { name: "Harindra Sah" })).toHaveAttribute(
      "src",
      AVATAR_URL,
    );
    expect(document.querySelector(`img[src="${COVER_URL}"]`)).toBeNull();
  });
});

// ─── Storage updates ────────────────────────────────────────────────────────

describe("storage meter", () => {
  it("reflects the storage returned by the API after an upload and a removal", async () => {
    await openDashboard();

    // Initial figure from the profile payload.
    expect(await screen.findAllByText("2.0 MB / 20.0 MB")).not.toHaveLength(0);
    expect(screen.getAllByText("18.0 MB free").length).toBeGreaterThanOrEqual(1);

    // Upload returns a bigger used figure — the meter follows it.
    await uploadThroughPencil(/edit profile picture/i, /choose profile picture/i);
    await waitFor(() =>
      expect(screen.getAllByText("3.0 MB / 20.0 MB").length).toBeGreaterThanOrEqual(1),
    );
    expect(screen.queryByText("2.0 MB / 20.0 MB")).toBeNull();
    expect(screen.getAllByText("17.0 MB free").length).toBeGreaterThanOrEqual(1);

    // Removal releases storage — the meter follows that too.
    await removeThroughPencil(/edit profile picture/i, "Remove profile picture");
    await waitFor(() =>
      expect(screen.getAllByText("1.0 MB / 20.0 MB").length).toBeGreaterThanOrEqual(1),
    );
    expect(screen.queryByText("3.0 MB / 20.0 MB")).toBeNull();
    expect(screen.getAllByText("19.0 MB free").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Tab switching ──────────────────────────────────────────────────────────

describe("dashboard tabs", () => {
  it("keeps loaded data across tab switches and does not refetch progress", async () => {
    await openDashboard();
    await screen.findAllByText("Cell Structure");

    // The dashboard loads the journey once, up front.
    await waitFor(() => expect(getProgress).toHaveBeenCalledTimes(1));

    for (const tab of ["achievements", "curriculum", "activity", "account"]) {
      fireEvent.click(screen.getByRole("tab", { name: new RegExp(tab, "i") }));
    }
    fireEvent.click(screen.getByRole("tab", { name: /overview/i }));

    // No tab switch re-fetched the journey, and the data is still there.
    expect(getProgress).toHaveBeenCalledTimes(1);
    expect(screen.getAllByText("Cell Structure").length).toBeGreaterThanOrEqual(1);

    // The Progress tab's panel does its own single load on first visit…
    fireEvent.click(screen.getByRole("tab", { name: /^progress$/i }));
    const progressPanel = screen.getByRole("tabpanel", { name: /^progress$/i });
    await within(progressPanel).findByText("Cell Structure");
    await waitFor(() => expect(getProgress).toHaveBeenCalledTimes(2));

    // …and switching back and forth never loads it again.
    fireEvent.click(screen.getByRole("tab", { name: /activity/i }));
    fireEvent.click(screen.getByRole("tab", { name: /^progress$/i }));
    fireEvent.click(screen.getByRole("tab", { name: /account/i }));
    fireEvent.click(screen.getByRole("tab", { name: /^progress$/i }));
    expect(getProgress).toHaveBeenCalledTimes(2);
    expect(within(progressPanel).getByText("Cell Structure")).toBeInTheDocument();

    // Loaded data survives the switches (topic rows + overview figures).
    fireEvent.click(screen.getByRole("tab", { name: /overview/i }));
    expect(screen.getAllByText("Cell Structure").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Activity pager and filters ─────────────────────────────────────────────

describe("activity feed", () => {
  it("shows page 1 of N, advances with Next, intersects filters and clears them", async () => {
    getProgress.mockResolvedValue(activityEntries);
    await openDashboard();
    fireEvent.click(screen.getByRole("tab", { name: /activity/i }));
    const panel = screen.getByRole("tabpanel", { name: /activity/i });

    // Twelve sessions paginate to two pages; page 1 holds the newest ten.
    await within(panel).findByText("Algebra Practice");
    expect(within(panel).getByText("Page 1 of 2")).toBeInTheDocument();
    expect(within(panel).getByText("12 of 12 sessions")).toBeInTheDocument();
    expect(within(panel).queryByText("Topic Twelve")).not.toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: /previous activity page/i })).toBeDisabled();

    // Next advances, Prev comes back.
    fireEvent.click(within(panel).getByRole("button", { name: /next activity page/i }));
    expect(within(panel).getByText("Page 2 of 2")).toBeInTheDocument();
    expect(within(panel).getByText("Topic Twelve")).toBeInTheDocument();
    expect(within(panel).queryByText("Algebra Practice")).not.toBeInTheDocument();
    fireEvent.click(within(panel).getByRole("button", { name: /previous activity page/i }));
    expect(within(panel).getByText("Page 1 of 2")).toBeInTheDocument();

    // Search narrows the feed…
    fireEvent.change(within(panel).getByRole("textbox", { name: /search activity/i }), {
      target: { value: "algebra" },
    });
    expect(within(panel).getByText("Algebra Practice")).toBeInTheDocument();
    expect(within(panel).getByText("Algebra Basics")).toBeInTheDocument();
    expect(within(panel).queryByText("Geometry Proofs")).not.toBeInTheDocument();

    // …and the status chip intersects with the search.
    fireEvent.click(within(panel).getByRole("button", { name: "Completed" }));
    expect(within(panel).getByText("Algebra Practice")).toBeInTheDocument();
    expect(within(panel).queryByText("Algebra Basics")).not.toBeInTheDocument();
    expect(within(panel).queryByText("Geometry Proofs")).not.toBeInTheDocument();
    expect(within(panel).getByText("1 of 12 sessions match your filters")).toBeInTheDocument();

    // Clear filters restores every session.
    fireEvent.click(within(panel).getByRole("button", { name: /clear filters/i }));
    await waitFor(() =>
      expect(within(panel).getByText("12 of 12 sessions")).toBeInTheDocument(),
    );
    expect(within(panel).getByText("Page 1 of 2")).toBeInTheDocument();
    expect(within(panel).getByText("Algebra Basics")).toBeInTheDocument();
  });
});

// ─── Visibility select ──────────────────────────────────────────────────────

describe("profile visibility select", () => {
  it("persists the chosen value and a rejected save surfaces an error without losing the selection", async () => {
    await openDashboard();
    const overviewSelect = screen.getByRole("combobox", {
      name: /profile visibility \(overview\)/i,
    });

    // The chosen option is persisted through the profile API.
    fireEvent.click(overviewSelect);
    fireEvent.click(screen.getByRole("option", { name: /members only/i }));
    await waitFor(() =>
      expect(api.updateMyProfile).toHaveBeenCalledWith({ visibility: "members" }),
    );
    await waitFor(() => expect(overviewSelect).toHaveTextContent(/members only/i));

    // A rejected save keeps the user's selection and surfaces the error.
    api.updateMyProfile.mockRejectedValueOnce(new Error("network down"));
    fireEvent.click(overviewSelect);
    fireEvent.click(screen.getByRole("option", { name: /private/i }));
    await waitFor(() =>
      expect(api.updateMyProfile).toHaveBeenCalledWith({ visibility: "private" }),
    );
    const error = screen.getByRole("status");
    await waitFor(() => expect(error).toHaveTextContent(/couldn't save visibility/i));
    expect(overviewSelect).toHaveTextContent(/private/i);

    // The selection is not lost on the other surface either.
    fireEvent.click(screen.getByRole("tab", { name: /account/i }));
    expect(
      screen.getByRole("combobox", { name: /profile visibility \(account\)/i }),
    ).toHaveTextContent(/private/i);

    // A later successful save clears the error and stores the new value.
    fireEvent.click(screen.getByRole("tab", { name: /overview/i }));
    fireEvent.click(screen.getByRole("combobox", { name: /profile visibility \(overview\)/i }));
    fireEvent.click(screen.getByRole("option", { name: /members only/i }));
    await waitFor(() =>
      expect(api.updateMyProfile).toHaveBeenLastCalledWith({ visibility: "members" }),
    );
    await waitFor(() =>
      expect(screen.queryByText(/couldn't save visibility/i)).not.toBeInTheDocument(),
    );
  });
});

// ─── Logout ─────────────────────────────────────────────────────────────────

describe("logout", () => {
  it("clears the session through the session hook", async () => {
    await openDashboard();
    fireEvent.click(screen.getByRole("tab", { name: /account/i }));

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    await waitFor(() => expect(logoutUser).toHaveBeenCalledTimes(1));
    expect(push).toHaveBeenCalledWith("/home");
  });
});
