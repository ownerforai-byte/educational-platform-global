import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY, ERROR_PAGE_VARIANTS } from "@/lib/errors/error-page";

let online = true;

beforeEach(() => {
  online = true;
  vi.spyOn(window.navigator, "onLine", "get").mockImplementation(() => online);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ErrorPage", () => {
  it("renders a visibly and semantically distinct page for every variant", () => {
    for (const variant of ERROR_PAGE_VARIANTS) {
      const definition = ERROR_PAGE_REGISTRY[variant];
      const { unmount } = render(<ErrorPage variant={variant} />);

      expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", variant);
      expect(screen.getByRole("heading", { level: 1, name: definition.title })).toBeInTheDocument();
      expect(screen.getByText(definition.hint)).toBeInTheDocument();
      unmount();
    }
  });

  it("uses an exact error status without exposing raw messages or internal references", () => {
    const error = Object.assign(new Error("private database detail"), {
      status: 403,
      digest: "digest-123",
    });
    render(<ErrorPage error={error} />);

    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "403");
    expect(
      screen.getByRole("heading", { name: ERROR_PAGE_REGISTRY["403"].title }),
    ).toBeInTheDocument();
    // Neither the thrown message nor the RSC digest is shown any more.
    expect(screen.queryByText("private database detail")).not.toBeInTheDocument();
    expect(screen.queryByText(/Reference:/)).not.toBeInTheDocument();
    expect(screen.queryByText("digest-123")).not.toBeInTheDocument();
  });

  it("switches immediately between offline and the original variant on connectivity events", () => {
    online = false;
    render(<ErrorPage variant="500" />);

    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "offline");
    expect(screen.getByRole("heading", { name: "You're offline" })).toBeInTheDocument();

    online = true;
    fireEvent(window, new Event("online"));
    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "500");
    expect(
      screen.getByRole("heading", { name: ERROR_PAGE_REGISTRY["500"].title }),
    ).toBeInTheDocument();

    online = false;
    fireEvent(window, new Event("offline"));
    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "offline");
    expect(screen.getByRole("heading", { name: "You're offline" })).toBeInTheDocument();
  });

  it("announces restored connectivity on the direct offline page without changing its route", () => {
    render(<ErrorPage variant="offline" />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "offline");
    expect(screen.getByText("Connection restored")).toBeInTheDocument();
  });

  it("distinguishes an online transport failure from an HTTP response", () => {
    render(<ErrorPage error={new TypeError("Failed to fetch")} />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-error-variant", "network");
    expect(
      screen.getByRole("heading", { name: ERROR_PAGE_REGISTRY.network.title }),
    ).toBeInTheDocument();
  });

  it("uses the boundary reset callback for in-place recovery", () => {
    const reset = vi.fn();
    render(<ErrorPage variant="408" reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
