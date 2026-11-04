import { accessLevelFor, type AccessLevel } from "@/lib/access-level";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

/**
 * Personal AI widget visibility.
 *
 * Shown for every signed-in user on any app page EXCEPT the full-screen
 * chat/AI surfaces (where having two chat UIs would be confusing).
 * Visitors and loading states get nothing.
 */
export function shouldShowPlatformGuideWidget(
  pathname: string,
  user: AiSparkUserLike | null | undefined,
): boolean {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  // Never show alongside full-screen AI surfaces
  if (
    path.startsWith("/chat") ||
    path.startsWith("/ai") ||
    path === "/mind-studio" ||
    path.startsWith("/mind-studio/")
  ) return false;

  const level: AccessLevel = accessLevelFor(user);

  // Visitors (signed-out) do not get the personal AI
  return level !== "visitor";
}
