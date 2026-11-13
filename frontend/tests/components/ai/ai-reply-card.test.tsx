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
 * Briefing document frame: compact type, labelled learning panels for owners,
 * sponsored slot last.
 */
describe("AiReplyCard", () => {
  it("boxes every section inside one clear outer boundary", () => {
    render(
      <AiReplyCard
        title="Veer tutor"
        reply={reply}
        context={{ surface: "chat", subjectName: "Physics", subjectSlug: "physics" }}
        isVerifiedOwner
        onFollowUp={() => {}}
      >
        <p>The formula is V = I R.</p>
      </AiReplyCard>,
    );

    const card = screen.getByRole("region", { name: "Veer tutor" });
    expect(card.className).toContain("border");
    expect(card.className).toContain("rounded-xl");

    for (const label of ["Key terms", "Check yourself", "Suggestions", "Sponsored"]) {
      expect(within(card).getByLabelText(label)).toBeInTheDocument();
    }
    expect(within(card).getByText("The formula is V = I R.")).toBeInTheDocument();
    expect(within(card).getByText("Ohm's law.")).toBeInTheDocument();
    expect(within(card).getByText("Study briefing")).toBeInTheDocument();
  });

  it("ends with the ad box as the last section", () => {
    const { container } = render(
      <AiReplyCard title="Veer tutor" reply={reply} context={{ surface: "chat" }} isVerifiedOwner onFollowUp={() => {}}>
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

  it("turns every Take it further chip into an immediate follow-up prompt", () => {
    const onFollowUp = vi.fn();
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
        isVerifiedOwner
        onFollowUp={onFollowUp}
      >
        <p>answer</p>
      </AiReplyCard>,
    );

    const notesPrompt = screen.getByRole("button", { name: /Open the notes/ });
    const practicePrompt = screen.getByRole("button", { name: /Practice Physics/ });
    expect(notesPrompt).toBeInTheDocument();
    expect(practicePrompt).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Walk the formula/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Quiz me on this/ })).toBeInTheDocument();

    notesPrompt.click();
    practicePrompt.click();
    expect(onFollowUp).toHaveBeenNthCalledWith(1, expect.stringContaining("open the notes"));
    expect(onFollowUp).toHaveBeenNthCalledWith(2, expect.stringContaining("practice physics"));
  });

  it("shows Related and Contrasts as separate clickable owner lists", () => {
    const onFollowUp = vi.fn();
    const examReply =
      "**Related —** displacement, velocity, trajectory\n**Contrasts —** distance vs displacement (scalar vs vector)";
    render(
      <AiReplyCard
        title="Veer tutor"
        reply={examReply}
        context={{ surface: "chat" }}
        isVerifiedOwner
        onFollowUp={onFollowUp}
      >
        <p>answer</p>
      </AiReplyCard>,
    );

    const terms = screen.getByRole("region", { name: "Key terms" });
    expect(within(terms).getByText("displacement")).toBeInTheDocument();
    expect(within(terms).getByText("velocity")).toBeInTheDocument();
    expect(within(terms).getByText("trajectory")).toBeInTheDocument();

    const contrasts = screen.getByRole("region", { name: "Contrasts" });
    const contrast = within(contrasts).getByRole("button", { name: /distance vs displacement/ });
    contrast.click();
    expect(onFollowUp).toHaveBeenCalledWith(expect.stringContaining("Clearly contrast"));
  });

  it("hides owner-only learning panels from non-owner tiers", () => {
    render(
      <AiReplyCard title="Veer tutor" reply={reply} context={{ surface: "chat" }}>
        <p>answer</p>
      </AiReplyCard>,
    );

    expect(screen.queryByLabelText("Key terms")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Check yourself")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Suggestions")).not.toBeInTheDocument();
  });

  it("sends a clicked owner follow-up prompt immediately", async () => {
    const onFollowUp = vi.fn();
    render(
      <AiReplyCard
        title="Veer tutor"
        reply={reply}
        context={{ surface: "chat" }}
        isVerifiedOwner
        onFollowUp={onFollowUp}
      >
        <p>answer</p>
      </AiReplyCard>,
    );

    screen.getByRole("button", { name: /Walk the formula/ }).click();
    expect(onFollowUp).toHaveBeenCalledWith(expect.stringContaining("Walk me through each part"));
  });
});
