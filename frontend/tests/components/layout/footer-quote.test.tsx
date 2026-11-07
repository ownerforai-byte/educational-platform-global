import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterQuote } from "@/components/layout/footer-quote";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("FooterQuote", () => {
  it("rotates to the next sourced quote every seven seconds", () => {
    vi.useFakeTimers();
    render(<FooterQuote />);

    expect(screen.getByText(/To strive, to seek, to find, and not to yield\./)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Source" }).getAttribute("href"))
      .toBe("https://en.wikisource.org/wiki/Ulysses_(Tennyson)");

    act(() => {
      vi.advanceTimersByTime(6999);
    });
    expect(screen.getByText(/To strive, to seek, to find, and not to yield\./)).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText(/Much have I seen and known\./)).toBeTruthy();
  });
});
