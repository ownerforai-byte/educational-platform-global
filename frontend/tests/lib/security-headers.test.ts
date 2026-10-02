import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function headersFor(path: string) {
  return proxy(new NextRequest(`https://ravikisan.vercel.app${path}`)).headers;
}

describe("proxy security headers", () => {
  it("lets the app frame its own documents and the supported embeds", () => {
    const csp = headersFor("/pdfs").get("content-security-policy") ?? "";

    // Regression guard: `frame-src 'none'` blanked every in-app viewer
    // (PDF Library, PdfViewer, video viewer) even for same-origin PDFs.
    expect(csp).not.toContain("frame-src 'none'");
    expect(csp).toContain("frame-src 'self'");

    // The origins the app actually embeds.
    expect(csp).toContain("https://drive.google.com");
    expect(csp).toContain("https://www.youtube.com");
    expect(csp).toContain("https://player.vimeo.com");
    expect(csp).toContain("https://tsvbksfegvdjwczzfdcx.supabase.co");
  });

  it("keeps clickjacking protection: same-origin framing only", () => {
    const headers = headersFor("/");
    const csp = headers.get("content-security-policy") ?? "";

    expect(headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(csp).toContain("frame-ancestors 'self'");
  });
});
