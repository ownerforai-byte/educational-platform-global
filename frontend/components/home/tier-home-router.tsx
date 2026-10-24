"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HomePublic } from "@/components/home/home-public";
import { UniversalWelcome } from "@/components/home/tier-welcome-interfaces";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  accessLevelFor,
  TIER_HOME_PATHS,
  TIER_WELCOME_PATHS,
} from "@/lib/access-level";

/**
 * THE TIER ROUTER (owner direction 2026-10-23: "first get access whether it is
 * a visitor, users, pro, owner then feed welcome and after clicked go then
 * feed login and if already logged (means user) then its welcome directly … no
 * universal welcome for accessed users as that is for visitors only").
 *
 * landOn="welcome" (the root entry): visitors get the UNIVERSAL WELCOME (its
 * Go option opens the login page); signed-in viewers are replaced onto their
 * own tier WELCOME — one hop, their rung decided before the first paint.
 *
 * landOn="home" (/home, the nav Home link): signed-in viewers go straight to
 * their tier home — the destination the welcome's Go button opens.
 *
 * The session is known synchronously (readCachedSession feeds useSession's
 * first render), so the correct page appears on the first paint — no generic
 * home, no flash of another rung's interface.
 */

function TierSplash() {
  // Neutral, tier-less first frame for SSR/hydration only — never another
  // rung's interface.
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export function TierHomeRouter({
  landOn = "home",
}: {
  landOn?: "welcome" | "home";
}) {
  const router = useRouter();
  const { user, isLoading } = useSession();
  const tier = accessLevelFor(user);

  useEffect(() => {
    if (isLoading || tier === "visitor") return;
    router.replace(
      landOn === "welcome" ? TIER_WELCOME_PATHS[tier] : TIER_HOME_PATHS[tier],
    );
  }, [isLoading, router, tier, landOn]);

  // Signed-out visitors: the universal welcome at the entry, the plain public
  // overview on /home (behind the approval wall either way). Signed-in: the
  // splash while their own page is being opened.
  if (isLoading || tier !== "visitor") return <TierSplash />;
  return landOn === "welcome" ? <UniversalWelcome /> : <HomePublic />;
}
