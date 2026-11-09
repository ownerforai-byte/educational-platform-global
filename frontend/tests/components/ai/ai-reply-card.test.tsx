import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

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

import { AiReplyCard } from "@/components/ai/ai-reply-card";

const reply =
  "**Ohm's law.** The formula is $V = I \\cdot R$.\n\nStep 1: Find the current.\nStep 2: Multiply by the resistance.";

/**
 * The reply frame (owner 2026-11-09): clear boundary outside, every section
 * boxed inside, compact type, suggestion boxes, and the ad box closing the
 * reply — always last.
 */
describe("AiReplyCard", () => {
  it("boxes every section inside one clear outer boundary", () => {
    render(
      <AiReplyCard
        title="Veer tutor"
        reply={reply}
        context={{ surface: "chat", subjectName: "Physics", subjectSlug: "physics" }}
      >
        <p>The formula is V = I R.</p>
      </AiReplyCard>,
    );

    const card = screen.getByRole("region", { name: "Veer tutor" });
    expect(card.className).toContain("border-2");

    // Every island has its own labelled section.
    for (const label of ["Key terms", "Check yourself", "Suggestions", "Sponsored"]) {
      expect(within(card).getByLabelText(label)).toBeInTheDocument();
    }
    // The answer body is present.
    expect(within(card).getByText("The formula is V = I R.")).toBeInTheDocument();
    // Key terms lifted from the reply's bold vocabulary.
    expect(within(card).getByText("Ohm's law.")).toBeInTheDocument();
  });

  it("ends with the ad box as the last section", () => {
    const { container } = render(
      <AiReplyCard title="Veer tutor" reply={reply} context={{ surface: "chat" }}>
        <p>answer</p>
      </AiReplyCard>,
    );

    const card = screen.getByRole("region", { name: "Veer tutor" });
    const sections = Array.from(card.children);
    const last = sections[sections.length - 1] as HTMLElement;
    expect(last.querySelector('[aria-label="Sponsored"]')).not.toBeNull();
    expect(within(last).getByText("Sponsored")).toBeInTheDocument();
    void container;
  });

  it("renders boxed suggestions that link to the study surfaces", () => {
    render(
      <AiReplyCard
        title="Veer tutor"
        reply={reply}
        context={{
          surface: "chat",
          subjectName: "Physics",
          subjectSlug: "physics",
          topicTitle: "Ohm's law",
          topicHref: "/class-11-notes/physics/chapters/dc-circuits/topics/ohms-law",
        }}
      >
        <p>answer</p>
      </AiReplyCard>,
    );

    expect(screen.getByRole("link", { name: /Open the notes/ })).toHaveAttribute(
      "href",
      "/class-11-notes/physics/chapters/dc-circuits/topics/ohms-law",
    );
    expect(screen.getByRole("link", { name: /Practice Physics/ })).toHaveAttribute(
      "href",
      "/practice/physics",
    );
    // Prompt moves render as buttons (copied to the composer/clipboard).
    expect(screen.getByRole("button", { name: /Walk the formula/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Quiz me on this/ })).toBeInTheDocument();
  });
});
