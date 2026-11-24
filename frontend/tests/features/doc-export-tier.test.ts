import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Document export actions (Link + Print/PDF)", () => {
  it("gates copy link and print behind Pro in the shared toolbar", () => {
    const layout = read("features/docs/academic-doc-layout.tsx");
    expect(layout).toContain("canDocExportActions");
    expect(layout).toContain('hasLevel(user, "pro")');
    expect(layout).toContain("exportUnlocked");
    expect(layout).toContain("Print / PDF");
    expect(layout).toContain("Link &amp; PDF");
  });

  it("gates the topic doc viewer toolbar the same way", () => {
    const view = read("features/docs/doc-view.tsx");
    expect(view).toContain("canDocExportActions");
    expect(view).toContain("exportUnlocked");
  });
});

describe("A4 paper corpus policy", () => {
  it("excludes graphs and derivations app routes from the paper contract", () => {
    const policy = read("lib/content/a4-paper-policy.ts");
    expect(policy).toContain("/graphs");
    expect(policy).toContain("/derivations");
    expect(policy).toContain('new Set<string>(["graph"])');
  });

  it("puts supplemental JSON on paper except graph kind", () => {
    const supplemental = read("components/content/topic-supplemental-materials.tsx");
    expect(supplemental).toContain("supplementalKindOnPaper");
    expect(supplemental).toContain("PaperJsonBody");
    expect(supplemental).toContain("/graphs");
  });
});

describe("A4 paper surfaces for JSON topic tabs", () => {
  it("wraps companion tab panels on the paper sheet", () => {
    const tabs = read("components/content/content-tabs.tsx");
    expect(tabs).toContain("A4DocumentSurface");
  });

  it("wraps concept field panels on the paper sheet", () => {
    const panels = read("components/content/ravikishan-concept-panels.tsx");
    expect(panels).toContain("A4DocumentSurface");
    expect(panels).toContain('className="doc-view"');
  });

  it("uses A4DocumentSurface inside DocPaper", () => {
    const layout = read("features/docs/academic-doc-layout.tsx");
    expect(layout).toContain("export function A4DocumentSurface");
    expect(layout).toMatch(/DocPaper[\s\S]*A4DocumentSurface/);
  });

  it("wraps imported notes, rich notes, and formula unit JSON on paper", () => {
    expect(read("components/content/imported-note-view.tsx")).toContain("PaperJsonBody");
    expect(read("components/content/rich-note.tsx")).toContain("PaperJsonBody");
    expect(read("app/(app)/formulas/[subject]/[unit]/page.tsx")).toContain("PaperJsonBody");
  });
});

describe("Standalone app chrome (native shell)", () => {
  it("hides doc toolbars and desk framing when standalone", () => {
    const layout = read("features/docs/academic-doc-layout.tsx");
    expect(layout).toContain("isStandaloneReaderChrome");
    expect(layout).toContain("if (standalone) {\n    return null;");
    expect(read("lib/standalone-reader.ts")).toContain("isAndroidNativeShell");
    expect(read("components/layout/app-shell.tsx")).toContain("inNativeApp");
    expect(read("components/layout/footer.tsx")).toContain("if (inNativeApp) return null");
  });
});

describe("Veer chat tier (Plus, Pro, Owner)", () => {
  it("keeps /chat and /ai/tutor wrapped at Plus", () => {
    for (const page of ["app/(app)/chat/page.tsx", "app/(app)/ai/tutor/page.tsx"]) {
      const src = read(page);
      expect(src).toContain('minLevel="plus"');
      expect(src).toContain("Veer chat opens on Plus");
    }
  });

  it("blocks Member tier on the chat API", () => {
    const gate = readFileSync(path.resolve("..", "backend/src/middleware/aiSparkGate.ts"), "utf8");
    expect(gate).toContain("requireVeerChatTier");
    expect(gate).toContain("VEER_CHAT_TIERS");
    expect(gate).toContain('"plus"');
  });
});