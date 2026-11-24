/**
 * Hardcoded trust for the official Play APK (com.ravikisan.platform).
 * Must stay in sync with repo-root `.well-known/assetlinks.json` and CI
 * `verifiedFingerprints` in `.github/workflows/ci.yml`.
 */
export const NATIVE_ANDROID_PACKAGE = "com.ravikisan.platform";

export const NATIVE_ANDROID_CLIENT_HEADER = "android-native";

/** Normalized SHA-256 signing cert fingerprints (64 hex, uppercase, no colons). */
export const NATIVE_ANDROID_SIGNING_CERT_SHA256 = [
  "5BF3921CD99DC1E7EB31CDCB26923857F66733EA609C29D747E1A7ED85C5E390",
  "851CCFEE75B9B6837810673F9F590DADB5FACC1E67EA2F438A24CD8B8C02C452",
  "7144C2807A97D33B1BA7E6AE17AD4D0F8517820396472C42476523BA9FE70D2D",
  "D0D73F3A19CB17808995D98125735E926F734A225B31A34A536DC230C0B266AE",
  "9DFE46804D11F96C5215E163AC063DE39A54B02294079EC03FFB3E4A441A0169",
] as const;

export const NATIVE_SIGNING_CERT_SET = new Set<string>(NATIVE_ANDROID_SIGNING_CERT_SHA256);

export function normalizeSigningCertFingerprint(value: string | undefined | null): string | null {
  if (!value) return null;
  const hex = value.replace(/[^0-9a-f]/gi, "").toUpperCase();
  return hex.length === 64 ? hex : null;
}

export function isAllowedNativeSigningCert(value: string | undefined | null): boolean {
  const n = normalizeSigningCertFingerprint(value);
  return n != null && NATIVE_SIGNING_CERT_SET.has(n);
}