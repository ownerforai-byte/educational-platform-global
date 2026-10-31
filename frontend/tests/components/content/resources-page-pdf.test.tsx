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
  it("renders both platform docs and WebNotee reference docs with 'Read in Platform' buttons", () => {
    render(<ResourcesPage />);

    expect(screen.getByText("Resource Vault")).toBeInTheDocument();

    const readButtons = screen.getAllByRole("button", {
      name: /read in platform/i,
    });
    expect(readButtons.length).toBeGreaterThan(10);
  });

  it("opens an embedded scrollable viewer modal when a WebNotee doc is clicked, without going to Google Drive", () => {
    render(<ResourcesPage />);

    // Click on Exercise 1.1 WebNotee doc
    const ex1Card = screen.getByText(/Exercise 1\.1 — Logic/i);
    fireEvent.click(ex1Card);

    // Modal dialog is present
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // The iframe has the Google Drive preview URL (scrollable within platform)
    const iframe = screen.getByTitle(/Exercise 1\.1 — Logic/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toContain("drive.google.com/file/d/");
    expect(iframe.getAttribute("src")).toContain("/preview");

    // Close button works
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens an embedded scrollable viewer modal when a Platform doc is clicked", () => {
    render(<ResourcesPage />);

    const readButtons = screen.getAllByRole("button", {
      name: /read in platform/i,
    });
    fireEvent.click(readButtons[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

