import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatMessageActions } from "@/components/ai/chat-message-actions";

describe("ChatMessageActions", () => {
  it("hides Copy for brief replies without hiding other actions", () => {
    render(
      <ChatMessageActions
        copied={false}
        showCopy={false}
        onCopy={vi.fn()}
        onRegenerate={vi.fn()}
      />,
    );

    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Regenerate" })).toBeInTheDocument();
  });

  it("keeps Copy available for substantive replies by default", () => {
    render(<ChatMessageActions copied={false} onCopy={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });
});
