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

  it("partitions Pending vs Members; only the root owner email is the plain roster", () => {
    const withOwner: OwnerUser[] = [
      ...sample,
      {
        id: "o",
        email: "sahrocky81@gmail.com",
        full_name: "Root Owner",
        role: "owner",
        effectiveTier: "owner",
        credits: 0,
        premium_status: true,
        access_status: "ACTIVE",
        created_at: "2026-01-01T00:00:00Z",
      },
      {
        id: "ao",
        email: "assigned@test.com",
        full_name: "Assigned Owner",
        role: "owner",
        effectiveTier: "owner",
        credits: 0,
        premium_status: true,
        access_status: "ACTIVE",
        created_at: "2026-01-04T00:00:00Z",
      },
    ];
    const { review, approved, owners } = partitionOwnerSystems(withOwner);
    expect(review.map((u) => u.id)).toEqual(["a"]);
    // Assigned owners stay in Members so they can be re-tiered; root email alone is the roster.
    expect(approved.map((u) => u.id)).toEqual(["b", "ao"]);
    expect(owners.map((u) => u.id)).toEqual(["o"]);
    expect(isOwnerUser(withOwner[2])).toBe(true);
    expect(isOwnerUser(withOwner[3])).toBe(false);
    const stats = computeUserDirectoryStats(withOwner);
    expect(stats.pending).toBe(1);
    expect(stats.active).toBe(2);
    expect(stats.owners).toBe(1);
  });

  it("exports CSV with header row", () => {
    const csv = ownerUsersToCsv(sample);
    expect(csv.split("\r\n")[0]).toContain("email");
    expect(csv.split("\r\n")[0]).toContain("tier");
    expect(csv).toContain("alpha@test.com");
  });
});
