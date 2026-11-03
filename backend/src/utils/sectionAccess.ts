import { readSectionMinTiers } from "./sectionTiers";

/**
 * SECTION TIER CHECK FOR SPARK UNLOCKS.
 *
 * The client coin gate wraps the section gate, so it must not sell an unlock
 * for a section the viewer's rung does not open. The unlock endpoint enforces
 * the same rule: a denied unlock never touches the balance.
 *
 * Only the spark-gated study-desk sections are mapped here (their code
 * defaults mirror frontend/lib/sections.ts); the owner's runtime minimums
 * (`section_min_tier.<id>`) are applied on top, like everywhere else.
 */
export const SPARK_GATED_SECTIONS: ReadonlyArray<{ id: string; href: string; minTier: Tier }> = [
  { id: "srs", href: "/srs", minTier: "plus" },
  { id: "mock-exams", href: "/mock-exams", minTier: "pro" },
  { id: "downloads", href: "/downloads", minTier: "pro" },
];

export type Tier = "visitor" | "member" | "plus" | "pro" | "owner";
const RANK: Record<Tier, number> = { visitor: 0, member: 1, plus: 2, pro: 3, owner: 4 };

export interface TierUser {
  email?: string | null;
  role?: string | null;
  plan?: string | null;
  premiumStatus?: boolean | null;
}

export function tierForUser(user: TierUser, isOwner: boolean): Tier {
  if (isOwner || user.role === "owner") return "owner";
  const plan = (user.plan ?? "").toLowerCase();
  if (plan === "pro" || user.premiumStatus === true || user.role === "pro") return "pro";
  if (plan === "plus" || user.role === "plus") return "plus";
  return "member";
}

/** The path inside a client unlock key (`route:/srs` → `/srs`), else null. */
function pathFromModuleKey(moduleKey: string | undefined): string | null {
  if (!moduleKey || !moduleKey.startsWith("route:")) return null;
  const path = moduleKey.slice("route:".length).split("?")[0].replace(/\/+$/, "");
  return path || null;
}

/**
 * True when this viewer's rung opens the section behind `moduleKey` (keys that
 * map to no spark-gated section are always allowed).
 */
export async function canUnlockModule(
  user: TierUser,
  isOwner: boolean,
  moduleKey: string | undefined,
  readOverrides: () => Promise<Record<string, string>> = readSectionMinTiers,
): Promise<boolean> {
  const path = pathFromModuleKey(moduleKey);
  if (!path) return true;
  const section = SPARK_GATED_SECTIONS.find((s) => path === s.href || path.startsWith(`${s.href}/`));
  if (!section) return true;
  const overrides = await readOverrides();
  const override = overrides[section.id] as Tier | undefined;
  const min: Tier = override && override in RANK ? override : section.minTier;
  return RANK[tierForUser(user, isOwner)] >= RANK[min];
}
