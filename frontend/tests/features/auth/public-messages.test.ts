import { describe, expect, it } from "vitest";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_NO_CONNECTION,
  AUTH_TEMPORARILY_UNAVAILABLE,
  AUTH_TRY_AGAIN,
  authFailureDetail,
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
    expect(
      authFailureMessage(Object.assign(new Error("service_unreachable"), { status: 503 }), "login"),
    ).toBe(AUTH_NO_CONNECTION);
  });

  it("maps server failures to temporarily unavailable", () => {
    expect(authFailureMessage(Object.assign(new Error("x"), { status: 503 }), "login")).toBe(
      AUTH_TEMPORARILY_UNAVAILABLE,
    );
    expect(authFailureMessage(new Error("service_unreachable"), "oauth")).toBe(
      AUTH_NO_CONNECTION,
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

  it("maps popup closed to a retry hint", () => {
    expect(authFailureMessage({ code: "auth/popup-closed-by-user" }, "oauth")).toContain(
      "cancelled",
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

describe("API machine-code mappings", () => {
  it("does not blame credentials for a server-side sign-in outage", () => {
    // The real cause (Firebase Admin / server env) stays out of the message; it
    // must read as a transient outage, never as bad credentials.
    expect(
      authFailureMessage(
        Object.assign(new Error("x"), { status: 503, code: "FIREBASE_ADMIN_NOT_CONFIGURED" }),
        "login",
      ),
    ).toBe(AUTH_TEMPORARILY_UNAVAILABLE);
  });

  it("maps FIREBASE_TOKEN_REJECTED per flow kind", () => {
    const err = Object.assign(new Error("x"), { status: 401, code: "FIREBASE_TOKEN_REJECTED" });
    expect(authFailureMessage(err, "login")).toBe(AUTH_INVALID_CREDENTIALS);
    expect(authFailureMessage(err, "signup")).toContain("verify");
  });

  it("maps device limit and access outcomes", () => {
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "DEVICE_SIGNUP_LIMIT" }), "signup"),
    ).toContain("device");
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "PENDING_APPROVAL" }), "login"),
    ).toBe(AUTH_TRY_AGAIN);
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "ACCOUNT_REJECTED" }), "login"),
    ).toContain("denied");
  });

  it("maps phone SMS failures to friendly messages", () => {
    // Actionable, user-facing hints are kept:
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "auth/invalid-verification-code" }), "oauth"),
    ).toContain("SMS code");
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "auth/invalid-phone-number" }), "oauth"),
    ).toContain("international format");
    // Infrastructure failures (SMS billing, reCAPTCHA) collapse to the generic
    // unavailable message so internal setup is never exposed:
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "auth/billing-not-enabled" }), "signup"),
    ).toBe(AUTH_TEMPORARILY_UNAVAILABLE);
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "auth/captcha-check-failed" }), "oauth"),
    ).toBe(AUTH_TEMPORARILY_UNAVAILABLE);
  });

  it("maps an existing-account conflict", () => {
    expect(
      authFailureMessage(Object.assign(new Error("x"), { code: "auth/email-already-in-use" }), "signup"),
    ).toContain("already exists");
  });

  it("maps 502/504 outages like 503", () => {
    for (const status of [502, 503, 504]) {
      expect(authFailureMessage(Object.assign(new Error("x"), { status }), "login")).toBe(
        AUTH_TEMPORARILY_UNAVAILABLE,
      );
    }
  });
});

describe("authFailureDetail", () => {
  it("labels firebase vs api codes and the http status", () => {
    expect(
      authFailureDetail(Object.assign(new Error("x"), { code: "auth/invalid-credential", status: 401 })),
    ).toBe("firebase:auth/invalid-credential · http:401");
    expect(
      authFailureDetail(Object.assign(new Error("x"), { code: "DEVICE_SIGNUP_LIMIT", status: 403 })),
    ).toBe("api:DEVICE_SIGNUP_LIMIT · http:403");
  });

  it("falls back to a truncated message when no code or status is present", () => {
    expect(authFailureDetail(new Error("boom"))).toBe("boom");
    expect(authFailureDetail("plain")).toBeNull();
  });
});
