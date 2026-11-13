import { describe, expect, it } from "vitest";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_NO_CONNECTION,
  AUTH_TEMPORARILY_UNAVAILABLE,
  AUTH_TRY_AGAIN,
  authFailureMessage,
  isTemporaryAuthError,
} from "@/features/auth/public-messages";

describe("authFailureMessage", () => {
  it("maps login 401 to invalid credentials", () => {
    expect(authFailureMessage(Object.assign(new Error("x"), { status: 401 }), "login")).toBe(
      AUTH_INVALID_CREDENTIALS,
    );
  });

  it("maps fetch failures to no connection", () => {
    expect(authFailureMessage(new TypeError("Failed to fetch"), "login")).toBe(AUTH_NO_CONNECTION);
  });

  it("maps server failures to temporarily unavailable", () => {
    expect(authFailureMessage(Object.assign(new Error("x"), { status: 503 }), "login")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
    expect(authFailureMessage(new Error("service_unreachable"), "oauth")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
  });

  it("maps oauth aborts and provider issues to temporarily unavailable", () => {
    expect(authFailureMessage(new Error("The operation was aborted"), "oauth")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
    expect(authFailureMessage(new Error("unavailable"), "oauth")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
  });

  it("falls back to temporarily unavailable", () => {
    expect(authFailureMessage(new Error("FIREBASE_CLIENT_AUTH"), "oauth")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
    expect(authFailureMessage(new Error("reset failed"), "password")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
    expect(authFailureMessage(new Error("signup failed"), "signup")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
  });

  it("maps signup validation marker to please try again", () => {
    expect(authFailureMessage(new Error("validation"), "signup")).toBe(AUTH_TRY_AGAIN);
  });
});

describe("isTemporaryAuthError", () => {
  it("matches only the transient outage string", () => {
    expect(isTemporaryAuthError(AUTH_TEMPORARILY_UNAVAILABLE)).toBe(true);
    expect(isTemporaryAuthError(AUTH_TRY_AGAIN)).toBe(false);
    expect(isTemporaryAuthError(AUTH_INVALID_CREDENTIALS)).toBe(false);
  });
});
