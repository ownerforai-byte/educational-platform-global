import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  getPublicEnv: vi.fn(() => process.env as Record<string, string | undefined>),
}));

vi.mock("@/lib/api-client", () => ({
  apiFetch: vi.fn(),
  refreshSessionShared: vi.fn(),
  setStoredToken: vi.fn(),
  clearStoredToken: vi.fn(),
  getStoredToken: vi.fn(),
}));

import * as clientAuth from "@/lib/firebase/client-auth";
import { isFirebaseAuthEnabled } from "@/lib/firebase/client-auth";
import { apiFetch } from "@/lib/api-client";
import { resetPassword } from "@/lib/api/auth";

describe("isFirebaseAuthEnabled", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("is false when the flag is off", () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "false");
    expect(isFirebaseAuthEnabled()).toBe(false);
  });

  it("is false when the flag is on but web config keys are missing", () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "true");
    for (const key of [
      "NEXT_PUBLIC_FIREBASE_API_KEY",
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
      "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
      "NEXT_PUBLIC_FIREBASE_APP_ID",
    ]) {
      vi.stubEnv(key, "");
    }
    expect(isFirebaseAuthEnabled()).toBe(false);
  });

  it("is true when the flag and web config are both present", () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "true");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "key");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "proj.firebaseapp.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "proj");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "proj.appspot.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "123");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_APP_ID", "app");
    expect(isFirebaseAuthEnabled()).toBe(true);
  });
});

describe("resetPassword provider proof", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "true");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "key");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "proj.firebaseapp.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "proj");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "proj.appspot.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "123");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_APP_ID", "app");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("uses only oobCode as Firebase recovery proof", async () => {
    const confirm = vi.spyOn(clientAuth, "firebaseClientConfirmPasswordReset").mockResolvedValue();

    await expect(resetPassword({ password: "newStrongPassword", oobCode: "firebase-oob" })).resolves.toEqual({
      success: true,
    });

    expect(confirm).toHaveBeenCalledWith("firebase-oob", "newStrongPassword");
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("does not treat a Supabase code as a Firebase oobCode", async () => {
    const confirm = vi.spyOn(clientAuth, "firebaseClientConfirmPasswordReset").mockResolvedValue();
    vi.mocked(apiFetch).mockResolvedValue({ success: true });

    await resetPassword({ password: "newStrongPassword", code: "supabase-pkce" });

    expect(confirm).not.toHaveBeenCalled();
    expect(apiFetch).toHaveBeenCalledWith("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ password: "newStrongPassword", code: "supabase-pkce" }),
    });
  });

  it("sends only password and PKCE code to the Supabase endpoint", async () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "false");
    vi.mocked(apiFetch).mockResolvedValue({ success: true });

    await resetPassword({
      password: "newStrongPassword",
      code: "supabase-pkce",
      oobCode: "unrelated-oob",
    });

    expect(apiFetch).toHaveBeenCalledWith("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ password: "newStrongPassword", code: "supabase-pkce" }),
    });
  });
});