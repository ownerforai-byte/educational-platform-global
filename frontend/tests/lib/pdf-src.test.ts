import { describe, expect, it } from "vitest";
import {
  PDF_VIEWER_PATH,
  downloadFileName,
  frameSrcFor,
  isInlinePdf,
  isViewableSrc,
  pdfViewerHref,
  titleFromSrc,
} from "@/lib/pdf-src";

/**
 * The viewer route only frames an allowlisted source, opening always goes
 * through `/pdfs/read`, and downloads keep their own file name — the three
 * invariants behind "Open never downloads, downloads never open".
 */
describe("isViewableSrc", () => {
  it("accepts documents from the site's own document roots", () => {
    expect(isViewableSrc("/pdfs/meiosis.pdf")).toBe(true);
    expect(isViewableSrc("/materials/liquid-state-notes.pdf")).toBe(true);
  });

  it("rejects every other same-origin path", () => {
    expect(isViewableSrc("/api/auth/me")).toBe(false);
    expect(isViewableSrc("/admin")).toBe(false);
    expect(isViewableSrc("/")).toBe(false);
  });

  it("rejects protocol-relative and traversal tricks", () => {
    expect(isViewableSrc("//evil.example/x.pdf")).toBe(false);
    expect(isViewableSrc("/pdfs/../../etc/passwd")).toBe(false);
    expect(isViewableSrc(" /pdfs/meiosis.pdf")).toBe(true); // trim, not reject
  });

  it("accepts the CSP frame-src hosts and nothing else", () => {
    expect(isViewableSrc("https://drive.google.com/file/d/abc123/view?usp=sharing")).toBe(true);
    expect(isViewableSrc("https://tsvbksfegvdjwczzfdcx.supabase.co/object/public/bucket/a.pdf")).toBe(true);
    expect(isViewableSrc("https://www.youtube.com/watch?v=abc")).toBe(true);
    expect(isViewableSrc("https://evil.example/file.pdf")).toBe(false);
    expect(isViewableSrc("javascript:alert(1)")).toBe(false);
    expect(isViewableSrc("data:text/html,<script></script>")).toBe(false);
    expect(isViewableSrc("")).toBe(false);
    expect(isViewableSrc("   ")).toBe(false);
  });
});

describe("pdfViewerHref", () => {
  it("routes every document through the in-app viewer, encoding both params", () => {
    const href = pdfViewerHref("/pdfs/meiosis.pdf", "Meiosis — Cell Division");
    expect(href.startsWith(`${PDF_VIEWER_PATH}?`)).toBe(true);
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.get("src")).toBe("/pdfs/meiosis.pdf");
    expect(params.get("title")).toBe("Meiosis — Cell Division");
  });

  it("omits an empty title instead of sending a blank param", () => {
    const href = pdfViewerHref("/pdfs/meiosis.pdf", "   ");
    expect(href).toBe(`${PDF_VIEWER_PATH}?src=%2Fpdfs%2Fmeiosis.pdf`);
  });
});

describe("frameSrcFor", () => {
  it("rewrites a Google Drive view link to the embeddable preview", () => {
    expect(frameSrcFor("https://drive.google.com/file/d/abc123/view?usp=sharing")).toBe(
      "https://drive.google.com/file/d/abc123/preview",
    );
  });

  it("leaves direct documents alone", () => {
    expect(frameSrcFor("/pdfs/meiosis.pdf")).toBe("/pdfs/meiosis.pdf");
    expect(frameSrcFor("https://tsvbksfegvdjwczzfdcx.supabase.co/x.pdf")).toBe(
      "https://tsvbksfegvdjwczzfdcx.supabase.co/x.pdf",
    );
  });
});

describe("isInlinePdf", () => {
  it("marks direct PDFs and Drive links as inline-renderable", () => {
    expect(isInlinePdf("/pdfs/meiosis.pdf")).toBe(true);
    expect(isInlinePdf("/pdfs/meiosis.pdf?download=1")).toBe(true);
    expect(isInlinePdf("https://drive.google.com/file/d/abc/view")).toBe(true);
    expect(isInlinePdf("/materials/physics-comprehensive-guide.docx")).toBe(false);
  });
});

describe("downloadFileName", () => {
  it("prefers the document title and keeps the real extension", () => {
    expect(downloadFileName("/pdfs/meiosis.pdf", "Meiosis — Cell Division")).toBe(
      "Meiosis — Cell Division.pdf",
    );
    expect(downloadFileName("/materials/physics-guide-with-diagrams.html", "Physics Guide")).toBe(
      "Physics Guide.html",
    );
  });

  it("falls back to the file name and strips unsafe characters", () => {
    expect(downloadFileName("/pdfs/liquid-crystal.pdf")).toBe("liquid crystal.pdf");
    expect(downloadFileName("/pdfs/a.pdf", 'Quiz: "which/one"?')).toBe("Quiz which one.pdf");
    expect(downloadFileName("/pdfs/a")).toBe("a.pdf");
  });
});

describe("titleFromSrc", () => {
  it("turns a path into a readable heading", () => {
    expect(titleFromSrc("/pdfs/liquid-crystal.pdf")).toBe("liquid crystal");
    expect(titleFromSrc("/materials/cell_biology.md")).toBe("cell biology");
  });
});
