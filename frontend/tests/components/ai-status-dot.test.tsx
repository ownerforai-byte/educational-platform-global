import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { AiStatusDot } from "@/components/ai/ai-status-dot";

describe("AiStatusDot", () => {
  afterEach(() => vi.unstubAllGlobals());

  test("turns green when the status probe says online", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ online: true }) })));
    render(<AiStatusDot />);
    await waitFor(() => expect(screen.getByRole("status").getAttribute("data-status")).toBe("online"));
  });

  test("turns grey when the probe fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("down"); }));
    render(<AiStatusDot />);
    await waitFor(() => expect(screen.getByRole("status").getAttribute("data-status")).toBe("offline"));
  });
});
