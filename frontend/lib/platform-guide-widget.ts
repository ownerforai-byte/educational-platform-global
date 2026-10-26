import { accessLevelFor, type AccessLevel } from "@/lib/access-level";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

const TIER_HOME_PATHS = new Set([
  "/home/member",
  "/home/plus",
  "/home/pro",
  "/home/owner",
]);

/**
 * Platform guide widget for signed-in tier homes only.
 * Visitors get VisitorHomeChat on the universal welcome and guest home instead.
 * Does not use AI spark pools.
 */
export function shouldShowPlatformGuideWidget(
  pathname: string,
  user: AiSparkUserLike | null | undefined,
): boolean {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if (path.startsWith("/chat") || path.startsWith("/ai")) return false;

  const level: AccessLevel = accessLevelFor(user);

  if (level === "visitor") return false;

  return TIER_HOME_PATHS.has(path);
}
