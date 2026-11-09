import { describe, expect, it } from "vitest";
import {
  computeUserDirectoryStats,
  filterAndSortOwnerUsers,
  isOwnerUser,
  ownerUsersToCsv,
  partitionOwnerSystems,
  DEFAULT_USER_DIRECTORY_FILTERS,
} from "@/lib/owner/user-directory";
import type { OwnerUser } from "@/lib/api/owner";

const sample: OwnerUser[] = [
  {
    id: "a",
    email: "alpha@test.com",
    full_name: "Alpha",
    role: "member",
    effectiveTier: "member",
    credits: 10,
    premium_status: false,
    access_status: "PENDING",
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "b",
    email: "beta@test.com",
    full_name: "Beta",
    role: "pro",
    effectiveTier: "pro",
    credits: 100,
    premium_status: true,
    access_status: "ACTIVE",
    created_at: "2026-01-03T00:00:00Z",
  },
];

describe("owner user directory", () => {
  it("computes stats from the full roster", () => {
    const stats = computeUserDirectoryStats(sample);
    expect(stats.total).toBe(2);
    expect(stats.pending).toBe(1);
    expect(stats.byTier.member).toBe(1);
    expect(stats.byTier.pro).toBe(1);
  });

  it("filters by effective tier", () => {
    const rows = filterAndSortOwnerUsers(sample, {
      ...DEFAULT_USER_DIRECTORY_FILTERS,
      tier: "pro",
    });
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("beta@test.com");
  });

  it("filters by access and sorts by credits", () => {
    const rows = filterAndSortOwnerUsers(sample, {
      ...DEFAULT_USER_DIRECTORY_FILTERS,
      access: "ACTIVE",
      sort: "credits_desc",
    });
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("beta@test.com");
  });

  it("partitions Review vs Approved with no overlap and owners in neither", () => {
    const withOwner: OwnerUser[] = [
      ...sample,
      {
        id: "o",
        email: "boss@test.com",
        full_name: "Boss",
        role: "owner",
        effectiveTier: "owner",
        credits: 0,
        premium_status: true,
        access_status: "PENDING",
        created_at: "2026-01-01T00:00:00Z",
      },
    ];
    const { review, approved, owners } = partitionOwnerSystems(withOwner);
    expect(review.map((u) => u.id)).toEqual(["a"]);
    expect(approved.map((u) => u.id)).toEqual(["b"]);
    expect(owners.map((u) => u.id)).toEqual(["o"]);
    expect(isOwnerUser(withOwner[2])).toBe(true);
    // Owners do not inflate Review/Approved stats.
    const stats = computeUserDirectoryStats(withOwner);
    expect(stats.pending).toBe(1);
    expect(stats.active).toBe(1);
    expect(stats.owners).toBe(1);
  });

  it("exports CSV with header row", () => {
    const csv = ownerUsersToCsv(sample);
    expect(csv.split("\r\n")[0]).toContain("email");
    expect(csv.split("\r\n")[0]).toContain("tier");
    expect(csv).toContain("alpha@test.com");
  });
});
