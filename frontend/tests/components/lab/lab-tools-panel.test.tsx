import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DiscussionThread } from "@/components/lab/DiscussionThread";
import { SharedAnnotationBoard } from "@/components/lab/SharedAnnotationBoard";
import { LabToolsPanel } from "@/components/lab/lab-tools-panel";
import { labStorageKey } from "@/components/lab/use-lab-storage";

/**
 * Lab tools wiring contract (Phase 4b):
 *  - the runner's "Lab tools" panel hosts all five tools as tab panels,
 *  - discussion threads and shared annotations persist per labId in localStorage.
 */

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("LabToolsPanel", () => {
  it("hosts all five tools as tab panels", () => {
    render(<LabToolsPanel labId="lab-1" />);
    for (const name of ["Formulas", "Practice", "Progress", "Discussion", "Annotations"]) {
      expect(screen.getByRole("tab", { name })).toBeInTheDocument();
    }
  });

  it("opens on the formula cheat sheet and switches panels", () => {
    render(<LabToolsPanel labId="lab-1" />);
    expect(screen.getByText("Formula cheat sheet")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Practice" }));
    expect(screen.getByText("Practice problems")).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of 8/)).toBeInTheDocument();
  });
});

describe("DiscussionThread persistence", () => {
  it("posts a thread and saves it under the per-lab key", () => {
    render(<DiscussionThread labId="lab-1" />);

    fireEvent.change(screen.getByPlaceholderText("Thread title"), {
      target: { value: "Storage thread" },
    });
    fireEvent.change(screen.getByPlaceholderText("Start a discussion…"), {
      target: { value: "Does this survive a reload?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /post thread/i }));

    expect(screen.getByText("Storage thread")).toBeInTheDocument();
    const stored = JSON.parse(
      window.localStorage.getItem(labStorageKey("lab-1", "discussion")) ?? "[]"
    ) as Array<{ title: string }>;
    expect(stored.some((t) => t.title === "Storage thread")).toBe(true);
  });

  it("restores saved threads for the same lab on remount", () => {
    const first = render(<DiscussionThread labId="lab-1" />);
    fireEvent.change(screen.getByPlaceholderText("Thread title"), {
      target: { value: "Persistent thread" },
    });
    fireEvent.change(screen.getByPlaceholderText("Start a discussion…"), {
      target: { value: "Body" },
    });
    fireEvent.click(screen.getByRole("button", { name: /post thread/i }));
    first.unmount();

    render(<DiscussionThread labId="lab-1" />);
    expect(screen.getByText("Persistent thread")).toBeInTheDocument();
  });

  it("keeps discussions isolated per labId", () => {
    render(<DiscussionThread labId="lab-1" />);
    fireEvent.change(screen.getByPlaceholderText("Thread title"), {
      target: { value: "Only for lab 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Start a discussion…"), {
      target: { value: "Body" },
    });
    fireEvent.click(screen.getByRole("button", { name: /post thread/i }));
    cleanup();

    render(<DiscussionThread labId="lab-2" />);
    expect(screen.queryByText("Only for lab 1")).toBeNull();
  });
});

describe("SharedAnnotationBoard persistence", () => {
  it("posts a note and saves it under the per-lab key", () => {
    render(<SharedAnnotationBoard labId="lab-1" />);

    fireEvent.change(screen.getByPlaceholderText("Add a note…"), {
      target: { value: "Watch the normal vector here" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post" }));

    expect(screen.getByText("Watch the normal vector here")).toBeInTheDocument();
    const stored = JSON.parse(
      window.localStorage.getItem(labStorageKey("lab-1", "annotations")) ?? "[]"
    ) as Array<{ note: string }>;
    expect(stored.some((a) => a.note === "Watch the normal vector here")).toBe(true);
  });

  it("restores saved notes for the same lab on remount", () => {
    const first = render(<SharedAnnotationBoard labId="lab-7" />);
    fireEvent.change(screen.getByPlaceholderText("Add a note…"), {
      target: { value: "Saved note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post" }));
    first.unmount();

    render(<SharedAnnotationBoard labId="lab-7" />);
    expect(screen.getByText("Saved note")).toBeInTheDocument();
  });
});
