import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

const ORIGIN = "https://harindrasah.com.np";

function scriptSource(response: Response): string {
  const csp = response.headers.get("content-security-policy") ?? "";
  return csp.split(";").find((directive) => directive.trim().startsWith("script-src")) ?? "";
}

describe("CSP nonce coverage", () => {
  it.each([
    "/400",
    "/401",
    "/403",
    "/404",
    "/408",
    "/429",
    "/500",
    "/502",
    "/503",
    "/504",
    "/network",
    "/offline",
  ])("uses a nonce instead of unsafe-inline on %s", (path) => {
    const response = proxy(new NextRequest(`${ORIGIN}${path}`));
    const scriptSrc = scriptSource(response);
    const nonce = scriptSrc.match(/'nonce-([^']+)'/)?.[1];

    expect(nonce).toBeTruthy();
    expect(scriptSrc).toContain("'strict-dynamic'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(response.headers.get("x-middleware-request-x-nonce")).toBe(nonce);
    expect(response.headers.get("x-middleware-request-content-security-policy")).toBe(
      response.headers.get("content-security-policy"),
    );
  });

  it("does not weaken CSP when a crawler supplies its User-Agent", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/home`, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; GPTBot/1.2)" },
    }));
    const scriptSrc = scriptSource(response);

    expect(scriptSrc).toContain("'nonce-");
    expect(scriptSrc).toContain("'strict-dynamic'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(response.headers.get("x-middleware-request-x-nonce")).toBeTruthy();
  });

  it("issues a fresh nonce for every document response", () => {
    const first = proxy(new NextRequest(`${ORIGIN}/404`));
    const second = proxy(new NextRequest(`${ORIGIN}/404`));

    expect(scriptSource(first)).not.toBe(scriptSource(second));
  });
});
