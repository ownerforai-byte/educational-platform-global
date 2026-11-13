import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  GuestSignInNote,
  GUEST_SIGNIN_NOTE,
  GUEST_SIGNIN_NOTE_TITLE,
} from "@/features/auth/components/guest-signin-note";

describe("GuestSignInNote", () => {
  it("shows the inspiring note with create, sign-in, and approval CTAs", () => {
    render(<GuestSignInNote variant="page" />);

    expect(screen.getByTestId("guest-signin-note")).toBeInTheDocument();
    expect(screen.getByText(GUEST_SIGNIN_NOTE_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId("guest-signin-note-body").textContent).toContain(
      GUEST_SIGNIN_NOTE,
    );
    expect(screen.getByTestId("guest-note-create")).toHaveAttribute("href", "/signup");
    expect(screen.getByTestId("guest-note-signin")).toHaveAttribute("href", "/login");
    expect(screen.getByTestId("guest-note-approval")).toHaveAttribute("href", "/welcome");
    expect(screen.getByTestId("approval-status-link")).toHaveAttribute("href", "/welcome");
    expect(
      screen.getByText(
        /After signing, the account is approved by the system verification and administrative approval/,
      ),
    ).toBeInTheDocument();
  });

  it("wires the dedicated public route", () => {
    const src = readFileSync(
      path.resolve("app/welcome/join/page.tsx"),
      "utf8",
    );
    expect(src).toContain("GuestSignInNote");
  });
});
