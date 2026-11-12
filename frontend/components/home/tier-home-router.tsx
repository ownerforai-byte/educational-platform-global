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
 * THE TIER ROUTER.
 *
 * Flow (owner 2026-11-12):
 *   Operator account → sign in on welcome → operator welcome → home
 *   Everyone else → universal welcome → Go → signup (or pending /welcome if
 *   this browser already created an account) → after approval + Sign in →
 *   member welcome → Go → member home with features.
 *
 * landOn="welcome" (root `/`): guests see UniversalWelcome; signed-in viewers
 * are replaced onto their tier welcome.
 *
 * landOn="home" (`/home`): guests see the public guest home; signed-in
 * viewers go straight to their tier home.
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
    if (isLoading || tier === "guest") return;
    router.replace(
      landOn === "welcome" ? TIER_WELCOME_PATHS[tier] : TIER_HOME_PATHS[tier],
    );
  }, [isLoading, router, tier, landOn]);

  // A visitor with no cached session is a guest with certainty — render the
  // public view on the FIRST paint. `isLoading` stays true for up to
  // SESSION_PROBE_MAX_MS (6s) while /api/auth/me runs; a cold Render backend
  // therefore blanked /home behind a spinner for every new visitor and broke
  // the guest smoke spec's 5s visibility assertion. If the probe does find a
  // session, `user` changes and the effect above redirects to that tier's
  // page. Signed-in viewers still get the splash while their page opens.
  if (tier !== "guest") return <TierSplash />;
  return landOn === "welcome" ? <UniversalWelcome /> : <HomePublic />;
}
