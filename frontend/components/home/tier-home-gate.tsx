"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  accessLevelFor,
  TIER_HOME_PATHS,
  TIER_WELCOME_PATHS,
  type AccessLevel,
} from "@/lib/access-level";

/**
 * THE RUN GATE — one interface per viewer (owner direction 2026-10-23: "once
 * logged then only tier pages — no all or two tier pages at once").
 *
 * A page renders only at its own rung; any other viewer is silently replaced
 * onto the page THEIR rung gets in the same family. While the session resolves
 * (and while a wrong-rung viewer is moved along) a neutral tier-less spinner
 * shows — one tier interface is never mixed with another.
 */

const HOME_TARGETS: Record<AccessLevel, string> = {
  visitor: "/",
  ...TIER_HOME_PATHS,
};

function TierRunGate({
  tier,
  targets,
  children,
}: {
  tier: AccessLevel;
  targets: Record<AccessLevel, string>;
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useSession();
  const level = accessLevelFor(user);

  useEffect(() => {
    if (isLoading || level === tier) return;
    router.replace(targets[level]);
  }, [isLoading, level, tier, router, targets]);

  if (isLoading || level !== tier) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }
  return <>{children}</>;
}

/**
 * The hardcoded tier HOME interfaces: exact rung only, visitors to the public
 * overview, wrong rungs to their own tier home.
 */
export function TierHomeGate({
  tier,
  children,
}: {
  tier: Exclude<AccessLevel, "visitor">;
  children: ReactNode;
}) {
  return (
    <TierRunGate tier={tier} targets={HOME_TARGETS}>
      {children}
    </TierRunGate>
  );
}

/**
 * The per-tier WELCOME screens: exact rung only (guests included — the guest
 * welcome renders for visitors), wrong rungs to their own welcome page.
 */
export function TierWelcomeGate({
  tier,
  children,
}: {
  tier: AccessLevel;
  children: ReactNode;
}) {
  return (
    <TierRunGate tier={tier} targets={TIER_WELCOME_PATHS}>
      {children}
    </TierRunGate>
  );
}
