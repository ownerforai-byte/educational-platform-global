import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContentUnlockTarget } from "@/lib/api/credits";
import { revealTopicNote } from "@/lib/content/note-reveal";

const unlockContent = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/credits", () => ({ unlockContent }));

const target: ContentUnlockTarget = {
  kind: "concepts",
  classSlug: "class-11-notes",
  subjectSlug: "physics",
  unitSlug: "kinematics",
  filename: "01-motion.json",
};

const fetchMock = vi.fn();

function respond(body: unknown, status: number): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

beforeEach(() => {
  fetchMock.mockReset();
  unlockContent.mockReset().mockResolvedValue({ cost: 1 });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("revealTopicNote", () => {
  it("unlocks the exact content identity and retries once when its spark window is missing", async () => {
    fetchMock
      .mockResolvedValueOnce(respond({ code: "NO_SPARK_WINDOW" }, 403))
      .mockResolvedValueOnce(respond({ notes: ["Motion"] }, 200));

    await expect(revealTopicNote(target)).resolves.toEqual({ notes: ["Motion"] });
    expect(unlockContent).toHaveBeenCalledWith("theory", undefined, target);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not attempt an unlock for membership denial", async () => {
    fetchMock.mockResolvedValueOnce(respond({ error: "Plus required" }, 403));

    await expect(revealTopicNote(target)).rejects.toThrow("Plus required");
    expect(unlockContent).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("does not retry the reveal when the unlock lacks sparks", async () => {
    fetchMock.mockResolvedValueOnce(respond({ code: "NO_SPARK_WINDOW" }, 403));
    unlockContent.mockRejectedValueOnce(new Error("Insufficient sparks"));

    await expect(revealTopicNote(target)).rejects.toThrow("Insufficient sparks");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("deduplicates simultaneous unlocks of the same canonical coordinates", async () => {
    let release: () => void = () => {};
    unlockContent.mockImplementationOnce(() => new Promise<void>((resolve) => { release = resolve; }));
    fetchMock
      .mockResolvedValueOnce(respond({ code: "NO_SPARK_WINDOW" }, 403))
      .mockResolvedValueOnce(respond({ code: "NO_SPARK_WINDOW" }, 403))
      .mockResolvedValueOnce(respond({ notes: ["Motion"] }, 200))
      .mockResolvedValueOnce(respond({ notes: ["Motion"] }, 200));

    const first = revealTopicNote(target);
    const second = revealTopicNote({ ...target });
    await vi.waitFor(() => expect(unlockContent).toHaveBeenCalledOnce());
    release();
    await expect(Promise.all([first, second])).resolves.toEqual([
      { notes: ["Motion"] },
      { notes: ["Motion"] },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("uses the visuals hint for a free visual kind while leaving server pricing authoritative", async () => {
    fetchMock
      .mockResolvedValueOnce(respond({ code: "NO_SPARK_WINDOW" }, 403))
      .mockResolvedValueOnce(respond({ mindmap: {} }, 200));

    await revealTopicNote({ ...target, kind: "mindmap" });
    expect(unlockContent).toHaveBeenCalledWith("visuals", undefined, { ...target, kind: "mindmap" });
  });
});
