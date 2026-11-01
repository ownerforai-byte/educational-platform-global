import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import ResourcesPage from "@/app/(app)/resources/page";
import { DOCS } from "@/lib/docs-catalog";
import nextConfig from "../../../next.config.mjs";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("ResourcesPage PDF Scrolling & Viewing", () => {
  const localDocx = () => {
    const doc = DOCS.find((item) => item.kind === "docx" && item.href.startsWith("/"));
    if (!doc) throw new Error("Expected a local DOCX in the document catalog");
    return doc;
  };

  it("allows deployments to configure the DOCX fallback origin", async () => {
    vi.stubEnv("NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN", " https://example.org/// ");
    vi.resetModules();
    const { default: config } = await import("../../../next.config.mjs");
    expect(config.env.NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN).toBe("https://example.org");
  });

  it("uses the browser origin for local DOCX previews", () => {
    const doc = localDocx();
    const { container } = render(<ResourcesPage />);
    const sources = Array.from(container.querySelectorAll("iframe"), (frame) => frame.src);
    expect(sources.some((src) => src.includes(encodeURIComponent(window.location.origin + doc.href)))).toBe(true);
  });

  it("uses the configured site origin or Next fallback when server rendering DOCX previews", () => {
    const doc = localDocx();
    const serverWindow = undefined;
    vi.stubGlobal("window", serverWindow);
    vi.stubEnv("NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN", nextConfig.env.NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org/");
    expect(renderToString(<ResourcesPage />)).toContain(encodeURIComponent(`https://example.org${doc.href}`));

    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(renderToString(<ResourcesPage />)).toContain(
      encodeURIComponent(nextConfig.env.NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN + doc.href),
    );
  });

  it.each(["", "https://example.org/"])(
    "hydrates local DOCX previews with the same initial source, then uses the browser origin (site URL: %s)",
    async (siteUrl) => {
      const doc = localDocx();
      const browserWindow = window;
      const serverWindow = undefined;
      const fallbackOrigin = "https://fallback.example";
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
      vi.stubEnv("NEXT_PUBLIC_DOC_VIEWER_DEFAULT_ORIGIN", fallbackOrigin);
      vi.stubGlobal("window", serverWindow);
      const serverHtml = renderToString(<ResourcesPage />);
      vi.stubGlobal("window", browserWindow);
      const clientHtml = renderToString(<ResourcesPage />);
      const initialOrigin = siteUrl ? "https://example.org" : fallbackOrigin;
      expect(serverHtml.includes(encodeURIComponent(initialOrigin + doc.href))).toBe(true);
      expect(clientHtml.includes(encodeURIComponent(initialOrigin + doc.href))).toBe(true);

      const container = document.createElement("div");
      document.body.appendChild(container);
      container.innerHTML = serverHtml;
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
      const recoverableError = vi.fn();
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(() => {
          root = hydrateRoot(container, <ResourcesPage />, { onRecoverableError: recoverableError });
        });
        const iframe = Array.from(container.querySelectorAll("iframe")).find((frame) => frame.title === doc.title);
        expect(iframe?.src).toContain(encodeURIComponent(browserWindow.location.origin + doc.href));
        expect(recoverableError).not.toHaveBeenCalled();
        expect(errorSpy.mock.calls).toEqual([]);
      } finally {
        await act(() => { root?.unmount(); });
        container.remove();
        errorSpy.mockRestore();
      }
    },
    20000,
  );

  it(
    "renders documents with already opened rectangular scrollable boxes, classified by chapters",
    () => {
      const { container } = render(<ResourcesPage />);

      expect(screen.getByText("Resource Vault")).toBeInTheDocument();

      // Verify rectangular iframe boxes are already embedded and visible
      const iframes = container.querySelectorAll("iframe");
      expect(iframes.length).toBeGreaterThan(10);

      // Each iframe has lazy loading for smooth performance
      expect(iframes[0].getAttribute("loading")).toBe("lazy");

      // Check that Google Drive preview URLs are embedded directly
      const previewSrcs = Array.from(iframes).map((f) => f.getAttribute("src"));
      expect(previewSrcs.some((src) => src?.includes("/preview"))).toBe(true);

      // "Read in Platform" button is completely removed
      expect(screen.queryByText(/read in platform/i)).toBeNull();

      // Verify Chapter classification headers are present
      expect(screen.getByText(/Chapter \/ Unit: Functions/i)).toBeInTheDocument();
    },
    20000
  );

  it(
    "filters documents and rectangular boxes when searching",
    () => {
      const { container } = render(<ResourcesPage />);

      const searchInput = screen.getByPlaceholderText(/search by chapter/i);
      fireEvent.change(searchInput, { target: { value: "Logic" } });

      // Filtered result headers and items
      expect(screen.getByText(/Exercise 1\.1 — Logic/i)).toBeInTheDocument();

      const iframes = container.querySelectorAll("iframe");
      expect(iframes.length).toBeLessThan(10);
    },
    20000
  );

  it(
    "provides download and full tab options on each rectangular box card",
    () => {
      render(<ResourcesPage />);

      const downloadButtons = screen.getAllByRole("button", {
        name: /download/i,
      });
      expect(downloadButtons.length).toBeGreaterThan(10);

      const fullTabLinks = screen.getAllByRole("link", {
        name: /full tab/i,
      });
      expect(fullTabLinks.length).toBeGreaterThan(10);
    },
    60000
  );
});
