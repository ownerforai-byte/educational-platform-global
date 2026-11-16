import { describe, expect, it } from "vitest";
import { GET } from "@/app/.well-known/assetlinks.json/route";

describe("assetlinks.json route", () => {
  it("returns 200 JSON with every Play Console fingerprint", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/application\/json/i);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(1);
    expect(body[0]?.relation).toContain("delegate_permission/common.handle_all_urls");
    expect(body[0]?.relation).toContain("delegate_permission/common.get_login_creds");
    const fingerprints =
      body[0]?.target?.sha256_cert_fingerprints?.map((f: string) =>
        f.replace(/[^0-9A-Fa-f]/g, "").toUpperCase(),
      ) ?? [];
    expect(fingerprints).toContain(
      "5BF3921CD99DC1E7EB31CDCB26923857F66733EA609C29D747E1A7ED85C5E390",
    );
    expect(fingerprints).toHaveLength(4);
    expect(body[0]?.target?.package_name).toBe("com.ravikisan.platform");
    const raw = body[0]?.target?.sha256_cert_fingerprints ?? [];
    expect(raw.every((f: string) => /^[0-9A-Fa-f]{2}(:[0-9A-Fa-f]{2}){31}$/.test(f))).toBe(true);
  });
});