import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import NotesPage from "@/app/(app)/notes/page";
import { buildCompanionTabs } from "@/components/content/content-tabs";
import { RavikishanTopicResources } from "@/components/content/ravikishan-topic-resources";

const mocks = vi.hoisted(() => ({
  getImportedNotesBySubject: vi.fn(),
  loadData: vi.fn(),
}));

vi.mock("@/lib/imported-notes", () => ({
  getImportedNotesBySubject: mocks.getImportedNotesBySubject,
}));

vi.mock("@/lib/data-loader", () => ({
  loadData: mocks.loadData,
}));

vi.mock("@/components/layout/subject-search", () => ({
  SubjectSearch: () => <div data-testid="canonical-notes-archive" />,
}));

describe("note presentation classification", () => {
  beforeEach(() => {
    mocks.getImportedNotesBySubject.mockResolvedValue({
      physics: [
        {
          title: "Kinematics",
          path: "notes/concepts/class-11/physics/kinematics/01-motion.json",
          subject: "physics",
          unit: "kinematics",
          target: "class-11-notes",
          source: "ravikishan",
        },
      ],
    });
  });

  it("renders the archive once without repeated raw source sections", async () => {
    render(await NotesPage());

    expect(screen.getByTestId("canonical-notes-archive")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "R Export Notes" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Ravikishan Notes" })).toBeNull();
  });

  it("opens with the canonical note and keeps each learning activity in its own tab", () => {
    const tabs = buildCompanionTabs("default");
    const ids = tabs.map((tab) => tab.id);

    expect(ids).toEqual([
      "notes",
      "mcq",
      "numericals",
      "entrance",
      "self-check",
      "curated-notes",
      "related",
      "bounds",
      "exam-tips",
      "journal",
      "resources",
    ]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(tabs[0]).toMatchObject({ id: "notes", kind: "learning", learningSection: "notes" });
    expect(tabs.filter((tab) => tab.kind === "learning").map((tab) => tab.learningSection)).toEqual([
      "notes",
      "mcq",
      "numericals",
      "entrance",
      "self-check",
    ]);
  });

  it("limits Nepali and English syllabus pro topics to language companion tabs only", () => {
    const languageTabs = [
      "notes",
      "self-check",
      "curated-notes",
      "related",
      "bounds",
      "exam-tips",
      "journal",
      "resources",
    ];
    expect(buildCompanionTabs("language-syllabus-pro").map((tab) => tab.id)).toEqual(languageTabs);
    // The legacy Nepali id resolves to the same language set.
    expect(buildCompanionTabs("nepali-syllabus-pro").map((tab) => tab.id)).toEqual(languageTabs);
  });

  it("opens only the canonical source from resources without repeating note content", async () => {
    mocks.loadData.mockResolvedValue([
      {
        unitSlug: "kinematics",
        topicSlug: "motion",
        title: "Secondary copy",
        noteCount: 4,
        source: "ravikishan",
        duplicateType: 2,
        filename: "motion-2.json",
      },
      {
        unitSlug: "kinematics",
        topicSlug: "motion",
        title: "Motion in a Straight Line",
        noteCount: 6,
        source: "ravikishan",
        duplicateType: 1,
        filename: "motion.json",
      },
    ]);

    const onOpenNotes = vi.fn();
    render(
      <RavikishanTopicResources
        classSlug="class-11"
        subjectSlug="physics"
        unitId="kinematics"
        topicSlug="motion"
        onOpenNotes={onOpenNotes}
      />,
    );

    expect(await screen.findByTestId("canonical-topic-source")).toBeInTheDocument();
    expect(screen.getByText(/Canonical notes · Motion in a Straight Line/)).toBeInTheDocument();
    expect(screen.queryByText(/Secondary copy/)).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
    expect(screen.queryByText(/Type 2|Duplicated/)).toBeNull();
    const openLink = screen.getByRole("link", { name: "Open canonical notes" });
    expect(openLink).toHaveAttribute(
      "href",
      "/class-11/physics/chapters/kinematics/topics/motion#topic-notes",
    );
    openLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(openLink);
    expect(onOpenNotes).toHaveBeenCalledTimes(1);
    expect(mocks.loadData).toHaveBeenCalledTimes(1);
  });
});
