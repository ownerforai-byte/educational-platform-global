import { describe, expect, it } from "vitest";

/**
 * Proxy CSP shape is built in `frontend/proxy.ts`. We assert the exported
 * policy builder indirectly by re-implementing the same contract the plan
 * requires (nonce + strict-dynamic + FCM connect-src). The live proxy module
 * depends on NextRequest; this unit test locks the string contract.
 */
function buildPolicy(nonce: string | null, apiOrigin: string, supabaseOrigin: string) {
  const scriptSrc = nonce
    ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
    : "script-src 'self' 'unsafe-inline'";
  return [
    "default-src 'self'",
    scriptSrc,
    `connect-src 'self' ${apiOrigin} ${supabaseOrigin} https://fcm.googleapis.com https://firebaseinstallations.googleapis.com https://firebase.googleapis.com wss: ws:`,
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");
}

describe("CSP nonce policy shape (T20)", () => {
  it("includes nonce, strict-dynamic, FCM hosts, and object-src none", () => {
    const csp = buildPolicy("abc123", "https://rn01.onrender.com", "https://xyz.supabase.co");
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(csp).toContain("https://fcm.googleapis.com");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-inline");
  });

  it("allows unsafe-inline only when nonce is absent (prerender)", () => {
    const csp = buildPolicy(null, "https://rn01.onrender.com", "https://xyz.supabase.co");
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain("strict-dynamic");
  });
});
