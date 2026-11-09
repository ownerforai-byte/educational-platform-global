import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { EntranceModelQuestions } from "@/components/exams/entrance-model-questions";

const units = [
  {
    classLabel: "Class 11 Notes",
    unitTitle: "Electrostatics",
    questions: [
      {
        q: "Coulomb's law force between two charges is proportional to…",
        options: ["r", "r²", "1/r", "1/r²"],
        answer: 3,
        why: "Inverse-square law.",
        exam: "CEE 2080",
      },
      {
        q: "SI unit of electric field is…",
        options: ["N/C", "V", "C/N", "J"],
        answer: 0,
        why: "Force per unit charge.",
        exam: "IOE 2079",
      },
    ],
  },
];

describe("EntranceModelQuestions", () => {
  it("renders the bank in syllabus order with answers hidden behind a reveal", () => {
    render(
      <EntranceModelQuestions
        trackName="CEE medical entrance"
        trackLabel="CEE"
        subjectName="Physics"
        units={units}
        backHref="/exams/cee"
        backLabel="Back to CEE Medical Entrance"
      />,
    );

    expect(screen.getByText(/Physics — CEE Model Questions/)).toBeInTheDocument();
    expect(screen.getByText("Electrostatics")).toBeInTheDocument();
    expect(screen.getByText(/Coulomb's law force/)).toBeInTheDocument();
    expect(screen.getByText("CEE 2080")).toBeInTheDocument();
    // Answer + trick are in the DOM behind <details> (self-test behaviour).
    expect(screen.getByText(/Inverse-square law/)).toBeInTheDocument();
    // 2 questions × 4 options, plus the 2 revealed answer letters.
    expect(screen.getAllByText(/^[A-D]\.$/).length).toBe(10);
  });

  it("says so honestly when the subject has no authored set yet", () => {
    render(
      <EntranceModelQuestions
        trackName="IOE engineering entrance"
        trackLabel="IOE"
        subjectName="English"
        units={[]}
        backHref="/exams/ioe"
        backLabel="Back to IOE Engineering Entrance"
      />,
    );

    expect(screen.getByText("No model questions yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to ioe/i })).toHaveAttribute(
      "href",
      "/exams/ioe",
    );
  });
});
