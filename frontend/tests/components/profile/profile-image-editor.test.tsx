import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { PublicProfile, StorageInfo } from "@/lib/api/profile";

const api = vi.hoisted(() => ({
  uploadAvatar: vi.fn(),
  uploadCover: vi.fn(),
  removeAvatar: vi.fn(),
  removeCover: vi.fn(),
}));

vi.mock("@/lib/api/profile", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  uploadAvatar: api.uploadAvatar,
  uploadCover: api.uploadCover,
  removeAvatar: api.removeAvatar,
  removeCover: api.removeCover,
}));

import { ProfileImageEditButton } from "@/features/profile/profile-image-editor";

const profile: PublicProfile = {
  id: "u1",
  fullName: "Harindra Sah",
  username: "harindra",
  bio: null,
  location: null,
  website: null,
  plan: "pro",
  role: "member",
  visibility: "public",
  avatarUrl: null,
  coverUrl: null,
  extras: {},
};

const storage: StorageInfo = {
  usedBytes: 1024,
  limitBytes: 1024 * 1024,
  remainingBytes: 1024 * 1024 - 1024,
  unlimited: false,
};

/** PNG magic bytes so client-side sniffing accepts the file. */
const pngFile = (name = "me.png") =>
  new File(
    [new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4, 5, 6, 7, 8])],
    name,
    { type: "image/png" },
  );

beforeEach(() => {
  vi.clearAllMocks();
  api.uploadAvatar.mockResolvedValue({ profile, byteSize: 900, storage });
  api.uploadCover.mockResolvedValue({ profile, byteSize: 1800, storage });
  api.removeAvatar.mockResolvedValue({ profile, storage });
  api.removeCover.mockResolvedValue({ profile, storage });

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

const setup = (kind: "avatar" | "cover", onChange = vi.fn()) => {
  render(
    <ProfileImageEditButton
      kind={kind}
      currentUrl={null}
      displayName="Harindra Sah"
      hasImage
      onChanged={onChange}
    />,
  );
  return onChange;
};

describe("ProfileImageEditButton", () => {
  it("gives each slot its own accessible pencil", () => {
    render(<ProfileImageEditButton kind="avatar" currentUrl={null} displayName="H" hasImage onChanged={vi.fn()} />);
    render(<ProfileImageEditButton kind="cover" currentUrl={null} displayName="H" hasImage onChanged={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Edit profile picture" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit cover image" })).toBeInTheDocument();
  });

  it("uploads through the avatar endpoint only", async () => {
    const onChanged = setup("avatar");
    fireEvent.click(screen.getByRole("button", { name: "Edit profile picture" }));

    const picker = screen.getByLabelText(/choose profile picture/i);
    fireEvent.change(picker, { target: { files: [pngFile()] } });

    // The browser must decode the file before Upload becomes available.
    await waitFor(() => expect(screen.getByRole("button", { name: /^upload$/i })).toBeEnabled());
    fireEvent.click(screen.getByRole("button", { name: /^upload$/i }));

    await waitFor(() => expect(api.uploadAvatar).toHaveBeenCalledTimes(1));
    expect(api.uploadCover).not.toHaveBeenCalled();
    expect(api.uploadAvatar.mock.calls[0]![0]).toBeInstanceOf(File);
    await waitFor(() => expect(onChanged).toHaveBeenCalledWith({ profile, storage }));
  });

  it("uploads through the cover endpoint only", async () => {
    const onChanged = setup("cover");
    fireEvent.click(screen.getByRole("button", { name: "Edit cover image" }));

    fireEvent.change(screen.getByLabelText(/choose cover image/i), {
      target: { files: [pngFile("wide.png")] },
    });
    await waitFor(() => expect(screen.getByRole("button", { name: /^upload$/i })).toBeEnabled());
    fireEvent.click(screen.getByRole("button", { name: /^upload$/i }));

    await waitFor(() => expect(api.uploadCover).toHaveBeenCalledTimes(1));
    expect(api.uploadAvatar).not.toHaveBeenCalled();
  });

  it("removes only the avatar after confirmation", async () => {
    const onChanged = setup("avatar");
    fireEvent.click(screen.getByRole("button", { name: "Edit profile picture" }));

    fireEvent.click(screen.getByRole("button", { name: /^remove$/i }));
    expect(api.removeAvatar).not.toHaveBeenCalled(); // confirmation first

    fireEvent.click(screen.getByRole("button", { name: "Remove profile picture" }));
    await waitFor(() => expect(api.removeAvatar).toHaveBeenCalledTimes(1));
    expect(api.removeCover).not.toHaveBeenCalled();
    await waitFor(() => expect(onChanged).toHaveBeenCalledWith({ profile, storage }));
  });

  it("removes only the cover after confirmation", async () => {
    setup("cover");
    fireEvent.click(screen.getByRole("button", { name: "Edit cover image" }));

    fireEvent.click(screen.getByRole("button", { name: /^remove$/i }));
    fireEvent.click(screen.getByRole("button", { name: "Remove cover image" }));

    await waitFor(() => expect(api.removeCover).toHaveBeenCalledTimes(1));
    expect(api.removeAvatar).not.toHaveBeenCalled();
  });

  it("rejects a .jpg name with non-image bytes before uploading", async () => {
    setup("avatar");
    fireEvent.click(screen.getByRole("button", { name: "Edit profile picture" }));

    fireEvent.change(screen.getByLabelText(/choose profile picture/i), {
      target: { files: [new File(["just text"], "fake.jpg", { type: "image/jpeg" })] },
    });

    expect(await screen.findByRole("status")).toHaveTextContent(/not a readable image/i);
    expect(screen.getByRole("button", { name: /^upload$/i })).toBeDisabled();
    expect(api.uploadAvatar).not.toHaveBeenCalled();
  });

  it("closes on Escape", async () => {
    setup("avatar");
    fireEvent.click(screen.getByRole("button", { name: "Edit profile picture" }));
    expect(screen.getByRole("dialog", { name: "Profile picture" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
