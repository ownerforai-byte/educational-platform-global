import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreatorIdentityBadge } from "@/features/community/creator-identity-badge";
import { isCreatorAuthor } from "@/lib/owner";

describe("CreatorIdentityBadge", () => {
  it("renders Creator label", () => {
    render(<CreatorIdentityBadge />);
    expect(screen.getByLabelText("Creator")).toBeTruthy();
  });
});

describe("isCreatorAuthor", () => {
  it("marks owner role and Sahrocky81 username", () => {
    expect(isCreatorAuthor({ role: "owner", username: null })).toBe(true);
    expect(isCreatorAuthor({ role: "member", username: "Sahrocky81" })).toBe(true);
    expect(isCreatorAuthor({ role: "member", username: "student" })).toBe(false);
  });
});