import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopicSupplementalMaterials } from "@/components/content/topic-supplemental-materials";
import type { SupplementalEntry } from "@/lib/content/topic-supplemental";

const graphEntry: SupplementalEntry = {
  path: "visuals/graphs/class-11/physics/kinematics/01-projectile-trajectory.json",
  kind: "graph",
  title: "Projectile trajectory — parabolic path",
  topicSlug: "projectile-motion-and-its-applications",
  data: {
    notes: ["The path of a projectile is a **parabola**."],
    graph: { xLabel: "Horizontal distance", yLabel: "Height", curve: { type: "parabola" } },
  },
};

const formulaEntry: SupplementalEntry = {
  path: "formulas/class-11/physics/kinematics/01-kinematics-key-equations.json",
  kind: "formula",
  title: "Key Equations — Kinematics",
  data: {
    notes: ["- **v = u + at**"],
    formulas: ["$v^2 = u^2 + 2as$"],
  },
};

const guideEntry: SupplementalEntry = {
  path: "notes/guides/class-11/chemistry/aromatic-hydrocarbons/study-guide.json",
  kind: "guides",
  title: "Aromatic Hydrocarbons Study Guide",
  data: {
    summary: "Aromatic compounds are cyclic, planar and conjugated.",
    notes: ["Benzene has six delocalized π electrons."],
    keyPoints: ["Electrophilic substitution preserves aromaticity."],
    practiceQuestions: ["Apply Hückel's rule to benzene."],
    confusion: ["❌ Benzene alternates single and double bonds."],
  },
};

describe("topic supplemental materials", () => {
  it("renders the JSON filed under a topic with its markdown formatting intact", () => {
    render(<TopicSupplementalMaterials entries={[graphEntry]} scope="topic" />);

    expect(screen.getByRole("heading", { name: "More material for this topic" })).toBeInTheDocument();
    expect(screen.getByText("Projectile trajectory — parabolic path")).toBeInTheDocument();
    expect(screen.getByText("Graph")).toBeInTheDocument();
    // Markdown is rendered, not dumped as a raw string.
    expect(screen.getByText(/path of a projectile is a/)).toBeInTheDocument();
    // The authored graph metadata is shown as a caption table.
    expect(screen.getByText("Horizontal distance")).toBeInTheDocument();
    expect(screen.getByText("Curve")).toBeInTheDocument();
  });

  it("renders unit-level files under the unit heading", () => {
    render(<TopicSupplementalMaterials entries={[formulaEntry]} scope="unit" />);

    expect(screen.getByRole("heading", { name: "More material for this unit" })).toBeInTheDocument();
    expect(screen.getByText("Key Equations — Kinematics")).toBeInTheDocument();
    expect(screen.getByText("Formulas")).toBeInTheDocument();
    // The LaTeX was compiled by KaTeX instead of being printed literally.
    expect(
      document.querySelector('annotation[encoding="application/x-tex"]')?.textContent,
    ).toContain("v^2 = u^2 + 2as");
  });

  it("renders every authored field of a study guide", () => {
    render(<TopicSupplementalMaterials entries={[guideEntry]} scope="topic" />);

    expect(screen.getByText("Aromatic compounds are cyclic, planar and conjugated.")).toBeInTheDocument();
    expect(screen.getByText("Key points")).toBeInTheDocument();
    expect(screen.getByText("Electrophilic substitution preserves aromaticity.")).toBeInTheDocument();
    expect(screen.getByText("Practice questions")).toBeInTheDocument();
    expect(screen.getByText("Apply Hückel's rule to benzene.")).toBeInTheDocument();
    expect(screen.getByText("Common confusion")).toBeInTheDocument();
  });

  it("renders nothing when the page has no supplemental files", () => {
    const { container } = render(<TopicSupplementalMaterials entries={[]} scope="topic" />);

    expect(container).toBeEmptyDOMElement();
  });
});
