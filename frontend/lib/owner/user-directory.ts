import type { OwnerUser } from "@/lib/api/owner";

export type UserAccessFilter = "all" | "PENDING" | "ACTIVE" | "REJECTED";
export type UserRoleFilter = "all" | "member" | "plus" | "pro" | "owner";
export type UserPremiumFilter = "all" | "premium" | "standard";
export type UserSortKey = "newest" | "oldest" | "credits_desc" | "credits_asc" | "name";

export interface UserDirectoryStats {
  total: number;
  pending: number;
  active: number;
  rejected: number;
  premium: number;
  byRole: Record<string, number>;
}

export interface UserDirectoryFilters {
  query: string;
  access: UserAccessFilter;
  role: UserRoleFilter;
  premium: UserPremiumFilter;
  sort: UserSortKey;
}

export const DEFAULT_USER_DIRECTORY_FILTERS: UserDirectoryFilters = {
  query: "",
  access: "all",
  role: "all",
  premium: "all",
  sort: "newest",
};

export function computeUserDirectoryStats(users: OwnerUser[]): UserDirectoryStats {
  const byRole: Record<string, number> = { member: 0, plus: 0, pro: 0, owner: 0 };
  let pending = 0;
  let active = 0;
  let rejected = 0;
  let premium = 0;

  for (const u of users) {
    const role = u.role ?? "member";
    byRole[role] = (byRole[role] ?? 0) + 1;
    const access = u.access_status ?? "ACTIVE";
    if (access === "PENDING") pending++;
    else if (access === "REJECTED") rejected++;
    else active++;
    if (u.premium_status) premium++;
  }

  return {
    total: users.length,
    pending,
    active,
    rejected,
    premium,
    byRole,
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

  if (filters.role !== "all") {
    rows = rows.filter((u) => (u.role ?? "member") === filters.role);
  }

  if (filters.premium === "premium") {
    rows = rows.filter((u) => u.premium_status);
  } else if (filters.premium === "standard") {
    rows = rows.filter((u) => !u.premium_status);
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
    "role",
    "access_status",
    "premium_status",
    "credits",
    "created_at",
  ].join(",");

  const lines = users.map((u) =>
    [
      csvCell(u.id),
      csvCell(u.email),
      csvCell(u.full_name),
      csvCell(u.role ?? "member"),
      csvCell(u.access_status ?? "ACTIVE"),
      csvCell(u.premium_status),
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
