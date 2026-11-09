import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterQuote } from "@/components/layout/footer-quote";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("FooterQuote", () => {
  it("rotates the quote and its attribution together every four seconds", () => {
    vi.useFakeTimers();
    render(<FooterQuote />);

    expect(screen.getByRole("heading", { name: "Some words" })).toBeTruthy();
    expect(screen.getByText(/To strive, to seek, to find, and not to yield\./)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Source" }).getAttribute("href"))
      .toBe("https://en.wikisource.org/wiki/Ulysses_(Tennyson)");

    act(() => {
      vi.advanceTimersByTime(3999);
    });
    expect(screen.getByText(/To strive, to seek, to find, and not to yield\./)).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByText(/Much have I seen and known\./)).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(8000);
    });
    expect(screen.getByText(/I am the master of my fate/)).toBeTruthy();
    expect(screen.getByText(/William Ernest Henley/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Source" }).getAttribute("href"))
      .toBe("https://en.wikisource.org/wiki/Poems_(Henley)/Out_of_the_night_that_covers_me");
  });
});
