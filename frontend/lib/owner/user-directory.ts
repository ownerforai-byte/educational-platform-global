import type { OwnerUser } from "@/lib/api/owner";

export type UserAccessFilter = "all" | "PENDING" | "ACTIVE" | "REJECTED";
export type UserTierFilter = "all" | "member" | "plus" | "pro" | "owner";
export type UserSortKey = "newest" | "oldest" | "credits_desc" | "credits_asc" | "name";

export interface UserDirectoryStats {
  total: number;
  pending: number;
  active: number;
  rejected: number;
  owners: number;
  byTier: Record<string, number>;
}

export interface UserDirectoryFilters {
  query: string;
  access: UserAccessFilter;
  tier: UserTierFilter;
  sort: UserSortKey;
}

export const DEFAULT_USER_DIRECTORY_FILTERS: UserDirectoryFilters = {
  query: "",
  access: "all",
  tier: "all",
  sort: "newest",
};

/** The rung a directory row resolves to — backend-authoritative, Member fallback. */
function tierOf(u: OwnerUser): string {
  return u.effectiveTier ?? "member";
}

/**
 * Owner account: effective tier or stored role is owner. Owners live in
 * their own plain roster — never in Review, never actionable from the
 * directory (no overlap with the two user systems below).
 */
export function isOwnerUser(u: OwnerUser): boolean {
  return tierOf(u) === "owner" || u.role === "owner";
}

export type OwnerSystem = "review" | "approved";

/**
 * The two owner-console systems, partitioned with no overlap:
 * - review:   PENDING non-owners awaiting a decision
 * - approved: ACTIVE/REJECTED non-owners already decided
 * Owners are in neither — see `owners` (plain roster only).
 */
export function partitionOwnerSystems(users: OwnerUser[]): {
  review: OwnerUser[];
  approved: OwnerUser[];
  owners: OwnerUser[];
} {
  const review: OwnerUser[] = [];
  const approved: OwnerUser[] = [];
  const owners: OwnerUser[] = [];
  for (const u of users) {
    if (isOwnerUser(u)) {
      owners.push(u);
    } else if ((u.access_status ?? "ACTIVE") === "PENDING") {
      review.push(u);
    } else {
      approved.push(u);
    }
  }
  return { review, approved, owners };
}

export function computeUserDirectoryStats(users: OwnerUser[]): UserDirectoryStats {
  const byTier: Record<string, number> = { member: 0, plus: 0, pro: 0, owner: 0 };
  let pending = 0;
  let active = 0;
  let rejected = 0;

  let owners = 0;
  for (const u of users) {
    const tier = tierOf(u);
    byTier[tier] = (byTier[tier] ?? 0) + 1;
    // Owners are counted separately and never inflate Review/Approved.
    if (isOwnerUser(u)) {
      owners++;
      continue;
    }
    const access = u.access_status ?? "ACTIVE";
    if (access === "PENDING") pending++;
    else if (access === "REJECTED") rejected++;
    else active++;
  }

  return {
    total: users.length,
    pending,
    active,
    rejected,
    owners,
    byTier,
  };
}

export function filterAndSortOwnerUsers(
  users: OwnerUser[],
  filters: UserDirectoryFilters,
): OwnerUser[] {
  const q = filters.query.trim().toLowerCase();
  let rows = users;

  if (q) {
    rows = rows.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        (u.full_name ?? "").toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q),
    );
  }

  if (filters.access !== "all") {
    rows = rows.filter((u) => (u.access_status ?? "ACTIVE") === filters.access);
  }

  if (filters.tier !== "all") {
    rows = rows.filter((u) => tierOf(u) === filters.tier);
  }

  const sorted = [...rows];
  switch (filters.sort) {
    case "oldest":
      sorted.sort(
        (a, b) =>
          new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime(),
      );
      break;
    case "credits_desc":
      sorted.sort((a, b) => (b.credits ?? 0) - (a.credits ?? 0));
      break;
    case "credits_asc":
      sorted.sort((a, b) => (a.credits ?? 0) - (b.credits ?? 0));
      break;
    case "name":
      sorted.sort((a, b) =>
        (a.full_name || a.email).localeCompare(b.full_name || b.email, undefined, {
          sensitivity: "base",
        }),
      );
      break;
    case "newest":
    default:
      sorted.sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime(),
      );
      break;
  }

  return sorted;
}

/** Escape a CSV field (RFC-style quoting for commas and quotes). */
function csvCell(value: string | number | boolean | null | undefined): string {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function ownerUsersToCsv(users: OwnerUser[]): string {
  const header = [
    "id",
    "email",
    "full_name",
    "tier",
    "access_status",
    "credits",
    "created_at",
  ].join(",");

  const lines = users.map((u) =>
    [
      csvCell(u.id),
      csvCell(u.email),
      csvCell(u.full_name),
      csvCell(tierOf(u)),
      csvCell(u.access_status ?? "ACTIVE"),
      csvCell(u.credits),
      csvCell(u.created_at ?? ""),
    ].join(","),
  );

  return [header, ...lines].join("\r\n");
}

export function downloadTextFile(filename: string, content: string, mime = "text/csv;charset=utf-8"): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
