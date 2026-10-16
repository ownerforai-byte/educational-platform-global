"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { HomePublic } from "./home-public";

/**
 * ONE home route, two audiences (owner request 2026-10-16).
 *
 *   signed in   → the member home (`member` below): six subject rails behind
 *                 the Spark gate (owner + Pro pass, everyone else meets the
 *                 lock). The branch does NOT import it — the rails are a
 *                 server component that reads node:fs data modules, so the
 *                 server page renders them and passes the tree in as a prop;
 *                 importing them here would drag node:fs into the browser
 *                 bundle and 500 the route.
 *   signed out  → HomePublic: the designed public home carrying the standing
 *                 access message ("login works after administrative approval
 *                 and system verification only") and everything open without
 *                 an account.
 *   resolving   → nothing yet, so a member never sees the public hero flash
 *                 and a visitor never sees the member rails flash.
 *
 * The branch lives here (client) because the session only exists in the
 * browser; `app/(app)/home/page.tsx` stays a server component that owns the
 * metadata and the member tree.
 */
export function HomeAudience({ member }: { member: ReactNode }) {
  const { user, isLoading } = useSession();

  if (user) return <>{member}</>;
  if (isLoading) return null;

  return <HomePublic />;
}
