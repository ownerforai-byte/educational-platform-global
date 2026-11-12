import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { AiStatusDot } from "@/components/ai/ai-status-dot";

describe("AiStatusDot", () => {
  afterEach(() => vi.unstubAllGlobals());

  test("turns green when the status probe says online", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ online: true }) })));
    render(<AiStatusDot />);
    await waitFor(() => expect(screen.getByRole("status").getAttribute("data-status")).toBe("online"));
    const blink = screen.getByTestId("ai-status-blink");
    expect(blink.className).toContain("bg-emerald-500");
    expect(blink.className).toContain("animate-veer-status");
    expect(blink.className).not.toContain("shadow-[");
    expect(blink.className).not.toContain("animate-ping");
  });

  test("reads the honest `configured` field and bounds every probe", async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => ({
      ok: true,
      json: async () => ({ configured: true }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    render(<AiStatusDot />);
    await waitFor(() => expect(screen.getByRole("status").getAttribute("data-status")).toBe("online"));
    // CodeRabbit: a stalled probe must be abortable so polling cannot pile up.
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({ cache: "no-store" });
    expect((fetchMock.mock.calls[0]?.[1] as RequestInit).signal).toBeInstanceOf(AbortSignal);
  });

  test("turns grey when the probe fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("down"); }));
    render(<AiStatusDot />);
    await waitFor(() => expect(screen.getByRole("status").getAttribute("data-status")).toBe("offline"));
    expect(screen.queryByTestId("ai-status-blink")).toBeNull();
    expect((screen.getByRole("status").lastElementChild as HTMLElement).className).toContain("bg-zinc-400");
  });
});
