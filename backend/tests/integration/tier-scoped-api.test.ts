import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";

/**
 * TIER-SCOPED APIs (plan.md §8 P4: "enforce minTier end-to-end … tier-scoped
 * APIs"). `requireTier(min)` is the API side of the section registry's
 * `minTier`: it expands to the rungs at or above the minimum, grades legacy
 * role values through the single legacy map (auth/types.ts), and the Past
 * Papers bank (/api/pyqs → the `practice-pyq` section) is scoped to Plus.
 */

import { requireRole, requireTier } from "../../src/middleware/auth";
import { readApiSource } from "../read-api-source.js";

function run(
  middleware: (req: Request, res: Response, next: NextFunction) => void,
  role?: string | null,
): { next: ReturnType<typeof vi.fn>; status: ReturnType<typeof vi.fn> } {
  const req = {
    user: role === undefined ? undefined : { id: "u1", email: "s@example.com", role },
  } as unknown as Request;
  const status = vi.fn().mockReturnThis();
  const res = { status, json: vi.fn() } as unknown as Response;
  const next = vi.fn();
  middleware(req, res, next);
  return { next, status };
}

describe("requireTier — the ladder as an API guard", () => {
  it("rejects an unauthenticated call with 401", () => {
    const { next, status } = run(requireTier("plus"));
    expect(next).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(401);
  });

  it("opens a plus section to plus, pro and owner — never to member", () => {
    expect(run(requireTier("plus"), "plus").next).toHaveBeenCalled();
    expect(run(requireTier("plus"), "pro").next).toHaveBeenCalled();
    expect(run(requireTier("plus"), "owner").next).toHaveBeenCalled();

    const member = run(requireTier("plus"), "member");
    expect(member.next).not.toHaveBeenCalled();
    expect(member.status).toHaveBeenCalledWith(403);
  });

  it("expands to every rung at or above the minimum", () => {
    // member-level scope opens to the whole ladder.
    expect(run(requireTier("member"), "member").next).toHaveBeenCalled();
    // owner-level scope opens to owner alone.
    const pro = run(requireTier("owner"), "pro");
    expect(pro.next).not.toHaveBeenCalled();
    expect(pro.status).toHaveBeenCalledWith(403);
    expect(run(requireTier("owner"), "owner").next).toHaveBeenCalled();
  });

  it("grades legacy role values as owner (the single legacy map)", () => {
    // A raw legacy role slipped through to the guard must still be graded on
    // its normalized rung — the ladder is the only vocabulary that counts.
    expect(run(requireRole("owner"), "ADMIN").next).toHaveBeenCalled();
    expect(run(requireRole("owner"), "teacher").next).toHaveBeenCalled();
    const legacyMember = run(requireTier("pro"), "STUDENT");
    expect(legacyMember.next).toHaveBeenCalled(); // STUDENT → owner → above pro
  });
});

describe("section-backed route scope", () => {
  it("the Past Papers bank route is wired requireAuth + requireTier('plus')", async () => {
    const src = readApiSource("pyqs.ts");
    expect(src).toContain('requireTier("plus")');
    expect(src).toContain("requireAuth");
  });
});
