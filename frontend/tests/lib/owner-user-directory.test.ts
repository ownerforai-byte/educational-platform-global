import { describe, expect, it } from "vitest";
import {
  computeUserDirectoryStats,
  filterAndSortOwnerUsers,
  ownerUsersToCsv,
  DEFAULT_USER_DIRECTORY_FILTERS,
} from "@/lib/owner/user-directory";
import type { OwnerUser } from "@/lib/api/owner";

const sample: OwnerUser[] = [
  {
    id: "a",
    email: "alpha@test.com",
    full_name: "Alpha",
    role: "member",
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
    expect(stats.premium).toBe(1);
    expect(stats.byRole.pro).toBe(1);
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

  it("exports CSV with header row", () => {
    const csv = ownerUsersToCsv(sample);
    expect(csv.split("\r\n")[0]).toContain("email");
    expect(csv).toContain("alpha@test.com");
  });
});
