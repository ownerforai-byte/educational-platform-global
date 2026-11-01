import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ResourcesPage from "@/app/(app)/resources/page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ResourcesPage PDF Scrolling & Viewing", () => {
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
