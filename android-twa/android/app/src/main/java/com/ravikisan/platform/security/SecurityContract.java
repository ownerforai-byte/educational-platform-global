package com.ravikisan.platform.security;

/**
 * Hardcoded security contract — keep in sync with:
 * - {@code .well-known/assetlinks.json} + CI verified fingerprints
 * - {@code backend/src/lib/native-android-security.ts}
 * - {@code frontend/lib/owner.ts} (OWNER_EMAIL)
 * - {@code android-twa/security/tls-pins.json}
 */
public final class SecurityContract {
    private SecurityContract() {}

    public static final String API_ORIGIN = "https://harindrasah.com.np";
    public static final String API_HOST = "harindrasah.com.np";
    public static final String PACKAGE_ID = "com.ravikisan.platform";

    /** Root operator — only this account may run on rooted / emulator builds (release). */
    public static final String OWNER_ROOT_EMAIL = "sahrocky81@gmail.com";

    public static final String CLIENT_HEADER = "android-native";
    public static final String HEADER_SIGNING_CERT = "X-Rn-Signing-Cert";

  /** Play upload + App Signing keys (SHA-256, hex, uppercase). */
    public static final String[] OFFICIAL_SIGNING_CERT_SHA256 = {
            "5BF3921CD99DC1E7EB31CDCB26923857F66733EA609C29D747E1A7ED85C5E390",
            "851CCFEE75B9B6837810673F9F590DADB5FACC1E67EA2F438A24CD8B8C02C452",
            "7144C2807A97D33B1BA7E6AE17AD4D0F8517820396472C42476523BA9FE70D2D",
            "D0D73F3A19CB17808995D98125735E926F734A225B31A34A536DC230C0B266AE",
            "9DFE46804D11F96C5215E163AC063DE39A54B02294079EC03FFB3E4A441A0169",
    };
}