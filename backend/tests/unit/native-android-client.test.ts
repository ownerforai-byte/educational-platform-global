import { describe, expect, it } from "vitest";
import {
  isAllowedNativeSigningCert,
  normalizeSigningCertFingerprint,
  NATIVE_ANDROID_SIGNING_CERT_SHA256,
} from "../../src/lib/native-android-security.js";

describe("native Android signing allowlist", () => {
  it("accepts colon-separated Play fingerprints from assetlinks", () => {
    const withColons = "5B:F3:92:1C:D9:9D:C1:E7:EB:31:CD:CB:26:92:38:57:F6:67:33:EA:60:9C:29:D7:47:E1:A7:ED:85:C5:E3:90";
    expect(normalizeSigningCertFingerprint(withColons)).toBe(
      NATIVE_ANDROID_SIGNING_CERT_SHA256[0],
    );
    expect(isAllowedNativeSigningCert(withColons)).toBe(true);
  });

  it("rejects unknown signing cert", () => {
    expect(isAllowedNativeSigningCert("AA".repeat(32))).toBe(false);
    expect(isAllowedNativeSigningCert(null)).toBe(false);
  });
});