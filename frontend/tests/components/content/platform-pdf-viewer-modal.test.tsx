import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  PlatformPdfViewerModal,
  type ViewableDocument,
} from "@/components/content/platform-pdf-viewer-modal";

describe("PlatformPdfViewerModal", () => {
  it("renders nothing when doc is null", () => {
    const { container } = render(
      <PlatformPdfViewerModal doc={null} onClose={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders an in-platform iframe for a local PDF document", () => {
    const doc: ViewableDocument = {
      title: "Wave Motion & Sound Waves",
      src: "/materials/physics/wave-motion.pdf",
      subject: "Physics",
      topic: "Waves",
      kind: "pdf",
    };

    render(<PlatformPdfViewerModal doc={doc} onClose={vi.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Wave Motion & Sound Waves")).toBeInTheDocument();
    expect(screen.getByText("Physics")).toBeInTheDocument();
    expect(screen.getByText("Waves")).toBeInTheDocument();

    const iframe = screen.getByTitle("Wave Motion & Sound Waves");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toBe("/materials/physics/wave-motion.pdf");
  });

  it("transforms a Google Drive URL into an embeddable preview iframe without opening Google Drive externally", () => {
    const doc: ViewableDocument = {
      title: "Exercise 1.1 — Logic and Sets",
      src: "https://drive.google.com/file/d/18dLnNxv2ymykLKsa5Qwr1rQh8LsI_o3r/view?usp=sharing",
      subject: "Mathematics",
      topic: "Ex 1.1",
      kind: "pdf",
    };

    render(<PlatformPdfViewerModal doc={doc} onClose={vi.fn()} />);

    const iframe = screen.getByTitle("Exercise 1.1 — Logic and Sets");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toBe(
      "https://drive.google.com/file/d/18dLnNxv2ymykLKsa5Qwr1rQh8LsI_o3r/preview",
    );
  });

  it("calls onClose when the close button is clicked or Escape key is pressed", () => {
    const onClose = vi.fn();
    const doc: ViewableDocument = {
      title: "Cell Biology",
      src: "/materials/biology/cell-biology.pdf",
      subject: "Biology",
      kind: "pdf",
    };

    render(<PlatformPdfViewerModal doc={doc} onClose={onClose} />);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("renders a helpful download prompt for docx files that cannot be framed inline", () => {
    const doc: ViewableDocument = {
      title: "Class 11 Chemistry Comprehensive Guide",
      src: "/materials/chemistry/guide.docx",
      subject: "Chemistry",
      kind: "docx",
    };

    render(<PlatformPdfViewerModal doc={doc} onClose={vi.fn()} />);

    expect(screen.getByText("Word Document (.docx)")).toBeInTheDocument();
    expect(screen.queryByTitle("Class 11 Chemistry Comprehensive Guide")).not.toBeInTheDocument();
  });
});

