import { describe, expect, it } from "vitest";
import { buildAppRequirements } from "../../src/lib/app-requirements.js";

describe("buildAppRequirements", () => {
  it("exposes every Play-linked legal URL and Android package", () => {
    const req = buildAppRequirements();
    expect(req.legal.privacy).toContain("/legal/privacy");
    expect(req.legal.deleteAccount).toContain("/legal/delete-account");
    expect(req.supportEmail).toContain("@");
    expect(req.clients.androidPackage).toBe("com.ravikisan.platform");
  });
});