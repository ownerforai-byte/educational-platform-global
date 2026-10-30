import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TopicVerticalNotes } from "@/components/content/topic-vertical-notes";

const mocks = vi.hoisted(() => ({
  loadData: vi.fn(),
  ensureHighYieldForSubject: vi.fn(),
  getLoadedHighYieldTopicData: vi.fn(),
  getEntranceQuestions: vi.fn(),
}));

vi.mock("@/lib/data-loader", () => ({ loadData: mocks.loadData }));
vi.mock("@/lib/high-yield-topic-facts-lazy", () => ({
  ensureHighYieldForSubject: mocks.ensureHighYieldForSubject,
  getLoadedHighYieldTopicData: mocks.getLoadedHighYieldTopicData,
}));
vi.mock("@/lib/entrance-questions", () => ({
  getEntranceQuestions: mocks.getEntranceQuestions,
}));
vi.mock("@/components/content/math-markdown", () => ({
  MathMarkdown: ({ content }: { content: string }) => <div>{content}</div>,
}));
vi.mock("@/components/content/rich-note", () => ({ NoteBlocks: () => null }));
vi.mock("@/components/content/entrance-quiz", () => ({
  EntranceQuiz: ({ questions }: { questions: unknown[] }) => (
    <div data-testid="entrance-quiz">{questions.length} entrance questions</div>
  ),
}));
vi.mock("@/lib/topic-3d-map", () => ({ get3DComponentForTopic: () => null }));
vi.mock("@/components/lab/schematic-diagram", () => ({
  SchematicDiagram: () => <div data-testid="topic-schematic" />,
}));

const manifest = [
  {
    unitSlug: "kinematics",
    topicSlug: "motion",
    title: "Secondary copy",
    noteCount: 2,
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
];

const canonical = {
  summary: "Motion describes how position changes with time.",
  notes: ["Canonical explanation of displacement and distance."],
  mcs: [
    {
      question: "Which quantity has both magnitude and direction?",
      options: ["Distance", "Displacement"],
      answer: "B",
    },
  ],
  examples: ["**Problem:** A body moves 3 m east and 4 m north.\n\n**Step 1:** Use Pythagoras.\n\n**Answer:** 5 m"],
  numericals: ["A second worked numerical."],
};

const factBank = {
  topicKeywords: ["motion"],
  unitSlugs: ["kinematics"],
  subject: "physics",
  title: "Kinematics",
  category: "Mechanics",
  governingLaws: [],
  speedFormulas: [],
  constantsAndValues: [],
  entranceTraps: [
    { trap: "Distance is always displacement.", truth: "Distance is total path length.", examRef: "NEB" },
    { trap: "Speed is velocity.", truth: "Velocity includes direction.", examRef: "NEB" },
    { trap: "Acceleration means speeding up.", truth: "Acceleration is any velocity change.", examRef: "NEB" },
  ],
  workedNumericals: [],
  keyTermsAndDefinitions: [],
};

function renderSection(section: "notes" | "mcq" | "numericals" | "entrance" | "self-check") {
  return render(
    <TopicVerticalNotes
      classSlug="class-11"
      subjectSlug="physics"
      unitId="kinematics"
      topicSlug="motion"
      topicTitle="Motion in a Straight Line"
      section={section}
    />,
  );
}

describe("topic learning sections", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.ensureHighYieldForSubject.mockResolvedValue(undefined);
    mocks.getLoadedHighYieldTopicData.mockReturnValue(factBank);
    mocks.getEntranceQuestions.mockReturnValue([{ q: "Entrance question" }]);
    mocks.loadData.mockImplementation(async (path: string) => {
      if (path.endsWith("_manifest.json")) return manifest;
      if (path.endsWith("motion-2.json")) {
        return { notes: ["Secondary duplicate must not render."], mcs: [{ question: "Duplicate question", options: ["Wrong"], answer: "Wrong" }] };
      }
      if (path.endsWith("motion.json")) return canonical;
      throw new Error(`Unexpected path ${path}`);
    });
  });

  it("loads only the canonical note into the comprehension path", async () => {
    renderSection("notes");

    expect(await screen.findByText("Canonical explanation of displacement and distance.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Understand Motion in a Straight Line in four passes" })).toBeInTheDocument();
    expect(screen.getByText("Motion describes how position changes with time.")).toBeInTheDocument();
    expect(screen.queryByText("Secondary duplicate must not render.")).toBeNull();
    expect(screen.queryByText(/A body moves 3 m east/)).toBeNull();
  });

  it("shows canonical MCQs vertically and reveals feedback immediately", async () => {
    renderSection("mcq");

    expect(await screen.findByText("Which quantity has both magnitude and direction?")).toBeInTheDocument();
    expect(screen.queryByText("Duplicate question")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "A. Distance" }));
    expect(screen.getByText(/Correct answer:/).parentElement).toHaveTextContent("Correct answer: B");
  });

  it("keeps worked numericals out of Notes and in their own vertical section", async () => {
    renderSection("numericals");

    expect(await screen.findByText(/A body moves 3 m east/)).toBeInTheDocument();
    expect(screen.getByText("A second worked numerical.")).toBeInTheDocument();
    expect(screen.queryByText("Canonical explanation of displacement and distance.")).toBeNull();
  });

  it("provides exactly three recall questions with immediate explanations", async () => {
    renderSection("self-check");

    const questions = await screen.findAllByRole("heading", { name: /Concept check [123]:/ });
    expect(questions).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Distance is total path length." }));
    expect(screen.getAllByText(/Explanation:/)).toHaveLength(1);
  });

  it("keeps the entrance bank as a separate learning section", async () => {
    renderSection("entrance");

    expect(await screen.findByTestId("entrance-quiz")).toHaveTextContent("1 entrance questions");
    expect(mocks.getEntranceQuestions).toHaveBeenCalledWith("physics", "kinematics");
  });
});
