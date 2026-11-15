import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BotIdentityBadge } from "@/features/community/bot-identity-badge";

describe("BotIdentityBadge", () => {
  it("shows Community bot verified branding", () => {
    render(<BotIdentityBadge />);
    expect(screen.getByLabelText("Community bot verified")).toBeInTheDocument();
    expect(screen.getByText("Community bot")).toBeInTheDocument();
  });
});