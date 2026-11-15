import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { GuestSignInNote } from "@/features/auth/components/guest-signin-note";
import { PLATFORM_DISPLAY_NAME } from "@/lib/core/platform-brand";
import {
  clearPendingSignup,
  rememberPendingSignup,
} from "@/features/auth/pending-signup-identity";

describe("GuestSignInNote", () => {
  beforeEach(() => {
    clearPendingSignup();
  });

  it("shows create and sign-in for visitors without a pending signup", async () => {
    render(<GuestSignInNote variant="page" />);

    expect(screen.getByTestId("guest-signin-note")).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_DISPLAY_NAME)).toBeInTheDocument();
    expect(screen.queryByText(/Ravikisan/i)).toBeNull();
    expect(screen.queryByText(/a note before you begin/i)).toBeNull();
    expect(screen.getByTestId("guest-note-create")).toHaveAttribute("href", "/signup");
    expect(screen.getByTestId("guest-note-signin")).toHaveAttribute("href", "/login");
    await waitFor(() => {
      expect(screen.queryByTestId("guest-note-approval")).toBeNull();
      expect(screen.queryByTestId("approval-status-link")).toBeNull();
    });
    expect(
      screen.getByText(
        /After signing, your account is approved automatically by system verification — usually within about 5 minutes\./,
      ),
    ).toBeInTheDocument();
  });

  it("shows approval CTAs after signup stored a status token on this device", async () => {
    rememberPendingSignup("vitest-status-token");
    render(<GuestSignInNote variant="page" />);
    await waitFor(() => {
      expect(screen.getByTestId("guest-note-approval")).toHaveAttribute("href", "/welcome");
      expect(screen.getByTestId("approval-status-link")).toHaveAttribute("href", "/welcome");
    });
  });

  it("wires the dedicated public route", () => {
    const src = readFileSync(
      path.resolve("app/welcome/join/page.tsx"),
      "utf8",
    );
    expect(src).toContain("GuestSignInNote");
  });
});
