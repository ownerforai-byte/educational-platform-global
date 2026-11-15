import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  getPublicEnv: vi.fn(() => process.env as Record<string, string | undefined>),
}));

import { useFirebaseClientAuth } from "@/lib/firebase/client-auth";

describe("useFirebaseClientAuth", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("is false when the flag is off", () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "false");
    expect(useFirebaseClientAuth()).toBe(false);
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
    expect(useFirebaseClientAuth()).toBe(false);
  });

  it("is true when the flag and web config are both present", () => {
    vi.stubEnv("NEXT_PUBLIC_USE_FIREBASE_AUTH", "true");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "key");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "proj.firebaseapp.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "proj");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "proj.appspot.com");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "123");
    vi.stubEnv("NEXT_PUBLIC_FIREBASE_APP_ID", "app");
    expect(useFirebaseClientAuth()).toBe(true);
  });
});