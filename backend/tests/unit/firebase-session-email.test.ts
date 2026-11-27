import { describe, expect, it } from "vitest";
import { firebaseSessionEmail } from "../../src/auth/firebase-admin-auth.js";

describe("firebaseSessionEmail", () => {
  it("prefers the real email when present", () => {
    expect(
      firebaseSessionEmail({
        uid: "u1",
        email: " student@example.com ",
        phoneNumber: "+9779800000000",
      }),
    ).toBe("student@example.com");
  });

  it("synthesizes a stable email from E.164 phone", () => {
    expect(
      firebaseSessionEmail({ uid: "u1", email: null, phoneNumber: "+9779812345678" }),
    ).toBe("phone+9779812345678@phone.signin.harindrasah.com.np");
  });

  it("returns null when no email or phone identity is present", () => {
    expect(firebaseSessionEmail({ uid: "abc123", email: null, phoneNumber: null })).toBeNull();
  });
});