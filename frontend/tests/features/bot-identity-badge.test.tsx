import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BotIdentityBadge } from "@/features/community/bot-identity-badge";
import { BotAnswerButton } from "@/features/community/bot-answer-button";

describe("BotIdentityBadge", () => {
  it("shows Sahrocky81 owner-verified branding", () => {
    render(<BotIdentityBadge />);
    expect(screen.getByLabelText("Sahrocky81 owner verified")).toBeInTheDocument();
    expect(screen.getByText("Sahrocky81")).toBeInTheDocument();
    expect(screen.getByText(/Owner/)).toBeInTheDocument();
  });
});

describe("BotAnswerButton", () => {
  it("one-click invokes onPublish with no extra confirm UI", () => {
    const onPublish = vi.fn();
    render(<BotAnswerButton visible busy={false} question onPublish={onPublish} />);
    fireEvent.click(screen.getByRole("button", { name: "Answer with Veer" }));
    expect(onPublish).toHaveBeenCalledTimes(1);
  });

  it("hides when not visible", () => {
    render(<BotAnswerButton visible={false} busy={false} onPublish={() => undefined} />);
    expect(screen.queryByRole("button", { name: "Answer with Veer" })).not.toBeInTheDocument();
  });
});
